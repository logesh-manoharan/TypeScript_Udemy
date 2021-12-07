"use strict";
/*
type Person = {
    name: string,
    printName(): void
}
*/
let addFunction = (n1, n2) => {
    return n1 + n2;
};
console.log("Added value : " + addFunction(5, 6));
class Person1 {
    constructor(address) {
        this.groupName = "Lethal Daemons";
        this.name = "Logesh";
        this.age = 21;
        this.currentRole = "mfnf";
        this.address = address;
    }
}
class Person2 {
    constructor(address) {
        this.groupName = "Lethal Daemons";
        this.name = "Kaala";
        this.age = 22;
        this.currentRole = "";
        this.address = address;
    }
}
const pers1 = new Person1("Muthamil Street, Virudhunagar");
const pers2 = new Person2("Palanganatham, Madurai");
console.log("\n\nINTERFACES\n");
console.log("Person 1: " + JSON.stringify(pers1) + "\nPerson 2: " + JSON.stringify(pers2));
