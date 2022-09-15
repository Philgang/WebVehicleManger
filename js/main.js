  //车辆数量
  var AllCarNum = 5;

  var Goalsendsign = false;
  // 全局变量
  var ClickSign=0;

  var car1_ros;
  var ca1_lidar_viewer;
  var Car1Posx ;
  var Car1Posy ;
  var CarOrx;
  var CarOry;
  var CarOrz;
  var CarOrw;
  var Car1Speed ;
  var Car_timer=null;
  var anuspeed;
  var drawposx = new Array();
  var drawposy = new Array();
  var XD = new Array();

  var drawvelocity = new Array();
  var drawangular = new Array();
  var DrawX = new Array();
  var circle=document.getElementById("circle");

  var GoalList = new Array;

  var cmdGoal;
  var GoalSign = false;
  var curGoalIdx_ = 0;





  var ModeSign=0; 

  var MessIndex=document.getElementById("MessIndex");
  var ShaPanIndex=document.getElementById("ShaPanIndex");
  var carmap=document.getElementById("carmap");


  var carare=document.getElementById("carare");
  var Messcarare=document.getElementById("Messcarare");
  var Mapcarare=document.getElementById("Mapcarare");


  var speed_sig = document.getElementById("speed_sig");
  // speed_sig.transform.animVal[1].setRotate(0,10,0);
    
  // console.log( speed_sig.transform.animVal[1]);
  
  var car1 = document.getElementById("movecar1");
  car1.style.display="none";
  var carcontrol = document.getElementById("carcontrol");
  carcontrol.style.display = "none";

  // document.getElementById("carare").style.display = "none";
  var car1cfg = document.getElementById("car1cfg");
  car1cfg.style.display = "none";

  var car2cfg = document.getElementById("car2cfg");
  car2cfg.style.display = "none";

  var car3cfg = document.getElementById("car3cfg");
  car3cfg.style.display = "none";

  var showShapan = document.getElementById("showShapan");
  var showMap = document.getElementById("showMap");
  showMap.style.display="none"

  var ShaPanStatus = document.getElementById("ShaPanStatus");
  ShaPanStatus.style.display = "none";


  var car_index = 0;


  TabChange("#tabs",0)
  TabChange("#navtabs",1)


/**
 * @description: 车辆图片点击，配置界面响应函数
 * @return {*}
 * @author: Phil
 */


function car1click(id){
    var carcfglis = document.querySelectorAll('.cfg');
    // console.log(carcfglis);
    if(car_index==id){
      carcfglis[id-1].style.display = "block";
      console.log(carcfglis[id]);
    }
  }

 
/**
 * @description: 选择车辆数量，界面进行响应
 * @return {*}
 * @author: Phil
 */


