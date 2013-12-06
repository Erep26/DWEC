  window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
  window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
  /*if (!window.indexedDB) {
       window.alert("Your browser doesn't support a stable version of IndexedDB.");
  }
  var openRequest = indexedDB.open("laVolta",1);*/


  var db;
    if("indexedDB" in window) {
        var openRequest = indexedDB.open("laVolta",1);

        openRequest.onupgradeneeded  = function (event) {
                //console.log("update");
                db = this.result;
                //db.deleteObjectStore('partidas');
                 try {
                    var store = db.createObjectStore("partidas",{keyPath: 'partida', autoIncrement:true},false);
                    store.createIndex("selected", "selected", { unique: false });
                } catch  (e) {
                    //console.log("Exception creating object store: " + e);
                }
            }

        openRequest.onsuccess = function(e) {
            //console.log("Success!");
            db = e.target.result;
            var pag = window.location.pathname;
            pag = pag.substring(pag.lastIndexOf('/') + 1);
            if(pag=="game.html") buscaPartida(function(){partidaCargada()});
        }
 
        openRequest.onerror = function(e) {
            //console.log("Error");
            //console.dir(e);
        }
 
    }
 

function write(insUp, successCalback, errorCallback){
  var trans = db.transaction(["partidas"],"readwrite");
  var store = trans.objectStore("partidas");
   
  var request;
  if(insUp == "insert")
  {
    request = store.add(partidaActual);//add provoca error si ya existe
  }
  else if(insUp == "update")
    request = store.put(partidaActual);//put sobreescrive si ya existe
    request.onerror = request.onsuccess = function() {
      if(request.error) errorCallback();
      else
        {
          successCalback();
        }
    }
}

function read(partida, callback){
  var trans = db.transaction(["partidas"]);
  var store = trans.objectStore("partidas");
  var request = store.get(partida);
  request.onerror = function(event) {
    // manejamos el error
    console.log(error);
  };

  request.onsuccess = function(event) {
    partidaActual = request.result;
  };
  trans.oncomplete = function(evt){
    callback();
  }
}

function readAll(){
  var store = db.transaction("partidas").objectStore("partidas");
  bodyModal.innerHTML = '<label class="control-label">Selecciona una partida:</label>'+
                        '<select id="listaPartidas" style="margin-bottom: 30px;" class="form-control"></select>';
  store.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
    if (cursor) {
      //strPartidas.push(cursor.key)
      document.getElementById("listaPartidas").innerHTML += "<option>" + cursor.key + "</option>";
      cursor.continue();
    }
  }
}

function borra(partida){
  var trans= db.transaction(["partidas"],"readwrite");
  var store= trans.objectStore("partidas");
  var del=store.delete(partida);
  trans.oncomplete = function(evt){
    readAll();
  }
}

function removeAll(){
  var request = window.indexedDB.deleteDatabase("laVolta");
    request.onsuccess = function() {
        $.bootstrapGrowl("Base de datos borrada!");
    };
    request.onerror = function(event) {
        $.bootstrapGrowl("No se pudo borrar la base de datos");
    };
}

function buscaPartida(callback){
  var trans= db.transaction(["partidas"],"readwrite");
  var store= trans.objectStore("partidas");
  store.index("selected").get("true").onsuccess = function(e) {
    partidaActual = e.target.result;
    if(partidaActual) partidaActual.selected = "false";
    else window.location.href = "./index.html";
    write("update",function(){},function(){})
  }
  trans.oncomplete = function(){
    //console.log(partidaActual);
    callback();
  }
}
