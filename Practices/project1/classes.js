"use strict";
class Department {
    // 'readonly' (property only in TypeScript) we can't able to assign any value once the value is initialsed
    // defining constructor 
    constructor(id, departmentName) {
        this.id = id;
        this.departmentName = departmentName;
    }
    describe() {
        console.log("\nId : " + this.id + "\nDepartment Name : " + this.departmentName);
    }
}
// Inheritance
class ITDepartment extends Department {
    constructor(id, admins) {
        // super() - to call the constructor of the 'parent' class
        // CONDITION - we should call the super() before assigning the value to the CURRENT CLASS's Property
        super(id, "IT");
        this.admins = admins;
    }
    static createCourse(courseName) {
        return { corsename: courseName };
    }
}
ITDepartment.courses = "C++, JAVA, DBMS";
class AccountingDepartment extends Department {
    constructor(id, reports) {
        super(id, "Accounting Dept");
        this.reports = reports;
    }
    addReport(report) {
        this.reports.push(report);
    }
    printReports() {
        console.log("Reports : " + this.reports);
    }
    // GETTERS & SETTERS
    get getAllReports() {
        return this.reports;
    }
    set setAllReports(reports) {
        this.reports = reports;
    }
}
const it = new ITDepartment(1, ["Logesh", "Kaala"]);
it.describe();
const accounts = new AccountingDepartment(2, ["Problem detected...", "Warning arised..."]);
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
