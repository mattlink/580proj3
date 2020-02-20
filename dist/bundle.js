(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActionDirection;
(function (ActionDirection) {
    ActionDirection[ActionDirection["Up"] = 0] = "Up";
    ActionDirection[ActionDirection["Down"] = 1] = "Down";
    ActionDirection[ActionDirection["Left"] = 2] = "Left";
    ActionDirection[ActionDirection["Right"] = 3] = "Right";
})(ActionDirection = exports.ActionDirection || (exports.ActionDirection = {}));
var Action = /** @class */ (function () {
    function Action(actor) {
        this.actor = actor;
    }
    return Action;
}());
exports.Action = Action;

},{}],2:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// An Action for chopping down a tree
var Action_1 = require("./Action");
var Environment_1 = require("../Rooms/Environment");
var ChopAction = /** @class */ (function (_super) {
    __extends(ChopAction, _super);
    function ChopAction(dir, actor) {
        var _this = _super.call(this, actor) || this;
        _this.dir = dir;
        return _this;
    }
    ChopAction.prototype.perform = function (world) {
        var room = world.getActiveRoom();
        // TODO: Check if the player can actually make a ChopAction
        // Do they have an axe, or another item capable of doing this?
        switch (this.dir) {
            case Action_1.ActionDirection.Up:
                // If there is a tree above, chop it..
                var object = room.getObject(this.actor.x, this.actor.y - 1);
                if (!(object instanceof Environment_1.Tree)) {
                    break;
                }
                // Attempt to chop down the tree
                break;
            case Action_1.ActionDirection.Down:
                break;
            case Action_1.ActionDirection.Left:
                break;
            case Action_1.ActionDirection.Right:
                break;
            default:
                break;
        }
    };
    return ChopAction;
}(Action_1.Action));
exports.ChopAction = ChopAction;

},{"../Rooms/Environment":15,"./Action":1}],3:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Action_1 = require("./Action");
var Door_1 = require("../Rooms/Door");
var DoorAction = /** @class */ (function (_super) {
    __extends(DoorAction, _super);
    function DoorAction(actor) {
        return _super.call(this, actor) || this;
    }
    DoorAction.prototype.perform = function (world) {
        var fromRoom = world.getActiveRoom();
        // check if the actor is standing on a door
        var door = fromRoom.getObject(this.actor.x, this.actor.y);
        if (door instanceof Door_1.Door) {
            if (door.toRoom == null)
                return; // door internal to a Room
            // Remove the actor from the room they're leaving
            fromRoom.getActors().splice(fromRoom.getActors().indexOf(this.actor), 1);
            // Add the actor to the room they're entering
            door.toRoom.addActor(this.actor);
            // Set the active room status on the world to the room that we're going to
            world.setActiveRoom(door.toRoom);
        }
    };
    return DoorAction;
}(Action_1.Action));
exports.DoorAction = DoorAction;

},{"../Rooms/Door":14,"./Action":1}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Action_1 = require("./Action");
var WaitAction = /** @class */ (function (_super) {
    __extends(WaitAction, _super);
    function WaitAction(actor) {
        return _super.call(this, actor) || this;
    }
    WaitAction.prototype.perform = function (world) {
        // Do nothing. Just wait.
    };
    return WaitAction;
}(Action_1.Action));
exports.WaitAction = WaitAction;

},{"./Action":1}],5:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Action_1 = require("./Action");
var Environment_1 = require("../Rooms/Environment");
var WalkAction = /** @class */ (function (_super) {
    __extends(WalkAction, _super);
    function WalkAction(dir, actor) {
        var _this = _super.call(this, actor) || this;
        _this.dir = dir;
        return _this;
    }
    WalkAction.prototype.perform = function (world) {
        // Try to use our item if we have one equipt
        if (this.actor.equipt) {
            var item = this.actor.equipt;
            var success = item.use(this.actor, this.dir, world);
            if (success)
                return;
        }
        var room = world.getActiveRoom();
        var fromObject = room.getObject(this.actor.x, this.actor.y);
        var toObject = null;
        if (this.dir == Action_1.ActionDirection.Up)
            toObject = room.getObject(this.actor.x, this.actor.y - 1);
        if (this.dir == Action_1.ActionDirection.Down)
            toObject = room.getObject(this.actor.x, this.actor.y + 1);
        if (this.dir == Action_1.ActionDirection.Left)
            toObject = room.getObject(this.actor.x - 1, this.actor.y);
        if (this.dir == Action_1.ActionDirection.Right)
            toObject = room.getObject(this.actor.x + 1, this.actor.y);
        if (!toObject.collides) {
            if (fromObject instanceof Environment_1.Floor) {
                room.objects[this.actor.x][this.actor.y].removeOccupation();
            }
            // actually move in desired direction
            if (this.dir == Action_1.ActionDirection.Up)
                this.actor.y = this.actor.y - 1;
            if (this.dir == Action_1.ActionDirection.Down)
                this.actor.y = this.actor.y + 1;
            if (this.dir == Action_1.ActionDirection.Left)
                this.actor.x = this.actor.x - 1;
            if (this.dir == Action_1.ActionDirection.Right)
                this.actor.x = this.actor.x + 1;
            if (toObject instanceof Environment_1.Floor) {
                room.objects[this.actor.x][this.actor.y].setOccupation(this.actor);
            }
        }
        else {
            if (this.actor.debug) {
                console.log('COLLISION: ', this.actor);
            }
        }
    };
    return WalkAction;
}(Action_1.Action));
exports.WalkAction = WalkAction;

},{"../Rooms/Environment":15,"./Action":1}],6:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GameObject_1 = require("../GameObject");
// essentially, "Actors" are GameObjects that are allowed to takeTurns and have names.
var Actor = /** @class */ (function (_super) {
    __extends(Actor, _super);
    function Actor(name, x, y, tile) {
        var _this = _super.call(this, x, y, tile) || this;
        _this.debug = false;
        _this.name = name;
        return _this;
    }
    return Actor;
}(GameObject_1.GameObject));
exports.Actor = Actor;

},{"../GameObject":10}],7:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Actor_1 = require("./Actor");
var Action_1 = require("../Actions/Action");
var WalkAction_1 = require("../Actions/WalkAction");
var WaitAction_1 = require("../Actions/WaitAction");
var Mob = /** @class */ (function (_super) {
    __extends(Mob, _super);
    function Mob(name, x, y, tile) {
        var _this = _super.call(this, name, x, y, tile) || this;
        _this.nextAction = new WaitAction_1.WaitAction(_this);
        _this.collides = true;
        return _this;
    }
    Mob.prototype.takeTurn = function (world) {
        if (this.debug)
            console.log('DEBUG:', this.name, "taking turn.", this.x, this.y);
        var actionList = [
            new WaitAction_1.WaitAction(this),
            new WalkAction_1.WalkAction(Action_1.ActionDirection.Up, this),
            new WalkAction_1.WalkAction(Action_1.ActionDirection.Down, this),
            new WalkAction_1.WalkAction(Action_1.ActionDirection.Left, this),
            new WalkAction_1.WalkAction(Action_1.ActionDirection.Right, this)
        ];
        var r = Math.floor(Math.random() * (actionList.length));
        actionList[r].perform(world);
        // actionList[0].perform();
    };
    return Mob;
}(Actor_1.Actor));
exports.Mob = Mob;

},{"../Actions/Action":1,"../Actions/WaitAction":4,"../Actions/WalkAction":5,"./Actor":6}],8:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Actor_1 = require("./Actor");
var Action_1 = require("../Actions/Action");
var WaitAction_1 = require("../Actions/WaitAction");
var WalkAction_1 = require("../Actions/WalkAction");
var DoorAction_1 = require("../Actions/DoorAction");
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(x0, y0, tile) {
        var _this = _super.call(this, "Player", x0, y0, tile) || this;
        _this.nextAction = new WaitAction_1.WaitAction(_this);
        return _this;
    }
    Player.prototype.receiveKeyInput = function (key) {
        if (key == 'w') {
            this.nextAction = new WalkAction_1.WalkAction(Action_1.ActionDirection.Up, this);
        }
        else if (key == 'a') {
            this.nextAction = new WalkAction_1.WalkAction(Action_1.ActionDirection.Left, this);
        }
        else if (key == 's') {
            this.nextAction = new WalkAction_1.WalkAction(Action_1.ActionDirection.Down, this);
        }
        else if (key == 'd') {
            this.nextAction = new WalkAction_1.WalkAction(Action_1.ActionDirection.Right, this);
        }
        else if (key == '>') {
            this.nextAction = new DoorAction_1.DoorAction(this);
        }
        else {
            this.nextAction = new WaitAction_1.WaitAction(this);
        }
    };
    Player.prototype.takeTurn = function (world) {
        this.nextAction.perform(world);
    };
    return Player;
}(Actor_1.Actor));
exports.Player = Player;

},{"../Actions/Action":1,"../Actions/DoorAction":3,"../Actions/WaitAction":4,"../Actions/WalkAction":5,"./Actor":6}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game = /** @class */ (function () {
    function Game() {
    }
    return Game;
}());
exports.Game = Game;

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameObject = /** @class */ (function () {
    function GameObject(x, y, tile) {
        this.x = x;
        this.y = y;
        this.tile = tile;
        this.collides = false;
    }
    GameObject.prototype.getTile = function () {
        return this.tile;
    };
    return GameObject;
}());
exports.GameObject = GameObject;

},{}],11:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GameObject_1 = require("../GameObject");
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Item;
}(GameObject_1.GameObject));
exports.Item = Item;

},{"../GameObject":10}],12:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Action_1 = require("../Actions/Action");
var Environment_1 = require("../Rooms/Environment");
var Item_1 = require("./Item");
var ShovelAction = /** @class */ (function (_super) {
    __extends(ShovelAction, _super);
    function ShovelAction(actor, dir) {
        var _this = _super.call(this, actor) || this;
        _this.dir = dir;
        return _this;
    }
    ShovelAction.prototype.perform = function (world) {
        var room = world.getActiveRoom();
        var toPosX = null;
        var toPosY = null;
        if (this.dir == Action_1.ActionDirection.Up) {
            toPosX = this.actor.x;
            toPosY = this.actor.y - 1;
        }
        if (this.dir == Action_1.ActionDirection.Down) {
            toPosX = this.actor.x;
            toPosY = this.actor.y + 1;
        }
        if (this.dir == Action_1.ActionDirection.Left) {
            toPosX = this.actor.x - 1;
            toPosY = this.actor.y;
        }
        if (this.dir == Action_1.ActionDirection.Right) {
            toPosX = this.actor.x + 1;
            toPosY = this.actor.y;
        }
        // TODO: this is where you add something to inventory
        // Change this to "DirtWall" or "DiggableWall"... do we want to be able to dig out any walls?
        if (room.objects[toPosX][toPosY] instanceof Environment_1.Wall) {
            // this.actor.inventory.add(room.objects[toPosX][toPosY]); 
            room.objects[toPosX][toPosY] = new Environment_1.Floor(toPosX, toPosY, room.floorTile);
            return true;
        }
        return false;
    };
    return ShovelAction;
}(Action_1.Action));
var ShovelItem = /** @class */ (function (_super) {
    __extends(ShovelItem, _super);
    function ShovelItem(x, y, tile) {
        return _super.call(this, x, y, tile) || this;
    }
    ShovelItem.prototype.use = function (actor, dir, world) {
        var action = new ShovelAction(actor, dir);
        var success = action.perform(world);
        return success;
    };
    return ShovelItem;
}(Item_1.Item));
exports.ShovelItem = ShovelItem;

},{"../Actions/Action":1,"../Rooms/Environment":15,"./Item":11}],13:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Environment_1 = require("./Environment");
var Room_1 = require("./Room");
var tile_1 = require("../tile");
var util_1 = require("../util");
var Cave = /** @class */ (function (_super) {
    __extends(Cave, _super);
    function Cave(width, height, name) {
        var _this = _super.call(this, width, height, name) || this;
        _this.caveBrown = '#995e06';
        // Set up Cave-specific tile info
        _this.wallTile = new tile_1.Tile('#', _this.caveBrown, _this.defaultBgColor);
        _this.floorTile = new tile_1.Tile('-', _this.caveBrown, _this.defaultBgColor);
        _this.defaultFogBg = '#937d91'; // a dark, purple hazy 
        // this.defaultFogFg = this.caveBrown;
        _this.defaultFogFg = 'black';
        return _this;
    }
    Cave.prototype.init = function () {
        // Create the internal room structure
        var baseArea = new Room_1.Area(0, 0, this.getWidth(), this.getHeight());
        var tree = new util_1.BSPTree(null, null, baseArea);
        var BSPiterations = 2;
        var CAiterations = 3;
        // Generate a Symmetric BSP Tree
        this.generateSymmetricBSPTreeHorizontal(BSPiterations, tree);
        // Loop over leaves of binary tree, initializing each area at the leaf
        this.initAreas(tree, true);
        // Apply CA to each leaf of our BSP Tree
        this.applyCAtoBSPLeaves(tree, CAiterations);
        /**
         * Example of just CA (without BSP):
         */
        // initialize the area with random walls as a starting point for CA
        //this.initArea(baseArea, true); // sets random flag to true
        //this.generateCA(5, baseArea);
    };
    Cave.prototype.init_ = function () {
        for (var i = 0; i < this.getHeight(); i++) {
            this.objects[i] = [];
            for (var j = 0; j < this.getWidth(); j++) {
                /* Wall Placement */
                if (i == 0 && j == this.getWidth() - 1) {
                    this.objects[i][j] = new Environment_1.Wall(i, j, new tile_1.Tile(Environment_1.Wall.botLeft.ascii, this.caveBrown, this.defaultBgColor));
                    continue;
                }
                if (i == 0 && j == 0) {
                    this.objects[i][j] = new Environment_1.Wall(i, j, new tile_1.Tile(Environment_1.Wall.topLeft.ascii, this.caveBrown, this.defaultBgColor));
                    continue;
                }
                if (i == this.getHeight() - 1 && j == this.getWidth() - 1) {
                    this.objects[i][j] = new Environment_1.Wall(i, j, new tile_1.Tile(Environment_1.Wall.botRight.ascii, this.caveBrown, this.defaultBgColor));
                    continue;
                }
                if (i == this.getHeight() - 1 && j == 0) {
                    this.objects[i][j] = new Environment_1.Wall(i, j, new tile_1.Tile(Environment_1.Wall.topRight.ascii, this.caveBrown, this.defaultBgColor));
                    continue;
                }
                if (i == 0 || i == this.getHeight() - 1) {
                    this.objects[i][j] = new Environment_1.Wall(i, j, new tile_1.Tile(Environment_1.Wall.vertical.ascii, this.caveBrown, this.defaultBgColor));
                    continue;
                }
                if (j == 0 || j == this.getWidth() - 1) {
                    this.objects[i][j] = new Environment_1.Wall(i, j, new tile_1.Tile(Environment_1.Wall.horizontal.ascii, this.caveBrown, this.defaultBgColor));
                    continue;
                }
                /* Floor Placement */
                // this.objects[i][j] = new Floor(i, j, new Tile('-', this.caveBrown, this.defaultBgColor));
                this.objects[i][j] = new Environment_1.Floor(i, j, this.floorTile);
                // this.objects[i][j] = new Floor(i, j, Floor.caveFloor[Math.floor(Math.random() * Floor.caveFloor.length)]);
            }
        }
    };
    return Cave;
}(Room_1.Room));
exports.Cave = Cave;

},{"../tile":25,"../util":26,"./Environment":15,"./Room":17}],14:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GameObject_1 = require("../GameObject");
var DoorType;
(function (DoorType) {
    DoorType[DoorType["NorthDoor"] = 0] = "NorthDoor";
    DoorType[DoorType["SouthDoor"] = 1] = "SouthDoor";
    DoorType[DoorType["WestDoor"] = 2] = "WestDoor";
    DoorType[DoorType["EastDoor"] = 3] = "EastDoor";
    DoorType[DoorType["TrapDoor"] = 4] = "TrapDoor";
    DoorType[DoorType["LadderDoor"] = 5] = "LadderDoor";
})(DoorType = exports.DoorType || (exports.DoorType = {}));
var Door = /** @class */ (function (_super) {
    __extends(Door, _super);
    function Door(x, y, tile, toRoom) {
        var _this = _super.call(this, x, y, tile) || this;
        _this.toRoom = toRoom;
        return _this;
    }
    return Door;
}(GameObject_1.GameObject));
exports.Door = Door;

},{"../GameObject":10}],15:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GameObject_1 = require("../GameObject");
var tile_1 = require("../tile");
var Tree = /** @class */ (function (_super) {
    __extends(Tree, _super);
    function Tree(x, y, tile) {
        var _this = _super.call(this, x, y, tile) || this;
        _this.collides = true;
        return _this;
    }
    Tree.trees = [
        new tile_1.Tile('Y', 'green', 'white')
    ];
    return Tree;
}(GameObject_1.GameObject));
exports.Tree = Tree;
var Floor = /** @class */ (function (_super) {
    __extends(Floor, _super);
    function Floor(x, y, tile) {
        var _this = _super.call(this, x, y, tile) || this;
        _this.occupiedBy = null;
        _this.collides = false;
        return _this;
    }
    Floor.prototype.setOccupation = function (actor) {
        this.occupiedBy = actor;
        this.collides = true;
    };
    Floor.prototype.removeOccupation = function () {
        this.occupiedBy = null;
        this.collides = false;
    };
    Floor.forestTiles = [
        new tile_1.Tile('&#8283;', 'black', 'white'),
        new tile_1.Tile('&#775;', 'black', 'white'),
        new tile_1.Tile('&#803;', 'black', 'white'),
        new tile_1.Tile('&#856;', 'black', 'white')
    ];
    return Floor;
}(GameObject_1.GameObject));
exports.Floor = Floor;
var Wall = /** @class */ (function (_super) {
    __extends(Wall, _super);
    function Wall(x, y, tile) {
        var _this = _super.call(this, x, y, tile) || this;
        _this.collides = true;
        return _this;
    }
    /* BIG TODO:
        Walls should be able to contain "doors" that let you travel from room to room....
    */
    Wall.wallFg = 'black';
    Wall.wallBg = 'white';
    // static basicTile = new Tile('#', Wall.wallFg, Wall.wallBg);
    // static botLeft = new Tile('&#9562;', Wall.wallFg, Wall.wallBg);
    Wall.botLeft = new tile_1.Tile('&#9492;', Wall.wallFg, Wall.wallBg);
    // static botLeft = Wall.basicTile; 
    // static botRight = new Tile('&#9565;', Wall.wallFg, Wall.wallBg);
    Wall.botRight = new tile_1.Tile('&#9496;', Wall.wallFg, Wall.wallBg);
    // static botRight = Wall.basicTile;
    // static topLeft = new Tile('&#9556;', Wall.wallFg, Wall.wallBg);
    Wall.topLeft = new tile_1.Tile('&#9484;', Wall.wallFg, Wall.wallBg);
    // static topLeft = Wall.basicTile;
    // static topRight = new Tile('&#9559;', Wall.wallFg, Wall.wallBg);
    Wall.topRight = new tile_1.Tile('&#9488;', Wall.wallFg, Wall.wallBg);
    // static topRight = Wall.basicTile;
    Wall.vertical = new tile_1.Tile('&#9474;', Wall.wallFg, Wall.wallBg);
    Wall.horizontal = new tile_1.Tile('&#9472;&#9472;', Wall.wallFg, Wall.wallBg);
    return Wall;
}(GameObject_1.GameObject));
exports.Wall = Wall;

},{"../GameObject":10,"../tile":25}],16:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Environment_1 = require("./Environment");
var Room_1 = require("./Room");
var Forest = /** @class */ (function (_super) {
    __extends(Forest, _super);
    function Forest(width, height, name) {
        return _super.call(this, width, height, name) || this;
    }
    Forest.prototype.init = function () {
        this.init_();
        // let baseArea = new Area(0, 0, this.getHeight(), this.getWidth());
        // this.initArea(baseArea);
    };
    Forest.prototype.init_ = function () {
        for (var i = 0; i < this.getWidth(); i++) {
            for (var j = 0; j < this.getHeight(); j++) {
                if (i == 0 && j == this.getHeight() - 1) {
                    this.objects[i][j] = new Environment_1.Wall(i, j, Environment_1.Wall.botLeft);
                    continue;
                }
                if (i == 0 && j == 0) {
                    this.objects[i][j] = new Environment_1.Wall(i, j, Environment_1.Wall.topLeft);
                    continue;
                }
                if (i == this.getWidth() - 1 && j == this.getHeight() - 1) {
                    this.objects[i][j] = new Environment_1.Wall(i, j, Environment_1.Wall.botRight);
                    continue;
                }
                if (i == this.getWidth() - 1 && j == 0) {
                    this.objects[i][j] = new Environment_1.Wall(i, j, Environment_1.Wall.topRight);
                    continue;
                }
                if (i == 0 || i == this.getWidth() - 1) {
                    this.objects[i][j] = new Environment_1.Wall(i, j, Environment_1.Wall.vertical);
                    continue;
                }
                if (j == 0 || j == this.getHeight() - 1) {
                    this.objects[i][j] = new Environment_1.Wall(i, j, Environment_1.Wall.horizontal);
                    continue;
                }
                var rand = Math.floor(Math.random() * 10);
                if (rand > 7) {
                    this.objects[i][j] = new Environment_1.Tree(i, j, Environment_1.Tree.trees[0]);
                }
                else {
                    this.objects[i][j] = new Environment_1.Floor(i, j, Environment_1.Floor.forestTiles[Math.floor(Math.random() * 4)]);
                }
            }
        }
        //let baseArea = new Area(0, 0, this.getHeight(), this.getWidth());
        //this.generateCA(3, baseArea);
    };
    return Forest;
}(Room_1.Room));
exports.Forest = Forest;

},{"./Environment":15,"./Room":17}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameObject_1 = require("../GameObject");
var tile_1 = require("../tile");
var Door_1 = require("./Door");
var Environment_1 = require("./Environment");
var util_1 = require("../util");
// An instance of Area represents some area of a Room, usually walled off
// Generally we apply our proc gen algorithms to Areas rather than ActionDirection to Rooms
var Area = /** @class */ (function () {
    function Area(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    return Area;
}());
exports.Area = Area;
var Room = /** @class */ (function () {
    function Room(width, height, name) {
        this.northDoor = null;
        this.southDoor = null;
        this.westDoor = null;
        this.eastDoor = null;
        this.wallDoorTile = new tile_1.Tile('*', 'orange', 'black');
        this.trapDoorTile = new tile_1.Tile('#', 'orange', 'black');
        this.ladderDoorTile = new tile_1.Tile('\\', 'orange', 'black');
        this.defaultFogBg = '#e9ecef'; // a sort of gray color
        this.defaultFogFg = 'black';
        this.defaultBgColor = 'black';
        this.defaultFgColor = 'white';
        this.floorTile = new tile_1.Tile('.', this.defaultFgColor, this.defaultBgColor);
        this.wallTile = new tile_1.Tile('#', this.defaultFgColor, this.defaultBgColor);
        this.width = width;
        this.height = height;
        this.objects = [];
        this.actors = [];
        this.name = name;
        // initialize all objects in room to empty game objects
        for (var i = 0; i < this.getWidth(); i++) {
            this.objects[i] = [];
            for (var j = 0; j < this.getHeight(); j++) {
                this.objects[i][j] = new GameObject_1.GameObject(i, j, new tile_1.Tile(' ', 'black', 'black'));
            }
        }
    }
    // abstract placeDoor(toRoom: Room, type: DoorType, x?: number, y?: number): void;
    Room.prototype.placeDoor = function (toRoom, type, x1, y1) {
        switch (type) {
            case Door_1.DoorType.TrapDoor: {
                var x = Math.floor(Math.random() * this.getWidth());
                var y = Math.floor(Math.random() * this.getHeight());
                this.objects[x][y] = new Door_1.Door(x, y, this.trapDoorTile, toRoom);
                return { x: x, y: y };
                // toRoom.placeDoor(this, DoorType.LadderDoor, x, y);
                break;
            }
            case Door_1.DoorType.LadderDoor: {
                // let y = Math.floor(Math.random() * this.getHeight() - 1) + 1;
                // let x = Math.floor(Math.random() * this.getWidth() - 1) + 1;
                this.objects[x1 + 1][y1 + 1] = new Door_1.Door(x1 + 1, y1 + 1, this.ladderDoorTile, toRoom);
                return { x1: x1, y1: y1 };
                break;
                // console.error('LadderDoor requires you to manually set the x and y of the door');
                // break;
            }
            case Door_1.DoorType.NorthDoor: {
                var y = 0;
                var x = Math.floor(this.getWidth() / 2);
                console.log('Placing NorthDoor: ', x, y);
                this.objects[x][y] = new Door_1.Door(x, y, this.wallDoorTile, toRoom);
                return { x: x, y: y };
                // toRoom.placeDoor(this, DoorType.SouthDoor);
                break;
            }
            case Door_1.DoorType.SouthDoor: {
                var y = this.getHeight() - 1;
                var x = Math.floor(this.getWidth() / 2);
                this.objects[x][y] = new Door_1.Door(x, y, this.wallDoorTile, toRoom);
                return { x: x, y: y };
                // toRoom.placeDoor(this, DoorType.NorthDoor);
                break;
            }
            case Door_1.DoorType.EastDoor: {
                var y = this.getHeight() / 2;
                var x = 0;
                this.objects[x][y] = new Door_1.Door(x, y, this.wallDoorTile, toRoom);
                return { x: x, y: y };
                // toRoom.placeDoor(this, DoorType.WestDoor);
                break;
            }
            case Door_1.DoorType.WestDoor: {
                var y = this.getHeight() / 2;
                var x = this.getWidth() - 1;
                this.objects[x][y] = new Door_1.Door(x, y, this.wallDoorTile, toRoom);
                return { x: x, y: y };
                // toRoom.placeDoor(this, DoorType.EastDoor);
                break;
            }
            default: {
                console.log("DoorType:", type, " not supported by ", this.name);
                break;
            }
        }
    };
    Room.prototype.placeItem = function (item) {
        this.objects[item.x][item.y] = item;
    };
    Room.prototype.handleActorTurns = function (world) {
        this.actors.forEach(function (actor) {
            actor.takeTurn(world);
        });
    };
    Room.prototype.addActor = function (actor) {
        this.actors.push(actor);
    };
    Room.prototype.getActors = function () {
        return this.actors;
    };
    Room.prototype.getObject = function (x, y) {
        return this.objects[x][y];
    };
    Room.prototype.getHeight = function () {
        return this.height;
    };
    Room.prototype.getWidth = function () {
        return this.width;
    };
    Room.prototype.getTiles = function () {
        var tiles = [];
        for (var i = 0; i < this.width; i++) {
            tiles[i] = [];
            for (var j = 0; j < this.height; j++) {
                tiles[i][j] = this.getObject(i, j).getTile();
            }
        }
        return tiles;
    };
    /********
     *  Various algorithms and room generation helpers
     */
    Room.prototype.correctSpawn = function (object) {
        // Correct the spawn if necessary
        if (this.getObject(object.x, object.y) instanceof Environment_1.Wall) {
            // Find the nearest tiles that is not a wall
            // let objects = world.getActiveRoom().getObject();
            var d = 1;
            var x = object.x;
            var y = object.y;
            var positionFound = false;
            var blockedNorth = false;
            var blockedEast = false;
            var blockedSouth = false;
            var blockedWest = false;
            while (!(positionFound || (blockedNorth && blockedEast && blockedSouth && blockedWest))) {
                // Look up by d
                if (y - d < 0) {
                    blockedNorth = true;
                    break;
                }
                if (!blockedNorth && this.getObject(x, y - d) instanceof Environment_1.Floor) {
                    object.x = x;
                    object.y = y - d;
                    positionFound = true;
                    console.log("Moved player to:", object.x, object.y);
                    break;
                }
                // Look down by d
                if (y + d > this.height - 1) {
                    blockedSouth = true;
                    break;
                }
                if (!blockedSouth && this.getObject(x, y + d) instanceof Environment_1.Floor) {
                    object.x = x;
                    object.y = y + d;
                    positionFound = true;
                    console.log("Moved player to:", object.x, object.y);
                    break;
                }
                // Look right by d
                if (x + d > this.width - 1) {
                    blockedEast = true;
                    break;
                }
                if (!blockedEast && this.getObject(x + d, y) instanceof Environment_1.Floor) {
                    object.x = x + d;
                    object.y = y;
                    positionFound = true;
                    console.log("Moved player to:", object.x, object.y);
                    break;
                }
                // Look left by d
                if (x - d < 0) {
                    blockedWest = true;
                    break;
                }
                if (!blockedWest && this.getObject(x - d, y) instanceof Environment_1.Floor) {
                    object.x = x - d;
                    object.y = y;
                    positionFound = true;
                    console.log("Moved player to:", object.x, object.y);
                    break;
                }
                d++;
            }
        }
    };
    Room.prototype.generateCA = function (iterations, area) {
        // Assume that we get an initially randomized area, instead of a totally plain one
        if (iterations == 0)
            return;
        var newObjects = [];
        for (var i = area.x + 1; i < area.width + area.x - 1; i++) {
            newObjects[i] = [];
        }
        for (var i = area.x + 1; i < area.width + area.x - 1; i++) {
            for (var j = area.y + 1; j < area.height + area.y - 1; j++) {
                if (this.getNeighboringWalls(i, j) > 4 && (this.objects[i][j] instanceof Environment_1.Wall || this.objects[i][j] instanceof Environment_1.Tree)
                    || this.getNeighboringWalls(i, j) > 5 && !(this.objects[i][j] instanceof Environment_1.Wall || this.objects[i][j] instanceof Environment_1.Tree)) {
                    newObjects[i][j] = new Environment_1.Wall(i, j, this.wallTile); //new Tile('#', CaveEnv.caveBrown, CaveEnv.roomBg));
                }
                else {
                    newObjects[i][j] = new Environment_1.Floor(i, j, this.floorTile); //new Tile('-', CaveEnv.caveBrown, CaveEnv.roomBg));
                }
            }
        }
        // redraw the new objects
        for (var i = area.x + 1; i < area.width + area.x - 1; i++) {
            for (var j = area.y + 1; j < area.height + area.y - 1; j++) {
                this.objects[i][j] = newObjects[i][j];
            }
        }
        iterations--;
        this.generateCA(iterations, area);
    };
    Room.prototype.getNeighboringWalls = function (x, y) {
        var wallCount = 0;
        for (var i = x - 1; i <= x + 1; i++) {
            for (var j = y - 1; j <= y + 1; j++) {
                if (this.objects[i][j] instanceof Environment_1.Wall) {
                    wallCount++;
                }
            }
        }
        return wallCount;
    };
    Room.prototype.generateSymmetricBSPTreeVertical = function (iterationsLeft, tree) {
        if (iterationsLeft == 0)
            return;
        var baseArea = tree.value;
        var x_offset = 0;
        var y_offset = 0;
        var leftWidth = baseArea.width;
        var leftHeight = baseArea.height;
        var rightWidth = baseArea.width;
        var rightHeight = baseArea.height;
        // do the vertical split
        x_offset = Math.floor(baseArea.width / 2);
        leftWidth = x_offset;
        rightWidth = baseArea.width - x_offset;
        tree.left = new util_1.BSPTree(null, null, new Area(baseArea.x, baseArea.y, leftWidth, leftHeight));
        tree.right = new util_1.BSPTree(null, null, new Area(baseArea.x + x_offset, baseArea.y + y_offset, rightWidth, rightHeight));
        iterationsLeft--;
        this.generateSymmetricBSPTreeHorizontal(iterationsLeft, tree.left);
        this.generateSymmetricBSPTreeHorizontal(iterationsLeft, tree.right);
    };
    Room.prototype.generateSymmetricBSPTreeHorizontal = function (iterationsLeft, tree) {
        if (iterationsLeft == 0)
            return;
        var baseArea = tree.value;
        var x_offset = 0;
        var y_offset = 0;
        var leftWidth = baseArea.width;
        var leftHeight = baseArea.height;
        var rightWidth = baseArea.width;
        var rightHeight = baseArea.height;
        // do the horizontal split
        y_offset = Math.floor(baseArea.height / 2);
        leftHeight = y_offset;
        rightHeight = baseArea.height - y_offset;
        tree.left = new util_1.BSPTree(null, null, new Area(baseArea.x, baseArea.y, leftWidth, leftHeight));
        tree.right = new util_1.BSPTree(null, null, new Area(baseArea.x + x_offset, baseArea.y + y_offset, rightWidth, rightHeight));
        iterationsLeft--;
        this.generateSymmetricBSPTreeVertical(iterationsLeft, tree.left);
        this.generateSymmetricBSPTreeVertical(iterationsLeft, tree.right);
    };
    Room.prototype.generateBSPTree = function (iterationsLeft, tree) {
        if (iterationsLeft == 0)
            return;
        var baseArea = tree.value;
        var dir = Math.floor(Math.random() * 2);
        var x_offset = 0;
        var y_offset = 0;
        var leftWidth = baseArea.width;
        var leftHeight = baseArea.height;
        var rightWidth = baseArea.width;
        var rightHeight = baseArea.height;
        if (dir == 0) { // vertical split
            //x_offset = Math.max(Math.floor(Math.random() * (baseArea.width / 2)), Math.floor(Math.random() * (baseArea.width)));
            x_offset = Math.floor(baseArea.width / 2);
            console.log("Vertical split w x_offset:", x_offset);
            leftWidth = x_offset;
            rightWidth = baseArea.width - x_offset;
        }
        if (dir == 1) { // horizontal split
            // y_offset = Math.max(Math.floor(Math.random() * (baseArea.height / 2)), Math.floor(Math.random() * (baseArea.height)));
            y_offset = Math.floor(baseArea.height / 2);
            console.log("Horizontal split w y_offset", y_offset);
            leftHeight = y_offset;
            rightHeight = baseArea.height - y_offset;
        }
        tree.left = new util_1.BSPTree(null, null, new Area(baseArea.x, baseArea.y, leftWidth, leftHeight));
        tree.right = new util_1.BSPTree(null, null, new Area(baseArea.x + x_offset, baseArea.y + y_offset, rightWidth, rightHeight));
        iterationsLeft--;
        this.generateBSPTree(iterationsLeft, tree.left);
        this.generateBSPTree(iterationsLeft, tree.right);
    };
    Room.prototype.applyCAtoBSPLeaves = function (tree, iterations) {
        if (tree.left == null && tree.right == null) {
            this.generateCA(iterations, tree.value);
        }
        if (tree.left != null) {
            this.applyCAtoBSPLeaves(tree.left, iterations);
        }
        if (tree.right != null) {
            this.applyCAtoBSPLeaves(tree.right, iterations);
        }
    };
    /**
     * Method for recursively drawing all Area leaves in a BSPTree
     */
    Room.prototype.initAreas = function (tree, random) {
        if (tree.left == null && tree.right == null) {
            // draw this area
            this.initArea(tree.value, random);
        }
        if (tree.left != null) {
            this.initAreas(tree.left, random);
        }
        if (tree.right != null) {
            this.initAreas(tree.right, random);
        }
    };
    // Draws an area with wall around it, TODO: more sophisticated area drawing (subarea drawing, etc)
    Room.prototype.initArea = function (area, random) {
        var x = area.x;
        var y = area.y;
        var l = area.width; //area.width - 1;
        var h = area.height; //area.height - 1;
        for (var i = x; i < x + l; i++) {
            for (var j = y; j < y + h; j++) {
                if (i == x && j == (y + h) - 1) {
                    // this.objects[i][j] = new Wall(i, j, new Tile(Wall.botLeft.ascii, CaveEnv.caveBrown, CaveEnv.roomBg));
                    this.objects[i][j] = new Environment_1.Wall(i, j, this.wallTile);
                    continue;
                }
                if (i == x && j == y) {
                    // this.objects[i][j] = new Wall(i, j, new Tile(Wall.topLeft.ascii, CaveEnv.caveBrown, CaveEnv.roomBg));
                    this.objects[i][j] = new Environment_1.Wall(i, j, this.wallTile);
                    continue;
                }
                if (i == (x + l) - 1 && j == (y + h) - 1) {
                    // this.objects[i][j] = new Wall(i, j, new Tile(Wall.botRight.ascii, CaveEnv.caveBrown, CaveEnv.roomBg));
                    this.objects[i][j] = new Environment_1.Wall(i, j, this.wallTile);
                    continue;
                }
                if (i == (x + l) - 1 && j == y) {
                    // this.objects[i][j] = new Wall(i, j, new Tile(Wall.topRight.ascii, CaveEnv.caveBrown, CaveEnv.roomBg));
                    this.objects[i][j] = new Environment_1.Wall(i, j, this.wallTile);
                    continue;
                }
                if (i == x || i == (x + l) - 1) {
                    // this.objects[i][j] = new Wall(i, j, new Tile(Wall.vertical.ascii, CaveEnv.caveBrown, CaveEnv.roomBg));
                    this.objects[i][j] = new Environment_1.Wall(i, j, this.wallTile);
                    continue;
                }
                if (j == y || j == (y + h) - 1) {
                    // this.objects[i][j] = new Wall(i, j, new Tile(Wall.horizontal.ascii, CaveEnv.caveBrown, CaveEnv.roomBg));
                    this.objects[i][j] = new Environment_1.Wall(i, j, this.wallTile);
                    continue;
                }
                if (random) {
                    var r = Math.floor(Math.random() * 2);
                    if (r == 0)
                        this.objects[i][j] = new Environment_1.Floor(i, j, this.floorTile); //new Floor(i, j, new Tile('-', CaveEnv.caveBrown, CaveEnv.roomBg));
                    else if (r == 1)
                        this.objects[i][j] = new Environment_1.Wall(i, j, this.wallTile); //new Tile('#', CaveEnv.caveBrown, CaveEnv.roomBg));
                }
                else {
                    // Otherwise, place a Floor object tile
                    this.objects[i][j] = new Environment_1.Floor(i, j, this.floorTile); //new Tile('-', CaveEnv.caveBrown, CaveEnv.roomBg));
                }
            }
        }
    };
    return Room;
}());
exports.Room = Room;

},{"../GameObject":10,"../tile":25,"../util":26,"./Door":14,"./Environment":15}],18:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var MenuElement = /** @class */ (function () {
    function MenuElement(rowSize) {
        ;
        this.rowSize = rowSize || 1;
    }
    return MenuElement;
}());
exports.MenuElement = MenuElement;
var MenuTitle = /** @class */ (function (_super) {
    __extends(MenuTitle, _super);
    function MenuTitle(title) {
        var _this = _super.call(this, 3) || this;
        _this.title = title;
        return _this;
    }
    return MenuTitle;
}(MenuElement));
exports.MenuTitle = MenuTitle;
var MenuOption = /** @class */ (function (_super) {
    __extends(MenuOption, _super);
    function MenuOption(name) {
        var _this = _super.call(this, 1) || this;
        _this.name = name;
        return _this;
    }
    return MenuOption;
}(MenuElement));
exports.MenuOption = MenuOption;
var Menu = /** @class */ (function () {
    function Menu(width, height) {
        this.defaultFg = 'black';
        this.defaultBg = 'white';
        this.defaultSelectedFg = 'black';
        this.defaultSelectedBg = 'lightGrey';
        this.elements = [];
        this.selectedElement = 0;
        this.width = width;
        this.height = height;
    }
    Menu.prototype.addElement = function (element) {
        this.elements.push(element);
    };
    Menu.prototype.getWidth = function () {
        return this.width;
    };
    Menu.prototype.getHeight = function () {
        return this.height;
    };
    return Menu;
}());
exports.Menu = Menu;

},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderer_1 = require("../renderer");
var Menu_1 = require("./Menu");
// Think of Windows as rendering contexts
// CONSIDERATION: do we want the windowing code to handle outlining the window itself?
var MenuWindow = /** @class */ (function () {
    function MenuWindow(menu, rowCount, startX, startY, localWidth, localHeight) {
        this.bordered = false;
        this.startX = startX || -1;
        this.startY = startY || -1;
        this.localWidth = localWidth;
        this.localHeight = localHeight;
        this.rowCount = rowCount;
        // if (startOptions) this.initContextStartMenu(startOptions);
        // else this.initContext();
        this.menu = menu;
        this.initMenuContext(this.menu);
        console.log('menu context init-ed', this.context.children);
    }
    MenuWindow.prototype.getContext = function () {
        return this.context;
    };
    MenuWindow.prototype.initMenuContext = function (menu) {
        this.context = document.createElement('div');
        this.context.style.display = 'block';
        this.context.style.height = renderer_1.Renderer.pxs(this.localHeight * renderer_1.Renderer.elementSize);
        this.context.style.width = renderer_1.Renderer.pxs(this.localWidth * renderer_1.Renderer.elementSize);
        if (this.startX == -1 && this.startY == -1) {
            this.context.style.margin = 'auto';
            // this.context.style.marginTop = Renderer.pxs(5);
        }
        else {
            this.context.style.position = 'absolute';
            this.context.style.left = renderer_1.Renderer.pxs(this.startX);
            this.context.style.top = renderer_1.Renderer.pxs(this.startY);
        }
        if (this.bordered) {
            this.context.style.border = 'solid';
            this.context.style.borderWidth = renderer_1.Renderer.pxs(2);
        }
        for (var i = 0; i < menu.elements.length; i++) {
            var elem = menu.elements[i];
            var child = document.createElement('div');
            child.style.height = renderer_1.Renderer.pxs(elem.rowSize * renderer_1.Renderer.elementSize);
            child.style.lineHeight = renderer_1.Renderer.pxs(elem.rowSize * renderer_1.Renderer.elementSize);
            if (elem instanceof Menu_1.MenuTitle) {
                child.innerHTML = elem.title;
                child.style.fontSize = '30px';
                child.style.fontStyle = 'italic';
                child.style.textAlign = 'center';
                child.id = 'menu-title';
            }
            if (elem instanceof Menu_1.MenuOption) {
                child.innerHTML = elem.name;
                child.style.margin = 'auto';
                child.style.textAlign = 'center';
                child.style.width = '300px';
                child.style.height = null;
                child.style.lineHeight = null;
                if (i == menu.selectedElement) {
                    child.innerHTML = elem.name;
                    child.style.backgroundColor = menu.defaultSelectedBg;
                    child.style.color = menu.defaultSelectedFg;
                }
                else {
                    child.innerHTML = elem.name;
                    child.style.backgroundColor = menu.defaultBg;
                    child.style.color = menu.defaultFg;
                    child.style.border = 'none';
                }
                child.id = 'menu-option';
            }
            console.log('trying to append child');
            this.context.appendChild(child);
        }
    };
    return MenuWindow;
}());
exports.MenuWindow = MenuWindow;

},{"../renderer":22,"./Menu":18}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Camera = /** @class */ (function () {
    function Camera(room, viewWidth, viewHeight, cx, cy) {
        this.room = room;
        this.viewWidth = viewWidth;
        this.viewHeight = viewHeight;
        this.cx = cx;
        this.cy = cy;
    }
    Camera.prototype.reCenter = function (cx, cy) {
        this.cx = cx;
        this.cy = cy;
        // this.filterView();
    };
    // Change the room that this camera is looking at!
    Camera.prototype.switchTargetRoom = function (room) {
        this.room = room;
    };
    // public adjustViewDims(dx: number, dy: number) {
    //     this.viewWidth += dx;
    //     this.viewHeight += dy;
    //     // TODO: Pass an update call to the renderer so that it renders to the updated FOV
    //     // this.renderer.updateCamera(this, this.world.getActiveRoom().objects);
    // }
    Camera.prototype.getStartX = function () {
        return this.cx - Math.floor(this.viewWidth / 2);
        // return Math.floor(this.viewWidth / 2) - this.cx;
    };
    Camera.prototype.getStartY = function () {
        return this.cy - Math.floor(this.viewHeight / 2);
        // return Math.floor(this.viewHeight / 2) - this.cy;
    };
    Camera.prototype.getEndX = function () {
        return this.cx + Math.ceil(this.viewWidth / 2);
    };
    Camera.prototype.getEndY = function () {
        return this.cy + Math.ceil(this.viewHeight / 2);
    };
    // Get the room that the camera is looking at, which in this case will always be the World's active room
    Camera.prototype.getRoom = function () {
        return this.room;
    };
    Camera.prototype.actorInView = function (actorX, actorY) {
        if (actorX < this.getStartX() || actorX > this.getEndX()) {
            return false;
        }
        if (actorY < this.getStartY() || actorY > this.getEndY()) {
            return false;
        }
        return true;
    };
    return Camera;
}());
exports.Camera = Camera;

},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IO = /** @class */ (function () {
    function IO() {
    }
    IO.validControl = function (key) {
        if (key == 'w' ||
            key == 'a' ||
            key == 's' ||
            key == 'd' ||
            // j - wait
            key == 'j' ||
            // > - travel through door
            key == '>')
            return true;
        return false;
    };
    IO.initKeyBindings = function () {
        document.addEventListener('keypress', function (event) {
            if (event.key == 'w') {
                console.log('w - up');
            }
            else if (event.key == 'a') {
                console.log('a - left');
            }
            else if (event.key == 's') {
                console.log('s - down');
            }
            else if (event.key == 'd') {
                console.log('d - right');
            }
            else {
                console.log('unknown keypress:', event.key);
            }
        });
    };
    IO.genericKeyBinding = function (func) {
        document.addEventListener('keydown', function (event) {
            func(event.key);
        });
    };
    IO.validMenuControls = [
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        'Enter',
        'Escape',
        'e',
        'E'
    ];
    IO.validGameControls = [
        'w',
        'a',
        's',
        'd',
        'j',
        '>',
        'i',
        'Escape' // go to pause menu
    ];
    return IO;
}());
exports.IO = IO;

},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Actor_1 = require("../Actors/Actor");
var tile_1 = require("../tile");
var Menu_1 = require("./Menu/Menu");
var Renderer = /** @class */ (function () {
    function Renderer() {
    }
    Renderer.prototype.updateGameObject = function (obj, context) {
        // Render the game object in its position
        this.updateTile(obj.x, obj.y, obj.getTile(), context);
    };
    // "Re-render a specific tile"
    Renderer.prototype.updateTile = function (x, y, tile, context) {
        context.children[x].children[y].innerHTML = tile.ascii;
        context.children[x].children[y].style.backgroundColor = tile.bg;
        context.children[x].children[y].style.color = tile.fg;
    };
    Renderer.prototype.renderMenu = function (menu, context) {
        for (var i = 0; i < menu.elements.length; i++) {
            // MenuTitle
            if (menu.elements[i] instanceof Menu_1.MenuTitle) {
                // if((<HTMLElement>context.children[i]).id == 'menu-title') {
                context.children[i].innerHTML = menu.elements[i].title;
            }
            // MenuOption
            if (menu.elements[i] instanceof Menu_1.MenuOption) {
                // if ((<HTMLElement>context.children[i]).id == 'menu-option') {
                if (i == menu.selectedElement) {
                    context.children[i].innerHTML = menu.elements[i].name;
                    context.children[i].style.backgroundColor = menu.defaultSelectedBg;
                    context.children[i].style.color = menu.defaultSelectedFg;
                    // (<HTMLElement>context.children[i+1]).style.border = 'dashed 1px black';
                }
                else {
                    context.children[i].innerHTML = menu.elements[i].name;
                    context.children[i].style.backgroundColor = menu.defaultBg;
                    context.children[i].style.color = menu.defaultFg;
                    context.children[i].style.border = 'none';
                }
            }
        }
    };
    Renderer.prototype.renderRoom = function (room, context) {
        for (var i = 0; i < room.getWidth(); i++) {
            for (var j = 0; j < room.getHeight(); j++) {
                this.updateTile(i, j, room.getObject(i, j).getTile(), context);
            }
        }
    };
    // More expenseive than simply updating the view of the camera
    Renderer.prototype.renderView = function (camera, window) {
        var context = window.getContext();
        var room = camera.getRoom(); // the room that the camera is looking at
        var viewStartX = camera.getStartX();
        var viewStartY = camera.getStartY();
        // render everything to the "test overlay (white/room default bg color)"
        for (var i = 0; i < window.localWidth; i++) {
            for (var j = 0; j < window.localHeight; j++) {
                // TEST: (just graying out what was there before)
                // FOG OF WAR: (TODO: have specific room store information about their fog color)
                this.updateTile(i, j, new tile_1.Tile(room.getObject(i, j).getTile().ascii, room.defaultFogFg, room.defaultFogBg), context);
            }
        }
        // render everything in view of our camera
        for (var i = Math.max(viewStartX, 0); i < Math.min(viewStartX + camera.viewWidth, window.localWidth); i++) {
            for (var j = Math.max(viewStartY, 0); j < Math.min(viewStartY + camera.viewHeight, window.localHeight); j++) {
                this.updateTile(i, j, room.getObject(i, j).getTile(), context);
            }
        }
        // TODO: note how this method is inefficient. We are first rendering the entire window as fog,
        // then going back over the parts that are in view to render whats actually there. 
        // (painters algorithm, back to front, style)
        // It would be much better to only update the parts of fog that need to be updated.
    };
    // public renderViewOblong(camera: Camera, window: Window) {
    //     let context = window.getContext();
    //     let room = camera.getRoom();
    //     // render everything to the fog color
    //     for (let i = 0; i < window.localWidth; i++) {
    //         for (let j = 0; j < window.localHeight; j++) {
    //             // FOG OF WAR: (TODO: have specific room store information about their fog color)
    //             this.updateTile(i, j, 
    //                 new Tile(room.getObject(i, j).getTile().ascii, room.defaultFogFg, room.defaultFogBg), 
    //                 context);
    //         }
    //     }
    //     // render everything in view, in an oblong shape
    //     let viewStartX = camera.getStartX();
    //     let viewStartY = camera.getStartY();
    //     let cx = camera.cx;//viewStartX + (camera.viewWidth / 2);
    //     let cy = camera.cy;//viewStartY + (camera.viewHeight / 2);
    //     for (let j = Math.max(viewStartY, 0); j < Math.min(viewStartY + camera.viewHeight, window.localHeight); j++) {
    //         console.log(cx, j);
    //         this.updateTile(cx, j, room.getObject(cx, j).getTile(), context);
    //         if (j == cy || j == cy - 1 || j == cy + 1) {
    //             for (let i = Math.max(viewStartX, 0); i < Math.min(viewStartX + camera.viewWidth, window.localWidth); i++) {
    //                 this.updateTile(i, j, room.getObject(i, j).getTile(), context);
    //             }
    //         }
    //         if ((j <= cy - 2 || j >= cy + 2)){// && (j < cy - 3 || j > cy + 3)) {
    //             for (let i = Math.max(viewStartX + 1, 1); i < Math.min(viewStartX + camera.viewWidth - 1, window.localWidth); i++) {
    //                 this.updateTile(i, j, room.getObject(i, j).getTile(), context);
    //             }
    //         }
    //         if ((j <= cy - 3 || j >= cy + 3)){// && (j < cy - 4 || j > cy + 4)) {
    //             for (let i = Math.max(viewStartX + 2, 2); i < Math.min(viewStartX + camera.viewWidth - 2, window.localWidth); i++) {
    //                 this.updateTile(i, j, room.getObject(i, j).getTile(), context);
    //             }
    //         }
    //         if ((j <= cy - 4 || j >= cy + 4)){//&& (j < cy - 4 || j > cy + 4)) {
    //             for (let i = Math.max(viewStartX + 3, 3); i < Math.min(viewStartX + camera.viewWidth - 3, window.localWidth); i++) {
    //                 this.updateTile(i, j, room.getObject(i, j).getTile(), context);
    //             }
    //         }
    //     }
    // }
    Renderer.prototype.updateCameraView = function (camera, window) {
        var context = window.getContext();
        var room = camera.getRoom(); // the room that the camera is looking at
        var viewStartX = camera.getStartX();
        var viewEndX = camera.getEndX();
        var viewStartY = camera.getStartY();
        var viewEndY = camera.getEndY();
        // set the area around the camera view to white (or whatever background color the room is using)
        for (var i = Math.max(viewStartX, 0); i < Math.min(viewStartX + camera.viewWidth, window.localWidth); i++) {
            this.updateTile(room.objects[i][viewStartY - 1].x, room.objects[i][viewStartY - 1].y, new tile_1.Tile('+', 'black', 'white'), context);
            this.updateTile(room.objects[i][viewEndY + 1].x, room.objects[i][viewEndY + 1].y, new tile_1.Tile('+', 'black', 'white'), context);
        }
        for (var j = Math.max(viewStartY, 0); j < Math.min(viewStartY + camera.viewHeight, window.localHeight); j++) {
            this.updateTile(room.objects[viewStartX - 1][j].x, room.objects[viewStartX - 1][j].y, new tile_1.Tile('+', 'black', 'white'), context);
            this.updateTile(room.objects[viewEndX + 1][j].x, room.objects[viewEndX + 1][j].y, new tile_1.Tile('+', 'black', 'white'), context);
        }
        // acutally render the edges of the area in the updated view
        for (var i = Math.max(viewStartX, 0); i < Math.min(viewStartX + camera.viewWidth, window.localWidth); i++) {
            this.updateTile(room.objects[i][viewStartY].x, room.objects[i][viewStartY].y, new tile_1.Tile('+', 'black', 'white'), context);
            this.updateTile(room.objects[i][viewEndY].x, room.objects[i][viewEndY].y, new tile_1.Tile('+', 'black', 'white'), context);
        }
        for (var j = Math.max(viewStartY, 0); j < Math.min(viewStartY + camera.viewHeight, window.localHeight); j++) {
            this.updateTile(room.objects[viewStartX][j].x, room.objects[viewStartX][j].y, new tile_1.Tile('+', 'black', 'white'), context);
            this.updateTile(room.objects[viewEndX][j].x, room.objects[viewEndX][j].y, new tile_1.Tile('+', 'black', 'white'), context);
        }
    };
    Renderer.prototype.renderObjectContext = function (obj, room, context) {
        // If the player is in debug render their movements and local contexts in yellow
        if (obj instanceof Actor_1.Actor && obj.debug) {
            this.updateTile(obj.x - 1, obj.y, new tile_1.Tile(room.getObject(obj.x - 1, obj.y).getTile().ascii, room.getObject(obj.x - 1, obj.y).getTile().fg, 'yellow'), context);
            this.updateTile(obj.x + 1, obj.y, new tile_1.Tile(room.getObject(obj.x + 1, obj.y).getTile().ascii, room.getObject(obj.x + 1, obj.y).getTile().fg, 'yellow'), context);
            this.updateTile(obj.x, obj.y - 1, new tile_1.Tile(room.getObject(obj.x, obj.y - 1).getTile().ascii, room.getObject(obj.x, obj.y - 1).getTile().fg, 'yellow'), context);
            this.updateTile(obj.x, obj.y + 1, new tile_1.Tile(room.getObject(obj.x, obj.y + 1).getTile().ascii, room.getObject(obj.x, obj.y + 1).getTile().fg, 'yellow'), context);
        }
        else {
            this.updateTile(obj.x - 1, obj.y, room.getObject(obj.x - 1, obj.y).getTile(), context);
            this.updateTile(obj.x + 1, obj.y, room.getObject(obj.x + 1, obj.y).getTile(), context);
            this.updateTile(obj.x, obj.y - 1, room.getObject(obj.x, obj.y - 1).getTile(), context);
            this.updateTile(obj.x, obj.y + 1, room.getObject(obj.x, obj.y + 1).getTile(), context);
        }
    };
    Renderer.prototype.addWindow = function (window) {
        var context = window.getContext();
        this.bind(context);
    };
    Renderer.prototype.addMenuWindow = function (window) {
        var context = window.getContext();
        this.bind(context);
    };
    Renderer.prototype.bind = function (windowContext) {
        var body = document.body;
        body.style.margin = '0';
        body.appendChild(windowContext);
    };
    Renderer.pxs = function (x) {
        return x.toString() + 'px';
    };
    Renderer.elementSize = 15;
    return Renderer;
}());
exports.Renderer = Renderer;

},{"../Actors/Actor":6,"../tile":25,"./Menu/Menu":18}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderer_1 = require("./renderer");
// Think of Windows as rendering contexts
// CONSIDERATION: do we want the windowing code to handle outlining the window itself?
var Window = /** @class */ (function () {
    function Window(startX, startY, localWidth, localHeight, tiles) {
        this.bordered = false;
        this.startX = startX || -1;
        this.startY = startY || -1;
        this.localWidth = localWidth;
        this.localHeight = localHeight;
        this.tiles = tiles;
        this.initContext(tiles);
    }
    Window.prototype.getContext = function () {
        return this.context;
    };
    Window.prototype.addKeybinding = function (func) {
        this.context.addEventListener('keydown', function (event) {
            func(event.key);
        });
    };
    Window.prototype.show = function () {
    };
    Window.prototype.hide = function () {
    };
    Window.prototype.initContext = function (tiles) {
        console.log('localWidth:', this.localWidth, 'localHeight:', this.localHeight);
        // Loop over localWidth and localHeight to initialize the literal html elements that will be in this window
        this.context = document.createElement('div');
        this.context.style.height = renderer_1.Renderer.pxs(this.localHeight * renderer_1.Renderer.elementSize);
        this.context.style.width = renderer_1.Renderer.pxs(this.localWidth * renderer_1.Renderer.elementSize);
        this.context.style.display = 'flex';
        if (this.startX == -1 && this.startY == -1) {
            this.context.style.margin = 'auto';
            this.context.style.marginTop = renderer_1.Renderer.pxs(5);
        }
        else {
            this.context.style.position = 'absolute';
            this.context.style.left = renderer_1.Renderer.pxs(this.startX);
            this.context.style.top = renderer_1.Renderer.pxs(this.startY);
        }
        if (this.bordered) {
            this.context.style.border = 'solid';
            this.context.style.borderWidth = renderer_1.Renderer.pxs(2);
        }
        for (var i = 0; i < this.localWidth; i++) {
            var colDiv = document.createElement('div');
            colDiv.style.width = renderer_1.Renderer.pxs(renderer_1.Renderer.elementSize * this.localHeight);
            for (var j = 0; j < this.localHeight; j++) {
                var element = document.createElement('div');
                element.style.height = renderer_1.Renderer.pxs(renderer_1.Renderer.elementSize);
                element.style.width = renderer_1.Renderer.pxs(renderer_1.Renderer.elementSize);
                element.style.textAlign = 'center';
                element.style.userSelect = 'none';
                element.innerHTML = tiles[i][j].ascii;
                element.style.backgroundColor = tiles[i][j].bg;
                element.style.color = tiles[i][j].fg;
                colDiv.appendChild(element);
            }
            this.context.appendChild(colDiv);
        }
    };
    return Window;
}());
exports.Window = Window;

},{"./renderer":22}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Actors
var Actor_1 = require("./Actors/Actor");
exports.Actor = Actor_1.Actor;
var Mob_1 = require("./Actors/Mob");
exports.Mob = Mob_1.Mob;
var Player_1 = require("./Actors/Player");
exports.Player = Player_1.Player;
// Actions
var Action_1 = require("./Actions/Action");
exports.Action = Action_1.Action;
exports.ActionDirection = Action_1.ActionDirection;
var WaitAction_1 = require("./Actions/WaitAction");
exports.WaitAction = WaitAction_1.WaitAction;
var ChopAction_1 = require("./Actions/ChopAction");
exports.ChopAction = ChopAction_1.ChopAction;
var DoorAction_1 = require("./Actions/DoorAction");
exports.DoorAction = DoorAction_1.DoorAction;
var WalkAction_1 = require("./Actions/WalkAction");
exports.WalkAction = WalkAction_1.WalkAction;
// Items
var Item_1 = require("./Items/Item");
exports.Item = Item_1.Item;
var ShovelItem_1 = require("./Items/ShovelItem");
exports.ShovelItem = ShovelItem_1.ShovelItem;
// Rooms
var Room_1 = require("./Rooms/Room");
exports.Room = Room_1.Room;
exports.Area = Room_1.Area;
/*consider leaving out of module*/ var Cave_1 = require("./Rooms/Cave");
exports.Cave = Cave_1.Cave;
/*consider leaving out of module*/ var Forest_1 = require("./Rooms/Forest");
exports.Forest = Forest_1.Forest;
var Door_1 = require("./Rooms/Door");
exports.Door = Door_1.Door;
exports.DoorType = Door_1.DoorType;
var Environment_1 = require("./Rooms/Environment");
exports.Tree = Environment_1.Tree;
exports.Floor = Environment_1.Floor;
exports.Wall = Environment_1.Wall;
// Systems
var renderer_1 = require("./Systems/renderer");
exports.Renderer = renderer_1.Renderer;
var window_1 = require("./Systems/window");
exports.Window = window_1.Window;
var io_1 = require("./Systems/io");
exports.IO = io_1.IO;
var camera_1 = require("./Systems/camera");
exports.Camera = camera_1.Camera;
var Menu_1 = require("./Systems/Menu/Menu");
exports.Menu = Menu_1.Menu;
exports.MenuTitle = Menu_1.MenuTitle;
exports.MenuOption = Menu_1.MenuOption;
var MenuWindow_1 = require("./Systems/Menu/MenuWindow");
exports.MenuWindow = MenuWindow_1.MenuWindow;
// Misc Base Objects
var util_1 = require("./util");
exports.BSPTree = util_1.BSPTree;
var tile_1 = require("./tile");
exports.Tile = tile_1.Tile;
var GameObject_1 = require("./GameObject");
exports.GameObject = GameObject_1.GameObject;
var world_1 = require("./world");
exports.World = world_1.World;
var Game_1 = require("./Game");
exports.Game = Game_1.Game;

},{"./Actions/Action":1,"./Actions/ChopAction":2,"./Actions/DoorAction":3,"./Actions/WaitAction":4,"./Actions/WalkAction":5,"./Actors/Actor":6,"./Actors/Mob":7,"./Actors/Player":8,"./Game":9,"./GameObject":10,"./Items/Item":11,"./Items/ShovelItem":12,"./Rooms/Cave":13,"./Rooms/Door":14,"./Rooms/Environment":15,"./Rooms/Forest":16,"./Rooms/Room":17,"./Systems/Menu/Menu":18,"./Systems/Menu/MenuWindow":19,"./Systems/camera":20,"./Systems/io":21,"./Systems/renderer":22,"./Systems/window":23,"./tile":25,"./util":26,"./world":27}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tile = /** @class */ (function () {
    function Tile(ascii, fg, bg) {
        this.ascii = '.';
        this.fg = 'black';
        this.bg = 'white';
        // Check for "empty constructor"
        if (typeof ascii === 'undefined' || ascii == null) {
            return;
        }
        this.ascii = ascii;
        if (fg != null && bg != null) {
            this.fg = fg;
            this.bg = bg;
            return;
        }
        return;
    }
    return Tile;
}());
exports.Tile = Tile;

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BSPTree = /** @class */ (function () {
    function BSPTree(left, right, value) {
        this.left = left;
        this.right = right;
        this.value = value;
    }
    return BSPTree;
}());
exports.BSPTree = BSPTree;

},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Currently, the World just maintains all the rooms and manages turns taken
var World = /** @class */ (function () {
    // Perhaps provide a random seed to the world for seeding room (dungeon) generation, and random events
    function World() {
        this.rooms = [];
        this.activeRoomChanged = false;
    }
    World.prototype.takeTurn = function () {
        var _this = this;
        this.rooms.forEach(function (room) {
            // check if this room is active
            room.handleActorTurns(_this);
        });
    };
    World.prototype.getActiveRoomChanged = function () {
        if (this.activeRoomChanged) {
            this.activeRoomChanged = false;
            return true;
        }
        else
            return false;
    };
    World.prototype.getPlayer = function () {
        return this.player;
    };
    World.prototype.setPlayer = function (player) {
        this.player = player;
    };
    World.prototype.getActiveRoom = function () {
        return this.activeRoom;
    };
    World.prototype.setActiveRoom = function (room) {
        this.activeRoom = null;
        this.activeRoom = room;
        this.activeRoomChanged = true;
    };
    World.prototype.addRoom = function (room) {
        if (this.rooms.length == 0)
            this.activeRoom = room;
        else {
            // Place a door from the activeRoom to the new room
            // this.activeRoom.placeDoor(room);
            // room.placeDoor(this.activeRoom);
            // // Place a door leading back from the new to the room that is currently active
            // room.placeDoor(new Door(this.activeRoom));
        }
        this.rooms.push(room);
    };
    World.prototype.getRooms = function () {
        return this.rooms;
    };
    return World;
}());
exports.World = World;

},{}],28:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var ascii_1 = require("ascii");
var GameState;
(function (GameState) {
    GameState[GameState["Play"] = 0] = "Play";
})(GameState || (GameState = {}));
var Proj3Demo = /** @class */ (function (_super) {
    __extends(Proj3Demo, _super);
    function Proj3Demo() {
        var _this = _super.call(this) || this;
        _this.WIDTH = 40;
        _this.HEIGHT = 20;
        _this.renderer = new ascii_1.Renderer();
        _this.world = new ascii_1.World();
        _this.state = GameState.Play;
        return _this;
    }
    Proj3Demo.prototype.load = function () {
        // set up a room (this could be loaded via a JSON file)
        var room = new ascii_1.Cave(this.WIDTH, this.HEIGHT, 'Cave');
        room.wallTile = new ascii_1.Tile('Y', 'green', 'lightyellow');
        room.floorTile = new ascii_1.Tile('.', 'brown', 'black');
        room.init();
        var spawnbuffer = 3;
        var player = new ascii_1.Player(Math.floor(Math.random() * (this.WIDTH - 1)), Math.floor(Math.random() * (this.HEIGHT - 1)), new ascii_1.Tile('@', 'red', 'white'));
        room.addActor(player);
        room.correctSpawn(player);
        this.world.setPlayer(player);
        var shovel = new ascii_1.ShovelItem(Math.floor(Math.random() * (this.WIDTH - 1)), Math.floor(Math.random() * (this.HEIGHT - 1)), new ascii_1.Tile('^', 'black', 'gray'));
        room.placeItem(shovel);
        room.correctSpawn(shovel);
        // room.correctSpawnLocalTo(shovel, player); // have this implement spatial partitioning
        this.world.addRoom(room);
        console.log('state?: ', localStorage.getItem('state'));
        // create windows for game + menus
        this.roomWindow = new ascii_1.Window(-1, -1, this.WIDTH, this.HEIGHT, room.getTiles());
        this.renderer.addWindow(this.roomWindow);
    };
    Proj3Demo.prototype.update = function (key) {
        if (this.state == GameState.Play) {
            // Only continue if we have entered a valid control
            if (!(ascii_1.IO.validGameControls.indexOf(key) > -1))
                return;
            this.world.getPlayer().receiveKeyInput(key);
            this.world.takeTurn();
        }
    };
    Proj3Demo.prototype.draw = function () {
        var _this = this;
        this.renderer.renderRoom(this.world.getActiveRoom(), this.roomWindow.getContext());
        this.world.getActiveRoom().getActors().forEach(function (actor) {
            _this.renderer.updateGameObject(actor, _this.roomWindow.getContext());
            _this.renderer.renderObjectContext(actor, _this.world.getActiveRoom(), _this.roomWindow.getContext());
        });
    };
    return Proj3Demo;
}(ascii_1.Game));
var g = new Proj3Demo();
g.load();
g.draw();
ascii_1.IO.genericKeyBinding(function (key) {
    g.update(key);
    g.draw();
});

},{"ascii":24}]},{},[28]);
