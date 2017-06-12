# gulp-rx
A rxjs based vinyl stream wrapper aimed at gulp.

*This is still an early alpha version of this library!*

The goal is to provide the full flexibility that rxjs brings when working with gulp streams and tasks. 

The basics of this should work as is, but it has not been tested on a large scale with large variations of gulp plugins yet. 

The idea is to be able to do things like: 

```javascript
gulp.task(`my-task`, () =>
	Observable
		.fromGlob([`**/*.js`, `!./dest`])
		.do(file => console.log(file.path))
		.map(file => {
			const content = String(file.contents);
			content.replace('something', 'something else');
			file.contents = new Buffer(content);
			return file;
		})
		.pipe(someGulpPlugin())
		.write('./dest'));
```

Or things like: 

```javascript
const oneStream = Observable.fromGlob(`**/*.x`).pipe(somePlugin());
const twoStream = Observable.fromGlob(`**/*.y`).pipe(someOtherPlugin());

gulp.task(`my-task`, () =>
	Observable
		.merge(oneStream, twoStream)
		.filter(file => file.path.indexOf(`blah`) < 0)
		.pipe(someGulpPlugin())
		.write(`./dest`));
```

... or even things like: 

```javascript
const oneStream = Observable.fromGlob(`**/*.x`).pipe(somePlugin());
const twoStream = Observable.fromGlob(`**/*.y`).pipe(someOtherPlugin());

gulp.task(`my-task`, () =>
	Observable
		.merge(oneStream, twoStream)
		.filter(file => file.path.indexOf(`blah`) < 0)
		.pipe(someGulpPlugin())
		.task(
			gulp.series(
				`task1`, 
				gulp.parallel(`task2`, `task3`),
				`task4`))
		.do({complete: () => console.log(`And we are done..`))
```
