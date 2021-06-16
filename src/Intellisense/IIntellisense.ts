import * as vscode from "vscode";

export interface IIntellisense {
    GetCompletionProvider(docSelector: vscode.DocumentSelector): vscode.Disposable;
}
