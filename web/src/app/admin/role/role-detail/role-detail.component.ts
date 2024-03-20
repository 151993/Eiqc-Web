import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { RoleService } from 'src/app/services/role/role.service';
import { UpdateRoleModel } from 'src/app/model/role/update-role-model';
import { AddRoleModel } from 'src/app/model/role/add-role-model';
import { Role } from 'src/app/model/role/role';
import { Automapper } from 'src/app/shared/automapper/automapper';
import { Constants} from 'src/app/shared/constant/global';
import { BaseDetailComponent } from 'src/app/shared/base/base-detail/base-detail.component';
import { environment } from 'src/environments/environment';
import { Permission } from 'src/app/model/permission/permission';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';
import { TreeModule } from 'primeng/tree';
import { PermissionType, permissionTypeMap, permissionStructure } from 'src/app/shared/constant/roles';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ConfirmationModalComponent } from 'src/app/shared/controls/modal/confirmation-modal/confirmation-modal.component';
import { JAutoCompleteConfig } from 'src/app/shared/controls/autoComplete/j-auto-complete/j-auto-complete-config';
import { RoleEnum } from 'src/app/model/role-enum/role-enum';
import { ExpandSelectCountInfo, PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';


@Component({
    selector: 'app-role-detail',
    templateUrl: './role-detail.component.html',
    styleUrls: ['./role-detail.component.css']
})
export class RoleDetailComponent extends BaseDetailComponent
    implements OnInit, OnDestroy {
    role: Role;
    permissions: PermissionType[] = [];
    originalPermissions: PermissionType[] = [];
    addedPermissions: PermissionType[] = [];
    removedPermissions: PermissionType[] = [];
    permissionNodes: TreeNode[];
    columns: any[];
    permissionData: TreeNode[];
    selectedItems: TreeNode[] = [];
    originalFormInput: string;
    properties = {
        id: 'id',
        name: 'name',
        roleEnum : 'roleEnum',
        isEnabled: 'isEnabled'
    };
    roleEnum: RoleEnum;
    isAllNodeSelected: boolean;

    public roleEnumAutoCompleteConfig: JAutoCompleteConfig = {
        field: 'description',
        minLength: '1',
        suggestions: [],
        multiple: false,
        forceSelection: true,
        dropdown: true,
        mappingField: 'description',
        format: '${value.description}',
    };

    constructor(
        private formBuilder: FormBuilder,
        private apiService: RoleService,
        _treeTableModule: TreeTableModule,
        _treeModule: TreeModule,
        activatedRoute: ActivatedRoute,
        notificationService: NotificationService,
        modalService: NgbModal,
        router: Router,
        private translateService: TranslateService,
        private cdr: ChangeDetectorRef,
        authService: AuthService
    ) {
        super(modalService, activatedRoute, router, notificationService, authService, apiService);
        this.role = new Role();
        this.entity = this.role;
        this.cancelRoute = '/Admin/Role';
        this.getUpdateModelFn = this.getUpdateModel;
        this.getAddModelFn = this.getAddModel;
        this.canAccessPermissionType = PermissionType.AdminRoleCanAccess;
        this.canUpdatePermissionType = PermissionType.AdminRoleCanUpdate;
        this.canCreatPermissionType = PermissionType.AdminRoleCanCreate;
        this.columns = [
            { field: 'name', header: 'Name' }
        ];
        this.permissionData = this.createPermissionHierarchy(permissionStructure);
        this.isAllNodeSelected = false;
        this.initForm();
    }

    initForm() {
        this.formInput = this.formBuilder.group({
            id: 0,
            roleEnum: new FormControl(null,
                Validators.required),
            isEnabled: new FormControl(true, Validators.required),
            permissions: new FormControl([], Validators.required)
        });
    }

    ngOnInit() {
        super.ngOnInit();
        this.getData();
    }

    createPermissionHierarchy(permissions: any): TreeNode[] {
        let nodes = [];
        permissions.forEach(element => {
            const node = {};
            if (element.permission === Constants.Empty) {
                const parentNode = {};
                parentNode['name'] = element.label;
                node['data'] = parentNode;
                node['label'] = element.label;
                node['isChild'] = false;

                const subChilds = this.createPermissionHierarchy(element.children);
                node['children'] = subChilds;
                nodes.push(node);
            } else {
                const childNodes = [];
                const dataNode = {};
                const childNode = {};

                childNode['name'] = this.translateService.instant(`PermissionType.${PermissionType[element.permission]}`);
                childNode['permission'] = permissionTypeMap.get(element.permission);
                childNode['value'] = element.permission;
                childNode['isChild'] = false;

                dataNode['data'] = childNode;
                dataNode['label'] = this.translateService.instant(`PermissionType.${PermissionType[element.permission]}`);
                childNodes.push(dataNode);

                if (element.children) {
                    const subChildNodes = [];
                    element.children.forEach(children => {

                        const subNode = {};
                        const subDataNode = {};

                        subNode['name'] = this.translateService.instant(`PermissionType.${PermissionType[children.permission]}`);
                        subNode['permission'] = permissionTypeMap.get(children.permission);
                        subNode['value'] = children.permission;
                        subNode['isChild'] = true;
                        subNode['parentNodes'] = [];
                        subNode['parentNodes'].push(dataNode);

                        subDataNode['data'] = subNode;
                        subDataNode['label'] = this.translateService.instant(`PermissionType.${PermissionType[children.permission]}`);
                        subChildNodes.push(subDataNode);
                        childNodes.push(subDataNode);

                    });
                    childNode['childNodes'] = subChildNodes;
                }

                nodes = childNodes;
            }

        });

        return nodes;
    }
    getData() {
        // If create mode then return
        if (this.recId === null) {
            setTimeout(() => {
            }, environment.timer.autoReturn);
            return;
        }

        const pageSortFilterInfo = new PageSortFilterInfo();
        pageSortFilterInfo.expandInfo = <ExpandSelectCountInfo>
          {
            expand: <Record<string, ExpandSelectCountInfo>[]>
              [
                this.apiService.expandRoleEnum(),
              ]
          };

        this.apiService.getDataById(this.recId, pageSortFilterInfo).subscribe(data => {
            this.role = new Role(data.value[0]);
            this.entity = this.role;

            this.formDetails = this.role;
            this.formInput.patchValue({
                id: this.role.id,
                roleEnum: (this.role) ? this.role.roleEnum : null,
                isEnabled: this.role.isEnabled,
                permissions: this.role.permissionTypeIds
            });

            this.role.permissionTypeIds.forEach(element => {
                this.permissions.push(element.id);
            });

            this.selectedItems = [];
            this.getSelectedNodes(this.permissionData);
            this.cdr.detectChanges();
            this.originalPermissions = this.permissions;
            this.originalFormInput = JSON.stringify(this.formInput.getRawValue());
        });
    }

    getSelectedNodes(nodes: TreeNode[]): number {
        let selectedChildCount = 0;
        nodes.forEach(node => {
            if (this.role.permissionTypeIds.includes(node.data.value)) {
                selectedChildCount++;
                this.selectedItems.push(node);
            }

            if (node.children) {
                const selectedSubChildCount = this.getSelectedNodes(node.children);

                if (selectedSubChildCount === node.children.length) {
                    selectedChildCount++;
                    this.selectedItems.push(node);
                } else if (selectedSubChildCount > 0) {
                    node.partialSelected = true;
                }
            }
        });
        return selectedChildCount;
    }

    getUpdateModel(): UpdateRoleModel {
        const updateRoleModel = new UpdateRoleModel();

        Automapper.map(this.entity, updateRoleModel);

        updateRoleModel.addedPermissions = this.addedPermissions;
        updateRoleModel.removedPermissions = this.removedPermissions;

        const role = this.formInput.controls[this.properties.roleEnum].value;
        if (role) {
            updateRoleModel.name = role.description;
            updateRoleModel.roleEnumId = role.id;
        }
        updateRoleModel.isEnabled = this.formInput.controls[this.properties.isEnabled].value;
        return updateRoleModel;
    }

    getRemovedPermissions(selectedIds: Permission[]) {
        const added = _.difference(this.role.permissionTypeIds, selectedIds);
        return added;
    }

    getAddedPermissions(selectedIds: Permission[]) {
        const removed = _.difference(selectedIds, this.role.permissionTypeIds);
        return removed;
    }

    getAddModel(): AddRoleModel {
        const addRoleModel = new AddRoleModel();
        Automapper.map(this.role, addRoleModel);
        addRoleModel.permissions = [];
        this.selectedItems.forEach(node => {
            if (node.data.value) {
                addRoleModel.permissions.push(node.data.value);
            }
        });

        const role = this.formInput.controls[this.properties.roleEnum].value;
        if (role) {
            addRoleModel.name = role.description;
            addRoleModel.roleEnumId = role.id;
        }
        addRoleModel.isEnabled = this.formInput.controls[this.properties.isEnabled].value;
        return addRoleModel;
    }

    isModified(controlName: string) {
        return this.formInput.controls[controlName].touched || this.formInput.controls[controlName].dirty;
    }



    //#endregion

    isSaveDisabled() {
        return !this.enableSaveButton
            || !this.formInput.valid
            || !this.formInput.dirty;
    }

    nodeSelect(event) {
        this.selectParentNodes(event.node);
        this.updateSelectedNodes();
    }

    nodeUnselect(event) {
        this.unselctChildrenNodes(event.node);
        this.updateSelectedNodes();
    }

    unselctChildrenNodes(node: TreeNode) {
        if (node.data.childNodes) {
            node.data.childNodes.forEach(element => {
                const index = this.selectedItems.indexOf(element);
                if (index >= 0) {
                    this.selectedItems.splice(index, 1);
                }
            });
        }
    }

    selectParentNodes(node: TreeNode) {
        if (node.data.parentNodes) {
            node.data.parentNodes.forEach(element => {
                const index = this.selectedItems.indexOf(element);
                if (index < 0) {
                    this.selectedItems.push(element);
                }
            });
        }
    }

    updateSelectedNodes() {

        const selectedPermissionIds = [];

        this.selectedItems.forEach(node => {
            if (node.data.value) {
                selectedPermissionIds.push(node.data.value);
            }
        });

        this.formInput.patchValue({
            permissions: selectedPermissionIds
        });

        this.addedPermissions = this.getAddedPermissions(selectedPermissionIds);
        this.removedPermissions = this.getRemovedPermissions(selectedPermissionIds);

        if (this.addedPermissions.length > 0 || this.removedPermissions.length > 0) {
            this.enableSaveButton = true;
            this.formInput.markAsDirty();
        } else {
            this.formOnChange();
        }
    }

    openConfirmationModal() {
        const modalRef = this.modalService.open(ConfirmationModalComponent);
        modalRef.componentInstance.message = 'Message.ConfirmSetAsDefault';
        return modalRef;
    }

    expandAll() {
        this.permissionData.forEach(node => {
            this.expandRecursive(node, true);
        });
    }

    collapseAll() {
        this.permissionData.forEach(node => {
            this.expandRecursive(node, false);
        });
    }

    private expandRecursive(node: TreeNode, isExpand: boolean) {
        node.expanded = isExpand;
        if (node.children) {
            node.children.forEach(childNode => {
                this.expandRecursive(childNode, isExpand);
            });
        }
    }

    toggleSelect() {
        if (this.isAllNodeSelected) {
            this.selectedItems = [];
            this.addNode(this.permissionData[0]);
            this.nodeSelect({ node: this.permissionData[0] });
            this.addNode(this.permissionData[1]);
            this.nodeSelect({ node: this.permissionData[1] });
        } else {
            this.selectedItems = [];
            this.nodeUnselect({ node: this.permissionData[0] });
            this.nodeUnselect({ node: this.permissionData[1] });
        }
    }

    addNode(node: TreeNode) {
        this.selectedItems.push(node);
        if (node.children) {
            node.children.forEach(childNode => {
                this.addNode(childNode);
            });
        }
    }

}
