import { Request, Response, NextFunction } from 'express';
import ProductService from '../services/product.service';

export class ProductController {
  static async createProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const product = await ProductService.createProduct(req.body);
      res.status(201).json({ message: 'Product created successfully', product });
    } catch (error: any) {
      next(error);
    }
  }

  static async getProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).json(products);
    } catch (error: any) {
      next(error);
    }
  }

  static async getProductById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const product = await ProductService.getProductById(req.params.id);
      if (!product) {
           res.status(404).json({ message: 'Product not found' });
           return;
         }
      res.status(200).json(product);
    } catch (error: any) {
      next(error);
    }
  }
}
