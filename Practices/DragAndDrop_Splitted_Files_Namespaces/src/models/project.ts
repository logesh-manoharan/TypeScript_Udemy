namespace App {
    export enum ProjectStatus {
        Active,
        Finished
    }

    // To create the STRUCTURE OF THE 'PROJECT'
    export class Project {
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
}