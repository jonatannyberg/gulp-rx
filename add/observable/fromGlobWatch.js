"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("rxjs/Observable");
const VinylStreamGlobWatchObservable_1 = require("../../observable/VinylStreamGlobWatchObservable");
Observable_1.Observable.fromGlobWatch = VinylStreamGlobWatchObservable_1.VinylStreamGlobWatchObservable.create;
