import { Request, Response, NextFunction } from 'express';
import StockOverview from '../models/stockOverview.model';

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

export const getAllStocks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const stocks = await StockOverview.find();
      // .populate('productId')
      // .populate('warehouseId')
      // .populate('branchId');
    res.json({ data: stocks });
  } catch (err: any) {
    next(err);
  }
};

export const getStockById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const stock = await StockOverview.findById(req.params.id);
      // .populate('productId')
      // .populate('warehouseId')
      // .populate('branchId');
    if (!stock) {
      res.status(404).json({ message: 'Stock not found' });
      return;
    }
    res.json({ data: stock });
  } catch (err: any) {
    next(err);
  }
};

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
