// Style
import ThemeConfig from "../styles/index";

// Components
import AuthLayout from "../components/layout";

function MyApp({ Component, pageProps }) {
    return (
        <ThemeConfig>
            <AuthLayout>
                <Component {...pageProps} />
            </AuthLayout>
        </ThemeConfig>
    );
}

export default MyApp;
