

window.onload=lnit;

var Gametate=0;
var cxt;
var QiPan;				//棋盘图
var Guangb;				//光标图
var QiZi;				//棋子图
var IsBegin=true;			//true 选子     false 落子
var begin_x,begin_y,beginData;		//
var Change=true;

var mymap=[
	[ 1, 2, 5, 4, 0, 4, 5, 2, 1,],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,],
	[-1, 3,-1,-1,-1,-1,-1, 3,-1,],
	[ 6,-1, 6,-1, 6,-1, 6,-1, 6,],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,],
	
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,],
	[13,-1,13,-1,13,-1,13,-1,13,],
	[-1,10,-1,-1,-1,-1,-1,10,-1,],
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,],
	[ 8, 9,12,11, 7,11,12, 9, 8,],	
];

//初始化函数
function lnit(){						
	QiPan=loadImg('img/bg.png');			//加载棋盘
	QiZi=loadImg('img/qz.png');				//加载棋子
	Guangb=loadImg('img/r_box.png');		//加载光标
	
	var Canvas=document.getElementById('Canvas');	
	cxt=Canvas.getContext('2d');		//取得画布控制权		
	setInterval(GameRun,1000/10);			
}


//重新绘制背景图
function Backgroun(){	
	var myimg=new Image();
	myimg.src='img/bg.jpg';
	cxt.drawImage(myimg,0,0,607,270,0,0,607,567);	
}

function loadImg(filename){
	var myimg=new Image();
	myimg.src=filename;
	return myimg;
}

function paint(){					 //游戏循环  绘图函数
	
	cxt.drawImage(QiPan,0,0);
	
	PaintQZ();	
	if(IsBegin==false){											//光标
		cxt.drawImage(Guangb,56.5*begin_y,56.5*begin_x,54,54);
	}
	
}

function PaintQZ()                 //  根据数组绘制棋子的函数
    {
        for(var i=0;i<10;i++)
        {
            for(var j=0;j<9;j++)
            {
				if(mymap[i][j]!=-1)
				{
						cxt.drawImage( QiZi,48*mymap[i][j],0,48,48,57*j,57*i,48,48);
				}
            }
        }
    }

//游戏状态

function GameRun(){		
	switch(Gametate){
		
		case 0:					//游戏菜单
			
			GameMenu();				
			break;
			
		case 1:					//游戏运行
			
			paint();					//绘图
			timerText();				//计时器
			GameText();					//游戏信息

			break;
			
		case 2:					//游戏设置
			
			break;
			
		case 3:					//残局
			
			break;
			
		case 4:					//结束游戏
			GameOver();
			break;	
					
	}
}


//游戏菜单
function GameMenu(){
	
	cxt.font='20px 宋体';
	cxt.fillStyle='red';
	cxt.fillRect(153,230,200,30);
	cxt.fillStyle='white';
	cxt.fillText('开始游戏',173,250);
	
	cxt.fillStyle='darkgrey';
	cxt.fillRect(153,260,200,30);
	cxt.fillStyle='white';
	cxt.fillText('游戏设置',173,280);
	
	cxt.fillStyle='black';
	cxt.fillRect(153,290,200,30);
	cxt.fillStyle='white';
	cxt.fillText('残局',173,310);
	
}

