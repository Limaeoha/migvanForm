import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AccountsService } from './accounts.service';
import { defaultFields } from './fields.config';
import { Config } from './user';

// const SERVER_URL = '/api/cgi-webaxy/sal/sal.pl'; // dev mode
const SERVER_URL = '/cgi-webaxy/sal/sal.pl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  config: Config = null;
  fields: FormlyFieldConfig[] = defaultFields;
  restricted: boolean = null;
  submitted: boolean = false;

  constructor(private accountService: AccountsService, private httpClient: HttpClient) {}

  getConfig(): void {
    this.accountService.getAccounts().pipe(first())
      .subscribe(config => {
        console.log(config);
        this.config = config;
        this.restricted = this.config.current.restricted;
        if (this.restricted) {
          Swal.fire({
            title: 'אין הרשאה להעברה!',
            text: 'אין הרשאות לשירות זה, נא לפנות למנהל האתר.',
            icon: 'error',
            timer: 7000
          }).finally(() => {
            location.replace('/');
          });
        }

        this.fields[0].fieldGroup[0].fieldGroup[0].templateOptions.list =
          this.config.current.accounts;

        this.fields[0].fieldGroup[1].fieldGroup[0].templateOptions.list = {};
        for (const item of this.config.users) {
          this.fields[0].fieldGroup[1].fieldGroup[0].templateOptions.list[item[0]] = item[1].fullname;
        }

        if (this.config.current.accounts.length === 1) {
          this.fields[0].fieldGroup[0].fieldGroup[0].formControl.setValue(this.config.current.accounts[0]);
          this.fields[0].fieldGroup.shift();
        }
      });
  }

  submit(): void {
    const FD: FormData = Object.keys(this.model).reduce<FormData>(
      (fd, name) => {
        const nameConverter = {
          src: 'f16',
          dest: 'f13',
          sum: 'f11',
          comments: 'title'
        };
        fd.append(nameConverter[name] || name, this.model[name]);
        return fd;
      }, new FormData());

      this.submitted = true;
      this.httpClient.post(SERVER_URL, FD, {responseType: 'text', observe: 'response'}).subscribe(
      (res) => {
        let html = `העברת ל${this.model.dest}<BR>${this.model.sum} ש"ח`;
        if (this.model.comments) {
          html += `<BR>${this.model.comments}`;
        }
        Swal.fire({
          title: 'מעולה!',
          html,
          icon: 'success',
          timer: 7000
        }).finally(() => {
          location.replace(
            'http://degem2.migvan.co.il/cgi-webaxy/sal/sal.pl?lang=he&ID=307434_degem2&dbid=masof&act=search2');
        });
      },
      (err) => console.log('err', err)
    );
  }

  ngOnInit(): void {
    this.getConfig();
  }
}