function numChange(){
    var caid1 = document.getElementById("carid1");
    var caid2 = document.getElementById("carid2");
    var caid3 = document.getElementById("carid3");

    var car_num=document.getElementById("car_num");
    car_index=car_num.selectedIndex ; 
    console.log(car_index);

    for(var i=1;i<=car_index;i++){
      var carname = "carid"+i;
      document.getElementById(carname).style.opacity=1;
    }

    for(var i=1;i<=AllCarNum-car_index;i++){
      var carname = "carid"+(car_index+i);
      document.getElementById(carname).style.opacity=0.3;
    }



  //   if(car_index==0){
  //     document.getElementById("carid1").style.opacity=0.3;
  //     document.getElementById("carid2").style.opacity=0.3;
  //     document.getElementById("carid3").style.opacity=0.3;
     
  // }
  //   else if(car_index==1){
  //   document.getElementById("carid1").style.opacity=1;
  //   document.getElementById("carid2").style.opacity=0.3;
  //   document.getElementById("carid3").style.opacity=0.3;

  //   }


  //   else if(car_index==2){
  //       document.getElementById("carid1").style.opacity=1;
  //       document.getElementById("carid2").style.opacity=1;
  //       document.getElementById("carid3").style.opacity=0.3;
  //   }
  //   else if(car_index==3){
  //       document.getElementById("carid1").style.opacity=1;
  //       document.getElementById("carid2").style.opacity=1;
  //       document.getElementById("carid3").style.opacity=1;
  //   }


    
}

  /**
   * @description: 关闭按钮点击实现车辆配置界面的隐藏
   * @param {*} num：车辆序号
   * @return {*}
   * @author: Phil
   */
  function Closecfg1(num){
      if(num==1){
        car1cfg.style.display = "none";
      }
      if(num==2){
        car2cfg.style.display = "none";
      }
      if(num==3){
        car3cfg.style.display = "none";
      }
  }
  
  /**
   * @description: 车辆配置确定按钮点击响应事件
   * @param {*} index 车辆配置窗口号
   * @return {*}
   * @author: Phil
   */  
  function Carcfg_click(index){
    if (index==1) {

        ShaPanStatus.style.display = "";

      
        var car1ip = document.getElementById("car1ip").value;
        var car1port = document.getElementById("car1port").value;
        console.log(car1ip);
        console.log(car1port);
        var ur1 = 'ws://'+car1ip+':'+car1port;
        console.log(ur1)

        ca1_lidar_viewer = new ROS3D.Viewer({
          divID : 'lidarmsg',
          width : 400,
          height : 300,
          antialias : true
        });

        car1_ros = new ROSLIB.Ros({
         url : ur1
         });

        car1_ros.on('connection', function() {
        console.log('Connected to websocket server.');

        document.getElementById("car1cam").src ="image/r.png";
        document.getElementById("car1lidar").src ="image/r.png";
        document.getElementById("car1cmd").src ="image/r.png";
        car1.style.display="";

        alert("connect success");
        });




        car1_ros.on('error', function(error) {
          console.log('Error connecting to websocket server: ', error);
          document.getElementById("car1cam").src ="image/f.png";
         document.getElementById("car1lidar").src ="image/f.png";
         document.getElementById("car1cmd").src ="image/f.png";
          alert("Connect error,check the ip and port or host!!");
        });


        image_show(car1_ros,car1ip);
        lidarshow(car1_ros,ca1_lidar_viewer);


        var pose_listener = new ROSLIB.Topic({
          ros : car1_ros,
          name : '/ares1/odom',
          messageType : 'nav_msgs/Odometry'
          });

        pose_listener.subscribe(function(message) {
          Car1Posx = message.pose.pose.position.x;
          Car1Posy = message.pose.pose.position.y;
          drawposx.push(Car1Posx.toFixed(2));
          drawposy.push(Car1Posy.toFixed(2));
          XD.push("position");

          Car1Speed = Math.sqrt(message.twist.twist.linear.x**2+message.twist.twist.linear.y**2);
          anuspeed = message.twist.twist.angular.z;

         drawvelocity.push(Car1Speed.toFixed(2));
         drawangular.push(anuspeed.toFixed(2));
         DrawX.push("time");



          // console.log("x:",Car1Posx);
          // console.log("y:",Car1Posy);

          var movex = (Car1Posx+3.5)/0.0067;
          var movey = 888-(Car1Posy+3)/0.0067;
          var moveyaw = Ori2yaw( message.pose.pose.orientation.x,message.pose.pose.orientation.y,
                              message.pose.pose.orientation.z,message.pose.pose.orientation.w);
          console.log("angle:",moveyaw);


          car1 = document.getElementById("movecar1");
          // console.log("x:",parseInt(movex));
          // console.log("y:",parseInt(movey));

          car1.style.left = parseInt(movex)+'px';
          car1.style.top = parseInt(movey)+'px';
          car1.style.transform ='rotate(' + moveyaw + 'deg)';


        //   if(GoalSign==true){
        //     for(var i=0;i< GoalList.length-1;i++){
        //       console.log("aaaaaaaaaaaaaaaaaa",Math.abs(Car1Posx-GoalList[i][0]));
        //       console.log("cccccccccccccccccc",Math.abs(Car1Posy-GoalList[i][1]));
    
        //       if(Math.abs(Car1Posx-GoalList[i][0])<10 || Math.abs(Car1Posy-GoalList[i][1])<10 ){
        //         console.log("bbbbbbbbbb");
    
        //         var cmdGoal1 = new ROSLIB.Topic({
        //           ros : car1_ros,
        //           name : '/move_base_simple/goal',
        //           messageType : 'geometry_msgs/PoseStamped'
        //           });
                
        //         var Mu_goal_point = new ROSLIB.Message({
        //           header:{
        //             frame_id: "map",
        //           },
        //         pose : {
        //           position:{
        //             x :0,
        //             y :0,
        //             z : 0.3
        //           },
        //           orientation:{
        //             x : 0,
        //             y : 0,
        //             z : -0.637020290414,
        //             w : 0.770847033854
          
        //           }
          
        //         }
        //         });
        //         cmdGoal1.publish(Mu_goal_point);
        //       }

        //   }
        // }
          


            });

    







    } 
    else if (index==2) {
        var car2ip = document.getElementById("car2ip").value;
        var car2port = document.getElementById("car2port").value;
        console.log(car2ip);
        console.log(car2port);
    } 

    else if (index==3) {
        var car3ip = document.getElementById("car3ip").value;
        var car3port = document.getElementById("car3port").value;
        console.log(car3ip);
        console.log(car3port);
    } 

  }


  function movecar_click(move_num){

    
    if (move_num==1){
        carcontrol.style.display = "";
        clearInterval(Car_timer);
        Car_timer = setInterval(SetCarPos,1);
        setInterval(DranLine,100);
        carare.style.display="none";
        Messcarare.style.display="block";
        carmap.className = "tab ";
        ShaPanIndex.className = "tab active";
        MessIndex.className = "tab";
       //mapprocess();
        //SetGoalPoint.onclick= function(){ mapprocess("single");}
       


        
    }
  }

  function SetCarPos(){
    // console.log( Car1Posx.toFixed(2)+','+Car1Posy.toFixed(2));
    // console.log(Car1Speed.toFixed(2));
    var Setpos = document.getElementById("pos");
    Setpos.innerHTML = Car1Posx.toFixed(2)+','+Car1Posy.toFixed(2);
    var showspeed=document.getElementById("showspeed");
    showspeed.innerHTML=Car1Speed.toFixed(2);
    var CarAnguler=document.getElementById("CarAnguler");
    CarAnguler.innerHTML=anuspeed.toFixed(2);

  }



 

