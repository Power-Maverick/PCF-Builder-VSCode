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
    private _context: vscode.ExtensionContext;

    /**
     * Initialization constructor for VS Code Context
     */
    constructor(context: vscode.ExtensionContext) {
        this._context = context;
    }

    public async Force() {

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
        this._context.workspaceState.update(Placeholders.Control_Namespace, userNamespace);

        let controlNameInputBoxOptions: vscode.InputBoxOptions = Placeholders.GetInputBoxOptions(Placeholders.Control_Name);
        let userControlName: string | undefined = await vscode.window.showInputBox(controlNameInputBoxOptions);

        if (!userControlName) {
            vscode.window.showErrorMessage(ErrorMessages.ControlName_Required);
            return;
        }
        this._context.workspaceState.update(Placeholders.Control_Name, userControlName);

        let templateOptions: string[] = ["field", "dataset"];
        let templateOptionsQuickPickOptions: vscode.QuickPickOptions = Placeholders.GetQuickPickOptions(Placeholders.Control_TemplateType);
        let userTemplate: string | undefined = await vscode.window.showQuickPick(templateOptions, templateOptionsQuickPickOptions);

        if (!userTemplate) {
            vscode.window.showErrorMessage(ErrorMessages.ControlTemplate_Required);
            return;
        }
        this._context.workspaceState.update(Placeholders.Control_TemplateType, userTemplate);

        let npmPackagesOption: NpmPackage[] = [
            { label: "None", packages: "", index: 0 },
            { label: "React", packages: "react @types/react react-dom @types/react-dom", index: 1 },
            { label: "React + Fluent UI", packages: "react @types/react react-dom @types/react-dom @fluentui/react", index: 2 }
        ];

        let userNpmPackagesQuickPickOptions: vscode.QuickPickOptions = Placeholders.GetQuickPickOptions(Placeholders.NPM_Packages);
        let userNpmPackages: NpmPackage | undefined = await vscode.window.showQuickPick(npmPackagesOption, userNpmPackagesQuickPickOptions);

        let questionInitSolution: vscode.QuickPickOptions = Placeholders.GetQuickPickOptions(Placeholders.Init_Solution);
        let answerInitSolution: string | undefined = await vscode.window.showQuickPick(["Yes", "No"], questionInitSolution);

        if (!answerInitSolution && answerInitSolution === "Yes") {
            let ppInputBoxOptions: vscode.InputBoxOptions = Placeholders.GetInputBoxOptions(Placeholders.Publisher_Prefix);
            let pubPrefix: string | undefined = await vscode.window.showInputBox(ppInputBoxOptions);

            if (!pubPrefix || pubPrefix.length > 5) {
                vscode.window.showErrorMessage(ErrorMessages.PublisherPrefix_Required);
                return;
            }
            this._context.workspaceState.update(Placeholders.Publisher_Prefix, pubPrefix);

            let pnInputBoxOptions: vscode.InputBoxOptions = Placeholders.GetInputBoxOptions(Placeholders.Publisher_Name);
            let pubName: string | undefined = await vscode.window.showInputBox(pnInputBoxOptions);

            if (!pubName) {
                vscode.window.showErrorMessage(ErrorMessages.PublisherName_Required);
                return;
            }
            this._context.workspaceState.update(Placeholders.Publisher_Name, pubName);

            let commands: string[] = Array();
            commands.push(Commands.Force(userNamespace, userControlName, userTemplate, userNpmPackages?.index ?? 0, pubPrefix, pubName));

            Console.RunCommand(commands);
        }

        let commands: string[] = Array();
        commands.push(Commands.ForceWithSolutionSkip(userNamespace, userControlName, userTemplate, userNpmPackages?.index ?? 0));

        Console.RunCommand(commands);
    }

    public async AddResxFile() {
        vscode.window.showInformationMessage("PCF Builder: Adding new RESX file.");

        let savedControlName: string | undefined = this._context.workspaceState.get(Placeholders.Control_Name);

        if (!savedControlName) {
            let controlNameInputBoxOptions: vscode.InputBoxOptions = Placeholders.GetInputBoxOptions(Placeholders.Control_Name);
            let userControlName: string | undefined = await vscode.window.showInputBox(controlNameInputBoxOptions);

            if (!userControlName) {
                vscode.window.showErrorMessage(ErrorMessages.ControlName_Required);
                return;
            }
            savedControlName = userControlName;
            this._context.workspaceState.update(Placeholders.Control_Name, userControlName);
        }

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
        commands.push(Commands.AddResxFile(savedControlName, lcidQuickPick?.lcid));

        Console.RunCommand(commands);
    }

    public async AddGitHubAction() {
        vscode.window.showInformationMessage("PCF Builder: Adding GitHub Action.");

        let savedControlName: string | undefined = this._context.workspaceState.get(Placeholders.Control_Name);

        if (!savedControlName) {
            let controlNameInputBoxOptions: vscode.InputBoxOptions = Placeholders.GetInputBoxOptions(Placeholders.Control_Name);
            let userControlName: string | undefined = await vscode.window.showInputBox(controlNameInputBoxOptions);

            if (!userControlName) {
                vscode.window.showErrorMessage(ErrorMessages.ControlName_Required);
                return;
            }
            savedControlName = userControlName;
            this._context.workspaceState.update(Placeholders.Control_Name, userControlName);
        }

        let commands: string[] = Array();
        commands.push(Commands.AddGitHubAction(savedControlName));

        Console.RunCommand(commands);
    }

    public async GeneratoReadMe() {
        vscode.window.showInformationMessage("PCF Builder: Generating ReadMe file.");

        let savedControlName: string | undefined = this._context.workspaceState.get(Placeholders.Control_Name);

        if (!savedControlName) {
            let controlNameInputBoxOptions: vscode.InputBoxOptions = Placeholders.GetInputBoxOptions(Placeholders.Control_Name);
            let userControlName: string | undefined = await vscode.window.showInputBox(controlNameInputBoxOptions);

            if (!userControlName) {
                vscode.window.showErrorMessage(ErrorMessages.ControlName_Required);
                return;
            }
            savedControlName = userControlName;
            this._context.workspaceState.update(Placeholders.Control_Name, userControlName);
        }

        let savedGitHubName: string | undefined = this._context.workspaceState.get(Placeholders.GitHub_UserName);
        let savedGitHubRepo: string | undefined = this._context.workspaceState.get(Placeholders.GitHub_RepoName);

        if (!savedGitHubName) {
            let githubNameInputBoxOptions: vscode.InputBoxOptions = Placeholders.GetInputBoxOptions(Placeholders.GitHub_UserName);
            let githubName: string | undefined = await vscode.window.showInputBox(githubNameInputBoxOptions);

            if (!githubName) {
                vscode.window.showErrorMessage(ErrorMessages.GitHubName_Required);
                return;
            }
            savedGitHubName = githubName;
            this._context.workspaceState.update(Placeholders.GitHub_UserName, githubName);
        }

        if (!savedGitHubRepo) {
            let githubRepoInputBoxOptions: vscode.InputBoxOptions = Placeholders.GetInputBoxOptions(Placeholders.GitHub_RepoName);
            let githubRepo: string | undefined = await vscode.window.showInputBox(githubRepoInputBoxOptions);

            if (!githubRepo) {
                vscode.window.showErrorMessage(ErrorMessages.GitHubRepo_Required);
                return;
            }
            savedGitHubRepo = githubRepo;
            this._context.workspaceState.update(Placeholders.GitHub_RepoName, githubRepo);
        }

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
        commands.push(Commands.GenerateReadMe(savedControlName, savedGitHubName, savedGitHubRepo, lcidQuickPick?.lcid));

        Console.RunCommand(commands);
    }

}