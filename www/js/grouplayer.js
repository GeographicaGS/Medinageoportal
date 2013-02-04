function GroupLayer(opts){
	/****************************************/
	/********** MEMBERS  ********************/
	/****************************************/
	this.map = opts.map;	
	this.father = opts.father;
	this.layers = null;
	this.__layerHistogram = null;
	this.__active = true;
	
	this.layers = new Array();

	for(x in opts.layers){
		var l =  opts.layers[x];
		var tmp = {
			tile: new L.tileLayer.wms(l.server, {		
			    layers: l.layers,
			    format: 'image/png',
			    transparent: true,
			    zIndex: l.priority
			}),
			visible:l.visible,
			priority:l.priority,
			title:l.title
		};
		
		
		if (tmp.visible){
			this.map.addLayer(tmp.tile);
		}
		this.layers.push(tmp);
	}
	
	/****************************************/
	/********** METHODS  ********************/
	/****************************************/
	this.getMap = function(){
		return this.map;
	};
	
	this.isActive = function(){
		return this.__active;
	}
	
	this.setActive = function(active){
		this.__active = active;
	}
	
	this.getHTMLLayersPanel = function(){
		var html = "";
		for(x in this.layers){
			var l =  this.layers[x];
			var limg = l.visible ? "MED_icon_mapa_0.png" : "MED_icon_mapa.png";  
			var lhistimg = this.__layerHistogram==l ? "MED_icon_histograma_0.png" : "MED_icon_histograma.png";
			html += "<li>" +
					"<span>"+l.title+"</span>"+
					"<a href='javascript:Split.setHistogram("+x+","+this.father+")'>"+
					"	<img src='img/"+lhistimg+"' />"+
					"</a>"+
					"<a href='javascript:Split.toggleLayer("+x+","+this.father+")'>"+
					"	<img class='act_histogram' src='img/"+limg+"' /></a>"+			
					"</li>";
		}
		return html;		
	};
	
	this.toogleLayer = function(id_layer){
		var l =  this.layers[id_layer];
		l.visible = !l.visible;
		if (l.visible){
			this.map.addLayer(l.tile);
		}
		else{
			this.map.removeLayer(l.tile);
		}
	};
		
	this.setHistogram = function(id_layer){
		this.__layerHistogram = this.layers[id_layer];
	}
	
	
	
}