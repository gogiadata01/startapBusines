import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {UniCardEngService} from "../../uni-card-eng.service"
import { UnicardEnDto } from '../../core/models/common.model';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common'
@Component({
  selector: 'app-addwith-api-unicard-eng',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './addwith-api-unicard-eng.component.html',
  styleUrl: './addwith-api-unicard-eng.component.scss'
})
export class AddwithApiUnicardEngComponent {
  UniCardForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private UniCardEngService: UniCardEngService
  ) {
    this.UniCardForm = this.fb.group({
      url_en: ['', Validators.required],
      title_en: ['', Validators.required],
      mainText_en: [''],
      history_en: [''],
      forPupil_en: [''],
      scholarshipAndFunding_en: [''],
      exchangePrograms_en: [''],
      labs_en: [''],
      studentsLife_en: [''],
      paymentMethods_en: [''],
      events_en: this.fb.array([]),
      sections_en: this.fb.array([]),
      sections2_en: this.fb.array([]),
      archevitiSavaldebuloSaganebi_en: this.fb.array([])
    });
  }

  get events_en(): FormArray {
    return this.UniCardForm.get('events_en') as FormArray;
  }

  get sections_en(): FormArray {
    return this.UniCardForm.get('sections_en') as FormArray;
  }

  get sections2_en(): FormArray {
    return this.UniCardForm.get('sections2_en') as FormArray;
  }

  get archevitiSavaldebuloSaganebi_en(): FormArray {
    return this.UniCardForm.get('archevitiSavaldebuloSaganebi_en') as FormArray;
  }

  createEvent(): FormGroup {
    return this.fb.group({
      url_en: ['', Validators.required],
      title_en: ['', Validators.required],
      text_en: ['', Validators.required],
      time_en: ['', ],
      link_en: ['', ],
    });
  }

  createProgramName(): FormGroup {
    return this.fb.group({
      programName_en: ['', Validators.required],
      jobs_en: ['', Validators.required],
      swavlebisEna_en: ['', Validators.required],
      kvalifikacia_en: ['', Validators.required],
      dafinanseba_en: ['', Validators.required],
      kreditebisRaodenoba_en: ['', Validators.required],
      adgilebisRaodenoba_en: ['', Validators.required],
      fasi_en: ['', Validators.required],
      kodi_en: ['', Validators.required],
      programisAgwera_en: ['', Validators.required],

    });
  }

  createSection(): FormGroup {
    return this.fb.group({
      title_en: ['', Validators.required],
      programNames_en: this.fb.array([this.createProgramName()])
    });
  }

  createSavaldebuloSagani(): FormGroup {
    return this.fb.group({
      sagnisSaxeli_en: ['', Validators.required],
      koeficienti_en: ['', Validators.required],
      minimaluriZgvari_en: ['', Validators.required],
      prioriteti_en: ['', Validators.required],
      adgilebisRaodenoba_en: ['', Validators.required]
    });
  }

  createSection2(): FormGroup {
    return this.fb.group({
      title_en: ['', Validators.required],
      savaldebuloSagnebi_en: this.fb.array([this.createSavaldebuloSagani()])
    });
  }

  createArchevitiSavaldebuloSagani(): FormGroup {
    return this.fb.group({
      sagnisSaxeli_en: ['', Validators.required],
      koeficienti_en: ['', Validators.required],
      minimaluriZgvari_en: ['', Validators.required],
      prioriteti_en: ['', Validators.required],
      adgilebisRaodenoba_en: ['', Validators.required]
    });
  }

  createArcheviti(): FormGroup {
    return this.fb.group({
      title_en: ['', Validators.required],
      archevitiSavaldebuloSagnebi_en: this.fb.array([this.createArchevitiSavaldebuloSagani()])
    });
  }

  addEvent() {
    this.events_en.push(this.createEvent());
  }

  addSection() {
    this.sections_en.push(this.createSection());
  }

  addSection2() {
    this.sections2_en.push(this.createSection2());
  }

  addArcheviti() {
    this.archevitiSavaldebuloSaganebi_en.push(this.createArcheviti());
  }

  addProgramName(sectionIndex: number): void {
    const programNames = this.sections_en.at(sectionIndex).get('programNames_en') as FormArray;
    programNames.push(this.createProgramName());
  }

  addSavaldebuloSagnebi(section2Index: number): void {
    const savaldebuloSagnebi = this.sections2_en.at(section2Index).get('savaldebuloSagnebi_en') as FormArray;
    savaldebuloSagnebi.push(this.createSavaldebuloSagani());
  }

  addArchevitiSavaldebuloSagnebi(archevitiIndex: number): void {
    const archevitiSavaldebuloSagnebi = this.archevitiSavaldebuloSaganebi_en.at(archevitiIndex).get('archevitiSavaldebuloSagnebi_en') as FormArray;
    archevitiSavaldebuloSagnebi.push(this.createArchevitiSavaldebuloSagani());
  }

  removeEvent(index: number): void {
    this.events_en.removeAt(index);
  }

  removeSection(index: number): void {
    this.sections_en.removeAt(index);
  }

  removeSection2(index: number): void {
    this.sections2_en.removeAt(index);
  }

  removeArcheviti(index: number): void {
    this.archevitiSavaldebuloSaganebi_en.removeAt(index);
  }

  removeProgramName(sectionIndex: number, programNameIndex: number): void {
    const programNames = this.sections_en.at(sectionIndex).get('programNames_en') as FormArray;
    programNames.removeAt(programNameIndex);
  }

  removeSavaldebuloSagnebi(section2Index: number, sagnebiIndex: number): void {
    const savaldebuloSagnebi = this.sections2_en.at(section2Index).get('savaldebuloSagnebi_en') as FormArray;
    savaldebuloSagnebi.removeAt(sagnebiIndex);
  }

  removeArchevitiSavaldebuloSagnebi(archevitiIndex: number, sagnebiIndex: number): void {
    const archevitiSavaldebuloSagnebi = this.archevitiSavaldebuloSaganebi_en.at(archevitiIndex).get('archevitiSavaldebuloSagnebi_en') as FormArray;
    archevitiSavaldebuloSagnebi.removeAt(sagnebiIndex);
  }

  onSubmit() {
    if (this.UniCardForm.valid) {
      const uniCardDto: UnicardEnDto = this.UniCardForm.value;
      this.UniCardEngService.addUniCard(uniCardDto).subscribe({
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
