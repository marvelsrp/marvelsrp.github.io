var ac_main =
webpackJsonpac__name_([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*
	 * Providers provided by Angular
	 */
	var platform_browser_dynamic_1 = __webpack_require__(360);
	/*
	* Platform and Environment
	* our providers/directives/pipes
	*/
	var browser_1 = __webpack_require__(555);
	var environment_1 = __webpack_require__(556);
	/*
	* App Component
	* our top level component that holds all of our components
	*/
	var app_1 = __webpack_require__(552);
	/*
	 * Bootstrap our Angular app with a top level component `App` and inject
	 * our Services and Providers into Angular's dependency injection
	 */
	function main(initialHmrState) {
	    return platform_browser_dynamic_1.bootstrap(app_1.App, browser_1.PLATFORM_PROVIDERS.concat(environment_1.ENV_PROVIDERS, app_1.APP_PROVIDERS))
	        .then(environment_1.decorateComponentRef)
	        .catch(function (err) { return console.error(err); });
	}
	exports.main = main;
	/*
	 * Vendors
	 * For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
	 * You can also import them in vendors to ensure that they are bundled in one file
	 * Also see custom-typings.d.ts as you also need to do `typings install x` where `x` is your module
	 */
	/*
	 * Hot Module Reload
	 * experimental version by @gdi2290
	 */
	if (false) {
	    // activate hot module reload
	    var ngHmr = require('angular2-hmr');
	    ngHmr.hotModuleReplacement(main, module);
	}
	else {
	    // bootstrap when document is ready
	    document.addEventListener('DOMContentLoaded', function () { return main(); });
	}
	

/***/ },

/***/ 117:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var angular2_hmr_1 = __webpack_require__(399);
	var AppState = (function () {
	    function AppState() {
	        // @HmrState() is used by HMR to track the state of any object during HMR (hot module replacement)
	        this._state = {};
	    }
	    Object.defineProperty(AppState.prototype, "state", {
	        // already return a clone of the current state
	        get: function () {
	            return this._state = this._clone(this._state);
	        },
	        // never allow mutation
	        set: function (value) {
	            throw new Error('do not mutate the `.state` directly');
	        },
	        enumerable: true,
	        configurable: true
	    });
	    AppState.prototype.get = function (prop) {
	        // use our state getter for the clone
	        var state = this.state;
	        return state.hasOwnProperty(prop) ? state[prop] : state;
	    };
	    AppState.prototype.set = function (prop, value) {
	        // internally mutate our state
	        return this._state[prop] = value;
	    };
	    AppState.prototype._clone = function (object) {
	        // simple object clone
	        return JSON.parse(JSON.stringify(object));
	    };
	    __decorate([
	        angular2_hmr_1.HmrState(), 
	        __metadata('design:type', Object)
	    ], AppState.prototype, "_state", void 0);
	    AppState = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], AppState);
	    return AppState;
	}());
	exports.AppState = AppState;
	

/***/ },

/***/ 118:
/***/ function(module, exports) {

	"use strict";
	var Vector = (function () {
	    function Vector(x, y) {
	        this.x = x;
	        this.y = y;
	    }
	    Vector.prototype.set = function (x, y) {
	        this.x = x;
	        this.y = y;
	        return this;
	    };
	    Vector.prototype.add = function (v) {
	        this.x += v.x;
	        this.y += v.y;
	        return this;
	    };
	    Vector.prototype.sub = function (v) {
	        this.x -= v.x;
	        this.y -= v.y;
	        return this;
	    };
	    Vector.prototype.mul = function (s) {
	        this.x *= s;
	        this.y *= s;
	        return this;
	    };
	    Vector.prototype.div = function (s) {
	        !s && console.log("Division by zero!");
	        this.x /= s;
	        this.y /= s;
	        return this;
	    };
	    Vector.prototype.mag = function () {
	        return Math.sqrt(this.x * this.x + this.y * this.y);
	    };
	    Vector.prototype.normalize = function () {
	        var mag = this.mag();
	        mag && this.div(mag);
	        return this;
	    };
	    Vector.prototype.angle = function () {
	        return Math.atan2(this.y, this.x);
	    };
	    Vector.prototype.setMag = function (m) {
	        var angle = this.angle();
	        this.x = m * Math.cos(angle);
	        this.y = m * Math.sin(angle);
	        return this;
	    };
	    Vector.prototype.setAngle = function (a) {
	        var mag = this.mag();
	        this.x = mag * Math.cos(a);
	        this.y = mag * Math.sin(a);
	        return this;
	    };
	    Vector.prototype.rotate = function (a) {
	        this.setAngle(this.angle() + a);
	        return this;
	    };
	    Vector.prototype.limit = function (l) {
	        var mag = this.mag();
	        if (mag > l)
	            this.setMag(l);
	        return this;
	    };
	    Vector.prototype.angleBetween = function (v) {
	        return this.angle() - v.angle();
	    };
	    Vector.prototype.dot = function (v) {
	        return this.x * v.x + this.y * v.y;
	    };
	    Vector.prototype.lerp = function (v, amt) {
	        this.x += (v.x - this.x) * amt;
	        this.y += (v.y - this.y) * amt;
	        return this;
	    };
	    Vector.prototype.dist = function (v) {
	        var dx = this.x - v.x;
	        var dy = this.y - v.y;
	        return Math.sqrt(dx * dx + dy * dy);
	    };
	    Vector.prototype.copy = function () {
	        return new Vector(this.x, this.y);
	    };
	    Vector.prototype.random = function () {
	        this.set(1, 1);
	        this.setAngle(Math.random() * Math.PI * 2);
	        return this;
	    };
	    Vector.inGradAngle = function (val) {
	        return val * 180 / Math.PI;
	    };
	    Vector.inRadAngle = function (val) {
	        return val * Math.PI / 180;
	    };
	    Vector.getAngleBeetween = function (velocity_2, position1, position2) {
	        var angle = Vector.inGradAngle(Math.atan2(velocity_2.y, velocity_2.x));
	        var angle2 = Vector.inGradAngle(Math.atan2(position1.x - position2.x, position1.y - position2.y));
	        var angle_between = Math.abs(angle2 - angle);
	        if (angle_between > 180)
	            angle_between -= 180;
	        return angle_between;
	    };
	    return Vector;
	}());
	exports.Vector = Vector;
	

/***/ },

