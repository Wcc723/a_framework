;(function($){
	$.fn.aFontResize=function(settings){
		var _defaultSettings={
			bind:'click',
			animate:'fade',
			wrap:'body',
			zoomMode:false,
			size:'100',
			sizeType:'%',
			speed:0,
			callback:function(){
				if(_settings.sizeType=="px") var regex=/px/gi;
				else var regex=/\%/gi;
				switch(_settings.animate){
					case false:
						if(_settings.zoomMode) $(_settings.wrap).css("fontSize",parseInt($(_settings.wrap).css("fontSize").replace(regex,""),10)+_settings.size+_settings.sizeType);
						else $(_settings.wrap).css("fontSize",_settings.size+_settings.sizeType); 
					break;
					case 'zoom':
						if(_settings.zoomMode) $(_settings.wrap).animate({fontSize:parseInt($(_settings.wrap).css("fontSize").replace(regex,""),10)+_settings.size+_settings.sizeType},_settings.speed,function(){});
						else $(_settings.wrap).animate({fontSize:_settings.size+_settings.sizeType},_settings.speed,function(){});
					break;
					case 'fade':
						$(_settings.wrap).fadeOut(_settings.speed,function(){
																		   
							if(_settings.zoomMode) $(_settings.wrap).animate({fontSize:parseInt($(_settings.wrap).css("fontSize").replace(regex,""),10)+_settings.size+_settings.sizeType},_settings.speed,function(){});
							else $(_settings.wrap).css("fontSize",_settings.size+_settings.sizeType); 										   
							$(this).fadeIn(_settings.speed);
						 });
					break;
				};
				return false;
			}
		};
		var _settings=$.extend(_defaultSettings,settings);
		return this.each(function(){
			$(this).bind(_settings.bind,_settings.callback);
		});
	};
})(jQuery);
