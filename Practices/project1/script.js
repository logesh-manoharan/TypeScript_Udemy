"use strict";
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
const obj = {
    name: "logesh",
    age: 21
};
console.log(obj.name);
// NESTED OBJECTS
const obj1 = {
    name: "logesh",
    age: 21,
    address: {
        dno: 311,
        street: "Nehru Street",
        city: "Virudhunagar"
    }
};
console.log("\n" + obj1.name + " " + obj1.address.city);
// ARRAYS
// Speciality: We can have the elements with ANY DATA TYPE
var arr = ['logesh', 21];
console.log(arr[1]);
// TUPLES (Fixed Length ARRAY)
var tuple;
tuple = [36, 'Kaala'];
console.log(tuple[1]);
// ENUM
const MONDAY = "Monday";
const TUESDAY = "Tuesday";
var WEDNESDAY = "Wednesday";
var Days;
(function (Days) {
    Days[Days["MONDAY"] = 0] = "MONDAY";
    Days[Days["TUESDAY"] = 1] = "TUESDAY";
    Days[Days["WEDNESDAY"] = 2] = "WEDNESDAY";
})(Days || (Days = {}));
console.log(Days[Days.MONDAY] + " " + Days[Days.TUESDAY] + " " + Days[Days.WEDNESDAY]);
// UNION  (by make use of '|' symbol)
function combine(input1, input2) {
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
function combine1(input1, input2, resultConversion) {
    let result;
    if (typeof input1 === "number" && typeof input2 === "number" || resultConversion === "to-number") {
        result = +input1 + +input2; // +input1 => is to convert the value to INT
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
const added1 = combine1('10', '20', "to-number");
const combined1 = combine1("Logesh", "Mano", "to-text");
console.log("Added-1 : " + added1 + " Combined-1 : " + combined1);
var user1 = { firstname: "Logesh", lastname: "Mano" };
console.log("User 1 : " + JSON.stringify(user1));
// FUNCTIONS TYPES
function multiplication(n1, n2) {
    return n1 * n2;
}
let mulitply = multiplication;
console.log("Multiplication Function : " + mulitply(4, 5));
// We can define the function also => Like a FUNCTION DECLARATION in C PROGRAMMING
// SYNTAX: let <FUNCTION NAME> : (<PARAM 1>, <PARAM 2>) : <RETURN TYPE>;
let addition;
function add(n1, n2) {
    return n1 + n2;
}
addition = add;
console.log("Addition: " + addition(5, 4));
// FUNCTION TYPES & CALLBACKS
// As name suggests 'CALLBACKS' => we call back in a function and execute as we required
function addAndHandle(n1, n2, cb) {
    const result = n1 + n2;
    cb(result);
}
addAndHandle(20, 25, (result) => {
    result = result * 2;
    console.log("Doubled value : " + result);
});
// SECTION - 4
// VAR vs LET   [Function level & Global SCOPE are same to both.]
// Only the difference is BLOCK LEVEL
// LET - it is only accessible inside the block where it is defined
// VAR - once variable is defined using the VAR we can access the value from outside the block.
{
    let strr = "Strr";
    console.log(strr);
}
// the below code will produce error
// console.log(strr);
if (true) {
    var str1 = "String 1";
    let str2 = "String 2";
    console.log(str2);
}
console.log(str1);
// Spread Operators => We can use it in both LISTS and OBJECTS
// LISTS
const hobbies = ["Sports", "Cooking", "Watching movies"];
var activeHobbies = ["Playing"];
// to add the element
activeHobbies.push("Swimming");
// but if i want to insert all the 'hobbies' values into 'activeHobbies'
// activeHobbies.push(hobbies[0], hobbies[1], hobbies[2]);
// but above process is very worst way. if the list is too long then it is hard.
// SPREAD operator make this handy
activeHobbies.push(...hobbies);
console.log("Spread operator (LIST) : " + activeHobbies);
// OBJECTS
const person1 = {
    name: "Logesh",
    age: 21
};
var moreDetail = Object.assign(Object.assign({}, person1), { city: "Virudhunagar" });
console.log("Spread Operator (OBJECT) : " + JSON.stringify(moreDetail));
// '...' it is used as REST Parameter in functions
// to accept huge number of PARAMS in the function
const additionFunc = (...parameters) => {
    return parameters.reduce((currentSum, currentVal) => {
        return currentSum + currentVal;
    }, 0);
};
// prints SUM of all the parameters
console.log(additionFunc(1, 2, 3, 4, 5, 6, 7, 8));
// ARRAY, OBJECT Destructuring
// here, we use SQUARE BARACKETS & CURLI BRACES in Left Side
const animals = ["Dog", "Cat", "Cow", "Lion"];
var [dog, cat, ...remainingAnimals] = animals;
console.log("Destructuring [List] : " + dog + " " + cat + " " + remainingAnimals);
// OBJECT Destructuring
const employee1 = {
    firstName: "Logesh",
    lastName: "M",
    age: 21,
    city: "VNR"
};
var { firstName: fullName, age } = employee1;
console.log("Destructuring [Object] : " + fullName + " " + age);
