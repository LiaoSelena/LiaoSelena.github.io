//全局url参数
var urlParam=getUrlParam();
var cmpyId=urlParam.cmpyId;
var parentCmpyId=urlParam.parentCmpyId;
var openId=urlParam.openId;
var parentOpenId=urlParam.parentOpenId;
var communicatorId=urlParam.communicatorId;
var mediaId=urlParam.mediaId;
var level=urlParam.level;
var recordId=urlParam.recordId;
var communicators=urlParam.communicators;
//联营店
var unionCmpyId=urlParam.unionCmpyId;
var employeeId=urlParam.employeeId;
//全局变量
var windowWidth=window.innerWidth;
var windowHeigth=window.innerHeight;
var templateCode;  //皮肤
var sysCommon;  //系统配置链接
var selectCmpyIdQQ;  //客服QQ号码
var selectCmpyIdTel;  //客服联系电话

//隐藏微信菜单
function weixinHideMenu(sysCommon){
	var configUrl = sysCommon.jsticketUrl;
	var search =window.location.href.split('#')[0];
	$(function(){
		$.get(configUrl, { url: search ,cmpyId:-1}, function (result) {
			//初始化js-sdk配置
			wx.config({
			    debug: false,
			    appId: result.appId,
			    timestamp: result.timestamp,
			    nonceStr: result.noncestr,
			    signature: result.signature,
			    jsApiList: []
			})
			wx.ready(function(){
				wx.hideOptionMenu();
			})
		})
	})
}
//获取连接地址后面的参数
function getUrlParam(){var args={};var search=decodeURIComponent(location.search.substring(1));var arr=search.split('&');for(var i=0,len=arr.length;i<len;i++){var t=arr[i].split('=');args[t[0]]=t[1]}return args}
//获取当前不带参数的url
function getUrlNoParam(){var url=window.location.href;var arr=url.split("?");if(arr.length>0){return url.split("?")[0]}return url}
//判断是否为微信浏览器 @return Boolean
function isWeiXin(){var ua=window.navigator.userAgent.toLowerCase();if(ua.match(/MicroMessenger/i)=='micromessenger'){return true}else{return false}}
//同步获取系统配置链接
function getSysCommonUrl(){
	var sysCommon;
	$.ajax({
		type:'get',
		url:'/newmedia/sysCommon/getCommonUrls.action',
		async:false,
		success:function(data){
			if(data) sysCommon=data;
		}
	})
	return sysCommon;
}
/**
 * 获取当前用户ID
 * @return _uid 当前用户ID
 **/
function getUid(){
	var _uid;  //当前用户ID
	//判断如果参数没有带UID，则从当前用户openId调取接口获取当前用户ID
	if(!UID || UID=="undefined" || UID=="null"){
		_uid=ajaxGetData('/newmedia/mobile/wechatAccount/getSoukongAccountIdByOpenId.action?openId='+openId,'get').soukongAccountId;
	}else{
		_uid=UID;
	}
	return _uid;
}
/**
 * MUI图片懒加载
 * 需要在mui.js 后引用 mui.lazyload.js 和  mui.lazyload.img.js
 * @param html 一段HTML字符串 其中<img src=""> 用 <img data-lazyload="" src="默认图片地址"> 代替
 * @param box JS原创的DOM元素。 例如： var box=document.getElementById("box");
 * @param imgSrc 默认图片地址 例如：'image/img_nothing.jpg'
 * @return _uid 当前用户ID
 **/
function lazyLoadMui(html,box,imgSrc){
	//图片懒加载
	var createFragment=function(){
		var fragment=document.createDocumentFragment();
		var div=document.createElement('div');
		div.innerHTML=html;
		fragment.appendChild(div);
		return fragment;
	}
	box.appendChild(createFragment());
	mui(document).imageLazyload({
		placeholder:imgSrc
	})
}
/**
 * 判断是否带parentCmpyId
 * @param cmpyId 企业ID
 * @param async 同步false 异步true
 **/
function checkWechatTemplateCompany(cmpyId,async){
	$.ajax({
		type:'get',
		url:'/newmedia/wechatTemplateCompany/checkWechatTemplateCompany.action',
		async:async,
		data:{'cmpyId':cmpyId},
		success:function(data){
			if(data){
				if(data[0].parentCmpyId){
					parentCmpyId=data[0].parentCmpyId;
				}
			}
		}
	})
}
/**
 * 获取字符串长度，区分汉字和字母数字
 */
function getStrLength(val) {
	var str = new String(val);
	var bytesCount = 0;
	for (var i = 0, n = str.length; i < n; i++) {
		var c = str.charCodeAt(i);
		if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
			bytesCount += 1; // 如果是字母就+1
		} else {
			bytesCount += 2; // 如果你是汉字就+2
		}
	}
	return bytesCount;
}
//底部菜单跳转
function selectCmpyId(){
	var _url;
	$.ajax({
		type:'post',
		url:'/newmedia/mobile/cmpySetting/selectCmpyId.action?cmpyId='+cmpyId,
		success:function(data){
			if(data){
				selectCmpyIdQQ=data.qq;
				selectCmpyIdTel=data.telephone;
				_url=data.url;
				if(data.isDisplayed==1){
					$('#logo_bottom').prepend('<img src="'+data.copyrightUrl+'">');
					$('#logo_bottom img').eq(1).show();
				}
				if(data.isDisplaySupport==0){
					$('#logo_bottom img').eq(0).hide();
					$('#logo_bottom img').eq(1).css({'margin-left':0});
				}else{
					$('#logo_bottom img').eq(0).show();
				}
				$('#logo_bottom img').eq(0).on('tap',function(){
					if(_url){
						window.location=_url;
					}
				})
				$('#logo_bottom img').eq(1).on('tap',function(){
					window.location='/newmedia/pages/mobile/MicroWebsite/Skincommon/WebsiteIframe.html?cmpyId=434&openId='+openId;
				})
			}else{
				$('#logo_bottom img').eq(0).show();
			}
		}
	})
}
//返回顶部
function backToTop(){
	$(document).scroll(function(){
		var scrollTop=$(document).scrollTop();
		if(scrollTop>100){
			$('#to_top').show();	
		}else{
			$('#to_top').fadeOut();		
		}
	})
	$('#to_top').click(function(){
		$('body').animate({scrollTop:0},600);	
	})
}
//loading效果
function loading(){
	var html='<span class="loading_bee"></span>';
	$('#loading').append(html);
}
/**
 * 同步ajax加载获取返回数据json
 * @param strUrl 接口地址
 * @param method get/post
 **/
