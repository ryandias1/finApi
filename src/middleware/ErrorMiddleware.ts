import type { NextFunction, Request, Response } from 'express';
import { treeifyError, ZodError } from 'zod';
import { Prisma } from '../generated/prisma/client.js';
import { AppError } from '../errors/AppError.js';

export function errorMiddleware(
    error: Error & { statusCode?: number },
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (error instanceof ZodError) {
        console.log(error)
        return res.status(400).json({
            status: 400,
            message: 'Erro de validação nos dados enviados.',
            details: treeifyError(error)
        });
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') { 
            return res.status(409).json({status: 409, message: 'Conflito: Este registro já existe.' });
        }
        if (error.code === 'P2003') { 
            return res.status(400).json({status: 400, message: 'Erro de relação: A conta informada não existe.' });
        }
    }

    const statusCode = error instanceof AppError ? error.statusCode : (error.statusCode || 500);
    const message = statusCode === 500 ? 'Erro interno do servidor' : error.message;


    console.error(' [Error Log]:', error)
    return res.status(statusCode).json({
        status: statusCode,
        message,
    })
}