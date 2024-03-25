import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'desafio-senior';

  constructor(private router: Router) {}

  home() {
    const currentRoute = this.router.url;

    if (currentRoute === '/home') {
      window.location.reload();
    } else if (currentRoute === '/cadastrar-produto') {
      this.router.navigateByUrl('/');
    }
  }
}
