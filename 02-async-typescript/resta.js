"use strict";
exports.__esModule = true;
var Resta = /** @class */ (function () {
    function Resta(a, b) {
        var _this = this;
        this.resultado = function () {
            return _this.minuendo - _this.sustraendo;
        };
        this.minuendo = a;
        this.sustraendo = b;
    }
    return Resta;
}());
exports["default"] = Resta;
