function catalog() {
    if ($("#catalog").is(":visible")) {
        $("#maps").show();
        $("#catalog").hide();   
    }
    else{
        $("#maps").hide();
        $("#catalog").show();   
    }    
}

function getMedinaWMS(json){
    var url = medinaCatalogWMS + "?SERVICE=WMS&Request=GetCapabilities";
	var req_url = url.replace("?","&");
	
	var server_base_url = url.substring(0,url.indexOf("?"));
		
    
	$.ajax({			
		url: 'proxy_noheaders.php?url='+req_url,
        dataType: 'xml',
		success: function(xml){
            
            // get all the layers. Layer 0 is the WMS layer, that is the reason of the slice
            // let's get the data from the XML and save it FamilyData, a much easier structure
            var familyData = {};
            $(xml).find("Layer").slice(1).each(function(){
            
                var layer = {
                    "name": $($(this).find("Name")[0]).text(),
                    "title" : $($(this).find("Title")[0]).text(),
                    "desc" : $(this).find("Abstract").text()
                };
                
                // find in which family is this layer
                var indexFamily = null;
                
                for(f in json.families){
                    if (json.families[f].indexOf(layer.name)!=-1) {
                        indexFamily = f;
                        break;
                    }
                }
                
                if (indexFamily) {
                    if (!familyData.hasOwnProperty(indexFamily)) {
                        familyData[indexFamily] = [];
                    }
                    
                    familyData[indexFamily].push(layer);
                }
                
            });
         
            var html = "";
            
            for (f in familyData){
                
                var html2 = ""
                for (l in familyData[f]){
                    var layer = familyData[f][l];
                    html2 += "<li>"
                            +   "<img src='img/MED_icon_layer.png' />"
                            +   "<span>"+layer.title+"</span>"
                            +   "<a class='ml' href='javascript:addLayerFromCatalog(\""+medinaCatalogWMS+"\",\""+layer.name+"\",\""+layer.title+"\")'>"
							+       "Add to Map"
							+   "</a>";
                    if (json.metadata.hasOwnProperty(layer.name)) {
                        html2 +=    "<span style='float:right'>|</span>"
                            +   "<a class='mr' href='"+json.metadata[layer.name]+"' target='_blank'>"
							+       "View metadata"
							+   "</a>";
                    }
                            
                            
                    if (layer.desc) {
                        html2 += "<p>"+layer.desc+"</p>";
                    }
                    //Split.addLayer(\""+server_base_url+"\",\""+ name +"\",\""+title+"\")'
                    html2 += "<div class='clear'></div>";
                }
                
                html += "<li class='close'>"
                        +   "<ul class='family_header'>"
                            +   "<li class='ico_open_close'><img src='img/MED_icon_familia.png'></li>"
    						+   "<li class='ico'><img src='img/MED_icon_resul_wms.png'></li>"
                            +   "<li class='name'>"+f+"</li>"
                            +   "<li class='n_elements'>("+ familyData[f].length+")</li>"
    						+   "<li class='closeme'>Close</li>"
    						+   "<li class='clear'></li>"
                        +   "</ul>"                        
                        +   "<div class='clear'></div>"
                        +   "<ul class='family_content'>"
                        +       html2
                        +   "</ul>"
                        + "</li>"     
            }
            $("#catalog ul.families").html(html);
            $("ul.families > li").click(openCloseFamilyCatalog);
        },
        error: function(eee){
            console.log("Error parsing Medina Catalogue");
        }
        
    });
}


function addLayerFromCatalog(server,name,title) {
    // add Layer to split
    Split.addLayer(server,name,title);
    // hide catalog
    catalog();
}
function loadMedinaCatalog() {
   
    $.getJSON("json/families.json",function(json){
        getMedinaWMS(json);
    });
	
}

function openCloseFamilyCatalog(){
    if ($(this).hasClass("close")) {
        $(this).removeClass("close").addClass("open");
        $(this).find("li.ico_open_close > img").attr("src","img/MED_icon_familia_abierta.png");
    }
    else{
        $(this).removeClass("open").addClass("close");
        $(this).find("li.ico_open_close > img").attr("src","img/MED_icon_familia.png");
    }
}