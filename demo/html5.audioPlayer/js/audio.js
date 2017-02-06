(function(){

	/* 全局变量 */
	var myAudio = $('#myAudio audio')[0],
		$volume_bar = $('.volume_control .progress_bar'),
		$slider = $('.volume_control .slider'),
		$progress_bar = $('.time_line .progress_bar'),
		$passed_time = $('.time_line .passed_time'),
		$sourceList = $('#myAudio source'),
		currentSrcIndex = 0,
		currentSrc = '';


	/*****
	音量调控方式
	*****/	
	myAudio.changeVolumeTo = function(volume){
		$volume_bar.css({'width' : volume*100 + '%'});
		$slider.css({'left': volume*100 - 7 + 'px'});
	}

	/*****
	歌曲播放时间的格式化，将秒数格式化为“分：秒”的形式
	*****/
	function formatTime(time){
		var minutes = parseInt(time/60),
			seconds = parseInt(time%60);

		seconds < 10 && (seconds = '0' + seconds);

		return minutes + ':' + seconds;
	}

	/*****
	播放器监听事件
	暂停、播放、下一首、上一首
	*****/
	//play
	$('.btn_play').click(function(){
		if(myAudio.paused) {
			myAudio.play();
		} else {
			myAudio.pause();
		}
	})

	//next
	$('.btn_next').click(function(){

		++currentSrcIndex > $sourceList.length - 1 && (currentSrcIndex = 0);
		currentSrc = $('#myAudio source').eq(currentSrcIndex).prop('src');
			//porp 获取在匹配的元素集中的第一个元素的属性值。
		myAudio.src = currentSrc ;
		myAudio.play();
	});

	//prev 
	$('.btn_previous').click(function(){
		--currentSrcIndex < 0 && (currentSrcIndex = 0);
		currentSrc = $('#myAudio source').eq(currentSrcIndex).prop('src');
		myAudio.src = currentSrc;
		myAudio.play();
	});

	/*****
	音量调控功能实现
	*****/
	$('.volume_control .decrease').click(function(){
		var volume = myAudio.volume - 0.1;
		volume < 0 && (volume = 0);
		myAudio.changeVolumeTo(volume);	
	});

	$('.volume_control .increase').click(function(){
		var volume = myAudio.volume + 0.1;
		volume > 1 && (volume = 1);
		myAudio.changeVolumeTo(volume);
	});

	$('.volume_control .base_bar').mousedown(function(ev){
		var posX = ev.clientX,
			targetLeft = $(this).offset().left,
			volume = (posX - targetLeft)/100;

		volume > 1 && (volume = 1);
		volume < 1 && (volume = 0);

		myAudio.changeVolumeTo(volume);

		// console.log('posX = ' + posX);
		// console.log('targetLeft = ' + targetLeft);

	});

	$('.volume_control .slider').mousedown(starDrag = function(ev){
		ev.preventDefault(); 	/* 取消默认事件 */
		var origLeft = $(this).position().left,		/* 滑块的初始位置 */
			origX = ev.clientX,		/* 鼠标的初始位置 */
			target = this;

		$(document).mousemove(doDrag = function(ev){
			ev.preventDefault();
			var moveX = ev.clientX - origX,		/* 计算鼠标移动的距离 */
				curLeft = origLeft + moveX;		/* 用鼠标移动的距离表示滑块移动的移动距离*/

			curLeft < -7 && (curLeft = -7);
			curLeft > 93 && (curLeft = 93);

			myAudio.changeVolumeTo(curLeft);

		})

		$(document).mouseup(stopDrag = function(){
			$(document).unbind('mousemove', doDrag);
			$(document).unbind('mouseup', stopDrag);
		})
	})

	/*****
	音频进度条调控功能实现
	*****/
	$('.time_line .base_bar').mousedown(function(ev){
		var posX = ev.clientX,
			targetLeft = $(this).offset().left,
			percentage = (posX - targetLeft)/140 * 100;

		myAudio.currentTime = myAudio.duration * percentage / 100;
	});

	$('.music_info .cd').click(function(){
		$('.music_list').slideToggle(600);
	});

	$('.music_list').click(function(ev){
		var index = $(ev.target).index();
		currentSrcIndex = index;
		currentSrc = $('#myAudio source').eq(currentSrcIndex).prop('src');
		myAudio.src = currentSrc;
		myAudio.play();
	})

	/*****
	audio元素事件绑定
	*****/
	$(myAudio).bind('loadedmetadata', function(){
		//当指定的音频/视频的元数据已加载时，会发生 loadedmetadata 事件。

		var totalTime = formatTime(myAudio.duration),
			title = $('#myAudio source').eq(currentSrcIndex).attr('title');

		$('time_line .total_time').text(totalTime);
		$('.meta_data .title').text(title);
	})

	$(myAudio).bind('timeupdata', function(){
		var duration = this.duration,
			curTime = this.currentTime,
			percentage = curTime/duration * 100;

		$progress_bar.css({'width':percentage + '%'});

		var passedTime = formatTime(curTime);
		$passed_time.text(passedTime);
	})

	$(myAudio).bind('play', function(){
		$('.btn_play').text('h');
		$('.music_list li').eq(currentSrcIndex).addClass('active').siblings().removeClass('active');
		$('.music_info .cd').addClass('rotate');
		$('.cd_holder .stick').addClass('play');
	})

	$(myAudio).bind('pause', function(){
		$('btn_play').text('c');
		$('.music_info .cd').removeClass('rotate');
		$('.cd_holder .stick').removeClass('play');
	})

	$(myAudio).bind('ended', function(){
		$('.btn_next').triggerHandler('click');
		/******
		triggerHandler
		这个特别的方法将会触发指定的事件类型上所有绑定的处理函数。但不会执行浏览器默认动作，也不会产生事件冒泡。

		这个方法的行为表现与trigger类似，但有以下三个主要区别：

		* 第一，他不会触发浏览器默认事件。

		* 第二，只触发jQuery对象集合中第一个元素的事件处理函数。

		* 第三，这个方法的返回的是事件处理函数的返回值，而不是据有可链性的jQuery对象。此外，如果最开始的jQuery对象集合为空，则这个方法返回 undefined 。

		******/
	})

	$(myAudio).bind('progress', function(){
		if(myAudio.buffered.length == 1){

			if(myAudio.buffered.start(0) == 0){

				var buffered = myAudio.buffered.end(0),
					percentage = buffered/myAudio.duration * 100;

				$('.time_line .base_bar').css('background-size', percentage + '% 100%');
			}
		}

		/*****
		buffered 属性返回 TimeRanges 对象。

		TimeRanges 对象表示音频的缓冲区间。

		缓冲范围指的是已缓冲音视频的时间范围。如果用户在音视频中跳跃播放，会得到多个缓冲范围。

		

		TimeRanges 对象

	 	表示音视频的已缓冲部分，TimeRanges 对象属性:

	    length - 获得音视频中已缓冲范围的数量
	    start(index) - 获得某个已缓冲范围的开始位置
	    end(index) - 获得某个已缓冲范围的结束位置

		注意：首个缓冲范围的下标是 0。

		*****/
	})

	$(myAudio).trigger('loadedmetadata');
	
	/*****
	trigger 
	在每一个匹配的元素上触发某类事件。
	*****/

}())