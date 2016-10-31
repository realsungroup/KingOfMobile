"use strict";
var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello1, " + this.greeting;
    };
    return Greeter;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Greeter;