function ajaxGetData(strUrl,method){
	var result;
	$.ajax({
		type:method,
		url:strUrl,
		async:false,
		dataType:'json',
		success:function(data){
			if(data) result=data;
		}
	})
	return result;
}
/*****底部菜单*****/
//加载底部菜单html
function botHtml(){
	var html='<div class="footer_btn" id="footer_btn">'
			+	'<div class="SK_bottom_point"></div>'
			+	'<section class="center-float-center" id="bottom_0"><span class="icon"></span><span class="menu_text"></span></section>'
			+	'<section class="center-float-center" id="bottom_1"><span class="icon"></span><span class="menu_text"></span></section>'
			+	'<section class="center-float-center" id="bottom_2"><span class="icon"></span><span class="menu_text"></span></section>'
			+	'<div class="SK_bottom_close" id="SK_bottom_close"></div>'
			+'</div>'
			+'<aside class="up_list" id="up_list_0"><ul></ul><div class="triangle_down"></div></aside>'
			+'<aside class="up_list" id="up_list_1"><ul></ul><div class="triangle_down"></div></aside>'
			+'<aside class="up_list" id="up_list_2"><ul></ul><div class="triangle_down"></div></aside>'
			+'<div class="SK_footer_menu_btn" id="SK_footer_menu_btn">'
			+	'<span class="SK_footer_menu_line SK_footer_menu_move_class2" id="SK_footer_menu_line_1"></span>'
			+	'<span class="SK_footer_menu_line SK_footer_menu_move_class" id="SK_footer_menu_line_2"></span>'
			+	'<span class="SK_footer_menu_line SK_footer_menu_move_class2" id="SK_footer_menu_line_3"></span>'
			+'</div>'
	$('#footer_menu').append(html);
}
//加载底部菜单及方法
function botMenu(){
	//判断底部菜单样式
	if(localStorage.getItem('SKbottomOpenKey')=='open'){
		$('#footer_btn').show();
		$('#SK_footer_menu_btn').hide();
	}else{
		$('#footer_btn').hide();
		$('#SK_footer_menu_btn').show();
	}
	if(cmpyId&&openId){
		var getCmpyId;
		if(parentCmpyId){
			getCmpyId=parentCmpyId;
		}else{
			getCmpyId=cmpyId;
		}
		var footerHeigth=$('.footer_btn').height();
		$('#masked_transparent').css({'height':(windowHeigth-footerHeigth)});
		var flagLink0=true;
		var flagLink1=true;
		var flagLink2=true;
		$.ajax({
			type:'get',
			timeout:16000,  //设置16秒超时
			url:'/newmedia/wechatTemplateCompany/getWechatTemplate.action?cmpyId='+getCmpyId,
			success:function(data){
				if(data){
					if(data.header.code=='000'){
						if(data.rows){
							templateCode=data.rows.templateCode;
							if(data.rows.fastMenuList){
								var list_0=data.rows.bottomMenuList[0];
								var list_1=data.rows.bottomMenuList[1];
								var list_2=data.rows.bottomMenuList[2];
								$('#bottom_0 .menu_text').text(list_0.menuName);
								$('#bottom_1 .menu_text').text(list_1.menuName);
								$('#bottom_2 .menu_text').text(list_2.menuName);
								if(list_0.nextLevelWechatTemplateMenu.length>0){
									$('#bottom_0 .icon').show();
									var html='';
									var listMenu_0=list_0.nextLevelWechatTemplateMenu;
									for(var i=0;i<listMenu_0.length;i++){
										var menuName0=listMenu_0[i].menuName;
										menuName0=menuName0.substring(0,5);
										html+='<li class="center-float-center" onclick="linkBottomMenu(\''
										+listMenu_0[i].menuType+'\',\''
										+listMenu_0[i].objectId+'\',\''
										+listMenu_0[i].cmpyId+'\',\''
										+escape(listMenu_0[i].menuContent)+'\',\''
										+menuName0
										+'\')">'+menuName0+'</li>';
									}
									$('#up_list_0 ul').append(html);
								}else{
									flagLink0=false;
									$('#bottom_0').on('tap',function(){
										linkBottomMenu(list_0.menuType,list_0.objectId,list_0.cmpyId,list_0.menuContent,list_0.menuName);
									})
								}
								if(list_1.nextLevelWechatTemplateMenu.length>0){
									$('#bottom_1 .icon').show();
									var html='';
									var listMenu_1=list_1.nextLevelWechatTemplateMenu;
									for(var i=0;i<listMenu_1.length;i++){
										var menuName1=listMenu_1[i].menuName;
										menuName1=menuName1.substring(0,5);
										html+='<li class="center-float-center" onclick="linkBottomMenu(\''
										+listMenu_1[i].menuType+'\',\''
										+listMenu_1[i].objectId+'\',\''
										+listMenu_1[i].cmpyId+'\',\''
										+escape(listMenu_1[i].menuContent)+'\',\''
										+menuName1
										+'\')">'+menuName1+'</li>';
									}
									$('#up_list_1 ul').append(html);
								}else{
									flagLink1=false;
									$('#bottom_1').on('tap',function(){
										linkBottomMenu(list_1.menuType,list_1.objectId,list_1.cmpyId,list_1.menuContent,list_1.menuName);
									})
								}
								if(list_2.nextLevelWechatTemplateMenu.length>0){
									$('#bottom_2 .icon').show();
									var html='';
									var listMenu_2=list_2.nextLevelWechatTemplateMenu;
									for(var i=0;i<listMenu_2.length;i++){
										var menuName2=listMenu_2[i].menuName;
										menuName2=menuName2.substring(0,5);
										html+='<li class="center-float-center" onclick="linkBottomMenu(\''
										+listMenu_2[i].menuType+'\',\''
										+listMenu_2[i].objectId+'\',\''
										+listMenu_2[i].cmpyId+'\',\''
										+escape(listMenu_2[i].menuContent)+'\',\''
										+menuName2
										+'\')">'+menuName2+'</li>';
									}
									$('#up_list_2 ul').append(html);
								}else{
									flagLink2=false;
									$('#bottom_2').on('tap',function(){
										linkBottomMenu(list_2.menuType,list_2.objectId,list_2.cmpyId,list_2.menuContent,list_2.menuName);
									})
								}
							}else{
								$('#footer_menu').hide();
							}
						}
					}
				}
			},
			complete:function(XMLHttpRequest,status){
				if(status=='timeout'){
					mui.confirm('网络超时了，刷新试试？','提示',['否', '刷新'],function(e){
						if(e.index==1)location.reload();
					})
				}
			}
		})
		//点击底部菜单弹出子菜单
		var flag_0=0,flag_1=0,flag_2=0;
		$('#bottom_0').on('tap',function(){
		    if(flagLink0){
		    	if(flag_0==0){
			        $('#masked_transparent').show();
			        $('.up_list').hide();
			        flag_1=0;
			        flag_2=0;
			        flag_0=1;
			        $('#up_list_0').show();
			        $('#up_list_0').addClass('run_bottom_menu')
			    }else{
			        $('#masked_transparent').hide();
			        $('.up_list').hide();
			        flag_0=0;
			    }
		    }
		})
		$('#bottom_1').on('tap',function(){
			if(flagLink1){
				if(flag_1==0){
			        $('#masked_transparent').show();
			        $('.up_list').hide();
			        flag_0=0;
			        flag_2=0;
			        flag_1=1;
			        $('#up_list_1').show();
			        $('#up_list_1').addClass('run_bottom_menu')
			    }else{
			        $('#masked_transparent').hide();
			        $('.up_list').hide();
			        flag_1=0;
			    }
			}
		})
		$('#bottom_2').on('tap',function(){
			if(flagLink2){
				if(flag_2==0){
			        $('#masked_transparent').show();
			        $('.up_list').hide();
			        flag_0=0;
			        flag_1=0;
			        flag_2=1;
			        $('#up_list_2').show();
			        $('#up_list_2').addClass('run_bottom_menu')
			    }else{
			        $('#masked_transparent').hide();
			        $('.up_list').hide();
			        flag_2=0;
			    }
			}
		})
		//点击透明蒙版收起子菜单
		$('#masked_transparent').on('touchend',function(event){
			$('.up_list').hide();$(this).hide();flag_0=0;flag_1=0;flag_2=0;
			event.preventDefault();
		})
		//点击底部菜单关闭按钮
		$('#SK_bottom_close').on('click',function(){
			//设置本地储存
			localStorage.setItem('SKbottomOpenKey', 'close');
			$('.up_list').hide();$('#masked_transparent').hide();flag_0=0;flag_1=0;flag_2=0;
			$('#footer_btn').hide();
			$('#SK_footer_menu_btn').show();
			$('#SK_footer_menu_line_1').addClass('SK_footer_menu_move_class2');
			$('#SK_footer_menu_line_2').addClass('SK_footer_menu_move_class');
			$('#SK_footer_menu_line_3').addClass('SK_footer_menu_move_class2');
			$('#SK_footer_menu_btn').css({'width':'1rem','left':'50%','margin-left':'-0.5rem','border-radius':'1rem'});
			$('#SK_footer_menu_line_2').css({'width':'0.48rem'},600);
		})
		//点击底部菜单打开按钮
		$('#SK_footer_menu_btn').on('click',function(){
			//设置本地储存
			localStorage.setItem('SKbottomOpenKey', 'open');
			$('#SK_footer_menu_line_1').removeClass('SK_footer_menu_move_class2');
			$('#SK_footer_menu_line_2').removeClass('SK_footer_menu_move_class');
			$('#SK_footer_menu_line_3').removeClass('SK_footer_menu_move_class2');
			$('#SK_footer_menu_btn').animate({'width':'100%','left':'0','margin-left':'0','border-radius':'0'},600);
			$('#SK_footer_menu_line_2').animate({'width':'0.1rem'},600);
			setTimeout(function(){
				$('#SK_footer_menu_btn').hide();
				$('#footer_btn').show();
			},600)
		})
	}
}

