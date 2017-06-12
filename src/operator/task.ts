
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeAll';

import * as Vinyl from 'vinyl';
import * as gulp from 'gulp';

export type Task = string | ((cb: (error?: Error) => void) => void) | (() => Observable<any>) | (() => Promise<any>)

export function task(this: Observable<Vinyl>, task: Task): Observable<void> {
	return this.map(() => {
		const subject = new Subject<void>();

		try {
			const emitter = gulp.series(<any>task);

			(<any>emitter)((err: Error) => {
				if (err) {
					subject.error(err);
				}
				else {
					subject.next();
					subject.complete();
				}
			});
		} catch (e) {
			subject.error(e);
		}

		return subject.map(() => { return; });
	}).mergeAll();
}
