
import { Observable } from 'rxjs/Observable';
import { write } from '../../operator/write';

Observable.prototype.write = write;

declare module 'rxjs/Observable' {
	interface Observable<T> {
		write: typeof write;
	}
}
