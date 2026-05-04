export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  STORE = 'STORE',
  QC = 'QC',
  ACCOUNTS = 'ACCOUNTS'
}

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  assignedProjects: string[];
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  status: 'ACTIVE' | 'ON_HOLD' | 'COMPLETED';
  budget: number;
  managerId: string;
  createdAt: string;
}

export interface Vendor {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  categories: string[];
  rating: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  uom: string;
  lowStockThreshold: number;
  description: string;
  unitPrice: number;
}

export interface Stock {
  id: string;
  productId: string;
  projectId: string;
  warehouseId?: string;
  quantity: number;
  lastUpdated: string;
}

export interface LineItem {
  productId: string;
  quantity: number;
  estimatedPrice: number;
  quantityReceived?: number;
}

export interface PurchaseRequisition {
  id?: string;
  projectId: string;
  requesterId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  items: LineItem[];
  totalEstimatedAmount: number;
  urgency: 'LOW' | 'MEDIUM' | 'HIGH';
  approverId?: string;
  remarks?: string;
  createdAt: string;
}

export interface POLineItem {
  productId: string;
  quantityOrdered: number;
  quantityReceived: number;
  unitPrice: number;
}

export interface PurchaseOrder {
  id: string;
  prId?: string;
  vendorId: string;
  projectId: string;
  status: 'PENDING' | 'PARTIAL' | 'COMPLETED' | 'CANCELLED';
  items: POLineItem[];
  taxPercent: number;
  discountAmount: number;
  totalAmount: number;
  createdAt: string;
}

export interface GRNLineItem {
  productId: string;
  orderedQuantity: number;
  receivedQuantity: number;
  rejectedQuantity: number;
  qcStatus: 'PASSED' | 'FAILED';
}

export interface GRN {
  id: string;
  grnNumber: string;
  poId: string;
  projectId: string;
  vendorId: string;
  challanNumber: string;
  challanUrl?: string;
  items: GRNLineItem[];
  qcStatus: 'PENDING' | 'PASSED' | 'FAILED' | 'PARTIAL';
  qcRemarks?: string;
  status: 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';
  receivedBy: string;
  approvedBy?: string;
  siteLocation: string;
  createdAt: string;
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}
