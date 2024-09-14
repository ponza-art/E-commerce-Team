import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductManagementService } from '../../../shared/services/productServices/product-management.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  productForm!: FormGroup;
  base64Image?: string | null;
  isFormSubmitted: boolean = false;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private _productManagement: ProductManagementService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productId: ['', Validators.required],
      productName: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', [Validators.required]],
      images: this.fb.array([], [Validators.required]),  
      specifications: ['', Validators.required],
      color: ['', Validators.required],
      weight: ['', Validators.required],
      material: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  
  get imagesFormArray(): FormArray {
    return this.productForm.get('images') as FormArray;
  }

  
  clearImagesFormArray() {
    while (this.imagesFormArray.length) {
      this.imagesFormArray.removeAt(0);
    }
  }

  
  addImage(image: string): void {
    this.imagesFormArray.push(this.fb.control(image, Validators.required));
  }

  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.addImage(reader.result as string); 

        
        Swal.fire({
          text: 'Image uploaded successfully!',
          icon: 'success',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  
  onSubmit() {
    console.log(this.productForm);
    
    this.isFormSubmitted = true;
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      const productData = this.productForm.value;
      console.log('valid product', productData);
      
      this._productManagement.createProduct(productData).subscribe(
        (res) => {
          Swal.fire({
            text: "Product added successfully",
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });

          this.isFormSubmitted = false;

          
          this.clearImagesFormArray();
          this.productForm.reset();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  
  navigateBack() {
    this.location.back();
  }
}
