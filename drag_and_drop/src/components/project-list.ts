import { Component } from './base-component.js';
import { DragTarget } from '../models/drag-drop-interfaces.js';
import { Project } from '../models/project-model.js';
import { autobind } from '../decorators/autobind.js';
import { projectState } from '../state/state.js';
import { ProjectStatus } from '../models/project-model.js';
import { ProjectItem } from './project-item.js';

export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
{
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    @autobind
    dragOverHandler(event: DragEvent) {
        if (
            event.dataTransfer &&
            event.dataTransfer.types[0] === 'text/plain'
        ) {
            event.preventDefault();
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.add('droppable');
        }
    }
    @autobind
    dropHandler(event: DragEvent) {
        const projectId = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(
            projectId,
            this.type === 'active'
                ? ProjectStatus.Active
                : ProjectStatus.Finished
        );
    }
    @autobind
    dragLeaveHandler(_: DragEvent) {
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable');
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);

        projectState.addListener((projects: Project[]) => {
            const relevantProject = projects.filter((project) => {
                if (this.type === 'active') {
                    return project.status === ProjectStatus.Active;
                }
                return project.status === ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProject;
            this.renderProjects();
        });
    }

    private renderProjects() {
        const listEl = document.getElementById(
            `${this.type}-projects-list`
        )! as HTMLUListElement;
        listEl.innerHTML = '';
        for (const prjItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
        }
    }

    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent =
            this.type.toUpperCase() + ' PROJECTS';
    }
}
