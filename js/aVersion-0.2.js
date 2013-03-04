;(function($){	   
	$.fn.aVersion=function(settings){
		var _defaultSettings={
			inputTag:'.forVersionInput',
			outputTag:'.forVersionOutput'
		};
		var _settings=$.extend(_defaultSettings,settings);
		return this.each(function(){aVersion($(this),_settings);});
		function aVersion($this,_settings){
			$(_settings.outputTag).text($(_settings.inputTag).text())
		};
	};
})(jQuery);