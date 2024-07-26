import{V as re,f as le,M as pe,T,O as ge,X as Y,L as he,a as fe,G as ve,b as Q,t as we,F as ee,P as U,c as te,S as O,C as F,d as b,e as C,g as ye,h as Ee,i as be,j as y,D as ke,k as ie,l as Ce,m as Ne,n as Le,o as Ie,p as se,q as Se,r as Be}from"./GeoJSON-C5wKpImO.js";import{c as Ge}from"./main.esm-BcYrPVTO.js";import{G as Me}from"./Geolocation-DOMlNKP2.js";import{W as ze}from"./WKT-BIzRGbMv.js";var B=new re({center:le([110.35385111973005,-7.791739623962835]),zoom:18}),o=new pe({target:"map",view:B,controls:[]}),Pe=new T({title:"Open Street Map",visible:!0,source:new ge}),Te=new T({title:"Esri Maps",visible:!0,source:new Y({attributions:["Tiles © Esri"],url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"})}),Oe=new T({title:"World Street Map",visible:!0,source:new Y({attributions:["Tiles © Esri"],url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"})}),Fe=new T({title:"World Imagery Map",visible:!0,source:new Y({attributions:["Tiles © Esri"],url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"})}),De=new he({title:"BaseMaps",layers:[Te,Pe,Oe,Fe]});o.addLayer(De);const He=new fe({tipLabel:"Show Layers",groupSelectStyle:"children",collapseTipLabel:"Collapse layers"});o.addControl(He);$(document).ready(function(){let e=[];$("#formFile").on("change",function(n){$e(n,e)}),$("#checkData").on("click",function(){Je(e)})});function $e(e,n){const r=e.target.files;if(r.length>0){const i=r[0];if(Ve(i)){const t=new FileReader;t.onload=function(l){je(l,n)},t.onerror=Ae,t.readAsText(i)}else alert("Please upload a valid GeoJSON file.")}}function Ve(e){return e.type==="application/json"||e.name.endsWith(".geojson")}function Ae(e){console.error("Error reading file:",e)}function je(e,n){try{const r=JSON.parse(e.target.result);console.log("GeoJSON data:",r);const i=new ve().readFeatures(r);let t=0;i.forEach(l=>{const a=qe(l);if(Re(a)){const c=Object.values(a).reduce((s,me)=>Math.max(s,me.length),0);t=Math.max(t,c),n.some(s=>s.kemantren===a.kemantren&&s.kelurahan===a.kelurahan&&s.kondisi===a.kondisi&&s.east===a.east&&s.south===a.south&&s.nopilar===a.nopilar&&s.northing===a.northing&&s.easting===a.easting&&s.up===a.up&&s.peraturan===a.peraturan&&s.perbatasan===a.perbatasan&&s.alamat===a.alamat&&s.pembuatan===a.pembuatan&&s.pemeliharaan===a.pemeliharaan&&s.beritaacara===a.beritaacara&&s.geom===a.geom)||n.push(a)}else n.push({kemantren:[null],kelurahan:[null],kondisi:[null],east:[null],south:[null],nopilar:[null],easting:[null],northing:[null],up:[null],peraturan:[null],perbatasan:[null],alamat:[null],pembuatan:[null],pemeliharaan:[null],beritaacara:[null],geom:[null]})}),n.forEach(l=>{for(const a in l)if(l[a].length<t){const c=t-l[a].length;for(let E=0;E<c;E++)l[a].push(null)}}),Ze(n),_e(n)}catch(r){console.error("Error parsing GeoJSON file:",r)}}function qe(e){const n=new ze;let r=null;const i=e.getGeometry();if(i&&i.getType()==="Point")try{r=n.writeGeometry(i).replace(/POINT Z\(([^)]+)\)/g,(a,c)=>`POINT(${c.split(" ").slice(0,2).join(" ")})`)}catch(l){console.error("Error transforming geometry:",l)}const t=e.getProperties();return{kemantren:t.kemantren?[t.kemantren]:[null],kelurahan:t.kelurahan?[t.kelurahan]:[null],kondisi:t.kondisi?[t.kondisi]:[null],east:t.east?[t.east]:[null],south:t.south?[t.south]:[null],nopilar:t.nopilar?[t.nopilar]:[null],easting:t.easting?[t.easting]:[null],northing:t.northing?[t.northing]:[null],up:t.up?[t.up]:[null],peraturan:t.peraturan?[t.peraturan]:[null],perbatasan:t.perbatasan?[t.perbatasan]:[null],alamat:t.alamat?[t.alamat]:[null],pemeliharaan:t.pemeliharaan?[t.pemeliharaan]:[null],pembuatan:t.pembuatan?[t.pembuatan]:[null],beritaacara:t.beritaacara?[t.beritaacara]:[null],geom:r?[r]:[null]}}function Re(e){return e.kemantren!==void 0&&e.kelurahan!==void 0&&e.kondisi!==void 0&&e.east!==void 0&&e.south!==void 0&&e.nopilar!==void 0&&e.northing!==void 0&&e.easting!==void 0&&e.up!==void 0&&e.peraturan!==void 0&&e.perbatasan!==void 0&&e.alamat!==void 0&&e.pemeliharaan!==void 0&&e.pembuatan!==void 0&&e.beritaacara!==void 0&&e.geom!==void 0}let J;function We(e){const t=e.length*17+17,l={defaultColDef:{width:250,resizable:!0,filter:!0,floatingFilter:!0,sortable:!0},columnDefs:[{headerName:"Kemantren",field:"kemantren"},{headerName:"Kelurahan",field:"kelurahan"},{headerName:"Kondisi",field:"kondisi"},{headerName:"Longitude",field:"east"},{headerName:"Latitude",field:"south"},{headerName:"No Pilar",field:"nopilar"},{headerName:"Northing",field:"northing"},{headerName:"Easting",field:"easting"},{headerName:"Up",field:"up"},{headerName:"Peraturan",field:"peraturan"},{headerName:"Perbatasan",field:"perbatasan"},{headerName:"Alamat",field:"alamat"},{headerName:"Pemeliharaan",field:"pemeliharaan"},{headerName:"Pembuatan",field:"pembuatan"},{headerName:"Beritaacara",field:"beritaacara"},{headerName:"Geom",field:"geom"}],rowData:e,pagination:!0,paginationPageSize:10,rowSelection:"single"},a=document.querySelector("#myGrid");J&&J.destroy(),J=new Ge(a,l),a.style.height=Math.min(t,600)+"px"}function Je(e){console.log("Displaying data: ",e),We(e)}function Ze(e){const n=$("#featureForm");n.find("input[type='hidden']").remove();const r=$('meta[name="csrf-token"]').attr("content");n.append(k("_token",r));const i=$("#inputdate").val(),t=$("#operator").val();n.append(k("inputdate",i)),n.append(k("operator",t)),e.forEach(l=>{for(const a in l)Array.isArray(l[a])?l[a].forEach(c=>{n.append(k(`${a}[]`,c))}):n.append(k(a,l[a]))})}function k(e,n){return $("<input>").attr("type","hidden").attr("name",e).attr("value",n)}function _e(e){const n=new Q;e.forEach(t=>{if(Array.isArray(t.geom)&&t.geom.length>0&&typeof t.geom[0]=="string"){const l=t.geom[0],a=l.substring(6,l.length-1).split(" ").map(parseFloat),c=we(a.slice(0,2),"EPSG:4326","EPSG:3857"),E=new ee({geometry:new U(c),Name:t.Name,description:t.description});n.addFeature(E)}else console.error("Invalid geom data:",t.geom)});const r=new te({source:n,style:new O({image:new F({radius:6,fill:new b({color:"blue"}),stroke:new C({color:"white",width:2})})})});o.addLayer(r);const i=n.getFeatures().length>0?n.getExtent():null;i?o.getView().fit(i,{padding:[50,50,50,50],duration:1e3}):console.warn("No features found in vector source.")}var xe=new ye({className:"mousePosition",projection:"EPSG:4326",coordinateFormat:function(e){return Ee(e,"{y} , {x}",6)}});o.addControl(xe);var Ke=new be({target:"custom-scale-line",text:!0,bar:!0});o.addControl(Ke);var m=document.createElement("div");m.className="toolbarDiv";var L=document.createElement("button");L.innerHTML='<span class="icon"><i class="icon-home"></i></span>';L.className="myButton";L.title="Home";var D=document.createElement("div");D.className="homeButtonDiv";D.appendChild(L);m.appendChild(D);var Xe=new y({element:D});L.addEventListener("click",()=>{de(),o.setView(new re({center:le([110.35385111973005,-7.791739623962835]),zoom:18}))});o.addControl(Xe);let I=document.createElement("button");I.innerHTML='<span class="icon"><i class="icon-enlarge"></i></span>';I.className="myButton";I.title="FullScreen";var H=document.createElement("div");H.className="fsButtonDiv";H.appendChild(I);m.appendChild(H);let Ue=new y({element:H});I.addEventListener("click",()=>{let e=document.getElementById("map");e.requestFullscreen?e.requestFullscreen():e.msRequestFullscreen?e.msRequestFullscreen():e.mozRequestFullscreen?e.mozRequestFullscreen():e.webkitRequestFullscreen&&e.webkitRequestFullscreen()});o.addControl(Ue);let g=document.createElement("button");g.innerHTML='<span class="icon"><i class="icon-hand"></i></span>';g.className="myButton";g.id="panButton";g.title="Pan";let V=document.createElement("div");V.className="panButtonDiv";V.appendChild(g);m.appendChild(V);let Ye=new y({element:V}),Z=!1,ne=new ke;g.addEventListener("click",()=>{g.classList.toggle("clicked"),Z=!Z,Z?(document.getElementById("map").style.cursor="grab",o.addInteraction(ne)):(document.getElementById("map").style.cursor="default",o.removeInteraction(ne))});o.addControl(Ye);var G=new ie;G.on("boxend",function(){var e=G.getGeometry().getExtent();o.getView().fit(e)});var h=document.createElement("button");h.innerHTML='<span class="icon"><i class="icon-zoom-in"></i></span>';h.className="myButton";h.id="ziButton";h.title="ZoomIn";var A=document.createElement("div");A.className="ziButtonDiv";A.appendChild(h);m.appendChild(A);var Qe=new y({element:A}),_=!1;h.addEventListener("click",()=>{h.classList.toggle("clicked"),_=!_,_?(document.getElementById("map").style.cursor="zoom-in",o.addInteraction(G)):(o.removeInteraction(G),document.getElementById("map").style.cursor="default")});o.addControl(Qe);var M=new ie;M.on("boxend",function(){var e=M.getGeometry().getExtent();o.getView().setCenter(Ce(e)),B.setZoom(B.getZoom()-1)});var f=document.createElement("button");f.innerHTML='<span class="icon"><i class="icon-zoom-out"></i></span>';f.className="myButton";f.id="zoButton";f.title="Zoom Out";var j=document.createElement("div");j.className="zoButtonDiv";j.appendChild(f);m.appendChild(j);var et=new y({element:j}),x=!1;f.addEventListener("click",()=>{f.classList.toggle("clicked"),x=!x,x?(document.getElementById("map").style.cursor="zoom-out",o.addInteraction(M)):(o.removeInteraction(M),document.getElementById("map").style.cursor="default")});o.addControl(et);$("#btnCrosshair").on("click",function(e){$("#btnCrosshair").toggleClass("clicked"),$("#btnCrosshair").hasClass("clicked")?tt():de()});var ce,S=new Me({trackingOptions:{enableHighAccuracy:!0},tracking:!0,projection:B.getProjection()}),N=new ee;N.setStyle(new O({image:new F({radius:6,fill:new b({color:"#3399cc"}),stroke:new C({color:"#fff",width:2})})}));var z=new ee;new te({map:o,source:new Q({features:[z,N]})});function tt(){var e=S.getPosition();N.setGeometry(e?new U(e):null),z.setGeometry(S.getAccuracyGeometry()),e&&o.getView().animate({center:e,zoom:16,duration:1e3}),ce=setInterval(function(){var n=S.getPosition(),r=S.getAccuracyGeometry();N.setGeometry(n?new U(n):null),z.setGeometry(r),n&&o.getView().animate({center:n,duration:1e3})},1e4)}function de(){clearInterval(ce),N.setGeometry(null),z.setGeometry(null)}let v=document.createElement("button");v.innerHTML='<span class="icon"><i class="icon-ruler"></i></span>';v.className="myButton";v.id="lengthButton";v.title="Measure Length";var q=document.createElement("div");q.className="lengthButtonDiv";q.appendChild(v);m.appendChild(q);var nt=new y({element:q}),K=!1;v.addEventListener("click",()=>{if(v.classList.toggle("clicked"),K=!K,document.getElementById("map").style.cursor="default",K)o.removeInteraction(u),ue("LineString");else{o.removeInteraction(u),W.clear();const e=document.getElementsByClassName("ol-tooltip ol-tooltip-static");for(;e.length>0;)e[0].remove()}});o.addControl(nt);let w=document.createElement("button");w.innerHTML='<span class="icon"><i class="icon-straighten"></i></span>';w.className="myButton";w.id="areaButton";w.title="Measure Area";var R=document.createElement("div");R.className="areaButtonDiv";R.appendChild(w);m.appendChild(R);var at=new y({element:R}),X=!1;w.addEventListener("click",()=>{if(w.classList.toggle("clicked"),X=!X,document.getElementById("map").style.cursor="default",X)o.removeInteraction(u),ue("Polygon");else{o.removeInteraction(u),W.clear();const e=document.getElementsByClassName("ol-tooltip ol-tooltip-static");for(;e.length>0;)e[0].remove()}});o.addControl(at);var u,W=new Q,ot=new te({source:W,style:new O({fill:new b({color:"rgba(255, 255, 255, 0.2)"}),stroke:new C({color:"#ffcc33",width:2}),image:new F({radius:7,fill:new b({color:"#ffcc33"})})})});o.addLayer(ot);function ue(e){u=new Ne({source:W,type:e,style:new O({fill:new b({color:"rgba(200, 200, 200, 0.6)"}),stroke:new C({color:"rgba(0, 0, 0, 0.5)",lineDash:[10,10],width:2}),image:new F({radius:5,stroke:new C({color:"rgba(0, 0, 0, 0.7)"}),fill:new b({color:"rgba(255, 255, 255, 0.2)"})})})}),o.addInteraction(u),oe(),rt();var n,r=function(i){i.dragging||n&&n.getGeometry()};o.on("pointermove",r),u.on("drawstart",function(i){n=i.feature;var t=i.coordinate;n.getGeometry().on("change",function(l){var a=l.target,c;a instanceof Le?(c=it(a),t=a.getInteriorPoint().getCoordinates()):a instanceof Ie&&(c=lt(a),t=a.getLastCoordinate()),d.innerHTML=c,P.setPosition(t)})}),u.on("drawend",function(){d.className="ol-tooltip ol-tooltip-static",P.setOffset([0,-7]),n=null,d=null,oe()})}var p,ae;function rt(){p&&p.parentNode.removeChild(p),p=document.createElement("div"),p.className="ol-tooltip hidden",ae=new se({element:p,offset:[15,0],positioning:"center-left"}),o.addOverlay(ae)}$(o.getViewport()).on("mouseout",function(){$(p).addClass("hidden")});var d,P;function oe(){d&&d.parentNode.removeChild(d),d=document.createElement("div"),d.className="ol-tooltip  ol-tooltip-measure",P=new se({element:d,offset:[0,-15],positioning:"bottom-center"}),o.addOverlay(P)}var lt=function(e){var n=Se(e,{projection:"EPSG:3857"}),r;return n>1e3?r=Math.round(n/1e3*100)/100+" km":r=Math.round(n*100)/100+" m",r},it=function(e){var n=Be(e,{projection:"EPSG:3857"}),r;return n>1e6?r=Math.round(n/1e6*100)/100+" km<sup>2</sup>":r=Math.round(n*100)/100+" m<sup>2</sup>",r};