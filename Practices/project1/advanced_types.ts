/*
    Advanced Types:
        1. Intersection Types
        2. Type Guards
        3. Discriminated Unions
        4. Type Casting
        5. Function Overloads
*/

// Intersection Types: [Combining the TYPES]

console.log("\n\nIntersection Types\n");

type Admin = {
    name: string;
    priviledges: string[];
}

type Trainee = {
    name: string;
    startDate: Date;
}


// 'ElevatedEmployee' should contains ALL PROPERTIES in 'Admin' and 'Trainee'
type ElevatedEmployee = Admin & Trainee;

const eleEmployee1: ElevatedEmployee = {
    name: "Logesh",
    priviledges: ["Edit", "Get", "Add", "Delete"],
    startDate: new Date()
}

// Another Example
type Combined = string | number;
type Numeric = number | boolean;

type CombinedNumeric = Combined & Numeric;

console.log("\n\nType Guards\n");

function addi (n1: CombinedNumeric, n2: CombinedNumeric) {
    // Type Guard [using 'typeof']
    if (typeof n1 == "string" || typeof n2 == "string") {
        return n1.toString() + n2.toString();
    }
    return n1 + n2;
}

function printEmployee (emp: ElevatedEmployee) {
    // Type Guard [using 'in']
    if ('priviledges' in emp) {
        console.log("Privledges : " + emp.priviledges);
    }
    console.log(emp.priviledges);
}

// Type Guard in classes [using 'instanceOf']

class Car {
    drive () {
        console.log("Driving a Car...");
    }
}

class Truck {
    drive () {
        console.log("Driving a Truck...");
    }
    driverCount (count: number) {
        console.log("Number of drivers in the truck: " + count);
    } 
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function driveVehicle (vehicle: Vehicle) {
    // Type Guard using 'instanceof'=> execute on 'RUNTIME'
    if (vehicle instanceof Truck) {
        console.log(vehicle.driverCount(3));
    }
}




// Discriminated UNION

console.log("\n\nDiscriminated Union\n");

// 'instanceof' will not be used in case of 'INTERFACES'. So, we can TYPE GUARD the
//...interfaces by following way [i.e. Discriminated Union]

interface Bird {
    type: "bird";   // Defined 'type' property in both 'Bird & Animal' to discriminate
    flyingSpeed: number;
}

interface Animal {
    type: "animal";
    runningSpeed: number;
}

type combined = Animal | Bird;

function setSpeed(horse: combined) {
    let speed;
    if (horse.type === "animal") {
        speed = horse.runningSpeed;
    }
    if (horse.type === "bird") {
        speed = horse.flyingSpeed;
    }
    console.log("Speed: " + speed);
}

setSpeed({ type: "bird", flyingSpeed: 40 });



// Type Casting [in TypeScript]

console.log("\n\nType Casting\n");

/*
    2 WAYS OF TYPE CASTING:
        1. '<TYPENAME>' add it priorly. 
        2. 'as TYPE_NAME' append it atlast.
*/

// const emailId = <HTMLInputElement>document.getElementById("emailId");   [alter]
var emailId = document.getElementById("emailId") as HTMLInputElement;

emailId.value = "logeshlogu189@gmail.com";



// Index Properties

console.log("\n\nIndex Properties\n");

class ErrorContainer {
    // emailId: 'Please, enter valid email'  OR username: "Username should start with characters"
    [prop: string]: string;
}

const errorObj: ErrorContainer = {
    emailId: "Please, enter valid email id !!",
    username: "username should start with alphabets !!"
}


// Function Overloads

console.log("\n\nFunction Overloads \n");

function additionFunct (n1: number, n2: number): number;
function additionFunct (n1: string, n2: string): string;
function additionFunct (n1: number, n2: string): string;
function additionFunct (n1: number | string, n2: number | string) {
    if (typeof n1 === 'string' || typeof n2 === 'string') {
        return n1.toString() + n2.toString();
    }
    return n1 + n2;
}

console.log(additionFunct (10, 25));
console.log(additionFunct ('logesh', 'mano'));
console.log(additionFunct (7, ' - MSD'));



// Optional Chaining => ?.

console.log("\n\n Optional Chaining\n");

const object = {
    name: "Logesh",
    age: 21,
    address: {
        city: "VNR"
    }
}

// check for ADDRESS if it present then it check for city. Eventhough both are absent it will no through ERROR
console.log(object?.address?.city);   




// Nullish Coalescing => '??'

console.log("\n\nNullish Coalescing\n");

const tmp = null;

// if 'tmp' is 'NULL/ UNDEFINED' original = 'DEFAULT'. Otherwise, original = tmp

const original = tmp ?? 'DEFAULT';

console.log("Original Value: " + original);



