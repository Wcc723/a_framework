;(function($){
	$.fn.aView=function(settings){
		var _defaultSettings={
			bind:'click',
			mode:'tabviwe', //view and layer can use.
			animate:'fade',
			tab:'.header', //view and layer required.
			tabtype:'li', //view required.
			content:'.content', //view and layer required.
			contenttype:'li', //view required.
			selectclass:'select',
			closeMode:true, //layer model dobule bind can close.
			showIndex:0, // Need Use <LI>
			speed:500,
			opacityIn:1,
			opacityOut:0.8,			
			callback:function(){
				if(!$animateComplete) return false;
				$animateComplete=false;
				switch(_settings.mode){
					case 'tabviwe':
					var no = $(this).index();
					switch(_settings.animate){
						case 'fade':
							$(_settings.tab+' '+_settings.tabtype).removeClass("select");
							$(_settings.content+' '+_settings.contenttype).stop().fadeOut(_settings.speed);
							$(_settings.content+' '+_settings.contenttype).eq(no).stop().delay(_settings.speed).fadeIn(_settings.speed,function(){$animateComplete=true;});
							$(_settings.tab+' '+_settings.tabtype).eq(no).addClass(_settings.selectclass);
							$(_settings.tab+' '+_settings.tabtype).css('opacity',_settings.opacityOut).eq(no).css('opacity',_settings.opacityIn);
						break;
						case 'slide':
							$(_settings.content+' '+_settings.contenttype).slideUp(_settings.speed);
							$(_settings.content+' '+_settings.contenttype).eq(no).delay(_settings.speed).slideDown(_settings.speed,function(){$animateComplete=true;});
							$(_settings.tab+' '+_settings.tabtype).css('opacity',_settings.opacityOut).eq(no).css('opacity',_settings.opacityIn);
						break;
					};
					break;
					case 'tree':
					var no = $(this).index();
					switch(_settings.animate){
						case 'fade':
								if($(this).parent().find(_settings.content).is(":hidden")){
									$(this).parent().parent().find(_settings.content).stop().fadeOut(_settings.speed);
									$(this).parent().find(_settings.content).stop().delay(_settings.speed).fadeIn(_settings.speed,function(){$animateComplete=true;});
								}
								else if($(this).parent().find(_settings.content).is(":visible")){
									$(this).parent().parent().find(_settings.content).stop().fadeOut(_settings.speed,function(){$animateComplete=true;});								
								}
						break;
						case 'slide':
								if($(this).parent().find(_settings.content).is(":hidden")){
									$(this).parent().parent().find(_settings.content).stop().slideUp(_settings.speed);
									$(this).parent().find(_settings.content).stop().delay(_settings.speed).slideDown(_settings.speed,function(){$animateComplete=true;});
								}
								else if($(this).parent().find(_settings.content).is(":visible")){
									$(this).parent().parent().find(_settings.content).stop().slideUp(_settings.speed,function(){$animateComplete=true;});								
								}
						break;
					};
					break;
					case 'layer':
					switch(_settings.animate){
						case 'fade':
								if($($(this).attr("href")).is(":hidden")){
									$(_settings.content).fadeOut(_settings.speed);
									$($(this).attr("href")).stop().delay(_settings.speed).fadeIn(_settings.speed,function(){$animateComplete=true;});
								}
								else if($($(this).attr("href")).is(":visible")){			
									$animateComplete=true;
								}
						break;
						case 'slide':
								if($(this).parent().find(_settings.content).is(":hidden")){
									$(this).parent().parent().find(_settings.content).stop().slideUp(_settings.speed);
									$(this).parent().find(_settings.content).stop().delay(_settings.speed).slideDown(_settings.speed,function(){$animateComplete=true;});
								}
								else if($(this).parent().find(_settings.content).is(":visible")){
									$(this).parent().parent().find(_settings.content).stop().slideUp(_settings.speed,function(){$animateComplete=true;});								
								}
						break;
					};
					return false;
					break;
					break;
				};
			}
			
		};
		var $animateComplete=true;
		var _settings=$.extend(_defaultSettings,settings);
		if(_settings.mode=='tabviwe'){
			$(_settings.content+' '+_settings.contenttype).hide();
			$(_settings.tab+' '+_settings.tabtype).css('cursor','pointer');
			$(_settings.tab+' '+_settings.tabtype).css('opacity',_settings.opacityOut).eq(0).css('opacity',_settings.opacityIn);
			$(_settings.content+' '+_settings.contenttype).eq(0).show();
			$(_settings.tab+' '+_settings.tabtype).eq(0).addClass(_settings.selectclass);
			$(_settings.tab+' '+_settings.tabtype+' a').attr("onClick","return false");
			return this.each(function(){$($(this).val()+" "+_settings.tab+" "+_settings.tabtype).bind(_settings.bind,_settings.callback);});
		}
		else if(_settings.mode=='tree'){
			$(_settings.content).hide();
			$($(this).val()+' '+_settings.content).eq(_settings.showIndex-1).show();
			$($(this).val()+' li:nth-child('+_settings.showIndex+') '+_settings.content).show(); // show showIndex data.
			return this.each(function(){$($(this).val()+" "+_settings.tab).bind(_settings.bind,_settings.callback);});
		}
		else if(_settings.mode=='layer'){
			$(_settings.content).hide();
			$(_settings.content).eq(0).show();
			return this.each(function(){$(this).bind(_settings.bind,_settings.callback);});
		}
	};
})(jQuery);
