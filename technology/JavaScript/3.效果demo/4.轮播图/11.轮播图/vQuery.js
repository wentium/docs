//获取对象CSS样式
function getStyle(obj,attr) {//对象，属性
	if (obj.currentStyle) {
		return obj.currentStyle[attr];	//IE模式
	} else {
		return getComputedStyle(obj,false)[attr];//FF模式
	} 
}

//在同一个事件上，添加多个对象函数，按照顺序执行，彼此不干扰
function myAddEvent(obj,sEv,fn) {
	
	if (obj.attachEvent) { //IE 下 (ie下有bug会把绑定事情的对象this指针指向window)
		obj.attachEvent('on'+sEv,function() {
			//调用fn函数，并且把这个函数指定给传入的对象
			if (false == fn.call(obj)) {
				event.cancelBubble = true;	//防止时间冒泡
				return false;						//阻止浏览器默认事件
			}
				
		})	;
	} else {	//FF	下				  	
		obj.addEventListener(sEv,function (ev) {
			if (false == fn.call(obj)) {
				ev.cancelBubble = true;			//防止时间冒泡
				ev.preventDefault();//FF事件绑定中  阻止浏览器默认事件
			}
		},false);
	}
}

//把数组二添加到数组一中
 function appendArr(arr1,arr2) {
 	var i = null;
 	for (i=0;i<arr2.length;i++) {
 		arr1.push(arr2[i]);
 	}
 }

//父级对象下，搜索指定class
function getByClass(oParent,sClass) {//父级,className
	var aEle = oParent.getElementsByTagName('*');	//选取父级下所有元素
	var aResult = new Array();
	var i = null;
	for (i=0;i<aEle.length;i++) {
		if (aEle[i].className == sClass) {
			aResult.push(aEle[i]);
		}
	}
	return aResult;
}

//获取同级元素的序号
function getIndex(obj) {
	//			  对象.      父级.           子级
	var all = obj.parentNode.children;		//对象同级的所有元素
	var i = null;
	for(i=0;i<all.length;i++) {
		if (all[i] == obj) {	//如果找到和自己一样的
			return i;
		}
	}	
	return null;
}




//实例化一个vQuery对象
function $(vArg) {
	return new VQuery(vArg); 
}

//构造类
function VQuery(vArg) {	//选择器

	//实例化就运行的方法
	this.elements = new Array();//存放对象
	
	switch(typeof vArg) {
		case 'function' :
			myAddEvent(window,'load',vArg);//对象、事件、方法
			break;
		case 'string' :
			switch (vArg.charAt(0)) {//返回字符串第1字符
				case '#' :		//id
					var obj = window.document.getElementById(vArg.substring(1));
					//substring(1)窃取字符串，跳过第一个字符
					this.elements.push(obj);
					break;
				case '.' :		//class
					this.elements = getByClass(document,vArg.substring(1));
					break;
				default :		//标签
				 	this.elements = window.document.getElementsByTagName(vArg);
			}
			break;	
		case 'object' :		//对象
			this.elements.push(vArg);
			break;	 
	}
}

//函数对象原型添加方法

//点击事件
VQuery.prototype.click = function (fn) {		
	var i = null;
	for(i=0;i<this.elements.length;i++) {
		myAddEvent(this.elements[i],'click',fn);
	}
	return this;//返回对象
}


//显示
VQuery.prototype.show = function(fn) {
	var i = null;
	for(i=0;i<this.elements.length;i++) {
		this.elements[i].style.display = 'block';
	}
	return this;//返回对象
}


//影藏
VQuery.prototype.hide = function (fn) {
	var i = null;
	for(i=0;i<this.elements.length;i++) {
		this.elements[i].style.display = 'none';
	}	
	return this;//返回对象
}


//移入、移除
VQuery.prototype.hover = function (fnOver,fnOut) {
	var i = null;
	for(i=0;i<this.elements.length;i++) {
		myAddEvent(this.elements[i],'mouseover',fnOver);
		myAddEvent(this.elements[i],'mouseout',fnOut);
	}
	return this;//返回对象
}


//设置、获取样式
VQuery.prototype.css = function(attr,value) {
	var i = null;
	
	if (arguments.length == 2) { //设置样式
		for(i=0;i<this.elements.length;i++) {
			this.elements[i].style[attr] = value;
		}
	} else {		
		
		if (typeof attr == 'string') {		//获取样式
			return	getStyle(this.elements[0],attr);//获取匹配到的第一个CSS样式	
		} else {		//设置多个样式
			for (i=0;i<this.elements.length;i++) {//遍历对象
				for (var key in attr) {								//遍历整个Json
					this.elements[i].style[key] =  attr[key];//添加到一个对象中
				}
			}
		}
	}
	return this;//返回对象
}


//切换
VQuery.prototype.toggle = function () {//参数为执行函数
	var i = null;
	var _arguments = arguments;//存放toggle的参数信息，返回数组
	
	//执行函数
	function addtoggle(obj) {	//指定对象												
		var count = 0;			//闭包，每个对象独享这个变量												
		myAddEvent(obj,'click',function() {								//绑定事件
			//0 % 3 =0    //1 % 3 =1    //2 % 3 =2    //3 % 3 =0   
			_arguments[count % _arguments.length].call(obj);//对象执行函数
			count++;	//每次执行累加
		});
	}
	
	for(i=0;i<this.elements.length;i++) {
			addtoggle(this.elements[i]);	//为每个对象设置一个事件和一个执行函数
	}
	
	return this;//返回对象
}


