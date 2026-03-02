import { Request, Response, NextFunction } from 'express';

export function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { role } = request.user;

    if (role !== 'ADMIN') {
        return response.status(401).json({ error: 'Só os adm de Limoeiro podem fazer isso!' });
    }

    return next();
}