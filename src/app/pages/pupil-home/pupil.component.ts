import { Component, OnInit, } from '@angular/core';
import { NavbarForPupilComponent } from '../navbar-for-pupil/navbar-for-pupil.component';
import {Icard} from "../../core/models/common.model";
import {CreateFormService} from "../../core/services/create-form.service";
import { DrawerComponent } from '../../drawer/drawer.component';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component';
import {HomeCardComponent} from '../home-card/home-card.component';
import {CarouselComponent} from '../../carousel/carousel.component';
import { RouterLink } from '@angular/router';
<<<<<<< Updated upstream:src/app/pages/pupil-home/pupil.component.ts
import { UniProgramsComponent } from '../uni-programs/uni-programs.component';
=======
import { Router } from '@angular/router';


interface NavLink {
  label: string;
  url: string;
}
>>>>>>> Stashed changes:src/app/pages/pupil/pupil.component.ts

@Component({
  selector: 'app-pupil',
  standalone: true,
<<<<<<< Updated upstream:src/app/pages/pupil-home/pupil.component.ts
  imports: [NavbarForPupilComponent, DrawerComponent,FooterForPupilComponent,HomeCardComponent, CarouselComponent,RouterLink, UniProgramsComponent],
=======
  imports: [NavbarForPupilComponent, DrawerComponent,FooterForPupilComponent,HomeCardComponent, CarouselComponent,RouterLink,],
>>>>>>> Stashed changes:src/app/pages/pupil/pupil.component.ts
  templateUrl: './pupil.component.html',
  styleUrl: './pupil.component.scss'
})
export class PupilComponent  {
<<<<<<< Updated upstream:src/app/pages/pupil-home/pupil.component.ts
=======
//   cards:Icard[] = []
// constructor(private cardService: CreateFormService) {
// }
// ngOnInit() {
//     this.getAllCard()
// }
// getAllCard(){
//     this.cardService
//       .getAllHomeUniCard()
//       .snapshotChanges()
//       .subscribe({
//         next:(data) =>{
//           this.cards = [];
//           data.forEach((item) => {
//             let Uni = item.payload.toJSON() as Icard
//             this.cards.push({
//               key : item.key || '',
//               title : Uni.title ,
//               mainText: Uni.mainText,
//               url:Uni.url
//               }
//             )
//           })
//         }
//       })
// }




navLinks: NavLink[] = [
  { label: 'პროგრამები', url: '/programs' },
  { label: 'სიახლეები', url: '/news' },
  { label: 'გზამკვლევი', url: '/guide' }
];

constructor(private router: Router) {}

navigate(url: string) {
  this.router.navigate([url]);
}

isActive(link: NavLink): boolean {
  return this.router.isActive(link.url, true);
}






>>>>>>> Stashed changes:src/app/pages/pupil/pupil.component.ts
}

