"use strict";
(self["webpackChunktay_training_frontend"] = self["webpackChunktay_training_frontend"] || []).push([["common"],{

/***/ 5251:
/*!**************************************************!*\
  !*** ./src/app/services/exercise-set.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExerciseSetService": () => (/* binding */ ExerciseSetService)
/* harmony export */ });
/* harmony import */ var _base_model_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-model.service */ 7594);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 8987);



class ExerciseSetService extends _base_model_service__WEBPACK_IMPORTED_MODULE_0__.BaseModelService {
  constructor(http) {
    super('/exercise-groups', http);
  }
}
ExerciseSetService.ɵfac = function ExerciseSetService_Factory(t) {
  return new (t || ExerciseSetService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
};
ExerciseSetService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: ExerciseSetService,
  factory: ExerciseSetService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 8718:
/*!***********************************************!*\
  !*** ./src/app/services/exercises.service.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExercisesService": () => (/* binding */ ExercisesService)
/* harmony export */ });
/* harmony import */ var _base_model_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-model.service */ 7594);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 8987);



class ExercisesService extends _base_model_service__WEBPACK_IMPORTED_MODULE_0__.BaseModelService {
  constructor(http) {
    super('/exercises', http);
  }
}
ExercisesService.ɵfac = function ExercisesService_Factory(t) {
  return new (t || ExercisesService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
};
ExercisesService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: ExercisesService,
  factory: ExercisesService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 5812:
/*!*********************************************!*\
  !*** ./src/app/services/methods.service.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MethodsService": () => (/* binding */ MethodsService)
/* harmony export */ });
/* harmony import */ var _base_model_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-model.service */ 7594);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 8987);



class MethodsService extends _base_model_service__WEBPACK_IMPORTED_MODULE_0__.BaseModelService {
  constructor(http) {
    super('/methods', http);
  }
}
MethodsService.ɵfac = function MethodsService_Factory(t) {
  return new (t || MethodsService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
};
MethodsService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: MethodsService,
  factory: MethodsService.ɵfac,
  providedIn: 'root'
});

/***/ })

}]);
//# sourceMappingURL=common.js.map