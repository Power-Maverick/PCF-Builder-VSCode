export class Commands {
    //public static PacAuthList: string = "pac auth list";

    public static PacAuthList() {
        return `pac auth list`;
    }

    public static PacCreateProfile(pro: string) {
        return `pac auth create --url ${pro}`;    
    }

    public static PacDeleteProfile(pro: string) {
        return `pac auth delete --index ${pro}`;    
    }

    public static PacSwitchProfile(pro: string) {
        return `pac auth select --index ${pro}`;    
    }

    public static PacPcfInit(userNamespace: string, userControlName: string, userTemplate: string) {
        return `pac pcf init --namespace ${userNamespace} --name ${userControlName} --template ${userTemplate}`;    
    }

    public static NpmInstall(packages?: string) {
        return `npm install ${packages ? packages : ""}`;
    }

    public static NpmBuild() {
        return `npm run build`;
    }

    public static NpmStart(watch: boolean = false) {
        return watch ? `npm start watch` : `npm start`;
    }
}