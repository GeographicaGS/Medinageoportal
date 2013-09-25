RectangleDrawer = {
	_map : null,
	_canvas: null,
	// Left upper coordinate
	_lu: {"x": null,"y":null},
	// Right lower coordinate
	_rl: {"x": null,"y": null},
	_getMousePos: function( evt) {
        var rect = this._canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
    },
	ini: function (opts){
		this._map = opts.map;
		// create canvas on overlay Pane
		var $overlayPane = $(this._map.getPanes().overlayPane);
		$overlayPane.html("<canvas id='rectangle_drawer' ></canvas>");
		var $container = $(this._map.getContainer());
		// set the width of the overlayPane
		$overlayPane.width($container.width());
		this._canvas = $("#rectangle_drawer")[0];
		
		$(this._canvas).attr("height",$container.height());
		$(this._canvas).attr("width",$container.width());
		
		$("#rectangle_drawer").bind('mousemove', function(evt) {
			evt.stopPropagation();
	        var mousePos = RectangleDrawer._getMousePos(evt);
	        RectangleDrawer._rl.x = mousePos.x;
	        RectangleDrawer._rl.y = mousePos.y;
	        //  console.log('Mouse position: ' + mousePos.x + ',' + mousePos.y);
		}).bind('mousedown', function(evt) {
			evt.stopPropagation();
	        var mousePos = RectangleDrawer._getMousePos(evt);
	        RectangleDrawer._lu.x = mousePos.x;
	        RectangleDrawer._lu.y = mousePos.y;	
	        console.log("x: " + RectangleDrawer._lu.x + " y:" + RectangleDrawer._lu.y);
	        RectangleDrawer._drawRect();
		}).bind('click', function(evt) {
			evt.stopPropagation();
	        var mousePos = RectangleDrawer._getMousePos(evt);
	        RectangleDrawer._lu.x = mousePos.x;
	        RectangleDrawer._lu.y = mousePos.y;	
	        console.log("X1: " + RectangleDrawer._lu.x + " Y1:" + RectangleDrawer._lu.y);
	        
		});
		
		setInterval(function(){
        	RectangleDrawer._drawRect();
        },10)
		
	},
	_drawRect: function(){
		if (this._lu.x && this._lu.y && this._rl.x && this._rl.y)
		{
			var ctx=this._canvas.getContext("2d");
			ctx.save();
			// Use the identity matrix while clearing the canvas
			//ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
			// Restore the transform
			ctx.restore();
			
			var width = this._rl.x - this._lu.x;
			var height = this._rl.y - this._lu.y;
			
			ctx.fillStyle="#00ff00";
			ctx.fillRect(this._lu.x,this._lu.y,width,height);
			
		}
	}
}