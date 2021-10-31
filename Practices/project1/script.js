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
