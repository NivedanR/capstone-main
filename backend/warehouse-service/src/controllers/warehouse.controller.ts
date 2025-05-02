import { Request, Response } from 'express';
import Warehouse from '../models/warehouse.model';

export const createWarehouse = async (req: Request, res: Response) => {
  try {
    const warehouse = await Warehouse.create(req.body);
    res.status(201).json(warehouse);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const getAllWarehouses = async (_req: Request, res: Response) => {
  try {
    const warehouses = await Warehouse.find();
    res.status(200).json(warehouses);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};
