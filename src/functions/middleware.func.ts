import {Configuration} from '../interfaces/configuration.interface';
import {NextFunction, Request, Response} from 'express';
import isBlank from 'is-blank';
import ip from 'ip';
import {ApiResponse} from '../interfaces/api-response.interface';
import {Vars} from '../vars';

export function middleware(req: Request, res: Response, next: NextFunction, config: Configuration) {
    const runMiddleware = [
        (config.accessKey ? validateToken(req, config.accessKey) : true),
        (config.allowedIpAddresses ? validateIP(config.allowedIpAddresses, req.ip) : true)
    ];

    if(runMiddleware.every(v => v === true)) {
        next();
    } else {
        res.status(403).send({
            "success": false,
            "error": "Authorization failed; Request aborted"
        } as ApiResponse)
    }
}

function validateIP(allowedIPs: string[] | null, requestIP: string): boolean {
    if (!isBlank(allowedIPs) && allowedIPs != null) {
        Vars.loggy.log("[IP-Middleware] Authorization Rule IP is enabled. Allowed IPs: ", allowedIPs);
        Vars.loggy.log("[IP-Middleware] Current Request IP: ", requestIP);
        if (isBlank(requestIP)) {
            Vars.loggy.error("[IP-Middleware] Cannot get IP of Client - aborting");
            return false;
        }

        let validIPcount = allowedIPs.filter(i => {
            return ip.isEqual(i, requestIP);
        });
        if (validIPcount.length == 0) {
            Vars.loggy.error(`[IP-Middleware] Sender IP Address ${requestIP} is not in allowed IPs`)
            return false;
        } else {
            Vars.loggy.log(`[IP-Middleware] Sender IP Address ${requestIP} equals allowed IP`)
            return true;
        }
    }
    return true;
}

function validateToken(req: Request, token: string | null): boolean {
    if (isBlank(token) || token == null) {
        Vars.loggy.log("[Token-Middleware] Skipping... Token not configured.")
    }
    Vars.loggy.log("[Token-Middleware] Authorization Rule Token is enabled: ", token);
    if (req.query.token == token ) { // || req.headers.authorization?.split("Authorization ") == token) {
        Vars.loggy.log("[Token-Middleware] Authorization successful",);
        return true;
    }
    Vars.loggy.log("[Token-Middleware] Authorization failed. Tokens do not match");
    return false;
}
