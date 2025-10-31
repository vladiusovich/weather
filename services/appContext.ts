import migrations from "@/db/weatherSense/migrations";
import { SeedService } from "./seedService";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import { DbContextType, initDb } from "@/db";
import { initResources } from "@/services/translations/i18n";
import { initServices, ServicesRootType } from ".";
import { initAppStories } from "@/store/initStore";
import AppStoreType from "@/store/AppStoreType";

type InitStageType =
    | "i18n"
    | "db"
    | "migrations"
    | "seeding"
    | "services"
    | "stores"
    | "ready"
    | "failed";


// TODO: status?: ready | inProgress | fail
export class AppContext {
    public appStore?: AppStoreType;
    public services?: ServicesRootType;
    public dbContext!: DbContextType;
    public stage: InitStageType = "i18n";

    async init() {
        try {
            await this.runStep("i18n", this.initI18n);
            await this.runStep("db", this.initDb);
            await this.runStep("migrations", this.runMigrations);
            await this.runStep("seeding", this.seedData);
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
        await migrate(this.dbContext.db, migrations);
    }

    // eslint-disable-next-line class-methods-use-this
    private async seedData() {
        await new SeedService(this.dbContext).run();
    }

    private async initServices() {
        this.services = await initServices(this.dbContext);
    }

    private async initStores() {
        if (!this.services) throw new Error("Services not ready");
        this.appStore = await initAppStories(this.services);
    }

    private async runStep(name: InitStageType, fn: () => Promise<void>) {
        // console.info(`[AppContext] ▶️ ${name}`);
        this.stage = name;
        await fn.call(this);
        // console.info(`[AppContext] ✔️ ${name}`);
    }
}
