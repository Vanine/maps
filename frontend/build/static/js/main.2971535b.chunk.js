(this.webpackJsonpmaps=this.webpackJsonpmaps||[]).push([[0],{136:function(e,t,n){},191:function(e,t,n){e.exports=n(397)},196:function(e,t,n){},262:function(e,t,n){},397:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),l=n(4),o=n.n(l),r=(n(196),n(17)),s=n(18),c=n(21),p=n(19),d=n(22),u=(n(136),n(62)),h="ADD_POINT",m="SET_POINTS",g=function(e){return{type:h,payload:e}},f=function(e){return{type:m,payload:e}},b=n(93),y=n.n(b),v=n(399),E=n(60),O=n(47),C=n(46),j=function(e){function t(){return Object(r.a)(this,t),Object(c.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return i.a.createElement("span",{style:{display:"flex",justifyContent:"center",marginTop:"30px"}},i.a.createElement(C.a,{style:{marginRight:"10px"},type:"primary"},i.a.createElement(E.b,{to:"/"},"Add a new item")),i.a.createElement(C.a,{type:"primary"},i.a.createElement(E.b,{to:"/map"},"View result on a map")))}}]),t}(i.a.Component),k=Object(O.e)(j),w=function(e){function t(){var e,n;Object(r.a)(this,t);for(var a=arguments.length,i=new Array(a),l=0;l<a;l++)i[l]=arguments[l];return(n=Object(c.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(i)))).handleClick=function(){n.props.onClick(n.props.point)},n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{onClick:this.handleClick,style:{background:"red",padding:"10px 10px",display:"inline-flex",textAlign:"center",alignItems:"center",justifyContent:"center",borderRadius:"100%",transform:"translate(-50%, -50%)",opacity:this.props.visible?1:0}})}}]),t}(i.a.Component),S=(n(262),function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(c.a)(this,Object(p.a)(t).call(this,e))).arrayBufferToBase64=function(e){var t="";return[].slice.call(new Uint8Array(e)).forEach((function(e){return t+=String.fromCharCode(e)})),window.btoa(t)},n.state={width:0,height:0},n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"componentWillReceiveProps",value:function(){this.setState({width:document.getElementById("infoWindow").clientWidth,height:document.getElementById("infoWindow").clientHeight})}},{key:"render",value:function(){return i.a.createElement("div",{id:"infoWindow",style:{display:this.props.visible?"inherit":"none"}},this.props.point?i.a.createElement(i.a.Fragment,null,i.a.createElement("div",null,"0"===this.props.point.category?"Garbage disposal isn't done on time":"1"===this.props.point.category?"Trash has no lid":"2"===this.props.point.category?"Trash is placed in the wrong place":""),i.a.createElement("div",null,"Latitude: ",this.props.point.latitude),i.a.createElement("div",null,"Longitude: ",this.props.point.longitude),i.a.createElement("div",null,this.props.point&&this.props.point.img.data.length>0?i.a.createElement("img",{style:{height:"80px",width:"100px",marginTop:"5px"},src:"data:image/jpeg;base64, ".concat(this.arrayBufferToBase64(this.props.point.img.data[0].data)),alt:"Helpful alt text"}):null)):null)}}]),t}(i.a.Component)),x=v.a.Option,L=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(c.a)(this,Object(p.a)(t).call(this,e))).handleFetch=function(){fetch("http://".concat(Object({NODE_ENV:"production",PUBLIC_URL:""}).HOST||"localhost",":").concat(Object({NODE_ENV:"production",PUBLIC_URL:""}).PORT||3001,"/problems"),{method:"GET",headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(e){return e.json()})).then((function(e){n.props.setPoints({points:e.points})})).catch((function(e){throw e}))},n.handleChange=function(e){n.setState({selectedCategory:e,point:void 0,visible:!1,lat:void 0,lng:void 0})},n.handleClick=function(e){n.state.point!==e?n.setState({visible:!0,lat:e?e.latitude:0,lng:e?e.longitude:0,point:e||void 0}):n.setState({visible:!n.state.visible,lat:e?e.latitude:0,lng:e?e.longitude:0,point:e||void 0})},n.handleClickOnMap=function(e){n.setState({point:void 0,visible:!1,lat:void 0,lng:void 0})},n.displayMarkers=function(){var e=[];if(n.state.selectedCategory)for(var t=0;t<n.props.points.length;t++)n.props.points[t].category===n.state.selectedCategory&&e.push({lat:n.props.points[t].latitude,lng:n.props.points[t].longitude});else for(var a=0;a<n.props.points.length;a++)e.push({lat:n.props.points[a].latitude,lng:n.props.points[a].longitude});return{positions:e,options:{radius:20,maxIntensity:3,opacity:.9}}},n.setMarkers=function(){if(!n.state.selectedCategory)return n.props.points.map((function(e,t){return i.a.createElement(w,{visible:!1,key:t+1,lat:e.latitude,lng:e.longitude,onClick:n.handleClick,point:e})}));for(var e=0;e<n.props.points.length;e++)return n.props.points.map((function(e,t){if(e.category===n.state.selectedCategory)return i.a.createElement(w,{key:t+1,lat:e.latitude,lng:e.longitude,visible:!1,point:e,onClick:n.handleClick})}))},n.handleFetch(),n.state={selectedCategory:void 0,visible:!1,lat:void 0,lng:void 0,point:void 0},n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e={marginTop:"20px",width:"100%",height:"".concat(.8*window.innerHeight,"px"),paddingLeft:"2%",paddingRight:"2%"};return i.a.createElement("div",{style:{overflowY:"auto"}},i.a.createElement(k,null),i.a.createElement("div",{style:{display:"flex",justifyContent:"center",marginTop:"20px"}},i.a.createElement("div",null,"Filter by category:"),i.a.createElement(v.a,{style:{width:"20%",marginLeft:"10px"},onChange:this.handleChange},i.a.createElement(x,{value:"0"},"Garbage disposal is not done on time"),i.a.createElement(x,{value:"1"},"Trash has no lid"),i.a.createElement(x,{value:"2"},"Trash is placed in the wrong place"))),i.a.createElement("div",{style:e},i.a.createElement(y.a,{bootstrapURLKeys:{key:"AIzaSyDPz11ka9meqi4YSy2gSSQEL3ZAWadNntg"},zoom:15,center:{lat:40.8074,lng:44.497028},margin:[100,100,100,200],passive:!0,heatmapLibrary:!0,onClick:this.handleClickOnMap,heatmap:this.displayMarkers(),yesIWantToUseGoogleMapApiInternals:!0,defaultOptions:{disableDefaultUI:!0,keyboardShortcuts:!1,scaleControl:!0}},i.a.createElement(S,{visible:this.state.visible,lat:this.state.lat||40,lng:this.state.lng||40,point:this.state.point}),this.setMarkers())))}}]),t}(i.a.Component),T=Object(u.b)((function(e){return{points:e.points}}),(function(e){return{addPoint:function(t){e(g(t))},setPoints:function(t){e(f(t))}}}))(L),I=n(55),F=(n(272),n(181)),D=n.n(F),P=n(400),_=n(404),N=n(398),R=n(403),U=n(7),A=n(189),B=n.n(A),M=n(401),W=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(c.a)(this,Object(p.a)(t).call(this,e))).handleClick=function(e){var t={lat:e.lat,lng:e.lng};n.props.handleClick(t),n.setState({point:t})},n.setMarker=function(){return n.state.point&&n.props.isVisible?i.a.createElement(w,{visible:!0,lat:n.state.point.lat,lng:n.state.point.lng}):null},n.state={point:void 0},n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{style:{paddingTop:"20px",width:"100%",height:"70vh",paddingLeft:"20px",paddingRight:"20px"}},i.a.createElement(y.a,{onClick:this.handleClick,bootstrapURLKeys:{key:"AIzaSyDPz11ka9meqi4YSy2gSSQEL3ZAWadNntg"},zoom:15,center:{lat:40.8074,lng:44.497028},margin:[100,100,100,200],passive:!0,yesIWantToUseGoogleMapApiInternals:!0,defaultOptions:{disableDefaultUI:!0,keyboardShortcuts:!1,scaleControl:!0}},this.setMarker()))}}]),t}(i.a.Component),V=function(e){function t(){var e,n;Object(r.a)(this,t);for(var a=arguments.length,i=new Array(a),l=0;l<a;l++)i[l]=arguments[l];return(n=Object(c.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(i)))).state={point:void 0,visible:!1},n.showModal=function(){n.setState({visible:!0})},n.handleCancel=function(){n.setState({visible:!1,value:"",point:void 0})},n.handleClick=function(e){n.setState({point:e})},n.handleSelect=function(){n.props.handleSelect(n.state.point),n.setState({visible:!1,point:void 0})},n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.state.visible;return i.a.createElement("div",null,i.a.createElement(C.a,{style:{marginLeft:"33.5%",marginBottom:"20px"},type:"ghost",onClick:this.showModal},"Find a place"),i.a.createElement(M.a,{width:"60%",style:{width:"50%",paddingLeft:"0%",paddingRigth:"0%"},visible:e,title:"Map",onOk:this.handleSelect,onCancel:this.handleCancel,footer:[i.a.createElement(C.a,{key:"back",onClick:this.handleCancel},"Cancel"),i.a.createElement(C.a,{key:"submit",type:"primary",onClick:this.handleSelect},"Ok")]},i.a.createElement("div",{style:{display:"flex"}},i.a.createElement("div",{style:{width:"48%",marginLeft:"2%"}},"Latitude: ",this.state.point?this.state.point.lat:""),i.a.createElement("div",null,"Longitude: ",this.state.point?this.state.point.lng:"")),i.a.createElement(W,{handleClick:this.handleClick,isVisible:this.state.visible&&this.state.point})))}}]),t}(i.a.Component),z=n(99),G=v.a.Option,H=P.a.TextArea,q=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(c.a)(this,Object(p.a)(t).call(this,e))).state={confirmDirty:!1,autoCompleteResult:[],selectedFiles:[],point:void 0},n.onChangeHandler=function(e){n.setState({selectedFiles:[].concat(Object(I.a)(n.state.selectedFiles),[e.target.files[0]]),loaded:0})},n.onDrop=function(e){n.setState({selectedFiles:[].concat(Object(I.a)(n.state.selectedFiles),Object(I.a)(e)),loaded:0})},n.handleSelect=function(e){e&&(n.setState({point:e}),n.props.form.setFieldsValue({latitude:Number(e.lat),longitude:Number(e.lng)}))},n.handleSubmit=function(e){e.preventDefault(),n.props.form.validateFieldsAndScroll((function(e,t){if(!e){var a=new FormData;if(n.state.selectedFiles)for(var i=0;i<n.state.selectedFiles.length;i++)a.append("files",n.state.selectedFiles[i]);var l={category:t.category,longitude:t.longitude,latitude:t.latitude,description:t.description,image:a};fetch("http://localhost:".concat(Object({NODE_ENV:"production",PUBLIC_URL:""}).PORT||3001,"/add_problem"),{method:"POST",body:JSON.stringify(l),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(e){return e.json()})).then((function(e){n.state.selectedFiles&&D()({method:"post",url:"http://localhost:".concat(Object({NODE_ENV:"production",PUBLIC_URL:""}).PORT||3001,"/upload_file/").concat(e.id),data:a}).then((function(){return n.setState({selectedFiles:[]})}))})).then((function(){n.setState({selectedFiles:[]}),n.props.addPoint(l),n.props.form.resetFields(),_.a.info("Problem added")})).catch((function(e){_.a.error("Something went wrong")}))}}))},n.handleChange=function(e){},n.handleConfirmBlur=function(e){var t=e.target.value;n.setState({confirmDirty:n.state.confirmDirty||!!t})},n.fileInput=i.a.createRef(),n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"Basic",value:function(e){var t=Object(z.b)(),n=t.acceptedFiles,a=t.getRootProps,l=t.getInputProps,o=n.map((function(e){return i.a.createElement("li",{key:e.path},e.path," - ",e.size," bytes")}));return i.a.createElement("section",{className:"container"},i.a.createElement("div",a({className:"dropzone"}),i.a.createElement("input",l()),i.a.createElement("p",null,"Drag 'n' drop some files here, or click to select files")),i.a.createElement("aside",null,i.a.createElement("h4",null,"Files"),i.a.createElement("ul",null,o)))}},{key:"render",value:function(){var e=this,t=this.props.form.getFieldDecorator;return i.a.createElement("div",{style:{overflowY:"auto"}},i.a.createElement(k,null),i.a.createElement(N.a,Object.assign({},{labelCol:{xs:{span:24},sm:{span:8}},wrapperCol:{xs:{span:24},sm:{span:16}}},{onSubmit:this.handleSubmit,className:"form",style:{marginLeft:"24%",marginTop:"1%",width:"40%"}}),i.a.createElement(N.a.Item,{label:i.a.createElement("span",null,"Category")},t("category",{initialValue:"0"})(i.a.createElement(v.a,{style:{width:"100%"},onChange:this.handleChange},i.a.createElement(G,{value:"0"},"Garbage disposal isn't done on time"),i.a.createElement(G,{value:"1"},"Trash has no lid"),i.a.createElement(G,{value:"2"},"Trash is placed in the wrong place")))),i.a.createElement(V,{handleSelect:this.handleSelect}),i.a.createElement(N.a.Item,{label:"Latitude"},t("latitude",{rules:[{validator:function(e,t,n){t?t>85||t<-85?n("Invalid value!"):"number"==typeof t?n():n("Latitude is not a number"):n("Latitude is required")}}]})(i.a.createElement(R.a,{style:{width:"100%"}}))),i.a.createElement(N.a.Item,{label:"Longitude"},t("longitude",{rules:[{validator:function(e,t,n){t?t>180||t<-180?n("Invalid value!"):"number"==typeof t?n():n("Longitude is not a number"):n("Longitude is required")}}]})(i.a.createElement(R.a,{style:{width:"100%"}}))),i.a.createElement(N.a.Item,{label:"Description"},t("description",{rules:[{type:"string"},{min:20,message:"Must contain at least 20 letters!"},{max:300,message:"Must contain at most 300 letters!"}]})(i.a.createElement(H,{rows:3}))),i.a.createElement(B.a,null,i.a.createElement("div",null,i.a.createElement(z.a,{onDrop:this.onDrop,style:{width:"100%",height:"20%",border:"1px solid black",marginLeft:"30%"}},(function(t){var n=t.getRootProps,a=t.getInputProps;return i.a.createElement("section",null,i.a.createElement("div",Object.assign({},n(),{style:{width:"65%",marginLeft:"34%",border:"1px solid black",borderStyle:"dashed",height:"150px",overflow:"scroll",background:"rgb(162, 195, 233)",display:"table"}}),i.a.createElement("input",a()),i.a.createElement("ul",{style:{marginLeft:e.state.selectedFiles.length>0?"-70px":"-30px",marginRight:"20px"}}," ",e.state.selectedFiles.length>0?e.state.selectedFiles.map((function(e,t){return i.a.createElement("ol",{key:t,style:{marginBottom:"-18px"}},e.name)})):i.a.createElement("p",{style:{textAlign:"center",marginTop:"10%",fontSize:"17px"}},i.a.createElement(U.a,{type:"upload",style:{fontSize:"55px"}})," ",i.a.createElement("br",null),i.a.createElement("span",{style:{fontWeight:"bolder"}},"Choose an image "),i.a.createElement("span",null,"or drag it here"))," ")," "))})))),i.a.createElement(N.a.Item,{wrapperCol:{xs:{span:24,offset:0},sm:{span:16,offset:8}}},i.a.createElement(C.a,{type:"primary",htmlType:"submit"},"Add"))))}}]),t}(i.a.Component),X=N.a.create({name:"register"})(q),Y=Object(O.e)(X),J=Object(u.b)((function(e){return{points:e.points}}),(function(e){return{addPoint:function(t){e(g(t))},setPoints:function(t){e(f(t))}}}))(Y),K=n(92),Q=n(135),Z={points:[]};var $=Object(K.b)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Z,t=arguments.length>1?arguments[1]:void 0;return t.type===h?Object(Q.a)({},e,{points:[].concat(Object(I.a)(e.points),[t.payload])}):t.type===m?Object(Q.a)({},e,{points:Object(I.a)(t.payload.points)}):e}),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()),ee=function(e){function t(){return Object(r.a)(this,t),Object(c.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return i.a.createElement(u.a,{store:$},i.a.createElement(E.a,null,i.a.createElement(O.a,{exact:!0,path:"/",component:J}),i.a.createElement(O.a,{path:"/map",component:T})))}}]),t}(i.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(ee,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[191,1,2]]]);
//# sourceMappingURL=main.2971535b.chunk.js.map