/**
 * 底部菜单跳转链接
 * @param menuType 菜单类型
 * @param objectId 参数ID
 * @param paramCmpyId 参数带的cmpyId
 * @param menuContent 菜单内容
 * @param menuName 菜单名字
 **/
function linkBottomMenu(menuType,objectId,paramCmpyId,menuContent,menuName){
	menuContent=unescape(menuContent);
	menuType=parseInt(menuType);
	switch(menuType){
		//企业
		case 1:  //软文详情
			if(parentCmpyId){
				window.location='/newmedia/pages/mobile/MicroWebsite/articDetail.html?mediaId='+objectId+'&cmpyId='+paramCmpyId+'&parentCmpyId='+parentCmpyId+'&openId='+openId+'&level=0';
			}else{
				window.location='/newmedia/pages/mobile/MicroWebsite/articDetail.html?mediaId='+objectId+'&cmpyId='+paramCmpyId+'&openId='+openId+'&level=0';
			}
			break;
		case 2:  //软文列表
			if(parentCmpyId){
				window.location='/newmedia/pages/mobile/MicroWebsite/'+templateCode+'/articList.html?itemcontent='+menuName+'&cmpyId='+paramCmpyId+'&parentCmpyId='+parentCmpyId+'&openId='+openId+'&tabCategory='+objectId;
			}else{
				window.location='/newmedia/pages/mobile/MicroWebsite/'+templateCode+'/articList.html?itemcontent='+menuName+'&cmpyId='+paramCmpyId+'&openId='+openId+'&tabCategory='+objectId;
			}
			break;
		case 3:  //活动列表
			if(parentCmpyId){
				window.location='/newmedia/pages/mobile/MicroWebsite/'+templateCode+'/activityList.html?itemcontent='+menuName+'&cmpyId='+paramCmpyId+'&parentCmpyId='+parentCmpyId+'&openId='+openId;
			}else{
				window.location='/newmedia/pages/mobile/MicroWebsite/'+templateCode+'/activityList.html?itemcontent='+menuName+'&cmpyId='+paramCmpyId+'&openId='+openId;
			}
			break;
		case 4:  //免费试用列表
			if(parentCmpyId){
				window.location='/newmedia/pages/mobile/MicroWebsite/'+templateCode+'/freeTrialList.html?itemcontent='+menuName+'&cmpyId='+paramCmpyId+'&parentCmpyId='+parentCmpyId+'&openId='+openId;
			}else{
				window.location='/newmedia/pages/mobile/MicroWebsite/'+templateCode+'/freeTrialList.html?itemcontent='+menuName+'&cmpyId='+paramCmpyId+'&openId='+openId;
			}
			break;
		case 6:  //自己输入的链接
			var strUrl;
			if(parentCmpyId){
				menuContent.indexOf("?")>-1?strUrl=menuContent+"&parentCmpyId="+parentCmpyId:strUrl=menuContent+"?parentCmpyId="+parentCmpyId;
			}
			menuContent.indexOf("?")>-1?strUrl=menuContent:strUrl=menuContent+"?";
			if( menuContent.indexOf("mediaIndex.html")>-1||
				menuContent.indexOf("Microdoor_index.html")>-1||
				menuContent.indexOf("moments.html")>-1||
				menuContent.indexOf("articDetail.html")>-1||
				menuContent.indexOf("Microdoor_nav.html")>-1||
				menuContent.indexOf("SocialSecurity.html")>-1||
				menuContent.indexOf("Rehabilitation.html")>-1||
				menuContent.indexOf("Educational.html")>-1||
				menuContent.indexOf("PetitionRights.html")>-1||
				menuContent.indexOf("Employment.html")>-1){
				strUrl=strUrl+'&cmpyId='+paramCmpyId+'&openId='+openId;							
				window.location=strUrl;
			}else if(menuContent.indexOf("futureStore")>-1||menuContent.indexOf("outFrame=1")>-1){
				strUrl=strUrl+'&openId='+openId;
				window.location=strUrl;
			}else{
				window.location=menuContent;
			}
			break;
		case 7:  //个人中心
			var sysCommon=getSysCommonUrl();
			if(parentCmpyId){
				var _url=sysCommon.serverHostUrl+'/newmedia/pages/mobile/MicroWebsite/PersonalCenter/personelIndex.html?cmpyId='+paramCmpyId+'&parentCmpyId='+parentCmpyId;
				window.location=sysCommon.silentAuthUrl+'?returnUrl='+encodeURIComponent(_url)+'&cmpyId='+paramCmpyId+'&parentCmpyId='+parentCmpyId;
			}else{
				var _url=sysCommon.serverHostUrl+'/newmedia/pages/mobile/MicroWebsite/PersonalCenter/personelIndex.html?cmpyId='+paramCmpyId;
				window.location=sysCommon.silentAuthUrl+'?returnUrl='+encodeURIComponent(_url)+'&cmpyId='+paramCmpyId;
			}
			break;
		case 8:  //自己输入的链接
			if(parentCmpyId){
				window.location=menuContent+'&parentCmpyId='+parentCmpyId;
			}else{
				window.location=menuContent;
			}
			break;
		case 9:  //微网首页
			if(parentCmpyId){
				window.location='/newmedia/pages/mobile/MicroWebsite/'+templateCode+'/WebsiteIframe.html?cmpyId='+paramCmpyId+'&parentCmpyId='+parentCmpyId+'&openId='+openId;
			}else{
				window.location='/newmedia/pages/mobile/MicroWebsite/'+templateCode+'/WebsiteIframe.html?cmpyId='+paramCmpyId+'&openId='+openId;
			}
			break;
		case 10:  //微门户首页
			if(parentCmpyId){
				window.location='/newmedia/pages/mobile/MicroWebsite/Microdoor_index.html?cmpyId='+paramCmpyId+'&parentCmpyId='+parentCmpyId+'&openId='+openId;
			}else{
				window.location='/newmedia/pages/mobile/MicroWebsite/Microdoor_index.html?cmpyId='+paramCmpyId+'&openId='+openId;
			}
			break;
		case 11:  //微门户导航
			if(parentCmpyId){
				window.location='/newmedia/pages/mobile/MicroWebsite/Microdoor_nav.html?cmpyId='+paramCmpyId+'&parentCmpyId='+parentCmpyId+'&openId='+openId;
			}else{
				window.location='/newmedia/pages/mobile/MicroWebsite/Microdoor_nav.html?cmpyId='+paramCmpyId+'&openId='+openId;
			}
			break;
		case 12:  //蜂巢朋友圈
			if(parentCmpyId){
				window.location='/newmedia/pages/mobile/MicroWebsite/moments.html?cmpyId='+paramCmpyId+'&parentCmpyId='+parentCmpyId+'&openId='+openId;
			}else{
				window.location='/newmedia/pages/mobile/MicroWebsite/moments.html?cmpyId='+paramCmpyId+'&openId='+openId;
			}
			break;
		case 13:  //投票
			if(parentCmpyId){
				window.location='/newmedia/pages/mobile/MicroWebsite/vote.html?voteId='+objectId+'&cmpyId='+paramCmpyId+'&parentCmpyId='+parentCmpyId+'&openId='+openId;
			}else{
				window.location='/newmedia/pages/mobile/MicroWebsite/vote.html?voteId='+objectId+'&cmpyId='+paramCmpyId+'&openId='+openId;
			}
			break;
		case 14:  //客服
			if(parentCmpyId){
				window.location='/newmedia/pages/mobile/MicroWebsite/service.html?cmpyId='+paramCmpyId+'&parentCmpyId='+parentCmpyId+'&openId='+openId;
			}else{
				window.location='/newmedia/pages/mobile/MicroWebsite/service.html?cmpyId='+paramCmpyId+'&openId='+openId;
			}
			break;
		//个人
		case 15:  //我的原创
			if(parentCmpyId){
				window.location='/newmedia/pages/mobile/MicroWebsite/PersonalCenter/Original.html?cmpyId='+paramCmpyId+'&parentCmpyId='+parentCmpyId+'&openId='+openId;
			}else{
				window.location='/newmedia/pages/mobile/MicroWebsite/PersonalCenter/Original.html?cmpyId='+paramCmpyId+'&openId='+openId;
			}
			break;
		case 16:  //我的圈子
			if(parentCmpyId){
				window.location='/newmedia/pages/mobile/MicroWebsite/myShare.html?cmpyId='+paramCmpyId+'&parentCmpyId='+parentCmpyId+'&openId='+openId;
			}else{
				window.location='/newmedia/pages/mobile/MicroWebsite/myShare.html?cmpyId='+paramCmpyId+'&openId='+openId;
			}
			break;
		case 17:  //精品导读列表
			if(parentCmpyId){
				window.location='/newmedia/pages/mobile/MicroWebsite/PersonalCenter/Introduction_list.html?cmpyId='+paramCmpyId+'&parentCmpyId='+parentCmpyId+'&openId='+openId;
			}else{
				window.location='/newmedia/pages/mobile/MicroWebsite/PersonalCenter/Introduction_list.html?cmpyId='+paramCmpyId+'&openId='+openId;
			}
			break;
		case 18:  //个人名片
			if(parentCmpyId){
				window.location='/newmedia/pages/mobile/MicroWebsite/PersonalCenter/Mycard.html?cmpyId='+paramCmpyId+'&parentCmpyId='+parentCmpyId+'&openId='+openId;
			}else{
				window.location='/newmedia/pages/mobile/MicroWebsite/PersonalCenter/Mycard.html?cmpyId='+paramCmpyId+'&openId='+openId;
			}
			break;
		case 19:  //企业微网首页
			if(parentCmpyId){
				window.location='/newmedia/pages/mobile/MicroWebsite/'+templateCode+'/WebsiteIframe.html?cmpyId='+paramCmpyId+'&parentCmpyId='+parentCmpyId+'&openId='+openId;
			}else{
				window.location='/newmedia/pages/mobile/MicroWebsite/'+templateCode+'/WebsiteIframe.html?cmpyId='+paramCmpyId+'&openId='+openId;
			}
			break;
		case 20:  //个人店铺首页
			if(parentCmpyId){
				window.location='/newmedia/pages/mobile/MicroWebsite/personalShop/index.html?cmpyId='+paramCmpyId+'&parentCmpyId='+parentCmpyId+'&openId='+openId+'&shopcmpyId='+paramCmpyId;
			}else if(urlParam.FUID){
				window.location='/newmedia/pages/mobile/MicroWebsite/personalShop/index.html?cmpyId='+paramCmpyId+'&openId='+openId+'&shopcmpyId='+paramCmpyId+'&UID=&FUID='+urlParam.FUID;
			}else{
				window.location='/newmedia/pages/mobile/MicroWebsite/personalShop/index.html?cmpyId='+paramCmpyId+'&openId='+openId+'&shopcmpyId='+paramCmpyId;
			}
			break;
		case 23:  //软文详情
			if(parentCmpyId){
				window.location='/newmedia/pages/mobile/MicroWebsite/articDetail.html?mediaId='+objectId+'&cmpyId='+paramCmpyId+'&parentCmpyId='+parentCmpyId+'&openId='+openId+'&level=0';
			}else{
				window.location='/newmedia/pages/mobile/MicroWebsite/articDetail.html?mediaId='+objectId+'&cmpyId='+paramCmpyId+'&openId='+openId+'&level=0';
			}
			break;
		case 24:  //精品导读详情
			if(parentCmpyId){
				window.location='/newmedia/pages/mobile/MicroWebsite/PersonalCenter/Introduction.html?Id='+objectId+'&cmpyId='+paramCmpyId+'&parentCmpyId='+parentCmpyId+'&openId='+openId;
			}else{
				window.location='/newmedia/pages/mobile/MicroWebsite/PersonalCenter/Introduction.html?Id='+objectId+'&cmpyId='+paramCmpyId+'&openId='+openId;
			}
			break;
		case 25:  //自己输入的链接
			if(menuContent.indexOf('http://')==-1){
				if(menuContent.indexOf('https://')==-1){
					menuContent='http://'+menuContent;
				}
			}
			if(parentCmpyId){
				window.location='/newmedia/pages/mobile/MicroWebsite/iframe.html?iframe='+encodeURI(menuContent)+'&cmpyId='+paramCmpyId+'&title='+menuName+'&parentCmpyId='+parentCmpyId;
			}else{
				window.location='/newmedia/pages/mobile/MicroWebsite/iframe.html?iframe='+encodeURI(menuContent)+'&cmpyId='+paramCmpyId+'&title='+menuName;
			}
			break;
		case 26:  //个人微网首页
			if(parentCmpyId){
				window.location='/newmedia/pages/mobile/MicroWebsite/index.html?cmpyId='+paramCmpyId+'&parentCmpyId='+parentCmpyId+'&openId='+openId;
			}else{
				window.location='/newmedia/pages/mobile/MicroWebsite/index.html?cmpyId='+paramCmpyId+'&openId='+openId;
			}
			break;
		case 27:  //邀请代言人
			var sysCommon=getSysCommonUrl();
			if(parentCmpyId){
				var _url=sysCommon.serverHostUrl+'/newmedia/pages/mobile/propaganda/agreeForwardTG.html?cmpyId='+paramCmpyId+'&parentCmpyId='+parentCmpyId+'&belongCommunicatorId='+objectId;
				window.location=sysCommon.silentAuthUrl+'?returnUrl='+encodeURIComponent(_url)+'&cmpyId='+paramCmpyId+'&parentCmpyId='+parentCmpyId;
			}else{
				var _url=sysCommon.serverHostUrl+'/newmedia/pages/mobile/propaganda/agreeForwardTG.html?cmpyId='+paramCmpyId+'&belongCommunicatorId='+objectId;
				window.location=sysCommon.silentAuthUrl+'?returnUrl='+encodeURIComponent(_url)+'&cmpyId='+paramCmpyId;
			}
			break;
		case 28:  //直播列表
			if(parentCmpyId){
				window.location='/newmedia/pages/mobile/MicroWebsite/livebroadcast/livelist.html?cmpyId='+paramCmpyId+'&parentCmpyId='+parentCmpyId+'&openId='+openId;
			}else{
				window.location='/newmedia/pages/mobile/MicroWebsite/livebroadcast/livelist.html?cmpyId='+paramCmpyId+'&openId='+openId;
			}
			break;
		case 29:  //地图展示
			if(parentCmpyId){
				window.location = '/newmedia/pages/mobile/MicroWebsite/journeyVillage/mapdisplay.html?cmpyId='+paramCmpyId+'&openId='+openId+'&parentCmpyId='+parentCmpyId;
			}else{
				window.location = '/newmedia/pages/mobile/MicroWebsite/journeyVillage/mapdisplay.html?cmpyId='+paramCmpyId+'&openId='+openId;
			}
			break;
		case 30:  //紫薇树品种列表
			if(parentCmpyId){
				window.location='/newmedia/pages/mobile/MicroWebsite/journeyVillage/productList.html?cmpyId='+paramCmpyId+'&openId='+openId+'&parentCmpyId='+parentCmpyId;
			}else{
				window.location='/newmedia/pages/mobile/MicroWebsite/journeyVillage/productList.html?cmpyId='+paramCmpyId+'&openId='+openId;
			}
			break;
		case 31:  //监控点
			if(parentCmpyId){
				window.location='/newmedia/pages/mobile/MicroWebsite/livebroadcast/livelist_zu.html?cmpyId='+paramCmpyId+'&openId='+openId+'&parentCmpyId='+parentCmpyId;
			}else{
				window.location='/newmedia/pages/mobile/MicroWebsite/livebroadcast/livelist_zu.html?cmpyId='+paramCmpyId+'&openId='+openId;
			}
			break;
		case 32:  //停车场
			if(parentCmpyId){
				window.location='/newmedia/pages/mobile/MicroWebsite/parking/index.html?cmpyId='+paramCmpyId+'&openId='+openId+'&parentCmpyId='+parentCmpyId;
			}else{
				window.location='/newmedia/pages/mobile/MicroWebsite/parking/index.html?cmpyId='+paramCmpyId+'&openId='+openId;
			}
			break;
	}
}
/**
 * 微信分享
 * @param sysCommon 获取系统url集合
 * @param cmpyId 企业ID
 * @param forwardUrl 获取跳转需要微信授权的url(用来获取当前用户openId)
 * @param title 分享标题
 * @param desc 分享到朋友的描述
 * @param imgUrl 分享图标
 **/
