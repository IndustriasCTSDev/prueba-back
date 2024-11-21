import { Repository } from 'typeorm';
import { Credentials } from './entity/credential.entity';
import { CredentialDto } from 'src/auth/dto/credentials.dto';
export declare class CredentialService {
    private credentialRepository;
    constructor(credentialRepository: Repository<Credentials>);
    createCredentials(data: CredentialDto): Promise<Credentials>;
    findCredentialsByEmail(email: string, noError?: boolean): Promise<Credentials>;
    hashPassword(pass: string): Promise<string>;
}
