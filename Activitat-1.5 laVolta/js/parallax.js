var canvas;
var ctx;
var img = new Array();
var i = 800;

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function corredor()
{
	ctx.drawImage(img[1],             //imagen
	                          n*32, //posicion x en la imagen
	                          0,     //posicion y en la imagen
	                          32,              //ancho enla imagen
	                          32,              //alto en la imagen
	                          400,               //posicion x en canvas
	                          300,               //posicion y en canvas
	                          50,              //ancho en canvas
	                          50               //alto en canvas
	                          );
}
var vel = 10;
var n=0;
function divCanvas(){
  requestAnimFrame(divCanvas);
  canvas.width = canvas.width;
  ctx.drawImage(img[0], i-800, 0);
  ctx.drawImage(img[0], i, 0);
  ctx.drawImage(img[0], i+800, 0);
  i-=2;
  if(i==0)i=800;


  if(vel == 10){
  	vel = 0;
  	n =(n>0)?n-1:2;
  }
  else vel++;

  corredor(n);
}
				
window.onload = function(){
	canvas = document.getElementById("miCanvas");
	ctx = canvas.getContext('2d');
	img[0] = new Image();
	img[1] = new Image();
	img[0].src = "./img/parallax/desert_BG.png";
	img[1].src = "./img//ciclista.png";
	n=0;
	divCanvas();
}