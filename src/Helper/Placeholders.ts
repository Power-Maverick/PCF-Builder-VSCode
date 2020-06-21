import * as vscode from 'vscode';

interface IPlaceholder {
    placeHolderText: string;
	prompt: string;
}

export class Placeholders {
    public static GetInputBoxOptions(placeholder: string) {
        let inbOptions: vscode.InputBoxOptions;

        switch (placeholder) {
            case this.CDS_Environment_URL:
                inbOptions = { placeHolder: this.ipCDSEnvironmentURL.placeHolderText, prompt: this.ipCDSEnvironmentURL.prompt };
                break;
            case this.Profile_Delete:
                inbOptions = { placeHolder: this.ipDeleteProfile.placeHolderText, prompt: this.ipDeleteProfile.prompt };
                break;
            case this.Profile_Switch:
                inbOptions = { placeHolder: this.ipSwitchProfile.placeHolderText, prompt: this.ipSwitchProfile.prompt };
                break;
            case this.Control_Namespace:
                inbOptions = { placeHolder: this.ipControlNamespace.placeHolderText, prompt: this.ipControlNamespace.prompt };
                break;
            case this.Control_Name:
                inbOptions = { placeHolder: this.ipControlName.placeHolderText, prompt: this.ipControlName.prompt };
                break;
            case this.Publisher_Prefix:
                inbOptions = { placeHolder: this.ipPublisherPrefix.placeHolderText, prompt: this.ipPublisherPrefix.prompt };
                break;
            case this.Publisher_Name:
                inbOptions = { placeHolder: this.ipPublisherName.placeHolderText, prompt: this.ipPublisherName.prompt };
                break;
        
            default:
                inbOptions = { placeHolder: "", prompt: "" };
                break;
        }

        return inbOptions;
    }

    public static GetQuickPickOptions(placeholder: string, ignoreFocus: boolean = true) {
        let qpOptions: vscode.QuickPickOptions;

        switch (placeholder) {
            case this.Control_TemplateType:
                qpOptions = { placeHolder: this.ipFieldType.placeHolderText, ignoreFocusOut: ignoreFocus };
                break;
            case this.NPM_Packages:
                qpOptions = { placeHolder: this.ipNpmPackage.placeHolderText, ignoreFocusOut: ignoreFocus };
                break;
            case this.LCIDs:
                qpOptions = { placeHolder: this.ipLcids.placeHolderText, ignoreFocusOut: ignoreFocus };
                break;
            
            default:
                qpOptions = { placeHolder: "", ignoreFocusOut: ignoreFocus };
                break;
        }

        return qpOptions;
    }

    public static CDS_Environment_URL: string = "CDS_Environment_URL";
    public static Profile_Delete: string = "Profile_Delete";
    public static Profile_Switch: string = "Profile_Switch";
    public static Control_Namespace: string = "Control_Namespace";
    public static Control_Name: string = "Control_Name";
    public static Control_TemplateType: string = "Control_TemplateType";
    public static NPM_Packages: string = "NPM_Packages";
    public static Publisher_Prefix: string = "Publisher_Prefix";
    public static Publisher_Name: string = "Publisher_Name";
    public static LCIDs: string = "LCIDs";

    private static ipCDSEnvironmentURL: IPlaceholder = { placeHolderText: "URL (e.g.: https://yourdomain.crm.dynamics.com)", prompt: "Enter your CDS environment URL" };
    private static ipDeleteProfile: IPlaceholder = { placeHolderText: "Index number to delete", prompt: "Enter the index of the instance you want to delete" };
    private static ipSwitchProfile: IPlaceholder = { placeHolderText: "Index number to make primary", prompt: "Enter the index of the instance you want to make primary" };

    private static ipControlNamespace: IPlaceholder = { placeHolderText: "Namespace for your control", prompt: "Enter your preferred namespace for your control" };
    private static ipControlName: IPlaceholder = { placeHolderText: "Control Name", prompt: "Enter your control's name" };
    private static ipFieldType: IPlaceholder = { placeHolderText: "Pick template for your project", prompt: "" };
    private static ipNpmPackage: IPlaceholder = { placeHolderText: "Pick additional libraries to install (Press 'Escape' to skip)", prompt: "" };
    private static ipPublisherPrefix: IPlaceholder = { placeHolderText: "Publisher Prefix for your CDS solution. Less than 5 characters.", prompt: "Enter your preferred publisher prefix that will be applied for your CDS solution" };
    private static ipPublisherName: IPlaceholder = { placeHolderText: "Publisher Name for your CDS solution", prompt: "Enter your preferred publisher name that will be applied for your CDS solution" };

    private static ipLcids: IPlaceholder = { placeHolderText: "Select your language", prompt: "" };
}