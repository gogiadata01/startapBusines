// import { Component, OnInit } from '@angular/core';
// import { QuizService } from '../../quiz.service';
// import { QuizDto } from '../../core/models/common.model';
// import { Subscription, interval } from 'rxjs';
// import { CommonModule, DatePipe } from '@angular/common';
// import { Router } from '@angular/router';
// import { UserDto } from '../../core/models/common.model';
// import { AuthenticationService } from '../../authentication.service';
// import { UserService } from '../../user.service';
// import Swal from 'sweetalert2';
// import { FooterForPupilComponent } from "../footer-for-pupil/footer-for-pupil.component";
// import { NavbarWithWaveComponent } from "../navbar-with-wave/navbar-with-wave.component";

// @Component({
//   selector: 'app-quize',
//   standalone: true,
//   imports: [DatePipe, CommonModule, FooterForPupilComponent, NavbarWithWaveComponent],
//   templateUrl: './quize.component.html',
//   styleUrls: ['./quize.component.scss'],
//   providers: [DatePipe]
// })
// export class QuizeComponent implements OnInit {
//   quiz: QuizDto | undefined;
//   currentQuestionIndex = 0;
//   selectedAnswers: string[] = [];
//   correctAnswersCount = 0;
//   incorrectAnswersCount = 0;
//   allAnswers: string[] = [];
//   isLoading = true;
//   showQuiz = false;
//   quizStarted = false;
//   quizCompleted = false;
//   bonusQuestionAnswered = false;
//   totalQuizTimeInSeconds = 6 * 60; 
//   timeLeftForQuiz = this.totalQuizTimeInSeconds;
//   quizIntervalSubscription: Subscription | undefined;
//   currentUser: UserDto | null = null;
//   user!: UserDto;
//   quizFinished: boolean = false;
//   quizFoundTime: Date | null = null;

//   // New properties for bonus question
//   bonusQuestion: any;
//   isBonusQuestion = false;
//   bonusAnswerSelected: string | null = null;

//   constructor(
//     private router: Router,
//     private authService: AuthenticationService,
//     private quizService: QuizService,
//     private userService: UserService,
//     private datePipe: DatePipe
//   ) {}

//   ngOnInit(): void {
//     this.checkCurrentUser();
//     this.getQuiz();
//     this.authService.currentUser$.subscribe(user => {
//       this.user = user as UserDto;
//     });
//     this.startQuizTimer();
//     Swal.fire({
//       title: 'გაფრთხილება',
//       text: 'პრიზის მოგების შემთხვევაში საჭიროა მოსწავლის საბუთის ჩევენება.',
//       icon: 'info',
//       confirmButtonText: 'OK'
//     });
//   }

//   checkCurrentUser(): void {
//     this.currentUser = this.authService.getCurrentUserValue();
//     if (!this.currentUser) {
//       this.router.navigate(['/Register']);
//     }
//   }

//   startQuiz(): void {
//     if (this.quizFinished) {
//       Swal.fire({
//         title: 'შენ უკვე გაიარე ქვიზი',
//         text: 'შენ უკვე გაიარე ქვიზი, დაელოდე შემდეგს',
//         icon: 'warning',
//         confirmButtonText: 'OK'
//       });
//       return;
//     }

//     if (!this.currentUser) {
//       this.router.navigate(['/Register']);
//     } else {
//       this.quizStarted = true;
//       this.showQuiz = true;
//       this.isLoading = false;
//     }
//   }
//   startQuizTimer(): void {
//     this.quizIntervalSubscription = interval(1000).subscribe(() => {
//       if (this.timeLeftForQuiz > 0) {
//         this.timeLeftForQuiz--;
//       } else {
//         this.endQuiz();
//       }
//     });
//   }
//   endQuiz(): void {
//     if (this.quizIntervalSubscription) {
//       this.quizIntervalSubscription.unsubscribe();
//     }

