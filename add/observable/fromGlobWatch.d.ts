import { VinylStreamGlobWatchObservable } from '../../observable/VinylStreamGlobWatchObservable';
declare module 'rxjs/Observable' {
    namespace Observable {
        let fromGlobWatch: typeof VinylStreamGlobWatchObservable.create;
    }
}
