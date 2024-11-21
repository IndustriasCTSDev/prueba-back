import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './entity/roles.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Roles])
  ],
  providers: [RolesService],
  exports: [RolesService, TypeOrmModule]
})
export class RolesModule {}
