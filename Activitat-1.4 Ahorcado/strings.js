var Strings = new Array();

function existe(str){
	var siNo = false;
	Strings.forEach(function(str2){
		if(str == str2) siNo = true;
	});
	return siNo;
}

function addPalabra(str) {
	//console.log(str.strPal.value);
	str = str.toUpperCase();
	console.log(str);
	if(str=="") modalMissatges("Deves introducir algun caracter");
	else if(existe(str)) modalMissatges("Esta palabra ya existe");
	else{
		Strings.push(str);
    	carregaLista();
	}
}
function removePalabra(str){
    Strings.splice(Strings.indexOf(str),1);
    carregaLista();
}
function carregaLista() {
    document.getElementById("divTable").innerHTML = "";
    Strings.forEach(function(str){
            document.getElementById("divTable").innerHTML += "<div>"+
                                                                "<div style='float: left; position: relative;'>"+str+"</div>"+
                                                                "<div  style='float: right; position: relative;' onclick='removePalabra(\""+str+"\");'>X</div>"+
                                                            "</div> <br/>";
        });
}

function valida(){
	var siNo = false;
	var res = String.fromCharCode(event.keyCode);
	['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'].forEach(function(letr){
		if(res.toUpperCase() == letr) siNo = true;
	});
	return siNo;
}
