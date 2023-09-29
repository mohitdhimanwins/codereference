import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrgType } from '@entities';
import { NavigationService } from '../../../services';
import { MenuItem } from '../../../models';

@Component({
  selector: 'admin-navigation',
  templateUrl: './admin-navigation.component.html',
  styleUrls: ['./admin-navigation.component.scss'],
})
export class AdminNavigationComponent implements OnInit {
  @Input() orgType: OrgType;
  @Input() expanded: boolean;
  @Input() tooltipText: string;

  @Output() toggle = new EventEmitter();

  menuItems: MenuItem[] = [];
  isToggle = false;

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.menuItems = this.navigationService.buildUserMenuItems(true);
  }

  toggleSidebar() {
    this.isToggle = !this.isToggle;
    this.toggle.emit();
  }
}
