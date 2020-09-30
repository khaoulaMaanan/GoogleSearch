import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from '../../services/reset-password.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: 'resetPassword.component.html'
})
export class ResetPasswordComponent {
  data = {
    password1 : '',
    password2 : '',
  }

  constructor(private route: ActivatedRoute,private router: Router,private resetpasswordservice: ResetPasswordService,private toastr: ToastrService) { }
  resetPassword(){
    this.route.queryParams.subscribe(params => {
      //console.log(params['email_user']);
      console.log(params['token']);
      this.resetpasswordservice.resetPassword(this.data,params['email_user'],params['token']).subscribe(
        response => {
        console.log(response);
        this.showInfo(response.message);
      },
      error => {
        console.log(error);
        this.showError(error.error.message);
      });
    });
    
  }
  showError(msg) {
    this.toastr.error(msg);
  }
  showInfo(msg) {
    this.toastr.info(msg);
  }
}
