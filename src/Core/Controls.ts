import * as vscode from 'vscode';
import { NpmPackage } from '../Helper/NpmPackage';
import { Console } from '../Helper/Console';
import { Placeholders } from '../Helper/Placeholders';
import { ErrorMessages } from '../Helper/ErrorMessages';
import { Commands } from '../Helper/Commands';

export class Controls {

    public static async InitializeControl() {
        vscode.window.showInformationMessage("PCF Builder: Initializing new PCF component");

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

        let commands: string[] = Array();
        commands.push(Commands.PacPcfInit(userNamespace, userControlName, userTemplate));
        commands.push(Commands.NpmInstall());

        if (userNpmPackages !== undefined && userNpmPackages.label !== "None") {
            commands.push(Commands.NpmInstall(userNpmPackages.packages));
        }

        Console.RunCommand(commands);
    }

    public static BuildControl() {
        vscode.window.showInformationMessage("PCF Builder: Building component");

        let commands: string[] = Array();
        commands.push(Commands.NpmBuild());

        Console.RunCommand(commands);
    }

    public static TestWithWatchControl() {
        vscode.window.showInformationMessage("PCF Builder: Debugging component with Watch");

        let commands: string[] = Array();
        commands.push(Commands.NpmStart(true));

        Console.RunCommand(commands);
    }

    public static TestWithNoWatchControl() {
        vscode.window.showInformationMessage("PCF Builder: Debugging component with No-Watch");

        let commands: string[] = Array();
        commands.push(Commands.NpmStart());

        Console.RunCommand(commands);
    }
    
}