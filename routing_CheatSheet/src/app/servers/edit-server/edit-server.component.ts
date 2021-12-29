import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService, private activatedRoute: ActivatedRoute,
    private router: Router) { }
  
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean
  {
    if (!this.allowEdit) {
      return true
    }
    if((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && (!this.changesSaved))
    {
      return confirm('Discard changes?');
    }
    else {
      return true;
    }
  }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.queryParams);
    console.log(this.activatedRoute.snapshot.fragment);
    // this.activatedRoute.params.subscribe(); react to changes

    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = queryParams['allowEdit'] === '1' ? true : false
    })

    const id = +this.activatedRoute.snapshot.params['id']
    this.server = this.serversService.getServer(id);
    //subscribe route params to update if the id changes
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

}
