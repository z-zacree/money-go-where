// React
import { useState } from "react";

// Material UI
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
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

// Firebase
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "../../utils/firebase";

// Utils
import { fCurrency, fNumber } from "../../utils/number.js";
import { fDate } from "../../utils/date";

const ModalC = ({ state, setState, fields, doc }) => {
    const [tab, setTab] = useState(0);
    const [account, setAccount] = useState(Object.keys(fields.accounts)[0]);
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState(new Date());
    const [categories, setCategories] = useState([]);
    const [notes, setNotes] = useState("");

    let expenseOptions = [],
        incomeOptions = [];

    Object.keys(fields.categories).map((key) => {
        fields.categories[key].map((category) => {
            key == "expenses"
                ? expenseOptions.push({
                      header: key,
                      label: category,
                  })
                : incomeOptions.push({
                      header: key,
                      label: category,
                  });
        });
    });

    const amountChange = (event) => {
        let value = event.target.value;
        if (value) {
            if (value[0] == 0) value = value.slice(1);
            isNaN(value) ? false : setAmount(value);
        } else setAmount("");
    };

    const categoryChange = (event, newValue) => {
        if (typeof newValue[newValue.length - 1] == "object") newValue[newValue.length - 1] = newValue[newValue.length - 1].label;
        setCategories(newValue);
    };

    const resetForm = () => {
        setAccount(Object.keys(fields.accounts)[0]);
        setAmount("");
        setDate(new Date());
        setCategories([]);
        setNotes("");
    };

    const toggleModal = (open) => () => {
        setState(open);
        resetForm();
    };

    const changeTab = (event, tab) => {
        setTab(tab);
        resetForm();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let transactions = fields.accounts[account].transactions;
        let tAmount = parseInt(amount);
        if (tab == 0) {
            transactions.push({
                amount: -tAmount,
                category: categories,
                createdAt: Timestamp.fromDate(date),
                notes: notes ? notes : `Transaction of -${fCurrency(tAmount)} made at ${fDate(date)}`,
            });
        } else {
            transactions.push({
                amount: tAmount,
                category: categories,
                createdAt: Timestamp.fromDate(date),
                notes: notes ? notes : `Transaction of ${fCurrency(tAmount)} made at ${fDate(date)}`,
            });
        }
        updateDoc(doc, fields);
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
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs value={tab} onChange={changeTab} aria-label="expense or income tab" variant="fullWidth" centered>
                            <Tab label="Expense" fullWidth />
                            <Tab label="Income" fullWidth />
                        </Tabs>
                    </Box>
                    <TabPanel value={tab} index={0}>
                        <Container component="form" sx={{ mt: 4 }} onSubmit={handleSubmit} disableGutters>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        value={account}
                                        onChange={(event, newValue) => {
                                            setAccount(newValue);
                                        }}
                                        options={Object.keys(fields.accounts)}
                                        renderInput={(params) => <CustomTextField {...params} name="account" label="Account" />}
                                        disableCloseOnSelect
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <CustomTextField
                                        name="amount"
                                        label="Amount"
                                        value={amount}
                                        onChange={amountChange}
                                        autoComplete="off"
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            renderInput={(props) => <CustomTextField {...props} fullWidth />}
                                            label="Date"
                                            value={date}
                                            onChange={(newValue) => {
                                                setDate(newValue);
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Autocomplete
                                        value={categories}
                                        onChange={categoryChange}
                                        options={expenseOptions}
                                        groupBy={(option) => option.header}
                                        renderInput={(params) => <CustomTextField {...params} name="categories" label="Categories" />}
                                        isOptionEqualToValue={(option, value) => option.label === value}
                                        limitTags={1}
                                        multiple
                                        disableCloseOnSelect
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <CustomTextField
                                        name="note"
                                        label="Notes"
                                        value={notes}
                                        onChange={(event) => setNotes(event.target.value)}
                                        autoComplete="off"
                                        multiline
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                                    <SubmitButton type="submit" variant="contained">
                                        Add expense
                                    </SubmitButton>
                                </Grid>
                            </Grid>
                        </Container>
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <Container component="form" sx={{ mt: 4 }} onSubmit={handleSubmit} disableGutters>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        value={account}
                                        onChange={(event, newValue) => {
                                            setAccount(newValue);
                                        }}
                                        options={Object.keys(fields.accounts)}
                                        renderInput={(params) => <CustomTextField {...params} name="account" label="Account" />}
                                        disableCloseOnSelect
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <CustomTextField
                                        name="amount"
                                        label="Amount"
                                        value={amount}
                                        onChange={amountChange}
                                        autoComplete="off"
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            renderInput={(props) => <CustomTextField {...props} fullWidth />}
                                            label="Date"
                                            value={date}
                                            onChange={(newValue) => {
                                                setDate(newValue);
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Autocomplete
                                        value={categories}
                                        onChange={categoryChange}
                                        options={incomeOptions}
                                        groupBy={(option) => option.header}
                                        renderInput={(params) => <CustomTextField {...params} name="categories" label="Categories" />}
                                        isOptionEqualToValue={(option, value) => option.label === value}
                                        limitTags={1}
                                        multiple
                                        disableCloseOnSelect
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <CustomTextField
                                        name="note"
                                        label="Notes"
                                        value={notes}
                                        onChange={(event) => setNotes(event.target.value)}
                                        autoComplete="off"
                                        multiline
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                                    <SubmitButton type="submit" variant="contained">
                                        Add expense
                                    </SubmitButton>
                                </Grid>
                            </Grid>
                        </Container>
                    </TabPanel>
                </ModalContainer>
            </Fade>
        </Modal>
    );
};

export default ModalC;

const ModalContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "auto",
    padding: 24,
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

const SubmitButton = styled(Button)(({ theme }) => ({
    marginTop: 8,
    textTransform: "none",
    backgroundColor: theme.palette.blackAndWhite.contrast.default,
    ":hover": {
        backgroundColor: theme.palette.blackAndWhite.contrast.alpha80,
    },
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && children}
        </div>
    );
}
