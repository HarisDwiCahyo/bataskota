import{B as a,s as c,u as h,v as n,w as d,x as g,y as u}from"./GeoJSON-C5wKpImO.js";const i={ACCURACY:"accuracy",ACCURACY_GEOMETRY:"accuracyGeometry",ALTITUDE:"altitude",ALTITUDE_ACCURACY:"altitudeAccuracy",HEADING:"heading",POSITION:"position",PROJECTION:"projection",SPEED:"speed",TRACKING:"tracking",TRACKING_OPTIONS:"trackingOptions"},T={ERROR:"error"};class l extends u{constructor(t){super(T.ERROR),this.code=t.code,this.message=t.message}}class A extends a{constructor(t){super(),this.on,this.once,this.un,t=t||{},this.position_=null,this.transform_=c,this.watchId_=void 0,this.addChangeListener(i.PROJECTION,this.handleProjectionChanged_),this.addChangeListener(i.TRACKING,this.handleTrackingChanged_),t.projection!==void 0&&this.setProjection(t.projection),t.trackingOptions!==void 0&&this.setTrackingOptions(t.trackingOptions),this.setTracking(t.tracking!==void 0?t.tracking:!1)}disposeInternal(){this.setTracking(!1),super.disposeInternal()}handleProjectionChanged_(){const t=this.getProjection();t&&(this.transform_=h(n("EPSG:4326"),t),this.position_&&this.set(i.POSITION,this.transform_(this.position_)))}handleTrackingChanged_(){if("geolocation"in navigator){const t=this.getTracking();t&&this.watchId_===void 0?this.watchId_=navigator.geolocation.watchPosition(this.positionChange_.bind(this),this.positionError_.bind(this),this.getTrackingOptions()):!t&&this.watchId_!==void 0&&(navigator.geolocation.clearWatch(this.watchId_),this.watchId_=void 0)}}positionChange_(t){const e=t.coords;this.set(i.ACCURACY,e.accuracy),this.set(i.ALTITUDE,e.altitude===null?void 0:e.altitude),this.set(i.ALTITUDE_ACCURACY,e.altitudeAccuracy===null?void 0:e.altitudeAccuracy),this.set(i.HEADING,e.heading===null?void 0:d(e.heading)),this.position_?(this.position_[0]=e.longitude,this.position_[1]=e.latitude):this.position_=[e.longitude,e.latitude];const o=this.transform_(this.position_);this.set(i.POSITION,o.slice()),this.set(i.SPEED,e.speed===null?void 0:e.speed);const s=g(this.position_,e.accuracy);s.applyTransform(this.transform_),this.set(i.ACCURACY_GEOMETRY,s),this.changed()}positionError_(t){this.dispatchEvent(new l(t))}getAccuracy(){return this.get(i.ACCURACY)}getAccuracyGeometry(){return this.get(i.ACCURACY_GEOMETRY)||null}getAltitude(){return this.get(i.ALTITUDE)}getAltitudeAccuracy(){return this.get(i.ALTITUDE_ACCURACY)}getHeading(){return this.get(i.HEADING)}getPosition(){return this.get(i.POSITION)}getProjection(){return this.get(i.PROJECTION)}getSpeed(){return this.get(i.SPEED)}getTracking(){return this.get(i.TRACKING)}getTrackingOptions(){return this.get(i.TRACKING_OPTIONS)}setProjection(t){this.set(i.PROJECTION,n(t))}setTracking(t){this.set(i.TRACKING,t)}setTrackingOptions(t){this.set(i.TRACKING_OPTIONS,t)}}export{A as G};