import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './modules/post/post.module';
import { PhotoModule } from './modules/photo/photo.module';
import { AlbomeController } from './modules/albome/albome.controller';
import { AlbomeModule } from './modules/albome/albome.module';
import { TelescopeService } from './modules/telescope/telescope.service';
import { TelescopeModule } from './modules/telescope/telescope.module';
import { UserModule } from './modules/user/user.module';
import { CameraModule } from './modules/camera/camera.module';
import { EquipmentModule } from './modules/equipment/equipment.module';
import { ObjectService } from './modules/object/object.service';
import { ObjectController } from './modules/object/object.controller';
import { ObjectModule } from './modules/object/object.module';
import { LocationModule } from './modules/location/location.module';

@Module({
  imports: [
    PostModule,
    PhotoModule,
    AlbomeModule,
    TelescopeModule,
    UserModule,
    CameraModule,
    EquipmentModule,
    ObjectModule,
    LocationModule,
  ],
  controllers: [AppController, AlbomeController, ObjectController],
  providers: [AppService, TelescopeService, ObjectService],
})
export class AppModule {}
