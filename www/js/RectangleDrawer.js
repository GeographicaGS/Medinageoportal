RectangleDrawer = L.Class.extend({
	_map : null,
	_canvas: null,
	// Left upper coordinate
	_lu: {"x": null,"y":null},
	// Right lower coordinate
	_rl: {"x": null,"y": null},
	options: {	},	
	
	_getMousePos: function( evt) {
        var rect = this._canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
    },
    _dragging: false,
    initialize: function (canvas_id,options){
		this._map = options.map;
		this._callback = options.callback;
		this._canvas_id = canvas_id;		
		
		var $container = $(this._map.getContainer());
		
		this._canvas = $("#"+this._canvas_id)[0];
		
		$(this._canvas).attr("height",$container.height());
		$(this._canvas).attr("width",$container.width());
		$(this._canvas).show();
		
		var obj = this;
		
		$("#" + this._canvas_id).bind('mousemove', function(evt) {
			evt.stopPropagation();
			
			if (obj._dragging){
				var mousePos = obj._getMousePos(evt);
				obj._rl.x = mousePos.x;
				obj._rl.y = mousePos.y;				
				obj._drawRect();
			}			
	        //  console.log('Mouse position: ' + mousePos.x + ',' + mousePos.y);
		}).bind('mousedown', function(evt) {
			evt.stopPropagation();
			obj._dragging = true;
	        var mousePos = obj._getMousePos(evt);
	        obj._lu.x = mousePos.x;
	        obj._lu.y = mousePos.y;	
	        obj._rl.x = null;
	        obj._rl.y = null;
	        obj._drawRect();
	        //console.log("x: " + obj._lu.x + " y:" + obj._lu.y);
	       
		}).bind('mouseup', function(evt) {
			evt.stopPropagation();	       
	        obj._dragging = false;
	        console.log(obj._canvas_id);
	        obj._drawRect();
	        
	        // request a name
	        
	        if ($("#rectangle_name").length == 0){
	        	
	        	var html = "<div id='rectangle_name'>" +
    				"<input type='text' value='Insert Area name' first/>" + 
    				"<a save href='#'>Save</a>"+
    				"<a cancel href='#'>Cancel</a>"+
    			"</div>";
	        	$(obj._canvas).parent().append(html);
	        	
	        	$("#rectangle_name input").focus(function(){
	        		if ($(this).attr("first")==""){
	        			$(this).removeAttr("first");
	        			$(this).val("");
	        		}
	        	});
	        	
	        }
	        
	        $("#rectangle_name").css("top",obj._rl.y -10).css("left",obj._rl.x - 10);
	        
	        $("#rectangle_name a[save]").click(function(){
	        	obj._saveRectangle();
	        });
	        
	        $("#rectangle_name a[cancel]").click(function(){
	        	obj._clearEditableArea();
	        });
	        
	        
		});

		
	},
	_saveRectangle: function(){
		
		if ( $("#rectangle_name input").attr("first")==""){
			return;
		}
		
		//remove the canvas
    	//obj._removeCanvas();
    	
    	var northWest = this._map.containerPointToLatLng([ this._lu.x , this._lu.y]);
    	var southEast = this._map.containerPointToLatLng([ this._rl.x , this._rl.y]);

    	var bounds = new L.LatLngBounds([northWest, southEast]);
    	
    	var name = $("#rectangle_name input").val();
    	this._callback(bounds,name);
    	
    	this._clearEditableArea();
    	
	},
	_removeCanvas: function(){
		this._clearEditableArea();
		$(this._canvas).hide();
	},
	_clearEditableArea: function(){
		$("#rectangle_name").remove();
		this._clearCanvas();
	},
	_clearCanvas: function(){
        // clear canvas
    	var ctx = this._canvas.getContext("2d");
		ctx.save();
		// Use the identity matrix while clearing the canvas
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
		// Restore the transform
		ctx.restore();

	},
	_drawRect: function(){
		if (this._lu.x && this._lu.y && this._rl.x && this._rl.y)
		{
			this._clearCanvas();
			//console.log(this._canvas_id);
	    	var ctx = this._canvas.getContext("2d");

			var width = this._rl.x - this._lu.x;
			var height = this._rl.y - this._lu.y;
			
			
			ctx.strokeStyle = '#00ccff';		    
			ctx.strokeRect(this._lu.x,this._lu.y,width,height);
			
			ctx.fillStyle="#176fb1";	
			ctx.globalAlpha=0.75;
			
			ctx.fillRect(this._lu.x+1,this._lu.y+1,width-1,height-1);
			
		}
	}
});
