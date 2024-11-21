import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Repository } from 'typeorm';
import { CredentialService } from 'src/credential/credential.service';
import { CreatedSimpleUserDto } from './dto/createdSimpleUser.dto';
import { UserDto } from './dto/user.dto';
import { RolesService } from 'src/roles/roles.service';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @Inject(forwardRef(() => CredentialService))
        private credentialService: CredentialService,
        @Inject(forwardRef(() => RolesService))
        private rolesService: RolesService,
    ) { }

    async createUser(userData: UserDto) {
        const tmpUser = this.usersRepository.create(userData)
        return await this.usersRepository.save(tmpUser)
    }

    async findByEmail(email: string): Promise<Users> {
        const tmpCredentials = await this.credentialService.findCredentialsByEmail(email)

        const tmpUser = await this.usersRepository.findOne({
            relations: {
                credential: true,
                rol: true
            },
            where: {
                credential: tmpCredentials
            }
        })

        return tmpUser
    }

    async findById(id: number): Promise<Users> {

        const tmpUser = await this.usersRepository.findOne({
            relations: {
                rol: true
            },
            where: {
                id
            }
        })
        return tmpUser
    }

    async findAllAdmins(options?: IPaginationOptions): Promise<Pagination<Users> | Users[]> {
        try {
            const queryBuilder = this.usersRepository.createQueryBuilder('user_v1')

            if (options) {
                return paginate<Users>(queryBuilder, options)
            }

            return await this.usersRepository.find()
        } catch (error) {
            throw error
        }
    }

    async createdUserWithCredentials(data: CreatedSimpleUserDto) {

        try {
            const exist = await this.credentialService.findCredentialsByEmail(data.credentials.email, true)

            if (exist) {
                throw new BadRequestException('Ya ha sido creado un usuario con este Email')
            }

            const credential = await this.credentialService.createCredentials({ email: data.credentials.email, password: data.credentials.password })
            const clientRole = await this.rolesService.rolById(2)
            if (credential) {
                const tmpUser = await this.createUser({
                    name: data.name,
                    credential: credential,
                    rol: clientRole
                })
                return tmpUser
            }
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

}
