import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from 'src/users/entity/users.entity';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { RefreshToken } from './auth/entity/refreshToken.entity';
import { AuthService } from './auth/auth.service';
import { CreatedSimpleUserDto } from './users/dto/createdSimpleUser.dto';

describe('AuthService', () => {
    let authService: AuthService;
    let usersService: UsersService;
    let refreshTokenRepository: Repository<RefreshToken>;

    const mockUsersService = {
        findByEmail: jest.fn(),
        createdUserWithCredentials: jest.fn(),
    };

    const mockJwtService = {
        sign: jest.fn(),
    };

    const mockRefreshTokenRepository = {
        exists: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
        createQueryBuilder: jest.fn().mockReturnValue({
            update: jest.fn().mockReturnThis(),
            set: jest.fn().mockReturnThis(),
            where: jest.fn().mockReturnThis(),
            execute: jest.fn(),
        }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: mockUsersService,
                },
                {
                    provide: JwtService,
                    useValue: mockJwtService,
                },
                {
                    provide: getRepositoryToken(RefreshToken),
                    useValue: mockRefreshTokenRepository,
                },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        usersService = module.get<UsersService>(UsersService);
        refreshTokenRepository = module.get<Repository<RefreshToken>>(getRepositoryToken(RefreshToken));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('validateUser', () => {
        it('should return a user if credentials are valid', async () => {
            const user = { id: 1, email: 'test@example.com', credential: { password: 'hashed_password' } };
            const email = 'test@example.com';
            const password = 'password';

            // Mock de bcrypt para devolver true (contraseña válida)
            jest.spyOn(bcrypt, 'compare').mockImplementation((plain: string, hashed: string): Promise<boolean> => {
                return Promise.resolve(true);
            });
            // Mock de la función findByEmail
            mockUsersService.findByEmail.mockResolvedValue(user);

            const result = await authService.validateUser(email, password);

            expect(result).toEqual({ id: 1, email: 'test@example.com' });
            expect(mockUsersService.findByEmail).toHaveBeenCalledWith(email);
        });

        it('should throw UnauthorizedException if user is not found', async () => {
            const email = 'nonexistent@example.com';
            const password = 'password';

            // Simula que no se encuentra el usuario
            mockUsersService.findByEmail.mockResolvedValue(null);

            await expect(authService.validateUser(email, password)).rejects.toThrow(UnauthorizedException);
            expect(mockUsersService.findByEmail).toHaveBeenCalledWith(email);
        });

        it('should throw UnauthorizedException if password is invalid', async () => {
            const user = { id: 1, email: 'test@example.com', credential: { password: 'hashed_password' } };
            const email = 'test@example.com';
            const password = 'wrong_password';

            // Mock de la función findByEmail
            mockUsersService.findByEmail.mockResolvedValue(user);

            // Mock de bcrypt para devolver false (contraseña inválida)
            jest.spyOn(bcrypt, 'compare').mockImplementation((plain: string, hashed: string): Promise<boolean> => {
                return Promise.resolve(false);
            });

            await expect(authService.validateUser(email, password)).rejects.toThrow(UnauthorizedException);
            expect(mockUsersService.findByEmail).toHaveBeenCalledWith(email);
        });
    });

    describe('login', () => {
        it('should return access and refresh tokens', async () => {
            const user = { id: 1, name: 'test' } as Users;
            const credentials = { email: 'test@example.com', password: 'password' };
            const access_token = 'mock_access_token';
            const refresh_token = 'mock_refresh_token';

            mockUsersService.findByEmail.mockResolvedValue(user);
            jest.spyOn(authService, 'validateUser').mockResolvedValue(user);
            mockJwtService.sign.mockReturnValueOnce(access_token).mockReturnValueOnce(refresh_token);
            mockRefreshTokenRepository.save.mockResolvedValue(null); // Simula que se guarda el token

            const result = await authService.login(credentials);

            expect(result).toEqual({ access_token, refresh_token });
            expect(mockJwtService.sign).toHaveBeenCalledWith(user);
            expect(mockRefreshTokenRepository.save).toHaveBeenCalled();
        });
    });

    describe('simpleRegister', () => {
        it('should return created user data', async () => {
            const dataInfo = { credentials: { email: 'newuser@example.com', password: 'password' }, name: 'test' } as CreatedSimpleUserDto;
            const createdUser = { id: 1, email: 'newuser@example.com' };

            mockUsersService.createdUserWithCredentials.mockResolvedValue(createdUser);

            const result = await authService.simpleRegister(dataInfo);

            expect(result).toEqual(createdUser);
            expect(mockUsersService.createdUserWithCredentials).toHaveBeenCalledWith(dataInfo);
        });

        it('should throw BadRequestException on error', async () => {
            const dataInfo = { credentials: { email: 'newuser@example.com', password: 'password' }, name: 'test' } as CreatedSimpleUserDto;

            mockUsersService.createdUserWithCredentials.mockRejectedValue(new Error('Error en la creación'));

            await expect(authService.simpleRegister(dataInfo)).rejects.toThrow(BadRequestException);
        });
    });

    describe('saveRefreshToken', () => {
        beforeEach(() => {
            jest.clearAllMocks(); // Limpiar mocks antes de cada prueba
        });

        it('should save a new refresh token', async () => {
            const user_info = { id: 1, name: 'test' } as Users;
            const jwt = 'mock_refresh_token';

            // Simula que no existe el token
            mockRefreshTokenRepository.exists.mockResolvedValue(false);

            // Simulamos el retorno de save
            mockRefreshTokenRepository.save.mockResolvedValue({
                jwt,
                user: user_info,
                exp: expect.any(Date), // Asegúrate de que la fecha sea de tipo Date
            });

            const result = await authService.saveRefreshToken(user_info, jwt);

            expect(mockRefreshTokenRepository.save).toHaveBeenCalled(); // Verifica que se llame a save
            expect(result).toEqual(expect.objectContaining({ jwt, user: user_info })); // Verifica el resultado
        });

        it('should update an existing refresh token', async () => {
            const user_info = { id: 1, name: 'test' } as Users;
            const jwt = 'mock_refresh_token';

            // Simula que existe el token
            mockRefreshTokenRepository.exists.mockResolvedValue(true);

            // Preparamos el mock para createQueryBuilder
            const mockQueryBuilder = {
                update: jest.fn().mockReturnThis(),
                set: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValue(undefined), // Simula una respuesta vacía
            };

            mockRefreshTokenRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);

            await authService.saveRefreshToken(user_info, jwt);

            expect(mockQueryBuilder.update).toHaveBeenCalledWith(RefreshToken); // Verifica que se llame a update con el tipo correcto
            expect(mockQueryBuilder.set).toHaveBeenCalledWith({
                jwt,
                exp: expect.any(Date), // Verifica que se establezca una fecha
            });
            expect(mockQueryBuilder.where).toHaveBeenCalledWith("user_id = :id", { id: user_info.id }); // Verifica la condición
            expect(mockQueryBuilder.execute).toHaveBeenCalled(); // Verifica que se llame a execute
        });
    });

    describe('updateAccesToken', () => {
        it('should return a new access token', async () => {
            const user = { id: 1, email: 'test@example.com' };
            const access_token = 'mock_access_token';

            mockJwtService.sign.mockReturnValue(access_token);

            const result = await authService.updateAccesToken(user);

            expect(result).toEqual({ access_token });
            expect(mockJwtService.sign).toHaveBeenCalledWith({ ...user, is_refresh: false });
        });
    });
});
