import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { navbarData } from './nav-data';
import { AccountLoginService } from './../../login-ui/login/services/account-login.service';

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
  constructor(private router: Router, private service: AccountLoginService) {}

  ngOnInit(): void {}

  email = this.service.getUserProfile();

  collapsed = false;
  screenWidth = 0;
  navData = navbarData;

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

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
}
