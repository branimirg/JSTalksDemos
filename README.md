# JSTalksDemos
Demo code for my presentation 'From backend to frontend development with TypeScript, Angular and Office 365'

Prerequisites:

You need an Office 365 Developer account in order to test this solution. You can get one from <a href="http://dev.office.com">http://dev.office.com/</a><br /><br />
At the moment of the release of this demo (23/11/2015) Microsoft has an offer for a Free One Year Subscription for Office 365 Developer.



<h1>About the project</h1>
<p>
    This project is a demo app with the following components:
    <ul>
        <li>Office 365/Sharepoint Online add-in - Sharepoint-hosted</li>
        <li>A demo app written in TypeScript and AngularJS 1.4.5</li>
        <li>RequireJS is used for loading of script dependencies async from CDN</li>
        <li>The solution uses Angular routing and partial views</li>
        <li>Service model implementation with custom Scope</li>
        <li>Form validation</li>
        <li>
            Extended scope with a 'delegate' method <br /><br />
            submit: Action&lt;void&gt; in order to avoid logic in the scope and not reference the controller in partial views
        </li>
        <li>A RequestBuilder helper for easier manipulation of REST queries against lists</li>
        <li>ngGrid with reference on external sorting</li>
        <li>New item form with form validation</li>
    </ul>
</p>

<h1>Known issues</h1>
<p>
    <ul>
        <li>Form reset acton errors out (new contact)</li>
    </ul>
</p>