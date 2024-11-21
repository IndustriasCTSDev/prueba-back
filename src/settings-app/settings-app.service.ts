import { Injectable } from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Users } from 'src/users/entity/users.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SettingsAppService {

    constructor(
        private userService: UsersService
    ) { }

    async getAdmins(options?: IPaginationOptions): Promise<Pagination<Users> | Users[]> {
        return await this.userService.findAllAdmins(options)
    }

}
