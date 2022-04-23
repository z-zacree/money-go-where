// Material UI
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const CustomTextfield = (props) => {
    return <CustomTextField {...props}>{props.children}</CustomTextField>;
};

export default CustomTextfield;

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
