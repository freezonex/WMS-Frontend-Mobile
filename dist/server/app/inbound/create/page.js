(()=>{var e={};e.id=379,e.ids=[379],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},1017:e=>{"use strict";e.exports=require("path")},7310:e=>{"use strict";e.exports=require("url")},8075:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>n.a,__next_app__:()=>u,originalPathname:()=>p,pages:()=>d,routeModule:()=>m,tree:()=>c}),r(8114),r(3632),r(5866);var s=r(3191),a=r(8716),i=r(7922),n=r.n(i),o=r(5231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);r.d(t,l);let c=["",{children:["inbound",{children:["create",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,8114)),"D:\\Workplace\\WMS_Demo\\Mobile\\wms-mobile\\src\\app\\inbound\\create\\page.tsx"]}]},{}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,3881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,3632)),"D:\\Workplace\\WMS_Demo\\Mobile\\wms-mobile\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,5866,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,3881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["D:\\Workplace\\WMS_Demo\\Mobile\\wms-mobile\\src\\app\\inbound\\create\\page.tsx"],p="/inbound/create/page",u={require:r,loadChunk:()=>Promise.resolve()},m=new s.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/inbound/create/page",pathname:"/inbound/create",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},6205:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2994,23)),Promise.resolve().then(r.t.bind(r,6114,23)),Promise.resolve().then(r.t.bind(r,9727,23)),Promise.resolve().then(r.t.bind(r,9671,23)),Promise.resolve().then(r.t.bind(r,1868,23)),Promise.resolve().then(r.t.bind(r,4759,23))},9141:(e,t,r)=>{Promise.resolve().then(r.bind(r,8492)),Promise.resolve().then(r.bind(r,4927))},8859:(e,t,r)=>{Promise.resolve().then(r.bind(r,4479))},1994:(e,t,r)=>{"use strict";r.d(t,{Z:()=>i});var s=r(326),a=r(3673);function i({id:e,name:t,value:r,setValue:i,placeholder:n}){return(0,s.jsxs)("div",{className:"cus-input",children:[s.jsx("p",{className:"name",children:t}),s.jsx("div",{className:"bg-white",children:s.jsx(a.II,{id:e,placeholder:n||t,value:r,onChange:t=>i(t,e||""),clearable:!0})})]})}},8782:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});var s=r(326);function a({title:e,subTitle:t,children:r}){return s.jsx(s.Fragment,{children:s.jsx("div",{className:"p-4 bg-white",children:(0,s.jsxs)("div",{children:[s.jsx("p",{className:" font-[400]  text-[30px]",children:e}),s.jsx("p",{className:"text-[14px]",children:t}),s.jsx("div",{className:"mt-4",children:r})]})})})}},8492:(e,t,r)=>{"use strict";r.d(t,{default:()=>x});var s=r(326),a=r(3673),i=r(8478),n=r(1181),o=r(3570),l=r(2824),c=r(937),d=r(9119),p=r(2215),u=r(5047),m=r(7577);function x(){let e=(0,u.useRouter)();(0,u.usePathname)();let[t,r]=(0,m.useState)(!1),x=[{name:"warehouse",title:"Warehouse",icon:s.jsx(i.vv,{}),path:"/"},{name:"material",title:"Material",icon:s.jsx(n.xs,{}),path:"/material",bottomDivider:!0},{name:"inbound",title:"Inbound",icon:s.jsx(o.Gw,{}),path:"/inbound"},{name:"outbound",title:"Outbound",icon:s.jsx(o.jR,{}),path:"/outbound"},{name:"auditing",title:"Auditing",icon:s.jsx(l.Xx,{}),path:"/auditing",bottomDivider:!0}],h=t=>{e.push(`${t}`),r(!1)};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{className:"topbar",children:[s.jsx("div",{style:{flex:"1"},children:s.jsx(c.tR,{size:24,onClick:()=>{r(!0)}})}),(0,s.jsxs)("div",{className:"title",style:{flex:"8"},children:[s.jsx("span",{className:"font-nornal",children:"SUPCON"}),s.jsx("span",{className:"ml-2 font-semibold",children:"SCM"})]}),s.jsx("div",{style:{flex:"2"},children:s.jsx(d.ol,{size:24})}),s.jsx("div",{style:{flex:"1"},children:s.jsx(p.n5,{size:24})})]}),s.jsx(a.GI,{className:"m",visible:t,onMaskClick:()=>{r(!1)},position:"left",bodyStyle:{width:"45vw",marginTop:"48px"},children:s.jsx("div",{className:"menu-list",children:s.jsx(a.aV,{style:{"--border-inner":"none","--border-bottom":"none","--font-size":"14px"},children:x.map((e,t)=>(0,s.jsxs)("div",{children:[s.jsx(a.aV.Item,{className:"h-8",prefix:e.icon,onClick:()=>h(e.path),children:e.title}),e.bottomDivider&&s.jsx(a.iz,{style:{margin:"8px"}})]},t))})})})]})}},4479:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>c});var s=r(326),a=r(1994),i=r(8782),n=r(3673),o=r(7577),l=r(5047);function c(){let e=(0,l.useRouter)(),[t,r]=(0,o.useState)({name:"",warehouse_id:"",type:"",manager:"",department:"",email:"",project_group:"",note:""}),c=(e,t)=>{r(r=>({...r,[t]:e}))};return s.jsx(s.Fragment,{children:(0,s.jsxs)("div",{children:[s.jsx(i.Z,{title:"Inbound",subTitle:"Log new inventory arrivals quickly"}),(0,s.jsxs)("div",{className:"p-4",children:[s.jsx("p",{className:" font-normal text-[20px]",children:"Create a Inbound List"}),s.jsx("div",{}),(0,s.jsxs)("div",{children:[s.jsx(a.Z,{id:"name",name:"Name",value:t.name,setValue:c}),s.jsx(a.Z,{id:"warehouse_id",name:"Warehouse ID",value:t.warehouse_id,setValue:c}),s.jsx(a.Z,{id:"type",name:"Type",value:t.type,setValue:c}),s.jsx(a.Z,{id:"manager",name:"Manager",value:t.manager,setValue:c}),s.jsx(a.Z,{id:"project_group",name:"Project Group",value:t.project_group,setValue:c})]}),(0,s.jsxs)("div",{className:"mt-6 flex flex-row justify-center gap-4 pb-8",children:[s.jsx(n.zx,{color:"primary",onClick:()=>{},children:"Next"}),s.jsx(n.zx,{color:"primary",fill:"outline",onClick:()=>{e.back()},children:"Cancel"})]})]})]})})}},4927:(e,t,r)=>{"use strict";r.d(t,{default:()=>n});var s=r(326),a=r(3673),i=r(7889);function n({children:e}){return s.jsx(s.Fragment,{children:s.jsx(a.iV,{locale:i.Z,children:e})})}},8114:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>n,__esModule:()=>i,default:()=>o});var s=r(8570);let a=(0,s.createProxy)(String.raw`D:\Workplace\WMS_Demo\Mobile\wms-mobile\src\app\inbound\create\page.tsx`),{__esModule:i,$$typeof:n}=a;a.default;let o=(0,s.createProxy)(String.raw`D:\Workplace\WMS_Demo\Mobile\wms-mobile\src\app\inbound\create\page.tsx#default`)},3632:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>b,metadata:()=>h});var s=r(9510),a=r(5384),i=r.n(a);r(924),r(1765);var n=r(8570);let o=(0,n.createProxy)(String.raw`D:\Workplace\WMS_Demo\Mobile\wms-mobile\src\app\components\topbar\topbar.tsx`),{__esModule:l,$$typeof:c}=o;o.default;let d=(0,n.createProxy)(String.raw`D:\Workplace\WMS_Demo\Mobile\wms-mobile\src\app\components\topbar\topbar.tsx#default`),p=(0,n.createProxy)(String.raw`D:\Workplace\WMS_Demo\Mobile\wms-mobile\src\app\privoder.tsx`),{__esModule:u,$$typeof:m}=p;p.default;let x=(0,n.createProxy)(String.raw`D:\Workplace\WMS_Demo\Mobile\wms-mobile\src\app\privoder.tsx#default`),h={title:"SUPCON SCM",description:"Supcon scm app"};function b({children:e}){return(0,s.jsxs)("html",{lang:"en",children:[s.jsx("head",{children:s.jsx("meta",{name:"viewport",content:"width=device-width"})}),(0,s.jsxs)("body",{className:i().className,children:[s.jsx(d,{}),s.jsx(x,{children:s.jsx("div",{className:"container",children:e})})]})]})}},3881:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a});var s=r(6621);let a=e=>[{type:"image/x-icon",sizes:"16x16",url:(0,s.fillMetadataSegment)(".",e.params,"favicon.ico")+""}]},1765:()=>{},924:()=>{}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[948,93,621],()=>r(8075));module.exports=s})();