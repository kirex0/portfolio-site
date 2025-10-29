import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ContactLink {
  icon: string;
  label: string;
  url: string;
  type: 'email' | 'linkedin' | 'github';
}

@Component({
  selector: 'app-connect-page',
  imports: [CommonModule],
  templateUrl: './connect-page.html',
  styleUrl: './connect-page.scss'
})
export class ConnectPage {
  contactLinks: ContactLink[] = [
    {
      icon: 'email',
      label: 'kswork9@gmail.com',
      url: 'mailto:kswork9@gmail.com',
      type: 'email'
    },
    {
      icon: 'linkedin',
      label: 'linkedin.com/in/kade-shockey/',
      url: 'https://linkedin.com/in/kade-shockey/',
      type: 'linkedin'
    },
    {
      icon: 'github',
      label: 'https://github.com/kirex0',
      url: 'https://github.com/kirex0',
      type: 'github'
    }
  ];
}
