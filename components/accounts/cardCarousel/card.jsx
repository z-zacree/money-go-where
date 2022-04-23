// Material
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

// Icons
import AddRoundedIcon from "@mui/icons-material/AddRounded";

// Utils
import { fCurrency } from "../../../utils/number";

const AccountCard = ({ accountName, accountValues, create = false }) => {
    if (!create) {
        return (
            <GlassCard>
                <CardContent sx={{ width: "100%", height: "100%" }}>
                    <Typography fontSize={20}>{accountName}</Typography>
                    <Typography fontSize={20}>{fCurrency(accountValues.balance)}</Typography>
                </CardContent>
            </GlassCard>
        );
    } else {
        return (
            <GlassCard>
                <CardActionArea sx={{ height: "100%" }}>
                    <CardContent sx={{ weight: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Stack direction="column" alignItems="center">
                            <Avatar sx={{ mb: 2 }}>
                                <AddRoundedIcon />
                            </Avatar>
                            <Typography>New</Typography>
                        </Stack>
                    </CardContent>
                </CardActionArea>
            </GlassCard>
        );
    }
};

export default AccountCard;

const GlassCard = styled(Card)(({ theme }) => ({
    aspectRatio: "2/1",
    borderRadius: 16,
    background: "rgba( 255, 255, 255, 0.15 )",
    backdropFilter: "blur( 10px )",
    WebkitBackdropFilter: "blur( 10px )",
}));
