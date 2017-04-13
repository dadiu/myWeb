
//head
var navmore = [
    // {
    //     "name" : "skill",
    //     "china" : "生活技能",
    //     "href" : "http://whj.fayfox.com/skill.html"
    // },
    // {
    //     "name" : "painting",
    //     "china" : "蜜汁日常",
    //     "href" : "http://whj.fayfox.com/painting.html"
    // },
    {
        "name" : "github/work",
        "china" : "工作模板",
        "href" : "https://github.com/dadiu/work/"
    },
    {
        "name" : "work",
        "china" : "项目们",
        "href" : "http://whj.fayfox.com/work.html"
    },
    {
        "name" : "ui",
        "china" : "模板",
        "href" : "http://whj.fayfox.com/ui.html"
    },
    // {
    //     "name" : "plug",
    //     "china" : "插件",
    //     "href" : "http://whj.fayfox.com/plug.html"
    // },
    // {
    //     "name" : "share",
    //     "china" : "分享",
    //     "href" : "http://whj.fayfox.com/share.html"
    // },
    // {
    //     "name" : "game",
    //     "china" : "游戏",
    //     "href" : "http://whj.fayfox.com/game.html"
    // },
    {
        "name" : "github",
        "china" : "github",
        "href" : "https://github.com/dadiu",
        "open" : "_blank"
    },
    {
        "name" : "wiki",
        "china" : "wiki",
        "href" : "http://whj.fayfox.com/wiki/"
    }
    // {
    //     "name" : "study",
    //     "china" : "日常学习",
    //     "href" : "http://whj.fayfox.com/study.html"
    // },
    // {
    //     "name" : "notes",
    //     "china" : "手记",
    //     "href" : "http://whj.fayfox.com/notes.html"
    // }
];

//skill snav
var skillSnavList = {
    "other":{
        "待分类":"http://whj.fayfox.com/skill.html?nav=skill"
    },
    "css2.0" : {
        "css2.0" : "http://whj.fayfox.com/con_skill/skill_css.html?nav=skill"
    },
    "css3.0" : {
        "css3.0" : "http://whj.fayfox.com/con_skill/skill_css3.html?nav=skill"
    },
    "js" : {
        "常用公用js" :"http://whj.fayfox.com/con_skill/skill_js.html?nav=skill",
        "responsiveslides" :"http://whj.fayfox.com/con_skill/skill_slideshow.html?nav=skill"
    }
};

//skill snav
var shareSnavList = {
    "1":{
        "响应式布局":"http://whj.fayfox.com/share.html?nav=share"
    }
};


//foot
var common = {

    urlObj : {},

    init : function(){

        var _t = this;
        _t.Controller.urlFun();
        _t.view.hd();
        _t.view.ft();
    },

    view : {

        //顶部menu 
        //依赖 navmore && common.Controller.urlFun()
        hd : function(){
            var defaults = {
                'logo' : '<i class=\"iconfont\">&#xe60b;</i>个吴海晶',      
                'href' : 'http://whj.fayfox.com/',
                'nav' : navmore
            },
            objs = {
                navParent : $('<div>').addClass('nav'),
                navChild : $('<div>').addClass('menu'),
                wrapChild : $('<div>').addClass('wrap'),
                dl : $('<dl>'),
                btn : $('<b>').addClass('iconfont')
            },
            hdFunc = {

                init : function(options, objs){

                    var _t = this,
                        DOMP = '<div class="wrap"><ul class="cb">', 
                        DOMC = '', dd = '', i = 0, len = options.nav.length,
                        openUrlBoo="";
                    
                    /**** 主菜单 ***/
                    if(options.nav.length > 0){
                        for(; i < len; i++){
                            if(options.nav[i].open){
                                openUrlBoo = "target=\""+options.nav[i].open+"\"";
                            } else {
                                openUrlBoo ="";
                            }

                            DOMP += '<li data-nav="' + options.nav[i].name+ '">' + 
                                '<a '+ openUrlBoo +' href="'+ options.nav[i].href + '?nav=' + options.nav[i].name + '">' + 
                                options.nav[i].china + '</a></li>';
                        }

                        DOMP += '</ul>' + 
                                '<a class="nav_cp" href="' + options.href + '">'+
                                '<span>' + options.logo + '</span>'+
                                //'<i class="fa fa-user"></i>'+
                                '</a></div>';

                        objs.navParent.append(DOMP);

                        /*** 插入html ***/
                        $("body").prepend(objs.navParent);

                        //事件
                        _t.evenP(options, objs);
                    }

                },

                //主菜单 当前状态
                evenP : function(options, objs){

                    var _t = this;

                    if(common.urlObj.nav){
                        $('.nav li[data-nav="' + common.urlObj.nav + '"]').addClass('crt').siblings().removeClass('crt');
                    } else {
                        $('.nav li[data-nav="home"]').addClass('crt').siblings().removeClass('crt');
                    }

                }
            };

            hdFunc.init(defaults, objs);
        },

        //底部ft
        ft : function(){

            var DOM = "<section class=\"g_ft\">"+
                "<p class=\"g_ft_txt\">设计&手绘&前端 BY 7个吴海晶.  |  @ 2015-2025</p></section>";

            $("body").append(DOM);
        },

        //左菜单
        snav : function(list){
            var DOM = "";
            $.each(list, function(k,j){

                DOM += "<ul>";
                $.each(j,function(txt,link){
                    DOM += "<li><a href=\"" + link + "\">" + txt + "</a></li>";
                });
                DOM += "</ul>";
            });

            $(".snav").append(DOM);
        }
    },

    Controller : {

        //分解url
        urlFun : function(){
            var href = window.location.search;

            if(href.indexOf('?') != -1){
                var hrefArr = href.substr(1).split('&'),
                    hrefLen = hrefArr.length;
                for(var i = 0; i < hrefLen; i++ ){
                    common.urlObj[hrefArr[i].split('=')[0]] = hrefArr[i].split('=')[1];

                }
            }

            return false;
        }
    }
};

common.init();