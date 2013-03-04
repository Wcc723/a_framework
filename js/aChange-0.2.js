;(function($){
	$.fn.aChange=function(settings){
		var _defaultSettings={
			bind:'mouseenter',
			animate:'none',
			type:'filename',
			name:'_hover',
			attribute:'src',
			size:'100%',		
			speed:300,
			callback:function(){
				switch(_settings.attribute){
					case 'src':
						var $this=$(this);
						var img1=$(this).attr('src');
						if(img1==null){
							$this=$(this).find("img");
							img1=$(this).find("img").attr('src');
						}
						var img2=$.fn.aChange.s1(img1,_settings.type,_settings.name);
						if($(this).find("img").attr('dynsrc')!==null) img2=$(this).attr('dynsrc');
						if(_settings.animate=='fade'){
							$this.stop().animate({opacity: 0}, _settings.speed);
							$this.parent().parent().find("a").css('display','inline-block');
							$this.parent().parent().find("a").css('background-image','url('+img2+')');
							$this.parent().parent().find("a").css('background-repeat','no-repeat no-repeat');
						}
						else if(_settings.animate=='opacity'){
							$this.stop().animate({opacity: 1}, _settings.speed);
						}
						else{
							$this.attr('src', img2);
						}
						$this.bind("mouseleave",function(){		
								var $this=$(this),handler=arguments.callee;
   								$this.unbind('mouseout', handler);
								if(_settings.animate=='fade'){
									$this.stop().animate({opacity: 1}, _settings.speed,function(){$this.parent().parent().find("a").css('background','none');});
								}
								else if(_settings.animate=='opacity'){
									$this.stop().animate({opacity: 0.7}, _settings.speed);
								}
								else{
									$this.attr('src' , img1);
								}
						});
					break;
					case 'css':
						$this=$(this);
						var img1=$this.css('background-image');
						var img2=$.fn.aChange.s1(img1,_settings.type,_settings.name);
						$this.css('background-image',img2);
						$(this).bind("mouseleave",function(){
							var $this = $(this), handler = arguments.callee;
   							$this.unbind('mouseout', handler);
							$this.css('background-image',img1);
						});
					break;
				};
			}
		};
		$.fn.aChange.s1=function(img1,type,name){
			var srcPathArray = img1.split('/');
			var imgFile = srcPathArray[srcPathArray.length-1];
			var imgArray = imgFile.split('.');
			var imgName = imgArray[0];
			var imgExt = imgArray[1];
			var srcPath = img1.split(imgFile , 1);
			switch(type){
				case 'filename':
				return srcPath+imgName+name+'.'+imgExt;
				break;
				case 'folder':
				return srcPath+name+'/'+imgName+'.'+imgExt;
				break;
			}
		};
		var _settings=$.extend(_defaultSettings,settings);
		return this.each(function(){
			 if(_settings.animate=='opacity') $(this).css("opacity","0.7");
			$(this).bind(_settings.bind,_settings.callback);}
		);
	};
})(jQuery);
