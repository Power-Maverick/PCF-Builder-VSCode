export class Snippets {
    // Data Types
    static SingleLine: string = "SingleLine.${1|Email,Phone,Text,TextArea,Ticker,URL|}";
    static Currency: string = "Currency";
    static DateAndTime: string = "DateAndTime.${1|DateAndTime,DateOnly|}";
    static Decimal: string = "Decimal";
    static Enum: string = "Enum";
    static FloatingPoint: string = "FP";
    static MultiLine: string = "Multiple";
    static OptionSet: string = "OptionSet";
    static TwoOptions: string = "TwoOptions";
    static WholeNumber: string = "Whole.None";

    // Resource Types
    static code: string = '<code path="${1}" order="${2}" />';
    static css: string = '<css path="css/${1}.css" order="${2}" />';
    static img: string = '<img path="${1}" />';
    static html: string = '<html path="html/${1}.html" order="${2}" />';
    static resx: string = '<resx path="strings/${1}.resx" version="${2}" />';

    // Feature Uses
    static Device: string = "Device.${1|captureAudio,captureImage,captureVideo,getBarcodeValue,getCurrentPosition,pickFile|}";
    static Utility: string = "Utility";
    static WebAPI: string = "WebAPI";
}