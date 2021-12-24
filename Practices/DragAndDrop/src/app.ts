interface Validatable {
    value: string | number,
    required?: boolean,
    minLength?: number,
    maxLength?: number,
    min?: number,
    max?: number
}

function validate (validatableValue: Validatable) {
    let isValid = true;
    // required
    if (validatableValue.required) {
        isValid = isValid && validatableValue.value.toString().trim().length > 0;
    }
    // minLength
    if (validatableValue.minLength != null && typeof validatableValue.value === 'string') {
        isValid = isValid && validatableValue.value.length >= validatableValue.minLength;
    }
    // maxLength
    if (validatableValue.maxLength != null && typeof validatableValue.value === 'string') {
        isValid = isValid && validatableValue.value.length <= validatableValue.maxLength;
    }
    // minValue
    if (validatableValue.min != null && typeof validatableValue.value === 'number') {
        isValid = isValid && validatableValue.value >= validatableValue.min;
    }
    // maxValue
    if (validatableValue.max != null && typeof validatableValue.value === 'number') {
        isValid = isValid && validatableValue.value <= validatableValue.max;
    }

    return isValid;
}


// Autobind Decorator
function Autobind (_target: any, _methodName: any, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configure: true,
        get () {
            const boundFunc = originalMethod.bind(this);
            return boundFunc;
        }
    }
    return adjDescriptor;
}


// Creating PROJECCT STATE using 'class' [STATE should be ONLY ONE. So, we are creating the SINGLETON class]
class ProjectState {
    listeners: any[];
    projects: any[];
    private static instance: ProjectState;

    constructor () {
        this.listeners = [];
        this.projects = [];
    }

    static getInstance () {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    addListeners (listenerFunc: Function) {
        this.listeners.push(listenerFunc);
    }

    addProjects (title: string, description: string, noOfPeoples: number) {
        const newProject = {
            id: Math.random().toString(),
            title: title,
            description: description,
            peoples: noOfPeoples
        };
        this.projects.push(newProject);

        for (const listenerFunc of this.listeners) {
            listenerFunc(this.projects.slice());
        }
    }
}

const projectState = ProjectState.getInstance();

// ProjectList Class
class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement; 
    elementToInsert: HTMLElement;
    assignedProjects: any[];

    constructor (private type: 'active' | 'finished') {
        this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        this.assignedProjects = [];

        const importNode = document.importNode(this.templateElement.content, true);

        this.elementToInsert = importNode.firstElementChild as HTMLElement;
        this.elementToInsert.id = `${this.type}-projects`;

        projectState.addListeners((projects: any[]) => {
            this.assignedProjects = projects;
            this.renderProjects();
        })

        this.attach();
        this.renderContent();
    }

    private renderProjects () {
        for (var i=0;i<this.assignedProjects.length;i++) {
            var list = document.getElementById(`${this.type}-projects-list`)!;
            var lstElement = document.createElement("li");
            lstElement.textContent = this.assignedProjects[i]["title"];
            list.appendChild(lstElement);
        }
    }

    private renderContent () {
        const listId = `${this.type}-projects-list`;
        this.elementToInsert.querySelector('ul')!.id = listId;
        this.elementToInsert.querySelector('h2')!.textContent = this.type.toUpperCase() + " ITEMS";
    }

    private attach () {
        this.hostElement.insertAdjacentElement("beforeend", this.elementToInsert);
    }
} 

//  ProjectInput Class
class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    elementToInsert: HTMLFormElement;

    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor () {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;
        
        const importNode = document.importNode(this.templateElement.content, true);
        this.elementToInsert = importNode.firstElementChild as HTMLFormElement;
        this.elementToInsert.id = "user-input";

        this.titleInputElement = this.elementToInsert.querySelector('#title')! as HTMLInputElement;
        this.descriptionInputElement = this.elementToInsert.querySelector('#description')! as HTMLInputElement;
        this.peopleInputElement = this.elementToInsert.querySelector('#people')! as HTMLInputElement;

        this.configure();
        this.attach();
    }

    private clearInputs () {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    private gatherInput (): [string, string, number] | void {
        const titleValue = this.titleInputElement.value;
        const descriptionValue = this.descriptionInputElement.value;
        const peopleValue = +this.peopleInputElement.value;

        // validation process
        const titleValidatable: Validatable = {
            value: titleValue,
            required: true,
            maxLength: 20
        };
        const descriptionValidatable: Validatable = {
            value: descriptionValue,
            required: true,
            minLength: 5
        };
        const peopleValidatable: Validatable = {
            value: peopleValue,
            required: true,
            min: 1,
            max: 5
        };

        if (!validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)) {
                alert("Invalid Input!!");
                return;
        } else {
            return [titleValue, descriptionValue, +peopleValue];
        }
    }

    @Autobind
    private submitHandler (event: Event) {
        event.preventDefault();
        const userInput = this.gatherInput();
        if (Array.isArray(userInput)) {
            var [title, description, people] = userInput;
            console.log("Title : " + title + "" + "\nDescription : " + description 
            + "\nPeople : " + people);
            
            // adding the project into LIST [which is in Project STATEs]
            projectState.addProjects(title, description, people);
        }
        this.clearInputs();
    }

    private configure () {
        this.elementToInsert.addEventListener("submit", this.submitHandler);        
    }

    private attach () {
        this.hostElement.insertAdjacentElement("afterbegin", this.elementToInsert);
    }
}


const projInput = new ProjectInput();

const activeProjList = new ProjectList('active');
const finishedProjList = new ProjectList('finished');

