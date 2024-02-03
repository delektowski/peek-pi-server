import { createLogger, format, transports } from "winston"

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "peek-pi-server" },
  transports: [
    new transports.File({ filename: "./logs/logs.log" }),
  ],
});

logger.add(
  new transports.Console({
    format: format.combine(format.colorize(), format.simple()),
  })
);

// logger.log("info", "Pass a message and this works", {
//   additional: "properties",
//   are: "passed along",
// });
//
// logger.warn("Maybe important error: ", new Error("Error passed as meta"));
//
// logger.error(new Error("Error as info"));

export default logger
