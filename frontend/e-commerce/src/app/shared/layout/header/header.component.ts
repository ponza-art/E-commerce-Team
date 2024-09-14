import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserManagementService } from '../../services/userServices/user-management.service';
import { AppConfig } from '../../../../config/app-config';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { faBagShopping, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartService } from '../../services/cartServices/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass, FontAwesomeModule, NgIf,CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public userImage!: string;
  public cartItemCount: number = 0;

  constructor(
    public _usermanagement: UserManagementService,
    private cartService: CartService,
    private router: Router
  ) {}

  navBarFixed: boolean = false;
  cart = faBagShopping;
  heart = faHeart;
  profile = faUser;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.navBarFixed = window.scrollY > 90;
  }

  ngOnInit(): void {
    this._usermanagement.checkUserLoginStatus();

    this._usermanagement.currentUserImage.subscribe((image) => {
      this.userImage = image ? image : AppConfig.defaultUserUrl;
      return this.userImage
    });

    this.cartService.getCartItemCount().subscribe((count) => {
      this.cartItemCount = count;
    });
  }
}
