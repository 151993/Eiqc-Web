import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { DepartmentService } from 'src/app/services/department/department.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { Department } from 'src/app/model/department/department';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateDepartmentModel } from 'src/app/model/department/update-department-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionType } from 'src/app/shared/constant/roles';



@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent  extends BaseListComponent implements OnInit {

  constructor(
    private _router: Router, // tslint:disable-line
    private _activatedRoute: ActivatedRoute, // tslint:disable-line
    private _apiService: DepartmentService, // tslint:disable-line
    private _csvExportService: CSVExportService, // tslint:disable-line
    auditLogService: AuditLogService,
    authService: AuthService,
    notificationService: NotificationService,
    public translateService: TranslateService,
    modalService: NgbModal
) {
    super(authService, auditLogService, modalService, translateService, notificationService, _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new Department()));
    this.entity = AuditLogEntityTypes.Department;
    this.editEntityPath = '../EditDepartment';
    this.getUpdateModelFunction = this.getUpdateModel;
    this.displayColumns = (new Department()).displayColumns();

    this.canCreatPermissionType = PermissionType.AdminDepartmentCanCreate;
    this.canUpdatePermissionType = PermissionType.AdminDepartmentCanUpdate;
    this.canDeletePermissionType = PermissionType.AdminDepartmentCanDelete;
    this.checkPermissions();
}

ngOnInit() {
  super.getData();
}

getUpdateModel(record: Department): UpdateDepartmentModel {
  const updateDepartmentModel = new UpdateDepartmentModel();
  Automapper.map(record, updateDepartmentModel);

  return updateDepartmentModel;
}

}
