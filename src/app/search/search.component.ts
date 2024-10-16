// import { CommonModule } from '@angular/common';
// import { Component, OnInit} from '@angular/core';


// @Component({
//   selector: 'app-search',
//   standalone: true,
//   imports: [SearchComponent  ],
//   templateUrl: './search.component.html',
//   styleUrls: ['./search.component.scss']

// })
// export class SearchComponent implements OnInit {

//   bubbles = Array(7).fill(null);
//   sColor = '#4C83F0';
//   inputVisible = false;
//   inputValue = '';

//   ngOnInit() {
//       this.bubbling();
//   }

//   bubbling(counter = 0) {
//       if (counter < this.bubbles.length) {
//           setTimeout(() => {
//               this.bubbles[counter] = 'animate';
//               this.bubbling(counter + 1);
//           }, 80);
//       }
//   }

//   onMouseOver() {
//       this.bubbles[0] = 'animate';
//       this.sColor = '#333333';
//       this.inputVisible = true;
//   }

//   onMouseOut() {
//       this.bubbles[0] = '';
//       this.sColor = '#4C83F0';
//       this.inputValue = '';
//       this.inputVisible = false;
//   }

//   bubbleStyle(index: number) {
//       return {
//           left: index * 50 + 'px',
//           width: this.bubbles[index] ? '350px' : '50px',
//           borderRadius: this.bubbles[index] ? '10px' : '50%',
//           transition: 'all 1s'
//       };
//   }

// }
