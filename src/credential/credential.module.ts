import { Module } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credentials } from './entity/credential.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Credentials])
  ],
  providers: [CredentialService],
  exports: [CredentialService, TypeOrmModule]
})
export class CredentialModule {}
