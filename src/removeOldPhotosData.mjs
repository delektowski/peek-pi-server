import {connectKnex} from "./knex.mjs";
import dayjs from "dayjs";
import {exec} from 'node:child_process'
import logger from "./logger.mjs";

const formatDate = dayjs().subtract(8, 'day').format('YYYY-MM-DD')

async function removeOldPhotosData() {
    const tablePhoto = "photos";
    await connectKnex(tablePhoto).where('title', 'like', `%${formatDate}%`).del()
    logger.log(
        "info",
        `Photos data with date: ${formatDate}has been deleted.`, {
            function: "removeOldPhotosData()"
        }
    );
}

async function removeOldPhotosFiles() {
    exec(`rm ./pics/img-${formatDate}*`, (err, _) => {
        if (err) {
            console.error("could not execute command: ", err)
            logger.warn("Could not execute command: ", new Error(JSON.stringify(err)));
            
            return
        }
        logger.log(
            "info",
            `Photos beginning from date: ${formatDate} has been removed.`, {
                function: "removeOldPhotosFiles()"
            }
        );

    })
}

export function handleRemoveOldPhotos() {
    const oneDay = 86400000;
    setInterval(() => {
        removeOldPhotosData()
        removeOldPhotosFiles()
    }, oneDay)
}
