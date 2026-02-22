import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../_services/auth.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { I18nPluralPipe, CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { UserService } from '../../_services/user.service';
import { HeaderComponent } from "../../shared/header/header.component";
import { ViewDialogComponent } from '../view-dialog/view-dialog.component';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { QrDialogComponent } from '../qr-dialog/qr-dialog.component';
import { ExcelExport } from '../../_services/excel-export.utility';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

interface User{
  _id: string;
  name: string;
  email: string;
  phone: string;
  altphone?: string;
  altemail?: string;
  role: string;
  address: string;
  state: string;
  city: string;
  pincode: string;
  bankname:string;
  accountHolder:string;
  ifscCode:string;
  username?:string;
  createdAt?:string;
  bankAccountNumber:string;
}
@Component({
  selector: 'app-dashboard',
  imports: [MatInputModule, MatButtonModule, CommonModule,
    MatFormFieldModule, MatProgressSpinnerModule, RouterModule,
    MatSortModule, MatPaginatorModule, MatSnackBarModule, MatDividerModule,
    MatMenuModule, MatIconModule, MatTableModule, HeaderComponent,MatDrawerContainer,MatDrawer
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
users:User[]=[]
displayedColumns:string[]=['name','email','phone','bankname','accountholder','state','city','qr-code','actions']
loading:boolean=false;
employeescount:number=0
dataSource=new MatTableDataSource<User>([]);
loggedInUserName: string | null = null;

@ViewChild(MatPaginator) paginator!:MatPaginator;
@ViewChild(MatSort) sort!:MatSort
private searchSubject=new Subject<string>()

@ViewChild('matDrawer',{static:true}) matDrawer!:MatDrawer
constructor(
  private userservice:UserService,
  private router:Router,
  // private _dialogref:MatDialog,
  private authservice:AuthService,
  private _snackBar:MatSnackBar,
  private cdr:ChangeDetectorRef,
  private _dialogRef:MatDialog,
  private route:ActivatedRoute
){}
ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  
}
ngOnInit(){
  this.loggedInUserName=this.authservice.getName();
this.fetchUsers()

this.searchSubject.pipe(
  debounceTime(300),
  distinctUntilChanged()
).subscribe(value=>{
  this.applyFilter(value)
})

  this.router.events.subscribe(() => {
    if (this.route.firstChild) {
      this.matDrawer.open();
    } else {
      this.matDrawer.close();
    }
  });
}

fetchUsers(){
  this.loading=true
     this.userservice.getallusers().subscribe({
    next:(res)=>{
      console.log(res)
      this.users=res.data
      this.dataSource=new MatTableDataSource(this.users)
      this.employeescount=this.users.length
      this.dataSource.paginator=this.paginator
  this.dataSource.sort=this.sort
      this.loading=false
      this.cdr.detectChanges()
    },
    error:(err)=>{
      console.log(err);
      this.loading=false;
    }
  })
 
  
}
onSearchChange(value:string){
  this.searchSubject.next(value)
}
applyFilter(value:string) {
  // const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = value.trim().toLowerCase();
}
onDisplayMsg(msg: string, type: 'success' | 'error' = 'success') {
  this._snackBar.open(msg, 'OK', {
    duration: 4000,
    verticalPosition: 'top',
    horizontalPosition: 'center',
    panelClass: type === 'success' ? ['snack-success'] : ['snack-error']
  });
}

generateQr(user:User,event:Event){
  event.stopPropagation()
  const qrValue = `${window.location.origin}/qr-user/${user._id}`;
   this._dialogRef.open(QrDialogComponent,{
    width:'320px',
    disableClose:true,
    data:{
      qrValue,
      name:user.name
    }
   })
}
createuser(){
  this.router.navigate(['/add-user'])
}
edituser(id:string){
  this.router.navigate(['/edit-user',id])
}
// openviewdialog(emp:any){
//   this._dialogRef.open(ViewDialogComponent,{
//     width:'500px',
//     data:emp
//   })
// }
logout(){
  // this.authservice.logout()
  this.router.navigateByUrl('/sign-out',{replaceUrl:true})
}

exportDataToExcel(): void {

  if (!this.users || this.users.length === 0) {
    this._snackBar.open('No data to export', 'Close', { duration: 2000 });
    return;
  }

  const exportData = this.users.map(user => ({
    Name: user.name ?? '',
    Email: user.email ?? '',
    Phone: user.phone ?? '',
    AlternatePhone: user.altphone ?? '',
    Address: user.address ?? '',
    City: user.city ?? '',
    State: user.state ?? '',
    Pincode: user.pincode ?? '',
    BankName: user.bankname ?? '',
    AccountHolder: user.accountHolder ?? '',
    IFSC: user.ifscCode ?? '',
    Username: user.username ?? '',
    CreatedOn: user.createdAt
      ? new Date(user.createdAt).toLocaleDateString()
      : ''
  }));

  ExcelExport.exportArrayToExcel(exportData, 'Users_List');
}

}
