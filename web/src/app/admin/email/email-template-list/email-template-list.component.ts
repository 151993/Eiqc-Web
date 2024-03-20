/* Auto Generated Code By AutoCodeGen Jabil © 2019 */
import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { EmailTemplateService } from 'src/app/services/emailTemplate/email-template.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AuditLogEntityTypes } from 'src/app/shared/constant/global';
import { EmailTemplate } from 'src/app/model/emailTemplate/email-template-model';
import { AuditLogService } from 'src/app/services/auditLog/audit-log.service';
import { UpdateEmailTemplateModel } from 'src/app/model/emailTemplate/update-email-template-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { CSVExportService } from 'src/app/services/export/csv-export.service';
import { AuthService } from '../../../auth/auth.service';
import { PermissionType } from '../../../shared/constant/roles';

@Component({
  selector: 'app-email-template-list',
  templateUrl: './email-template-list.component.html',
  styleUrls: ['./email-template-list.component.css']
})
export class EmailTemplateListComponent extends BaseListComponent implements OnInit {

  constructor(
    private _router: Router, // tslint:disable-line
    private _activatedRoute: ActivatedRoute, // tslint:disable-line
    private _apiService: EmailTemplateService, // tslint:disable-line
    private _csvExportService: CSVExportService, // tslint:disable-line
    auditLogService: AuditLogService,
    authService: AuthService,
    notificationService: NotificationService,
    public translateService: TranslateService,
    modalService: NgbModal
  ) {
    super(authService, auditLogService, modalService, translateService, notificationService, _router, _activatedRoute, _apiService, _csvExportService, new PageSortFilterInfo(new EmailTemplate()));
    this.entity = AuditLogEntityTypes.EmailTemplate;
    this.editEntityPath = '../EditEmailTemplate';
    this.getUpdateModelFunction = this.getUpdateModel;
    this.displayColumns = (new EmailTemplate()).displayColumns();

    this.canAccessPermissionType = PermissionType.AdminEmailTemplateCanAccess;
    this.canUpdatePermissionType = PermissionType.AdminEmailTemplateCanUpdate;
    this.checkPermissions();
  }

  ngOnInit() {
    this.fileName = AuditLogEntityTypes.EmailTemplate;
  }

  getUpdateModel(record: EmailTemplate): UpdateEmailTemplateModel {
    const updateEmailTemplateModel = new UpdateEmailTemplateModel();
    Automapper.map(record, updateEmailTemplateModel);

    return updateEmailTemplateModel;
  }

}
