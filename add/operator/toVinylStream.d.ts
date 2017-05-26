import { toVinylStream } from '../../operator/toVinylStream';
declare module 'rxjs/Observable' {
    interface Observable<T> {
        toVinylStream: typeof toVinylStream;
    }
}
