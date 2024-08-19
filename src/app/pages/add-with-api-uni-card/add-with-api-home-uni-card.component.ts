import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';
import { HomeUniCardService } from '../../home-uni-card.service';
import { UniCardDto } from '../../core/models/common.model';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-with-api-home-uni-card',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './add-with-api-home-uni-card.component.html',
  styleUrls: ['./add-with-api-home-uni-card.component.scss']
})
export class AddWithApiHomeUniCardComponent {
  UniCardForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private homeUniCardService: HomeUniCardService
  ) {
    this.UniCardForm = this.fb.group({
      url: ['', Validators.required],
      title: ['', Validators.required],
      mainText: [''],
      history: [''],
      forPupil: [''],
      scholarshipAndFunding: [''],
      exchangePrograms: [''],
      labs: [''],
      studentsLife: [''],
      paymentMethods: [''],
      events: this.fb.array([]),
      sections: this.fb.array([]),
      sections2: this.fb.array([]),
      archevitiSavaldebuloSaganebi: this.fb.array([])
    });
  }

  get events(): FormArray {
    return this.UniCardForm.get('events') as FormArray;
  }

  get sections(): FormArray {
    return this.UniCardForm.get('sections') as FormArray;
  }

  get sections2(): FormArray {
    return this.UniCardForm.get('sections2') as FormArray;
  }

  get archevitiSavaldebuloSaganebi(): FormArray {
    return this.UniCardForm.get('archevitiSavaldebuloSaganebi') as FormArray;
  }

  createEvent(): FormGroup {
    return this.fb.group({
      url: ['', Validators.required],
      title: ['', Validators.required],
      text: ['', Validators.required]
    });
  }

  createProgramName(): FormGroup {
    return this.fb.group({
      programName: ['', Validators.required],
      Jobs: ['', Validators.required],
      SwavlebisEna: ['', Validators.required],
      Kvalifikacia: ['', Validators.required],
      Dafinanseba: ['', Validators.required],
      KreditebisRaodenoba: ['', Validators.required],
      AdgilebisRaodenoba: ['', Validators.required],
      Fasi: ['', Validators.required],
      Kodi: ['', Validators.required],
      ProgramisAgwera: ['', Validators.required],

    });
  }

  createSection(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      programNames: this.fb.array([this.createProgramName()])
    });
  }

  createSavaldebuloSagani(): FormGroup {
    return this.fb.group({
      sagnisSaxeli: ['', Validators.required],
      koeficienti: ['', Validators.required],
      minimaluriZgvari: ['', Validators.required],
      prioriteti: ['', Validators.required],
      AdgilebisRaodenoba: ['', Validators.required]
    });
  }

  createSection2(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      savaldebuloSagnebi: this.fb.array([this.createSavaldebuloSagani()])
    });
  }

  createArchevitiSavaldebuloSagani(): FormGroup {
    return this.fb.group({
      sagnisSaxeli: ['', Validators.required],
      koeficienti: ['', Validators.required],
      minimaluriZgvari: ['', Validators.required],
      prioriteti: ['', Validators.required],
      AdgilebisRaodenoba: ['', Validators.required]
    });
  }

  createArcheviti(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      archevitiSavaldebuloSagnebi: this.fb.array([this.createArchevitiSavaldebuloSagani()])
    });
  }

  addEvent() {
    this.events.push(this.createEvent());
  }

  addSection() {
    this.sections.push(this.createSection());
  }

  addSection2() {
    this.sections2.push(this.createSection2());
  }

  addArcheviti() {
    this.archevitiSavaldebuloSaganebi.push(this.createArcheviti());
  }

  addProgramName(sectionIndex: number): void {
    const programNames = this.sections.at(sectionIndex).get('programNames') as FormArray;
    programNames.push(this.createProgramName());
  }

  addSavaldebuloSagnebi(section2Index: number): void {
    const savaldebuloSagnebi = this.sections2.at(section2Index).get('savaldebuloSagnebi') as FormArray;
    savaldebuloSagnebi.push(this.createSavaldebuloSagani());
  }

  addArchevitiSavaldebuloSagnebi(archevitiIndex: number): void {
    const archevitiSavaldebuloSagnebi = this.archevitiSavaldebuloSaganebi.at(archevitiIndex).get('archevitiSavaldebuloSagnebi') as FormArray;
    archevitiSavaldebuloSagnebi.push(this.createArchevitiSavaldebuloSagani());
  }

  removeEvent(index: number): void {
    this.events.removeAt(index);
  }

  removeSection(index: number): void {
    this.sections.removeAt(index);
  }

  removeSection2(index: number): void {
    this.sections2.removeAt(index);
  }

  removeArcheviti(index: number): void {
    this.archevitiSavaldebuloSaganebi.removeAt(index);
  }

  removeProgramName(sectionIndex: number, programNameIndex: number): void {
    const programNames = this.sections.at(sectionIndex).get('programNames') as FormArray;
    programNames.removeAt(programNameIndex);
  }

  removeSavaldebuloSagnebi(section2Index: number, sagnebiIndex: number): void {
    const savaldebuloSagnebi = this.sections2.at(section2Index).get('savaldebuloSagnebi') as FormArray;
    savaldebuloSagnebi.removeAt(sagnebiIndex);
  }

  removeArchevitiSavaldebuloSagnebi(archevitiIndex: number, sagnebiIndex: number): void {
    const archevitiSavaldebuloSagnebi = this.archevitiSavaldebuloSaganebi.at(archevitiIndex).get('archevitiSavaldebuloSagnebi') as FormArray;
    archevitiSavaldebuloSagnebi.removeAt(sagnebiIndex);
  }

  onSubmit() {
    if (this.UniCardForm.valid) {
      const uniCardDto: UniCardDto = this.UniCardForm.value;
      this.homeUniCardService.addUniCard(uniCardDto).subscribe({
        next: (response) => {
          console.log('UniCard added successfully', response);
        },
        error: (err) => {
          console.error('Error adding UniCard', err);
        }
      });
    }
  }
}
