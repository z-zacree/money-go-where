// Style
import ThemeConfig from "../styles/index";

// Layout
import Layout from "../components/layout";

function MyApp({ Component, pageProps }) {
    return (
        <ThemeConfig>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeConfig>
    );
}

export default MyApp;
