/**
**  机经列表页详情页弹框，订阅和下载功能
**/
$(function(){	
	if(!window.jijingPopup){
		return;
	}
	var isLogin = jijingPopup.isLogin;
	var detailPage = jijingPopup.jijingDetail;

	var $style = $('<style type="text/css">.qk-chn-bottom-wrap *{box-sizing:border-box;font-family:"微软雅黑"}.qk-chn-order-wrap *{box-sizing:border-box;font-family:"微软雅黑"}div.qk-chn-bottom-wrap{display:none;position:fixed;z-index:100;bottom:0;width:100%;height:60px;line-height:60px;background-color:#f60;text-align:center}.inl-blk{display:inline-block}.qk-chn-text1{font-size:24px;color:#fff;margin-right:20px}.qk-chn-name,.qk-chn-phone{position:relative;top:-2px;height:39px;line-height:39px;width:202px;padding-left:13px;margin-right:20px;color:#000;border:0;outline:0;font-size:16px}.qk-chn-name:focus,.qk-chn-phone:focus{border:0;outline:0}.qk-lj-order{position:relative;top:-1px;background-color:#ff7f29;height:39px;line-height:39px;padding:0 27px 0 20px;margin-right:25px;cursor:pointer}.qk-lj-order:hover{opacity:.9}.lj-order-icon{position:relative;display: inline-block;margin-right:12px}.lj-order-text{color:#fff;font-size:16px}.qk-ordered-number{font-size:24px;color:#ffc600}.qk-order-number-text{color:#fff;font-size:16px}.qk-chn-order-wrap{display:none;position:fixed;z-index:100000;top:0;left:0;right:0;bottom:0}.qk-chn-order-bg{position:absolute;top:0;right:0;left:0;bottom:0;background-color:#fff;opacity:.5}.qk-chn-do-order{display:none;position:absolute;left:50%;margin-left:-295px;border:5px solid #b2b2b2;width:590px;top:20%}.qk-chn-layer-top{background-color:#5280e0;height:50px;line-height:50px;font-size: 16px;color:#fff;padding:0 10px}.qk-chn-layer-center{height:300px;background-color:#fff}.qk-chn-center1{padding:35px 30px 36px 30px;overflow:hidden}.qk-chn-center1>img{float:left;margin-right:20px}.qk-chn-center1>div{float:left;color:#333;width:430px;font-size:16px;line-height:28px}.qk-chn-center2{text-align:center;margin-bottom:48px}.qk-chn-layer-name,.qk-chn-layer-phone{position:relative;top:-2px;height:39px;line-height:39px;width:202px;padding-left:13px;margin-right:20px;color:#000;border:1px solid #ccc;outline:0;font-size:16px}.qk-chn-layer-name:focus,.qk-chn-layer-phone:focus{outline:0}.qk-chn-order-now-btn{display:inline-block;padding:14px 37px 12px 37px;color:#fff;background-color:#5280e0;cursor:pointer}.qk-chn-center3{text-align:center}.qk-chn-order-now-btn:hover{background-color:#3b66c1}.qk-chn-finish-order{position:absolute;left:50%;margin-left:-175px;border:5px solid #b2b2b2;background-color:#fff;width:350px;top:20%}.qk-chn-finish-order-number{color:#ea5413}.qk-chn-layer-vcode{border:1px solid #ccc;outline:0;padding:10px;width:156px;margin-right:10px}.qk-chn-finish-order-btn{position:relative;width:269px;margin:0 auto;text-align:center;margin-bottom:42px;padding:10px 0;background-color:#f71;color:#fff;cursor:pointer}.qk-chn-finish-order-btn:hover{background-color:#3b66c1}.qk-chn-count-time{color:#ea5413}.qk-chn-go-back{float:right;margin-right:12px;margin-bottom:14px;font-size:12px;color:#999;cursor:pointer}.get-v-code-btn.can-re-get{cursor: pointer;font-size: 16px;color: #ff7711;}.qk-counter-wrap{display: inline-block;width: 135px;text-align: center;}.qk-close-popup-btn{float: right;position: relative;top: 12px;cursor: pointer;}.qk-close2-icon{position:absolute;top:2px;right:3px;cursor:pointer;}</style>');

	var $qkChnWrap = $('<div class="qk-chn-bottom-wrap"><span class="qk-chn-text1 inl-blk">机经订阅快速通道</span><input class="qk-chn-name inl-blk placeholderPack"placeholder="填写您的姓名"/><input class="qk-chn-phone inl-blk placeholderPack"placeholder="填写您的手机号"/><div class="qk-lj-order inl-blk"><img class="lj-order-icon"src="http://www.zhan.com/static/images/qk-j-book.png"><span class="lj-order-text">立即订阅</span></div><span class="qk-ordered-number">96</span><span class="qk-order-number-text">人已订阅</span></div>');	

	var $qkChnOrderWrap = $('<div class="qk-chn-order-wrap"><div class="qk-chn-order-bg"></div><div class="qk-chn-do-order"><div class="qk-chn-layer-top"><span>托福机经订阅</span><img class="qk-close-popup-btn" src="http://www.zhan.com/static/images/qk-close.png"></div><div class="qk-chn-layer-center"><div class="qk-chn-center1"><img src="http://www.zhan.com/static/images/qk-big-book.png"><div>请留下您的称呼和手机号码，如您预定的机经更新，我们会以短信的形式通知您！</div></div><div class="qk-chn-center2"><input class="qk-chn-layer-name inl-blk placeholderPack"placeholder="填写您的姓名"/><input class="qk-chn-layer-phone inl-blk placeholderPack"placeholder="填写您的手机号"/></div><div class="qk-chn-center3"><span class="qk-chn-order-now-btn">立即订阅</span></div></div></div><div class="qk-chn-finish-order"><div style="font-size:24px;color:#333333;text-align:center;padding: 22px 0 20px 0;"><span class="qk-finish-title1">机经订阅快速通道</span></div><div class="orderCount1" style="font-size:18px;color:#666666;text-align:center;padding: 0 0 40px 0;"><span class="qk-chn-finish-order-number">96</span><span class="qk-finish-title2">人已订阅</span></div><div style="text-align:center;padding: 0 0 30px 0;font-size:12px;"><input class="qk-chn-layer-vcode inl-blk placeholderPack"placeholder="请输入短信验证码"/><span class="qk-counter-wrap"><span class="qk-chn-count-time"></span><span class="get-v-code-btn can-re-get">s后重新获取验证码</span></span></div><div class="qk-chn-finish-order-btn"><img src="http://www.zhan.com/static/images/qk-finish-order.png"style="position:absolute;top:11px;left:88px;"><span style="padding-left: 25px;">完成订阅</span></div><div style="overflow:hidden"><div class="qk-chn-go-back">返回上一步</div></div><img class="qk-close2-icon" src="http://www.zhan.com/static/images/qk-close2.png"></div></div>');

	$('head').append($style);
	$('body').append($qkChnWrap).append($qkChnOrderWrap);	
	
	// 处理详情页	
	var jijingTitle = jijingPopup.jijingTitle || ''
	$('.qk-chn-layer-top>span').text(jijingTitle + '机经订阅');

	if(detailPage){
		var action = detailPage.action
		var itemKey = 'orderedArticle' + detailPage.articleId;

		// 底部浮框: 1、未登录的下载页显示； 2、未登录未订阅的订阅页显示	
		if(!isLogin){			
			if(action == 'download' || (action == 'order' && localStorage.getItem(itemKey) != 'true')){
				emptyVal($('.qk-chn-phone'));
				emptyVal($('.qk-chn-name'));
				$('.qk-chn-bottom-wrap').show();
			}else{
				$('.qk-chn-bottom-wrap').hide();
			}
		}else{
			$('.qk-chn-bottom-wrap').hide();
		}

		// 文字		
		if( action == 'order' ){
			$('.qk-chn-layer-top>span').text(jijingTitle + '机经订阅');
			$('.qk-chn-text1').text('机经订阅快速通道');
			$('.lj-order-text').text('立即订阅');
			$('.qk-order-number-text').text('人已订阅');
			$('.qk-finish-title1').text('机经订阅快速通道');
			$('.qk-finish-title2').text('人已订阅');
			$('.qk-chn-finish-order-btn>span').text('完成订阅');
			$('.qk-ordered-number').text($('.articleOrderCount').text());
		}else if( action == 'download' ){
			$('.qk-chn-layer-top>span').text(jijingTitle + '机经下载');
			$('.qk-chn-text1').text('机经下载快速通道');
			$('.lj-order-text').text('立即下载');
			$('.qk-order-number-text').text('人已下载');
			$('.qk-finish-title1').text('机经下载快速通道');
			$('.qk-finish-title2').text('人已下载');
			$('.qk-chn-finish-order-btn>span').text('完成下载');
			$('.qk-ordered-number').text($('.articleDownloadCount').text());
		}
	}

	var reg={
		phone:/^0?1[3|4|5|7|8][0-9]\d{8}$/,
		code:/^\d+$/
	}
	var apiUrl = {
		sms: jijingPopup.smsUrl || 'http://i.service.zhan.test/api/common/sendSms',
		saveClue: jijingPopup.clueUrl || 'http://i.service.zhan.test/api/clue/first',
		orderJijing: jijingPopup.orderUrl || 'http://www.zhan.test/zapi/articles/jijingsubscription.html'
	}

	// 显示订阅弹框
	function goOrderPopup(){
		var itemKey = 'orderedArticle' + window.g_orderArticleId;

		// 已成功订阅过，不再显示弹框获取手机号码
		if( localStorage.getItem('detailOrdered') == 'true' || localStorage.getItem('generalOrdered') == 'true' ){
			// 具体机经已订阅过 
			if( localStorage.getItem(itemKey) == 'true' ){
				alert('预定成功');
			}
			// 具体机经未订阅
			else{
				orderJijing();
			}
		}
		// 未成功订阅过，显示弹框
		else{			
			showDoOrderPopup();
		}
	}

	// 机经列表页订阅按钮
	$('.freeOrderBtn').click(function(){
		// '-000'表示未点击具体机经文章
		window.g_orderArticleId = $(this).data('articleid') || '-000';
		window.$g_orderArticleBtn = $(this);
		goOrderPopup();		
	});

	// 详情页订阅(/下载)按钮
	$('.articleOrderDldBtn').click(function(){
		// 下载
		if(detailPage && detailPage.action == 'download' && isLogin){
			// 已登录，直接下载
			window.open(detailPage.downloadUrl);
			// 统计代码
			window.ga('send','event','xkzhongduan',window.location.href,'Signed On');
			addDldCount();
		}
		// 订阅
		if(detailPage && detailPage.action == 'order'){
			window.g_orderArticleId = detailPage.articleId;
			goOrderPopup();
		}
	});

	// 订阅数 +1
	function addOrderCount(){
		var countNum;
		if(detailPage){
			countNum = parseInt($('.articleOrderCount').text()) + 1;
			$('.articleOrderCount').text(countNum)
		}else{
			if( window.g_orderArticleId != '-000' ){
				var $orderCount = window.$g_orderArticleBtn.parents('dd').find('.orderCount');
				countNum = parseInt($orderCount.text()) + 1;
				$orderCount.text(countNum);
			}			
		}		
	}

	// 下载数 +1
	function addDldCount(){
		if(detailPage){
			countNum = parseInt($('.articleDownloadCount').text()) + 1;
			$('.articleDownloadCount').text(countNum)
		}
	}

	// 发送验证码
	function sendVerifyCode(){
		var params = {
			phone: window.qkChnPhone,
			type: 10   // 线索
		};
		$.post(apiUrl.sms, params)
		.done(function(data){
			if(data.status == 1){
				$('.qk-chn-do-order').hide();
				$('.qk-chn-finish-order').show();
				$('.qk-chn-order-wrap').show();
				startVCodeCounter();
			}else{
				alert(data.message)
			}
		})
		.fail(function(){
			alert('发送验证码服务异常，请稍后再试')
		});
	}

	// 机经订阅
	function orderJijing(){	
		$.post(apiUrl.orderJijing, {
			articleId: window.g_orderArticleId
		}).done(function(data){				
			if( true === data){
				// 订阅成功, 更新订阅数
				addOrderCount();
				// 记录已订阅状态
				var itemKey = 'orderedArticle' + window.g_orderArticleId;
				localStorage.setItem(itemKey, 'true');
				localStorage.setItem('detailOrdered', 'true');
				alert('订阅成功');
				$('.qk-chn-order-wrap').hide();
				$('.qk-chn-bottom-wrap').hide();
			}else{
				alert('订阅失败，请稍后再试');
			}
		}).fail(function(){
			alert('订阅服务异常，请稍后再试');
		})
	}

	// 保存线索
	function saveClue( verifyCode ){
		var params = {
			phone: window.qkChnPhone,
			phone_code: verifyCode,
			source: '机经'
		};
		$.ajax({
			url: apiUrl.saveClue,
			type: 'GET',
			dataType: 'jsonp',
			jsonp: 'callback',
			jsonpCallback:"apicallback",
			data:params,
			success: function(data){
				if(data.status==1){
					// 1：机经下载		
					if(detailPage && detailPage.action == 'download'){
						window.open(detailPage.downloadUrl);
						var signStatus = isLogin ? 'Signed On' : 'Signed Off';
						window.ga('send','event','xkzhongduan',window.location.href, signStatus);
						$('.qk-chn-order-wrap').hide();
						addDldCount();
					}
					// 2: 机经订阅
					else{						
						// 通用机经按钮，直接保存已订阅状态，不调用订阅接口
						if(window.g_orderArticleId == '-000'){
							var itemKey = 'orderedArticle' + window.g_orderArticleId;
							localStorage.setItem(itemKey, 'true');
							localStorage.setItem('generalOrdered', 'true');
							alert('订阅成功');
							$('.qk-chn-order-wrap').hide();							
						}
						// 订阅具体机经文章，调用订阅接口	
						else{							
							orderJijing(); 
						}
					}
				}else{
					alert('操作失败\n' + data.message)
				}
			},
			error: function(){
				alert('服务异常，请稍后再试');
			}
		});
	}

	// 处理不支持placeholder属性的情形
	function placeholderPack($input){
		var holderVal = $input.attr('placeholder');
		$input.val(holderVal);
		$input.focus(function(){
			if($.trim($(this).val()) === holderVal){
				$(this).val('')
			}
		})
		$input.blur(function(){
			if($.trim($(this).val()) === ''){
				$(this).val(holderVal);
			}
		})				
	}
	if(!('placeholder'in document.createElement('input'))){
		$('.placeholderPack').each(function(idx, elm){
			placeholderPack($(elm));
		})
	}
	// 清空input值，保留placeholder
	function emptyVal($input){
		if(!('placeholder'in document.createElement('input'))){
			$input.val($input.attr('placeholder'))
		}else{
			$input.val('');
		}
	}

	// 倒计时
	function startVCodeCounter(){
		// 清理计时器先
		clearInterval(window.vCodeInterval);

		var $btn = $('.get-v-code-btn');
		$btn.removeClass('can-re-get');
		var counterTime = 60;
		$('.qk-chn-count-time').text(counterTime);
		$btn.text('s后重新获取验证码');
		window.vCodeInterval = setInterval(function(){
			counterTime--;
			$('.qk-chn-count-time').text(counterTime);				
			if(counterTime === 0){
				$('.qk-chn-count-time').text('');
				$btn.text('获取验证码');
				$btn.addClass('can-re-get');
				clearInterval(window.vCodeInterval);
			}
		}, 1000);
	}

	// 重新获取验证码
	$('.get-v-code-btn').click(function(){
		var $btn = $(this);
		if(!$btn.hasClass('can-re-get')){
			return;
		}
		// 发送验证码，开始倒计时
		sendVerifyCode();
		//startVCodeCounter();
	})

	// 显示 立即订阅弹框
	function showDoOrderPopup(){
		emptyVal($('.qk-chn-layer-name'));
		emptyVal($('.qk-chn-layer-phone'));

		$('.qk-chn-do-order').show();
		$('.qk-chn-finish-order').hide();
		$('.qk-chn-order-wrap').show();		
	}

	// 显示 完成订阅弹框
	function showToFinishOrderPopup(){
		emptyVal($('.qk-chn-layer-vcode'));
		if(!detailPage && window.g_orderArticleId == '-000'){
			$('.orderCount1').css('visibility', 'hidden').css('padding-bottom', '20px');
		}else{
			$('.orderCount1').css('visibility', 'visible').css('padding-bottom', '40px');
			var countNum;
			// 列表页
			if(!detailPage){
				var $orderCount = window.$g_orderArticleBtn.parents('dd').find('.orderCount');
				countNum = $orderCount.text();
			}
			// 详情页
			else{
				if(detailPage.action == 'order'){
					// 订阅次数
					countNum = $('.articleOrderCount').text();
				}else{
					// 下载次数
					countNum = $('.articleDownloadCount').text();
				}
			}
			$('.qk-chn-finish-order-number').text(countNum);
		}
		
		// $('.qk-chn-do-order').hide();
		// $('.qk-chn-finish-order').show();
		// $('.qk-chn-order-wrap').show();
		// 发送验证码，开始倒计时
		sendVerifyCode();
		//startVCodeCounter();
	}

	// 关闭弹出框
	$('.qk-close-popup-btn').click(function(){
		$('.qk-chn-order-wrap').hide();
	})
	$('.qk-close2-icon').click(function(){
		$('.qk-chn-order-wrap').hide();
	})

	// 底部浮框中的 立即订阅(/下载)按钮
	$('.qk-lj-order').click(function(){
		var name = $.trim($('input.qk-chn-name').val());
		var phone = $.trim($('input.qk-chn-phone').val());
		if(!reg.phone.test(phone)){
			alert('请输入有效的手机号码');
			return;
		}
		// 显示验证码输入框
		window.qkChnPhone = phone;
		window.g_orderArticleId = detailPage.articleId;
		// 隐藏 "返回上一步"
		$('.qk-chn-go-back').css('visibility', 'hidden');
		// 显示关闭按钮
		$('.qk-close2-icon').css('visibility', 'visible');
		showToFinishOrderPopup();
	})
	// 中部浮框中的 立即订阅(/下载)按钮
	$('.qk-chn-order-now-btn').click(function(){
		var name = $.trim($('input.qk-chn-layer-name').val());
		var phone = $.trim($('input.qk-chn-layer-phone').val());
		if(!reg.phone.test(phone)){
			alert('请输入有效的手机号码');
			return;
		}
		// 显示验证码输入框
		window.qkChnPhone = phone;
		// 显示 "返回上一步"
		$('.qk-chn-go-back').css('visibility', 'visible');
		// 隐藏关闭按钮
		$('.qk-close2-icon').css('visibility', 'hidden');
		showToFinishOrderPopup();
	})

	// 返回上一步
	$('.qk-chn-go-back').click(function(){
		$('.qk-chn-finish-order').hide();
		$('.qk-chn-do-order').show();
	})

	// 完成订阅按钮，保存线索，调用订阅接口
	$('.qk-chn-finish-order-btn').click(function(){
		var verifyCode = $.trim($('.qk-chn-layer-vcode').val());
		if(!reg.code.test(verifyCode)){
			alert('请输入有效的验证码');
			return;
		}
		saveClue(verifyCode);			
	})
})