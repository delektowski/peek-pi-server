export function setDateRange(start, end) {
    const format = (date) => `${new Date(date).toLocaleDateString(undefined, {year: "numeric"})}-${new Date(date).toLocaleDateString(undefined, {month: "2-digit"})}-${new Date(date).toLocaleDateString(undefined, {day: "2-digit"})}`
    return {
        start: format(start),
        end: format(end)
    }

}
