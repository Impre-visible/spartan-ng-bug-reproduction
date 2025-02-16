import { Component, inject, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnDialogImports } from '@spartan-ng/brain/dialog';
import { HlmDialogImports } from '@spartan-ng/ui-dialog-helm';
import { HlmInputDirective, HlmInputModule } from '@spartan-ng/ui-input-helm';
import { BrnLabelDirective } from '@spartan-ng/brain/label';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { CommonModule } from '@angular/common';
import { lucidePlus, lucideX } from '@ng-icons/lucide';
import { provideIcons } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { toast } from 'ngx-sonner';
import { HttpService } from '@services/http/http.service';
import { HttpParams } from '@angular/common/http';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { BrnSeparatorComponent } from '@spartan-ng/brain/separator';
import { take } from 'rxjs';


@Component({
  standalone: true,
  selector: 'create-presta',
  imports: [
    HlmSeparatorDirective, BrnSeparatorComponent,
    BrnDialogImports, HlmFormFieldModule, HlmDialogImports, HlmButtonDirective, HlmInputDirective, HlmSelectImports, BrnSelectImports, HlmInputModule, CommonModule, FormsModule, ReactiveFormsModule, HlmLabelDirective, BrnLabelDirective],
  viewProviders: [provideIcons({ lucideX, lucidePlus })],
  templateUrl: './create-presta.component.html',
})
export class CreatePrestaComponent {

  private _formBuilder = inject(FormBuilder);

  public gotData = false;

  sites: any[] = [];
  typologies: any[] = [];

  zones: any[] = [];

  public listPrestaForm = this._formBuilder.group({
    site: new FormControl<any | null>(null, [Validators.required]),
    zone: new FormControl<any | null>({ value: null, disabled: true }, [Validators.required]),
    typologie: new FormControl<any | null>(null, [Validators.required]),
    rows: this._formBuilder.array<FormGroup>([])
  });

  constructor(private http: HttpService) {
    this.sites = [
      {
        id: 1,
        name: "Site 1",
        zone: [
          {
            id: 1,
            name: "Zone 1"
          },
          {
            id: 2,
            name: "Zone 2"
          }
        ]
      },
      {
        id: 2,
        name: "Site 2",
        zone: [
          {
            id: 3,
            name: "Zone 3"
          },
          {
            id: 4,
            name: "Zone 4"
          }
        ]
      }
    ]

    this.typologies = [
      { code: 'typo_pro_colloc', name: 'Pro/Colloc' },
      { code: 'typo_part', name: 'Particulier' },
    ];

    this.zones = [
      {
        id: 1,
        name: "Zone 1"
      },
      {
        id: 2,
        name: "Zone 2"
      }
    ]
  }


  get rows(): FormArray<FormGroup> {
    return this.listPrestaForm.controls["rows"] as FormArray<FormGroup>;
  }


  private createRow(): FormGroup {
    return this._formBuilder.group({
      name: new FormControl(null, Validators.required),
      num_marche: new FormControl(null, Validators.required),
      percent: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(1)])
    });
  }

  addRow() {
    this.rows.push(this.createRow());
  }


  onSiteChange(site: any) {
    this.zones = site.zone;
    this.listPrestaForm.controls.zone.enable();
    this.onSelectChange();
  }

  onSelectChange() {
    //FIXME: Make sure to unfocus/close the selects automatically
    if (!this.listPrestaForm.value.site || !this.listPrestaForm.value.zone || !this.listPrestaForm.value.typologie) return;

    let site = this.listPrestaForm.value.site;
    let zone = this.listPrestaForm.value.zone;
    let typologie = this.listPrestaForm.value.typologie;

    if (!site || !zone || !typologie) return;

    this.listPrestaForm.controls.site.disable();
    this.listPrestaForm.controls.zone.disable();
    this.listPrestaForm.controls.typologie.disable();


    let params = new HttpParams()
      .set('site', site.id)
      .set('zone', zone.id)
      .set('typologie', typologie.code);

    const subscription = this.http.get<any[]>('/api/prestataires', params).pipe(take(1)).subscribe(response => {
      if (!response.error) {
        this.gotData = true;
        this.handleData(response.data);
      }
      subscription.unsubscribe();
    });
  }

  handleData(data: any[]) {
    this.listPrestaForm.controls.rows.disable();
    this.rows.clear();
    data.forEach(row => {
      this.rows.push(this._formBuilder.group({
        name: new FormControl(row.name, [Validators.required]),
        num_marche: new FormControl(row.num_marche, [Validators.required]),
        percent: new FormControl(row.percent, [Validators.required, Validators.min(0), Validators.max(1)])
      }));
    });


    setTimeout(() => {
      this.listPrestaForm.controls.rows.enable();
      this.listPrestaForm.controls.site.enable();
      this.listPrestaForm.controls.zone.enable();
      this.listPrestaForm.controls.typologie.enable();
    }, 0);
  }

  onSubmit() {
    if (!this.listPrestaForm.valid) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    this.http.post('/api/prestataires', this.listPrestaForm.value).subscribe(response => {
      if (!response.error) {
        toast.success('Commune créée avec succès');
      }
    });
  }
}
