"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const through = require("through2");
function toVinylStream() {
    var options = {
        //read: true,
        buffer: true,
        stripBOM: true,
        // sourcemaps: false,
        // passthrough: false,
        // followSymlinks: true,
        objectMode: true
    };
    ;
    const stream = through(options);
    this.subscribe({
        next: data => stream.write(data),
        error: stream.emit.bind(stream, 'error'),
        complete: () => stream.end()
    });
    return stream;
}
exports.toVinylStream = toVinylStream;
