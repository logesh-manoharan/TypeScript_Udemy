"use strict";
// OBJECTS
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// in JS
/*
    const obj = {
        name: "logesh",
        age: 21
    }
*/
// in TS
// We should create the type of the each and every KEYS
var obj = {
    name: "logesh",
    age: 21
};
console.log(obj.name);
// NESTED OBJECTS
var obj1 = {
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
var MONDAY = "Monday";
var TUESDAY = "Tuesday";
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
    var result;
    if (typeof input1 === "number" && typeof input2 === "number") {
        result = input1 + input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
var added = combine(3, 5);
var combined = combine("Logesh", "Mano");
console.log("Integer Addition : " + added + " String Combined : " + combined);
function combine1(input1, input2, resultConversion) {
    var result;
    if (typeof input1 === "number" && typeof input2 === "number" || resultConversion === "to-number") {
        result = +input1 + +input2; // +input1 => is to convert the value to INT
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
var added1 = combine1('10', '20', "to-number");
var combined1 = combine1("Logesh", "Mano", "to-text");
console.log("Added-1 : " + added1 + " Combined-1 : " + combined1);
var user1 = { firstname: "Logesh", lastname: "Mano" };
console.log("User 1 : " + JSON.stringify(user1));
// FUNCTIONS TYPES
function multiplication(n1, n2) {
    return n1 * n2;
}
var mulitply = multiplication;
console.log("Multiplication Function : " + mulitply(4, 5));
// We can define the function also => Like a FUNCTION DECLARATION in C PROGRAMMING
// SYNTAX: let <FUNCTION NAME> : (<PARAM 1>, <PARAM 2>) : <RETURN TYPE>;
var addition;
function add(n1, n2) {
    return n1 + n2;
}
addition = add;
console.log("Addition: " + addition(5, 4));
// FUNCTION TYPES & CALLBACKS
// As name suggests 'CALLBACKS' => we call back in a function and execute as we required
function addAndHandle(n1, n2, cb) {
    var result = n1 + n2;
    cb(result);
}
addAndHandle(20, 25, function (result) {
    result = result * 2;
    console.log("Doubled value : " + result);
});
// SECTION - 4
// VAR vs LET   [Function level & Global SCOPE are same to both.]
// Only the difference is BLOCK LEVEL
// LET - it is only accessible inside the block where it is defined
// VAR - once variable is defined using the VAR we can access the value from outside the block.
{
    var strr = "Strr";
    console.log(strr);
}
// the below code will produce error
// console.log(strr);
if (true) {
    var str1 = "String 1";
    var str2 = "String 2";
    console.log(str2);
}
console.log(str1);
// Spread Operators => We can use it in both LISTS and OBJECTS
// LISTS
var hobbies = ["Sports", "Cooking", "Watching movies"];
var activeHobbies = ["Playing"];
// to add the element
activeHobbies.push("Swimming");
// but if i want to insert all the 'hobbies' values into 'activeHobbies'
// activeHobbies.push(hobbies[0], hobbies[1], hobbies[2]);
// but above process is very worst way. if the list is too long then it is hard.
// SPREAD operator make this handy
activeHobbies.push.apply(activeHobbies, hobbies);
console.log("Spread operator (LIST) : " + activeHobbies);
// OBJECTS
var person1 = {
    name: "Logesh",
    age: 21
};
var moreDetail = __assign(__assign({}, person1), { city: "Virudhunagar" });
console.log("Spread Operator (OBJECT) : " + JSON.stringify(moreDetail));
// '...' it is used as REST Parameter in functions
// to accept huge number of PARAMS in the function
var additionFunc = function () {
    var parameters = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        parameters[_i] = arguments[_i];
    }
    return parameters.reduce(function (currentSum, currentVal) {
        return currentSum + currentVal;
    }, 0);
};
// prints SUM of all the parameters
console.log(additionFunc(1, 2, 3, 4, 5, 6, 7, 8));
// ARRAY, OBJECT Destructuring
// here, we use SQUARE BARACKETS & CURLI BRACES in Left Side
var animals = ["Dog", "Cat", "Cow", "Lion"];
var dog = animals[0], cat = animals[1], remainingAnimals = animals.slice(2);
console.log("Destructuring [List] : " + dog + " " + cat + " " + remainingAnimals);
// OBJECT Destructuring
var employee1 = {
    firstName: "Logesh",
    lastName: "M",
    age: 21,
    city: "VNR"
};
var fullName = employee1.firstName, age = employee1.age;
console.log("Destructuring [Object] : " + fullName + " " + age);
