import { BusinessUnitService } from './business_unit.service';
import { BusinessUnitDto } from './dto/business_unit.dto';
export declare class BusinessUnitController {
    private businessUnitService;
    constructor(businessUnitService: BusinessUnitService);
    getBusinessUnits(): Promise<import("./entity/businessUnit.entity").BusinessUnit[]>;
    getBusinessUnit(id: string): Promise<import("./entity/businessUnit.entity").BusinessUnit>;
    createBusinessUnit(businessUnit: BusinessUnitDto): Promise<import("./entity/businessUnit.entity").BusinessUnit>;
    updateBusinessUnit(id: string, businessUnit: BusinessUnitDto): Promise<import("./entity/businessUnit.entity").BusinessUnit>;
}
