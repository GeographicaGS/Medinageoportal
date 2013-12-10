function GroupLayer(opts){
	/****************************************/
	/********** MEMBERS  ********************/
	/****************************************/
	this.map = opts.map;	
	this.father = opts.father;
	this.$layerPanel = opts.$layerPanel;
	this.layers = null;
	this.__layerHistogram = null;
	this.__active = true;
	
	this.layers = new Array();

	for(x in opts.layers){
		var l =  opts.layers[x];
		var tmp = {
			id: l.id,
			tile: new L.tileLayer.wms(l.server, {		
			    layers: l.layers,
			    format: 'image/png',
			    transparent: true,
			    zIndex: l.priority
			}),
			visible:l.visible,
			priority:l.priority,
			title:l.title,
			opacity: 1
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
	};
	
	this.setActive = function(active){
		this.__active = active;
	};
	
	this.addLayer = function(layer){
		
		var id = this.layers.length > 0 ? this.layers[0].id + 1: 1;
		var priority = this.layers.length > 0 ? this.layers[0].priority + 1: 1;
		var l = {
			id: id,
			tile: new L.tileLayer.wms(layer.server, {		
			    layers: layer.layers,
			    format: 'image/png',
			    transparent: true,
			    zIndex: priority
			}),
			visible:true,
			priority:priority,
			title:layer.title,
			opacity: 1
		};
		
		this.map.addLayer(l.tile);
		
		this.layers.splice(0,0,l);
		
		this.refreshLayerPanel();
		
	};
	
	this.removeLayer = function(id_layer){
		
		var id = this.findLayerIdxById(id_layer);
		if (!id) {
			return;
		}
		
		var l = this.layers[id];
		
		this.map.removeLayer(l.tile);
		this.layers.splice(id, 1);
		
		this.refreshLayerPanel();
		
		this.$layerPanel.closest(".panel").append("<div class='remove_layer_info'>"
			+	 "The layer <strong>"+l.title+"</strong> has been removed from this map."
			+ "</div>");
		
		setTimeout(function(){
			$(".remove_layer_info").fadeOut(500);
		},3000);
		
	};
	
	this.getHTMLLayersPanel = function(){
		var html = "";
		for(x in this.layers){
			var l =  this.layers[x];
			// DEPRECATED
			/*var limg = l.visible ? "MED_icon_mapa_0.png" : "MED_icon_mapa.png";  
			var lhistimg = this.__layerHistogram==l ? "MED_icon_histograma_0.png" : "MED_icon_histograma.png";
			html += "<li>" +
					"<span>"+l.title+"</span>"+
					"<a href='javascript:Split.setHistogram("+x+","+this.father+")'>"+
					"	<img src='img/"+lhistimg+"' />"+
					"</a>"+
					"<a href='javascript:Split.toggleLayer("+x+","+this.father+")'>"+
					"	<img class='act_histogram' src='img/"+limg+"' /></a>"+			
					"</li>";*/
			var checked = l.visible ? "checked" : "";
			var styleclass = l.visible ? "" : "disable";
			
			html += "<li title='"+l.title+"'>" + 
					"	<input type='checkbox' id_layer="+l.id+" " + checked + "/>" +
					" 	<img class='opacity' src='img/MED_icon_opacity.png' title='Opacity 100 %'/>"	+
					" 	<img class='legend' src='img/MED_icon_leyenda.png' title='Leyend popup' id_layer="+l.id+" />"	+
					"	<p class='" + styleclass +"'>"+l.title+"</span>" +
					"   <div class='opacity_panel' style='display:none'>"+
					"		<span class='opacity_label'>Opacity 100%</span>"+
					"		<div class='slider'></div>"+	
					"	</div>"+
					"</li>";
			
		}
		
		html +="<li><a class='add_layer' href='javascript:catalog()'>+ Add layers from <strong>Medina Catalogue</strong></a></li>";
		
		return html;		
	};
	this.findLayerById = function(id){
		for(x in this.layers){
			if (this.layers[x].id==id)
				return this.layers[x];
		}
		return null;
	},
	this.findLayerIdxById = function(id){
		for(x in this.layers){
			if (this.layers[x].id==id)
				return x;
		}
		return null;
	},
	
	this.toggleLayer = function(id_layer){
		var l =  this.findLayerById(id_layer);
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
	};
	
	this.__getLegendContainer = function(){
		return $("<div class='flotable_legend' >"
							+	"<h4>" 
							+		"<img src='img/MED_icon_leyenda.png' />"
							+		"<p class='title'></p>"
							+		"<img class='close' src='img/MED_icon_delete.png' />"
							+	"</h4>"
							+	"<div class='co_legend'>"							
							+	"</div>"			
							+	"</div>");
					
					
	};
	
	this.__addLegendDOM= function($container,$el){
		$container.prepend($el);
	
	
					
		$el.css("left",($container.width() / 2 ) - $el.width());
		$el.css("top",($container.height() / 2 ) - ($el.height() / 2));
					
		$el.click(function(){
			$(this).remove();
		});
	};
	
	this.refreshLayerPanel = function(){
		this.$layerPanel.html(this.getHTMLLayersPanel());
		// set obj to the closure
		var obj = this;
		
		this.$layerPanel.find("input").change(function(){			
			var id_layer = $(this).attr("id_layer");
			obj.toggleLayer(id_layer);
			
			if ($(this).attr("checked")){
				$(this).next().removeClass("disable");
			}
			else{
				$(this).next().addClass("disable");
			}
			
			
		});
		
		this.$layerPanel.find("li > img.opacity").click(function(){
			var $opacity_panel = $(this).siblings(".opacity_panel");
			var $li = $(this).parent(); 
			if ($opacity_panel.is(":visible")){
				$li.height($li.height() - $opacity_panel.outerHeight());
				$opacity_panel.hide();
				$li.css("border-bottom","1px solid #ccc");
			}
			else{
				$li.height($li.height() + $opacity_panel.outerHeight());
				$opacity_panel.show();
				$li.css("border-bottom","none");
			}
			
		});
		
		var obj = this;
		this.$layerPanel.find("li > img.legend").click(function(){
			var id = $(this).attr("id_layer");
			var $container = $(obj.map.getContainer()).parent();
			var $currentLegend = $container.find(".flotable_legend[id_layer="+id+"]");
			
			if($currentLegend.length>0){
				$currentLegend.remove();
			
			}
			
			var l = obj.findLayerById(id);
			
			var $el = obj.__getLegendContainer();
			$el.attr("id_layer",id);
			$el.find(".title").html(l.title);
					
			// Should we have generate this legend. Check if the following JSON file exists.
			$.ajax({
				dataType: "json",
				url: "json/" +l.tile.options.layers+".json",				
				success: function(json){
					// We've to generate this legend
					console.log(json);
					var $co_legend = $el.find(".co_legend");
					
					$co_legend.html("<div class='kinetic_legend'></div>");
					
					obj.__addLegendDOM($container,$el);
					
					var kinectic_container = $co_legend.find(".kinetic_legend")[0];
					
					$(kinectic_container).css("margin","10");
					
					var stage = new Kinetic.Stage({
						container: kinectic_container,
						width: $co_legend.width() -20,
						height: $co_legend.height() -20
					});
					var layer = new Kinetic.Layer();
			
					var width = 20;
					var height = $co_legend.height() -20;
					
					function componentToHex(c) {
						var hex = c.toString(16);
						return hex.length == 1 ? "0" + hex : hex;
					}
					
					function rgbToHex(rgb) {
						return "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);
					}
					
					var color_start = rgbToHex(json.color.start),
						color_end = rgbToHex(json.color.end);
					
					var rect = new Kinetic.Rect({
						x: 0, 
						y: 0, 
						width: width,
						height: height,
						fillLinearGradientStartPoint: [0, 0],
						fillLinearGradientEndPoint: [0, height],
						fillLinearGradientColorStops: [0, color_start, 1, color_end],
					});
					
					
					function drawText(x,y,text,align){
						
						var rw = 60;
						
						var ry;
						if (align == "top") {
							ry = y;
						}
						else if (align=="center") {
							ry = y+5;
						}
						else if (align=="bottom") {
							ry = y+10;
						}
						layer.add(new Kinetic.Rect({
							x: x, 
							y: ry, 
							width: rw,
							height: 1,
							fill: "#333",
							
						}));
						
						
						
						layer.add(new Kinetic.Text({
							x: x+rw+10,
							y: y,
							text: text,
							fontSize: 11,
							fontFamily: 'Helvetica,Arial,sans-serif',
							fill: '#333'
						}));
					}
					
					// draw legend text
					var n_intervals = 5;
					drawText(width,0,parseFloat(Math.round(json.data_range.start * 100) / 100).toFixed(2),"top");
					drawText(width,height-11,parseFloat(Math.round(json.data_range.end * 100) / 100).toFixed(2),"bottom");
					var interval_data_size = (json.data_range.end - json.data_range.start) / n_intervals;
					var interval_layout_size = height / n_intervals;
					for (i=1;i<=n_intervals;i++){
						var h = interval_layout_size*i,
							d = parseFloat(Math.round(interval_data_size*i * 100) / 100).toFixed(2);
						drawText(width,h,d,"center");
					}
					
					
					
					layer.add(rect);
					stage.add(layer);
			
					
				},
				error: function(){
					// get WMS legend
					var legendUrl = l.tile._url + "?TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&"
									+"EXCEPTIONS=application%2Fvnd.ogc.se_xml&FORMAT=image%2Fpng&LAYER=" + l.tile.wmsParams.layers;
			
					
					$el.find(".co_legend").html("<img src='" + legendUrl +"'/>");
					
					obj.__addLegendDOM($container,$el);
				}
			});
			
		});
		
		this.$layerPanel.find(".slider").slider({
			max: 100,
			min: 0,
			value: 100,
			stop: function( event, ui ){
				$(ui.handle).closest(".opacity_panel").find(".opacity_label").html("Opacity "+ ui.value + " %");
				var id_layer = $(ui.handle).closest(".opacity_panel").siblings("input").attr("id_layer");
				$(ui.handle).closest(".opacity_panel").siblings("img").attr("title","Opacity " + ui.value +" %");
				var l = obj.findLayerById(id_layer);
				l.tile.setOpacity(ui.value/100);
				l["opacity"] = ui.value/100;
			}
		});
		
		this.$layerPanel.sortable({
			out: function(event, ui) {
				var leftGap = 70;					
				if ((ui.position.left + leftGap) < 0 ){
					var id_layer = $(ui.item).find("input").attr("id_layer");
					obj.removeLayer(id_layer);
				}
			},
			start: function( event, ui ) {
				$(ui.item).css("background-color","#f2f7fb");
			},
			stop: function( event, ui ) {
				$(ui.item).css("background-color","#fff");
				var id_layer = $(ui.item).find("input").attr("id_layer");
				var idx = obj.findLayerIdxById(id_layer);
				var l = obj.layers[idx];
				obj.layers.splice(idx,1);
				var new_idx = $(ui.item).index();
				obj.layers.splice(new_idx,0,l);
				
				var temp;
				
				//change priority of all layer with bigger priority
				for(var i=0;i<obj.layers.length;i++){
					for(var j=0;j<obj.layers.length-1;j++){
						var e = obj.layers[j].title;
						var e2 = obj.layers[j+1].title;
						
						if (obj.layers[j].priority < obj.layers[j + 1].priority ){
							temp = obj.layers[j].priority;
				            obj.layers[j].priority = obj.layers[j + 1].priority;
				            obj.layers[j + 1].priority = temp;
				            obj.layers[j].tile.setZIndex(obj.layers[j].priority);
				            obj.layers[j+1].tile.setZIndex(obj.layers[j+1].priority);
						}
					}
				}
				
				//var debug = "";
				//for(var i=0;i<obj.layers.length;i++){
				//	console.log(obj.layers[i].title + ":" +obj.layers[i].priority);
				//}
			
			}
		});
	};
	
	this.featureInfo = function(e,id){
		
		if(!id){
			id = 0;
		}
		
		var map = this.getMap();
		var latlngStr = '(' + e.latlng.lat.toFixed(3) + ', ' + e.latlng.lng.toFixed(3) + ')';
		    
		var BBOX = map.getBounds().toBBoxString();
		var WIDTH = map.getSize().x;
		var HEIGHT = map.getSize().y;
		var X = map.layerPointToContainerPoint(e.layerPoint).x;
		var Y = map.layerPointToContainerPoint(e.layerPoint).y;
		    
		var layers = null;   
		var server = null;
		var requestIdx = null;
		
		for (var i=id;i<this.layers.length;i++){
			var l = this.layers[i];
			if (l.visible && l.opacity>0){
				server = l.tile._url;
				layers = l.tile.wmsParams.layers;
				requestIdx = i;
				break;
			}
		}
		
		if (layers===null || server===null || requestIdx===null)
		{
			$("#container_feature_info").html("No information on this point.");
			
			return;
		}
		
		var request = server + '?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&LAYERS=' +layers+'&QUERY_LAYERS='+layers+'&STYLES=&BBOX='+BBOX+'&FEATURE_COUNT=5&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&FORMAT=image%2Fpng&INFO_FORMAT=text%2Fhtml&SRS=EPSG%3A4326&X='+X+'&Y='+Y;
	    
		var obj = this;
	    $.ajax({
			url : "proxy.php",
			data: { "url": request},	       
			type: "POST",			
	        success: function(data) {
	        	console.log("no error");
	        	if (!data || data.indexOf("LayerNotQueryable")!=-1){
	        		obj.featureInfo(e,requestIdx+1);
	        	}
	        	else{
	        		$("#container_feature_info").html(data);
	        	}
	        	
	        },
	        error: function(){	        	
	        	obj.featureInfo(e,requestIdx+1);
	        }
	    });
		
	};
	
	
	
}