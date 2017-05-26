"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rx_1 = require("rxjs/Rx");
require("../");
const vfs = require("vinyl-fs");
const path = require("path");
const assert = require("assert");
const fs = require("fs");
const oldCwd = process.cwd();
describe('Observable', () => {
    before(done => {
        process.chdir(path.join(oldCwd, 'test'));
        fs.mkdirSync('test-files');
        fs.writeFileSync('test-files/some-file.txt', 'file content here');
        done();
    });
    after(done => {
        fs.unlinkSync('test-files/some-file.txt');
        fs.rmdirSync('test-files');
        process.chdir(oldCwd);
        done();
    });
    it('fromVinylStream', () => {
        return new Promise((resolve, reject) => {
            Rx_1.Observable.fromVinylStream(vfs.src('test-files/**/*.txt'))
                .subscribe({
                next: file => {
                    assert.equal(file.isBuffer(), true, 'File should be buffer but is not.');
                    assert.equal(String(file.contents), 'file content here', 'Faulty file content.');
                },
                complete: () => resolve(),
                error: err => reject(err)
            });
        });
    });
    it('fromGlob', () => {
        return new Promise((resolve, reject) => {
            Rx_1.Observable.fromGlob('test-files/**/*.txt')
                .subscribe({
                next: file => {
                    assert.equal(file.isBuffer(), true, 'File should be buffer but is not.');
                    assert.equal(String(file.contents), 'file content here', 'Faulty file content.');
                },
                complete: () => resolve(),
                error: err => reject(err)
            });
        });
    });
    it('fromGlobWatch', () => {
        return new Promise((resolve, reject) => {
            Rx_1.Observable.fromGlobWatch('**/*.txt')
                .take(2)
                .subscribe({
                complete: () => resolve(),
                error: err => reject(err)
            });
            fs.writeFileSync('test.txt', 'some content');
            Rx_1.Observable.timer(300).take(1).subscribe(() => fs.unlinkSync('test.txt'));
        });
    });
    it('toVinylStream', () => {
        return new Promise((resolve, reject) => {
            Rx_1.Observable.fromVinylStream(Rx_1.Observable.fromGlob('test-files/**/*.txt')
                .toVinylStream()
                .pipe(vfs.dest('test-files/result')))
                .subscribe({
                complete: () => {
                    assert.equal(fs.existsSync('test-files/result/some-file.txt'), true, `Expected file 'test-files/result/some-file.txt', but it does not exist.`);
                    fs.unlinkSync('test-files/result/some-file.txt');
                    fs.rmdirSync('test-files/result');
                    resolve();
                },
                error: err => reject(err)
            });
        });
    });
    it('pipe', () => {
        return new Promise((resolve, reject) => {
            Rx_1.Observable.fromGlob('test-files/**/*.txt')
                .filter(file => file.isBuffer())
                .pipe(vfs.dest('test-files/result'))
                .do(file => {
                assert.equal(file.isBuffer(), true);
                assert.equal(String(file.contents), 'file content here', 'Faulty file content.');
            })
                .subscribe({
                complete: () => {
                    assert.equal(fs.existsSync('test-files/result/some-file.txt'), true, `Expected file 'test-files/result/some-file.txt', but it does not exist.`);
                    fs.unlinkSync('test-files/result/some-file.txt');
                    fs.rmdirSync('test-files/result');
                    resolve();
                },
                error: err => reject(err)
            });
        });
    });
    it('Alter file content with map', () => {
        return new Promise(resolve => {
            Rx_1.Observable.fromGlob('test-files/**/*.txt')
                .filter(file => file.isBuffer())
                .map(file => {
                file.contents = new Buffer(String(file.contents).replace(`file`, `new file`));
                return file;
            })
                .subscribe({
                next: file => {
                    assert.equal(file.isBuffer(), true, 'File should be buffer but is not.');
                    assert.equal(String(file.contents), 'new file content here', 'Faulty file content.');
                },
                complete: () => resolve()
            });
        });
    });
});
