document.writeln("<!--抽奖活动-->");
document.writeln("    <div class=\"fixed-lottery\"></div>");
document.writeln("    <div class=\"fixed-lottery-cont\">");
document.writeln("    	<img src=\"images/lottery/lottery-png.png\">");
document.writeln("        <span class=\"fixed-lottery-btn showGame\"><img src=\"images/lottery/lottery-btn.png\"></span>");
document.writeln("        <span class=\"fixed-lottery-explanation\">活动说明</span>");
document.writeln("        <span class=\"fixed-lottery-close\"><img src=\"images/lottery/lottery-close.png\"></span>");
document.writeln("        <div class=\"lottery-wenzi-cont\">");
document.writeln("        	<img src=\"images/lottery/lottery-wenzi-cont.png\">");
document.writeln("            <img class=\"lottery-wenzi-close\" src=\"images/lottery/lottery-close-wenzi.png\">");
document.writeln("        </div>");
document.writeln("    </div>");
document.writeln("    <style type=\"text/css\">");
document.writeln("    .fixed-lottery{");
document.writeln("		width:100%;");
document.writeln("		height:100%;");
document.writeln("		background:url(images/lottery/lottery-wuyi.png) repeat left top;");
document.writeln("		position:fixed;");
document.writeln("		left:0px;");
document.writeln("		top:0px;");
document.writeln("		z-index:999;");
document.writeln("		display:none;");
document.writeln("	}");
document.writeln("	.fixed-lottery-cont{");
document.writeln("		width:987px;");
document.writeln("		height:620px;");
document.writeln("		position:fixed;");
document.writeln("		left:50%;");
document.writeln("		top:50%;");
document.writeln("		margin-top:-310px;");
document.writeln("		margin-left:-493.5px;");
document.writeln("		z-index:1200;");
document.writeln("		display:none;");
document.writeln("	}");
document.writeln("	.fixed-lottery-btn{");
document.writeln("		width:274px;");
document.writeln("		height:63px;");
document.writeln("		position:absolute;");
document.writeln("		left:50%;");
document.writeln("		top:433px;");
document.writeln("		margin-left:-137px;");
document.writeln("		cursor:pointer;");
document.writeln("	}");
document.writeln("	.fixed-lottery-explanation{");
document.writeln("		color:#f8b629;");
document.writeln("		font-size:14px;");
document.writeln("		display:block;");
document.writeln("		width:64px;");
document.writeln("		text-align:center;");
document.writeln("		position:absolute;");
document.writeln("		left:50%;");
document.writeln("		bottom:36px;");
document.writeln("		margin-left:-32px;");
document.writeln("		cursor:pointer;");
document.writeln("	}");
document.writeln(".fixed-lottery-explanation:hover{");
document.writeln("	color:#510808;");
document.writeln("}");
document.writeln("	.fixed-lottery-close{");
document.writeln("		display:block;");
document.writeln("		width:41px;");
document.writeln("		height:41px;");
document.writeln("		cursor:pointer;");
document.writeln("		position:absolute;");
document.writeln("		right:102px;");
document.writeln("		top:57px;");
document.writeln("	}");
document.writeln("	.lottery-wenzi-cont{");
document.writeln("		width:588px;");
document.writeln("		height:273px;");
document.writeln("		position:absolute;");
document.writeln("		left:50%;");
document.writeln("		top:163px;");
document.writeln("		margin-left:-294px;");
document.writeln("		z-index:1400;");
document.writeln("		display:none;");
document.writeln("	}");
document.writeln("	.lottery-wenzi-close{");
document.writeln("		width:16px;");
document.writeln("		height:16px;");
document.writeln("		position:absolute;");
document.writeln("		right:10px;");
document.writeln("		top:52px;");
document.writeln("		cursor:pointer;");
document.writeln("	}");
document.writeln("    </style>");
document.writeln("    <script>");
document.writeln("	/*测试用*/");
document.writeln("window.eventValue = {");
document.writeln("ifEnd:false,//required");
document.writeln("type:\'dazhuanpan\',//required");
document.writeln("delayToshow:0,");
document.writeln("id:\'42776\',");
document.writeln("end:{");
document.writeln("title:\'\',");
document.writeln("btn:\'\'");
document.writeln("},");
document.writeln("again:{");
document.writeln("title:\'\',");
document.writeln("btn:\'\'");
document.writeln("},");
document.writeln("rotate:{");
document.writeln("title1 : \'五一大转盘\',");
document.writeln("title2 : \'赢取留学指导圣经\',");
document.writeln("subTitle : \'抽奖抽到手抽筋！本次活动为回馈广大小站留学考试用户，90%获奖概率！最高可获得北美名校7日游！\',//required");
document.writeln("        	hint : \'温馨提示：已有1245人领取了10元话费，中奖信息每天更新一次。\',//required");
document.writeln("        	price1:\"images/price1.png\",");
document.writeln("        	price2:\"images/price2.png\",");
document.writeln("        	price3:\"images/price3.png\",");
document.writeln("        	price4:\"images/price4.png\",");
document.writeln("        	price5:\"images/price5.png\",");
document.writeln("        	price6:\"images/price6.png\",");
document.writeln("        	price7:\"images/price7.png\",");
document.writeln("        	price8:\"images/price8.png\"");
document.writeln("},");
document.writeln("reward :{");
document.writeln("subtitle1:\'\',");
document.writeln("subtitle2:\'\',");
document.writeln("btn:\'\'");
document.writeln("},");
document.writeln("bindPhone:{");
document.writeln("headtext:{");
document.writeln("h1:\'\',");
document.writeln("h2:\'\',");
document.writeln("h3:\'\',");
document.writeln("h4:\'\'");
document.writeln("}");
document.writeln("},");
document.writeln("loginText:{");
document.writeln("title1:\'\',");
document.writeln("title2:\'\'");
document.writeln("},");
document.writeln("registerText:{");
document.writeln("title1:\'\',");
document.writeln("title2:\'\'");
document.writeln("},");
document.writeln("pluginApiUrl:\"http://zt.zhan.test\"");
document.writeln("}");
document.writeln("window.clue_str=\"5rWL6K+VLS1TQVTogIPor5XmjIfljZctLVNBVC0tMDAxNjU4NQ==\";");
document.writeln("    $(function(){");
document.writeln("	    close_set = setTimeout(\"fixed_lottery()\",10000);");
document.writeln("		$(\".fixed-lottery-explanation\").on(\"click\",function(){");
document.writeln("			$(\".lottery-wenzi-cont\").removeClass(\"zoomOut animated\").addClass(\'bounceIn animated\').show();");
document.writeln("		});");
document.writeln("		$(\".lottery-wenzi-close\").on(\"click\",function(){");
document.writeln("			$(\".lottery-wenzi-cont\").removeClass(\"bounceIn animated\").addClass(\'zoomOut animated\');");
document.writeln("		});");
document.writeln("		$(\".fixed-lottery-close\").on(\"click\",function(){");
document.writeln("			$(\".fixed-lottery\").hide();");
document.writeln("			$(\".fixed-lottery-cont\").removeClass(\"bounceIn animated\").addClass(\'zoomOut animated\').delay(400).hide(function(){});");
document.writeln("			$(\".lottery-wenzi-cont\").removeClass(\"bounceIn animated\").addClass(\'zoomOut animated\').delay(400).hide(function(){});");
document.writeln(" $.get('"+ztGuaGuaLeDisabledUrl+"' );");
document.writeln("		});");
document.writeln("		$(\".fixed-lottery-btn\").on(\"click\",function(){");
document.writeln("			$(\".fixed-lottery\").hide();");
document.writeln("			$(\".fixed-lottery-cont\").removeClass(\"bounceIn animated\").addClass(\'zoomOut animated\').delay(400).hide(function(){});");
document.writeln("			$(\".lottery-wenzi-cont\").removeClass(\"bounceIn animated\").addClass(\'zoomOut animated\').delay(400).hide(function(){});");
document.writeln("		});");
document.writeln("$(\".fixed-lottery-btn\").hover(function(){");
document.writeln("			$(this).children(\"img\").attr(\"src\",\"images/lottery/lottery-btn-hover.png\");");
document.writeln("		},function(){");
document.writeln("			$(this).children(\"img\").attr(\"src\",\"images/lottery/lottery-btn.png\");");
document.writeln("		});");
document.writeln("	});");
document.writeln("	function fixed_lottery(){");
document.writeln("		$(\".fixed-lottery\").show();");
document.writeln("		$(\".fixed-lottery-cont\").addClass(\'bounceIn animated\').show();");
document.writeln("	}");
document.writeln("    </script>");
document.writeln("    <script src=\"http://i.service.zhan.com/register/template?source=6ZmG55CmLS3mir3lpZbkuJPnlKgtLUdNQVQtLTAwMjg5OA==\"></script>");