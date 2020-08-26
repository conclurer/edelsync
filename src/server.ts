import express from 'express';
import {processData} from './functions/process.func';
import {Configuration} from './interfaces/configuration.interface';
import {middleware} from './functions/middleware.func';
import Loggy from './functions/loggy.func';
import {Vars} from './vars';
import {wrapResponse} from './functions/response-wrapper.func';

export default function provideSyncService(config: Configuration) {
    Vars.loggy = new Loggy(config);
    /**
     * Setup
     */
    const app = express();
    const PORT: string | number = process.env.PORT || 5000;
    const router = express.Router();
    /**
     * Middleware
     */
    router.use((req, res, next) => middleware(req, res, next, config));
    app.use(router);

    /**
     * Routes
     */
    app.use('/api/v1/process', (req, res) => processData(req, res));
    app.use('/api/v1', (req, res) => {
        res.send(wrapResponse(true, {
            versionHash: process.env.SOURCE_VERSION || 'unknown'
        }));
    });

    /**
     * Server
     */
    app.listen(PORT, () => Vars.loggy.log(`Starting server on http://localhost:${PORT}`));
}
