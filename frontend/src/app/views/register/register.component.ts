import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit{
  user ={
    nom_user :'',
    prenom_user :'',
    organisation:'',
    email_user:'',
    password_user:''
  }
  constructor(private authenticationService: AuthenticationService,private toastr: ToastrService ) {}
  ngOnInit() {
  }
  register(){
    this.authenticationService.register(this.user).subscribe(
      response => {
        console.log(response);
        this.showInfo("Inscription réussie ! Connectez-vous à votre compte !");
      },
      error => {
        console.log(error);
        this.showError(error.error.message);
        
      });
  }
  showError(msg) {
    this.toastr.error(msg);
  }
  showInfo(msg) {
    this.toastr.info(msg);
  }
}
