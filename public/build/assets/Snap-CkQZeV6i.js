import{U as $,W as ie,Y as ne,Z as se,_ as re,$ as Z,c as oe,b as ae,a0 as N,a1 as D,a2 as b,a3 as I,a4 as E,a5 as L,F as O,P as U,a6 as w,a7 as q,a8 as y,a9 as C,aa as F,ab as R,ac as he,ad as z,N as J,ae as v,af as le,ag as Q,ah as ue,y as ee,ai as ge,aj as ce,ak as de,al as fe,am as G,an as B,ao as _e,ap as me}from"./GeoJSON-C5wKpImO.js";const K=0,T=1,Y=[0,0,0,0],P=[],A={MODIFYSTART:"modifystart",MODIFYEND:"modifyend"};class V extends ee{constructor(e,t,n){super(e),this.features=t,this.mapBrowserEvent=n}}class Ce extends ${constructor(e){super(e),this.on,this.once,this.un,this.boundHandleFeatureChange_=this.handleFeatureChange_.bind(this),this.condition_=e.condition?e.condition:ie,this.defaultDeleteCondition_=function(n){return ne(n)&&se(n)},this.deleteCondition_=e.deleteCondition?e.deleteCondition:this.defaultDeleteCondition_,this.insertVertexCondition_=e.insertVertexCondition?e.insertVertexCondition:re,this.vertexFeature_=null,this.vertexSegments_=null,this.lastPixel_=[0,0],this.ignoreNextSingleClick_=!1,this.featuresBeingModified_=null,this.rBush_=new Z,this.pixelTolerance_=e.pixelTolerance!==void 0?e.pixelTolerance:10,this.snappedToVertex_=!1,this.changingFeature_=!1,this.dragSegments_=[],this.overlay_=new oe({source:new ae({useSpatialIndex:!1,wrapX:!!e.wrapX}),style:e.style?e.style:xe(),updateWhileAnimating:!0,updateWhileInteracting:!0}),this.SEGMENT_WRITERS_={Point:this.writePointGeometry_.bind(this),LineString:this.writeLineStringGeometry_.bind(this),LinearRing:this.writeLineStringGeometry_.bind(this),Polygon:this.writePolygonGeometry_.bind(this),MultiPoint:this.writeMultiPointGeometry_.bind(this),MultiLineString:this.writeMultiLineStringGeometry_.bind(this),MultiPolygon:this.writeMultiPolygonGeometry_.bind(this),Circle:this.writeCircleGeometry_.bind(this),GeometryCollection:this.writeGeometryCollectionGeometry_.bind(this)},this.source_=null,this.hitDetection_=null;let t;if(e.features?t=e.features:e.source&&(this.source_=e.source,t=new N(this.source_.getFeatures()),this.source_.addEventListener(D.ADDFEATURE,this.handleSourceAdd_.bind(this)),this.source_.addEventListener(D.REMOVEFEATURE,this.handleSourceRemove_.bind(this))),!t)throw new Error("The modify interaction requires features, a source or a layer");e.hitDetection&&(this.hitDetection_=e.hitDetection),this.features_=t,this.features_.forEach(this.addFeature_.bind(this)),this.features_.addEventListener(b.ADD,this.handleFeatureAdd_.bind(this)),this.features_.addEventListener(b.REMOVE,this.handleFeatureRemove_.bind(this)),this.lastPointerEvent_=null,this.delta_=[0,0],this.snapToPointer_=e.snapToPointer===void 0?!this.hitDetection_:e.snapToPointer}addFeature_(e){const t=e.getGeometry();if(t){const i=this.SEGMENT_WRITERS_[t.getType()];i&&i(e,t)}const n=this.getMap();n&&n.isRendered()&&this.getActive()&&this.handlePointerAtPixel_(this.lastPixel_,n),e.addEventListener(I.CHANGE,this.boundHandleFeatureChange_)}willModifyFeatures_(e,t){if(!this.featuresBeingModified_){this.featuresBeingModified_=new N;const n=this.featuresBeingModified_.getArray();for(let i=0,s=t.length;i<s;++i){const r=t[i];for(let a=0,o=r.length;a<o;++a){const h=r[a].feature;h&&!n.includes(h)&&this.featuresBeingModified_.push(h)}}this.featuresBeingModified_.getLength()===0?this.featuresBeingModified_=null:this.dispatchEvent(new V(A.MODIFYSTART,this.featuresBeingModified_,e))}}removeFeature_(e){this.removeFeatureSegmentData_(e),this.vertexFeature_&&this.features_.getLength()===0&&(this.overlay_.getSource().removeFeature(this.vertexFeature_),this.vertexFeature_=null),e.removeEventListener(I.CHANGE,this.boundHandleFeatureChange_)}removeFeatureSegmentData_(e){const t=this.rBush_,n=[];t.forEach(function(i){e===i.feature&&n.push(i)});for(let i=n.length-1;i>=0;--i){const s=n[i];for(let r=this.dragSegments_.length-1;r>=0;--r)this.dragSegments_[r][0]===s&&this.dragSegments_.splice(r,1);t.remove(s)}}setActive(e){this.vertexFeature_&&!e&&(this.overlay_.getSource().removeFeature(this.vertexFeature_),this.vertexFeature_=null),super.setActive(e)}setMap(e){this.overlay_.setMap(e),super.setMap(e)}getOverlay(){return this.overlay_}handleSourceAdd_(e){e.feature&&this.features_.push(e.feature)}handleSourceRemove_(e){e.feature&&this.features_.remove(e.feature)}handleFeatureAdd_(e){this.addFeature_(e.element)}handleFeatureChange_(e){if(!this.changingFeature_){const t=e.target;this.removeFeature_(t),this.addFeature_(t)}}handleFeatureRemove_(e){this.removeFeature_(e.element)}writePointGeometry_(e,t){const n=t.getCoordinates(),i={feature:e,geometry:t,segment:[n,n]};this.rBush_.insert(t.getExtent(),i)}writeMultiPointGeometry_(e,t){const n=t.getCoordinates();for(let i=0,s=n.length;i<s;++i){const r=n[i],a={feature:e,geometry:t,depth:[i],index:i,segment:[r,r]};this.rBush_.insert(t.getExtent(),a)}}writeLineStringGeometry_(e,t){const n=t.getCoordinates();for(let i=0,s=n.length-1;i<s;++i){const r=n.slice(i,i+2),a={feature:e,geometry:t,index:i,segment:r};this.rBush_.insert(E(r),a)}}writeMultiLineStringGeometry_(e,t){const n=t.getCoordinates();for(let i=0,s=n.length;i<s;++i){const r=n[i];for(let a=0,o=r.length-1;a<o;++a){const h=r.slice(a,a+2),u={feature:e,geometry:t,depth:[i],index:a,segment:h};this.rBush_.insert(E(h),u)}}}writePolygonGeometry_(e,t){const n=t.getCoordinates();for(let i=0,s=n.length;i<s;++i){const r=n[i];for(let a=0,o=r.length-1;a<o;++a){const h=r.slice(a,a+2),u={feature:e,geometry:t,depth:[i],index:a,segment:h};this.rBush_.insert(E(h),u)}}}writeMultiPolygonGeometry_(e,t){const n=t.getCoordinates();for(let i=0,s=n.length;i<s;++i){const r=n[i];for(let a=0,o=r.length;a<o;++a){const h=r[a];for(let u=0,g=h.length-1;u<g;++u){const d=h.slice(u,u+2),l={feature:e,geometry:t,depth:[a,i],index:u,segment:d};this.rBush_.insert(E(d),l)}}}}writeCircleGeometry_(e,t){const n=t.getCenter(),i={feature:e,geometry:t,index:K,segment:[n,n]},s={feature:e,geometry:t,index:T,segment:[n,n]},r=[i,s];i.featureSegments=r,s.featureSegments=r,this.rBush_.insert(L(n),i);let a=t;this.rBush_.insert(a.getExtent(),s)}writeGeometryCollectionGeometry_(e,t){const n=t.getGeometriesArray();for(let i=0;i<n.length;++i){const s=n[i],r=this.SEGMENT_WRITERS_[s.getType()];r(e,s)}}createOrUpdateVertexFeature_(e,t,n){let i=this.vertexFeature_;return i?i.getGeometry().setCoordinates(e):(i=new O(new U(e)),this.vertexFeature_=i,this.overlay_.getSource().addFeature(i)),i.set("features",t),i.set("geometries",n),i}handleEvent(e){if(!e.originalEvent)return!0;this.lastPointerEvent_=e;let t;return!e.map.getView().getInteracting()&&e.type==w.POINTERMOVE&&!this.handlingDownUpSequence&&this.handlePointerMove_(e),this.vertexFeature_&&this.deleteCondition_(e)&&(e.type!=w.SINGLECLICK||!this.ignoreNextSingleClick_?t=this.removePoint():t=!0),e.type==w.SINGLECLICK&&(this.ignoreNextSingleClick_=!1),super.handleEvent(e)&&!t}handleDragEvent(e){this.ignoreNextSingleClick_=!1,this.willModifyFeatures_(e,this.dragSegments_);const t=[e.coordinate[0]+this.delta_[0],e.coordinate[1]+this.delta_[1]],n=[],i=[];for(let s=0,r=this.dragSegments_.length;s<r;++s){const a=this.dragSegments_[s],o=a[0],h=o.feature;n.includes(h)||n.push(h);const u=o.geometry;i.includes(u)||i.push(u);const g=o.depth;let d;const l=o.segment,c=a[1];for(;t.length<u.getStride();)t.push(l[c][t.length]);switch(u.getType()){case"Point":d=t,l[0]=t,l[1]=t;break;case"MultiPoint":d=u.getCoordinates(),d[o.index]=t,l[0]=t,l[1]=t;break;case"LineString":d=u.getCoordinates(),d[o.index+c]=t,l[c]=t;break;case"MultiLineString":d=u.getCoordinates(),d[g[0]][o.index+c]=t,l[c]=t;break;case"Polygon":d=u.getCoordinates(),d[g[0]][o.index+c]=t,l[c]=t;break;case"MultiPolygon":d=u.getCoordinates(),d[g[1]][g[0]][o.index+c]=t,l[c]=t;break;case"Circle":if(l[0]=t,l[1]=t,o.index===K)this.changingFeature_=!0,u.setCenter(t),this.changingFeature_=!1;else{this.changingFeature_=!0,e.map.getView().getProjection();let f=q(y(u.getCenter()),y(t));u.setRadius(f),this.changingFeature_=!1}break}d&&this.setGeometryCoordinates_(u,d)}this.createOrUpdateVertexFeature_(t,n,i)}handleDownEvent(e){if(!this.condition_(e))return!1;const t=e.coordinate;this.handlePointerAtPixel_(e.pixel,e.map,t),this.dragSegments_.length=0,this.featuresBeingModified_=null;const n=this.vertexFeature_;if(n){e.map.getView().getProjection();const i=[],s=n.getGeometry().getCoordinates(),r=E([s]),a=this.rBush_.getInExtent(r),o={};a.sort(ye);for(let h=0,u=a.length;h<u;++h){const g=a[h],d=g.segment;let l=C(g.geometry);const c=g.depth;if(c&&(l+="-"+c.join("-")),o[l]||(o[l]=new Array(2)),g.geometry.getType()==="Circle"&&g.index===T){const f=W(t,g);F(f,s)&&!o[l][0]&&(this.dragSegments_.push([g,0]),o[l][0]=g);continue}if(F(d[0],s)&&!o[l][0]){this.dragSegments_.push([g,0]),o[l][0]=g;continue}if(F(d[1],s)&&!o[l][1]){if(o[l][0]&&o[l][0].index===0){let f=g.geometry.getCoordinates();switch(g.geometry.getType()){case"LineString":case"MultiLineString":continue;case"MultiPolygon":f=f[c[1]];case"Polygon":if(g.index!==f[c[0]].length-2)continue;break}}this.dragSegments_.push([g,1]),o[l][1]=g;continue}C(d)in this.vertexSegments_&&!o[l][0]&&!o[l][1]&&this.insertVertexCondition_(e)&&i.push(g)}i.length&&this.willModifyFeatures_(e,[i]);for(let h=i.length-1;h>=0;--h)this.insertVertex_(i[h],s)}return!!this.vertexFeature_}handleUpEvent(e){for(let t=this.dragSegments_.length-1;t>=0;--t){const n=this.dragSegments_[t][0],i=n.geometry;if(i.getType()==="Circle"){const s=i.getCenter(),r=n.featureSegments[0],a=n.featureSegments[1];r.segment[0]=s,r.segment[1]=s,a.segment[0]=s,a.segment[1]=s,this.rBush_.update(L(s),r);let o=i;this.rBush_.update(o.getExtent(),a)}else this.rBush_.update(E(n.segment),n)}return this.featuresBeingModified_&&(this.dispatchEvent(new V(A.MODIFYEND,this.featuresBeingModified_,e)),this.featuresBeingModified_=null),!1}handlePointerMove_(e){this.lastPixel_=e.pixel,this.handlePointerAtPixel_(e.pixel,e.map,e.coordinate)}handlePointerAtPixel_(e,t,n){const i=n||t.getCoordinateFromPixel(e);t.getView().getProjection();const s=function(o,h){return H(i,o)-H(i,h)};let r,a;if(this.hitDetection_){const o=typeof this.hitDetection_=="object"?h=>h===this.hitDetection_:void 0;t.forEachFeatureAtPixel(e,(h,u,g)=>{g&&g.getType()==="Point"&&(g=new U(R(g.getCoordinates())));const d=g||h.getGeometry();if(h instanceof O&&this.features_.getArray().includes(h)){a=d;const l=h.getGeometry().getFlatCoordinates().slice(0,2);r=[{feature:h,geometry:a,segment:[l,l]}]}return!0},{layerFilter:o})}if(!r){const o=he(L(i,Y)),h=t.getView().getResolution()*this.pixelTolerance_,u=z(J(o,h,Y));r=this.rBush_.getInExtent(u)}if(r&&r.length>0){const o=r.sort(s)[0],h=o.segment;let u=W(i,o);const g=t.getPixelFromCoordinate(u);let d=q(e,g);if(a||d<=this.pixelTolerance_){const l={};if(l[C(h)]=!0,this.snapToPointer_||(this.delta_[0]=u[0]-i[0],this.delta_[1]=u[1]-i[1]),o.geometry.getType()==="Circle"&&o.index===T)this.snappedToVertex_=!0,this.createOrUpdateVertexFeature_(u,[o.feature],[o.geometry]);else{const c=t.getPixelFromCoordinate(h[0]),f=t.getPixelFromCoordinate(h[1]),m=v(g,c),x=v(g,f);d=Math.sqrt(Math.min(m,x)),this.snappedToVertex_=d<=this.pixelTolerance_,this.snappedToVertex_&&(u=m>x?h[1]:h[0]),this.createOrUpdateVertexFeature_(u,[o.feature],[o.geometry]);const p={};p[C(o.geometry)]=!0;for(let S=1,te=r.length;S<te;++S){const M=r[S].segment;if(F(h[0],M[0])&&F(h[1],M[1])||F(h[0],M[1])&&F(h[1],M[0])){const k=C(r[S].geometry);k in p||(p[k]=!0,l[C(M)]=!0)}else break}}this.vertexSegments_=l;return}}this.vertexFeature_&&(this.overlay_.getSource().removeFeature(this.vertexFeature_),this.vertexFeature_=null)}insertVertex_(e,t){const n=e.segment,i=e.feature,s=e.geometry,r=e.depth,a=e.index;let o;for(;t.length<s.getStride();)t.push(0);switch(s.getType()){case"MultiLineString":o=s.getCoordinates(),o[r[0]].splice(a+1,0,t);break;case"Polygon":o=s.getCoordinates(),o[r[0]].splice(a+1,0,t);break;case"MultiPolygon":o=s.getCoordinates(),o[r[1]][r[0]].splice(a+1,0,t);break;case"LineString":o=s.getCoordinates(),o.splice(a+1,0,t);break;default:return}this.setGeometryCoordinates_(s,o);const h=this.rBush_;h.remove(e),this.updateSegmentIndices_(s,a,r,1);const u={segment:[n[0],t],feature:i,geometry:s,depth:r,index:a};h.insert(E(u.segment),u),this.dragSegments_.push([u,1]);const g={segment:[t,n[1]],feature:i,geometry:s,depth:r,index:a+1};h.insert(E(g.segment),g),this.dragSegments_.push([g,0]),this.ignoreNextSingleClick_=!0}removePoint(){if(this.lastPointerEvent_&&this.lastPointerEvent_.type!=w.POINTERDRAG){const e=this.lastPointerEvent_;this.willModifyFeatures_(e,this.dragSegments_);const t=this.removeVertex_();return this.featuresBeingModified_&&this.dispatchEvent(new V(A.MODIFYEND,this.featuresBeingModified_,e)),this.featuresBeingModified_=null,t}return!1}removeVertex_(){const e=this.dragSegments_,t={};let n=!1,i,s,r,a,o,h,u,g,d,l,c;for(o=e.length-1;o>=0;--o)r=e[o],l=r[0],c=C(l.feature),l.depth&&(c+="-"+l.depth.join("-")),c in t||(t[c]={}),r[1]===0?(t[c].right=l,t[c].index=l.index):r[1]==1&&(t[c].left=l,t[c].index=l.index+1);for(c in t){switch(d=t[c].right,u=t[c].left,h=t[c].index,g=h-1,u!==void 0?l=u:l=d,g<0&&(g=0),a=l.geometry,s=a.getCoordinates(),i=s,n=!1,a.getType()){case"MultiLineString":s[l.depth[0]].length>2&&(s[l.depth[0]].splice(h,1),n=!0);break;case"LineString":s.length>2&&(s.splice(h,1),n=!0);break;case"MultiPolygon":i=i[l.depth[1]];case"Polygon":i=i[l.depth[0]],i.length>4&&(h==i.length-1&&(h=0),i.splice(h,1),n=!0,h===0&&(i.pop(),i.push(i[0]),g=i.length-1));break}if(n){this.setGeometryCoordinates_(a,s);const f=[];if(u!==void 0&&(this.rBush_.remove(u),f.push(u.segment[0])),d!==void 0&&(this.rBush_.remove(d),f.push(d.segment[1])),u!==void 0&&d!==void 0){const m={depth:l.depth,feature:l.feature,geometry:l.geometry,index:g,segment:f};this.rBush_.insert(E(m.segment),m)}this.updateSegmentIndices_(a,h,l.depth,-1),this.vertexFeature_&&(this.overlay_.getSource().removeFeature(this.vertexFeature_),this.vertexFeature_=null),e.length=0}}return n}setGeometryCoordinates_(e,t){this.changingFeature_=!0,e.setCoordinates(t),this.changingFeature_=!1}updateSegmentIndices_(e,t,n,i){this.rBush_.forEachInExtent(e.getExtent(),function(s){s.geometry===e&&(n===void 0||s.depth===void 0||le(s.depth,n))&&s.index>t&&(s.index+=i)})}}function ye(_,e){return _.index-e.index}function H(_,e,t){const n=e.geometry;if(n.getType()==="Circle"){let s=n;if(e.index===T){const r=v(s.getCenter(),y(_)),a=Math.sqrt(r)-s.getRadius();return a*a}}const i=y(_);return P[0]=y(e.segment[0]),P[1]=y(e.segment[1]),ge(i,P)}function W(_,e,t){const n=e.geometry;if(n.getType()==="Circle"&&e.index===T)return R(n.getClosestPoint(y(_)));const i=y(_);return P[0]=y(e.segment[0]),P[1]=y(e.segment[1]),R(Q(i,P))}function xe(){const _=ue();return function(e,t){return _.Point}}const pe={SNAP:"snap"};class Ee extends ee{constructor(e,t){super(e),this.vertex=t.vertex,this.vertexPixel=t.vertexPixel,this.feature=t.feature,this.segment=t.segment}}function X(_){return _.feature?_.feature:_.element?_.element:null}const j=[];class Fe extends ${constructor(e){e=e||{};const t=e;t.handleDownEvent||(t.handleDownEvent=ce),t.stopDown||(t.stopDown=de),super(t),this.on,this.once,this.un,this.source_=e.source?e.source:null,this.vertex_=e.vertex!==void 0?e.vertex:!0,this.edge_=e.edge!==void 0?e.edge:!0,this.features_=e.features?e.features:null,this.featuresListenerKeys_=[],this.featureChangeListenerKeys_={},this.indexedFeaturesExtents_={},this.pendingFeatures_={},this.pixelTolerance_=e.pixelTolerance!==void 0?e.pixelTolerance:10,this.rBush_=new Z,this.GEOMETRY_SEGMENTERS_={Point:this.segmentPointGeometry_.bind(this),LineString:this.segmentLineStringGeometry_.bind(this),LinearRing:this.segmentLineStringGeometry_.bind(this),Polygon:this.segmentPolygonGeometry_.bind(this),MultiPoint:this.segmentMultiPointGeometry_.bind(this),MultiLineString:this.segmentMultiLineStringGeometry_.bind(this),MultiPolygon:this.segmentMultiPolygonGeometry_.bind(this),GeometryCollection:this.segmentGeometryCollectionGeometry_.bind(this),Circle:this.segmentCircleGeometry_.bind(this)}}addFeature(e,t){t=t!==void 0?t:!0;const n=C(e),i=e.getGeometry();if(i){const s=this.GEOMETRY_SEGMENTERS_[i.getType()];if(s){this.indexedFeaturesExtents_[n]=i.getExtent(fe());const r=[];if(s(r,i),r.length===1)this.rBush_.insert(E(r[0]),{feature:e,segment:r[0]});else if(r.length>1){const a=r.map(h=>E(h)),o=r.map(h=>({feature:e,segment:h}));this.rBush_.load(a,o)}}}t&&(this.featureChangeListenerKeys_[n]=G(e,I.CHANGE,this.handleFeatureChange_,this))}getFeatures_(){let e;return this.features_?e=this.features_:this.source_&&(e=this.source_.getFeatures()),e}handleEvent(e){const t=this.snapTo(e.pixel,e.coordinate,e.map);return t&&(e.coordinate=t.vertex.slice(0,2),e.pixel=t.vertexPixel,this.dispatchEvent(new Ee(pe.SNAP,{vertex:e.coordinate,vertexPixel:e.pixel,feature:t.feature,segment:t.segment}))),super.handleEvent(e)}handleFeatureAdd_(e){const t=X(e);t&&this.addFeature(t)}handleFeatureRemove_(e){const t=X(e);t&&this.removeFeature(t)}handleFeatureChange_(e){const t=e.target;if(this.handlingDownUpSequence){const n=C(t);n in this.pendingFeatures_||(this.pendingFeatures_[n]=t)}else this.updateFeature_(t)}handleUpEvent(e){const t=Object.values(this.pendingFeatures_);return t.length&&(t.forEach(this.updateFeature_.bind(this)),this.pendingFeatures_={}),!1}removeFeature(e,t){const n=t!==void 0?t:!0,i=C(e),s=this.indexedFeaturesExtents_[i];if(s){const r=this.rBush_,a=[];r.forEachInExtent(s,function(o){e===o.feature&&a.push(o)});for(let o=a.length-1;o>=0;--o)r.remove(a[o])}n&&(B(this.featureChangeListenerKeys_[i]),delete this.featureChangeListenerKeys_[i])}setMap(e){const t=this.getMap(),n=this.featuresListenerKeys_,i=this.getFeatures_();t&&(n.forEach(B),n.length=0,this.rBush_.clear(),Object.values(this.featureChangeListenerKeys_).forEach(B),this.featureChangeListenerKeys_={}),super.setMap(e),e&&(this.features_?n.push(G(this.features_,b.ADD,this.handleFeatureAdd_,this),G(this.features_,b.REMOVE,this.handleFeatureRemove_,this)):this.source_&&n.push(G(this.source_,D.ADDFEATURE,this.handleFeatureAdd_,this),G(this.source_,D.REMOVEFEATURE,this.handleFeatureRemove_,this)),i.forEach(s=>this.addFeature(s)))}snapTo(e,t,n){n.getView().getProjection();const i=y(t),s=z(J(E([i]),n.getView().getResolution()*this.pixelTolerance_)),r=this.rBush_.getInExtent(s),a=r.length;if(a===0)return null;let o,h=1/0,u,g=null;const d=this.pixelTolerance_*this.pixelTolerance_,l=()=>{if(o){const c=n.getPixelFromCoordinate(o);if(v(e,c)<=d)return{vertex:o,vertexPixel:[Math.round(c[0]),Math.round(c[1])],feature:u,segment:g}}return null};if(this.vertex_){for(let f=0;f<a;++f){const m=r[f];m.feature.getGeometry().getType()!=="Circle"&&m.segment.forEach(x=>{const p=y(x),S=v(i,p);S<h&&(o=x,h=S,u=m.feature)})}const c=l();if(c)return c}if(this.edge_){for(let f=0;f<a;++f){let m=null;const x=r[f];if(x.feature.getGeometry().getType()==="Circle"){let p=x.feature.getGeometry();m=_e(i,p)}else{const[p,S]=x.segment;S&&(j[0]=y(p),j[1]=y(S),m=Q(i,j))}if(m){const p=v(i,m);p<h&&(o=R(m),g=x.feature.getGeometry().getType()==="Circle"?null:x.segment,h=p,u=x.feature)}}const c=l();if(c)return c}return null}updateFeature_(e){this.removeFeature(e,!1),this.addFeature(e,!1)}segmentCircleGeometry_(e,t){this.getMap().getView().getProjection();const s=me(t).getCoordinates()[0];for(let r=0,a=s.length-1;r<a;++r)e.push(s.slice(r,r+2))}segmentGeometryCollectionGeometry_(e,t){const n=t.getGeometriesArray();for(let i=0;i<n.length;++i){const s=this.GEOMETRY_SEGMENTERS_[n[i].getType()];s&&s(e,n[i])}}segmentLineStringGeometry_(e,t){const n=t.getCoordinates();for(let i=0,s=n.length-1;i<s;++i)e.push(n.slice(i,i+2))}segmentMultiLineStringGeometry_(e,t){const n=t.getCoordinates();for(let i=0,s=n.length;i<s;++i){const r=n[i];for(let a=0,o=r.length-1;a<o;++a)e.push(r.slice(a,a+2))}}segmentMultiPointGeometry_(e,t){t.getCoordinates().forEach(n=>{e.push([n])})}segmentMultiPolygonGeometry_(e,t){const n=t.getCoordinates();for(let i=0,s=n.length;i<s;++i){const r=n[i];for(let a=0,o=r.length;a<o;++a){const h=r[a];for(let u=0,g=h.length-1;u<g;++u)e.push(h.slice(u,u+2))}}}segmentPointGeometry_(e,t){e.push([t.getCoordinates()])}segmentPolygonGeometry_(e,t){const n=t.getCoordinates();for(let i=0,s=n.length;i<s;++i){const r=n[i];for(let a=0,o=r.length-1;a<o;++a)e.push(r.slice(a,a+2))}}}export{Ce as M,Fe as S};
