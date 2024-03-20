import { FormInput } from 'src/app/shared/decorators/property';
import { Reflection } from 'src/app/shared/reflection/reflection';

export class IBaseModel {
    id: number;
    isEnabled: boolean;
    lastUpdated: Date;

    enableRowEdit: boolean;
    enableRowView: boolean;
    enableRowDetail: boolean;
    enableRowDelete: boolean;
    enableRowAssignToUser: boolean;
    enableRowAddDefectTypes: boolean;
    enableRowAddChartType: boolean;
    childDataSource: any;
}

export class BaseModel extends Reflection implements IBaseModel {
    id: number;

    @FormInput()
    isEnabled: boolean;
    lastUpdated: Date;

    enableRowEdit: boolean;
    enableRowView: boolean;
    enableRowDetail: boolean;
    enableRowDelete: boolean;
    enableRowAssignToUser: boolean;
    enableRowAddDefectTypes: boolean;
    enableRowAddChartType: boolean;

    selectedDynamicId: any;
    isDisabled: boolean;
    childDataSource: any;

    constructor(baseModel?: BaseModel) {
        super();

        if (baseModel) {
            this.id = baseModel.id;
            this.isEnabled = baseModel.isEnabled;
            this.lastUpdated = baseModel.lastUpdated;
            this.enableRowEdit = baseModel.enableRowEdit;
            this.enableRowView = baseModel.enableRowView;
            this.enableRowDetail = baseModel.enableRowDetail;
            this.enableRowDelete = baseModel.enableRowDelete;
            this.enableRowAssignToUser = baseModel.enableRowAssignToUser;
            this.enableRowAddDefectTypes = baseModel.enableRowAddDefectTypes;
            this.enableRowAddChartType = baseModel.enableRowAddChartType;
            this.selectedDynamicId = baseModel.selectedDynamicId;
            this.isDisabled = baseModel.isDisabled;
            this.childDataSource = baseModel.childDataSource;
        } else {
            this.id = 0;
            this.isEnabled = false;
            this.lastUpdated = new Date();
            this.enableRowEdit = false;
            this.enableRowView = false;
            this.enableRowDetail = false;
            this.enableRowDelete = false;
            this.enableRowAssignToUser = false;
            this.enableRowAddDefectTypes = false;
            this.enableRowAddChartType = false;
            this.selectedDynamicId = null;
            this.isDisabled = false;
            this.childDataSource = [];

        }
    }
}
