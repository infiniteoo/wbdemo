import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CharacterDetails } from '../character-list/character-list.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-confirmation-box',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-box.component.html',
  styleUrl: './confirmation-box.component.css',
})
export class ConfirmationBoxComponent {
  @Output() displayConfirmation = new EventEmitter<boolean>();
  @Input() selectedCharacterDetails?: CharacterDetails;
  @Output() characterDeleted = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log(this.selectedCharacterDetails);
  }

  onConfirm(): void {
    console.log('deleting ' + this.selectedCharacterDetails?.name);

    this.http
      .delete(
        'http://localhost:5000/deletechar/' +
          this.selectedCharacterDetails?.name
      )
      .subscribe((response) => {
        console.log('Server response:', response);
        this.displayConfirmation.emit(false);
        this.characterDeleted.emit();
      });
  }
  onCancel(): void {
    this.displayConfirmation.emit(false);
  }
}
