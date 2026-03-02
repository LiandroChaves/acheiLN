import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
    role: string;
}

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({ error: 'Token faltando, mn!' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const { sub, role } = verify(token, 'secret_key_limoeiro') as IPayload;

        request.user = {
            id: sub,
            role,
        };

        return next();
    } catch (err) {
        return response.status(401).json({ error: 'Token inválido!' });
    }
}