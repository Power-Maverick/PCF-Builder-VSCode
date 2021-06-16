import { commands, Uri } from "vscode";

export async function OpenUrl(url: string): Promise<void> {
    await commands.executeCommand("vscode.open", Uri.parse(url));
}
