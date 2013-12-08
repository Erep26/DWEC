var headerModal;
var bodyModal;
var footerModal;
var myForm;

window.onload = function(){
	headerModal = document.getElementById("headerModal");
	bodyModal = document.getElementById("bodyModal");
	footerModal = document.getElementById("footerModal");
	myForm = document.getElementById("myForm");
}

function puntos(thisNum, equipo){//exactamente igual que aguaUp(), ver en game.js
	var repartidos = parseInt($("#mts"+equipo+"1").val()) + parseInt($("#mts"+equipo+"2").val()) + parseInt($("#mts"+equipo+"3").val());
	$("#pntRep"+equipo).text(1000 - repartidos);
	if(parseInt($("#pntRep"+equipo).text()) < 0){
		thisNum.value = parseInt(thisNum.value) + parseInt($("#pntRep"+equipo).text());
		repartidos = parseInt($("#mts"+equipo+"1").val()) + parseInt($("#mts"+equipo+"2").val()) + parseInt($("#mts"+equipo+"3").val());
		$("#pntRep"+equipo).text(1000 - repartidos);
	}
}

function newGame(){
	myForm.onsubmit = function(){
		partidaActual.partida = this.nombrePartida.value;
		partidaActual.metrosMax = this.mtsMax.value;

		partidaActual.equipos[0].nombre = this.eqp1.value;

		partidaActual.equipos[0].corredores[0].nombre = this.cor11.value;
		partidaActual.equipos[0].corredores[0].mtsMax = this.mts11.value;
		partidaActual.equipos[0].corredores[0].tipo = (this.tipoCorr11[0].checked)?this.tipoCorr11[0].value:this.tipoCorr11[1].value;

		partidaActual.equipos[0].corredores[1].nombre = this.cor12.value;
		partidaActual.equipos[0].corredores[1].mtsMax = this.mts12.value;
		partidaActual.equipos[0].corredores[1].tipo = (this.tipoCorr12[0].checked)?this.tipoCorr12[0].value:this.tipoCorr12[1].value;

		partidaActual.equipos[0].corredores[2].nombre = this.cor13.value;
		partidaActual.equipos[0].corredores[2].mtsMax = this.mts13.value;
		partidaActual.equipos[0].corredores[2].tipo = (this.tipoCorr13[0].checked)?this.tipoCorr13[0].value:this.tipoCorr13[1].value;


		partidaActual.equipos[1].nombre = this.eqp2.value;

		partidaActual.equipos[1].corredores[0].nombre = this.cor21.value;
		partidaActual.equipos[1].corredores[0].mtsMax = this.mts21.value;
		partidaActual.equipos[1].corredores[0].tipo = (this.tipoCorr21[0].checked)?this.tipoCorr21[0].value:this.tipoCorr21[1].value;

		partidaActual.equipos[1].corredores[1].nombre = this.cor22.value;
		partidaActual.equipos[1].corredores[1].mtsMax = this.mts22.value;
		partidaActual.equipos[1].corredores[1].tipo = (this.tipoCorr22[0].checked)?this.tipoCorr22[0].value:this.tipoCorr22[1].value;

		partidaActual.equipos[1].corredores[2].nombre = this.cor23.value;
		partidaActual.equipos[1].corredores[2].mtsMax = this.mts23.value;
		partidaActual.equipos[1].corredores[2].tipo = (this.tipoCorr23[0].checked)?this.tipoCorr23[0].value:this.tipoCorr23[1].value;
		write("insert", function(){
			window.location.href = "./game.html";
		}, function(){
			$.bootstrapGrowl("Ya existe una partida con este nombre");
		});
		return false;
		//e.preventDefault();//el return false de los event listeners
	}

	function corrdor(ncor){
		return 	'<label class="col-sm-5 control-label col-sm-offset-1">Nombre</label>'+
				'<div class="col-sm-5">'+
					'<input type="text" name="cor'+ncor+'" required class="form-control" value ="Corredor '+parseInt(ncor%10)+'">'+
				'</div>'+
				'<label class="col-sm-5 control-label col-sm-offset-1" style="font-size: .8em;">Metros maximos por turno</label>'+
				'<div class="col-sm-5" style="margin-top: 10px;">'+
					'<input onchange="puntos(this, '+parseInt(ncor/10)+');" min="0" id="mts'+ncor+'" name="mts'+ncor+'" type="number" value="333" class="form-control"></input>'+
				'</div>'+

				'<label class="pull-left col-sm-5 control-label col-sm-offset-1" style="clear: both;">Tipo</label>'+
				'<div id="inputTipo" class="col-sm-5">'+
					'<input type="radio" name="tipoCorr'+ncor+'" value="Jefe de filas" checked/> Jefe de filas<br/>'+
					'<input type="radio" name="tipoCorr'+ncor+'" value="Gregario"/> Gregario'+
				'</div>';
	}

	headerModal.innerHTML = "Nueva Partida";
	bodyModal.innerHTML = ' <div class="form-group">'+
								'<label class="col-sm-3 control-label col-sm-offset-1">Partida:</label>'+
								'<div class="col-sm-7">'+
									'<input type="text" name="nombrePartida" required class="form-control" placeholder="Nombre Partida">'+
								'</div>'+
							'</div>'+
							'<div class="form-group">'+
								'<label class="col-sm-3 control-label col-sm-offset-1">Metros a recorrer:</label>'+
								'<div class="col-sm-7">'+
									'<input type="number" name="mtsMax" required class="form-control" min="5000" value="5000">'+
								'</div>'+
							'</div>'+
							'<div style="display: inline-block; width: 100%;">'+
							'<div class="col-sm-6">'+
								'<div id="equipo1" class="panel panel-primary">'+
									'<div class="panel-heading">'+
										'<h4 class="panel-title">'+
											'Equipo 1  '+
											'<span class="repMts">Metros a repartir <span id="pntRep1" style="width: 50px; display: inline-block; text-align: right;">1</span></span>'+
										'</h4>'+
					        		'</div>'+
									'<div class="panel-body form-group">'+
										'<label class="col-sm-5 control-label col-sm-offset-1"">Nombre:</label>'+
										'<div class="col-sm-5">'+
											'<input type="text" name="eqp1" required class="form-control" placeholder="Nombre Equipo 1">'+
										'</div>'+

										'<ul class="nav nav-tabs" style="margin-top: 40px;">'+
										  '<li class="active" style=" width: 33%;"><a href="#tabCor11" data-toggle="tab" style="padding: 10px;">Corredor 1</a></li>'+
										  '<li style=" width: 33%;"><a href="#tabCor12" data-toggle="tab" style="padding: 10px;">Corredor 2</a></li>'+
										  '<li style=" width: 33%;"><a href="#tabCor13" data-toggle="tab" style="padding: 10px;">Corredor 3</a></li>'+
										'</ul>'+

										'<div class="tab-content" style="margin-top: 10px;">'+
										  '<div class="tab-pane active" id="tabCor11">'+
										  	corrdor(11)+
										  '</div>'+
										  '<div class="tab-pane" id="tabCor12">'+
										  	corrdor(12)+
										  '</div>'+
										  '<div class="tab-pane" id="tabCor13">'+
										  	corrdor(13)+
										  '</div>'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</div>'+

							'<div class="col-sm-6">'+
								'<div id="equipo2" class="panel panel-primary">'+
									'<div class="panel-heading">'+
										'<h4 class="panel-title">'+
											'Equipo 2 '+
											'<span class="repMts">Metros a repartir <span id="pntRep2" style="width: 50px; display: inline-block; text-align: right;">1</span></span>'+
										'</h4>'+
					        		'</div>'+
									'<div class="panel-body form-group">'+
										'<label class="col-sm-5 control-label col-sm-offset-1">Nombre</label>'+
										'<div class="col-sm-5">'+
											'<input type="text" name="eqp2" required class="form-control" placeholder="Nombre Equipo 2">'+
										'</div>'+

										'<ul class="nav nav-tabs" style="margin-top: 40px;">'+
											'<li class="active" style=" width: 33%;"><a href="#tabCor21" data-toggle="tab" style="padding: 10px;">Corredor 1</a></li>'+
											'<li style=" width: 33%;"><a href="#tabCor22" data-toggle="tab" style="padding: 10px;">Corredor 2</a></li>'+
											'<li style=" width: 33%;"><a href="#tabCor23" data-toggle="tab" style="padding: 10px;">Corredor 3</a></li>'+
										'</ul>'+
										'<div class="tab-content" style="margin-top: 10px;">'+
											'<div class="tab-pane active" id="tabCor21">'+
												corrdor(21)+
											'</div>'+
											'<div class="tab-pane" id="tabCor22">'+
												corrdor(22)+
											'</div>'+
											'<div class="tab-pane" id="tabCor23">'+
												corrdor(23)+
											'</div>'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</div>'+
							'</div>';
	footerModal.innerHTML = '<button type="submit" class="btn btn-default">Crear</button>';

	//$(".toltip").tooltip({placement: 'top'});
}

function loadGame(){
	myForm.onsubmit = function(){
		var lista = document.getElementById("listaPartidas");
		var slcPartida = lista.options[lista.selectedIndex];
		//console.log(lista.options);
		if(slcPartida)
		{
			read(slcPartida.text, function(){
				partidaActual.selected = "true";
				write("update", function(){
					window.location.href = "./game.html";
				},function(){});
			});
		}
			
		else
		{
			$.bootstrapGrowl("No hay partidas que cargar");
			
		}
		return false
	}
	headerModal.innerHTML = "Cargar Partida";
	readAll();
	footerModal.innerHTML = '<button type="submit" class="btn btn-default">Cargar</button>';
}

function removeGame(){	myForm.onsubmit = function(){
		var lista = document.getElementById("listaPartidas");
		var slcPartida = lista.options[lista.selectedIndex];
		//console.log(lista.options);
		if(slcPartida) borra(slcPartida.text);
		else $.bootstrapGrowl("No hay partidas que borrar");

		return false;
	}

	headerModal.innerHTML = "Borrar Partida";
	readAll();
	footerModal.innerHTML = '<button type="submit" class="btn btn-default">Borrar</button>';
}