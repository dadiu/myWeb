/****

var CW = 1200,
    CH = 500,
    DR = 5,
    DX = 250,
    DY = 100;

****/
(function(){

	var draw = {

		init : function(){

			var _t = this,
				canvas = document.getElementById("fn_countDown");

		    if(canvas.getContext("2d")){
			    canvas.width = CW;
			    canvas.height = CH;
		        var content = canvas.getContext("2d");

		        _t.getTimes();

		        setInterval(function(){
		        	//绘制画面
		        	_t.render(_t.crtTime,content);
		        	_t.getTimes();

		        },50);

		        
		    } else {
		        //当前浏览器不支持canvas,请更换浏览器试试
		    };
		},

		crtTime : false,

		//获取时间
		getTimes : function(){

			var _t = this,
				nowDate = new Date(),
				myh = nowDate.getHours(),
				mym = nowDate.getMinutes(),
				mys = nowDate.getSeconds(),
				maxW = digit[0].length, minW=digit[10].length;

			if(_t.crtTime[2] !== mys){
				
				//console.log(_t.crtTime)
				
				if(_t.crtTime){
					//小时十位
					if(parseInt(myh/10) != parseInt(_t.crtTime[0]/10)){
						ball.addBall(DX, DY, parseInt(myh/10));
					};
					//小时个位
					if(parseInt(myh%10) != parseInt(_t.crtTime[0]%10)){
						ball.addBall(DX+maxW*2*DR, DY, parseInt(myh%10));
					};
					//分钟十位
					if(parseInt(mym/10) != parseInt(_t.crtTime[1]/10)){
						ball.addBall(DX+(maxW*4+minW)*DR, DY, parseInt(mym/10));
					};
					//分钟个位
					if(parseInt(mym%10) != parseInt(_t.crtTime[1]%10)){
						ball.addBall(DX+(maxW*6+minW)*DR, DY, parseInt(mym%10));
					};
					//秒钟十位
					if(parseInt(mys/10) != parseInt(_t.crtTime[2]/10)){
						ball.addBall(DX+(maxW*8+minW*2)*DR, DY, parseInt(mys/10));
					};
					//秒钟个位
					if(parseInt(mys%10) != parseInt(_t.crtTime[2]%10)){
						ball.addBall(DX+(maxW*10+minW*2)*DR, DY, parseInt(mys%10));
					};
				}

				_t.crtTime = [myh,mym,mys];
			};
			

		},

		//输出图像
		render : function(nowDate,cxt){

			cxt.clearRect(0,0,CW,CH);

			var _t = this;
			var maxW = digit[0].length, minW=digit[10].length;

			//小时
			_t.renderDigit(DX, DY, parseInt(nowDate[0]/10), cxt);
			_t.renderDigit(DX+maxW*2*DR, DY, parseInt(nowDate[0]%10), cxt);
			_t.renderDigit(DX+maxW*4*DR, DY, 10, cxt);

			//分钟
			_t.renderDigit(DX+(maxW*4+minW)*DR, DY, parseInt(nowDate[1]/10), cxt);
			_t.renderDigit(DX+(maxW*6+minW)*DR, DY, parseInt(nowDate[1]%10), cxt);
			_t.renderDigit(DX+(maxW*8+minW)*DR, DY, 10, cxt);

			//秒钟
			_t.renderDigit(DX+(maxW*8+minW*2)*DR, DY, parseInt(nowDate[2]/10), cxt);
			_t.renderDigit(DX+(maxW*10+minW*2)*DR, DY, parseInt(nowDate[2]%10), cxt);

			//小球
			ball.digitBall(ball.balls, cxt);
			ball.upDateBall(ball.balls);

		},

		//图像方法
		renderDigit : function(x,y,num,cxt){

			var i = 0, iLen = digit[num].length,j=0,jLen=0,ax=0,ay=0;
			for(; i < iLen; i++){
				j = 0, jLen = digit[num][i].length;

				for(; j < jLen; j++){

					if(digit[num][i][j]==1){
						cxt.beginPath();

						ax = x+j*2*(DR+1)+(DR+1);
						ay = y+i*2*(DR+1)+(DR+1);

						cxt.arc(ax,ay,DR,0,2*Math.PI);
						cxt.fillStyle="#33bee5";
						cxt.fill();
					}
					
				}
			}
		}

	},

	ball = {

		balls : [],
		colorArr : ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"],
		//["#ccffff","#ffcccc","#ccccff","#ff6666","#ccff99","#99cccc","#ffcc99","#ff9966","#ccffcc","#99cc99"],

		//绘制小球
		digitBall : function(b,cxt){
			var _t = this,
				i = 0, iLen = b.length; 

			//cxt.clearRect(0,0,cxt.canvas.width,cxt.canvas.height);
			for(; i < iLen; i++){
				
				cxt.beginPath();
				cxt.fillStyle = b[i]["c"];
				cxt.arc(b[i]["x"],b[i]["y"],DR,0,2*Math.PI);
				cxt.fill();
				
			};
		},

		upDateBall : function(b){
			var i = 0, iLen = b.length;
			for(; i < iLen; i++){
				b[i]["x"] += b[i]["vx"];
	            b[i]["y"] += b[i]["vy"];
	            b[i]["vy"] += b[i]["g"];

	            //调到底部的小球弹回
	            if(b[i]["y"] >= CH - DR){
	                b[i]["y"] = CH - DR;
	                b[i]["vy"] = - b[i]["vy"]*0.71;
	            };

	            //超出界面的小球移除
	            if(b[i]["x"]>CW-DR || b[i]["x"]<DR){
	            	//console.log(i);
	            	//console.log(b[i])
	            	b.splice(i,1);
	            	iLen = b.length;
	            }
			};
        },

		//生成小球
		addBall : function(x,y,num){
			var _t = this, i = 0, iLen = digit[num].length,j=0,jLen=0,aball="",cLen=_t.colorArr.length;

			for(; i < iLen; i++){
				j = 0, jLen = digit[num][i].length;

				for(; j < jLen; j++){

					if(digit[num][i][j]==1){
						aball = {
							"x" : x+j*2*(DR+1)+(DR+1),
							"y" : y+i*2*(DR+1)+(DR+1),
							"g" : 1.5 + Math.random(),
							"vx" : Math.pow(-1, Math.ceil(Math.random()*10))*4,
							"vy" : -5,
							"c" : _t.colorArr[Math.floor(Math.random()*cLen)]
						};

						_t.balls.push(aball);
						
					}
					
				}
			}
		}

	}

	draw.init();
}());
