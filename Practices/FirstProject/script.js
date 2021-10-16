var num1 = document.getElementById("num1");
var num2 = document.getElementById("num2");
var button1 = document.querySelector("button");
function add1(num1, num2) {
    console.log(num1 + num2);
}
button1.addEventListener("click", function () {
    add1(+num1.value, +num2.value);
});
