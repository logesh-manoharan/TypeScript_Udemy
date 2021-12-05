"use strict";
// ABSTARCT CLASSES
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Why?
//  If one particular method should present in all the CHILD CLASSES.
//  If one particular property should instantiated in all the CHILD CLASSES.
// Syntax Info: To define the method as ABSTARCT we should define the class as ABSTRACT
// We can't able to INSTANTIATE the ABSTRACT Classes
var EmployeeClass = /** @class */ (function () {
    function EmployeeClass(employeeID, employeeNAME) {
        this.employeeId = employeeID;
        this.employeeName = employeeNAME;
    }
    return EmployeeClass;
}());
var Fulltime = /** @class */ (function (_super) {
    __extends(Fulltime, _super);
    function Fulltime() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.employeeAge = 21;
        return _this;
    }
    Fulltime.prototype.printEmployee = function () {
        console.log("\n\nFULL TIME \n");
        console.log("Employee ID : " + this.employeeId + "\nEmployee Name : " + this.employeeName + "\nEmployee Age : " + this.employeeAge);
    };
    return Fulltime;
}(EmployeeClass));
var Parttime = /** @class */ (function (_super) {
    __extends(Parttime, _super);
    function Parttime() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.employeeAge = 22;
        return _this;
    }
    Parttime.prototype.printEmployee = function () {
        console.log("\n\nPART TIME \n");
        console.log("Employee ID : " + this.employeeId + "\nEmployee Name : " + this.employeeName + "\nEmployee Age : " + this.employeeAge);
    };
    return Parttime;
}(EmployeeClass));
var fulltimeEmployee = new Fulltime(1, "Logesh");
var parttimeEmployee = new Parttime(2, "Selva");
fulltimeEmployee.printEmployee();
parttimeEmployee.printEmployee();
