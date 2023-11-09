import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';
import { Request, Response } from 'express';
import { TypeORMError } from 'typeorm';

@Catch(HttpException, TypeORMError)
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let status = 'Server Error';
    let message = 'Internal Server Error';

    // ! Data Base Error
    if (exception instanceof TypeORMError) {
      statusCode = HttpStatus.BAD_REQUEST;
      status = 'Database Error';
      message = exception.message || 'Database Error';
    }

    // ! Api Errors
    if (exception instanceof HttpException) {
      // Data Of errorDetails
      // {
      //   "message": "Cannot POST /api/auth/signupl",
      //   "error": "Not Found",
      //   "statusCode": 404
      // },
      const errorDetails: any = exception.getResponse();

      statusCode = errorDetails.statusCode;
      message = errorDetails.message;
      status = errorDetails.error;
    }

    // ! Rate Limiter Error
    if (exception instanceof ThrottlerException) {
      // Data Of errorDetails
      // 'ThrottlerException: Too Many Requests' just get error in responses
      const ErrorMessage: any = exception.getResponse();

      statusCode = HttpStatus.TOO_MANY_REQUESTS;
      message = 'Too Many Request from your Ip Please Try Later';
      status = ErrorMessage;
    }

    response.status(statusCode).json({
      statusCode,
      error: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
