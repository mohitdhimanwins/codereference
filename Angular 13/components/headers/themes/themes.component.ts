import { Component, Input } from '@angular/core';
import { Theme } from '@entities';
import { AppFacade } from '@store/app';
import { ThemeOption } from '@entities';

@Component({
  selector: 'themes',
  templateUrl: './themes.component.html',

})
export class ThemesComponent {
  @Input() themes: ThemeOption[];
  activeTheme$ = this.appFacade.theme$;

  constructor(private appFacade: AppFacade) {}


  changeTheme(theme: string) {
    this.appFacade.changeTheme(theme as Theme);
  }

}
