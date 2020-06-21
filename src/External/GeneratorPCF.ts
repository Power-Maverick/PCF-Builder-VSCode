import * as vscode from 'vscode';
import { Console } from '../Helper/Console';
import { Commands } from '../Helper/Commands';
import { OpenUrl } from '../Helper/OpenUrl';
import { Placeholders } from '../Helper/Placeholders';
import { ErrorMessages } from '../Helper/ErrorMessages';
import { NpmPackage } from '../Helper/NpmPackage';
import { LanguageCode } from '../External/LanguageCode';
import { LcidPicklist } from './LcidPicklist';
import LangIds from "../Configs/lcid.json";

export class GeneratorPCF {

    public static async Force() {

        const btnBrowseGeneratorPCF: vscode.MessageItem = { title: 'Browse Generator PCF' };
        const urlGeneratorPCF: string = "https://www.npmjs.com/package/generator-pcf";

        vscode.window.showInformationMessage("PCF Builder: Running PCF Force Yeoman", btnBrowseGeneratorPCF).then(async (result: vscode.MessageItem | undefined) => {
            if (result === btnBrowseGeneratorPCF) {
                await OpenUrl(urlGeneratorPCF);
            }
        });

        let namespaceInputBoxOptions: vscode.InputBoxOptions = Placeholders.GetInputBoxOptions(Placeholders.Control_Namespace);
        let userNamespace: string | undefined = await vscode.window.showInputBox(namespaceInputBoxOptions);

        if (!userNamespace) {
            vscode.window.showErrorMessage(ErrorMessages.ControlNamespace_Required);
            return;
        }

        let controlNameInputBoxOptions: vscode.InputBoxOptions = Placeholders.GetInputBoxOptions(Placeholders.Control_Name);
        let userControlName: string | undefined = await vscode.window.showInputBox(controlNameInputBoxOptions);

        if (!userControlName) {
            vscode.window.showErrorMessage(ErrorMessages.ControlName_Required);
            return;
        }

        let templateOptions: string[] = ["field", "dataset"];
        let templateOptionsQuickPickOptions: vscode.QuickPickOptions = Placeholders.GetQuickPickOptions(Placeholders.Control_TemplateType);
        let userTemplate: string | undefined = await vscode.window.showQuickPick(templateOptions, templateOptionsQuickPickOptions);

        if (!userTemplate) {
            vscode.window.showErrorMessage(ErrorMessages.ControlTemplate_Required);
            return;
        }

        let npmPackagesOption: NpmPackage[] = [
            { label: "None", packages: "", index: 0 },
            { label: "React", packages: "react @types/react react-dom @types/react-dom", index: 1 },
            { label: "React + Fluent UI", packages: "react @types/react react-dom @types/react-dom @fluentui/react", index: 2 }
        ];

        let userNpmPackagesQuickPickOptions: vscode.QuickPickOptions = Placeholders.GetQuickPickOptions(Placeholders.NPM_Packages);
        let userNpmPackages: NpmPackage | undefined = await vscode.window.showQuickPick(npmPackagesOption, userNpmPackagesQuickPickOptions);

        let ppInputBoxOptions: vscode.InputBoxOptions = Placeholders.GetInputBoxOptions(Placeholders.Publisher_Prefix);
        let pubPrefix: string | undefined = await vscode.window.showInputBox(ppInputBoxOptions);

        if (!pubPrefix || pubPrefix.length > 5) {
            vscode.window.showErrorMessage(ErrorMessages.PublisherPrefix_Required);
            return;
        }

        let pnInputBoxOptions: vscode.InputBoxOptions = Placeholders.GetInputBoxOptions(Placeholders.Publisher_Name);
        let pubName: string | undefined = await vscode.window.showInputBox(pnInputBoxOptions);

        if (!pubName) {
            vscode.window.showErrorMessage(ErrorMessages.PublisherName_Required);
            return;
        }

        let commands: string[] = Array();
        commands.push(Commands.Force(userNamespace, userControlName, userTemplate, userNpmPackages?.index ?? 0, pubPrefix, pubName));

        Console.RunCommand(commands);
    }

    public static async AddResxFile(folderUri: string) {
        vscode.window.showInformationMessage("PCF Builder: Adding new RESX file.");

        let langCodeArray: LanguageCode[] = [];
        let langCodes = Object.assign(langCodeArray, LangIds);
        let lcids: LcidPicklist[] = [];
        langCodes.forEach((lc, index) => {
            let newLcid = new LcidPicklist(lc.name, lc.value, index);
            lcids.push(newLcid);
        });

        let lcidQuickPickOptions: vscode.QuickPickOptions = Placeholders.GetQuickPickOptions(Placeholders.LCIDs);
        let lcidQuickPick: LcidPicklist | undefined = await vscode.window.showQuickPick(lcids, lcidQuickPickOptions);

        let commands: string[] = Array();
        commands.push(Commands.AddResxFile(lcidQuickPick?.lcid));

        Console.RunCommand(commands);
    }
}