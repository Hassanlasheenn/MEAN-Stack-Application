import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent implements OnInit {
  moonIcon: string = '../../../assets/images/moon-svgrepo-com.svg';
  sunIcon: string = '../../../assets/images/sun-svgrepo-com.svg';

  constructor() {}

  ngOnInit(): void {
      this.getTheme();
  }

  toggleTheme(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if(isChecked) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }

  getTheme(): void {
    const theme = localStorage.getItem('theme');
    if(theme === 'dark') {
      document.body.classList.add('dark-mode');
      const toggle = document.getElementById('darkmode-toggle') as HTMLInputElement;
      toggle.checked = true;
    }
  }
}
