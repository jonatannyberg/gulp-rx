/// <reference types="vinyl" />
import { Observable } from 'rxjs/Observable';
import * as Vinyl from 'vinyl';
export declare function pipe(this: Observable<Vinyl>, destination: any): Observable<Vinyl>;
