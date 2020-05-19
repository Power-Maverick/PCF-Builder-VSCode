import { Snippets } from "./Snippets";
import * as vscode from 'vscode';

export interface IDataTypes {
    type: string;
    snippet: string;
    kind: vscode.CompletionItemKind;
}

export class DataTypes {
    static SingleLine: string = "SingleLine";
    static Currency: string = "Currency";
    static DateAndTime: string = "DateAndTime";
    static Decimal: string = "Decimal";
    static Enum: string = "Enum";
    static FloatingPoint: string = "FP";
    static MultiLine: string = "Multiple";
    static OptionSet: string = "OptionSet";
    static TwoOptions: string = "TwoOptions";
    static WholeNumber: string = "Whole.None";

    public static GetTypes(): IDataTypes[] {
        let types: IDataTypes[] = [];
        types.push({ type: this.SingleLine, snippet: Snippets.SingleLine, kind: vscode.CompletionItemKind.Enum });
        types.push({ type: this.Currency, snippet: Snippets.Currency, kind: vscode.CompletionItemKind.Value });
        types.push({ type: this.DateAndTime, snippet: Snippets.DateAndTime, kind: vscode.CompletionItemKind.Enum });
        types.push({ type: this.Decimal, snippet: Snippets.Decimal, kind: vscode.CompletionItemKind.Value });
        types.push({ type: this.Enum, snippet: Snippets.Enum, kind: vscode.CompletionItemKind.Value });
        types.push({ type: this.FloatingPoint, snippet: Snippets.FloatingPoint, kind: vscode.CompletionItemKind.Value });
        types.push({ type: this.MultiLine, snippet: Snippets.MultiLine, kind: vscode.CompletionItemKind.Value });
        types.push({ type: this.OptionSet, snippet: Snippets.OptionSet, kind: vscode.CompletionItemKind.Value });
        types.push({ type: this.TwoOptions, snippet: Snippets.TwoOptions, kind: vscode.CompletionItemKind.Value });
        types.push({ type: this.WholeNumber, snippet: Snippets.WholeNumber, kind: vscode.CompletionItemKind.Value });
        return types;
    }
}