import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../authorisation/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  loggedIn: boolean = false;
  email: string = '';
  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this.initSub();
    this.loggedIn = this._authService.isAuthenticated();
  }

  private initSub() {
    this.subs.push(
      this._authService.authenticated$.subscribe(res => {
        this.loggedIn = res.authenticated;
      })
    );
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
    this.loggedIn = false;
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
