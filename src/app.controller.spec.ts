import { Test, TestingModule } from "@nestjs/testing"
import { AppController } from "./app.controller"
import { AuthService } from "./auth/auth.service"
import { CredentialDto } from "./auth/dto/credentials.dto"
import { CreatedSimpleUserDto } from "./users/dto/createdSimpleUser.dto"
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard"
import { RolesGuard } from "./common/guards/roles.guard"


const mockAuthService = {
    login: jest.fn(),
    simpleRegister: jest.fn(),
    updateAccesToken: jest.fn()
}

describe('AppController', () => {

    let appController: AppController
    let authService: AuthService

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [
                {
                    provide: AuthService,
                    useValue: mockAuthService
                }
            ]
        })
            .overrideGuard(JwtAuthGuard)
            .useValue({ canActivate: jest.fn(() => true) }) // Mock del JwtAuthGuard
            .overrideGuard(RolesGuard)
            .useValue({ canActivate: jest.fn(() => true) }) // Mock del RolesGuard
            .compile();

        appController = module.get<AppController>(AppController)
        authService = module.get<AuthService>(AuthService)
    })

    it('should be defined', () => {
        expect(appController).toBeDefined()
    })

    describe('login', () => {
        it('should call authservice.login with correct parameters', async () => {
            const credentials: CredentialDto = { email: 'test@test.com', password: 'test123' }
            await appController.login(credentials)
            expect(authService.login).toHaveBeenCalledWith(credentials)
        })
    })

    describe('register', () => {
        it('should call authService.simpleRegister with correct parameters', async () => {
            const signUpDto: CreatedSimpleUserDto = {
                name: 'test', credentials: {
                    email: 'test@test.com', password: 'test123'
                }
            };
            await appController.register(signUpDto);
            expect(authService.simpleRegister).toHaveBeenCalledWith(signUpDto);
        });
    });

    describe('refreshToken', () => {
        it('should call authService.updateAccesToken with correct user data', async () => {
            const user = { is_refresh: true, userId: 1, username: 'testuser', rol: { id: 4, name: 'cliente' } };  // Define un usuario de prueba

            // Simular el req con el usuario
            const req = {
                user: user,
            } as any;

            // Simular el valor de retorno del método updateAccesToken
            const token = { access_token: 'mocked_token' };
            (authService.updateAccesToken as jest.Mock).mockResolvedValue(token);

            const result = await appController.refreshToken(req);

            expect(authService.updateAccesToken).toHaveBeenCalledWith(user);
            expect(result).toEqual(token);
        });
    });

    describe('test', () => {
        it('should return "prueba"', async () => {
            const result = await appController.test();
            expect(result).toBe('prueba');
        });
    });

})