/***/ 162:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var vector_1 = __webpack_require__(118);
	var creature_1 = __webpack_require__(250);
	var world_1 = __webpack_require__(163);
	var Food = (function () {
	    function Food(type, coord) {
	        this.physics = {
	            location: new vector_1.Vector(0, 0),
	            mass: 1,
	            size: 700
	        };
	        this.experience = 10;
	        this.creaturesTargeting = [];
	        Food.counter++;
	        this.id = Food.counter;
	        this.type = type;
	        this.physics.location = coord;
	        var EXP = {
	            'circle': 30,
	            'triangle': 10,
	            'square': 50
	        };
	        this.experience = EXP[type];
	        var SIZES = {
	            'circle': 6,
	            'triangle': 6,
	            'square': 8
	        };
	        this.physics.size = SIZES[type];
	    }
	    Food.add = function () {
	        var type = Math.round(Math.random() * 2);
	        var TYPES = ['circle', 'triangle', 'square'];
	        console.log('addFood');
	        var food = new Food(TYPES[type], world_1.World.getRandomCoord());
	        Food.list.push(food);
	    };
	    Food.kill = function (food) {
	        food.clearTargeting();
	        var index = Food.list.findIndex(function (item) {
	            return food.id === item.id;
	        });
	        Food.list.splice(index, 1);
	        //clear creature targets
	        var foundCreatures = creature_1.Creature.list.filter(function (item) {
	            return item.targetFood && food.id === item.targetFood.id;
	        });
	        foundCreatures.forEach(function (creature) {
	            creature.targetFood = undefined;
	        });
	    };
	    Food.prototype.addTargeting = function (creature) {
	        this.creaturesTargeting.push(creature);
	    };
	    Food.prototype.clearTargeting = function () {
	        this.creaturesTargeting.forEach(function (creature) {
	            creature.targetFood = undefined;
	        });
	    };
	    Food.prototype.draw = function () {
	        var context = world_1.World.context;
	        context.save();
	        context.beginPath();
	        context.lineWidth = 1;
	        switch (this.type) {
	            case 'circle':
	                context.fillStyle = '#CCCCCC';
	                context.strokeStyle = '#000000';
	                context.arc(world_1.World.convertX(this.physics.location.x), world_1.World.convertY(this.physics.location.y), this.physics.size, 0, 2 * Math.PI, false);
	                break;
	            case 'triangle':
	                context.fillStyle = '#CCCCCC';
	                context.strokeStyle = '#000000';
	                context.moveTo(world_1.World.convertX(this.physics.location.x), world_1.World.convertY(this.physics.location.y - this.physics.size));
	                context.lineTo(world_1.World.convertX(this.physics.location.x - this.physics.size), world_1.World.convertY(this.physics.location.y + this.physics.size));
	                context.lineTo(world_1.World.convertX(this.physics.location.x + this.physics.size), world_1.World.convertY(this.physics.location.y + this.physics.size));
	                break;
	            case 'square':
	                context.fillStyle = '#CCCCCC';
	                context.strokeStyle = '#000000';
	                context.rect(world_1.World.convertX(this.physics.location.x - this.physics.size), world_1.World.convertY(this.physics.location.y - this.physics.size), this.physics.size * 2, this.physics.size * 2);
	                break;
	        }
	        //bot
	        context.fill();
	        // context.fill();
	        context.closePath();
	        context.stroke();
	        context.globalAlpha = 1;
	        context.restore();
	    };
	    Food.list = [];
	    Food.counter = 0;
	    return Food;
	}());
	exports.Food = Food;
	

/***/ },

