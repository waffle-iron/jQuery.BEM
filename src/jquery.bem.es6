($=>{
    const nameSpace = 'BEM';
    const BEMRegExp = /(^[a-z][a-z0-9]*(?:[-|_][a-z0-9]+)*)(?:_{2}([a-z0-9]+(?:[-|_][a-z0-9]+)*))?(?:-{2}([a-z0-9]+(?:[-|_][a-z0-9]+)*))?$/;

    const BEMMatch = className => BEMRegExp.exec(className);
    const BEMType = bemMatch => bemMatch ? bemMatch[3] ? 'modifier' : bemMatch[2] ? 'element' : 'block' : '';
    const BEMName = bemMatch => bemMatch ? bemMatch[3] || bemMatch[2] || bemMatch[1] : '';
    const BEMFullName = bemMatch => bemMatch ? bemMatch.input : '';
    const BEMBlockName = bemMatch => bemMatch ? bemMatch[1] : '';

    const elementToClassList = element => (element.attr('class')||'').split(' ');
    const classListToModifierList = classNameList => {
        let modifierList = [];
        for (let i = 0; i < classNameList.length; i++) {
            let modifier = BEMObject(classNameList[i]);
            if (modifier.type === 'modifier') modifierList.push(modifier.name);
        }
        return modifierList;
    };

    const BEMObject = className => {
        const bemMatch = BEMMatch(className);
        console.log(bemMatch);
        return {
            'type' : BEMType(bemMatch),
            'name' : BEMName(bemMatch),
            'fullName' : BEMFullName(bemMatch),
            'blockName' : BEMBlockName(bemMatch)
        };
    };

    class BEM{
        constructor($elments, option) {
            this._target = $($elments[0]);
            this._option = option;
            this._init();
        }

        _parse() {
            let classList = elementToClassList(this._target);
            this._BEMObject = BEMObject(classList.shift());
            this._BEMObject.modifier = classListToModifierList(classList);
            return this;
        }
        _init() { return this._parse(); }
        _update() { return this._parse(); }

        //properties
        blockName(){
            return this._BEMObject.blockName;
        }
        fullName(){
            return this._BEMObject.fullName;
        }
        type(){
            return this._BEMObject.type;
        }
        name(){
            return this._BEMObject.name;
        }
        modifierList(){
            return this._BEMObject.modifier;
        }

        //state
        isBlock(){
            return this.type() === 'block';
        }
        isElement(){
            return this.type() === 'element';
        }
        isModified(){
            return this.modifierList().length > 0;
        }
        hasModifier(modifierName){
            return !! $.inArray(modifierName, this.modifierList());
        }

        //manupilation
        toggleModifier(modifierName) {
            this.element.toggleClass(this.fullName() + '--' + modifierName);
            return this._update();
        }

        addModifier(modifierName) {
            this.element.addClass(this.fullName() + '--' + modifierName);
            return this._update();
        }

        removeModifier(modifierName) {
            this.element.removeClass(this.fullName() + '--' + modifierName);
            return this._update();
        }

        clearModifier() {
            this.element.attr('class',this.fullName());
            return this._update();
        }

        modifyTo(modifierName) {
            return this.clearModifier().addModifier(modifierName);
        }

        elementList(elementName){
            return this._target.find('[class^=' + this.blockName() + '__' + (elementName || '') + ']');
        }
    }

    $.fn[nameSpace] = function(option) {
        return new BEM(this, $.extend({}, option, {}));
    };
})(jQuery);