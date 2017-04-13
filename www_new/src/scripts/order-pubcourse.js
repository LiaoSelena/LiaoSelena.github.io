$(function(){

	if(!window.pubCoursePopup){
		return;
	}
	//var pubCoursePopup = window.pubCoursePopup || {};

	var serviceUrl = {
		sms: pubCoursePopup.smsUrl || 'http://i.service.zhan.test/api/common/sendSmsGet',
		email: pubCoursePopup.emailUrl || 'http://i.service.zhan.test/api/common/sendMailGet',
		saveClue: pubCoursePopup.clueUrl || 'http://i.service.zhan.test/api/clue/first',
		register: pubCoursePopup.registerUrl || 'http://i.service.zhan.test/api/register/fasterRegister',
		login: pubCoursePopup.loginUrl || 'http://i.service.zhan.test/api/common/userFullLogin',
		setNickname: pubCoursePopup.setNicknameUrl || 'http://i.service.zhan.test/api/common/addNick',
		orderPubCourse: pubCoursePopup.orderUrl || 'http://www.zhan.test/zapi/articles/videosubscription.html'
	}
	var $style = $('<style type="text/css">.z-pop-layer-wrap{display:none;position:fixed;z-index:100000;top:0;left:0;right:0;bottom:0}.z-pop-layer-bg{position:absolute;top:0;right:0;left:0;bottom:0;background-color:#fff;opacity:.5}.z-pop-layer-content{position:absolute;width:100%;top:20%}.pop-gray-border{border:5px solid #b2b2b2;width:412px}.pop-email-reg-wrap,.pop-login-wrap,.pop-mobile-reg-wrap{position:absolute;width:421px;left:50%;margin-left:-210px}.pop-public-order-wrap{display:block;position:absolute;width:450px;left:50%;margin-left:-250px}.pop-nickname-wrap{display:block;position:absolute;width:410px;left:50%;margin-left:-205px;padding-top:40px;padding-bottom:40px;}.close-order-public-pop{display:inline-block;float:right;cursor:pointer}.order-pop-input-box{position:relative;display:inline-block;height:40px;line-height:40px;border:1px solid #ccc;outline:0}.pop-vcode-input{border:0;outline:0;position:absolute;top:1px;left:5px;width:172px;height:36px;line-height:36px;z-index:1}.order-pop-vcode-btn{display:inline-block;height:40px;line-height:40px;border:1px solid #f71;outline:0;color:#f71}.pop-lj-order-btn{display:inline-block;width:130px;height:40px;line-height:40px;color:#fff;background-color:#5280e0;cursor:pointer}.pop-lj-order-btn:hover{background-color:#3b66c1}.vcode-input-wrap{width:183px;position:relative;border:1px solid #ccc;border-right:0;float:left;height:40px;text-align:left}.vcode-btn-wrap{width:83px;position:relative;border:1px solid #f71;float:left;height:40px;color:#f71}.pop-order-vcode-input{border:0;outline:0;height:32px;line-height:32px;position:relative;top:4px;width:160px;padding:0 7px}.pop-vcode-text{text-align:center;height:40px;line-height:40px}.sendSmsCodeBtn.can-re-get{cursor:pointer}.lj-mobile-reg-btn,.lj-email-reg-btn,.lj-login-btn{background-color:#f71;cursor:pointer}.lj-mobile-reg-btn:hover,.lj-email-reg-btn:hover,.lj-login-btn:hover{background-color:#f91}.third-auth-link>img{position:relative;top:0;margin-right:4px;display:inline-block;}.pop-content-wrap{background-color:#fff;}.in-counting{cursor:default !important;}.in-sending{cursor:default !important;}input{color:#000;}.my-placeholder{color:#aaa;}.popSetnickname{cursor:pointer;}.popSetnickname.inRequesting{cursor:default}</style>');
	var $popup = $('<div class="z-pop-layer-wrap"><div class="z-pop-layer-bg"></div><div class="z-pop-layer-content"><div class="pop-public-order-wrap pop-gray-border pop-content-wrap"><div style="height:50px;line-height:50px;padding:0 10px;font-size:22px;color:#fff;background-color:#5280e0;position:relative"><span>小站公开课订阅</span> <img src="/static/images/pop-close.png" class="closeOrderPopup" style="position:absolute;top:15px;right:8px;cursor:pointer"></div><div style="background-color:#fff;padding:37px 32px 33px 32px"><div style="position:relative;padding-left:50px;font-size:16px"><img style="position:absolute;left:0" src="/static/images/pop-play.png"><span style="color:#666">建议您留下手机联系方式，如有备考提醒与最新资料发布，</span><span style="color:#f71">我们会以短信的形式通知您！</span></div></div><div style="text-align:center;font-size:16px;color:#5280e0;margin-bottom:20px">请完善以下信息，便于我们为您推荐合适的视频</div><div style="text-align:center"><input type="text" style="width:266px;padding:0 7px;" class="order-pop-input-box orderMobileNum" placeholder="请输入您的手机号"></div><div style="text-align:center;margin-top:11px;position:relative;height:40px"><div style="width:266px;left:50%;margin-left:-133px;overflow:hidden;position:absolute;margin-top:11px;font-size:12px"><div class="vcode-input-wrap"><input class="pop-order-vcode-input orderSmsCode" type="text" placeholder="请输入手机验证码"></div><div class="vcode-btn-wrap sendSmsCodeBtn can-re-get"><div class="pop-vcode-text smsCodeText4Order">获取验证码</div></div></div></div><div style="text-align:center;margin-top:30px;padding-bottom:34px"><span class="pop-lj-order-btn ljOrderBtn">立即订阅</span></div></div><div class="pop-mobile-reg-wrap pop-gray-border pop-content-wrap"><div style="height:50px;line-height:50px;padding-left:10px;font-size:22px;color:#fff;background-color:#59616d;position:relative"><span style="color:#fff">手机注册 立即</span><span style="color:#f0a12a">参与小站视频评论</span><div style="position:absolute;top:0;right:0;width:25px;height:25px;background-color:#6e7481"><img src="/static/images/pop-close.png" class="closeMobileRegIcon" style="cursor:pointer;position:relative;top:6px;left:6px;width:13px"></div></div><div style="height:10px"></div><div style="overflow:hidden;margin-bottom:30px;padding-right:40px;font-size:12px"><span style="float:right"><span style="color:#999">已有账号，</span><span style="color:#f71;cursor:pointer" class="gotoLogin">登录&gt;&gt;</span></span></div><div style="overflow:hidden;margin-bottom:8px;padding-right:40px;font-size:12px"><div style="float:right;width:190px;height:40px;line-height:40px;border:1px solid #ccc;color:#999"><input class="regMobileInput" type="text" style="border:0;outline:0;width:188px;height:26px;line-height:26px;position:relative;top:0;padding:0 10px;" placeholder="请输入您的手机号"></div><div style="float:right;width:50px;height:40px;line-height:40px;text-align:center;border:1px solid #ccc;border-right:0;color:#999">0086</div><div style="float:right;width:80px;padding-right:8px;text-align:right;height:40px;line-height:40px;font-size:14px"><span style="color:#e02f2f;position:relative;top:3px">*</span>&nbsp;<span style="color:#666">手机号</span></div></div><div style="overflow:hidden;margin-bottom:13px;padding-right:40px;font-size:12px"><div style="float:right;width:240px"><span style="color:#999">或&nbsp;</span><span style="color:#f71;cursor:pointer" class="gotoEmailRegPop">使用邮箱注册</span></div></div><div style="overflow:hidden;margin-bottom:13px;padding-right:40px;font-size:12px"><div style="float:right;width:240px;height:40px;line-height:40px;border:1px solid #ccc;color:#999"><input class="regMobilePwdInput" type="password" style="border:0;outline:0;width:238px;height:26px;line-height:26px;position:relative;top:0;padding:0 10px;" placeholder="请设置您的密码"></div><div style="float:right;width:80px;padding-right:8px;text-align:right;height:40px;line-height:40px;font-size:14px"><span style="color:#e02f2f;position:relative;top:3px">*</span>&nbsp;<span style="color:#666">设置密码</span></div></div><div style="overflow:hidden;margin-bottom:30px;padding-right:40px;font-size:12px"><div style="float:right;width:120px;height:40px;line-height:40px;text-align:center;border:1px solid #f71;color:#f71;cursor:pointer" class="sendMobileRegSmsCode">免费获取短信激活码</div><div style="float:right;width:120px;height:40px;line-height:40px;border:1px solid #ccc;border-right:0;color:#999"><input class="regMobileCodeInput" type="text" style="border:0;outline:0;width:118px;height:26px;line-height:26px;position:relative;top:0;padding:0 10px;"></div><div style="float:right;width:80px;padding-right:8px;text-align:right;height:40px;line-height:40px;font-size:14px"><span style="color:#e02f2f;position:relative;top:3px">*</span>&nbsp;<span style="color:#666">激活码</span></div></div><div style="overflow:hidden;margin-bottom:40px;padding-right:40px"><div style="float:right;width:320px;font-size:20px;color:#fff;text-align:center;padding:12px 0" class="lj-mobile-reg-btn">立即注册</div></div></div><div class="pop-email-reg-wrap pop-gray-border pop-content-wrap"><div style="height:50px;line-height:50px;padding-left:10px;font-size:22px;color:#fff;background-color:#59616d;position:relative"><span style="color:#fff">邮箱注册 立即</span><span style="color:#f0a12a">参与小站视频评论</span><div style="position:absolute;top:0;right:0;width:25px;height:25px;background-color:#6e7481"><img src="/static/images/pop-close.png" class="closeEmailRegIcon" style="cursor:pointer;position:relative;top:6px;left:6px;width:13px"></div></div><div style="height:10px"></div><div style="overflow:hidden;margin-bottom:30px;padding-right:40px;font-size:12px"><span style="float:right"><span style="color:#999">已有账号，</span><span style="color:#f71;cursor:pointer" class="gotoLogin">登录&gt;&gt;</span></span></div><div style="overflow:hidden;margin-bottom:8px;padding-right:40px;font-size:12px"><div style="float:right;width:240px;height:40px;line-height:40px;border:1px solid #ccc;color:#999"><input class="regEmailInput" type="text" style="border:0;outline:0;width:238px;height:26px;line-height:26px;position:relative;top:0;padding:0 10px;" placeholder="请输入您的常用邮箱"></div><div style="float:right;width:80px;padding-right:8px;text-align:right;height:40px;line-height:40px;font-size:14px"><span style="color:#e02f2f;position:relative;top:3px">*</span>&nbsp;<span style="color:#666">邮箱地址</span></div></div><div style="overflow:hidden;margin-bottom:13px;padding-right:40px;font-size:12px"><div style="float:right;width:240px"><span style="color:#999">或&nbsp;</span><span style="color:#f71;cursor:pointer" class="gotoMobileRegPop">使用手机注册</span></div></div><div style="overflow:hidden;margin-bottom:13px;padding-right:40px;font-size:12px"><div style="float:right;width:240px;height:40px;line-height:40px;border:1px solid #ccc;color:#999"><input class="regEmailPwdInput" type="password" style="border:0;outline:0;width:238px;height:26px;line-height:26px;position:relative;top:0;padding:0 10px;" placeholder="请设置您的密码"></div><div style="float:right;width:80px;padding-right:8px;text-align:right;height:40px;line-height:40px;font-size:14px"><span style="color:#e02f2f;position:relative;top:3px">*</span>&nbsp;<span style="color:#666">设置密码</span></div></div><div style="overflow:hidden;margin-bottom:30px;padding-right:40px;font-size:12px"><div style="float:right;width:120px;height:40px;line-height:40px;text-align:center;border:1px solid #f71;color:#f71;cursor:pointer" class="sendEmailRegCode">免费获取激活码</div><div style="float:right;width:120px;height:40px;line-height:40px;border:1px solid #ccc;border-right:0;color:#999"><input class="regEmailCodeInput" type="text" style="border:0;outline:0;width:118px;height:26px;line-height:26px;position:relative;top:0;padding:0 10px;"></div><div style="float:right;width:80px;padding-right:8px;text-align:right;height:40px;line-height:40px;font-size:14px"><span style="color:#e02f2f;position:relative;top:3px">*</span>&nbsp;<span style="color:#666">激活码</span></div></div><div style="overflow:hidden;margin-bottom:40px;padding-right:40px"><div style="float:right;width:320px;font-size:20px;color:#fff;text-align:center;padding:12px 0" class="lj-email-reg-btn">立即注册</div></div></div><div class="pop-login-wrap pop-gray-border pop-content-wrap"><div style="height:50px;line-height:50px;padding:0 10px;font-size:22px;color:#fff;background-color:#59616d"><span style="color:#fff">登录小站</span><span style="color:#f0a12a">立享会员专属特权</span><div style="position:absolute;top:0;right:0;width:25px;height:25px;background-color:#6e7481"><img src="/static/images/pop-close.png" class="closeLoginIcon" style="cursor:pointer;position:relative;top:6px;left:6px;width:13px"></div></div><div style="height:40px"></div><div style="position:relative;padding-left:32px;width:322px;left:50%;margin-left:-161px;height:40px;line-height:40px;border:1px solid #ccc;margin-bottom:13px"><img src="/static/images/pop-input-name.png" style="position:absolute;top:9px;left:12px"> <input class="loginAccountInput" type="text" style="border:0;outline:0;width:238px;height:26px;line-height:26px;position:relative;top:0;padding:0 4px;" placeholder="请输入您的手机/邮箱"></div><div style="position:relative;padding-left:32px;width:322px;left:50%;margin-left:-161px;height:40px;line-height:40px;border:1px solid #ccc;margin-bottom:10px"><img src="/static/images/pop-input-lock.png" style="position:absolute;top:10px;left:12px"> <input class="loginPwdInput" type="password" style="border:0;outline:0;width:238px;height:26px;line-height:26px;position:relative;top:0;padding:0 4px;" placeholder="请输入您的密码"></div><div style="overflow:hidden;position:relative;width:322px;left:50%;margin-left:-161px;margin-bottom:32px;font-size:12px;color:#999"><input style="float:left;position:relative;top:-1px" type="checkbox" name="rememberLogin" id="rememberLoginCk"><label style="float:left" for="rememberLoginCk">&nbsp;记住登录状态</label><span style="float:right;color:#f71;cursor:pointer" class="gotoRegAccount">&nbsp;注册账号</span><a href="http://passport.zhan.com/Resetpwd/index.html" target="_blank"><span style="float:right;color:#999">忘记密码&nbsp;|</span></a></div><div style="position:relative;width:322px;left:50%;margin-left:-161px;height:40px;line-height:40px;font-size:20px;color:#fff;text-align:center;margin-bottom:20px" class="lj-login-btn">立即登录</div><div style="border-top:1px solid #e5e5e5;height:71px;line-height:71px;background-color:#f5f5f5;text-align:center;font-size:12px"><span style="color:#999">使用合作网站帐号登录：</span> <a class="third-auth-link" href="http://passport.zhan.com/UsersThridParty/login/type/qq.html?url"><img src="/static/images/pop-qq-auth.png"></a><a class="third-auth-link" href="http://passport.zhan.com/UsersThridParty/login/type/sina.html?url"><img style="margin-right:6px" src="/static/images/pop-weibo-auth.png"></a><a class="third-auth-link" href="http://passport.zhan.com/UsersThridParty/login/type/weixin.html?url"><img src="/static/images/pop-wechat-auth.png"></a></div></div><div class="pop-nickname-wrap pop-gray-border pop-content-wrap" style="width:410px;background-color:#fff"><img class="closeNicknameIcon" src="/static/images/qk-close2.png" style="position:absolute;top:8px;right:5px;cursor:pointer"><div style="text-align:center;color:#333;font-size:22px;margin-bottom:30px">完善昵称 立即参与小站评论</div><div style="text-align:center;height:32px;line-height:32px;margin-bottom:42px"><span style="color:#666;font-size:14px">您的昵称&nbsp;</span> <input class="nicknameInput" type="text" placeholder="快来给自己起一个昵称吧！" style="height:32px;line-height:32px;width:234px;border:1px solid #ccc;padding-left:8px;"></div><div style="text-align:center"><span class="popSetnickname" style="background-color:#f71;color:#fff;font-size:20px;padding:11px 110px;">确定并发表</span></div></div></div></div>');
	$('head').append($style);
	$('body').append($popup);

	$('input, textarea').placeholder({customClass:'my-placeholder'});

	// 手机号码、验证码正则表达式
	var mobileReg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
	var smsCodeReg = /^\d+$/;
	var emailReg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

	/**
	 **  // 通用jsonp接口
	**/
	function jsonpServ( url, params, sucFn, failFn ){
		$.ajax({
			url: url,
			type: 'GET',
			dataType: 'jsonp',
			timeout : 6000,
			jsonp: 'callback',
			jsonpCallback:"apicallback",
			data: params,
			success: function( data ){
				sucFn && sucFn(data);
			},
			error: function(){
				failFn && failFn();			
			}
		})
	}

	// 订阅接口
	function orderService(){
		var subjectId = window.g_orderSubjectId;			
		var catId =  window.g_orderCatId;
		var mobile = localStorage.getItem('popupMobile');
		
		// -000: 存储已订阅状态
		if( subjectId === '-000'){
			storageOrderSuc( subjectId );
			alert('订阅成功');
			hidePoplayer();
			return;
		}

		// 具体课程：调用订阅接口、更新订阅数、存储已订阅状态
		$.post(serviceUrl.orderPubCourse, {
			subjectId: subjectId,
			catid: catId,
			user_id: pubCoursePopup.userId,
			mobile: mobile
		}).done(function(data){
			if( true === data){		
				addOrderCount();

				storageOrderSuc( subjectId );
				alert('订阅成功');
				hidePoplayer();
			}else{
				alert(data || '订阅失败，请稍后再试');
			}
			$('.ljOrderBtn').removeClass('in-ordering');
		}).fail(function(){
			alert('订阅服务异常，请稍后再试');
			$('.ljOrderBtn').removeClass('in-ordering');
		})
	}

	// 本地存储订阅成功后状态
	function storageOrderSuc( subjectId ){
		var itemKey = 'orderedCourse' + subjectId;
		localStorage.setItem(itemKey, 'true');
	}

	// 订阅数加1
	function addOrderCount(){	
		var $btn = window.g_orderCourseBtn;
		if( $btn.hasClass('orderCountBt1') ){
			var $count = $btn.parent().find('.orderedCount1');
		}else{
			$count = $btn.parents('.right-video-partcon').find('.orderedCount');
		}
		var text = $.trim($count.text());
		if(text.length === 0){
			return;
		}
		// 除去千位分隔符
		var num = parseInt(text.replace(/,/g, ''));
		++num;
		// 添加千位分隔符...
		var num = thousandBitSeparator( num );
		$count.text( num );
	}

	// 添加千位分隔符
	function thousandBitSeparator(num) {
	  return num && (num
	    .toString().indexOf('.') != -1 ? num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
	      return $1 + ",";
	    }) : num.toString().replace(/(\d)(?=(\d{3}))/g, function($0, $1) {
	      return $1 + ",";
	    }));
	}

	// 订阅验证码倒计时
	function startCounter4Order() {
		// 清理计时器先
		clearInterval(window.ordderCodeInterval);

		var $btn = $('.sendSmsCodeBtn');
		$btn.removeClass('can-re-get');
		var $text = $('.smsCodeText4Order');
		var counterTime = 60;
		$text.text(counterTime + 's')
		window.ordderCodeInterval = setInterval(function(){
			counterTime--;	
			$text.text( counterTime + 's')			
			if(counterTime === 0){
				$text.text('获取验证码');
				$btn.addClass('can-re-get');
				clearInterval(window.ordderCodeInterval);
			}
		}, 1000);
	}

	// 注册验证码倒计时
	function startCounter4Reg( $btn ) {
		// 清理计时器先
		clearInterval(window.regInterval);
		$btn.addClass('in-counting');		
		var counterTime = 60;
		$btn.text(counterTime + 's')
		window.regInterval = setInterval(function(){
			counterTime--;	
			$btn.text( counterTime + 's')			
			if(counterTime === 0){
				$btn.text('免费获取短信激活码');
				$btn.removeClass('in-counting');
				clearInterval(window.regInterval);
			}
		}, 1000);
	}

	// 获取注册验证码
	$('.sendMobileRegSmsCode, .sendEmailRegCode').click(function(){
		var $btn = $(this);
		if($btn.hasClass('in-counting') || $btn.hasClass('in-sending')){
			return;
		}	
		var reqUrl, reqParam;

		// 手机注册
		if($btn.hasClass('sendMobileRegSmsCode')){
			var mobile = $.trim($('.regMobileInput').val());
			if(!mobileReg.test(mobile)){
				alert('请输入有效的手机号码');
				return;
			}
			reqUrl = serviceUrl.sms;
			reqParam = {
				phone: mobile,
				type: 2
			}
		}
		// 邮箱注册
		else{
			var email = $.trim($('.regEmailInput').val());
			if(!emailReg.test(email)){
				alert('请输入有效的邮箱地址');
				return;
			}			
			reqUrl = serviceUrl.email;
			reqParam = {
				email: email
			}
		}

		$btn.addClass('in-sending');
		// 发送验证码
		jsonpServ(reqUrl, reqParam, function sucFn(data){
			$btn.removeClass('in-sending');
			if(data.status === 1){
				// 调用成功，开始倒计时
				startCounter4Reg($btn);
			}else{
				alert(data.message);
			}
		}, function failFn(){
			$btn.removeClass('in-sending');
			alert('服务异常，请稍后再试');
		});		
	})

	// 发送订阅验证码
	$('.sendSmsCodeBtn').click(function(){
		var $btn = $(this);
		if(!$btn.hasClass('can-re-get')){
			return;
		}
		var mobile = $.trim($('.orderMobileNum').val());
		if(!mobileReg.test(mobile)){
			alert('请输入有效的手机号码');
			return;
		}
		// 发送验证码
		jsonpServ( serviceUrl.sms, {
			phone: mobile,
			type: 10
		}, function(data){
			if(data.status === 1){
				// 调用成功，开始倒计时
				startCounter4Order();
			}else{
				alert(data.message);
			}
		}, function(){
			alert('服务异常，请稍后再试');
		})
	})

	// 立即订阅
	$('.ljOrderBtn').click(function(){
		var $btn = $(this);
		if($btn.hasClass('in-ordering')){
			return;
		}
		var mobile = $.trim($('.orderMobileNum').val());
		var smsCode = $.trim($('.orderSmsCode').val());
		if(!mobileReg.test(mobile)){
			alert('请输入有效的手机号码');
			return;
		}
		if(!smsCodeReg.test(smsCode)){
			alert('请输入有效的验证码');
			return;
		}
		$btn.addClass('in-ordering');

		// 保存线索
		jsonpServ( serviceUrl.saveClue, {
			phone: mobile,
			phone_code: smsCode,
			source: '公开课'
		}, function(data){
			if( data.status === 1){
				// 保存手机号码
				localStorage.setItem('popupMobile', mobile);
				// 调用订阅接口
				orderService();
			}else{
				alert(data.message)
				$('.ljOrderBtn').removeClass('in-ordering');
			}
		}, function(){
			alert('服务异常，请稍后再试');
			$('.ljOrderBtn').removeClass('in-ordering');
		})
		
	});

	$('.orderPubCourseBtn').click(function(){
		// 1：存在data-subjectid：手机手机号码、调用订阅接口、订阅数加1。
		// 2：-000：收集手机号码。
		window.g_orderSubjectId = $(this).data('subjectid') || '-000';
		window.g_orderCatId = $(this).data('catid') || '-111';
		window.g_orderCourseBtn = $(this);

		// 课程已订阅过
		var itemKey = 'orderedCourse' + window.g_orderSubjectId;		
		if(localStorage.getItem(itemKey) === 'true'){
			alert('订阅成功');
			return;
		}

		// 用户已登录或者手机号码已保存，不再显示手机号码弹框，直接调用订阅接口
		if( pubCoursePopup.userId || localStorage.getItem('popupMobile') ){
			orderService();
		}
		// 显示弹框输入手机号
		else{
			showPopcontent('.pop-public-order-wrap')			
		}
		
	})

	/**
	 **   >>>>>>>>>>>> 注册 >>>>>>>>>>>>
	**/
	// 注册接口jsonp
	function regService(params, $btn){
		$.ajax({
			url: serviceUrl.register,
			type: 'GET',
			dataType: 'jsonp',
			timeout : 6000,
			jsonp: 'callback',
			jsonpCallback:"apicallback",
			data: params,
			success: function( data ){
				$btn.removeClass('inRequesting');
				if(data.status === 1){
					//alert('注册成功\n' + data.message);
					window.location.reload(true)
				}else{
					alert('注册失败\n' + data.message);
				}
			},
			error: function(){
				$btn.removeClass('inRequesting');
				alert('服务异常，请稍后再试');
			}
		})
	}

	// 立即注册----手机号码
	$('.lj-mobile-reg-btn').click(function(){
		var $btn = $(this);
		if($btn.hasClass('inRequesting')){
			return;
		}		
		var mobile = $.trim($('.regMobileInput').val());
		var pwd = $.trim($('.regMobilePwdInput').val());
		var code = $.trim($('.regMobileCodeInput').val());
		if(!mobileReg.test(mobile)){
			alert('请输入有效的手机号码');
			return;
		}
		if(pwd.length<8 || pwd.length>20){
			alert('密码需要在8至20个字符内');
			return;
		}
		if(!smsCodeReg.test(code)){
			alert('请输入有效的验证码');
			return;
		}

		$btn.addClass('inRequesting');
		regService({
			type: 1,
			mobile: mobile,
			pwd: pwd,
			code: code,
			login: 1
		}, $btn);
	});

	// 立即注册----邮箱地址
	$('.lj-email-reg-btn').click(function(){
		var $btn = $(this);
		if($btn.hasClass('inRequesting')){
			return;
		}		
		var email = $.trim($('.regEmailInput').val());
		var pwd = $.trim($('.regEmailPwdInput').val());
		var code = $.trim($('.regEmailCodeInput').val());
		if(!emailReg.test(email)){
			alert('请输入有效的邮箱地址');
			return;
		}
		if(pwd.length<8 || pwd.length>20){
			alert('密码需要在8至20个字符内');
			return;
		}
		if(!smsCodeReg.test(code)){
			alert('请输入有效的验证码');
			return;
		}

		$btn.addClass('inRequesting');
		regService({
			type: 2,
			email: email,
			pwd: pwd,
			code: code,
			login: 1
		}, $btn);
	})
	/**
	 **   <<<<<<<<<<<< 注册 <<<<<<<<<<<<
	**/

	/**
	 ** 登录
	**/
	$('.lj-login-btn').click(function(){
		var account = $.trim($('.loginAccountInput').val());
		var pwd = $.trim($('.loginPwdInput').val());
		if(account.length === 0){
			alert('请输入用户账号');
			return;
		}
		if(pwd.length === 0){
			alert('请输入密码');
			return;
		}
		// 登录
		jsonpServ(serviceUrl.login, {
			username: account,
			password: pwd
		}, function(data){
			if(data.status === 1){
				window.location.reload(true)
			}else{
				alert(data.message);
			}
		}, function(){
			alert('服务异常，请稍后再试');
		})
	});

	$('.popSetnickname').click(function(){
		var $btn = $(this);
		if ($btn.hasClass('inRequesting')) return;

		var nickname = $.trim($('.nicknameInput').val())
		if (nickname.length === 0) {
			alert('请输入昵称')
			return
		};
		$btn.addClass('inRequesting')
		// 设置昵称
		jsonpServ(serviceUrl.setNickname, {
			nickname: nickname
		}, function(data){
			$btn.removeClass('inRequesting')
			if(data.status === 1){
				// 昵称设置成功后
				window.g_setNicknameDone();
			}else{
				alert(data.message);
			}
		}, function(){
			$btn.removeClass('inRequesting')
			alert('设置昵称服务异常，请稍后再试');
		});
	})


	$('.gotoRegPop, .gotoRegAccount, .gotoMobileRegPop').click(function(){
		showPopcontent('.pop-mobile-reg-wrap')
	})
	$('.gotoLoginPop, .gotoLogin').click(function(){
		showPopcontent('.pop-login-wrap')
	})
	$('.gotoEmailRegPop').click(function(){
		showPopcontent('.pop-email-reg-wrap')
	})
	// 显示设置昵称
	window.showNicknamePop = function(setNicknameDone){
		showPopcontent('.pop-nickname-wrap');
		window.g_setNicknameDone = setNicknameDone;
	}
	window.hideNicknamePop = function(){
		hidePoplayer();
	}

	function showPopcontent(contentSel){
		$('.pop-content-wrap').hide();		
		$('.z-pop-layer-wrap').show();
		$('.z-pop-layer-wrap input[type=text]').val('');
		$('.z-pop-layer-wrap input[type=password]').val('');
		$(contentSel).show();		
	}

	function hidePoplayer(){
		$('.z-pop-layer-wrap').hide();
	}

	$('.closeOrderPopup,.closeMobileRegIcon,.closeEmailRegIcon,.closeLoginIcon,.closeNicknameIcon').click(function(){
		hidePoplayer();
	})

})