//     this.showQuiz = false;
//     this.quizStarted = false;
//     this.quizFinished = true

//     if (this.user) {
//       const newCoinValue = this.user.coin + this.correctAnswersCount;

//       this.userService.updateUserCoin(this.user.id, newCoinValue).subscribe(
//         (response) => {
//           console.log('Coin updated successfully:', response);
//           this.user.coin = newCoinValue;
//           this.authService.setCurrentUser(this.user);
//           this.showCompletionAlert();
//         },
//         (error) => {
//           console.error('Error updating coin:', error);
//           this.showCompletionAlert();
//         }
//       );
//     } else {
//       console.error('No user is logged in.');
//     }
//   }
//     shuffle(array: string[]): void {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];  // Swap elements
//     }
//   }
//   getQuiz(): void {
//     const now = new Date();
//     const formattedTime = this.datePipe.transform(now, 'MM/dd HH:mm');
//     if (!formattedTime) {
//       console.error('Failed to format the current time.');
//       return;
//     }
//     const encodedTime = encodeURIComponent(formattedTime);
//     console.log(formattedTime)
//     this.quizService.getQuizByTime(encodedTime).subscribe(
//       (quizzes: QuizDto[]) => {
//         if (quizzes && quizzes.length > 0) {
//           this.quiz = quizzes[0];
//           this.bonusQuestion = this.quiz.bonusQuestion;
//           this.loadAnswers();
//         } else {
//           console.error('No quiz found for this time');
//         }
//         this.isLoading = false;
//       },
//       (error) => {
//         console.error('Error fetching quiz:', error);
//         this.isLoading = false;
//       }
//     );
//   }

//   loadAnswers(): void {
//     const currentQuestion = this.isBonusQuestion
//       ? this.bonusQuestion
//       : this.quiz?.questions[this.currentQuestionIndex];
  
//     if (currentQuestion) {
//       // Specify the type of 'a' as 'string'
//       this.allAnswers = [...currentQuestion.incorrectAnswers.map((a: any) => a.inccorectAnswer), currentQuestion.correctanswer];
//       this.shuffle(this.allAnswers);
//     }
//   }
  

  // nextQuestion(): void {
  //   if (this.isBonusQuestion) {
  //     // If bonus question has been answered, mark the quiz as completed
  //     this.quizCompleted = true;
  //     this.endQuiz();
  //   } else if (this.currentQuestionIndex < (this.quiz?.questions.length || 0) - 1) {
  //     // Proceed to the next question
  //     this.currentQuestionIndex++;
  //     this.loadAnswers();
  //   } else if (this.bonusQuestion && !this.bonusQuestionAnswered) {
  //     // Move to the bonus question if it hasn't been answered yet
  //     this.isBonusQuestion = true;
  //     this.loadAnswers();
  //   } else {
  //     // If there are no more questions, complete the quiz
  //     this.quizCompleted = true;
  //     this.endQuiz();
  //   }
  // }
  
//   selectAnswer(answer: string): void {
//     if (this.isBonusQuestion) {
//       // Set the bonus answer
//       this.bonusAnswerSelected = answer;
//       this.bonusQuestionAnswered = true;  // Mark the bonus question as answered
//     } else {
//       // Set the selected answer for the current question
//       this.selectedAnswers[this.currentQuestionIndex] = answer;
//     }
  
//     // Update the correct/incorrect answers counts
//     this.updateAnswerCounts();
  
//     // Automatically move to the next question after selecting an answer
//     this.nextQuestion();  // Proceed to the next question
  
//     // Optionally check if the quiz is complete
//     this.checkQuizCompletion();
//   }
  
//   updateAnswerCounts(): void {
//     this.correctAnswersCount = 0;
//     this.incorrectAnswersCount = 0;
  
