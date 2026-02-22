import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-qr-user-details',
  imports: [MatProgressSpinnerModule],
  templateUrl: './qr-user-details.component.html',
  styleUrl: './qr-user-details.component.css'
})
export class QrUserDetailsComponent {
user: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.fetchUser(id);
  }

  fetchUser(id: string) {
    this.userService.getusersbyid(id).subscribe({
      next: (res) => {
        this.user = res.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
