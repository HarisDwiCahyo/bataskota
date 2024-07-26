import{z as d,A as h,F as p,E as m,H as u,P as L,o as M,n as G,I as w,J as N,K as F}from"./GeoJSON-C5wKpImO.js";class I extends d{constructor(){super()}getType(){return"text"}readFeature(t,e){return this.readFeatureFromText(c(t),this.adaptOptions(e))}readFeatureFromText(t,e){return h()}readFeatures(t,e){return this.readFeaturesFromText(c(t),this.adaptOptions(e))}readFeaturesFromText(t,e){return h()}readGeometry(t,e){return this.readGeometryFromText(c(t),this.adaptOptions(e))}readGeometryFromText(t,e){return h()}readProjection(t){return this.readProjectionFromText(c(t))}readProjectionFromText(t){return this.dataProjection}writeFeature(t,e){return this.writeFeatureText(t,this.adaptOptions(e))}writeFeatureText(t,e){return h()}writeFeatures(t,e){return this.writeFeaturesText(t,this.adaptOptions(e))}writeFeaturesText(t,e){return h()}writeGeometry(t,e){return this.writeGeometryText(t,this.adaptOptions(e))}writeGeometryText(t,e){return h()}}function c(s){return typeof s=="string"?s:""}const R={POINT:L,LINESTRING:M,POLYGON:G,MULTIPOINT:w,MULTILINESTRING:N,MULTIPOLYGON:F},_="EMPTY",y="Z",f="M",O="ZM",o={START:0,TEXT:1,LEFT_PAREN:2,RIGHT_PAREN:3,NUMBER:4,COMMA:5,EOF:6},k={Point:"POINT",LineString:"LINESTRING",Polygon:"POLYGON",MultiPoint:"MULTIPOINT",MultiLineString:"MULTILINESTRING",MultiPolygon:"MULTIPOLYGON",GeometryCollection:"GEOMETRYCOLLECTION",Circle:"CIRCLE"};class A{constructor(t){this.wkt=t,this.index_=-1}isAlpha_(t){return t>="a"&&t<="z"||t>="A"&&t<="Z"}isNumeric_(t,e){return e=e!==void 0?e:!1,t>="0"&&t<="9"||t=="."&&!e}isWhiteSpace_(t){return t==" "||t=="	"||t=="\r"||t==`
`}nextChar_(){return this.wkt.charAt(++this.index_)}nextToken(){const t=this.nextChar_(),e=this.index_;let r=t,i;if(t=="(")i=o.LEFT_PAREN;else if(t==",")i=o.COMMA;else if(t==")")i=o.RIGHT_PAREN;else if(this.isNumeric_(t)||t=="-")i=o.NUMBER,r=this.readNumber_();else if(this.isAlpha_(t))i=o.TEXT,r=this.readText_();else{if(this.isWhiteSpace_(t))return this.nextToken();if(t==="")i=o.EOF;else throw new Error("Unexpected character: "+t)}return{position:e,value:r,type:i}}readNumber_(){let t;const e=this.index_;let r=!1,i=!1;do t=="."?r=!0:(t=="e"||t=="E")&&(i=!0),t=this.nextChar_();while(this.isNumeric_(t,r)||!i&&(t=="e"||t=="E")||i&&(t=="-"||t=="+"));return parseFloat(this.wkt.substring(e,this.index_--))}readText_(){let t;const e=this.index_;do t=this.nextChar_();while(this.isAlpha_(t));return this.wkt.substring(e,this.index_--).toUpperCase()}}class C{constructor(t){this.lexer_=t,this.token_={position:0,type:o.START},this.layout_="XY"}consume_(){this.token_=this.lexer_.nextToken()}isTokenType(t){return this.token_.type==t}match(t){const e=this.isTokenType(t);return e&&this.consume_(),e}parse(){return this.consume_(),this.parseGeometry_()}parseGeometryLayout_(){let t="XY";const e=this.token_;if(this.isTokenType(o.TEXT)){const r=e.value;r===y?t="XYZ":r===f?t="XYM":r===O&&(t="XYZM"),t!=="XY"&&this.consume_()}return t}parseGeometryCollectionText_(){if(this.match(o.LEFT_PAREN)){const t=[];do t.push(this.parseGeometry_());while(this.match(o.COMMA));if(this.match(o.RIGHT_PAREN))return t}throw new Error(this.formatErrorMessage_())}parsePointText_(){if(this.match(o.LEFT_PAREN)){const t=this.parsePoint_();if(this.match(o.RIGHT_PAREN))return t}throw new Error(this.formatErrorMessage_())}parseLineStringText_(){if(this.match(o.LEFT_PAREN)){const t=this.parsePointList_();if(this.match(o.RIGHT_PAREN))return t}throw new Error(this.formatErrorMessage_())}parsePolygonText_(){if(this.match(o.LEFT_PAREN)){const t=this.parseLineStringTextList_();if(this.match(o.RIGHT_PAREN))return t}throw new Error(this.formatErrorMessage_())}parseMultiPointText_(){if(this.match(o.LEFT_PAREN)){let t;if(this.token_.type==o.LEFT_PAREN?t=this.parsePointTextList_():t=this.parsePointList_(),this.match(o.RIGHT_PAREN))return t}throw new Error(this.formatErrorMessage_())}parseMultiLineStringText_(){if(this.match(o.LEFT_PAREN)){const t=this.parseLineStringTextList_();if(this.match(o.RIGHT_PAREN))return t}throw new Error(this.formatErrorMessage_())}parseMultiPolygonText_(){if(this.match(o.LEFT_PAREN)){const t=this.parsePolygonTextList_();if(this.match(o.RIGHT_PAREN))return t}throw new Error(this.formatErrorMessage_())}parsePoint_(){const t=[],e=this.layout_.length;for(let r=0;r<e;++r){const i=this.token_;if(this.match(o.NUMBER))t.push(i.value);else break}if(t.length==e)return t;throw new Error(this.formatErrorMessage_())}parsePointList_(){const t=[this.parsePoint_()];for(;this.match(o.COMMA);)t.push(this.parsePoint_());return t}parsePointTextList_(){const t=[this.parsePointText_()];for(;this.match(o.COMMA);)t.push(this.parsePointText_());return t}parseLineStringTextList_(){const t=[this.parseLineStringText_()];for(;this.match(o.COMMA);)t.push(this.parseLineStringText_());return t}parsePolygonTextList_(){const t=[this.parsePolygonText_()];for(;this.match(o.COMMA);)t.push(this.parsePolygonText_());return t}isEmptyGeometry_(){const t=this.isTokenType(o.TEXT)&&this.token_.value==_;return t&&this.consume_(),t}formatErrorMessage_(){return"Unexpected `"+this.token_.value+"` at position "+this.token_.position+" in `"+this.lexer_.wkt+"`"}parseGeometry_(){const t=this.token_;if(this.match(o.TEXT)){const e=t.value;this.layout_=this.parseGeometryLayout_();const r=this.isEmptyGeometry_();if(e=="GEOMETRYCOLLECTION"){if(r)return new u([]);const a=this.parseGeometryCollectionText_();return new u(a)}const i=R[e];if(!i)throw new Error("Invalid geometry type: "+e);let n;if(r)e=="POINT"?n=[NaN,NaN]:n=[];else switch(e){case"POINT":{n=this.parsePointText_();break}case"LINESTRING":{n=this.parseLineStringText_();break}case"POLYGON":{n=this.parsePolygonText_();break}case"MULTIPOINT":{n=this.parseMultiPointText_();break}case"MULTILINESTRING":{n=this.parseMultiLineStringText_();break}case"MULTIPOLYGON":{n=this.parseMultiPolygonText_();break}}return new i(n,this.layout_)}throw new Error(this.formatErrorMessage_())}}class Z extends I{constructor(t){super(),t=t||{},this.splitCollection_=t.splitCollection!==void 0?t.splitCollection:!1}parse_(t){const e=new A(t);return new C(e).parse()}readFeatureFromText(t,e){const r=this.readGeometryFromText(t,e),i=new p;return i.setGeometry(r),i}readFeaturesFromText(t,e){let r=[];const i=this.readGeometryFromText(t,e);this.splitCollection_&&i.getType()=="GeometryCollection"?r=i.getGeometriesArray():r=[i];const n=[];for(let a=0,P=r.length;a<P;++a){const T=new p;T.setGeometry(r[a]),n.push(T)}return n}readGeometryFromText(t,e){const r=this.parse_(t);return m(r,!1,e)}writeFeatureText(t,e){const r=t.getGeometry();return r?this.writeGeometryText(r,e):""}writeFeaturesText(t,e){if(t.length==1)return this.writeFeatureText(t[0],e);const r=[];for(let n=0,a=t.length;n<a;++n)r.push(t[n].getGeometry());const i=new u(r);return this.writeGeometryText(i,e)}writeGeometryText(t,e){return E(m(t,!0,e))}}function g(s){const t=s.getCoordinates();return t.length===0?"":t.join(" ")}function S(s){const t=[],e=s.getPoints();for(let r=0,i=e.length;r<i;++r)t.push("("+g(e[r])+")");return t.join(",")}function Y(s){const t=[],e=s.getGeometries();for(let r=0,i=e.length;r<i;++r)t.push(E(e[r]));return t.join(",")}function l(s){const t=s.getCoordinates(),e=[];for(let r=0,i=t.length;r<i;++r)e.push(t[r].join(" "));return e.join(",")}function U(s){const t=[],e=s.getLineStrings();for(let r=0,i=e.length;r<i;++r)t.push("("+l(e[r])+")");return t.join(",")}function x(s){const t=[],e=s.getLinearRings();for(let r=0,i=e.length;r<i;++r)t.push("("+l(e[r])+")");return t.join(",")}function X(s){const t=[],e=s.getPolygons();for(let r=0,i=e.length;r<i;++r)t.push("("+x(e[r])+")");return t.join(",")}function b(s){const t=s.getLayout();let e="";return(t==="XYZ"||t==="XYZM")&&(e+=y),(t==="XYM"||t==="XYZM")&&(e+=f),e}const j={Point:g,LineString:l,Polygon:x,MultiPoint:S,MultiLineString:U,MultiPolygon:X,GeometryCollection:Y};function E(s){const t=s.getType(),e=j[t],r=e(s);let i=k[t];if(typeof s.getFlatCoordinates=="function"){const n=b(s);n.length>0&&(i+=" "+n)}return r.length===0?i+" "+_:i+"("+r+")"}export{Z as W};