//     // Loop through all questions and calculate the correct/incorrect answers
//     this.quiz?.questions.forEach((q, i) => {
//       if (this.selectedAnswers[i] === q.correctanswer) {
//         this.correctAnswersCount++;
//       } else if (this.selectedAnswers[i]) {  // Only count incorrect answers if they were answered
//         this.incorrectAnswersCount++;
//       }
//     });
  
//     // If the bonus question is answered correctly, add points
//     if (this.bonusQuestionAnswered && this.bonusAnswerSelected === this.bonusQuestion.correctanswer) {
//       this.correctAnswersCount += 3;  // Add 3 points for the bonus question
//     }
//   }
  
//   checkQuizCompletion(): void {
//     // If all regular questions have been answered, check for bonus question
//     if (this.selectedAnswers.length === (this.quiz?.questions.length || 0)) {
//       if (this.bonusQuestion && !this.bonusQuestionAnswered) {
//         // If the bonus question has not been answered, show it
//         this.isBonusQuestion = true;
//         this.loadAnswers();
//       } else {
//         // If bonus question is answered, calculate points and end the quiz
//         this.calculatePoints();
//         this.endQuiz();
//       }
//     }
//   }
  
//   calculatePoints(): void {
//     this.correctAnswersCount = 0;
//     this.incorrectAnswersCount = 0;
  
//     // Loop through the regular questions and calculate correct/incorrect answers
//     this.quiz?.questions.forEach((q, i) => {
//       if (this.selectedAnswers[i] === q.correctanswer) {
//         this.correctAnswersCount++;
//       } else {
//         this.incorrectAnswersCount++;
//       }
//     });
  
//     // If bonus question is answered correctly, add 3 points
//     if (this.bonusQuestionAnswered && this.bonusAnswerSelected === this.bonusQuestion.correctanswer) {
//       this.correctAnswersCount += 3;  // Add 3 points for the bonus question
//     }
//   }
  
  


//   showCompletionAlert(): void {
//     Swal.fire({
//       title: 'გილოცავ!',
//       text: `სწორი პასუხები: ${this.correctAnswersCount}, ქულები: ${this.correctAnswersCount}`,
//       icon: 'success',
//       confirmButtonText: 'OK'
//     });
//   }
  
  // formatTime(seconds: number): string {
  //   const minutes = Math.floor(seconds / 60);
  //   const remainingSeconds = seconds % 60;
  //   return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  // }
// }
// import { Component, OnInit } from '@angular/core';
// import { QuizService } from '../../quiz.service';
// import { QuizDto } from '../../core/models/common.model';
// import { Subscription, interval } from 'rxjs';
// import { CommonModule, DatePipe } from '@angular/common';
// import { Router } from '@angular/router';
// import { UserDto } from '../../core/models/common.model';
// import { AuthenticationService } from '../../authentication.service';
// import { UserService } from '../../user.service';
// import Swal from 'sweetalert2';
// import { FooterForPupilComponent } from "../footer-for-pupil/footer-for-pupil.component";
// import { NavbarWithWaveComponent } from "../navbar-with-wave/navbar-with-wave.component";

// @Component({
//   selector: 'app-quize',
//   standalone: true,
//   imports: [DatePipe, CommonModule, FooterForPupilComponent, NavbarWithWaveComponent],
//   templateUrl: './quize.component.html',
//   styleUrls: ['./quize.component.scss'],
//   providers: [DatePipe]
// })
// export class QuizeComponent implements OnInit {
//   quiz: QuizDto | undefined;
//   currentQuestionIndex = 0;
//   selectedAnswers: string[] = [];
//   correctAnswersCount = 0;
//   incorrectAnswersCount = 0;
//   allAnswers: string[] = [];
//   isLoading = true;
//   showQuiz = false;
//   quizStarted = false;
//   quizCompleted = false;
//   bonusQuestionAnswered = false;
//   totalQuizTimeInSeconds = 6 * 60; 
//   timeLeftForQuiz = this.totalQuizTimeInSeconds;
//   quizIntervalSubscription: Subscription | undefined;
//   currentUser: UserDto | null = null;
//   user!: UserDto;
//   quizFinished: boolean = false;
//   quizFoundTime: Date | null = null;

