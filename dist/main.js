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
