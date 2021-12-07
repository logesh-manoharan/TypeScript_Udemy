"use strict";
// GENERIC TYPES
/*
    Advantage: More Flexible Data type Handling with More Type Safety
*/
console.log("\n\nGENERIC TYPES\n");
// Pre-defined GENERIC Types 
console.log("\n\nPre-defined generic types...\n");
// Array
// const lst: string[] = ["Logesh"];
const lst = [];
lst.push("Logesh");
// Promises
var promise = new Promise((resolve, reject) => {
    if (10 > 9) {
        resolve("Promise Resolved !!");
    }
    else {
        reject("Promise Rejected !!");
    }
});
promise.then((data) => {
    console.log("Promise Result: " + data);
    console.log("Promise Result length: " + data.length);
});
// Generic Functions - Eg1
console.log("\n\nGeneric Functions - Eg1\n");
// Generic Constraints => using 'extends'
function merge(obj1, obj2) {
    return Object.assign(obj1, obj2);
}
const mergedObj = merge({ name: "Logesh" }, { age: 21 });
console.log("Merged Object's Age: " + mergedObj["age"]);
// Generic Function - Eg2
console.log("\n\nGeneric Functions - Eg2");
// Here, we more specifically mention the 'length' property to allow the LIST | OBJECT | STRING data types.
// ...because NUMBER data type doesn't have LENGTH property
function countAndPrint(element) {
    if (element.length === 1) {
        return "Length of the Element is 1";
    }
    else if (element.length > 0) {
        return "Length of the Element is " + element.length;
    }
    else {
        return "Length is 0";
    }
}
console.log(countAndPrint("Hai, How are you?"));
// 'keyof' constraint
console.log("\n\n'keyof' contraint...\n");
// Here, we are checking the KEY is present or not by specifing the respective TYPE
function checkObj(obj, str) {
    return obj[str];
}
console.log(checkObj({ name: "Logesh" }, "name"));
// Generic Classes
console.log("\n\nGeneric Classes...\n");
class DataStorage {
    constructor() {
        this.storage = [];
    }
    addItem(item) {
        this.storage.push(item);
    }
    removeItem(item) {
        this.storage.splice(this.storage.indexOf(item), 1);
    }
    printStorage() {
        console.log(this.storage);
    }
}
const textStorage = new DataStorage();
textStorage.addItem("Dog");
textStorage.addItem("Cat");
textStorage.printStorage();
textStorage.removeItem("Cat");
textStorage.printStorage();
const numberStorage = new DataStorage();
numberStorage.addItem(10);
numberStorage.addItem(20);
numberStorage.printStorage();
