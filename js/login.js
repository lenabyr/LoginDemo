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

/**
**拖拽窗口
***/
function drag(){
	var oTitle=getByClass('login_logo','login')[0];
	oTitle.onmousedown=fnDown;
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
	var winWidth=document.documentElement.clientWidth||document.body.clientWidth;
	var winHeight=document.documentElement.clientHeight||document.body.clientHeight;
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

/**
**弹出窗口
***/
function openNew(){
	//获取页面高度和宽度
	var sHeight=document.documentElement.scrollHeight;
	var sWidth=document.documentElement.scrollWidth;

	//获取可视区域高度和宽度
	var cHeight=document.documentElement.clientHeight;
	var cWidth=document.documentElement.clientWidth;

	//创建元素结点，即登录弹出框
	var oMask=document.createElement("div");
	oMask.id="mask";
	oMask.style.height=sHeight+'px';
	oMask.style.width=sWidth+'px';
	document.body.appendChild(oMask);
	var oLogin=document.createElement("div");
	oLogin.id="login";
	oLogin.innerHTML="<div id='logincontent'><div id='close'></div><div class='login_logo'><p>登录</p></div><div class='login_content'></div></div>";
	document.body.appendChild(oLogin);

	//获取login的宽度和高度
	var dHeight=oLogin.offsetHeight;
	var dWidth=oLogin.offsetWidth;
	
	//让弹出框居中
	oLogin.style.top=(cHeight-dHeight)/2 +'px';
	oLogin.style.left=(cWidth-dWidth)/2 + 'px';

	//window.onload=drag;

	var oClose=document.getElementById("close");
	//oMask.onclick=oClose.onclick=function(){
	oClose.onclick=function(){
		document.body.removeChild(oMask);
		document.body.removeChild(oLogin);
	}	
}

window.onload=function(){
	var oBtn=document.getElementById("btn_login");
/*	var oMask=document.getElementById("mask");
	var oLogin=document.getElementById("login");
	oMask.style.display="none";
	oLogin.style.display="none";*/
	oBtn.onclick=function(){
		//oMask.style.display="block";
		//oLogin.style.display="block";
		//最好在js中创建新窗口
		openNewWin();
		drag();
	}
}
function openNewWin(){
	var oLogin=document.getElementById("login");
	var oClose=document.getElementById("close");
	var oMask=document.getElementById("mask");
	oMask.style.display="block";
	oLogin.style.display="block";
	//获取可视区域高度和宽度
	var cHeight=document.documentElement.clientHeight;
	var cWidth=document.documentElement.clientWidth;

	//获取login的宽度和高度
	var dHeight=oLogin.offsetHeight;
	var dWidth=oLogin.offsetWidth;	

	//让弹出框居中
	oLogin.style.top=(cHeight-dHeight)/2 +'px';
	oLogin.style.left=(cWidth-dWidth)/2 + 'px';	

	oClose.onclick=function(){
		oMask.style.display="none";
		oLogin.style.display="none";
	}	
}