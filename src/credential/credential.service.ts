import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Credentials } from './entity/credential.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialDto } from 'src/auth/dto/credentials.dto';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class CredentialService {
    constructor(
        @InjectRepository(Credentials)
        private credentialRepository: Repository<Credentials>
    ) {

    }

    async createCredentials(data: CredentialDto) {
        const tmpPass = await this.hashPassword(data.password)
        const tmpCredentials = this.credentialRepository.create({
            email: data.email,
            password: tmpPass,
            email_verified: false
        })

        return await this.credentialRepository.save(tmpCredentials)
    }

    async findCredentialsByEmail(email: string, noError?: boolean) {
        const res = await this.credentialRepository.findOne({
            where: {
                email
            }
        })

        if (noError) {
            return res
        }

        if (!res)
            throw new NotFoundException('Email incorrecto.')

        return res
    }

    async hashPassword(pass: string) {
        const hash = bcrypt.hashSync(pass, 8)
        return hash
    }
}