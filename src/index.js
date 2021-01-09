const React = require("react")
const render = require("./render")
const Grid = require("./components/Grid")
const Plot = require("./components/Plot")

const Scene = ({ frame }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            preserveAspectRatio="none"
            x="0px"
            y="0px"
            width="1920"
            height="1080"
        >
            <rect width="100%" height="100%" fill="white" />
            <Grid
                offsetX={960}
                offsetY={540}
                size={20}
                smallStroke={0.5}
                largeStroke={1}
                xAxis={true}
                yAxis={true}
            />
            <Plot
                start={0}
                end={1920}
                step={1}
                f={(x) => 540 + Math.sin((x - 960) / 200) * 200}
            />
        </svg>
    )
}

render(Scene, 120, 60)
