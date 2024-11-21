import { Roles } from './entity/roles.entity';
import { Repository } from 'typeorm';
export declare class RolesService {
    private rolesRepository;
    constructor(rolesRepository: Repository<Roles>);
    rolById(id: number): Promise<Roles>;
}
