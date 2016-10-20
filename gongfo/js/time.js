function countDown(){
	var now = new Date(),
		hour = now.getHours(),
		min = now.getMinutes(),
		sec = now.getSeconds();

	var	totalSec = hour*3600 + min*60 + sec;
	var surplusSec = 24*3600 - totalSec; //倒计时一天，零点开始倒计时

	var h = Math.floor(surplusSec/3600), //小时
		surplus = surplusSec%3600;	//剩余的秒数
	var m = Math.floor(surplus/60), //分钟
		s = surplus%60;	//秒数

	setTimeout(countDown, 1000); //一秒调用一次
	$('#countdown').html(h+":"+m+":"+s);
}

countDown();




