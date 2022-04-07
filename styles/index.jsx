// Material
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider, createTheme, StyledEngineProvider } from "@mui/material/styles";

export default function ThemeConfig({ children }) {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    const themeConf = (mode) => ({
        palette: {
            mode,
            background: {
                ...(mode === "dark"
                    ? {
                          main: "#121212",
                          sub: "#1a1a1a",
                          card: "#1a1a1a",
                      }
                    : {
                          main: "#ffffff",
                          sub: "#f2f2f2",
                          card: "#ffffff",
                      }),
            },
            navbar: "rgba(0,0,0,0)",
            accent: "#2DC8C8",
        },
        typography: { fontFamily: "Nunito" },
    });

    const theme = createTheme(themeConf(prefersDarkMode ? "dark" : "light"));

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalTheme />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

function GlobalTheme() {
    return (
        <GlobalStyles
            styles={{
                "*": {
                    margin: 0,
                    padding: 0,
                    boxSizing: "border-box",
                },
                html: {
                    width: "100%",
                    height: "100%",
                    WebkitOverflowScrolling: "touch",
                },
                body: {
                    width: "100%",
                    height: "100%",
                    overflow: "overlay",

                    scrollBehavior: "smooth",
                },
                "#root": {
                    width: "100%",
                    height: "100%",
                },
                a: {
                    textDecoration: "none",
                },
            }}
        />
    );
}
