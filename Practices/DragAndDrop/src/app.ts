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

enum ProjectStatus {
    Active,
    Finished
}

// To create the STRUCTURE OF THE 'PROJECT'
class Project {
    constructor (
        public id: string,
        public title: string,
        public description: string,
        public peoples: number,
        public status: ProjectStatus 
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.peoples  = peoples;
        this.status = status; 
    }
}

type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListeners (listenerFunc: Listener<T>) {
        this.listeners.push(listenerFunc);
    }
}

// Creating PROJECCT STATE using 'class' [STATE should be ONLY ONE. So, we are creating the SINGLETON class]
class ProjectState extends State<Project> {
    projects: Project[] = [];
    private static instance: ProjectState;

    constructor () {
        super();
    }

    static getInstance () {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    addProjects (title: string, description: string, noOfPeoples: number) {
        const newProject = new Project(Math.random().toString(), title, description, noOfPeoples , ProjectStatus.Active);
        this.projects.push(newProject);

        this.refreshListeners();
    }

    moveProject (projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(project => project.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.refreshListeners();
        }
    }

    refreshListeners () {
        for (const listenerFunc of this.listeners) {
            listenerFunc(this.projects.slice());
        }
    } 
}

const projectState = ProjectState.getInstance();


// to reduce the duplication of coding stuffs [by introducing the INHERITANCE Concepts]
// ...with GENERIC Types
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T; 
    elementToInsert: U;

    constructor (templateId: string, hostId: string, insertAtStart: boolean, insertElementId?: string) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostId) as T;

        const importNode = document.importNode(this.templateElement.content, true);

        this.elementToInsert = importNode.firstElementChild as U;
        if (insertElementId) {
            this.elementToInsert.id = insertElementId;
        }

        this.attach(insertAtStart);        
    }

    private attach(insertAtBeginning: boolean) {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.elementToInsert);
    }

    // should be IMPLEMENTED in all CHILD CLASSES
    abstract configure(): void;
    abstract renderContent(): void;
}

// Drag & Drop Interface
interface Draggable {
    dragStartHandler (event: DragEvent): void;
    dragEndHandler (event: DragEvent): void;
}

interface DragTarget {
    dragOverHandler (event: DragEvent): void;
    dropHandler (event: DragEvent): void;
    dragLeaveHandler (event: DragEvent): void;
}

// ProjectItem Class
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> 
implements Draggable {
    private project: Project;

    // GETTER
    get persons () {
        return this.project.peoples === 1 ? "1 Person Assigned" : `${this.project.peoples} Persons Assigned`;
    }

    constructor (listId: string, project: Project) {
        super('single-project', listId, false, project.id);

        this.project = project;

        this.configure();
        this.renderContent();
    }

    configure(): void {
        this.elementToInsert.addEventListener("dragstart", this.dragStartHandler);
        this.elementToInsert.addEventListener("dragend", this.dragEndHandler);
    }

    renderContent(): void {
        this.elementToInsert.querySelector("h2")!.textContent = this.project.title;
        this.elementToInsert.querySelector("h3")!.textContent = this.persons;
        this.elementToInsert.querySelector("p")!.textContent = this.project.description;
    }

    @Autobind
    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = "move";
    }

    @Autobind
    dragEndHandler(_: DragEvent): void {
        console.log("Drag Ended !!")
    }
}

// ProjectList Class
class ProjectList extends Component<HTMLDivElement, HTMLElement> 
implements DragTarget {
    assignedProjects: Project[];

    constructor (private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);

        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }

    configure(): void {
        projectState.addListeners((projects: Project[]) => {
            const relevantProjects = projects.filter((project) => {
                // check the list is ACTIVE List or FINISHED List
                if (this.type === 'active') {
                    return project.status === ProjectStatus.Active;
                }
                return project.status === ProjectStatus.Finished;
            })
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        })

        this.elementToInsert.addEventListener("dragover", this.dragOverHandler);
        this.elementToInsert.addEventListener("drop", this.dropHandler);
        this.elementToInsert.addEventListener("dragleave", this.dragLeaveHandler);
    }

    renderContent () {
        const listId = `${this.type}-projects-list`;
        this.elementToInsert.querySelector('ul')!.id = listId;
        this.elementToInsert.querySelector('h2')!.textContent = this.type.toUpperCase() + " PROJECTS";
    }

    private renderProjects () {
        const list = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        list.innerHTML = '';
        for (var projItem of this.assignedProjects) {
            new ProjectItem(this.elementToInsert.querySelector('ul')!.id, projItem);
        }
    }

    @Autobind
    dragOverHandler(event: DragEvent): void {
        // by default JS willn't allow the DROP operation. But, here we need to add DROP Operation
        event.preventDefault();
        const listElement = this.elementToInsert.querySelector("ul")!;
        listElement.classList.add("droppable");
    }

    @Autobind
    dropHandler (event: DragEvent): void {
        const projId  = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(projId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
    }

    @Autobind
    dragLeaveHandler (_: DragEvent): void {
        const listElement = this.elementToInsert.querySelector("ul")!;
       listElement.classList.remove("droppable");   
    }
} 

//  ProjectInput Class
class ProjectInput extends Component<HTMLFormElement, HTMLElement> {
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


const projInput = new ProjectInput();

const activeProjList = new ProjectList('active');
const finishedProjList = new ProjectList('finished');

