//Next
import Head from "next/head";

// Material
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Firestore
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "../utils/firebase";

// Components
import { AccountCard } from "../components/accounts";
import Loading from "../components/loading";

const Account = ({ user }) => {
    const [fields, loading] = useDocumentData(doc(firestore, "users", user.uid));
    if (Loading) <Loading />;
    else if (fields)
        <>
            <Head>
                <meta name="description" content="Dashboard of Money go where" />
                <title>MgW | Dashboard</title>
            </Head>
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    {Object.keys(fields.accounts).map((accountName, index) => (
                        <Grid item key={index} xs={12} md={6} lg={4}>
                            <AccountCard accountName={accountName} accountValues={fields.accounts[accountName]} />
                        </Grid>
                    ))}
                    <Grid item xs={12} md={6} lg={4}>
                        <AccountCard create />
                    </Grid>
                </Grid>
            </Container>
        </>;
};

export default Account;
