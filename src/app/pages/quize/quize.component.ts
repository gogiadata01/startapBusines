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
import { FooterForPupilComponent } from "../footer-for-pupil/footer-for-pupil.component";
import { NavbarWithWaveComponent } from "../navbar-with-wave/navbar-with-wave.component";

@Component({
  selector: 'app-quize',
  standalone: true,
  imports: [DatePipe, CommonModule, FooterForPupilComponent, NavbarWithWaveComponent],
  templateUrl: './quize.component.html',
  styleUrls: ['./quize.component.scss'],
  providers: [DatePipe]
})
export class QuizeComponent implements OnInit {
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
  quizFinished: boolean = false; // New flag to prevent restarting the quiz
  quizFoundTime: Date | null = null;
  totalQuizTimeInSeconds = 15 * 60;
  timeLeftForQuiz: number = this.totalQuizTimeInSeconds;
  quizIntervalSubscription: Subscription | undefined;
  user!: UserDto;
  QuizAndTime:any

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private quizService: QuizService,
    private datePipe: DatePipe,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.checkCurrentUser();
    this.getQuiz();
    this.startQuizTimer();
    this.authService.currentUser$.subscribe(user => {
      this.user = user as UserDto;
    });
    Swal.fire({
      title: 'გაფრთხილება',
      text: `პრიზის მოგების შემთხვევაში,საჭიროა მოსწავლის საბუთის ჩევენება რადგან დაამტკიცო რომ მოსწავლეხარ.`,
      icon: 'info',
      confirmButtonText: 'OK'
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
    if (this.quizFinished) {
      Swal.fire({
        title: 'შენ უკვე გაიარე ქვიზი',
        text: `შენ უკვე გაიარე ქვიზი, დაელოდე შემდეგს`,
        icon: 'warning',
        confirmButtonText: 'OK'
      });      return;
    }

    if (!this.currentUser) {
      this.router.navigate(['/Register']);
    } else {
      this.quizStarted = true;
      this.showQuiz = true;
      this.isLoading = false;
    }
  }

  startQuizTimer(): void {
    this.quizIntervalSubscription = interval(1000).subscribe(() => {
      if (this.timeLeftForQuiz > 0) {
        this.timeLeftForQuiz--;
      } else {
        this.endQuiz();
      }
    });
  }

  checkQuizCompletion(): void {
    if (this.selectedAnswers.length === (this.quiz?.questions?.length || 0)) {
      this.quizCompleted();
    }
  }

  endQuiz(): void {
    if (this.quizIntervalSubscription) {
      this.quizIntervalSubscription.unsubscribe();
    }

    this.showQuiz = false;
    this.quizStarted = false;

    if (this.user) {
      const newCoinValue = this.user.coin + this.correctAnswersCount;

      this.userService.updateUserCoin(this.user.id, newCoinValue).subscribe(
        (response) => {
          console.log('Coin updated successfully:', response);
          this.user.coin = newCoinValue;
          this.authService.setCurrentUser(this.user);
          this.showCompletionAlert();
        },
        (error) => {
          console.error('Error updating coin:', error);
          this.showCompletionAlert();
        }
      );
    } else {
      console.error('No user is logged in.');
    }
  }

  quizCompleted(): void {
    this.calculatePoints();
    this.quizFinished = true; // Set flag to prevent restart
    this.endQuiz();
  }

  calculatePoints(): void {
    this.correctAnswersCount = 0;
    this.incorrectAnswersCount = 0;

    if (this.quiz && this.quiz.questions) {
      this.quiz.questions.forEach((question, index) => {
        if (this.selectedAnswers[index] === question.correctanswer) {
          this.correctAnswersCount++;
        } else {
          this.incorrectAnswersCount++;
        }
      });
    }
  }

  showCompletionAlert(): void {
    Swal.fire({
      title: 'გილოცავ!',
      text: `შენ გაეცანი ${this.correctAnswersCount} კითხვას სწორად  ${this.quiz?.questions.length} კითხვიდან, შენ მიიღე${this.correctAnswersCount} ქულა.`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  getQuiz(): void {
    const now = new Date();
    const formattedTime = this.datePipe.transform(now, 'MM/dd HH:mm');

    if (this.quizFoundTime && (now.getTime() - this.quizFoundTime.getTime()) < 3600000) {
      console.log('Quiz was already found within the last hour. Not fetching again.');
      return;
    }

    if (!formattedTime) {
      console.error('Failed to format the current time.');
      return;
    }

    const encodedTime = encodeURIComponent(formattedTime);
    this.quizService.getQuizByTime(encodedTime).subscribe(
      (quizzes: QuizDto[]) => {
        if (quizzes && quizzes.length > 0) {
          this.quiz = quizzes[0];
          const quizTimeInSeconds = parseInt(this.quiz.time, 10);
          if (!isNaN(quizTimeInSeconds)) {
            this.QuizAndTime = quizTimeInSeconds + (15 * 60);
          } else {
            console.error('Invalid quiz time format.');
          }          this.loadAnswers();
          this.quizFoundTime = new Date();
          this.showQuiz = true;
        } else {
          console.error('No quiz found for this time');
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching quiz by time:', error);
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

    if (this.currentQuestionIndex < (this.quiz?.questions?.length || 0) - 1) {
      this.currentQuestionIndex++;
      this.loadAnswers();
    } else {
      this.checkQuizCompletion();
    }
  }

  nextQuestion(): void {
    if (!this.quiz || !this.quiz.questions) {
      console.error('Quiz or questions are not defined.');
      return;
    }

    if (this.selectedAnswers[this.currentQuestionIndex]) {
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex >= this.quiz.questions.length) {
        this.showQuiz = false;
        this.quizCompleted();
      } else {
        this.loadAnswers();
      }
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

