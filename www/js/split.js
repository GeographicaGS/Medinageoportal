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
			  zoomControl: false,
			  attributionControl: false
		});
		
		ggl1 = new L.Google('SATELLITE');
		mapLeft.addLayer(ggl1);
		
		zoomControl.addTo(mapLeft);
		
		var opts = {
				map: mapLeft,
				layers: layers,
				father:this.LEFT,
				$layerPanel : $("#panel_left ul.layer_panel")
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
		
		ggl2 = new L.Google('SATELLITE');
		mapRight.addLayer(ggl2);		
		
		zoomControl.addTo(mapRight);		
		
		opts = {
				map: mapRight,
				layers: layers,
				father:this.RIGHT,
				$layerPanel : $("#panel_right ul.layer_panel")
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
		
		$("#ctrl_feature_info").click(function(){
			var $rd = $("#ctrl_rectangle_drawer");
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

		b.panTo(a.getCenter());
		
		if (newZoom !== otherZoom){
		    b.setZoom(newZoom);
			setTimeout(function(){
				var c = a.getCenter();
				c.lat += 0.0001
				b.setView(c);
			},500);
		}
	
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
		var rurl = Split.syncEnabletoggleLayer ? "MED_icon_enlazar_OK_right.png" : "MED_icon_enlazar_KO_right.png";
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
	
	
	__getCSWURL: function(){
		var url,server,text;
		
		server = $("#search_server").val();
		server = "http://pegasosdi.uab.es/catalog/srv/en/csw"
		text = $("#search").val();
		
		// let's build a valid request url
		// first, we've to call to the service through a proxy to avoid cross domain request
		url = "proxy_get.php?url="+server;
		// build the request
		url += "&service=CSW&Version=2.0.2&request=GetRecords&resultType=results&typeNames=gmd:MD_Metadata"
				+"&constraintlanguage=CQL_TEXT&constraint=gmd:anytext+like+'"+escape(text)+"'"
				+ "&constraint_language_version=1.1.0&outputFormat=application/xml"
				+ "&outputSchema=http://www.isotc211.org/2005/gmd&elementsetname=full";
		
		return url;
		
	},
	
	parseServiceWMS: function(url){
		var $panel_search = $("#panel_search");
		$panel_search.html("<p class='no_search'>Loading...</p>");

		
		var req_url = url.replace("?","&");
		
		var server_base_url = url.substring(0,url.indexOf("?"));
		
		$.ajax({
			//url: 'proxy_get.php?url=http://www.idee.es/wms/PNOA/PNOA&service=wms&version=1.3.0&request=getcapabilities',
			//url: 'proxy_get.php?url=http://www.medinageoportal.eu/cgi-bin/medinageoportal&service=wms&version=1.3.0&request=getcapabilities',
			url: 'proxy_get.php?url='+req_url,
			dataType: 'xml',
			success: function(xml){
				var $srv = $(xml).find("Service");
				var gtitle = $.trim($srv.find("Title").text());
				var gdesc = $.trim($srv.find("Abstract").text());
				
				var gkeywords = [];
				$($srv.find("KeywordList")[0]).find("Keyword").each(function(){
					gkeywords.push($.trim($(this).text()));
				});
				
				
				var fatherSupport4326 = false;
				
				var $layerFather = $(xml).find("Layer").first();
				
				var gatt = $.trim($($layerFather.find("Attribution")[0]).find("Title").text());
				
				$layerFather.find("SRS").each(function(){
					if ($(this).text()=="EPSG:4326"){
						fatherSupport4326 = true;
						return false;
					}
				});
				
				var html = "<a class='wms_back' href='javascript:Split.search()'>" +
				"	<img src='img/MED_icon_back.png' />"+
				"	<span class='blue'>Volver a resultados</span>" +
				"</a>"; 
					
				html += "<ul class='wms'>";
				
				html += "<li>" +
				"	<p class='title'>" + gtitle + "</p>" +
				"	<p class='att'>"+ gatt + "</p>" +
				"	<p class='desc'>" + gdesc + "</p>";
				
				if (gkeywords.length>1){
					html += "<p class='desc'><span class='bold'>KEYWORDS</span> > " + gkeywords.join(", ") + "</p>";	
				}
				var $childs = $layerFather.find("Layer");
				
				html += "<p class='desc mb'><span class='bold grey2'>LAYERS</span> (" + $childs.length +") </p>";
				html +="</li>"
					
				$childs.each(function(){
					var name = $(this).find("Name").text();
					
					var title = $(this).find("Title").text();
					if (!title || title=="") title = gtitle;
					
					var desc = $.trim($(this).find("Abstract").text());
					
					var keywords = [];
					$($srv.find("KeywordList")[0]).find("Keyword").each(function(){
						keywords.push($.trim($(this).text()));
					});
					var support4326 = false;
					
					$srs = $(this).find("SRS");
					
					if ($srs.length>0){
						$srs.each(function(){
							if ($(this).text()=="EPSG:4326"){
								support4326 = true;
								return false;
							}
						});
					}
					else{
						// no SRS defined in this node look the father
						support4326 = fatherSupport4326;
					}	
					
					if (support4326){
						html += "<li>" +
							"	<p class='title'>"+title+"</p>" +
							"	<p class='desc'>"+desc+"</p>";
						
						if (keywords.length>1){
							html += "<p class='desc'><span class='bold'>KEYWORDS</span> > " + keywords.join(", ") + "</p>";	
						}
						
						html += "<p class='desc mb'>" +
								"	<a href='javascript:Split.addLayer(\""+server_base_url+"\",\""+ name +"\",\""+title+"\")'>" +
								"		<img src='img/MED_icon_add_layer.png' />" +
								"		<span>Add layer</span>" +
								"	</a>" +
								"</p>" +
						"</li>"
					}
					
					
				
						
					/*console.log("Name:"+ $(this).find("Name").text());
					console.log("Title:"+ $(this).find("Title").text());
					console.log("CRS:"+ $(this).find("CRS").text());*/
				});
				html += "</ul>";
				
				$panel_search.html(html);
			}				
		});
	},
	addServiceCSW: function (url,title){
		var req_url = url.replace("?","&");
		$("#search_server").append("<option value='" + req_url +"'>"+title+"</option>");
		$("#search_server").val(req_url);
		this.search();
		
	},
	__getHTMLSearch: function (elements,startPosition){
		var html = "";
		for(var i=0;i<elements.length;i++){
			var e = elements[i];
			html += "<li>" +
					"	<div class='counter'>" + (i+ startPosition) + ". </div>" +
					"	<div class='img_label "+e.type + "'></div>" +
					"	<a class='ctrl_expand'>Expand</a>"+
					"	<div class='info'>" +
					"		<p title='"+e.title+"'>"+e.title +"</p>" +
					"		<p title='"+e.org +"'>"+e.org+"</p>"+	
					"	</div>" +
				
					"	<div class='extra' style='display:none'>"+
					"		<p class='desc'>"+ e.description + "</p>";
			
			if (e.keywords.length>0){
				html += "<p class='keywords'><span class='bold'>KEYWORDS </span> > " + e.keywords.join(", ") + "</p>";
			}
					
			
					
			
			if (e.type == "WMS"){
				html += "<p><a href='javascript:Split.parseServiceWMS(\"" + e.url +"\")'>Explore WMS service</a></p>";
			}
			else if (e.type == "CSW"){
				html += "<p><a href='javascript:Split.addServiceCSW(\"" + e.url +"\",\""+ e.title +"\")'>Add catalog</a></p>";
			}
			else{
				html += "<p><a href='" + e.url + "' target='_blank'>Open this external service</a></p>"
			}
	
			html += "	</div>";
			
			html += "</li>"; 
			
		}
		
		return html;
	},
	search: function(startPosition){
		
		// no text to search
		if ($("#search").val()==""){
			return;
		}
		
		var url = this.__getCSWURL();
		
		var $panel_search = $("#panel_search");
		
		if (!startPosition){
			startPosition = 1
			// no pagination, this is the first call
			
			if (!$panel_search.is(":visible")){
				$panel_search.fadeIn(300);
			}
			// to be replaced, use a load image instead of a text message
			$panel_search.html("<p class='no_search'>Loading...</p>");
		}
		else{
			$panel_search.find("#more").html("Loading...");
		}
		
		// pagination
		url +="&startposition="+startPosition;
		
		// set object to access y ajax success closure
		var split = this;
		
		// make the ajax request
		$.ajax({
			//url: "proxy_get.php?url=http://geossregistries.info:9002/geonetwork/srv/en/csw&Request=GetCapabilities&Service=CSW&Version=2.0.2",
			//url:   "proxy_get.php?url=http://geossregistries.info:9002/geonetwork/srv/en/csw&service=CSW&Version=2.0.2&request=GetRecords&resultType=results&typeNames=gmd:MD_Metadata&constraintlanguage=CQL_TEXT&constraint=gmd:anytext+like+'ice'&constraint_language_version=1.1.0&outputFormat=application/xml&outputSchema=http://www.isotc211.org/2005/gmd&startposition=1&elementsetname=full",
			url: url,
			dataType: 'xml',
			success: function(xml){
				var $sr = $(xml).find("SearchResults");
				var elements = [];
				var obj;
				var nRecords = parseInt($sr.attr("numberOfRecordsMatched"));
				var nRecordsReturn = parseInt($sr.attr("numberOfRecordsReturned"));
				var nextRecord = parseInt($sr.attr("nextRecord"));
				
				if ($sr.length>0){
					$sr.find("MD_Metadata").each(function(){
						obj = {};
						var $info = $(this).find("identificationInfo");						
						obj.description = $.trim($info.find("abstract").text());
						obj.title = $.trim($info.find("citation").find("title").text());
						obj.date = $.trim($($info.find("citation").find("date")[0]).text());
						obj.org =  $.trim($($(this).find("contact").find("organisationName")[0]).text());
						obj.keywords = [];
						$(this).find("keyword").each(function(){
							obj.keywords.push($.trim($(this).text()));
						});
						
						var $links = $(this).find("distributionInfo").find("linkage");
						
						// search WMS
						obj.type = null;
						for(var i=0;i<$links.length;i++){
							if ($($links[i]).text().indexOf("WMS")!= -1){
								obj.url = $.trim($($links[i]).text());
								obj.type = "WMS";
								break;
							}
						}
						
						// search for CSW
						if (!obj.type){
							for(var i=0;i<$links.length;i++){
								if ($($links[i]).text().indexOf("CSW")!= -1){
									obj.url = $.trim($($links[i]).text());
									obj.type = "CSW";
									break;
								}
							}	
						}
						
						if (!obj.type){
							// Direct web link, it could be anything	
							obj.type = "WWW";
							obj.url = $.trim($($links[0]).text());	
						}
												
						elements.push(obj);
						
					});
					
					var html;
					
					if ( startPosition == 1){
						html = "<div class='search_result_top'>" +
								"	<span class='blue bold'>"+nRecords+"</span>" +
								"	<span class='grey'>Resultados para</span>" +
								"	<span class='black italic'>"+$("#search").val()+"</span>" +
								"	<span class='grey'>"+$("#search_server > option[selected]").text()+"</span>" +
								"</div>";
								
						html += "<ul class='search_result'>" + split.__getHTMLSearch(elements,startPosition) + "</ul>";
						html += "<div id='more'><a href='javascript:Split.search("+nextRecord+")'>See more results</a></div>";
						
						$panel_search.html(html);
					}
					else{
						
						$panel_search.find("ul.search_result").append(split.__getHTMLSearch(elements,startPosition));
						if (nextRecord<=nRecords){
							// add more link
							$panel_search.find("#more").html("<a href='javascript:Split.search("+nextRecord+")'>See more</a>");
						}
						else{
							// remove add more link
							$panel_search.find("#more").remove();
						}
						
					}
					
					
					/*for(var i=0;i<elements.length;i++){
						var e = elements[i];
						console.log("Title:" + e.title);
						console.log("Description:" + e.title);
						console.log("Type:" + e.type);
						console.log("URL:" + e.url);
						console.log("------------");
					}*/
				}
				else{
					$panel_search.html("<p class='no_search'>No results found</p>");
				}
				
			}	
			,error: function(){
				$panel_search.html("<p class='no_search'>No results found</p>");
			}
		});
	},
	addLayer: function (server_url,name,title){
		
		var l = {
			server: server_url,
			title: title,
			layers: name
		}
		this.__mapLeft.addLayer(l);
		this.__mapRight.addLayer(l);
		//$("#panel_search").fadeOut(300);
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
	},
	
	deActivateRectangleTool:function(){
		this._ldrawer._removeCanvas();
		this._rdrawer._removeCanvas();
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
	
	
	
}
