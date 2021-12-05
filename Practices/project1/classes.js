"use strict";
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
var Department = /** @class */ (function () {
    // 'readonly' (property only in TypeScript) we can't able to assign any value once the value is initialsed
    // defining constructor 
    function Department(id, departmentName) {
        this.id = id;
        this.departmentName = departmentName;
    }
    Department.prototype.describe = function () {
        console.log("\nId : " + this.id + "\nDepartment Name : " + this.departmentName);
    };
    return Department;
}());
// Inheritance
var ITDepartment = /** @class */ (function (_super) {
    __extends(ITDepartment, _super);
    function ITDepartment(id, admins) {
        var _this = 
        // super() - to call the constructor of the 'parent' class
        // CONDITION - we should call the super() before assigning the value to the CURRENT CLASS's Property
        _super.call(this, id, "IT") || this;
        _this.admins = admins;
        return _this;
    }
    ITDepartment.createCourse = function (courseName) {
        return { corsename: courseName };
    };
    ITDepartment.courses = "C++, JAVA, DBMS";
    return ITDepartment;
}(Department));
var AccountingDepartment = /** @class */ (function (_super) {
    __extends(AccountingDepartment, _super);
    function AccountingDepartment(id, reports) {
        var _this = _super.call(this, id, "Accounting Dept") || this;
        _this.reports = reports;
        return _this;
    }
    AccountingDepartment.prototype.addReport = function (report) {
        this.reports.push(report);
    };
    AccountingDepartment.prototype.printReports = function () {
        console.log("Reports : " + this.reports);
    };
    Object.defineProperty(AccountingDepartment.prototype, "getAllReports", {
        // GETTERS & SETTERS
        get: function () {
            return this.reports;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AccountingDepartment.prototype, "setAllReports", {
        set: function (reports) {
            this.reports = reports;
        },
        enumerable: false,
        configurable: true
    });
    return AccountingDepartment;
}(Department));
var it = new ITDepartment(1, ["Logesh", "Kaala"]);
it.describe();
var accounts = new AccountingDepartment(2, ["Problem detected...", "Warning arised..."]);
accounts.addReport("Error arised...");
accounts.printReports();
// here we should not call the GETTERS or SETTERS as a FUNCTION with '()'
accounts.setAllReports = ["New Reports", "Tax Report"];
console.log(accounts.getAllReports);
// STATIC Properties & methods
// We can access the Properties and Methods of the classes without creating the
// ...instances.
// So, we can
// we can't able to access the STATIC Properties inside the 'Methods which is defined inside the CLASSES'
console.log("\n\nSTATIC Properties AND Methods\n");
console.log(ITDepartment.courses);
console.log(ITDepartment.createCourse("Computer Networks"));
