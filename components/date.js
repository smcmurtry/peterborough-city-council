import { parseISO, format } from 'date-fns';

export function FormatDatetime({ dateString }) {
    try {
        const date = parseISO(dateString);
        return <time dateTime={dateString}>{format(date, 'h:mmaaa LLLL d, yyyy')}</time>;
    } catch {
        return <div></div>;
    }
}

export function Date({ dateString }) {
    const date = parseISO(dateString);
    return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}