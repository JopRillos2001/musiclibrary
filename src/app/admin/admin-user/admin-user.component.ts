import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { UserService } from '../../service/user.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { AppUser } from 'src/app/models/app-user';

@Component({
  selector: 'admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css'],
})
export class AdminUserComponent implements OnInit, OnDestroy {
  users: AppUser[];
  filteredUsers: AppUser[];
  subscription: Subscription;

  displayedColumns: string[] = ['name', 'email', 'isadmin'];
  dataSource: MatTableDataSource<AppUser>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService) {}
  ngOnInit() {
    this.subscribe();
  }

  initPaginatorAndSort(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filter(query: string) {
    this.filteredUsers = query
      ? this.users.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        )
      : this.users;
    this.dataSource = new MatTableDataSource<AppUser>(this.filteredUsers);
    this.initPaginatorAndSort();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  subscribe() {
    this.subscription = this.userService
      .getAll()
      .valueChanges({
        idField: 'key',
      })
      .subscribe((users: any) => {
        this.filteredUsers = this.users = users.map((user: any) => {
          return {
            name: user['name'],
            email: user['email'],
            isAdmin: user['isAdmin'],
            key: user['key'],
          };
        });
        this.dataSource = new MatTableDataSource<AppUser>(this.filteredUsers);
        this.initPaginatorAndSort();
      });
  }

  changeAdmin(userkey: string, value: boolean) {
    this.userService.updateRole(userkey, !value);
  }
}
