

import { Observable } from 'rxjs/Observable';
import { pipe } from '../../operator/pipe';

Observable.prototype.pipe = pipe;

declare module 'rxjs/Observable' {
	interface Observable<T> {
		pipe: typeof pipe;
	}
}
