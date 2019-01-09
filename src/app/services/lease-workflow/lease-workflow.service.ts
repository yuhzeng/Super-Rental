import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeaseWorkflowService {

  private workflow = [
    { step: 'apartment', valid: false, redirectURL: '' },
    { step: 'amenities', valid: false, redirectURL: 'amenities' },
    { step: 'leaseInfo', valid: false, redirectURL: 'userinfo' },
    { step: 'submit', valid: false, redirectURL: 'submit' }
  ];

  constructor() { }

  public validate(step: string) {
    let found = false;
    for (let i = 0; i < this.workflow.length && !found; i++) {
      if (this.workflow[i].step === step) {
        found = this.workflow[i].valid = true;
      }
    }
  }

  public reset() {
    this.workflow.forEach(item => {
      item.valid = false;
    });
  }

  public validateRoute(route: string) {
    let valid = true;
    let found = false;
    let redirectURL = '';
    for (let i = 0; i < this.workflow.length && !found && valid; i++) {
      if (this.workflow[i].step === route) {
        found = this.workflow[i].valid = true;
        redirectURL = '';
      } else {
        valid = this.workflow[i].valid;
        redirectURL = this.workflow[i].redirectURL;
      }
    }
    return redirectURL;
  }
}
