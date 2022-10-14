export function setDateRange(start, end) {
    const add1DayToEndDate = new Date(end).setDate(new Date(end).getDate() + 1);
    const format = (date) => `${new Date(date).toLocaleDateString(undefined, {year: "numeric"})}-${new Date(date).toLocaleDateString(undefined, {month: "2-digit"})}-${new Date(date).toLocaleDateString(undefined, {day: "2-digit"})}`
    return {
        start: format(start),
        end: format(add1DayToEndDate)
    }

}