//获取、设置标签的属性
VQuery.prototype.attr = function (attr,value) {
	if (arguments.length == 2) {
		var i = null;
		for(i=0;i<this.elements.length;i++) {
			this.elements[i][attr] = value;
		}
	} else {
		return this.elements[0][attr];
	}
	return this;//返回对象
}


//选中DOM对象，返回VQuery对象
 VQuery.prototype.eq = function (n) {
 	return $(this.elements[n]) ;	  //把选中对象的第N个DOM对象转换为VQuery对象

 }
 
 
 //选择父级下的指定标签，返回出去
  VQuery.prototype.find = function(str) {
  	var i = null;
  	var aResult = new Array();//存放获取到的对象
  	
  	for (i=0;i<this.elements.length;i++) {	//遍历选中的对象
  	
  		switch (str.charAt(0)) {
  			case '.' :	//样式选择器 如：class="div1"
  				//在所有父级对象下，选中指定的class
  				var aEle = getByClass(this.elements[i],str.substring(1));	
  				appendArr (aResult,aEle);		//把选中的对象添加到数组中
  				break;
  			default:	//标签选择器 如： div
  				//在所有父级对象下，选中指定的标签名
  				var aEle = this.elements[i].getElementsByTagName(str);
  				appendArr (aResult,aEle);		//把选中的标签名加到数组中
  		}
  		
  	}
  	
  	//把父级下找到的指定标签，放到一个新的对象中，返回出去
  	var newVQuery = $();		//定义一个新的VQuery对象
  	newVQuery.elements = aResult;		//为新对象成员字段赋值
  	return newVQuery;			//再把对象返回出去
  	
  }
 
 
 //取得同级元素下的当前对象的序号
 VQuery.prototype.index = function () {
 	
 	return getIndex(this.elements[0]);//返回对象元素序号
 	
 }
 
 
 //添加任意事件
  VQuery.prototype.bind = function (sEv,fn) {//事件名，函数
  	var i = null;
  	for(i=0;i<this.elements.length;i++) {
  		myAddEvent(this.elements[i],sEv,fn);
  	}
  	
  	return this;
  }
 
 
 //在原型上添加方法
VQuery.prototype.extend = function (name,fn) {
	VQuery.prototype[name] = fn;//在原型上添加方法
	/*如：
	 * $().extend('show',function(){
		return this.elements.length;
	} );
	 */
}
 

//计算选中元素个数
 VQuery.prototype.size = function () {
 	return this.elements.length;
 }
 
 
 //运动框架
 VQuery.prototype.animate = function (json,fn) {	//
  	var i =null;
  	
	for (i=0;i<this.elements.length;i++) {	//为所有选中的对象添加运动
		startMove(this.elements[i],json,fn);	//运动
	}

	//完美运动框架
	function startMove(oBject,json,fn) {	//对象,json数组,执行函数
		if(oBject.timer) clearInterval(oBject.timer);	//如果定时器开启则关闭
		
		oBject.timer= setInterval(function(){		//每隔30毫秒执行一次
			var oStop = true;//		所用运动结束，设置为true
			
		//1.取当前值
			for (var key in json) {	//同时改变json数组中的所有值
				//获取对象当前计算过后的CSS样式中的某一属性值。
				var iCur = '';	//转换样式string为number
				switch (key) {	
					case 'opacity':
						//计算机对小数处理，会出现各种问题，比如不能整除的数，会出现bug，所有，尽量用整数代替小数
						iCur = parseInt(parseFloat(getStyle(oBject,key))*100); //取整
						//oText.value += iCur+'\n';
						break;
					case 'background':	
						iCur = json[key];
						break;
					default:
						iCur = parseInt(getStyle(oBject,key));	//获取对象当前CSS行间样式中属性的值(取整)
				}
				
		//2.算速度
				//CSS样式属性改变值幅度  
				//速度 = (目标距离 - 对象当前位置) / 码数  
				var iSpeed = (json[key] - iCur) / 7;				
				//把+-小数取整
				iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			
		//3.检测停止。
				if (iCur != json[key]) {	//对象当前值不是目标值
					oStop=false;			//设置为false
				}
				
				//改变对象行间样式
				switch (key) {		
					case 'opacity':	//相片透明度
						//FF下
						oBject.style.opacity = (iCur+iSpeed) / 100;		
						//oBject.style.filter = 'alpha(opacity:'+(iCur+iSpeed)+')';	//IE模式				
						break;			
					case 'background'://背景
						oBject.style[key] = json[key];		
						break;
					default:	//数字样式
						//对象行间样式 = 对象当前样式+速度
						oBject.style[key] = iCur+iSpeed+'px';					
				}
			}
	
			//循环结束后，才关闭定时器
			if(oStop) {	
				clearInterval(oBject.timer);	//结束执行
				//alert('');
				if (fn) {	//链式运动
					fn();
				}
			}				
		},30);
	}
	
}
