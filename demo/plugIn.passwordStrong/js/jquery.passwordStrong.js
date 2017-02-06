/******
维护：吴海晶(451404370@qq.com)

Parameters

"inpId" : //输入框的id，可不填
"type" : //类型，是否出现 点击可出现密码，默认true，不要则填false
"eyesClass" : //眼睛class 点击查看密码
"weak" : //弱密码
"color" : //颜色 ['默认颜色','强度颜色']
"tips" : //提示语 {"0":"友情提示","1":"长度错误时提示语","2":"密码为弱密码时提示语","success":"密码可用时候的提示语"}

******/

(function($){

	$.fn.passwordStrong = function(options){

		var defaults = {
			"inpId" : null,
			"type" : true,
			"eyesClass" : null,
			"color" :{"tips":["#ccc","red"]},
			"weak" : ["asdfgh","qwerty","zxcvbn","Password","Passwd","Woaini","Iloveyou","Woaiwojia","521521","5201314","7758521","1314520","1314521","520520","201314","211314","7758258","147258369","159357","123456","1234567","12345678","123456789","654321","123123","123321","123abc"],
			"tips" : {"0":"友情提示,比如只允许输入字母","1":"长度不对","2":"弱密码，请修改","success":"可用"}
		},

		options = $.extend(defaults, options),

		objs = {
			"inp" : $("<input>").attr({"type":"password"}).addClass("fn_lvVal"),
			"lvValBar" : $("<div>").addClass("m_lvValBar"),
			"inpHide" : $("<input>").attr("type","text").addClass("fn_lvValHide"),
			"eyesIcon" : $("<i>").addClass("fn_eyes"),
			"tips" : $("<span>").html(options["tips"]["0"]).css({ "color" : options["color"]["tips"][0]}),
			"lvBar" : $("<div>").addClass("fn_lvBar"),
			"lvLine" : $("<div>").addClass("fn_lvLine")
		},

		domName = this,

		dfunc = {

			V : function(options,objs){
				objs["lvBar"].append("<ul><li>弱</li><li>中</li><li>强</li></ul>");
				objs["lvBar"].append(objs["lvLine"]);

				//如果存在id
				if(options["inpId"] !== null){
					objs["inp"].attr("id",options["inpId"]);
				};

				//如果需要点击密码可见
				if(options["type"] == true){

					if(options["eyesClass"] !== null){
						objs["eyesIcon"].addClass(options["eyesClass"]);
					};

					objs["tips"].css({"line-height":"28px"})

					
					objs["lvValBar"].append(objs["inpHide"]);
					objs["lvValBar"].append(objs["eyesIcon"]);
					objs["lvValBar"].addClass("m_eyesBar");
				
				}

				objs["inp"].attr("data-boo","0");	//默认该密码不可用
				objs["lvValBar"].append(objs["inp"]);
				$(domName).append(objs["lvValBar"]);
				$(domName).append(objs["lvBar"]);
				$(domName).append(objs["tips"]);
			},

			C : {

				init : function(options,objs){
					dfunc.V(options,objs);

					var _t = this;

					$(objs["inp"]).keyup(function(){

						var num = $(this).val();

						if(_t.ver(num,objs) !== false){		//验证长度大于6 且 不是弱密码
							_t.countScroe(num, objs);	//计算分数
							objs["tips"].html(options["tips"]["success"]).css({
								"color" : options["color"]["tips"][0]
							});
							objs["inp"].attr("data-boo","1");	//该密码可用
						} else {
							objs["inp"].attr("data-boo","0");
						}
						
					});

					if(options["type"] == true){
						$(objs["eyesIcon"]).mousedown(function(){
							$(this).addClass("fn_eyesHover");
							$(objs["inp"]).hide();
							$(objs["inpHide"]).val($(objs["inp"]).val()).show();
						}).mouseup(function(){
							$(this).removeClass("fn_eyesHover");
							$(objs["inpHide"]).hide();
							$(objs["inp"]).show();
						})
					}

				},

				//验证
				ver : function(num,objs){
					var _t = this,
						vLen = num.length,
						weakList = options["weak"].length,
						i = 0;

					//1. 如果长度小于6
					if(vLen == 0){ _t.countResult(0,objs) };	//计算分数
					if(vLen < 6){
						objs["tips"].html(options["tips"]["1"]).css({
							"color" : options["color"]["tips"][1]
						});
						//console.log(vLen)
						return false;
					};

					//2. 如果是弱密码
					for(; i < weakList; i++){
						if(num == options["weak"][i]){
							objs["tips"].html(options["tips"]["2"]).css({
								"color" : options["color"]["tips"][1]
							});

							return false;
						};
					};
				},

				//计算分数
				countScroe : function(num,objs){
					var _t = this, 
						score = 0, 
						vLen = num.length,
						rLit = /[a-z]/, rCap = /[A-Z]/, LitBoo = rLit.test(num), rCapBoo = rCap.test(num),
						rNumLen = num.replace(/\D/g,"").length,
						rSignLen = num.replace(/[a-zA-Z0-9]/g,"").length,
						bStr = bAbc = bSign = false;

					//1.判断长度
					if(vLen < 6){
						score += 0;
					} else if(vLen >=6 && vLen <= 10){
						score += 10;
					} else if(vLen > 10){
						score += 25;
					};

					//2.判断字母大小写
					if(LitBoo == false && rCapBoo == false){
						score += 0;
					} else if(LitBoo == true && rCapBoo == true){
						score += 25;
					} else {
						score += 10;
					};
					
					//3.判断数字个数
					if(rNumLen > 0 && rNumLen <=2 ){
						score  += 10;
					} else if(rNumLen > 2){
						score  += 20;
					}

					//4. 检查非单词字符（即特殊字符）
					if(rSignLen == 1 ){
						score  += 10;
					} else if(rSignLen > 1){
						score  += 25;
					}

					//5. 额外奖励
					if(rNumLen > 0) { bStr = true };
					if(LitBoo == true || rCapBoo == true) { bAbc = true };
					if(rSignLen >0 ) { bSign = true };

					if(bStr && bSign && bAbc){
						score += 5;
					} else if(!bAbc && bStr && bSign){
						score += 3;
					} else if(bAbc && !bStr && bSign){
						score += 3;
					} else if(bAbc && bStr && !bSign){
						score += 2;
					};

					//计算密码强度
					_t.countResult(_t.countLevel(score), objs);
				},

				//计算密码等级
				countLevel : function(score){
					var LV = 0;
					if(score >= 90){
						LV = 8;
					} else if(score >= 80 && score < 90){
						LV = 7;
					} else if(score >= 70 && score < 80){
						LV = 6;
					} else if(score >= 60 && score < 70){
						LV = 5;
					} else if(score >= 30 && score < 60){
						LV = 4;
					} else if(score >= 25 && score < 30){
						LV = 3;
					} else if(score > 0){
						LV = 2;
					} else if(score = 0){
						LV = 1;
					}

					return LV;
				},

				//计算密码强度
				countResult : function(LV, objs){

					if(LV >= 5) {
						$(objs["lvLine"]).animate({"width":210});
					} else if( LV ==4 ){
						$(objs["lvLine"]).animate({"width":139});
					} else if( LV > 1 && LV < 4 ) {
						$(objs["lvLine"]).animate({"width":70});
					} else {
						$(objs["lvLine"]).animate({"width":0});
					}
				}
			}
			
		};

		dfunc.C.init(options,objs);
	};

})(jQuery);