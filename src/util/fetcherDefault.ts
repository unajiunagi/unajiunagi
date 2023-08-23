export const fetcherDefault = (urlData: string) => fetch(urlData).then((r) => r.json())
