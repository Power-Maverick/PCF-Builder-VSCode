// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { AuthProfiles } from './Core/AuthProfiles';
import { Controls } from './Core/Controls';
import { Others } from './Core/Others';
import { Manifest } from './Intellisense/Manifest';
import { GeneratorPCF } from './External/GeneratorPCF';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let docSelector: vscode.DocumentSelector = { scheme: 'file', language: 'xml' };
	let manifestCompletionProvider = (new Manifest(docSelector)).GetCompletionProvider();

	context.subscriptions.push(manifestCompletionProvider);
	
	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.init',
		Controls.InitializeControl
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.build',
		Controls.BuildControl
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.testwatch',
		Controls.TestWithWatchControl
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.testnowatch',
		Controls.TestWithNoWatchControl
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.updatePCFCLI',
		Others.UpdatePcfCli
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.createProfile',
		AuthProfiles.CreateProfile
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.listProfile',
		AuthProfiles.ListProfile
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.deleteProfile',
		AuthProfiles.DeleteProfile
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.switchProfile',
		AuthProfiles.SwitchProfile
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.pcfPush',
		Others.PcfPush
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.orgDetails',
		Others.OrgDetails
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.forcePCF',
		GeneratorPCF.Force
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.addRESX',
		GeneratorPCF.AddResxFile
	));
}

// this method is called when your extension is deactivated
export function deactivate() { }
