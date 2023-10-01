import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  public menu: any[];

  constructor(
    private sidebarService: SidebarService,
    private autService: AuthService
  ) {
    this.menu = sidebarService.menu;
  }

  logout() {
    this.autService.logOut();
  }
}
