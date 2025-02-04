class Emitter {
	 
	constructor() {
		var listeners;
		
		var delegate = document.createDocumentFragment();
		[
		  'addEventListener',
		  'dispatchEvent',
		  'removeEventListener'
		].forEach(f =>
			this[f] = (...xs) => delegate[f](...xs)
		)
	}
	
	addEventListener() {
		console.log("!add");
	}
	
}
