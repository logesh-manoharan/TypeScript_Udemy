// ABSTARCT CLASSES

// Why?
//  If one particular method should present in all the CHILD CLASSES.
//  If one particular property should instantiated in all the CHILD CLASSES.

// Syntax Info: To define the method as ABSTARCT we should define the class as ABSTRACT

// We can't able to INSTANTIATE the ABSTRACT Classes

abstract class EmployeeClass {
    protected employeeId: number;
    protected employeeName: string;
    protected abstract employeeAge: number;

    constructor (employeeID: number, employeeNAME: string) {
        this.employeeId = employeeID;
        this.employeeName = employeeNAME;
    }

    abstract printEmployee (): void;
}

class Fulltime extends EmployeeClass {
    employeeAge = 21;
    printEmployee () {
        console.log("\n\nFULL TIME \n");
        console.log("Employee ID : " + this.employeeId + "\nEmployee Name : " + this.employeeName + "\nEmployee Age : " + this.employeeAge);
    }
}

class Parttime extends EmployeeClass {
    employeeAge = 22;
    printEmployee () {
    console.log("\n\nPART TIME \n");
    console.log("Employee ID : " + this.employeeId + "\nEmployee Name : " + this.employeeName + "\nEmployee Age : " + this.employeeAge);
    }
}

const fulltimeEmployee = new Fulltime(1, "Logesh");

const parttimeEmployee = new Parttime(2, "Selva");

fulltimeEmployee.printEmployee();
parttimeEmployee.printEmployee();
