import{V as re,f as le,M as pe,T as F,O as ge,X as Y,L as fe,a as ve,G as he,b as Q,t as we,F as ee,P as K,c as te,S as T,C as O,d as N,e as S,g as ye,h as Ee,i as Ne,j as y,D as Ce,k as ie,l as Se,m as be,n as Le,o as Ie,p as se,q as ke,r as Be}from"./GeoJSON-C5wKpImO.js";import{c as Ge}from"./main.esm-BcYrPVTO.js";import{G as Pe}from"./Geolocation-DOMlNKP2.js";import{W as ze}from"./WKT-BIzRGbMv.js";var B=new re({center:le([110.35385111973005,-7.791739623962835]),zoom:18}),o=new pe({target:"map",view:B,controls:[]}),Me=new F({title:"Open Street Map",visible:!0,source:new ge}),Fe=new F({title:"Esri Maps",visible:!0,source:new Y({attributions:["Tiles © Esri"],url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"})}),Te=new F({title:"World Street Map",visible:!0,source:new Y({attributions:["Tiles © Esri"],url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"})}),Oe=new F({title:"World Imagery Map",visible:!0,source:new Y({attributions:["Tiles © Esri"],url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"})}),De=new fe({title:"BaseMaps",layers:[Fe,Me,Te,Oe]});o.addLayer(De);const He=new ve({tipLabel:"Show Layers",groupSelectStyle:"children",collapseTipLabel:"Collapse layers"});o.addControl(He);$(document).ready(function(){let e=[];$("#formFile").on("change",function(t){xe(t,e)}),$("#checkData").on("click",function(){We(e)})});function xe(e,t){const r=e.target.files;if(r.length>0){const i=r[0];if($e(i)){const n=new FileReader;n.onload=function(l){je(l,t)},n.onerror=Ve,n.readAsText(i)}else alert("Please upload a valid GeoJSON file.")}}function $e(e){return e.type==="application/json"||e.name.endsWith(".geojson")}function Ve(e){console.error("Error reading file:",e)}function je(e,t){try{const r=JSON.parse(e.target.result);console.log("GeoJSON data:",r);const i=new he().readFeatures(r);let n=0;i.forEach(l=>{const a=Ae(l);if(qe(a)){const s=Object.values(a).reduce((c,me)=>Math.max(c,me.length),0);n=Math.max(n,s),t.some(c=>c.East===a.East&&c.South===a.South&&c.NoPilar===a.NoPilar&&c.Northing===a.Northing&&c.Easting===a.Easting&&c.Up===a.Up&&c.geom===a.geom)||t.push(a)}else t.push({East:[null],South:[null],NoPilar:[null],Easting:[null],Northing:[null],Up:[null],geom:[null]})}),t.forEach(l=>{for(const a in l)if(l[a].length<n){const s=n-l[a].length;for(let E=0;E<s;E++)l[a].push(null)}}),_e(t),Je(t)}catch(r){console.error("Error parsing GeoJSON file:",r)}}function Ae(e){const t=new ze;let r=null;const i=e.getGeometry();if(i&&i.getType()==="Point")try{r=t.writeGeometry(i).replace(/POINT Z\(([^)]+)\)/g,(a,s)=>`POINT(${s.split(" ").slice(0,2).join(" ")})`)}catch(l){console.error("Error transforming geometry:",l)}const n=e.getProperties();return{East:n.E?[n.E]:[null],South:n.S?[n.S]:[null],NoPilar:n.No_Pilar?[n.No_Pilar]:[null],Easting:n.x?[n.x]:[null],Northing:n.y?[n.y]:[null],Up:n.z?[n.z]:[null],geom:r?[r]:[null]}}function qe(e){return e.East!==void 0&&e.South!==void 0&&e.NoPilar!==void 0&&e.Northing!==void 0&&e.Easting!==void 0&&e.Up!==void 0&&e.geom!==void 0}let W;function Re(e){const n=e.length*17+17,l={defaultColDef:{width:250,resizable:!0,filter:!0,floatingFilter:!0,sortable:!0},columnDefs:[{headerName:"Longitude",field:"East"},{headerName:"Latitude",field:"South"},{headerName:"No Pilar",field:"NoPilar"},{headerName:"Northing",field:"Northing"},{headerName:"Easting",field:"Easting"},{headerName:"Up",field:"Up"},{headerName:"Geom",field:"geom"}],rowData:e,pagination:!0,paginationPageSize:10,rowSelection:"single"},a=document.querySelector("#myGrid");W&&W.destroy(),W=new Ge(a,l),a.style.height=Math.min(n,600)+"px"}function We(e){console.log("Displaying data: ",e),Re(e)}function _e(e){const t=$("#featureForm");t.find("input[type='hidden']").remove();const r=$('meta[name="csrf-token"]').attr("content");t.append(C("_token",r));const i=$("#inputdate").val(),n=$("#operator").val();t.append(C("inputdate",i)),t.append(C("operator",n)),e.forEach(l=>{for(const a in l)Array.isArray(l[a])?l[a].forEach(s=>{t.append(C(`${a}[]`,s))}):t.append(C(a,l[a]))})}function C(e,t){return $("<input>").attr("type","hidden").attr("name",e).attr("value",t)}function Je(e){const t=new Q;e.forEach(n=>{if(Array.isArray(n.geom)&&n.geom.length>0&&typeof n.geom[0]=="string"){const l=n.geom[0],a=l.substring(6,l.length-1).split(" ").map(parseFloat),s=we(a.slice(0,2),"EPSG:4326","EPSG:3857"),E=new ee({geometry:new K(s),Name:n.Name,description:n.description});t.addFeature(E)}else console.error("Invalid geom data:",n.geom)});const r=new te({source:t,style:new T({image:new O({radius:6,fill:new N({color:"blue"}),stroke:new S({color:"white",width:2})})})});o.addLayer(r);const i=t.getFeatures().length>0?t.getExtent():null;i?o.getView().fit(i,{padding:[50,50,50,50],duration:1e3}):console.warn("No features found in vector source.")}var Ue=new ye({className:"mousePosition",projection:"EPSG:4326",coordinateFormat:function(e){return Ee(e,"{y} , {x}",6)}});o.addControl(Ue);var Ze=new Ne({target:"custom-scale-line",text:!0,bar:!0});o.addControl(Ze);var m=document.createElement("div");m.className="toolbarDiv";var L=document.createElement("button");L.innerHTML='<span class="icon"><i class="icon-home"></i></span>';L.className="myButton";L.title="Home";var D=document.createElement("div");D.className="homeButtonDiv";D.appendChild(L);m.appendChild(D);var Xe=new y({element:D});L.addEventListener("click",()=>{de(),o.setView(new re({center:le([110.35385111973005,-7.791739623962835]),zoom:18}))});o.addControl(Xe);let I=document.createElement("button");I.innerHTML='<span class="icon"><i class="icon-enlarge"></i></span>';I.className="myButton";I.title="FullScreen";var H=document.createElement("div");H.className="fsButtonDiv";H.appendChild(I);m.appendChild(H);let Ke=new y({element:H});I.addEventListener("click",()=>{let e=document.getElementById("map");e.requestFullscreen?e.requestFullscreen():e.msRequestFullscreen?e.msRequestFullscreen():e.mozRequestFullscreen?e.mozRequestFullscreen():e.webkitRequestFullscreen&&e.webkitRequestFullscreen()});o.addControl(Ke);let g=document.createElement("button");g.innerHTML='<span class="icon"><i class="icon-hand"></i></span>';g.className="myButton";g.id="panButton";g.title="Pan";let x=document.createElement("div");x.className="panButtonDiv";x.appendChild(g);m.appendChild(x);let Ye=new y({element:x}),_=!1,ne=new Ce;g.addEventListener("click",()=>{g.classList.toggle("clicked"),_=!_,_?(document.getElementById("map").style.cursor="grab",o.addInteraction(ne)):(document.getElementById("map").style.cursor="default",o.removeInteraction(ne))});o.addControl(Ye);var G=new ie;G.on("boxend",function(){var e=G.getGeometry().getExtent();o.getView().fit(e)});var f=document.createElement("button");f.innerHTML='<span class="icon"><i class="icon-zoom-in"></i></span>';f.className="myButton";f.id="ziButton";f.title="ZoomIn";var V=document.createElement("div");V.className="ziButtonDiv";V.appendChild(f);m.appendChild(V);var Qe=new y({element:V}),J=!1;f.addEventListener("click",()=>{f.classList.toggle("clicked"),J=!J,J?(document.getElementById("map").style.cursor="zoom-in",o.addInteraction(G)):(o.removeInteraction(G),document.getElementById("map").style.cursor="default")});o.addControl(Qe);var P=new ie;P.on("boxend",function(){var e=P.getGeometry().getExtent();o.getView().setCenter(Se(e)),B.setZoom(B.getZoom()-1)});var v=document.createElement("button");v.innerHTML='<span class="icon"><i class="icon-zoom-out"></i></span>';v.className="myButton";v.id="zoButton";v.title="Zoom Out";var j=document.createElement("div");j.className="zoButtonDiv";j.appendChild(v);m.appendChild(j);var et=new y({element:j}),U=!1;v.addEventListener("click",()=>{v.classList.toggle("clicked"),U=!U,U?(document.getElementById("map").style.cursor="zoom-out",o.addInteraction(P)):(o.removeInteraction(P),document.getElementById("map").style.cursor="default")});o.addControl(et);$("#btnCrosshair").on("click",function(e){$("#btnCrosshair").toggleClass("clicked"),$("#btnCrosshair").hasClass("clicked")?tt():de()});var ce,k=new Pe({trackingOptions:{enableHighAccuracy:!0},tracking:!0,projection:B.getProjection()}),b=new ee;b.setStyle(new T({image:new O({radius:6,fill:new N({color:"#3399cc"}),stroke:new S({color:"#fff",width:2})})}));var z=new ee;new te({map:o,source:new Q({features:[z,b]})});function tt(){var e=k.getPosition();b.setGeometry(e?new K(e):null),z.setGeometry(k.getAccuracyGeometry()),e&&o.getView().animate({center:e,zoom:16,duration:1e3}),ce=setInterval(function(){var t=k.getPosition(),r=k.getAccuracyGeometry();b.setGeometry(t?new K(t):null),z.setGeometry(r),t&&o.getView().animate({center:t,duration:1e3})},1e4)}function de(){clearInterval(ce),b.setGeometry(null),z.setGeometry(null)}let h=document.createElement("button");h.innerHTML='<span class="icon"><i class="icon-ruler"></i></span>';h.className="myButton";h.id="lengthButton";h.title="Measure Length";var A=document.createElement("div");A.className="lengthButtonDiv";A.appendChild(h);m.appendChild(A);var nt=new y({element:A}),Z=!1;h.addEventListener("click",()=>{if(h.classList.toggle("clicked"),Z=!Z,document.getElementById("map").style.cursor="default",Z)o.removeInteraction(u),ue("LineString");else{o.removeInteraction(u),R.clear();const e=document.getElementsByClassName("ol-tooltip ol-tooltip-static");for(;e.length>0;)e[0].remove()}});o.addControl(nt);let w=document.createElement("button");w.innerHTML='<span class="icon"><i class="icon-straighten"></i></span>';w.className="myButton";w.id="areaButton";w.title="Measure Area";var q=document.createElement("div");q.className="areaButtonDiv";q.appendChild(w);m.appendChild(q);var ot=new y({element:q}),X=!1;w.addEventListener("click",()=>{if(w.classList.toggle("clicked"),X=!X,document.getElementById("map").style.cursor="default",X)o.removeInteraction(u),ue("Polygon");else{o.removeInteraction(u),R.clear();const e=document.getElementsByClassName("ol-tooltip ol-tooltip-static");for(;e.length>0;)e[0].remove()}});o.addControl(ot);var u,R=new Q,at=new te({source:R,style:new T({fill:new N({color:"rgba(255, 255, 255, 0.2)"}),stroke:new S({color:"#ffcc33",width:2}),image:new O({radius:7,fill:new N({color:"#ffcc33"})})})});o.addLayer(at);function ue(e){u=new be({source:R,type:e,style:new T({fill:new N({color:"rgba(200, 200, 200, 0.6)"}),stroke:new S({color:"rgba(0, 0, 0, 0.5)",lineDash:[10,10],width:2}),image:new O({radius:5,stroke:new S({color:"rgba(0, 0, 0, 0.7)"}),fill:new N({color:"rgba(255, 255, 255, 0.2)"})})})}),o.addInteraction(u),ae(),rt();var t,r=function(i){i.dragging||t&&t.getGeometry()};o.on("pointermove",r),u.on("drawstart",function(i){t=i.feature;var n=i.coordinate;t.getGeometry().on("change",function(l){var a=l.target,s;a instanceof Le?(s=it(a),n=a.getInteriorPoint().getCoordinates()):a instanceof Ie&&(s=lt(a),n=a.getLastCoordinate()),d.innerHTML=s,M.setPosition(n)})}),u.on("drawend",function(){d.className="ol-tooltip ol-tooltip-static",M.setOffset([0,-7]),t=null,d=null,ae()})}var p,oe;function rt(){p&&p.parentNode.removeChild(p),p=document.createElement("div"),p.className="ol-tooltip hidden",oe=new se({element:p,offset:[15,0],positioning:"center-left"}),o.addOverlay(oe)}$(o.getViewport()).on("mouseout",function(){$(p).addClass("hidden")});var d,M;function ae(){d&&d.parentNode.removeChild(d),d=document.createElement("div"),d.className="ol-tooltip  ol-tooltip-measure",M=new se({element:d,offset:[0,-15],positioning:"bottom-center"}),o.addOverlay(M)}var lt=function(e){var t=ke(e,{projection:"EPSG:3857"}),r;return t>1e3?r=Math.round(t/1e3*100)/100+" km":r=Math.round(t*100)/100+" m",r},it=function(e){var t=Be(e,{projection:"EPSG:3857"}),r;return t>1e6?r=Math.round(t/1e6*100)/100+" km<sup>2</sup>":r=Math.round(t*100)/100+" m<sup>2</sup>",r};
