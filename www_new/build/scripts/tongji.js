Function.prototype.extend = function(fn) {
  var self = this;
  return function() {
    self.apply(this, arguments);
    fn.apply(this, arguments);
  };
};

function initTongji(){
	/* 百度统计代码 */
	var _hmt = _hmt || [];
	(function() {
		var hm = document.createElement("script");
		hm.src = "//hm.baidu.com/hm.js?2b1218a1edeadac999e75c32de662f36";
		var s = document.getElementsByTagName("script")[0];
		s.parentNode.insertBefore(hm, s);
	})();
	(function(){
		var bp = document.createElement('script');
		bp.src = '//push.zhanzhang.baidu.com/push.js';
		var s = document.getElementsByTagName("script")[0];
		s.parentNode.insertBefore(bp, s);
	})();
	
	/* 谷歌统计代码 */
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-64161143-1', 'auto');
	ga('set', 'dimension2', '');
	ga('send', 'pageview');
}

if(window.onload===null){
	window.onload = initTongji()
}
else{
	window.onload = window.onload.extend(function() {
		initTongji();
	});
}


