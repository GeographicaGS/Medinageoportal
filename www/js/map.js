Medina = {
	layers: null,	
	iniLat: 37.56199695314352,
	iniLng: -4.85595703125,	
	iniZoom: 1,
	initialize: function(layers){
		map = L.map('map').setView([this.iniLat, this.iniLng], this.iniZoom);
		
		L.tileLayer('http://{s}.tile.cloudmade.com/786693e266154000b2437bca345c5fc6/997/256/{z}/{x}/{y}.png', {
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
			maxZoom: 18
		}).addTo(map);
		
		var nexrad = L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
			layers: 'nexrad-n0r-900913',
			format: 'image/png',			
			transparent:true,
			attribution: "Weather data © 2012 IEM Nexrad"
		});
		nexrad.addTo(map);
	}
}