function weixinShare(sysCommon,cmpyId,forwardUrl,title,desc,imgUrl){
	var search=window.location.href.split('#')[0];
	var configUrl=sysCommon.jsticketUrl;  //获取系统url集合中用于微信的action
	var result;
	//同步获取微信验证集
	$.ajax({
		type:'get',
		url:configUrl,
		data:{url:search,cmpyId:cmpyId},
		async:false,
		success:function(data){
			if(data) result=data;
		}
	})
	//注入权限验证配置
	wx.config({
	    debug:false,  //true 为开启调试模式
	    appId:result.appId,
	    timestamp:result.timestamp,
	    nonceStr:result.noncestr,
	    signature:result.signature,
	    jsApiList:['checkJsApi','onMenuShareAppMessage','onMenuShareTimeline']
	})
	//通过ready接口处理成功验证
	wx.ready(function(){
       	//分享到朋友圈
       	wx.onMenuShareTimeline({
          	title:title,
          	link:forwardUrl,
          	imgUrl:imgUrl,
          	success:function(){
          		mui.toast('分享成功！');
          	},
          	cancel:function(){ 
          		mui.toast('分享取消！');
           	}
      	})
       	//分享到朋友
       	wx.onMenuShareAppMessage({
    	  	title:title,
          	desc:desc,
          	link:forwardUrl,
          	imgUrl:imgUrl,
          	success:function(){
          		
          	},
      		cancel:function(){ 
      			mui.toast('分享取消！');
          	}
        })
    })
}
/**
 * 微信分享调取接口记录
 * @param sysCommon 获取系统url集合
 * @param forwardUrl 获取跳转需要微信授权的url(用来获取当前用户openId)
 * @param cmpyId 企业ID
 * @param mediaId 媒体ID
 * @param title 分享标题
 * @param desc 分享到朋友的描述
 * @param imgUrl 分享图标
 * @param mediaType 媒体类型
 * @param readLogId 传播标志
 * @param currentLevel 当前传播层级
 * @param openId 当前用户ID
 * @param parentOpenId 上一级用户ID
 * @param recordId 传播ID
 * @param communicators 是否是传播者标志  （非必须参数）
 * @param type 类型  （0->软文标志）
 **/
