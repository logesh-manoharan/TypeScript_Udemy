"use strict";
/*
    Advanced Types:
        1. Intersection Types
        2. Type Guards
        3. Discriminated Unions
        4. Type Casting
        5. Function Overloads
*/
var _a;
// Intersection Types: [Combining the TYPES]
console.log("\n\nIntersection Types\n");
const eleEmployee1 = {
    name: "Logesh",
    priviledges: ["Edit", "Get", "Add", "Delete"],
    startDate: new Date()
};
console.log("\n\nType Guards\n");
function addi(n1, n2) {
    // Type Guard [using 'typeof']
    if (typeof n1 == "string" || typeof n2 == "string") {
        return n1.toString() + n2.toString();
    }
    return n1 + n2;
}
function printEmployee(emp) {
    // Type Guard [using 'in']
    if ('priviledges' in emp) {
        console.log("Privledges : " + emp.priviledges);
    }
    console.log(emp.priviledges);
}
// Type Guard in classes [using 'instanceOf']
class Car {
    drive() {
        console.log("Driving a Car...");
    }
}
class Truck {
    drive() {
        console.log("Driving a Truck...");
    }
    driverCount(count) {
        console.log("Number of drivers in the truck: " + count);
    }
}
const v1 = new Car();
const v2 = new Truck();
function driveVehicle(vehicle) {
    // Type Guard using 'instanceof'=> execute on 'RUNTIME'
    if (vehicle instanceof Truck) {
        console.log(vehicle.driverCount(3));
    }
}
// Discriminated UNION
console.log("\n\nDiscriminated Union\n");
function setSpeed(horse) {
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
var emailId = document.getElementById("emailId");
emailId.value = "logeshlogu189@gmail.com";
// Index Properties
console.log("\n\nIndex Properties\n");
class ErrorContainer {
}
const errorObj = {
    emailId: "Please, enter valid email id !!",
    username: "username should start with alphabets !!"
};
// Function Overloads
console.log("\n\nFunction Overloads \n");
function additionFunct(n1, n2) {
    if (typeof n1 === 'string' || typeof n2 === 'string') {
        return n1.toString() + n2.toString();
    }
    return n1 + n2;
}
console.log(additionFunct(10, 25));
console.log(additionFunct('logesh', 'mano'));
console.log(additionFunct(7, ' - MSD'));
// Optional Chaining => ?.
console.log("\n\n Optional Chaining\n");
const object = {
    name: "Logesh",
    age: 21,
    address: {
        city: "VNR"
    }
};
// check for ADDRESS if it present then it check for city. Eventhough both are absent it will no through ERROR
console.log((_a = object === null || object === void 0 ? void 0 : object.address) === null || _a === void 0 ? void 0 : _a.city);
// Nullish Coalescing => '??'
console.log("\n\nNullish Coalescing\n");
const tmp = null;
// if 'tmp' is 'NULL/ UNDEFINED' original = 'DEFAULT'. Otherwise, original = tmp
const original = tmp !== null && tmp !== void 0 ? tmp : 'DEFAULT';
console.log("Original Value: " + original);
