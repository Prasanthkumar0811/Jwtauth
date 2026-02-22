import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginForm!:FormGroup
backendError:string=''
constructor(private fb:FormBuilder,private authservice:AuthService,private router:Router){
  this.loginForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(8)]]
  })
}

login(){
  if(this.loginForm.invalid){
    return
  }
  this.backendError=''
  this.authservice.login(this.loginForm.value).subscribe({
    next:(res)=>{
      localStorage.setItem('token',res.data.token)
      localStorage.setItem('Fullname',res.data.name)
      this.router.navigate(['/dashboard'])
    },error:(err)=>{
      this.backendError=err.error.message || 'Login Failed'
    }
  })
}
  
}
