
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
export interface IUser{
  email:string,
  Username:string
  role:string
}
export interface IUniFacultyCard{
  key?:string,
  title:string,
  text:string,
  ChackBoxNames: {ChackBoxName:any[] }[];
}
export interface IEventCard{
  key?:string,
  url:string,
  title:string
  text:string
}
