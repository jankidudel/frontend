export class SearchParameterModel {
    parameterType: string;
    parameterKey: string;
    parameterValue: string[] = [];

    constructor(parameterType: string, parameterKey: string, parameterValue: string[]) {
        this.parameterType = parameterType;
        this.parameterKey = parameterKey;
        this.parameterValue = parameterValue;
    }
}
