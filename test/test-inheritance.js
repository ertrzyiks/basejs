var assert = require("assert");

describe('Base', function(){
	describe('#extend', function(){
		var Base = require("../base");
		
		it('should provide prototyped inheritance of properties', function(){
			var Class1 = Base.extend({
				myProp1: "qwerty123",
				myProp2: 3.14
			});
			
			var o1 = new Class1();
				
			assert.ok('myProp1' in o1);
			assert.ok('myProp2' in o1);
			assert.strictEqual("qwerty123", o1.myProp1);
			assert.strictEqual(3.14, o1.myProp2);
		});
		
		it('should provide prototyped inheritance of properties with two levels', function(){
			var Class1 = Base.extend({
				myProp1: "qwerty123",
				myProp2: 3.14
			});
			
			var SubClass1 = Class1.extend({
				myProp2: 15,
				myProp3: "zaq"
			});
			
			var o2 = new SubClass1();
			assert.ok('myProp1' in o2);
			assert.ok('myProp2' in o2);
			assert.ok('myProp3' in o2);
			assert.strictEqual("qwerty123", o2.myProp1);
			assert.strictEqual(15, o2.myProp2);
			assert.strictEqual("zaq", o2.myProp3);
			
		});
		
		it('should provide extension from other class prototype', function(){
			var Class1 = Base.extend({
				myProp1: "qwerty123",
				myProp2: 3.14
			});
			
			var Class2 = Base.extend({
				myProp3: true
			});
			
			var Class3 = Class1.extend(Class2).extend({
				myProp4: 2
			});	
			
			var o = new Class3();
				
			assert.ok('myProp1' in o);
			assert.ok('myProp2' in o);
			assert.ok('myProp3' in o);
			assert.ok('myProp4' in o);
			assert.strictEqual("qwerty123", o.myProp1);
			assert.strictEqual(3.14, o.myProp2);
			assert.strictEqual(true, o.myProp3);
			assert.strictEqual(2, o.myProp4);
		});
		
		it('should provide prototyped inheritance of properties with multiple levels', function(){
			var Class1 = Base.extend({
				myProp1: "qwerty123",
				myProp2: 3.14
			});
			
			var SubClass1 = Class1.extend({
				myProp2: 15,
				myProp3: "zaq"
			});
			
			var SubSubClass1 = SubClass1.extend({
				myProp3: "pol",
				myProp4: false
			});
			
			var o3 = new SubSubClass1();
			assert.ok('myProp1' in o3);
			assert.ok('myProp2' in o3);
			assert.ok('myProp3' in o3);
			assert.ok('myProp4' in o3);
			assert.strictEqual("qwerty123", o3.myProp1);
			assert.strictEqual(15, o3.myProp2);
			assert.strictEqual("pol", o3.myProp3);
			assert.strictEqual(false, o3.myProp4);
			
		});
		
		it('should provide inheritance of static properties', function(){
			var Class1 = Base.extend({}, {
				myStaticProp1: "test",
				myStaticProp2: 89
			});
						
			assert.ok('myStaticProp1' in Class1);
			assert.ok('myStaticProp2' in Class1);
			assert.strictEqual("test", Class1.myStaticProp1);
			assert.strictEqual(89, Class1.myStaticProp2);
		});
		
		it('should provide inheritance of static properties with two levels', function(){
			var Class1 = Base.extend({}, {
				myStaticProp1: "test",
				myStaticProp2: 89
			});
			
			var SubClass1 = Class1.extend({}, {
				myStaticProp2: 18,
				myStaticProp3: "testinio"
			});
			
			assert.ok('myStaticProp1' in SubClass1);
			assert.ok('myStaticProp2' in SubClass1);
			assert.ok('myStaticProp3' in SubClass1);
			assert.strictEqual("test", SubClass1.myStaticProp1);
			assert.strictEqual(18, SubClass1.myStaticProp2);
			assert.strictEqual("testinio", SubClass1.myStaticProp3);
		});
		
		it('should provide inheritance of static properties with multiple levels', function(){
			var Class1 = Base.extend({}, {
				myStaticProp1: "test",
				myStaticProp2: 89
			});
			
			var SubClass1 = Class1.extend({}, {
				myStaticProp2: 18,
				myStaticProp3: "testinio"
			});
			
			var SubSubClass1 = SubClass1.extend({}, {
				myStaticProp3: "testinio2",
				myStaticProp4: false
			});
			
			assert.ok('myStaticProp1' in SubSubClass1);
			assert.ok('myStaticProp2' in SubSubClass1);
			assert.ok('myStaticProp3' in SubSubClass1);
			assert.ok('myStaticProp4' in SubSubClass1);
			assert.strictEqual("test", SubSubClass1.myStaticProp1);
			assert.strictEqual(18, SubSubClass1.myStaticProp2);
			assert.strictEqual("testinio2", SubSubClass1.myStaticProp3);
			assert.strictEqual(false, SubSubClass1.myStaticProp4);
		});
		
		
		it('should provide constructor', function(){
			var Class1 = Base.extend({
				value1: 0,
				value2: 0,
				
				constructor: function(value1, value2){					
					this.value1 = value1;
					this.value2 = value2;
				}
			});
			
			var o = new Class1(2, 5);
						
			assert.strictEqual(2, o.value1);
			assert.strictEqual(5, o.value2);
		});
		
		it('should allow to call parent constructor from few layers up', function(){
			var Class1 = Base.extend({
				value1: 0,
				value2: 0,
				
				constructor: function(value1, value2){
					this.value1 = value1;
					this.value2 = value2;
				}
			});
			
			Class1.prototype.constructor.hyc = 1;
			
			var Class2 = Class1.extend({
			});
			
			var Class3 = Class2.extend({
				value3: 0,
				constructor: function(value1, value2, value3){
					this.applyParent( arguments );
					
					this.value3 = value3;
				}
			});
					
			var o = new Class3(2, 5, 1);
						
			assert.strictEqual(2, o.value1);
			assert.strictEqual(5, o.value2);
			assert.strictEqual(1, o.value3);
		});
		
				
		it('should provide prototyped inheritance of properties', function(){
			var Class1 = Base.extend({
				myProp1: "qwerty123",
				myProp2: 3.14
			});
			
			var o1 = new Class1();
				
			assert.ok('myProp1' in o1);
			assert.ok('myProp2' in o1);
			assert.strictEqual("qwerty123", o1.myProp1);
			assert.strictEqual(3.14, o1.myProp2);
		});
		
		
		it('should provide prototyped inheritance of methods', function(){
			var Class1 = Base.extend({
				myMethod1: function(){
					return 1;
				},
				
				myMethod2: function(a){
					return 2*a;
				}
			});
			
			var o1 = new Class1();
			
			assert.ok('myMethod1' in o1);
			assert.ok('myMethod2' in o1);
			assert.strictEqual(1, o1.myMethod1());
			assert.strictEqual(2, o1.myMethod2(1));
		});
		
		it('should provide prototyped inheritance of methods with two levels', function(){
			var Class1 = Base.extend({
				myMethod1: function(){
					return 1;
				},
				
				myMethod2: function(a){
					return 2*a;
				}
			});
			
			var SubClass1 = Class1.extend({
				myMethod2: function(a){
					return 3*a;
				},
				
				myMethod3: function(a, b){
					return a + b;
				}
			});
			
			var o2 = new SubClass1();
			
			assert.ok('myMethod1' in o2);
			assert.ok('myMethod2' in o2);
			assert.ok('myMethod3' in o2);
			assert.strictEqual(1, o2.myMethod1());
			assert.strictEqual(3, o2.myMethod2(1));
			assert.strictEqual(8, o2.myMethod3(5, 3));
		});
		
		it('should provide prototyped inheritance of methods with multiple levels', function(){
			var Class1 = Base.extend({
				myMethod1: function(){
					return 1;
				},
				
				myMethod2: function(a){
					return 2*a;
				}
			});
			
			var SubClass1 = Class1.extend({
				myMethod2: function(a){
					return this.callParent(a) + a;
				},
				
				myMethod3: function(a, b){
					return a + b;
				}
			});
			
			var SubSubClass1 = SubClass1.extend({
				myMethod3: function(a, b){
					return 2 * this.callParent(a, b);
				},
				
				myMethod4: function(a, b, c){
					return a + b + c;
				}
			});
			
			
			var o3 = new SubSubClass1();
						
			assert.ok('myMethod1' in o3);
			assert.ok('myMethod2' in o3);
			assert.ok('myMethod3' in o3);
			assert.ok('myMethod4' in o3);
			assert.strictEqual(1, o3.myMethod1());
			assert.strictEqual(3, o3.myMethod2(1));
			assert.strictEqual(16, o3.myMethod3(5, 3));
			assert.strictEqual(10, o3.myMethod4(5, 3, 2));
		});
		
		
		
		it('should provide prototyped inheritance of static methods', function(){
			var Class1 = Base.extend({},{
				myMethod1: function(){
					return 1;
				},
				
				myMethod2: function(a){
					return 2*a;
				}
			});
						
			assert.ok('myMethod1' in Class1);
			assert.ok('myMethod2' in Class1);
			assert.strictEqual(1, Class1.myMethod1());
			assert.strictEqual(2, Class1.myMethod2(1));
		});
		
		it('should provide prototyped inheritance of static methods with two levels', function(){
			var Class1 = Base.extend({},{
				myMethod1: function(){
					return 1;
				},
				
				myMethod2: function(a){
					return 2*a;
				}
			});
			
			var SubClass1 = Class1.extend({}, {
				myMethod2: function(a){
					return 3*a;
				},
				
				myMethod3: function(a, b){
					return a + b;
				}
			});
						
			assert.ok('myMethod1' in SubClass1);
			assert.ok('myMethod2' in SubClass1);
			assert.ok('myMethod3' in SubClass1);
			assert.strictEqual(1, SubClass1.myMethod1());
			assert.strictEqual(3, SubClass1.myMethod2(1));
			assert.strictEqual(8, SubClass1.myMethod3(5, 3));
		});
		
		it('should provide prototyped inheritance of static methods with multiple levels', function(){
			var Class1 = Base.extend({}, {
				myMethod1: function(){
					return 1;
				},
				
				myMethod2: function(a){
					return 2*a;
				}
			});
			
			var SubClass1 = Class1.extend({}, {
				myMethod2: function(a){
					return this.callParent(a) + a;
				},
				
				myMethod3: function(a, b){
					return a + b;
				}
			});
			
			var SubSubClass1 = SubClass1.extend({}, {
				myMethod3: function(a, b){
					return 2 * this.callParent(a, b);
				},
				
				myMethod4: function(a, b, c){
					return a + b + c;
				}
			});
			
									
			assert.ok('myMethod1' in SubSubClass1);
			assert.ok('myMethod2' in SubSubClass1);
			assert.ok('myMethod3' in SubSubClass1);
			assert.ok('myMethod4' in SubSubClass1);
			assert.strictEqual(1, SubSubClass1.myMethod1());
			assert.strictEqual(3, SubSubClass1.myMethod2(1));
			assert.strictEqual(16, SubSubClass1.myMethod3(5, 3));
			assert.strictEqual(10, SubSubClass1.myMethod4(5, 3, 2));
		});
	});
	
	describe('#instanceof', function(){
		var Base = require("../base");
		
		it('should find first level class', function(){
			var Class1 = Base.extend({});
			
			var o = new Class1();
			
			assert.strictEqual(true, o instanceof Class1 );
		});
		
		it('should find second level class', function(){
			var Class1 = Base.extend({});
			var Class2 = Class1.extend({});
			
			var o = new Class2();
			
			assert.strictEqual(true, o instanceof Class1 );
			assert.strictEqual(true, o instanceof Class2 );
		});
		
		it('should find higher level class', function(){
			var Class1 = Base.extend({});
			var Class2 = Class1.extend({ constructor: function(){} });
			var Class3 = Class2.extend({});
			var Class4 = Class3.extend({});
			var Class5 = Class4.extend({});
			
			var o = new Class5();
			
			assert.strictEqual(true, o instanceof Class1 );
			assert.strictEqual(true, o instanceof Class2 );
			assert.strictEqual(true, o instanceof Class3 );
			assert.strictEqual(true, o instanceof Class4 );
			assert.strictEqual(true, o instanceof Class5 );
		});
		
		it('should return false on strange classes', function(){
			var Class1 = Base.extend({});
			var Class2 = Base.extend({});
			
			var o = new Class1();
			
			assert.strictEqual(false, o instanceof Class2);
		});
		
		it('should return false on strange classes with complex chain', function(){
			var Class1 = Base.extend({});
			var Class2 = Class1.extend({});
			var Class3 = Class2.extend({});
			var Class4 = Class3.extend({});
			var Class5 = Class4.extend({});
			
			var Class6 = Base.extend({});
			
			var o = new Class5();

			assert.strictEqual(false, o instanceof Class6);
		});
	});
	
	
	describe('#implement', function(){
		var Base = require("../base");
		
		it('should throw exception when interface member is not implemented', function(){
			var iFace1 = Base.extend({
				counter: 0,
				
				run: function(){},
				
				pause: function(){},
				unpause: function(){}
			});
			
			assert.throws( function(){
				Base.implement(iFace1).extend({
				});
			} );
		});
		
		it('should throw exception when member from one of interfaces is not implemented', function(){
			var iFace1 = Base.extend({
				counter: 0,
				
				run: function(){},
				
				pause: function(){},
				unpause: function(){}
			});
			
			var iFace2 = Base.extend({
				init: function(){}
			});
			
			assert.throws( function(){
				Base.implement(iFace1).implement(iFace2).extend({
					counter: 0,
					
					//run: function(){},
					init: function(){},
					
					pause: function(){},
					unpause: function(){}
				});
			} );
		});
		
		it('should allow to implement members of interface', function(){
			var iFace1 = Base.extend({
				counter: 0,
				
				run: function(){},
				
				pause: function(){},
				unpause: function(){}
			});
			
			assert.doesNotThrow( function(){
				Base.implement( iFace1 ).extend({
					counter: 0,
				
					run: function(){},
				
					pause: function(){},
					unpause: function(){}
				});
			} );
		});
		
		it('should allow to implement members of multiple interfaces', function(){
			var iFace1 = Base.extend({
				counter: 0,
				
				run: function(){},
				
				pause: function(){},
				unpause: function(){}
			});
			
			var iFace2 = Base.extend({
				init: function(){}
			});
			
			assert.doesNotThrow( function(){
				Base.implement( iFace1 ).implement( iFace2 ).extend({
					counter: 0,
					
					init: function(){},
					run: function(){},
					
					pause: function(){},
					unpause: function(){}
				});
			} );
		});
	});
	
	describe('#isImplementing', function(){
		var Base = require("../base");
		
		it('allow to check if object has interface implemented by it`s class', function(){
			var iFace1 = Base.extend({
				counter: 0,
				
				run: function(){},
				
				pause: function(){},
				unpause: function(){}
			});
			
			var iUnusedFace = Base.extend({ a: 1 });
			
			var Class1 = Base.implement( iFace1 ).extend({
				counter: 0,
				
				run: function(){},
				
				pause: function(){},
				unpause: function(){}
			});
			
			var o = new Class1();
			
			assert.strictEqual(true, o.isImplementing( iFace1 ));
			assert.strictEqual(false, o.isImplementing( iUnusedFace ));
		});
		
		it('allow to check if object has interface implemented by it`s super class', function(){
			var iFace1 = Base.extend({
				counter: 0,
				
				run: function(){},
				
				pause: function(){},
				unpause: function(){}
			});
			
			var iUnusedFace = Base.extend({ a: 1 });
			
			var Class1 = Base.implement( iFace1 ).extend({
				counter: 0,
				
				run: function(){},
				
				pause: function(){},
				unpause: function(){}
			});
			
			var Class2 = Class1.extend({
				test: false
			});
			var o = new Class2();
			
			assert.strictEqual(true, o.isImplementing( iFace1 ));
			assert.strictEqual(false, o.isImplementing( iUnusedFace ));
		});
		
	});
	
	describe('#use', function(){
		var Base = require("../base");
		
		it('should allow to use single prototype mixin', function(){
			var Mixin = Base.extend({
				testing1: true
			});
			
			var Class1 = Base.use(Mixin).extend({
				testing2:  false
			});
			
			var o = new Class1();
			
			assert.strictEqual(o.testing1, true);
			assert.strictEqual(o.testing2, false);
		});
		
		it('should allow to use multiple prototype mixin', function(){
			var Mixin1 = Base.extend({
				testing1: true
			});
			
			var Mixin2 = Base.extend({
				testing3: true
			});
			
			var Class1 = Base.use(Mixin1).use(Mixin2).extend({
				testing2:  false
			});
			
			var o = new Class1();
			
			assert.strictEqual(o.testing1, true);
			assert.strictEqual(o.testing2, false);
			assert.strictEqual(o.testing3, true);
		});
		
		
		it('should allow to use single prototype mixin', function(){
			var Mixin = Base.extend({}, {
				testing1: true
			});
			
			var Class1 = Base.use(Mixin).extend({}, {
				testing2:  false
			});
			
			assert.strictEqual(Class1.testing1, true);
			assert.strictEqual(Class1.testing2, false);
		});
		
		it('should allow to use multiple prototype mixin', function(){
			var Mixin1 = Base.extend({}, {
				testing1: true
			});
			
			var Mixin2 = Base.extend({}, {
				testing3: true
			});
			
			var Class1 = Base.use(Mixin1).use(Mixin2).extend({},{
				testing2:  false
			});
			
			assert.strictEqual(Class1.testing1, true);
			assert.strictEqual(Class1.testing2, false);
			assert.strictEqual(Class1.testing3, true);
		});
		
		it('should ignore constructor', function(){
			var BasicClass = Base.extend({
				
				count: 0,
				
				constructor: function ( count ){
					this.count = count;
				}
			});
			
			var Mixin1 = Base.extend({
				testing1: true
			});
			
			var AdvancedClass = BasicClass.use( Mixin1 ).extend({
				constructor: function ( count ){
					this.callParent( count * 2 );
				}
			});
			
			var testObject = new AdvancedClass( 5 );
			
			assert.strictEqual( testObject.count, 10 );

		});
	});
})