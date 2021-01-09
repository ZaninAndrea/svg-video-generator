const React = require("react")

const Grid = ({
    offsetX,
    offsetY,
    size,
    smallStroke,
    largeStroke,
    xAxis,
    yAxis,
}) => {
    return (
        <>
            <defs>
                <pattern
                    id="smallGrid"
                    width={size}
                    height={size}
                    patternUnits="userSpaceOnUse"
                >
                    <path
                        d={`M ${size} 0 L 0 0 0 ${size}`}
                        fill="none"
                        stroke="gray"
                        stroke-width={smallStroke}
                    />
                </pattern>
                <pattern
                    id="grid"
                    width={size * 10}
                    height={size * 10}
                    patternUnits="userSpaceOnUse"
                    x={offsetX}
                    y={offsetY}
                >
                    <rect
                        width={size * 10}
                        height={size * 10}
                        fill="url(#smallGrid)"
                    />
                    <path
                        d={`M ${size * 10} 0 L 0 0 0 ${size * 10}`}
                        fill="none"
                        stroke="gray"
                        stroke-width={largeStroke}
                    />
                </pattern>
            </defs>
            {xAxis && (
                <line
                    x1="0"
                    y1={offsetY}
                    x2="100%"
                    y2={offsetY}
                    stroke="black"
                    stroke-width={2}
                />
            )}
            {yAxis && (
                <line
                    x1={offsetX}
                    y1="0"
                    x2={offsetX}
                    y2="100%"
                    stroke="black"
                    stroke-width={2}
                />
            )}
            <rect width="100%" height="100%" fill="url(#grid)" />
        </>
    )
}

module.exports = Grid
