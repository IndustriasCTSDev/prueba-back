import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BusinessUnitModule } from 'src/business_unit/business_unit.module';
import { VisitanteModule } from 'src/visitante/visitante.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    BusinessUnitModule,
    VisitanteModule
  ],
  providers: [EventsService],
  exports: [EventsService, EventEmitterModule]
})
export class EventsModule { }
