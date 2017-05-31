

import { Observable } from 'rxjs/Observable';
import * as Vinyl from 'vinyl';
import * as vfs from 'vinyl-fs';

export interface IWriteOptions {
	cwd?: string;
	mode?: number | string;
	dirMode?: number | string;
	overwrite?: boolean;
}

export function write(this: Observable<Vinyl>, path: string, options?: IWriteOptions): Observable<Vinyl> {
	return Observable.fromVinylStream(this.toVinylStream().pipe(vfs.dest(path, options)));
}
