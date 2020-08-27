import {Configuration} from '../interfaces/configuration.interface';

export default class Loggy {

    constructor(private readonly config: Configuration) {
    }

    public log(...data: unknown[]) {
        if (!this.config.webserviceConfig?.logging) return;
        console.log('📗', ...data);
    }

    public info(...data: unknown[]) {
        if (!this.config.webserviceConfig?.logging) return;
        console.info('📘', ...data);
    }

    public warn(...data: unknown[]) {
        if (!this.config.webserviceConfig?.logging) return;
        console.warn('📙', ...data);
    }

    public error(...data: unknown[]) {
        console.error('📕', ...data, '\x1b[0m');
    }

}
