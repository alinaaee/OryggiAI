import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { LogOutComponent } from "../log-out/log-out.component";

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, LogOutComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  logo: string = 'assets/Logo/logo-Oryggi.png';
  image: string = 'assets/Profiles/avtar.jpeg';

}
