import { Request, Response, NextFunction } from 'express';
import { Petshop } from '../models/petshop';

declare global {
  namespace Express {
    interface Request {
      petshop?: Petshop;
    }
  }
}

const petshops: Petshop[] = []; // Banco de dados fictício

export function checkExistsUserAccount(req: Request, res: Response, next: NextFunction): void {
  const { cnpj } = req.headers;

  if (!cnpj || typeof cnpj !== 'string') {
    res.status(400).json({ error: 'CNPJ é obrigatório e deve ser uma string' });
    return;
  }

  const petshop = petshops.find(p => p.cnpj === cnpj);

  if (!petshop) {
    res.status(404).json({ error: 'Petshop não encontrado' });
    return;
  }

  req.petshop = petshop;
  next();
}

export { petshops };
