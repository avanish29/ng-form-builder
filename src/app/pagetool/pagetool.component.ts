import { Component, OnInit, OnDestroy } from '@angular/core';
import JsonData from "../../assets/pagetoolmetadata/pagetool.json";

import { first } from 'rxjs/operators';
import { RootObject } from '@/models';
import { UserService, AuthenticationService } from '@/services';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({ templateUrl: './pagetool.component.html', styleUrls: ['./pagetool.component.css'] })
export class PageToolComponent implements OnInit, OnDestroy {
    public isCollapsed = false;
    dragElements : RootObject[] = JsonData ;
    arrCase : object [];
    formFields: Array<RootObject> = [];
    private current_field: RootObject;

    createNewField() {
        return {
            'Name': String,
            'Settings': Array,
            'Active': true,
            'ChangeFieldSetting': function (Value: any, SettingName: any) {
                switch (SettingName) {
                    case 'Field Label':
                    case 'Short Label':
                    case 'Internal Name':
                        this.current_field.Name = Value;
                        this.current_field.Settings[0].Value = this.current_field.Name;
                        this.current_field.Settings[1].Value = this.current_field.Name;
                        this.current_field.Settings[2].Value = 'x' + this.current_field.Name.replace(/\s/g, '_');
                        break;
                    default:
                        break;
                }
            },
            'GetFieldSetting': function(settingName: String) {
                var result = {};
                var settings = this.Settings;
                for(let setting of settings) {
                    if (setting.Name == settingName) {
                        result = setting;
                        return;
                    }
                }
                return result;

            }
        };
    }

    constructor() {
    }

    activeField(formField: RootObject) {
        if(this.current_field) this.current_field.Active = false;
        this.current_field = formField;
        formField.Active = true;
    }

    removeElement(index: number) {
        if(this.formFields[index].Active) {
           this.current_field = null;
        }
        this.formFields.splice(index, 1);
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    drop(event: CdkDragDrop<string[]>) {
        this.formFields.push(this.dragElements[event.previousIndex]);
    }
}