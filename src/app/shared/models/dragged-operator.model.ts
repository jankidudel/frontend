export class DraggedOperatorModel {
    label: string;
    key: string;
    operatorType: string;
    position?: string;
    searchParamType: string;
    singleUse: boolean; // Can it be used only one time ???
    value?: string[];
    isUsed = false;

    constructor(label: string, key: string, operatorType: string, searchParamType: string, singleUse: boolean, value: string[]) {
        this.label = label;
        this.key = key;
        this.operatorType = operatorType;
        this.searchParamType = searchParamType;
        this.singleUse = singleUse;
        this.value = value;
    }
}

export class DraggedOperator {
    public static readonly logical = 'logical';
    public static readonly corporateData = 'corporateData'; // @todo: rename to typecorporateData

    public static readonly typeText = 'text';
    public static readonly typeRange = 'range';
    public static readonly typeBool = 'bool';
    public static readonly typeOperator = 'operator';

    // simple input operators
    public static readonly keyEducation = 'education';
    public static readonly keyActive = 'active'; // used instead of jscore
    public static readonly keyMyTrackingPeople = 'myTrackingPeople';
    public static readonly keyLanguage = 'language';
    public static readonly keySkills = 'skills';
    public static readonly keyRecommendations = 'recommendations';
    public static readonly keyConnections = 'connections';
    public static readonly keyHeadline = 'headline';
    // logical operators
    public static readonly keyAnd = 'and';
    public static readonly keyOr = 'or';
    public static readonly keyNot = 'not';
    public static readonly keyGroupLess = 'group<';
    public static readonly keyGroupMore = 'group>';

    // simple input operators
    public static readonly labelEducation = 'Education';
    public static readonly labelActive = 'Active'; // used instead of j-score
    public static readonly labelMyTrackingPeople = 'My tracking people';
    public static readonly labelLanguage = 'Language';
    public static readonly labelSkills = 'Skills';
    public static readonly labelRecommendations = 'Recommendations';
    public static readonly labelConnections = 'Connections';
    public static readonly labelHeadline = 'Headline';
    // logical operators
    public static readonly labelAnd = 'AND';
    public static readonly labelOr = 'OR';
    public static readonly labelNot = 'NOT';
    public static readonly labelGroupLess = 'GROUP <';
    public static readonly labelGroupMore = 'GROUP >';
}
