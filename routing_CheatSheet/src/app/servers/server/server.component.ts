import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    //make sure this is a number
    // const id = +this.activatedRoute.snapshot.params['id'];
    // this.server = this.serversService.getServer(id);

    // this.activatedRoute.params.subscribe((params: Params) => {
    //     this.server = this.serversService.getServer(+params['id'])
    // })

    //resolver
    this.activatedRoute.data.subscribe((data: Data) => {
      this.server = data['server'];
    })
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute, queryParamsHandling: 'preserve'});
  }

}