//   // New properties for bonus question
//   bonusQuestion: any;
//   isBonusQuestion = false;
//   bonusAnswerSelected: string | null = null;

//   constructor(
//     private router: Router,
//     private authService: AuthenticationService,
//     private quizService: QuizService,
//     private userService: UserService,
//     private datePipe: DatePipe
//   ) {}

//   ngOnInit(): void {
//     this.checkCurrentUser();
//     this.getQuiz();
//     this.authService.currentUser$.subscribe(user => {
//       this.user = user as UserDto;
//     });
//     this.startQuizTimer();
//     Swal.fire({
//       title: 'გაფრთხილება',
//       text: 'პრიზის მოგების შემთხვევაში საჭიროა მოსწავლის საბუთის ჩევენება.',
//       icon: 'info',
//       confirmButtonText: 'OK'
//     });
//   }

//   checkCurrentUser(): void {
//     this.currentUser = this.authService.getCurrentUserValue();
//     if (!this.currentUser) {
//       this.router.navigate(['/Register']);
//     }
//   }

//   startQuiz(): void {
//     if (this.quizFinished) {
//       Swal.fire({
//         title: 'შენ უკვე გაიარე ქვიზი',
//         text: 'შენ უკვე გაიარე ქვიზი, დაელოდე შემდეგს',
//         icon: 'warning',
//         confirmButtonText: 'OK'
//       });
//       return;
//     }
  
//     if (!this.currentUser) {
//       this.router.navigate(['/Register']);
//     } else {
//       this.quizStarted = true;
//       this.showQuiz = true;
//       this.isLoading = false;
  
//       // Initialize quiz state for the current user
//       this.selectedAnswers = [];
//       this.correctAnswersCount = 0;
//       this.incorrectAnswersCount = 0;
//       this.currentQuestionIndex = 0;
//       this.isBonusQuestion = false;
//       this.bonusQuestionAnswered = false;
//       this.bonusAnswerSelected = null;
  
//       // Reload answers for the first question
//       this.loadAnswers();
//     }
//   }
  
//   startQuizTimer(): void {
//     if (this.quizIntervalSubscription) {
//       this.quizIntervalSubscription.unsubscribe(); // Prevent duplicate timers
//     }
  
//     this.quizIntervalSubscription = interval(1000).subscribe(() => {
//       if (this.quizStarted && this.timeLeftForQuiz > 0) {
//         this.timeLeftForQuiz--;
//       } else if (this.quizStarted && this.timeLeftForQuiz <= 0) {
//         this.endQuiz();
//       }
//     });
//   }
  
//   endQuiz(): void {
//     if (!this.quizStarted || this.quizFinished) {
//       return; // Prevent ending the quiz if it's not started or already finished
//     }
  
//     if (this.quizIntervalSubscription) {
//       this.quizIntervalSubscription.unsubscribe();
//     }
  
//     this.showQuiz = false;
//     this.quizStarted = false;
//     this.quizFinished = true;
  
//     if (this.user) {
//       const newCoinValue = this.user.coin + this.correctAnswersCount;
  
//       this.userService.updateUserCoin(this.user.id, newCoinValue).subscribe(
//         (response) => {
//           console.log('Coin updated successfully:', response);
//           this.user.coin = newCoinValue;
//           this.authService.setCurrentUser(this.user);
//           this.showCompletionAlert();
//         },
//         (error) => {
//           console.error('Error updating coin:', error);
//           this.showCompletionAlert();
//         }
//       );
//     } else {
//       console.error('No user is logged in.');
//     }
//   }
  
//     shuffle(array: string[]): void {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];  // Swap elements
//     }
//   }
//   getQuiz(): void {
//     if (!this.currentUser) {
//       console.error('No current user found.');
//       return;
//     }
  
