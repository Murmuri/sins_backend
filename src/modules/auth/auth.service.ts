import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import {
  UnauthorizedException,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { PasswordToken } from 'src/entity/PasswordToken';
import { User } from 'src/entity/User';

import { SetNewPasswordFromProfileDto } from './dto/set-new-password-from-profile.dto';
import { SetNewPasswordDto } from './dto/set-new-password.dto';
import { AuthSignUpDto } from './dto/auth-sign-up.dto';
import { AuthSignInDto } from './dto/auth-sign-in.dto';
import { JwtPayload } from './jwt-payload.interface';
import { ConfirmDto } from './dto/confirm.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,

    @InjectRepository(PasswordToken)
    private readonly passwordTokenRepo: Repository<PasswordToken>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async signUp(authSignUpDto: AuthSignUpDto) {
    const { password, email, lastname, firstname, username } = authSignUpDto;

    const dbUser = await this.userRepo.findOne({
      where: { email },
    });

    if (dbUser) {
      throw new BadRequestException(`User with ${email} already exist`);
    }

    const user = new User();
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.email = email;
    user.firstname = firstname;
    user.lastname = lastname;
    user.username = username;

    try {
      await this.entityManager.transaction(async (manager: EntityManager) => {
        const payload: JwtPayload = {
          email: user.email,
          id: user.id,
        };
        const accessToken = this.jwtService.sign(payload);

        const passwordToken = await this.createToken(
          user,
          accessToken,
          manager,
        );

        return passwordToken;
      });

      return { message: 'User successfully added please confirm email' };
    } catch (error) {
      console.log('ERR', error?.response?.errors);
      console.log('ERR', error?.response?.errors?.details);

      if (error?.response?.errors) {
        throw new BadRequestException(error?.response?.errors);
      }

      throw new BadRequestException(error.message);
    }
  }

  async validateUserPassword(authSignInDto: AuthSignInDto) {
    const { password, email } = authSignInDto;

    if (email) {
      const user = await this.userRepo.findOne({
        where: { email },
      });

      if (user && Boolean(await user.validatePassword(password))) {
        return {
          email: user.email,
          id: user.id,
          username: user?.username,
        };
      } else {
        throw new HttpException(
          `Invalid auth or email not confirmed`,
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      throw new HttpException(
        `User with email ${email} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async findOne(email: string) {
    return await this.userRepo.findOne({
      where: { email },
    });
  }

  async signIn(authSignInDto: AuthSignInDto): Promise<{ accessToken: string }> {
    const { email, id } = await this.validateUserPassword(authSignInDto);

    if (!email) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      email,
      id,
    };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  private async createToken(
    user: User,
    accessToken: string,
    manager?: EntityManager,
  ) {
    const passTokenDb = await (manager
      ? manager.createQueryBuilder(PasswordToken, 'passwordToken')
      : this.passwordTokenRepo.createQueryBuilder('passwordToken')
    )
      .where('passwordToken.userId = :userId', { userId: user.id })
      .getOne();

    if (passTokenDb) {
      await (manager
        ? manager.remove(PasswordToken, passTokenDb)
        : this.passwordTokenRepo.remove(passTokenDb));
    }

    const passToken = new PasswordToken();
    passToken.token = accessToken;
    passToken.createdAt = new Date();
    passToken.user = user;

    return await (manager
      ? manager.save(PasswordToken, passToken)
      : this.passwordTokenRepo.save(passToken));
  }

  async setPassword(setNewPasswordDto: SetNewPasswordDto) {
    const { newPassword, token } = setNewPasswordDto;
    const user = await this.getUserByPasswordToken(token);
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(newPassword, user.salt);

    await this.userRepo.save(user);

    return { message: `New password successfully set` };
  }

  async setConfirm(confirmDto: ConfirmDto) {
    const { token } = confirmDto;
    const user = await this.getUserByPasswordToken(token);

    await this.userRepo.save(user);

    return { message: `Confirm user email` };
  }

  async setNewPassword(
    userId: number,
    { oldPassword, newPassword }: SetNewPasswordFromProfileDto,
  ) {
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw new BadRequestException(`User with ${userId} not found`);
    }

    const isValidPassword = await user.validatePassword(oldPassword);

    if (!isValidPassword) {
      throw new BadRequestException(`Old password invalid`);
    }

    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(newPassword, user.salt);

    await this.userRepo.save(user);

    return { message: `User with id ${userId} password successfully edited` };
  }

  private async getUserByPasswordToken(token: string) {
    const dbToken = await this.passwordTokenRepo.findOne({
      where: { token },
    });

    if (!dbToken) {
      throw new BadRequestException(`Invalid token or dont exist`);
    }

    const user = await this.userRepo
      .createQueryBuilder('user')
      .where('user.id = :id', { id: dbToken.userId })
      .getOne();

    if (!user) {
      throw new BadRequestException(
        `User with ${dbToken.userId} does not exist`,
      );
    }

    return user;
  }
}
