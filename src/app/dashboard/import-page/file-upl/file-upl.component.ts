import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { FileUpl, TestUpl } from './models/file-upl.model';
import { FileUplService } from './services/file-upl.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-file-upl',
  templateUrl: './file-upl.component.html',
  styleUrls: ['./file-upl.component.css'],
})
export class FileUplComponent implements OnInit {
  datatest: TestUpl = { email: '', password: '' };
  data: any[][] = [];
  Exel: FileUpl[] = [];
  constructor(
    private service: FileUplService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {}
  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1)
      throw console.error("Can't use multiple files.");
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      for (let index = 0; index < this.data.length; index++) {
        this.Exel.push({} as FileUpl);
        this.Exel[index].dateListAsInt = String(this.data[index][0]);
        this.Exel[index].name = this.data[index][1];
        this.Exel[index].surname = this.data[index][2];
        this.Exel[index].linkedin = this.data[index][3];
        this.Exel[index].comment = this.data[index][4];
        this.Exel[index].technologyListAsString = this.data[index][5];
      }
      console.log(this.Exel);
      this.service.FileUpload(this.Exel).subscribe((data: any) => {
        this.messageService.add({
          key: 'myKey1',
          severity: 'success',
          summary: 'Successful',
          detail: 'Importinimas sėkmingas!',
          life: 3000,
        });
      });
    };
    reader.readAsBinaryString(target.files[0]);
  }
}
