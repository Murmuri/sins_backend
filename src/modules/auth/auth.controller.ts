import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignUpDto } from './dto/auth-sign-up.dto';
import { AuthSignInDto } from './dto/auth-sign-in.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseDto } from 'src/shared/response.dto';
import { AccessTokenResponseDto } from './dto/access-token-response.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { SetNewPasswordFromProfileDto } from './dto/set-new-password-from-profile.dto';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponseDto,
    description: 'User sign up',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Something went wrong',
  })
  async signUp(@Body(ValidationPipe) authSignUpDto: AuthSignUpDto) {
    return await this.authService.signUp(authSignUpDto);
  }

  @Post('/signIn')
  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: AccessTokenResponseDto,
    description: 'User sign in',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  async signIn(
    @Body(ValidationPipe) authSignInDto: AuthSignInDto,
  ): Promise<AccessTokenResponseDto> {
    return await this.authService.signIn(authSignInDto);
  }

  @Put('/password/update')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update password from profile.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponseDto,
    description: 'Update password from profile',
  })
  async updatePassword(
    @CurrentUser() user,
    @Body() newPasswordDto: SetNewPasswordFromProfileDto,
  ): Promise<ResponseDto> {
    return await this.authService.setNewPassword(user.id, newPasswordDto);
  }
}
