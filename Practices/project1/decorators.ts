// DECORATORS - useful for 'Meta Programming'

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



/*
    Different Types of DECORATORS:
        Class Decorator (Above Class)
        Property Decorator (Above Class's Property)
        Method Decorator (Above the Method)
        Accessors (Moreover similar to 'Method Decorators'. Only the difference is it will be called on SETTER & GETTERS)
        Parameter Decorator (Left to the Parameter)
*/


// 'PropertyDescriptor' is a type provided by the TypeScript itself.
function Log2 (target: any, property: string) {
    console.log("Property Decorator Logger...\n");
    console.log("Target : " + target);
    console.log("Property : " + property);
    // console.log("Property Descriptor : " + descriptor);
}


// Acts as a Accessor [See the valueOf('target') in console it will be bit different than 'Method Decorator']
function Log3 (target: any, property: any) {
    console.log("Accessor Logger...\n");
    console.log("Target: " + target);
    console.log("Property: " + property);
}

function Log4 (target: any, property: any) {
    console.log("Method Decorator Logger...\n");
    console.log("Target: " + target);
    console.log("Property: " + property);
}

class TeamDetails {
    @Log2
    teamName: string;

    constructor (teamname: string) {
        this.teamName = teamname;
    }


    // Accessor - Because, it is called on SETTER
    @Log3
    set setTeamName (teamname: string) {
        this.teamName = teamname;
    }

    @Log4
    printTeamName () {
        console.log("Team Name: " + this.teamName);
    }
}



// We can REPLACE or APPEND the new functionality to the available functionalities of the 'Particular Class'

function DecoratorOnStudent () {
    return function<T extends {new(...args: any[]): {}}> (originalConstructor: T) {
        return class extends originalConstructor {
            // '_' indicated they may present or absent
            constructor (..._: any[]) {
                super();
                console.log("After Executing the Super Class...");
            }
        }
    }
}


@DecoratorOnStudent()
class StudentDetails {
    studentName: string;

    constructor (studentName: string) {
        console.log("Constructor inside the SUPER CLASS called...");
        this.studentName = studentName;
    }
}

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

function AutoBind (target: any, property: any, descriptor: PropertyDescriptor) {
    const originalDescriptor = descriptor.value;
    // we can configure the original descriptor in the following way
    const configDescription: PropertyDescriptor  = {
        configurable: true,
        enumerable: false,
        get () {
            const boundFunction = originalDescriptor.bind(this);
            return boundFunction;
        }
    }

    return configDescription;
}


class StaffDetails {
    staffName: string;

    constructor (staffName: string) {
        console.log("Constructor inside the SUPER CLASS called...");
        this.staffName = staffName;
    }

    @AutoBind
    getStaff () {
        console.log("Staff Name: " + this.staffName);
    }
}

const staff1 = new StaffDetails("Uma");

const button = document.querySelector("button")!;

// it will show 'Staff Name: undefined' when I click the 'Click Me' button
// button.addEventListener("click", staff1.getStaff)

// it will show 'Staff Name: Thangavel' when I click the 'Click Me' button

// Usual Way of binding
// button.addEventListener("click", staff1.getStaff.bind(this));


// after using 'AutoBind' Decorator - We no need to bind locally all are handled in Decorator itself
button.addEventListener("click", staff1.getStaff);




// Decorators for the VALIDATIONS

interface ValidatorConfig {
    [propName: string]: {
        [validationProperty: string]: string[];   // ['required', 'positive']
    }
}

const registeredValidators: ValidatorConfig = {};

function Required (target: any, property: any) {
    registeredValidators[target.constructor.name] = {
        [property]: ['required']
    }
}

function Positive (target: any, property: any) {
    registeredValidators[target.constructor.name] = {
        [property]: ['positive']
    }
}

function validate (obj: any) {
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
    @Required
    title: string;

    @Positive
    price: string;

    constructor (courseTitle: string, coursePrice: string) {
        this.title = courseTitle;
        this.price = coursePrice;
    }
}

const courseForm = document.querySelector("form")!;

courseForm.addEventListener("click", event => {
    event.preventDefault();
    const courseTitle = document.querySelector("#title")! as HTMLInputElement;
    const coursePrice = document.querySelector("#price")! as HTMLInputElement;

    const course1 = new Course(courseTitle.value, coursePrice.value);
    if (!validate(course1)) {
        alert("Invalid!! data enetered...please try again.");
        return;
    }
    console.log("COURSE DETAILS\n\nCourse Title: " + courseTitle.value + "\nCourse Price: " + coursePrice.value);
})

