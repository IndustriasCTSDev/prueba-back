import { Module } from '@nestjs/common';
import { DateUtilsService } from './dateutils.service';

@Module({
  providers: [DateUtilsService],
  exports: [DateUtilsService],
})
export class DateutilsModule {}
