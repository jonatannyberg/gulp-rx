import { VinylStreamObservable } from '../../observable/VinylStreamObservable';
declare module 'rxjs/Observable' {
    namespace Observable {
        let fromFileStream: typeof VinylStreamObservable.create;
    }
}
