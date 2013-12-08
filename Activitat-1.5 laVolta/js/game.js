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
	$('input[type="number"]').keypress(function(){
		return false;
	});
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
	var agua = parseInt($("#agua"+e+"1 input[type='number']").val()) + parseInt($("#agua"+e+"2 input[type='number']").val()) + parseInt($("#agua"+e+"3 input[type='number']").val());
	if(partidaActual.equipos[e-1].bolsa.agua - agua >= 0)
		$("#bolsa"+(e)+" .agua").text(partidaActual.equipos[e-1].bolsa.agua - agua);
	else
		inpt.value -= 1;
}

function glucUp(e, inpt){
	var gluc = parseInt($("#gluc"+e+"1 input[type='number']").val()) + parseInt($("#gluc"+e+"2 input[type='number']").val()) + parseInt($("#gluc"+e+"3 input[type='number']").val());
	if(partidaActual.equipos[e-1].bolsa.azucar - gluc >= 0)
		$("#bolsa"+(e)+" .azucar").text(partidaActual.equipos[e-1].bolsa.azucar - gluc);
	else
		inpt.value -= 1;
}

function grasaUp(e, inpt){
	var grasa = parseInt($("#grasa"+e+"1 input[type='number']").val()) + parseInt($("#grasa"+e+"2 input[type='number']").val()) + parseInt($("#grasa"+e+"3 input[type='number']").val());
	if(partidaActual.equipos[e-1].bolsa.grasa - grasa >= 0)
		$("#bolsa"+(e)+" .grasa").text(partidaActual.equipos[e-1].bolsa.grasa - grasa);
	else
		inpt.value -= 1;
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
		if(gndr) alert("Tenemos un ganador!!!");
	}
	//console.log(partidaActual);
}