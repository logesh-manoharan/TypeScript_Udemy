/// <reference path="../components/base-component.ts" />
/// <reference path="../decorators/decorators.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../models/drag-drop.ts" />

namespace App {
    // ProjectItem Class
    export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> 
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
}