import { Component, OnInit, inject } from '@angular/core';
import { Tutorial } from '../../models/tutorial.model';
import { TutorialService } from '../../services/tutorial.service';
import { FormsModule } from '@angular/forms';
import { TutorialDetailComponent } from '../tutorial-detail/tutorial-detail.component';

@Component({
  selector: 'app-tutorial-list',
  standalone: true,
  imports: [FormsModule, TutorialDetailComponent],
  templateUrl: './tutorial-list.component.html',
  styleUrl: './tutorial-list.component.css'
})
export class TutorialListComponent implements OnInit {
  tutoriales?: Tutorial[];
  currentTutorial: Tutorial = {};
  currentIndex: number = -1;
  title: string = '';

  tutorialService: TutorialService = inject(TutorialService);

  ngOnInit(): void {
    this.retrieveTutoriales();
  }

  retrieveTutoriales(): void {
    this.tutorialService.findAll()
      .subscribe({
        next: (data) => {
          console.log(data);
          this.tutoriales = data;
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveTutoriales();
    this.currentTutorial = {};
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.tutorialService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentTutorial = {};
    this.currentIndex = -1;

    this.tutorialService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.tutoriales = data;
        },
        error: (e) => console.error(e)
      });
  }
}