//     this.quizService.getQuizzes().subscribe(
//       (quizzes: QuizDto[]) => {
//         if (quizzes && quizzes.length > 0) {
//           this.quiz = quizzes[0];
//           this.bonusQuestion = this.quiz.bonusQuestion;
//           this.loadAnswers();
//         } else {
//           console.error('No quiz found for this time');
//         }
//         this.isLoading = false;
//       },
//       (error) => {
//         console.error('Error fetching quiz:', error);
//         this.isLoading = false;
//       }
//     );
//   }
  

//   loadAnswers(): void {
//     const currentQuestion = this.isBonusQuestion
//       ? this.bonusQuestion
//       : this.quiz?.questions[this.currentQuestionIndex];
  
//     if (currentQuestion) {
//       // Specify the type of 'a' as 'string'
//       this.allAnswers = [...currentQuestion.incorrectAnswers.map((a: any) => a.inccorectAnswer), currentQuestion.correctanswer];
//       this.shuffle(this.allAnswers);
//     }
//   }
  

//   nextQuestion(): void {
//     if (this.isBonusQuestion) {
//       // If bonus question has been answered, mark the quiz as completed
//       this.quizCompleted = true;
//       this.endQuiz();
//     } else if (this.currentQuestionIndex < (this.quiz?.questions.length || 0) - 1) {
//       // Proceed to the next question
//       this.currentQuestionIndex++;
//       this.loadAnswers();
//     } else if (this.bonusQuestion && !this.bonusQuestionAnswered) {
//       // Move to the bonus question if it hasn't been answered yet
//       this.isBonusQuestion = true;
//       this.loadAnswers();
//     } else {
//       // If there are no more questions, complete the quiz
//       this.quizCompleted = true;
//       this.endQuiz();
//     }
//   }
  
//   selectAnswer(answer: string): void {
//     if (this.isBonusQuestion) {
//       // Set the bonus answer
//       this.bonusAnswerSelected = answer;
//       this.bonusQuestionAnswered = true;  // Mark the bonus question as answered
//     } else {
//       // Set the selected answer for the current question
//       this.selectedAnswers[this.currentQuestionIndex] = answer;
//     }
  
//     // Update the correct/incorrect answers counts
//     this.updateAnswerCounts();
  
//     // Automatically move to the next question after selecting an answer
//     this.nextQuestion();  // Proceed to the next question
  
//     // Optionally check if the quiz is complete
//     this.checkQuizCompletion();
//   }
  
//   updateAnswerCounts(): void {
//     this.correctAnswersCount = 0;
//     this.incorrectAnswersCount = 0;
  
//     // Loop through all questions and calculate the correct/incorrect answers
//     this.quiz?.questions.forEach((q, i) => {
//       if (this.selectedAnswers[i] === q.correctanswer) {
//         this.correctAnswersCount++;
//       } else if (this.selectedAnswers[i]) {  // Only count incorrect answers if they were answered
//         this.incorrectAnswersCount++;
//       }
//     });
  
//     // If the bonus question is answered correctly, add points
//     if (this.bonusQuestionAnswered && this.bonusAnswerSelected === this.bonusQuestion.correctanswer) {
//       this.correctAnswersCount += 3;  // Add 3 points for the bonus question
//     }
//   }
  
//   checkQuizCompletion(): void {
//     // If all regular questions have been answered, check for bonus question
//     if (this.selectedAnswers.length === (this.quiz?.questions.length || 0)) {
//       if (this.bonusQuestion && !this.bonusQuestionAnswered) {
//         // If the bonus question has not been answered, show it
//         this.isBonusQuestion = true;
//         this.loadAnswers();
//       } else {
//         // If bonus question is answered, calculate points and end the quiz
//         this.calculatePoints();
//         this.endQuiz();
//       }
//     }
//   }
  
