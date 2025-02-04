class NoSignalController extends Emitter {

	constructor(stage) {
		super();
		this.stage=stage;
		
		this.scene=new NoSignal(1);
		
	 	 
		this.stage.scene.add("nosignal", this.scene, true);
		//this.stage.scene.sleep("nosignal");
		
	}
	
	
 	 
	
}


