// import { Component, HostListener, Input, OnInit, OnDestroy, NgZone, ViewChild } from '@angular/core';
// import { QuizService } from '../../quiz.service';
// import { QuizDto } from '../../core/models/common.model';
// import { Subscription, interval } from 'rxjs';
// import { CommonModule, NgFor, NgIf, DatePipe } from '@angular/common'; // Add DatePipe here
// import { RouterLink } from '@angular/router';
// import { FooterForPupilComponent } from '../footer-for-pupil/footer-for-pupil.component';
// import { gsap } from 'gsap';
// import { AfterViewInit, ViewChildren, QueryList } from '@angular/core';
// import { ElementRef } from '@angular/core';
// import { Subject, fromEvent } from 'rxjs';
// import { ChangeDetectorRef } from '@angular/core';
// import { takeUntil } from 'rxjs/operators';
// import { Router } from '@angular/router';
// import { UserDto } from '../../core/models/common.model';
// import { ActivatedRoute } from '@angular/router';
// import { AuthenticationService } from '../../authentication.service';
// import { data } from 'jquery';
// @Component({
//   selector: 'app-quize',
//   standalone: true,
//   imports: [DatePipe,FooterForPupilComponent,CommonModule, NgIf, NgFor,RouterLink],
//   templateUrl: './quize.component.html',
//   styleUrls: ['./quize.component.scss']
// })
// export class QuizeComponent implements OnInit, OnDestroy {
//   quiz: QuizDto | undefined;
//   currentQuestionIndex: number = 0;
//   selectedAnswers: string[] = []; // Store selected answers for each question
//   correctAnswersCount: number = 0;
//   incorrectAnswersCount: number = 0;
//   allAnswers: string[] = [];
//   isLoading: boolean = true;
//   showQuiz: boolean = false;
//   currentUser: UserDto | null = null;
//   quizStarted: boolean = false;
//   currentTime:any
//   totalQuizTimeInSeconds = 15 * 60; // 15 minutes in seconds
//   timeLeftForQuiz: number = this.totalQuizTimeInSeconds;
//   quizIntervalSubscription: Subscription | undefined;

//   constructor(
//     private router: Router,
//     private authService: AuthenticationService,
//     private cdr: ChangeDetectorRef,
//     private ngZone: NgZone,
//     private quizService: QuizService,
//     private route: ActivatedRoute,
//   ) {}

//   ngOnInit(): void {
//     this.checkCurrentUser(); // Check the current user when the component initializes
//     this.getQuiz();
//     this.startQuizTimer(); // Start the timer when the quiz starts

//     this.ngZone.runOutsideAngular(() => {
//       fromEvent(window, 'scroll')
//         .pipe(takeUntil(this.destroy$))
//         .subscribe(() => {
//           this.onWindowScroll();
//         });
//     });
//     // const today = this.datePipe.transform(new Date(), 'MM/dd HH:mm');
//     // console.log(today);
//   }
//   checkCurrentUser(): void {
//     // Check if the user is logged in or registered
//     this.currentUser = this.authService.getCurrentUserValue();
//     if (!this.currentUser) {
//       console.warn('No user logged in.');
//     } else {
//       console.log('User logged in:', this.currentUser);
//     }
//   }

//   startQuiz(): void {
//     // If user is not registered or logged in, navigate to the registration page
//     if (!this.currentUser) {
//       this.router.navigate(['/Register']); // Navigate to the Register page
//     } else {
//       // If user is registered, start the quiz
//       this.quizStarted = true;
//       this.showQuiz = true;
//     }
//   }
//   // formatDate(date: Date): string {
//   //   return this.datePipe.transform(date, 'MM/dd HH:mm') || ''; // Example format: 09/21 14:30
//   // }

//   onWindowScroll() {
//     const scrolled = window.scrollY > 200;
  
//     if (scrolled && !this.isNavbarVisible) {
//       this.isNavbarVisible = true;
//       this.slideDownNavbar();
//       const button = document.getElementById("firstNavbarl");
//       if (button) {
//         const isExpanded = button.getAttribute("aria-expanded") === "true";
//         if (isExpanded) {
//           button.click();
//         }
//       }
//     } else if (!scrolled && this.isNavbarVisible) {
//       this.isNavbarVisible = false;
//       this.slideUpNavbar();
//       const button = document.getElementById("secondNavbar2");
//       if (button) {
//         const isExpanded = button.getAttribute("aria-expanded") === "true";
//         if (isExpanded) {
//           button.click();
//         }
//       }
//     }
//   }

//   slideDownNavbar() {
//     gsap.to(this.secondNavbar.nativeElement, { y: 0, duration: 0.3, ease: 'power2.out' });
//   }

//   slideUpNavbar() {
//     gsap.to(this.secondNavbar.nativeElement, { y: -100, duration: 0.3, ease: 'power2.in' }); // Adjust -60 based on your navbar height
//   }

//   ngOnDestroy(): void {
//     if (this.quizIntervalSubscription) {
//       this.quizIntervalSubscription.unsubscribe();
//     }
//     this.destroy$.next();
//     this.destroy$.complete();
//   }

