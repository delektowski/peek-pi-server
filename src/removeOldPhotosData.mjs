import {connectKnex} from "./knex.mjs";
import dayjs from "dayjs";
import {exec} from 'node:child_process'

const formatDate = dayjs().subtract(8, 'day').format('YYYY-MM-DD')

async function removeOldPhotosData() {
    const tablePhoto = "photos";
    await connectKnex(tablePhoto).where('title', 'like', `%${formatDate}%`).del()
    console.log("Photos data with date:", formatDate, "has been deleted.")
}

async function removeOdlPhotosFiles() {
    exec(`rm ./pics/img-${formatDate}*`, (err, _) => {
        if (err) {
            console.error("could not execute command: ", err)
            return
        }
        console.log("Photos beginning from date:", formatDate, "has been removed.")
    })
}

export function handleRemoveOldPhotos() {
    const oneDay = 5000;
    setInterval(() => {
        removeOldPhotosData()
        removeOdlPhotosFiles()
    }, oneDay)
}
