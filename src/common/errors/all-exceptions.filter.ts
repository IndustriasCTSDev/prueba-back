import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    UnauthorizedException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

export class CustomUnauthorizedException extends UnauthorizedException {
    type: string;

    constructor(type: string, message?: string) {
        super(message); // Pasa el mensaje al constructor de UnauthorizedException
        this.type = type;
    }
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

    catch(exception: unknown, host: ArgumentsHost): void {
        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        let msg = 'Lo siento, ha ocurrido un error en nuestro servidor'
        let type = ''
        console.log(exception);
        
        let httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        if (exception instanceof HttpException) {
            msg = exception.message
        }

        if (exception instanceof QueryFailedError) {
            msg = `Error en la consulta: ${exception.message}`;
            httpStatus = HttpStatus.BAD_REQUEST;
            type = exception.name
        }

        if (exception instanceof CustomUnauthorizedException) {
            type = exception.type
        }

        const responseBody = {
            statusCode: httpStatus,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
            msg,
            type
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}