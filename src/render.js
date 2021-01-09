const { exec, execSync } = require("child_process")
const { padWithZeros, splitPath } = require("./utils")
const fs = require("fs")
const compile = require("./compiler")
const sharp = require("sharp")
const path = require("path")
const progressbar = require("progressbar")
const ora = require("ora")

async function renderFrame(Scene, frame, DIGITS_COUNT) {
    const data = Buffer.from(compile(Scene, frame))
    return await sharp(data)
        .png()
        .toFile(`./out_cache/${padWithZeros(frame, DIGITS_COUNT)}.png`)
}

function renderSetup() {
    if (!fs.existsSync("./out_cache")) {
        fs.mkdirSync("./out_cache")
    } else {
        const files = fs.readdirSync("./out_cache")
        for (const file of files) {
            fs.unlinkSync(path.join("./out_cache", file))
        }
    }

    if (fs.existsSync("./out.mp4")) {
        fs.unlinkSync("./out.mp4")
    }
}

function renderCleanup() {
    if (fs.existsSync("./out_cache")) {
        const files = fs.readdirSync("./out_cache")
        for (const file of files) {
            fs.unlinkSync(path.join("./out_cache", file))
        }

        fs.rmdirSync("./out_cache")
    }
}

async function render(Scene, FRAME_COUNT, fps) {
    renderSetup()
    let promises = []
    const DIGITS_COUNT = (FRAME_COUNT - 1).toString().length

    const progress = progressbar.create().step("frame generation")
    progress.setTotal(FRAME_COUNT)
    progress.setTick(1)

    let KEYFRAME = 10
    for (let frame = 0; frame < FRAME_COUNT; frame++) {
        if (frame % KEYFRAME === KEYFRAME - 1) {
            await Promise.all(promises)
        }

        promises.push(renderFrame(Scene, frame, DIGITS_COUNT))
        progress.addTick()
    }
    progress.finish()

    await Promise.all(promises)

    const spinner = ora("Transcoding video to mp4").start()
    exec(
        `ffmpeg -r ${fps} -i ./out_cache/%0${DIGITS_COUNT}d.png -vf fps=${fps} out.mp4`,
        (err, stdout, stderr) => {
            if (err) throw err

            spinner.stop()
            renderCleanup()
        }
    )
}

module.exports = render
