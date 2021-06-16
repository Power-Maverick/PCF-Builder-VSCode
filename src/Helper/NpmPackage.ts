import * as vscode from "vscode";

export class NpmPackage implements vscode.QuickPickItem {
    constructor(label: string, packages: string, index: number) {
        this.label = label;
        this.packages = packages;
        this.index = index;
    }

    label: string;
    description?: string | undefined;
    detail?: string | undefined;
    picked?: boolean | undefined;
    alwaysShow?: boolean | undefined;
    packages: string;
    index: number;
}
