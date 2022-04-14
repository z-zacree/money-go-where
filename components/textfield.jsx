// Material UI
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const CustomTextfield = ({
    children,
    autoComplete,
    defaultValue,
    helperText,
    label,
    name,
    placeholder,
    rows,
    type,
    autoFocus = false,
    disabled = false,
    error = false,
    fullWidth = false,
    multiline = false,
    required = false,
    select = false,
    selectProps,
    variant = "outlined",
    sx,
    onChange,
    value,
}) => {
    return (
        <CustomTextField
            autoComplete={autoComplete}
            defaultValue={defaultValue}
            helperText={helperText}
            label={label}
            name={name}
            placeholder={placeholder}
            rows={rows}
            type={type}
            autoFocus={autoFocus}
            disabled={disabled}
            error={error}
            fullWidth={fullWidth}
            multiline={multiline}
            required={required}
            select={select}
            SelectProps={selectProps}
            variant={variant}
            sx={sx}
            onChange={onChange}
            value={value}
        >
            {children}
        </CustomTextField>
    );
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