/***/ 163:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var vector_1 = __webpack_require__(118);
	var creature_1 = __webpack_require__(250);
	var food_1 = __webpack_require__(162);
	var camera_1 = __webpack_require__(379);
	var World = (function () {
	    function World() {
	    }
	    World.init = function () {
	        creature_1.Creature.active = creature_1.Creature.add(true);
	        World.camera = new camera_1.Camera(0, 0, World.canvasWidth, World.canvasHeight, World.width, World.height);
	        World.camera.follow(creature_1.Creature.active, World.canvasWidth / 2, World.canvasHeight / 2);
	        for (var i = 0; i < World.countCreatures; i++)
	            creature_1.Creature.add();
	        for (var i = 0; i < World.countFoods; i++)
	            food_1.Food.add();
	    };
	    World.setContext = function (context) {
	        World.context = context;
	        World.image.src = context.canvas.toDataURL("image/png");
	    };
	    World.getRandomCoord = function () {
	        var x = Math.random() * World.width;
	        var y = Math.random() * World.height;
	        return new vector_1.Vector(x, y);
	    };
	    World.draw = function () {
	        World.context.fillStyle = "#ffffff";
	        World.context.fillRect(0, 0, World.canvasWidth, World.canvasHeight);
	        var rows = ~~(this.width / 44) + 1;
	        var columns = ~~(this.height / 44) + 1;
	        World.context.save();
	        World.context.fillStyle = '#CCCCCC';
	        World.context.strokeStyle = '#000000';
	        for (var x = 0, i = 0; i < rows; x += 44, i++) {
	            World.context.beginPath();
	            for (var y = 0, j = 0; j < columns; y += 44, j++) {
	                World.context.rect(World.convertX(x), World.convertY(y), 40, 40);
	            }
	            World.context.fill();
	            World.context.closePath();
	        }
	        World.context.beginPath();
	        World.context.lineWidth = 3;
	        World.context.moveTo(World.convertX(World.width / 2 - 20), World.convertY(World.height / 2));
	        World.context.lineTo(World.convertX(World.width / 2 + 20), World.convertY(World.height / 2));
	        World.context.moveTo(World.convertX(World.width / 2), World.convertY(World.height / 2 - 20));
	        World.context.lineTo(World.convertX(World.width / 2), World.convertY(World.height / 2 + 20));
	        World.context.closePath();
	        World.context.stroke();
	        World.context.restore();
	        food_1.Food.list.forEach(function (food) { return food.draw(); });
	        creature_1.Creature.list.forEach(function (creature) { return creature.process(); });
	        World.context.font = "20px Tahome";
	        World.context.fillStyle = 'black';
	        World.context.fillText("Expirience: " + creature_1.Creature.active.experience, 20, 20);
	        World.context.fillText("Level: " + creature_1.Creature.active.level, 20, 40);
	        World.context.fillText("Health: " + creature_1.Creature.active.health + '/' + creature_1.Creature.active.maxHealth, 20, 60);
	        World.context.fillText("Location: " + Math.round(creature_1.Creature.active.physics.location.x) + ':'
	            + Math.round(creature_1.Creature.active.physics.location.y), 20, 80);
	        var sx, sy, dx, dy;
	        var sWidth, sHeight, dWidth, dHeight;
	        sx = World.camera.xView;
	        sy = World.camera.yView;
	        sWidth = World.context.canvas.width;
	        sHeight = World.context.canvas.height;
	        // if cropped image is smaller than canvas we need to change the source dimensions
	        if (World.image.width - sx < sWidth) {
	            sWidth = World.image.width - sx;
	        }
	        if (World.image.height - sy < sHeight) {
	            sHeight = World.image.height - sy;
	        }
	        // location on canvas to draw the croped image
	        dx = 0;
	        dy = 0;
	        // match destination with source to not scale the image
	        dWidth = sWidth;
	        dHeight = sHeight;
	        ;
	        World.context.drawImage(World.image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
	    };
	    World.convert = function (x, y) {
	        return [x - World.camera.xView, y - World.camera.yView];
	    };
	    World.convertX = function (x) {
	        return x - World.camera.xView;
	    };
	    World.convertY = function (y) {
	        return y - World.camera.yView;
	    };
	    World.countCreatures = 30;
	    World.countFoods = 30;
	    World.canvasWidth = window.innerWidth;
	    World.canvasHeight = window.innerHeight;
	    World.width = 2500;
	    World.height = 1500;
	    World.image = new Image();
	    return World;
	}());
	exports.World = World;
	

/***/ },