//   calculatePoints(): void {
//     this.correctAnswersCount = 0;
//     this.incorrectAnswersCount = 0;
  
//     // Loop through the regular questions and calculate correct/incorrect answers
//     this.quiz?.questions.forEach((q, i) => {
//       if (this.selectedAnswers[i] === q.correctanswer) {
//         this.correctAnswersCount++;
//       } else {
//         this.incorrectAnswersCount++;
//       }
//     });
  
//     // If bonus question is answered correctly, add 3 points
//     if (this.bonusQuestionAnswered && this.bonusAnswerSelected === this.bonusQuestion.correctanswer) {
//       this.correctAnswersCount += 3;  // Add 3 points for the bonus question
//     }
//   }
  
  


//   showCompletionAlert(): void {
//     if (this.correctAnswersCount === 0) {
//       Swal.fire({
//         title: 'არასწორია!',
//         text: 'ქულები: 0',
//         icon: 'warning',
//         confirmButtonText: 'OK'
//       });
//     } else {
//       Swal.fire({
//         title: 'გილოცავ!',
//         text: `სწორი პასუხები: ${this.correctAnswersCount}, ქულები: ${this.correctAnswersCount}`,
//         icon: 'success',
//         confirmButtonText: 'OK'
//       });
//     }
//   }
  
  
  // formatTime(seconds: number): string {
  //   const minutes = Math.floor(seconds / 60);
  //   const remainingSeconds = seconds % 60;
  //   return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  // }
// }

import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../quiz.service';
import { QuizDto } from '../../core/models/common.model';
import { Subscription, interval } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { UserDto } from '../../core/models/common.model';
import { AuthenticationService } from '../../authentication.service';
import { UserService } from '../../user.service';
import Swal from 'sweetalert2';
import { FooterForPupilComponent } from '../footer-for-pupil/footer-for-pupil.component';
import { NavbarWithWaveComponent } from '../navbar-with-wave/navbar-with-wave.component';

@Component({
  selector: 'app-quize',
  standalone: true,
  imports: [DatePipe, CommonModule, FooterForPupilComponent, NavbarWithWaveComponent],
  templateUrl: './quize.component.html',
  styleUrls: ['./quize.component.scss'],
  providers: [DatePipe],
})
export class QuizeComponent implements OnInit {
  quiz: QuizDto | undefined;
  currentQuestionIndex = 0;
  selectedAnswers: string[] = [];
  correctAnswersCount = 0;
  incorrectAnswersCount = 0;
  allAnswers: string[] = [];
  isLoading = true;
  showQuiz = false;
  quizStarted = false;
  quizCompleted = false;
  bonusQuestionAnswered = false;
  totalQuizTimeInSeconds = 6 * 60; 
  timeLeftForQuiz = this.totalQuizTimeInSeconds;
  quizIntervalSubscription: Subscription | undefined;
  currentUser: UserDto | null = null;
  user!: UserDto;
  quizFinished = false;
  canStartQuiz = true; // Default to true if no restriction
  timeUntilNextAttempt = 0; // Track remaining time in seconds
  timeleft: number = 300; // Example: 5 minutes in seconds

