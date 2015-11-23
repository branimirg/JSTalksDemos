module SkillMatrix {
    export class RequestBuilder {
        static baseUri: string = "web/lists/getByTitle('{list}')/items";
        static selector: string = "$select=";

        static GetListByTitle(title: string, columns: string[]): string {
            var res = RequestBuilder.baseUri.replace('{list}', title);
            res += RequestBuilder.appendFields(columns);

            return res;
        }

        static GetListByTitleListItemById(title: string, id: string, columns: string[]) : string {
            var res = RequestBuilder.baseUri.replace('{list}', title);
            res += "("+ id + ")"

            res += RequestBuilder.appendFields(columns);

            return res;
        }

        static appendFields(columns: string[]): string {
            var res = "?" + RequestBuilder.selector;

            if (null == columns || columns.length == 0)
                res += "*";

            for (var i = 0; i < columns.length; i++) {
                res += columns[i] + ','
            }

            if (res.endsWith(',')) {
                res = res.substr(0, res.length - 1);
            }

            return res;
        }
    }
}