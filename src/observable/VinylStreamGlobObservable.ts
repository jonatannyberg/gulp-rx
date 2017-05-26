

import { IScheduler } from 'rxjs/Scheduler';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { TeardownLogic } from 'rxjs/Subscription';

import * as Vinyl from 'vinyl';
import * as vfs from 'vinyl-fs';

export interface ISourceOptions extends vfs.SrcOptions { }
export class VinylStreamGlobObservable extends Observable<Vinyl> {

	static create(glob: string | string[], options?: ISourceOptions, scheduler?: IScheduler): Observable<Vinyl> {
		return new VinylStreamGlobObservable(glob, options, scheduler);
	}

	private constructor(private glob: string | string[], private options?: ISourceOptions, private scheduler?: IScheduler) {
		super();
	}

	protected _subscribe(subscriber: Subscriber<Vinyl>): TeardownLogic {
		const stream = vfs.src(this.glob, this.options);
		const scheduler = this.scheduler;

		if (scheduler == null) {
			stream.addListener('data', (data: Vinyl) => subscriber.next(data));
			stream.addListener('end', () => subscriber.complete());
			stream.addListener('error', (err: any) => subscriber.error(err));
		} else {
			stream.addListener('data', (data: Vinyl) => !subscriber.closed && subscriber.add(scheduler.schedule(subscriber.next, 0, data)));
			stream.addListener('end', () => !subscriber.closed && subscriber.add(scheduler.schedule(subscriber.complete, 0)));
			stream.addListener('error', (err: any) => !subscriber.closed && subscriber.add(scheduler.schedule(subscriber.error, 0, err)));
		}
	}
}
