var num1 = document.getElementById("num1")! as HTMLInputElement;
var num2 = document.getElementById("num2")! as HTMLInputElement;
var button1 = document.querySelector("button");

function add1(num1: number, num2: number) {
    console.log(num1 + num2);
}

button1.addEventListener("click", () => {
    add1(+num1.value, +num2.value);
})