const React = require("react")

const Plot = ({ f, start, end, step }) => {
    let points = []
    let x = start
    while (x <= end) {
        points.push([x, f(x)])
        x += step
    }

    return (
        <path
            stroke="black"
            fill="none"
            d={
                `M ${points[0][0]} ${points[0][1]}` +
                points.map(([x, y]) => `L ${x} ${y}`).join(" ")
            }
        />
    )
}

module.exports = Plot
