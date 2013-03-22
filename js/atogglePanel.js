;(function($){
	document.ondragstart = function () { return false; }; 
	$.fn.a_togglePanel=function(settings){
		var _defaultSettings={
		animateMode: 'slider', 
		downSpeed: 200,
		title:'.title',
		content:'.article',
		single: true 
		};		
		var _settings=$.extend(_defaultSettings,settings);
		return this.each(function(){
			a_togglePanel($(this),_settings);
		});
		function a_togglePanel($this,_a){
			var $block = $this,					
			_isComplete = true;			
			_isComplete[$this] = true; 
			
			$this.find(_a.title).click(function(){
			if (_isComplete[$this] == false)	 return false;		
			_isComplete[$this] = false; 
			if($(this).parent().find(_a.content).css('display') =='none'){
				if (_a.single == true) {
						$block.find('.selected').removeClass('selected').slideUp(_a.downSpeed);
					}				
				$(this).parent().find(_a.content).slideDown(_a.downSpeed,function(){
					$(this).parent().find(_a.content).addClass('selected')
					_isComplete[$this] = true; 
					});
				}else {
					$(this).parent().find(_a.content).removeClass('selected').slideUp(_a.downSpeed,function(){
						_isComplete[$this] = true; 
						});
					};
					
				});	
							
		}
	};
})(jQuery);