//鼠标点击函数
var x,y;
var sum=0;
function Move(){
	var leftOffset=(window.innerWidth-600)/2;//画布离左边宽度=(窗口宽度-800)/2
	if(leftOffset<0){						//如果为负  则等于0
		leftOffset=0;
	}
	
	var canvas_x=event.x-leftOffset;				//    
	var canvas_y=(event.y-20)+document.body.scrollTop; //body.scrollTop :页面滚动高度
	
	x=(parseInt((canvas_y)/56));			//对应数组的x轴
	y=(parseInt((canvas_x)/56)); 			//对应数组的y轴
		
//	console.log(event.x+'/'+event.y);
	console.log(canvas_x+'/'+canvas_y);
    
    if(Gametate==0){
    	
    	if(canvas_x>153&&canvas_x<353 &&canvas_y>211&&canvas_y<241){			//开始游戏	    	
	    	Gametate=1;
	    	
	    	z=0;
	    }
    }  
  	
  	if(Gametate==4){
    	
    	if(canvas_x>150&&canvas_x<250 &&canvas_y>240&&canvas_y<270){			//重新开始	    	
	    	Gametate=1;
	    	
	    	z=0;
	    }
    	
    	if(canvas_x>250&&canvas_x<350 &&canvas_y>240&&canvas_y<270){			//返回菜单	    	
	    	Backgroun();
	    	Gametate=0;
	    }
    }  
	  	
//	luozi();  
//	function luozi(){
  		
//		if(Gametate==1){  			
  		
	    	if(IsBegin)//选子
			{
				if(Change==true){
					if(mymap[x][y]>6)
					{
						begin_x = x;
						begin_y = y;
						beginData =  mymap[x][y];
						IsBegin = !IsBegin;
						Change= !Change;
					}
				}
				else if(Change!=true){					
					if(mymap[x][y]!=-1 && mymap[x][y]<7)
					{
						begin_x = x;
						begin_y = y;
						beginData =  mymap[x][y];
						IsBegin = !IsBegin;
						Change= !Change;
					}
				}
			}			
			else {			
				//改变选中的棋子光标
				if((mymap[begin_x][begin_y]<7 && mymap[x][y]<7 || mymap[begin_x][begin_y]> 6 && mymap[x][y] > 6 )&& mymap[x][y]>-1){
					begin_x=x;
					begin_y=y;
					beginData=mymap[x][y];
					console.log('----'+mymap[x][y]);
				}				
				
				if(IsRun())   //  落子是否符合规则
						{
							panduan();
							mymap[x][y] = beginData ;
							mymap[begin_x][begin_y] = -1;
							IsBegin = !IsBegin;	
							sum++;
							console.log('棋子：'+mymap[x][y]);
							wang();
							QzNumber=0;
							//判断下一步 显示的文字描述
							if(mymap[x][y]<7){
								WhoIsWin='红棋';
								WinColor='red';
							}else{
								WhoIsWin='黑棋';
								WinColor='black';
							}
						}
			}
//		}
//	}			
	console.log('x:'+x+'/'+'y:'+y);	
	console.log('begin_x:'+begin_x+'/'+'begin_y:'+begin_y);
//	console.log(mymap[x][y]);    
}

//键盘事件
function KeyDowm(){
		
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if(e && e.keyCode==27){ // 按 Esc 
		if(Gametate == 1||Gametate == 2||Gametate == 4)
		{
			Backgroun();
			empty();
			Gametate = 0;			
			z=0;
		}
	}
}

//判断输赢
var WhoIsWin='红棋';
var WinColor='red';
function panduan(){	
	if(mymap[x][y]==0)
	{
		setTimeout(function(){		 		//0.5秒后运行函数
		 	Gametate=4;
			empty();
			WhoIsWin='红棋';
			WinColor='red';
		},500); 
		
	}
	else if(mymap[x][y]==7)
	{
		setTimeout(function(){		 		//0.5秒后运行函数
		 	Gametate=4;
			empty();
			WhoIsWin='黑棋';
			WinColor='black';
		},500); 
	}	
}

//初始化棋盘
function empty(){
	mymap=[
		[ 1, 2, 5, 4, 0, 4, 5, 2, 1,],
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,],
		[-1, 3,-1,-1,-1,-1,-1, 3,-1,],
		[ 6,-1, 6,-1, 6,-1, 6,-1, 6,],
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,],
		
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,],
		[13,-1,13,-1,13,-1,13,-1,13,],
		[-1,10,-1,-1,-1,-1,-1,10,-1,],
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,],
		[ 8, 9,12,11, 7,11,12, 9, 8,],	
	];
}

