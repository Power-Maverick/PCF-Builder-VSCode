import * as vscode from 'vscode';
import { Console } from '../Helper/Console';
import { Placeholders } from '../Helper/Placeholders';

export class Others {
    private _context: vscode.ExtensionContext;

    /**
     * Initialization constructor for VS Code Context
     */
    constructor(context: vscode.ExtensionContext) {
        this._context = context;
    }

    public UpdatePcfCli() {
        vscode.window.showInformationMessage("PCF Builder: Update PCF CLI to latest");
    
        let commands: string[] = Array();
        commands.push(`pac install latest`);

        Console.RunCommand(commands);
    }
    
    public async PcfPush() {
        vscode.window.showInformationMessage("PCF Builder: Quick PCF Push");
    
        let savedPublisher: string | undefined = this._context.workspaceState.get(Placeholders.Publisher_Prefix);
        let pcfPushResponse: string | undefined;

        if (savedPublisher) {
            let pcfPushInputBoxOptions: vscode.InputBoxOptions = {
                placeHolder: "Press 'Escape' to reuse save publisher; else overwrite it here",
                prompt: "Saved Publisher Prefix is " + savedPublisher
            };
            pcfPushResponse = await vscode.window.showInputBox(pcfPushInputBoxOptions);
            if (!pcfPushResponse) {
                pcfPushResponse = savedPublisher;
            }

        }
        else {
            let pcfPushInputBoxOptions: vscode.InputBoxOptions = Placeholders.GetInputBoxOptions(Placeholders.Publisher_Prefix);
            pcfPushResponse = await vscode.window.showInputBox(pcfPushInputBoxOptions);
        }

        if (!pcfPushResponse) {
            vscode.window.showErrorMessage("Publisher prefix is required.");
            return;
        }
        if (pcfPushResponse.length > 6) {
            vscode.window.showErrorMessage("Publisher prefix length should be less than 6 characters.");
            return;
        }
        this._context.workspaceState.update(Placeholders.Publisher_Prefix, pcfPushResponse);

        let commands: string[] = Array();
        commands.push(`pac pcf push --publisher-prefix ${pcfPushResponse}`);

        Console.RunCommand(commands);
    }
    
    public OrgDetails() {
        vscode.window.showInformationMessage("PCF Builder: Showing PCF Organization Details");
    
        let commands: string[] = Array();
        commands.push(`pac org who`);

        Console.RunCommand(commands);
    }
}