import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../models';
import { Subscription } from 'rxjs';
import { Principal } from '../../models';
import { AuthenticationService } from '../../services';

@Component({ selector: 'app-dashboard', templateUrl: './default-layout.component.html' })
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  currentUser: Principal;
  currentUserSubscription: Subscription;

  constructor(private authenticationService: AuthenticationService, @Inject(DOCUMENT) _document?: any) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(principal => {
      this.currentUser = principal;
    });
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  onLogout() {
    this.authenticationService.logout();
  }
}
