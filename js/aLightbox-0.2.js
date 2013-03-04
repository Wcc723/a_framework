;(function($){
	$.fn.aLightbox=function(settings){
		var _defaultSettings={
			bind:'click',
			width:'800px',
			height:'600px',
			frame:true,
			speedIn:'200',
			speedOut:'200',
			type:'image',
			cssDefault:true,
			background:'#000',
			backgroundOpacity:0.6,
			callback:function(){
				var lightbox_link=$(this).attr('href');	
				var lightbox_rel=$(this).attr('rel');
				if(lightbox_link==null) lightbox_link=$(this).attr('onclick');
				$.fn.aLightbox.s0();	
				$.fn.aLightbox.s1();	
				switch(_settings.type){
					case 'ajax':
						$('#lb_f2').html("<table class='lbt lb_shadow' style='margin:0 auto;position:relative;z-index:999'><tr><td><a href='#' class='close'>close</a><br /><div id='lb_f3' style='width:"+_settings.width+";height:"+_settings.height+";overflow-y:scroll;overflow-x;hidden' align='left'></div></td></tr></table>");
						$.ajax({
							url:lightbox_link,
							cache:false,
							dataType:'html',
							type:'GET',
							beforeSend:function(){$("#lb_loading").show();},
							error:function(xhr){alert('連線失敗');hide();},
							success:function(response){
								$.fn.aLightbox.s2();
								$('#lb_f3').html(response);
								$('#lb_f3').fadeIn();
							}
						});
					break;
					case 'frame':
						$('#lb_f2').html("<table class='lbt lb_shadow' style='margin:0 auto;position:relative;z-index:999'><tr><td><div style='width:100%;margin-bottom:3px;text-align:right'><a href='#' class='close'>close</a></div><div id='lb_f3' style='overflow-y:hidden;overflow-x;hidden' align='left'><iframe id='loadObject' src="+lightbox_link+" width="+_settings.width+" height="+_settings.height+" frameborder='no' border='0'></iframe></div></td></tr></table>");
						$("#loadObject").load(function(){$.fn.aLightbox.s2();});
						$.fn.aLightbox.s4();

					break;
					case 'load':
						if(_settings.frame==true){
							$('#lb_f2').html("<table class='lbt lb_shadow' style='margin:0 auto;position:relative;z-index:999;'><tr><td><div style='width:100%;margin-bottom:3px;text-align:right'><a href='#' class='close'>close</a></div><div id='lb_f3' align='left' style='width:"+_settings.width+";height:"+_settings.height+"'></div></td></tr></table>");
						}
						else{
							$('#lb_f2').html("<table style='margin:0 auto;position:relative;z-index:999;'><tr><td><div id='lb_f3' align='left' style='width:"+_settings.width+";height:"+_settings.height+"'></div></td></tr></table>");	
						}
						$("#lb_f3").load(lightbox_link,function(){$.fn.aLightbox.s2();});
						
					break;
					case 'html':
						if(_settings.frame==true){
						$('#lb_f2').html("<table class='lbt lb_shadow' style='margin:0 auto;position:relative;z-index:999;'><tr><td><div style='width:100%;margin-bottom:3px;text-align:right'><a href='#' class='close'>close</a></div><div id='lb_f3' align='left' style='width:"+_settings.width+";height:"+_settings.height+"'>"+$('#'+lightbox_link).html()+"</div></td></tr></table>");
						}
						else{
						$('#lb_f2').html("<table style='margin:0 auto;position:relative;z-index:999;'><tr><td><div id='lb_f3' align='left' style='width:"+_settings.width+";height:"+_settings.height+"'>"+$('#'+lightbox_link).html()+"</div></td></tr></table>");	
						}
						$.fn.aLightbox.s2();
					break;
					case 'image':
						$('#lb_f2').html("<table class='lbt lb_shadow' style='margin:0 auto;position:relative;z-index:999;'><tr><td><div style='width:100%;margin-bottom:3px;text-align:right;'><a href='#' class='close'>close</a></div><div id='lb_f3' align='left'><img src='"+lightbox_link+"' id='loadObject' /></div></td></tr></table>");
						$("#loadObject").load(function(){$.fn.aLightbox.s2();});
						var tempImg = new Image();          
						tempImg.src = $("#loadObject").attr('src');  
						if(tempImg.width>=$("body").width()) $('#lb_f2').find("table").width("90%");
						$("#loadObject").width("100%");
						$("#loadObject").height("auto");
						$(window).resize(function() {
							if(tempImg.width>=$("body").width()) $('#lb_f2').find("table").width("90%");
							else $('#lb_f2').find("table").width("auto");
						});
					break;
				}
				$.fn.aLightbox.s4();
				return false;
			}
		};
		$.fn.aLightbox.s4=function(){
			if(_settings.cssDefault){
				$(".lb_shadow").css({    
				'-moz-box-shadow':'4px 4px 12px -2px rgba(20%,20%,40%,0.5)',
				'-webkit-box-shadow':'4px 4px 12px -2px rgba(20%,20%,40%,0.5)',
				'box-shadow':'4px 4px 12px -2px rgba(20%,20%,40%,0.5)'});
				$("table.lbt").css({  
				'background':'#fcfcfc',
				'font-family':'Verdana',
				'border':'1px solid #EFEFEF',
				'border-radius':'5px',
				'-moz-border-radius':'5px',
				'-webkit-border-radius':'5px'	
				});
				$("td.lbt").css({ 
				'border-left':'1px solid #EFEFEF',
				'height':'20px',
				'border-bottom':'1px solid #EFEFEF'
				});		
				$("#lb_loading").css({ 	
				'text-align':'center'
				});	
				$("#lb_f1,  #lb_f3").css({ 	
				'overflow-y':'hidden',
				'overflow-x':'hidden'
				});	
				$("#lb_f2 a.close").css({ 	
				'width':'16px',
				'height':'16px',
				'display':'inline-block',			
				'background':'url(images/aImage_btn_close.png)',
				'background-position':'center 0px',
				'background-repeat':'no-repeat',
				'text-indent':'9999px'
				});
				$("#lb_f2 a.close").hover(function(){
					$(this).css({ 	
					'background-position':'center -16px'
					});						  
				},function(){
					$(this).css({ 	
					'background-position':'center 0px'
					});	
				});
				$(".lb_top").css({ 	
				'position':'fixed',
				'bottom':'auto',
				'top':'0px'
				});
			}
		};
		$.fn.aLightbox.s3=function(){
			$('#lb_black').fadeOut(_settings.speedOut);
			$('#lb_f1').fadeOut(_settings.speedOut);
			$("#lb_loading").fadeOut(0);
			return false;
		};
		$.fn.aLightbox.s2=function(){
			$("#lb_loading").hide();
			if($('#lb_black').css("display")=='block') $('#lb_f1').fadeIn(_settings.speedIn);
			$('html').trigger('lb_s2');
			return false;
		};
		$.fn.aLightbox.s1=function(){
			$('#lb_black').css("opacity",_settings.backgroundOpacity).css("background",_settings.background);
			$('#lb_black').fadeIn(_settings.speedIn);
			$("#lb_loading").fadeIn(0);
			$('#lb_f2').html("<table class='lbt lb_shadow' style='margin:0 auto;position:relative;z-index:999'><tr><td><div style='width:100%;margin-bottom:3px;text-align:right'><a href='#' class='close'>close</a></div><div id='lb_f3' align='left' style='overflow-y:scroll;overflow-x;hidden;width:"+_settings.width+";height:"+_settings.height+"'></div></td></tr></table>");
			$('html').trigger('lb_s1');
			return false;
		};
		$.fn.aLightbox.s0=function(){
			if($("#lb_black").length<=0)$('body').prepend("<div id='lb_black' class='lb_top close' style='width:100%;height:100%;display:none;z-index:996;'></div>");
			if($("#lb_f1").length<=0)$('body').prepend("<div id='lb_f1' class='lb_top' style='width:100%;height:100%;display:none;z-index:997'><div style='width:100%;height:100%;position:absolute;z-index:998' class='close'></div><table width=100% height=100%><tr><td valing='middle'><div id='lb_f2'></div></td></tr></table></div>");
			if($("#lb_loading").length<=0)$('body').prepend("<div id='lb_loading' class='lb_top' style='width:100%;height:100%;display:none;z-index:999'><table width='100%' height='100%'><tr><td valing='middle'><img src='images/32/loading.gif' title='Loading'></td></tr></table></div>");
		};
		var _settings=$.extend(_defaultSettings,settings);
		return this.each(function(){
			if(_settings.cssDefault){
				$("html").css({ 			
				'height':'100%',
				'margin':'0 auto',
				'overflow-y':'scroll',
				'overflow-x':'hidden'
				});				
				$("body").css({ 	
				'height':'100%',
				'margin':'0 auto'
				});	
				$("* html,* html body").css({ 	
				'background-image':'url(about:blank)',
				'background-attachment':'fixed'
				});
				$("* html .lb_top").css({ 	
				'position':' absolute', // position fixed for IE6
				'top':'expression(documentElement.scrollTop+(documentElement.clientHeight-this.clientHeight)/2)',
				'margin-top':'0'
				});
			}				  
			$(this).on(_settings.bind,_settings.callback);
		});
	};
	$(document).keyup(function(event){
		if((event.keyCode==27)&&($('#lb_black').css("display")=='block')){
			$.fn.aLightbox.s3();
			$('html').trigger('lb_s3');
		}
	});
		$(document).on("hover",'.close',function(){   
			$(this).css('cursor','pointer');
		}); 
		$(document).on("click",'.close',function(){   
			$.fn.aLightbox.s3();
			$('html').trigger('lb_s3');
			return false;
		});  
})(jQuery);
