import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { FullLayoutComponent } from './full-layout/full-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { OuterLayoutComponent } from './outer-layout/outer-layout.component';

export * from './main-layout/main-layout.component';
export * from './outer-layout/outer-layout.component';
export * from './full-layout/full-layout.component';
export * from './customer-layout/customer-layout.component';
export * from './admin-layout/admin-layout.component';


export const layoutComponents = [
    MainLayoutComponent,
    OuterLayoutComponent,
    FullLayoutComponent,
    CustomerLayoutComponent,
    AdminLayoutComponent
] 