//两王相见的判断
var jiang_x,jiang_y=0;			//将的坐标
var shuai_x,shuai_y=0;			//帅的坐标
var QzNumber=0;					//将-帅之间的棋子个数
function wang(){				
	for(var i=0;i<3;i++){
		for(var j=3;j<6;j++){
			if(mymap[i][j]==0){
				jiang_x=i;
				jiang_y=j;
			}
		}
	}
	for(var i=7;i<10;i++){
		for(var j=3;j<6;j++){
			if(mymap[i][j]==7){
				shuai_x=i;
				shuai_y=j;
			}
		}
	}
	for(var i=jiang_x;i<shuai_x;i++){
		if(mymap[i][jiang_y]!=-1){
			QzNumber++;			
		}
		console.log(QzNumber);
	}
	if(shuai_y==jiang_y&& QzNumber==1){
		setTimeout(function(){			
			Gametate=4;			
			if(mymap[x][y]<7){
				WinColor='red';
				WhoIsWin='红棋';
			}else{
				WinColor='black';
				WhoIsWin='黑棋';
			}
			empty();			
		},500)		
	}	
}


//结束菜单
function GameOver(){	
	cxt.font='20px 宋体';
	cxt.fillStyle='darkgrey';
	cxt.fillRect(153,230,200,30);
	cxt.fillStyle='white';
	cxt.fillText('游戏结束：',160,250);
	cxt.fillStyle=WinColor;
	cxt.fillText(WhoIsWin,250,250);
	cxt.fillStyle='white';
	cxt.fillText('胜利！',300,250);
	
	cxt.fillStyle='blue';
	cxt.fillRect(153,260,100,30);
	cxt.fillStyle='white';
	cxt.fillText('重新开始',160,280);
	
	cxt.fillStyle='black';
	cxt.fillRect(253,260,100,30);
	cxt.fillStyle='white';
	cxt.fillText('返回菜单',267,280);	
}

//计时器
var z=0;			
var t;					
function timerText(){	
	z=z+(1/10);
	t=parseInt(z);
	cxt.fillStyle='#82542f';
	cxt.fillRect(510,0,100,200);
	cxt.font='20px 宋体'
	cxt.fillStyle='white';
	cxt.fillText('游戏时间：',510,20);		
	
	cxt.fillStyle='red';
	cxt.fillText(t,540,50);
	
	cxt.fillStyle='white';
	cxt.fillText('s',570,50)	
}

//游戏信息
function GameText(){	
	cxt.font='20px 宋体'
	cxt.fillStyle='white';	
	cxt.fillText('本次：',510,80);	
	cxt.fillStyle=WinColor;
	cxt.fillText(WhoIsWin,510,110);	
	cxt.fillStyle='white';	
	cxt.fillText('走！',560,110);	
}

//判断落子是否符合规则
function IsRun(){
	if(begin_x==x && begin_y==y ) return false;
		switch(beginData)
		{
			case 0:   // 黑将
			   	return B_Jiang();
			case 1:   // 黑车
				return B_Che();
			case 2:    // 黑马
				return B_Ma();
			case 3:    //黑炮
				return B_Pao();
			case 4:   // 黑士
				return B_Shi();
			case 5:   // 黑象
				return B_Xiang();
			case 6:    // 黑卒
				return B_Bing();
				
			case 7:   // 帅
				return R_Shuai();
			case 8:   // 红车
				return R_Che();
			case 9:    // 红马
				return R_Ma();
			case 10:    // 红跑
				return R_Pao();
			case 11:   // 红士
				return R_Shi();
			case 12:   // 红象
				return R_Xiang();
			case 13:    // 红兵
				return R_Bing();			
		}
		return true;
}

function B_Jiang()    // 黑将
	{
		if(x>=0 && x<=2  && y >=3 && y<=5 )
		{
			if(mymap[x][y]>6 ||mymap[x][y]==-1 )
			{
				if((Math.abs(x-begin_x)==1 &&(y-begin_y)==0)||
					(Math.abs(y-begin_y)==1 &&(x-begin_x)==0))
				{
					return true;
				}
			}
		}
		return false;
	}

