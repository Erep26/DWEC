var stateGame;
var canvas;
var ctx;
var palabra;
var date;

function reset(){
	canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');//introPal(this.strSol.value)
    var returnBut ="<span id='return'>"+
					"<div id='littleRet' onclick='introPal(document.formul.strSol.value); return false;' style='height: 50px; width: 15px; border-right-color: white; z-index: 2'></div>"+
					"<div id='ret' onclick='introPal(document.formul.strSol.value); return false;' style='left: -1px; height: 100px; width: 45px; border: solid black 1px; box-shadow: 5px 5px 10px #848484;'>"+
						"<img style='margin-top: 10px;' src='img/return.png'/>"+
					"</div>"+
				"</span>";
    
    document.getElementById('divLetras').innerHTML ="<form name='formul' onsubmit='introPal(this.strSol.value); return false;'><span>Introducir palabra: </span><input name='strSol' autocomplete='off' type='text' style='width: auto; background: transparent; font-size: 2em;'/></form><br/>";
    var letr =['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'];
    letr.forEach(function(letra){
        var str ="";
        if (letra == 'A') str+= returnBut;
        if (letra == 'A' || letra == 'Z') str += "<p></p>";
        str+="<span id='"+letra+"'";
        if (letra == 'A') str+=" style='margin-left: 35px;'";
        else if(letra == 'Z') str+=" style='margin-left: 65px;'";
        document.getElementById('divLetras').innerHTML+= str + "><button onclick='pruevaLetra(\""+letra+"\")' onfocus='this.blur();'> "+letra+" </button></span>";
    });
	//clearInterval(relIntv);
	//iniRelj();
	var img = new Image();
	img.src = "img/ahorcado.png";
	ctx.drawImage(img,0,0);
	stateGame = 0;
	palabra = null;
	document.getElementById("divPalabra").innerHTML = "a h o r c a d o";
}

window.onload = function(){
	Strings = ['COCHE',
	           'CASA',
	           'PERRO',
	           'GATO'];
    carregaLista();
	startTime();
    reset();
};

function augmenta(){
    divCanvas(++stateGame, function(){});
}

function lin(x0,y0,xf,yf, callback) {
    ctx.moveTo(x0,y0);
    var itvl =setInterval(function(){
        if(x0!=xf) (x0 < xf)?x0+=5:x0-=5;
        if(y0!=yf) (y0 < yf)?y0+=5:y0-=5;
        ctx.lineTo(x0,y0);
        ctx.stroke();
        if (x0 == xf && y0 == yf){
            clearInterval(itvl);
            callback();
        }
    }, 1);
}

function divCanvas(n, callback) {
	ctx.lineWidth=5;
    switch (n) {
        case 1:
            lin(20, 480, 480, 480, function(){callback();});
            break;
        case 2:
            lin(80, 480, 80, 20, function(){callback();});
            break;
        case 3:
            lin(80, 23, 300, 23, function(){callback();});
            break;
        case 4:
            lin(80, 120, 175, 25, function(){callback();});
            break;
        case 5:
            lin(295, 25, 295, 70, function(){
                var i = 0;
                var itvl =setInterval(function(){
                    ctx.moveTo((Math.cos(2*Math.PI*i + 1.5*Math.PI)*30)+295, (Math.sin(2*Math.PI*i + 1.5*Math.PI)*30)+100);
                    i+=0.01;
                    ctx.lineTo((Math.cos(2*Math.PI*i + 1.5*Math.PI)*30)+295, (Math.sin(2*Math.PI*i + 1.5*Math.PI)*30)+100);
                    ctx.stroke();
                    //console.log(i);
                    if (i >= 1) {
                    	clearInterval(itvl);
                    	callback();
                    	};
                }, 5);
            });
            break;
        case 6:
            lin(295, 130, 295, 230, function(){callback();});
            break;
        case 7:
            lin(295, 130, 260, 165, function(){callback();});
            break;
        case 8:
            lin(295, 130, 330, 165, function(){callback();});
            break;
        case 9:
            lin(295, 230, 255, 270, function(){callback();});
            break;
        case 10:
            lin(295, 230, 335, 270, function(){winLose();});
            break;
    }
}