  bonusQuestion: any;
  isBonusQuestion = false;
  bonusAnswerSelected: string | null = null;
  isCooldownActive: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private quizService: QuizService,
    private userService: UserService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.checkCurrentUser();
    this.getQuiz();
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.user = { ...user }; // Ensure we work with a fresh user instance
      }
    });
    this.startQuizTimer();
  
    // Check quiz completion time on initialization
    this.checkQuizAvailability();
  
    Swal.fire({
      title: 'გაფრთხილება',
      text: 'პრიზის მოგების შემთხვევაში საჭიროა მოსწავლის საბუთის ჩევენება.',
      icon: 'info',
      confirmButtonText: 'OK',
    });
  }
  

  checkCurrentUser(): void {
    this.currentUser = this.authService.getCurrentUserValue();
    if (!this.currentUser) {
      this.router.navigate(['/Register']);
    }
  }

  startQuizTimer(): void {
    if (this.quizIntervalSubscription) {
      this.quizIntervalSubscription.unsubscribe();
    }

    this.quizIntervalSubscription = interval(1000).subscribe(() => {
      if (this.quizStarted && this.timeLeftForQuiz > 0) {
        this.timeLeftForQuiz--;
      } else if (this.quizStarted && this.timeLeftForQuiz <= 0) {
        this.endQuiz();
      }
    });
  }

  getQuiz(): void {
    if (!this.currentUser) {
      console.error('No current user found.');
      return;
    }

    this.quizService.getQuizzes().subscribe(
      (quizzes: QuizDto[]) => {
        if (quizzes && quizzes.length > 0) {
          this.quiz = quizzes[0];
          this.bonusQuestion = this.quiz.bonusQuestion;
          this.loadAnswers();
        } else {
          console.error('No quiz found for this time');
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching quiz:', error);
        this.isLoading = false;
      }
    );
  }
  nextQuestion(): void {
    if (this.isBonusQuestion) {
      // If bonus question has been answered, mark the quiz as completed
      this.quizCompleted = true;
      this.endQuiz();
    } else if (this.currentQuestionIndex < (this.quiz?.questions.length || 0) - 1) {
      // Proceed to the next question
      this.currentQuestionIndex++;
      this.loadAnswers();
    } else if (this.bonusQuestion && !this.bonusQuestionAnswered) {
      // Move to the bonus question if it hasn't been answered yet
      this.isBonusQuestion = true;
      this.loadAnswers();
    } else {
      // If there are no more questions, complete the quiz
      this.quizCompleted = true;
      this.endQuiz();
    }
  }
  checkQuizRestriction(): void {
    const lastQuizTime = localStorage.getItem('lastQuizTime');
    
    if (lastQuizTime) {
        const lastQuizTimestamp = parseInt(lastQuizTime, 10);  // Convert stored string to number
        const currentTimestamp = new Date().getTime();  // Get current timestamp
        const timeDifference = currentTimestamp - lastQuizTimestamp;  // Time difference in milliseconds

        // If the time difference is less than 1 minute (60000 milliseconds), set canStartQuiz to false
        this.canStartQuiz = timeDifference >= 60000; // 60000 ms = 1 minute
    } else {
        this.canStartQuiz = true; // Allow the quiz to start if no last quiz time is stored
    }
}

  startQuiz(): void {
    if (!this.currentUser) {
      this.router.navigate(['/Register']);
      return;
    }
    if (!this.quiz || Object.keys(this.quiz).length === 0) { 
      Swal.fire({
          title: 'ქვიზი არ არის დაწყებული',
          text: 'ქვიზის დროსთან დაკავშირებული ინფორმაცია მოგივა მეილზე',
          icon: 'error',
          confirmButtonText: 'OK'
      });
      return; // Prevent starting the quiz
  }

  

    this.checkQuizRestriction(); // Ensure this method is called here

    if (this.canStartQuiz) {
        this.quizStarted = true;
        this.showQuiz = true;
        this.isLoading = false;
        this.selectedAnswers = [];
        this.correctAnswersCount = 0;
        this.incorrectAnswersCount = 0;
        this.currentQuestionIndex = 0;
        this.isBonusQuestion = false;
        this.bonusQuestionAnswered = false;
        this.bonusAnswerSelected = null;
        this.loadAnswers();
    } else {
        Swal.fire({
            title: 'შენ უკვე შეავსე ქვიზი',
            text: `დაელოდე მეილს და გაიგებ თუ როდის იქნება შემდეგი ქვიზის თარიღი`,
            icon: 'info',
            confirmButtonText: 'OK'
        });
    }
}


  loadAnswers(): void {
    const currentQuestion = this.isBonusQuestion
      ? this.bonusQuestion
      : this.quiz?.questions[this.currentQuestionIndex];

    if (currentQuestion) {
      this.allAnswers = [
        ...currentQuestion.incorrectAnswers.map((a: any) => a.inccorectAnswer),
        currentQuestion.correctanswer,
      ];
      this.shuffle(this.allAnswers);
    }
  }

  checkQuizAvailability() {
    const lastAttempt = localStorage.getItem('lastQuizAttempt');

    // If no quiz exists


    // If the user has attempted the quiz before, check the time difference
    if (lastAttempt) {
      const lastAttemptTime = new Date(lastAttempt).getTime();
      const currentTime = Date.now();
      const timeDifference = currentTime - lastAttemptTime;

      if (timeDifference < 5 * 60 * 1000) { // 5 minutes cooldown
        const timeLeft = 5 * 60 - Math.floor(timeDifference / 1000);
        this.timeUntilNextAttempt = timeLeft;
        this.isCooldownActive = true;
        this.canStartQuiz = false;
        this.startCooldownTimer();
      } else {
        this.canStartQuiz = true;
        this.isCooldownActive = false;
      }
    } else {
      this.canStartQuiz = true;
    }
  }
  
  shuffle(array: string[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  selectAnswer(answer: string): void {
    if (this.isBonusQuestion) {
      this.bonusAnswerSelected = answer;
      this.bonusQuestionAnswered = true;
    } else {
      this.selectedAnswers[this.currentQuestionIndex] = answer;
    }

    this.updateAnswerCounts();
    this.nextQuestion();
  }
  startCooldownTimer() {
    const timer = setInterval(() => {
      this.timeUntilNextAttempt--;
      if (this.timeUntilNextAttempt <= 0) {
        this.isCooldownActive = false;
        this.canStartQuiz = true;
        clearInterval(timer);
      }
    }, 1000);
  }

  clearLocalStorage(): void {
    localStorage.removeItem('lastQuizTime'); // მხოლოდ კონკრეტულის წაშლა
    // ან
    // localStorage.clear(); // მთლიანად გასუფთავება
    console.log('LocalStorage გასუფთავებულია!');
  }
  
  updateAnswerCounts(): void {
    const correctAnswers = this.quiz?.questions.filter(
      (q, i) => this.selectedAnswers[i] === q.correctanswer
    ).length || 0;

    const bonusCorrect = this.bonusQuestionAnswered &&
      this.bonusAnswerSelected === this.bonusQuestion.correctanswer
      ? 3
      : 0;

    this.correctAnswersCount = correctAnswers + bonusCorrect;
    this.incorrectAnswersCount = this.selectedAnswers.filter(
      (a, i) => a && this.quiz?.questions[i]?.correctanswer !== a
    ).length;
  }

  endQuiz(): void {
    if (this.quizIntervalSubscription) {
      this.quizIntervalSubscription.unsubscribe();
    }
  
    this.quizStarted = false;
    this.quizFinished = true;
  
    // Store the completion timestamp in localStorage
    const now = new Date().getTime(); // Current timestamp in milliseconds
    localStorage.setItem('lastQuizTime', now.toString()); // Store last quiz time
    if (this.user) {
      const newCoinValue = this.user.coin + this.correctAnswersCount;
      this.userService.updateUserCoin(this.user.id, newCoinValue).subscribe(
        () => {
          this.user.coin = newCoinValue;
          this.authService.setCurrentUser(this.user);
          this.showCompletionAlert();
        },
        (error) => {
          console.error('Error updating coin:', error);
          this.showCompletionAlert();
        }
      );
    }
  }
  
  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
  
  showCompletionAlert(): void {
    Swal.fire({
      title: 'გილოცავ!',
      text: `სწორი პასუხები: ${this.correctAnswersCount}, ქულები: ${this.correctAnswersCount}`,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }
}
