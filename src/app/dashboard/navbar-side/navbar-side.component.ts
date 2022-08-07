import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { navbarData } from './nav-data';

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
  constructor() {}

  ngOnInit(): void {}
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
}
