// OBJECTS

// in JS

/*
    const obj = {
        name: "logesh",
        age: 21
    }
*/

// in TS

// We should create the type of the each and every KEYS

const obj: {
    name: string,
    age: number
} = {
    name: "logesh",
    age: 21
}

console.log(obj.name);


// NESTED OBJECTS

const obj1: {
    name: string,
    age:  number,
    address: {
        dno: number,
        street: string,
        city: string
    }
} = {
    name: "logesh",
    age: 21,
    address: {
        dno: 311,
        street: "Nehru Street",
        city: "Virudhunagar"
    }
}


console.log("\n" + obj1.name + " " + obj1.address.city);


// ARRAYS

// Speciality: We can have the elements with ANY DATA TYPE

var arr: any[] = ['logesh', 21];

console.log(arr[1]);


// TUPLES (Fixed Length ARRAY)

var tuple: [number, string];

tuple = [36, 'Kaala'];

console.log(tuple[1]);


// ENUM

const MONDAY = "Monday";
const TUESDAY = "Tuesday";
var WEDNESDAY = "Wednesday";


enum Days {
    MONDAY,
    TUESDAY,
    WEDNESDAY
}

console.log(Days[Days.MONDAY] + " " + Days[Days.TUESDAY] + " " + Days[Days.WEDNESDAY]);


// UNION  (by make use of '|' symbol)

function combine (input1: number | string, input2: number | string) {
    let result;
    if (typeof input1 === "number" && typeof input2 === "number") {
        result = input1 + input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}


const added = combine(3, 5);
const combined = combine("Logesh", "Mano"); 

console.log("Integer Addition : " + added + " String Combined : " + combined);




// LITERAL




