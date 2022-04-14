import { format, formatDistanceToNow, getDay, getMonth, getYear } from "date-fns";

// ----------------------------------------------------------------------

export function fDate(date) {
    return format(new Date(date), "dd MMMM yyyy");
}

export function fDateTime(date) {
    return format(new Date(date), "dd MMM yyyy HH:mm");
}

export function fDateTimeSuffix(date) {
    return format(new Date(date), "dd/MM/yyyy hh:mm p");
}

export function fToNow(date) {
    return formatDistanceToNow(new Date(date), {
        addSuffix: true,
    });
}

// FlowChart
export function getPast6Months() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let col = [];
    let cM = getMonth(new Date());
    let cY = getYear(new Date());
    for (let i = 0; i < 6; i++) {
        if (cM - i < 0) col.push(months[12 + cM - i] + " " + (cY - 1));
        else col.push(months[cM - i] + " " + cY);
    }
    return col.reverse();
}

export function getMonthYear(date) {
    return format(new Date(date), "MMMM yyyy");
}
