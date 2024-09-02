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
  styleUrl: './profile-page.component.scss',
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

  // to save and show the profile image
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.userprofileImage = e.target.result;
      // send http post reqest to save the image string to db
      this._userManagement.updateUserImage(this.userprofileImage).subscribe(
        (res) => {
          console.log(res);
          // pay load too large error is getting  -------------------------------------fix it now
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

  // when user clicked on submit button to save updates
  onSubmit() {
    if (this.isUpdating) {
      if (this.profileForm.valid) {
        console.log(this.profileForm.value);
        // http post to save the updated data to db
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
        //bring the change into the profile card data also     reload if needed
      } else {
        alert('Enter all details save');
      }
    } else {
      this.isUpdating = !this.isUpdating;
    }
  }

  // to show chage password form
  changePassword(){
    // display input fealds to enter current password and new password
    this.showPasswordInputs = true
  }
  // to close the changePassword form 
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

  // confirm password validation 
  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.root.get('newPassword');
    return password && control.value !== password.value
      ? { misMatch: true }
      : null;
  }

  // logout button clicked 
  logout(){
    this._userManagement.logoutUser();
    this._router.navigate(['']);
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    // inint the reactive form with empty values for user data updation
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

    // init form to update user password  
    this.updatePasswordForm =this._fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword : ['' , [this._userValidation.passwordValidator]],
      confirmPassword: ['', [this.confirmPasswordValidator]]
    })

    // get user data from backend and store in the userData variable
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