//微信分享
function weixinRecord(sysCommon,forwardUrl,cmpyId,mediaId,title,desc,imgUrl,mediaType,readLogId,currentLevel,openId,parentOpenId,recordId,communicators,type){
	var startTime=new Date().getTime();
	var search=window.location.href.split('#')[0];
	var configUrl=sysCommon.jsticketUrl;  //获取系统url集合中用于微信的action
	var result;
	//同步获取微信验证集
	$.ajax({
		type:'get',
		url:configUrl,
		data:{url:search,cmpyId:cmpyId},
		async:false,
		success:function(data){
			if(data) result=data;
		}
	})
	//注入权限验证配置
	wx.config({
	    debug:false,  //true 为开启调试模式
	    appId:result.appId,
	    timestamp:result.timestamp,
	    nonceStr:result.noncestr,
	    signature:result.signature,
	    jsApiList:['checkJsApi','onMenuShareAppMessage','onMenuShareTimeline']
	})
	//通过ready接口处理成功验证
	wx.ready(function(){
       	//分享到朋友圈
       	wx.onMenuShareTimeline({
          	title:title,
          	link:forwardUrl,
          	imgUrl:imgUrl,
          	success:function(){
          		var pageData={
					'forwardId':parseInt(mediaId),
					'companyId':parseInt(cmpyId),
					'level':currentLevel,
					'openId':openId,
					'opid':parentOpenId,
					'forwardType':mediaType,
					'type':type,
					'readTime':startTime,
					'duration':new Date().getTime()-startTime,
					'readLogId':readLogId,
					'recordId':recordId,
					'shareUrl':forwardUrl
				}
				//如果传播者openId不为空，将参数传至接口
				if(communicators){
					pageData={
						'forwardId':parseInt(mediaId),
						'companyId':parseInt(cmpyId),
						'level':currentLevel,
						'openId':openId,
						'opid':parentOpenId,
						'forwardType':mediaType,
						'type':type,
						'readTime':startTime,
						'duration':new Date().getTime()-startTime,
						'readLogId':readLogId,
						'recordId':recordId,
						'shareUrl':forwardUrl,
						'communicators':communicators
					}
				}
              	$.ajax({
					type:'post',
					contentType:'application/json; charset=utf-8',
					url:'/newmedia/mobile/forward/to.action',
					cache:false,
					data:(JSON.stringify(pageData)),
					dataType:'json',
					async:true,
					success:function(data){}
				})
              	mui.toast('分享成功！');
          	},
          	cancel:function(){ 
          		mui.toast('分享取消！');
           	}
      	})
       	//分享到朋友
       	wx.onMenuShareAppMessage({
    	  	title:title,
          	desc:desc,
          	link:forwardUrl,
          	imgUrl:imgUrl,
          	success:function(){
          		
          	},
      		cancel:function(){ 
      			mui.toast('分享取消！');
          	}
        })
    })
}
/*****点赞，喜欢，收藏*****/
//点赞，喜欢，收藏+html
function actionHtml(){
	var html='<dl class="top-lr-scatter">'
			+	'<dd class="tbc-lr-scatter" id="icon_praise"><i class="fa"></i><span class="arial" id="praise"></span></dt>'
			+	'<dd class="tbc-lr-scatter" id="icon_love"><i class="fa"></i></dt>'
			+	'<dd class="tbc-lr-scatter" id="icon_collect"><i class="fa"></i></dt>'
			+	'<dd class="tbc-lr-scatter" id="icon_share"><i></i></dt>'
			+'</dl>'
			+'<div class="center-float-right" id="go_comment"><span>写评论</span><i class="fa fa-pencil"></i></div>';
	$('#action_sign_up').append(html);
}
/**
 * 点赞，喜欢，收藏+数据
 * @param rsType 0->软文 1->活动
 * @param rsId 媒体id
 **/
