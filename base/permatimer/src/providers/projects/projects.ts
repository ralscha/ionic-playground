import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {reorderArray} from 'ionic-angular';
import {ProjectModel} from "../../models/project-model";

@Injectable()
export class ProjectsProvider {

  projects: any[] = [];
  projectActive = false;
  timerInterval: any;
  secondsElapsed: number = 0;

  constructor(private readonly storage: Storage) {
  }

  load(): void {
    this.storage.get('permatimerProjects').then((projects) => {
      if (projects) {
        for (let project of projects) {
          let savedProject = new ProjectModel(project.name, new Date(project.lastChecked), project.totalSeconds, project.active);
          this.projects.push(savedProject);

          if (project.active) {
            this.startTiming(savedProject, true);
          }
        }
      }
    });

    this.storage.get('permatimerTime').then((time) => {
      this.secondsElapsed = time;
    });
  }

  save(): void {
    this.storage.set('permatimerProjects', this.projects);
    this.storage.set('permatimerTime', this.secondsElapsed);
  }

  reorder(indexes): void {
    this.projects = reorderArray(this.projects, indexes);
    this.save();
  }

  startTiming(project, restarting): void {

    this.projectActive = true;

    if (!restarting) {
      project.setIsActive(true);
      project.setLastChecked(new Date());
    }

    this.timerInterval = setInterval(() => {
      const now = new Date();
      const timeDifference = now.getTime() - project.lastChecked.getTime();
      const seconds = timeDifference / 1000;

      this.secondsElapsed += seconds;
      project.addToTotalSeconds(seconds);

      project.setLastChecked(now);
      this.save();

    }, 1000);
  }

  stopTiming(project): number {

    const totalTimeElapsed = this.secondsElapsed;

    this.projectActive = false;

    project.setIsActive(false);
    clearInterval(this.timerInterval);
    this.timerInterval = false;
    this.secondsElapsed = 0;
    this.save();

    return totalTimeElapsed;

  }

  increaseSeconds(project, amount): void {
    project.addToTotalSeconds(amount);
    this.save();
  }

  decreaseSeconds(project, amount): void {
    project.deductFromTotalSeconds(amount);
    this.save();
  }

  addProject(project): void {
    this.projects.push(project);
    this.save();
  }

  editProject(project, title): void {
    project.setName(title);
    this.save();
  }

  removeProject(project): void {
    const index = this.projects.indexOf(project);
    if (index > -1) {
      this.projects.splice(index, 1);
      this.save();
    }
  }

}
