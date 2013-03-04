;(function($){	   
	$.fn.aReplace=function(settings){
		var _defaultSettings={
			bind:'click',
			animate:'fade',
			originalText:'',
			replaceText:'',
			mode:'string',
			callback:function(){
			}
		};
		var _settings=$.extend(_defaultSettings,settings);
		//return this.each(function(){$(this).bind(_settings.bind,_settings.callback);});
		return this.each(function(){aReplace($(this),_settings);});
		function aReplace($this,_settings){
			$this.bind(_settings.bind ,function() {
												
											switch(_settings.mode){
				case 'string':
					var pattern = new RegExp(_settings.originalText,"g");
					var str = $("body").html();
					var result = str.replace(pattern,_settings.replaceText);
					$("body").html(result);
				break;	
				}
			return false;				
			});
		}
		
		
	};
})(jQuery);