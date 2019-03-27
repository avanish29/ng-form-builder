export interface Option {
    Name: string;
    Value: boolean;
}

export interface Setting {
    Name: string;
    Value: string;
    Type: string;
    PossibleValue: any[];
    Options: Option[];
}

export interface RootObject {
    Name: string;
    Type: string;
    Active: boolean;
    Settings: Setting[];
}

export {};