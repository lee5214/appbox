object is not allowed as react components

exp:
<div>{this.props.data}</div>
(use .toString() to test)

---
to render the data from async call directly in render for test
<pre>
{ JSON.stringify (this.props.xxxx) }
</pre>


{
		id : uid.v4 (),
		type : 'Basic',
		bsStyle : 'info',
		description : 'Very good to start your business',
		price : 23.00,
		capabilities : [
			{key : 'Android / iOS', value : 'Yes'},
			{key : 'Admin Web Access', value : '85421'},
			{key : 'Appointments', value : 'Yes'},
			{key : 'Import / Export Data', value : 'Yes'},
			{key : 'Data Storage', value : '1GB'},
		],
	},


highlight: nested reducer (sometimes need to re-organise the state like {[cityweather],[citynews]} =>{[city1:{cityweather,citynews}]})

some site block iframe (like NYT)

---
if there's a file imported in index.html such as <script src='...socketio.js'></script>
you can use window.io() to access in components

---
there's a limit size of git repo (100mb), if you already pushed more than 1 time and github rejected, you may need to use 'BFG'
to remove those big file in the history. 

---
proxy: package.json/proxy, used for solving CROS issue in dev mode(2 servers)
note: '/l' will include such as '/login', so make sure use '/l/'
---
ajax, axios post  
expmple from jquary: 
$.ajax({
    type: 'POST',
    url: /your/url/,
    data: data,
    dataType: 'json', # 注意：这里是指希望服务端返回json格式的数据, 参数dataType：期望的服务器响应的数据类型，可以是null, xml, script, json
    success: function(data) { # 这里的data就是json格式的数据
    },
    error: function(xhr, type) {
    }
});



