  1//记录轮播的次数
  2         var count = 0;
  3         //轮播的方向,默认向右
  4         var isgo = 0;
  5         //第一计时器对象
  6         var timer;
  7         //获取ul元素
  8         var ul_img = document.getElementsByClassName("ul_img")[0];
  9         //获取所有li图片元素
 10         var li_img = document.getElementsByClassName("li_img");
 11         //第一部分，设置定时器
 12         function showtime(){
 13             timer = setInterval(function(){
 14                 if(isgo==false){ //isgo为false表示向右轮播
 15                     count++;
 16                     if(count>=li_img.length-1){ //如果轮播到右边界，往反方向轮播
 17                         count = li_img.length-1;
 18                         isgo=true;
 19                     }
 20                     //显示轮播到的当前图片，图片轮播的原理就是把图片排成一行，
 21                     //然后准备一个只有一张图片大小的容器，对这个容器设置超出部分隐藏，
 22                     //再控制定时器来让这些图片整体左移或右移，这样呈现出来的效果就是图片在轮播了
 23                     ul_img.style.transform = "translate("+ -800*count +"px)";
 24                 }else{ //isgo为true表示向左轮播
 25                     count--;
 26                     if (count<=0) { //如果轮播到左边界，往反方向轮播
 27                         count = 0;
 28                         isgo=false;
 29                     }
 30                     //显示轮播到的当前图片
 31                     ul_img.style.transform = "translate("+ -800*count +"px)";
 32                 }
 33
 34                 for (var i = 0; i < div_btn.length; i++) {
 35                 //这里是给下面的圆角矩形设置颜色，当轮播到这张图片时，显示为深色，否则显示为浅色
 36                     div_btn[i].style.backgroundColor = "aquamarine";
 37                 }
 38                 div_btn[count].style.backgroundColor = "aqua";
 39             },4000);//每次延迟4秒钟
 40         }
 41         showtime();
 42
 43         //第二部分，为箭头添加事件
 44         //获取控制方向的箭头元素
 45         var arrow = document.getElementsByClassName("arrow");
 46         //为箭头绑定事件
 47         for(var i=0; i<arrow.length ;i++){
 48             //鼠标悬停时
 49             arrow[i].onmouseover = function(){
 50                 //停止计时器
 51                 clearInterval(timer);
 52             }
 53             //鼠标离开时，开始轮播
 54             arrow[i].onmouseout = function(){
 55                 showtime();
 56             }
 57             //鼠标点击时，轮播一张图片
 58             arrow[i].onclick = function(){
 59                 //区分左右箭头
 60                 if(this.title==0){ //点击的是右箭头时，往右轮播
 61                     count++;
 62                     if(count>3) {
 63                         count = 0;
 64                     }
 65                 }else{
 66                     count--;
 67                     if(count<0){
 68                         count=3;
 69                     }
 70                 }
 71                 //显示轮播到的当前图片
 72                 ul_img.style.transform="translate("+ -800*count+"px)";
 73                 for (var i = 0; i < div_btn.length; i++) {
 74                             div_btn[i].style.backgroundColor = "aquamarine";
 75                         }
 76                         div_btn[count].style.backgroundColor = "aqua";
 77             }
 78         }
 79
 80          //第三部分
 81         //鼠标悬停在底部圆角矩形的操作
 82         var div_btn = document.getElementsByClassName("div_btn");
 83         div_btn[0].style.backgroundColor = "aqua"; //刚开始时，默认在第一张图，下面的圆角矩形应显示为深色
 84         for (var i = 0; i<div_btn.length; i++) { //给每个圆角矩形添加事件
 85             div_btn[i].index = i;
 86             div_btn[i].onmouseover = function(){
 87                 //当鼠标落在某个圆角矩形时
 88                 clearInterval(timer); //停止定时器
 89                 for(var j=0;j<div_btn.length;j++){ //设置矩形的颜色
 90                     div_btn[j].style.backgroundColor="aquamarine";
 91                 }
 92                 div_btn[this.index].style.backgroundColor="aqua";
 93                 //控制方向，当鼠标停留在边界时，需设置轮播的方向，便于
 94                 //鼠标离开重新启动定时器时，轮播的方向正确
 95                 if (this.index==3) {
 96                     isgo = true;
 97                 }
 98                 if (this.index==0) {
 99                     isgo = false;
100                 }
101                 //让count值对应
102                 count = this.index;
103                 ul_img.style.transform = "translate("+ -800*this.index +"px)";
104             }
105             div_btn[i].onmouseout = function(){//鼠标离开时
106                 //重新启动计时器
107                 showtime();
108             }
109         }