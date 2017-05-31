
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeAll';

import * as Vinyl from 'vinyl';
import * as gulp from 'gulp';
//import * as Orchestrator from 'Orchestrator';

export function task(this: Observable<Vinyl>, task: string | Function): Observable<void> {
	return this.map(() => {
		const subject = new Subject<void>();
		const done = (cb: Function) => {
			subject.next();
			subject.complete();
			cb();
		}

		((<any>gulp).series(task, done))();

		return subject.map(() => { return; });
	}).mergeAll();
}