function TabChange(id,sig){

    var tablist = document.querySelector(id);
    var lis = tablist.querySelectorAll('div');
    var items = document.querySelectorAll('.item');
    //console.log(lis);
    for (var i = 0; i < lis.length; i++) {
        lis[i].setAttribute('index', i);
        lis[i].onclick = function () {
            for (var i = 0; i < lis.length; i++) {
                lis[i].className = 'tab';
                //console.log(i);
            }
            this.className = 'tab active';
            var index = this.getAttribute('index');
            for (var i = 0; i < items.length; i++) {
                items[i].style.display = "none";
  
            }
            if(sig==0){
                items[index].style.display = "block";
                if (index==0 || index==1){
                    showMap.style.display="none";
                    showShapan.style.visibility="visible";
                    carcontrol.style.visibility = "visible";

                    //showShapan.style.display="block";
                    
                }
                if(index==2){
                  showMap.style.display="block";
                   //showShapan.style.display="none";
                  showShapan.style.visibility="hidden";
                  carcontrol.style.visibility = "visible";



                }
            }
            else if(sig ==1){
                items[2].style.display = "block";
                showMap.style.display="block";
                //showShapan.style.display="none";
                showShapan.style.visibility="hidden";
                //carcontrol.style.display = "block";
                carcontrol.style.visibility = "visible";
                carmap.className = "tab active";
                ShaPanIndex.className = "tab";
                MessIndex.className = "tab";

               




            }
        }
    }

}


function bbimg() {

  const container = document.getElementById("showMap");
  const img = document.getElementById("mapare");
  var widthW=100; // 初始化默认宽度
  img.style.width = `${widthW}%`;  // 赋值默认宽度
  container.onmouseover = ()=> {  // 鼠标经过事件
    img.onmousewheel = (b)=> {  // 鼠标滚动事件
      console.log(b); // 打印 b ，可以看到鼠标滚动得很多信息
      b.wheelDelta < 0 ? widthW-- : widthW++;  // 其中 wheelDelta 对象的值就是判断滚轮往前滚还是往后滚：   <0 是往后滚， >0是前滚
      img.style.width = `${widthW}%`;
      //img.style.height = `${widthW}%`;
    }
  }

}

var Vx=0;
var Vy=0;
var Az=0;

