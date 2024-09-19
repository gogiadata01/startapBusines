import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { EventCardService } from '../../event-card.service';
import { EventCardDto, FieldDto, ProgramNamesDto, CheckBoxesDto } from '../../core/models/common.model';
import { NgFor, NgIf } from '@angular/common';
import { ToasterHostDirective } from '@coreui/angular';

@Component({
  selector: 'app-add-with-api-event-card',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    ReactiveFormsModule],
  templateUrl: './add-with-api-event-card.component.html',
  styleUrl: './add-with-api-event-card.component.scss'
})
export class AddWithApiEventCardComponent {
  EventCard: FormGroup;

  constructor(
    private fb: FormBuilder,
    private EventCardService: EventCardService
  ){
    this.EventCard = this.fb.group({
      Url: ['', Validators.required],
      Title: ['', Validators.required],
      Text: [''],
      Time: [''],
      isFeatured: [false], // Add isFeatured field (default: false)
      Types: this.fb.array([])
    });
  }

  get Type(): FormArray {
    return this.EventCard.get('Types') as FormArray;
  }

  createType(): FormGroup {
    return this.fb.group({
      Type: ['']
    });
  }

  AddType() {
    this.Type.push(this.createType());
  }

  removeType(index: number): void {
    this.Type.removeAt(index);
  }

  onSubmit() {
    if (this.EventCard.valid) {
      const EventCardDto: EventCardDto = this.EventCard.value;
      this.EventCardService.addEventCard(EventCardDto).subscribe({
        next: (response) => {
          console.log('Event Card added successfully', response);
        },
        error: (err) => {
          console.error('Error adding Event Card', err);
        }
      });
    }
  }
}
