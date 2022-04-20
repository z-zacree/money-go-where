// React
import Tilt from "react-parallax-tilt";

// Mui
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const AccountCard = ({ accountName, accountValues, create = false }) => {
    console.log(account);
    if (!create) {
        return (
            <Tilt tiltReverse={true} tiltMaxAngleX={10} tiltMaxAngleY={10} style={{ transformStyle: "preserve-3d" }}>
                <CCard>
                    <CardActionArea sx={{ height: "100%" }}>
                        <CardContent sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Box>
                                <Typography fontSize={40}>{accountName}</Typography>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </CCard>
            </Tilt>
        );
    } else {
        return (
            <Tilt tiltReverse={true} tiltMaxAngleX={10} tiltMaxAngleY={10} style={{ transformStyle: "preserve-3d" }}>
                <CCard>
                    <CardActionArea sx={{ height: "100%" }}>
                        <CardContent sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Box>
                                <Typography fontSize={40}>hahaha</Typography>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </CCard>
            </Tilt>
        );
    }
};

export default AccountCard;

const CCard = styled(Card)(({ theme }) => ({
    height: 200,
    borderRadius: 12,
    border: `2px solid black`,
}));