function ControlProcess(){
  var ControlMode=document.getElementById("ControlMode");
  var ControlMode_index=ControlMode.selectedIndex ;

  var Controlindex = document.getElementById("Controlindex");
  if(ControlMode_index==0){Controlindex.innerHTML = "Autonomous";}
  else{Controlindex.innerHTML = " Manual";}



  console.log("left key");

  document.onkeydown = keyDown;
 //在Document对象中注册keyDown事件处理函数
 function keyDown(event){ 

  if(ControlMode_index==0){
    console.log("index",ControlMode_index);
    Controlindex.innerHTML = "Autonomous";


    ModeSign=0;
  }
  if(ControlMode_index==1){
    console.log("index",ControlMode_index);
    Controlindex.innerHTML = " Manual";




    ModeSign=1;
  // 方向键控制元素移动函数
     var event = event || window.event;  // 标准化事件对象
     switch(event.keyCode){  // 获取当前按下键盘键的编码
         case 37 :  // 按下左箭头键，向左移动5个像素
             console.log("left move");
             if(Az<0){Az=0.1;}
             else{Az=Az+0.1}
             break;
         case 39 :  // 按下右箭头键，向右移动5个像素
             console.log("right move");
             if(Az>0){Az=-0.1;}
             else{Az=Az-0.1}
             break;
         case 38 :  // 按下上箭头键，向上移动5个像素
             console.log("up move");
             if(Vx<0){Vx=0.1;}
             else{Vx=Vx+0.1}
             break;
         case 40 :  // 按下下箭头键，向下移动5个像素
             console.log("down move");
             if(Vx>0){Vx=-0.1;}
             else{Vx=Vx-0.1}
             break;
         case 32 :  // 按下下箭头键，向下移动5个像素
             console.log("down move");
             Vx=0;
             Az=0;
             break;
     }


     var cmd = new ROSLIB.Topic({
      ros : car1_ros,
      name : '/cmd_vel',
      messageType : 'geometry_msgs/Twist'
      });//创建一个topic,它的名字是'/cmd_vel',,消息类型是'geometry_msgs/Twist'
      var velocity = new ROSLIB.Message({
     
        linear:{
          x : Vx,
          y : 0,
          z : 0,
        },
        angular:{
          x : 0,
          y : 0,
          z : Az,

        }

      });
      cmd.publish(velocity);






    }


 }



  // if(ControlMode_index==0){
  //   ModeSign=0;
  // }
  // else{
   


  // }


}


var status_listener;

