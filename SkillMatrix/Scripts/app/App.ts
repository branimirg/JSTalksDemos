module SkillMatrix{
    export interface ISkillMatrixScope extends angular.IScope {
        freelancersData: any;
        newFreelancer: any;
        gridOptions: any;
        createFreelancer: angular.IFormController;
        submit: Action<void>;
        reset: Action<ng.IFormController>;
        sortChanged: any;
        gridApi: any;
    }


}

interface Action<T> {
    (item: T): void;
}

