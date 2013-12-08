function partidaCargada(){
	//console.log(partidaActual);
	for(var e = 0; e < 2; e++){
		for (var c = 0; c < 3; c++) {
			var ec = ((e+1)*10)+(c+1);
			//Nombre y tipo
			document.getElementById("cor"+ec+"Nom").innerHTML = partidaActual.equipos[e].corredores[c].nombre+"<br/>"+partidaActual.equipos[e].corredores[c].tipo;
			//Esfuerzo
			$('#esf'+ec+' input[type="range"]').val(partidaActual.equipos[e].corredores[c].esfuerzo);
			sincEsf(ec);
			//Mts Maximos por turno
			$("#mts"+ec).val(partidaActual.equipos[e].corredores[c].mtsMax);
		}
		//Nombres equipos
		$("#eqp"+(e+1)).text(partidaActual.equipos[e].nombre);
	}
	lee();
	iniAnim();
}


function sincEsf(corr){
	$('#esf'+corr+' input[type="text"]').val($('#esf'+corr+' input[type="range"]').val());
	if(parseInt(corr/10) == 0){
		$('#esf'+corr+'1 input[type="text"]').val($('#esf'+corr+' input[type="range"]').val());
		$('#esf'+corr+'2 input[type="text"]').val($('#esf'+corr+' input[type="range"]').val());
		$('#esf'+corr+'3 input[type="text"]').val($('#esf'+corr+' input[type="range"]').val());
		partidaActual.equipos[corr].corredores[0].esfuerzo = $('#esf'+corr+' input[type="text"]').val();
		partidaActual.equipos[corr].corredores[1].esfuerzo = $('#esf'+corr+' input[type="text"]').val();
		partidaActual.equipos[corr].corredores[2].esfuerzo = $('#esf'+corr+' input[type="text"]').val();
	}
	else partidaActual.equipos[parseInt(corr/10)-1].corredores[parseInt(corr%10)-1].esfuerzo = $('#esf'+corr+' input[type="text"]').val();
}

function sincAgua(equipo, thisValue){
	$('#agua'+equipo+'1 input[type="number"]').val(thisValue);
	$('#agua'+equipo+'2 input[type="number"]').val(thisValue);
	$('#agua'+equipo+'3 input[type="number"]').val(thisValue);
}

function sincGluccosa(equipo, thisValue){
	$('#gluc'+equipo+'1 input[type="number"]').val(thisValue);
	$('#gluc'+equipo+'2 input[type="number"]').val(thisValue);
	$('#gluc'+equipo+'3 input[type="number"]').val(thisValue);
}

function sincGrasa(equipo, thisValue){
	$('#grasa'+equipo+'1 input[type="number"]').val(thisValue);
	$('#grasa'+equipo+'2 input[type="number"]').val(thisValue);
	$('#grasa'+equipo+'3 input[type="number"]').val(thisValue);
}

function aguaUp(e, inpt){
	// agua = suma de la agua de los corredores
	var agua = parseInt($("#agua"+e+"1 input[type='number']").val()) + parseInt($("#agua"+e+"2 input[type='number']").val()) + parseInt($("#agua"+e+"3 input[type='number']").val());
	//mostrmos el agua que tenemos = agua en bolsa - agua de los corredores
	$("#bolsa"+(e)+" .agua").text(partidaActual.equipos[e-1].bolsa.agua - agua);
	//Si el agua en bolsa es negativa
	if(parseInt($("#bolsa"+(e)+" .agua").text()) < 0)
	{
		if(inpt.id){//orden de equipo
			//agua del control que estamos modificando es = agua del input + agua en bolsa que en el momento de la operacion es negativa y / tres por que afecta a 3 corredores
			inpt.value = parseInt(parseInt(inpt.value) + parseInt($("#bolsa"+e+" .agua").text())/3);
			//como es una orden de equipo sincronizamos esta con todos los corredores
			sincAgua(e, inpt.value);
		}
		else//orden de corredor
			inpt.value = parseInt(inpt.value) + parseInt($("#bolsa"+e+" .agua").text());//igual que la orden de equipo pero sin dividir por 3
		//recalculamos el agua;
		agua = parseInt($("#agua"+e+"1 input[type='number']").val()) + parseInt($("#agua"+e+"2 input[type='number']").val()) + parseInt($("#agua"+e+"3 input[type='number']").val());
		//mostramos el nuevo valor
		$("#bolsa"+(e)+" .agua").text(partidaActual.equipos[e-1].bolsa.agua - agua);
	}
}

function glucUp(e, inpt){//exactamente igual que aguaUp()
	var gluc = parseInt($("#gluc"+e+"1 input[type='number']").val()) + parseInt($("#gluc"+e+"2 input[type='number']").val()) + parseInt($("#gluc"+e+"3 input[type='number']").val());
	$("#bolsa"+(e)+" .azucar").text(partidaActual.equipos[e-1].bolsa.azucar - gluc);
	if(parseInt($("#bolsa"+(e)+" .azucar").text()) < 0)
	{
		if(inpt.id){
			inpt.value = parseInt(parseInt(inpt.value) + parseInt($("#bolsa"+e+" .azucar").text())/3);
			sincGluccosa(e, inpt.value);
		}
		else inpt.value = parseInt(inpt.value) + parseInt($("#bolsa"+e+" .azucar").text());
		gluc = parseInt($("#gluc"+e+"1 input[type='number']").val()) + parseInt($("#gluc"+e+"2 input[type='number']").val()) + parseInt($("#gluc"+e+"3 input[type='number']").val());
		$("#bolsa"+(e)+" .azucar").text(partidaActual.equipos[e-1].bolsa.azucar - gluc);
	}
}

