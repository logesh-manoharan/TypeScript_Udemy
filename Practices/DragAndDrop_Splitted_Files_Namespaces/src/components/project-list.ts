/// <reference path="../components/base-component.ts" />
/// <reference path="../decorators/decorators.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../models/drag-drop.ts" />

namespace App {
    // ProjectList Class
    export class ProjectList extends Component<HTMLDivElement, HTMLElement> 
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
}