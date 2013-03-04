;(function($){	   
	$.fn.aSelect=function(settings){
		var _defaultSettings={
			bind:'click',
			callback:function(){
				$(this).select();
			}
		};
		var _settings=$.extend(_defaultSettings,settings);
		return this.each(function(){$(this).bind(_settings.bind,_settings.callback);});
	};
})(jQuery);