import { Controller, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { EventsInterceptor } from 'src/common/interceptor/events.interceptor';

@Controller('users')
@UseInterceptors(EventsInterceptor)
export class UsersController {

    constructor(private usersService: UsersService) {
        
    }

}