function B_Che()      // 黑车
	{
		if( (x-begin_x )==0 ) //同一行
		{
			if(mymap[x][y]>6 ||mymap[x][y]==-1)   //敌人或空
			{
				var min;
				var max;
				if (y > begin_y) {
					min = begin_y;
					max = y;
				} else {
					max = begin_y;
					min = y;
				}
				for (var i = min + 1; i < max ; i++) {
					if (mymap[x][i] != -1) {
						return false;
					}
				}
				return true;
			}
			return false;
		}
			if((y-begin_y)==0)    //同一列
			{
				if (mymap[x][y] > 6 || mymap[x][y] == -1) //敌人或空
				{
					var min;
					var max;
					if (x > begin_x) {
						min = begin_x;
						max = x;
					} else {
						max = begin_x;
						min = x;
					}
					for (var i = min + 1; i < max ; i++) {
						if (mymap[i][y] != -1) {
							return false;
						}
					}
					return true;
				}
				return false;
			}

	}

function B_Shi()      // 黑士
	{
		if(x>=0 && x<=2  && y >=3 && y<=5 )
		{
			if(mymap[x][y]>6 ||mymap[x][y]==-1 )
			{
				if((Math.abs(x-begin_x)==1 && (Math.abs(y-begin_y)==1)) )
				{
					return true;
				}
			}
		}
		return false;
	}
	

	 
function B_Ma()       // 黑马
	{
		if((Math.abs(x-begin_x)==2 && Math.abs(y-begin_y)==1))  //  日
		{
			if(x<begin_x)
			{
				if((mymap[x][y]>6 ||mymap[x][y]==-1) && mymap[begin_x-1][begin_y]==-1)
				{
					return true;
				}
			}else
			{
				if((mymap[x][y]>6 ||mymap[x][y]==-1) && mymap[begin_x+1][begin_y]==-1)
				{
					return true;
				}
			}

			return false;
		}
		if((Math.abs(y-begin_y)==2 && Math.abs(x-begin_x)==1))   //平  日
		{
			if(y<begin_y)
			{
				if((mymap[x][y]>6 ||mymap[x][y]==-1) && mymap[begin_x][begin_y-1]==-1)
				{
					return true;
				}
			}else
			{
				if((mymap[x][y]>6 ||mymap[x][y]==-1) && mymap[begin_x][begin_y+1]==-1)
				{
					return true;
				}
			}
			return false;
		}
		return false;
	}	 

function B_Xiang()    // 黑象
	{
		if(x<5)   //将象限定在自己区域移动
		{
			if(mymap[x][y]>6 ||mymap[x][y]==-1 )  //落子点为空或为敌方棋子
			{
				if ((Math.abs(x - begin_x) == 2 && (Math.abs(y - begin_y) == 2)))//移动为田字格
				{
					if(x>begin_x) //落子点在下方
					{
						if(y>begin_y)//落子点在右方
						{
							if(mymap[x-1][y-1]==-1)
								return true;
						}else   //落子点在左方
						{
							if(mymap[x-1][y+1]==-1)
								return true;
						}

					}else       //落子点在上方
					{
						if(y>begin_y)//落子点在右方
						{
							if(mymap[x+1][y-1]==-1)
								return true;
						}else   //落子点在左方
						{
							if(mymap[x+1][y+1]==-1)
								return true;
						}
					}

				}
			}

		}
		return false;
	}

function B_Bing()				//黑兵
	{
		if(mymap[x][y]>6 ||mymap[x][y]==-1 )  //落子点为空或为敌方棋子
		{
			if (x < 5)  //自己区域
			{
				if (y == begin_y && x == begin_x + 1) {
					return true;
				}
			} else    //已过河
			{
				if((y == begin_y && x == begin_x + 1)||(x == begin_x && Math.abs(y-begin_y)==1) )
				{
					return true;
				}
			}
		}
		return false;
	}