function mapprocess(){
    var SetGoalPoint = document.getElementById("SetGoalPoint");
    var SetMultiGoal = document.getElementById("SetMultiGoal");
    var SetVelocity = document.getElementById("SetVelocity");

    
   
   const mapare = document.getElementById("mapare");
   var w=mapare.width;
   var h=mapare.height;
  //  console.log(w)
  //  console.log(h)
   var scw = 512/w;
   var sch =  480/h;




   if(carcontrol.style.display==""& SetGoalPoint.className=="tab active"){



    var pointDiv = document.createElement("div");
    pointDiv.id = "circle";
    pointDiv.style.left = event.offsetX+200+"px";
    pointDiv.style.top = event.offsetY+"px";
    showMap.insertBefore(pointDiv, showMap.lastChild);


    alert('x:' + (event.offsetX*scw).toFixed(0) + "  y:" +  (event.offsetY*sch).toFixed(0));
    var wx=event.offsetX*scw*0.05-13.8;
    var wy=(480-event.offsetY*sch)*0.05-12.2;
    const car_posx = document.getElementById("car_posx");
    const car_posy = document.getElementById("car_posy");
    const car_posyaw = document.getElementById("car_posyaw");

    car_posx.innerHTML = wx.toFixed(2);
    car_posy.innerHTML = wy.toFixed(2);
    car_posyaw.innerHTML = 90.01;
    


    var Posebutton2 = document.getElementById("Posebutton2");
    Posebutton2.onclick = function () {


      // var ros = new ROSLIB.Ros({
      //   url : 'ws://127.0.0.1:9090'
      //   });car1_ros
  
      //   car1_ros.on('connection', function() {
      //   console.log('Connected to websocket server.');
      //  });
  
  
       cmdGoal = new ROSLIB.Topic({
        ros : car1_ros,
        name : '/move_base_simple/goal',
        messageType : 'geometry_msgs/PoseStamped'
        });//创建一个topic,它的名字是'/cmd_vel',,消息类型是'geometry_msgs/Twist'
        var goal_point = new ROSLIB.Message({
          header:{
            frame_id: "map",
          },
        pose : {
          position:{
            x : wx,
            y : wy,
            z : 0.3
          },
          orientation:{
            x : 0,
            y : 0,
            z : -0.637020290414,
            w : 0.770847033854
  
          }
  
        }
        });
        cmdGoal.publish(goal_point);

    }

    }

  if(carcontrol.style.display==""& SetMultiGoal.className=="tab active"){
      console.log("in goal");
      var wx=event.offsetX*scw*0.05-13.8;
      var wy=(480-event.offsetY*sch)*0.05-12.2;

      var msgDiv = document.createElement("div");
      msgDiv.id = "Mulcircle";
      msgDiv.style.left = event.offsetX+200+"px";
      msgDiv.style.top = event.offsetY+"px";
      showMap.insertBefore(msgDiv, showMap.lastChild);

    

      var goalp =[wx.toFixed(2),wy.toFixed(2)];
      GoalList.push(goalp);
      //alert(GoalList);



      var table = document.getElementById("customers");
      var rows = table.rows;//获取所有行
      console.log("lenth",rows.length) //
      for(var i=1; i < GoalList.length+1; i++){
          var row = rows[i];//获取每一行
          row.cells[1].innerHTML=GoalList[i-1][0];//获取具体单元格
          row.cells[2].innerHTML=GoalList[i-1][1];//获取具体单元格

          // console.log("id",id)
          // console.log("id",id1)

      }

      var MulGoalButton = document.getElementById("MulGoalButton");
      console.log("listout",GoalList);

      MulGoalButton.onclick = function() {

        Goalsendsign = true;

          status_listener = new ROSLIB.Topic({
          ros : car1_ros,
          name : '/move_base/status',
          messageType : 'actionlib_msgs/GoalStatusArray'
          });

          status_listener.subscribe(function(statuses) {


            if(Goalsendsign){
        
            console.log("listin",GoalList);

          var arrive_pre = GoalSign;
          GoalSign = CheckGoal(statuses.status_list)
          console.log("GoalSign:",GoalSign);
          // console.log(GoalSign &(GoalSign!=arrive_pre));

          if (GoalSign){

            if(curGoalIdx_<GoalList.length){
            
              var x1 = (GoalList[curGoalIdx_][0]);
              var y1 = (GoalList[curGoalIdx_][1]);
              console.log("goal sucessful");
              // console.log("goal y",typeof y1);
              // console.log("GoalList.length",GoalList.length);
              // console.log("curGoalIdx_",curGoalIdx_);





              cmdGoal = new ROSLIB.Topic({
                ros : car1_ros,
                name : '/move_base_simple/goal',
                messageType : 'geometry_msgs/PoseStamped'
                });
              
              var Mu_goal_point = new ROSLIB.Message({
                header:{
                  frame_id: "map",
                },
              pose : {
                position:{
                  x :parseFloat(x1),//GoalList[2*curGoalIdx_],
                  y :parseFloat(y1),
                  z : 0.0
                },
                orientation:{
                  x : 0,
                  y : 0,
                  z : -0.637020290414,
                  w : 0.770847033854
        
                }
        
              }
              });
              cmdGoal.publish(Mu_goal_point);
              curGoalIdx_=curGoalIdx_+1;
         

            }

          }
        }
          

            });

        // for(var i=0;i< GoalList.length;i++){
        //   console.log("aaaaaaaaaaaaaaaaaa",Math.abs(Car1Posx-GoalList[i][0]));
        //   console.log("cccccccccccccccccc",Math.abs(Car1Posy-GoalList[i][1]));

        //   if(Math.abs(Car1Posx-GoalList[i][0])<0.2 || Math.abs(Car1Posy-GoalList[i][1])<0.2 ){
        //     console.log("bbbbbbbbbb");

        //     cmdGoal = new ROSLIB.Topic({
        //       ros : car1_ros,
        //       name : '/move_base_simple/goal',
        //       messageType : 'geometry_msgs/PoseStamped'
        //       });
            
        //     var Mu_goal_point = new ROSLIB.Message({
        //       header:{
        //         frame_id: "map",
        //       },
        //     pose : {
        //       position:{
        //         x : GoalList[i][0],
        //         y : GoalList[i][1],
        //         z : 0.3
        //       },
        //       orientation:{
        //         x : 0,
        //         y : 0,
        //         z : -0.637020290414,
        //         w : 0.770847033854
      
        //       }
      
        //     }
        //     });
        //     cmdGoal.publish(Mu_goal_point);
        //     GoalList.splice(i,1);
        //   }

        //   else{
        //     i=i;
        //   }
        // }

      }





    }


  

}

