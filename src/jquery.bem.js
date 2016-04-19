($=>{
    const nameSpace = 'BEM';
    const BEMPattern = /(^[a-z][a-z0-9]*(?:-[a-z0-9]+)*)(?:_{2}([a-z0-9]*(?:-[a-z0-9]+)*))?(?:-{2}([a-z0-9]*(?:-[a-z0-9]+)*))?$/;
    const _classAttributeList = element => (element.attr('class')||'').split(' ');
    const _BEMClassPatternMatch = className => BEMPattern.exec(className);
    const _BEMClassType = matchResult => matchResult[3] ? 'modifier' : matchResult[2] ? 'element' : 'block';
    const _BEMClassName = matchResult => matchResult[3] || matchResult[2] || matchResult[1];
    const _BEMClassFullName = matchResult => matchResult.input;
    const _BEMClassBlockName = matchResult => matchResult[1];
    const _BEMClassModifierList = classNameList => {
        let modifierList = [];
        for (let i = 0; i < classNameList.length; i++) {
            let modifier = _BEMClass(classNameList[i]);
            if (modifier.type === 'modifier') modifierList.push(modifier.name);
        }
        return modifierList;
    };
    const _BEMClass = className => {
        const matchResult = _BEMClassPatternMatch(className);
        return {
            'type' : _BEMClassType(matchResult),
            'name' : _BEMClassName(matchResult),
            'fullName' : _BEMClassFullName(matchResult),
            'blockName' : _BEMClassBlockName(matchResult)
        };
    };

    class BEM{
        constructor(elementList, option) {
            this.elementList = elementList;
            this.elementList.data(nameSpace, this);
            this.element = $(elementList[0]);
            this.option = option;
            this.init();
        }

        parse() {
            let classList = classAttributeList($(this.element));
            this.BEMClass = _BEMClass(classList.shift());
            this.BEMClass.modifier = _BEMClassModifierList(classList);
            return this;
        }
        init() { return this.parse(); }
        update() { return this.parse(); }

        toggleModifier(modifierName) {
            this.element.toggleClass(this.BEMClass.fullName + '--' + modifierName);
            return this.update();
        }

        addModifier(modifierName) {
            this.element.addClass(this.BEMClass.fullName + '--' + modifierName);
            return this.update();
        }

        removeModifier(modifierName) {
            this.element.removeClass(this.BEMClass.fullName + '--' + modifierName);
            return this.update();
        }

        clearModifier(modifierName) {
            this.element.attr('class',this.BEMClass.fullName);
            return this.update();
        }
    }

    $.fn[nameSpace] = function(option) {
        return new BEM(this, $.extend({}, option, {}));
    };
})(jQuery);