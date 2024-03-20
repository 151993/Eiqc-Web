import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import {
  ToastMessage, AuditLogEntityTypes
} from 'src/app/shared/constant/global';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { BaseModel } from 'src/app/model/base/base-model';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/model/user/user';
import { UpdateUserModel } from 'src/app/model/user/update-user-model';

@Component({
  selector: 'app-demo-table',
  templateUrl: './demo-table.component.html',
  styleUrls: ['./demo-table.component.css']
})
export class DemoTableComponent extends BaseListComponent implements OnInit {
  constructor(
    private _router: Router, // tslint:disable-line
    private _activatedRoute: ActivatedRoute, // tslint:disable-line
    private _csvExportService: CSVExportService, // tslint:disable-line
    private _apiService: UserService, // tslint:disable-line
    auditLogService: AuditLogService,
    notificationService: NotificationService,
    authService: AuthService,
    public translateService: TranslateService,
    modalService: NgbModal
  ) {
    super(
      authService,
      auditLogService,
      modalService,
      translateService,
      notificationService,
      _router,
      _activatedRoute,
      _apiService,
      _csvExportService,
      new PageSortFilterInfo(new BaseModel())
    );
    this.entity = AuditLogEntityTypes.User;
    this.editEntityPath = '../EditUser';
    this.getUpdateModelFunction = this.getUpdateModel;
    this.displayColumns = new User().displayColumns();
  }

  ngOnInit() {
    this.fileName = AuditLogEntityTypes.User;
  }

  getUpdateModel(record: User): UpdateUserModel {
    const updateApplicationLinkModel = new UpdateUserModel();
    Automapper.map(record, updateApplicationLinkModel);

    return updateApplicationLinkModel;
  }

  // #region Override base method as this is a demo class only.
  editRecord(record: BaseModel) {
    this.notificationService.showInfo(
      ToastMessage.Blank,
      `You are editting recordId = ${record.id}`
    );
  }

  deleteRecord(record: BaseModel) {
    this.showDeleteChangeReasonModal().then(
      changeReason => {
        this.notificationService.showInfo(
          ToastMessage.Blank,
          `You are deleting recordId = ${record.id} with the following change reason '${changeReason}'`
        );
      },
      () => {}
    );
  }

  toggleStatus(record: BaseModel) {
    this.showChangeReasonModal().result.then(
      changeReason => {
        this.notificationService.showInfo(
          ToastMessage.Blank,
          `You are updating the record status to ${!record.isEnabled} with the following change reason '${changeReason}'`
        );
      },
      () => {}
    );
  }
  //#endregion
}
