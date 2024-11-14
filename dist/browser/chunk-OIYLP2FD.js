import{A as v,B as De,g as ye,h as _,i as be,j as Ee,k as Me,l as X,m as xe,n as Ce,o as we,p as Ie,q as Se,v as ke,w as Re,x as Fe,y as Te,z as Ae}from"./chunk-T4N5TUE2.js";import{H as G,I as _e,J as ge,P as ve,f as fe,i as A,j as K,k as pe,r as L,v as Y}from"./chunk-SZQV47CU.js";import{a as Le}from"./chunk-PEDG3INQ.js";import"./chunk-XAZLOLJU.js";import{$ as u,$a as V,Ab as Z,Kb as h,Lb as $,Qa as c,Qb as F,R as oe,Ra as s,Rb as T,V as p,W as w,Y as ae,_ as P,a as M,b as x,ba as I,ca as S,da as B,f as ie,fb as z,i as C,ia as le,ja as ue,jb as de,k as ne,kb as U,l as O,mb as he,n as re,ob as W,qa as ce,sb as a,ta as k,tb as o,ub as R,va as q,wb as me,x as se,yb as d}from"./chunk-VPYU7CPH.js";function J(i){i||(le(J),i=u(ce));let r=new ie(e=>i.onDestroy(e.next.bind(e)));return e=>e.pipe(oe(r))}var je=pe({passive:!0}),He=(()=>{class i{constructor(e,t){this._platform=e,this._ngZone=t,this._monitoredElements=new Map}monitor(e){if(!this._platform.isBrowser)return ne;let t=Y(e),n=this._monitoredElements.get(t);if(n)return n.subject;let l=new C,m="cdk-text-field-autofilled",E=f=>{f.animationName==="cdk-text-field-autofill-start"&&!t.classList.contains(m)?(t.classList.add(m),this._ngZone.run(()=>l.next({target:f.target,isAutofilled:!0}))):f.animationName==="cdk-text-field-autofill-end"&&t.classList.contains(m)&&(t.classList.remove(m),this._ngZone.run(()=>l.next({target:f.target,isAutofilled:!1})))};return this._ngZone.runOutsideAngular(()=>{t.addEventListener("animationstart",E,je),t.classList.add("cdk-text-field-autofill-monitored")}),this._monitoredElements.set(t,{subject:l,unlisten:()=>{t.removeEventListener("animationstart",E,je)}}),l}stopMonitoring(e){let t=Y(e),n=this._monitoredElements.get(t);n&&(n.unlisten(),n.subject.complete(),t.classList.remove("cdk-text-field-autofill-monitored"),t.classList.remove("cdk-text-field-autofilled"),this._monitoredElements.delete(t))}ngOnDestroy(){this._monitoredElements.forEach((e,t)=>this.stopMonitoring(t))}static{this.\u0275fac=function(t){return new(t||i)(P(A),P(k))}}static{this.\u0275prov=p({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();var Ne=(()=>{class i{static{this.\u0275fac=function(t){return new(t||i)}}static{this.\u0275mod=S({type:i})}static{this.\u0275inj=w({})}}return i})();var We=new ae("MAT_INPUT_VALUE_ACCESSOR"),Ze=["button","checkbox","file","hidden","image","radio","range","reset","submit"],$e=0,Oe=(()=>{class i{get disabled(){return this._disabled}set disabled(e){this._disabled=L(e),this.focused&&(this.focused=!1,this.stateChanges.next())}get id(){return this._id}set id(e){this._id=e||this._uid}get required(){return this._required??this.ngControl?.control?.hasValidator(_.required)??!1}set required(e){this._required=L(e)}get type(){return this._type}set type(e){this._type=e||"text",this._validateType(),!this._isTextarea&&K().has(this._type)&&(this._elementRef.nativeElement.type=this._type),this._ensureWheelDefaultBehavior()}get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}get value(){return this._inputValueAccessor.value}set value(e){e!==this.value&&(this._inputValueAccessor.value=e,this.stateChanges.next())}get readonly(){return this._readonly}set readonly(e){this._readonly=L(e)}get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}constructor(e,t,n,l,m,E,f,qe,Q,ee){this._elementRef=e,this._platform=t,this.ngControl=n,this._autofillMonitor=qe,this._ngZone=Q,this._formField=ee,this._uid=`mat-input-${$e++}`,this._webkitBlinkWheelListenerAttached=!1,this.focused=!1,this.stateChanges=new C,this.controlType="mat-input",this.autofilled=!1,this._disabled=!1,this._type="text",this._readonly=!1,this._neverEmptyInputTypes=["date","datetime","datetime-local","month","time","week"].filter(N=>K().has(N)),this._iOSKeyupListener=N=>{let g=N.target;!g.value&&g.selectionStart===0&&g.selectionEnd===0&&(g.setSelectionRange(1,1),g.setSelectionRange(0,0))},this._webkitBlinkWheelListener=()=>{};let H=this._elementRef.nativeElement,te=H.nodeName.toLowerCase();this._inputValueAccessor=f||H,this._previousNativeValue=this.value,this.id=this.id,t.IOS&&Q.runOutsideAngular(()=>{e.nativeElement.addEventListener("keyup",this._iOSKeyupListener)}),this._errorStateTracker=new _e(E,n,m,l,this.stateChanges),this._isServer=!this._platform.isBrowser,this._isNativeSelect=te==="select",this._isTextarea=te==="textarea",this._isInFormField=!!ee,this._isNativeSelect&&(this.controlType=H.multiple?"mat-native-select-multiple":"mat-native-select")}ngAfterViewInit(){this._platform.isBrowser&&this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(e=>{this.autofilled=e.isAutofilled,this.stateChanges.next()})}ngOnChanges(){this.stateChanges.next()}ngOnDestroy(){this.stateChanges.complete(),this._platform.isBrowser&&this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement),this._platform.IOS&&this._elementRef.nativeElement.removeEventListener("keyup",this._iOSKeyupListener),this._webkitBlinkWheelListenerAttached&&this._elementRef.nativeElement.removeEventListener("wheel",this._webkitBlinkWheelListener)}ngDoCheck(){this.ngControl&&(this.updateErrorState(),this.ngControl.disabled!==null&&this.ngControl.disabled!==this.disabled&&(this.disabled=this.ngControl.disabled,this.stateChanges.next())),this._dirtyCheckNativeValue(),this._dirtyCheckPlaceholder()}focus(e){this._elementRef.nativeElement.focus(e)}updateErrorState(){this._errorStateTracker.updateErrorState()}_focusChanged(e){e!==this.focused&&(this.focused=e,this.stateChanges.next())}_onInput(){}_dirtyCheckNativeValue(){let e=this._elementRef.nativeElement.value;this._previousNativeValue!==e&&(this._previousNativeValue=e,this.stateChanges.next())}_dirtyCheckPlaceholder(){let e=this._getPlaceholder();if(e!==this._previousPlaceholder){let t=this._elementRef.nativeElement;this._previousPlaceholder=e,e?t.setAttribute("placeholder",e):t.removeAttribute("placeholder")}}_getPlaceholder(){return this.placeholder||null}_validateType(){Ze.indexOf(this._type)>-1}_isNeverEmpty(){return this._neverEmptyInputTypes.indexOf(this._type)>-1}_isBadInput(){let e=this._elementRef.nativeElement.validity;return e&&e.badInput}get empty(){return!this._isNeverEmpty()&&!this._elementRef.nativeElement.value&&!this._isBadInput()&&!this.autofilled}get shouldLabelFloat(){if(this._isNativeSelect){let e=this._elementRef.nativeElement,t=e.options[0];return this.focused||e.multiple||!this.empty||!!(e.selectedIndex>-1&&t&&t.label)}else return this.focused||!this.empty}setDescribedByIds(e){e.length?this._elementRef.nativeElement.setAttribute("aria-describedby",e.join(" ")):this._elementRef.nativeElement.removeAttribute("aria-describedby")}onContainerClick(){this.focused||this.focus()}_isInlineSelect(){let e=this._elementRef.nativeElement;return this._isNativeSelect&&(e.multiple||e.size>1)}_ensureWheelDefaultBehavior(){!this._webkitBlinkWheelListenerAttached&&this._type==="number"&&(this._platform.BLINK||this._platform.WEBKIT)&&(this._ngZone.runOutsideAngular(()=>{this._elementRef.nativeElement.addEventListener("wheel",this._webkitBlinkWheelListener)}),this._webkitBlinkWheelListenerAttached=!0),this._webkitBlinkWheelListenerAttached&&this._type!=="number"&&(this._elementRef.nativeElement.removeEventListener("wheel",this._webkitBlinkWheelListener),this._webkitBlinkWheelListenerAttached=!0)}static{this.\u0275fac=function(t){return new(t||i)(s(q),s(A),s(be,10),s(Me,8),s(Ce,8),s(ge),s(We,10),s(He),s(k),s(Te,8))}}static{this.\u0275dir=B({type:i,selectors:[["input","matInput",""],["textarea","matInput",""],["select","matNativeControl",""],["input","matNativeControl",""],["textarea","matNativeControl",""]],hostAttrs:[1,"mat-mdc-input-element"],hostVars:18,hostBindings:function(t,n){t&1&&d("focus",function(){return n._focusChanged(!0)})("blur",function(){return n._focusChanged(!1)})("input",function(){return n._onInput()}),t&2&&(me("id",n.id)("disabled",n.disabled)("required",n.required),de("name",n.name||null)("readonly",n.readonly&&!n._isNativeSelect||null)("aria-invalid",n.empty&&n.required?null:n.errorState)("aria-required",n.required)("id",n.id),he("mat-input-server",n._isServer)("mat-mdc-form-field-textarea-control",n._isInFormField&&n._isTextarea)("mat-mdc-form-field-input-control",n._isInFormField)("mdc-text-field__input",n._isInFormField)("mat-mdc-native-select-inline",n._isInlineSelect()))},inputs:{disabled:"disabled",id:"id",placeholder:"placeholder",name:"name",required:"required",type:"type",errorStateMatcher:"errorStateMatcher",userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],value:"value",readonly:"readonly"},exportAs:["matInput"],standalone:!0,features:[F([{provide:Fe,useExisting:i}]),ue]})}}return i})(),Pe=(()=>{class i{static{this.\u0275fac=function(t){return new(t||i)}}static{this.\u0275mod=S({type:i})}static{this.\u0275inj=w({imports:[G,v,v,Ne,G]})}}return i})();var D=class i{constructor(){}login(r,e){try{return r==="admin@email.com"&&e==="123"?O([{status:"success",message:"Login realizado com sucesso"}]):re({status:"error",message:"Email ou senha inva\u0301lidos"})}catch{return O([{status:"error",message:"Erro ao tentar fazer o login"}])}}static \u0275fac=function(e){return new(e||i)};static \u0275prov=p({token:i,factory:i.\u0275fac,providedIn:"root"})};var b=class i{router=u(fe);notificationService=u(Le);authService=u(D);constructor(){}login(r,e){r?.invalid||e?.invalid?this.notificationService.error("Email ou senha inva\u0301lidos"):this.authService.login(r?.value,e?.value).subscribe({next:t=>{this.notificationService.success(t.message||"Login realizado com sucesso"),this.router.navigateByUrl("/dashboard/home")},error:t=>{this.notificationService.error(t.message||"Erro ao tentar fazer o login")}})}static \u0275fac=function(e){return new(e||i)};static \u0275prov=p({token:i,factory:i.\u0275fac})};function Ge(i,r){if(i&1&&(a(0,"mat-error"),h(1),o()),i&2){let e,t=Z();c(),$((e=t.errorMessage())==null?null:e.email)}}function Xe(i,r){if(i&1&&(a(0,"mat-error"),h(1),o()),i&2){let e,t=Z();c(),$((e=t.errorMessage())==null?null:e.password)}}var j=class i{email=new X("",[_.required,_.email]);password=new X("",[_.required]);errorMessage=V({});authController=u(b);constructor(){se(this.email.statusChanges,this.email.valueChanges).pipe(J()).subscribe(()=>this.updateErrorMessage())}updateErrorMessage(){this.email.hasError("required")&&this.errorMessage.set(x(M({},this.errorMessage()),{email:"Campo email \xE9 obrigat\xF3rio"})),this.email.hasError("email")&&this.errorMessage.set(x(M({},this.errorMessage()),{email:"Informe um email v\xE1lido!"})),this.password.hasError("required")&&this.errorMessage.set(x(M({},this.errorMessage()),{password:"Campo senha \xE9 obrigat\xF3rio"})),this.password.valid&&this.email.valid&&this.errorMessage.set({})}login(){this.authController.login(this.email,this.password)}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=I({type:i,selectors:[["app-login"]],standalone:!0,features:[F([b]),T],decls:16,vars:4,consts:[[1,"container"],["matInput","","placeholder","Digite seu email","required","",3,"blur","formControl"],["matInput","","placeholder","Digite sua senha","required","",3,"blur","formControl"],["type","submit","mat-flat-button","","color","primary",3,"click"]],template:function(e,t){e&1&&(a(0,"div",0),R(1,"app-notification"),a(2,"h3"),h(3,"Entrar no sistema"),o(),a(4,"mat-form-field")(5,"mat-label"),h(6,"Email"),o(),a(7,"input",1),d("blur",function(){return t.updateErrorMessage()}),o(),z(8,Ge,2,1,"mat-error"),o(),a(9,"mat-form-field")(10,"mat-label"),h(11,"Senha"),o(),a(12,"input",2),d("blur",function(){return t.updateErrorMessage()}),o(),z(13,Xe,2,1,"mat-error"),o(),a(14,"button",3),d("click",function(){return t.login()}),h(15,"Entrar"),o()()),e&2&&(c(7),U("formControl",t.email),c(),W(t.email.invalid?8:-1),c(4),U("formControl",t.password),c(),W(t.password.invalid?13:-1))},dependencies:[Ie,ye,Ee,we,v,Ae,ke,Re,Se,xe,Pe,Oe,ve,De],styles:["[_nghost-%COMP%]{display:flex;align-items:center;justify-content:center;min-height:100vh}.container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center}.container[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:100%;margin-bottom:24px}"]})};var Be=class i{static \u0275fac=function(e){return new(e||i)};static \u0275cmp=I({type:i,selectors:[["app-home-page"]],standalone:!0,features:[T],decls:1,vars:0,template:function(e,t){e&1&&R(0,"app-login")},dependencies:[j],encapsulation:2})};export{Be as AuthPageComponent};
