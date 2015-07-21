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
    angle:0
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
    ctx.translate(50, 35); 
    ctx.rotate(20*Math.PI/180);
    ctx.drawImage(turret.img,tank.x,tank.y,tank.size,tank.size);
    
  }
/*************************************************************************************************************************************
                                                ACTUALLY ANIMATING *************************************************************************************************************************************/
  setInterval(animate,1000/framerate);
});