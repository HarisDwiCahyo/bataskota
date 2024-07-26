import{V as ie,f as se,M as Be,T as N,O as Se,X as ee,L as ce,G as Ge,N as ne,R as ke,b as G,c as k,S as C,e as h,d as v,Q as Fe,a as Me,g as Pe,h as ze,i as Te,j as E,D as Ne,k as ue,l as xe,F as de,C as te,P as oe,m as De,n as Oe,o as je,p as me,q as Ae,r as He}from"./GeoJSON-C5wKpImO.js";import{g as Ve}from"./t-wkt.esm-CtkApKJt.js";import{G as We}from"./Geolocation-DOMlNKP2.js";import{M as qe,S as Re}from"./Snap-CkQZeV6i.js";import{W as Ze}from"./WKT-BIzRGbMv.js";var F=new ie({center:se([110.35385111973005,-7.791739623962835]),zoom:18,projection:"EPSG:4326"}),t=new Be({target:"map",view:F,controls:[]}),_e=new N({title:"Open Street Map",visible:!0,source:new Se}),$e=new N({title:"Esri Maps",visible:!0,source:new ee({attributions:["Tiles © Esri"],url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"})}),Ke=new N({title:"World Street Map",visible:!0,source:new ee({attributions:["Tiles © Esri"],url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"})}),Je=new N({title:"World Imagery Map",visible:!0,source:new ee({attributions:["Tiles © Esri"],url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"})}),Xe=new ce({title:"BaseMaps",layers:[$e,_e,Ke,Je]});t.addLayer(Xe);var U=new ce({title:"Group",layers:[]});t.addLayer(U);function Qe(e,n){n.getFeatures().forEach(function(u){u.un("modifyend",i)});var o=new qe({source:n});e.addInteraction(o);var a=new Re({source:n});e.addInteraction(a),o.on("modifyend",i);function i(u){document.getElementById("geom").value="";var r=u.features.item(0),d=r.getGeometry(),q=new Ze().writeGeometry(d);document.getElementById("geom").value=q}}$.getJSON("/admin/rw",function(e){var n=data[0].gid,o=e.data.features.find(function(_){return _.properties.gid===n});if(!o){console.error("Polygon dengan gid target tidak ditemukan.");return}var a=new Ge,i=a.readFeature(o,{featureProjection:"EPSG:3857"}),u=a.readFeature(o,{featureProjection:"EPSG:4326"}),B=i.getGeometry().getExtent(),r=500,d=ne(B,r),q=e.data.features.filter(function(_){var Ie=a.readFeature(_,{featureProjection:"EPSG:3857"});return ke(d,Ie.getGeometry().getExtent())}),fe={type:"FeatureCollection",features:q},ye=a.readFeatures(fe,{featureProjection:"EPSG:4326"}),we=new G({features:ye}),Ee=new k({title:"Polygon Buffer",source:we,style:new C({stroke:new h({color:"blue",width:2}),fill:new v({color:"rgba(0, 0, 255, 0.1)"})})});U.getLayers().push(Ee);var R=new G({features:[u]}),he=new k({title:"Polygon Target",source:R,style:new C({stroke:new h({color:"yellow",width:3}),fill:new v({color:"rgba(255, 255, 0, 0.3)"})})});U.getLayers().push(he);var B=R.getExtent(),Ce=ne(B,Fe(B)*.7);t.getView().fit(Ce,{duration:1e3,maxZoom:20}),Qe(t,R);var Z=document.getElementById("geom");Z.addEventListener("input",function(){Z.value});var Le=o.geometry,be=Ve(Le);Z.value=be});const Ye=new Me({tipLabel:"Show Layers",groupSelectStyle:"children",collapseTipLabel:"Collapse layers"});t.addControl(Ye);var Ue=new Pe({className:"mousePosition",projection:"EPSG:4326",coordinateFormat:function(e){return ze(e,"{y} , {x}",6)}});t.addControl(Ue);var et=new Te({target:"custom-scale-line",text:!0,bar:!0});t.addControl(et);var c=document.createElement("div");c.className="toolbarDiv";var b=document.createElement("button");b.innerHTML='<span class="icon"><i class="icon-home"></i></span>';b.className="myButton";b.title="Home";var x=document.createElement("div");x.className="homeButtonDiv";x.appendChild(b);c.appendChild(x);var tt=new E({element:x});b.addEventListener("click",()=>{ge(),t.setView(new ie({center:se([110.35385111973005,-7.791739623962835]),zoom:18}))});t.addControl(tt);let I=document.createElement("button");I.innerHTML='<span class="icon"><i class="icon-enlarge"></i></span>';I.className="myButton";I.title="FullScreen";var D=document.createElement("div");D.className="fsButtonDiv";D.appendChild(I);c.appendChild(D);let nt=new E({element:D});I.addEventListener("click",()=>{let e=document.getElementById("map");e.requestFullscreen?e.requestFullscreen():e.msRequestFullscreen?e.msRequestFullscreen():e.mozRequestFullscreen?e.mozRequestFullscreen():e.webkitRequestFullscreen&&e.webkitRequestFullscreen()});t.addControl(nt);let g=document.createElement("button");g.innerHTML='<span class="icon"><i class="icon-hand"></i></span>';g.className="myButton";g.id="panButton";g.title="Pan";let O=document.createElement("div");O.className="panButtonDiv";O.appendChild(g);c.appendChild(O);let ot=new E({element:O}),K=!1,ae=new Ne;g.addEventListener("click",()=>{g.classList.toggle("clicked"),K=!K,K?(document.getElementById("map").style.cursor="grab",t.addInteraction(ae)):(document.getElementById("map").style.cursor="default",t.removeInteraction(ae))});t.addControl(ot);var M=new ue;M.on("boxend",function(){var e=M.getGeometry().getExtent();t.getView().fit(e)});var p=document.createElement("button");p.innerHTML='<span class="icon"><i class="icon-zoom-in"></i></span>';p.className="myButton";p.id="ziButton";p.title="ZoomIn";var j=document.createElement("div");j.className="ziButtonDiv";j.appendChild(p);c.appendChild(j);var at=new E({element:j}),J=!1;p.addEventListener("click",()=>{p.classList.toggle("clicked"),J=!J,J?(document.getElementById("map").style.cursor="zoom-in",t.addInteraction(M)):(t.removeInteraction(M),document.getElementById("map").style.cursor="default")});t.addControl(at);var P=new ue;P.on("boxend",function(){var e=P.getGeometry().getExtent();t.getView().setCenter(xe(e)),F.setZoom(F.getZoom()-1)});var f=document.createElement("button");f.innerHTML='<span class="icon"><i class="icon-zoom-out"></i></span>';f.className="myButton";f.id="zoButton";f.title="Zoom Out";var A=document.createElement("div");A.className="zoButtonDiv";A.appendChild(f);c.appendChild(A);var rt=new E({element:A}),X=!1;f.addEventListener("click",()=>{f.classList.toggle("clicked"),X=!X,X?(document.getElementById("map").style.cursor="zoom-out",t.addInteraction(P)):(t.removeInteraction(P),document.getElementById("map").style.cursor="default")});t.addControl(rt);$("#btnCrosshair").on("click",function(e){$("#btnCrosshair").toggleClass("clicked"),$("#btnCrosshair").hasClass("clicked")?lt():ge()});var ve,S=new We({trackingOptions:{enableHighAccuracy:!0},tracking:!0,projection:F.getProjection()}),L=new de;L.setStyle(new C({image:new te({radius:6,fill:new v({color:"#3399cc"}),stroke:new h({color:"#fff",width:2})})}));var z=new de;new k({map:t,source:new G({features:[z,L]})});function lt(){var e=S.getPosition();L.setGeometry(e?new oe(e):null),z.setGeometry(S.getAccuracyGeometry()),e&&t.getView().animate({center:e,zoom:16,duration:1e3}),ve=setInterval(function(){var n=S.getPosition(),o=S.getAccuracyGeometry();L.setGeometry(n?new oe(n):null),z.setGeometry(o),n&&t.getView().animate({center:n,duration:1e3})},1e4)}function ge(){clearInterval(ve),L.setGeometry(null),z.setGeometry(null)}let y=document.createElement("button");y.innerHTML='<span class="icon"><i class="icon-ruler"></i></span>';y.className="myButton";y.id="lengthButton";y.title="Measure Length";var H=document.createElement("div");H.className="lengthButtonDiv";H.appendChild(y);c.appendChild(H);var it=new E({element:H}),Q=!1;y.addEventListener("click",()=>{if(y.classList.toggle("clicked"),Q=!Q,document.getElementById("map").style.cursor="default",Q)t.removeInteraction(s),pe("LineString");else{t.removeInteraction(s),W.clear();const e=document.getElementsByClassName("ol-tooltip ol-tooltip-static");for(;e.length>0;)e[0].remove()}});t.addControl(it);let w=document.createElement("button");w.innerHTML='<span class="icon"><i class="icon-straighten"></i></span>';w.className="myButton";w.id="areaButton";w.title="Measure Area";var V=document.createElement("div");V.className="areaButtonDiv";V.appendChild(w);c.appendChild(V);var st=new E({element:V}),Y=!1;w.addEventListener("click",()=>{if(w.classList.toggle("clicked"),Y=!Y,document.getElementById("map").style.cursor="default",Y)t.removeInteraction(s),pe("Polygon");else{t.removeInteraction(s),W.clear();const e=document.getElementsByClassName("ol-tooltip ol-tooltip-static");for(;e.length>0;)e[0].remove()}});t.addControl(st);var s,W=new G,ct=new k({source:W,style:new C({fill:new v({color:"rgba(255, 255, 255, 0.2)"}),stroke:new h({color:"#ffcc33",width:2}),image:new te({radius:7,fill:new v({color:"#ffcc33"})})})});t.addLayer(ct);function pe(e){s=new De({source:W,type:e,style:new C({fill:new v({color:"rgba(200, 200, 200, 0.6)"}),stroke:new h({color:"rgba(0, 0, 0, 0.5)",lineDash:[10,10],width:2}),image:new te({radius:5,stroke:new h({color:"rgba(0, 0, 0, 0.7)"}),fill:new v({color:"rgba(255, 255, 255, 0.2)"})})})}),t.addInteraction(s),le(),ut();var n,o=function(a){a.dragging||n&&n.getGeometry()};t.on("pointermove",o),s.on("drawstart",function(a){n=a.feature;var i=a.coordinate;n.getGeometry().on("change",function(u){var r=u.target,d;r instanceof Oe?(d=mt(r),i=r.getInteriorPoint().getCoordinates()):r instanceof je&&(d=dt(r),i=r.getLastCoordinate()),l.innerHTML=d,T.setPosition(i)})}),s.on("drawend",function(){l.className="ol-tooltip ol-tooltip-static",T.setOffset([0,-7]),n=null,l=null,le()})}var m,re;function ut(){m&&m.parentNode.removeChild(m),m=document.createElement("div"),m.className="ol-tooltip hidden",re=new me({element:m,offset:[15,0],positioning:"center-left"}),t.addOverlay(re)}$(t.getViewport()).on("mouseout",function(){$(m).addClass("hidden")});var l,T;function le(){l&&l.parentNode.removeChild(l),l=document.createElement("div"),l.className="ol-tooltip  ol-tooltip-measure",T=new me({element:l,offset:[0,-15],positioning:"bottom-center"}),t.addOverlay(T)}var dt=function(e){var n=Ae(e,{projection:"EPSG:4326"}),o;return n>1e3?o=Math.round(n/1e3*100)/100+" km":o=Math.round(n*100)/100+" m",o},mt=function(e){var n=He(e,{projection:"EPSG:4326"}),o;return n>1e6?o=Math.round(n/1e6*100)/100+" km<sup>2</sup>":o=Math.round(n*100)/100+" m<sup>2</sup>",o};
