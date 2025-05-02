import OrderModel from '../models/order.model';
import { generateInvoicePDF } from '../utils/pdfGenerator';
import path from 'path';

export const createOrder = async (orderData: any) => {
  const order = new OrderModel(orderData);
  await order.save();

  // Generate Invoice PDF
  const invoicePath = path.join(__dirname, `../../invoices/invoice-${order.orderNumber}.pdf`);
  await generateInvoicePDF(order, invoicePath);

  return { order, invoicePath };
};

export const getAllOrders = async () => {
  return await OrderModel.find().populate('branchId salesPersonId');
};

export const getOrderById = async (id: string) => {
  return await OrderModel.findById(id).populate('branchId salesPersonId');
};

export const updateOrder = async (id: string, data: any) => {
  return await OrderModel.findByIdAndUpdate(id, data, { new: true });
};

export const deleteOrder = async (id: string) => {
  return await OrderModel.findByIdAndDelete(id);
};
