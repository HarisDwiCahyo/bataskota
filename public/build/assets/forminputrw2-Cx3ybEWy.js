import{V as ie,f as ce,M as fe,T,O as ve,X,L as he,a as we,G as ye,n as Q,b as ee,t as ke,F as te,c as ae,S as O,d as k,e as E,g as be,h as Ee,i as Ce,j as y,D as Ne,k as de,l as Le,C as ne,P as oe,m as Se,o as Be,p as me,q as Ge,r as Ie}from"./GeoJSON-C5wKpImO.js";import{c as Me}from"./main.esm-BcYrPVTO.js";import{G as ze}from"./Geolocation-DOMlNKP2.js";import{W as Pe}from"./WKT-BIzRGbMv.js";var G=new ie({center:ce([110.35385111973005,-7.791739623962835]),zoom:18}),o=new fe({target:"map",view:G,controls:[]}),Te=new T({title:"Open Street Map",visible:!0,source:new ve}),Oe=new T({title:"Esri Maps",visible:!0,source:new X({attributions:["Tiles © Esri"],url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"})}),Fe=new T({title:"World Street Map",visible:!0,source:new X({attributions:["Tiles © Esri"],url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"})}),De=new T({title:"World Imagery Map",visible:!0,source:new X({attributions:["Tiles © Esri"],url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"})}),He=new he({title:"BaseMaps",layers:[Oe,Te,Fe,De]});o.addLayer(He);const $e=new we({tipLabel:"Show Layers",groupSelectStyle:"children",collapseTipLabel:"Collapse layers"});o.addControl($e);$(document).ready(function(){let e=[];$("#formFile").on("change",function(t){je(t,e)}),$("#checkData").on("click",function(){xe(e)})});function je(e,t){const r=e.target.files;if(r.length>0){const l=r[0];if(Ae(l)){const i=new FileReader;i.onload=function(a){Ve(a,t)},i.onerror=Re,i.readAsText(l)}else alert("Please upload a valid GeoJSON file.")}}function Ae(e){return e.type==="application/json"||e.name.endsWith(".geojson")}function Re(e){console.error("Error reading file:",e)}function Ve(e,t){try{const r=JSON.parse(e.target.result);console.log("GeoJSON data:",r),new ye().readFeatures(r).forEach(i=>{const a=We(i);t.some(n=>n.kelurahan===a.kelurahan&&n.kemantren===a.kemantren&&n.kota===a.kota&&n.srsid===a.srsid&&n.kodekecamatan===a.kodekecamatan&&n.kodekelurahan===a.kodekelurahan&&n.rw===a.rw&&n.peraturan===a.peraturan&&n.batasutara===a.batasutara&&n.batastimur===a.batastimur&&n.batasselatan===a.batasselatan&&n.batasbarat===a.batasbarat&&n.beritaacara===a.beritaacara&&n.geom===a.geom)||t.push(a)}),Ke(t),Ze(t)}catch(r){console.error("Error parsing GeoJSON file:",r)}}function We(e){const t=new Pe;let r=e.getGeometry();function l(s){return Array.isArray(s)?s.map(n=>Array.isArray(n)?n.slice(0,2):n):s}if(r.getType()==="MultiPolygon"){const s=r.getPolygons();let n=[];s.forEach(b=>{b.getCoordinates().forEach(c=>{n.push(l(c))})}),r=new Q(n),e.setGeometry(r)}else if(r.getType()==="Polygon"){const s=r.getCoordinates().map(n=>l(n));r.setCoordinates(s)}let i=t.writeGeometry(r);i=i.replace(/POLYGON Z\(\(([^)]+)\)\)/g,(s,n)=>`POLYGON((${n.split(",").map(c=>c.trim().split(" ").slice(0,2).join(" ")).join(", ")}))`).replace(/MULTIPOLYGON Z\(\(\(([^)]+)\)\)\)/g,(s,n)=>n.split(")), ((").map(c=>`POLYGON((${c.split(",").map(x=>x.trim().split(" ").slice(0,2).join(" ")).join(", ")}))`).join(", "));const a=e.getProperties();return delete a.geometry,{kelurahan:a.kelurahan,kemantren:a.kemantren,kota:a.kota,srsid:a.srsid,kodekecamatan:a.kodekecamatan,kodekelurahan:a.kodekelurahan,rw:a.rw,peraturan:a.peraturan,batasutara:a.batasutara,batasbarat:a.batasbarat,batasselatan:a.batasselatan,batastimur:a.batastimur,beritaacara:a.beritaacara,geom:i}}let K;function qe(e){const a=(e.length+8)*25+25,s={defaultColDef:{width:350,resizable:!0,filter:!0,floatingFilter:!0,sortable:!0},columnDefs:[{headerName:"Kelurahan",field:"kelurahan"},{headerName:"Kemantren",field:"kemantren"},{headerName:"Kota",field:"kota"},{headerName:"Srsid",field:"srsid"},{headerName:"Kode Kecamatan",field:"kodekecamatan"},{headerName:"Kode Kelurahan",field:"kodekelurahan"},{headerName:"RW",field:"rw"},{headerName:"Peraturan",field:"peraturan"},{headerName:"Batas Utara",field:"batasutara"},{headerName:"Batas Timur",field:"batastimur"},{headerName:"Batas Selatan",field:"batasselatan"},{headerName:"Batas Barat",field:"batasbarat"},{headerName:"Berita Acara",field:"beritaacara"},{headerName:"Geom",field:"geom"}],rowData:e,pagination:!0,paginationPageSize:10,rowSelection:"single"},n=document.querySelector("#myGrid");K&&K.destroy(),K=new Me(n,s),n.style.height=a+"px"}function xe(e){console.log("Displaying data: ",e),qe(e)}function Ke(e){const t=$("#featureForm");t.find("input[type='hidden']").remove();const r=$('meta[name="csrf-token"]').attr("content");t.append(S("_token",r));const l=$("#inputdate").val(),i=$("#operator").val();t.append(S("inputdate",l)),t.append(S("operator",i)),e.forEach(a=>{for(const s in a)t.append(S(`${s}[]`,a[s]))})}function S(e,t){return $("<input>").attr("type","hidden").attr("name",e).attr("value",t)}function Ze(e){const t=new ee;t.clear(),e.forEach(i=>{const n=i.geom.substring(9,i.geom.length-1).split(",").map(c=>{const[q,x]=c.trim().split(" ").map(parseFloat);return[q,x]}).map(c=>ke(c,"EPSG:4326","EPSG:3857")),b=new te({geometry:new Q([n]),kelurahan:i.kelurahan,rw:i.rw});t.addFeature(b)});const r=new ae({source:t,style:new O({fill:new k({color:"rgba(0, 0, 255, 0.1)"}),stroke:new E({color:"blue",width:2})})});o.addLayer(r);const l=t.getExtent();l&&!isNaN(l[0])&&!isNaN(l[1])&&!isNaN(l[2])&&!isNaN(l[3])?o.getView().fit(l,{padding:[50,50,50,50],duration:1e3}):console.warn("Extent is empty or invalid.")}var Je=new be({className:"mousePosition",projection:"EPSG:4326",coordinateFormat:function(e){return Ee(e,"{y} , {x}",6)}});o.addControl(Je);var _e=new Ce({target:"custom-scale-line",text:!0,bar:!0});o.addControl(_e);var u=document.createElement("div");u.className="toolbarDiv";var N=document.createElement("button");N.innerHTML='<span class="icon"><i class="icon-home"></i></span>';N.className="myButton";N.title="Home";var F=document.createElement("div");F.className="homeButtonDiv";F.appendChild(N);u.appendChild(F);var Ye=new y({element:F});N.addEventListener("click",()=>{pe(),o.setView(new ie({center:ce([110.35385111973005,-7.791739623962835]),zoom:18}))});o.addControl(Ye);let L=document.createElement("button");L.innerHTML='<span class="icon"><i class="icon-enlarge"></i></span>';L.className="myButton";L.title="FullScreen";var D=document.createElement("div");D.className="fsButtonDiv";D.appendChild(L);u.appendChild(D);let Ue=new y({element:D});L.addEventListener("click",()=>{let e=document.getElementById("map");e.requestFullscreen?e.requestFullscreen():e.msRequestFullscreen?e.msRequestFullscreen():e.mozRequestFullscreen?e.mozRequestFullscreen():e.webkitRequestFullscreen&&e.webkitRequestFullscreen()});o.addControl(Ue);let g=document.createElement("button");g.innerHTML='<span class="icon"><i class="icon-hand"></i></span>';g.className="myButton";g.id="panButton";g.title="Pan";let H=document.createElement("div");H.className="panButtonDiv";H.appendChild(g);u.appendChild(H);let Xe=new y({element:H}),Z=!1,re=new Ne;g.addEventListener("click",()=>{g.classList.toggle("clicked"),Z=!Z,Z?(document.getElementById("map").style.cursor="grab",o.addInteraction(re)):(document.getElementById("map").style.cursor="default",o.removeInteraction(re))});o.addControl(Xe);var I=new de;I.on("boxend",function(){var e=I.getGeometry().getExtent();o.getView().fit(e)});var f=document.createElement("button");f.innerHTML='<span class="icon"><i class="icon-zoom-in"></i></span>';f.className="myButton";f.id="ziButton";f.title="ZoomIn";var j=document.createElement("div");j.className="ziButtonDiv";j.appendChild(f);u.appendChild(j);var Qe=new y({element:j}),J=!1;f.addEventListener("click",()=>{f.classList.toggle("clicked"),J=!J,J?(document.getElementById("map").style.cursor="zoom-in",o.addInteraction(I)):(o.removeInteraction(I),document.getElementById("map").style.cursor="default")});o.addControl(Qe);var M=new de;M.on("boxend",function(){var e=M.getGeometry().getExtent();o.getView().setCenter(Le(e)),G.setZoom(G.getZoom()-1)});var v=document.createElement("button");v.innerHTML='<span class="icon"><i class="icon-zoom-out"></i></span>';v.className="myButton";v.id="zoButton";v.title="Zoom Out";var A=document.createElement("div");A.className="zoButtonDiv";A.appendChild(v);u.appendChild(A);var et=new y({element:A}),_=!1;v.addEventListener("click",()=>{v.classList.toggle("clicked"),_=!_,_?(document.getElementById("map").style.cursor="zoom-out",o.addInteraction(M)):(o.removeInteraction(M),document.getElementById("map").style.cursor="default")});o.addControl(et);$("#btnCrosshair").on("click",function(e){$("#btnCrosshair").toggleClass("clicked"),$("#btnCrosshair").hasClass("clicked")?tt():pe()});var ue,B=new ze({trackingOptions:{enableHighAccuracy:!0},tracking:!0,projection:G.getProjection()}),C=new te;C.setStyle(new O({image:new ne({radius:6,fill:new k({color:"#3399cc"}),stroke:new E({color:"#fff",width:2})})}));var z=new te;new ae({map:o,source:new ee({features:[z,C]})});function tt(){var e=B.getPosition();C.setGeometry(e?new oe(e):null),z.setGeometry(B.getAccuracyGeometry()),e&&o.getView().animate({center:e,zoom:16,duration:1e3}),ue=setInterval(function(){var t=B.getPosition(),r=B.getAccuracyGeometry();C.setGeometry(t?new oe(t):null),z.setGeometry(r),t&&o.getView().animate({center:t,duration:1e3})},1e4)}function pe(){clearInterval(ue),C.setGeometry(null),z.setGeometry(null)}let h=document.createElement("button");h.innerHTML='<span class="icon"><i class="icon-ruler"></i></span>';h.className="myButton";h.id="lengthButton";h.title="Measure Length";var R=document.createElement("div");R.className="lengthButtonDiv";R.appendChild(h);u.appendChild(R);var at=new y({element:R}),Y=!1;h.addEventListener("click",()=>{if(h.classList.toggle("clicked"),Y=!Y,document.getElementById("map").style.cursor="default",Y)o.removeInteraction(m),ge("LineString");else{o.removeInteraction(m),W.clear();const e=document.getElementsByClassName("ol-tooltip ol-tooltip-static");for(;e.length>0;)e[0].remove()}});o.addControl(at);let w=document.createElement("button");w.innerHTML='<span class="icon"><i class="icon-straighten"></i></span>';w.className="myButton";w.id="areaButton";w.title="Measure Area";var V=document.createElement("div");V.className="areaButtonDiv";V.appendChild(w);u.appendChild(V);var nt=new y({element:V}),U=!1;w.addEventListener("click",()=>{if(w.classList.toggle("clicked"),U=!U,document.getElementById("map").style.cursor="default",U)o.removeInteraction(m),ge("Polygon");else{o.removeInteraction(m),W.clear();const e=document.getElementsByClassName("ol-tooltip ol-tooltip-static");for(;e.length>0;)e[0].remove()}});o.addControl(nt);var m,W=new ee,ot=new ae({source:W,style:new O({fill:new k({color:"rgba(255, 255, 255, 0.2)"}),stroke:new E({color:"#ffcc33",width:2}),image:new ne({radius:7,fill:new k({color:"#ffcc33"})})})});o.addLayer(ot);function ge(e){m=new Se({source:W,type:e,style:new O({fill:new k({color:"rgba(200, 200, 200, 0.6)"}),stroke:new E({color:"rgba(0, 0, 0, 0.5)",lineDash:[10,10],width:2}),image:new ne({radius:5,stroke:new E({color:"rgba(0, 0, 0, 0.7)"}),fill:new k({color:"rgba(255, 255, 255, 0.2)"})})})}),o.addInteraction(m),le(),rt();var t,r=function(l){l.dragging||t&&t.getGeometry()};o.on("pointermove",r),m.on("drawstart",function(l){t=l.feature;var i=l.coordinate;t.getGeometry().on("change",function(a){var s=a.target,n;s instanceof Q?(n=lt(s),i=s.getInteriorPoint().getCoordinates()):s instanceof Be&&(n=st(s),i=s.getLastCoordinate()),d.innerHTML=n,P.setPosition(i)})}),m.on("drawend",function(){d.className="ol-tooltip ol-tooltip-static",P.setOffset([0,-7]),t=null,d=null,le()})}var p,se;function rt(){p&&p.parentNode.removeChild(p),p=document.createElement("div"),p.className="ol-tooltip hidden",se=new me({element:p,offset:[15,0],positioning:"center-left"}),o.addOverlay(se)}$(o.getViewport()).on("mouseout",function(){$(p).addClass("hidden")});var d,P;function le(){d&&d.parentNode.removeChild(d),d=document.createElement("div"),d.className="ol-tooltip  ol-tooltip-measure",P=new me({element:d,offset:[0,-15],positioning:"bottom-center"}),o.addOverlay(P)}var st=function(e){var t=Ge(e,{projection:"EPSG:3857"}),r;return t>1e3?r=Math.round(t/1e3*100)/100+" km":r=Math.round(t*100)/100+" m",r},lt=function(e){var t=Ie(e,{projection:"EPSG:3857"}),r;return t>1e6?r=Math.round(t/1e6*100)/100+" km<sup>2</sup>":r=Math.round(t*100)/100+" m<sup>2</sup>",r};