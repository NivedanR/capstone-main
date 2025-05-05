import { Request, Response, NextFunction } from 'express';
import StockOverview from '../models/stockOverview.model';

// Create
export const createStock = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const stock = new StockOverview(req.body);
    await stock.save();
    res.status(201).json({ message: 'Stock created', data: stock });
  } catch (err: any) {
    next(err);
  }
};

// Get all
export const getAllStocks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const stocks = await StockOverview.find();
    res.json({ data: stocks });
  } catch (err: any) {
    next(err);
  }
};

// Get by ID
export const getStockById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const stock = await StockOverview.findById(req.params.id);
    if (!stock) {
      res.status(404).json({ message: 'Stock not found' });
      return;
    }
    res.json({ data: stock });
  } catch (err: any) {
    next(err);
  }
};

// Update
export const updateStock = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const stock = await StockOverview.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!stock) {
      res.status(404).json({ message: 'Stock not found' });
      return;
    }
    res.json({ message: 'Stock updated', data: stock });
  } catch (err: any) {
    next(err);
  }
};

// Delete
export const deleteStock = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const stock = await StockOverview.findByIdAndDelete(req.params.id);
    if (!stock) {
      res.status(404).json({ message: 'Stock not found' });
      return;
    }
    res.json({ message: 'Stock deleted' });
  } catch (err: any) {
    next(err);
  }
};

// Get by warehouseId
export const getStockByWarehouseId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { warehouseId } = req.params;
    if (!warehouseId) {
      res.status(400).json({ message: 'warehouseId is required' });
      return;
    }
    const stocks = await StockOverview.find({ warehouseId });
    if (!stocks.length) {
      res.status(404).json({ message: 'No stock found for the warehouse' });
      return;
    }
    res.status(200).json({ data: stocks });
  } catch (err: any) {
    console.error('Error fetching stock by warehouse:', err.message);
    next(err);
  }
};

// Get by branchId (from query string)
export const getStockByBranchId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const branchId = req.params.branchId as string;
    if (!branchId) {
      res.status(400).json({ message: 'branchId is required' });
      return;
    }
    const stocks = await StockOverview.find({ branchId });
    if (!stocks.length) {
      res.status(404).json({ message: 'No stock found for the branch' });
      return;
    }
    res.status(200).json({ data: stocks });
  } catch (err: any) {
    console.error('Error fetching stock by branch:', err.message);
    next(err);
  }
};

export const getStockByBranchAndProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { branchId, productId } = req.params;

    if (!branchId || !productId) {
      res.status(400).json({ message: 'branchId and productId are required' });
      return;
    }

    const stocks = await StockOverview.find({ branchId, productId });

    if (!stocks.length) {
      res.status(404).json({ message: 'No stock found for this branch and product' });
      return;
    }

    res.status(200).json({ data: stocks });
  } catch (err: any) {
    console.error('Error fetching stock by branch and product:', err.message);
    next(err);
  }
};

