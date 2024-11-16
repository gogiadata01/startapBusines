import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { QuizService } from '../../quiz.service';
import { QuizDto } from '../../core/models/common.model';
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
      // bonusQuestion: this.fb.group({
      //   question: [''],
      //   correctAnswer: [''],
      //   img: [''],
      //   incorrectAnswers: this.fb.array([this.createIncorrectAnswer()]),
      //   coins: [3], // Default value
      // }, { validators: this.optionalBonusQuestionValidator })
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

  // Custom validator for bonus question
// Custom validator for bonus question
// optionalBonusQuestionValidator(control: FormGroup): { [key: string]: boolean } | null {
//   const question = control.get('question');
//   const correctAnswer = control.get('correctAnswer');
//   const incorrectAnswers = control.get('incorrectAnswers') as FormArray;

//   // If all fields inside the bonus question are empty, treat it as valid
//   if (!question?.value && !correctAnswer?.value && incorrectAnswers?.length === 0) {
//     return null; // No validation error if it's empty
//   }

//   // If any field is filled, validate it
//   // Check if required fields are valid
//   const questionValid = question?.valid || question?.value === '';
//   const correctAnswerValid = correctAnswer?.valid || correctAnswer?.value === '';
//   const incorrectAnswersValid = incorrectAnswers?.valid || incorrectAnswers?.length === 0;

//   if (questionValid && correctAnswerValid && incorrectAnswersValid) {
//     return null; // Return null if everything is valid
//   }

//   return { 'bonusQuestionInvalid': true }; // Return validation error if invalid
// }


  onSubmit(): void {
    // Log the form values to check if they are populated correctly
    // console.log('Form Submitted:', this.quizForm.value);
    
    // Check if the quiz form is valid
    if (this.quizForm.valid) {
      this.quizService.createQuiz(this.quizForm.value).subscribe(
        response => {
          console.log('Quiz added successfully', response);
        },
        error => {
          console.error('Error adding quiz', error);
        }
      );
    } else {
      // Check which fields are invalid and log the errors
      // this.logFormErrors();
    }
  }

  // logFormErrors(): void {
  //   Object.keys(this.quizForm.controls).forEach(controlName => {
  //     const control = this.quizForm.get(controlName);
  //     if (control?.invalid) {
  //       console.log(`${controlName} is invalid:`, control.errors);
  //     }
  //   });
  // }
}
