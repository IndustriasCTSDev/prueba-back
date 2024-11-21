import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // Obtén la instancia de ConfigService
  const configService = app.get(ConfigService);

  // Habilitar CORS
  app.enableCors({
    origin: '*', // O usa un dominio específico para mayor seguridad
  });

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: false,
    forbidNonWhitelisted: false, // Permite propiedades no listadas en el DTO sin lanzar errores
    skipMissingProperties: true  // Permite que falten propiedades opcionales sin lanzar error  
  }))

  const configSwagger = new DocumentBuilder()
    .setTitle('CTS Cloud API')
    .setDescription('Esta es la API de CTS Cloud.')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        name: 'Authorization',
        description: 'Enter your Bearer token',
      }
    )
    .addSecurityRequirements('bearer')
    .build()

  const document = SwaggerModule.createDocument(app, configSwagger)
  SwaggerModule.setup('api', app, document)

  await app.listen(configService.get<number>('port'));
}
bootstrap();
