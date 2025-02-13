import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterModule } from '@angular/router';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideHouse, lucideChartBar, lucideCog } from '@ng-icons/lucide';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterModule, CommonModule, NgIconComponent],
  viewProviders: [provideIcons({ lucideChartBar, lucideCog, lucideHouse })],
  templateUrl: './layout.component.html',
})
export class LayoutComponent { }