/***/ 250:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var vector_1 = __webpack_require__(118);
	var world_1 = __webpack_require__(163);
	var food_1 = __webpack_require__(162);
	var patron_1 = __webpack_require__(380);
	var KEYS = {
	    W: 87,
	    S: 83,
	    A: 65,
	    D: 68,
	    LEFT: 37,
	    UP: 38,
	    RIGHT: 39,
	    DOWN: 40,
	    SPACE: 32
	};
	var Creature = (function () {
	    function Creature(coord, isPlayer) {
	        if (isPlayer === void 0) { isPlayer = false; }
	        this.physics = {
	            location: new vector_1.Vector(0, 0),
	            velocity: new vector_1.Vector(0, 0),
	            rotation: new vector_1.Vector(0, 0),
	            acceleration: new vector_1.Vector(0, 0),
	            mass: 1,
	            maxspeed: 5,
	            maxforce: 0.1,
	            lookRange: 700
	        };
	        this.experience = 0;
	        this.level = 1;
	        this.health = 100;
	        this.maxHealth = 100;
	        this.patronInterval = 1 / 5;
	        this.patrons = [];
	        Creature.counter++;
	        this.id = Creature.counter;
	        this.name = "bot-" + this.id;
	        this.physics.location = coord;
	        this.physics.rotation.random();
	        this.isPlayer = isPlayer;
	        this.isBot = !isPlayer;
	    }
	    Creature.prototype.damage = function (damage) {
	        this.health -= damage;
	        var killed = this.health <= 0;
	        if (killed) {
	            Creature.kill(this);
	        }
	        return killed;
	    };
	    Creature.add = function (isPlayer) {
	        if (isPlayer === void 0) { isPlayer = false; }
	        var coord = (isPlayer) ? new vector_1.Vector(world_1.World.width / 2, world_1.World.height / 2) : world_1.World.getRandomCoord();
	        var creature = new Creature(coord, isPlayer);
	        Creature.list.push(creature);
	        return creature;
	    };
	    Creature.kill = function (creature) {
	        var index = Creature.list.findIndex(function (item) {
	            return creature.id === item.id;
	        });
	        Creature.list.splice(index, 1);
	    };
	    Creature.prototype.process = function () {
	        this.patrons.forEach(function (patron) { return patron.process(); });
	        if (this.isPlayer) {
	            this._processPlayer();
	        }
	        if (this.isBot) {
	            this._processBot();
	        }
	        this._processDamage();
	        this._checkLevel();
	        this._draw();
	    };
	    Creature.prototype._processDamage = function () {
	        var _this = this;
	        //Перебор по всем сущностям, нанесение урона при таране
	        var damageCreatures = Creature.list.filter(function (creature) {
	            var distance = _this.physics.location.dist(creature.physics.location);
	            var minDistance = creature.physics.mass * 10 + _this.physics.mass * 10;
	            return (distance < minDistance && _this.id != creature.id);
	        });
	        damageCreatures.forEach(function (creature) {
	            var diff = _this.physics.location.copy().sub(creature.physics.location);
	            diff.normalize();
	            diff.mul(3);
	            _this._applyForce(diff);
	            _this.damage(Math.round(creature.physics.mass * 10 + Math.random() * 5));
	        });
	    };
	    Creature.prototype._fire = function () {
	        this.patrons.push(new patron_1.Patron(this));
	    };
	    Creature.prototype.removePatron = function (patron) {
	        var index = this.patrons.findIndex(function (item) {
	            return patron.id === item.id;
	        });
	        this.patrons.splice(index, 1);
	    };
	    Creature.prototype._processPlayer = function () {
	        var _this = this;
	        //Перебор по всем целям, расчет вхождения
	        var eating = food_1.Food.list.filter(function (food) {
	            var distance = _this.physics.location.dist(food.physics.location);
	            return (distance < food.physics.size + _this.physics.mass * 10);
	        });
	        eating.forEach(function (food) {
	            _this.experience += food.experience;
	            food_1.Food.kill(food);
	            food_1.Food.add();
	        });
	        //
	        // if(this.physics.location.x - World.width/2 < 0){
	        //   this.physics.location.x = World.width/2;
	        // }
	        // if(this.physics.location.y - World.height/2 < 0){
	        //   this.physics.location.y = World.height/2;
	        // }
	        // if(this.physics.location.x + this.physics.mass * 10 / 2 > World.width){
	        //   this.physics.location.x = World.width - this.width/2;
	        // }
	        // if(this.physics.location.y + this.physics.mass * 10 / 2 > World.height){
	        //   this.physics.location.y = World.height - this.height/2;
	        // }
	    };
	    Creature.prototype._processBot = function () {
	        if (this.targetFood) {
	            var distance = this.physics.location.dist(this.targetFood.physics.location);
	            if (distance < this.targetFood.physics.size * 2) {
	                this.experience += this.targetFood.experience;
	                food_1.Food.kill(this.targetFood);
	                food_1.Food.add();
	            }
	        }
	        else {
	            this._findTarget();
	        }
	        if (this.targetFood) {
	            var coord = this.targetFood.physics.location;
	            this._moveTo(coord);
	        }
	        else {
	            this._moveTo(world_1.World.getRandomCoord());
	        }
	    };
	    Creature.prototype._findTarget = function () {
	        var _this = this;
	        //Перебор по всем целям, расчет вхождения
	        var looked = food_1.Food.list.filter(function (food) {
	            var distance = _this.physics.location.dist(food.physics.location);
	            return (distance < _this.physics.lookRange);
	        });
	        if (looked.length) {
	            var sortLooked = looked.sort(function (a, b) {
	                var aDist = _this.physics.location.dist(a.physics.location);
	                var bDist = _this.physics.location.dist(b.physics.location);
	                return aDist - bDist;
	            });
	            this.targetFood = sortLooked[0];
	            this.targetFood.addTargeting(this);
	        }
	    };
	    Creature.prototype.control = function (keyPress) {
	        if (keyPress[KEYS.LEFT] || keyPress[KEYS.A]) {
	            this.physics.rotation.rotate(vector_1.Vector.inRadAngle(-10));
	        }
	        if (keyPress[KEYS.UP] || keyPress[KEYS.W]) {
	            this.physics.velocity.add(this.physics.rotation);
	        }
	        if (keyPress[KEYS.RIGHT] || keyPress[KEYS.D]) {
	            this.physics.rotation.rotate(vector_1.Vector.inRadAngle(10));
	        }
	        if (keyPress[KEYS.DOWN] || keyPress[KEYS.S]) {
	            this.physics.velocity.sub(this.physics.rotation);
	        }
	        if (!keyPress[KEYS.LEFT] && !keyPress[KEYS.A] &&
	            !keyPress[KEYS.UP] && !keyPress[KEYS.W] &&
	            !keyPress[KEYS.RIGHT] && !keyPress[KEYS.D] &&
	            !keyPress[KEYS.DOWN] && !keyPress[KEYS.S]) {
	            this.physics.velocity.setMag(0.5);
	        }
	        if (keyPress[KEYS.SPACE]) {
	            this._fire();
	        }
	    };
	    Creature.prototype._moveTo = function (target) {
	        var force = new vector_1.Vector(0, 0);
	        var cohesion = this._seek(target);
	        force.add(cohesion);
	        this._applyForce(force);
	    };
	    Creature.prototype._draw = function () {
	        this._update();
	        var bgcolor = '#00CCFA';
	        var color = '#0066FA';
	        var percentHealth = this.health / this.maxHealth;
	        if (percentHealth < 0.3) {
	            bgcolor = '#CC6666';
	            color = '#333333';
	        }
	        else if (percentHealth < 0.6) {
	            bgcolor = '#ffcc66';
	            color = '#cc8800';
	        }
	        var context = world_1.World.context;
	        var angle = this.physics.rotation.angle();
	        var viewX = this.physics.location.x + Math.cos(angle) * this.physics.mass * 11;
	        var viewY = this.physics.location.y + Math.sin(angle) * this.physics.mass * 11;
	        context.save();
	        context.beginPath();
	        context.fillStyle = bgcolor;
	        context.lineWidth = 1;
	        context.strokeStyle = color;
	        //bot
	        context.arc(world_1.World.convertX(this.physics.location.x), world_1.World.convertY(this.physics.location.y), this.physics.mass * 10, 0, 2 * Math.PI, false);
	        context.fill();
	        //move vector
	        context.moveTo(world_1.World.convertX(this.physics.location.x), world_1.World.convertY(this.physics.location.y));
	        context.lineTo(world_1.World.convertX(viewX), world_1.World.convertY(viewY));
	        context.stroke();
	        // context.fill();
	        context.closePath();
	        context.stroke();
	        context.globalAlpha = 1;
	        context.font = "14px Tahome";
	        context.fillStyle = 'black';
	        var x = world_1.World.convertX(this.physics.location.x + this.physics.mass * 10 + 10);
	        var y = world_1.World.convertY(this.physics.location.y + this.physics.mass * 10 + 10);
	        if (this.isBot) {
	            world_1.World.context.fillText("Bot " + this.level + " level", x, y);
	        }
	        if (this.isPlayer) {
	            world_1.World.context.fillText("Player", x, y);
	        }
	        world_1.World.context.fillText("Health: " + this.health + '/' + this.maxHealth, x, y + 14);
	        context.restore();
	    };
	    Creature.prototype._update = function () {
	        this._boundaries();
	        this.physics.velocity.add(this.physics.acceleration);
	        this.physics.velocity.limit(this.physics.maxspeed);
	        this.physics.location.add(this.physics.velocity);
	        this.physics.acceleration.mul(0);
	    };
	    Creature.prototype._applyForce = function (force) {
	        this.physics.acceleration.add(force);
	        this.physics.rotation = this.physics.velocity;
	    };
	    Creature.prototype._boundaries = function () {
	        if (this.physics.location.x < 0)
	            this._applyForce(new vector_1.Vector(this.physics.maxspeed, 0));
	        if (this.physics.location.x > world_1.World.width)
	            this._applyForce(new vector_1.Vector(-this.physics.maxspeed, 0));
	        if (this.physics.location.y < 0)
	            this._applyForce(new vector_1.Vector(0, this.physics.maxspeed));
	        if (this.physics.location.y > world_1.World.height)
	            this._applyForce(new vector_1.Vector(0, -this.physics.maxspeed));
	    };
	    Creature.prototype._seek = function (target) {
	        var seek = target.copy().sub(this.physics.location);
	        seek.normalize();
	        seek.mul(this.physics.maxspeed);
	        seek.sub(this.physics.velocity).limit(0.3);
	        return seek;
	    };
	    Creature.prototype._checkLevel = function () {
	        var limit = 100;
	        if (this.experience >= limit && this.level < Creature.maxLevel) {
	            this.level++;
	            this.health += Math.round(this.level / 3 * 20);
	            this.maxHealth += Math.round(this.level / 3 * 20);
	            this.experience = 0;
	            this.physics.mass += 0.3;
	        }
	    };
	    Creature.list = [];
	    Creature.counter = 0;
	    Creature.maxLevel = 20;
	    return Creature;
	}());
	exports.Creature = Creature;
	

