import * as vscode from 'vscode';

export class NpmPackage implements vscode.QuickPickItem {
	constructor(label: string, packages: string) {
		this.label = label;
		this.packages = packages;
	}

	label: string;
	description?: string | undefined;
	detail?: string | undefined;
	picked?: boolean | undefined;
	alwaysShow?: boolean | undefined;
	packages: string;
}