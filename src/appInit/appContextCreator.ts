import { SeedService } from "../services/seedService";
import { DbContextType, initDb, runMigrations } from "@db/index";
import { initResources } from "@services/translations/i18n";
import initAppServices from "./appServices.init";
import AppStoreType from "src/appStore/AppStoreType";
import { AppServicesRootType } from "../services/AppServicesRootType";
import initAppStore from "./appStore.init";
import { AppApiLayer } from "@api/rest/AppApiLayer";
import initApiLayer from "./apiLayer.init";

type InitStageType =
    | "i18n"
    | "db"
    | "migrations"
    | "seeding"
    | "api"
    | "services"
    | "stores"
    | "ready"
    | "failed";


// TODO: status?: ready | inProgress | fail
export class AppContextCreator {
    public appStore?: AppStoreType;
    public services?: AppServicesRootType;
    public api!: AppApiLayer;
    public dbContext!: DbContextType;
    public stage: InitStageType = "i18n";

    async init() {
        try {
            await this.runStep("db", this.initDb);
            await this.runStep("migrations", this.runMigrations);
            await this.runStep("seeding", this.seedData);
            await this.runStep("i18n", this.initI18n);
            await this.runStep("api", this.initApi);
            await this.runStep("services", this.initServices);
            await this.runStep("stores", this.initStores);

            this.stage = "ready";
            // console.info('[AppContext] ✅ init complete');
        } catch (err) {
            this.stage = "failed";
            console.error("[AppContext] ❌ init failed:", err);
            throw err;                      // пробрасываем выше, если нужно
        }
    }

    // eslint-disable-next-line class-methods-use-this
    private async initI18n() {
        await initResources();
    }

    private async initDb() {
        this.dbContext = await initDb();
    }

    private async runMigrations() {
        await runMigrations(this.dbContext.db);
    }

    // eslint-disable-next-line class-methods-use-this
    private async seedData() {
        await new SeedService(this.dbContext).run();
    }

    private async initApi() {
        this.api = await initApiLayer();
    }

    private async initServices() {
        this.services = await initAppServices(this.dbContext, this.api);
    }

    private async initStores() {
        if (!this.services) throw new Error("Services not ready");
        this.appStore = await initAppStore(this.services);
    }

    private async runStep(name: InitStageType, fn: () => Promise<void>) {
        // console.info(`[AppContext] ▶️ ${name}`);
        this.stage = name;
        await fn.call(this);
        // console.info(`[AppContext] ✔️ ${name}`);
    }
}
