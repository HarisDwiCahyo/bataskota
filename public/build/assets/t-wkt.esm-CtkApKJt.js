/* @preserve
* @terraformer/wkt - v2.2.0 - MIT
* Copyright (c) 2012-2024 Environmental Systems Research Institute, Inc.
* Wed May 15 2024 14:35:51 GMT-0700 (Pacific Daylight Time)
*/var n=function(e,t,r,o){for(r=r||{},o=e.length;o--;r[e[o]]=t);return r},v=[1,9],M=[1,10],N=[1,11],L=[1,12],I=[1,13],E=[1,14],x=[1,15],p=[1,60],c=[5,15,19],b=[1,67],g=[1,73],w=[1,87],G=[1,104],h=[15,19],_=[1,110],k=[1,116],A=[1,130],V=[1,136],Z={trace:function(){},yy:{},symbols_:{error:2,expressions:3,point:4,EOF:5,linestring:6,polygon:7,multipoint:8,multilinestring:9,multipolygon:10,geometrycollection:11,coordinate:12,DOUBLE_TOK:13,ptarray:14,COMMA:15,ring_list:16,ring:17,"(":18,")":19,POINT:20,Z:21,ZM:22,M:23,EMPTY:24,point_untagged:25,polygon_list:26,polygon_untagged:27,point_list:28,LINESTRING:29,POLYGON:30,MULTIPOINT:31,MULTILINESTRING:32,MULTIPOLYGON:33,geometry:34,geometry_collection:35,GEOMETRYCOLLECTION:36,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",13:"DOUBLE_TOK",15:"COMMA",18:"(",19:")",20:"POINT",21:"Z",22:"ZM",23:"M",24:"EMPTY",29:"LINESTRING",30:"POLYGON",31:"MULTIPOINT",32:"MULTILINESTRING",33:"MULTIPOLYGON",36:"GEOMETRYCOLLECTION"},productions_:[0,[3,2],[3,2],[3,2],[3,2],[3,2],[3,2],[3,2],[12,2],[12,3],[12,4],[14,3],[14,1],[16,3],[16,1],[17,3],[4,4],[4,5],[4,5],[4,5],[4,2],[25,1],[25,3],[26,3],[26,1],[27,3],[28,3],[28,1],[6,4],[6,5],[6,5],[6,5],[6,2],[7,4],[7,5],[7,5],[7,5],[7,2],[8,4],[8,5],[8,5],[8,5],[8,2],[9,4],[9,5],[9,5],[9,5],[9,2],[10,4],[10,5],[10,5],[10,5],[10,2],[34,1],[34,1],[34,1],[34,1],[34,1],[34,1],[34,1],[35,3],[35,1],[11,4],[11,5],[11,5],[11,5],[11,2]],performAction:function(e,t,r,o,l,i,y){var s=i.length-1;switch(l){case 1:case 2:case 3:case 4:case 5:case 6:case 7:return i[s-1];case 8:this.$=new R([Number(i[s-1]),Number(i[s])]);break;case 9:this.$=new R([Number(i[s-2]),Number(i[s-1]),Number(i[s])]);break;case 10:this.$=new R([Number(i[s-3]),Number(i[s-2]),Number(i[s-1]),Number(i[s])]);break;case 11:case 26:this.$=i[s-2].addPoint(i[s]);break;case 12:case 21:case 27:case 53:case 54:case 55:case 56:case 57:case 58:case 59:this.$=i[s];break;case 13:this.$=i[s-2].addRing(i[s]);break;case 14:this.$=new W(i[s]);break;case 15:this.$=new X(i[s-1]);break;case 16:this.$={type:"Point",coordinates:i[s-1].data[0]};break;case 17:this.$={type:"Point",coordinates:i[s-1].data[0],properties:{z:!0}};break;case 18:this.$={type:"Point",coordinates:i[s-1].data[0],properties:{z:!0,m:!0}};break;case 19:this.$={type:"Point",coordinates:i[s-1].data[0],properties:{m:!0}};break;case 20:this.$={type:"Point",coordinates:[]};break;case 22:case 25:this.$=i[s-1];break;case 23:this.$=i[s-2].addPolygon(i[s]);break;case 24:this.$=new D(i[s]);break;case 28:this.$={type:"LineString",coordinates:i[s-1].data};break;case 29:this.$={type:"LineString",coordinates:i[s-1].data,properties:{z:!0}};break;case 30:this.$={type:"LineString",coordinates:i[s-1].data,properties:{m:!0}};break;case 31:this.$={type:"LineString",coordinates:i[s-1].data,properties:{z:!0,m:!0}};break;case 32:this.$={type:"LineString",coordinates:[]};break;case 33:this.$={type:"Polygon",coordinates:i[s-1].toJSON()};break;case 34:this.$={type:"Polygon",coordinates:i[s-1].toJSON(),properties:{z:!0}};break;case 35:this.$={type:"Polygon",coordinates:i[s-1].toJSON(),properties:{m:!0}};break;case 36:this.$={type:"Polygon",coordinates:i[s-1].toJSON(),properties:{z:!0,m:!0}};break;case 37:this.$={type:"Polygon",coordinates:[]};break;case 38:this.$={type:"MultiPoint",coordinates:i[s-1].data};break;case 39:this.$={type:"MultiPoint",coordinates:i[s-1].data,properties:{z:!0}};break;case 40:this.$={type:"MultiPoint",coordinates:i[s-1].data,properties:{m:!0}};break;case 41:this.$={type:"MultiPoint",coordinates:i[s-1].data,properties:{z:!0,m:!0}};break;case 42:this.$={type:"MultiPoint",coordinates:[]};break;case 43:this.$={type:"MultiLineString",coordinates:i[s-1].toJSON()};break;case 44:this.$={type:"MultiLineString",coordinates:i[s-1].toJSON(),properties:{z:!0}};break;case 45:this.$={type:"MultiLineString",coordinates:i[s-1].toJSON(),properties:{m:!0}};break;case 46:this.$={type:"MultiLineString",coordinates:i[s-1].toJSON(),properties:{z:!0,m:!0}};break;case 47:this.$={type:"MultiLineString",coordinates:[]};break;case 48:this.$={type:"MultiPolygon",coordinates:i[s-1].toJSON()};break;case 49:this.$={type:"MultiPolygon",coordinates:i[s-1].toJSON(),properties:{z:!0}};break;case 50:this.$={type:"MultiPolygon",coordinates:i[s-1].toJSON(),properties:{m:!0}};break;case 51:this.$={type:"MultiPolygon",coordinates:i[s-1].toJSON(),properties:{z:!0,m:!0}};break;case 52:this.$={type:"MultiPolygon",coordinates:[]};break;case 60:this.$=i[s-2].addGeometry(i[s]);break;case 61:this.$=new F(i[s]);break;case 62:this.$={type:"GeometryCollection",geometries:i[s-1].toJSON()};break;case 63:this.$={type:"GeometryCollection",geometries:i[s-1].toJSON(),properties:{z:!0}};break;case 64:this.$={type:"GeometryCollection",geometries:i[s-1].toJSON(),properties:{m:!0}};break;case 65:this.$={type:"GeometryCollection",geometries:i[s-1].toJSON(),properties:{z:!0,m:!0}};break;case 66:this.$={type:"GeometryCollection",geometries:[]};break}},table:[{3:1,4:2,6:3,7:4,8:5,9:6,10:7,11:8,20:v,29:M,30:N,31:L,32:I,33:E,36:x},{1:[3]},{5:[1,16]},{5:[1,17]},{5:[1,18]},{5:[1,19]},{5:[1,20]},{5:[1,21]},{5:[1,22]},{18:[1,23],21:[1,24],22:[1,25],23:[1,26],24:[1,27]},{18:[1,28],21:[1,29],22:[1,31],23:[1,30],24:[1,32]},{18:[1,33],21:[1,34],22:[1,36],23:[1,35],24:[1,37]},{18:[1,38],21:[1,39],22:[1,41],23:[1,40],24:[1,42]},{18:[1,43],21:[1,44],22:[1,46],23:[1,45],24:[1,47]},{18:[1,48],21:[1,49],22:[1,51],23:[1,50],24:[1,52]},{18:[1,53],21:[1,54],22:[1,56],23:[1,55],24:[1,57]},{1:[2,1]},{1:[2,2]},{1:[2,3]},{1:[2,4]},{1:[2,5]},{1:[2,6]},{1:[2,7]},{12:59,13:p,14:58},{18:[1,61]},{18:[1,62]},{18:[1,63]},n(c,[2,20]),{12:66,13:p,18:b,25:65,28:64},{18:[1,68]},{18:[1,69]},{18:[1,70]},n(c,[2,32]),{16:71,17:72,18:g},{18:[1,74]},{18:[1,75]},{18:[1,76]},n(c,[2,37]),{12:66,13:p,18:b,25:65,28:77},{18:[1,78]},{18:[1,79]},{18:[1,80]},n(c,[2,42]),{16:81,17:72,18:g},{18:[1,82]},{18:[1,83]},{18:[1,84]},n(c,[2,47]),{18:w,26:85,27:86},{18:[1,88]},{18:[1,89]},{18:[1,90]},n(c,[2,52]),{4:93,6:94,7:95,8:96,9:97,10:98,11:99,20:v,29:M,30:N,31:L,32:I,33:E,34:92,35:91,36:x},{18:[1,100]},{18:[1,101]},{18:[1,102]},n(c,[2,66]),{15:G,19:[1,103]},n(h,[2,12]),{13:[1,105]},{12:59,13:p,14:106},{12:59,13:p,14:107},{12:59,13:p,14:108},{15:_,19:[1,109]},n(h,[2,27]),n(h,[2,21]),{12:111,13:p},{12:66,13:p,18:b,25:65,28:112},{12:66,13:p,18:b,25:65,28:113},{12:66,13:p,18:b,25:65,28:114},{15:k,19:[1,115]},n(h,[2,14]),{12:59,13:p,14:117},{16:118,17:72,18:g},{16:119,17:72,18:g},{16:120,17:72,18:g},{15:_,19:[1,121]},{12:66,13:p,18:b,25:65,28:122},{12:66,13:p,18:b,25:65,28:123},{12:66,13:p,18:b,25:65,28:124},{15:k,19:[1,125]},{16:126,17:72,18:g},{16:127,17:72,18:g},{16:128,17:72,18:g},{15:A,19:[1,129]},n(h,[2,24]),{16:131,17:72,18:g},{18:w,26:132,27:86},{18:w,26:133,27:86},{18:w,26:134,27:86},{15:V,19:[1,135]},n(h,[2,61]),n(h,[2,53]),n(h,[2,54]),n(h,[2,55]),n(h,[2,56]),n(h,[2,57]),n(h,[2,58]),n(h,[2,59]),{4:93,6:94,7:95,8:96,9:97,10:98,11:99,20:v,29:M,30:N,31:L,32:I,33:E,34:92,35:137,36:x},{4:93,6:94,7:95,8:96,9:97,10:98,11:99,20:v,29:M,30:N,31:L,32:I,33:E,34:92,35:138,36:x},{4:93,6:94,7:95,8:96,9:97,10:98,11:99,20:v,29:M,30:N,31:L,32:I,33:E,34:92,35:139,36:x},n(c,[2,16]),{12:140,13:p},n(h,[2,8],{13:[1,141]}),{15:G,19:[1,142]},{15:G,19:[1,143]},{15:G,19:[1,144]},n(c,[2,28]),{12:66,13:p,18:b,25:145},{19:[1,146]},{15:_,19:[1,147]},{15:_,19:[1,148]},{15:_,19:[1,149]},n(c,[2,33]),{17:150,18:g},{15:G,19:[1,151]},{15:k,19:[1,152]},{15:k,19:[1,153]},{15:k,19:[1,154]},n(c,[2,38]),{15:_,19:[1,155]},{15:_,19:[1,156]},{15:_,19:[1,157]},n(c,[2,43]),{15:k,19:[1,158]},{15:k,19:[1,159]},{15:k,19:[1,160]},n(c,[2,48]),{18:w,27:161},{15:k,19:[1,162]},{15:A,19:[1,163]},{15:A,19:[1,164]},{15:A,19:[1,165]},n(c,[2,62]),{4:93,6:94,7:95,8:96,9:97,10:98,11:99,20:v,29:M,30:N,31:L,32:I,33:E,34:166,36:x},{15:V,19:[1,167]},{15:V,19:[1,168]},{15:V,19:[1,169]},n(h,[2,11]),n(h,[2,9],{13:[1,170]}),n(c,[2,17]),n(c,[2,18]),n(c,[2,19]),n(h,[2,26]),n(h,[2,22]),n(c,[2,29]),n(c,[2,30]),n(c,[2,31]),n(h,[2,13]),n(h,[2,15]),n(c,[2,34]),n(c,[2,35]),n(c,[2,36]),n(c,[2,39]),n(c,[2,40]),n(c,[2,41]),n(c,[2,44]),n(c,[2,45]),n(c,[2,46]),n(h,[2,23]),n(h,[2,25]),n(c,[2,49]),n(c,[2,50]),n(c,[2,51]),n(h,[2,60]),n(c,[2,63]),n(c,[2,64]),n(c,[2,65]),n(h,[2,10])],defaultActions:{16:[2,1],17:[2,2],18:[2,3],19:[2,4],20:[2,5],21:[2,6],22:[2,7]},parseError:function(e,t){if(t.recoverable)this.trace(e);else{var r=new Error(e);throw r.hash=t,r}},parse:function(e){var t=this,r=[0],o=[null],l=[],i=this.table,y="",s=0,B=0,j=2,q=1,tt=l.slice.call(arguments,1),u=Object.create(this.lexer),T={yy:{}};for(var z in this.yy)Object.prototype.hasOwnProperty.call(this.yy,z)&&(T.yy[z]=this.yy[z]);u.setInput(e,T.yy),T.yy.lexer=u,T.yy.parser=this,typeof u.yylloc>"u"&&(u.yylloc={});var U=u.yylloc;l.push(U);var et=u.options&&u.options.ranges;typeof T.yy.parseError=="function"?this.parseError=T.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;for(var it=function(){var O;return O=u.lex()||q,typeof O!="number"&&(O=t.symbols_[O]||O),O},f,P,d,C,S={},$,m,H,J;;){if(P=r[r.length-1],this.defaultActions[P]?d=this.defaultActions[P]:((f===null||typeof f>"u")&&(f=it()),d=i[P]&&i[P][f]),typeof d>"u"||!d.length||!d[0]){var K="";J=[];for($ in i[P])this.terminals_[$]&&$>j&&J.push("'"+this.terminals_[$]+"'");u.showPosition?K="Parse error on line "+(s+1)+`:
`+u.showPosition()+`
Expecting `+J.join(", ")+", got '"+(this.terminals_[f]||f)+"'":K="Parse error on line "+(s+1)+": Unexpected "+(f==q?"end of input":"'"+(this.terminals_[f]||f)+"'"),this.parseError(K,{text:u.match,token:this.terminals_[f]||f,line:u.yylineno,loc:U,expected:J})}if(d[0]instanceof Array&&d.length>1)throw new Error("Parse Error: multiple actions possible at state: "+P+", token: "+f);switch(d[0]){case 1:r.push(f),o.push(u.yytext),l.push(u.yylloc),r.push(d[1]),f=null,B=u.yyleng,y=u.yytext,s=u.yylineno,U=u.yylloc;break;case 2:if(m=this.productions_[d[1]][1],S.$=o[o.length-m],S._$={first_line:l[l.length-(m||1)].first_line,last_line:l[l.length-1].last_line,first_column:l[l.length-(m||1)].first_column,last_column:l[l.length-1].last_column},et&&(S._$.range=[l[l.length-(m||1)].range[0],l[l.length-1].range[1]]),C=this.performAction.apply(S,[y,B,s,T.yy,d[1],o,l].concat(tt)),typeof C<"u")return C;m&&(r=r.slice(0,-1*m*2),o=o.slice(0,-1*m),l=l.slice(0,-1*m)),r.push(this.productions_[d[1]][0]),o.push(S.$),l.push(S._$),H=i[r[r.length-2]][r[r.length-1]],r.push(H);break;case 3:return!0}}return!0}},rt=function(){var a={EOF:1,parseError:function(t,r){if(this.yy.parser)this.yy.parser.parseError(t,r);else throw new Error(t)},setInput:function(t,r){return this.yy=r||this.yy||{},this._input=t,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var t=this._input[0];this.yytext+=t,this.yyleng++,this.offset++,this.match+=t,this.matched+=t;var r=t.match(/(?:\r\n?|\n).*/g);return r?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),t},unput:function(t){var r=t.length,o=t.split(/(?:\r\n?|\n)/g);this._input=t+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-r),this.offset-=r;var l=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),o.length-1&&(this.yylineno-=o.length-1);var i=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:o?(o.length===l.length?this.yylloc.first_column:0)+l[l.length-o.length].length-o[0].length:this.yylloc.first_column-r},this.options.ranges&&(this.yylloc.range=[i[0],i[0]+this.yyleng-r]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(t){this.unput(this.match.slice(t))},pastInput:function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(t.length>20?"...":"")+t.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var t=this.match;return t.length<20&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(t.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var t=this.pastInput(),r=new Array(t.length+1).join("-");return t+this.upcomingInput()+`
`+r+"^"},test_match:function(t,r){var o,l,i;if(this.options.backtrack_lexer&&(i={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(i.yylloc.range=this.yylloc.range.slice(0))),l=t[0].match(/(?:\r\n?|\n).*/g),l&&(this.yylineno+=l.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:l?l[l.length-1].length-l[l.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+t[0].length},this.yytext+=t[0],this.match+=t[0],this.matches=t,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(t[0].length),this.matched+=t[0],o=this.performAction.call(this,this.yy,this,r,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),o)return o;if(this._backtrack){for(var y in i)this[y]=i[y];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var t,r,o,l;this._more||(this.yytext="",this.match="");for(var i=this._currentRules(),y=0;y<i.length;y++)if(o=this._input.match(this.rules[i[y]]),o&&(!r||o[0].length>r[0].length)){if(r=o,l=y,this.options.backtrack_lexer){if(t=this.test_match(o,i[y]),t!==!1)return t;if(this._backtrack){r=!1;continue}else return!1}else if(!this.options.flex)break}return r?(t=this.test_match(r,i[l]),t!==!1?t:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var t=this.next();return t||this.lex()},begin:function(t){this.conditionStack.push(t)},popState:function(){var t=this.conditionStack.length-1;return t>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(t){return t=this.conditionStack.length-1-Math.abs(t||0),t>=0?this.conditionStack[t]:"INITIAL"},pushState:function(t){this.begin(t)},stateStackSize:function(){return this.conditionStack.length},options:{},performAction:function(t,r,o,l){switch(o){case 0:break;case 1:return 18;case 2:return 19;case 3:return 13;case 4:return 20;case 5:return 29;case 6:return 30;case 7:return 31;case 8:return 32;case 9:return 33;case 10:return 36;case 11:return 15;case 12:return 24;case 13:return 23;case 14:return 21;case 15:return 22;case 16:return 5;case 17:return"INVALID"}},rules:[/^(?:\s+)/,/^(?:\()/,/^(?:\))/,/^(?:-?[0-9]+(\.[0-9]+)?([eE][\-\+]?[0-9]+)?)/,/^(?:POINT\b)/,/^(?:LINESTRING\b)/,/^(?:POLYGON\b)/,/^(?:MULTIPOINT\b)/,/^(?:MULTILINESTRING\b)/,/^(?:MULTIPOLYGON\b)/,/^(?:GEOMETRYCOLLECTION\b)/,/^(?:,)/,/^(?:EMPTY\b)/,/^(?:M\b)/,/^(?:Z\b)/,/^(?:ZM\b)/,/^(?:$)/,/^(?:.)/],conditions:{INITIAL:{rules:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],inclusive:!0}}};return a}();Z.lexer=rt;function Q(){this.yy={}}Q.prototype=Z;Z.Parser=Q;Z.yy.parseError=function(a){throw a};function R(a){this.data=[a],this.type="PointArray"}R.prototype.addPoint=function(a){return a.type==="PointArray"?this.data=this.data.concat(a.data):this.data.push(a),this};R.prototype.toJSON=function(){return this.data};function X(a){this.data=a,this.type="Ring"}X.prototype.toJSON=function(){for(var a=[],e=0;e<this.data.data.length;e++)a.push(this.data.data[e]);return a};function W(a){this.data=[a],this.type="RingList"}W.prototype.addRing=function(a){return this.data.push(a),this};W.prototype.toJSON=function(){for(var a=[],e=0;e<this.data.length;e++)a.push(this.data[e].toJSON());return a.length===1,a};function F(a){this.data=[a],this.type="GeometryList"}F.prototype.addGeometry=function(a){return this.data.push(a),this};F.prototype.toJSON=function(){return this.data};function D(a){this.data=[a],this.type="PolygonList"}D.prototype.addPolygon=function(a){return this.data.push(a),this};D.prototype.toJSON=function(){for(var a=[],e=0;e<this.data.length;e++)a=a.concat([this.data[e].toJSON()]);return a};var Y=function(e){for(var t=[],r="",o=0;o<e.length;o++)t.push(e[o].join(" "));return r+="("+t.join(", ")+")",r},nt=function(e){var t="POINT ";return e.coordinates===void 0||e.coordinates.length===0?(t+="EMPTY",t):(e.coordinates.length===3?e.properties&&e.properties.m===!0?t+="M ":t+="Z ":e.coordinates.length===4&&(t+="ZM "),t+="("+e.coordinates.join(" ")+")",t)},st=function(e){var t="LINESTRING ";return e.coordinates===void 0||e.coordinates.length===0||e.coordinates[0].length===0?(t+="EMPTY",t):(e.coordinates[0].length===3?e.properties&&e.properties.m===!0?t+="M ":t+="Z ":e.coordinates[0].length===4&&(t+="ZM "),t+=Y(e.coordinates),t)},ot=function(e){var t="POLYGON ";if(e.coordinates===void 0||e.coordinates.length===0||e.coordinates[0].length===0)return t+="EMPTY",t;e.coordinates[0][0].length===3?e.properties&&e.properties.m===!0?t+="M ":t+="Z ":e.coordinates[0][0].length===4&&(t+="ZM "),t+="(";for(var r=[],o=0;o<e.coordinates.length;o++)r.push(Y(e.coordinates[o]));return t+=r.join(", "),t+=")",t},at=function(e){var t="MULTIPOINT ";return e.coordinates===void 0||e.coordinates.length===0||e.coordinates[0].length===0?(t+="EMPTY",t):(e.coordinates[0].length===3?e.properties&&e.properties.m===!0?t+="M ":t+="Z ":e.coordinates[0].length===4&&(t+="ZM "),t+=Y(e.coordinates),t)},lt=function(e){var t="MULTILINESTRING ";if(e.coordinates===void 0||e.coordinates.length===0||e.coordinates[0].length===0)return t+="EMPTY",t;e.coordinates[0][0].length===3?e.properties&&e.properties.m===!0?t+="M ":t+="Z ":e.coordinates[0][0].length===4&&(t+="ZM "),t+="(";for(var r=[],o=0;o<e.coordinates.length;o++)r.push(Y(e.coordinates[o]));return t+=r.join(", "),t+=")",t},ct=function(e){var t="MULTIPOLYGON ";if(e.coordinates===void 0||e.coordinates.length===0||e.coordinates[0].length===0)return t+="EMPTY",t;e.coordinates[0][0][0].length===3?e.properties&&e.properties.m===!0?t+="M ":t+="Z ":e.coordinates[0][0][0].length===4&&(t+="ZM "),t+="(";for(var r=[],o=0;o<e.coordinates.length;o++){for(var l="(",i=[],y=0;y<e.coordinates[o].length;y++)i.push(Y(e.coordinates[o][y]));l+=i.join(", "),l+=")",r.push(l)}return t+=r.join(", "),t+=")",t},ut=function a(e){switch(e.type){case"Point":return nt(e);case"LineString":return st(e);case"Polygon":return ot(e);case"MultiPoint":return at(e);case"MultiLineString":return lt(e);case"MultiPolygon":return ct(e);case"GeometryCollection":for(var t="GEOMETRYCOLLECTION",r=[],o=0;o<e.geometries.length;o++)r.push(a(e.geometries[o]));return t+"("+r.join(", ")+")";default:throw Error("Unknown Type: "+e.type)}};export{ut as g};