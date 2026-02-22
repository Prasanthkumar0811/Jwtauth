import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-reset',
  imports: [ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatButtonModule,RouterModule],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css'
})
export class ResetComponent {
resetForm!:FormGroup
token!:string
backendMessage:string=''
constructor(
  private fb:FormBuilder,
  private authservice:AuthService,
  private router:Router,
  private route:ActivatedRoute
){}
ngOnInit(){
  this.token=this.route.snapshot.params['token']
  this.resetForm=this.fb.group({
    newPassword:['',[Validators.required,Validators.minLength(8)]],
    confirmPassword:['',[Validators.required]]
  },{
    validators:this.passwordMatchValidator
  }
)
}
passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (newPassword !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }
submit(){
  if(this.resetForm.invalid){
    return
  }
  const {newPassword}=this.resetForm.value
  this.authservice.resetpass(this.token,newPassword).subscribe({
    next:(res)=>{
      this.backendMessage = res.message;
          // Redirect to login after 2 seconds
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          this.backendMessage = err.error.message || 'Something went wrong';
        }
    
  })

}
}
