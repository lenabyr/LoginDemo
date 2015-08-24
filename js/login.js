window.onload=function(){
	var oBtn=document.getElementById("btn_login");
	oBtn.onclick=function(){
		openNew();
		drag();
	}
}
/**
**弹出窗口
***/
function openNew(){
	//获取页面高度和宽度
	var sHeight=document.documentElement.scrollHeight;
	var sWidth=document.documentElement.scrollWidth;
	//创建遮罩层结点
	var oMask=document.createElement("div");
	oMask.id="mask";
	oMask.style.height=sHeight+'px';
	oMask.style.width=sWidth+'px';
	document.body.appendChild(oMask);

	//创建登录框节点
	var oLogin=document.createElement("div");
	oLogin.id="login";
	oLogin.innerHTML='<div class="loginHead"><h4 class="login_logo">登录</h4><div id="close"></div></div><div class="loginContent">'+
					 '<div class="loginmodel"><label>用户名：</label><input type="text" name="username" id="username" value="" /></div>'+
					 '<div class="loginmodel"><label>密码：</label><input type="password" name="paswd" id="paswd" /></div>'+
					 '<input type="button" name="Login" id="Login" value="登   录"/></div>';
	document.body.appendChild(oLogin);

	//获取可视区域高度和宽度
	var cHeight=getViewPort().height;
	var cWidth=getViewPort().width;

	//获取login的宽度和高度
	var dHeight=oLogin.offsetHeight;
	var dWidth=oLogin.offsetWidth;
	
	//让弹出框居中
	oLogin.style.top=(cHeight-dHeight)/2 +'px';
	oLogin.style.left=(cWidth-dWidth)/2 + 'px';

	//点击关闭弹出框
	var oClose=document.getElementById("close");
	oClose.onclick=function(){
		document.body.removeChild(oMask);
		document.body.removeChild(oLogin);
	}	
}
//获取可视区域高度和宽度
function getViewPort(){
	//IE7之前，混杂模式
	if(document.compatMode=="BackCompat"){
		return{
			width:document.body.clientWidth,
			height:document.body.clientHeight
		};
	}
	//标准模式
	else{
		return {
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		};
	}
}

/**
**拖拽窗口
***/
function drag(){
	var oTitle=getByClass('loginHead','login')[0];
	oTitle.onmousedown=fnDown;
}
/**
**根据类名获取元素
***/
function getByClass(clsName,parent){
	var oParent=parent?document.getElementById(parent):document;
	var eles=[];
	var elements=oParent.getElementsByTagName('*');

	for(var i=0;i<elements.length;i++){
		if(elements[i].className==clsName){
			eles.push(elements[i]);
		}
	}
	return eles;
}
//鼠标按下时触发
function fnDown(event){
	event=event||window.event;
	var oDrag=document.getElementById("login");
	//光标按下时光标和面板之间的距离
	var disX=event.clientX-oDrag.offsetLeft;
	var disY=event.clientY-oDrag.offsetTop;
	//移动
	document.onmousemove=function(event){
		event=event||window.event;
		fnMove(event,disX,disY);
	}
	//释放鼠标
	document.onmouseup=function(){
		document.onmousemove=null;
		document.onmouseup=null;
	}
}

function fnMove(e,posX,posY){
	var oDrag=document.getElementById("login");
	var l=e.clientX-posX;
	var t=e.clientY-posY;
	var winWidth=getViewPort().width;
	var winHeight=getViewPort().height;
	var maxW=winWidth-oDrag.offsetWidth;
	var maxH=winHeight-oDrag.offsetHeight;
	if(l<0){
		l=0;
	}else if(l>maxW){
		l=maxW;
	}
	if(t<0){
		t=0;
	}else if(t>maxH){
		t=maxH;
	}
	oDrag.style.left=l+"px";
	oDrag.style.top=t+"px";
}
