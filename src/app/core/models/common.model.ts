export interface UniCardDto {
  id?:number;
  url: string;
  title: string;
  mainText?: string;
  history?: string;
  forPupil?: string;
  scholarshipAndFunding?: string;
  exchangePrograms?: string;
  labs?: string;
  studentsLife?: string;
  paymentMethods?: string;
  events: EventDto[];
  sections: SectionDto[];
  sections2: Section2Dto[];
  archevitiSavaldebuloSaganebi: ArchevitiSavaldebuloSaganiDto[];
}

export interface EventDto {
  id?:number
  url: string;
  title: string;
  text: string;
  time:string;
  link:string

}

export interface SectionDto {
  title: string;
  programNames: ProgramnameDto[];
}

export interface Section2Dto {
  title: string;
  savaldebuloSagnebi: SavaldebuloSagnebiDto[];
}

export interface ArchevitiSavaldebuloSaganiDto {
  title: string;
  archevitiSavaldebuloSagnebi: ArchevitiSavaldebuloSagnebiDto[];
}

export interface ProgramnameDto {
  programName?: string;
  jobs?: string;
  swavlebisEna?: string;
  kvalifikacia?: string;
  dafinanseba?: string;
  kreditebisRaodenoba?: string;
  adgilebisRaodenoba?: string;
  fasi?: string;
  kodi?: string;
  programisAgwera? : string;
  mizani:string

}

export interface SavaldebuloSagnebiDto {
  sagnisSaxeli: string;
  koeficienti: string;
  minimaluriZgvari: string;
  prioriteti: string;
  adgilebisRaodenoba: string;
}

export interface ArchevitiSavaldebuloSagnebiDto {
  sagnisSaxeli: string;
  koeficienti: string;
  minimaluriZgvari: string;
  prioriteti: string;
  adgilebisRaodenoba: string;

}

export interface ProgramCardDto {
  fields:FieldDto[];
}

export interface FieldDto{
  id:number
  fieldName:string;
  programNames:ProgramNamesDto[]
}

export interface ProgramNamesDto{
  id?:number;
  programname:any;
  checkBoxes:CheckBoxesDto[]
  width?:string

}

export interface CheckBoxesDto{
  chackBoxName:string
}

export interface EventCardDto{
  id?:number
  url:string;
  title:string;
  text:string;
  time:string;
  link:string;
  isFeatured:boolean;
  saregistracioForma:string;
  numbering:number;
  types:EventTypeDto[];
}

export interface EventTypeDto{
  type:string
}

export interface UserDto{
  id?:number
  name:string;
  email:string;
  Password:string;
  type:string;
  img:string;
  coin:number;
  Token:string;
  RemainingTime:string
}
export interface UserSignInDto{
  Email:any;
  Password:string
}

export interface UniCardForFacultyDetails{
  id?:number;
  url: string;
  title: string;
  mainText?: string;
  programNames?: Programname[];
}
export interface Programname {
  programName: string;
}
// export interface QuizDto {
//   time: string;
//   questions: QuestionDto[];
//   bonusQuestion: BonusQuestionDto; 
// }

// export interface QuestionDto {
//   question: string;
//   correctanswer: string;
//   img: string | null;
//   incorrectAnswers: IncorrectAnswerDto[];
// }

// export interface IncorrectAnswerDto {
//   inccorectAnswer: string;
// }

// export interface BonusQuestionDto {
//   question: string;
//   correctanswer: string;
//   img: string | null;
//   incorrectAnswers: IncorrectAnswerDto[];
// }
export interface QuizDto {
  time: string;
  questions: QuestionDto[];
  bonusQuestion?: BonusQuestionDto;
}

export interface QuestionDto {
  question: string;
  correctanswer: any; 
  img: string | null;
  incorrectAnswers: IncorrectAnswerDto[];
}

export interface IncorrectAnswerDto {
  answer: string;
}

export interface BonusQuestionDto {
  question?: string;
  correctAnswers?: CorrectAnswerDto[]; // Array of correct answers for the bonus question
  img?: string | null;
  incorrectAnswers?: IncorrectAnswerDto[];
  coins: number;
}

export interface CorrectAnswerDto {
  answer: string;
}






export interface QuizDto1 {
  time: string;
  questions: QuestionDto1[];
  bonusQuestion: BonusQuestionDto1;
}

export interface QuestionDto1 {
  question: string;
  correctAnswer: string; 
  img: string | null;
  incorrectAnswers: IncorrectAnswerDto1[];
}

export interface IncorrectAnswerDto1 {
  answer: string; 
}

export interface BonusQuestionDto1 {
  question: string;
  correctAnswer: string;
  img: string | null;
  incorrectAnswers: IncorrectAnswerDto[];
  coins: number; 
}
export interface UniversityVisit {
  id: number;
  universityName: string;
  userId: string;
  visitDate: string; 
}
export interface UniversityProgramVisit {
  id?: number;
  universityName: string;
  programName: string;
  visitDate?: Date;
}