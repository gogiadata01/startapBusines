import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ProgramCardEnService } from '../../program-card-en.service';
import { ProgramCardDto, FieldDto, ProgramNamesDto, CheckBoxesDto,ProgramCardEnDto } from '../../core/models/common.model';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-add-with-api-program-en-card',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './add-with-api-program-en-card.component.html',
  styleUrl: './add-with-api-program-en-card.component.scss'
})
export class AddWithApiProgramEnCardComponent {
  ProgramCard: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ProgramCardService: ProgramCardEnService
  ) {
    this.ProgramCard = this.fb.group({
      Fields_en: this.fb.array([]) // This will hold the dynamic form arrays for fields
    });
  }
  get Fields_en(): FormArray {
    return this.ProgramCard.get('Fields_en') as FormArray;
  }
  
  ProgramNames_en(fieldIndex: number): FormArray {
    return this.Fields_en.at(fieldIndex).get('ProgramNames_en') as FormArray;
  }
  
  CheckBoxes_en(fieldIndex: number, programNameIndex: number): FormArray {
    return this.ProgramNames_en(fieldIndex).at(programNameIndex).get('CheckBoxes_en') as FormArray;
  }
  
  

  createField(): FormGroup {
    return this.fb.group({
      FieldName_en: ['', Validators.required],
      ProgramNames_en: this.fb.array([this.createProgramName()])
    });
  }
  
  createProgramName(): FormGroup {
    return this.fb.group({
      ProgramName_en: ['', Validators.required],
      CheckBoxes_en: this.fb.array([this.createCheckBox()])
    });
  }
  
  createCheckBox(): FormGroup {
    return this.fb.group({
      CheckBoxName_en: ['', Validators.required]
    });
  }
  addField() {
    this.Fields_en.push(this.createField());
  }

  addProgramName(fieldIndex: number) {
    const programNames = this.Fields_en.at(fieldIndex).get('ProgramNames_en') as FormArray;
    programNames.push(this.createProgramName());
  }
  addCheckBox(fieldIndex: number, programNameIndex: number) {
    const programNames = (this.ProgramCard.get('Fields_en') as FormArray)
      .at(fieldIndex).get('ProgramNames_en') as FormArray;
  
    const checkBoxes = programNames.at(programNameIndex).get('CheckBoxes_en') as FormArray;
    checkBoxes.push(this.createCheckBox());
  }

  removeField(index: number) {
    this.Fields_en.removeAt(index);
  }

  removeProgramName(fieldIndex: number, programNameIndex: number) {
    const programNames = this.Fields_en.at(fieldIndex).get('ProgramNames_en') as FormArray;
    programNames.removeAt(programNameIndex);
  }

  removeCheckBox(fieldIndex: number, programNameIndex: number, checkBoxIndex: number) {
    const checkBoxes = (this.Fields_en.at(fieldIndex).get('ProgramNames_en') as FormArray)
      .at(programNameIndex).get('CheckBoxes_en') as FormArray;
    checkBoxes.removeAt(checkBoxIndex);
  }

  onSubmit() {
    if (this.ProgramCard.valid) {
      const programCardDto: ProgramCardEnDto = this.ProgramCard.value;
      this.ProgramCardService.addProgramCard(programCardDto).subscribe({
        next: (response) => {
          console.log('ProgramCard added successfully', response);
        },
        error: (err) => {
          console.error('Error adding ProgramCard', err);
        }
      });
    }
  }
}
