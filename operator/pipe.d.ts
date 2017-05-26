/// <reference types="vinyl" />
/// <reference types="node" />
import { Observable } from 'rxjs/Observable';
import * as Vinyl from 'vinyl';
export declare function pipe(this: Observable<Vinyl>, destination: NodeJS.ReadWriteStream): Observable<Vinyl>;
