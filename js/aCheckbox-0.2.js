;(function($){	   
	$.fn.aCheckbox=function(settings){
		var _defaultSettings={
			bind:'click',
			animate:'fade',
			inputTag:'.forInputTextContent',
			outputTag:'.forOutputTextContent',
			copyTo:"after"
		};
		var _settings=$.extend(_defaultSettings,settings);
		//return this.each(function(){$(this).bind(_settings.bind,_settings.callback);});
		return this.each(function(){aCheckbox($(this),_settings);});
		function aCheckbox($this,_settings){
			aCheckbox_2($this,_settings);
			$this.bind('click' ,function(){aCheckbox_2($this,_settings)});
		}
		
		function aCheckbox_2($this,_settings){
			if($this.is(':checked')){
				if(_settings.copyTo=="before") $(_settings.inputTag).clone().prependTo(_settings.outputTag);
				if(_settings.copyTo=="after") $(_settings.inputTag).clone().appendTo(_settings.outputTag);
			}
			if(!$this.is(':checked')){
				$(_settings.outputTag).find(_settings.inputTag).remove();	
			}
		}
		
	};
})(jQuery);