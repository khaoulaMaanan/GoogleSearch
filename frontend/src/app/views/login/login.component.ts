import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service';
import { ResetPasswordService } from '../../services/reset-password.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit { 
  
  
  data = {
    email_user : '',
    password_user : ''
  }
  constructor(private authenticationService: AuthenticationService,private route: ActivatedRoute,private router: Router, private tokenStorage: TokenStorageService,private resetpassword: ResetPasswordService,private toastr: ToastrService) { }
  errorMessage = '';
  ngOnInit() {
    /*if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }*/
  }
  
  login(){
    this.authenticationService.login(this.data).subscribe(
      response => {
        console.log(response);
        this.tokenStorage.saveToken(response.accessToken);
        this.tokenStorage.saveUser(response);
        /*this.isLoginFailed = false;
        this.isLoggedIn = true;*/
        this.router.navigate(['/api/search']);
        console.log("success");
      },
      error => {
        this.showError(error.error.message);
        //this.isLoginFailed = true;
      });
  }
  register(){
    this.router.navigate(['/api/register']);
  }
  forgotPassword(){
    this.resetpassword.forgotPassword(this.data).subscribe(
      response => {
      console.log(response);
      this.showInfo("Le lien de réinitialisation de votre mot de passe est envoyé à votre adresse e-mail");
    },
    error => {
      console.log(error);
    });
  }
  showError(msg) {
    this.toastr.error(msg);
  }
  showInfo(msg) {
    this.toastr.info(msg);
  }
}
