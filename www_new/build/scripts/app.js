$(function() {
	// 雅思终端页 点击隐藏显示效果
	$(".ielts-topic-area").each(function(index, element) {
		if($(this).children(".topic-area-cont:eq(0)").find(".whole").length == 0)
		{
			$(this).children(".topic-area-cont:eq(0)").find(".section").removeClass("disnone");
			$(this).children(".topic-area-cont:eq(0)").find(".section .down").removeClass("down");
		}
	});
	$(".jijing-yuce-topic-cont").on("click",".ielts-topic-area>.topic-area-cont",function(){
		if($(this).next().css("display")!="block"){
		var visi=$(this).parents(".ielts-topic-area").find("div[class=slidedown]");
		visi.slideUp(500);
		if(visi.prev().find(".whole")){
			visi.prev().find(".whole").addClass("disnone");
			visi.prev().find(".section").removeClass("disnone");
			}
		visi.prev().find(".section span").addClass("down");
		if($(this).find(".whole")[0]){
			$(this).find(".whole").removeClass("disnone");
			$(this).find(".section").addClass("disnone");
			}		
		$(this).find(".section span").removeClass("down");
		$(this).next().slideDown(500);
		}
	})
	//  雅思口语 past2 3
	$(".ielts-jijing-yuce-part3-10 .topic-area-cont-title-top10:first-child").next().show();
	$(".ielts-jijing-yuce-part3-10").each(function(index, element) {
        if($(this).children(".topic-area-cont-title-top10:first-child").find(".ielts-part-whole").length > 0)
		{
			$(this).children(".topic-area-cont-title-top10:first-child").find(".ielts-part-whole").show();
			$(this).children(".topic-area-cont-title-top10:first-child").find(".ielts-part-section").hide();
		}
		else
		{
			$(this).children(".topic-area-cont-title-top10:first-child").find(".ielts-part-section span").hide();
			$(this).children(".topic-area-cont-title-top10:first-child").find(".ielts-part-section").show();
		}
    });
	$(".jijing-cont-detailed .ielts-jijing-yuce-no-bj").on("click",".topic-area-cont-title-top10 .topic-area-container",function(){
		if($(this).parent().next(".ielts-part23-title-cont").is(":hidden"))
		{
			$(".topic-area-cont-title-top10 .topic-area-container .ielts-part-section span").show();
			if($(this).children(".ielts-part-whole").is(":visible"))
			{
				return false;
			}
			else
			{
				if($(this).children(".ielts-part-whole").length > 0)
				{
					$(this).parent().siblings(".topic-area-cont-title-top10").find(".ielts-part-whole").hide();
					$(this).parent().siblings(".topic-area-cont-title-top10").find(".ielts-part-section").show()
					$(this).parent().siblings(".ielts-part23-title-cont").hide();
					$(this).children(".ielts-part-whole").show();
					$(this).children(".ielts-part-section").hide()
					$(this).parent().next().slideDown(500);
				}
				else
				{
					if($(this).children(".ielts-part-section").find("span").is(":visible"))
					{
						$(this).find("span").hide();
						$(this).parent().siblings(".topic-area-cont-title-top10").find(".ielts-part-whole").hide();
						$(this).parent().siblings(".topic-area-cont-title-top10").find(".ielts-part-section").show()
						$(this).parent().siblings(".ielts-part23-title-cont").hide();
						$(this).children(".ielts-part-section").show()
						$(this).parent().next().slideDown(500);
					}
					else
					{
						$(this).parent().siblings(".topic-area-cont-title-top10").find(".ielts-part-whole").hide();
						$(this).parent().siblings(".topic-area-cont-title-top10").find(".ielts-part-section").show()
						$(this).parent().siblings(".ielts-part23-title-cont").hide();
						$(this).children(".ielts-part-section").show()
						$(this).parent().next().slideDown(500);
					}
				}
			}
		}
		else
		{
			return false;
		}
	})
	
	//  机经页面 返回顶部
	$(".er-nav-back_to_top").on("click", function() {
        $("html,body").animate({
            scrollTop: $(".head-content").offset().top
        }, 400);
    });
	
	
	$(".public-class").children().eq(0).css({"marginRight":"24px","marginBottom":"11px"});
	$(".public-class").children().eq(1).css("marginBottom","11px");
	$(".public-class").children().eq(2).css("marginRight","24px");
	$(".lesson-pulpit").children().eq(0).css({"marginRight":"24px","marginBottom":"11px"});
	$(".lesson-pulpit").children().eq(1).css("marginBottom","11px");
	$(".lesson-pulpit").children().eq(2).css("marginRight","24px");
	$(".right-class-margin").children().eq(3).css("marginBottom","0px");
	$(".right-lesson-margin").children().eq(3).css("marginBottom","0px");
	$(".story-video-part").children().eq(4).css("marginRight","0px");
	$(".story-video-part").children().eq(9).css("marginRight","0px");
	//视频右边距
    var $ul = $("#they-speaking-content ul");
    var liFirstHeight;
    var scrtime;

    function scrolllist() {
        //动画形式展现第一个li
        liFirstHeight = $ul.find("li:eq(0)").outerHeight(true) + $ul.find("li:eq(1)").outerHeight(true) + $ul.find("li:eq(2)").outerHeight(true);
        $ul.animate({
            top: -liFirstHeight + "px"
        }, 1500, function() {
            //动画完成时
            $ul.css("top", 0 + "px")
            $ul.find("li:eq(0),li:eq(1),li:eq(2)").appendTo($ul); //将ul的最后一个剪切li插入为ul的第一个li             
        });
    }
    scrtime = setInterval(scrolllist, 4000);
    $("#they-speaking-content").hover(function() {
        $ul.pause(); //暂停动画
        clearInterval(scrtime);
    }, function() {
        $ul.resume(); //恢复播放动画  
        scrtime = setInterval(scrolllist, 4000);
    })
    //右边滚动他们都在说
    /*头部  导航条 下区域拉 左右*/
    $(".head-nav-left li:first-child ul li:odd").css("float", "right");
    $('.head-nav-left li').hover(function() {
        var lis_array = new Array();
        var $lis = $(this).children("ul").children("li");
        var lis_length = $lis.length;
        for (i = 0; i < lis_length; i++) {
            lis_array[i] = $lis.eq(i).innerWidth();
        }
        lis_max_width = Math.max.apply(null, lis_array);
        ul_width = lis_max_width * 2 + 26;
        $(this).children("ul").css("width", ul_width + "px");
        $lis.css("width", lis_max_width + "px");
        $(this).children("ul").css("visibility", "visible");
        $(this).find(".head-nav-border-white").show();
    }, function() {
        $(this).children("ul").css("visibility", "hidden");
        $(this).find(".head-nav-border-white").hide();
    });
    //calendar
    $(".calenda .content dd .current_in").hover(function() {
        var calendaUl = $(this).find("ul");
        var allWidth = window.innerWidth;
        var ulRight = calendaUl.offset().left;
        var ulWidth = calendaUl.outerWidth();
        if (ulWidth + ulRight - allWidth >= 0) {
            calendaUl.css("right", "0");
        } else {
            calendaUl.removeAttr('style');
        }
    })
    $(".hot-ranking").children(".new-right-section:lt(3)").find("span").addClass("rank-num-hot");
    //热度排行
    $(".wrap-recommend").find(".recommend-content").eq(3).css("margin-right", "0px");
    $(".wrap-recommend").find(".recommend-content").eq(7).css("margin-right", "0px");
    //热门推荐
    $(".wrap-article").find("a").eq(8).css("margin-bottom", "0px");
    $(".wrap-article").find("a").eq(9).css("margin-bottom", "0px");
    //相关文章
    //toefl-those-things
    var listAll = $(".those_things .those_content .things_list");
    if (listAll.length > 13) {
        $(".those_things .those_content .things_list:gt(12)").hide();
        $(".those_things .page").hide();
    }
    $(".those_things .more").click(function() {
        $(this).hide();
        $(".those_things .those_content .things_list:gt(12)").show();
        $(".those_things .page").show();
    })
    var listAll = $(".those_things_jiu .those_content .things_list");
    if (listAll.length > 9) {
        $(".those_things_jiu .those_content .things_list:gt(8)").hide();
        $(".those_things_jiu .page").hide();
    }
    $(".those_things_jiu .more").click(function() {
        $(this).hide();
        $(".those_things_jiu .those_content .things_list:gt(8)").show();
        $(".those_things_jiu .page").show();
    })
    //文章详情图片放大功能
    $('.imageNav').colorbox({
        slideshow: true,
        scalePhotos: true,
        rel: 'imageNav'
    });
    // 登陆后 顶部
    $(".user-name .user-name-Locate ul li:last a").css({
        height: "40px",
        borderTop: "1px solid #E5E5E5",
        lineHeight: "40px"
    });
    // 显示或者隐藏  53 客服 
    $(".remarksConsulting,.icon-zaixianjiaoliu-style,.wusan-Customer").on("click", function() {
        $(".hide-wusan").show();
    });
    $(".hide-wusan img").on("click", function() {
        $(".hide-wusan").hide();
    });
    //收藏点击效果
    var onShou = true;
    $(".save-share .newest-save").click(function(e) {
        if (onShou) {
            $(this).children("span").addClass("icon-yishoucang").removeClass("icon-shoucang");
            onShou = false;
        } else {
            $(this).children("span").addClass("icon-shoucang").removeClass("icon-yishoucang");
            onShou = true;
        };
    });
    // 专题首页 banner
    var set_topic_half = ($("#set-topic-li-style li").length * 90) / 2;
    $("#set-topic-li-style .left").css("marginLeft", -(set_topic_half + 60) + "px");
    $("#set-topic-li-style .right").css("marginLeft", (set_topic_half + 30) + "px");
    //  模考sat
    $(".test_title .text_right span:last").css("paddingRight", "0px");
    $(".per_ziliao .img-xingding").children(".edit-avatar").hide();
    $(".per_ziliao .img-xingding").hover(function() {
        $(this).children(".edit-avatar").show();
    }, function() {
        $(this).children(".edit-avatar").hide();
    })
    $(".record_list_box").hide().eq(0).show();
    $(".record_header span").click(function() {
        var spanIndex = $(this).index();
        $(".record_header span").removeClass("current");
        $(this).addClass("current");
        $(".record_list_box").hide();
        $(".record_list_box").eq(spanIndex).show();
    })
    $(".record_list .btns input.look").click(function() {
        var $liezi = $(this).parent().siblings(".box_in").find('.liezi');
        if ($liezi.is(":hidden")) {
            $liezi.removeClass('hide');
        } else {
            $liezi.addClass('hide');
        }
    })
    //专题列表  分享
    $(".newest-share").hover(function() {
        $(this).children(".newest-share-absolute").show();
    }, function() {
        $(this).children(".newest-share-absolute").hide();
    });
    // 首页 搜索
    $(".head-index-right form button").on("click", function() {
        if ($(".head-index-right div:first-child").hasClass("head-intersection")) {
            if ($(".head-index-right form input").is(":hidden")) {
                $(".head-intersection").hide(100);
                $(".head-index-right form input").show(100).focus();
            } else {
                $(".head-intersection").show(100);
                $(".head-index-right form input").hide(100);
            }
        } else {
            if ($(".head-index-right form input").is(":hidden")) {
                $(".head-intersection-after").hide();
                $(".head-index-right form input").show().focus();
            } else {
                $(".head-intersection-after").show();
                $(".head-index-right form input").hide();
            }
        }
    });
    $(document).click(function(event) {
        var eo = $(event.target);
        if ($(".head-index-right form input").is(":visible") && !$(".head-index-right form input").is(":focus")) {
            $(".head-index-right form input").hide();
            $(".head-intersection").show();
            $(".head-intersection-after").show();
        }
    });
    // 学科频道首页
    $(".zhan-characteristic li:last").css("borderRight", "0px");
    $(".abroad-station-cont li:nth-child(3n)").css("marginRight", "0px")
    $(".propaganda_company ul li:last").css("marginRight", "0px")
    $(".propaganda_company ul li:lt(5)").css("marginTop", "39px")
    $(".propaganda_media ul li:nth-child(6n)").css("marginRight", "0px")
    // 企业荣誉 | 媒体报道
    $(".propaganda-hide").eq(1).hide();
    $(".propaganda-switch-title span").on("click", function() {
        $(".propaganda-hide").hide();
        $(".propaganda-switch-title span").removeClass();
        $(this).addClass('active');
        $(".propaganda-hide").eq($(this).index()).show();
    });
    $(window).scroll(function() {
        if ((this.pageYOffset > 500) || (this.document.documentElement.scrollTop > 500)) {
            $(".fixed-index").show();
        } else {
            $(".fixed-index").hide();
        }
    });
    $(".train-exam-cont-left").hover(function() {
        $(this).children("span").stop(false, false).animate({
            top: "0px"
        }, 360);
        $(this).children(".exam-hover-a").stop(false, false).animate({
            top: "0px"
        }, 360, function() {
            $(this).find("u").stop(false, false).animate({
                top: "0px"
            }, 400, "easeInOutCirc");
        });
    }, function() {
        $(this).children("span").stop(false, false).animate({
            top: "-494px"
        }, 360);
        $(this).children(".exam-hover-a").stop(false, false).animate({
            top: "-494px"
        }, 360, function() {
            $(this).find("u").stop(false, false).animate({
                top: "-494px"
            }, 400, "easeInOutCirc");
        });
    });
    $(".train-exam-hover-er-green,.train-exam-hover-er-blue").hover(function() {
        $(this).children("span").stop(false, false).animate({
            left: "0px"
        }, 240);
        $(this).children(".exam-hover-a").stop(false, false).animate({
            left: "0px"
        }, 240, function() {
            $(this).find("u").stop(false, false).animate({
                left: "0px"
            }, 300, "easeInOutCirc");
        });
    }, function() {
        $(this).children("span").stop(false, false).animate({
            left: "-365px"
        }, 240);
        $(this).children(".exam-hover-a").stop(false, false).animate({
            left: "-365px"
        }, 240, function() {
            $(this).find("u").stop(false, false).animate({
                left: "-365px"
            }, 300, "easeInOutCirc");
        });
    });
    $(".train-exam-hover-san-blue,.train-exam-hover-san-deep-green,.train-exam-hover-san-deep-blue").hover(function() {
        $(this).children("span").stop(false, false).animate({
            left: "0px"
        }, 240);
        $(this).children(".exam-hover-a").stop(false, false).animate({
            left: "0px"
        }, 240, function() {
            $(this).find("u").stop(false, false).animate({
                left: "0px"
            }, 300, "easeInOutCirc");
        });
    }, function() {
        $(this).children("span").stop(false, false).animate({
            left: "243px"
        }, 240);
        $(this).children(".exam-hover-a").stop(false, false).animate({
            left: "243px"
        }, 240, function() {
            $(this).find("u").stop(false, false).animate({
                left: "243px"
            }, 300, "easeInOutCirc");
        });
    });
    $(".abroad-station-cont li").hover(function() {
        $(this).children("em").stop(false, false).animate({
            top: "0px"
        }, 200);
        $(this).children(".abroad-station-hover").stop(false, false).animate({
            top: "0px"
        }, 200);
    }, function() {
        $(this).children("em").stop(false, false).animate({
            top: "286px"
        }, 200);
        $(this).children(".abroad-station-hover").stop(false, false).animate({
            top: "286px"
        }, 200);
    });
    //机经 回复 icon 点击到回复窗口
    $(".click-reply").on("click", function() {
        $("html,body").animate({
            scrollTop: $(".jijing-gonglue-comment .content_box").offset().top-128
        }, 800);
    });
   //视频 评论 icon 点击到评论窗口
    $(".video-end-share .zan_right .icon_pinglun").on("click", function() {
        $("html,body").animate({
            scrollTop: $("#locate-comment").offset().top
        }, 800);
    });
	
	// 固定 菜单栏
	    var fixed_float_top =$(window).scrollTop(); 
		var fixed_float_height=742;
	
		if(fixed_float_top>fixed_float_height)
		{	
			$('#fixed_float').css({'position':'fixed','top':'0px','z-index':'999'});
			$('#fixed_float').addClass("jijing-swith-title-link_fixed");
			$(".er-nav-back_to_top").show();
		}
		else
		{	
			$('#fixed_float').css({'position':'relative'});
			$('#fixed_float').removeClass("jijing-swith-title-link_fixed");
			$(".er-nav-back_to_top").hide();
		}
		$(window).scroll(function(e) {
			var fixed_float_top_scroll = $(window).scrollTop(); 
			var fixed_float_height_scroll = 742;
			if(fixed_float_top_scroll>fixed_float_height_scroll)
			{	
				$('#fixed_float').css({'position':'fixed','top':'0px','z-index':'999'});
				$('#fixed_float').addClass("jijing-swith-title-link_fixed");
				$(".er-nav-back_to_top").show();
			}
			else
			{	
				$('#fixed_float').css({'position':'relative'});
				$('#fixed_float').removeClass("jijing-swith-title-link_fixed");
				$(".er-nav-back_to_top").hide();
			}
		});

 
    //下拉框
    $(".select_box ul").hide();
    $(".select_box p").click(function() {
        if ($(this).siblings('ul').is(":hidden")) {
            $(".select_box ul").hide();
            $(this).siblings('ul').show();
        } else {
            $(this).siblings('ul').hide();
        }
        $(".select_box ul li").click(function() {
            var txt = $(this).text();
            $(this).parent("ul").siblings('p').find("em").html(txt);
            $(this).parent("ul").hide();
        })
    })
    $("body").click(function() {
        $(".select_box ul").hide();
    })
    $(".label-choose-box .select_box").click(function(e) {
        e.stopPropagation();
    })
    $(".find-toefl-station .select_box").click(function(e) {
        e.stopPropagation();
    })
    
    $(".jijing-gonglue-comment .list").on("click", '.operation a', function() {
        $("html,body").animate({
            scrollTop: $(".jijing-gonglue-comment .content_box").offset().top-50
        }, 800);
    });
	 //video-index 换一换
    var page=1;
    $(".video-index-hot-video .change").click(function(){
        var i=5;
        var $list=$(".video-index-hot-video .content .list");
        var showWidth=$(".video-index-hot-video .content").width();
        var listLength=$list.find("dl").length;
        var pageCount=Math.ceil(listLength/i);
        if(page==pageCount){
            $list.animate({left:"0px"},300);
            page=1;
        }else{
           $list.animate({left:"-="+showWidth},800);
           page++;
        }
    })
	// 三级菜单 替换  二级菜单 里面部分内容
	var ielts_end_san_nav_youlai_cont = $(".jijing-swith-title-link ul li:eq(1)").clone(true);
	$(window).on('scroll', function(event) {
		if($(".ielts-end-san-nav").length > 0)
		{
			if ($(document).scrollTop() > $(".ielts-end-san-nav").offset().top) {
				if($(".ielts-end-san-nav ul li").hasClass('clone_li'))
				{
					return;
				}
				else
				{
					$(".ielts-end-san-nav ul li").addClass("clone_li");
					var ielts_end_san_nav_xin_cont = $(".ielts-end-san-nav ul li").clone(true);
					$(".jijing-swith-title-link ul li:eq(1)").replaceWith(ielts_end_san_nav_xin_cont);
				}
			}
			else
			{
				$(".jijing-swith-title-link ul li:eq(1)").replaceWith(ielts_end_san_nav_youlai_cont);
				$(".jijing-swith-title-link ul li.clone_li").remove();	
				$(".ielts-end-san-nav ul li").removeClass("clone_li");
			}
		}
		else
		{
			return;
		}
	})
	
    // 点击评论到评论窗口
	$(".video-wonferful-cont ul li .video-share-icon a").on("click", function() {
        $("html,body").animate({
            scrollTop: $("#locate-comment").offset().top
        }, 800);
    });
	
	// 禁止复制 题目
	$('.jijing-cont-detailed').bind('contextmenu',function(){return false;});
    $('.jijing-cont-detailed').on("copy",function(){return false;});
	//三级菜单 点击跳转链接
  	var href_url = window.location.href;
	var href_url_start = href_url.indexOf('#');
	if(href_url.substr(href_url_start,13) == "#dingwei_href")
	{
		$("html,body").animate({
			scrollTop: $("#dingwei_self").offset().top-70
		}, 400);
	}
	else
	{
		return;	
	}
	
	
	
	
	
	
	
	
	
	
	 //know-scroll
    $('.carousel').carousel({
        interval: 3000
    });
    // 星状评分
    window.createStarScore = function($container) {
        var $starScoreWrap = $('<div class="stars-score-wrap"><span><i data-starno="1" class="star-score-icon icon-xing_left"></i><i data-starno="2" class="star-score-icon icon-xing_right"></i></span><span><i data-starno="3" class="star-score-icon icon-xing_left"></i><i data-starno="4" class="star-score-icon icon-xing_right"></i></span><span><i data-starno="5" class="star-score-icon icon-xing_left"></i><i data-starno="6" class="star-score-icon icon-xing_right"></i></span><span><i data-starno="7" class="star-score-icon icon-xing_left"></i><i data-starno="8" class="star-score-icon icon-xing_right"></i></span><span><i data-starno="9" class="star-score-icon icon-xing_left"></i><i data-starno="10" class="star-score-icon icon-xing_right"></i></span></div>');
        $starScoreWrap.css({
            overflow: 'hidden',
            width: '90px'
        });
        $starScoreWrap.children().css({
            display: 'block',
            position: 'relative',
            float: 'left',
            width: '16px',
            overflow: 'hidden',
            fontSize: '14px',
            color: '#bebebe',
            cursor: 'pointer'
        });
        $starScoreWrap.appendTo($container);
        $starScoreWrap.find('.star-score-icon').click(function() {
            var curStarno = $(this).data('starno');
            $starScoreWrap.find('.star-score-icon').each(function(idx, elm) {
                var no = $(elm).data('starno');
                if ($(elm).data('starno') <= curStarno) {
                    $(elm).css({
                        color: '#ff3c3c'
                    });
                } else {
                    $(elm).css({
                        color: '#bebebe'
                    });
                }
            })
            $container.data('score', curStarno);
            //console.log('score is ' + $container.data('score'));
        })
    }
	createStarScore($('.comment-score-nologin'));
    createStarScore($('.comment-score-success'));
});
