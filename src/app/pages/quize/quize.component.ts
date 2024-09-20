import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuizService } from '../../quiz.service';
import { QuizDto } from '../../core/models/common.model';
import { Subscription, interval } from 'rxjs';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink} from '@angular/router';
import {FooterForPupilComponent} from '../footer-for-pupil/footer-for-pupil.component'

@Component({
  selector: 'app-quize',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor,RouterLink,FooterForPupilComponent],
  templateUrl: './quize.component.html',
  styleUrls: ['./quize.component.scss']
})
export class QuizeComponent implements OnInit, OnDestroy {
  quiz: QuizDto | undefined; // Define quiz as possibly undefined
  currentQuestionIndex: number = 0;
  selectedAnswer: string = '';
  correctAnswersCount: number = 0;
  allAnswers: string[] = [];
  isLoading: boolean = true;

  totalQuizTimeInSeconds = 15 * 60;
  timeLeftForQuiz: number = this.totalQuizTimeInSeconds;
  quizIntervalSubscription: Subscription | undefined;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.getQuiz();
    this.startQuizTimer();
  }

  ngOnDestroy(): void {
    if (this.quizIntervalSubscription) {
      this.quizIntervalSubscription.unsubscribe();
    }
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
    // Check if quiz and questions exist before trying to access them
    if (this.quiz && this.quiz.questions && this.quiz.questions.length > 0) {
      const currentQuestion = this.quiz.questions[this.currentQuestionIndex];
      this.allAnswers = [
        ...currentQuestion.incorrectAnswers.map((a) => a.inccorectAnswer),
        currentQuestion.correctanswer
      ];
      this.shuffle(this.allAnswers);
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

  endQuiz(): void {
    if (this.quizIntervalSubscription) {
      this.quizIntervalSubscription.unsubscribe();
    }
    this.isLoading = true;
  }

  selectAnswer(answer: string): void {
    this.selectedAnswer = answer;
  }

  nextQuestion(): void {
    if (!this.quiz || !this.quiz.questions) return; // Ensure quiz and questions are defined

    const currentQuestion = this.quiz.questions[this.currentQuestionIndex];
    if (this.selectedAnswer === currentQuestion.correctanswer) {
      this.correctAnswersCount++;
    }

    this.currentQuestionIndex++;

    if (this.currentQuestionIndex < this.quiz.questions.length) {
      this.loadAnswers();
    } else {
      this.endQuiz();
    }

    this.selectedAnswer = '';
  }

  restartQuiz(): void {
    this.currentQuestionIndex = 0;
    this.correctAnswersCount = 0;
    this.timeLeftForQuiz = this.totalQuizTimeInSeconds;
    this.getQuiz();
    this.startQuizTimer();
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