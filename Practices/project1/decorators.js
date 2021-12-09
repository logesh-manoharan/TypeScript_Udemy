"use strict";
// DECORATORS - useful for 'Meta Programming'
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/*
    What does 'Meta Programming?'
        It will not create direct impact on the END USERS. Instead, it will make the
        developers to work bit easy.
*/
/*
    Note: Before start scripting. Set '"experimentalDecorators": true' in 'tsconfig.json' file
*/
// Creating DECORATOR Function
function Logger(constructor) {
    console.log("LOGGING...");
    console.log("Coonstructor: " + constructor);
}
let PersonDetails = class PersonDetails {
    constructor(pesronname, personage) {
        this.personName = pesronname;
        this.personAge = personage;
    }
};
PersonDetails = __decorate([
    Logger,
    __metadata("design:paramtypes", [String, Number])
], PersonDetails);
// Decorator Factories
console.log("\n\nDecorator Factories\n");
function Logger1(logstring) {
    return function (constructor) {
        console.log("\nLOGGING...");
        console.log("Log String: " + logstring);
    };
}
let Customer = class Customer {
    constructor(customername) {
        this.customerName = "Ajay";
        this.customerName = customername;
    }
};
Customer = __decorate([
    Logger1("LOGGING - Customer Details"),
    __metadata("design:paramtypes", [String])
], Customer);
// Decorators interacting with HTML
function WithTemplate(template, identifier) {
    return function (constructor) {
        const app = document.getElementById(identifier);
        app.innerHTML = template;
        console.log("Element created !!");
    };
}
// Multiple Decorators
let EmpDetails = class EmpDetails {
    constructor(employeename) {
        this.employeeName = employeename;
    }
};
EmpDetails = __decorate([
    Logger1("LOGGING - EmpDetails"),
    WithTemplate("<h1>Hello !!</h1>", "app"),
    __metadata("design:paramtypes", [String])
], EmpDetails);
// Property Decorators
console.log("\n\nProperty Decorators\n");
function Log(target, property) {
    console.log("Target: " + target);
    console.log("Property name: " + property);
}
class Product {
    constructor(product, price) {
        this.productName = product;
        this._price = price;
    }
    set setPrice(price) {
        if (price > 0) {
            this._price = price;
        }
        else {
            console.log("Price should be POSITIVE !!!");
        }
    }
}
__decorate([
    Log,
    __metadata("design:type", String)
], Product.prototype, "productName", void 0);
