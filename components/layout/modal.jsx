// React
import { useState } from "react";

// Material UI
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Checkbox from "@mui/material/Checkbox";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// Icons
import CloseIcon from "@mui/icons-material/Close";

//Firestore
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "../../utils/firebase";

const ModalC = ({ state, setState, user }) => {
    const [account, setAccount] = useState("wallet");
    const [categories, setCategories] = useState([]);
    const [dateValue, setDateValue] = useState(new Date());
    const [amountValue, setAmountValue] = useState(0);
    const [fields, loading, error] = useDocumentData(doc(firestore, "users", user.uid));

    if (fields && !loading) {
        let options = [];

        Object.keys(fields.categories).map((key) => {
            fields.categories[key].map((category) => {
                options.push({
                    header: key,
                    label: category,
                });
            });
        });

        const amountChange = (event) => (isNaN(event.target.value) ? false : setAmountValue(event.target.value));

        const categoryChange = (event, newValue) => {
            if (typeof newValue[newValue.length - 1] == "object") newValue[newValue.length - 1] = newValue[newValue.length - 1].label;
            setCategories(newValue);
        };

        const accountChange = (event, newValue) => {
            console.log(newValue);
            setAccount(newValue);
        };

        const toggleModal = (open) => () => {
            setState(open);
            setAccount("");
            setCategories([]);
            setAmountValue(0);
        };

        return (
            <Modal
                aria-labelledby="Add expense modal"
                aria-describedby="Modal to add expense"
                open={state}
                onClose={toggleModal(false)}
                closeAfterTransition
                keepMounted
                sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: { xs: 4, sm: 6 } }}
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
                        <Container component="form" sx={{ mt: 4 }} disableGutters>
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        value={account}
                                        onChange={accountChange}
                                        options={Object.keys(fields.accounts)}
                                        renderInput={(params) => <CustomTextField {...params} name="account" label="Account" />}
                                        disableCloseOnSelect
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <CustomTextField name="amount" label="Amount" value={amountValue} onChange={amountChange} required fullWidth />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            renderInput={(props) => <CustomTextField {...props} fullWidth />}
                                            label="Date"
                                            value={dateValue}
                                            onChange={(newValue) => {
                                                setDateValue(newValue);
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Autocomplete
                                        value={categories}
                                        onChange={categoryChange}
                                        options={options}
                                        groupBy={(option) => option.header}
                                        renderInput={(params) => <CustomTextField {...params} name="categories" label="Categories" />}
                                        isOptionEqualToValue={(option, value) => option.label === value}
                                        limitTags={1}
                                        multiple
                                        disableCloseOnSelect
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <CustomTextField name="note" label="Notes" multiline required fullWidth />
                                </Grid>
                            </Grid>
                        </Container>
                    </ModalContainer>
                </Fade>
            </Modal>
        );
    }
};

export default ModalC;

const ModalContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
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
