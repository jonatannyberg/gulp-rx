import { Observable } from 'rxjs/Observable';
import { VinylStreamObservable } from '../../observable/VinylStreamObservable';

Observable.fromFileStream = VinylStreamObservable.create;

declare module 'rxjs/Observable' {
	namespace Observable {
		export let fromFileStream: typeof VinylStreamObservable.create;
	}
}