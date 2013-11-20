    var reloj = document.getElementById('canvasReloj');
    reloj.height = reloj.width;
    var ctxRlg = reloj.getContext('2d');
    var centro = 50;
    var relIntv;
    
    function iniRelj(){
    	reloj.width = reloj.width;
    	ctxRlg.translate(centro,centro);
    	var s = ((2*Math.PI*1)/60)-(Math.PI)/2;
	    var m = ((2*Math.PI*15)/60)-(Math.PI)/2;
    	dibNum();
	    dibuja(m, "black", 3, 25);
	    dibuja(s, "red", 2, 30);
    }

    function dibNum()
    {
        for(var i = 1; i < 13; i++)
        {
            var angulo = ((2*Math.PI*i)/12)-(Math.PI)/2;
            var x = Math.cos(angulo)*40;
            var y = Math.sin(angulo)*40;
            ctxRlg.fillText(i,x,y);
        }
    }

    function dibuja(angulo, color, grosor, largo){
        
        var x = Math.cos(angulo)*largo;
        var y = Math.sin(angulo)*largo;

        ctxRlg.beginPath();
        ctxRlg.lineWidth=grosor;
        ctxRlg.strokeStyle=color;
        ctxRlg.moveTo(0,0);
        ctxRlg.lineTo(x, y);
        ctxRlg.stroke();
    }
	function startTime(){
		var d = new Date();
		var nS = 0, nM = 0;
		relIntv = setInterval(function(){
	        reloj.width=reloj.width;
	        ctxRlg.translate(centro,centro);
	        d = new Date();
	        //var ms = ((2*Math.PI*date.getMilliseconds())/1000)-(Math.PI)/2;
	        var s = ((2*Math.PI*d.getSeconds())/60)-(Math.PI)/2;
        	var m = ((2*Math.PI*d.getMinutes())/60)-(Math.PI)/2;
        	var h = (2*Math.PI*d.getHours()+((2*Math.PI*d.getMinutes())/(60)))/12-(Math.PI)/2;
	        
			dibNum();
	        dibuja(h, "black", 4, 40);
	        dibuja(m, "black", 3, 25);
	        dibuja(s, "red", 2, 30);
	        //dibuja(ms, "blue", 3, 10);
	        var strTime = "";
	        if(d.getHours() < 10) strTime += "0";
	        strTime += d.getHours() + ":";
	        if(d.getMinutes() < 10) strTime += "0";
	        strTime += d.getMinutes() + ":";
	        if(d.getSeconds() < 10) strTime += "0";
	        strTime += d.getSeconds();
			document.getElementById('aRelog').innerHTML = strTime;
    	}, 1000);
	}