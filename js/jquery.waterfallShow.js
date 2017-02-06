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

            function isPhone(){
                return /iphone|ipad|Android/i.test(navigator.userAgent);
            };
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
				var num = isPhone() === true ? 2 : 5,
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
                        "left" : oLeft*100 + '%',
                        "top" : oTop + 'px'
                    });

					//console.log(oTop);
				});
			};


            $(this).append(objs.wParent);

            for(var i in opts.list){
                objs.wParent.append(atterDOM(opts.list[i], i));
            };

            setTimeout(function () {
                eachDOM('.fn_waterItem');
            },opts.wait);

            $(window).resize(function(){
                eachDOM('.fn_waterItem');
            });

		}
	});

	var defaults = {
		"wait" : 500,
		"list" : [
			{src: '1', data : '1xx', txt : '1xxx'}
		]
	};

	//{src: 'http://whj.fayfox.com/img/loading.gif', data : 'xx', txt : 'xxx'}
})(window.jQuery);


