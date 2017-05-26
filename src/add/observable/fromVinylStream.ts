import { Observable } from 'rxjs/Observable';
import { VinylStreamObservable } from '../../observable/VinylStreamObservable';

Observable.fromVinylStream = VinylStreamObservable.create;

declare module 'rxjs/Observable' {
	namespace Observable {
		export let fromVinylStream: typeof VinylStreamObservable.create;
	}
}