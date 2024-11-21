import { Module } from '@nestjs/common';
import { SettingsAppService } from './settings-app.service';
import { SettingsAppController } from './settings-app.controller';
import { TemplateModule } from 'src/template/template.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TemplateModule,
    UsersModule
  ],
  providers: [SettingsAppService],
  controllers: [SettingsAppController]
})
export class SettingsAppModule {}
