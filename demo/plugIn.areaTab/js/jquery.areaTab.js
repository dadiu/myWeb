/**
 * @url
 * @data    2015.04.30
 * @author  wuhaijing
 * @mail    1004609378@qq.com
 * @version V1.1.1 - 优化搜索条件
 */
/********************* 传参说明 *********************/
/**
 * 以下均为必填参数
 * txt : string       	//提示文字
 * list : object    	//数据表，默认空
 *
 * 以下均为可选参数
 * maxNum : number      //每间隔最大，默认10
 * searchImg : string   //搜索按钮图片
 *
 * 以下为必填list结构说明
 * {areaKey1:{areaId:"",name:"",status:""},areaKey2:{areaId:"",name:"",status:""}};
 * name = '1-9 + " " + string' or '0 + " " + string' or 'string'
 * '1-9 + " " + string' = 正式大区 如 "1 火烧赤壁1区"
 * '0 + " " + string' = 删档测试区 如 "0 删档测试服"
 * 'string' = 技术封测服 如 "技术封测区"
 */
/******************** 开始 ********************/

(function($){
	$.fn.tabs = function(options){
		var defaults = {
				txt : "提示文字",	//提示文字
				list : "",	//数据表，默认空
				maxNum : 10, 	//每间隔最大，默认10
				searchImg : "http://whj.fayfox.com/img/ic_search.png"
			},

			options = $.extend(defaults,options),

			objs = {
				selA : $("<div>").addClass("u_sel_a"),
				selATxt : $("<label>").addClass("u_sel_aTxt").html(options["txt"]),
				selB : $("<div>").addClass("u_sel_b"),
				selBTab : $("<div>").addClass("u_sel_bTab"),
				selBMenu : $("<ul>").addClass("u_sel_bMenu"),
				selBSearch : $("<div>").addClass("u_sel_bSearch").append("<input type=\"text\"/><img src=\""+ options["searchImg"]+"\"/>"),
				selBSearchTips : $("<div>").addClass("u_sel_bSearchTips"),
				selBList : $("<ul>").addClass("u_sel_bList"),
				rememberInp : $("<input type=\"hidden\" data-tip=\"#J_changeAreaTip\" name=\"areaId\">"),
				prevBtn : $("<a>").addClass("u_areaTabPrev").attr("href","javascript:;").html("&lt;"),
				nextBtn : $("<a>").addClass("u_areaTabNext").attr("href","javascript:;").html("&gt;")
			},

			domName = this,

			dfunc = {

				init : function(options, objs){

					var _t = this;

					_t.V.getDoms(options, objs);
					_t.M.even(options, objs)

				},

				V : {

					getDoms : function(options, objs){

						var _t = this;
						objs.selA.append(objs.selATxt);
						objs.selA.append("<i class=\"ic_down\"></i>");
						objs.selB.append(objs.selBTab);
						objs.selB.append(objs.selBSearchTips);
						objs.selB.append(objs.selBList);

						objs.selBList.append(_t.domArea(options, objs));
						objs.selBMenu.append(dfunc.M.tabCount(dfunc.M.allLen,options));
						objs.selBTab.append(objs.prevBtn);
						objs.selBTab.append(objs.selBMenu);
						objs.selBTab.append(objs.nextBtn);
						objs.selBTab.append(objs.selBSearch);

						domName.css("position","relative");
						domName.append(objs.selA);
						domName.append(objs.selB);
						domName.append(objs.rememberInp);
						domName.addClass("u_sel u_areaTab");
					},

					domArea : function(options, objs){

						var dom = "",
							list = dfunc.M.resetList(options["list"]),
							len0 = list[0].length,
							len1 = list[1].length,
							i= 0, j = 0;

						for(;i < len0; i++){
							if(list[0][i]){
								dom += "<li data-val=\""+list[0][i]["val"]+"\" data-other=\"0\">"+list[0][i]["name"]+"</li>";
								dfunc.M.allLen++;
							};
						};
						for(;j < len1; j++){
							if(list[1][j]){
								dom += "<li data-val=\""+list[1][j]["val"]+"\" data-other=\"1\">"+list[1][j]["name"]+"</li>";
								dfunc.M.otherLen++;
							};
						};
						return dom;
					}
				},

				M : {

					allLen : 0,		//列表长度
					otherLen : 0, 	//是否存在测试区 默认不存在 = 技术测试区和删档测试区
					even : function(options, objs){

						var _t = this,
							searchVal = "";

						//出现下拉
						objs.selA.click(function(){
							if(!$(this).attr("data-boo")){
								objs.selBList.find("li").hide();
								objs.selBTab.find("li:eq(0)").addClass("crt").css("border-left","0");
								objs.selBList.find("li:lt("+options["maxNum"]+")").show();
								$(this).attr("data-boo",1);
							};
							domName.css("z-index","99");
							objs.selB.slideDown(100);
							return false;
						})


						//areaList
						objs.selBList.find("li").click(function(){
							var liName = $(this).text(),
								liId = $(this).attr("data-val");
							objs.selATxt.text(liName);
							objs.rememberInp.val(liId).attr("data-Name",liName);

						});

						//如果tab过多
						if(objs.selBMenu.find("li").length >=6 ){
							objs.selBSearch.addClass("u_sel_bSearchHide");
							objs.selBSearch.click(function(){
								objs.selBSearch.removeClass("u_sel_bSearchHide");
								_t.setCursorPosition(objs.selBSearch.find("input").get(0),objs.selBSearch.find("input").val().length);
								objs.selBTab.addClass("u_sel_bTabHide");
								objs.nextBtn.addClass("u_areaTabNextMove");
							});
							objs.selBMenu.find("li").mouseenter(function(){
								objs.selBSearch.addClass("u_sel_bSearchHide");
								objs.selBTab.removeClass("u_sel_bTabHide");
								objs.nextBtn.removeClass("u_areaTabNextMove");
							});

							objs.selBTab.addClass("u_sel_bTabMore");

							objs.nextBtn.click(function(){
								//console.log(objs.selBMenu.find("li:gt(4)"));
								objs.selBMenu.find("li:gt(5)").show();
								objs.selBMenu.find("li:lt(5)").hide();
								return false;
							});
							objs.prevBtn.click(function(){
								//console.log(objs.selBMenu.find("li:lt(4)"));
								objs.selBMenu.find("li:lt(5)").show();
								objs.selBMenu.find("li:gt(5)").hide();
								return false;
							});
							//objs["selBTab"].find("li:gt(5)").hide();
						};

						//search
						objs.selBSearch.click(function(){
							searchVal = objs.selBSearch.find("input").val();
							_t.searchFun(objs,searchVal,"请输入你要搜索的大区");
							return false;
						});
						objs.selBSearch.find("input").keyup(function(){
							searchVal = $(this).val();
							_t.searchFun(objs,searchVal,"你搜索的大区不存在");
							return false;
						});

						//tab 切换
						objs.selBMenu.find("li").mouseenter(function(){
							var txt = $(this).text(), gtNum =0, ltNum=0;
							objs.selBSearchTips.hide();
							$(this).addClass("crt").siblings().removeClass("crt");
							objs.selBSearch.find("input").val("");

							if(txt == "其他"){
								objs.selBList.find("li[data-other=\"0\"]").hide();
								objs.selBList.find("li[data-other=\"1\"]").show();
							} else {
								gtNum = $(this).text().split("-")[0]-2,
									ltNum = $(this).text().split("-")[1];

								objs.selBList.find("li").hide();

								if(gtNum < 0){
									objs.selBList.find("li[data-other=\"0\"]:lt("+ltNum+")").show();
								} else {
									objs.selBList.find("li[data-other=\"0\"]:lt("+ltNum+"):gt("+gtNum+")").show();
								}
							}

						});
						objs.selBTab.find("li").click(function(){
							return false;
						});


						//body
						$("body").click(function(){
							domName.css("z-index","1");
							objs.selB.hide();
						});
					},

					searchFun : function(objs,searchVal,txt){
						var i = 0;

						objs.selBTab.find("li").removeClass("crt");

						objs.selBList.find("li").each(function(){

							if($(this).text().indexOf(searchVal) > -1){
								//console.log($(this).text());
								//console.log($(this).text().indexOf(searchVal));
								//console.log(searchVal);
								$(this).show();
								i++;
							} else {
								$(this).hide();
							}
						});
						if(i < 1){
							objs.selBSearchTips.show().html(txt);
						} else {
							objs.selBSearchTips.hide();
						}
					},

					resetList : function(list){
						var _t = this, mainList = {0:[],1:[]}, num = 0, areaId = "";
						/**
						 * mainList = {
					 * 	0 : [],	//正式区
					 * 	1 : []	//测试区
					 * }
						 */

						$.each(list,function(k,d){
							d["val"] = k;
							num = d["name"].split(" ")[0];
							if(/^[1-9]\d*$/.test(num)){	//数字1-9 = 正式
								mainList[0][num]=this;
							} else {	//数字0 + 无数字 = 其他
								mainList[1].push(this);
							}
						});
						return mainList;
					},

					tabCount : function(len,options){
						var _t = this, liLen = Math.ceil(len/options["maxNum"]),
							i = 0,
							liDom = "";
						for(; i < liLen; i++){
							liDom += "<li>"+(i*15+1)+"-"+(i+1)*15+"</li>";
						};
						if(_t.otherLen > 0){
							liDom += "<li>其他</li>";
						};

						return liDom;
					},

					//textarea 光标定位
					setCursorPosition: function(dom, pos) {
						if (dom.setSelectionRange) {
							dom.focus();
							dom.setSelectionRange(pos, pos);
						} else if (dom.createTextRange) {
							var range = dom.createTextRange();
							range.collapse(true);
							range.moveEnd('character', pos);
							range.moveStart('character', pos);
							range.select();
						}
					}
				}
			};

		dfunc.init(options, objs);
	}
})(jQuery)