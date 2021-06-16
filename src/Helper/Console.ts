import * as vscode from "vscode";
import { TERMINAL_NAME } from "./Constants";

export class Console {
    private static isTerminalCreated: boolean = false;
    private static pcfTerminal: vscode.Terminal;

    public static RunCommand(commands: string[], forPreview: boolean = false) {
        if (!this.isTerminalCreated) {
            this.pcfTerminal = vscode.window.createTerminal(TERMINAL_NAME);
            this.isTerminalCreated = true;
        } else {
            vscode.commands.executeCommand("workbench.action.terminal.clear");
        }

        this.pcfTerminal.show(false);

        commands.forEach((cmd) => {
            this.pcfTerminal.sendText(cmd, true);
        });
    }
}
