class NoSignal extends Phaser.Scene {
	
	constructor() {
		super({key:"nosignal"});
		
		this.animateTimer; 
		
	}

    create() {
		this.add.graphics({ fillStyle: { color: 0x000000 } }).fillRectShape(new Phaser.Geom.Rectangle(0, 0, this.sys.game.canvas.width, this.sys.game.canvas.height));

		this.nosignal=this.add.image(0, 0, 'mw');
		this.reset();
		
		this.random();
	}
	
	reset() {
		if ( this.animateTimer ) clearTimeout(this.animateTimer);
		this.nosignal.setOrigin(0.5,0.5).setPosition(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2);
	
	}
	
	random() {
		this.animateTimer=setTimeout( () => {
			this.nosignal.setPosition( 
				Math.round(Math.random()*(this.sys.game.canvas.width-this.nosignal.width)+(this.nosignal.width/2)),
				Math.round(Math.random()*(this.sys.game.canvas.height-this.nosignal.height)+(this.nosignal.height/2))
			);
				
			this.random();
		}, 1500);
	}
	
	
	show() {
		//wait a few seconds to show no signal message
		
	
	}
	
}
