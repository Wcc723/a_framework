;(function($){
	//document.ondragstart = function () { return false; }; 
	$.fn.aZoomIn=function(settings){
		var _defaultSettings={
		zlimg : 'zlimg' //zoom In css

		};		
		var _settings=$.extend(_defaultSettings,_settings);
		return this.each(function(){
			aZoomIn($(this),_settings);
		});
		function aZoomIn($this,_a){
			var $block = $this;
			var $img = $block.find('img');		
			var ZoomIn_link= $img.attr('src');		
			var zlimg = '.'+_a.zlimg;
			
			//路徑
			var srcPathArray = ZoomIn_link.split('/');
			var imgFile = srcPathArray[srcPathArray.length-1];
			var imgArray = imgFile.split('.');
			var imgName =imgArray[0];
			var imgExt = imgArray[1];
			var srcPath = ZoomIn_link.split(imgFile , 1);
			
			
			
			$img.click(function(){		
				var largeImg=srcPath+imgName+'Large.'+imgExt
				$block.append("<div class='"+zlimg+"'><a href='#' class='exitZoomIn'>exit</a><img src='"+largeImg+"'> </div>");	
				//var $imgbox = $block.find('.'+_a.zlimg);
			});
			 $('.exitZoomIn').click(function(){
				 alert (132131)
				 	return false;
				 })
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
		}
	};
})(jQuery);