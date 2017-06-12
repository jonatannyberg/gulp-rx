
import { Observable, Subject } from 'rxjs/Rx';
import * as assert from 'assert';
import '../';

import * as gulp from 'gulp';

describe('Observable.task', () => {

	describe('Execution', () => {

		it('named task', async () => {

			const complete = new Subject<any>();
			const callback = new Subject<any>();
			const next = new Subject<any>();

			gulp.task('test-task-one', (cb: (err?: Error) => void) => {
				callback.next();
				cb();
			})
			Observable.of({})
				.task('test-task-one')
				.subscribe({
					error: err => { throw err; },
					next: value => next.next(value),
					complete: () => complete.next()
				});

			return Observable.zip(complete, callback, next).take(1).toPromise();
		});

		it('anonymous task', async () => {

			const complete = new Subject<any>();
			const callback = new Subject<any>();
			const next = new Subject<any>();

			Observable.of({})
				.task((cb: (err?: Error) => void) => {
					callback.next();
					cb();
				})
				.subscribe({
					error: err => { throw err; },
					next: value => next.next(value),
					complete: () => complete.next()
				});

			return Observable.zip(complete, callback, next).take(1).toPromise();
		});

		it('anonymous promise based task', async () => {

			const complete = new Subject<any>();
			const callback = new Subject<any>();
			const next = new Subject<any>();

			Observable.of({})
				.task(() => new Promise((resolve) => {
					callback.next()
					resolve();
				}))
				.subscribe({
					error: err => { throw err; },
					next: value => next.next(value),
					complete: () => complete.next()
				});

			return Observable.zip(complete, callback, next).take(1).toPromise();
		});

		it('anonymous observable based task', async () => {

			const complete = new Subject<any>();
			const callback = new Subject<any>();
			const next = new Subject<any>();

			Observable.of({})
				.task(() => Observable.of({}).do(() => callback.next()))
				.subscribe({
					error: err => { throw err; },
					next: value => next.next(value),
					complete: () => complete.next()
				});

			return Observable.zip(complete, callback, next).take(1).toPromise();
		});

	});

	describe('Exception propagation', () => {

		beforeEach(() => {
			// Capture error to prevent gulp from halting
			// NOTE: this is for testing purposes, this is handled by gulp when running from the terminal
			gulp.once('error', () => { });
		});

		it('named task (err passed to cb)', async () => {

			const errorSubject = new Subject<any>();
			let error: Error;

			gulp.task('test-task-one', (cb: (err?: Error) => void) => {
				error = new Error('Some message');
				cb(error);
			});

			Observable.of({})
				.task('test-task-one')
				.subscribe({
					error: e => {
						assert.equal(e, error);
						errorSubject.next()
					}
				});

			return errorSubject.take(1).toPromise();
		});

		it('named task (err thrown)', async () => {

			const errorSubject = new Subject<any>();
			let error: Error;

			gulp.task('test-task-one', () => {
				error = new Error('Some message');
				throw error;
			});

			Observable.of({})
				.task('test-task-one')
				.subscribe({
					error: e => {
						assert.equal(e, error);
						errorSubject.next()
					}
				});

			return errorSubject.take(1).toPromise();
		});

		it('anonymous task (err passed to cb)', async () => {

			const errorSubject = new Subject<any>();
			let error: Error;

			Observable.of({})
				.task((cb: (err?: Error) => void) => {
					error = new Error('Some message');
					cb(error);
				})
				.subscribe({
					error: e => {
						assert.equal(e, error);
						errorSubject.next()
					}
				});

			return errorSubject.take(1).toPromise();
		});

		it('anonymous task (err thrown)', async () => {

			const errorSubject = new Subject<any>();
			let error: Error;

			Observable.of({})
				.task(() => {
					error = new Error('Some message');
					throw error;
				})
				.subscribe({
					error: e => {
						assert.equal(e, error);
						errorSubject.next()
					}
				});

			return errorSubject.take(1).toPromise();
		});

		it('anonymous promise based task (err passed to reject)', async () => {

			const errorSubject = new Subject<any>();
			let error: Error;

			Observable.of({})
				.task(() => new Promise((resolve, reject) => {
					error = new Error('Some message');
					(reject(error) || true) || resolve();
				}))
				.subscribe({
					error: e => {
						assert.equal(e, error);
						errorSubject.next()
					}
				});

			return errorSubject.take(1).toPromise();
		});

		it('anonymous promise based task (err thrown)', async () => {

			const errorSubject = new Subject<any>();
			let error: Error;

			Observable.of({})
				.task(() => new Promise(() => {
					error = new Error('Some message');
					throw error;
				}))
				.subscribe({
					error: e => {
						assert.equal(e, error);
						errorSubject.next()
					}
				});

			return errorSubject.take(1).toPromise();
		});

		it('anonymous observable based task (err thrown)', async () => {

			const errorSubject = new Subject<any>();
			let error: Error;

			Observable.of({})
				.task(() => Observable.of({}).map(() => {
					error = new Error('Some message');
					throw error;
				}))
				.subscribe({
					error: e => {
						assert.equal(e, error);
						errorSubject.next()
					}
				});

			return errorSubject.take(1).toPromise();
		});

	});
});