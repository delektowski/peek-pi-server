import {connectKnex} from "./knex.mjs";
import dayjs from "dayjs";
import {exec} from 'node:child_process'
import logger from "./logger.mjs";



async function removeOldPhotosData() {
    const formatDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
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
    const formatDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
    exec(`rm ./pics/img-${formatDate}*`, (err, _) => {
        if (err) {
            console.error("could not execute command: ", err)
		logger.warn(`Format date is: ${formatDate}`);
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
    const oneDay = 43200000;
	setInterval(() => {
        removeOldPhotosData()
        removeOldPhotosFiles()
    }, oneDay)
}