function grasaUp(e, inpt){//exactamente igual que aguaUp()
	var grasa = parseInt($("#grasa"+e+"1 input[type='number']").val()) + parseInt($("#grasa"+e+"2 input[type='number']").val()) + parseInt($("#grasa"+e+"3 input[type='number']").val());
	$("#bolsa"+(e)+" .grasa").text(partidaActual.equipos[e-1].bolsa.grasa - grasa);
	if(parseInt($("#bolsa"+(e)+" .grasa").text()) < 0)
	{
		if(inpt.id){
			inpt.value = parseInt(parseInt(inpt.value) + parseInt($("#bolsa"+e+" .grasa").text())/3);
			sincGrasa(e, inpt.value);
		}
		else inpt.value = parseInt(inpt.value) + parseInt($("#bolsa"+e+" .grasa").text());
		grasa = parseInt($("#grasa"+e+"1 input[type='number']").val()) + parseInt($("#grasa"+e+"2 input[type='number']").val()) + parseInt($("#grasa"+e+"3 input[type='number']").val());
		$("#bolsa"+(e)+" .grasa").text(partidaActual.equipos[e-1].bolsa.grasa - grasa);
	}
}

function lee(){
	for(var e = 0; e < 2; e++){
		for (var c = 0; c < 3; c++) {
			var ec = ((e+1)*10)+(c+1);
			//Barras de posicion
			$("#barra"+ec).css("width", partidaActual.equipos[e].corredores[c].posicion / partidaActual.metrosMax * 100+"%");
			//Agua
			$('#agua'+ec+' input[type="text"]').val(partidaActual.equipos[e].corredores[c].agua);
			//Glucosa
			$('#gluc'+ec+' input[type="text"]').val(partidaActual.equipos[e].corredores[c].azucar);
			//Grasa
			$('#grasa'+ec+' input[type="text"]').val(partidaActual.equipos[e].corredores[c].grasa);
		}
		//bolsas
		$("#bolsa"+(e+1)+" .agua").text(partidaActual.equipos[e].bolsa.agua);
		$("#bolsa"+(e+1)+" .grasa").text(partidaActual.equipos[e].bolsa.grasa);
		$("#bolsa"+(e+1)+" .azucar").text(partidaActual.equipos[e].bolsa.azucar);
	}
}

function escribe(){
	for(var e = 0; e < 2; e++)
		for (var c = 0; c < 3; c++) {
			var ec = ((e+1)*10)+(c+1);
			//Agua
			partidaActual.equipos[e].corredores[c].agua += parseInt($('#agua'+ec+' input[type="number"]').val());
			$('#agua'+ec+' input[type="number"]').val(0);
			//Glucosa
			partidaActual.equipos[e].corredores[c].azucar += parseInt($('#gluc'+ec+' input[type="number"]').val());
			$('#gluc'+ec+' input[type="number"]').val(0);
			//Grasa
			partidaActual.equipos[e].corredores[c].grasa += parseInt($('#grasa'+ec+' input[type="number"]').val());
			$('#grasa'+ec+' input[type="number"]').val(0);
		}
}

function distancia(){
	var ganador = false;
	for(var e = 0; e < 2; e++)
		for (var c = 0; c < 3; c++) {
			var corr = partidaActual.equipos[e].corredores[c]; // esto sirve para acortar a corr
			//Distancia = %Esfuerzo * MetrosMaximosPorTurno
			if(corr.esfuerzo!=0 && corr.agua!=0 && corr.grasa!=0 && corr.azucar!=0)
			{
				corr.posicion += parseInt(corr.esfuerzo/100 * corr.mtsMax);
				if(corr.posicion >= partidaActual.metrosMax){
					corr.posicion = partidaActual.metrosMax;
					ganador = true;
				}
				//Gasto Agua = (%Esfuerzo * 100)
				corr.agua -= corr.esfuerzo;
				if(corr.agua < 0) corr.agua = 0;
				//Gasto Grasa = 100 -(%Esfuerzo * 100)
				corr.grasa -= (100 - corr.esfuerzo);
				if(corr.grasa < 0) corr.grasa = 0;
				//Gasto Azucar = %Esfuerzo * 10
				corr.azucar -= parseInt(corr.esfuerzo/10);
				if(corr.azucar < 0) corr.azucar = 0;
			}
		}
	return ganador;
}

function pasaTurno(thisBut){
	thisBut.disabled = true;
	if($('#btn1').prop("disabled") && $('#btn2').prop("disabled"))
	{
		escribe();
		var gndr = distancia();
		lee();
		$('#btn1').prop("disabled",false);
		$('#btn2').prop("disabled",false);
		write("update", function(){});
		if(gndr) alert("Tenemos un ganador!!!");
	}
	//console.log(partidaActual);
}