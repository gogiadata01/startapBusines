import { Component, HostListener, Input, OnInit, OnDestroy, NgZone, ViewChild } from '@angular/core';
import { QuizService } from '../../quiz.service';
import { QuizDto } from '../../core/models/common.model';
import { Subscription, interval } from 'rxjs';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink} from '@angular/router';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component'
import { gsap } from 'gsap';
import {  AfterViewInit,  ViewChildren, QueryList } from '@angular/core';
import { ElementRef, } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-quize',
  standalone: true,
  imports: [FooterForPupilComponent,CommonModule, NgIf, NgFor,RouterLink],
  templateUrl: './quize.component.html',
  styleUrls: ['./quize.component.scss']
})
export class QuizeComponent implements OnInit, OnDestroy {
  quiz: QuizDto | undefined;
  currentQuestionIndex: number = 0;
  selectedAnswers: string[] = []; // Store selected answers for each question
  correctAnswersCount: number = 0;
  incorrectAnswersCount: number = 0;
  allAnswers: string[] = [];
  isLoading: boolean = true;
  showQuiz: boolean = false;

  quizStarted: boolean = false;


  // This function toggles the quiz visibility
  startQuiz() {
    this.quizStarted = true;  // Set to true when the button is clicked

    this.showQuiz = true;
  }
  totalQuizTimeInSeconds = 15 * 60; // Example: 15 minutes in seconds
  timeLeftForQuiz: number = this.totalQuizTimeInSeconds;
  quizIntervalSubscription: Subscription | undefined;

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone ,private quizService: QuizService) {}

  ngOnInit(): void {
    this.getQuiz();
    this.startQuizTimer(); // Start the timer when the quiz starts
    const photoElement = document.querySelector('.photo-class') as HTMLElement;
    if (photoElement) {
      this.photoHeight = photoElement.offsetHeight;
    }

    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'scroll')
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.onWindowScroll();
        });
    });
  }
  onWindowScroll() {
    const scrolled = window.scrollY > 200;
  
    if (scrolled && !this.isNavbarVisible) {
      this.isNavbarVisible = true;
      this.slideDownNavbar();
      const button =  document.getElementById("firstNavbarl")
      if (button){
        const isExpanded = button.getAttribute("aria-expanded") === "true";
        if(isExpanded){
          button.click()}
      }
    } else if (!scrolled && this.isNavbarVisible) {
      this.isNavbarVisible = false;
      this.slideUpNavbar();
      const button =  document.getElementById("secondNavbar2")
    
      if (button){
        const isExpanded = button.getAttribute("aria-expanded") === "true";
        if(isExpanded){button.click()}
      }
    }
  }
  slideDownNavbar() {
    gsap.to(this.secondNavbar.nativeElement, { y: 0, duration: 0.3, ease: 'power2.out' });
  }
  
  slideUpNavbar() {
    gsap.to(this.secondNavbar.nativeElement, { y: -100, duration: 0.3, ease: 'power2.in' }); // Adjust -60 based on your navbar height
  }

  ngOnDestroy(): void {
    if (this.quizIntervalSubscription) {
      this.quizIntervalSubscription.unsubscribe();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }
  @ViewChild('secondNavbar') secondNavbar!: ElementRef;
  private isNavbarVisible = false;
  private destroy$ = new Subject<void>();
  private photoHeight = 0;

  startQuizTimer(): void {
    // Subscribe to an interval observable that ticks every second
    this.quizIntervalSubscription = interval(1000).subscribe(() => {
      if (this.timeLeftForQuiz > 0) {
        this.timeLeftForQuiz--;
      } else {
        this.endQuiz(); // End the quiz if time runs out
      }
    });
  }

  endQuiz(): void {
    if (this.quizIntervalSubscription) {
      this.quizIntervalSubscription.unsubscribe();
    }
    this.isLoading = true; // Stop the quiz and show the results
  }

  getQuiz(): void {
    this.quizService.getQuizById(7).subscribe(
      (quiz: QuizDto) => {
        this.quiz = quiz;
        this.isLoading = false;
        this.loadAnswers();
      },
      (error) => {
        console.error('Error loading quiz:', error);
        this.isLoading = false;
      }
    );
  }

  loadAnswers(): void {
    if (this.quiz && this.quiz.questions && this.quiz.questions.length > 0) {
      const currentQuestion = this.quiz.questions[this.currentQuestionIndex];
      this.allAnswers = [
        ...currentQuestion.incorrectAnswers.map((a) => a.inccorectAnswer),
        currentQuestion.correctanswer
      ];
      this.shuffle(this.allAnswers);
    }
  }

  selectAnswer(answer: string): void {
    this.selectedAnswers[this.currentQuestionIndex] = answer;
  }

  nextQuestion(): void {
    if (!this.quiz || !this.quiz.questions) return;

    const currentQuestion = this.quiz.questions[this.currentQuestionIndex];
    const selectedAnswer = this.selectedAnswers[this.currentQuestionIndex];

    if (selectedAnswer === currentQuestion.correctanswer) {
      this.correctAnswersCount++;
    } else {
      this.incorrectAnswersCount++;
    }

    this.currentQuestionIndex++;

    if (this.currentQuestionIndex < this.quiz.questions.length) {
      this.loadAnswers();
    } else {
      this.endQuiz();
    }
  }

  restartQuiz(): void {
    this.currentQuestionIndex = 0;
    this.correctAnswersCount = 0;
    this.incorrectAnswersCount = 0;
    this.selectedAnswers = [];
    this.timeLeftForQuiz = this.totalQuizTimeInSeconds;
    this.getQuiz();
    this.startQuizTimer(); // Restart the quiz timer
  }

  shuffle(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
}