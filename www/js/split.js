Split = {
	layers: null,	
	iniLat: 34,
	iniLng: 14,	
	iniZoom: 3,
	__mapLeft:null,
	__mapRight: null,
	__currentMasterMap: null,
	__mapIsMoving: false,
	LEFT: 0,
	RIGHT: 1,
	syncEnable : true,
	initialize: function(){
		
		var startingCenter = new L.LatLng(this.iniLat, this.iniLng);
		
		var zoomControl = new L.Control.Zoom({
			position : 'bottomleft'
		});
		
		var mapLeft = new L.Map('map_left', {
			  center: startingCenter,
			  zoom: this.iniZoom,
			  fadeAnimation: false,
			  crs: L.CRS.EPSG4326,
			  zoomControl: false,
			  attributionControl: false
		});
		
		zoomControl.addTo(mapLeft);
		
		var opts = {
				map: mapLeft,
				layers: layers
		}		
		this.__mapLeft = new GroupLayer(opts);		
		
		zoomControl = new L.Control.Zoom({
				position : 'bottomleft'
		});
		 
		var mapRight = new L.Map('map_right', {
			  center: startingCenter,
			  zoom: this.iniZoom,			  
			  fadeAnimation: false,
			  crs: L.CRS.EPSG4326,
			  zoomControl: false,
			  attributionControl: false
		});
		
				
		zoomControl.addTo(mapRight);		
		
		opts = {
				map: mapRight,
				layers: layers
		}
		this.__mapRight = new GroupLayer(opts);
		
		this.__mapLeft.getMap().on("drag", function() {			
			Split.mapMover(Split.__mapLeft.getMap(), Split.__mapRight.getMap());
		});

		this.__mapRight.getMap().on("drag", function() {
			Split.mapMover(Split.__mapRight.getMap(), Split.__mapLeft.getMap());
		});

		this.__mapLeft.getMap().on("zoomend", function() {
			Split.mapMover(Split.__mapLeft.getMap(), Split.__mapRight.getMap());
		});

		this.__mapRight.getMap().on("zoomend", function() {
			Split.mapMover(Split.__mapRight.getMap(), Split.__mapLeft.getMap());
		});
		
		this.__currentMasterMap = this.__mapLeft;
	},
	mapMover: function(a,b) {		  
		
		Split.__currentMasterMap = Split.__mapLeft.getMap() == a ? Split.__mapLeft : Split.__mapRight;
		
		if (Split.__mapIsMoving || !Split.syncEnable){ 
			return; 
		}
	
		Split.__mapIsMoving = true;

		var lng, newZoom = a.getZoom(),otherZoom = b.getZoom();		     

		b.panTo(a.getCenter());
		
		if (newZoom !== otherZoom){
		    b.setZoom(newZoom);
		}
	
		Split.__mapIsMoving = false;
	},
	togglePanel:function (el){
		var totalWidth = Math.floor(($(window).width()-2) /2);
		if (el==this.LEFT)
		{
			//Left panel
			if ($("#map_left").is(":visible") && $("#map_right").is(":visible")){	
				// hide panel left
				$("#sep").hide();
				$('#map_left').hide();
				$('#map_right').width(totalWidth*2);					
				Split.__mapRight.getMap().invalidateSize();				
			}
			else{
				$("#sep").show();				
				$('#map_right').show();
				$('#map_left').width(totalWidth);					
				Split.__mapLeft.getMap().invalidateSize();		
			}
			
			
		}
		else if (el==this.RIGHT)
		{
			//Right panel
			if ($("#map_left").is(":visible") && $("#map_right").is(":visible")){	
				// hide panel right
				$("#sep").hide();
				$('#map_right').hide();
				$('#map_left').width(totalWidth*2);					
				Split.__mapLeft.getMap().invalidateSize();				
			}
			else{
				$("#sep").show();				
				$('#map_left').show();
				$('#map_right').width(totalWidth);					
				Split.__mapRight.getMap().invalidateSize();		
			}
		}
	},
	sync: function(){
		Split.syncEnable = !Split.syncEnable;
		var lurl = Split.syncEnable ? "MED_icon_enlazar_OK_left.png" : "MED_icon_enlazar_KO_left.png";
		var rurl = Split.syncEnable ? "MED_icon_enlazar_OK_right.png" : "MED_icon_enlazar_KO_right.png";
		$("#map_left img.sync").attr("src","img/"+lurl);
		$("#map_right img.sync").attr("src","img/"+rurl);
		
		if (Split.syncEnable){
			if (Split.__currentMasterMap == Split.__mapLeft){
				Split.mapMover(Split.__mapLeft.getMap(), Split.__mapRight.getMap());
			}
			else{
				Split.mapMover(Split.__mapRight.getMap(), Split.__mapLeft.getMap());
			}
		}
	}
	
}