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
		.do(file => console.log(file.path))
		.pipe(ts())
		.write('./'));

const tsTest = typescript.createProject('test/tsconfig.json');
gulp.task(`build-test`, () =>
	Observable
		.fromVinylStream(tsTest.src())
		.map(file => {
			file.contents
		})
		.pipe(tsTest())
		.write('./test'));

gulp.task('watch', () => {

	const streams = Observable.fromGlobWatch(['**/*.ts', '!**/*.d.ts'])
		.debounceTime(200)
		.partition(file => file.path.indexOf('test') < 0);

	return Observable.merge(
		streams[0]
			.do(file => console.log(`File ${file.path} changed! Running build`))
			.task('build'),

		streams[1]
			.do(file => console.log(`File ${file.path} changed! Running build-test`))
			.task('build-test'));
});

//gulp.task('watch', () => gulp.watch('src/**/*.ts', { delay: 100 }, gulp.series('build')));
gulp.task('watch-test', () => gulp.watch(['test/**/*.ts', '!test/**/*.d.ts'], { delay: 100 }, gulp.series('build-test')));
