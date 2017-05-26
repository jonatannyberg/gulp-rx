"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("rxjs/Observable");
const VinylStreamObservable_1 = require("../../observable/VinylStreamObservable");
Observable_1.Observable.fromVinylStream = VinylStreamObservable_1.VinylStreamObservable.create;
