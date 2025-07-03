import { Response } from 'express';
import { ApiResponse } from '@/types/api.types';

export class ResponseUtil {
  static success<T>(res: Response, data: T, message?: string): Response {
    return res.status(200).json({
      success: true,
      data,
      message,
      timestamp: new Date().toISOString()
    } as ApiResponse<T>);
  }

  static created<T>(res: Response, data: T, message?: string): Response {
    return res.status(201).json({
      success: true,
      data,
      message,
      timestamp: new Date().toISOString()
    } as ApiResponse<T>);
  }

  static error(res: Response, message: string, statusCode: number = 400): Response {
    return res.status(statusCode).json({
      success: false,
      error: message,
      timestamp: new Date().toISOString()
    } as ApiResponse);
  }

  static notFound(res: Response, message: string = 'Resource not found'): Response {
    return this.error(res, message, 404);
  }

  static serverError(res: Response, message: string = 'Internal server error'): Response {
    return this.error(res, message, 500);
  }
}
