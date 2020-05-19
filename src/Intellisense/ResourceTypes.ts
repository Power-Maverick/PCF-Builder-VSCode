import { Snippets } from "./Snippets";
import * as vscode from 'vscode';

export interface IResourceTypes {
    type: string;
    snippet: string;
}

export class ResourceTypes {
    static code: string = "code (pcf)";
    static css: string = "css (pcf)";
    static img: string = "img (pcf)";
    static html: string = "html (pcf)";
    static resx: string = "resx (pcf)";

    public static GetTypes(): IResourceTypes[] {
        let types: IResourceTypes[] = [];
        types.push({ type: this.code, snippet: Snippets.code });
        types.push({ type: this.css, snippet: Snippets.css });
        types.push({ type: this.img, snippet: Snippets.img });
        types.push({ type: this.html, snippet: Snippets.html });
        types.push({ type: this.resx, snippet: Snippets.resx });
        return types;
    }
}