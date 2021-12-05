/*
type Person = {
    name: string,
    printName(): void
}
*/

// We can't able to define ACCESS MODIFIERS. We will deifnitely access the properties and methods in future inside the CHILD CLASSES

// Interface to define the 'STRUCTURE OF THE OBJECT'

interface Person {
    name: string,
    // OPTIONAL Property (Age)
    age?: number;
    printName(): void;
}

// Interface as a 'FUNCTION'

/*
    type sampleFunc = (n1: number, n2: number) => number;
*/

interface Addition {
    (n1: number, n2: number) : number;
}

let addFunction: Addition = (n1: number, n2: number) => {
    return n1 + n2;
};

console.log("Added value : " + addFunction(5, 6));



// BASIC & MOST IMPORTANT RULE on 'Classes', 'Interfaces'

// 'Interface' can extends 'ONE or MORE Interfaces'
// 'CLASSES' can implements 'ONE or MORE Interfaces'
// 'CLASSES' can't extends 'TWO or MORE Classes'

interface Group {
    groupName: string;
}

interface Persons extends Group{
    name: string;
    age: number;
    // readonly - we can initialise the value only once
    readonly currentRole: string;
}

class Person1 implements Persons{
    groupName = "Lethal Daemons";
    name = "Logesh";
    age = 21;
    currentRole = "mfnf";
    // other than INTERFACE Properties & Methods Classes can have their OWN Methods.
    public address: string;
    constructor (address: string) {
        this.address = address;
    }
}

class Person2 implements Persons{
    groupName = "Lethal Daemons";
    name = "Kaala";
    age = 22;
    currentRole = "";
    // other than INTERFACE Properties & Methods Classes can have their OWN Methods.
    public address: string;
    constructor (address: string) {
        this.address = address;
    }
}

const pers1 = new Person1("Muthamil Street, Virudhunagar");
const pers2 = new Person2("Palanganatham, Madurai");

console.log("\n\nINTERFACES\n");
console.log("Person 1: " + JSON.stringify(pers1) + "\nPerson 2: " + JSON.stringify(pers2));

