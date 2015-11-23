module SkillMatrix.Controllers {
    export class DefaultController {

        constructor(private $scope: SkillMatrix.ISkillMatrixScope,
            private repositoryService: Services.IDataRepository) {

            this.$scope.submit = () => {
                this.repositoryService.CreateContact(this.$scope.newFreelancer);
            };

            

            this.$scope.reset = (form: ng.IFormController) => {
                if (null != form) {
                    form.$setPristine();
                    form.$setUntouched();
                }
            };

            this.$scope.gridOptions = {
                useExternalFilter : true,
                enableSorting: true,
                enableColumnResizing: true,
                useExternalSorting: false, //set to true in order to goto TODO: custom sorting
                columnDefs: 
                [
                    { name: 'Id', field: SkillMatrix.Data.Lists.Freelancers.Columns.Id },
                    {
                        name: 'First name',
                        field: SkillMatrix.Data.Lists.Freelancers.Columns.FirstName,
                    },
                    { name: 'Last name', field: SkillMatrix.Data.Lists.Freelancers.Columns.LastName },
                    { name: 'Email', field: SkillMatrix.Data.Lists.Freelancers.Columns.Email },
                    { name: 'Phone', field: SkillMatrix.Data.Lists.Freelancers.Columns.Phone },
                ],
               
                onRegisterApi: (gridApi) => {
                    $scope.gridApi = gridApi;
                    $scope.gridApi.core.on.sortChanged($scope, $scope.sortChanged);
                    $scope.sortChanged($scope.gridApi.grid, [$scope.gridOptions.columnDefs[1]]);
                }
            };

            //todos
            /*

            1. add navigation to grid item details form 
                or 
            2. expand grid for editing
            3. implement custom sorting -> pass $scope-bound sorting context to RequestBuilder

            */


            this.$scope.sortChanged = (grid: any, sortColumns: any[]) => {
                //TODO: custom sorting
                console.log('sort changed event');
            };
         
            repositoryService.GetFreelancers().
                success((response: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig): void => {

                    
                    this.$scope.freelancersData = response.d.results;
                    this.$scope.gridOptions.data = response.d.results;
                }).
                error((response: any, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig): void => {
                    console.log("Failed to resolve freelancers list " + response);
                });
        }

        Reset(form: ng.IFormController): void
        {
            if (null != form)
            {
                form.$setPristine();
                form.$setUntouched();
            }
        }

        canSave(): boolean {
            return this.$scope.newFreelancer.$valid;
        }
    }
}