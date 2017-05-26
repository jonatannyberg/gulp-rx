import { Observable } from 'rxjs/Observable';
import { VinylStreamGlobWatchObservable } from '../../observable/VinylStreamGlobWatchObservable';

Observable.fromGlobWatch = VinylStreamGlobWatchObservable.create;

declare module 'rxjs/Observable' {
	namespace Observable {
		export let fromGlobWatch: typeof VinylStreamGlobWatchObservable.create;
	}
}