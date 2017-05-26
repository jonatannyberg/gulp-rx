
import { IScheduler } from 'rxjs/Scheduler';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { TeardownLogic } from 'rxjs/Subscription';

import * as Vinyl from 'vinyl';

export class VinylStreamObservable extends Observable<Vinyl> {

	static create(stream: NodeJS.ReadWriteStream, scheduler?: IScheduler): Observable<Vinyl> {
		stream.pause();
		return new VinylStreamObservable(stream, scheduler);
	}

	protected constructor(private stream: NodeJS.ReadWriteStream, private scheduler?: IScheduler) {
		super();
	}

	protected _subscribe(subscriber: Subscriber<Vinyl>): TeardownLogic {
		const stream = this.stream;
		const scheduler = this.scheduler;

		if (scheduler == null) {

			stream.addListener('data', (data: Vinyl) => subscriber.next(data));
			stream.addListener('end', () => subscriber.complete());
			stream.addListener('error', (err: any) => subscriber.error(err));

		} else {

			stream.addListener('data', (data: Vinyl) => {
				if (!subscriber.closed)
					subscriber.add(scheduler.schedule(subscriber.next, 0, data));
			});

			stream.addListener('end', () => {
				if (!subscriber.closed)
					subscriber.add(scheduler.schedule(subscriber.complete, 0));
			});

			stream.addListener('error', (err: any) => {
				if (!subscriber.closed)
					subscriber.add(scheduler.schedule(subscriber.error, 0, err));
			});
		}

		stream.resume();
	}
}
