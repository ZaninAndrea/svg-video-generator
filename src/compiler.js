function renderElem(elem) {
    let data = elem
    data.props = data.props || {}
    data.props.children = data.props.children || []
    if (typeof data.type === "function") {
        data = data.type(data.props)
    }
    let propsStr = Object.entries(data.props).reduce((acc, [key, value]) => {
        if (key === "children") return acc
        return `${acc} ${key}="${value}"`
    }, "")

    let children = Array.isArray(data.props.children)
        ? data.props.children
        : data.props.children === 0 || !data.props.children
        ? []
        : [data.props.children]
    children = children.filter((x) => x !== undefined && x !== null)

    let childrenStr = ""
    for (let child of children) {
        childrenStr += renderElem(child)
    }

    if (
        typeof data.type === "symbol" &&
        data.type.toString() === "Symbol(react.fragment)"
    ) {
        return childrenStr
    } else if (typeof data.type === "string") {
        return `<${data.type}${propsStr}>${childrenStr}</${data.type}>`
    } else {
        throw new Error("Unrecognized type")
    }
}

function compile(Scene, frame) {
    return renderElem(Scene({ frame }))
}

module.exports = compile
