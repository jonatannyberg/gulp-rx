"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rx_1 = require("rxjs/Rx");
const assert = require("assert");
require("../");
const gulp = require("gulp");
describe('Observable.task', () => {
    describe('Execution', () => {
        it('named task', () => __awaiter(this, void 0, void 0, function* () {
            const complete = new Rx_1.Subject();
            const callback = new Rx_1.Subject();
            const next = new Rx_1.Subject();
            gulp.task('test-task-one', (cb) => {
                callback.next();
                cb();
            });
            Rx_1.Observable.of({})
                .task('test-task-one')
                .subscribe({
                error: err => { throw err; },
                next: value => next.next(value),
                complete: () => complete.next()
            });
            return Rx_1.Observable.zip(complete, callback, next).take(1).toPromise();
        }));
        it('anonymous task', () => __awaiter(this, void 0, void 0, function* () {
            const complete = new Rx_1.Subject();
            const callback = new Rx_1.Subject();
            const next = new Rx_1.Subject();
            Rx_1.Observable.of({})
                .task((cb) => {
                callback.next();
                cb();
            })
                .subscribe({
                error: err => { throw err; },
                next: value => next.next(value),
                complete: () => complete.next()
            });
            return Rx_1.Observable.zip(complete, callback, next).take(1).toPromise();
        }));
        it('anonymous promise based task', () => __awaiter(this, void 0, void 0, function* () {
            const complete = new Rx_1.Subject();
            const callback = new Rx_1.Subject();
            const next = new Rx_1.Subject();
            Rx_1.Observable.of({})
                .task(() => new Promise((resolve) => {
                callback.next();
                resolve();
            }))
                .subscribe({
                error: err => { throw err; },
                next: value => next.next(value),
                complete: () => complete.next()
            });
            return Rx_1.Observable.zip(complete, callback, next).take(1).toPromise();
        }));
        it('anonymous observable based task', () => __awaiter(this, void 0, void 0, function* () {
            const complete = new Rx_1.Subject();
            const callback = new Rx_1.Subject();
            const next = new Rx_1.Subject();
            Rx_1.Observable.of({})
                .task(() => Rx_1.Observable.of({}).do(() => callback.next()))
                .subscribe({
                error: err => { throw err; },
                next: value => next.next(value),
                complete: () => complete.next()
            });
            return Rx_1.Observable.zip(complete, callback, next).take(1).toPromise();
        }));
    });
    describe('Exception propagation', () => {
        beforeEach(() => {
            // Capture error to prevent gulp from halting
            // NOTE: this is for testing purposes, this is handled by gulp when running from the terminal
            gulp.once('error', () => { });
        });
        it('named task (err passed to cb)', () => __awaiter(this, void 0, void 0, function* () {
            const errorSubject = new Rx_1.Subject();
            let error;
            gulp.task('test-task-one', (cb) => {
                error = new Error('Some message');
                cb(error);
            });
            Rx_1.Observable.of({})
                .task('test-task-one')
                .subscribe({
                error: e => {
                    assert.equal(e, error);
                    errorSubject.next();
                }
            });
            return errorSubject.take(1).toPromise();
        }));
        it('named task (err thrown)', () => __awaiter(this, void 0, void 0, function* () {
            const errorSubject = new Rx_1.Subject();
            let error;
            gulp.task('test-task-one', () => {
                error = new Error('Some message');
                throw error;
            });
            Rx_1.Observable.of({})
                .task('test-task-one')
                .subscribe({
                error: e => {
                    assert.equal(e, error);
                    errorSubject.next();
                }
            });
            return errorSubject.take(1).toPromise();
        }));
        it('anonymous task (err passed to cb)', () => __awaiter(this, void 0, void 0, function* () {
            const errorSubject = new Rx_1.Subject();
            let error;
            Rx_1.Observable.of({})
                .task((cb) => {
                error = new Error('Some message');
                cb(error);
            })
                .subscribe({
                error: e => {
                    assert.equal(e, error);
                    errorSubject.next();
                }
            });
            return errorSubject.take(1).toPromise();
        }));
        it('anonymous task (err thrown)', () => __awaiter(this, void 0, void 0, function* () {
            const errorSubject = new Rx_1.Subject();
            let error;
            Rx_1.Observable.of({})
                .task(() => {
                error = new Error('Some message');
                throw error;
            })
                .subscribe({
                error: e => {
                    assert.equal(e, error);
                    errorSubject.next();
                }
            });
            return errorSubject.take(1).toPromise();
        }));
        it('anonymous promise based task (err passed to reject)', () => __awaiter(this, void 0, void 0, function* () {
            const errorSubject = new Rx_1.Subject();
            let error;
            Rx_1.Observable.of({})
                .task(() => new Promise((resolve, reject) => {
                error = new Error('Some message');
                (reject(error) || true) || resolve();
            }))
                .subscribe({
                error: e => {
                    assert.equal(e, error);
                    errorSubject.next();
                }
            });
            return errorSubject.take(1).toPromise();
        }));
        it('anonymous promise based task (err thrown)', () => __awaiter(this, void 0, void 0, function* () {
            const errorSubject = new Rx_1.Subject();
            let error;
            Rx_1.Observable.of({})
                .task(() => new Promise(() => {
                error = new Error('Some message');
                throw error;
            }))
                .subscribe({
                error: e => {
                    assert.equal(e, error);
                    errorSubject.next();
                }
            });
            return errorSubject.take(1).toPromise();
        }));
        it('anonymous observable based task (err thrown)', () => __awaiter(this, void 0, void 0, function* () {
            const errorSubject = new Rx_1.Subject();
            let error;
            Rx_1.Observable.of({})
                .task(() => Rx_1.Observable.of({}).map(() => {
                error = new Error('Some message');
                throw error;
            }))
                .subscribe({
                error: e => {
                    assert.equal(e, error);
                    errorSubject.next();
                }
            });
            return errorSubject.take(1).toPromise();
        }));
    });
});
