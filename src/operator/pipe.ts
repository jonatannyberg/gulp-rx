
import { Observable } from 'rxjs/Observable';
import * as Vinyl from 'vinyl';

export function pipe(this: Observable<Vinyl>, destination: NodeJS.ReadWriteStream): Observable<Vinyl> {
	return Observable.fromVinylStream(this.toVinylStream().pipe(destination));
}
