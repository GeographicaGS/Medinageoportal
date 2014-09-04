var SELECT_LAYER_TEXT = "Choose the layers you want to add.",
    catalogFamilies;

function catalog() {
    if ($("#catalog").is(":visible")) {
        $("#maps").show();
        $("#catalog").slideUp();   
    }
    else{
        $("#maps").hide();
        $("input[layer_name]:checked").each(function(){
            $(this).removeAttr("checked");

        });
        $("#ctrl_multiple_selector").html(SELECT_LAYER_TEXT);
        $("#catalog").slideDown();   
    }    
}

function findLayerCatalog(families,layername){
    if (!families) families = catalogFamilies;
    for(var i=0;i<families.length;i++){
        
        if (families[i].hasOwnProperty("children")){
            response = findLayerCatalog(families[i].children,layername);
            if (response){
                return response;
            }
        }
        else{
            var layer = $.grep(families[i].layers, function(e){ return e.name == layername; });
            if (layer.length > 0) {
                return layer[0];
            }
        }
    }

    return null;
}

function sortByTitle(a, b){
    var aName = a.title.toLowerCase();
    var bName = b.title.toLowerCase(); 
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

function sortByName(a, b){
    var aName = a.name.toLowerCase();
    var bName = b.name.toLowerCase(); 
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

function getFamilyHTML(f){
 
    var html = "";
    if (f.hasOwnProperty("children")){
        var html2 = "";
        f.children.sort(sortByName);
        for (var i=0;i<f.children.length;i++){
            html2 += getFamilyHTML(f.children[i]);    
        }
        
        html += "<li class='close' toggleable>"
                +   "<ul class='family_header'>"
                     +   "<li class='ico_open_close'><img src='img/MED_icon_familia.png'></li>"
                    +   "<li class='ico'><img src='img/MED_icon_resul_wms.png'></li>"
                    +   "<li class='name'>" + f.name + "</li>"
                    +   "<li class='n_elements'>(" + f.children.length + ")</li>"
                    // +   "<li class='closeme'>Close</li>"
                    +   "<li class='clear'></li>"
                +   "</ul>"                        
                +   "<div class='clear'></div>"
                +   "<ul class='family_content'>"
                +       html2
                +   "</ul>"
                + "</li>";
       
    }            
    else{

        f.layers.sort(sortByTitle);

        var html2 = "";
        for (var i=0;i<f.layers.length;i++){
            var layer = f.layers[i],
                type = layer.hasOwnProperty("type") ? layer.type : "";

            html2 += "<li >"
                    +   "<input type='checkbox' layer_name='" + layer.name +
                             "' layer_title='" + layer.title + "'" +
                             "' layer_server='" + (layer.server ? layer.server : "" ) + 
                             "' layer_type='" + type + "'" +
                             (layer.bbox ? 
                             " layer_bbox='"+ layer.bbox.join(" ") 
                             : "") +
                             " '/>"
                    +   "<img src='img/MED_icon_layer.png' />"
                    +   "<span>"+layer.title+"</span>";

            var url_metadata = layer.hasOwnProperty("metadata") ? layer.metadata : null;
            if (url_metadata) {
                 html2 +=   
                       "<a class='mr' href='"+ url_metadata +"' target='_blank'>"
                    +       "View metadata"
                    +   "</a>";
            }
                        
            if (layer.desc) {
                html2 += "<p>"+layer.desc+"</p>";
            }

            html2 += "<div class='clear'></div>";
        }
        
        html += "<li class='close' toggleable>"
                +   "<ul class='family_header'>"
                    +   "<li class='ico_open_close'><img src='img/MED_icon_familia.png'></li>"
                    +   "<li class='ico'><img src='img/MED_icon_resul_wms.png'></li>"
                    +   "<li class='name'>" + f.name + "</li>"
                    +   "<li class='n_elements'>(" + f.layers.length + ")</li>"
                    +   "<li class='closeme'>Close</li>"
                    +   "<li class='clear'></li>"
                +   "</ul>"                        
                +   "<div class='clear'></div>"
                +   "<ul class='family_content'>"
                +       html2
                +   "</ul>"
                + "</li>";
    }
    return html;        
}

function getMedinaWMS(json){
    var url = medinaCatalogWMS + "?SERVICE=WMS&Request=GetCapabilities";
	var req_url = url.replace("?","&");
	
	var server_base_url = url.substring(0,url.indexOf("?"));
		
    catalogFamilies = json.families;
    
	$.ajax({			
		url: 'proxy_noheaders.php?url='+req_url,
        dataType: 'xml',
		success: function(xml){
            
            // get all the layers. Layer 0 is the WMS layer, that is the reason of the slice
            // let's get the data from the XML and complete our families.json structure

            $(xml).find("Layer").slice(1).each(function(){
    
                var layername = $($(this).find("Name")[0]).text()
                    l = findLayerCatalog(json.families,layername);

                if (l){
                    l.title =  $($(this).find("Title")[0]).text();
                    l.desc =  $(this).find("Abstract").text();
                    l.bbox = [ 
                        parseFloat($($(this).find("southBoundLatitude")[0]).text()),
                        parseFloat($($(this).find("westBoundLongitude")[0]).text()),
                        parseFloat($($(this).find("northBoundLatitude")[0]).text()),
                        parseFloat($($(this).find("eastBoundLongitude")[0]).text())
                    ]

                }
            });

            // Split.setMetadataTimeSlider(json.timeslider);
            // Split.timeslider = json.timeslider

            var html = "";

            json.families.sort(sortByName);
            for (var i=0;i<json.families.length;i++){
                html += getFamilyHTML(json.families[i]);
            }
           
            $("#catalog ul.families").html(html);
            $("ul.families li[toggleable]").click(openCloseFamilyCatalog);
            $("input[layer_name]").click(function(e){
                var n_els = $("input[layer_name]:checked").length,
                    html  = "<a href='javascript:addSelection(\"left\")'>left panel</a>, "
                        + "<a href='javascript:addSelection(\"right\")'>right panel</a>, or "
                        +  "<a href='javascript:addSelection()' >both panel</a>",
                    link = n_els ? html : "",
                    text;

                if (!n_els){
                     text = SELECT_LAYER_TEXT;
                }
                else if (n_els==1){
                    text = "1 layer selected - Add to: " + link + ".";
                }
                else{
                    text = n_els + " layers selected - Add to: " + link + ".";
                }

                $("#ctrl_multiple_selector").html(text);
                e.stopPropagation();
            });
        },
        error: function(eee){
            console.log("Error parsing Medina Catalogue");
        }
        
    });
}


function addLayerFromCatalog(server,name,title,timelayer) {
    // add Layer to split
    Split.addLayer(server,name,title,false,timelayer);
    // hide catalog
    catalog();
}

function loadMedinaCatalog() {
   
    $.getJSON("json/families.json",function(json){
        getMedinaWMS(json);
    });
	
}

function openCloseFamilyCatalog(e){
    e.stopPropagation();

    if ($(this).hasClass("close")) {
        $(this).removeClass("close").addClass("open");
        $(this).find(">.family_header li.ico_open_close > img").attr("src","img/MED_icon_familia_abierta.png");
    }
    else{
        $(this).removeClass("open").addClass("close");
        $(this).find(">.family_header li.ico_open_close > img").attr("src","img/MED_icon_familia.png");
    }
}

function addSelection(panel){
    $("input[layer_name]:checked").each(function(){
        var name = $(this).attr("layer_name"),
            title = $(this).attr("layer_title"),
            type = $(this).attr("layer_type"),
            server =  !$(this).attr("layer_server") ? medinaCatalogWMS : $(this).attr("layer_server"),
            bbox = !$(this).attr("layer_bbox") ? null : $(this).attr("layer_bbox");
        
        Split.addLayer(server,name,title,false,type,panel,bbox);
    });
    // hide catalog
    catalog();
}

