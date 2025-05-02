import { Request, Response, NextFunction } from 'express';
import Company from '../models/company.model';

export const createCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, contactPerson, contactEmail, contactPhone, address } = req.body;

    const existing = await Company.findOne({ contactEmail });
    if (existing) {
      res.status(400).json({ message: 'Company already exists' });
      return;
    }

    const newCompany = new Company({ name, contactPerson, contactEmail, contactPhone, address });
    await newCompany.save();

    res.status(201).json({ message: 'Company created', company: newCompany });
  } catch (err: any) {
    next(err);
  }
};

export const getCompanies = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (err: any) {
    next(err);
  }
};

export const getCompanyById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      res.status(404).json({ message: 'Company not found' });
      return;
    }
    res.status(200).json(company);
  } catch (err: any) {
    next(err);
  }
};
