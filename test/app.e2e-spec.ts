import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module'; // Asegúrate de que esta ruta sea correcta
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreatedSimpleUserDto } from 'src/users/dto/createdSimpleUser.dto';
import { Users } from 'src/users/entity/users.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Importa tu módulo principal
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) }) // Mock del JwtAuthGuard
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) }) // Mock del RolesGuard
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /auth/login', () => {
    it('should return a token when credentials are valid', async () => {
      const credentials = { email: 'test@test.com', password: 'test123' };

      // Mock de la respuesta de login del AuthService
      jest.spyOn(authService, 'login').mockResolvedValue({ access_token: 'mocked_token', refresh_token: 'mocked_token' });

      const response = await request(app.getHttpServer())
        .post('/auth/login') // Asegúrate de que la ruta sea correcta
        .send(credentials)
        .expect(200); // Cambia esto si tu API devuelve un código de estado diferente

      expect(response.body).toEqual({ access_token: 'mocked_token' });
    });
  });

  describe('POST /auth/register', () => {
    it('should create a user and return user data', async () => {
      const signUpDto = {
        name: 'test', credential: {
          email: '',
          email_verified: false,
          password: ''
        },
        rol: {
          id: 4,
          name: 'cliente'
        },
        id: 1,
      } as Users;

      // Mock de la respuesta de registro del AuthService
      jest.spyOn(authService, 'simpleRegister').mockResolvedValue(signUpDto);

      const response = await request(app.getHttpServer())
        .post('/auth/register') // Asegúrate de que la ruta sea correcta
        .send(signUpDto)
        .expect(201); // Cambia esto si tu API devuelve un código de estado diferente

      expect(response.body).toEqual(signUpDto);
    });
  });

  describe('POST /auth/refresh-token', () => {
    it('should return a new access token', async () => {
      const user = { is_refresh: true, userId: 1, username: 'testuser', rol: { id: 4, name: 'cliente' } };
      const req = { user };

      // Mock de la respuesta de actualización del token del AuthService
      jest.spyOn(authService, 'updateAccesToken').mockResolvedValue({ access_token: 'new_mocked_token' });

      const response = await request(app.getHttpServer())
        .post('/auth/refresh-token') // Asegúrate de que la ruta sea correcta
        .send(req)
        .expect(200); // Cambia esto si tu API devuelve un código de estado diferente

      expect(response.body).toEqual({ access_token: 'new_mocked_token' });
    });
  });

  describe('GET /test', () => {
    it('should return "prueba"', async () => {
      const response = await request(app.getHttpServer())
        .get('/test') // Asegúrate de que la ruta sea correcta
        .expect(200);

      expect(response.text).toBe('prueba');
    });
  });
});
