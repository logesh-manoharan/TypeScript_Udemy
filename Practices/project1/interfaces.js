"use strict";
/*
type Person = {
    name: string,
    printName(): void
}
*/
var addFunction = function (n1, n2) {
    return n1 + n2;
};
console.log("Added value : " + addFunction(5, 6));
var Person1 = /** @class */ (function () {
    function Person1(address) {
        this.groupName = "Lethal Daemons";
        this.name = "Logesh";
        this.age = 21;
        this.currentRole = "mfnf";
        this.address = address;
    }
    return Person1;
}());
var Person2 = /** @class */ (function () {
    function Person2(address) {
        this.groupName = "Lethal Daemons";
        this.name = "Kaala";
        this.age = 22;
        this.currentRole = "";
        this.address = address;
    }
    return Person2;
}());
var pers1 = new Person1("Muthamil Street, Virudhunagar");
var pers2 = new Person2("Palanganatham, Madurai");
console.log("\n\nINTERFACES\n");
console.log("Person 1: " + JSON.stringify(pers1) + "\nPerson 2: " + JSON.stringify(pers2));
