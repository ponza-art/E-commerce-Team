import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ViewProductComponent } from '../view-product/view-product.component';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpService } from '../services/http.service';
import {
  faEye,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    FontAwesomeModule,
    NgxPaginationModule,
    NgIf,
    NgFor,
    FormsModule,
    ViewProductComponent,
    RouterLink,
  ],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
})
export class UserTableComponent {
  usersArray: any[] = [];
  filteredUsersArray: any[] = [];
  edit = faPenToSquare;
  view = faEye;
  delete = faTrash;
  p: number = 1;
  itemsPerPage: number = 10;
  searchTerm: string = '';

  constructor(private httpList: HttpService, private router: Router) {}

  ngOnInit() {
    this.httpList.getUserList().subscribe((res: any) => {
      this.usersArray = res;
      console.log(res);
      

      this.filteredUsersArray = this.usersArray;

    });
  }
  test(){
    console.log(this.usersArray);
    
  }
  trackByUserId(index: number, user: any): number {
    return user.id;
  }

  editUser(id: number) {
    this.router.navigate(['/edit-user', id]);
  }

  viewUser(id: number) {
    this.router.navigate(['/view-user', id]);
  }

  deleteUser(user: any) {
    this.usersArray = this.usersArray.filter((u) => u.id !== user.id);
    this.onSearch();
  }

  onSearch() {
    this.filteredUsersArray = this.usersArray.filter((user: any) =>
      user.login.username.toLowerCase().includes(this.searchTerm.toLowerCase())
    
    );
    this.test()

  }

  onItemsPerPageChange(event: any) {
    this.itemsPerPage = event.target.value;
  }

  addUser() {
    const newUser = {
      id: this.usersArray.length + 1,
      name: 'New User',
      email: 'newuser@example.com',
      phone: '1234567890',
    };
    this.usersArray.push(newUser);
    this.onSearch();
  }

  exportToCSV() {
    const csvData = this.filteredUsersArray.map((user: any) => ({
      ID: user.id,
      Name: user.firstname + ' ' + user.lastname,
      Email: user.email,
      Phone: user.phone,
    }));

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      Object.keys(csvData[0]).join(',') +
      '\n' +
      csvData.map((row) => Object.values(row).join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'users.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