/***/ },

/***/ 378:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var home_1 = __webpack_require__(551);
	var game_1 = __webpack_require__(549);
	var no_content_1 = __webpack_require__(553);
	exports.routes = [
	    { path: '', component: home_1.Home },
	    { path: 'home', component: home_1.Home },
	    { path: 'game', component: game_1.Game },
	    { path: '**', component: no_content_1.NoContent },
	];
	// Async load a component using Webpack's require with es6-promise-loader and webpack `require`
	// asyncRoutes is needed for our @angularclass/webpack-toolkit that will allow us to resolve
	// the component correctly
	exports.asyncRoutes = {};
	// Optimizations for initial loads
	// An array of callbacks to be invoked after bootstrap to prefetch async routes
	exports.prefetchRouteCallbacks = [];
	// Es6PromiseLoader and AsyncRoutes interfaces are defined in custom-typings
	

/***/ },

/***/ 379:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var rectangle_1 = __webpack_require__(381);
	var AXIS = {
	    NONE: "none",
	    HORIZONTAL: "horizontal",
	    VERTICAL: "vertical",
	    BOTH: "both"
	};
	var Camera = (function () {
	    function Camera(xView, yView, canvasWidth, canvasHeight, worldWidth, worldHeight) {
	        this.xView = 0;
	        this.yView = 0;
	        this.xDeadZone = 0;
	        this.yDeadZone = 0;
	        this.axis = AXIS.BOTH;
	        // position of camera (left-top coordinate)
	        this.xView = xView || 0;
	        this.yView = yView || 0;
	        // distance from followed object to border before camera starts move
	        this.xDeadZone = 0; // min distance to horizontal borders
	        this.yDeadZone = 0; // min distance to vertical borders
	        // viewport dimensions
	        this.wView = canvasWidth;
	        this.hView = canvasHeight;
	        // allow camera to move in vertical and horizontal axis
	        this.axis = AXIS.BOTH;
	        // object that should be followed
	        this.followed = null;
	        // rectangle that represents the viewport
	        this.viewportRect = new rectangle_1.Rectangle(this.xView, this.yView, this.wView, this.hView);
	        // rectangle that represents the world's boundary (room's boundary)
	        this.worldRect = new rectangle_1.Rectangle(0, 0, worldWidth, worldHeight);
	    }
	    Camera.prototype.follow = function (creature, xDeadZone, yDeadZone) {
	        this.followed = creature;
	        this.xDeadZone = xDeadZone;
	        this.yDeadZone = yDeadZone;
	    };
	    Camera.prototype.update = function () {
	        // keep following the player (or other desired object)
	        if (this.followed != null) {
	            var location = this.followed.physics.location;
	            if (this.axis == AXIS.HORIZONTAL || this.axis == AXIS.BOTH) {
	                // moves camera on horizontal axis based on followed object position
	                if (location.x - this.xView + this.xDeadZone > this.wView)
	                    this.xView = location.x - (this.wView - this.xDeadZone);
	                else if (location.x - this.xDeadZone < this.xView)
	                    this.xView = location.x - this.xDeadZone;
	            }
	            if (this.axis == AXIS.VERTICAL || this.axis == AXIS.BOTH) {
	                // moves camera on vertical axis based on followed object position
	                if (location.y - this.yView + this.yDeadZone > this.hView)
	                    this.yView = location.y - (this.hView - this.yDeadZone);
	                else if (location.y - this.yDeadZone < this.yView)
	                    this.yView = location.y - this.yDeadZone;
	            }
	        }
	        // update viewportRect
	        this.viewportRect.set(this.xView, this.yView);
	        // don't let camera leaves the world's boundary
	        if (!this.viewportRect.within(this.worldRect)) {
	            if (this.viewportRect.left < this.worldRect.left)
	                this.xView = this.worldRect.left;
	            if (this.viewportRect.top < this.worldRect.top)
	                this.yView = this.worldRect.top;
	            if (this.viewportRect.right > this.worldRect.right)
	                this.xView = this.worldRect.right - this.wView;
	            if (this.viewportRect.bottom > this.worldRect.bottom)
	                this.yView = this.worldRect.bottom - this.hView;
	        }
	    };
	    return Camera;
	}());
	exports.Camera = Camera;
	

