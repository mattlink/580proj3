import { Game, Renderer, Cave, Player, World, Window, IO, Tile, Wall, Floor, Action, Room, ShovelItem, 
    Menu, MenuWindow, MenuTitle, MenuOption } from 'ascii';

enum GameState {
    Play
}
class Proj3Demo extends Game {

    WIDTH = 40;
    HEIGHT = 20;

    renderer: Renderer;

    menuWindow: MenuWindow;
    roomWindow: Window;

    world: World;

    state: GameState;

    constructor() {
        super();

        this.renderer = new Renderer();
        this.world = new World();
        this.state = GameState.Play;
    }

    load() {

        // set up a room (this could be loaded via a JSON file)
        let room  = new Cave(this.WIDTH, this.HEIGHT, 'Cave');
        room.wallTile = new Tile('Y', 'green', 'lightyellow');
        room.floorTile = new Tile('.', 'brown', 'black');
        room.init();

        let spawnbuffer = 3;
        let player = new Player(Math.floor(Math.random() * (this.WIDTH - 1)), Math.floor(Math.random() * (this.HEIGHT-1)), new Tile('@', 'red', 'white'));
        room.addActor(player);
        room.correctSpawn(player);
        this.world.setPlayer(player);

        let shovel = new ShovelItem(Math.floor(Math.random() * (this.WIDTH - 1)), Math.floor(Math.random() * (this.HEIGHT-1)), new Tile('^', 'black', 'gray'));
        room.placeItem(shovel);
        room.correctSpawn(shovel);
        // room.correctSpawnLocalTo(shovel, player); // have this implement spatial partitioning

        this.world.addRoom(room);

        console.log('state?: ', localStorage.getItem('state'));

        // create windows for game + menus
        this.roomWindow = new Window(-1, -1, this.WIDTH, this.HEIGHT, room.getTiles());
        this.renderer.addWindow(this.roomWindow);

    }

    update(key: string) {
        if (this.state == GameState.Play) {

            // Only continue if we have entered a valid control
            if (!(IO.validGameControls.indexOf(key) > -1)) return;

            this.world.getPlayer().receiveKeyInput(key);
            this.world.takeTurn();
        }
    }

    draw() {
        this.renderer.renderRoom(this.world.getActiveRoom(), this.roomWindow.getContext());
        this.world.getActiveRoom().getActors().forEach(actor => {
            this.renderer.updateGameObject(actor, this.roomWindow.getContext());
            this.renderer.renderObjectContext(actor, this.world.getActiveRoom(), this.roomWindow.getContext());
        });
    }
}


let g = new Proj3Demo();
g.load();
g.draw();
IO.genericKeyBinding(function(key){
    g.update(key);
    g.draw();
});






