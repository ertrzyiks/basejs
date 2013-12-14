Base.js
======

NodeJS and browser javascript objective paradigm helper.


Base.js is Backbone's inheritance code with improvements inspired with Sencha overloading approach.

* Backbone by Jeremy Ashkenas, DocumentCloud Inc. http://backbonejs.org/
* Sencha Touch 2, Sencha Inc. http://www.sencha.com/products/touch


Script expose object 

>Base

which is parent for all defined classes. You can instantialize object of Base class as well.

### Usage ###

```javascript
/**
 * @method extend
 * @static
 * @param protoProps {Object} Prototype properties/methods
 * @param [staticProps] {Object} Static properties/methods
 * @return {Function} reference of defined class
 */
Base.extend(protoProps, [staticsProps]);

```

Every class can define custom constructor function, which will be called on object initialization.

Primitive properties can be set directly in props. 
Objects and arrays should be set in constructor or getter to avoid prototype-shared instances. 
Otherwise manipulation of such object/array will be applied to all objects of class.

Overriding methods is supported with two helper functions. You can use them in any method of class.
```javascript
/**
 * Call current method from parent prototype/static context. 
 * Two versions allow you to convenient use Function.apply() or Function.call() way
 */
this.callParent( ... );
this.applyParent( params );

```

### Interfaces ###

Any class can be use as an interface. By adding `implement` call into your class definition chain you can enforce existence of members in next `extend` call.

```javascript
var ITask = Base.extend({
  execute: function(){}
});


var DisplayInfo = Base
  .implement( ITask )
  .extend({
    //Lack of this function would cause exception
    execute: function(){
      console.log("Hello world!");
    }
  });
```


### Mixins ###
Mixins are shared, reusable, prototyped and/or static classes. The `use` operation works just like `extend`, but uses class-function instead hashmaps `{}`.

```javascript
var Mixin = Base.extend({
  onClick: function(e){
    console.log("Im shared on click handler, YAY!");
  }
});

var Entry = Base.use(Mixin).extend({
  constructor: function(){
    this.bind("click", this.onClick);
  },
  
  
  bind: function(event, cb){
    //Do some binding
  }
});
```



### Examples ###


#### Simple ####
```javascript
//Extend Base to define custom class
var Vehicle = Base.extend({
  hasEngine: false,
  serialNumber: 10,
  
  //declaration
  elements: null,
  
  constructor: function(){
    //initialization
    this.elements = [];
  }
});

//and extend custom class
var Car = Vehicle.extend({
  //override default vehicle property value
  hasEngine: true
});

var myCar = new Car();
//myCar.hasEngine === true
```

#### Methods overriding with call to super ####
```javascript
var Person = Base.extend({
  name: "",
  
  //Capture initial parameter `name`
  constructor: function( name ){
    this.name = name;
  },
  
  //Be polite and say hello
  sayHello: function(){
    this.say("Hello, my name is " + this.name);
  },
  
  //generic method to output data
  say: function( message ){
    console.log(message);
  }
});

var ShoutingPerson = Person.extend({
  //Add expression to all you say :)
  say: function(message){
    this.callParent(message + "!!!");
  }
});

var me = new ShoutingPerson("John");

me.sayHello(); //console.log("Hello, my name is John!!!")
```

#### Static properties ####
```javascript
var Log = Base.extend({
  //put log prototype here
},
{
  //Statics
  LEVEL_ERROR: 3,
  LEVEL_WARN: 2,
  LEVEL_INFO: 1
  LEVEL_NONE: 0
});

console.log(Log.LEVEL_ERROR); // 3
```
