import { Component, Input, OnInit, inject } from '@angular/core';
import { Tutorial } from '../../models/tutorial.model';
import { TutorialService } from '../../services/tutorial.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tutorial-detail',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './tutorial-detail.component.html',
  styleUrl: './tutorial-detail.component.css'
})
export class TutorialDetailComponent implements OnInit {
  
  @Input() viewMode: boolean = false;

  @Input() currentTutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };
  
  message: string = '';

  tutorialService: TutorialService = inject(TutorialService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTutorial(this.route.snapshot.params["id"]);
    }
  }

  getTutorial(id: string): void {
    this.tutorialService.findById(id)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.currentTutorial = data;
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status
    };

    this.message = '';

    this.tutorialService.update(this.currentTutorial.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentTutorial.published = status;
          this.message = 'El estado fue actualizado correctamente';
        },
        error: (e) => console.error(e)
      });
  }

  updateTutorial(): void {
    this.message = '';

    this.tutorialService.update(this.currentTutorial.id, this.currentTutorial)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = 'Este tutorial fue actualizado correctamente';
        },
        error: (e) => console.error(e)
      });
  }

  deleteTutorial(): void {
    this.tutorialService.delete(this.currentTutorial.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/tutoriales']);
        },
        error: (e) => console.error(e)
      });
  }

}
