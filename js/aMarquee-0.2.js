;(function($){
	$.fn.aMarquee=function(settings){
		var _defaultSettings={
			animate:'silde', //option: silde, fade
			wrapTag:'.wrap',
			contentTag:'ul',
			itemTag:'li',
			textTag:'article',
			arrowsTag:'.arrows',
			captionTag:'.caption',
			width:0, //Not necessary
			height:0, //Not necessary
			timeSpeed:500,
			autoPlay:true,
			itemPlay:2,
			itemShow:2,
			seamlessMode:true,
			defaultCss:true,
			arrowsView:true,
			captionView:true,
			startFrom:'right', //option: top, bottom, left, right
			animateSpeed:1000
		};
		var _settings=$.extend(_defaultSettings,settings);
		return this.each(function(){
			pg_mg_f1($(this),_settings);
		});
		function pg_mg_f1($this,_settings){
			//System set
			var $wrapTag=$this.find(_settings.wrapTag), 
			$contentTag=$wrapTag.find(_settings.contentTag), 
			$itemTag=$contentTag.find(_settings.itemTag), 
			$captionTag=$this.find(_settings.captionTag), 
			regex=/px/gi,
			isHover=false,
			$axis;
			var $timer=new Array;
			var $animateComplete=new Array;
			var $contentLength=new Array;
			var $playLength=new Array;
			var $itemLength=new Array;
			$animateComplete[$this]=true;
			
			if((_settings.startFrom=="left")||(_settings.startFrom=="right")) $axis="horizontal";
			else $axis="vertical";
			
			if(!_settings.arrowsView) $this.find(_settings.arrowsTag).css("display","none");
			if(!_settings.captionView) $this.find(_settings.captionTag).css("display","none");
			
			if(_settings.defaultCss){
				$contentTag.css("position","absolute");
				$wrapTag.css("overflow","hidden");
				$wrapTag.css("position","relative");
				$wrapTag.css("float","left");
				$itemTag.css("float","left");
			}
			//if not set width/height get item width/height

			
			if(!_settings.width) _settings.width=$itemTag.outerWidth(true);
			else $itemTag.width(_settings.width);
			if(!_settings.height) _settings.height=$itemTag.outerHeight(true);	
			else $itemTag.height(_settings.height);
			//if not set item get item width/height
			if(!_settings.itemShow){
				if($axis=="horizontal") _settings.itemShow=$wrapTag.outerWidth(true)/_settings.width;
				if($axis=="vertical") _settings.itemShow=$wrapTag.outerHeight(true)/_settings.height;
			}

			if(_settings.defaultCss){
			//set wrapTag width by _settings.itemShow
				if($axis=="horizontal"){
					if(!$wrapTag.width()) $wrapTag.width(_settings.width*_settings.itemShow);
					if(!$wrapTag.height()) $wrapTag.height(_settings.height);
				}
				if($axis=="vertical"){
					if(!$wrapTag.height()) $wrapTag.height(_settings.height*_settings.itemShow);	
					if(!$wrapTag.width()) $wrapTag.width(_settings.width);
				}
			}
			if($axis=="horizontal"){
				$playLength[$this]=_settings.itemPlay*$itemTag.outerWidth(true);
				$showLength=_settings.itemShow*$itemTag.outerWidth(true);
				$itemLength[$this]=$itemTag.outerWidth(true);
				$contentLength[$this]=$itemTag.outerWidth(true)*$itemTag.length;
			}
			if($axis=="vertical"){
				$playLength[$this]=_settings.itemPlay*$itemTag.outerHeight(true);
				$showLength=_settings.itemShow*$itemTag.outerHeight(true);
				$itemLength[$this]=$itemTag.outerHeight(true);
				$contentLength[$this]=$itemTag.outerHeight(true)*$itemTag.length;
			}
			if(($contentTag.width()<=$contentLength[$this])&&($axis=="horizontal")) $contentTag.width($contentLength[$this]);
			if(($contentTag.height()<=$contentLength[$this])&&($axis=="vertical")) $contentTag.height($contentLength[$this]);
			if(_settings.seamlessMode){
				if($axis=="horizontal") $contentTag.width($contentLength[$this]*3);
				if($axis=="vertical") $contentTag.height($contentLength[$this]*3);
				$contentHTML=$contentTag.html();
				$contentTag.append($contentHTML);
				$contentTag.prepend($contentHTML);
			}			
			
			
			$contentTag.hover(function(){
				isHover=true;
				clearTimeout($timer[$this]);
			},function(){
				isHover=false;
				if(_settings.autoPlay==true) $timer[$this]=setTimeout(move, _settings.timeSpeed);
			});
			$position=$contentTag.css("left");
			$this.find(_settings.arrowsTag).delegate('a', 'click', function(event){				 
				if(!$animateComplete[$this]) return false;
				$animateComplete[$this]=false;
				if(isHover) return;
				clearTimeout($timer[$this]);
				switch(event.target.className){
					case 'next':
						$moveLength=0-$playLength[$this];
					break;
					case 'prev':
						$moveLength=$playLength[$this];
					break;
				}					
							
				if($axis=="horizontal"){
					$position=parseInt($contentTag.css("left").replace(regex,""),10); //Now position
					$move=($position+$moveLength); //Move Length
					if(_settings.seamlessMode){
						if($move<(0-$contentLength[$this]*2)) $contentTag.animate({left:$position+$contentLength[$this]+"px"}, 0);
						else if($position>(0-$contentLength[$this])) $contentTag.animate({left:$position-$contentLength[$this]+"px"}, 0);	
						$position=parseInt($contentTag.css("left").replace(regex,""),10); //Reset Now position
						$move=($position+$moveLength); //Reset Move Length
					}
					else{
						if($move<=(0-$contentLength[$this])) $move=0;
						if($position>0) $move=0-$contentLength[$this]+$moveLength;
						
						//if($move>=$showLength) $move=$move-$itemLength[$this]; // if over showLength, add one itemLength
						//else if($move<=(0-$showLength)) $move=$move+$itemLength[$this]; // if over showLength, add one itemLength
					}
					switch(_settings.animate){
						case 'silde':
							$contentTag.animate({left:$move+"px"}, _settings.animateSpeed, 'linear', function(){
								if((!isHover)&&(_settings.autoPlay==true)) $timer[$this]=setTimeout(move, _settings.timeSpeed);
								$animateComplete[$this]=true;	
								$position=parseInt($contentTag.css("left").replace(regex,""),10); //Reset position;
								$index=Math.abs($position/$itemLength[$this]); //Get $index for captionTag;
								if(_settings.seamlessMode){
									$index=$index-$itemTag.length;
									if(Math.abs($index)>$itemTag.length-1) $index=0;
								}
								else if($index<0) $index=0;
								$captionTag.html($itemTag.eq($index).find(_settings.textTag).html()).fadeIn(_settings.animateSpeed);	
							});		
							
						break;
						case 'fade':
							$contentTag.fadeOut(_settings.animateSpeed).animate({left:$move}, _settings.animateSpeed, function(){
								if((!isHover)&&(_settings.autoPlay==true)) $timer[$this]=setTimeout(move, _settings.timeSpeed);
								$animateComplete[$this]=true;	
								$position=parseInt($contentTag.css("left").replace(regex,""),10); //Reset position;
								$index=((0-$position)/$itemLength[$this]); //Get $index for captionTag;
								if(_settings.seamlessMode){
									$index=$index-$itemTag.length;
									if(Math.abs($index)>$itemTag.length-1) $index=0;
								}
								else if($index<0) $index=0;
								$captionTag.html($itemTag.eq($index).find(_settings.textTag).html()).fadeIn(_settings.animateSpeed);	
							}).fadeIn(_settings.animateSpeed);			
						break;
					};
				}
				else{
					$position=parseInt($contentTag.css("top").replace(regex,""),10); //Now position
					$move=($position+$moveLength); //Move Length
					if(_settings.seamlessMode){
						if($move<(0-$contentLength[$this]*2)) $contentTag.animate({top:$position+$contentLength[$this]+"px"}, 0);
						else if($position>(0-$contentLength[$this])) $contentTag.animate({top:$position-$contentLength[$this]+"px"}, 0);	
						$position=parseInt($contentTag.css("top").replace(regex,""),10); //Reset Now position
						$move=($position+$moveLength); //Reset Move Length
					}
					else{
						if($move<=(0-$contentLength[$this])) $move=0;
						if($position>0) $move=0-$contentLength[$this]+$moveLength;	
					}
					switch(_settings.animate){
						case 'silde':
							$contentTag.animate({top:$move+"px"}, _settings.animateSpeed, function(){
								if((!isHover)&&(_settings.autoPlay==true)) $timer[$this]=setTimeout(move, _settings.timeSpeed);
								$animateComplete[$this]=true;	
								$position=parseInt($contentTag.css("top").replace(regex,""),10); //Reset position;
								$index=Math.abs($position/$itemLength[$this]); //Get $index for captionTag;
								if(_settings.seamlessMode){
									$index=$index-$itemTag.length;
									if(Math.abs($index)>$itemTag.length-1) $index=0;
								}
								else if($index<0) $index=0;
								$captionTag.html($itemTag.eq($index).find(_settings.textTag).html()).fadeIn(_settings.animateSpeed);	
							});		
							
						break;
						case 'fade':
							$contentTag.fadeOut(_settings.animateSpeed).animate({top:$move}, _settings.animateSpeed, function(){
								if((!isHover)&&(_settings.autoPlay==true)) $timer[$this]=setTimeout(move, _settings.timeSpeed);
								$animateComplete[$this]=true;	
								$position=parseInt($contentTag.css("top").replace(regex,""),10); //Reset position;
								$index=((0-$position)/$itemLength[$this]); //Get $index for captionTag;
								$index=Math.abs($position/$itemLength[$this]); //Get $index for captionTag;
								if(_settings.seamlessMode){
									$index=$index-$itemTag.length;
									if(Math.abs($index)>$itemTag.length-1) $index=0;
								}
								else if($index<0) $index=0;
								$captionTag.html($itemTag.eq($index).find(_settings.textTag).html()).fadeIn(_settings.animateSpeed);		
							}).fadeIn(_settings.animateSpeed);			
						break;
					};
				}

				return false;
			});
			$captionTag.html($itemTag.eq(0).find(_settings.textTag).html()).fadeIn(_settings.animateSpeed);	
			if(_settings.seamlessMode){
					if((_settings.startFrom=="left")||(_settings.startFrom=="right")) $contentTag.css('left',0-$contentLength[$this]);
					if((_settings.startFrom=="top")||(_settings.startFrom=="bottom")) $contentTag.css('top',0-$contentLength[$this]);
			}
			else{
					if((_settings.startFrom=="left")||(_settings.startFrom=="right")) $contentTag.css('left',0);
					if((_settings.startFrom=="top")||(_settings.startFrom=="bottom")) $contentTag.css('top',0);
			}
			function move() {
				switch(_settings.startFrom){
					case 'right':
						$this.find('.next').click();
					break;
					case 'left':
						$this.find('.prev').click();
					break;
					case 'top':
						$this.find('.prev').click();
					break;
					case 'bottom':
						$this.find('.next').click();
					break;
				}
			}
			// open autoPlay
			if(_settings.autoPlay==true) $timer[$this]=setTimeout(move, _settings.timeSpeed);
			return false;
		}
	};
})(jQuery);