import { Component, inject } from '@angular/core';
import { Tutorial } from '../../models/tutorial.model';
import { TutorialService } from '../../services/tutorial.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tutorial-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tutorial-add.component.html',
  styleUrl: './tutorial-add.component.css'
})
export class TutorialAddComponent {

  tutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };

  submitted: boolean = false;

  tutorialService: TutorialService = inject(TutorialService);

  saveTutorial(): void {
    const data = {
      title: this.tutorial.title,
      description: this.tutorial.description,
    };
    this.tutorialService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      title: '',
      description: '',
      published: false
    };
  }
}
