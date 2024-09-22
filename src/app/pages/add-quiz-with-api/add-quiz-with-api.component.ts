import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators,ReactiveFormsModule } from '@angular/forms';
import { QuizService } from '../../quiz.service';
import {QuizDto} from '../../core/models/common.model'
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-quiz-with-api',
  standalone: true,
  imports: [ NgFor,
    NgIf,
    ReactiveFormsModule],
  templateUrl: './add-quiz-with-api.component.html',
  styleUrl: './add-quiz-with-api.component.scss'
})
export class AddQuizWithApiComponent implements OnInit {
  quizForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService
  ) {
    this.quizForm = this.fb.group({
      time: ['', Validators.required],
      questions: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.addQuestion(); // Add at least one question initially
  }

  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  createQuestion(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      correctanswer: ['', Validators.required],
      img:['',],
      incorrectAnswers: this.fb.array([this.createIncorrectAnswer()])
    });
  }

  createIncorrectAnswer(): FormGroup {
    return this.fb.group({
      inccorectAnswer: ['', Validators.required]
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

  onSubmit(): void {
    if (this.quizForm.valid) {
      const quiz: QuizDto = this.quizForm.value;
      this.quizService.createQuiz(quiz).subscribe(
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