import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DirectivesModule } from '@shared/directives';
import { PipesModule } from '@shared/pipes';
import { CustomFormsModule, DialogsModule, UiComponentsModule, UiModule } from '@shared/ui';
import { CookieConsentComponent, LanguageComponent, MainFooterComponent } from './components/footers';
import {
  MainHeaderComponent,
  NotificationsComponent,
  PlainHeaderComponent,
  QuickActionsComponent,
  ThemesComponent,
  UpdateProfileDialogComponent,
  UserProfileComponent,
} from './components/headers';
import { layoutComponents } from './components/layouts';
import { MainNavigationComponent } from './components/navigations';

import { ComponentsModule } from '@shared/components';
import { NavigationService } from './services/navigation.service';

import { DealSharedModule } from '@features/deals/deal-shared';
import { CustomerFooterComponent } from './components/footers/customer-footer/customer-footer.component';
import { CustomerHeaderComponent } from './components/headers/customer-header/customer-header.component';

import { ClipboardModule } from '@angular/cdk/clipboard';
import { commonComponents } from './components/common';
import { pages } from './pages';
import { AdminHeaderComponent } from './components/headers/admin-header/admin-header.component';
import { AdminNavigationComponent } from './components/navigations/admin-navigation/admin-navigation.component';
import { AdminUserProfileComponent } from './components/headers/admin-user-profile/admin-user-profile.component';

@NgModule({
  declarations: [
    MainHeaderComponent,
    MainFooterComponent,
    MainNavigationComponent,
    QuickActionsComponent,
    UserProfileComponent,
    NotificationsComponent,
    ThemesComponent,
    LanguageComponent,
    CookieConsentComponent,
    PlainHeaderComponent,
    UpdateProfileDialogComponent,
    CustomerHeaderComponent,
    CustomerFooterComponent,

    ...layoutComponents,
    ...commonComponents,
    ...pages,
    AdminHeaderComponent,
    AdminNavigationComponent,
    AdminUserProfileComponent,
  ],
  imports: [
    CommonModule,

    UiModule,

    PipesModule,
    DialogsModule,
    CustomFormsModule,
    UiComponentsModule,
    DirectivesModule,
    ComponentsModule,
    DealSharedModule,
    ClipboardModule,
  ],
  exports:[...layoutComponents],
  providers: [NavigationService],
})
export class LayoutModule {}
