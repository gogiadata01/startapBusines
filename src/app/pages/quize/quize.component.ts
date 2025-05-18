import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../quiz.service';
import { QuizDto } from '../../core/models/common.model';
import { Subscription, interval } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { UserDto } from '../../core/models/common.model';
import { QuizSubmissionDto } from '../../core/models/common.model';

import { AuthenticationService } from '../../authentication.service';
import { UserService } from '../../user.service';
import Swal from 'sweetalert2';
import { FooterForPupilComponent } from '../footer-for-pupil/footer-for-pupil.component';
import { NavbarWithWaveComponent } from '../navbar-with-wave/navbar-with-wave.component';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'; // If using cookies

@Component({
  selector: 'app-quize',
  standalone: true,
  imports: [DatePipe, CommonModule, FooterForPupilComponent, NavbarWithWaveComponent],
  templateUrl: './quize.component.html',
  styleUrls: ['./quize.component.scss'],
  providers: [DatePipe],
})
export class QuizeComponent implements OnInit , CanActivate {

  toggleQuiz(index: number) {
    this.quizHistory[index].open = !this.quizHistory[index].open;
  }
  
  // ქვიზების ისტორია მთავრდება აქ.


// ქვიზის ქარდი
  quizzes = [
    {
      number: 'I',
      date: '10 მაისი',
      time: '15:00',
      completed: true
    },
    {
      number: 'II',
      date: '14 მაისი ',
      time: '18:00',
      completed: true
    },
    {
      number: 'III',
      date: '18 მაისი',
      time: '15:00',
      completed: false
    },
    {
      number: 'IV',
      date: '21 მაისი',
      time: '18:00',
      completed: false
    },
    {
      number: 'V',
      date: '24 მაისი',
      time: '15:00',
      completed: false
    },
    {
      number: 'VI',
      date: '27 მაისი',
      time: '18:00',
      completed: false
    },
    {
      number: 'VII',
      date: '31 მაისი',
      time: '15:00',
      completed: false
    },
    {
      number: 'VIII',
      date: '3 ივნისი',
      time: '18:00',
      completed: false
    },
    {
      number: 'IX',
      date: '6 ივნისი',
      time: '18:00',
      completed: false
    },
    {
      number: 'X',
      date: '10 ივნისი',
      time: '18:00',
      completed: false
    }
  ];
  // ქვიზის ქარდი მთავრდება აქ.

  

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
  totalQuizTimeInSeconds = 4 * 60; 
  timeLeftForQuiz = this.totalQuizTimeInSeconds;
  quizIntervalSubscription: Subscription | undefined;
  currentUser!:UserDto
  user: any;
  quizFinished = false;
  canStartQuiz = true; 
  showHistory= true;
  timeUntilNextAttempt = 0; 
  timeleft: number = 300;
  userToken!: string;
  bonusQuestion: any;
  isBonusQuestion = false;
  bonusAnswerSelected: string | null = null;
  isCooldownActive: boolean = false;
  userid:any
  quizStartTime:any;
  quizHistory!: QuizSubmissionDto[];
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private quizService: QuizService,
    private userService: UserService,
    private autentication:AuthenticationService,
    private datePipe: DatePipe,
    private cookieService: CookieService

  ) {}

  ngOnInit(): void {
    this.userid = this.autentication.getNameIdentifier()
    this.checkCurrentUser();
    this.getQuiz();
    this.getQuizeHistory();
    this.startQuizTimer();
    console.log(this.userid)
    this.quizHistory = this.quizHistory.map(q => ({ ...q, open: false }));

  
    Swal.fire({
      title: 'გაფრთხილება',
      text: 'პრიზის მოგების შემთხვევაში საჭიროა მოსწავლის საბუთის ჩევენება.',
      icon: 'info',
      confirmButtonText: 'OK',
    });
  }

  canActivate(): boolean {
    this.user = this.autentication.getCurrentUser()
    if (!this.user) {
      this.router.navigate(['Pupil/Quize']); // Redirect if user is not logged in
      return false;
    }
    return true; // Allow access if the user exists
  }
  
  checkCurrentUser(): void {
    this.user = this.autentication.getCurrentUser()
    if (!this.user) {
      this.router.navigate(['Pupil/Quize']); // Redirect if user is not logged in
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

  // getQuiz(): void {
  //   if (!this.user) {
  //     console.error('No current user found.');
  //     return;
  //   }

  //   this.quizService.getQuizzes().subscribe(
  //     (quizzes: QuizDto[]) => {
  //       if (quizzes && quizzes.length > 0) {
  //         this.quiz = quizzes[0];
  //         this.bonusQuestion = this.quiz.bonusQuestion;
  //         this.loadAnswers();
  //       } else {
  //         console.error('No quiz found for this time');
  //       }
  //       this.isLoading = false;
  //     },
  //     (error) => {
  //       console.error('Error fetching quiz:', error);
  //       this.isLoading = false;
  //     }
  //   );
  // }
  getQuiz(): void {
    if (!this.user) {
      console.error('No current user found.');
      return;
    }
  
    this.quizService.getQuizzes().subscribe(
      (quizzes: QuizDto[]) => {
        if (quizzes && quizzes.length > 0) {
          this.quiz = quizzes[0];
          this.bonusQuestion = this.quiz.bonusQuestion;
          this.loadAnswers();
  
          // 🔒 Hide quiz history if any quiz exists
          this.showHistory = false;
        } else {
          // ✅ Show quiz history if quiz list is empty
          this.showHistory = true;
        }
  
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching quiz:', error);
        this.isLoading = false;
  
        // Optionally show history if there's an error
        this.showHistory = true;
      }
    );
  }
  
  nextQuestion(): void {
    if (this.isBonusQuestion) {
      this.quizCompleted = true;
      this.endQuiz();
    } else if (this.currentQuestionIndex < (this.quiz?.questions.length || 0) - 1) {
      this.currentQuestionIndex++;
      this.loadAnswers();
    } else if (this.bonusQuestion && !this.bonusQuestionAnswered) {
      this.isBonusQuestion = true;
      this.loadAnswers();
    } else {
      this.quizCompleted = true;
      this.endQuiz();
    }
  }
  getQuizeHistory(): void {
    this.userService.getQuizHistory(this.userid).subscribe({
      next: (quizhistory) => {
        this.quizHistory = quizhistory;
        console.log('Quiz History:', this.quizHistory);  // Check this in the browser console
      },
      error: (err) => {
        console.error('Error fetching event data:', err);
      }
    });
  }
  
  getAnswerClass(answer: string, correctAnswer: string, userAnswer: string): string {
    if (answer === correctAnswer) return 'correct-answer';
    if (answer === userAnswer && answer !== correctAnswer) return 'wrong-answer';
    return 'default-answer';
  }
  
  

  startQuiz(): void {
    if (!this.user) {
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
      return; 
  }

  

    this.checkQuizRestriction(); 

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
        this.quizStartTime = new Date().getTime(); // Store quiz start time here
    } else {
        Swal.fire({
            title: 'შენ უკვე შეავსე ქვიზი',
            text: `დაელოდე მეილს და გაიგებ თუ როდის იქნება შემდეგი ქვიზის თარიღი`,
            icon: 'info',
            confirmButtonText: 'OK'
        });
    }
}
// startQuiz(): void {
//   if (!this.user) {
//     this.router.navigate(['/Register']);
//     return;
//   }

//   if (!this.quiz || Object.keys(this.quiz).length === 0) { 
//     Swal.fire({
//         title: 'ქვიზი არ არის დაწყებული',
//         text: 'ქვიზის დროსთან დაკავშირებული ინფორმაცია მოგივა მეილზე',
//         icon: 'error',
//         confirmButtonText: 'OK'
//     });
//     return; 
//   }

//   // Call backend to check if the quiz can be started
//   this.(); 

//   if (this.canStartQuiz) {
//     this.quizStarted = true;
//     this.showQuiz = true;
//     this.isLoading = false;
//     this.selectedAnswers = [];
//     this.correctAnswersCount = 0;
//     this.incorrectAnswersCount = 0;
//     this.currentQuestionIndex = 0;
//     this.isBonusQuestion = false;
//     this.bonusQuestionAnswered = false;
//     this.bonusAnswerSelected = null;
//     this.loadAnswers();
//     this.quizStartTime = new Date().getTime(); // Store quiz start time here
//   } else {
//     Swal.fire({
//         title: 'შენ უკვე შეავსე ქვიზი',
//         text: `დაელოდე მეილს და გაიგებ თუ როდის იქნება შემდეგი ქვიზის თარიღი`,
//         icon: 'info',
//         confirmButtonText: 'OK'
//     });
//   }
// } 



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




  checkQuizRestriction(): void {
    const lastQuizTime = localStorage.getItem('lastQuizTime');
    
    if (lastQuizTime) {
        const lastQuizTimestamp = parseInt(lastQuizTime, 10);  
        const currentTimestamp = new Date().getTime();  
        const timeDifference = currentTimestamp - lastQuizTimestamp;

        this.canStartQuiz = timeDifference >= 900000; // 900000 ms = 15 minutes
    } else {
        this.canStartQuiz = true; 
    }
}

  
  startCooldownTimer() {
    // Countdown logic: this will update every second
    const countdownInterval = setInterval(() => {
      if (this.timeUntilNextAttempt > 0) {
        this.timeUntilNextAttempt--;
      } else {
        clearInterval(countdownInterval);
        this.isCooldownActive = false;
        this.canStartQuiz = true;
      }
    }, 1000);
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
// სწორი ენდ ქვიზი
  // endQuiz(): void {
  //   if (this.quizIntervalSubscription) {
  //     this.quizIntervalSubscription.unsubscribe();
  //   }
  
  //   this.quizStarted = false;
  //   this.quizFinished = true;
  //   const quizEndTime = new Date().getTime();
  //   const timeSpent = Math.floor((quizEndTime - this.quizStartTime) / 1000); // Convert milliseconds to seconds
  
  //   if (timeSpent <= 0) {
  //     console.error('Elapsed time calculation error.');
  //     return; 
  //   }
  //   const now = new Date().getTime();
  //   localStorage.setItem('lastQuizTime', now.toString());
  
  //   // Send the elapsed time instead of remaining time
  //   this.userService.updateRemainingTime(this.userid, timeSpent).subscribe(
  //     (response) => {
  //       console.log('Time spent updated:', response);
  //       if ('UpdatedRemainingTime' in response) {
  //         console.log('Time spent:', response.UpdatedRemainingTime);
  //       }
  //     },
  //     (error) => {
  //       console.error('Error updating time spent:', error);
  //     }
  //   );
    // this.userService.getUserById(this.userid).subscribe((user ) =>{
    //   this.currentUser = user
    //   if (this.currentUser) {
    //     const newCoinValue = this.currentUser.coin + this.correctAnswersCount;
    //     this.userService.updateUserCoin(this.currentUser.id, newCoinValue).subscribe(
    //       () => {
    //         this.showCompletionAlert();
    //       },
    //       (error) => {
    //         console.error('Error updating coin:', error);
    //       }
    //     );
    //   }
    // })
  // }
  endQuiz(): void {
    if (this.quizIntervalSubscription) {
      this.quizIntervalSubscription.unsubscribe();
    }
  
    this.quizStarted = false;
    this.quizFinished = true;
    const quizEndTime = new Date().getTime();
    const timeSpent = Math.floor((quizEndTime - this.quizStartTime) / 1000); // Convert milliseconds to seconds
  
    if (timeSpent <= 0) {
      console.error('Elapsed time calculation error.');
      return; 
    }
    const now = new Date().getTime();
    localStorage.setItem('lastQuizTime', now.toString());
    this.quizService.saveQuizEndTime(this.userid).subscribe({
      next: () => console.log("End time saved"),
      error: err => console.error("Failed to save end time", err)
    });
    // Send the elapsed time instead of remaining time
    this.userService.updateRemainingTime(this.userid, timeSpent).subscribe(
      (response) => {
        console.log('Time spent updated:', response);
        if ('UpdatedRemainingTime' in response) {
          console.log('Time spent:', response.UpdatedRemainingTime);
        }
      },
      (error) => {
        console.error('Error updating time spent:', error);
      }
    );
    this.userService.getUserById(this.userid).subscribe((user ) =>{
      this.currentUser = user
      if (this.currentUser) {
        const newCoinValue = this.currentUser.coin + this.correctAnswersCount;
        this.userService.updateUserCoin(this.currentUser.id, newCoinValue).subscribe(
          () => {
            this.showCompletionAlert();
          },
          (error) => {
            console.error('Error updating coin:', error);
          }
        );
      }
    })
    const quizCompletionPayload = {
      userId: Number(this.userid), // make sure it's a number
      completedDate: this.quiz?.time?.trim() // make sure it’s trimmed
    };
    
    
    this.userService.addQuizCompletion(quizCompletionPayload).subscribe({
      next: (response) => {    
        if (response.message.includes('დაემატა')) {
          this.userService.getUserById(this.userid).subscribe((user ) =>{
            this.currentUser = user
            if (this.currentUser) {
              const newCoinValue = this.currentUser.coin + 20;
              this.userService.updateUserCoin(this.currentUser.id, newCoinValue).subscribe(
                () => {
                  this.showCompletionAlert1();
                },
                (error) => {
                  console.error('Error updating coin:', error);
                }
              );
            }
          })
        } else {
          console.warn('ℹ️ Quiz saved, but no coin added:', response.message);
        }
      },
    });
    
    
    
    const submission: QuizSubmissionDto = {
      time: this.quiz?.time ?? '00:00',
      quizQuestions: this.quiz?.questions.map((q, i) => {
        const questionData: any = {
          question: q.question,
          correctAnswer: q.correctanswer,
          userAnswer: this.selectedAnswers[i],
          img: "",
          badAnswers: q.incorrectAnswers.map((bad) => ({
            badanswer: bad.inccorectAnswer
          }))
        };
    
        // Only include img if it exists
        if (q.img) {
          questionData.img = q.img;
        }
    
        return questionData;
      }) || []
    };
    
    console.log(this.quiz?.questions)
    
    console.log('%c[SUBMIT] Sending payload:', 'color: green; font-weight: bold;');
    console.log(JSON.stringify(submission, null, 2));
    
    this.quizService.submitQuiz(this.userid, submission).subscribe({
      next: (res) => {
        console.log('%cQuiz successfully submitted!', 'color: blue; font-weight: bold;');
        console.log(res);
      },
      error: (error) => {
        console.error('%c[ERROR] Quiz submission failed', 'color: red; font-weight: bold;');
        console.error('Status Code:', error.status);
        console.error('Error Message:', error.message);
        if (error.error) {
          console.error('Backend Response Body:', error.error);
        }
      }
    });
    
    
    
  }
  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
  
  showCompletionAlert(): void {
    Swal.fire({
      title: 'გილოცავ!',
      text: `შენ 15 კითხვიდან დააგროვე  ${this.correctAnswersCount} სწორი პასუხი, ამიტომ დაგერიცხა : ${this.correctAnswersCount} ქულა`,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }
    showCompletionAlert1(): void {
    Swal.fire({
      title: 'გილოცავ!',
      text: `შენ გაიარე 7 ქვიზი ზედიზედ და დაგემატა 20 ქულა`,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }
}