function actionData(rsType,rsId){
	$('#action_sign_up').css({'display':'flex'});
	//获取点赞数字
	$.ajax({
		type:'post',
		url:'/newmedia/common/resource/queryResourcePraiseCount.action',
		data:JSON.stringify({rsType:rsType,rsId:rsId}),
		contentType:'application/json',
		success:function(data){
			if(data){
				$('#praise').text(data);
			}else{
				$('#praise').text(0);
			}
		}
	})
	//获取是否点赞
	$.ajax({
		type:'post',
		url:'/newmedia/common/resource/queryResourcePraiseExist.action',
		data:JSON.stringify({rsType:rsType,rsId:rsId,openId:openId}),
		contentType:'application/json',
		success:function(data){
			if(data){;
				if(data.status=='EXIST'){
					$('#icon_praise i').addClass('fa-thumbs-up');
				}else{
					$('#icon_praise i').addClass('fa-thumbs-o-up');
				}
			}
		}
	})
	//获取是否喜欢
	$.ajax({
		type:'post',
		url:'/newmedia/common/resource/queryResourceLoveExist.action',
		data:JSON.stringify({rsType:rsType,rsId:rsId,openId:openId}),
		contentType:'application/json',
		success:function(data){
			if(data){;
				if(data.status=='EXIST'){
					$('#icon_love i').addClass('fa-heart');
				}else{
					$('#icon_love i').addClass('fa-heart-o');
				}
			}
		}
	})
	//获取是否收藏
	$.ajax({
		type:'post',
		url:'/newmedia/common/resource/queryResourceCollectionExist.action',
		data:JSON.stringify({rsType:rsType,rsId:rsId,openId:openId}),
		contentType:'application/json',
		success:function(data){
			if(data){;
				if(data.status=='EXIST'){
					$('#icon_collect i').addClass('fa-star');
				}else{
					$('#icon_collect i').addClass('fa-star-o');
				}
			}
		}
	})
}
/**
 * 点赞，喜欢，收藏+行为
 * @param rsType 0->软文 1->活动
 * @param rsId 媒体id
 * @param rsTitle 媒体标题
 **/
