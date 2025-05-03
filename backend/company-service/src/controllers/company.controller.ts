
import { Request, Response, NextFunction } from 'express';
import Company from '../models/company.model';
import axios from 'axios';

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
  console.log('🌟 getCompanyWithProducts → hit!', req.method, req.originalUrl);
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      res.status(404).json({ message: 'Company not found' });
      return;
    }
    console.log('🌟 getCompanyWithProducts → hit!');
    res.status(200).json(company);
    
  } catch (err: any) {
    next(err);
  }
};
export const getCompanyWithProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log('🌟 getCompanyWithProducts → START', req.method, req.originalUrl); // STEP 1
  try {
    const company = await Company.findById(req.params.id);
    console.log('🌟 getCompanyWithProducts → after Company.findById', { company }); // STEP 2
    if (!company) {
      console.log('🌟 getCompanyWithProducts → Company not found'); // STEP 3
      res.status(404).json({ message: 'Company not found' });
      return;
    }

    const productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:5002';
    console.log('🌟 getCompanyWithProducts → productServiceUrl:', productServiceUrl); // STEP 4
    try {
        const { data: products } = await axios.get(
          `${productServiceUrl}/api/products/company/${company._id}`
        );
        console.log('🌟 getCompanyWithProducts → after axios.get', { products }); // STEP 5
         res.status(200).json({
        company,
        products,
      });
    }
    catch (axiosError: any) {
         console.error("Axios error", axiosError);
         next(axiosError);
    }

    console.log('🌟 getCompanyWithProducts → after res.status(200).json()'); // STEP 6

  } catch (error: any) {
    console.error('🌟 getCompanyWithProducts → ERROR', error); // STEP 7
    next(error);
  }
  console.log('🌟 getCompanyWithProducts → END'); // STEP 8
};

const escapeRegex = (str: string) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

//This method is not working------------------------------------
export const getCompaniesByNames = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const namesQuery = req.query.names as string | undefined;

    if (!namesQuery) {
      res.status(400).json({ message: 'No company names provided' });
      return;
    }

    // Split the names from the query parameter
    const nameArray = namesQuery
      .split(',')
      .map(name => name.trim())
      .filter(name => name.length > 0);

    console.log('🛠 Received names query:', namesQuery);
    console.log('🛠 Cleaned name array:', nameArray);

    // Generate regex pattern for each name (escape special characters)
    const regexArray = nameArray.map(
      name => new RegExp(`^${escapeRegex(name)}$`, 'i')  // case-insensitive, exact match
    );

    console.log('🛠 MongoDB RegExp array:', regexArray);

    // Find companies based on the names
    const companies = await Company.find({
      name: { $in: regexArray }
    });

    if (companies.length === 0) {
      res.status(404).json({ message: 'No companies found matching the provided names' });
      return;
    }

    res.status(200).json(companies);
  } catch (err: any) {
    next(err);
  }
};
