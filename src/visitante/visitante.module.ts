import { Module } from '@nestjs/common';
import { VisitanteService } from './visitante.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visitante } from './entity/visitante.entity';
import { DateutilsModule } from 'src/dateutils/dateutils.module';
import { QrVisit } from './entity/qrVisit.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Visitante, QrVisit]),
        DateutilsModule
    ],
    providers: [VisitanteService],
    exports: [VisitanteService, TypeOrmModule]
})
export class VisitanteModule { }
