// GENERIC TYPES

    /*
        Advantage: More Flexible Data type Handling with More Type Safety
    */

console.log("\n\nGENERIC TYPES\n");

// Pre-defined GENERIC Types 
console.log("\n\nPre-defined generic types...\n");

// Array
// const lst: string[] = ["Logesh"];
const lst: Array<string> = [];
lst.push("Logesh");


// Promises
var promise: Promise<string> = new Promise((resolve, reject) => {
    if (10 > 9) {
        resolve("Promise Resolved !!");
    }
    else {
        reject("Promise Rejected !!");
    }
})

promise.then((data) => {
    console.log("Promise Result: " + data);
    console.log("Promise Result length: " + data.length);
})



// Generic Functions - Eg1

console.log("\n\nGeneric Functions - Eg1\n");

// Generic Constraints => using 'extends'

function merge<T extends object, U extends object>(obj1: T, obj2: U) {
    return Object.assign(obj1, obj2);
}

const mergedObj = merge({name: "Logesh"}, {age: 21});
console.log("Merged Object's Age: " + mergedObj["age"]);



// Generic Function - Eg2

console.log("\n\nGeneric Functions - Eg2");


interface Lengthy {
    length: number
}

// Here, we more specifically mention the 'length' property to allow the LIST | OBJECT | STRING data types.
// ...because NUMBER data type doesn't have LENGTH property
function countAndPrint<T extends Lengthy>(element: T) {
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
function checkObj<T extends object, U extends keyof T>(obj: T, str: U) {
    return obj[str];
}

console.log(checkObj({name: "Logesh"}, "name"));



// Generic Classes

console.log("\n\nGeneric Classes...\n");

class DataStorage<T> {
    private storage: T[] = [];

    addItem (item: T) {
        this.storage.push(item);
    }

    removeItem (item: T) {
        this.storage.splice(this.storage.indexOf(item), 1);
    }

    printStorage() {
        console.log(this.storage);
    }
}


const textStorage = new DataStorage<string>();
textStorage.addItem("Dog");
textStorage.addItem("Cat");

textStorage.printStorage();

textStorage.removeItem("Cat");

textStorage.printStorage();


const numberStorage = new DataStorage<number>();

numberStorage.addItem(10);
numberStorage.addItem(20);

numberStorage.printStorage();


// Generic Utility Types

console.log("\n\nGeneric Utility Types\n");

// 1 - Partial
console.log("Partial...\n");

interface Player {
    playerName: string,
    playerAge: number,
    game: string,
    country: string
}

// 'Partial' will allow the developers with more flexibility. We don't need to fillout all the fields.
function setPlayer(playerName: string, playerAge: number) : Partial<Player> {
    return { playerName: playerName, playerAge: playerAge };
}

console.log(setPlayer("Messi", 36));

// 2 - Readonly
console.log("Readonly...\n");

const listOfBirds: Readonly<string[]> = ["Peacock", "Parrot"];
// listOfBirds[2] = "Hen";     // ERROR will create 
console.log(listOfBirds);

