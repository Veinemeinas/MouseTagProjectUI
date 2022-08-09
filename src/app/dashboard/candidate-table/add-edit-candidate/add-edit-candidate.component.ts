import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidateTableApiService } from '../services/candidate-table-api.service';
import { PrimeNGConfig, SelectItemGroup } from 'primeng/api';

interface City {
  name: string;
  code: string;
}

interface Country {
  name: string;
  code: string;
}
@Component({
  selector: 'app-add-edit-candidate',
  templateUrl: './add-edit-candidate.component.html',
  styleUrls: ['./add-edit-candidate.component.css'],
})
export class AddEditCandidateComponent implements OnInit {
  checked: boolean = true;

  date1: Date;

  date2: Date;

  candidateList$: Observable<any[]>;
  technologyList$: Observable<any[]>;

  cities: City[];

  countries: any[];

  //selectedCity:;

  selectedCountries: any[];

  constructor(
    private service: CandidateTableApiService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.technologyList$ = this.service.getTechnologiesList();
  }
}