/***/ },

/***/ 380:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var vector_1 = __webpack_require__(118);
	var world_1 = __webpack_require__(163);
	var food_1 = __webpack_require__(162);
	var Patron = (function () {
	    function Patron(owner) {
	        this.physics = {
	            location: new vector_1.Vector(0, 0),
	            velocity: new vector_1.Vector(0, 0),
	            mass: 1,
	            maxspeed: 10,
	            size: 700
	        };
	        Patron.counter++;
	        this.owner = owner;
	        this.id = Patron.counter;
	        this.physics.location = owner.physics.location.copy();
	        var velocity = owner.physics.rotation.copy();
	        var vAngle = velocity.angle() + Math.random() * 0.3;
	        velocity.setAngle(vAngle);
	        this.physics.velocity = velocity;
	        this.physics.velocity.limit(this.physics.maxspeed);
	        this.physics.velocity.setMag(10);
	    }
	    Patron.prototype.process = function () {
	        var _this = this;
	        //Перебор по всем целям, расчет вхождения
	        var eating = food_1.Food.list.filter(function (food) {
	            var distance = _this.physics.location.dist(food.physics.location);
	            return (distance < food.physics.size + _this.physics.mass * 10);
	        });
	        eating.forEach(function (food) {
	            _this.owner.experience += food.experience;
	            food_1.Food.kill(food);
	            _this.owner.removePatron(_this);
	        });
	        this.draw();
	    };
	    Patron.prototype.draw = function () {
	        this._update();
	        var color = '#990000';
	        var bgcolor = '#FAC6C6';
	        var context = world_1.World.context;
	        context.save();
	        context.beginPath();
	        context.fillStyle = bgcolor;
	        context.lineWidth = 1;
	        context.strokeStyle = color;
	        //bot
	        context.arc(this.physics.location.x, this.physics.location.y, 2, 0, 2 * Math.PI, false);
	        context.fill();
	        //move vector
	        context.globalAlpha = 1;
	        context.restore();
	    };
	    Patron.prototype._update = function () {
	        this.physics.location.add(this.physics.velocity);
	        this._checkOut();
	    };
	    Patron.prototype._checkOut = function () {
	        if (this.physics.location.x < 0 ||
	            this.physics.location.x > world_1.World.width ||
	            this.physics.location.y < 0 ||
	            this.physics.location.y > world_1.World.height) {
	            this.owner.removePatron(this);
	        }
	    };
	    Patron.prototype._seek = function (target) {
	        var seek = target.copy().sub(this.physics.location);
	        seek.normalize();
	        seek.mul(this.physics.maxspeed);
	        seek.sub(this.physics.velocity).limit(0.3);
	        return seek;
	    };
	    Patron.counter = 0;
	    return Patron;
	}());
	exports.Patron = Patron;
	

/***/ },

/***/ 381:
/***/ function(module, exports) {

	"use strict";
	var Rectangle = (function () {
	    function Rectangle(left, top, width, height) {
	        this.left = left || 0;
	        this.top = top || 0;
	        this.width = width || 0;
	        this.height = height || 0;
	        this.right = this.left + this.width;
	        this.bottom = this.top + this.height;
	    }
	    Rectangle.prototype.set = function (left, top, width, height) {
	        this.left = left;
	        this.top = top;
	        this.width = width || this.width;
	        this.height = height || this.height;
	        this.right = (this.left + this.width);
	        this.bottom = (this.top + this.height);
	    };
	    Rectangle.prototype.within = function (r) {
	        return (r.left <= this.left &&
	            r.right >= this.right &&
	            r.top <= this.top &&
	            r.bottom >= this.bottom);
	    };
	    Rectangle.prototype.overlaps = function (r) {
	        return (this.left < r.right &&
	            r.left < this.right &&
	            this.top < r.bottom &&
	            r.top < this.bottom);
	    };
	    return Rectangle;
	}());
	exports.Rectangle = Rectangle;
	

/***/ },

/***/ 382:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*
	 * These are globally available directives in any template
	 */
	// Angular 2
	var core_1 = __webpack_require__(1);
	// Angular 2 Router
	var router_1 = __webpack_require__(99);
	// Angular 2 forms
	var forms_1 = __webpack_require__(223);
	// application_directives: directives that are global through out the application
	exports.APPLICATION_DIRECTIVES = router_1.ROUTER_DIRECTIVES.concat(forms_1.REACTIVE_FORM_DIRECTIVES);
	exports.DIRECTIVES = [
	    { provide: core_1.PLATFORM_DIRECTIVES, multi: true, useValue: exports.APPLICATION_DIRECTIVES }
	];
	

/***/ },

