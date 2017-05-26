import { VinylStreamGlobObservable } from '../../observable/VinylStreamGlobObservable';
declare module 'rxjs/Observable' {
    namespace Observable {
        let fromGlob: typeof VinylStreamGlobObservable.create;
    }
}
