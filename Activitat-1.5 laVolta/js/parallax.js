var canvas;
var ctx;
var i = 800;

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function corredor(corr, posX, posY)
{
	ctx.drawImage( corr, //imagen
	               n*32, //posicion x en la imagen
	               0,    //posicion y en la imagen
	               32,   //ancho enla imagen
	               32,   //alto en la imagen
	               posX, //posicion x en canvas
	               posY, //posicion y en canvas
	               50,   //ancho en canvas
	               50    //alto en canvas
	               );
}
var vel = 10;
var n=0;

var posCorr;

function divCanvas(){
  requestAnimFrame(divCanvas);
  canvas.width = canvas.width;
  ctx.drawImage(img.desert, i-800, 0);
  ctx.drawImage(img.desert, i, 0);
  ctx.drawImage(img.desert, i+800, 0);
  i-=8;
  if(i==0)i=800;


  if(vel == 10){
  	vel = 0;
  	n =(n>0)?n-1:2;
  }
  else vel++;
  /*
    0%     .......   x%  .......      100%
   100px                              700px
    o      o      o      o      o      o

    dist ---- 100%
    pos  ----  x

    pos[ultimo corredor] = 0
    dist = primer_corredor - ultimo_corredor
  */

  posCorr[0].pos = partidaActual.equipos[0].corredores[0].posicion;
  posCorr[1].pos = partidaActual.equipos[0].corredores[1].posicion;
  posCorr[2].pos = partidaActual.equipos[0].corredores[2].posicion;
  posCorr[3].pos = partidaActual.equipos[1].corredores[0].posicion;
  posCorr[4].pos = partidaActual.equipos[1].corredores[1].posicion;
  posCorr[5].pos = partidaActual.equipos[1].corredores[2].posicion;



  var pri = 0,//primero
      ult = 0;//ultimo

  for(var j = 0; j < 6; j++){//busco primero y ultimo en la carrera
    pri = (posCorr[j].pos > posCorr[pri].pos)?j:pri;
    ult = (posCorr[j].pos < posCorr[ult].pos)?j:ult;
  }
  var dist = posCorr[pri].pos - posCorr[ult].pos;

  var py = 290;
  for(var j = 0; j < 6; j++){
    var thisPos = posCorr[j].pos - posCorr[ult].pos;
    thisPos = (thisPos * 100) / dist;//thispos *7 por es tonteria dividir y luego multiplicar por 700 y +100 para dejar un margen a la izquierda, a la derecha ya hemos dejado un margen ya que el canvas mide 800
    thisPos = (thisPos*7)+100;
    //console.table(posCorr);
    //console.clear;
    if(posCorr[j].oldPos < thisPos) posCorr[j].oldPos++
    else if(posCorr[j].oldPos > thisPos) posCorr[j].oldPos--;
    
    corredor(eval("img.cor"+posCorr[j].corr), posCorr[j].oldPos, py);
    py+=10;
  }
  
}
				
function iniAnim(){
	canvas = document.getElementById("miCanvas");
	ctx = canvas.getContext('2d');
	n=0;
  posCorr =[
    {corr: 11, pos: partidaActual.equipos[0].corredores[0].posicion, oldPos: 0},
    {corr: 12, pos: partidaActual.equipos[0].corredores[1].posicion, oldPos: 0},
    {corr: 13, pos: partidaActual.equipos[0].corredores[2].posicion, oldPos: 0},
    {corr: 21, pos: partidaActual.equipos[1].corredores[0].posicion, oldPos: 0},
    {corr: 22, pos: partidaActual.equipos[1].corredores[1].posicion, oldPos: 0},
    {corr: 23, pos: partidaActual.equipos[1].corredores[2].posicion, oldPos: 0}];
	divCanvas();
}