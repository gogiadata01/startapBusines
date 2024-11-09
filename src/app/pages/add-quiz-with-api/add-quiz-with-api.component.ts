import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { QuizService } from '../../quiz.service';
import { QuizDto } from '../../core/models/common.model'; // Corrected import
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-quiz-with-api',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './add-quiz-with-api.component.html',
  styleUrls: ['./add-quiz-with-api.component.scss']
})
export class AddQuizWithApiComponent implements OnInit {
  quizForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService
  ) {
    this.quizForm = this.fb.group({
      time: ['', Validators.required],
      questions: this.fb.array([]),
      bonusQuestion: this.fb.group({
        question: ['', Validators.required],
        correctAnswer: ['', Validators.required],
        img: [''],
        incorrectAnswers: this.fb.array([this.createIncorrectAnswer()]),
        coins: [3],  // Default to 3 coins
      })
    });
  }

  ngOnInit(): void {
    this.addQuestion(); // Add at least one question initially
  }

  get questions() {
    return (this.quizForm.get('questions') as FormArray);
  }

  get bonusQuestion() {
    return this.quizForm.get('bonusQuestion') as FormGroup;
  }

  createQuestion(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      correctAnswer: ['', Validators.required],
      img: [''],
      incorrectAnswers: this.fb.array([this.createIncorrectAnswer()])
    });
  }

  createIncorrectAnswer(): FormGroup {
    return this.fb.group({
      answer: ['', Validators.required]
    });
  }

  addQuestion(): void {
    this.questions.push(this.createQuestion());
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  addIncorrectAnswer(questionIndex: number): void {
    const incorrectAnswers = this.getIncorrectAnswers(questionIndex);
    incorrectAnswers.push(this.createIncorrectAnswer());
  }

  removeIncorrectAnswer(questionIndex: number, answerIndex: number): void {
    const incorrectAnswers = this.getIncorrectAnswers(questionIndex);
    incorrectAnswers.removeAt(answerIndex);
  }

  getIncorrectAnswers(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('incorrectAnswers') as FormArray;
  }

  addBonusIncorrectAnswer(): void {
    const incorrectAnswers = this.bonusQuestion.get('incorrectAnswers') as FormArray;
    incorrectAnswers.push(this.createIncorrectAnswer());
  }

  removeBonusIncorrectAnswer(answerIndex: number): void {
    const incorrectAnswers = this.bonusQuestion.get('incorrectAnswers') as FormArray;
    incorrectAnswers.removeAt(answerIndex);
  }

  onSubmit(): void {
    if (this.quizForm.valid) {
      this.quizService.createQuiz(this.quizForm.value).subscribe(
        response => {
          console.log('Quiz added successfully', response);
          // Handle successful response
        },
        error => {
          console.error('Error adding quiz', error);
          // Handle error response
        }
      );
    }
  }
}
