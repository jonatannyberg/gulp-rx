import { write } from '../../operator/write';
declare module 'rxjs/Observable' {
    interface Observable<T> {
        write: typeof write;
    }
}
