// Next
import Head from "next/head";

// React
import { useState } from "react";

// Material
import Container from "@mui/material/Container";

// Firebase
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "../utils/firebase";

// Components
import { CardCarousel, TransactionHistory } from "../components/accounts";
import Loading from "../components/loading";

// Utils
import { useWindowDimensions } from "../utils/hooks";

const Account = ({ user, fields }) => {
    const [cardIndex, setCardIndex] = useState(0);
    const { width } = useWindowDimensions();

    return (
        <>
            <Head>
                <meta name="description" content="Dashboard of Money go where" />
                <title>MgW | Accounts</title>
            </Head>
            <Container maxWidth="lg">
                <CardCarousel width={width} fields={fields} setIndex={setCardIndex} />
                <TransactionHistory index={cardIndex} fields={fields} />
            </Container>
        </>
    );
};

export default Account;
