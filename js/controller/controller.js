var screenWidth, screenHeight;
 
class Controller extends Phaser.Scene {

	constructor() {
		super({key:'controller', active: true});
	}
	
	update(time, delta) {
		//send random data
		//this.osc.push(time, Math.random(0,1));
	}
	
	create() {
		
		screenWidth=this.sys.game.canvas.width;
		screenHeight=this.sys.game.canvas.height;
		
		/*this.input.keyboard.on('keydown', (k)=>{
			
			if ( parseInt(k.key) ) {
				this.cat.dilate(mapNumRange(parseInt(k.key), 1, 9, 20, 255));
			}
			
			if ( k.key == "a") {
				this.cat.blink(100,0,150);
			}
				
		});
		
		this.input.on(Phaser.Input.Events.POINTER_DOWN, (e) => {
			//console.log(e.downX, e.downY);
			this.cat.look(e.downX, e.downY);
		}); */
		
		this.nosignal=new NoSignalController(this);
		
		//this.setState('nosignal');
		 
	}
	
	
	
	preload() {
		this.load.image('mw', '/img/mw.png');
	}
	
	
}

