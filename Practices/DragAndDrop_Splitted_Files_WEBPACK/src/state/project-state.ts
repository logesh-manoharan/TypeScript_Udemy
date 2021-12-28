import { Project, ProjectStatus } from '../models/project';

type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListeners (listenerFunc: Listener<T>) {
        this.listeners.push(listenerFunc);
    }
}

// Creating PROJECCT STATE using 'class' [STATE should be ONLY ONE. So, we are creating the SINGLETON class]
export class ProjectState extends State<Project> {
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

export const projectState = ProjectState.getInstance();