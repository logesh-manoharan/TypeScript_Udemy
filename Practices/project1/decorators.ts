// DECORATORS - useful for 'Meta Programming'

/*
    What does 'Meta Programming?'
        It will not create direct impact on the END USERS. Instead, it will make the
        developers to work bit easy.
*/


/*
    Note: Before start scripting. Set '"experimentalDecorators": true' in 'tsconfig.json' file
*/


// Creating DECORATOR Function
function  Logger (constructor: Function) {
    console.log("LOGGING...");
    console.log("Coonstructor: " + constructor);
}

@Logger
class PersonDetails {
    personName: string;
    personAge: number;

    constructor (pesronname: string, personage: number) {
        this.personName = pesronname;
        this.personAge = personage;
    }
}


// Decorator Factories

console.log("\n\nDecorator Factories\n");

function Logger1 (logstring: string) {
    return function (constructor: Function) {
        console.log("\nLOGGING...");
        console.log("Log String: " + logstring);
    }
}

@Logger1("LOGGING - Customer Details")
class Customer {
    customerName = "Ajay";

    constructor (customername: string) {
        this.customerName = customername;
    }
}


// Decorators interacting with HTML

function WithTemplate (template: string, identifier: string) {
    return function (constructor: Function) {
        const app = document.getElementById(identifier)!;
        app.innerHTML = template;
        console.log("Element created !!");
    };
}

// Multiple Decorators
@Logger1("LOGGING - EmpDetails")
@WithTemplate("<h1>Hello !!</h1>", "app")
class EmpDetails {
    employeeName: string;
    
    constructor (employeename: string) {
        this.employeeName = employeename;
    }
}


// Property Decorators

console.log("\n\nProperty Decorators\n");


function Log (target:  any, property: string) {
    console.log("Target: " + target);
    console.log("Property name: " + property);
}

class Product {
    @Log
    productName: string;
    private _price: number;

    constructor (product: string, price: number) {
        this.productName = product;
        this._price = price;
    }

    set setPrice (price: number) {
        if (price > 0) {
            this._price = price;
        } else {
            console.log("Price should be POSITIVE !!!");
        }
    }
}


