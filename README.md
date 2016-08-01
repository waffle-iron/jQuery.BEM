# jQuery.BEM

## install
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script src="/dist/jquery.bem.min.js"></script>
```
load javascript file with jQuery.

## usage
### initialize BEM object
```javascript
var heading = $('.bem-heading').BEM();
```

- return BEM object from first item of result of `jQuery()`.
- require BEM style named class attribute.

### use functions
```javascript
heading.addModifer(active);
```
this is example.

## supported BEM style

### nameing rule

```css
.block{}
.block.block--modifier{}
.block__element{}
.block__element.block__element--modifier{}
.long-name__item-is--like-this{}
.long_name__item_is--like_this{}
```

### other

- `block` not allow nesting (`element` can be)
- modifier's key / value naming pattern is not supported

## functions

### basic properties access

- __blockName()__ BEM block name

```javascirpt
var foo = $('.foo').BEM();
console.log(foo.blockName()); //'foo'

var foo = $('.foo__bar').BEM();
console.log(foo.blockName()); //'foo'
```

- __fullName()__ element or block name(without modifier)

```javascirpt
var foo = $('.foo').BEM();
console.log(foo.fullName()); //'foo'

var foo = $('.foo__bar').BEM();
console.log(foo.fullName()); //'foo__bar'

var foo = $('.foo--baz').BEM();
console.log(foo.fullName()); //'foo'

var foo = $('.foo__bar--qux').BEM();
console.log(foo.fullName()); //'foo__bar'
```

- __type()__ block | element

```javascirpt
var foo = $('.foo').BEM();
console.log(foo.type()); //'block'

var foo = $('.foo__bar').BEM();
console.log(foo.type()); //'element'

var foo = $('.foo--baz').BEM();
console.log(foo.type()); //'block'

var foo = $('.foo__bar--qux').BEM();
console.log(foo.type()); //'element'
```

- __name()__ 

```javascript
var foo = $('.foo').BEM();
console.log(foo.name()); //'foo'

var foo = $('.foo__bar').BEM();
console.log(foo.name()); //'bar'

var foo = $('.foo--baz').BEM();
console.log(foo.name()); //'foo'

var foo = $('.foo__bar--qux').BEM();
console.log(foo.name()); //'bar'
```

- __modifierList()__ 

```html
<p class="foo">lorem...</p>
<p class="bar bar--baz">lorem...</p>
<p class="qux qux--foobar qux--bazqux">lorem...</p>
```

```javascript
var foo = $('.foo').BEM();
var bar = $('.bar').BEM();
var qux = $('.qux').BEM();

console.log(foo.modifierList()); //[]
console.log(bar.modifierList()); //['baz']
console.log(qux.modifierList()); //['foobar', 'bazqux']
```

### state

- __isBlock()__ 

```javascirpt
var foo = $('.foo').BEM();
console.log(foo.isBlock()); //true

var foo = $('.foo__bar').BEM();
console.log(foo.isBlock()); //false
```

- __isElement()__ 

```javascirpt
var foo = $('.foo').BEM();
console.log(foo.isElement()); //false

var foo = $('.foo__bar').BEM();
console.log(foo.isElement()); //true
```

- __isModified()__ 

```html
<p class="foo">lorem...</p>
<p class="bar bar--baz">lorem...</p>
```

```javascirpt
var foo = $('.foo').BEM();
var bar = $('.bar').BEM();

console.log(foo.isModified()); //false
console.log(bar.isModified()); //true
```

- __hasModifier(modifierName)__ 

```html
<p class="bar bar--baz bar--foo">lorem...</p>
<p class="qux qux--foobar qux--bazqux">lorem...</p>
```

```javascirpt
var foo = $('.foo').BEM();
var qux = $('.qux').BEM();

console.log(foo.hasModifier('baz')); //true
console.log(qux.hasModifier('baz')); //false
```

### manupilation
- __toggleModifier(modifierName)__

```html
<p class="foo">lorem...</p>
<p class="bar bar--baz">lorem...</p>
```

```javascirpt
var foo = $('.foo').BEM();
var bar = $('.bar').BEM();

foo.toggleModifier('baz');
baz.toggleModifier('baz');
```

then

```html
<p class="foo foo--baz">lorem...</p>
<p class="bar">lorem...</p>
```

- __addModifier(modifierName)__ 

```html
<p class="foo">lorem...</p>
```

```javascirpt
var foo = $('.foo').BEM();
foo.addModifier('baz');
```

then

```html
<p class="foo foo--baz">lorem...</p>
```

- __removeModifier(modifierName)__ 

```html
<p class="foo foo--baz">lorem...</p>
```

```javascirpt
var foo = $('.foo').BEM();
foo.removeModifier('baz');
```

then

```html
<p class="foo">lorem...</p>
```

- __clearModifier()__ 

```html
<p class="foo foo--bar foo--baz foo--qux">lorem...</p>
```

```javascirpt
var foo = $('.foo').BEM();
foo.clearModifier();
```

then

```html
<p class="foo">lorem...</p>
```

- __modifyTo(modifierName)__ 

```html
<p class="foo foo--bar foo--baz">lorem...</p>
```

```javascirpt
var foo = $('.foo').BEM();
foo.modifyTo('qux');
```

then

```html
<p class="foo foo--qux">lorem...</p>
```

### utility
- __elementList(elementName)__ 

```html
<section class="foo">
    <h1 class="foo__heading">this is heading</h1>
    <p class="foo__content">lorem...</p>
    <small>this is note...</small>
    <img class="foo__figure" src="...">
</section>
```

```javascript
var foo = $('.foo').BEM();
console.log(foo.elementList());//[<h1 class="foo__heading">...</h1>, <p class="foo__content">...</p>, <img class="foo__figure">]
```
return as `$('.foo').find('[class^=foo__]');`