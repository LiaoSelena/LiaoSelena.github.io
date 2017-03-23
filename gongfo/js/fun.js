$(function(){

	$('a.sbtn, .sharebtn').on('click', function(){
		$('#mask').show();
	});

	$('#mask').on('click', function(){
		$(this).hide();
	});

	$('a.ddbtn').on('tap', function(e){
		e.stopPropagation();
		if (!$(this).parent().hasClass('on')) {
			$(this).parent().addClass('on');
			$(this).next().addClass('on');
		}else {
			$(this).parent().removeClass('on');
			$(this).next().removeClass('on');
		}
	});

	$(document).on('tap', function(e){
        var obj = e.target;
        if (!$(obj).is('.dropdown, .dropdown *')) {                
            $('.dropdown').removeClass('on');
            $('a.ddbtn').parent().removeClass('on');
        }
    });

});