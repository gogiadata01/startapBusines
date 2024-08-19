import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ProgramCardService } from '../../program-card.service';
import { ProgramCardDto, FieldDto, ProgramNamesDto, CheckBoxesDto } from '../../core/models/common.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-with-api-program-card',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    ReactiveFormsModule],
  templateUrl: './add-with-api-program-card.component.html',
  styleUrl: './add-with-api-program-card.component.scss'
})
export class AddWithApiProgramCardComponent {
  ProgramCard: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ProgramCardService: ProgramCardService
  ) {
    this.ProgramCard = this.fb.group({
      Fields: this.fb.array([]) // This will hold the dynamic form arrays for fields
    });
  }
  get Fields(): FormArray {
    return this.ProgramCard.get('Fields') as FormArray;
  }
  
  getProgramNames(fieldIndex: number): FormArray {
    return this.Fields.at(fieldIndex).get('ProgramNames') as FormArray;
  }
  
  getCheckBoxes(fieldIndex: number, programNameIndex: number): FormArray {
    return this.getProgramNames(fieldIndex).at(programNameIndex).get('CheckBoxes') as FormArray;
  }
  
  

  createField(): FormGroup {
    return this.fb.group({
      FieldName: ['', Validators.required],
      ProgramNames: this.fb.array([this.createProgramName()])
    });
  }
  
  createProgramName(): FormGroup {
    return this.fb.group({
      programname: ['', Validators.required],
      CheckBoxes: this.fb.array([this.createCheckBox()])
    });
  }
  
  createCheckBox(): FormGroup {
    return this.fb.group({
      ChackBoxName: ['', Validators.required]
    });
  }
  addField() {
    this.Fields.push(this.createField());
  }

  addProgramName(fieldIndex: number) {
    const programNames = this.Fields.at(fieldIndex).get('ProgramNames') as FormArray;
    programNames.push(this.createProgramName());
  }
  addCheckBox(fieldIndex: number, programNameIndex: number) {
    const programNames = (this.ProgramCard.get('Fields') as FormArray)
      .at(fieldIndex).get('ProgramNames') as FormArray;
  
    const checkBoxes = programNames.at(programNameIndex).get('CheckBoxes') as FormArray;
    checkBoxes.push(this.createCheckBox());
  }

  removeField(index: number) {
    this.Fields.removeAt(index);
  }

  removeProgramName(fieldIndex: number, programNameIndex: number) {
    const programNames = this.Fields.at(fieldIndex).get('ProgramNames') as FormArray;
    programNames.removeAt(programNameIndex);
  }

  removeCheckBox(fieldIndex: number, programNameIndex: number, checkBoxIndex: number) {
    const checkBoxes = (this.Fields.at(fieldIndex).get('ProgramNames') as FormArray)
      .at(programNameIndex).get('CheckBoxes') as FormArray;
    checkBoxes.removeAt(checkBoxIndex);
  }

  onSubmit() {
    if (this.ProgramCard.valid) {
      const programCardDto: ProgramCardDto = this.ProgramCard.value;
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
