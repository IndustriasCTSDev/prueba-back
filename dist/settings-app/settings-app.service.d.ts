import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Users } from 'src/users/entity/users.entity';
import { UsersService } from 'src/users/users.service';
export declare class SettingsAppService {
    private userService;
    constructor(userService: UsersService);
    getAdmins(options?: IPaginationOptions): Promise<Pagination<Users> | Users[]>;
}