//   @ViewChild('secondNavbar') secondNavbar!: ElementRef;
//   private isNavbarVisible = false;
//   private destroy$ = new Subject<void>();
//   private photoHeight = 0;

//   startQuizTimer(): void {
//     // Subscribe to an interval observable that ticks every second
//     this.quizIntervalSubscription = interval(1000).subscribe(() => {
//       if (this.timeLeftForQuiz > 0) {
//         this.timeLeftForQuiz--;
//       } else {
//         this.endQuiz(); // End the quiz if time runs out
//       }
//     });
//   }

//   endQuiz(): void {
//     if (this.quizIntervalSubscription) {
//       this.quizIntervalSubscription.unsubscribe();
//     }
//     this.isLoading = true; // Stop the quiz and show the results
//   }

//   getQuiz(): void {
//   this.quizService.getQuizByTime(this.currentTime).subscribe(
//     (quizzes: QuizDto[]) => {
//       if (quizzes && quizzes.length > 0) {
//         this.quiz = quizzes[0]; // Assuming you want the first matching quiz
//         this.isLoading = false;
//         this.loadAnswers();
//       } else {
//         console.error('No quiz found for today');
//         this.isLoading = false;
//       }
//     },
//     (error) => {
//       console.error('Error loading quiz by time:', error);
//       this.isLoading = false;
//     }
//   );
//   }

//   loadAnswers(): void {
//     if (this.quiz && this.quiz.questions && this.quiz.questions.length > 0) {
//       const currentQuestion = this.quiz.questions[this.currentQuestionIndex];
//       this.allAnswers = [
//         ...currentQuestion.incorrectAnswers.map((a) => a.inccorectAnswer),
//         currentQuestion.correctanswer
//       ];
//       this.shuffle(this.allAnswers);
//     }
//   }

//   selectAnswer(answer: string): void {
//     this.selectedAnswers[this.currentQuestionIndex] = answer;
//   }

//   nextQuestion(): void {
//     if (!this.quiz || !this.quiz.questions) return;

//     const currentQuestion = this.quiz.questions[this.currentQuestionIndex];
//     const selectedAnswer = this.selectedAnswers[this.currentQuestionIndex];

//     if (selectedAnswer === currentQuestion.correctanswer) {
//       this.correctAnswersCount++;
//     } else {
//       this.incorrectAnswersCount++;
//     }

//     this.currentQuestionIndex++;

//     if (this.currentQuestionIndex < this.quiz.questions.length) {
//       this.loadAnswers();
//     } else {
//       this.endQuiz();
//     }
//   }

//   restartQuiz(): void {
//     this.currentQuestionIndex = 0;
//     this.correctAnswersCount = 0;
//     this.incorrectAnswersCount = 0;
//     this.selectedAnswers = [];
//     this.timeLeftForQuiz = this.totalQuizTimeInSeconds;
//     this.getQuiz();
//     this.startQuizTimer(); // Restart the quiz timer
//   }

//   shuffle(array: any[]): void {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//   }

//   formatTime(seconds: number): string {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
//   }
// }
import { Component, HostListener, Input, OnInit, OnDestroy, NgZone, ViewChild } from '@angular/core';
import { QuizService } from '../../quiz.service';
import { QuizDto } from '../../core/models/common.model';
import { Subscription, interval } from 'rxjs';
import { CommonModule, NgFor, NgIf, DatePipe, formatDate } from '@angular/common'; // Add DatePipe here
import { RouterLink } from '@angular/router';
import { FooterForPupilComponent } from '../footer-for-pupil/footer-for-pupil.component';
import { gsap } from 'gsap';
import { AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserDto } from '../../core/models/common.model';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import {UserService} from '../../user.service'

