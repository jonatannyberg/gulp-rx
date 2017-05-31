import { task } from '../../operator/task';
declare module 'rxjs/Observable' {
    interface Observable<T> {
        task: typeof task;
    }
}
