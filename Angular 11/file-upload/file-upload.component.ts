import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { Utils } from 'src/app/core/util/utils';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Input() accept: string = ""
  @Input() form: FormGroup;
  @Input() controlName: string;
  @Input() label: string = ''
  @Input() required: boolean = false;
  @Input() errorMessage: string = '';
  @Input() uploadButtonText: string = 'Upload';
  @Input() fileName: string = '';
  @Input() fileMaxSize: number;


  constructor(public toasterService: ToasterService) { }

  ngOnInit() {
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (this.fileMaxSize) {
        let convertIntoMb = Utils.convertBytesToMb(event.target.files[0].size);
        if (convertIntoMb <= this.fileMaxSize) {
          this.fileName = file.name;
          this.form.controls[this.controlName].patchValue(file);
        } else {
          this.toasterService.showError(`File size can't be more then ${this.fileMaxSize}MB`, 'Error!');
        }
      } else {
        this.fileName = file.name;
        this.form.controls[this.controlName].patchValue(file);
      }
    }
  }

  onDelete() {
    this.form.controls[this.controlName].patchValue(null);
    this.fileName = '';
  }

}
