import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message =
      exception instanceof Error
        ? exception.message
        : 'Internal error, please wait we already fixing it';

    message = this.handleDuplicateKeyException(message, exception);

    const responseBody = {
      message,
      timestamp: new Date().toISOString(),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  private handleDuplicateKeyException(message: string, exception: any): string {
    if (
      !(
        exception instanceof QueryFailedError &&
        message.includes('duplicate key value violates unique constraint')
      )
    ) {
      return message;
    }

    const [_, dupKey] = exception.driverError.detail.match(
      new RegExp(/Key \((.*)\)=/),
    );

    return `Duplicate value for the key ${dupKey}`;
  }
}
