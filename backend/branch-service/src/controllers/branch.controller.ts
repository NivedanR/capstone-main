import { Request, Response } from 'express';
import Branch from '../models/branch.model';


export const createBranch = async (req: Request, res: Response) => {
  try {
    const { name, location, warehouseId, managerId } = req.body;
    const newBranch = new Branch({ name, location, warehouseId, managerId });
    await newBranch.save();
    res.status(201).json({ message: 'Branch created successfully', data: newBranch });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getAllBranches = async (req: Request, res: Response) => {
  try {
    const branches = await Branch.find(); //.populate('warehouseId').populate('managerId');
    res.status(200).json({ message: 'Branches fetched successfully', data: branches });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
