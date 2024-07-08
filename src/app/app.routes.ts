import { Routes } from '@angular/router';
import { TutorialListComponent } from './components/tutorial-list/tutorial-list.component';
import { TutorialDetailComponent } from './components/tutorial-detail/tutorial-detail.component';
import { TutorialAddComponent } from './components/tutorial-add/tutorial-add.component';

export const routes: Routes = [
    { path: '', redirectTo: 'tutoriales', pathMatch: 'full' },
    { path: 'tutoriales', component: TutorialListComponent },
    { path: 'tutoriales/:id', component: TutorialDetailComponent },
    { path: 'add', component: TutorialAddComponent },
];
