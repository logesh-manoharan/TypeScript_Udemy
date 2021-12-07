"use strict";
// ABSTARCT CLASSES
// Why?
//  If one particular method should present in all the CHILD CLASSES.
//  If one particular property should instantiated in all the CHILD CLASSES.
// Syntax Info: To define the method as ABSTARCT we should define the class as ABSTRACT
// We can't able to INSTANTIATE the ABSTRACT Classes
class EmployeeClass {
    constructor(employeeID, employeeNAME) {
        this.employeeId = employeeID;
        this.employeeName = employeeNAME;
    }
}
class Fulltime extends EmployeeClass {
    constructor() {
        super(...arguments);
        this.employeeAge = 21;
    }
    printEmployee() {
        console.log("\n\nFULL TIME \n");
        console.log("Employee ID : " + this.employeeId + "\nEmployee Name : " + this.employeeName + "\nEmployee Age : " + this.employeeAge);
    }
}
class Parttime extends EmployeeClass {
    constructor() {
        super(...arguments);
        this.employeeAge = 22;
    }
    printEmployee() {
        console.log("\n\nPART TIME \n");
        console.log("Employee ID : " + this.employeeId + "\nEmployee Name : " + this.employeeName + "\nEmployee Age : " + this.employeeAge);
    }
}
const fulltimeEmployee = new Fulltime(1, "Logesh");
const parttimeEmployee = new Parttime(2, "Selva");
fulltimeEmployee.printEmployee();
parttimeEmployee.printEmployee();
