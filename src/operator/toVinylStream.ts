
import { Observable } from 'rxjs/Observable';
import * as Vinyl from 'vinyl';
import * as through from 'through2';

export function toVinylStream(this: Observable<Vinyl>): NodeJS.ReadWriteStream {

	var options = {
		//read: true,
		buffer: true,
		stripBOM: true,
		// sourcemaps: false,
		// passthrough: false,
		// followSymlinks: true,
		objectMode: true
	};;

	const stream = through(options);

	this.subscribe({
		next: data => stream.write(data),
		error: stream.emit.bind(stream, 'error'),
		complete: () => stream.end()
	});

	return stream;
}
