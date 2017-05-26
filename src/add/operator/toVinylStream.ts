
import { Observable } from 'rxjs/Observable';
import { toVinylStream } from '../../operator/toVinylStream';

Observable.prototype.toVinylStream = toVinylStream;

declare module 'rxjs/Observable' {
	interface Observable<T> {
		toVinylStream: typeof toVinylStream;
	}
}
