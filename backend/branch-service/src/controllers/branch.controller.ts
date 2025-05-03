// src/controllers/branch.controller.ts
import { Request, Response } from 'express';
import Branch from '../models/branch.model';

export const createBranch = (req: Request, res: Response) => {
  const { name, location, warehouseId, managerId } = req.body;
  const newBranch = new Branch({ name, location, warehouseId, managerId });

  newBranch.save()
    .then((savedBranch) => {
      res.status(201).json({
        message: 'Branch created successfully',
        data: savedBranch,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Server error', error });
    });
};

export const getAllBranches = (req: Request, res: Response) => {
  Branch.find()
    .then((branches) => {
      res.status(200).json({
        message: 'Branches fetched successfully',
        data: branches,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Server error', error });
    });
};

export const getBranchesByWarehouseId = (req: Request, res: Response) => {
  const { warehouseId } = req.params;

  Branch.find({ warehouseId })
    .then((branches) => {
      if (branches.length === 0) {
        return res.status(404).json({
          message: 'No branches found for this warehouse',
          data: [],
        });
      }
      res.status(200).json({
        message: 'Branches fetched successfully',
        data: branches,
      });
    })
    .catch((error) => {
      console.error('Error fetching branches by warehouseId:', error);
      res.status(500).json({ message: 'Server error', error });
    });
};

import axios from 'axios';

const WAREHOUSE_SERVICE_URL = 'http://localhost:5003/api';

export const getBranchWithWarehouseInfo = (req: Request, res: Response) => {
  const { branchId } = req.params;

  Branch.findById(branchId)
    .then(branch => {
      if (!branch) {
        res.status(404).json({ message: 'Branch not found' });
        return;  // ✅ Add this return to stop further execution
      }

      return axios
        .get(`${WAREHOUSE_SERVICE_URL}/warehouses/${branch.warehouseId}`)
        .then(warehouseResponse => {
          res.status(200).json({
            message: 'Branch with warehouse info fetched successfully',
            data: {
              branch,
              warehouse: warehouseResponse.data.data,
            },
          });
        });
    })
    .catch(error => {
      console.error('Error fetching branch with warehouse info:', error);
      res.status(500).json({ message: 'Server error', error });
    });
};


const STOCK_SERVICE_URL = 'http://localhost:5005/api/stocks';

export const getBranchStock = async (req: Request, res: Response) => {
  const { id: branchId } = req.params;

  try {
    const response = await axios.get(`${STOCK_SERVICE_URL}?branchId=${branchId}`);
    res.status(200).json({
      message: 'Branch stock fetched successfully',
      data: response.data.data,
    });
  } catch (error: any) {
    console.error('Error fetching branch stock:', error.message);
    res.status(500).json({ message: 'Failed to fetch branch stock' });
  }
};