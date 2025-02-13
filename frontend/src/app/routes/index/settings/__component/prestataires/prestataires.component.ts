import { Component, Input } from '@angular/core';

import { HlmCardImports } from '@spartan-ng/ui-card-helm';
import { BrnDialogImports } from '@spartan-ng/brain/dialog';
import { HlmDialogImports } from '@spartan-ng/ui-dialog-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

import { CreatePrestaComponent } from './create-presta/create-presta.component';


@Component({
  selector: 'prestataires',
  standalone: true,
  imports: [HlmCardImports, BrnDialogImports, HlmDialogImports, HlmButtonDirective, CreatePrestaComponent],
  templateUrl: './prestataires.component.html',
})
export class PrestatairesComponent {
  @Input() sites: any[] = [];
  @Input() typologies: any[] = [];

  //TODO: Refactor everything
  // When "create a prestataire", the user should select a site, then a zone, and then a typologie
  // It display all the prestataires for the selected site, zone and typologie, and the percentage of the site that the prestataire is responsible for
  // The user can edit the percentage, and add a new prestataire

  constructor() { }
}
