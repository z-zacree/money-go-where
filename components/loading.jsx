// Next
import Head from "next/head";

// Material UI
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
    return (
        <>
            <Head>
                <title>MgW</title>
            </Head>
            <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CircularProgress />
            </Box>
        </>
    );
};

export default Loading;
