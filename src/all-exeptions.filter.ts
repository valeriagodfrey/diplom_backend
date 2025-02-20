/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'Внутренняя ошибка сервера';

    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      // Если res — объект и содержит поле message, используем его
      message =
        typeof res === 'object' && res !== null && (res as any).message
          ? (res as any).message
          : (res as string);
    }

    response.status(status).json({
      message, // отдаём только сообщение
      // можно также добавить другие поля, если потребуется:
      // statusCode: status,
      // path: request.url,
      // timestamp: new Date().toISOString(),
    });
  }
}
