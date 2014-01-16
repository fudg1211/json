    if(/gt-n7000 build\/gingerbread/.test(navigator.userAgent.toLowerCase())){
        document.querySelector("meta[name=viewport]").setAttribute('content','width=640, target-densitydpi=256, user-scalable=0');
    }else if(window.screen.width>0 && /android\s4/.test(navigator.userAgent.toLowerCase())){
        var standardDpi,dpi,w;
        w = window.screen.width;
        if(w>0){
            if(w < 320){
                standardDpi = 120;
            }else if(w < 480){
                standardDpi = 160;
            }else if(w < 640){
                standardDpi = 240;
            }else if(w < 960){
                standardDpi = 320;
            }else if(w < 1280){
                standardDpi = 480;
            }else{
                standardDpi = 640;
            }
        }
        dpi = 640*standardDpi/w;
        document.querySelector("meta[name=viewport]").setAttribute('content','width=640, target-densitydpi='+dpi+', user-scalable=0');
    }else{
        document.querySelector("meta[name=viewport]").setAttribute('content','width=640, target-densitydpi=320, user-scalable=0');
    }
