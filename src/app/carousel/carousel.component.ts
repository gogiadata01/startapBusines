import { Component, Input, OnInit} from '@angular/core';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';



@Component({
  selector: 'app-carousel',
  standalone: true,
  imports:  [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit {

  items = [
    {
      image: 'https://tsu.ge/assets/media/files/84/2024%20ivnisi/232.jpg',
      title: 'ლონდონის ქინგს ქოლეჯის უნივერსიტეტელი მკვლევარი',
      description: ''
    },
    {
      image: 'https://cms.alte.ge/storage/gallery/JlGNyRlDO6.jpg',
      title: 'ალტე უნივერსიტეტის სიახლე',
      description: ''
    },
    {
      image: 'https://ugschool.edu.ge/storage/school-news/April2020/6pQYdGsh6ZZlaV9PQm7g.jpg',
      title: 'საქართვეოს უნივერსიტეტის სიახლე',
      description: ''
    },
    {
      image: 'https://tsu.ge/assets/media/files/21/Untitled-1.jpg',
      title: 'სიახლე',
      description: ''
    },
    {
      image: 'https://ugschool.edu.ge/storage/school-news/April2020/6pQYdGsh6ZZlaV9PQm7g.jpg',
      title: 'სიახლე',
      description: ''
    },
    
  ];

  currentIndex = 0;
  intervalId: any;

  constructor() { }

  ngOnInit() {
    this.startAutoSlide();
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex === 0) ? this.items.length - 1 : this.currentIndex - 1;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex === this.items.length - 1) ? 0 : this.currentIndex + 1;
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change the delay (in milliseconds) as needed
  }

  stopAutoSlide() {
    clearInterval(this.intervalId);
  }
  

}

