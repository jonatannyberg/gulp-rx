"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("rxjs/Observable");
const VinylStreamGlobObservable_1 = require("../../observable/VinylStreamGlobObservable");
Observable_1.Observable.fromGlob = VinylStreamGlobObservable_1.VinylStreamGlobObservable.create;
