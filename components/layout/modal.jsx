// React
import { useMemo, useState } from "react";

// Material UI
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
import { updateDoc, Timestamp } from "firebase/firestore";

// Components
import { CustomTextfield } from "../index";

// Utils
import { fNumber, fCurrency } from "../../utils/number.js";
import { fDate } from "../../utils/date";

const ModalC = ({ state, setState, fields, doc }) => {
    const [tab, setTab] = useState(0);
    const [amount, setAmount] = useState("");
    const [fromAccount, setFromAccount] = useState(Object.keys(fields.accounts)[0]);
    const [toAccount, setToAccount] = useState(Object.keys(fields.accounts)[0]);
    const [date, setDate] = useState(new Date());
    const [categories, setCategories] = useState([]);
    const [notes, setNotes] = useState("");

    const options = useMemo(
        () =>
            Object.entries(fields.categories)
                .map(([key, values]) => values.map((value) => ({ header: key, label: value })))
                .flat(),
        [fields.categories]
    );

    const handleClose = () => {
        setState(false);
        resetForm();
    };

    const handleSubmit = () => {
        const value = amount.replace(/,/gi, "");
        let data = {
            amount: tab == 0 ? -parseFloat(value) : parseFloat(value),
            category: tab == 2 ? ["Transfer"] : categories,
            createdAt: Timestamp.fromDate(date),
            notes: notes
                ? notes
                : `Transaction of ${tab == 1 ? -fCurrency(value) : fCurrency(value)} made at ${fDate(date)} ${
                      tab == 2 ? `between ${fromAccount} and ${toAccount}` : ""
                  }`,
        };

        const pushData = (account, transactionData, isNeg = false) => {
            if (isNeg) {
                transactionData.amount = -parseFloat(value);
                fields.accounts[account].transactions.push({ ...transactionData });
                fields.accounts[account].balance -= parseFloat(value);
                updateDoc(doc, fields);
            } else {
                fields.accounts[account].transactions.push({ ...transactionData });
                fields.accounts[account].balance += parseFloat(value);
                updateDoc(doc, fields);
            }
        };

        if (tab == 2) {
            pushData(toAccount, data);
            pushData(fromAccount, data, true);
            handleClose();
        } else {
            tab == 0 ? pushData(fromAccount, data, true) : pushData(fromAccount, data);
            handleClose();
        }
    };

    const resetForm = () => {
        setAmount("");
        setFromAccount(Object.keys(fields.accounts)[0]);
        setToAccount(Object.keys(fields.accounts)[0]);
        setDate(new Date());
        setCategories([]);
        setNotes("");
    };

    const handleAmount = (e) => {
        const value = e.target.value.replace(/,/gi, "");
        if (!isNaN(value)) {
            if (value.includes(".")) {
                if (value.endsWith(".")) setAmount(fNumber(value) + ".");
                else {
                    const index = value.indexOf(".");
                    const dollars = value.slice(0, index);
                    const cents = value.slice(index + 1, value.length).slice(0, 2);

                    setAmount(fNumber(dollars) + "." + cents);
                }
            } else setAmount(fNumber(value));
        }
    };

    const categoryChange = (event, newValue) => {
        if (typeof newValue[newValue.length - 1] == "object") newValue[newValue.length - 1] = newValue[newValue.length - 1].label;
        setCategories(newValue);
    };

    return (
        <Modal
            aria-labelledby="Add expense modal"
            aria-describedby="Modal to add expense"
            open={state}
            onClose={handleClose}
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
                        <IconButton onClick={handleClose} sx={{ ml: "auto" }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <CustomTabs
                        value={tab}
                        onChange={(e, newValue) => setTab(newValue)}
                        aria-label="expense or income tab"
                        variant="fullWidth"
                        centered
                    >
                        <CustomTab label="Expense" />
                        <CustomTab label="Income" />
                        <CustomTab label="Transfer" />
                    </CustomTabs>
                    <AmountTextField
                        value={amount}
                        onChange={handleAmount}
                        fullWidth
                        autoComplete="off"
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
                        sx={{ pt: 2, textAlign: "right" }}
                    />
                    <Grid container spacing={2} sx={{ pt: 2, pb: 3 }}>
                        <Grid item xs={12} md={4}>
                            <Autocomplete
                                value={fromAccount}
                                onChange={(event, newValue) => {
                                    setFromAccount(newValue);
                                }}
                                options={Object.keys(fields.accounts)}
                                renderInput={(params) => <CustomTextfield {...params} name="fromAccount" label="From account" />}
                                disableCloseOnSelect
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            {tab == 2 ? (
                                <Autocomplete
                                    value={toAccount}
                                    onChange={(event, newValue) => {
                                        setToAccount(newValue);
                                    }}
                                    options={Object.keys(fields.accounts)}
                                    renderInput={(params) => <CustomTextfield {...params} name="toAccount" label="To account" />}
                                    disableCloseOnSelect
                                    required
                                    fullWidth
                                />
                            ) : (
                                <Autocomplete
                                    value={categories}
                                    onChange={categoryChange}
                                    options={options}
                                    groupBy={(option) => option.header}
                                    renderInput={(params) => <CustomTextfield {...params} name="categories" label="Categories" />}
                                    isOptionEqualToValue={(option, value) => option.label === value}
                                    limitTags={1}
                                    multiple
                                    disableCloseOnSelect
                                    fullWidth
                                />
                            )}
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    renderInput={(props) => <CustomTextfield {...props} fullWidth />}
                                    label="Date"
                                    value={date}
                                    onChange={(newValue) => {
                                        setDate(newValue);
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <CustomTextfield
                                name="note"
                                label="Notes"
                                value={notes}
                                onChange={(event) => setNotes(event.target.value)}
                                autoComplete="off"
                                multiline
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button onClick={handleClose}>Cancel</Button>
                        {tab == 2 ? (
                            <Button onClick={handleSubmit} disabled={amount == 0 || fromAccount == toAccount || fromAccount == "" || toAccount == ""}>
                                Save
                            </Button>
                        ) : (
                            <Button onClick={handleSubmit} disabled={amount == 0 || categories.length == 0}>
                                Save
                            </Button>
                        )}
                    </Box>
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

const AmountTextField = styled(TextField)(({ theme }) => ({
    "& label.Mui-focused": { color: theme.palette.blackAndWhite.contrast.default },
    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
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
