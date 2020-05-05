// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { NpmPackage } from './NpmPackage';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.init',
		InitializeControl
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.build',
		BuildControl
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.testwatch',
		TestWithWatchControl
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.testnowatch',
		TestWithNoWatchControl
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.updatePCFCLI',
		UpdatePcfCli
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.createProfile',
		CreateProfile
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.listProfile',
		ListProfile
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.deleteProfile',
		DeleteProfile
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.switchProfile',
		SwitchProfile
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.pcfPush',
		PcfPush
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.orgDetails',
		OrgDetails
	));
}

// this method is called when your extension is deactivated
export function deactivate() { }

async function InitializeControl() {
	vscode.window.showInformationMessage("PCF Builder: Initializing new PCF component");

	let namespaceInputBoxOptions: vscode.InputBoxOptions = {
		placeHolder: "Control Namespace",
		prompt: "Enter your preferred namespace for your control"
	};
	let userNamespace: string | undefined = await vscode.window.showInputBox(namespaceInputBoxOptions);

	if(!userNamespace){
		vscode.window.showErrorMessage("Namespace is required to initialize PCF Component.");
		return;
	}

	let controlNameInputBoxOptions: vscode.InputBoxOptions = {
		placeHolder: "Control Name",
		prompt: "Enter your control's name"
	};
	let userControlName: string | undefined = await vscode.window.showInputBox(controlNameInputBoxOptions);

	if(!userControlName){
		vscode.window.showErrorMessage("Control name is required to initialize PCF Component.");
		return;
	}

	let templateOptions: string[] = ["field", "dataset"];
	let userTemplate: string | undefined = await vscode.window.showQuickPick(templateOptions);

	if(!userTemplate){
		vscode.window.showErrorMessage("Template selection is required to initialize PCF Component.");
		return;
	}

	let npmPackages: NpmPackage[] = [
		{label: "React" ,packages: "react @types/react react-dom @types/react-dom"},
		{label: "React + Fluent UI", packages: "react @types/react react-dom @types/react-dom @fluentui/react"}
	];

	let userNpmPackagesQuickPickOptions: vscode.QuickPickOptions = {
		ignoreFocusOut: true,			
		placeHolder: "Pick additional libraries to install (Press 'Escape' to skip)"
	};

	let userNpmPackages: NpmPackage | undefined  = await vscode.window.showQuickPick(npmPackages, userNpmPackagesQuickPickOptions);

	let pcfTerminal: vscode.Terminal = vscode.window.createTerminal("PCF Builder");
	pcfTerminal.show(false);
	pcfTerminal.sendText("pac pcf init --namespace " + userNamespace + " --name " + userControlName + " --template " + userTemplate, true);
	pcfTerminal.sendText("npm install", true);

	// Install addition npm packages if selected
	if(userNpmPackages !== undefined){
		pcfTerminal.sendText("npm install " + userNpmPackages.packages, true);
	}
}

function BuildControl() {
	vscode.window.showInformationMessage("PCF Builder: Building component");

	let pcfTerminal: vscode.Terminal = vscode.window.createTerminal("PCF Builder");
	pcfTerminal.show(false);
	pcfTerminal.sendText("npm run build", true);
}

function TestWithWatchControl() {
	vscode.window.showInformationMessage("PCF Builder: Debugging component with Watch");

	let pcfTerminal: vscode.Terminal = vscode.window.createTerminal("PCF Builder");
	pcfTerminal.show(false);
	pcfTerminal.sendText("npm start watch", true);
}

function TestWithNoWatchControl() {
	vscode.window.showInformationMessage("PCF Builder: Debugging component with No-Watch");

	let pcfTerminal: vscode.Terminal = vscode.window.createTerminal("PCF Builder");
	pcfTerminal.show(false);
	pcfTerminal.sendText("npm start", true);
}

function UpdatePcfCli() {
	vscode.window.showInformationMessage("PCF Builder: Update PCF CLI to latest");

	let pcfTerminal: vscode.Terminal = vscode.window.createTerminal("PCF Builder");
	pcfTerminal.show(false);
	pcfTerminal.sendText("pac install latest", true);
}

