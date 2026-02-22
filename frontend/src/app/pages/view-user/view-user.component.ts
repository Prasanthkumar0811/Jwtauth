import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-view-user',
  imports: [MatIconModule],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent {
user: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {

    // 1️⃣ Try router state first
    // const nav = this.router.getCurrentNavigation();
    // this.user = nav?.extras?.state?.['user'];

    if(history.state?.user){
      this.user=history.state?.user
    }
    // 2️⃣ Fallback to API (refresh / direct open)
    if (!this.user) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.userService.getusersbyid(id).subscribe(res => {
          this.user = res.data;
        });
      }
    }
  }

  closeDrawer() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
