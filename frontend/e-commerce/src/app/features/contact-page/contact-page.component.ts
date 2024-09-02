import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactService } from '../../shared/services/contactService/contact.service';
import { faBriefcase, faBuilding, faBullhorn, faHeadset, faPhone, faTools } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule,FontAwesomeModule],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css',
})
export class ContactPageComponent implements OnInit {
  contactForm!: FormGroup;
  isFormSubmitted: boolean = false;
  test : string = "@martfury.com"
  phone = faPhone;
  building = faBuilding;
  briefcase = faBriefcase;
  headset = faHeadset;
  tools = faTools;
  bullhorn = faBullhorn;

  constructor(
    private _fb: FormBuilder,
    private _contactService: ContactService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.contactForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      this._contactService.submitContactForm(this.contactForm.value).subscribe(
        (res) => {
          alert('Response submitted');
          this.contactForm.reset();
          this.isFormSubmitted = false;
        },
        (err) => {
          console.error(err);
          alert('Server Error');
        }
      );
    }
  }
}
