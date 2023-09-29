import { Component, OnDestroy, OnInit } from '@angular/core';
import { Language } from '@entities';
import { AppFacade } from '@store/app';
import { Subscription } from 'rxjs';

@Component({
  selector: 'language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  hideButton = false
  languageOptions = [
    {
      text: 'English',
      value: Language.English,
    },
    {
      text: 'French',
      value: Language.French,
    },
  ];

  activeLanguage: Language;

  constructor(public appFacade: AppFacade) {}

  ngOnInit(): void {
    this.subscription.add(
      this.appFacade.language$.subscribe((res) => {
        this.activeLanguage = res;
      })
    );
  }

  changeLanguage(lang: string) {
    const langauge = lang as Language;
    this.activeLanguage = langauge;
    this.appFacade.changeLanguage(langauge);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
