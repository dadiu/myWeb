/******
维护：吴海晶(451404370@qq.com)

Parameters
'logo' : '',			//标志
'href' : '',			//logo的连接
'status' : 'show'		//是否展开 默认：展开
'target' : '',			//规定在何处打开链接文档 默认：当前页打开
'id' : '',				//设置id 可选
'className' :'',		//设置class 可选
'nav' : '',				//主菜单内容 数组 例如:[{"name":"","href":""},{"name":"","href":""}]
'dd' : '',				//子菜单内容 json对象 例如:{"菜单类型1":{"菜单1-1名字":"菜单连接地址","菜单1-2名字":"菜单连接地址"},"菜单类型2":{"菜单2-1名字":"菜单连接地址","菜单2-2名字":"菜单连接地址"}}
'ddType' : '1'			//子菜单内容分类 默认1  1 = 含有dt菜单类型  0 = 不含有dt菜单类型
'width' : 100%,			//宽度	默认：100%
'height' : auto,		//高度	默认：auto
'p' : '',				//传参 可选 默认：null
'callback' : null		//方法 可选	默认: null


引用方法：
var navmore = [
    {
        "name" : "work",
        "china" : "项目们",
        "href" : "work.html"
    }
];
$('nav').downMenu({
    'nav' : navmore,
    'target' : 'g_con',
    'dd' : {
        "css规范" : {
            "分类方法" : "con_specification/specification_css.html#css_sp_1",
            "命名规范" : "con_specification/specification_css.html#css_sp_2",
            "代码格式" : "con_specification/specification_css.html#css_sp_3",
            "优化方案" : "con_specification/specification_css.html#css_sp_4"
        },
        "html规范" : {
            "整体结构" : "con_specification/specification_html.html#html_sp_1",
            "代码格式" : "con_specification/specification_html.html#html_sp_2",
            "HTML4常用的标签" : "con_specification/specification_html.html#html_sp_3",
            "HTML5常用的标签" : "con_specification/specification_html.html#html_sp_4"
        }
    }
});
******/

