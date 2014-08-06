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

    this.layers = {};
    this.minTime = null;
    this.maxTime = null;
    this.timeLine = [];
    this.currentTime = null;
    this.currentYear = null;
    this.years = [];

    this.refreshTimeLine = function(){
        var minTime = null,
            maxTime = null;

        this.timeLine = [];
        for(idx in this.layers){
            var l = findLayerCatalog(null,idx);
            this.timeLine = this.timeLine.concat(Object.keys(l.time_layers)).unique(); 
        }

        this.years = [];

        if (this.timeLine.length){
            // Order the timeline
            this.timeLine = this.timeLine.sort();
            this.minTime = this.timeLine[0];
            this.maxTime = this.timeLine[this.timeLine.length -1];

            for (var i=0;i<this.timeLine.length;i++){
                var year = this.timeLine[i].split("-")[0];
                if (this.years.indexOf(year)==-1){
                    this.years.push(year);
                }
            }
        }
        else{
            this.minTime = null;
            this.maxTime = null;
            this.currentYear = null;
        }
      
    };

    this.markCurrentTime = function(){
        // mark the first month found
        for(var i=0;i<this.timeLine.length;i++){
            if (this.timeLine[i].split("-")[0] == this.currentYear){
                this.currentTime = this.timeLine[i];
                break;
            }
        }
    };

    this.addLayerToSlider = function(layerName,id){
        if (!this.layers.hasOwnProperty(layerName)){
            this.layers[layerName] = id;     
            this.refreshTimeLine();
            if (!this.currentTime){
                this.currentTime = this.minTime;
            }

            var l = findLayerCatalog(null,layerName);

            this.currentYear = Object.keys(l.time_layers)[0].split("-")[0];
            this.markCurrentTime();
            this.drawTimeSlider();
        }
    };

    this.removeLayer = function(id){
        for (l in this.layers){
            if (this.layers[l] == id){
                delete this.layers[l];
                this.refreshTimeLine();
                if (this.currentYear && this.years.indexOf(this.currentYear) == -1){
                    this.currentYear = this.years[0];
                }
                this.markCurrentTime();
                this.drawTimeSlider();
            }
        }
    };

    this.drawTimeSlider = function(){
        var idxStartYear = null,
            idxEndYear;

        // find where this year is in the timeLine
        for (var i=0;i<this.timeLine.length;i++){
            var year = this.timeLine[i].split("-")[0];
            if (idxStartYear===null && year == this.currentYear){
                idxStartYear = i;
            }
            if (idxStartYear!==null && year!=this.currentYear){
                idxEndYear = i;
                break;
            }
        }

        if (!idxEndYear){
            // the year is the latest on the list
            idxEndYear = this.timeLine.length;
        }

        var html = "",
            n =  idxEndYear - idxStartYear,
            width = this.$panel.width(),
            inc = parseInt(width / n );

        for (var i=idxStartYear,j=0;i<idxEndYear;i++,j++){
            var sel = this.currentTime == this.timeLine[i] ? "selected" : "",
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
                    textMonth = "Aug";
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

            html += "<li style='left:"+ ((inc*j)-1) + "px;width:" + inc +"px;' title='" + this.timeLine[i] 
                        + "' idx=" + i +" " +  sel
                        +" year="+ year + " month=" + month + ">"
                        + "<div >"+ textYear+"</div>"
                        + "<div>"+ textMonth+"</div>"
                    + "</li>";
        }

        this.$panel.find("ul").html(html);

        html = "";
        for (var i=0;i<this.years.length;i++){
            sel = this.currentYear ==this.years[i] ? "selected" :"";
            html += "<option value='"+this.years[i]+"'" + sel + ">" + this.years[i] + "</option>";
        }

        this.$panel.find("select").html(html);

        if (this.years.length>1){
            this.$panel.find("select").show();
        }
        else{
            this.$panel.find("select").hide();
        }

        var self= this;
        this.$panel.find("select").off("change").change(function(){
            self.currentYear = $(this).val().trim();
            for(var i=0;i<self.timeLine.length;i++){
                if (self.timeLine[i].split("-")[0] == self.currentYear){
                    self.drawTime(i);
                    break;
                }
            }
        });

    };

    this.drawTime = function(idx){
        this.currentTime = this.timeLine[idx];

        for (l in this.layers){

            var id_layer = this.layers[l],
                layerObject = this.groupLayer.findLayerById(id_layer),
                layerCatalog = findLayerCatalog(null,l);

            // remove all temp layer
            this.groupLayer.map.removeLayer(layerObject.tile);
            
            if (layerCatalog.time_layers[this.timeLine[idx]]){
                // add new temp layer
                var opts = {        
                    layers: layerCatalog.time_layers[this.timeLine[idx]],
                    format: 'image/png',
                    transparent: true,
                    zIndex: layerObject.priority
                };
                
                layerObject.tile =  new L.tileLayer.wms(layerObject.server,opts) ;

                if (layerObject.visible){
                    this.groupLayer.map.addLayer(layerObject.tile);
                }
            }
        }

        this.drawTimeSlider();
        

    }

};