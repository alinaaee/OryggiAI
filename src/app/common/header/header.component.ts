import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { LogOutComponent } from "../log-out/log-out.component";
import { OryggiAiService } from '../../oryggi-ai.service';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, LogOutComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private aiService: OryggiAiService) {}
  
  logo: string = 'assets/Logo/logo-Oryggi.png';
  image: string = 'assets/Profiles/avtar.jpeg';
  companyName: string = '';

  ngOnInit() {
    this.getCompanyName();
  }

  getCompanyName() {
    this.companyName = this.aiService.companyName;
  }

}