function mostraPalabra(){
	document.getElementById("divPalabra").innerHTML = "";
	for(var i = 0; i < palabra[1].length; i++)
		document.getElementById("divPalabra").innerHTML += palabra[1].charAt(i) + " ";
}


function start(){
	reset();
	var d = new Date();
	date = d.getTime();
	canvas.width=canvas.width;
	//startTime();
	document.getElementById("divPalabra").innerHTML = "";
	palabra = new Array();
	palabra[0] = new Array();
	palabra[1] = new Array();
	palabra[0] = parseInt(Math.random() * Strings.length);
	for(var i = 0; i < Strings[palabra[0]].length; i++) palabra[1] += "_";
	mostraPalabra();
}

function modalMissatges(str){
	document.getElementById('contMsj').innerHTML = str;
	document.getElementById('divModalMsj').style.display='block';
}

function winLose(){
	if(Strings[palabra[0]]==palabra[1]){
		var d = new Date();
		date = d.getTime() - date;
		var strDate = parseInt(date%1000) + " milisegundos";
		date = parseInt(date/1000);
		strDate = parseInt(date%60) + " segungos<br/>" + strDate;
		date = parseInt(date/60);
		strDate = parseInt(date%60) + " minutos<br/>" + strDate;
		date = parseInt(date/60);
		strDate = parseInt(date%60) + " horas<br/>" + strDate;
		
		modalMissatges("Has ganado!!!<br/>" + strDate);
	}
	if(stateGame == 10){
		var d = new Date();
		date = d.getTime() - date;
		var strDate = parseInt(date%1000) + " milisegundos";
		date = parseInt(date/1000);
		strDate = parseInt(date%60) + " segungos<br/>" + strDate;
		date = parseInt(date/60);
		strDate = parseInt(date%60) + " minutos<br/>" + strDate;
		date = parseInt(date/60);
		strDate = parseInt(date%60) + " horas<br/>" + strDate;
		
		modalMissatges("Has perdido<br/>" + strDate);
	}
	
	if(Strings[palabra[0]]==palabra[1] || stateGame == 10){
		var letr =['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'];
	    letr.forEach(function(letra){
			var  butLet = document.getElementById(letra);
			butLet.childNodes[0].removeAttribute('onclick');
		});
		palabra = null;
		//clearInterval(relIntv);
	}
}

function pruevaLetra(letra){
	if(stateGame != 10 && palabra != null){
		var  butLet = document.getElementById(letra);
		butLet.className="tacha";
		butLet.childNodes[0].removeAttribute('onclick');
		
		if(Strings[palabra[0]].search(letra) != -1)
		{
			var palTemp = "";
			for(var i = 0; i < palabra[1].length; i++){
				if(Strings[palabra[0]].charAt(i) == letra) palTemp += letra;
				else palTemp += palabra[1].charAt(i);
			}
			palabra[1] = palTemp;
			//console.log(palTemp);
			mostraPalabra();
			winLose();
		}
		else
		{
			augmenta();
		}
	}
}

function introPal(strSol){
	console.log(strSol);
	strSol = strSol.toUpperCase();
	if(stateGame != 10 && palabra != null){
		if(strSol == Strings[palabra[0]]){
			palabra[1]=Strings[palabra[0]];
			mostraPalabra();
			winLose();
		}
		else{
			var strFunc = "";
			for(var i = stateGame+1; i <= 10; i++) strFunc += "divCanvas("+i+", function(){";
			//strFunc += "winLose();";
			for(var i = stateGame+1; i <= 10; i++) strFunc +="});";
			stateGame = 10;
			eval(strFunc);
		}
	}
}
