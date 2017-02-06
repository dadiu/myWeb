# linkageCity

<h3>兼容性</h3>
<p>IE7+</p>
<h3>选择后的储存位置</h3>
<ol>
<li>储存省市的code值于".linkage_txt"标签的“data-code”属性中，以“|”连接，如“12|965|971”</li>
<li>储存省市的文字于".linkage_txt"标签的“txt”中，以空格连接</li>
</ol>
<h3>线上地址</h3>
<p><a href="http://whj.fayfox.com/demo/plugIn.linkageCity/" target="_blank">戳这里</a></p>
<h3>参数说明</h3>
<pre>
cityName : '浙江省|杭州市|滨江区',		//默认 城市名 可选
cityCode : '12|965|971',				//默认 城市代码 可选
p : '',									//方法传参 默认空 可选
closeBoo : true, 						//是否出现关闭按钮 默认false 
callback : null							//回调方法 默认null
</pre>

<h3>使用方法</h3>
<strong>1. html</strong>
<pre>&lt;div id="m_city"&gt;&lt;/div&gt;</pre>
<strong>2. css</strong>
<pre>
#m_city { padding:50px 100px; }
li,ul{list-style:none; padding:0; margin:0; }

.m_linkage { position:relative; line-height:20px; font-size:12px; }
.linkage_txt { cursor:pointer; position:relative; z-index:2; padding:5px 20px 5px 5px; border:1px solid #ccc; background-position:right -48px; background-color:#fff; }
.linkage_content { display:none; position:absolute; left:0; top:22px; width:530px; padding:10px; border:1px solid #ccc; background:#fff; }
.linkage_th { height:23px; margin-bottom:10px; border-bottom:2px solid #33bee5; }
.linkage_th li { cursor:pointer; float:left; padding:0 23px 0 8px; margin-right:5px; border:1px solid #ccc; border-bottom:0; background-position:right -2px; background-color:#fff; }
.linkage_th .crt { padding:0 22px 1px 7px; border:2px solid #33bee5; border-bottom-color:#fff; }

.linkage_province, .linkage_city, .linkage_area { display:none; overflow:hidden; }
.linkage_tb li { cursor:pointer; float:left; width:24.5%; line-height:25px; }
.linkage_tb li:hover { color:#33bee5; }

.ic_linkageCity_close { position:absolute; right:5px; top:4px; width:24px; height:24px; background-position:0 -72px; }
.linkage_txt, .linkage_th li, .ic_linkageCity_close { background-image:url(http://whj.fayfox.com/img/linkageCity.gif); background-repeat:no-repeat; }
.ic_linkageCity_close:hover {
	/* transition */
	transition:all 0.2s ease-out; 
	-ms-transition:all 0.2s ease-out; /* Internet Explorer */
	-moz-transition:all 0.2s ease-out; /* Firefox */
	-webkit-transition:all 0.2s ease-out; /* Safari 和 Chrome */
	-o-transition:all 0.2s ease-out; /* Opera */

	/* Rotate div */
	transform:rotate(90deg);
	-ms-transform:rotate(90deg); /* Internet Explorer */
	-moz-transform:rotate(90deg); /* Firefox */
	-webkit-transform:rotate(90deg); /* Safari 和 Chrome */
	-o-transform:rotate(90deg); /* Opera */
}
</pre>
<strong>3. js</strong><br/>
<small>3.1 先引入以下3个js</small>
<pre>
jquery-1.8.3.js
cityList.js
jquery.linkageCity.min.js
</pre>
<small>3.2 最后运行js</small>
<pre>
$('#m_city').linkageCity({
    cityName : '浙江省|杭州市|滨江区',		//默认 城市名 可选
    cityCode : '12|965|971',				//默认 城市代码 可选
    p : '',									//方法传参 默认空 可选
    closeBoo : true, 						//是否出现关闭按钮 默认false 
    callback : function(p){					//回调方法 默认null
			console.log(this.p);
		}
	});
</pre>
