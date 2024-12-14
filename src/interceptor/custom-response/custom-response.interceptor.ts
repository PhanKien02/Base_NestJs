import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Response,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponse } from 'src/interface/response.interface';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data: IResponse<unknown>) => {
                if (!data || typeof data.message === 'undefined' || typeof data.data === 'undefined') {
                    throw new Error('Invalid response format. Must follow IResponse<T> structure.');
                }
                return {
                    statusCode: context.switchToHttp().getResponse().statusCode || 200,
                    message: data.message,
                    data: data.data,
                };
            }
            ),
        );
    }
}