function B_Pao()				//黑炮
	{
		if( (x-begin_x )==0 ) //同一行
		{
			if(mymap[x][y]>6 )   //敌人 
			{
				var min;
				var max;
				var sum = 0;
				if (y > begin_y) {
					min = begin_y;
					max = y;
				} else {
					max = begin_y;
					min = y;
				}
				for (var i = min + 1; i < max ; i++) {
					if (mymap[x][i] != -1) {
						sum ++;
					}
				}
				if(sum!=1)
					return false;
				return true;
			}
			if(mymap[x][y]==-1)  // 空
			{
				var min;
				var max;
				if (y > begin_y) {
					min = begin_y;
					max = y;
				} else {
					max = begin_y;
					min = y;
				}
				for (var i = min + 1; i < max ; i++) {
					if (mymap[x][i] != -1) {
						return false;
					}
				}
				return true;
			}
			return false;
		}		
			if((y-begin_y)==0)    //同一列
			{
				if (mymap[x][y] > 6  ) //敌人 
				{
					var min;
					var max;
					var sum = 0;
					if (x > begin_x) {
						min = begin_x;
						max = x;
					} else {
						max = begin_x;
						min = x;
					}
					for (var i = min + 1; i < max ; i++) {
						if (mymap[i][y] != -1) {
							sum++;
						}
					}
					if(sum!=1)
						return false;
					return true;
				}
				
				if (  mymap[x][y] == -1) // 空
				{
					var min;
					var max;
					if (x > begin_x) {
						min = begin_x;
						max = x;
					} else {
						max = begin_x;
						min = x;
					}
					for (var i = min + 1; i < max ; i++) {
						if (mymap[i][y] != -1) {
							return false;
						}
					}
					return true;
				}
				return false;
			}

	}

//红帅————————————————————————————————————————————————————————————

function R_Shuai()  								
	{
		 if(x>=7 && x<=9  && y >=3 && y<=5 )
		 {
			 if(mymap[x][y]<=6)
			 {
				 if((Math.abs(x-begin_x)==1 &&(y-begin_y)==0)||
					 (Math.abs(y-begin_y)==1 &&(x-begin_x)==0))
				 {
					 return true;
				 }
			 }
		 }
		 return false;
	}


//————————红车————————————
function R_Che(){
	
	if((x-begin_x)==0){			//同一行
		if(mymap[x][y]<7 || mymap[x][y]==-1){
			var min;
			var max;
			if(y>begin_y){
				min =begin_y;
				max =y;
			}else{
				min =y;
				max =begin_y;
			}
			for(var i = min + 1; i < max ; i++){
				if (mymap[x][i] != -1) {
					return false;
				}
			}
			return true;
		}
		return false;
	}
	
	if((y-begin_y)==0)    //同一列
	{
		if (mymap[x][y] < 7 || mymap[x][y] == -1) //敌人或空
		{
			var min;
			var max;
			if (x > begin_x) {
				min = begin_x;
				max = x;
			} else {
				max = begin_x;
				min = x;
			}
			for (var i = min + 1; i < max ; i++) {
				if (mymap[i][y] != -1) {
					return false;
				}
				console.log('min:'+min+'/max:'+max);
				console.log('i:'+i);
			}
			return true;
		}
		return false;
	}
}

//————————红兵————————————
function R_Bing()				
	{
		if(mymap[x][y]<7 ||mymap[x][y]==-1 )  //落子点为空或为敌方棋子
		{
			if (x > 4)  //自己区域
			{
				if (y == begin_y && x == begin_x - 1) {
					return true;
				}
			} else    //已过河
			{
				if((y == begin_y && x == begin_x - 1)||(x == begin_x && Math.abs(y-begin_y)==1) )
				{
					return true;
				}
			}
		}
		return false;
	}

