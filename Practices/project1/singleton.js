"use strict";
// SINGLETON CLASS - Developer can create ONLY ONE Instance for that particular CLASS
// To create SINGLETON CLASS constructor should be PRIVATE. So, we can't able to create
// ...object from outside the CLASS.
var Employee = /** @class */ (function () {
    function Employee(employeeID, employeeNAME) {
        this.employeeId = employeeID;
        this.employeeName = employeeNAME;
    }
    // create instance only by using the below method
    Employee.getInstance = function () {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new Employee(1, "Logesh");
        return this.instance;
    };
    return Employee;
}());
// if we try to create 3 different INSTANCE. It will always returns the SAME Object
var emp1 = Employee.getInstance();
var emp2 = Employee.getInstance();
var emp3 = Employee.getInstance();
console.log("Employee 1: " + JSON.stringify(emp1) + "\nEmployee 2: " + JSON.stringify(emp2) + "\nEmployee 3: " + JSON.stringify(emp3));
