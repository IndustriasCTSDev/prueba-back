import { Module } from '@nestjs/common';
import { BusinessUnitService } from './business_unit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessUnit } from './entity/businessUnit.entity';
import { BusinessUnitController } from './business_unit.controller';
import { UsersModule } from 'src/users/users.module';
import { VisitBusinessUnit } from './entity/visitBusinessUnit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BusinessUnit, VisitBusinessUnit]),
    UsersModule
  ],
  providers: [
    BusinessUnitService
  ],
  exports: [
    BusinessUnitService, TypeOrmModule
  ],
  controllers: [BusinessUnitController]
})
export class BusinessUnitModule {}
