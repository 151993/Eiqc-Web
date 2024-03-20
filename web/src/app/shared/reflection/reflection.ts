import 'reflect-metadata';
import { FormGroup } from '@angular/forms';

export interface IReflection {
    displayColumns();
    expandableFields();
    expandSelectableFields();
    selectableFields();
    countFields();
    trimAll();
    loadFromInput(formGroup: FormGroup);
}

export class Reflection implements IReflection {

    displayColumns() {
        // Deep copy to avoid accidental modification of data
        return JSON.parse(JSON.stringify((Reflect.getMetadata('displayColumn', this.getTarget())))) || [];
    }

    expandableFields() {
        // Deep copy to avoid accidental modification of data
        if (Reflect.getMetadata('expand', this.getTarget())) {
            return JSON.parse(JSON.stringify(Reflect.getMetadata('expand', this.getTarget()))) || [];
        }
        return [];
    }

    expandSelectableFields() {
        // Deep copy to avoid accidental modification of data
        if (Reflect.getMetadata('expandSelect', this.getTarget())) {
            return JSON.parse(JSON.stringify(Reflect.getMetadata('expandSelect', this.getTarget()))) || [];
        }
        return [];
    }

    selectableFields() {
        // Deep copy to avoid accidental modification of data
        if (Reflect.getMetadata('select', this.getTarget())) {
            return JSON.parse(JSON.stringify(Reflect.getMetadata('select', this.getTarget()))) || [];
        }
        return [];
    }

    countFields() {
        if (Reflect.getMetadata('count', this.getTarget())) {
            return JSON.parse(JSON.stringify(Reflect.getMetadata('count', this.getTarget()))) || [];
        }
        return [];
    }

    trimAll() {
        if (Reflect.getMetadata('trim', this.getTarget())) {
            Reflect.getMetadata('trim', this.getTarget()).forEach(element => {
                if (this[element]) {
                    this[element] = this[element].trim();
                }
            });
        }
    }

    loadFromInput(formGroup: FormGroup) {
        const formInputFields = Reflect.getOwnMetadata('formInput', this.getTarget());
        if (formInputFields) {
            formInputFields.forEach(element => {
                if (formGroup.controls[element]) {
                    this[element] = formGroup.controls[element].value;
                }
            });
        }
    }

    emailTemplateGuideList() {
        return JSON.parse(JSON.stringify((Reflect.getMetadata('emailTemplateVariable', this.getTarget())))) || [];
    }

    getTarget() {
        return Object.getPrototypeOf(this);
    }

}

