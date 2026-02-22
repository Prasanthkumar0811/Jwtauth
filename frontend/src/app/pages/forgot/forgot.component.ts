import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../_services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-forgot',
  imports: [ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatButtonModule,RouterModule],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css'
})
export class ForgotComponent {
forgotform!:FormGroup
backendmessage:string=''
constructor(
  private fb:FormBuilder,
  private authservice:AuthService,
  private router:Router
){}
ngOnInit(){
  this.forgotform=this.fb.group({
    email:['',[Validators.required,Validators.email]]
  })
}
submit(){
  if(this.forgotform.invalid){
    return
  }
  const email=this.forgotform.value.email
  this.authservice.forgot(email).subscribe({
    next:(res:any)=>{
      const token=res.token
      this.backendmessage=res.message
      setTimeout(()=>{
        this.router.navigate(['/resetpass',token])
      },2000)
    },
    error:(err)=>{
      this.backendmessage=err.error.message || 'Something went wrong'
    }
  })
}
}
