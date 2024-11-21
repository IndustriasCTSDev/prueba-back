import { Users } from './entity/users.entity';
import { Repository } from 'typeorm';
import { CredentialService } from 'src/credential/credential.service';
import { CreatedSimpleUserDto } from './dto/createdSimpleUser.dto';
import { UserDto } from './dto/user.dto';
import { RolesService } from 'src/roles/roles.service';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
export declare class UsersService {
    private usersRepository;
    private credentialService;
    private rolesService;
    constructor(usersRepository: Repository<Users>, credentialService: CredentialService, rolesService: RolesService);
    createUser(userData: UserDto): Promise<Users>;
    findByEmail(email: string): Promise<Users>;
    findById(id: number): Promise<Users>;
    findAllAdmins(options?: IPaginationOptions): Promise<Pagination<Users> | Users[]>;
    createdUserWithCredentials(data: CreatedSimpleUserDto): Promise<Users>;
}
