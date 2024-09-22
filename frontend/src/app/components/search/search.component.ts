import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';

  constructor(
    public activatedRoute: ActivatedRoute,
    private _router: Router,
  ){
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm) this.searchTerm = params.searchTerm;
    });
  }

  ngOnInit(): void {}

  search(term: string): void {
    if(term) 
      this._router.navigateByUrl('/search/' + term);
  }
}
