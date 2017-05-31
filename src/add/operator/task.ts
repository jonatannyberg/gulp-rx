
import { Observable } from 'rxjs/Observable';
import { task } from '../../operator/task';

Observable.prototype.task = task;

declare module 'rxjs/Observable' {
	interface Observable<T> {
		task: typeof task;
	}
}
