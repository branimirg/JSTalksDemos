module SkillMatrix.Services
{
    export interface IDataRepository
    {
        GetData(query: string): angular.IHttpPromise<{}>;
        GetFreelancers(): angular.IHttpPromise<{}>;
        CreateContact(userData: any): void;
    }

    export class DataRepositoryService {
        private requestDigest: any;

        constructor(private $http: angular.IHttpService) {
            
        }

        CreateContact(userData: any): void
        {
            var requestBody = null;

            this.$http({
                method: 'POST',
                url: "../_api/contextinfo",
                headers: { "Accept": "application/json; odata=verbose" }
            }).
            success((data : any) =>
            {
                this.requestDigest = data.d.GetContextWebInformation.FormDigestValue;
            })
            .then(() => {
                var restQueryUrl = "../_api/web/lists/getByTitle('Freelancers')/items";
                var customerData = {
                    __metadata: { "type": "SP.Data.FreelancersListItem" },
                    Title: userData.Title,
                    FirstName: userData.FirstName,
                    Company: userData.Company,
                    WorkPhone: userData.WorkPhone,
                    HomePhone: userData.HomePhone,
                    Email: userData.Email,
                    CellPhone: userData.CellPhone,
                    Comments: userData.Comments
                };

                requestBody = JSON.stringify(customerData);
                return this.$http.post(restQueryUrl, requestBody, this.createRequestParams(restQueryUrl, requestBody));
            })
            .catch((err) =>
            {
                console.error("Failed to create new contact: " + requestBody);
                console.log(err);
                throw err;
            });
        }

        createRequestParams(url: string, data: string ): any {
            return {
                method: 'POST',
                url: url,
                contentType: "application/json;odata=verbose",
                data: data,
                headers: {
                    "Accept": "application/json; odata=verbose",
                    "X-RequestDigest": this.requestDigest,
                    "content-type": "application/json;odata=verbose",
                    }
            };
        }

        freelancerColumns : string[] = 
            [
                Data.Lists.Freelancers.Columns.Id,
                Data.Lists.Freelancers.Columns.LastName,
                Data.Lists.Freelancers.Columns.FirstName,
                Data.Lists.Freelancers.Columns.Phone,
                Data.Lists.Freelancers.Columns.Email
            ];

        GetFreelancers(): angular.IHttpPromise<{}>
        {
            return this.GetData(RequestBuilder.GetListByTitle('Freelancers', this.freelancerColumns));
        }

        GetFreelancer(id: string): ng.IHttpPromise<{}> {
            return this.GetData(RequestBuilder.GetListByTitleListItemById('Freelancers', id, this.freelancerColumns));
        }

        GetData(query : string): angular.IHttpPromise<{}> {
            var restQueryUrl = "../_api/" + query;
            return this.$http({
                method: 'GET',
                url: restQueryUrl,
                headers: { "Accept": "application/json; odata=verbose" }
            });
        }
    }
}