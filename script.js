$(function(){  
/*
TODO

Make tank.size scalable.



*/    /*************************************************************************************************************************************
                                                      SETTING UP CANVAS *************************************************************************************************************************************/
  
  var c=document.getElementById("canvas");
  var ctx=c.getContext("2d");
  /*************************************************************************************************************************************
                                                      CANVAS FULLSCREEN *************************************************************************************************************************************/

  //This initially makes the canvas fullscreen
  canvas.width = window.innerWidth-(window.innerHeight*0.03);
  canvas.height = window.innerHeight-(window.innerHeight*0.03);
  
  //This makes the canvas fullscreen each time the screen changes.
  $(window).resize(function(){
    grass();
    tank.resize();
    canvas.width = window.innerWidth-(window.innerHeight*0.03);
    canvas.height = window.innerHeight-(window.innerHeight*0.03);
  });  
  
  /*************************************************************************************************************************************
                                                     KEYSTROKE DETECTION *************************************************************************************************************************************/
  
  $(window).keydown(function(e) {
    //SPACE
    if (e.keyCode == 0 || e.keyCode == 32) {
      
    }
    
    //Left
    if (e.keyCode == 37) {
      tank.speed = -tank.acc;
    }
    else
    {
      tank.speed = tank.speed - tank.frict;
    }
    
    //Right
    if (e.keyCode == 39) {
      tank.speed = tank.acc;
    } 
    else
    {
      tank.speed = tank.speed + tank.frict;
    }
    
    if (e.keyCode == 38) {
      //UP
      turret.angle = turret.angle + 10;
    }
    
    if (e.keyCode == 40) {
      //DOWN
      turret.angle = turret.angle - 10;
    }
  });
  /*************************************************************************************************************************************
                                                VARIABLES *************************************************************************************************************************************/
  var framerate = 60;
  /*************************************************************************************************************************************
                                                IMAGE CREATION *************************************************************************************************************************************/
  var tank = {
    img:document.getElementById("tank"),
    x:0,
    y:0,
    speed:10,
    resize: function()
    {
    this.size = canvas.width/15;
    this.y = canvas.height-tank.size;
    },
    size:100,
    frict:1,
    acc:20
  };
  tank.resize();
  
  var turret ={
    img:document.getElementById("turret"),
    angle:10,
    x:0
  };
  
/*************************************************************************************************************************************
                                                ANIMATE FUNCTION *************************************************************************************************************************************/
  function animate()
  {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    turretLogic();
    tankLogic();
    
    grass();
    
  }
  
/*************************************************************************************************************************************
                                                TANK LOGIC *************************************************************************************************************************************/
  function tankLogic()
  {
    ctx.drawImage(tank.img,tank.x,tank.y,tank.size,tank.size);
    
    if (tank.speed>0)
    {
      tank.speed = tank.speed - tank.frict;
      tank.x = tank.x + tank.speed;
    }
    
    if (tank.speed<0)
    {
      tank.speed = tank.speed + tank.frict;
      tank.x = tank.x + tank.speed;
    }
    
    
    
    //This reverses the tanks direction when it leaves the canvas.
    if (tank.x+tank.size>canvas.width || tank.x<0)
    {
      tank.speed = -tank.speed;
    }
  }
  
  /************************************************************************************************************************************                                                          GRASS
                                                                                    *************************************************************************************************************************************/
  function grass()
  {
    ctx.fillStyle="green";
    ctx.fillRect(0,canvas.height-tank.size/4,canvas.width,tank.size/4);
  }
  /*************************************************************************************************************************************
                                                        TURRET *************************************************************************************************************************************/
  function turretLogic()
  {
    
//     ctx.save();
//     ctx.beginPath();
//     ctx.translate(tank.x+tank.size/2,tank.y+tank.size/2);
//     ctx.rotate(turret.angle * Math.PI / 180);
//     ctx.drawImage(turret.img,tank.x,tank.y,tank.size,tank.size);
//     ctx.restore();
    
    ctx.save();
    ctx.beginPath();
    ctx.translate(tank.x+tank.size/2.12,tank.y+tank.size/2.12);
    // 10,8
    ctx.rotate(turret.angle * Math.PI / 180);
    ctx.drawImage(turret.img,-tank.size/2.12,-tank.size/2.12,tank.size,tank.size);
    ctx.restore();
    
//     turret.angle = turret.angle + 10;
    
    console.log(turret.angle);
    
    if (turret.angle>90)
    {
      turret.angle = -90;
    }
    if (turret.angle<-90)
    {
      turret.angle = 90;
    }
   
    

    
    
  }
/*************************************************************************************************************************************
                                                ACTUALLY ANIMATING *************************************************************************************************************************************/
  setInterval(animate,1000/framerate);
});