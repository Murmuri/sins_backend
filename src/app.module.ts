import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { PostModule } from 'src/modules/post/post.module';
import { PhotoModule } from 'src/modules/photo/photo.module';
import { AlbomeController } from 'src/modules/albome/albome.controller';
import { AlbomeModule } from 'src/modules/albome/albome.module';
import { TelescopeService } from 'src/modules/telescope/telescope.service';
import { TelescopeModule } from 'src/modules/telescope/telescope.module';
import { UserModule } from 'src/modules/user/user.module';
import { CameraModule } from 'src/modules/camera/camera.module';
import { EquipmentModule } from 'src/modules/equipment/equipment.module';
import { SpaceObjectService } from 'src/modules/space-object/space-object.service';
import { SpaceObjectController } from 'src/modules/space-object/space-object.controller';
import { SpaceObjectModule } from 'src/modules/space-object/space-object.module';
import { LocationModule } from 'src/modules/location/location.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PostModule,
    PhotoModule,
    AlbomeModule,
    TelescopeModule,
    UserModule,
    CameraModule,
    EquipmentModule,
    SpaceObjectModule,
    LocationModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_SCHEMA,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      logging: process.env.NODE_ENV === 'development',
      migrationsTableName: 'migrations',
      migrations: [__dirname + '/migration/**/*.{js,ts}'],
      entities: [__dirname + '/entity/*.{js,ts}'],
      migrationsRun: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