function CheckGoal(status_list){
  var done;
  if (status_list.length!=0) {
    for (var j =0;j<status_list.length;j++) {
         var i = status_list[j];
        if (i.status == 3) {
            done = true;
            console.log("completed Goal%d", curGoalIdx_);
        } else if (i.status == 4) {
          console.log("Goal%d is Invalid, Navi to Next Goal%d", curGoalIdx_, curGoalIdx_ + 1);
            return true;
        } else if (i.status == 0) {
            done = true;
        } else if (i.status == 1) {
            cur_goalid_ = i.goal_id;
            done = false;
        } else done = false;
    }
      } else {
        console.log("Please input the Navi Goal");
    done = false;
}
// console.log("done",done)

return done;

}



function image_show(rosnum,car1ip) {
  var imageLink =document.getElementById('imageLink');
  imageLink.src ="http://"+car1ip+":8080/stream?topic=/ares1/camera/image_raw";
  //http://192.168.99.130:8080/stream?topic=/camera/color/image_raw /ares1/camera/image_raw /camera/color/image_raw

     imageLink
    // // Create the main viewer.
    // var viewer = new MJPEGCANVAS.Viewer({
    //   divID : 'cameramsg',
    //   host : 'localhost',
    //   width : 300,
    //   height : 300,
    //   topic : "/camera/color/image_raw",
    //   //'/ares1/camera/image_raw',
    // //   interval : 200
    // });
  }


  function lidarshow(rosnum,viewer) {
    
    // var viewer = new ROS3D.Viewer({
    //   divID : 'lidarmsg',
    //   width : 300,
    //   height : 300,
    //   antialias : true
    // });

    // Setup a client to listen to TFs.
    var tfClient = new ROSLIB.TFClient({
      ros : rosnum,
      angularThres : 0.01,
      transThres : 0.01,
      rate : 10.0,
      fixedFrame : '/global_init_frame'
    });
    

    var cloudClient = new ROS3D.PointCloud2({
        ros: rosnum,
        tfClient: tfClient,
        rootObject: viewer.scene,
        topic: '/lidar_cloud_calibrated',
        material: { size: 0.1, color: 0xff0000 }
    });


  }


  var chartDom1 =document.getElementById('poschart');
  var myChart = echarts.init(chartDom1, 'dark');

  var chartDom2 = document.getElementById('velocitychart');
  var veChart = echarts.init(chartDom2, 'dark');

  var chartDom3 = document.getElementById('accleratechart');
  var accChart = echarts.init(chartDom3, 'dark');

  function DranLine(){
    
    option = {
      grid: {
        top:'10%',
        left: '0%',
        right: '0%',
        bottom: '0%',
        containLabel: true
    },
    tooltip:{
        trigger:'axis',
    },

    legend: {
      data: ['position:x', 'position:y']
    },

    backgroundColor:'' ,
      xAxis: {
        type: 'category',
        data:XD,
        dispaly: "none",
        axisLabel: {
          formatter: function () {
              return "";
          }
      },
        
        axisTick:{
          show:false
              },
              axisLine:{
                show:false
              },

      },
      yAxis: {
        type: 'value',
        min: 3.5,
        max: -3.5,

      },
      animation: true,
      animationDuration: 200,
      series: [
        {
          name:'position:y',
          data: drawposy,
          type: "line",
          symbol:'none', 
          smooth: false,
          endLabel: {
            show: true
          }
        },

        {
          name:'position:x',
          data: drawposx,
          type: "line",
          symbol:'none', 
          smooth: false,
          endLabel: {
            show: true
          }
        }


      ]

    };

    option1 = {
      grid: {
        top:'10%',
        left: '0%',
        right: '0%',
        bottom: '0%',
        containLabel: true
    },
    tooltip:{
        trigger:'axis',
    },

    legend: {
      data: ['speed']
    },

    backgroundColor:'' ,
      xAxis: {
        type: 'category',
        data:DrawX,
        dispaly: "none",
        axisLabel: {
          formatter: function () {
              return "";
          }
      },
        
        axisTick:{
          show:false
              },
              axisLine:{
                show:false
              },

      },
      yAxis: {
        type: 'value',
        min: 1.5,
        max: -1.5,

      },
      animation: true,
      animationDuration: 200,
      series: [
        {
          name:'speed',
          data: drawvelocity,
          type: "line",
          symbol:'none', 
          smooth: false,
          endLabel: {
            show: true
          }
        },
      ]

    };


    option2 = {
      grid: {
        top:'10%',
        left: '0%',
        right: '0%',
        bottom: '0%',
        containLabel: true
    },
    tooltip:{
        trigger:'axis',
    },

    legend: {
      data: ['angular']
    },

    backgroundColor:'' ,
      xAxis: {
        type: 'category',
        data:DrawX,
        dispaly: "none",
        axisLabel: {
          formatter: function () {
              return "";
          }
      },
        
        axisTick:{
          show:false
              },
              axisLine:{
                show:false
              },

      },
      yAxis: {
        type: 'value',
        min: 1,
        max: -1,

      },
      animation: true,
      animationDuration: 200,
      series: [
        {
          name:'angular',
          data: drawangular,
          type: "line",
          symbol:'none', 
          smooth: false,
          endLabel: {
            show: true
          }
        },
      ]

    };


    option && myChart.setOption(option);
    option && veChart.setOption(option1);
    option && accChart.setOption(option2);
      }


  function clikenvent(){
    ClickSign=1;
  }

  function ClearGoal(){
    var my=document.getElementById("circle")
    my.parentNode.removeChild(my)
    var car_posx = document.getElementById("car_posx");
    var car_posy = document.getElementById("car_posy");
    var car_posyaw = document.getElementById("car_posyaw");

    car_posx.innerHTML = "";
    car_posy.innerHTML = "";
    car_posyaw.innerHTML = "";

  }

  function ClearMultiGoal(){
    Goalsendsign=false;
    arrive_pre = false;
    var table = document.getElementById("customers");
    var rows = table.rows;//获取所有行




    for(var i=1; i <GoalList.length+1; i++){
        var my=document.getElementById("Mulcircle")
        my.parentNode.removeChild(my)
        var row = rows[i];//获取每一行
        row.cells[1].innerHTML="";//获取具体单元格
        row.cells[2].innerHTML="";//获取具体单元格

        // console.log("id",id)
        // console.log("id",id1)

    }
    GoalList=[];
    curGoalIdx_ =0;

  }



