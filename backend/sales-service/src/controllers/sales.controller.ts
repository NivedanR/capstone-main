// src/controllers/sales.controller.ts
import { RequestHandler } from 'express';
import * as salesService from '../services/sales.service';

export const createOrder: RequestHandler = async (req, res, next) => {
  try {
    const { order, invoicePath } = await salesService.createOrder(req.body);
    res.status(201).json({ message: 'Order created', data: order, invoicePath });
    return; // <— explicitly end the function with no value
  } catch (error: any) {
    console.error('Create order error:', error);
    next(error);
  }
};

export const getAllOrders: RequestHandler = async (_req, res, next) => {
  try {
    const orders = await salesService.getAllOrders();
    res.json({ data: orders });
    return;
  } catch (error: any) {
    console.error('Get all orders error:', error);
    next(error);
  }
};

export const getOrderById: RequestHandler = async (req, res, next) => {
  try {
    const order = await salesService.getOrderById(req.params.id);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;  // <— drop the returned Response
    }
    res.json({ data: order });
    return;
  } catch (error: any) {
    console.error('Get order by id error:', error);
    next(error);
  }
};

export const updateOrder: RequestHandler = async (req, res, next) => {
  try {
    const order = await salesService.updateOrder(req.params.id, req.body);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    res.json({ message: 'Order updated', data: order });
    return;
  } catch (error: any) {
    console.error('Update order error:', error);
    next(error);
  }
};

export const deleteOrder: RequestHandler = async (req, res, next) => {
  try {
    const order = await salesService.deleteOrder(req.params.id);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    res.json({ message: 'Order deleted' });
    return;
  } catch (error: any) {
    console.error('Delete order error:', error);
    next(error);
  }
};
