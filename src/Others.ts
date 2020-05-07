import * as vscode from 'vscode';
import { Console } from './Console';

export class Others {
    public static UpdatePcfCli() {
        vscode.window.showInformationMessage("PCF Builder: Update PCF CLI to latest");
    
        let commands: string[] = Array();
        commands.push(`pac install latest`);

        Console.RunCommand(commands);
    }
    
    public static async PcfPush() {
        vscode.window.showInformationMessage("PCF Builder: Quick PCF Push");
    
        let pcfTerminal: vscode.Terminal = vscode.window.createTerminal("PCF Builder");
        let pcfPushInputBoxOptions: vscode.InputBoxOptions = {
            placeHolder: "Publisher Prefix",
            prompt: "Enter publisher prefix for the control"
        };
        let pcfPushResponse: string | undefined = await vscode.window.showInputBox(pcfPushInputBoxOptions);

        if (!pcfPushResponse) {
            vscode.window.showErrorMessage("Index is required.");
            return;
        }

        let commands: string[] = Array();
        commands.push(`pac pcf push --publisher-prefix ${pcfPushResponse}`);

        Console.RunCommand(commands);
    }
    
    public static OrgDetails() {
        vscode.window.showInformationMessage("PCF Builder: Showing PCF Organization Details");
    
        let commands: string[] = Array();
        commands.push(`pac org who`);

        Console.RunCommand(commands);
    }
}