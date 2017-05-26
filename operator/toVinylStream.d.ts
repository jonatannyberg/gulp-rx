/// <reference types="vinyl" />
/// <reference types="node" />
import { Observable } from 'rxjs/Observable';
import * as Vinyl from 'vinyl';
export declare function toVinylStream(this: Observable<Vinyl>): NodeJS.ReadWriteStream;
