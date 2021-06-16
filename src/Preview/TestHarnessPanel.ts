import * as vscode from "vscode";

export class ComponentPreviewPanel {
    public static currentPanel: ComponentPreviewPanel | undefined;

    private readonly webViewPanel: vscode.WebviewPanel;
    private readonly tempDirectoryUri: vscode.Uri;
    private readonly extensionUri: vscode.Uri;
    private disposables: vscode.Disposable[] = [];

    public static async CreateOrShow(tempDirUri: vscode.Uri, extensionUri: vscode.Uri) {
        const column = vscode.window.activeTextEditor ? vscode.ViewColumn.Beside : vscode.ViewColumn.One;

        // If we already have a panel, show it
        if (ComponentPreviewPanel.currentPanel) {
            ComponentPreviewPanel.currentPanel.webViewPanel.reveal(column);
            return;
        }

        // Otherwise, create a new panel.
        const panel = vscode.window.createWebviewPanel(
            "pcf-builder.preview",
            "Preview Code Component",
            column || vscode.ViewColumn.One,
            getWebviewOptions(extensionUri, tempDirUri),
        );

        ComponentPreviewPanel.currentPanel = new ComponentPreviewPanel(panel, tempDirUri, extensionUri);
    }

    private constructor(panel: vscode.WebviewPanel, tempDirUri: vscode.Uri, extensionUri: vscode.Uri) {
        this.webViewPanel = panel;
        this.extensionUri = extensionUri;
        this.tempDirectoryUri = tempDirUri;

        // Set the webview's initial html content
        this.update();

        // Listen for when the panel is disposed
        // This happens when the user closes the panel or when the panel is closed programmatically
        this.webViewPanel.onDidDispose(() => this.dispose(), null, this.disposables);

        // Update the content based on view changes
        this.webViewPanel.onDidChangeViewState(
            (e) => {
                if (this.webViewPanel.visible) {
                    this.update();
                }
            },
            null,
            this.disposables,
        );

        // Handle messages from the webview
        this.webViewPanel.webview.onDidReceiveMessage(({ command, value }) => {
            switch (command) {
                case "alert":
                    if (value) {
                        vscode.window.showInformationMessage(value);
                    }
                    break;
            }
        });
    }

    public dispose() {
        ComponentPreviewPanel.currentPanel = undefined;

        // Clean up our resources
        this.webViewPanel.dispose();

        while (this.disposables.length) {
            const x = this.disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }

    private update() {
        const webview = this.webViewPanel.webview;
        this.webViewPanel.webview.html = this._getHtmlForWebview(webview, this.tempDirectoryUri);
    }

    private _getHtmlForWebview(webview: vscode.Webview, tempDirPath: vscode.Uri) {
        const baseUrl = webview.asWebviewUri(vscode.Uri.joinPath(tempDirPath, "/"));

        return `<!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <base href="${baseUrl}" />
                        <title>PCF Control Sandbox</title>
                        <script type="text/javascript" src="lib/es6-shim.min.js"></script>
                        <script type="text/javascript" src="lib/bluebird.min.js"></script>
                        <script type="text/javascript" src="lib/pep.js"></script>
                        <script type="text/javascript" src="lib/react.production.min.js"></script>
                        <script type="text/javascript" src="lib/react-dom.production.min.js"></script>
                        <!--<script type="text/javascript" src="http://livejs.com/live.js"></script>-->
                    </head>
                    <body>
                        <div id="app-root"></div>
                        <script type="text/javascript" src="harness.js"></script>
                        <script type="text/javascript">
                            // <![CDATA[  <-- For SVG support
                            if ('WebSocket' in window) {
                                (function() {
                                    function refreshCSS() {
                                        var sheets = [].slice.call(document.getElementsByTagName("link"));
                                        var head = document.getElementsByTagName("head")[0];
                                        for (var i = 0; i < sheets.length; ++i) {
                                            var elem = sheets[i];
                                            head.removeChild(elem);
                                            var rel = elem.rel;
                                            if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
                                                var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
                                                elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
                                            }
                                            head.appendChild(elem);
                                        }
                                    }
                                    var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
                                    var address = protocol + window.location.host + window.location.pathname + '/ws';
                                    var socket = new WebSocket(address);
                                    socket.onmessage = function(msg) {
                                        if (msg.data == 'reload') window.location.reload();
                                        else if (msg.data == 'refreshcss') refreshCSS();
                                    };
                                    console.log('Live reload enabled.');
                                })();
                            }
                        </script>
                    </body>
                </html>`;
    }
}

function getWebviewOptions(extensionUri: vscode.Uri, tempDirUri: vscode.Uri): vscode.WebviewOptions {
    return {
        // Enable javascript in the webview
        enableScripts: true,
        enableCommandUris: true,

        // And restrict the webview to only loading content from our extension's `test-harness` directory.
        localResourceRoots: [vscode.Uri.joinPath(extensionUri, "lib"), tempDirUri, vscode.Uri.parse("pcf-builder:/")],
    };
}
