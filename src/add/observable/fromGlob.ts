import { Observable } from 'rxjs/Observable';
import { VinylStreamGlobObservable } from '../../observable/VinylStreamGlobObservable';

Observable.fromGlob = VinylStreamGlobObservable.create;

declare module 'rxjs/Observable' {
	namespace Observable {
		export let fromGlob: typeof VinylStreamGlobObservable.create;
	}
}