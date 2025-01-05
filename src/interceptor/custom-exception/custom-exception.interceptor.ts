import { IsArray } from 'class-validator';
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(CustomExceptionFilter.name);
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const message =
            exception instanceof HttpException ? exception.getResponse() : {};
        this.logger.error(`HTTP ${status} Error: ${message}`, (exception as any)?.stack);
        response.status(status).json({
            timestamp: new Date().toISOString(),
            path: request.url,
            ...message as Object
        });
    }
}