/***/ 383:
/***/ function(module, exports, __webpack_require__) {

	/*
	 * These are globally available pipes in any template
	 */
	"use strict";
	var core_1 = __webpack_require__(1);
	// application_pipes: pipes that are global through out the application
	exports.APPLICATION_PIPES = [];
	exports.PIPES = [
	    { provide: core_1.PLATFORM_PIPES, multi: true, useValue: exports.APPLICATION_PIPES }
	];
	

/***/ },

/***/ 384:
/***/ function(module, exports, __webpack_require__) {

	/*
	 * These are globally available services in any component or any other service
	 */
	"use strict";
	// Angular 2
	var common_1 = __webpack_require__(34);
	// Angular 2 Http
	var http_1 = __webpack_require__(352);
	// Angular 2 Router
	var router_1 = __webpack_require__(99);
	// Angular 2 forms
	var forms_1 = __webpack_require__(223);
	// AngularClass
	var webpack_toolkit_1 = __webpack_require__(377);
	var request_idle_callback_1 = __webpack_require__(376);
	var app_routes_1 = __webpack_require__(378);
	var app_resolver_1 = __webpack_require__(546);
	/*
	* Application Providers/Directives/Pipes
	* providers/directives/pipes that only live in our browser environment
	*/
	exports.APPLICATION_PROVIDERS = [
	    // new Angular 2 forms
	    forms_1.disableDeprecatedForms(),
	    forms_1.provideForms()
	].concat(app_resolver_1.APP_RESOLVER_PROVIDERS, [
	    router_1.provideRouter(app_routes_1.routes),
	    webpack_toolkit_1.provideWebpack(app_routes_1.asyncRoutes),
	    request_idle_callback_1.providePrefetchIdleCallbacks(app_routes_1.prefetchRouteCallbacks)
	], http_1.HTTP_PROVIDERS, [
	    { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }
	]);
	exports.PROVIDERS = exports.APPLICATION_PROVIDERS.slice();
	

/***/ },

/***/ 545:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*
	 * Angular 2 decorators and services
	 */
	var core_1 = __webpack_require__(1);
	var app_service_1 = __webpack_require__(117);
	/*
	 * App Component
	 * Top Level Component
	 */
	var App = (function () {
	    function App(appState) {
	        this.appState = appState;
	        this.angularclassLogo = 'assets/img/angularclass-avatar.png';
	        this.name = 'Angular 2 Webpack Starter';
	        this.url = 'https://twitter.com/AngularClass';
	    }
	    App.prototype.ngOnInit = function () {
	        console.log('Initial App State', this.appState.state);
	    };
	    App = __decorate([
	        core_1.Component({
	            selector: 'app',
	            encapsulation: core_1.ViewEncapsulation.None,
	            styles: [
	                __webpack_require__(762)
	            ],
	            template: "\n    <main>\n      <router-outlet></router-outlet>\n    </main>\n\n    <!--<pre class=\"app-state\">this.appState.state = {{ appState.state | json }}</pre>-->\n  "
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof app_service_1.AppState !== 'undefined' && app_service_1.AppState) === 'function' && _a) || Object])
	    ], App);
	    return App;
	    var _a;
	}());
	exports.App = App;
	/*
	 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
	 * more angular app examples that you may copy/paste
	 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
	 * For help or questions please contact us at @AngularClass on twitter
	 * or our chat on Slack at https://AngularClass.com/slack-join
	 */
	

/***/ },

/***/ 546:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var Observable_1 = __webpack_require__(5);
	__webpack_require__(566);
	var DataResolver = (function () {
	    function DataResolver() {
	    }
	    DataResolver.prototype.resolve = function (route, state) {
	        return Observable_1.Observable.of({ res: 'I am data' });
	    };
	    DataResolver = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], DataResolver);
	    return DataResolver;
	}());
	exports.DataResolver = DataResolver;
	// an array of services to resolve routes with data
	exports.APP_RESOLVER_PROVIDERS = [
	    DataResolver
	];
	

/***/ },

/***/ 547:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(250));
	__export(__webpack_require__(380));
	__export(__webpack_require__(162));
	__export(__webpack_require__(163));
	__export(__webpack_require__(379));
	__export(__webpack_require__(118));
	__export(__webpack_require__(381));
	

/***/ },

/***/ 548:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var app_service_1 = __webpack_require__(117);
	var router_1 = __webpack_require__(99);
	var entities_1 = __webpack_require__(547);
	var Game = (function () {
	    function Game(element, router, appState) {
	        this.element = element;
	        this.router = router;
	        this.appState = appState;
	        // public creatures:Array<Creature> = World.creatures;
	        this.fps = 30;
	        this.keyPress = {};
	        this.canvasWidth = entities_1.World.canvasWidth;
	        this.canvasHeight = entities_1.World.canvasHeight;
	        //debug
	        this.appState.set('nickname', 'test');
	    }
	    Game.prototype.ngAfterViewInit = function () {
	        var nickname = this.appState.get('nickname');
	        if (typeof nickname !== "string") {
	            return this.router.navigate(['']);
	        }
	        var context = this.gameCanvas.nativeElement.getContext("2d");
	        entities_1.World.setContext(context);
	        entities_1.World.init();
	        var then = Date.now();
	        this.animate(then);
	    };
	    Game.prototype.animate = function (then) {
	        var _this = this;
	        var fpsInterval = 1000 / this.fps;
	        requestAnimationFrame(function () {
	            _this.animate(then);
	        });
	        var now = Date.now();
	        var elapsed = now - then;
	        if (elapsed > fpsInterval) {
	            then = now - (elapsed % fpsInterval);
	            entities_1.Creature.active.control(this.keyPress);
	            entities_1.World.camera.update();
	            entities_1.World.draw();
	        }
	    };
	    Game.prototype._keydown = function (event) {
	        this.keyPress[event.keyCode] = true;
	    };
	    Game.prototype._keyup = function (event) {
	        this.keyPress[event.keyCode] = false;
	    };
	    __decorate([
	        core_1.ViewChild("gameCanvas"), 
	        __metadata('design:type', (typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object)
	    ], Game.prototype, "gameCanvas", void 0);
	    Game = __decorate([
	        core_1.Component({
	            selector: 'game',
	            styles: [__webpack_require__(763)],
	            template: __webpack_require__(557),
	            host: {
	                '(document:keyup)': '_keyup($event)',
	                '(document:keydown)': '_keydown($event)',
	            },
	        }), 
	        __metadata('design:paramtypes', [(typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object, (typeof (_c = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _c) || Object, (typeof (_d = typeof app_service_1.AppState !== 'undefined' && app_service_1.AppState) === 'function' && _d) || Object])
	    ], Game);
	    return Game;
	    var _a, _b, _c, _d;
	}());
	exports.Game = Game;
	

/***/ },

/***/ 549:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(548));
	

/***/ },

