import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";

import { PrestatairesComponent } from './__component/prestataires/prestataires.component';
import { HttpService } from '@services/http/http.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [PrestatairesComponent],
  templateUrl: './settings.component.html',
  host: {
    class: 'w-full h-full',
  },
})
export class SettingsComponent {

  constructor(private titleService: Title, private http: HttpService) {
    this.titleService.setTitle("Paramètres");
  }

  ngOnInit(): void {
  }


  public connectionTypes: any[] = [
    { code: 'neuf', name: 'Neuf' },
    { code: 'modif_branchement', name: 'Modification Branchement' },
    { code: 'liaison_privative', name: 'Liaison Privative' },
  ];

  public typologies: any[] = [
    { code: 'typo_pro_colloc', name: 'Pro/Colloc' },
    { code: 'typo_part', name: 'Particulier' },
  ];

}
