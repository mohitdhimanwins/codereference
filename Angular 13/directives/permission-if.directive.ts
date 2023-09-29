import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AppPermission } from '../enums';
import { PermissionService } from '@store/user';

@Directive({
  selector: '[permissionIf]',
})
export class PermissionIfDirective {
  constructor(private permissionService: PermissionService, private templateRef: TemplateRef<HTMLElement>, private viewContainer: ViewContainerRef) {}

  @Input()
  set permissionIf(permission: AppPermission) {
    this.isGranted(permission);
  }

  private isGranted(permission: AppPermission) {
    if (!permission || this.permissionService.permissionIsGranted(permission)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
