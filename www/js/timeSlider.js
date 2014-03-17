Array.prototype.unique = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};

function TimeSlider(opts){

    this.$panel = opts.panel;
    this.groupLayer = opts.groupLayer;
    this.metadata = null;

    this.layers = {};
    this.minTime = null;
    this.maxTime = null;
    this.timeLine = [];
    this.currentTime = null;

    this.refreshTimeLine = function(){
        var minTime = null,
            maxTime = null;

        this.timeLine = [];
        for(idx in this.layers){
            this.timeLine = this.timeLine.concat(Object.keys(this.metadata[idx].time_layers).unique()); 
        }

        if (this.timeLine.length){
            // Order the timeline
            this.timeLine = this.timeLine.sort();
            this.minTime = this.timeLine[0];
            this.maxTime = this.timeLine[this.timeLine.length -1];
        }
        else{
             this.minTime = null;
             this.maxTime = null;
        }
      
  
    };

    this.addLayerToSlider = function(layerName,id){
        if (!this.layers.hasOwnProperty(layerName)){
            this.layers[layerName] = id;     
            this.refreshTimeLine();
            if (!this.currentTime){
                this.currentTime = this.minTime;
            }
            this.drawTimeSlider();
        }
    };

    this.removeLayer = function(id){
        for (l in this.layers){
            if (this.layers[l] == id){
                delete this.layers[l];
                this.refreshTimeLine();
                this.drawTimeSlider();
            }
        }
    };

    this.setMetadata = function(metadata){
        this.metadata = metadata;
    };

    this.drawTimeSlider = function(){
        var n = this.timeLine.length,
            html = "",
            width = this.$panel.width(),
            inc = parseInt(width / n );


        for (var i=0;i<n;i++){

            var sel = this.currentTime == this.timeLine[i]? "selected" : "",
                year = this.timeLine[i].split("-")[0],
                month = this.timeLine[i].split("-")[1],
                textYear = sel || month=="01"  ? year : "",
                textMonth ;

            switch(month){
                case "01":
                    textMonth = "Jan";
                    break;
                case "02":
                    textMonth = "Feb";
                    break;

                case "03":
                    textMonth = "Mar";
                    break;

                case "04":
                    textMonth = "Apr";
                    break;

                case "05":
                    textMonth = "May";
                    break;

                case "06":
                    textMonth = "Jun";
                    break;
                
                case "07":
                    textMonth = "Jul";
                    break;

                case "08":
                    textMonth = "Ago";
                    break;

                case "09":
                    textMonth = "Sep";
                    break;

                case "10":
                    textMonth = "Oct";
                    break;

                case "11":
                    textMonth = "Nov";
                    break;

                case "12":
                    textMonth = "Dec";
                    break;

            }


            html += "<li style='left:"+ ((inc*i)-1) + "px;width:" + inc +"px;' title='" + this.timeLine[i] 
                        + "' idx=" + i +" " +  sel
                        +" year="+ year + " month=" + month + ">"
                        + "<div >"+ textYear+"</div>"
                        + "<div>"+ textMonth+"</div>"
                    + "</li>";
        }

        this.$panel.html(html);

    };


    this.drawTime = function(idx){
        this.currentTime = this.timeLine[idx];

        for (l in this.layers){
            var id_layer = this.layers[l],
                layerObject = this.groupLayer.findLayerById(id_layer);

            // remove all temp layer
            this.groupLayer.map.removeLayer(layerObject.tile);
            
            // add new temp layer
            var opts = {        
                layers: this.metadata[l].time_layers[this.timeLine[idx]],
                format: 'image/png',
                transparent: true,
                zIndex: layerObject.priority
            };

            layerObject.tile =  new L.tileLayer.wms(layerObject.server,opts) ;

            this.groupLayer.map.addLayer(layerObject.tile);
        }
        //console.log(this.groupLayer.findLayerById(this.layers[idx]));

        this.drawTimeSlider();
        

    }

};