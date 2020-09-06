import * as vscode from 'vscode';
import { Console } from '../Helper/Console';
import { Placeholders } from '../Helper/Placeholders';
import { ErrorMessages } from '../Helper/ErrorMessages';
import { Commands } from '../Helper/Commands';

export class AuthProfiles {
    private _context: vscode.ExtensionContext;

    /**
     * Initialization constructor for VS Code Context
     */
    constructor(context: vscode.ExtensionContext) {
        this._context = context;
    }

	public ListProfile() {
        vscode.window.showInformationMessage("PCF Builder: Listing all Authentication Profile");
    
        let commands: string[] = Array();
        commands.push(Commands.PacAuthList());

        Console.RunCommand(commands);
    }

    public async CreateProfile() {
        vscode.window.showInformationMessage("PCF Builder: Create Authentication Profile");
    
        let createProfileInputBoxOptions: vscode.InputBoxOptions = Placeholders.GetInputBoxOptions(Placeholders.CDS_Environment_URL);
        let createProfileResponse: string | undefined = await vscode.window.showInputBox(createProfileInputBoxOptions);

        if (!createProfileResponse) {
            vscode.window.showErrorMessage(ErrorMessages.CDS_Environment_URL_Required);
            return;
        }

        let commands: string[] = Array();
        commands.push(Commands.PacCreateProfile(createProfileResponse));
        Console.RunCommand(commands);
    }

    public async DeleteProfile() {
        vscode.window.showInformationMessage("PCF Builder: Delete Authentication Profile");
    
        let profileInputBoxOptions: vscode.InputBoxOptions = Placeholders.GetInputBoxOptions(Placeholders.Profile_Delete);
        let deleteProfileResponse: string | undefined = await vscode.window.showInputBox(profileInputBoxOptions);

        if (!deleteProfileResponse) {
            vscode.window.showErrorMessage(ErrorMessages.IndexNumber_Required);
            return;
        }

        let commands: string[] = Array();
        commands.push(Commands.PacDeleteProfile(deleteProfileResponse));

        Console.RunCommand(commands);
    }

    public async SwitchProfile() {
        vscode.window.showInformationMessage("PCF Builder: Switch Authentication Profile");
    
        let profileInputBoxOptions: vscode.InputBoxOptions = Placeholders.GetInputBoxOptions(Placeholders.Profile_Switch);
        let switchProfileResponse: string | undefined = await vscode.window.showInputBox(profileInputBoxOptions);

        if (!switchProfileResponse) {
            vscode.window.showErrorMessage(ErrorMessages.IndexNumber_Required);
            return;
        }

        let commands: string[] = Array();
        commands.push(Commands.PacSwitchProfile(switchProfileResponse));

        Console.RunCommand(commands);
    }
}