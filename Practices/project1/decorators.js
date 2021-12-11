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

    When the decorators will execute ?
        It will execute BEHIND THE SCENES. i.e. It will contains some 'META_DATA' about the particular methods/ class etc.,.
        ... OR something we want to execute concurrently/ previously.
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
/*
    Different Types of DECORATORS:
        Class Decorator (Above Class)
        Property Decorator (Above Class's Property)
        Method Decorator (Above the Method)
        Accessors (Moreover similar to 'Method Decorators'. Only the difference is it will be called on SETTER & GETTERS)
        Parameter Decorator (Left to the Parameter)
*/
// 'PropertyDescriptor' is a type provided by the TypeScript itself.
function Log2(target, property) {
    console.log("Property Decorator Logger...\n");
    console.log("Target : " + target);
    console.log("Property : " + property);
    // console.log("Property Descriptor : " + descriptor);
}
// Acts as a Accessor [See the valueOf('target') in console it will be bit different than 'Method Decorator']
function Log3(target, property) {
    console.log("Accessor Logger...\n");
    console.log("Target: " + target);
    console.log("Property: " + property);
}
function Log4(target, property) {
    console.log("Method Decorator Logger...\n");
    console.log("Target: " + target);
    console.log("Property: " + property);
}
class TeamDetails {
    constructor(teamname) {
        this.teamName = teamname;
    }
    // Accessor - Because, it is called on SETTER
    set setTeamName(teamname) {
        this.teamName = teamname;
    }
    printTeamName() {
        console.log("Team Name: " + this.teamName);
    }
}
__decorate([
    Log2,
    __metadata("design:type", String)
], TeamDetails.prototype, "teamName", void 0);
__decorate([
    Log3,
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], TeamDetails.prototype, "setTeamName", null);
__decorate([
    Log4,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TeamDetails.prototype, "printTeamName", null);
// We can REPLACE or APPEND the new functionality to the available functionalities of the 'Particular Class'
function DecoratorOnStudent() {
    return function (originalConstructor) {
        return class extends originalConstructor {
            // '_' indicated they may present or absent
            constructor(..._) {
                super();
                console.log("After Executing the Super Class...");
            }
        };
    };
}
let StudentDetails = class StudentDetails {
    constructor(studentName) {
        console.log("Constructor inside the SUPER CLASS called...");
        this.studentName = studentName;
    }
};
StudentDetails = __decorate([
    DecoratorOnStudent(),
    __metadata("design:paramtypes", [String])
], StudentDetails);
const student1 = new StudentDetails("Kamalesh");
// AutoBind
// function DecoratorOnStaff () {
//     return function<T extends {new(...args: any[]): {}}> (originalConstructor: T) {
//         return class extends originalConstructor {
//             // '_' indicated they may present or absent
//             constructor (..._: any[]) {
//                 super();
//                 console.log("After Executing the Super Class...");
//             }
//         }
//     }
// }
// Using Decorators we are going to enable the BIND option automatically
function AutoBind(target, property, descriptor) {
    const originalDescriptor = descriptor.value;
    // we can configure the original descriptor in the following way
    const configDescription = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFunction = originalDescriptor.bind(this);
            return boundFunction;
        }
    };
    return configDescription;
}
class StaffDetails {
    constructor(staffName) {
        console.log("Constructor inside the SUPER CLASS called...");
        this.staffName = staffName;
    }
    getStaff() {
        console.log("Staff Name: " + this.staffName);
    }
}
__decorate([
    AutoBind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StaffDetails.prototype, "getStaff", null);
const staff1 = new StaffDetails("Uma");
const button = document.querySelector("button");
// it will show 'Staff Name: undefined' when I click the 'Click Me' button
// button.addEventListener("click", staff1.getStaff)
// it will show 'Staff Name: Thangavel' when I click the 'Click Me' button
// Usual Way of binding
// button.addEventListener("click", staff1.getStaff.bind(this));
// after using 'AutoBind' Decorator - We no need to bind locally all are handled in Decorator itself
button.addEventListener("click", staff1.getStaff);
const registeredValidators = {};
function Required(target, property) {
    registeredValidators[target.constructor.name] = {
        [property]: ['required']
    };
}
function Positive(target, property) {
    registeredValidators[target.constructor.name] = {
        [property]: ['positive']
    };
}
function validate(obj) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    // check any validations needed for Particular Property. If not 'return true;'
    if (!objValidatorConfig) {
        return true;
    }
    // let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    if (obj[prop] !== null) {
                        return true;
                    }
                    return false;
                case 'positive':
                    if (obj[prop] > 0) {
                        return true;
                    }
                    return false;
            }
        }
    }
}
class Course {
    constructor(courseTitle, coursePrice) {
        this.title = courseTitle;
        this.price = coursePrice;
    }
}
__decorate([
    Required,
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    Positive,
    __metadata("design:type", String)
], Course.prototype, "price", void 0);
const courseForm = document.querySelector("form");
courseForm.addEventListener("click", event => {
    event.preventDefault();
    const courseTitle = document.querySelector("#title");
    const coursePrice = document.querySelector("#price");
    const course1 = new Course(courseTitle.value, coursePrice.value);
    if (!validate(course1)) {
        alert("Invalid!! data enetered...please try again.");
        return;
    }
    console.log("COURSE DETAILS\n\nCourse Title: " + courseTitle.value + "\nCourse Price: " + coursePrice.value);
});
