  import { Component } from '@angular/core';
  import { finalize, Subject, takeUntil, takeWhile, tap, timer } from 'rxjs';
  import { AuthService } from '../../_services/auth.service';
  import { Router } from '@angular/router';
  import { I18nPluralPipe } from '@angular/common';

  @Component({
    selector: 'app-sign-out',
    imports: [I18nPluralPipe],
    templateUrl: './sign-out.component.html',
    styleUrl: './sign-out.component.css'
  })
  export class SignOutComponent {
  countdown: number = 5;

    countdownMapping: any = {
      '=1': '# second',
      'other': '# seconds'
    };

    private _unsubscribeAll: Subject<void> = new Subject<void>();
    constructor(
      private authService: AuthService,
      private router: Router
    ){}
    ngOnInit(): void {

      // 🔥 Clear auth data
      this.authService.logout();

      // ⏳ Countdown + redirect
      timer(1000, 1000)
        .pipe(
          takeWhile(() => this.countdown > 0),
          tap(() => this.countdown--),
          finalize(() => {
            if(this.countdown == 0){
               this.router.navigate(['/login']);
            }
           
          }),
          takeUntil(this._unsubscribeAll)
        )
        .subscribe();
    }

    ngOnDestroy(): void {
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
    }
  }
