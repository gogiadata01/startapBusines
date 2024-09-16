
export interface Icard{
  key?:string,
  url: string;
  title: string;
  mainText: string;
  history: string;
  forpupil: string;
  ScholarshipAndFunding: string;
  ExchangePrograms: string;
  Labs: string;
  Jobs: string;
  StudentsLife: string;
  PaymentMethods: string;
  Events: { url: string, Title: string, text: string }[];
  sections: { title: string, programNames: { programName: string }[] }[];
  sections2: { title:any, SavaldebuloSagnebi: {  SagnisSaxeli: any, Koeficienti: any, MinimaluriZgvari: any, Prioriteti: any }[] }[];
  archevitisavaldebulosagani: { title: string, ArchevitiSavaldebuloSagnebi: {SagnisSaxeli: string, Koeficienti: string, MinimaluriZgvari: string, Prioriteti: string }[] }[];
};

// home-uni-card-dto.model.ts

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
  events?: EventDto[];
  sections?: SectionDto[];
  sections2?: Section2Dto[];
  archevitiSavaldebuloSaganebi?: ArchevitiSavaldebuloSaganiDto[];
}

export interface EventDto {
  url: string;
  title: string;
  text: string;
}

export interface SectionDto {
  title: string;
  programNames?: ProgramnameDto[];
}

export interface Section2Dto {
  title: string;
  savaldebuloSagnebi?: SavaldebuloSagnebiDto[];
}

export interface ArchevitiSavaldebuloSaganiDto {
  title: string;
  archevitiSavaldebuloSagnebi?: ArchevitiSavaldebuloSagnebiDto[];
}

export interface ProgramnameDto {
  programName: string;
  Jobs: string;
  SwavlebisEna: string;
  Kvalifikacia: string;
  Dafinanseba: string;
  KreditebisRaodenoba: string;
  AdgilebisRaodenoba: string;
  Fasi: string;
  Kodi: string;
  ProgramisAgwera: string;

}

export interface SavaldebuloSagnebiDto {
  sagnisSaxeli: string;
  koeficienti: string;
  minimaluriZgvari: string;
  prioriteti: string;
  AdgilebisRaodenoba: string;
}

export interface ArchevitiSavaldebuloSagnebiDto {
  sagnisSaxeli: string;
  koeficienti: string;
  minimaluriZgvari: string;
  prioriteti: string;
  AdgilebisRaodenoba: string;

}

export interface ProgramCardDto {
  fields?:FieldDto[];
}

export interface FieldDto{
  fieldName:string;
  programNames:ProgramNamesDto[]
}

export interface ProgramNamesDto{
  programname:string;
  checkBoxes:CheckBoxesDto[]
  width:string

}

export interface CheckBoxesDto{
  chackBoxName:string
}

export interface EventCardDto{
  Url:string;
  Title:string;
  Text:string;
  Time:string
  Types:EventTypeDto[];
}

export interface EventTypeDto{
  Type:string
}

export interface UserDto{
  Name:string;
  Email:string;
  Password:string;
  type:string;
  Img:string;
  Coin:number;
  ResetToken:string;
}
export interface UserSignInDto{
  Email:any;
  Password:string
}

export interface IUser{
  email:string,
  Username:string
  role:string
}
export interface IUniFacultyCard{
  key?: string | null;
  title: string;
  text: string;
  sections: { checkBoxNames: { checkBoxName: string }[] }[];
}
export interface QuizDto {
  Time:string
  questions: QuestionDto[];
}

export interface QuestionDto {
  question: string;
  correctanswer: string;
  img:string | null
  incorrectAnswers: IncorrectAnswerDto[];
}

export interface IncorrectAnswerDto {
  inccorectAnswer: string;
}

export interface IEventCard{
  key?:string,
  url:string,
  title:string
  text:string
}
