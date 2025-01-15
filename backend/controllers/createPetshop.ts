import { Request, Response } from 'express';
import Petshop from '../models/petshop';
import { v4 as uuidv4 } from 'uuid';


const petshops: Petshop[] = [];

export function createPetshop(req: Request , res: Response):void{
  
  const {name,cnpj,pets} = req.body;
  
  const newPetshop: Petshop = {
    id: uuidv4(),
    name,
    cnpj,
    pets: pets || []
  };

  
  petshops.push(newPetshop);
  res.status(201).json(newPetshop);
  
}