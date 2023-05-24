"use strict";(self.webpackChunktay_training_frontend=self.webpackChunktay_training_frontend||[]).push([[402],{5208:(T,d,r)=>{r.d(d,{F:()=>h});class h{constructor(a){this.value=a.value||"",this.label=a.label||"",this.selectOptions=a.selectOptions||[],this.config={name:a.config?.name||"",type:a.config?.type||"text",placeholder:a.config?.placeholder||"",hint:a.config?.hint||"",required:a.config?.required||!1,disabled:a.config?.disabled||!1,readonly:a.config?.readonly||!1,email:a.config?.email||!1,maxlength:a.config?.maxlength||9999999999,minlength:a.config?.minlength||0,pattern:a.config?.pattern||"",mask:a.config?.mask||!1,customValidators:a.config?.customValidators||{},maskConfig:a.config?.maskConfig||{},autocompleteConfig:a.config?.autocompleteConfig||{},dateConfig:a.config?.dateConfig||{},errors:a.config?.errors||{}}}}},5535:(T,d,r)=>{r.d(d,{L:()=>a});var h=r(5861),f=r(1135);class a{constructor(i,e,m,c){this.router=i,this.service=e,this.loadingService=c,this.filterChange$=new f.X(""),this.title=m.title||"Master Details Example",this.targetFilters=m.targetFilters||["Nome","Email","Telefone","CPF"],this.columns=m.columns||[{name:"id",title:"ID"},{name:"name",title:"Name"}],this.path=m.path||"/master-details"}add(){this.router.navigate([this.path,"new"])}changeFilter(i){this.filterChange$.next(i.target.value||"")}edit(i){console.log("edit row",i),this.router.navigate([this.path,i.id])}delete(i){var e=this;return(0,h.Z)(function*(){e.loadingService.activeLoading(),console.log("delete row",i),yield e.service.delete(i.id)})()}changeTable(i){console.log("changeTable",i)}}},136:(T,d,r)=>{r.d(d,{W:()=>V});var h=r(5017),f=r(3900),a=r(262),v=r(8505),i=r(4004),e=r(6451),m=r(9646);class c extends h.o2{constructor(s,n,l,g,p){super(),this.service=s,this.filter$=n,this.utilsService=l,this.loadingService=g,this.functionName=p,this.data=[],this.hasErrorOnLoad=!1,this.atualPagination=this.utilsService.createPaginationConfig(this.paginator,this.sort,"")}connect(){if(this.paginator&&this.sort)return(0,e.T)((0,m.of)(this.data),this.paginator.page,this.sort.sortChange,this.filter$).pipe((0,f.w)(s=>this.getPagedData().pipe((0,a.K)(()=>(this.hasErrorOnLoad=!0,(0,m.of)({items:[],total:0}))))),(0,v.b)(s=>{this.paginator.length=s.count,this.paginator.pageIndex=Math.floor(this.atualPagination.skip/this.atualPagination.take),this.paginator.pageSize=this.atualPagination.take}),(0,i.U)(s=>({items:s.data,total:s.count})),(0,i.U)(s=>(this.loadingService.deactiveLoading(),s.items)));throw Error("Please set the paginator and sort on the data source before connecting.")}disconnect(){}getPagedData(){return setTimeout(()=>{this.loadingService.activeLoading(),this.hasErrorOnLoad=!1},20),this.filter$.pipe((0,f.w)(s=>(this.atualPagination=this.utilsService.createPaginationConfig(this.paginator,this.sort,s),this.service[this.functionName||"getByFilter"](this.atualPagination))))}}var t=r(4650),_=r(8739),x=r(6308),u=r(3626),b=r(1135),S=r(8372),$=r(8270),D=r(4471),M=r(6895),E=r(4859),w=r(7392),y=r(1572);function O(o,s){1&o&&t._UZ(0,"mat-spinner")}function U(o,s){if(1&o&&(t.TgZ(0,"div",11),t.YNc(1,O,1,0,"mat-spinner",12),t.qZA()),2&o){const n=t.oxw();t.xp6(1),t.Q6J("ngIf",n.loadingService.loading)}}function Z(o,s){if(1&o&&(t.TgZ(0,"th",16),t._uU(1),t.qZA()),2&o){const n=t.oxw().$implicit;t.xp6(1),t.hij(" ",n.title," ")}}function N(o,s){if(1&o&&(t.TgZ(0,"td",17),t._uU(1),t.qZA()),2&o){const n=s.$implicit,l=t.oxw().$implicit;t.xp6(1),t.Oqu(n[l.name])}}function A(o,s){1&o&&(t.ynx(0,13),t.YNc(1,Z,2,1,"th",14),t.YNc(2,N,2,1,"td",15),t.BQk()),2&o&&t.Q6J("matColumnDef",s.$implicit.name)}function I(o,s){1&o&&t._UZ(0,"th",18)}function P(o,s){if(1&o){const n=t.EpF();t.TgZ(0,"button",21),t.NdJ("click",function(){const p=t.CHM(n).$implicit,C=t.oxw().$implicit,J=t.oxw();return t.KtG(J.customIcon(p.name,C))}),t.TgZ(1,"mat-icon"),t._uU(2),t.qZA()()}if(2&o){const n=s.$implicit;t.xp6(2),t.Oqu(n.icon)}}function F(o,s){if(1&o){const n=t.EpF();t.TgZ(0,"td",19),t.YNc(1,P,3,1,"button",20),t.TgZ(2,"button",21),t.NdJ("click",function(){const p=t.CHM(n).$implicit,C=t.oxw();return t.KtG(C.edit(p))}),t.TgZ(3,"mat-icon"),t._uU(4,"edit"),t.qZA()(),t.TgZ(5,"button",21),t.NdJ("click",function(){const p=t.CHM(n).$implicit,C=t.oxw();return t.KtG(C.delete(p))}),t.TgZ(6,"mat-icon"),t._uU(7,"delete"),t.qZA()()()}if(2&o){const n=t.oxw();t.xp6(1),t.Q6J("ngForOf",n.customActionButtons)}}function Y(o,s){1&o&&t._UZ(0,"tr",22)}function B(o,s){1&o&&t._UZ(0,"tr",23)}const R=function(){return[5,10,20]};let V=(()=>{class o{constructor(n,l){this.utilsService=n,this.loadingService=l,this.columns=[],this.filterChange$=new b.X(""),this.filterChangeToDataSource$=new b.X(""),this.functionName="getAll",this.customActionButtons=[],this.edit$=new t.vpe,this.delete$=new t.vpe,this.customIcon$=new t.vpe,this.changeTable$=new t.vpe,this.itemColumns=[],this.displayedColumns=[],this.filterValue=""}createColumns(){console.log(this.columns),this.itemColumns=JSON.parse(JSON.stringify(this.columns)),this.columns.push({name:"actions",title:"Actions"}),this.displayedColumns=this.columns.map(n=>n.name),console.log(this.displayedColumns)}ngOnInit(){this.createColumns(),this.dataSource=new c(this.service,this.filterChangeToDataSource$.pipe((0,S.b)(200)),this.utilsService,this.loadingService,this.functionName)}ngAfterViewInit(){this.filterChange$.pipe((0,S.b)(500)).subscribe(n=>{this.filterValue=n,this.filterChangeToDataSource$.next(n)}),this.dataSource.sort=this.sort,this.dataSource.paginator=this.paginator,this.table.dataSource=this.dataSource}edit(n){this.edit$.emit(n)}delete(n){this.delete$.emit(n),setTimeout(()=>{this.filterChangeToDataSource$.next(this.filterValue),this.loadingService.deactiveLoading()},500)}customIcon(n,l){this.customIcon$.emit({name:n,row:l})}}return o.\u0275fac=function(n){return new(n||o)(t.Y36($.F),t.Y36(D.b))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-master-table"]],viewQuery:function(n,l){if(1&n&&(t.Gf(_.NW,5),t.Gf(x.YE,5),t.Gf(u.BZ,5)),2&n){let g;t.iGM(g=t.CRH())&&(l.paginator=g.first),t.iGM(g=t.CRH())&&(l.sort=g.first),t.iGM(g=t.CRH())&&(l.table=g.first)}},inputs:{columns:"columns",filterChange$:"filterChange$",service:"service",functionName:"functionName",customActionButtons:"customActionButtons"},outputs:{edit$:"edit$",delete$:"delete$",customIcon$:"customIcon$",changeTable$:"changeTable$"},decls:11,vars:9,consts:[[1,"mat-elevation-z8","full-width-table"],["class","loading-shade",4,"ngIf"],["mat-table","","matSort","","aria-label","Elements",1,"full-width-table"],[3,"matColumnDef",4,"ngFor","ngForOf"],["matColumnDef","actions"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","","class","actions",4,"matCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["aria-label","Select page",3,"length","pageIndex","pageSize","pageSizeOptions"],["paginator",""],[1,"loading-shade"],[4,"ngIf"],[3,"matColumnDef"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["mat-header-cell",""],["mat-cell","",1,"actions"],["mat-icon-button","",3,"click",4,"ngFor","ngForOf"],["mat-icon-button","",3,"click"],["mat-header-row",""],["mat-row",""]],template:function(n,l){1&n&&(t.TgZ(0,"div",0),t.YNc(1,U,2,1,"div",1),t.TgZ(2,"table",2),t.YNc(3,A,3,1,"ng-container",3),t.ynx(4,4),t.YNc(5,I,1,0,"th",5),t.YNc(6,F,8,1,"td",6),t.BQk(),t.YNc(7,Y,1,0,"tr",7),t.YNc(8,B,1,0,"tr",8),t.qZA(),t._UZ(9,"mat-paginator",9,10),t.qZA()),2&n&&(t.xp6(1),t.Q6J("ngIf",l.loadingService.loading),t.xp6(2),t.Q6J("ngForOf",l.itemColumns),t.xp6(4),t.Q6J("matHeaderRowDef",l.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",l.displayedColumns),t.xp6(1),t.Q6J("length",l.dataSource.data.length||0)("pageIndex",0)("pageSize",10)("pageSizeOptions",t.DdM(8,R)))},dependencies:[M.sg,M.O5,E.RK,w.Hw,_.NW,y.Ou,x.YE,x.nU,u.BZ,u.fO,u.as,u.w1,u.Dz,u.nj,u.ge,u.ev,u.XQ,u.Gk],styles:["[_nghost-%COMP%]{width:80%;min-width:250px;margin:1.5em 0}.full-width-table[_ngcontent-%COMP%]{width:100%;position:relative;min-height:100px}.actions[_ngcontent-%COMP%]{width:180px}"]}),o})()},9119:(T,d,r)=>{r.d(d,{v:()=>v});var h=r(4006),a=r(4650);let v=(()=>{class i{validate(m){return(i=>null==i.value||""===i.value||/^(ftp|http|https):\/\/[^ "]+$/.test(i.value)?null:{invalidUrl:!0})(m)}}return i.\u0275fac=function(m){return new(m||i)},i.\u0275dir=a.lG2({type:i,selectors:[["","v-url-validator",""]],inputs:{hasActive:["v-url-validator","hasActive"]},features:[a._Bn([{provide:h.Cf,useExisting:i,multi:!0}])]}),i})()},8270:(T,d,r)=>{r.d(d,{F:()=>f});var h=r(4650);let f=(()=>{class a{constructor(){}createPaginationConfig(i,e,m){const c={};return i?(c.take=i.pageSize,c.skip=i.pageIndex*i.pageSize):(c.take=10,c.skip=0),e?(c.order=e.direction?e.direction.toUpperCase():"ASC",c.orderColumn=e.active?e.active:"id"):(c.order="ASC",c.orderColumn="id"),c.filter=m||"",c}getErrorText(i,e){return i&&i.control.get(e.config.name)?e.config.required&&i.control.get(e.config.name).hasError("required")&&e.config.errors.required?e.config.errors.required:e.config.minlength&&i.control.get(e.config.name).hasError("minlength")&&e.config.errors.minlength?e.config.errors.minlength:e.config.maxlength&&i.control.get(e.config.name).hasError("maxlength")&&e.config.errors.maxlength?e.config.errors.maxlength:e.config.email&&i.control.get(e.config.name).hasError("email")&&e.config.errors.email?e.config.errors.email:e.config.pattern&&i.control.get(e.config.name).hasError("pattern")&&e.config.errors.pattern?e.config.errors.pattern:e.config.mask&&i.control.get(e.config.name).hasError("mask")&&e.config.errors.mask?e.config.errors.mask:e.config.customValidators.cpfValidator&&i.control.get(e.config.name).hasError("invalidCpf")&&e.config.errors.invalidCpf?e.config.errors.invalidCpf:e.config.customValidators.urlValidator&&i.control.get(e.config.name).hasError("invalidUrl")&&e.config.errors.invalidUrl?e.config.errors.invalidUrl:"":""}}return a.\u0275fac=function(i){return new(i||a)},a.\u0275prov=h.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"}),a})()}}]);