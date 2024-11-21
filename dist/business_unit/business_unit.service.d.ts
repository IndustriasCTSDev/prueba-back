import { BusinessUnit } from './entity/businessUnit.entity';
import { Repository } from 'typeorm';
import { BusinessUnitDto } from './dto/business_unit.dto';
import { UsersService } from 'src/users/users.service';
import { VisitBusinessUnitDto } from './dto/visitBusinessUnit.dto';
import { VisitBusinessUnit } from './entity/visitBusinessUnit.entity';
export declare class BusinessUnitService {
    private businessUnitRepository;
    private visitBusinessUnitRepository;
    private userService;
    constructor(businessUnitRepository: Repository<BusinessUnit>, visitBusinessUnitRepository: Repository<VisitBusinessUnit>, userService: UsersService);
    getBusinessUnits(): Promise<BusinessUnit[]>;
    getBusinessUnit(id?: string): Promise<BusinessUnit>;
    createBusinessUnit(businessUnit: BusinessUnitDto): Promise<BusinessUnit>;
    updateBusinessUnit(id: string, businessUnit: BusinessUnitDto): Promise<BusinessUnit>;
    createHistoryVisit(data: VisitBusinessUnitDto): Promise<void>;
}
