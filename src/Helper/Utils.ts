import * as vscode from "vscode";
import parse from "xml-parser";
import { TextDecoder, TextEncoder } from "util";
import { CONTROL_MANIFEST_FILENAME, EXTENSION_NAME } from "./constants";
import { observable } from "mobx";

export function byteArrayToString(value: Uint8Array) {
    return new TextDecoder().decode(value);
}

export function stringToByteArray(value: string) {
    return new TextEncoder().encode(value);
}

export async function checkForPCFWorkspace() {
    if (store.isPCF && store.outFolderExists) {
        return;
    }
    try {
        const folder = vscode.workspace.workspaceFolders?.[0];

        if (folder) {
            const pattern = new vscode.RelativePattern(folder, `**/${CONTROL_MANIFEST_FILENAME}`);
            const files = await vscode.workspace.findFiles(pattern, "{node_modules,out}", 1);

            if (files) {
                const contents = await vscode.workspace.fs.readFile(files[0]);
                const xmlContents = byteArrayToString(contents);

                let doc: parse.Document = parse(xmlContents);
                let controlName = doc.root.children[0].attributes["constructor"];

                store.controlName = controlName;
                store.isPCF = true;
            }

            const patternOutFolder = new vscode.RelativePattern(folder, `out`);
            const filesUnderOut = await vscode.workspace.findFiles(patternOutFolder, "{node_modules}", 1);
            if (filesUnderOut) {
                store.outFolderExists = true;
            }

            if (store.isPCF && store.outFolderExists) {
                await vscode.commands.executeCommand("setContext", `${EXTENSION_NAME}:isPCF`, true);
            }
        }
    } catch (e) {}
}

export interface PCFStore {
    isPCF?: boolean;
    controlName?: string;
    outFolderExists?: boolean;
}

export const store: PCFStore = observable({});
