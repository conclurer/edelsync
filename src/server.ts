import express from 'express';
import {processData} from './functions/process.func';
import {Configuration, ConfigurationInput} from './interfaces/configuration.interface';
import {middleware} from './functions/middleware.func';
import Loggy from './functions/loggy.func';
import {Vars} from './vars';
import {wrapResponse} from './functions/response-wrapper.func';
import {configurationLoader} from './functions/configuration-loader.func';
import fileUpload from 'express-fileupload';
import tempDirectory from 'temp-dir';

export default function provideSyncService(config: ConfigurationInput) {
    Vars.loggy = new Loggy();
    const loadedConfig = configurationLoader(config);
    /**
     * Setup
     */
    const app = express();
    const PORT: string | number = process.env.PORT || 5000;
    const router = express.Router();
    /**
     * Middleware
     */
    router.use((req, res, next) => middleware(req, res, next, loadedConfig));
    app.use(router);

    /**
     * File uploads
     */
    app.use(fileUpload({
        useTempFiles: true,
        tempFileDir: tempDirectory
    }));

    /**
     * Routes
     */
    app.post('/api/v1/process', (req, res) => processData(req, res, loadedConfig));
    app.get('/api/v1', (req, res) => {
        res.send(wrapResponse(true));
    });

    app.use((req, res, next) => {
        res.status(404).send(wrapResponse(false, {
            error: 'Unable to find the requested resource!'
        }));
        Vars.loggy.error('[Router] Error 404: Request: ', {
            url: req.url,
            query: req.query,
            statusCode: req.statusCode,
            method: req.method,
            protocol: req.protocol,
            headers: {
                userAgent: req.headers['user-agent']
            }
        })
    });

    /**
     * Server
     */
    app.listen(PORT, () => Vars.loggy.log(`[Server] Starting on http://localhost:${PORT}`));
}
