(function() {
    var r = new RegExp("(^|(.*?\\/))(include-web\.js)(\\?|$)"),
        s = document.getElementsByTagName('script'),
        targetScript;
    for (var i = 0; i < s.length; i++) {
        var src = s[i].getAttribute('src');
        if (src) {
            var m = src.match(r);
            if (m) {
                targetScript = s[i];
                break;
            }
        }
    }

    function inputScript(url) {
        var script = '<script type="text/javascript" src="' + url + '"><' + '/script>';
        document.writeln(script);
    }

    function inputCSS(url) {
        var css = '<link rel="stylesheet" href="' + url + '">';
        document.writeln(css);
    }

    function inArray(arr, item) {
        for (i in arr) {
            if (arr[i] == item) {
                return true;
            }
        }
        return false;
    }

    function load() {
        var includes = (targetScript.getAttribute('include') || "").split(",");
        var excludes = (targetScript.getAttribute('exclude') || "").split(",");
        var jQueryInclude = false;
        if (!inArray(excludes, 'example-i18n')) {
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js");

            inputScript("https://cdnjs.cloudflare.com/ajax/libs/i18next/10.0.7/i18next.min.js");
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/jquery-i18next/1.2.1/jquery-i18next.min.js");

            inputScript("../js/utils.js");
            inputScript("../js/localization.js");
            document.writeln("<script>Localization.initializeI18N('../', function () {Localization.localize();Localization.initGlobal();}); </script>");
            jQueryInclude = true;
        }
        if (inArray(includes, 'jquery') && !jQueryInclude) {
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js");
        }

        if (inArray(includes, 'bootstrap')) {
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js");
            inputCSS("https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css");
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js");
        }

        if (inArray(includes, 'bootstrap-css')) {
            inputCSS("https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css")
        }

        if (inArray(includes, 'bootstrap4')) {
            inputScript("https://code.jquery.com/jquery-3.2.1.slim.min.js");
            inputCSS('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css');
            inputScript("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js");
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js");

        }

        if (inArray(includes, 'fontsw')) {
            inputCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
        }


        if (inArray(includes, 'echarts')) {
            inputScript('https://cdn.jsdelivr.net/npm/echarts@4.9.0/dist/echarts.min.js');
            inputScript('https://cdn.jsdelivr.net/npm/echarts-liquidfill@2.0.6/dist/echarts-liquidfill.min.js');
        }

        if (inArray(includes, 'three')) {
            inputScript('https://cdn.bootcss.com/three.js/92/three.min.js');
        }

        if (inArray(includes, 'GLTFLoader')) {
            inputScript('../mapboxgl/js/GLTFLoader.js');
        }

        if (inArray(includes, 'bootstrap-js')) {
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js");
        }

        if (inArray(includes, 'jquery-ui')) {
            inputCSS("https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.css");
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js");
        }

        // if (inArray(includes, 'template')) {
        //     inputScript("libs/art-template/template-web.js");
        // }
        if (inArray(includes, 'randomcolor')) {
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/randomcolor/0.5.2/randomColor.min.js");
        }
        if (inArray(includes, 'papaparse')) {
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/PapaParse/4.3.2/papaparse.min.js");
        }
        if (inArray(includes, 'moment')) {
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js");
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/locale/zh-cn.js");
        }
        if (inArray(includes, 'bootstrap-datetimepicker')) {
            inputCSS("https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/css/bootstrap-datetimepicker.min.css");
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js");
        }
        if (inArray(includes, 'bootstrap-select')) {
            inputCSS("https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/css/bootstrap-select.min.css");
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/js/bootstrap-select.min.js");
        }
        if (inArray(includes, 'dat-gui')) {
            inputScript("https://cdn.bootcss.com/dat-gui/0.7.6/dat.gui.js");
            datGuiI18N();
        }
        if (inArray(includes, 'admin-lte')) {
            inputCSS("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css");
        }
        if (inArray(includes, 'ace')) {
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/ace.js");
        }
        if (inArray(includes, 'widgets.alert')) {
            inputScript("../js/widgets.js");
        }

        if (inArray(includes, 'widgets')) {
            inputCSS("https://cdnjs.cloudflare.com/ajax/libs/css-loader/2.2.0/css-loader.css");
            inputScript("../js/widgets.js");
        }
        if (inArray(includes, 'zTree')) {
            inputCSS("https://cdnjs.cloudflare.com/ajax/libs/zTree.v3/3.5.29/css/zTreeStyle/zTreeStyle.min.css");
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/zTree.v3/3.5.29/js/jquery.ztree.all.min.js");
        }
        if (inArray(includes, 'jquery-scontextMenu')) {
            inputCSS("https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.6.3/jquery.contextMenu.min.css");
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.6.3/jquery.contextMenu.min.js");
        }

        if (inArray(includes, 'lazyload')) {
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/jquery_lazyload/1.9.7/jquery.lazyload.min.js");
        }
        if (inArray(includes, 'i18n')) {
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/i18next/10.0.7/i18next.min.js");
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/jquery-i18next/1.2.1/jquery-i18next.min.js");
        }

        if (inArray(includes, 'ionRangeSlider')) {
            inputCSS("https://cdnjs.cloudflare.com/ajax/libs/ion-rangeslider/2.2.0/css/ion.rangeSlider.css");
            inputCSS("https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.css");
            inputCSS("https://cdnjs.cloudflare.com/ajax/libs/ion-rangeslider/2.2.0/css/ion.rangeSlider.skinHTML5.css");
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/ion-rangeslider/2.2.0/js/ion.rangeSlider.min.js");
        }
        if (inArray(includes, 'mapbox')) {
            inputCSS("https://api.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.css");
            inputScript("https://api.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.js");
        }
    }

    function datGuiI18N() {
        document.writeln("<script>function registerEventListener(evt,fn){" +
            "if(window.attachEvent){window.attachEvent('on'+evt,fn);}" +
            "else{window.addEventListener(evt,fn,false);}" +
            "}</script>");
        document.writeln("<script>registerEventListener('load',function() { " +
            "dat.GUI.TEXT_CLOSED=resources.text_close;dat.GUI.TEXT_OPEN=resources.text_open;" +
            "})</script>")
    }

    load();
    window.isLocal = false;
    window.server = document.location.toString().match(/file:\/\//) ? "http://localhost:8090" : document.location.protocol + "//" + document.location.host;
    window.preRelease = "";
})();