/***/ 550:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var app_service_1 = __webpack_require__(117);
	var router_1 = __webpack_require__(99);
	var Home = (function () {
	    function Home(appState, router) {
	        this.appState = appState;
	        this.router = router;
	        this.localState = { nickname: '' };
	    }
	    Home.prototype.ngOnInit = function () {
	        console.log('hello `Home` component');
	        // this.title.getData().subscribe(data => this.data = data);
	    };
	    Home.prototype.submitState = function (value) {
	        this.appState.set('nickname', value);
	        this.localState.nickname = '';
	        this.router.navigate(['game']);
	    };
	    Home = __decorate([
	        core_1.Component({
	            selector: 'home',
	            styles: [__webpack_require__(764)],
	            template: __webpack_require__(558)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof app_service_1.AppState !== 'undefined' && app_service_1.AppState) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object])
	    ], Home);
	    return Home;
	    var _a, _b;
	}());
	exports.Home = Home;
	

/***/ },

/***/ 551:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(550));
	

/***/ },

/***/ 552:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	// App
	__export(__webpack_require__(545));
	__export(__webpack_require__(117));
	__export(__webpack_require__(378));
	var app_service_2 = __webpack_require__(117);
	// Application wide providers
	exports.APP_PROVIDERS = [
	    app_service_2.AppState
	];
	

/***/ },

/***/ 553:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(554));
	

/***/ },

/***/ 554:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var NoContent = (function () {
	    function NoContent() {
	    }
	    NoContent = __decorate([
	        core_1.Component({
	            selector: 'no-content',
	            template: "\n    <div>\n      <h1>404: page missing</h1>\n    </div>\n  "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NoContent);
	    return NoContent;
	}());
	exports.NoContent = NoContent;
	

/***/ },

/***/ 555:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(382));
	__export(__webpack_require__(383));
	__export(__webpack_require__(384));
	var browser_directives_2 = __webpack_require__(382);
	var browser_pipes_2 = __webpack_require__(383);
	var browser_providers_2 = __webpack_require__(384);
	exports.PLATFORM_PROVIDERS = browser_providers_2.PROVIDERS.concat(browser_directives_2.DIRECTIVES, browser_pipes_2.PIPES);
	

/***/ },

/***/ 556:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// Angular 2
	// rc2 workaround
	var platform_browser_1 = __webpack_require__(112);
	var core_1 = __webpack_require__(1);
	// Environment Providers
	var PROVIDERS = [];
	// Angular debug tools in the dev console
	// https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
	var _decorateComponentRef = function identity(value) { return value; };
	if (false) {
	    // Production
	    platform_browser_1.disableDebugTools();
	    core_1.enableProdMode();
	    PROVIDERS = PROVIDERS.slice();
	}
	else {
	    _decorateComponentRef = function (cmpRef) {
	        var _ng = window.ng;
	        platform_browser_1.enableDebugTools(cmpRef);
	        window.ng.probe = _ng.probe;
	        window.ng.coreTokens = _ng.coreTokens;
	        return cmpRef;
	    };
	    // Development
	    PROVIDERS = PROVIDERS.slice();
	}
	exports.decorateComponentRef = _decorateComponentRef;
	exports.ENV_PROVIDERS = PROVIDERS.slice();
	

/***/ },

/***/ 557:
/***/ function(module, exports) {

	module.exports = "<div class=\"card-container\">\n  <div id=\"container\">\n    <canvas #gameCanvas [width]=\"canvasWidth\" [height]=\"canvasHeight\"></canvas>\n  </div>\n</div>\n"

/***/ },

/***/ 558:
/***/ function(module, exports) {

	module.exports = "<div class=\"card-container\">\n\n  <div>\n    <h4>Enter nickname</h4>\n\n    <form (ngSubmit)=\"submitState(localState.nickname)\" autocomplete=\"off\">\n      <input type=\"text\" name=\"textInput\" [(ngModel)]=\"localState.nickname\" autofocus>\n\n      <button md-raised-button color=\"primary\">Login</button>\n    </form>\n\n  </div>\n\n</div>\n"

/***/ },

/***/ 566:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(5);
	var of_1 = __webpack_require__(165);
	Observable_1.Observable.of = of_1.of;
	//# sourceMappingURL=of.js.map

/***/ },

/***/ 762:
/***/ function(module, exports) {

	module.exports = "body{\n  margin: 0;\n  overflow: hidden;\n}\n"

/***/ },

/***/ 763:
/***/ function(module, exports) {

	module.exports = "/*styles for game content only*/\n\n#canvas{\n  border: 1px solid blue;\n}\n#state{\n  float: left;\n  width: 40%;\n}\n#render{\n  float: left;\n  width: 60%;\n}\n"

/***/ },

/***/ 764:
/***/ function(module, exports) {

	module.exports = "/*styles for home content only*/"

/***/ }

});
//# sourceMappingURL=main.map