//————————红马————————————
function R_Ma(){				
	
	if(mymap[x][y]<7 || mymap[x][y]==-1){
		
		if(Math.abs(x-begin_x)==2 && Math.abs(y-begin_y)==1){	//日
			
			if(begin_x>x){
				
				if(mymap[begin_x-1][begin_y]==-1){					//前蹩脚			
					return true;
				}
			}else{
				
				if(mymap[begin_x+1][begin_y]==-1){						//后蹩脚		
					return true;
				}
			}
			
			return false;
		}
		
		if(Math.abs(x-begin_x)==1 && Math.abs(y-begin_y)==2){			//平日
			
			if(begin_y>y){
				
				if(mymap[begin_x][begin_y-1]==-1){							
					return true;
				}
			}else{
				
				if(mymap[begin_x][begin_y+1]==-1){							
					return true;
				}
			}
			
			return false;
		}
		
	}
	return false;
	
}


//————————红炮————————————
function R_Pao()				
	{
		if( (x-begin_x )==0 ) //同一行
		{
			if(mymap[x][y]<7 && mymap[x][y]!=-1)   //敌人 
			{
				var min;
				var max;
				var sum = 0;
				if (y > begin_y) {
					min = begin_y;
					max = y;
				} else {
					max = begin_y;
					min = y;
				}
				for (var i = min + 1; i < max ; i++) {
					if (mymap[x][i] != -1) {
						sum ++;
					}
				}
				if(sum!=1){					
					return false;
				}
				return true;
			}
			if(mymap[x][y]==-1)  // 空
			{
				var min;
				var max;
				if (y > begin_y) {
					min = begin_y;
					max = y;
				} else {
					max = begin_y;
					min = y;
				}
				for (var i = min + 1; i < max ; i++) {
					if (mymap[x][i] != -1) {
						return false;
					}
				}
				return true;
			}
			return false;
		}
			if((y-begin_y)==0)    //同一列
			{
				if (mymap[x][y]<7 && mymap[x][y]!=-1  ) //敌人 
				{
					var min;
					var max;
					var sum = 0;
					if (x > begin_x) {
						min = begin_x;
						max = x;
					} else {
						max = begin_x;
						min = x;
					}
					for (var i = min + 1; i < max ; i++) {
						if (mymap[i][y] != -1) {
							sum++;
						}
					}
					if(sum!=1)
						return false;
					return true;
				}
				
				if (  mymap[x][y] == -1) // 空
				{
					var min;
					var max;
					if (x > begin_x) {
						min = begin_x;
						max = x;
					} else {
						max = begin_x;
						min = x;
					}
					for (var i = min + 1; i < max ; i++) {
						if (mymap[i][y] != -1) {
							return false;
						}
					}
					return true;
				}
				return false;
			}

	}				




//————————红相————————————
function R_Xiang()    
	{
		if(x>4)   //将象限定在自己区域移动
		{
			if(mymap[x][y]<7 ||mymap[x][y]==-1 )  //落子点为空或为敌方棋子
			{
				if ((Math.abs(x - begin_x) == 2 && (Math.abs(y - begin_y) == 2)))//移动为田字格
				{
					if(x>begin_x) //落子点在上方
					{
						if(y>begin_y)//落子点在右方
						{
							if(mymap[x-1][y-1]==-1)
								return true;
						}else   //落子点在左方
						{
							if(mymap[x-1][y+1]==-1)
								return true;
						}

					}else       //落子点在下方
					{
						if(y>begin_y)//落子点在右方
						{
							if(mymap[x+1][y-1]==-1)
								return true;
						}else   //落子点在左方
						{
							if(mymap[x+1][y+1]==-1)
								return true;
						}
					}

				}
			}

		}
		return false;
	}
	
//--------------红士--------------

function R_Shi()      
	{
		if(x>=7 && x<=9  && y >=3 && y<=5 )
		{
			if(mymap[x][y]<7 ||mymap[x][y]==-1 )
			{
				if((Math.abs(x-begin_x)==1 && (Math.abs(y-begin_y)==1)) )
				{
					return true;
				}
			}
		}
		return false;
	}
	



	