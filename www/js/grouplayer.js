function GroupLayer(opts){
	this.map = opts.map;
	
	this.getMap = function(){
		return this.map;
	};
		
	this.layers = new Array();

	for(x in opts.layers){
		var l =  opts.layers[x];
		var tmp = new L.tileLayer.wms(l.server, {
		    layers: l.layers,
		    format: 'image/png',
		    transparent: true,
		    zIndex: l.priority
		});
		this.layers.push(tmp);
		if (l.visible){
			this.map.addLayer(tmp);
		}
	}
	
	
	
	
}