function CreateProfile() {
	vscode.window.showInformationMessage("PCF Builder: Create Authentication Profile");

	let pcfTerminal: vscode.Terminal = vscode.window.createTerminal("PCF Builder");
	let createProfileInputBoxOptions: vscode.InputBoxOptions = {
		placeHolder: "URL (e.g.: https://yourdomain.crm.dynamics.com)",
		prompt: "Enter your CDS environment URL"
	};
	let createProfileResponse: Thenable<string | undefined> = vscode.window.showInputBox(createProfileInputBoxOptions);
	createProfileResponse.then((cp) => {
		if (cp) {
			pcfTerminal.show(false);
			pcfTerminal.sendText("pac auth create --url " + cp, true);
		}
		else {
			vscode.window.showErrorMessage("CDS environment URL is required.");
		}
	});
}

function ListProfile() {
	vscode.window.showInformationMessage("PCF Builder: Listing all Authentication Profile");

	let pcfTerminal: vscode.Terminal = vscode.window.createTerminal("PCF Builder");
	pcfTerminal.show(false);
	pcfTerminal.sendText("pac auth list", true);
}

function DeleteProfile() {
	vscode.window.showInformationMessage("PCF Builder: Delete Authentication Profile");

	let pcfTerminal: vscode.Terminal = vscode.window.createTerminal("PCF Builder");
	let profileInputBoxOptions: vscode.InputBoxOptions = {
		placeHolder: "Index number to delete",
		prompt: "Enter the index of the instance you want to delete"
	};
	let deleteProfileResponse: Thenable<string | undefined> = vscode.window.showInputBox(profileInputBoxOptions);
	deleteProfileResponse.then((pro) => {
		if (pro && !isNaN(Number(pro))) {
			pcfTerminal.show(false);
				pcfTerminal.sendText("pac auth delete --index " + pro, true);
		}
		else {
			vscode.window.showErrorMessage("Index is required and should be a number.");
		}
		
	});
}

function SwitchProfile() {
	vscode.window.showInformationMessage("PCF Builder: Switch Authentication Profile");

	let pcfTerminal: vscode.Terminal = vscode.window.createTerminal("PCF Builder");
	let profileInputBoxOptions: vscode.InputBoxOptions = {
		placeHolder: "Index number to make primary",
		prompt: "Enter the index of the instance you want to make primary"
	};
	let switchProfileResponse: Thenable<string | undefined> = vscode.window.showInputBox(profileInputBoxOptions);
	switchProfileResponse.then((pro) => {
		if (pro && !isNaN(Number(pro))) {
			pcfTerminal.show(false);
			pcfTerminal.sendText("pac auth select --index " + pro, true);
		}
		else {
			vscode.window.showErrorMessage("Index is required and should be a number.");
		}
		
	});
}

function PcfPush() {
	vscode.window.showInformationMessage("PCF Builder: Quick PCF Push");

	let pcfTerminal: vscode.Terminal = vscode.window.createTerminal("PCF Builder");
	let pcfPushInputBoxOptions: vscode.InputBoxOptions = {
		placeHolder: "Publisher Prefix",
		prompt: "Enter publisher prefix for the control"
	};
	let pcfPushResponse: Thenable<string | undefined> = vscode.window.showInputBox(pcfPushInputBoxOptions);
	pcfPushResponse.then((pp) => {
		if (pp) {
			pcfTerminal.show(false);
			pcfTerminal.sendText("pac pcf push --publisher-prefix " + pp, true);
		}
		else {
			vscode.window.showErrorMessage("Index is required.");
		}
		
	});
}

function OrgDetails() {
	vscode.window.showInformationMessage("PCF Builder: Showing PCF Organization Details");

	let pcfTerminal: vscode.Terminal = vscode.window.createTerminal("PCF Builder");
	pcfTerminal.show(false);
	pcfTerminal.sendText("pac org who", true);
}