(function($){

	$.fn.downMenu = function(options){

		var defaults = {
			'logo' : '<i class=\"iconfont\">&#xe60b;</i>个吴海晶',		
			'href' : 'index.html',
			'status' : 'show',		//是否展开 默认：展开  show/hide
			'target' : '_self',		//规定在何处打开链接文档
			'id' : '',				//设置id 可选
			'className' :'',		//设置class 可选
			'nav' : [],
			'dd' : '',
			'ddType' : '1',
			'width' : '100%',		//宽度	默认：100%
			'height' : 'auto',		//高度	默认：auto
			'p' : '',				//传参 可选
			'callback' : null		//方法 可选
		},

		options = $.extend(defaults, options),

		objs = {
			navParent : $('<div>').addClass('nav'),
			navChild : $('<div>').addClass('menu'),
			wrapChild : $('<div>').addClass('wrap'),
			dl : $('<dl>'),
			btn : $('<b>').addClass('iconfont')
		};

		dfunc.set = this;
		dfunc.init(options, objs);

		if(options.callback){
			options.callback(options.p);
		};
	};

	var dfunc = {

		set : '',

		urlObj : {},

		init : function(options, objs){

			var _t = this,
				DOMP = '<div class="wrap"><ul class="cb">', 
				DOMC = '', dd = '', i = 0, len = options.nav.length;
			
			/**** 主菜单 ***/
			if(options.nav.length > 0){
				for(; i < len; i++){
					DOMP += '<li data-nav="' + options.nav[i].name+ '">' + 
						'<a href="'+ options.nav[i].href + '?nav=' + options.nav[i].name + '">' + 
						options.nav[i].china + '</a></li>';
				}

				DOMP += '</ul>' + 
						'<a class="nav_cp" href="' + options.href + '">'+
						'<span>' + options.logo + '</span>'+
						//'<i class="fa fa-user"></i>'+
						'</a></div>';

				objs.navParent.append(DOMP);

				/*** 插入html ***/
				$(dfunc.set).append(objs.navParent);

				//事件
				_t.evenP(options, objs);
			}
			

			/**** 子菜单 ***/
			if(typeof options.dd == 'object'){

				if(options.ddType == '1'){	//含有dt

					$.each(options.dd, function(i,key){

						DOMC += '<dt>' + i + '</dt>';
						dd = '';

						$.each(key, function(name,href){

							href.length == "0" ? href = "javascript:;" : href = href;
							dd += '<a href="' + href + '" target="' + options.target + '">' + name + '</a>';
						})

						DOMC += '<dd>' + dd + '</dd>';
					});

				} else if(options.ddType == '0') {	//不含有dt

					
					$.each(options.dd, function(name,href){

						href.length == "0" ? href = "javascript:;" : href = href;
						dd += '<a href="' + href + '" target="' + options.target + '">' + name + '</a>';
					})

					DOMC += '<dd>' + dd + '</dd>';
					objs.dl.addClass('pl10')
				}

				objs.dl.append(DOMC);
				objs.wrapChild.append(objs.dl);
				objs.wrapChild.append(objs.btn);
				objs.navChild.append(objs.wrapChild);

				//判断是否展开
				if(options.status == 'hide'){
					objs.btn.addClass('fa-angle-down').html("&#xe606;");
					objs.dl.hide();
				} else {
					objs.btn.addClass('fa-angle-up').html("&#xe603;");
					objs.dl.show();
				};

				//判断是否有id
				if(options.id){
					$(dfunc.set).attr('id',options.id);
				};

				//判断是否有class
				if(options.className){
					$(dfunc.set).addClass(options.className);
				};

				/*** 插入html ***/
				$(dfunc.set).append(objs.navChild);

				//默认选中状态
				objs.navChild.find('a:eq(0)').addClass('crt');

				//事件
				_t.evenC(options, objs);
			}

		},

		//主菜单 当前状态
		evenP : function(options, objs){

			var _t = this;
			
			_t.urlFun();

			if(_t.urlObj.nav){
				$('.nav li[data-nav="' + _t.urlObj.nav + '"]').addClass('crt').siblings().removeClass('crt');
			} else {
				$('.nav li[data-nav="home"]').addClass('crt').siblings().removeClass('crt');
			}

			$(dfunc.set).on('click', '.nav', function(){
				if($(window).width() < 480){
					$('.nav ul').slideToggle();
				} else {
					$('.nav ul').show();
				}
				
			})

			$(window).on('resize', function(){
				if($(window).width()<480){
					$('.nav ul').hide();
				} else {
					$('.nav ul').show();
				}
			})

		},

		//子菜单 当前状态
		evenC : function(options, objs){

			objs.navChild.delegate('a', 'click', function(){
				$(dfunc.set).find('a').removeClass('crt');
				$(this).addClass('crt');
			});

			//子菜单 打开关闭
			objs.navChild.delegate('.fa-angle-down', 'click', function(){
				objs.btn.addClass('fa-angle-up').removeClass('fa-angle-down').html("&#xe603;");
				objs.dl.slideDown();
			});
			objs.navChild.delegate('.fa-angle-up', 'click', function(){
				objs.btn.addClass('fa-angle-down').removeClass('fa-angle-up').html("&#xe606;");
				objs.dl.slideUp();
			});

		},

		urlFun : function(){
			var _t = this,
				href = window.location.search;

			if(href.indexOf('?') != -1){
				var hrefArr = href.substr(1).split('&'),
					hrefLen = hrefArr.length;
				for(var i = 0; i < hrefLen; i++ ){
					_t.urlObj[hrefArr[i].split('=')[0]] = hrefArr[i].split('=')[1];

				}
			}

			return false;
		}
	};



})(jQuery);