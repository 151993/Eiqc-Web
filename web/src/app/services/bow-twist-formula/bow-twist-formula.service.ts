import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebHttpClient, IRequestOptions } from '../WebHttpClient';
import { AddBowTwistFormulaModel } from 'src/app/model/bow-twist-formula/add-bow-twist-formula-model';
import { BowTwistFormula } from 'src/app/model/bow-twist-formula/bow-twist-formula';
import { UpdateBowTwistFormulaModel } from 'src/app/model/bow-twist-formula/update-bow-twist-formula-model';
import { PageSortFilterInfo } from 'src/app/shared/odata-query-builder/page-sort-filter-config';
import { OdataQueryBuilderService } from 'src/app/shared/odata-query-builder/odata-query-builder.service';
import { ApiResponse } from 'src/app/model/apiResponse/api-response';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-data.service';
import { IDeleteModel } from 'src/app/model/base/delete-model';
import { Numbers, Operators } from 'src/app/shared/constant/global';

@Injectable({
    providedIn: 'root'
})
export class BowTwistFormulaService extends BaseDataService {
    private apiUrl = 'api/BowTwistFormula';
    private oDataUrl = 'odata/BowTwistFormula';
    bowTwistFormulaExpression: string;

    constructor(
        http: WebHttpClient,
        odataQueryBuilderService: OdataQueryBuilderService,
    ) {
        super(http, odataQueryBuilderService);
    }

    addData(request: AddBowTwistFormulaModel): Observable<BowTwistFormula> {
        const url = `${this.apiUrl}`;
        return super.add(url, request);
    }

    updateData(id: number, request: UpdateBowTwistFormulaModel): Observable<BowTwistFormula> {
        const url = `${this.apiUrl}/${id}`;
        return super.update(url, request);
    }

    deleteData(id: number, request: IDeleteModel): Observable<BowTwistFormula> {
        const url = `${this.apiUrl}/${id}`;
        return super.delete(url, request);
    }

    isAlreadyExists(field: string, name: string): Observable<boolean> {
        const url = `${this.oDataUrl}?$filter=tolower(${field}) eq '${encodeURIComponent(name.toLowerCase())}'&$select=id`;
        return super.isExists(url);
    }

    getAllData(pageSortFilterData?: PageSortFilterInfo): Observable<ApiResponse<BowTwistFormula>> {
        const url = `${this.oDataUrl}`;
        return super.get(url, undefined, pageSortFilterData).pipe(map((result) => {
            return new ApiResponse<BowTwistFormula>(result);
        }));
    }

    getBowTwistDataById(id: number): Observable<BowTwistFormula> {
        const url = `${this.oDataUrl}(${id})`;
        return super.getById(url, new BowTwistFormula());
    }

    searchByField(field: string, value: string): Observable<ApiResponse<BowTwistFormula>> {
        const url = `${this.oDataUrl}?$filter=contains(${field},'${encodeURIComponent(value)}')`;
        const options: IRequestOptions = {
            headers: this.headerWithoutLoading
        };
        return super.get(url, options).pipe(
            map(result => {
                return new ApiResponse(result);
            })
        );
    }

    replaceExpression(spec: number, length: number, width: number, expression: string) {
        this.bowTwistFormulaExpression = expression.toLowerCase();
        this.bowTwistFormulaExpression = this.replaceAll(this.bowTwistFormulaExpression, 'spec', spec);
        this.bowTwistFormulaExpression = this.replaceAll(this.bowTwistFormulaExpression, 'length', length);
        this.bowTwistFormulaExpression = this.replaceAll(this.bowTwistFormulaExpression, 'width', width);
        this.bowTwistFormulaExpression = this.replaceAll(this.bowTwistFormulaExpression, 'sqrt', 'Math.sqrt');
        this.bowTwistFormulaExpression = this.bowTwistFormulaExpression.split('^').join('**');
        return this.bowTwistFormulaExpression;
    }

    validateOperatorsExistance(expression: string) {
        this.bowTwistFormulaExpression = expression.toLowerCase();
        if (this.bowTwistFormulaExpression.indexOf(Operators.Subtraction) !== Numbers.MinusOne || this.bowTwistFormulaExpression.indexOf(Operators.Addition) !== Numbers.MinusOne
            || this.bowTwistFormulaExpression.indexOf(Operators.Division) !== Numbers.MinusOne || this.bowTwistFormulaExpression.indexOf(Operators.Multiplication) !== Numbers.MinusOne
            || this.bowTwistFormulaExpression.indexOf(Operators.Exponential) !== Numbers.MinusOne) {
            return true;
        } else {
            return false;
        }
    }

    replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }
}
