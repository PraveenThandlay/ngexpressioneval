(function(angular) {
  'use strict';
var myApp = angular.module('ExpEvaluation', []);

myApp.controller('expressionEvalController', ['$scope', function($scope) {
 var org;
    $scope.expressionEval = function() {
        var value=org.jsweet.ExpressionManipulation.eval($scope.expression);
        $scope.expressionValue=value;
        
    };
    
   
(function(org) {
    var jsweet;
    (function(jsweet) {

        var ExpressionManipulation = (function() {
            function ExpressionManipulation() {}
            ExpressionManipulation.eval = function(str) {
                return new ExpressionManipulation.ExpressionManipulation$0(str).parse();
            };
            return ExpressionManipulation;
        }());
        jsweet.ExpressionManipulation = ExpressionManipulation;
        ExpressionManipulation["__class"] = "org.jsweet.ExpressionManipulation";
        var ExpressionManipulation;
        (function(ExpressionManipulation) {
            var ExpressionManipulation$0 = (function() {
                function ExpressionManipulation$0(str) {
                    this.str = str;
                    this.pos = -1;
                    this.ch = 0;
                }
                ExpressionManipulation$0.prototype.nextChar = function() {
                    this.ch = (++this.pos < this.str.length) ? this.str.charAt(this.pos) : -1;
                };
                ExpressionManipulation$0.prototype.eat = function(charToEat) {
                    while ((this.ch === ' '))
                        this.nextChar();
                    if (this.ch === charToEat) {
                        this.nextChar();
                        return true;
                    }
                    return false;
                };
                ExpressionManipulation$0.prototype.parse = function() {
                    this.nextChar();
                    var x = this.parseExpression();
                    if (this.pos < this.str.length)
                        return "not valid expression"
                    return x;
                };
                ExpressionManipulation$0.prototype.parseExpression = function() {
                    var x = this.parseTerm();
                    for (;;) {
                        if (this.eat(('+')))
                            x += this.parseTerm();
                        else if (this.eat(('-')))
                            x -= this.parseTerm();
                        else
                            return x;
                    }
                };
                ExpressionManipulation$0.prototype.parseTerm = function() {
                    var x = this.parseFactor();
                    for (;;) {
                        if (this.eat(('*')))
                            x *= this.parseFactor();
                        else if (this.eat(('/')))
                            x /= this.parseFactor();
                        else if (this.eat(('^')))
                            x = Math.pow(x, this.parseFactor());
                        else
                            return x;
                    }
                };
                ExpressionManipulation$0.prototype.parseFactor = function() {
                    if (this.eat(('+')))
                        return this.parseFactor();
                    if (this.eat(('-')))
                        return -this.parseFactor();
                    var x;
                    var startPos = this.pos;
                    if (this.eat(('('))) {
                        x = this.parseExpression();
                        this.eat((')'));
                    } else if ((this.ch >= ('0') && this.ch <= ('9')) || this.ch==='.') {
                        while ((this.ch >= ('0') && this.ch <= ('9')) || this.ch==='.')
                            this.nextChar();
                        x = parseFloat(this.str.substring(startPos, this.pos));
                    } else if (this.ch >= ('a') && this.ch <= ('z')) {
                        while ((this.ch >= ('a') && this.ch <= ('z')))
                            this.nextChar();
                        var func = this.str.substring(startPos, this.pos);
                        x = this.parseFactor();
                        if ((func === "sqrt"))
                            x = Math.sqrt(x);
                        else if ((func === "sin"))
                            x = Math.sin( /* toRadians */ (function(x) {
                                return x * Math.PI / 180;
                            })(x));
                        else if ((func === "cos"))
                            x = Math.cos( /* toRadians */ (function(x) {
                                return x * Math.PI / 180;
                            })(x));
                        else if ((func === "tan"))
                            x = Math.tan( /* toRadians */ (function(x) {
                                return x * Math.PI / 180;
                            })(x));
                        else
                            return "not valid";
                    } else {
                        return "not valid";
                    }
                    return x;
                };
                return ExpressionManipulation$0;
            }());
            ExpressionManipulation.ExpressionManipulation$0 = ExpressionManipulation$0;
        })(ExpressionManipulation = jsweet.ExpressionManipulation || (jsweet.ExpressionManipulation = {}));
    })(jsweet = org.jsweet || (org.jsweet = {}));
})(org || (org = {}));

}]);
})(window.angular);

