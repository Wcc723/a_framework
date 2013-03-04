;(function($){
	$.fn.aLanguage=function(settings){
		var _defaultSettings={
			bind:'click',
			animate:'fade',
			filename:'chinese.txt',
			tag:'.text',
			queryGet:'#',
			splitTag:'│'
			//titleTag:'h1',
			//title:'1'
		};
		var _settings=$.extend(_defaultSettings,settings);
		return this.each(function(){
			aLanguage($(this),_settings);
		});
		function aLanguage($this,_settings){
			$this.on(_settings.bind,function(){
				var $lines;
				$.get(_settings.filename, function(data){
   					$lines = data.split("\n");
					var $j=0;
					for(var $i=0;$i<$lines.length;$i++){
						$linesSplit=$lines[$i].split(_settings.splitTag);
						if($linesSplit[1]){
							$($linesSplit[0]).html($linesSplit[1]);
						}
						else{
							$(_settings.tag+$j).html($lines[$i]);
							$j++;
						}
					}
  					//$("title").text($(_settings.titleTag).html());
				});
				return false;
			});
			if($.url.query("language")){
				$("#"+$.url.query("language")).click();	
			}
		}
	};
})(jQuery);

;(function ($) {
 $.url = {};
 $.extend($.url, {
  _query: {},
  init: function(){
   var queryRaw = "";
   try{
    queryRaw = 
     (document.location.href.split("?", 2)[1] || "").split("#")[0].split("&") || [];
    for(var i = 0; i< queryRaw.length; i++){
     var single = queryRaw[i].split("=");
     if(single[0])
      this._query[single[0]] = unescape(single[1]);
    }
   }
   catch(e){
    alert(e);
   }
  },
  query: function(name){
   return this._query[name] || "";
  },
  queryAll: function(){
   return this._query;
  }
 });
 $.url.init();
})(jQuery);