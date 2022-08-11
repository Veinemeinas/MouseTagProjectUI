import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { navbarData } from './nav-data';
import { AccountLoginService } from './../../login-ui/login/services/account-login.service';
import { JwtHelperService } from '@auth0/angular-jwt';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-navbar-side',
  templateUrl: './navbar-side.component.html',
  styleUrls: ['./navbar-side.component.css'],
})
export class NavbarSideComponent implements OnInit {
  constructor(private router: Router, private jwtHelper: JwtHelperService) {}

  email = this.getUserProfile();

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getUserProfile() {
    var token = JSON.stringify(localStorage.getItem('token'));
    console.log(this.jwtHelper.decodeToken(token));
    const tokendec = this.jwtHelper.decodeToken(token);
    const email = tokendec['Email'];
    var res = email.split('@');
    return res[0];
  }
}
