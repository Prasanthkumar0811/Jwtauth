import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [CommonModule,FormsModule,MatFormFieldModule,MatIconModule,MatMenuModule,MatDividerModule,
    MatInputModule,MatButtonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Input() showsearch:boolean=false;
  @Input() showcreate:boolean=false;
@Input() showexport: boolean = false;   
  @Output() searchange=new EventEmitter<string>()
  @Output() exportClick = new EventEmitter<void>(); // ✅ NEW

  loggedInUserName:string|null=null

  constructor(
    private authservice:AuthService,
    private router:Router
  ){}
  ngOnInit(){
    this.loggedInUserName=this.authservice.getName()
  }
  logout(){
    this.authservice.logout()
    this.router.navigate(['/login'])
  }
  onSearch(event:Event){
    const value=(event.target as HTMLInputElement).value;
    this.searchange.emit(value)
  }
  createuser(){
    this.router.navigate(['/add-user'])
  }
  onExport() {
  this.exportClick.emit();
}

}
