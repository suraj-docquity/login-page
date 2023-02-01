import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  controllers: [ProfileController],
  imports: [UserModule],
  providers: [ProfileService],
})
export class ProfileModule {}


// import { Module } from '@nestjs/common';
// import { UserModule } from '../user/user.module';
// import { UserService } from '../user/user.service';
// import { ProfileController } from './profile.controller';
// import { ProfileService } from './profile.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from '../user/entity/user.entity';

// @Module({
//   controllers: [ProfileController],
//   imports: [TypeOrmModule.forFeature([User]),
//     UserModule],
//   providers: [ProfileService, UserService],
// })
// export class ProfileModule { }

