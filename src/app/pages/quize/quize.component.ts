import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../quiz.service';
import { QuizDto } from '../../core/models/common.model';
import { Subscription, interval } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { UserDto } from '../../core/models/common.model';
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
  currentUser!:UserDto
  user: any;
  quizFinished = false;
  canStartQuiz = true; 
  timeUntilNextAttempt = 0; 
  timeleft: number = 300;
  userToken!: string;
  bonusQuestion: any;
  isBonusQuestion = false;
  bonusAnswerSelected: string | null = null;
  isCooldownActive: boolean = false;
  userid:any
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
    this.checkCurrentUser();
    this.getQuiz();
    // this.authService.currentUser$.subscribe(user => {
    //   if (user) {
    //     this.user = { ...user }; 
    //   }
    // });
    this.startQuizTimer();
  
    this.checkQuizAvailability();
  
    Swal.fire({
      title: 'გაფრთხილება',
      text: 'პრიზის მოგების შემთხვევაში საჭიროა მოსწავლის საბუთის ჩევენება.',
      icon: 'info',
      confirmButtonText: 'OK',
    });
    this.userid = this.autentication.getNameIdentifier()
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
    const remainingTime = this.timeLeftForQuiz;

    if (remainingTime === 0) {
      console.error('Remaining time cannot be zero.');
      return; // Exit early if remaining time is zero
    }
    const now = new Date().getTime(); 
    localStorage.setItem('lastQuizTime', now.toString());
  
    this.userService.updateRemainingTime(this.userid, remainingTime).subscribe(
      (response) => {
        console.log('Remaining time updated:', response); // Check the response structure
        if ('UpdatedRemainingTime' in response) {
          console.log('Remaining time:', response.UpdatedRemainingTime);
        }
      },
      (error) => {
        console.error('Error updating remaining time:', error);
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
}




