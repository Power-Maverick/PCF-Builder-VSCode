import { Snippets } from "./Snippets";
import * as vscode from 'vscode';

export interface IFeatureUses {
    feature: string;
    snippet: string;
    kind: vscode.CompletionItemKind;
}

export class FeatureUses {
    static Device: string = "Device";
    static Utility: string = "Utility";
    static WebAPI: string = "WebAPI";

    public static GetTypes(): IFeatureUses[] {
        let types: IFeatureUses[] = [];
        types.push({ feature: this.Device, snippet: Snippets.Device, kind: vscode.CompletionItemKind.Enum });
        types.push({ feature: this.Utility, snippet: Snippets.Utility, kind: vscode.CompletionItemKind.Value });
        types.push({ feature: this.WebAPI, snippet: Snippets.WebAPI, kind: vscode.CompletionItemKind.Value });
        return types;
    }
}