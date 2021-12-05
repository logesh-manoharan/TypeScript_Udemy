class Department {
    private readonly id: number;
    public departmentName: string;

    // 'readonly' (property only in TypeScript) we can't able to assign any value once the value is initialsed

    // defining constructor 
    constructor (id: number, departmentName: string) {
        this.id = id;
        this.departmentName = departmentName;
    }

    describe (this: Department) {
        console.log("\nId : " + this.id + "\nDepartment Name : " + this.departmentName);
    }
}

// Inheritance

class ITDepartment extends Department{
    public admins: string[];
    static courses = "C++, JAVA, DBMS";
    constructor (id: number, admins: string[]) {
        // super() - to call the constructor of the 'parent' class
        // CONDITION - we should call the super() before assigning the value to the CURRENT CLASS's Property
        super(id, "IT");
        this.admins = admins;
    }

    static createCourse (courseName: string) {
        return {corsename: courseName};
    }
}


class AccountingDepartment extends Department{
    public reports: string[];
    constructor (id: number, reports: string[]) {
        super(id, "Accounting Dept");
        this.reports = reports;
    }

    addReport (report: string) {
        this.reports.push(report);
    }

    printReports () {
        console.log("Reports : " + this.reports);
    }

    // GETTERS & SETTERS
    get getAllReports() {
        return this.reports;
    }

    set setAllReports(reports: string[]) {
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