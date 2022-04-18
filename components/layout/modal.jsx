// React
import { useMemo, useState } from "react";

// Material UI
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// Icons
import CloseIcon from "@mui/icons-material/Close";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import CompareArrowsRoundedIcon from "@mui/icons-material/CompareArrowsRounded";

// Firebase
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "../../utils/firebase";

// Utils
import { fNum, fDec } from "../../utils/number.js";
import { fDate } from "../../utils/date";
import { textTransform } from "@mui/system";

const ModalC = ({ state, setState, fields, doc }) => {
    const [tab, setTab] = useState(0);
    const [account, setAccount] = useState(Object.keys(fields.accounts)[0]);
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState(new Date());
    const [categories, setCategories] = useState([]);
    const [notes, setNotes] = useState("");

    const options = useMemo(
        () => Object.entries(fields.categories).map(([key, value]) => value.map((v) => ({ header: key, label: v }))),
        [fields.categories]
    );

    const toggleModal = (open) => (e) => {
        setState(open);
    };

    const handleAmount = (e) => {
        const value = e.target.value.replace(/,/gi, "");
        if (!isNaN(value)) {
            if (value.includes(".")) {
                if (value.endsWith(".")) setAmount(fNum(value) + ".");
                else {
                    const index = value.indexOf(".");
                    const dollars = value.slice(0, index);
                    const cents = value.slice(index + 1, value.length).slice(0, 2);

                    setAmount(fNum(dollars) + "." + cents);
                }
            } else setAmount(fNum(value));
        }
    };

    return (
        <Modal
            aria-labelledby="Add expense modal"
            aria-describedby="Modal to add expense"
            open={state}
            onClose={toggleModal(false)}
            closeAfterTransition
            keepMounted
            sx={{ height: "auto", display: "flex", justifyContent: "center", alignItems: "flex-start", p: { xs: 4, sm: 6 } }}
        >
            <Fade in={state}>
                <ModalContainer>
                    <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
                        <Typography variant="h5" sx={{ ml: 1 }}>
                            Add an expense!
                        </Typography>
                        <IconButton onClick={toggleModal(false)} sx={{ ml: "auto" }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <CustomTabs
                        value={tab}
                        onChange={(e, newValue) => {
                            setTab(newValue);
                        }}
                        aria-label="expense or income tab"
                        variant="fullWidth"
                        sx={{ pb: 2 }}
                        centered
                    >
                        <CustomTab label="Expense" />
                        <CustomTab label="Income" />
                        <CustomTab label="Transfer" />
                    </CustomTabs>
                    <CustomTextField
                        value={amount}
                        onChange={handleAmount}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {tab == 0 ? (
                                        <RemoveRoundedIcon sx={{ color: "rgb(255, 0, 0)" }} />
                                    ) : tab == 1 ? (
                                        <AddRoundedIcon sx={{ color: "rgb(0, 255, 0)" }} />
                                    ) : (
                                        <CompareArrowsRoundedIcon sx={{ color: "white" }} />
                                    )}
                                </InputAdornment>
                            ),
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                    />
                </ModalContainer>
            </Fade>
        </Modal>
    );
};

export default ModalC;

const ModalContainer = styled(Box)(({ theme }) => ({
    padding: 12,
    borderRadius: 12,
    backgroundColor: theme.palette.background.main,
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
    "& label.Mui-focused": {
        color: theme.palette.blackAndWhite.contrast.default,
    },
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: theme.palette.blackAndWhite.contrast.default,
        },
    },
    "& .MuiOutlinedInput-input": {
        ":-webkit-autofill": {
            WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.default} inset`,
            WebkitTextFillColor: theme.palette.blackAndWhite.contrast.default,
        },
    },
}));

const CustomTabs = styled((props) => <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} />)(
    ({ theme }) => ({
        "& .MuiTabs-indicator": {
            display: "flex",
            justifyContent: "center",
            backgroundColor: "transparent",
        },
        "& .MuiTabs-indicatorSpan": {
            maxWidth: 40,
            width: "100%",
            backgroundColor: theme.palette.blackAndWhite.contrast.default,
        },
    })
);

const CustomTab = styled((props) => <Tab {...props} fullWidth disableRipple />)(({ theme }) => ({
    textTransform: "none",
    "&.Mui-selected": { color: theme.palette.blackAndWhite.contrast.default },
}));
