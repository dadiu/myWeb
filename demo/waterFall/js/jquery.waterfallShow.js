/******
author : 吴海晶(451404370@qq.com)
date : 2016-11-14




引用方法：
var waterfallShow_config = [
	{src : ""}
];

******/

(function($){

	$.fn.extend({
		waterfallShow : function(options){
			var opts = $.extend({}, defaults, options);
			var objs = {
				wParent : $('<div>').attr('id', 'fn_water'),
				wChild : $('<div>').addClass('fn_waterItem'),
				wChildImg : $('<div>').addClass('fn_waterImg'),
				wChildTxt : $('<div>').addClass('fn_waterTxt'),
				wChildTime : $('<div>').addClass('fn_waterTime')
			};


			$(this).append(objs.wParent);

			for(var i in opts){
				objs.wParent.append(atterDOM(opts[i], i));
			};

			eachDOM('.fn_waterItem');
			//objs.wParent.css({'height' : parseInt($('.fn_waterItem').eq($('.fn_waterItem').length).css()})

			function atterDOM(list, i){
				return '<div class="fn_waterItem" data-appid="' + i + '">'+
							'<div class="fn_waterItemBar">'+
								'<div class="fn_waterImg"><img src="' + list['src']  + '"/></div>'+
								'<div class="fn_waterTxt">' + list['txt'] + '</div>'+
								'<div class="fn_waterTime">' + list['time'] + '</div>'+
							'</div>'+
						'</div>';

			};

			function eachDOM(itemName){
				var num = 5,
					oLeft = 0,
					oTop = 0;

				$(itemName).each(function(k){
					if(k < num ){
						oLeft = k/num;
						oTop = 0;
					} else {
						oLeft = (k%num*(1/num)).toFixed(2);
						oTop = parseInt($('.fn_waterItem').eq(k-num).css('top')) + $('.fn_waterItem').eq(k-num).height()
					};
					
					$(this).css({
						"position" : "absolute",
						"left" : oLeft*100 + '%',
						"top" : oTop + 'px'
					});
					//console.log(oTop);
				});
			}

		}
	});

	var defaults = [
		{src: '1', data : '1xx', txt : '1xxx'},
		{src: '2', data : '2xx', txt : '2xxx'},
		{src: '3', data : '3xx', txt : '3xxx'},
		{src: '4', data : '4xx', txt : '4xxx'},
		{src: '5', data : '5xx', txt : '5xxx'},
		{src: '6', data : '6xx', txt : '6xxx'},
		{src: '7', data : '7xx', txt : '7xxx'},
		{src: '8', data : '8xx', txt : '8xxx'},
		{src: '9', data : '9xx', txt : '9xxx'}
	]

	//{src: 'http://whj.fayfox.com/img/loading.gif', data : 'xx', txt : 'xxx'}
})(window.jQuery);


