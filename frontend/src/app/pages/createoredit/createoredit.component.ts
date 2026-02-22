import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from '../../shared/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-createoredit',
  imports: [ReactiveFormsModule,MatStepperModule,MatFormFieldModule,MatInputModule,HeaderComponent,
    MatButtonModule,MatIconModule,RouterModule,MatSnackBarModule
  ],
  templateUrl: './createoredit.component.html',
  styleUrl: './createoredit.component.css'
})
export class CreateoreditComponent {

  userRegiForm!:FormGroup
  userId!:string

  editMode:boolean=false;
  constructor(
    private fb:FormBuilder,
    private router:Router,
    private userservice:UserService,
    private route:ActivatedRoute,
    private _snackBar:MatSnackBar
  ){}

  ngOnInit(){
    this.userRegiForm=this.fb.group({
      step1:this.fb.group({
        name:['',Validators.required],
        email:['',[Validators.required,Validators.email]],
        altemail:['',Validators.email],
        phone:['',[Validators.required,Validators.pattern(/^[0-9]{10}$/)]],
        altphone:['',Validators.pattern(/^[0-9]{10}$/)]
      },
    {
      validators:[this.emailnotSameValidator, this.phonenotSameValidator]
    }),
      step2:this.fb.group({
         address:['',Validators.required],
         state:['',Validators.required],
         city:['',Validators.required],
         pincode:['',Validators.pattern(/^[0-9]{6}$/)]
      }),
      step3:this.fb.group({
        bankname:['',Validators.required],
        accountHolder:['',Validators.required],
        ifscCode:['',[Validators.required,Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)]],
        bankAccountNumber:['',[Validators.required, Validators.pattern(/^[0-9]{9,18}$/)]],
        password:['']
      })
    })
    this.userRegiForm.get('step3.ifscCode')?.valueChanges
  .subscribe(val => console.log('IFSC FormControl value:', val));

    const id=this.route.snapshot.paramMap.get('id')
    if(id){
      this.editMode=true
      this.userId=id
      this.userRegiForm.get('step3.password')?.clearValidators()
      this.userRegiForm.get('step3.password')?.updateValueAndValidity()
      this.userservice.getusersbyid(id).subscribe((res)=>{
        console.log('API response:',res)
        const user=res.data
        this.userRegiForm.patchValue({
          step1:user,
          step2:user,
          step3:user
        })
      })
    }else{
      this.editMode=false;
      this.userRegiForm.get('step3.password')?.setValidators([Validators.required,Validators.minLength(8)])
      this.userRegiForm.get('step3.password')?.updateValueAndValidity()
    }
  }
  saveuser(){
    if(this.userRegiForm.invalid){
      return
    }
    if(confirm('Are you sure you want to continue')){
      const step1=this.userRegiForm.value.step1
      const step2=this.userRegiForm.value.step2
      const step3=this.userRegiForm.value.step3
      var distobj=Object.assign({},step1,step2,step3)
      distobj.username=step1.phone
      if(!this.editMode){
        this.userservice.createuser(distobj).subscribe({
          next:()=>{
            console.log(distobj)
            this.onSuccess('User created Successfully')
            setTimeout(()=>{
              this.router.navigate(['/dashboard'])
            },1500)
            
          },
          error:(err)=>{
            console.log(err)
          }
        })
      }else{
        this.userservice.updateuser(this.userId,distobj).subscribe({
          next:()=>{
            this.onSuccess('User updated successfully');

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
          },error:(err)=>{
            console.error(err)
          }
        })
      }
    }
  }
  emailnotSameValidator(control:AbstractControl):ValidationErrors | null{
     const emailCtrl = control.get('email');
  const altEmailCtrl = control.get('altemail');

  if (!emailCtrl || !altEmailCtrl) return null;

  if (emailCtrl.value && altEmailCtrl.value && emailCtrl.value === altEmailCtrl.value) {
    altEmailCtrl.setErrors({ emailSame: true });
    return { emailSame: true };
  }

    return null
  }
  phonenotSameValidator(control:AbstractControl):ValidationErrors | null{
     const phonectrl = control.get('phone');
  const altphonectrl = control.get('altphone');

  if (!phonectrl || !altphonectrl) return null;

  if (phonectrl.value && altphonectrl.value && phonectrl.value === altphonectrl.value) {
    altphonectrl.setErrors({ phoneSame: true });
    return { phoneSame: true };
  }

    return null
  }
  allowOnlyNumbers(event: KeyboardEvent) {
  const charCode = event.which ? event.which : event.keyCode;

  // Allow only numbers (0–9)
  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
  }
}
convertIFSCToUppercase(event: Event) {
  const input = event.target as HTMLInputElement;
  const upperValue = input.value.toUpperCase();
  this.userRegiForm
    .get('step3.ifscCode')
    ?.setValue(upperValue, { emitEvent: false });
}
allowOnlyNumbersWithMax(event: KeyboardEvent, maxLength: number) {
  const input = event.target as HTMLInputElement;
  const charCode = event.which ? event.which : event.keyCode;

  // Allow control keys
  if (
    event.key === 'Backspace' ||
    event.key === 'Tab' ||
    event.key.startsWith('Arrow')
  ) {
    return;
  }

  // Stop typing if max length reached
  if (input.value.length >= maxLength) {
    event.preventDefault();
    return;
  }

  // Allow only digits
  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
  }
}

allowIFSCInput(event: KeyboardEvent) {
  const char = event.key;

  // Allow control keys (Backspace, Tab, Arrow keys)
  if (
    event.key === 'Backspace' ||
    event.key === 'Tab' ||
    event.key.startsWith('Arrow')
  ) {
    return;
  }

  // Allow only letters (A–Z) and digits (0–9)
  if (!/^[a-zA-Z0-9]$/.test(char)) {
    event.preventDefault();
  }
}
onSuccess(message: string) {
  this._snackBar.open(message, 'OK', {
    duration: 1500,
    verticalPosition: 'top',
    horizontalPosition: 'center'
  });
}

}
