namespace App {
    // to reduce the duplication of coding stuffs [by introducing the INHERITANCE Concepts]
    // ...with GENERIC Types
    export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
}