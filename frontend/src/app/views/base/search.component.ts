import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: 'search.component.html'
})
export class SearchComponent  implements OnInit {
  data = {
    site : '',
    profil : '',
    operateur:'',
    infos :'',
    pays:''
  }
  //searchQuery=this.data.site+'['+this.data.profil+' '+this.data.operateur+' '+this.data.infos+']';
  
  
  constructor(private searchService: SearchService,private route: ActivatedRoute,private router: Router,private tokenStorageService: TokenStorageService) { }
  currentUser: any;
  ngOnInit() {
    this.currentUser = this.tokenStorageService.getUser();
  }
  
  search(){
    var searchQuery='site:'+this.data.site+' ['+this.data.profil+' '+this.data.operateur+' '+this.data.infos+'] '+this.data.pays;
    console.log(searchQuery);
    this.searchService.search(searchQuery).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }
  logout() {
    this.tokenStorageService.signOut();
    
    this.router.navigate(['/login']);
  }
  
  

  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }

}


