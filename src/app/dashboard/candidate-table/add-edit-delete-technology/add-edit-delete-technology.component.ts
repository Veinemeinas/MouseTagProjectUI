import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidateTableApiService } from '../services/candidate-table-api.service';
import { MessageService, SelectItem } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { Technology } from '../models/technology.model';

@Component({
  selector: 'app-add-edit-delete-technology',
  templateUrl: './add-edit-delete-technology.component.html',
  styleUrls: ['./add-edit-delete-technology.component.css'],
})
export class AddEditDeleteTechnologyComponent implements OnInit {
  technology: Technology;
  foundIt: boolean = false;
  empty: boolean = false;
  constructor(
    private service: CandidateTableApiService,
    private messageService: MessageService
  ) {}

  technologyList$: Observable<any[]>;

  technologyOptions: SelectItem<number>[];

  arrayTechIds: number[] = [];

  ngOnInit(): void {
    this.service.getTechnologiesList().subscribe((response: any[]) => {
      console.log(response);
      this.technologyOptions = response.map((x) => {
        return { value: x.id, label: x.technologyName };
      });
    });
    this.resetForm();
  }

  resetForm(AddTechnologyForm?: NgForm) {
    if (AddTechnologyForm != null) AddTechnologyForm.reset();
    this.technology = {
      technologyName: '',
    };
  }

  AddTechnology(AddTechnologyForm: NgForm) {
    this.empty = false;
    this.foundIt = false;
    if (
      this.technology.technologyName == '' ||
      this.technology.technologyName == undefined
    ) {
      this.empty = true;
    }
    if (!this.empty) {
      for (var i = 0; i < this.technologyOptions.length; i++) {
        if (
          this.technologyOptions[i].label?.toLowerCase() ==
          this.technology.technologyName.toLowerCase()
        ) {
          this.empty = false;
          this.foundIt = true;
        }
      }
      if (!this.empty && !this.foundIt) {
        this.service.addTech(this.technology).subscribe((response: any) => {
          this.messageService.add({
            key: 'myKey1',
            severity: 'success',
            summary: 'Technologija sėkmingai pridėta!',
          });
          this.service.getTechnologiesList().subscribe((response: any[]) => {
            console.log(response);
            this.technologyOptions = response.map((x) => {
              return { value: x.id, label: x.technologyName };
            });
          });
          this.resetForm();
        });
      }
    }
  }

  DeleteTechnology() {
    if (this.arrayTechIds.length == 0) {
      return;
    }
    console.log(this.arrayTechIds);
    var calcEnd = this.arrayTechIds.length;
    var calc = 0;
    for (let i = 0; i < this.arrayTechIds.length; i++) {
      this.service.deleteTechnology(this.arrayTechIds[i]).subscribe();
      calc++;
      console.log(calc);
    }
    if (calc == calcEnd) {
      this.messageService.add({
        key: 'myKey1',
        severity: 'success',
        summary: 'Technologijos sėkmingai ištrintos!',
      });
      this.service.getTechnologiesList().subscribe((response: any[]) => {
        console.log(response);
        this.technologyOptions = response.map((x) => {
          return { value: x.id, label: x.technologyName };
        });
      });
      this.arrayTechIds = [];
    }

    this.resetForm();
  }
}
