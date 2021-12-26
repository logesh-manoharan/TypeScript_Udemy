import { Component } from "./base-component.js";
import { projectState } from "../state/project-state.js";
import { Validatable, validate } from "../utils/validation.js";
import { Autobind } from "../decorators/decorators.js";

//  ProjectInput Class
export class ProjectInput extends Component<HTMLFormElement, HTMLElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor () {
        super('project-input', 'app', true, 'user-input');

        this.titleInputElement = this.elementToInsert.querySelector('#title')! as HTMLInputElement;
        this.descriptionInputElement = this.elementToInsert.querySelector('#description')! as HTMLInputElement;
        this.peopleInputElement = this.elementToInsert.querySelector('#people')! as HTMLInputElement;

        this.configure();
    }

    configure (): void {
        this.elementToInsert.addEventListener("submit", this.submitHandler);        
    }

    renderContent(): void {
        
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
}