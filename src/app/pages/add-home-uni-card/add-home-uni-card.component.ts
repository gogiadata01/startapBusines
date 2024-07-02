import { Component, OnInit, inject } from '@angular/core';

import {ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf,NgFor} from "@angular/common";
import {CreateFormService} from "../../core/services/create-form.service";
import {Icard} from "../../core/models/common.model";
import {Router, RouterLink, UrlHandlingStrategy} from "@angular/router";
import { NavbarComponent } from '../../navbar/navbar.component';
import { AuthService } from '../../core/services/auth.service';
import { reduce } from 'rxjs';
import { query } from 'firebase/firestore';

@Component({
  selector: 'app-add-home-uni-card',
  standalone: true,
  imports: [ NgIf,
    ReactiveFormsModule,
    RouterLink,
    NavbarComponent,
    NgFor
    ],
  templateUrl: './add-home-uni-card.component.html',
  styleUrl: './add-home-uni-card.component.scss'
})
export class AddHomeUniCardComponent {
  fb = inject(FormBuilder)
  createform = inject(CreateFormService)
  router = inject(Router)
  Form = this.fb.nonNullable.group({
    url : <unknown> ["",Validators.required] ,
    title :  ["",Validators.required],
    mainText:  ["",Validators.required],
    history:  ["",Validators.required],
    forpupil:  ["",Validators.required],
    ScholarshipAndFunding:  ["",Validators.required],
    ExchangePrograms:  ["",Validators.required],
    Labs:  ["",Validators.required],
    Jobs:  ["",Validators.required],
    StudentsLife:  ["",Validators.required],
    PaymentMethods:  ["",Validators.required],
    Events: this.fb.array([this.createEvent()]),

      sections: this.fb.array([this.createSection()]),
      sections2: this.fb.array([this.createSection2()]),
      archevitisavaldebulosagani: this.fb.array([this.createSection2()]),
  })


