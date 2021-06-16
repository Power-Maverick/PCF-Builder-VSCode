import * as vscode from "vscode";
import * as os from "os";
import * as path from "path";
import { ComponentPreviewPanel } from "./TestHarnessPanel";
import { PREVIEW_TASK_NAME, EXTENSION_NAME } from "../Helper/constants";
import { store } from "../Helper/Utils";

export class Preview {
    private _context: vscode.ExtensionContext;

    /**
     * Initialization constructor for VS Code Context
     */
    constructor(context: vscode.ExtensionContext) {
        this._context = context;
    }

    public async PreviewCodeComponent(tempDirUri: vscode.Uri) {
        vscode.window.showInformationMessage("PCF Builder: Previewing component");
        // The process event arrives before the generic terminate one
        vscode.tasks.onDidEndTaskProcess(async (e) => {
            if (e.execution.task.name === PREVIEW_TASK_NAME) {
                console.log("Build Process ends");
                await this.CopyOutput(tempDirUri);
            }
        });

        try {
            await this.ExecuteBuildTask();
        } catch (error) {
            console.error(error);
        }
    }

    public async CreateTempDirectory() {
        const scratchDirectory = path.join(os.tmpdir(), "pcf-builder");
        const dayjs = require("dayjs");
        const timestamp = dayjs().format("YYYYMMDD");
        const tempDirectory = path.join(scratchDirectory, timestamp);

        const uri = vscode.Uri.file(tempDirectory);
        await vscode.workspace.fs.createDirectory(uri);

        return uri;
    }

    private async CopyOutput(tempDirUri: vscode.Uri) {
        vscode.window.withProgress(
            {
                cancellable: false,
                location: vscode.ProgressLocation.Notification,
                title: "Copying necessary files",
            },
            async () => {
                if (store.controlName) {
                    if (vscode.workspace.workspaceFolders && tempDirUri) {
                        const workspaceFolder = vscode.workspace.workspaceFolders[0].uri;
                        await vscode.workspace.fs.copy(
                            vscode.Uri.joinPath(workspaceFolder, "out", "controls", store.controlName),
                            vscode.Uri.joinPath(tempDirUri, ""),
                            { overwrite: true },
                        );

                        // Copy required files & folders
                        const libFolderUri = vscode.Uri.joinPath(this._context.extensionUri, "bundle", "lib");
                        const harnessJsUri = vscode.Uri.joinPath(this._context.extensionUri, "bundle", "harness.js");
                        const locFolderUri = vscode.Uri.joinPath(this._context.extensionUri, "bundle", "loc");

                        if (vscode.workspace.workspaceFolders) {
                            await vscode.workspace.fs.copy(locFolderUri, vscode.Uri.joinPath(tempDirUri, "loc"), { overwrite: true });
                            await vscode.workspace.fs.copy(libFolderUri, vscode.Uri.joinPath(tempDirUri, "lib"), { overwrite: true });
                            await vscode.workspace.fs.copy(harnessJsUri, vscode.Uri.joinPath(tempDirUri, "harness.js"), { overwrite: true });
                        }

                        this.ShowWebView(tempDirUri);
                    }
                } else {
                    vscode.window.showErrorMessage("Unable to identify control name.");
                }
            },
        );
    }

    private async ShowWebView(tempDirUri: vscode.Uri) {
        if (vscode.workspace.workspaceFolders && tempDirUri) {
            ComponentPreviewPanel.CreateOrShow(tempDirUri, this._context.extensionUri);
        }
    }

    private async ExecuteBuildTask() {
        let wait500ms = async () =>
            await new Promise<void>((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 500);
            });
        vscode.window.withProgress(
            {
                cancellable: false,
                location: vscode.ProgressLocation.Notification,
                title: "Preparing the output",
            },
            async () => {
                const tasks = await vscode.tasks.fetchTasks();
                let buildTask: vscode.Task | undefined = undefined;
                let filteredTasks = tasks.filter((t) => t.name === PREVIEW_TASK_NAME);

                buildTask = filteredTasks.length > 0 ? filteredTasks[0] : undefined;

                if (buildTask) {
                    await vscode.tasks.executeTask(buildTask);
                }
                await wait500ms();
            },
        );
    }
}
