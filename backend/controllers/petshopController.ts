import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Petshop, Pet } from '../models/petshop';
import { petshops } from '../middlewares/checkExistsUserAccount';
import { validateCNPJ } from '../utils/validateCNPJ';

export function createPetshop(req: Request, res: Response): void {
  const { name, cnpj } = req.body;

  if (!validateCNPJ(cnpj)) {
    res.status(400).json({ error: 'CNPJ inválido. Use o formato XX.XXX.XXX/0001-XX.' });
    return;
  }

  if (petshops.some(p => p.cnpj === cnpj)) {
    res.status(400).json({ error: 'Já existe um petshop com esse CNPJ.' });
    return;
  }

  const petshop: Petshop = {
    id: uuidv4(),
    name,
    cnpj,
    pets: []
  };

  petshops.push(petshop);

  res.status(201).json(petshop);
}

export function getPets(req: Request, res: Response): void {
  res.status(200).json(req.petshop?.pets || []);
}

export function addPet(req: Request, res: Response): void {
  const { name, type, description, deadline_vaccination } = req.body;

  const pet: Pet = {
    id: uuidv4(),
    name,
    type,
    description,
    vaccinated: false,
    deadline_vaccination: new Date(deadline_vaccination),
    created_at: new Date()
  };

  req.petshop?.pets.push(pet);

  res.status(201).json(pet);
}

export function updatePet(req: Request, res: Response): void {
  const { id } = req.params;
  const { name, type, description, deadline_vaccination } = req.body;

  const pet = req.petshop?.pets.find(p => p.id === id);

  if (!pet) {
    res.status(404).json({ error: 'Pet não encontrado.' });
    return;
  }

  pet.name = name || pet.name;
  pet.type = type || pet.type;
  pet.description = description || pet.description;
  pet.deadline_vaccination = deadline_vaccination ? new Date(deadline_vaccination) : pet.deadline_vaccination;

  res.status(200).json(pet);
}

export function markAsVaccinated(req: Request, res: Response): void {
  const { id } = req.params;

  const pet = req.petshop?.pets.find(p => p.id === id);

  if (!pet) {
    res.status(404).json({ error: 'Pet não encontrado.' });
    return;
  }

  pet.vaccinated = true;

  res.status(200).json(pet);
}

export function deletePet(req: Request, res: Response): void {
  const { id } = req.params;

  const petIndex = req.petshop?.pets.findIndex(p => p.id === id);

  if (petIndex === undefined || petIndex === -1) {
    res.status(404).json({ error: 'Pet não encontrado.' });
    return;
  }

  req.petshop?.pets.splice(petIndex, 1);

  res.status(200).json(req.petshop?.pets || []);
}
