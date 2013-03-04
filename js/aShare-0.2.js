;(function($){
	$.fn.aShare=function(settings){
		var _defaultSettings={
			bind:'click',
			type:'facebook',
			callback:function(){
				switch(_settings.type){
					case 'facebook':
						window.open('http://www.facebook.com/share.php?u='.concat(encodeURIComponent(location.href)));
					break;
					case 'plurk':
						window.open('http://www.plurk.com/?qualifier=shares&status=' .concat(encodeURIComponent(location.href)) .concat(' ') .concat('&#40;') .concat(encodeURIComponent(document.title)) .concat('&#41;'));
					break;
					case 'twitter':
						window.open('http://twitter.com/home/?status='.concat(encodeURIComponent(document.title)) .concat(' ') .concat(encodeURIComponent(location.href)));
					break;
				};
			return false;
			}
		};
		var _settings=$.extend(_defaultSettings,settings);
		return this.each(function(){$(this).bind(_settings.bind,_settings.callback);});
	};
})(jQuery);
