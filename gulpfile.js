"use strict"

const gulp = require('gulp');
const typescript = require('gulp-typescript');
const merge = require('merge2');

const Rx = require("rxjs/Rx");
require("./");
const Observable = Rx.Observable;

const ts = typescript.createProject('tsconfig.json');
gulp.task(`build`, () =>
	Observable
		.fromVinylStream(ts.src())
		.pipe(ts())
		.write('./'));

const tsTest = typescript.createProject('test/tsconfig.json');
gulp.task(`build-test`, () =>
	Observable
		.fromVinylStream(tsTest.src())
		.pipe(tsTest())
		.write('./test'));

gulp.task('watch', () => {
	const streams = Observable.fromGlobWatch(['**/*.ts', '!**/*.d.ts'])
		.debounceTime(200)
		.partition(file => file.path.indexOf('test') < 0);
	return Observable.merge(streams[0].task('build'), streams[1].task('build-test'));
});