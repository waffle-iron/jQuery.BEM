'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function ($) {
    var nameSpace = 'BEM';
    var BEMPattern = /(^[a-z][a-z0-9]*(?:-[a-z0-9]+)*)(?:_{2}([a-z0-9]*(?:-[a-z0-9]+)*))?(?:-{2}([a-z0-9]*(?:-[a-z0-9]+)*))?$/;
    var _classAttributeList = function _classAttributeList(element) {
        return (element.attr('class') || '').split(' ');
    };
    var _BEMClassPatternMatch = function _BEMClassPatternMatch(className) {
        return BEMPattern.exec(className);
    };
    var _BEMClassType = function _BEMClassType(matchResult) {
        return matchResult[3] ? 'modifier' : matchResult[2] ? 'element' : 'block';
    };
    var _BEMClassName = function _BEMClassName(matchResult) {
        return matchResult[3] || matchResult[2] || matchResult[1];
    };
    var _BEMClassFullName = function _BEMClassFullName(matchResult) {
        return matchResult.input;
    };
    var _BEMClassBlockName = function _BEMClassBlockName(matchResult) {
        return matchResult[1];
    };
    var _BEMClassModifierList = function _BEMClassModifierList(classNameList) {
        var modifierList = [];
        for (var i = 0; i < classNameList.length; i++) {
            var modifier = _BEMClass(classNameList[i]);
            if (modifier.type === 'modifier') modifierList.push(modifier.name);
        }
        return modifierList;
    };
    var _BEMClass = function _BEMClass(className) {
        var matchResult = _BEMClassPatternMatch(className);
        return {
            'type': _BEMClassType(matchResult),
            'name': _BEMClassName(matchResult),
            'fullName': _BEMClassFullName(matchResult),
            'blockName': _BEMClassBlockName(matchResult)
        };
    };

    var BEM = function () {
        function BEM(elementList, option) {
            _classCallCheck(this, BEM);

            this.elementList = elementList;
            this.elementList.data(nameSpace, this);
            this.element = $(elementList[0]);
            this.option = option;
            this.init();
        }

        _createClass(BEM, [{
            key: 'parse',
            value: function parse() {
                var classList = classAttributeList($(this.element));
                this.BEMClass = _BEMClass(classList.shift());
                this.BEMClass.modifier = _BEMClassModifierList(classList);
                return this;
            }
        }, {
            key: 'init',
            value: function init() {
                return this.parse();
            }
        }, {
            key: 'update',
            value: function update() {
                return this.parse();
            }
        }, {
            key: 'toggleModifier',
            value: function toggleModifier(modifierName) {
                this.element.toggleClass(this.BEMClass.fullName + '--' + modifierName);
                return this.update();
            }
        }, {
            key: 'addModifier',
            value: function addModifier(modifierName) {
                this.element.addClass(this.BEMClass.fullName + '--' + modifierName);
                return this.update();
            }
        }, {
            key: 'removeModifier',
            value: function removeModifier(modifierName) {
                this.element.removeClass(this.BEMClass.fullName + '--' + modifierName);
                return this.update();
            }
        }, {
            key: 'clearModifier',
            value: function clearModifier(modifierName) {
                this.element.attr('class', this.BEMClass.fullName);
                return this.update();
            }
        }]);

        return BEM;
    }();

    $.fn[nameSpace] = function (option) {
        return new BEM(this, $.extend({}, option, {}));
    };
})(jQuery);