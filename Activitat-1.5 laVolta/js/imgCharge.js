function imgCh(src)
    {
        var im = new Image();
        im.src = "./img/" + src;
        return im;
    };
    window.img = {
    	"desert" : imgCh("parallax/desert_BG.png"),
    	"swamp" : imgCh("parallax/swamp.png"),
    	"cor11" : imgCh("ciclistas/cor11.png"),
    	"cor12" : imgCh("ciclistas/cor12.png"),
    	"cor13" : imgCh("ciclistas/cor13.png"),
    	"cor21" : imgCh("ciclistas/cor21.png"),
    	"cor22" : imgCh("ciclistas/cor22.png"),
    	"cor23" : imgCh("ciclistas/cor23.png"),
    };