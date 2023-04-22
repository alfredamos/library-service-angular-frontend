import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorDto } from 'src/models/authors/author.model';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.css']
})
export class AuthorFormComponent {
  @Input() authorForm: FormGroup;
  @Input() formName = "";
  @Output() onAuthorSubmit = new EventEmitter<AuthorDto>();
  @Output() onBackToList = new EventEmitter<void>();


  constructor(fb: FormBuilder){
    this.authorForm = fb.group({
      name: ['', Validators.required]
    })
  }

  authorSubmit(){
    this.onAuthorSubmit.emit(this.authorForm.value);
  }

  backToList(){
    this.onBackToList.emit();
  }
}