  createSection(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      programNames: this.fb.array([this.createProgramName()]),
      // SavaldebuloSagnebi: this.fb.array([this.createSavaldebuloSagani()]),
      // ArchevitiSavaldebuloSagnebi: this.fb.array([this.createArchevitiSavaldebuloSagani()])

    });
  }
  createSection2(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      SavaldebuloSagnebi: this.fb.array([this.createSavaldebuloSagani()]),

    });
  }
  createarchevitisavaldebulosagani(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      ArchevitiSavaldebuloSagnebi: this.fb.array([this.createArchevitiSavaldebuloSagani()])

    });
  }
  createProgramName(): FormGroup {
    return this.fb.group({
      programName: ['', Validators.required]
    });
  }
  createSavaldebuloSagani(): FormGroup {
    return this.fb.group({
      SagnisSaxeli: ['', Validators.required],
      Koeficienti: ['', Validators.required],
      MinimaluriZgvari: ['', Validators.required],
      Prioriteti: ['', Validators.required]

    });
  }
  createArchevitiSavaldebuloSagani(): FormGroup {
    return this.fb.group({
      SagnisSaxeli: ['', Validators.required],
      Koeficienti: ['', Validators.required],
      MinimaluriZgvari: ['', Validators.required],
      Prioriteti: ['', Validators.required]

    });
  }

  get sections(): FormArray {
    return this.Form.get('sections') as FormArray;
  }
  get sections2(): FormArray {
    return this.Form.get('sections2') as FormArray;
  }
  get archevitisavaldebulosagani(): FormArray {
    return this.Form.get('archevitisavaldebulosagani') as FormArray;
  }
  addSection(): void {
    this.sections.push(this.createSection());
  }
  addSection2(): void {
    this.sections2.push(this.createSection2());
  }
  addarchevitisavaldebulosagani(): void {
    this.archevitisavaldebulosagani.push(this.createarchevitisavaldebulosagani());
  }
  removeSection(index: number): void {
    this.sections.removeAt(index);
  }
  removeSection2(index: number): void {
    this.sections2.removeAt(index);
  }
  removeArchevitiSavaldebuloSagani(index: number): void {
    this.archevitisavaldebulosagani.removeAt(index);
  }


  addProgramName(sectionIndex: number): void {
    const programNames = this.sections.at(sectionIndex).get('programNames') as FormArray;
    programNames.push(this.createProgramName());
  }


  removeProgramName(sectionIndex: number, programNameIndex: number): void {
    const programNames = this.sections.at(sectionIndex).get('programNames') as FormArray;
    programNames.removeAt(programNameIndex);
  }

  addSagnisSaxeli(sectionIndex: number): void {
    const SavaldebuloSagnebi = this.sections2.at(sectionIndex).get('SavaldebuloSagnebi') as FormArray;
    SavaldebuloSagnebi.push(this.createSavaldebuloSagani());
  }

  removeSagnisSaxeli(sectionIndex: number, SagnisSaxelisIndex: number): void {
    const SavaldebuloSagnebi = this.sections2.at(sectionIndex).get('SavaldebuloSagnebi') as FormArray;
    SavaldebuloSagnebi.removeAt(SagnisSaxelisIndex);
  }

  addKoeficienti(sectionIndex: number): void {
    const SavaldebuloSagnebi = this.sections2.at(sectionIndex).get('SavaldebuloSagnebi') as FormArray;
    SavaldebuloSagnebi.push(this.createSavaldebuloSagani());
  }
  removeKoeficientebi(sectionIndex: number, KoeficientiIndex: number): void {
    const SavaldebuloSagnebi = this.sections2.at(sectionIndex).get('SavaldebuloSagnebi') as FormArray;
    SavaldebuloSagnebi.removeAt(KoeficientiIndex);
  }
  addMinimaluriZgvarebi(sectionIndex: number): void {
    const SavaldebuloSagnebi = this.sections2.at(sectionIndex).get('SavaldebuloSagnebi') as FormArray;
    SavaldebuloSagnebi.push(this.createSavaldebuloSagani());
  }
  removeMinimaluriZgvarebi(sectionIndex: number, MinimaluriZgvariIndex: number): void {
    const SavaldebuloSagnebi = this.sections2.at(sectionIndex).get('SavaldebuloSagnebi') as FormArray;
    SavaldebuloSagnebi.removeAt(MinimaluriZgvariIndex);
  }
  addPrioritetebi(sectionIndex: number): void {
    const SavaldebuloSagnebi = this.sections2.at(sectionIndex).get('SavaldebuloSagnebi') as FormArray;
    SavaldebuloSagnebi.push(this.createSavaldebuloSagani());
  }
  removePrioritetebi(sectionIndex: number, PrioritetiIndex: number): void {
    const SavaldebuloSagnebi = this.sections2.at(sectionIndex).get('SavaldebuloSagnebi') as FormArray;
    SavaldebuloSagnebi.removeAt(PrioritetiIndex);
  }
  

  //
  addArchevitiSagnisSaxeli(sectionIndex: number): void {
    const ArchevitiSavaldebuloSagnebi = this.archevitisavaldebulosagani.at(sectionIndex).get('ArchevitiSavaldebuloSagnebi') as FormArray;
    ArchevitiSavaldebuloSagnebi.push(this.createArchevitiSavaldebuloSagani());
  }

  removeArchevitiSagnisSaxeli(sectionIndex: number, SagnisSaxelisIndex: number): void {
    const ArchevitiSavaldebuloSagnebi = this.archevitisavaldebulosagani.at(sectionIndex).get('ArchevitiSavaldebuloSagnebi') as FormArray;
    ArchevitiSavaldebuloSagnebi.removeAt(SagnisSaxelisIndex);
  }

  addArchevitiKoeficienti(sectionIndex: number): void {
    const ArchevitiSavaldebuloSagnebi = this.archevitisavaldebulosagani.at(sectionIndex).get('ArchevitiSavaldebuloSagnebi') as FormArray;
    ArchevitiSavaldebuloSagnebi.push(this.createArchevitiSavaldebuloSagani());
  }
  removeArchevitiKoeficientebi(sectionIndex: number, KoeficientebiIndex: number): void {
    const ArchevitiSavaldebuloSagnebi = this.archevitisavaldebulosagani.at(sectionIndex).get('ArchevitiSavaldebuloSagnebi') as FormArray;
    ArchevitiSavaldebuloSagnebi.removeAt(KoeficientebiIndex);
  }
  addArchevitiMinimaluriZgvarebi(sectionIndex: number): void {
    const ArchevitiSavaldebuloSagnebi = this.archevitisavaldebulosagani.at(sectionIndex).get('ArchevitiSavaldebuloSagnebi') as FormArray;
    ArchevitiSavaldebuloSagnebi.push(this.createArchevitiSavaldebuloSagani());
  }
  removeArchevitiMinimaluriZgvarebi(sectionIndex: number, MinimaluriZgvariIndex: number): void {
    const ArchevitiSavaldebuloSagnebi = this.archevitisavaldebulosagani.at(sectionIndex).get('ArchevitiSavaldebuloSagnebi') as FormArray;
    ArchevitiSavaldebuloSagnebi.removeAt(MinimaluriZgvariIndex);
  }
  addArchevitiPrioritetebi(sectionIndex: number): void {
    const ArchevitiSavaldebuloSagnebi = this.archevitisavaldebulosagani.at(sectionIndex).get('ArchevitiSavaldebuloSagnebi') as FormArray;
    ArchevitiSavaldebuloSagnebi.push(this.createArchevitiSavaldebuloSagani());
  }
  removeArchevitiPrioritetebi(sectionIndex: number, PrioritetiIndex: number): void {
    const ArchevitiSavaldebuloSagnebi = this.archevitisavaldebulosagani.at(sectionIndex).get('ArchevitiSavaldebuloSagnebi') as FormArray;
    ArchevitiSavaldebuloSagnebi.removeAt(PrioritetiIndex);
  }


      createEvent(): FormGroup {
    return this.fb.group({
      url: ['', Validators.required],
      Title: ['', Validators.required],
      text: ['', Validators.required],

    });
  }

  get Events(): FormArray {
    return this.Form.get('Events') as FormArray;
  }


  addEvents(): void {
    this.Events.push(this.createEvent());
  }


  removeEvent(index: number): void {
    this.Events.removeAt(index);
  }


  Submit() : void {
    this.createform.AddHomeUniCard(this.Form.value as any)
  }
}
