/**
 * Created by Administrator on 2015/8/28.
 */
//获取浏览器页面可见高度和宽度
var _PageHeight = document.documentElement.clientHeight,
    _PageWidth = document.documentElement.clientWidth;
//计算loading框距离顶部和左部的距离（loading框的宽度为215px，高度为61px）
var _LoadingTop = _PageHeight > 60 ? (_PageHeight - 60) / 2 : 0,
    _LoadingLeft = _PageWidth > 60 ? (_PageWidth - 60) / 2 : 0;

//在页面未加载完毕之前显示的loading Html自定义内容
var _LoadingHtml = '<style type="text/css">.spinner {width: 60px;height: 60px;position: absolute;left:'+_LoadingLeft+'px;top:'+_LoadingTop+'px}.container1 > div, .container2 > div, .container3 > div {width: 15px;height: 15px;background-color: #eeae48;border-radius: 100%;position: absolute;-webkit-animation: bouncedelay 1.2s infinite ease-in-out;animation: bouncedelay 1.2s infinite ease-in-out;-webkit-animation-fill-mode: both;animation-fill-mode: both;}.spinner .spinner-container {position: absolute;width: 100%;height: 100%;}.container2 { -webkit-transform: rotateZ(45deg);transform: rotateZ(45deg)}.container3 {-webkit-transform: rotateZ(90deg);transform: rotateZ(90deg);}.circle1 { top: 0; left: 0; }.circle2 { top: 0; right: 0; }.circle3 { right: 0; bottom: 0; }.circle4 { left: 0; bottom: 0; }.container2 .circle1 {-webkit-animation-delay: -1.1s;animation-delay: -1.1s;}.container3 .circle1 { -webkit-animation-delay: -1.0s;animation-delay: -1.0s;}.container1 .circle2 { -webkit-animation-delay: -0.9s;animation-delay: -0.9s;}.container2 .circle2 { -webkit-animation-delay: -0.8s;animation-delay: -0.8s;}.container3 .circle2 { -webkit-animation-delay: -0.7s;animation-delay: -0.7s;}.container1 .circle3 { -webkit-animation-delay: -0.6s;animation-delay: -0.6s;}.container2 .circle3 { -webkit-animation-delay: -0.5s;animation-delay: -0.5s;}.container3 .circle3 { -webkit-animation-delay: -0.4s;animation-delay: -0.4s;}.container1 .circle4 { -webkit-animation-delay: -0.3s;animation-delay: -0.3s;}.container2 .circle4 { -webkit-animation-delay: -0.2s;animation-delay: -0.2s;}.container3 .circle4 { -webkit-animation-delay: -0.1s;animation-delay: -0.1s;}@-webkit-keyframes bouncedelay {0%, 80%, 100% { -webkit-transform: scale(0.0) }40% { -webkit-transform: scale(1.0) }}@keyframes bouncedelay {0%, 80%, 100% {transform: scale(0.0);-webkit-transform: scale(0.0);} 40% {transform: scale(1.0); -webkit-transform: scale(1.0);}}</style><div id="loadingDiv" style="position:fixed;left:0;width:100%;height:' + _PageHeight + 'px;top:0;z-index:10000;"><div class="spinner"><div class="spinner-container container1"> <div class="circle1"></div> <div class="circle2"></div> <div class="circle3"></div> <div class="circle4"></div> </div> <div class="spinner-container container2"> <div class="circle1"></div> <div class="circle2"></div> <div class="circle3"></div> <div class="circle4"></div> </div> <div class="spinner-container container3"> <div class="circle1"></div> <div class="circle2"></div> <div class="circle3"></div> <div class="circle4"></div> </div> </div></div>';

document.write(_LoadingHtml);

//监听加载状态改变
document.onreadystatechange = completeLoading;

//加载状态为complete时移除loading效果
function completeLoading() {
    if (document.readyState == "complete") {
        pageEndLoading();
    }
}

function pageBeginLoading(){
    //呈现loading效果
    $(document.body).append(_LoadingHtml);
}

function pageEndLoading(){
    var loadingMask = document.getElementById('loadingDiv');
    loadingMask.parentNode.removeChild(loadingMask);
}