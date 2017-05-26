"use strict"

const gulp = require('gulp');
const typescript = require('gulp-typescript');
const merge = require('merge2');

const ts = typescript.createProject('tsconfig.json');
gulp.task(`build`, () => {
	const result = ts.src().pipe(ts());
	return merge([
		result.dts.pipe(gulp.dest('./')),
		result.js.pipe(gulp.dest('./')),
	]);
});

const tsTest = typescript.createProject('test/tsconfig.json');
gulp.task(`build-test`, () => {
	const result = tsTest.src().pipe(tsTest());
	return merge([
		result.dts.pipe(gulp.dest('./test')),
		result.js.pipe(gulp.dest('./test')),
	]);
});

gulp.task('watch', () => gulp.watch('src/**/*.ts', { delay: 100 }, gulp.series('build')));
gulp.task('watch-test', () => gulp.watch(['test/**/*.ts', '!test/**/*.d.ts'], { delay: 100 }, gulp.series('build-test')));

