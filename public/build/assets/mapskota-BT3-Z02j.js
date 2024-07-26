import{b as k,G as Y,c as Q,V as de,f as ue,M as me,T,O as pe,X as U,L as re,S as p,e as d,d as u,a as ve,g as fe,h as ge,i as ye,j as B,D as we,k as oe,l as he,C as ee,m as Ee,n as be,o as Le,p as le,q as Se,r as Be}from"./GeoJSON-C5wKpImO.js";document.addEventListener("DOMContentLoaded",function(){var e=document.querySelectorAll(".user-action");e.forEach(function(t){t.addEventListener("click",function(n){n.preventDefault();var l=document.querySelectorAll(".side-nav");l.forEach(function(r){r.classList.remove("active")});var o=t.getAttribute("data-target"),i=document.querySelector(o);i?i.classList.add("active"):console.error("Target sidebar not found for selector: ",o)})})});document.getElementById("layerSelect").addEventListener("change",function(){var e=this.value,t;if(e==="bataspilar")t="/admin/bataspilar";else if(e==="bataskota")t="/admin/kota";else if(e==="bataskemantren")t="/admin/kecamatan";else if(e==="bataskelurahan")t="/admin/kelurahan";else if(e==="batasrw")t="/admin/rw";else return;$.getJSON(t,function(n){if(n.data){var l=new k({features:new Y().readFeatures(n.data,{featureProjection:"EPSG:4326"})});Ie(l)}else console.error("Data GeoJSON tidak ditemukan dalam respons")}).fail(function(n,l,o){console.error("Request Failed: "+l+", "+o)})});function Ie(e){var t=e.getFeatures(),n=new Set;t.forEach(function(o){var i=o.getProperties();for(var r in i)i.hasOwnProperty(r)&&r!=="geometry"&&n.add(r)});var l=document.getElementById("propertySelect");l.innerHTML="<option>Pilih Properti</option>",n.forEach(function(o){var i=document.createElement("option");i.value=o,i.text=o,l.appendChild(i)}),l.addEventListener("change",function(){var o=this.value;ke(o,t)})}function ke(e,t){var n="";t.forEach(function(i){var r=i.getProperties();r.hasOwnProperty(e)&&n===""&&(typeof r[e]=="number"?n="number":n="string")});var l=document.getElementById("operatorSelect");l.innerHTML="<option>Pilih Operator</option>";var o=n==="number"?["=",">","<"]:["=","LIKE"];o.forEach(function(i){var r=document.createElement("option");r.value=i,r.text=i,l.appendChild(r)})}var V=null;document.getElementById("getFilterButton").addEventListener("click",function(){var e=document.getElementById("layerSelect").value,t=document.getElementById("propertySelect").value,n=document.getElementById("operatorSelect").value,l=document.getElementById("valueInput").value;if(e&&t&&n&&l){var o;if(e==="bataspilar")o="/admin/bataspilar";else if(e==="bataskota")o="/admin/kota";else if(e==="bataskemantren")o="/admin/kecamatan";else if(e==="bataskelurahan")o="/admin/kelurahan";else if(e==="batasrw")o="/admin/rw";else return;$.getJSON(o,function(i){if(i.data){let A=function(g){var j=g.getGeometry().getType();switch(j){case"Point":return new p({image:new ee({radius:7,fill:new u({color:"rgba(255, 0, 0, 0.6)"}),stroke:new d({color:"red",width:2})})});case"LineString":return new p({stroke:new d({color:"red",width:3})});case"Polygon":return new p({stroke:new d({color:"red",width:2}),fill:new u({color:"rgba(0, 0, 255, 0.1)"})});default:return new p({stroke:new d({color:"black",width:1}),fill:new u({color:"rgba(0, 0, 0, 0.1)"})})}};var r=new k({features:new Y().readFeatures(i.data,{featureProjection:"EPSG:4326"})}),s=r.getFeatures().filter(function(g){var j=g.getProperties(),P=j[t];switch(n){case"=":return P==l;case">":return P>l;case"<":return P<l;case"LIKE":return P.toLowerCase().includes(l.toLowerCase());default:return!1}}),f=new k({features:s}),m=new Q({title:"Hasil Filter",source:f,style:A});V&&a.removeLayer(V),a.addLayer(m),V=m;var I=f.getExtent();a.getView().fit(I,{duration:1e3}),console.log(f),s.forEach(function(g){console.log(g.getProperties())})}else console.error("Data GeoJSON tidak ditemukan dalam respons")}).fail(function(i,r,s){console.error("Request Failed: "+r+", "+s)})}else alert("Silakan pilih semua opsi dan masukkan nilai.")});function ie(){const e=document.querySelector(".card-body"),t=document.getElementById("attribute"),n=document.getElementById("map"),l=e.offsetHeight,o=t.offsetHeight,i=l-o;n.style.height=`${i>0?i:0}px`}function Ce(){document.getElementById("attribute").classList.add("visible"),ie()}const Pe=document.getElementById("attribute"),Me=new ResizeObserver(e=>{for(let t of e)ie()});Me.observe(Pe);document.addEventListener("DOMContentLoaded",function(){Ce()});var X=new de({center:ue([110.35385111973005,-7.791739623962835]),zoom:18,projection:"EPSG:4326"}),a=new me({target:"map",view:X,controls:[]}),Fe=new T({title:"Open Street Map",visible:!0,source:new pe}),Ne=new T({title:"Esri Maps",visible:!0,source:new U({attributions:["Tiles © Esri"],url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"})}),Te=new T({title:"World Street Map",visible:!0,source:new U({attributions:["Tiles © Esri"],url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"})}),ze=new T({title:"World Imagery Map",visible:!0,source:new U({attributions:["Tiles © Esri"],url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"})}),Oe=new re({title:"BaseMaps",layers:[Ne,Fe,Te,ze]});a.addLayer(Oe);var se=new re({title:"Group",layers:[]});a.addLayer(se);var R=null;$.getJSON("/admin/kota",function(e){if(e.data){var t=new k({features:new Y().readFeatures(e.data,{featureProjection:"EPSG:4326"})}),n=new Q({title:"Kelurahan",source:t,style:new p({stroke:new d({color:"blue",width:2}),fill:new u({color:"rgba(0, 0, 255, 0.1)"})})});se.getLayers().push(n);var l=t.getExtent();a.getView().fit(l,{duration:1e3});var o=new p({stroke:new d({color:"yellow",width:3}),fill:new u({color:"rgba(255, 255, 0, 0.3)"})});a.on("click",function(i){var r=null;if(a.forEachFeatureAtPixel(i.pixel,function(A,g){if(g===n)return r=A,!0}),r){R&&R.setStyle(null),r.setStyle(o),R=r;var s=r.getProperties(),f="<table class='table table-bordered m-0'><thead><tr><th>Property</th><th>Value</th></tr></thead><tbody>";for(var m in s)if(s.hasOwnProperty(m)&&m!=="geometry"){var I=s[m];m==="beritaacara"&&(I="<a href='"+I+"' target='_blank'>link berita acara</a>"),f+="<tr><td>"+m+"</td><td>"+I+"</td></tr>"}f+="</tbody></table>",document.querySelector("#attribute .card-body").innerHTML=f,document.getElementById("attribute").style.display="block"}else document.getElementById("attribute").style.display="none"})}else console.error("Data GeoJSON tidak ditemukan dalam respons")});const Ge=new ve({tipLabel:"Show Layers",groupSelectStyle:"children",collapseTipLabel:"Collapse layers"});a.addControl(Ge);var xe=new fe({className:"mousePosition",projection:"EPSG:4326",coordinateFormat:function(e){return ge(e,"{y} , {x}",6)}});a.addControl(xe);var De=new ye({target:"custom-scale-line",text:!0,bar:!0});a.addControl(De);var S=document.createElement("div");S.className="toolbarDiv";let C=document.createElement("button");C.innerHTML='<span class="icon"><i class="icon-enlarge"></i></span>';C.className="myButton";C.title="FullScreen";var z=document.createElement("div");z.className="fsButtonDiv";z.appendChild(C);S.appendChild(z);let qe=new B({element:z});C.addEventListener("click",()=>{let e=document.getElementById("map");e.requestFullscreen?e.requestFullscreen():e.msRequestFullscreen?e.msRequestFullscreen():e.mozRequestFullscreen?e.mozRequestFullscreen():e.webkitRequestFullscreen&&e.webkitRequestFullscreen()});a.addControl(qe);let w=document.createElement("button");w.innerHTML='<span class="icon"><i class="icon-hand"></i></span>';w.className="myButton";w.id="panButton";w.title="Pan";let O=document.createElement("div");O.className="panButtonDiv";O.appendChild(w);S.appendChild(O);let He=new B({element:O}),J=!1,te=new we;w.addEventListener("click",()=>{w.classList.toggle("clicked"),J=!J,J?(document.getElementById("map").style.cursor="grab",a.addInteraction(te)):(document.getElementById("map").style.cursor="default",a.removeInteraction(te))});a.addControl(He);var M=new oe;M.on("boxend",function(){var e=M.getGeometry().getExtent();a.getView().fit(e)});var h=document.createElement("button");h.innerHTML='<span class="icon"><i class="icon-zoom-in"></i></span>';h.className="myButton";h.id="ziButton";h.title="ZoomIn";var G=document.createElement("div");G.className="ziButtonDiv";G.appendChild(h);S.appendChild(G);var Ae=new B({element:G}),W=!1;h.addEventListener("click",()=>{h.classList.toggle("clicked"),W=!W,W?(document.getElementById("map").style.cursor="zoom-in",a.addInteraction(M)):(a.removeInteraction(M),document.getElementById("map").style.cursor="default")});a.addControl(Ae);var F=new oe;F.on("boxend",function(){var e=F.getGeometry().getExtent();a.getView().setCenter(he(e)),X.setZoom(X.getZoom()-1)});var E=document.createElement("button");E.innerHTML='<span class="icon"><i class="icon-zoom-out"></i></span>';E.className="myButton";E.id="zoButton";E.title="Zoom Out";var x=document.createElement("div");x.className="zoButtonDiv";x.appendChild(E);S.appendChild(x);var je=new B({element:x}),_=!1;E.addEventListener("click",()=>{E.classList.toggle("clicked"),_=!_,_?(document.getElementById("map").style.cursor="zoom-out",a.addInteraction(F)):(a.removeInteraction(F),document.getElementById("map").style.cursor="default")});a.addControl(je);let b=document.createElement("button");b.innerHTML='<span class="icon"><i class="icon-ruler"></i></span>';b.className="myButton";b.id="lengthButton";b.title="Measure Length";var D=document.createElement("div");D.className="lengthButtonDiv";D.appendChild(b);S.appendChild(D);var Ve=new B({element:D}),Z=!1;b.addEventListener("click",()=>{if(b.classList.toggle("clicked"),Z=!Z,document.getElementById("map").style.cursor="default",Z)a.removeInteraction(v),ce("LineString");else{a.removeInteraction(v),H.clear();const e=document.getElementsByClassName("ol-tooltip ol-tooltip-static");for(;e.length>0;)e[0].remove()}});a.addControl(Ve);let L=document.createElement("button");L.innerHTML='<span class="icon"><i class="icon-straighten"></i></span>';L.className="myButton";L.id="areaButton";L.title="Measure Area";var q=document.createElement("div");q.className="areaButtonDiv";q.appendChild(L);S.appendChild(q);var Re=new B({element:q}),K=!1;L.addEventListener("click",()=>{if(L.classList.toggle("clicked"),K=!K,document.getElementById("map").style.cursor="default",K)a.removeInteraction(v),ce("Polygon");else{a.removeInteraction(v),H.clear();const e=document.getElementsByClassName("ol-tooltip ol-tooltip-static");for(;e.length>0;)e[0].remove()}});a.addControl(Re);var v,H=new k,Je=new Q({source:H,style:new p({fill:new u({color:"rgba(255, 255, 255, 0.2)"}),stroke:new d({color:"#ffcc33",width:2}),image:new ee({radius:7,fill:new u({color:"#ffcc33"})})})});a.addLayer(Je);function ce(e){v=new Ee({source:H,type:e,style:new p({fill:new u({color:"rgba(200, 200, 200, 0.6)"}),stroke:new d({color:"rgba(0, 0, 0, 0.5)",lineDash:[10,10],width:2}),image:new ee({radius:5,stroke:new d({color:"rgba(0, 0, 0, 0.7)"}),fill:new u({color:"rgba(255, 255, 255, 0.2)"})})})}),a.addInteraction(v),ne(),We();var t,n=function(l){l.dragging||t&&t.getGeometry()};a.on("pointermove",n),v.on("drawstart",function(l){t=l.feature;var o=l.coordinate;t.getGeometry().on("change",function(i){var r=i.target,s;r instanceof be?(s=$e(r),o=r.getInteriorPoint().getCoordinates()):r instanceof Le&&(s=_e(r),o=r.getLastCoordinate()),c.innerHTML=s,N.setPosition(o)})}),v.on("drawend",function(){c.className="ol-tooltip ol-tooltip-static",N.setOffset([0,-7]),t=null,c=null,ne()})}var y,ae;function We(){y&&y.parentNode.removeChild(y),y=document.createElement("div"),y.className="ol-tooltip hidden",ae=new le({element:y,offset:[15,0],positioning:"center-left"}),a.addOverlay(ae)}$(a.getViewport()).on("mouseout",function(){$(y).addClass("hidden")});var c,N;function ne(){c&&c.parentNode.removeChild(c),c=document.createElement("div"),c.className="ol-tooltip  ol-tooltip-measure",N=new le({element:c,offset:[0,-15],positioning:"bottom-center"}),a.addOverlay(N)}var _e=function(e){var t=Se(e,{projection:"EPSG:4326"}),n;return t>1e3?n=Math.round(t/1e3*100)/100+" km":n=Math.round(t*100)/100+" m",n},$e=function(e){var t=Be(e,{projection:"EPSG:4326"}),n;return t>1e6?n=Math.round(t/1e6*100)/100+" km<sup>2</sup>":n=Math.round(t*100)/100+" m<sup>2</sup>",n};
