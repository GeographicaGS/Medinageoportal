var ggl1,ggl2;

Split = {
	layers: null,	
	iniLat: 39.463906,
	iniLng: 13.64502,	
	iniZoom: 4,
	__mapLeft:null,
	__mapRight: null,
	__currentMasterMap: null,
	__mapIsMoving: false,
	__leftRectangles: [],
	__rightRectangles: [],
	LEFT: 0,
	RIGHT: 1,
	syncEnable : true,
	
	initialize: function(){
		var temp;
		//order layers by priority
		for(var i=0;i<layers.length;i++)
		{
			 for (var j = 0 ; j < layers.length - 1 ; j++)
		        {
		            if ( layers[j].priority < layers[j + 1].priority )
		            {
		                temp = layers[j];
		                layers[j]=layers[j + 1];
		                layers[j + 1] = temp;
		            }
		        }
		}
		
		//console.log(layers);
		var startingCenter = new L.LatLng(this.iniLat, this.iniLng);
		
		var zoomControl = new L.Control.Zoom({
			position : 'bottomleft'
		});
		
		var mapLeft = new L.Map('map_left', {
			  center: startingCenter,
			  zoom: this.iniZoom,
			  fadeAnimation: false,
			  crs: L.CRS.EPSG3857,
			  //crs: L.CRS.EPSG4326,
			  zoomControl: false,
			  attributionControl: false
		});
		
		ggl1roadmap = new L.Google('ROADMAP');
		ggl1satellite = new L.Google('SATELLITE');
		ggl1hybrid = new L.Google('HYBRID');
		ggl1terrain = new L.Google('TERRAIN');

		mapLeft.addControl(new L.Control.Layers( {
			"Google Roadmap" : ggl1roadmap,
			"Google Satellite":ggl1satellite, 
			"Google Terrain":ggl1terrain, 
			"Google Hybrid":ggl1hybrid, 

		}, {},{
			"position": "topleft"
		}));

		mapLeft.addLayer(ggl1satellite);
		
		zoomControl.addTo(mapLeft);
		
		var opts = {
				map: mapLeft,
				layers: layers,
				father:this.LEFT,
				$layerPanel : $("#panel_left ul.layer_panel"),
				$sliderPanel : $("#panel_left .timeslider")
		}		
		this.__mapLeft = new GroupLayer(opts);		
		
		zoomControl = new L.Control.Zoom({
				position : 'bottomleft'
		});
		 
		var mapRight = new L.Map('map_right', {
			  center: startingCenter,
			  zoom: this.iniZoom,			  
			  fadeAnimation: false,
			  crs: L.CRS.EPSG3857,
			  //crs: L.CRS.EPSG4326,
			  zoomControl: false,
			  attributionControl: false
		});
		
		
		ggl2roadmap = new L.Google('ROADMAP');
		ggl2satellite = new L.Google('SATELLITE');
		ggl2hybrid = new L.Google('HYBRID');
		ggl2terrain = new L.Google('TERRAIN');


		mapRight.addControl(new L.Control.Layers( {
			"Google Roadmap" : ggl2roadmap,
			"Google Satellite":ggl2satellite, 
			"Google Terrain":ggl2terrain, 
			"Google Hybrid":ggl2hybrid, 

		}, {}));

		mapRight.addLayer(ggl2satellite);		
		
		zoomControl.addTo(mapRight);		
		
		opts = {
				map: mapRight,
				layers: layers,
				father:this.RIGHT,
				$layerPanel : $("#panel_right ul.layer_panel"),
				$sliderPanel : $("#panel_right .timeslider")
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
		
		this.__mapLeft.refreshLayerPanel();
		this.__mapRight.refreshLayerPanel();

		// CODIGO PARA HERRAMIENTA DE DIBUJADO
		// this.createDrawLocal();
		var editableLayers = new L.FeatureGroup();
		Split.__mapLeft.getMap().addLayer(editableLayers);
		var editableLayersRight = new L.FeatureGroup();
		Split.__mapRight.getMap().addLayer(editableLayersRight);
		var options = {
		    position: 'bottomleft',
		    draw: {
		        polyline: {
		            shapeOptions: {
		    			color: 'red',
		    			weight: 2,
		    			opacity: 0.8,
		
		            },
		        },
		        polygon: {
		            allowIntersection: false,
		            drawError: {
		                color: '#e1e100',
		                message: '<strong>Oh snap!<strong> you can\'t draw that!'
		            },
		            shapeOptions: {
		                color: 'red',
		                fill: "red"
		            }
		        },
		        circle: false,
		        rectangle:false,
		    },
		    edit: {
		        featureGroup: editableLayers,
		    }
		};
		var optionsRight = options;
		optionsRight.edit.featureGroup = editableLayersRight;

		var drawControl = new L.Control.Draw(options);
		Split.__mapLeft.getMap().addControl(drawControl);
		
		var drawControlRight = new L.Control.Draw(optionsRight);
		Split.__mapRight.getMap().addControl(drawControlRight);
		
		var drawLineLeft = new L.Draw.Polyline(Split.__mapLeft.getMap(), options.draw.polyline);
		var drawLineRight = new L.Draw.Polyline(Split.__mapRight.getMap(), optionsRight.draw.polyline);

		var editLeft = new L.EditToolbar.Edit(Split.__mapLeft.getMap(), {
            featureGroup: drawControl.options.edit.featureGroup,
            selectedPathOptions: drawControl.options.edit.selectedPathOptions
        });

        Split.__mapLeft.getMap().on('draw:created', function (e) {
        	$("#ctrl_line_drawer").trigger("click");
        });

        Split.__mapRight.getMap().on('draw:created', function (e) {
        	$("#ctrl_line_drawer").trigger("click");
        });

		// FIN DEL CÓDIGO PARA HERRAMIENTA DE DIBUJADO
		
		//permanet hooks
		$(document).on("click",".ctrl_expand",function(){
			
			var $extra = $(this).closest("li").find(".extra");
			if (!$extra.is(":visible")){
				$extra.fadeIn(300);
				$(this).closest("li").addClass("expand");
				$(this).html("Collapse");
			}
			else{
				$(this).closest("li").removeClass("expand");
				$extra.fadeOut(300);
				$(this).html("Expand");
			}
		});
		
		$("#ctrl_rectangle_drawer").click(function(){
			var $rd = $("#ctrl_feature_info");
			if ($rd.hasClass("enable")){
				$rd.trigger("click");
			}
			if ($(this).hasClass("enable")) { 
				$(this).removeClass("enable");
				Split.deActivateRectangleTool();
			}
			else{
				$(this).addClass("enable");				
				Split.activateRectangleTool();
			}
		});

		$("#ctrl_line_drawer").click(function(){
			var $rd = $("#ctrl_feature_info");
			if ($rd.hasClass("enable")){
				$rd.trigger("click");
			}
			if ($(this).hasClass("enable")) { 
				$(this).removeClass("enable");
				drawLineLeft.disable();
				drawLineRight.disable();
			}
			else{
				$(this).addClass("enable");				
				drawLineLeft.enable();
				drawLineRight.enable();
			}
		});
		
		$("#ctrl_feature_info").click(function(){
			var $rd = $("#ctrl_line_drawer");
			if ($rd.hasClass("enable")){
				$rd.trigger("click");
			}
			
			if ($(this).hasClass("enable")) { 
				$(this).removeClass("enable");
				Split.deActivateFeatureInfo()
			}
			else{
				$(this).addClass("enable");				
				Split.activateFeatureInfo()
			}
		});
		resize();
	},
	mapMover: function(a,b) {
		
		var bActive;
		if (Split.__mapLeft.getMap() == a){
			Split.__currentMasterMap = Split.__mapLeft;
			bActive =  Split.__mapRight.isActive();
		}
		else{
			Split.__currentMasterMap = Split.__mapRight;
			bActive =  Split.__mapLeft.isActive();
		}
		
		if (Split.__mapIsMoving || !Split.syncEnable || !bActive){ 
			return; 
		}
	
		Split.__mapIsMoving = true;

		var lng, newZoom = a.getZoom(),otherZoom = b.getZoom();		     

		// b.panTo(a.getCenter());
		
		// if (newZoom !== otherZoom){
		//     b.setZoom(newZoom);
		// 	setTimeout(function(){
		// 		var c = a.getCenter();
		// 		c.lat += 0.0001
		// 		b.setView(c);
		// 	},500);
		// }

		b.setView(a.getCenter(),newZoom);
	
		Split.__mapIsMoving = false;
	},
	togglePanel:function (el){
		var totalWidth = Math.floor($(window).width() /2);
		if (el==this.LEFT){
			//Left panel
			if ($("#panel_left").is(":visible") && $("#panel_right").is(":visible")){	
				// hide panel left
				$("#sep").hide();
				$('#panel_left').hide();
				$('#panel_right').width($(window).width());					
				Split.__mapRight.getMap().invalidateSize();	
				Split.__mapLeft.setActive(false);				
			}
			else{
				$("#sep").show();				
				$('#panel_right').show();
				$('#panel_left').width(totalWidth);					
				Split.__mapLeft.getMap().invalidateSize();	
				Split.__mapRight.setActive(true);
				resize();
			}			
			
			
		}
		else if (el==this.RIGHT)
		{
			//Right paneltoggleLayers
			if ($("#panel_left").is(":visible") && $("#panel_right").is(":visible")){	
				// hide panel right
				$("#sep").hide();
				$('#panel_right').hide();
				$('#panel_left').width($(window).width());					
				Split.__mapLeft.getMap().invalidateSize();
				Split.__mapRight.setActive(false);
			}
			else{
				$("#sep").show();				
				$('#panel_left').show();
				$('#panel_right').width(totalWidth);					
				Split.__mapRight.getMap().invalidateSize();
				Split.__mapLeft.setActive(true);
				resize();
			}
		}
		if (Split.__currentMasterMap == Split.__mapLeft){
			Split.mapMover(Split.__mapLeft.getMap(), Split.__mapRight.getMap());
		}
		else{
			Split.mapMover(Split.__mapRight.getMap(), Split.__mapLeft.getMap());
		}
		
	},
	sync: function(){
		Split.syncEnable = !Split.syncEnable;
		var lurl = Split.syncEnable ? "MED_icon_enlazar_OK_left.png" : "MED_icon_enlazar_KO_left.png";
		var rurl = Split.syncEnable ? "MED_icon_enlazar_OK_right.png" : "MED_icon_enlazar_KO_right.png";
		$("#panel_left img.sync").attr("src","img/"+lurl);
		$("#panel_right img.sync").attr("src","img/"+rurl);
		
		if (Split.syncEnable){
			$("img.sync").attr("title","Desynchronize maps");
			if (Split.__currentMasterMap == Split.__mapLeft){
				Split.mapMover(Split.__mapLeft.getMap(), Split.__mapRight.getMap());
			}
			else{
				Split.mapMover(Split.__mapRight.getMap(), Split.__mapLeft.getMap());
			}
		}
		else{
			$("img.sync").attr("title","Synchronize maps");
		}
	},
	toggleLayersInterface: function(el){
		
		if (el==this.LEFT){
			var $panel = $("#panel_left .layer_panel");
			if(!$panel.is(":visible")){
				
				$panel.fadeIn(300);
				$("#panel_left .layer_ctrl").addClass("open");
			}
			else{
				$panel.fadeOut(300);
				$("#panel_left .layer_ctrl").removeClass("open");

			}
		}
		else if (el==this.RIGHT){
			var $panel = $("#panel_right .layer_panel");
			if(!$panel.is(":visible")){
				
				$panel.fadeIn(300);
				$("#panel_right .layer_ctrl").addClass("open");
			}
			else{
				$panel.fadeOut(300);
				$("#panel_right .layer_ctrl").removeClass("open");
			}
			
		}
	},

	__drawLayerInterface: function(el){		
		if (el==this.LEFT){
			this.__mapLeft.refreshLayerPanel();
		}
		else if (el==this.RIGHT){
			this.__mapRight.refreshLayerPanel();
		}
	},

	toggleLayer: function(id_layer,el){
		if (el==this.LEFT){
			this.__mapLeft.toogleLayer(id_layer);			
		}
		else if (el==this.RIGHT){
			this.__mapRight.toogleLayer(id_layer);			
		}
		this.__drawLayerInterface(el);
	},

	setHistogram: function(id_layer,el){
		if (el==this.LEFT){
			this.__mapLeft.setHistogram(id_layer);			
		}
		else if (el==this.RIGHT){
			this.__mapRight.setHistogram(id_layer);
		}
		this.__drawLayerInterface(el);
	},
	

	addLayer: function (server_url,name,title,is4326,type,panel,bbox){
		
		var l;
		if(!bbox) bbox = null;

		if (!type){
			l  = {
				server: server_url,
				title: title,
				layers: name,
				type: null,
				bbox : bbox
			}
			if (is4326) {
			    l.crs = L.CRS.EPSG4326;
			}	
		}
		else if (type == "timelayer"){

			var layerCatalog = findLayerCatalog(null,name);
			for(var key in layerCatalog.time_layers) break;
			var first_layer = layerCatalog.time_layers[key];

			l  = {
				server: server_url,
				title: title,
				layers: first_layer,
				timelayer: name,
				type: type,
				bbox : bbox
			}

		}
		else if (type == "nador"){
			var re= /\d{4}_\d{2}_\d{2}/
			l  = {
				server: server_url,
				title: title,
				layers: name,
				type: type,
				date : name.match(re)[0],
				bbox : bbox
			}
		}
		
		if (panel != "left" && panel != "right"){
			this.__mapLeft.addLayer(l);
			this.__mapRight.addLayer(l);
		}
		else if (panel == "left"){
			this.__mapLeft.addLayer(l);
		}
		else{
			this.__mapRight.addLayer(l);	
		}
		
		$("#panel_search").fadeOut(300);
		//this.__mapRight.addLayer(l);
		
	},
	toggleSearchPanel: function(){
		var $panel_search = $("#panel_search");
		if (!$panel_search.is(":visible")){
			$panel_search.fadeIn(300);
		}
		else{
			$panel_search.fadeOut(300);
		}
		
	},
	_rectangleMouseover: function(rectangle,name,e){
		rectangle.setStyle({fillOpacity: 1});		
	},
	_rectangleMouseout: function(rectangle,name,e){
		rectangle.setStyle({fillOpacity: 0.75});		
	},
	_addRectangle: function(bounds,name){
		var rectangleLeft = L.rectangle(bounds, {fillColor: "#176fb1", fillOpacity: 0.75,color: "#00ccff", weight: 1});
		var rectangleRight = L.rectangle(bounds, {fillColor: "#176fb1", fillOpacity: 0.75,color: "#00ccff", weight: 1});

		
		rectangleLeft.on('mouseover',function(e){
			Split._rectangleMouseover(rectangleLeft,name,e);
		}).on('mouseout',function(e){
			Split._rectangleMouseout(rectangleLeft,name,e);
		});		
		rectangleLeft = rectangleLeft.bindLabel(name,{ noHide: true });
		
		rectangleRight.on('mouseover',function(e){
			Split._rectangleMouseover(rectangleRight,name,e);
		}).on('mouseout',function(e){
			Split._rectangleMouseout(rectangleRight,name,e);
		});
		
		rectangleRight.bindLabel(name,{ noHide: true });
		
		this.__mapLeft.getMap().addLayer(rectangleLeft);
		this.__mapRight.getMap().addLayer(rectangleRight);		
		this.__leftRectangles.push(rectangleLeft);
		this.__rightRectangles.push(rectangleRight);
		
		
		
	},
	activateRectangleTool: function(){
		
		this._ldrawer = new RectangleDrawer("rectangle_canvas_left",{
			"map" : this.__mapLeft.getMap(),
			"callback" : function(bounds,name){
				Split._addRectangle(bounds,name);
			}
		});
		
		this._rdrawer = new RectangleDrawer("rectangle_canvas_right",{
			"map" : this.__mapRight.getMap(),
			"callback" : function(bounds,name){
				Split._addRectangle(bounds,name);
			}
		});
		
		$("#map_left,#map_right").addClass("cursor_cross");
	},
	
	deActivateRectangleTool:function(){
		this._ldrawer._removeCanvas();
		this._rdrawer._removeCanvas();
		$("#map_left,#map_right").removeClass("cursor_cross");
	},
	activateFeatureInfo: function(){
		var obj = this;
		var msg = "Loading data. <br/>Please, be patient."
		this.__mapLeft.getMap().on("click",function(e){
			
			showInfoFancybox("<div id='container_feature_info'>" + msg + "</div>");
			
			
			Split.__mapLeft.featureInfo(e);
		});
		this.__mapRight.getMap().on("click",function(e){			
			showInfoFancybox("<div id='container_feature_info'>" + msg + "</div>");
			
			Split.__mapRight.featureInfo(e);
		});
		
		$("#map_left,#map_right").addClass("cursor_info");
	},
	deActivateFeatureInfo: function(){
		
		this.__mapLeft.getMap().off("click");
		this.__mapRight.getMap().off("click");
		
		$("#map_left,#map_right").removeClass("cursor_info");
	},

	setMetadataTimeSlider : function(metadata){
		this.__mapLeft.timeSlider.setMetadata(metadata);
		this.__mapRight.timeSlider.setMetadata(metadata);
	}
}
