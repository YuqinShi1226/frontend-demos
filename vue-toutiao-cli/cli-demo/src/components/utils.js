const convert = tabs => {
    return tabs.map(tab => ({
        name: tab.title,
        key: tab.key
    }))
}

export default convert