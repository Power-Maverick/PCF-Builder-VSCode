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

	let controls = new Controls(context);
	let authProfiles = new AuthProfiles(context);
	let other = new Others(context);
	let generatorPcf = new GeneratorPCF(context);
	
	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.init',
		() => {
			controls.InitializeControl();
		}
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.build',
		() => {
			controls.BuildControl();
		}
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.testwatch',
		() => {
			controls.TestWithWatchControl();
		}
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.testnowatch',
		() => {
			controls.TestWithNoWatchControl();
		}
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.updatePCFCLI',
		() => {
			other.UpdatePcfCli();
		}
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.createProfile',
		() => {
			authProfiles.CreateProfile();
		}
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.listProfile',
		() => {
			authProfiles.ListProfile();
		}
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.deleteProfile',
		() => {
			authProfiles.DeleteProfile();
		}
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.switchProfile',
		() => {
			authProfiles.SwitchProfile();
		}
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.pcfPush',
		() => {
			other.PcfPush();
		}
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.orgDetails',
		() => {
			other.OrgDetails();
		}
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.forcePCF',
		() => {
			generatorPcf.Force();
		}
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.addRESX',
		(args) => {
			generatorPcf.AddResxFile();
		}
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.addGitHubAction',
		(args) => {
			generatorPcf.AddGitHubAction();
		}
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'pcf-builder.generateReadMe',
		(args) => {
			generatorPcf.GeneratoReadMe();
		}
	));
}

// this method is called when your extension is deactivated
export function deactivate() { }
