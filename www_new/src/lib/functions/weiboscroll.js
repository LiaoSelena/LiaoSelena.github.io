$(function () {
	var $ul = $("#con ul");
	var liFirstHeight = 291;//第一个li的高度
    var scrtime;
	function scrolllist() {
            //动画形式展现第一个li
            $ul.animate({ top: -liFirstHeight + "px" }, 1500, function () {
                //动画完成时
				$ul.css("top",0+"px")
                $ul.find("li:eq(0),li:eq(1),li:eq(2)").appendTo($ul);//将ul的最后一个剪切li插入为ul的第一个li				
            });
        }
	scrtime = setInterval(scrolllist, 4000);
    $("#con").hover(function () {
        $ul.pause();//暂停动画
        clearInterval(scrtime);
    }, function () {
        $ul.resume();//恢复播放动画	
       scrtime = setInterval(scrolllist, 4000);

    })

});