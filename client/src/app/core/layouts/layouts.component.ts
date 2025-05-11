import { Component } from '@angular/core';
import { AsideComponent } from './aside/aside.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [AsideComponent, RouterOutlet],
  templateUrl: './layouts.component.html',
})
export class LayoutComponent {}
