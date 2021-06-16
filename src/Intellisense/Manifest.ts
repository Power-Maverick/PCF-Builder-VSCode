import * as vscode from "vscode";
import { IIntellisense } from "./IIntellisense";
import { DataTypes } from "./DataTypes";
import { ResourceTypes } from "./ResourceTypes";
import { FeatureUses } from "./FeatureUses";

export class Manifest implements IIntellisense {
    docSelector: vscode.DocumentSelector;

    constructor(ds: vscode.DocumentSelector) {
        this.docSelector = ds;
    }

    public GetCompletionProvider(): vscode.Disposable {
        let manifestCompletionProvider = vscode.languages.registerCompletionItemProvider(this.docSelector, {
            provideCompletionItems(
                document: vscode.TextDocument,
                position: vscode.Position,
                token: vscode.CancellationToken,
                context: vscode.CompletionContext,
            ) {
                const completionList = new vscode.CompletionList();

                // Property
                const snipProperty = new vscode.CompletionItem("property", vscode.CompletionItemKind.Property);
                snipProperty.insertText = new vscode.SnippetString(
                    '<property name="${1}" display-name-key="${2}" description-key="${3}" of-type="${4}" usage="${5|bound,input|}" required="${6|true,false|}" />',
                );
                snipProperty.documentation = new vscode.MarkdownString(
                    "Property node identifies a specific, configurable piece of data that the control expects from CDS.",
                );
                //snipProperty.command = { command: 'editor.action.triggerSuggest', title: 'PCF Builder: Trigger Suggest' };
                completionList.items.push(snipProperty);

                // Type Group
                const snipTypeGroup = new vscode.CompletionItem("type-group", vscode.CompletionItemKind.Property);
                snipTypeGroup.insertText = new vscode.SnippetString(
                    '<type-group name="${1}">\n\t<type>${2}</type>\n</type-group>',
                );
                snipTypeGroup.documentation = new vscode.MarkdownString(
                    "Group multiple types on a property using of-type-group.",
                );
                completionList.items.push(snipTypeGroup);

                // Type
                const snipType = new vscode.CompletionItem("type", vscode.CompletionItemKind.Property);
                snipType.insertText = new vscode.SnippetString("<type>${1}</type>");
                snipType.documentation = new vscode.MarkdownString("Type, used to define the type-group.");
                completionList.items.push(snipType);

                // Resources
                const snipResources = new vscode.CompletionItem("resources", vscode.CompletionItemKind.Property);
                snipResources.insertText = new vscode.SnippetString(
                    '<resources>\n\t<code path="index.ts" order="1" />\n</resources>',
                );
                snipResources.documentation = new vscode.MarkdownString(
                    "The resources node in the component manifest refers to the resource file that components require to implement it's visualization.",
                );
                completionList.items.push(snipResources);

                // Features
                const snipFeatures = new vscode.CompletionItem("feature-usage", vscode.CompletionItemKind.Property);
                snipFeatures.insertText = new vscode.SnippetString(
                    '<feature-usage>\n\t<uses-feature name="${1}" required="${2|true,false|}" />\n</feature-usage>',
                );
                snipFeatures.documentation = new vscode.MarkdownString(
                    "Allow developers to declare which features their component wants to use.",
                );
                completionList.items.push(snipFeatures);

                // Feature Uses
                const snipFeatureUses = new vscode.CompletionItem("uses-feature", vscode.CompletionItemKind.Property);
                snipFeatureUses.insertText = new vscode.SnippetString(
                    '<uses-feature name="${1}" required="${2|true,false|}" />',
                );
                snipFeatureUses.documentation = new vscode.MarkdownString(
                    "Indicates which feature their components want to use.",
                );
                completionList.items.push(snipFeatureUses);

                // Add all supported data types
                DataTypes.GetTypes().forEach((t) => {
                    const snip = new vscode.CompletionItem(t.type, t.kind);
                    snip.insertText = new vscode.SnippetString(t.snippet);
                    completionList.items.push(snip);
                });

                // Add all supported resource types
                ResourceTypes.GetTypes().forEach((t) => {
                    const snip = new vscode.CompletionItem(t.type);
                    snip.insertText = new vscode.SnippetString(t.snippet);
                    completionList.items.push(snip);
                });

                // Add all supported feature uses
                FeatureUses.GetTypes().forEach((t) => {
                    const snip = new vscode.CompletionItem(t.feature);
                    snip.insertText = new vscode.SnippetString(t.snippet);
                    completionList.items.push(snip);
                });

                // return all completion items as array
                return completionList;
            },
        });

        return manifestCompletionProvider;
    }
}
