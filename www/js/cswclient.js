CSWClient = {
    templateRequest : "<csw:GetRecords xmlns:csw=\"http://www.opengis.net/cat/csw/2.0.2\" xmlns:ogc=\"http://www.opengis.net/ogc\" "
                    +   " xmlns:xlink=\"http://www.w3.org/1999/xlink\" service=\"CSW\" version=\"2.0.2\""
                    + " maxRecords=\"###MAXRECORDS###\" startPosition=\"###STARTPOSITION###\""
                    + "  resultType=\"results\"  xmlns:gmd=\"http://www.isotc211.org/2005/gmd\">"
                    + "<csw:Query typeNames=\"csw:Record\">"
                    + "     <csw:ElementSetName>full</csw:ElementSetName>"
                    + "     <csw:Constraint version=\"1.1.0\">"
                    + "          <ogc:Filter xmlns=\"http://www.opengis.net/ogc\">"
                    + "                 <ogc:PropertyIsLike escape=\"\\\" singleChar=\"_\" wildCard=\"%\">"
                    + "                     <ogc:PropertyName>anytext</ogc:PropertyName>"
                    + "                     <ogc:Literal>%###SEARCH_STRING###%</ogc:Literal>"
                    + "                 </ogc:PropertyIsLike>"
                    + "         </ogc:Filter>"
                    + "     </csw:Constraint>"
                    + "     <ogc:SortBy>"
                    + "         <ogc:SortProperty>"
                    + "             <ogc:PropertyName>none</ogc:PropertyName>"
                    + "             <ogc:SortOrder>ASC</ogc:SortOrder>"
                    + "         </ogc:SortProperty>"
                    + "     </ogc:SortBy>"
                    + "</csw:Query>"
                    + "</csw:GetRecords>",
    //templateRequest : "<csw:GetRecords xmlns:csw=\"http://www.opengis.net/cat/csw/2.0.2\" service=\"CSW\" version=\"2.0.2\""
    //                    + " maxRecords=\"###MAXRECORDS###\" startPosition=\"###STARTPOSITION###\""
    //                    + " resultType=\"results\" xmlns:gmd=\"http://www.isotc211.org/2005/gmd\">"
    //                    + " <csw:Query typeNames=\"csw:Record\">"
    //                    + "    <csw:ElementSetName typeNames=\"csw:Record \">full</csw:ElementSetName>"
    //                    + "    <csw:Constraint version=\"1.1.0\">"
    //                    + "        <CqlText xmlns=\"http://www.opengis.net/cat/csw/2.0.2\">AnyText like '%###SEARCH_STRING###%' And protocol like 'OGC:WMS%'</CqlText>"
    //                    + "    </csw:Constraint>"
    //                    + "   </csw:Query>"
    //                    + "</csw:GetRecords>",
    MAX_RECORDS: 10,
                        
    MEDINA_CSW: "http://www.medinageoportal.eu/catalogue/srv/eng/csw",
    MEDINA_CSW_ID: 1,
    GEOSS_CSW: "http://geossregistries.info/geonetwork/srv/en/csw",
    GEOSS_CSW_ID: 2,
    
    _searchCSW: function (csw_host,searchString,startPosition,fn)
    {                            
        if (!startPosition) {
            startPosition = 1;
        }
        var csw_request = this.templateRequest.replace("###MAXRECORDS###",this.MAX_RECORDS);
        csw_request = csw_request.replace("###STARTPOSITION###",startPosition);
        csw_request = csw_request.replace("###SEARCH_STRING###",searchString);
        
        $.ajax({
            url:"cswclient/csw-proxy.php",            
            data:{                
                csw_host : csw_host,
                csw_request:csw_request,
            },
            type:"POST",
            success:function(xml){
               fn(xml,startPosition);
            },
            error: function(){
                fn(null);
            }
            
        });
    },    
  	_drawSearchResultsElementsHTML: function (elements,startPosition){
		var html = "";
		for(var i=0;i<elements.length;i++){
			var e = elements[i];
            
            if (e.id == "44fc1a12799c95d7490a72249428e61c2814bb4d") {
                e.url = medinaCatalogWMS +"?Service=WMS&Request=GetCapabilities";
                e.type = "WMS";
            }
            
			html += "<li>" +
					"	<div class='counter'>" + (i+ startPosition) + ". </div>" +
					"	<div class='img_label "+e.type + "'></div>" +
					"	<a class='ctrl_expand'>Expand</a>"+
					"	<div class='info'>" +
					"		<p title='"+e.title+"'>"+e.title +"</p>" +
				//	"		<p title='"+e.org +"'>"+e.org+"</p>"+	
					"	</div>" +
				
					"	<div class='extra' style='display:none'>"+
					"		<p class='desc'>"+ e.description + "</p>";
			
			if (e.subjects.length>0){
               html += "<p class='keywords'><span class='bold'>SUBJECT </span> > " + e.subjects.join("; ") + "</p>";
			}
			
			if (e.type == "WMS"){
				html += "<p><a href='javascript:CSWClient.parseServiceWMS(\"" + e.url +"\")'>Explore WMS service</a></p>";
			}
            else if (e.type == "WMS-LAYER") {
                //code
                html += "<p>" +
                            "<a href='javascript:Split.addLayer(\""+e.layer.server+"\",\""+ e.layer.name +"\",\""+e.layer.title+"\")'>" +
								"<img src='img/MED_icon_add_layer.png' />" +
								"<span>Add layer</span>" +
							"</a>" +
                        "</p>";
            }
            
			//else if (e.type == "CSW"){
			//	html += "<p><a href='javascript:Split.addServiceCSW(\"" + e.url +"\",\""+ e.title +"\")'>Add catalog</a></p>";
			//}
			else{
				html += "<p><a href='" + e.url + "' target='_blank'>Open this external service</a></p>"
			}
	
			html += "	</div>";
			
			html += "</li>"; 
			
		}
		
		return html;
	},
    _drawResultsMedinaCSW: function(xml,startPosition){
        if (!xml) {
            alert("Cannot search in Medina CSW");
            return;
        }
        var elements = CSWClient._parseCSWXML(xml);
        // workarond. Geonetwork doesn't return the Capabilities URL in the CSW. All in medina is a WMS
        for (i in elements){
            elements[i].type = "WMS";
        }
        CSWClient._drawSearchResultsElements(elements,startPosition,CSWClient.MEDINA_CSW_ID);
    },
    _drawResultsGEOSSCSW: function(xml,startPosition){
        if (!xml) {
            alert("Cannot search in GEOSS CSW");
            return;
        }
        
        var elements = CSWClient._parseCSWXML(xml);
        CSWClient._drawSearchResultsElements(elements,startPosition,CSWClient.GEOSS_CSW_ID);
    },
    
    _drawSearchResultsElements: function(elements,startPosition,serverID){
        
        var $panel_search = $("#panel_search_"+serverID);
        
        var html;
					
        if ( startPosition == 1){
            html = "<div class='search_result_top'>" +
                    "	<span class='blue bold'>"+elements.nRecords+"</span>" +
                    "	<span class='grey'>Resultados para</span>" +
                    "	<span class='black italic'>"+$("#search").val()+"</span>" +
                    //"	<span class='grey'>"+$("#search_server > option[selected]").text()+"</span>" +
                    "</div>";
                    
            html += "<ul class='search_result'>" + this._drawSearchResultsElementsHTML(elements.els,startPosition) + "</ul>";
            if (elements.nextRecord<elements.nRecords){
                html += "<div id='more'><a href='javascript:CSWClient.search("+elements.nextRecord+"," + serverID +")'>See more results</a></div>";
            }
            $panel_search.html(html);
        }
        else{
            
            $panel_search.find("ul.search_result").append(this._drawSearchResultsElementsHTML(elements.els,startPosition));
            if (elements.nextRecord<elements.nRecords){
                // add more link
                $panel_search.find("#more").html("<a href='javascript:CSWClient.search("+elements.nextRecord+"," + serverID +")'>See more results</a>");
            }
            else{
                // remove add more link
                $panel_search.find("#more").remove();
            }            
        }					
    },
    _parseCSWXML: function(xml){
        var $sr = $(xml).find("SearchResults");
        var elements = {
            els: [],
            nRecords : parseInt($sr.attr("numberOfRecordsMatched")),
            nRecordsReturn : parseInt($sr.attr("numberOfRecordsReturned")),
            nextRecord : parseInt($sr.attr("nextRecord"))
        };
        var obj;
        
        
        $sr.find("Record").each(function(){
            
            obj = {};
            obj.description = $(this).find("abstract").text();
            obj.title = $(this).find("title").text();
            obj.subjects = $(this).find("subject").map(function() {
                    return $(this).text();
            }).get();
            
            if (obj.subjects.length == 1 && obj.subjects[0] == "") {
                obj.subjects = [];
            }
            obj.date = $(this).find("date").text();
            obj.id = $(this).find("identifier").text();
            //obj.org =  $.trim($($(this).find("contact").find("organisationName")[0]).text());
            //obj.keywords = [];
            //$(this).find("keyword").each(function(){
            //    obj.keywords.push($.trim($(this).text()));
            //});
            
            var $links = $(this).find("URI");
            
            // search WMS
            obj.type = null;
            for(var i=0;i<$links.length;i++){
                var text = $($links[i]).text();
                if (text.indexOf("WMS")!= -1  && text.indexOf("GetCapabilities")!= -1){
                    obj.url = $.trim(text);
                    obj.type = "WMS";
                    break;
                }
            }
            
            for(var i=0;i<$links.length;i++){
                var text = $($links[i]).text();
                var protocol = $($links[i]).attr("protocol");
                if (protocol && protocol.indexOf("WMS")!= -1  && protocol.indexOf("http-get-map")!= -1){
                    var server = $.trim(text);
                    if (!server || server == ""){
                        //workaround. Medina geonetwork doesn't return server base URL.
                        server = medinaCatalogWMS;
                    }
                    else{
                        //adapt server string to medina viewer.
                        // Convert http://geo.vliz.be:80/geoserver/wms?SERVICE=WMS&amp; to http://geo.vliz.be:80/geoserver/wms
                        var idx = server.indexOf("?");
                        if (idx != -1) {
                            server = server.substring(0,idx);
                        }
                    }
                    obj.layer = {
                        server:server,
                        name: $($links[i]).attr("name"),
                        title: $($links[i]).attr("description"),
                    };
                    obj.type = "WMS-LAYER";
                    break;
                }
            }
            
            
            
            // search for CSW
            //if (!obj.type){
            //    for(var i=0;i<$links.length;i++){
            //        var text = $($links[i]).text();
            //        if (text.indexOf("CSW")!= -1  && text.indexOf("GetCapabilities")!= -1){
            //            obj.url = $.trim(text);
            //            obj.type = "CSW";
            //            break;
            //        }
            //    }	
            //}
            
            if (!obj.type){
                // Direct web link, it could be anything	
                obj.type = "WWW";
                obj.url = $.trim($($links[0]).text());	
            }
                                    
            elements.els.push(obj);
            
        });
        
        for(var i=0;i<elements.length;i++){
            var e = elements[i];
            console.log("Title:" + e.title);
            console.log("Description:" + e.title);
            console.log("Type:" + e.type);
            console.log("URL:" + e.url);
            console.log("------------");
        }
        
        return elements;
    },
	search: function(startPosition,serverID){
		
		// no text to search
        var searchString = $("#search").val();
		if (searchString==""){
			return;
		}
		
        if (!$("#panel_search").is(":visible")){
			$("#panel_search").fadeIn(300);
		}
        
        this._backToCSWResultsFromWMSParser();
        
		if (!startPosition){
			startPosition = 1
			// no pagination, this is the first call
			
			
			// to be replaced, use a load image instead of a text message
			$(".search_data").html("<p class='no_search'>Loading...</p>");            
            this._searchCSW(this.MEDINA_CSW,searchString,startPosition,this._drawResultsMedinaCSW);
            
            this._searchCSW(this.GEOSS_CSW,searchString,startPosition,this._drawResultsGEOSSCSW);
		}
		else{
            var $panel_search = $("#panel_search_" +serverID );
			$panel_search.find("#more").html("Loading...");
            if (serverID == this.MEDINA_CSW_ID) {
                this._searchCSW(this.MEDINA_CSW,searchString,startPosition,this._drawResultsMedinaCSW); 
            }
            else if (serverID == this.GEOSS_CSW_ID){
                this._searchCSW(this.GEOSS_CSW,searchString,startPosition,this._drawResultsGEOSSCSW); 
            }            
		}
		
	},
    toggleSearchPanel: function(){
        $("#panel_search").toggle();
    },
    _backToCSWResultsFromWMSParser: function(){        
        var id = $("#panel_header .ctrl.enable").attr("id");
		id = id.substr(id.length - 1); 
		$("#panel_search_"+id).show();
        $("#panel_search_wms").hide();
    },
	parseServiceWMS: function(url){
		var $panel_search = $("#panel_search_wms");
		$panel_search.html("<p class='no_search'>Loading...</p>");  
        
        $(".search_data").hide();
        $panel_search.show();
		
		var req_url = url.replace("?","&");
		
		var server_base_url = url.substring(0,url.indexOf("?"));
		
		$.ajax({
			//url: 'proxy_get.php?url=http://www.idee.es/wms/PNOA/PNOA&service=wms&version=1.3.0&request=getcapabilities',
			//url: 'proxy_get.php?url=http://www.medinageoportal.eu/cgi-bin/medinageoportal&service=wms&version=1.3.0&request=getcapabilities',
			url: 'proxy_wms.php?url='+req_url,
			dataType: 'xml',
			success: function(xml){
				var $srv = $(xml).find("Service");
				var gtitle = $.trim($srv.find("Title").text());
				var gdesc = $.trim($srv.find("Abstract").text());
				
				var gkeywords = [];
				$($srv.find("KeywordList")[0]).find("Keyword").each(function(){
					gkeywords.push($.trim($(this).text()));
				});
				
				var fatherCRSs = [];
				
				var $layerFather = $(xml).find("Layer").first();
				
				var gatt = $.trim($($layerFather.find("Attribution")[0]).find("Title").text());
				
				$layerFather.find("CRS").each(function(){
                    var crs = $.trim($(this).text());
                    if (fatherCRSs.indexOf(crs)==-1) {
                        fatherCRSs.push(crs);    
                    }
				});
                
                $layerFather.find("SRS").each(function(){
					var crs = $.trim($(this).text());
                    if (fatherCRSs.indexOf(crs)==-1) {
                        fatherCRSs.push(crs);    
                    }
				});
                var supportedCRS = fatherCRSs.indexOf("EPSG:3857")!=-1 || fatherCRSs.indexOf("EPSG:4326")!=-1;
				
				var html = "<a class='wms_back' href='javascript:CSWClient._backToCSWResultsFromWMSParser()'>" +
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
                    
                   
					
					html += "<li>" +
                        "	<p class='title'>"+title+"</p>" +
                        "	<p class='desc'>"+desc+"</p>";
						
					if (keywords.length>1){
						html += "<p class='desc'><span class='bold'>KEYWORDS</span> > " + keywords.join(", ") + "</p>";	
					}
						
					html += "<p class='desc mb'>";
                    
                    if (supportedCRS){
                
                        //if the layer is not in 3827 let's draw it in 4326.
                        var str_boolean_4326 = fatherCRSs.indexOf("EPSG:3857")==-1  ? "true" : "false";        
                        html += "	<a href='javascript:Split.addLayer(\""+server_base_url+"\",\""+ name +"\",\""+title+"\","+str_boolean_4326+")'>" +
                        "		<img src='img/MED_icon_add_layer.png' />" +
                        "		<span>Add layer</span>" +
                        "	</a>";
                    }
                    else{
                        html += "<strong>This layer is not offered in a CRS supported by the client (The client support 3857 and 4326).</strong>";
                    }
                    
                    html +=	"</p>" +
                        "</li>";
					
						
					/*console.log("Name:"+ $(this).find("Name").text());
					console.log("Title:"+ $(this).find("Title").text());
					console.log("CRS:"+ $(this).find("CRS").text());*/
				});
				html += "</ul>";
				
				$panel_search.html(html);
			}				
		});
	}
}