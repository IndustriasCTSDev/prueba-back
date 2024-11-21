import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path'; 

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('database.host'),
        username: configService.get<string>('database.db_user'),
        database: configService.get<string>('database.db_name'),
        password: configService.get<string>('database.db_password'),
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}'
        ],
        migrations: [path.join(__dirname, '../database/migrations/*{.ts,.js}')],
        synchronize: false,
      })
    })
  ],
  providers: [],
  exports: []
})
export class DatabaseModule { }
