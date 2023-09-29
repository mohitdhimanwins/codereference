import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserDetail } from 'src/app/authentication/models/user-model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Company } from '../../models/company';

@Component({
  selector: 'app-enterprenuer-dashboard',
  templateUrl: './default-dashboard.component.html',
  styleUrls: ['./default-dashboard.component.scss']
})
export class DefaultDashboardComponent implements OnInit {

  userDetail: UserDetail;
  companyList: Array<Company>;
  entityType: string = 'PROFILE';
  profileId: any;
  isLoading: boolean = true;


  constructor(
    private authService: AuthenticationService,
    private cdr: ChangeDetectorRef
  ) {
    this.userDetail = this.authService.getUserDetails();
  }

  ngOnInit() {
    this.profileId = this.userDetail['profileId'];
  }

  ngAfterViewInit() {
    this.isLoading = false;
    this.cdr.detectChanges();
  }

}
