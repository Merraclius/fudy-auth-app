import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const responseObject = exception.getResponse();

    let message = exception.message;

    if (typeof responseObject === 'object') {
      message = (responseObject as { message: string }).message;
    }

    response.status(status).json({
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
