function padWithZeros(frame, n) {
    let s = frame.toString()
    return "0".repeat(n - s.length) + s
}

function splitPath(path) {
    let COMMAND_START = ["L", "l", "M", "m"]
    let commands = []
    let curr = ""

    for (let i = 0; i < path.length; i++) {
        if (curr !== "" && COMMAND_START.indexOf(path[i]) !== -1) {
            commands.push(curr.trim())
            curr = ""
        }

        curr += path[i]
    }

    if (curr !== "") commands.push(curr.trim())

    return commands
}

module.exports = { padWithZeros, splitPath }
