type logObject = {
    message: string;
    extraFields?: any;
};

export default logObject;

export interface ILogger {
    /**
     *
     * @param t
     * @param local
     */
    logInfo(t: logObject): void;
    logError(t: logObject): void;
    logWarn(t: logObject): void;
}
