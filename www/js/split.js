Split = {
	layers: null,	
	iniLat: 34,
	iniLng: 14,	
	iniZoom: 4,
	__mapLeft:null,
	__mapRight: null,
	__currentMasterMap: null,
	__mapIsMoving: false,
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
			  crs: L.CRS.EPSG4326,
			  zoomControl: false,
			  attributionControl: false
		});
		
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
			  crs: L.CRS.EPSG4326,
			  zoomControl: false,
			  attributionControl: false
		});
		
				
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
		}
	
		Split.__mapIsMoving = false;
	},
	togglePanel:function (el){
		var totalWidth = Math.floor(($(window).width()-2) /2);
		if (el==this.LEFT){
			//Left panel
			if ($("#panel_left").is(":visible") && $("#panel_right").is(":visible")){	
				// hide panel left
				$("#sep").hide();
				$('#panel_left').hide();
				$('#panel_right').width(totalWidth*2);					
				Split.__mapRight.getMap().invalidateSize();	
				Split.__mapLeft.setActive(false);				
			}
			else{
				$("#sep").show();				
				$('#panel_right').show();
				$('#panel_left').width(totalWidth);					
				Split.__mapLeft.getMap().invalidateSize();	
				Split.__mapRight.setActive(true);
			}			
			
			
		}
		else if (el==this.RIGHT)
		{
			//Right paneltoggleLayers
			if ($("#panel_left").is(":visible") && $("#panel_right").is(":visible")){	
				// hide panel right
				$("#sep").hide();
				$('#panel_right').hide();
				$('#panel_left').width(totalWidth*2);					
				Split.__mapLeft.getMap().invalidateSize();
				Split.__mapRight.setActive(false);
			}
			else{
				$("#sep").show();				
				$('#panel_left').show();
				$('#panel_right').width(totalWidth);					
				Split.__mapRight.getMap().invalidateSize();
				Split.__mapLeft.setActive(true);
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
		$panel_search.html("Loading...");
		
		var req_url = url.replace("?","&");
		
		var server_base_url = url.substring(0,url.indexOf("?"));
		
		$.ajax({
			//url: 'proxy_get.php?url=http://www.idee.es/wms/PNOA/PNOA&service=wms&version=1.3.0&request=getcapabilities',
			//url: 'proxy_get.php?url=http://www.medinageoportal.eu/cgi-bin/medinageoportal&service=wms&version=1.3.0&request=getcapabilities',
			url: 'proxy_get.php?url='+req_url,
			dataType: 'xml',
			success: function(xml){
				var html = "<ul class='wms'>";
				$(xml).find("Layer").first().find("Layer").each(function(){
					var name = $(this).find("Name").text();
					var title = $(this).find("Title").text();
					var crs = $(this).find("CRS").text();
					
					html += "<li>" +
							"	<p>"+title+"</p>" +
							"	<a href='javascript:Split.addLayer(\""+server_base_url+"\",\""+ name +"\",\""+title+"\")'>Add layer</a>" +
							"</li>"
						
					/*console.log("Name:"+ $(this).find("Name").text());
					console.log("Title:"+ $(this).find("Title").text());
					console.log("CRS:"+ $(this).find("CRS").text());*/
				});
				html += "</ul>";
				
				$panel_search.html(html);
			}				
		});
	},
	__getHTMLSearch: function (elements){
		var html = "";
		for(var i=0;i<elements.length;i++){
			var e = elements[i];
			html += "<li>" +
					"	<p>Type: "+ e.type + "</p>" + 
					"	<p>Title: "+ e.title + "</p>" +
					"	<p>Description: "+ e.description + "</p>";
			
			if (e.type == "WMS"){
				html += "<p><a href='javascript:Split.parseServiceWMS(\"" + e.url +"\")'>Explore WMS service</a></p>";
			}
			else if (e.type == "CSW"){
				html += "<p><a href='javascript:Split.addServiceCSW(\"" + e.url +"\")'>Add catalog</a></p>";
			}
			else{
				html += "<p><a href='" + e.url + "' target='_blank'>Open this external service</a></p>"
			}
	
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
			// no pagination, this is the first call
			url +="&startposition=1";
			
			if (!$panel_search.is(":visible")){
				$panel_search.fadeIn(300);
			}
			// to be replaced, use a load image instead of a text message
			$panel_search.html("Loading...");
		}
		else{
			// pagination
			url +="&startposition="+startPosition;
			
			$panel_search.find("#more").html("Loading...");
		}
		
		
		
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
					
					if (!startPosition){
						html = "<ul class='search_result'>" + split.__getHTMLSearch(elements) + "</ul>";
						html += "<div id='more'><a href='javascript:Split.search("+nextRecord+")'>See more</a></div>";
						
						$panel_search.html(html);
					}
					else{
						
						$panel_search.find("ul.search_result").append(split.__getHTMLSearch(elements));
						if (nextRecord<=nRecords){
							// add more link
							$panel_search.find("#more").html("<div id='more'><a href='javascript:Split.search("+nextRecord+")'>See more</a></div>");
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
		console.log(server_url);
		console.log(name);
		console.log(title);
	}
	
	
}