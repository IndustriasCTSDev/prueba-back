import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CredentialModule } from './credential/credential.module';
import { RolesModule } from './roles/roles.module';
import { VisitanteModule } from './visitante/visitante.module';
import { DateutilsModule } from './dateutils/dateutils.module';
import { MailerModule } from './mailer/mailer.module';
import { RecursosModule } from './recursos/recursos.module';
import { BusinessUnitModule } from './business_unit/business_unit.module';
import { S3SourcesModule } from './s3-sources/s3-sources.module';
import { ProjectsModule } from './projects/projects.module';
import { TemplateModule } from './template/template.module';
import { SettingsAppModule } from './settings-app/settings-app.module';
import { EventsModule } from './events/events.module';
import configuration from './config/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    AuthModule, 
    UsersModule, 
    DatabaseModule, 
    CredentialModule, 
    RolesModule, 
    VisitanteModule, 
    DateutilsModule, 
    MailerModule, 
    RecursosModule, 
    BusinessUnitModule, 
    S3SourcesModule, ProjectsModule, TemplateModule, SettingsAppModule, EventsModule, 
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
