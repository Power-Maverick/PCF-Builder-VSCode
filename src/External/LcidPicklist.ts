import * as vscode from "vscode";

export class LcidPicklist implements vscode.QuickPickItem {
    constructor(label: string, lcid: number, index: number) {
        this.label = label;
        this.lcid = lcid;
        this.index = index;
    }

    label: string;
    description?: string | undefined;
    detail?: string | undefined;
    picked?: boolean | undefined;
    alwaysShow?: boolean | undefined;
    lcid: number;
    index: number;
}
