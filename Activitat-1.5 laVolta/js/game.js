setTimeout(function(){buscaPartida(function(){
	partidaCargada()
});}, 100);

function partidaCargada(){
	//console.log(partidaActual);
	iniAnim();
	actualiza();
	document.getElementById("cor11Nom").innerHTML = partidaActual.equipos[0].corredores[0].nombre+"<br/>"+partidaActual.equipos[0].corredores[0].tipo;
	document.getElementById("cor12Nom").innerHTML = partidaActual.equipos[0].corredores[1].nombre+"<br/>"+partidaActual.equipos[0].corredores[1].tipo;
	document.getElementById("cor13Nom").innerHTML = partidaActual.equipos[0].corredores[2].nombre+"<br/>"+partidaActual.equipos[0].corredores[2].tipo;
	document.getElementById("cor21Nom").innerHTML = partidaActual.equipos[1].corredores[0].nombre+"<br/>"+partidaActual.equipos[1].corredores[0].tipo;
	document.getElementById("cor22Nom").innerHTML = partidaActual.equipos[1].corredores[1].nombre+"<br/>"+partidaActual.equipos[1].corredores[1].tipo;
	document.getElementById("cor23Nom").innerHTML = partidaActual.equipos[1].corredores[2].nombre+"<br/>"+partidaActual.equipos[1].corredores[2].tipo;

	$("#mts11").val(partidaActual.equipos[0].corredores[0].mtsMax);
	$("#mts12").val(partidaActual.equipos[0].corredores[1].mtsMax);
	$("#mts13").val(partidaActual.equipos[0].corredores[2].mtsMax);
	$("#mts21").val(partidaActual.equipos[1].corredores[0].mtsMax);
	$("#mts22").val(partidaActual.equipos[1].corredores[1].mtsMax);
	$("#mts23").val(partidaActual.equipos[1].corredores[2].mtsMax);

	$("#eqp1").text(partidaActual.equipos[0].nombre);
	$("#eqp2").text(partidaActual.equipos[1].nombre);
}

function sincEsf(corr){
	$('#esf'+corr+' input[type="text"]').val($('#esf'+corr+' input[type="range"]').val());
}

function actualiza(){
	$("#barra11").css("width", partidaActual.equipos[0].corredores[0].posicion / partidaActual.metrosMax * 100+"%");
	$("#barra12").css("width", partidaActual.equipos[0].corredores[1].posicion / partidaActual.metrosMax * 100+"%");
	$("#barra13").css("width", partidaActual.equipos[0].corredores[2].posicion / partidaActual.metrosMax * 100+"%");
	$("#barra21").css("width", partidaActual.equipos[1].corredores[0].posicion / partidaActual.metrosMax * 100+"%");
	$("#barra22").css("width", partidaActual.equipos[1].corredores[1].posicion / partidaActual.metrosMax * 100+"%");
	$("#barra23").css("width", partidaActual.equipos[1].corredores[2].posicion / partidaActual.metrosMax * 100+"%");

	$('#esf11 input[type="range"]').val(partidaActual.equipos[0].corredores[0].esfuerzo);
	sincEsf(11);
	$('#agua11').val(partidaActual.equipos[0].corredores[0].agua);
	$('#gluc11').val(partidaActual.equipos[0].corredores[0].azucar);
	$('#grasa11').val(partidaActual.equipos[0].corredores[0].grasa);

	$('#esf12 input[type="range"]').val(partidaActual.equipos[0].corredores[1].esfuerzo);
	sincEsf(12);
	$('#agua12').val(partidaActual.equipos[0].corredores[1].agua);
	$('#gluc12').val(partidaActual.equipos[0].corredores[1].azucar);
	$('#grasa12').val(partidaActual.equipos[0].corredores[1].grasa);

	$('#esf13 input[type="range"]').val(partidaActual.equipos[0].corredores[2].esfuerzo);
	sincEsf(13);
	$('#agua13').val(partidaActual.equipos[0].corredores[2].agua);
	$('#gluc13').val(partidaActual.equipos[0].corredores[2].azucar);
	$('#grasa13').val(partidaActual.equipos[0].corredores[2].grasa);

	$('#esf21 input[type="range"]').val(partidaActual.equipos[1].corredores[0].esfuerzo);
	sincEsf(21);
	$('#agua21').val(partidaActual.equipos[1].corredores[0].agua);
	$('#gluc21').val(partidaActual.equipos[1].corredores[0].azucar);
	$('#grasa21').val(partidaActual.equipos[1].corredores[0].grasa);

	$('#esf22 input[type="range"]').val(partidaActual.equipos[1].corredores[1].esfuerzo);
	sincEsf(22);
	$('#agua22').val(partidaActual.equipos[1].corredores[1].agua);
	$('#gluc22').val(partidaActual.equipos[1].corredores[1].azucar);
	$('#grasa22').val(partidaActual.equipos[1].corredores[1].grasa);

	$('#esf23 input[type="range"]').val(partidaActual.equipos[1].corredores[2].esfuerzo);
	sincEsf(23);
	$('#agua23').val(partidaActual.equipos[1].corredores[2].agua);
	$('#gluc23').val(partidaActual.equipos[1].corredores[2].azucar);
	$('#grasa23').val(partidaActual.equipos[1].corredores[2].grasa);

	$("#bolsa1 .agua").text(partidaActual.equipos[0].bolsa.agua);
	$("#bolsa1 .grasa").text(partidaActual.equipos[0].bolsa.grasa);
	$("#bolsa1 .azucar").text(partidaActual.equipos[0].bolsa.azucar);

	$("#bolsa2 .agua").text(partidaActual.equipos[1].bolsa.agua);
	$("#bolsa2 .grasa").text(partidaActual.equipos[1].bolsa.grasa);
	$("#bolsa2 .azucar").text(partidaActual.equipos[1].bolsa.azucar);
}

function distancia(eqp, corr){
	var c = partidaActual.equipos[eqp].corredores[corr]; // esto sirve como una especie de namespace
	//Distancia = %Esfuerzo * MetrosMaximosPorTurno
	if(c.esfuerzo!=0 && c.agua!=0 && c.grasa!=0 && c.azucar!=0)
	{
		c.posicion += parseInt(c.esfuerzo/100 * c.mtsMax);
		//Gasto Agua = (%Esfuerzo * 100)
		c.agua -= c.esfuerzo;
		//Gasto Grasa = 100 -(%Esfuerzo * 100)
		c.grasa -= (100 - c.esfuerzo);
		//Gasto Azucar = %Esfuerzo * 10
		c.azucar -= parseInt(c.esfuerzo/10);
	}
}

function pasaTurno(thisBut){
	thisBut.disabled = true;
	if($('#btn1').prop("disabled") && $('#btn2').prop("disabled"))
	{
		distancia(0,0);
		distancia(0,1);
		distancia(0,2);
		distancia(1,0);
		distancia(1,1);
		distancia(1,2);
		actualiza();
		$('#btn1').prop("disabled",false);
		$('#btn2').prop("disabled",false);
	}
	//console.log(partidaActual);
}