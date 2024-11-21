
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Folder } from 'src/recursos/entity/folder.entity';

function isEmpty(obj: Record<string, any>): boolean {
    return Object.keys(obj).length === 0;
}

@Injectable()
export class EventsInterceptor implements NestInterceptor {
    constructor(private eventEmitter: EventEmitter2) {

    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();

        let params = {}

        if (!isEmpty(request.query) && !isEmpty(request.params)) {
            params = {
                ...request.query,
                ...request.params
            }
        } else if (!isEmpty(request.query)) {
            params = request.query
        } else if (!isEmpty(request.params)) {
            params = request.params
        }

        if (request.body) {
            if (request.body.business_unit_id)
                params = {...params, businessUnit: request.body.business_unit_id}
        }

        console.log(params);
        

        const data = {
            method: request.method,
            url: request.url,
            user: request.user,
            params: params,
            bucketId: null,
            latitud: request.headers["x-latitud"] | 0,
            longitud: request.headers["x-longitud"] | 0
        };

        if (request.user) {
            if (!data.user.visiter) {
                if (data.method === "GET")
                    this.eventEmitter.emit('admin.history.find', data);
                else if (data.method === "POST")
                    this.eventEmitter.emit('admin.history.created', data);
                else if (data.method === "PUT")
                    this.eventEmitter.emit('admin.history.updated', data);
            }

        }

        return next
            .handle()
            .pipe(
                tap((obs) => {

                    if (Array.isArray(obs) && obs.every(item => item instanceof Folder)) {
                        data.bucketId = obs[0].bucket.id
                    }

                    if (obs instanceof Folder) {
                        data.bucketId = obs.bucket_id
                    }

                    if (request.user && data.user.visiter) {
                        if (data.method === "GET")
                            this.eventEmitter.emit('visiter.history.find', data);
                    }
                })
            )
    }
}
