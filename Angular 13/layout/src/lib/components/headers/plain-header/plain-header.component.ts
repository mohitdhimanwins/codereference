import { Component, Input } from '@angular/core';
import { User, ClientData } from '@entities';

@Component({
  selector: 'plain-header',
  templateUrl: './plain-header.component.html',
  styleUrls: ['./plain-header.component.scss'],
})
export class PlainHeaderComponent {
  @Input() user: User;
  @Input() clientData: ClientData;
}
