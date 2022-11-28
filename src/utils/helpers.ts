import * as moment from "moment";
import { CONSTANT_VALUES } from "../constants/constants";
import { ERROR } from "../constants/error";
import { createLogger, format, transports, Logger } from "winston";
import * as randomstring from 'randomstring';
import { sign, verify } from "jsonwebtoken";
import * as config from 'config';

let logger: Logger;

export const dateConstants = {

  currentTimeStamp: () => moment().utc().unix() * 1000,
  currentUtcDate: () => moment.utc().format(),
  startOfDate: (date, timestamp) => {
    if (timestamp) return moment(date).utc().startOf('d').unix() * 1000
    return moment(date).utc().startOf('d').toDate()
  },
  endOfDate: (date, timestamp) => {
    if (timestamp) return moment(date).utc().endOf('d').unix() * 1000
    return moment(date).utc().endOf('d').toDate()
  },
  startOfDay: () => moment().utcOffset(0).startOf('d').format('YYYY-MM-DD HH:mm:ss.SSS'),
  endOfDay: () => moment().utcOffset(0).endOf('d').format('YYYY-MM-DD HH:mm:ss.SSS'),
  monthStart: (month: number, year: number) => { return moment().year(year).month(month - 1).startOf('month').toISOString() },
  monthEnd: (month: number, year: number) => { return moment().year(year).month(month - 1).endOf('month').toISOString() },
  yearStart: (year: number) => { return moment().year(year).startOf('year').toISOString() },
  yearEnd: (year: number) => { return moment().year(year).endOf('year').toISOString() },
  addDurationToDate: (date: number, duration, type: string) => { return moment(date).add(duration, type).utc().unix() * 1000 },
  formatedTime: (date: number, timestamp) => {
    if (timestamp) return moment(date).format('LLLL')
    return moment(date).format('LLLL')
  }
}



export const getLimitOffset = async (limit?: number, page?: number) => {
  try {
    if (limit) {
      limit = Math.abs(limit);

      // If limit exceeds max limit
      if (limit > CONSTANT_VALUES.MAX_LIMIT) {
        limit = CONSTANT_VALUES.MAX_LIMIT;
      }
    } else {
      limit = CONSTANT_VALUES.MIN_LIMIT;
    }
    if (page && page != 0) {
      page = Math.abs(page);
    } else {
      page = CONSTANT_VALUES.PAGE;
    }
    let offset = (page - 1) * limit;
    offset = offset < 0 ? 0 : offset;

    return { limit: limit, offset: offset }
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export const copyObject = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
}


export let sendSuccess = function (res, responseData) {
	res.status(responseData.code).send(responseData);
};


export let sendError = function (res: any, errors: any) {
  console.log(errors)
	if (Array.isArray(errors)) {
		let errorData = copyObject(ERROR.VALIDATION_ERROR_400);
		errorData.errors = errors;
		res.status(errorData.code).send(errorData);
	} else if (errors && errors.hasOwnProperty('code')) {
		let errorData: any = {};
		errorData.message = errors.message;
		errorData.code = errors.code;
		if(Array.isArray(errors.errors))
			errorData.errors = errors.errors;
		res.status(errors.code).send(errorData);
	} else {
		let errorData = copyObject(ERROR.INTERNAL_SERVER_ERROR_500);
		if (errors.message) {
			getLogger(process.cwd() + '../../logs').error(errors.message)
		}
		if (errors.SequelizeDatabaseError) {
			getLogger(process.cwd() + '../../logs').error(errors.SequelizeDatabaseError)
		}
		// if(CONFIG.APP.ENV === "Dev" && errors.message) {
		// 	errorData.message = errors.message;
		// }
		
		res.status(errorData.code).send(errorData);
	}
}


export const getLogger = (logDir): Logger => {
  if (!logger) {
      logger = createLogger({
          format: format.combine(
              format.timestamp({
                  format: 'YYYY-MM-DD hh:mm:ss |'
              }),
              format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
          ),
          transports: [
              new transports.File({
                  filename: `${logDir}/error.log`
              })
          ]
      });
  }

  return logger;
}

export let generateRandomOtp = function(digits: number) {
	return randomstring.generate({
		length: digits,
		charset: 'numeric'
	});
};

export const createJwtToken = async (payload: object, cert, expiryTime?: number) => {

  if (expiryTime) return await sign(payload, cert, { expiresIn: expiryTime })
  return await sign(payload, cert)
}


export const verifyJwtToken: any = async (payload: string) => {
  try {

    return await verify(payload, config.get<string>('JWT_CERT'))
  }
  catch (error) {
    return null
  }
}
