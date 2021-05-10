"use strict";
exports.__esModule = true;
var Suma = /** @class */ (function () {
    function Suma(a, b) {
        var _this = this;
        this.resultado = function () {
            return _this.sumando1 + _this.sumando2;
        };
        this.sumando1 = a;
        this.sumando2 = b;
    }
    return Suma;
}());
exports["default"] = Suma;
