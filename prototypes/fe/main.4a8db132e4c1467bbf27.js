"use strict";(self.webpackChunkai_wizards_ui=self.webpackChunkai_wizards_ui||[]).push([[179],{5859:(e,t,n)=>{var a=n(7294),l=n(745),r=n(1508),i=n(4386),m=n(2658),o=n(9617),c=n(9164),s=n(1237),d=n(6236),u=n(8046),p=n(3720),h=n(6867),g=n(2318),E=n(6914);const f=()=>a.createElement("div",null,a.createElement("h2",null,"Convert Page"),a.createElement("p",null,"This is the Convert page content."));var x=n(6089),v=n(5725),b=n(4680),y=n(3709),Z=n(8025),w=n(7666),C=n(2612),S=n(4347);const k=({name:e,label:t,values:n})=>{const l=String(e);return a.createElement(Z.Z,{fullWidth:!0,margin:"normal"},a.createElement(w.Z,{id:`id-${l}`},t),a.createElement(C.Z,{labelId:`id-${l}`,name:l,id:l,label:t},n.map((e=>a.createElement(S.Z,{key:`key-${e[0]}`,value:e[0]},e[1])))))},z=({pending:e,validInputs:t})=>a.createElement(a.Fragment,null,a.createElement(m.Z,{component:"h1",variant:"h6",color:"inherit",noWrap:!0,sx:{flexGrow:1,marginBottom:2}},a.createElement("div",{className:"welcome"},"Hark, fair adventurer of mystical lands! I beseech thee to unveil thy splendid selection of paramount settings, which shall guide and illuminate the path of thy noble pipeline.")),a.createElement(y.Z,null,a.createElement(k,{name:"build-tool",label:"Build tool",values:[["mvn","Maven"],["gradle","Gradle"],["npm","npm script"],["servicenow","ServiceNow"]]}),a.createElement(k,{name:"deployment-target",label:"Deployment Target",values:[["openshift","Openshift"],["gcp","GCP"],["aws","AWS"]]}),a.createElement(k,{name:"integration-platform",label:"CI/CD platform",values:[["jenkins","Jenkins"],["teamcity","Teamcity"]]}),a.createElement(k,{name:"database",label:"Database",values:[["oracle","Oracle"],["cloudSQL","CloudSQL"],["clickhouse","ClickHouse"]]}),a.createElement(E.Z,{disabled:e,variant:"contained",type:"submit",className:"submit"},t?e?a.createElement(a.Fragment,null,a.createElement("span",null,"."),a.createElement("span",{className:"runningUnicorn"},"🦄")):a.createElement("span",null,"Gimme some magic 🌈🦄",a.createElement("span",{className:"reverseUnicorn"},"🌈")):a.createElement(a.Fragment,null,a.createElement("span",null,"Embrace the options, dear seeker! They hold the key to enchantment."))))),I=n.p+"assets/58f0eed7c97566899068.gif",P=()=>a.createElement("div",{className:"loaderContainer"},a.createElement("img",{src:I,width:220,height:204,className:"loader1"}),a.createElement("img",{src:I,width:220,height:204,className:"loader2"}),a.createElement("img",{src:I,width:220,height:204,className:"loader3"})),N=()=>{const[e,t]=a.useState(!0),[n,l,r]=function(){const[e,t]=a.useState(),[n,l]=a.useState();return[e,n,function(e){return t("pending"),fetch("http://localhost:3000/aiwizards/convertPipeline",{mode:"cors",method:"post",body:e}).then((e=>e.json())).then((e=>{var n,a;t("done"),l(null===(a=null===(n=null==e?void 0:e.data)||void 0===n?void 0:n.data)||void 0===a?void 0:a.content)})).catch((()=>t("error")))}]}(),i=a.useCallback((e=>{const n=new FormData(e.target),a=Object.fromEntries(n.entries());e.preventDefault(),e.stopPropagation(),a["integration-platform"]&&a["build-tool"]&&a["deployment-target"]&&a.database?(r(`generate ${a["integration-platform"]} config for ${a["build-tool"]}, ${a["deployment-target"]}, ${a.database}`),t(!0)):t(!1)}),[]);return a.createElement(a.Fragment,null,a.createElement(x.Z,{maxWidth:!1,sx:{flexGrow:1,transition:"margin-left 0.2s"}},a.createElement(v.ZP,{container:!0,spacing:3,sx:{height:"100%"}},a.createElement(v.ZP,{item:!0,xs:6},a.createElement(v.ZP,{container:!0,rowSpacing:3,sx:{height:"calc(100% - 20px)"}},a.createElement(v.ZP,{item:!0,xs:12},a.createElement(b.Z,{sx:{p:2,display:"flex",flexDirection:"column",height:"calc(100% - 32px)"}},a.createElement("form",{onSubmit:i},a.createElement(z,{validInputs:e,pending:"pending"===n})))),a.createElement(v.ZP,{item:!0,xs:12},a.createElement(b.Z,{sx:{p:2,display:"flex",flexDirection:"column",height:"calc(100% - 8px)"}},a.createElement("div",null,"Terminal"))))),a.createElement(v.ZP,{item:!0,xs:6},a.createElement(b.Z,{sx:{p:2,display:"flex",flexDirection:"column",height:"calc(100% - 32px)"}},n?"pending"===n?a.createElement(P,null):"error"===n?a.createElement("div",null,"Oh no! All the unicorns died! 😱😱😱 Try again!"):a.createElement("pre",null,l):a.createElement("div",null,"Waiting for a unicorn to appear..."))))))},D=(0,o.Z)(),R=a.createElement((()=>{const[e,t]=a.useState(!0),[n,l]=a.useState(!1),[o,x]=a.useState("Create"),v=()=>{l(!n)};return a.createElement(c.Z,{theme:D},a.createElement(r.Z,{component:"main",sx:{backgroundColor:e=>"light"===e.palette.mode?e.palette.grey[100]:e.palette.grey[900],display:"flex",flexDirection:"column",flexGrow:1,height:"100vh",overflow:"auto",marginLeft:n?"400px":0,transition:"margin-left 0.2s"}},a.createElement(p.Z,{position:"fixed",sx:{zIndex:D.zIndex.drawer+1}},a.createElement(i.Z,null,a.createElement(h.Z,{color:"inherit","aria-label":"open drawer",edge:"start",onClick:v,sx:{mr:2}},n?a.createElement(s.Z,null):a.createElement(d.Z,null)),a.createElement(m.Z,{component:"div",variant:"h6",color:"inherit",sx:{flexGrow:1}},"AI Wizards Almighty Generator"))),a.createElement(g.ZP,{variant:"persistent",open:n,sx:{width:400,flexShrink:0}},a.createElement(i.Z,null,a.createElement(h.Z,{onClick:v},"rtl"===D.direction?a.createElement(u.Z,null):a.createElement(s.Z,null))),a.createElement("h2",{className:"underline"},"Please Choose Your Required Function"),a.createElement(r.Z,{p:2},a.createElement(E.Z,{color:"inherit",sx:{width:"100%",mb:1,fontWeight:"bold",justifyContent:"flex-start",fontSize:"2rem",textTransform:"none",display:"flex",alignItems:"center"},onClick:()=>x("Create")},a.createElement("span",{role:"img","aria-label":"wand",style:{fontSize:"2rem",marginRight:"1rem"}},"🧙🏻‍♀️🪄"),a.createElement("span",{style:{marginRight:"1rem"}},"Create"),a.createElement("span",{role:"img","aria-label":"wand",style:{fontSize:"2rem"}},"🦄🦄")),a.createElement(E.Z,{color:"inherit",sx:{width:"100%",mb:1,fontWeight:"bold",justifyContent:"flex-start",fontSize:"2rem",textTransform:"none",display:"flex",alignItems:"center"},onClick:()=>x("Convert")},a.createElement("span",{role:"img","aria-label":"wand",style:{fontSize:"2rem",marginRight:"1rem"}},"🧙🏻‍♂️🪄"),a.createElement("span",{style:{marginRight:"1rem"}},"Convert"),a.createElement("span",{role:"img","aria-label":"hat",style:{fontSize:"2rem"}},"🦄🦄")),a.createElement(E.Z,{color:"inherit",sx:{width:"100%",mb:1,fontWeight:"bold",justifyContent:"flex-start",fontSize:"2rem",textTransform:"none",display:"flex",alignItems:"center"},onClick:()=>x("Review")},a.createElement("span",{role:"img","aria-label":"wand",style:{fontSize:"2rem",marginRight:"1rem"}},"🧙🏻‍♂️🪄"),a.createElement("span",{style:{marginRight:"1rem"}},"Review"),a.createElement("span",{role:"img","aria-label":"star",style:{fontSize:"2rem"}},"🦄🦄")))),a.createElement(i.Z,null)," ","Create"===o?a.createElement(N,null):a.createElement(f,null)))}),null);(0,l.s)(document.getElementById("app")).render(R)}},e=>{e.O(0,[216],(()=>(5859,e(e.s=5859)))),e.O()}]);