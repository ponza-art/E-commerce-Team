import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserManagementService } from '../../../shared/services/userServices/user-management.service';
import { dbUserData, passwordUpdation, updatedUser } from '../../../core/models/user-details';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserValidationService } from '../../../shared/services/validations/user-validation.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent implements OnInit {
  userData!: dbUserData;
  updatedUser!: updatedUser
  profileForm!: FormGroup;
  updatePasswordForm!: FormGroup
  data!: dbUserData;
  userprofileImage!: string | null;
  isUpdating: boolean = false;
  showPasswordInputs: boolean = false
  newPasswordData!: passwordUpdation

  @ViewChild('userImage') userImage!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private _userManagement: UserManagementService,
    private _fb: FormBuilder,
    private _router: Router,
    private _userValidation: UserValidationService,
  ) {}



  patchFormValues(user: dbUserData) {
    this.profileForm.patchValue({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      pincode: user.pincode,
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.userprofileImage = e.target.result;
      
      this._userManagement.updateUserImage(this.userprofileImage).subscribe(
        (res) => {
          console.log(res);
          
        },
        (err) => {
          console.error(err);
        }
      );
    };
    reader.readAsDataURL(file);
  }
  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  
  onSubmit() {
    if (this.isUpdating) {
      if (this.profileForm.valid) {
        console.log(this.profileForm.value);
        
        this.updatedUser = this.profileForm.value
        this._userManagement.updateUserDetails(this.updatedUser).subscribe(
          (res) => {
            console.log(res);
            Swal.fire({
              title: 'Saved',
              icon: 'success',
              showConfirmButton: false,
              timer: 2000,
              width: '300px',
              padding: '1em',
            });
          },(err) => {
            console.log(err);
          }
        )
        this.isUpdating = false
        
      } else {
        alert('Enter all details save');
      }
    } else {
      this.isUpdating = !this.isUpdating;
    }
  }

  
  changePassword(){
    
    this.showPasswordInputs = true
  }
  closePasswordForm(){
    this.showPasswordInputs = false
    this.updatePasswordForm.reset();
  }
  onPasswordSubmit(){
    if (this.updatePasswordForm.valid) {
      console.log(this.updatePasswordForm.value);
      this.newPasswordData = {
        userInput: this.updatePasswordForm.value.currentPassword,
        newPassword: this.updatePasswordForm.value.newPassword
      };
      
      this._userManagement.updateUserPassword(this.newPasswordData).subscribe(
        (res) => {
         this.closePasswordForm();
         Swal.fire({
          title: 'Password Updated',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          width: '300px',
          padding: '1em',
        });
        },
        (err) => {
          console.log(err);
          alert("An error occured")
        }
      )
    }
  }

  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.root.get('newPassword');
    return password && control.value !== password.value
      ? { misMatch: true }
      : null;
  }

  logout(){
    this._userManagement.logoutUser();
    this._router.navigate(['']);
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.profileForm = this._fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(13),
        ],
      ],
      address: ['', [Validators.required]],
      pincode: [
        '',
        [Validators.required, Validators.minLength(7), Validators.maxLength(7)],
      ],
    });

    this.updatePasswordForm =this._fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword : ['' , [this._userValidation.passwordValidator]],
      confirmPassword: ['', [this.confirmPasswordValidator]]
    })

    this._userManagement.getUserDetails().subscribe(
      (res) => {
        this.userData = res;
        console.log("user data:", this.userData);
        
        this.userprofileImage = this.userData.profileImage;
        this.patchFormValues(this.userData);

        console.log('Response data strored:', this.userData);
      },
      (err) => {
        console.error('Error:', err);
      }
    );
  }
}


