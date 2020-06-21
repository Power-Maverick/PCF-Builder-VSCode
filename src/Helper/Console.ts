import * as vscode from 'vscode';

export class Console {
    private static isTerminalCreated: boolean = false;
    private static pcfTerminal: vscode.Terminal;

    public static RunCommand(commands: string[]) {
        if (!this.isTerminalCreated) {
            this.pcfTerminal = vscode.window.createTerminal("PCF Builder");
            this.isTerminalCreated = true;
        }
        else {
            vscode.commands.executeCommand("workbench.action.terminal.clear");
        }
        
        this.pcfTerminal.show(false);

        commands.forEach(cmd => {
            this.pcfTerminal.sendText(cmd, true);
        });

    }
}