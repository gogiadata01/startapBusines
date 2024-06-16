// export interface Icard{
//   key?: string,
//   title: string,
//   text:string,
//   text2:string
// }
export interface Icard{
  key?:string,
  url?:string,
  title?:string,
  mainText?:string
  history?:string,
  forpupil?:string,
  sections:Array<any>,
  ScholarshipAndFunding?:string,
  ExchangePrograms?:string,
  Labs?:string,
  Jobs?:string,
  StudentsLife?:string
  PaymentMethods?:string,
  Events?:Array<string>,
};
export interface IUser{
  email:string,
  Username:string
  role:string
}
export interface IUniFacultyCard{
  key?:string,
  title:string,
  text:string
}
export interface IEventCard{
  key?:string,
  url:string,
  title:string
  text:string
}
