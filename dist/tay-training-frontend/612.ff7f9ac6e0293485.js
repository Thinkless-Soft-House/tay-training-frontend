"use strict";(self.webpackChunktay_training_frontend=self.webpackChunktay_training_frontend||[]).push([[612],{5208:(_,u,a)=>{a.d(u,{F:()=>f});class f{constructor(s){this.value=s.value||"",this.label=s.label||"",this.selectOptions=s.selectOptions||[],this.config={name:s.config?.name||"",type:s.config?.type||"text",placeholder:s.config?.placeholder||"",hint:s.config?.hint||"",required:s.config?.required||!1,disabled:s.config?.disabled||!1,readonly:s.config?.readonly||!1,email:s.config?.email||!1,maxlength:s.config?.maxlength||9999999999,minlength:s.config?.minlength||0,pattern:s.config?.pattern||"",mask:s.config?.mask||!1,customValidators:s.config?.customValidators||{},maskConfig:s.config?.maskConfig||{},autocompleteConfig:s.config?.autocompleteConfig||{},dateConfig:s.config?.dateConfig||{},errors:s.config?.errors||{}}}}},5535:(_,u,a)=>{a.d(u,{L:()=>s});var f=a(5861),d=a(1135);class s{constructor(n,e,m,c){this.router=n,this.service=e,this.loadingService=c,this.filterChange$=new d.X(""),this.title=m.title||"Master Details Example",this.targetFilters=m.targetFilters||["Nome","Email","Telefone","CPF"],this.columns=m.columns||[{name:"id",title:"ID"},{name:"name",title:"Name"}],this.path=m.path||"/master-details"}add(){this.router.navigate([this.path,"new"])}changeFilter(n){this.filterChange$.next(n.target.value||"")}edit(n){console.log("edit row",n),this.router.navigate([this.path,n.id])}delete(n){var e=this;return(0,f.Z)(function*(){e.loadingService.activeLoading(),console.log("delete row",n),yield e.service.delete(n.id)})()}changeTable(n){console.log("changeTable",n)}}},136:(_,u,a)=>{a.d(u,{W:()=>R});var f=a(5017),d=a(3900),s=a(262),v=a(8505),n=a(4004),e=a(6451),m=a(9646);class c extends f.o2{constructor(r,i,l,h,p){super(),this.service=r,this.filter$=i,this.utilsService=l,this.loadingService=h,this.functionName=p,this.data=[],this.hasErrorOnLoad=!1,this.atualPagination=this.utilsService.createPaginationConfig(this.paginator,this.sort,"")}connect(){if(this.paginator&&this.sort)return(0,e.T)((0,m.of)(this.data),this.paginator.page,this.sort.sortChange,this.filter$).pipe((0,d.w)(r=>this.getPagedData().pipe((0,s.K)(()=>(this.hasErrorOnLoad=!0,(0,m.of)({items:[],total:0}))))),(0,v.b)(r=>{this.paginator.length=r.count,this.paginator.pageIndex=Math.floor(this.atualPagination.skip/this.atualPagination.take),this.paginator.pageSize=this.atualPagination.take}),(0,n.U)(r=>({items:r.data,total:r.count})),(0,n.U)(r=>(this.loadingService.deactiveLoading(),r.items)));throw Error("Please set the paginator and sort on the data source before connecting.")}disconnect(){}getPagedData(){return setTimeout(()=>{this.loadingService.activeLoading(),this.hasErrorOnLoad=!1},20),this.filter$.pipe((0,d.w)(r=>(this.atualPagination=this.utilsService.createPaginationConfig(this.paginator,this.sort,r),this.service[this.functionName||"getByFilter"](this.atualPagination))))}}var t=a(4650),x=a(8739),T=a(6308),g=a(3626),M=a(1135),b=a(8372),E=a(8270),$=a(4471),S=a(6895),D=a(4859),O=a(7392),w=a(1572);function y(o,r){1&o&&t._UZ(0,"mat-spinner")}function P(o,r){if(1&o&&(t.TgZ(0,"div",11),t.YNc(1,y,1,0,"mat-spinner",12),t.qZA()),2&o){const i=t.oxw();t.xp6(1),t.Q6J("ngIf",i.loadingService.loading)}}function Z(o,r){if(1&o&&(t.TgZ(0,"th",16),t._uU(1),t.qZA()),2&o){const i=t.oxw().$implicit;t.xp6(1),t.hij(" ",i.title," ")}}function U(o,r){if(1&o&&(t.TgZ(0,"td",17),t._uU(1),t.qZA()),2&o){const i=r.$implicit,l=t.oxw().$implicit;t.xp6(1),t.Oqu(i[l.name])}}function I(o,r){1&o&&(t.ynx(0,13),t.YNc(1,Z,2,1,"th",14),t.YNc(2,U,2,1,"td",15),t.BQk()),2&o&&t.Q6J("matColumnDef",r.$implicit.name)}function N(o,r){1&o&&t._UZ(0,"th",18)}function A(o,r){if(1&o){const i=t.EpF();t.TgZ(0,"button",21),t.NdJ("click",function(){const p=t.CHM(i).$implicit,C=t.oxw().$implicit,J=t.oxw();return t.KtG(J.customIcon(p.name,C))}),t.TgZ(1,"mat-icon"),t._uU(2),t.qZA()()}if(2&o){const i=r.$implicit;t.xp6(2),t.Oqu(i.icon)}}function F(o,r){if(1&o){const i=t.EpF();t.TgZ(0,"td",19),t.YNc(1,A,3,1,"button",20),t.TgZ(2,"button",21),t.NdJ("click",function(){const p=t.CHM(i).$implicit,C=t.oxw();return t.KtG(C.edit(p))}),t.TgZ(3,"mat-icon"),t._uU(4,"edit"),t.qZA()(),t.TgZ(5,"button",21),t.NdJ("click",function(){const p=t.CHM(i).$implicit,C=t.oxw();return t.KtG(C.delete(p))}),t.TgZ(6,"mat-icon"),t._uU(7,"delete"),t.qZA()()()}if(2&o){const i=t.oxw();t.xp6(1),t.Q6J("ngForOf",i.customActionButtons)}}function B(o,r){1&o&&t._UZ(0,"tr",22)}function Y(o,r){1&o&&t._UZ(0,"tr",23)}const L=function(){return[5,10,20]};let R=(()=>{class o{constructor(i,l){this.utilsService=i,this.loadingService=l,this.columns=[],this.filterChange$=new M.X(""),this.filterChangeToDataSource$=new M.X(""),this.functionName="getAll",this.customActionButtons=[],this.edit$=new t.vpe,this.delete$=new t.vpe,this.customIcon$=new t.vpe,this.changeTable$=new t.vpe,this.itemColumns=[],this.displayedColumns=[],this.filterValue=""}createColumns(){console.log(this.columns),this.itemColumns=JSON.parse(JSON.stringify(this.columns)),this.columns.push({name:"actions",title:"Actions"}),this.displayedColumns=this.columns.map(i=>i.name),console.log(this.displayedColumns)}ngOnInit(){this.createColumns(),this.dataSource=new c(this.service,this.filterChangeToDataSource$.pipe((0,b.b)(200)),this.utilsService,this.loadingService,this.functionName)}ngAfterViewInit(){this.filterChange$.pipe((0,b.b)(500)).subscribe(i=>{this.filterValue=i,this.filterChangeToDataSource$.next(i)}),this.dataSource.sort=this.sort,this.dataSource.paginator=this.paginator,this.table.dataSource=this.dataSource}edit(i){this.edit$.emit(i)}delete(i){this.delete$.emit(i),setTimeout(()=>{this.filterChangeToDataSource$.next(this.filterValue),this.loadingService.deactiveLoading()},500)}customIcon(i,l){this.customIcon$.emit({name:i,row:l})}}return o.\u0275fac=function(i){return new(i||o)(t.Y36(E.F),t.Y36($.b))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-master-table"]],viewQuery:function(i,l){if(1&i&&(t.Gf(x.NW,5),t.Gf(T.YE,5),t.Gf(g.BZ,5)),2&i){let h;t.iGM(h=t.CRH())&&(l.paginator=h.first),t.iGM(h=t.CRH())&&(l.sort=h.first),t.iGM(h=t.CRH())&&(l.table=h.first)}},inputs:{columns:"columns",filterChange$:"filterChange$",service:"service",functionName:"functionName",customActionButtons:"customActionButtons"},outputs:{edit$:"edit$",delete$:"delete$",customIcon$:"customIcon$",changeTable$:"changeTable$"},decls:11,vars:9,consts:[[1,"mat-elevation-z8","full-width-table"],["class","loading-shade",4,"ngIf"],["mat-table","","matSort","","aria-label","Elements",1,"full-width-table"],[3,"matColumnDef",4,"ngFor","ngForOf"],["matColumnDef","actions"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","","class","actions",4,"matCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["aria-label","Select page",3,"length","pageIndex","pageSize","pageSizeOptions"],["paginator",""],[1,"loading-shade"],[4,"ngIf"],[3,"matColumnDef"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["mat-header-cell",""],["mat-cell","",1,"actions"],["mat-icon-button","",3,"click",4,"ngFor","ngForOf"],["mat-icon-button","",3,"click"],["mat-header-row",""],["mat-row",""]],template:function(i,l){1&i&&(t.TgZ(0,"div",0),t.YNc(1,P,2,1,"div",1),t.TgZ(2,"table",2),t.YNc(3,I,3,1,"ng-container",3),t.ynx(4,4),t.YNc(5,N,1,0,"th",5),t.YNc(6,F,8,1,"td",6),t.BQk(),t.YNc(7,B,1,0,"tr",7),t.YNc(8,Y,1,0,"tr",8),t.qZA(),t._UZ(9,"mat-paginator",9,10),t.qZA()),2&i&&(t.xp6(1),t.Q6J("ngIf",l.loadingService.loading),t.xp6(2),t.Q6J("ngForOf",l.itemColumns),t.xp6(4),t.Q6J("matHeaderRowDef",l.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",l.displayedColumns),t.xp6(1),t.Q6J("length",l.dataSource.data.length||0)("pageIndex",0)("pageSize",10)("pageSizeOptions",t.DdM(8,L)))},dependencies:[S.sg,S.O5,D.RK,O.Hw,x.NW,w.Ou,T.YE,T.nU,g.BZ,g.fO,g.as,g.w1,g.Dz,g.nj,g.ge,g.ev,g.XQ,g.Gk],styles:["[_nghost-%COMP%]{width:80%;min-width:250px;margin:1.5em 0}.full-width-table[_ngcontent-%COMP%]{width:100%;position:relative;min-height:100px}.actions[_ngcontent-%COMP%]{width:180px}"]}),o})()},5812:(_,u,a)=>{a.d(u,{O:()=>v});var f=a(4306),d=a(4650),s=a(529);let v=(()=>{class n extends f.u{constructor(m){super("/methods",m)}}return n.\u0275fac=function(m){return new(m||n)(d.LFG(s.eN))},n.\u0275prov=d.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})()},8270:(_,u,a)=>{a.d(u,{F:()=>d});var f=a(4650);let d=(()=>{class s{constructor(){}createPaginationConfig(n,e,m){const c={};return n?(c.take=n.pageSize,c.skip=n.pageIndex*n.pageSize):(c.take=10,c.skip=0),e?(c.order=e.direction?e.direction.toUpperCase():"ASC",c.orderColumn=e.active?e.active:"id"):(c.order="ASC",c.orderColumn="id"),c.filter=m||"",c}getErrorText(n,e){return n&&n.control.get(e.config.name)?e.config.required&&n.control.get(e.config.name).hasError("required")&&e.config.errors.required?e.config.errors.required:e.config.minlength&&n.control.get(e.config.name).hasError("minlength")&&e.config.errors.minlength?e.config.errors.minlength:e.config.maxlength&&n.control.get(e.config.name).hasError("maxlength")&&e.config.errors.maxlength?e.config.errors.maxlength:e.config.email&&n.control.get(e.config.name).hasError("email")&&e.config.errors.email?e.config.errors.email:e.config.pattern&&n.control.get(e.config.name).hasError("pattern")&&e.config.errors.pattern?e.config.errors.pattern:e.config.mask&&n.control.get(e.config.name).hasError("mask")&&e.config.errors.mask?e.config.errors.mask:e.config.customValidators.cpfValidator&&n.control.get(e.config.name).hasError("invalidCpf")&&e.config.errors.invalidCpf?e.config.errors.invalidCpf:e.config.customValidators.urlValidator&&n.control.get(e.config.name).hasError("invalidUrl")&&e.config.errors.invalidUrl?e.config.errors.invalidUrl:"":""}}return s.\u0275fac=function(n){return new(n||s)},s.\u0275prov=f.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})()}}]);