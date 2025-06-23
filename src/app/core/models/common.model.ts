export interface UniCardDto {
  id?:number;
  url: string;
  title: string;
  mainText?: string;
  history?: any;
  forPupil?: string;
  scholarshipAndFunding?: any;
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
  jobs?: any;
  swavlebisEna?: string;
  kvalifikacia?: string;
  dafinanseba?: string;
  kreditebisRaodenoba?: string;
  adgilebisRaodenoba?: string;
  fasi?: string;
  kodi?: string;
  programisAgwera? : any;
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
export interface ProgramCardEnDto {
  fields_en: FieldEnDto[];
}

export interface FieldEnDto {
  id:number
  fieldName_en: string;
  programNames_en: ProgramNamesEnDto[];
}

export interface ProgramNamesEnDto {
  id?:number;
  programName_en: any;
  checkBoxes_en: CheckBoxesEnDto[];
  width?:string
}

export interface CheckBoxesEnDto {
  checkBoxName_en: string;
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
  description:string;
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
export interface LeaderboardEntry {
  user: UserDto;
  position: number;
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
  inccorectAnswer: string;
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

// export interface QuizSubmissionDto {
//   time: any;
//   QuizQuestions: QuizQuestions[];
//   img?: string | null;
// }

// export interface QuizQuestions {
//   Question: string;
//   CorrectAnswer: string;
//   UserAnswer: string;
//   Img?: string | null;
//   BadAnswers: BadAnswers[];
// }

// export interface BadAnswers {
//   badanswer: string;
// }
export interface QuizSubmissionDto {
  time: string;
  quizQuestions: QuizQuestion[]; 
  open?: boolean; 

}

export interface QuizQuestion {
  question: string;
  correctanswer: string;
  userAnswer: string;
  img?: string | null;
  badAnswers: BadAnswer[];
}

export interface BadAnswer {
  badanswer: any;
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

export interface UnicardEnDto {
  id?: number;
  url_en: string;
  title_en: string;
  mainText_en?: string;
  history_en?: any;
  forPupil_en?: string;
  scholarshipAndFunding_en?: any;
  exchangePrograms_en?: string;
  labs_en?: string;
  studentsLife_en?: string;
  paymentMethods_en?: string;
  events_en: EventEnDto[];
  sections_en: SectionEnDto[];
  sections2_en: Section2EnDto[];
  archevitiSavaldebuloSaganebi_en: ArchevitiSavaldebuloSaganiEnDto[];
}

export interface EventEnDto {
  id?:number
  url_en: string;
  title_en: string;
  text_en: string;
  time_en: string;
  link_en: string;
}

export interface SectionEnDto {
  title_en: string;
  programNames_en: ProgramnameEnDto[];
}

export interface ProgramnameEnDto {
  programName_en: string;
  jobs_en: string;
  swavlebisEna_en: string;
  kvalifikacia_en: string;
  dafinanseba_en: string;
  kreditebisRaodenoba_en: string;
  adgilebisRaodenoba_en: string;
  fasi_en: string;
  kodi_en: string;
  programisAgwera_en: string;
}

export interface Section2EnDto {
  title_en: string;
  savaldebuloSagnebi_en: SavaldebuloSagnebiEnDto[];
}

export interface SavaldebuloSagnebiEnDto {
  sagnisSaxeli_en: string;
  koeficienti_en: string;
  minimaluriZgvari_en: string;
  prioriteti_en: string;
  adgilebisRaodenoba_en: string;
}

export interface ArchevitiSavaldebuloSaganiEnDto {
  title_en: string;
  archevitiSavaldebuloSagnebi_en: ArchevitiSavaldebuloSagnebiEnDto[];
}

export interface ArchevitiSavaldebuloSagnebiEnDto {
  sagnisSaxeli_en: string;
  koeficienti_en: string;
  minimaluriZgvari_en: string;
  prioriteti_en: string;
  adgilebisRaodenoba_en: string;
}
export interface UniCardForFacultyDetailsEn{
  id?:number;
  url_en: string;
  title_en: string;
  programNames_en?: ProgramNamene[];
}
export interface ProgramNamene {
  programName_en: string;
}