function Senddata(){

    var ws = new WebSocket("ws://127.0.0.1:8080"); 
    ws.onopen = function(){
    console.log("open");
    const json = JSON.stringify({
      weather: 'keepalive',
      vehicle_list: [
          {"vehicle_id":1,"pose_x":13,"pose_y":3,"velocity":210,"heading":610},
          {"vehicle_id":2,"pose_x":1,"pose_y":3,"velocity":20,"heading":60},
  ],
      Light_list: [
          {"Light_id":1,"Light_pose_x":12,"Light_pose_y":3,"Light_status":30},
          {"Light_id":2,"Light_pose_x":1,"Light_pose_y":3,"Light_status":20},
  ]
  });
    ws.send(json);
}

    ws.onmessage = function(e){
    console.log(e.data);
}

//当客户端收到服务端发送的关闭连接请求时，触发onclose事件
    ws.onclose = function(e){
    console.log("close");
}

//如果出现连接、处理、接收、发送数据失败的时候触发onerror事件
     ws.onerror = function(e){
    console.log(error);
}


}

//setInterval(Senddata,1000);
 
function Ori2yaw(x,y,z,w){

    var siny_cosp = 2.0 * (w * z + x * y);
    var cosy_cosp = 1.0 - 2.0 * (y * y + z * z);
    var yaw =Math.atan2(siny_cosp, cosy_cosp);
    angles = -(yaw/3.1415926*180.0)+90;

    // console.log("siny_cosp:",siny_cosp);
    // console.log("cosy_cosp:",cosy_cosp);
    // console.log("yaw:",yaw);


 
    return angles


}

function Yaw2ori(yaw,pitch,roll){
  var ori = new Array();
  var cy = cos(yaw * 0.5);
  var sy = sin(yaw * 0.5);
  var cp = cos(pitch * 0.5);
  var sp = sin(pitch * 0.5);
  var cr = cos(roll * 0.5);
  var sr = sin(roll * 0.5);

  ori[0] = cy * cp * cr + sy * sp * sr;
  ori[1] = cy * cp * sr - sy * sp * cr;
  ori[2] = sy * cp * sr + cy * sp * cr;
  ori[3] = sy * cp * cr - cy * sp * sr;

  return ori;
}