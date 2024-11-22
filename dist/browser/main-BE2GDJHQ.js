import{H as L}from"./chunk-RXX7ZVCF.js";import{b as w,c as E,d as k,f as O,g as j,j as B,m as c}from"./chunk-RF77TZJP.js";import{$a as D,Ab as M,Da as _,Mb as g,Tb as d,Ua as N,V as C,Wa as P,X as v,Ya as R,_ as A,ac as I,ba as i,da as p,ga as F,lc as x,nc as T,ub as h,va as b,vb as u,wb as S}from"./chunk-STD32FX4.js";var Y="@",Z=(()=>{class n{constructor(e,o,r,a,s){this.doc=e,this.delegate=o,this.zone=r,this.animationType=a,this.moduleImpl=s,this._rendererFactoryPromise=null,this.scheduler=i(P,{optional:!0}),this.loadingSchedulerFn=i(W,{optional:!0})}ngOnDestroy(){this._engine?.flush()}loadImpl(){let e=()=>this.moduleImpl??import("./chunk-PRLPSGWP.js").then(r=>r),o;return this.loadingSchedulerFn?o=this.loadingSchedulerFn(e):o=e(),o.catch(r=>{throw new C(5300,!1)}).then(({\u0275createEngine:r,\u0275AnimationRendererFactory:a})=>{this._engine=r(this.animationType,this.doc);let s=new a(this.delegate,this._engine,this.zone);return this.delegate=s,s})}createRenderer(e,o){let r=this.delegate.createRenderer(e,o);if(r.\u0275type===0)return r;typeof r.throwOnSyntheticProps=="boolean"&&(r.throwOnSyntheticProps=!1);let a=new f(r);return o?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(s=>{let H=s.createRenderer(e,o);a.use(H),this.scheduler?.notify(10)}).catch(s=>{a.use(r)}),a}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}static{this.\u0275fac=function(o){N()}}static{this.\u0275prov=v({token:n,factory:n.\u0275fac})}}return n})(),f=class{constructor(t){this.delegate=t,this.replay=[],this.\u0275type=1}use(t){if(this.delegate=t,this.replay!==null){for(let e of this.replay)e(t);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(t,e){return this.delegate.createElement(t,e)}createComment(t){return this.delegate.createComment(t)}createText(t){return this.delegate.createText(t)}get destroyNode(){return this.delegate.destroyNode}appendChild(t,e){this.delegate.appendChild(t,e)}insertBefore(t,e,o,r){this.delegate.insertBefore(t,e,o,r)}removeChild(t,e,o){this.delegate.removeChild(t,e,o)}selectRootElement(t,e){return this.delegate.selectRootElement(t,e)}parentNode(t){return this.delegate.parentNode(t)}nextSibling(t){return this.delegate.nextSibling(t)}setAttribute(t,e,o,r){this.delegate.setAttribute(t,e,o,r)}removeAttribute(t,e,o){this.delegate.removeAttribute(t,e,o)}addClass(t,e){this.delegate.addClass(t,e)}removeClass(t,e){this.delegate.removeClass(t,e)}setStyle(t,e,o,r){this.delegate.setStyle(t,e,o,r)}removeStyle(t,e,o){this.delegate.removeStyle(t,e,o)}setProperty(t,e,o){this.shouldReplay(e)&&this.replay.push(r=>r.setProperty(t,e,o)),this.delegate.setProperty(t,e,o)}setValue(t,e){this.delegate.setValue(t,e)}listen(t,e,o){return this.shouldReplay(e)&&this.replay.push(r=>r.listen(t,e,o)),this.delegate.listen(t,e,o)}shouldReplay(t){return this.replay!==null&&t.startsWith(Y)}},W=new A("");function V(n="animations"){return D("NgAsyncAnimations"),F([{provide:R,useFactory:(t,e,o)=>new Z(t,e,o,n),deps:[x,E,b]},{provide:_,useValue:n==="noop"?"NoopAnimations":"BrowserAnimations"}])}var l=class n{location=i(T);goBack(){this.location.back()}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=p({type:n,selectors:[["app-not-found-page"]],standalone:!0,features:[d],decls:4,vars:0,consts:[["mat-flat-button","","color","primary","data-cy","not-found-back-button",3,"click"]],template:function(e,o){e&1&&(h(0,"h1"),g(1,"Pagina n\xE3o encontrada"),u(),h(2,"button",0),M("click",function(){return o.goBack()}),g(3,"Voltar"),u())},dependencies:[L],styles:["[_nghost-%COMP%]{display:flex;padding:24px 12px;flex-direction:column;justify-content:center;align-items:center}"]})};var y=(n,t)=>{let e=i(c),o=i(j);return!t.url.includes("login")&&!e.getUserLogged().id?(o.navigateByUrl("/auth/login"),!1):!0};var G=[{path:"",pathMatch:"full",redirectTo:"auth/login"},{path:"dashboard",loadComponent:()=>import("./chunk-YD3P3GLN.js").then(n=>n.ToDoPageComponent),providers:[c],children:[{path:"",pathMatch:"full",redirectTo:"home"},{path:"home",loadComponent:()=>import("./chunk-KXWV2KIH.js").then(n=>n.ToDoComponent),canActivate:[y]},{path:"**",component:l,canActivate:[y]}]},{path:"auth",loadComponent:()=>import("./chunk-IZ3T5LHJ.js").then(n=>n.AuthPageComponent),children:[{path:"",pathMatch:"full",redirectTo:"login"},{path:"login",loadComponent:()=>import("./chunk-YA4KB6WZ.js").then(n=>n.LoginComponent)}]},{path:"**",component:l}];var z={providers:[I({eventCoalescing:!0}),B(G),V(),w()]};var m=class n{static \u0275fac=function(e){return new(e||n)};static \u0275cmp=p({type:n,selectors:[["app-root"]],standalone:!0,features:[d],decls:1,vars:0,template:function(e,o){e&1&&S(0,"router-outlet")},dependencies:[O]})};k(m,z).catch(n=>console.error(n));