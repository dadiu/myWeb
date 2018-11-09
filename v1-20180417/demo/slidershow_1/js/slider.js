slider('#slidershow');

function slider(x){
	var $menu = $(x).find('.ss_menu'),
		$crt = $(x).find('.crt'),
		menu_num = $menu.length,
		menu_width = $menu.width();
		crt_width = $(window).width() - (menu_num-1)*menu_width;

	//初始化
	$crt.css({'width': crt_width});

	//点击打开
	$menu.click(function(){
		var index = $(this).attr('data-num') - 1;
		$(x).find('li:eq(' + index + ')').animate({
			'width' : crt_width
		}).siblings().animate({
			'width' : menu_width
		})
	})
}