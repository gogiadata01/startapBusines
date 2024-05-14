import { Component, OnInit, OnDestroy } from '@angular/core';
import {  ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-carousel-basic',
  standalone: true,
  imports: [  NgbCarouselModule, FormsModule],
  templateUrl: './carousel-basic.component.html',
  styleUrl: './carousel-basic.component.scss'
})
export class CarouselBasicComponent {
  // images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);
  images: string[] = [
    'https://www.4sstudyabroad.com/wp-content/uploads/2022/02/Tbilisi-Open-University.png',
    'https://eurofasad.ge/_static/2009/09/76/8a3c26198e7e499b90aac6d0e31275e4/sakarvelos-univer_1.jpg',
    'https://cdn.thinglink.me/api/image/731079129906020352/1024/10/scaletowidth/0/0/1/1/false/true?wait=true',
	
  ];

	paused = false;
	unpauseOnArrow = false;
	pauseOnIndicator = false;
	pauseOnHover = true;
	pauseOnFocus = true;

	@ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

	togglePaused() {
		if (this.paused) {
			this.carousel.cycle();
		} else {
			this.carousel.pause();
		}
		this.paused = !this.paused;
	}

	onSlide(slideEvent: NgbSlideEvent) {
		if (
			this.unpauseOnArrow &&
			slideEvent.paused &&
			(slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
		) {
			this.togglePaused();
		}
		if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
			this.togglePaused();
		}
	}
}