function actionEvent(rsType,rsId,rsTitle){
	//点赞
	$('#icon_praise').on('tap',function(){
		if($('#icon_praise i').hasClass('fa-thumbs-up')){
			//取消点赞
			$.ajax({
				type:'post',
				url:'/newmedia/common/resource/cancelResourcePraise.action',
				data:JSON.stringify({cmpyId:cmpyId,openId:openId,praise:1,rsId:rsId,rsTitle:rsTitle,rsType:rsType}),
				contentType:'application/json',
				success:function(data){
					if(data){;
						if(data.status=='YES'){
							$('#icon_praise i').addClass('fa-thumbs-o-up');
							$('#icon_praise i').removeClass('fa-thumbs-up');
							var _text=$('#praise').text();
							$('#praise').text(parseInt(_text)-1);
							mui.toast('亲，已取消点赞啦！');
						}
					}
				}
			})
		}else{
			//增加点赞
			$.ajax({
				type:'post',
				url:'/newmedia/common/resource/addResourcePraise.action',
				data:JSON.stringify({cmpyId:cmpyId,openId:openId,praise:1,rsId:rsId,rsTitle:rsTitle,rsType:rsType}),
				contentType:'application/json',
				success:function(data){
					if(data){;
						if(data.status=='YES'){
							$('#icon_praise i').addClass('fa-thumbs-up');
							$('#icon_praise i').removeClass('fa-thumbs-o-up');
							var _text=$('#praise').text();
							$('#praise').text(parseInt(_text)+1);
							mui.toast('亲，谢谢您的点赞！');
						}
					}
				}
			})
		}
	})
	//喜欢
	$('#icon_love').on('tap',function(){
		if($('#icon_love i').hasClass('fa-heart')){
			//取消喜欢
			$.ajax({
				type:'post',
				url:'/newmedia/common/resource/cancelResourceLove.action',
				data:JSON.stringify({cmpyId:cmpyId,openId:openId,love:1,rsId:rsId,rsTitle:rsTitle,rsType:rsType}),
				contentType:'application/json',
				success:function(data){
					if(data){;
						if(data.status=='YES'){
							$('#icon_love i').addClass('fa-heart-o');
							$('#icon_love i').removeClass('fa-heart');
							mui.toast('亲，已取消喜欢！');
						}
					}
				}
			})
		}else{
			//增加喜欢
			$.ajax({
				type:'post',
				url:'/newmedia/common/resource/addResourceLove.action',
				data:JSON.stringify({cmpyId:cmpyId,openId:openId,love:1,rsId:rsId,rsTitle:rsTitle,rsType:rsType}),
				contentType:'application/json',
				success:function(data){
					if(data){;
						if(data.status=='YES'){
							$('#icon_love i').addClass('fa-heart');
							$('#icon_love i').removeClass('fa-heart-o');
							mui.toast('亲，已添加到我的喜欢！');
						}
					}
				}
			})
		}
	})
	//收藏
	$('#icon_collect').on('tap',function(){
		var _url=window.location.href;
		if($('#icon_collect i').hasClass('fa-star')){
			//取消收藏
			$.ajax({
				type:'post',
				url:'/newmedia/common/resource/cancelResourceCollection.action',
				data:JSON.stringify({cmpyId:cmpyId,openId:openId,rsLink:_url,rsId:rsId,rsTitle:rsTitle,rsType:rsType}),
				contentType:'application/json',
				success:function(data){
					if(data){;
						if(data.status=='YES'){
							$('#icon_collect i').addClass('fa-star-o');
							$('#icon_collect i').removeClass('fa-star');
							mui.toast('亲，已取消收藏！');
						}
					}
				}
			})
		}else{
			//增加收藏
			$.ajax({
				type:'post',
				url:'/newmedia/common/resource/addResourceCollection.action',
				data:JSON.stringify({cmpyId:cmpyId,openId:openId,rsLink:_url,rsId:rsId,rsTitle:rsTitle,rsType:rsType}),
				contentType:'application/json',
				success:function(data){
					if(data){;
						if(data.status=='YES'){
							$('#icon_collect i').addClass('fa-star');
							$('#icon_collect i').removeClass('fa-star-o');
							mui.toast('亲，已添加到我的收藏！');
						}
					}
				}
			})
		}
	})
	//分享
	$('#icon_share').on('click',function(){
		$('#share_img').show();
		setTimeout(function(){
			$('#share_img').on('click',function(){
				$(this).hide();
			})
		},500)
	})
	//去评论
	$('#go_comment').on('tap',function(){
		var param='?mediaId='+rsId+'&cmpyId='+cmpyId+'&type='+rsType+'&openId='+openId;
		if(parentCmpyId){
			window.location='/newmedia/pages/mobile/MicroWebsite/Skinfirst/postComment.html'+param+'&parentCmpyId='+parentCmpyId;
		}else{
			window.location='/newmedia/pages/mobile/MicroWebsite/Skinfirst/postComment.html'+param;
		}
	})
}
//个人店铺蜜蜂层html
function honeybeeHtml(){
	var html='<div class="honeybee_btn">'
			+	'<img class="btn_img" src="image/gd_fsmenu.png" />'
			+'</div>'
			+'<div style="display:none;" class="honeybee_box w100">'
			+	'<div class="pt40 pb40 w100 rgbabg78">'
			+		'<ul class="left-float-top">'
			+			'<a id="linkToIndex"><li class="mui-text-center">'
			+				'<img class="img102" src="image/shouye.png" />'
			+				'<p class="ft28 color-333">首页</p>'
			+			'</li></a>'
			+			'<a id="linkToFindings"><li class="mui-text-center">'
			+				'<img class="img102" src="image/find.png" />'
			+				'<p class="ft28 color-333">发现</p>'
			+			'</li></a>'
			+			'<a id="linkToShoppingCart"><li class="mui-text-center">'
			+				'<img class="img102" src="image/cart.png" />'
			+				'<p class="ft28 color-333">购物车</p>'
			+			'</li></a>'
			+		'</ul>'
			+	'</div>'
			+	'<div id="icno-wrong" class="pt35 pb35 center-float-center bg-ff">'
			+		'<img class="icno-wrong33" src="image/close.png" />'
			+	'</div>'
			+'</div>';
	$('#SK_personal_shop_btn').append(html);
	$(".honeybee_btn").on('click',function(){
		$(".honeybee_box").fadeIn();
		$(".honeybee_btn").hide();
	})
	$("#icno-wrong").on('tap',function(){
		$(".honeybee_box").fadeOut();
		$(".honeybee_btn").show();
	})
	//跳转到首页
	$('#linkToIndex').on('click',function(){
		if(urlParam.FUID){
			window.location='/newmedia/pages/mobile/MicroWebsite/personalShop/index.html?cmpyId='+urlParam.shopcmpyId+'&openId='+urlParam.openId+'&shopcmpyId='+urlParam.shopcmpyId+'&UID=&FUID='+urlParam.FUID;
		}else{
			window.location='/newmedia/pages/mobile/MicroWebsite/personalShop/index.html?cmpyId='+urlParam.shopcmpyId+'&openId='+urlParam.openId+'&shopcmpyId='+urlParam.shopcmpyId;
		}
	})
	//跳转到发现
	$('#linkToFindings').on('click',function(){
		if(urlParam.FUID){
			window.location='/newmedia/pages/mobile/MicroWebsite/personalShop/findings.html?cmpyId='+urlParam.shopcmpyId+'&openId='+urlParam.openId+'&shopcmpyId='+urlParam.shopcmpyId+'&UID=&FUID='+urlParam.FUID;
		}else{
			window.location='/newmedia/pages/mobile/MicroWebsite/personalShop/findings.html?cmpyId='+urlParam.shopcmpyId+'&openId='+urlParam.openId+'&shopcmpyId='+urlParam.shopcmpyId;
		}
	})
	//跳转到购物车
	$('#linkToShoppingCart').on('click',function(){
		if(urlParam.FUID){
			window.location='/newmedia/pages/mobile/MicroWebsite/personalShop/shoppingCart.html?cmpyId='+urlParam.shopcmpyId+'&openId='+openId+'&UID=&FUID='+urlParam.FUID+'&shopcmpyId='+urlParam.shopcmpyId;
		}else{
			window.location='/newmedia/pages/mobile/MicroWebsite/personalShop/shoppingCart.html?cmpyId='+urlParam.shopcmpyId+'&openId='+openId+'&UID=&shopcmpyId='+urlParam.shopcmpyId;
		}
	})
}