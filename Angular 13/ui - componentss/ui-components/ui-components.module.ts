import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DirectivesModule } from '@shared/directives';
import { PipesModule } from '@shared/pipes';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { components } from '.';
import { CustomFormsModule } from '../..';
import { UiModule } from '../ui.module';

@NgModule({
  declarations: [components],
  imports: [CommonModule, ClipboardModule, CustomFormsModule, UiModule, PipesModule, ScrollingModule, InfiniteScrollModule, MatCheckboxModule, DirectivesModule],
  exports: [components],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
})
export class UiComponentsModule {}
