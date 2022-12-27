import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  toggle:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

  toggleplan()
  {
      this.toggle?this.toggle=false:this.toggle=true;
  }
}
