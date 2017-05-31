/// <reference types="vinyl" />
import { Observable } from 'rxjs/Observable';
import * as Vinyl from 'vinyl';
export interface IWriteOptions {
    cwd?: string;
    mode?: number | string;
    dirMode?: number | string;
    overwrite?: boolean;
}
export declare function write(this: Observable<Vinyl>, path: string, options?: IWriteOptions): Observable<Vinyl>;
