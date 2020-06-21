
export class LanguageCode  {
    constructor(label: string, lcid: number, index: number) {
        this.name = label;
        this.value = lcid;
    }

    lcidString: string | undefined;
    name: string;
    value: number;
}