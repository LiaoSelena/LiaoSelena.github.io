$(function () {
	var $ul = $("#con ul");
	var liFirstHeight = 291;//��һ��li�ĸ߶�
    var scrtime;
	function scrolllist() {
            //������ʽչ�ֵ�һ��li
            $ul.animate({ top: -liFirstHeight + "px" }, 1500, function () {
                //�������ʱ
				$ul.css("top",0+"px")
                $ul.find("li:eq(0),li:eq(1),li:eq(2)").appendTo($ul);//��ul�����һ������li����Ϊul�ĵ�һ��li				
            });
        }
	scrtime = setInterval(scrolllist, 4000);
    $("#con").hover(function () {
        $ul.pause();//��ͣ����
        clearInterval(scrtime);
    }, function () {
        $ul.resume();//�ָ����Ŷ���	
       scrtime = setInterval(scrolllist, 4000);

    })

});