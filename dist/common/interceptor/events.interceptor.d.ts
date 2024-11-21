import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable } from 'rxjs';
export declare class EventsInterceptor implements NestInterceptor {
    private eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