@Component({
  selector: 'app-quize',
  standalone: true,
  imports: [DatePipe, FooterForPupilComponent, CommonModule, NgIf, NgFor, RouterLink],
  templateUrl: './quize.component.html',
  styleUrls: ['./quize.component.scss'],
  providers: [DatePipe] // Ensure DatePipe is provided
})
export class QuizeComponent implements OnInit, OnDestroy {
  quiz: QuizDto | undefined;
  currentQuestionIndex: number = 0;
  selectedAnswers: string[] = [];
  correctAnswersCount: number = 0;
  incorrectAnswersCount: number = 0;
  allAnswers: string[] = [];
  isLoading: boolean = true;
  showQuiz: boolean = false;
  currentUser: UserDto | null = null;
  quizStarted: boolean = false;
  currentTime: any;
  quizFoundTime: Date | null = null; // To track when the quiz was found
  totalQuizTimeInSeconds = 15 * 60; // 15 minutes in seconds
  timeLeftForQuiz: number = this.totalQuizTimeInSeconds;
  quizIntervalSubscription: Subscription | undefined;
  user: any;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private quizService: QuizService,
    private route: ActivatedRoute,
    private datePipe: DatePipe, // Inject DatePipe here
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.checkCurrentUser();
    this.getQuiz();
    this.startQuizTimer();

    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'scroll')
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.onWindowScroll();
        });
    });
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  checkCurrentUser(): void {
    this.currentUser = this.authService.getCurrentUserValue();
    if (!this.currentUser) {
      console.warn('No user logged in.');
    } else {
      console.log('User logged in:', this.currentUser);
    }
  }

  startQuiz(): void {
    if (!this.currentUser) {
      this.router.navigate(['/Register']);
    } else {
      this.quizStarted = true;
      this.showQuiz = true;
    }
  }

  onWindowScroll() {
    const scrolled = window.scrollY > 200;
    if (scrolled && !this.isNavbarVisible) {
      this.isNavbarVisible = true;
      this.slideDownNavbar();
    } else if (!scrolled && this.isNavbarVisible) {
      this.isNavbarVisible = false;
      this.slideUpNavbar();
    }
  }

  slideDownNavbar() {
    gsap.to(this.secondNavbar.nativeElement, { y: 0, duration: 0.3, ease: 'power2.out' });
  }

  slideUpNavbar() {
    gsap.to(this.secondNavbar.nativeElement, { y: -100, duration: 0.3, ease: 'power2.in' });
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
    // Unsubscribe from the quiz timer if it's running
    if (this.quizIntervalSubscription) {
      this.quizIntervalSubscription.unsubscribe();
    }
    
    // Optionally, show a loading state when the quiz ends
    this.isLoading = true; 
    console.log("Quiz has ended due to time expiration or completion.");
  
    // Check if the user is logged in
    if (this.user) {
      // Calculate the new coin value based on correct answers
      const newCoinValue = this.user.coin + this.correctAnswersCount;
  
      // Call the userService to update the user's coin balance
      this.userService.updateUserCoin(this.user.id, newCoinValue).subscribe(
        (response) => {
          console.log('Coin updated successfully:', response);
  
          // Update the user object with the new coin value
          this.user.coin = newCoinValue;
  
          // Persist the updated user in the authentication service
          this.authService.setCurrentUser(this.user);
  
          // Optionally, hide the loading state after updating
          this.isLoading = false;
  
          // You can also navigate to a results page or show a success message
        },
        (error) => {
          console.error('Error updating coin:', error);
  
          // Optionally, hide the loading state on error
          this.isLoading = false;
        }
      );
    } else {
      console.error('No user is logged in.');
      // Optionally, handle the case where no user is logged in
      this.isLoading = false;
    }
  }
  

  // getQuiz(): void {
  //   const now = new Date(); // Current date and time
  //   const formattedTime = formatDate(now, 'MM/dd HH:mm', 'en-US');    
  //   // Check if a quiz was found within the last hour
  //   if (this.quizFoundTime && now.getTime() - this.quizFoundTime.getTime() < 60 * 60 * 1000) {
  //     console.log('Quiz found within the last hour, reusing it.');
  //     return;
  //   }
    
  //   // Format current date and time using DatePipe
  //   console.log('Formatted Date:', formattedTime); // Log the formatted time to verify
  
  //   // Ensure the formatted date is URL-encoded to prevent 404 errors
  //   const encodedToday = encodeURIComponent(formattedTime!); // This encodes spaces and slashes
  
  //   this.quizService.getQuizByTime(encodedToday).subscribe(
  //     (quizzes: QuizDto[]) => {
  //       if (quizzes && quizzes.length > 0) {
  //         this.quiz = quizzes[0]; // Assuming you want the first matching quiz
  //         this.isLoading = false;
  //         this.loadAnswers();
  //       } else {
  //         console.error('No quiz found for today');
  //         this.isLoading = false;
  //       }
  //     },
  //     (error) => {
  //       console.error('Error loading quiz by time:', error);
  //       this.isLoading = false;
  //     }
  //   );
  // }
  quizCompleted() {
    this.showQuiz = false;  // Hides the quiz
    this.endQuiz();  // Calls the endQuiz method to add coins to the user
  }
  getQuiz(): void {
    const now = new Date(); // Get the current date and time
  
    // If a quiz was found within the last 15 minutes, reuse it
    if (this.quizFoundTime && (now.getTime() - this.quizFoundTime.getTime()) < (15 * 60 * 1000)) {
      console.log('Quiz found within the last 15 minutes, reusing it.');
      return;
    }
  
    // Update the time when the quiz was found
    this.quizFoundTime = now;
  
    // Format the current time using DatePipe
    const formattedTime = this.datePipe.transform(now, 'MM/dd HH:mm');
  
    if (!formattedTime) {
      console.error('Failed to format the current time.');
      this.isLoading = false;
      return;
    }
  
    // URL-encode the formatted time
    const encodedTime = encodeURIComponent(formattedTime);
  
    // Set loading state
    this.isLoading = true;
  
    // Fetch quiz by the encoded time
    this.quizService.getQuizByTime(encodedTime).subscribe(
      (quizzes: QuizDto[]) => {
        if (quizzes && quizzes.length > 0) {
          this.quiz = quizzes[0]; // Use the first quiz that matches the time
          this.loadAnswers(); // Load the answers for the quiz
        } else {
          console.error('No quiz found for the specified time.');
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching quiz:', error);
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
