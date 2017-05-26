import { pipe } from '../../operator/pipe';
declare module 'rxjs/Observable' {
    interface Observable<T> {
        pipe: typeof pipe;
    }
}
