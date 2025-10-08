/* eslint-disable max-len */
import { createThemes } from "@tamagui/theme-builder";
import * as Colors from "@tamagui/colors";

const darkPalette = ["hsla(222, 16%, 16%, 1)", "hsla(222, 16%, 20%, 1)", "hsla(222, 16%, 23%, 1)", "hsla(222, 16%, 27%, 1)", "hsla(222, 16%, 31%, 1)", "hsla(222, 16%, 35%, 1)", "hsla(222, 16%, 39%, 1)", "hsla(222, 16%, 42%, 1)", "hsla(222, 16%, 46%, 1)", "hsla(222, 16%, 50%, 1)", "hsla(0, 15%, 93%, 1)", "hsla(240, 60%, 99%, 1)"];
const lightPalette = ["hsla(222, 16%, 82%, 1)", "hsla(222, 16%, 78%, 1)", "hsla(222, 16%, 75%, 1)", "hsla(222, 16%, 71%, 1)", "hsla(222, 16%, 68%, 1)", "hsla(222, 16%, 64%, 1)", "hsla(222, 16%, 61%, 1)", "hsla(222, 16%, 57%, 1)", "hsla(222, 16%, 54%, 1)", "hsla(222, 16%, 50%, 1)", "hsla(0, 15%, 15%, 1)", "hsla(240, 60%, 1%, 1)"];

const lightShadows = {
    shadow1: "rgba(0,0,0,0.04)",
    shadow2: "rgba(0,0,0,0.08)",
    shadow3: "rgba(0,0,0,0.16)",
    shadow4: "rgba(0,0,0,0.24)",
    shadow5: "rgba(0,0,0,0.32)",
    shadow6: "rgba(0,0,0,0.4)",
};

const darkShadows = {
    shadow1: "rgba(0,0,0,0.2)",
    shadow2: "rgba(0,0,0,0.3)",
    shadow3: "rgba(0,0,0,0.4)",
    shadow4: "rgba(0,0,0,0.5)",
    shadow5: "rgba(0,0,0,0.6)",
    shadow6: "rgba(0,0,0,0.7)",
};

// we're adding some example sub-themes for you to show how they are done, "success" "warning", "error":

const builtThemes = createThemes({
    base: {
        palette: {
            dark: darkPalette,
            light: lightPalette,
        },
        extra: {
            light: {
                ...Colors.green,
                ...Colors.red,
                ...Colors.yellow,
                ...lightShadows,
                shadowColor: lightShadows.shadow1,
            },
            dark: {
                ...Colors.greenDark,
                ...Colors.redDark,
                ...Colors.yellowDark,
                ...darkShadows,
                shadowColor: darkShadows.shadow1,
            },
        },
    },

    accent: {
        palette: {
            dark: ["hsla(186, 52%, 35%, 1)", "hsla(187, 52%, 38%, 1)", "hsla(188, 52%, 41%, 1)", "hsla(188, 52%, 43%, 1)", "hsla(189, 52%, 46%, 1)", "hsla(190, 52%, 49%, 1)", "hsla(191, 52%, 52%, 1)", "hsla(191, 52%, 54%, 1)", "hsla(192, 52%, 57%, 1)", "hsla(193, 52%, 60%, 1)", "hsla(0, 0%, 90%, 1)", "hsla(0, 0%, 95%, 1)"],
            light: ["hsla(186, 52%, 70%, 1)", "hsla(187, 52%, 73%, 1)", "hsla(188, 52%, 76%, 1)", "hsla(188, 52%, 78%, 1)", "hsla(189, 52%, 81%, 1)", "hsla(190, 52%, 84%, 1)", "hsla(191, 52%, 87%, 1)", "hsla(191, 52%, 90%, 1)", "hsla(192, 52%, 92%, 1)", "hsla(193, 52%, 95%, 1)", "hsla(0, 0%, 96%, 1)", "hsla(0, 0%, 100%, 1)"],
        },
    },

    childrenThemes: {
        warning: {
            palette: {
                dark: Object.values(Colors.yellowDark),
                light: Object.values(Colors.yellow),
            },
        },

        error: {
            palette: {
                dark: Object.values(Colors.redDark),
                light: Object.values(Colors.red),
            },
        },

        success: {
            palette: {
                dark: Object.values(Colors.greenDark),
                light: Object.values(Colors.green),
            },
        },
    },

    // optionally add more, can pass palette or template

    // grandChildrenThemes: {
    //   alt1: {
    //     template: 'alt1',
    //   },
    //   alt2: {
    //     template: 'alt2',
    //   },
    //   surface1: {
    //     template: 'surface1',
    //   },
    //   surface2: {
    //     template: 'surface2',
    //   },
    //   surface3: {
    //     template: 'surface3',
    //   },
    // },
});

export type Themes = typeof builtThemes

// the process.env conditional here is optional but saves web client-side bundle
// size by leaving out themes JS. tamagui automatically hydrates themes from CSS
// back into JS for you, and the bundler plugins set TAMAGUI_ENVIRONMENT. so
// long as you are using the Vite, Next, Webpack plugins this should just work,
// but if not you can just export builtThemes directly as themes:
export const themes: Themes =
    process.env.TAMAGUI_ENVIRONMENT === "client" &&
        process.env.NODE_ENV === "production"
        ? ({} as any)
        : (builtThemes as any);
