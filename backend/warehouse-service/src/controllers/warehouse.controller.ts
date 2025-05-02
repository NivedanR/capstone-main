// src/controllers/warehouse.controller.ts

import { Request, Response } from 'express';
import Warehouse from '../models/warehouse.model';
import axios from 'axios';

const BRANCH_SERVICE_URL =
  process.env.BRANCH_SERVICE_URL || 'http://localhost:5005';

export const createWarehouse = async (
  req: Request,
  res: Response
): Promise<void> => {
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

export const getAllWarehouses = async (
  _req: Request,
  res: Response
): Promise<void> => {
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

export const getWarehouseWithBranches = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { warehouseId } = req.params;
  let warehouse;
  try {
    // 1️⃣ Fetch warehouse info from local DB
    warehouse = await Warehouse.findById(warehouseId);
    if (!warehouse) {
      res.status(404).json({ message: 'Warehouse not found' });
      return;
    }

    // 2️⃣ Fetch branches from the Branch Service
    const response = await axios.get<{ data: any[] }>(
      `${BRANCH_SERVICE_URL}/api/branches/warehouse/${warehouseId}`
    );

    // 3️⃣ Combine both results
    res.status(200).json({
      warehouse,
      branches: response.data.data,
    });
  } catch (error: any) {
    console.error('Error fetching warehouse and branches:', error.message);

    // If branches endpoint returned 404, return empty list
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      res.status(200).json({
        warehouse,
        branches: [],
      });
      return;
    }

    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getWarehouseById = async (req: Request, res: Response): Promise<void> => {
  const { warehouseId } = req.params;
  try {
    const warehouse = await Warehouse.findById(warehouseId);
    if (!warehouse) {
      res.status(404).json({ message: 'Warehouse not found' });
      return;
    }
    res.status(200).json({ data: warehouse });
  } catch (err: any) {
    console.error('Error fetching warehouse by ID:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
