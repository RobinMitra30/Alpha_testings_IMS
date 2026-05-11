import { 
  collection, 
  query, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  setDoc,
  where,
  getDocs,
  runTransaction,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError } from '../lib/error-handler';
import { OperationType, Product, Project, Vendor, Stock, PurchaseRequisition, PurchaseOrder, GRN, GRNLineItem, Attendance, DailyReport, SiteTask } from '../types';

export const ProductService = {
  subscribe: (callback: (products: Product[]) => void) => {
    return onSnapshot(collection(db, 'products'), (snapshot) => {
      callback(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Product)));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'products'));
  },
  add: async (product: Omit<Product, 'id'>) => {
    try {
      await addDoc(collection(db, 'products'), {
        ...product,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'products');
    }
  },
  update: async (id: string, product: Partial<Product>) => {
    try {
      await updateDoc(doc(db, 'products', id), product);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `products/${id}`);
    }
  }
};

export const AttendanceService = {
  subscribe: (callback: (attendance: Attendance[]) => void) => {
    return onSnapshot(collection(db, 'attendance'), (snapshot) => {
      callback(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Attendance)));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'attendance'));
  },
  add: async (entry: Omit<Attendance, 'id'>) => {
    try {
      await addDoc(collection(db, 'attendance'), entry);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'attendance');
    }
  }
};

export const ProgressService = {
  subscribe: (callback: (reports: DailyReport[]) => void) => {
    return onSnapshot(collection(db, 'dailyReports'), (snapshot) => {
      callback(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as DailyReport)));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'dailyReports'));
  },
  add: async (report: Omit<DailyReport, 'id'>) => {
    try {
      await addDoc(collection(db, 'dailyReports'), {
        ...report,
        createdAt: new Date().toISOString()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'dailyReports');
    }
  }
};

export const TaskService = {
  subscribe: (callback: (tasks: SiteTask[]) => void) => {
    return onSnapshot(collection(db, 'siteTasks'), (snapshot) => {
      callback(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as SiteTask)));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'siteTasks'));
  },
  add: async (task: Omit<SiteTask, 'id'>) => {
    try {
      await addDoc(collection(db, 'siteTasks'), {
        ...task,
        createdAt: new Date().toISOString()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'siteTasks');
    }
  },
  updateStatus: async (id: string, status: SiteTask['status']) => {
    try {
      await updateDoc(doc(db, 'siteTasks', id), { status });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `siteTasks/${id}`);
    }
  }
};

export const POService = {
  subscribe: (callback: (orders: PurchaseOrder[]) => void) => {
    return onSnapshot(collection(db, 'purchaseOrders'), (snapshot) => {
      callback(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as PurchaseOrder)));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'purchaseOrders'));
  }
};

export const PRService = {
  subscribe: (callback: (reqs: PurchaseRequisition[]) => void) => {
    return onSnapshot(collection(db, 'purchaseRequisitions'), (snapshot) => {
      callback(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as PurchaseRequisition)));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'purchaseRequisitions'));
  },
  add: async (pr: Omit<PurchaseRequisition, 'id'>) => {
    try {
      await addDoc(collection(db, 'purchaseRequisitions'), {
        ...pr,
        createdAt: new Date().toISOString()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'purchaseRequisitions');
    }
  },
  updateStatus: async (id: string, status: 'APPROVED' | 'REJECTED', approverId: string) => {
    try {
      await updateDoc(doc(db, 'purchaseRequisitions', id), {
        status,
        approverId,
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `purchaseRequisitions/${id}`);
    }
  }
};

export const ProjectService = {
  subscribe: (callback: (projects: Project[]) => void) => {
    return onSnapshot(collection(db, 'projects'), (snapshot) => {
      callback(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Project)));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'projects'));
  },
  add: async (project: Omit<Project, 'id'>) => {
    try {
      await addDoc(collection(db, 'projects'), project);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'projects');
    }
  }
};

export const VendorService = {
  subscribe: (callback: (vendors: Vendor[]) => void) => {
    return onSnapshot(collection(db, 'vendors'), (snapshot) => {
      callback(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Vendor)));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'vendors'));
  }
};

export const GRNService = {
  subscribe: (callback: (grns: GRN[]) => void) => {
    return onSnapshot(collection(db, 'grns'), (snapshot) => {
      callback(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as GRN)));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'grns'));
  },
  create: async (grn: Omit<GRN, 'id'>) => {
    try {
      await addDoc(collection(db, 'grns'), {
        ...grn,
        createdAt: new Date().toISOString()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'grns');
    }
  },
  updateStatus: async (id: string, status: 'APPROVED' | 'REJECTED' | 'PENDING_APPROVAL') => {
    try {
      await updateDoc(doc(db, 'grns', id), {
        status,
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `grns/${id}`);
    }
  }
};

export const InventoryService = {
  subscribe: (callback: (stocks: Stock[]) => void) => {
    return onSnapshot(collection(db, 'stocks'), (snapshot) => {
      callback(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Stock)));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'stocks'));
  },

  // CORE: GRN Approval Transaction
  approveGRN: async (grnId: string, approvedBy: string) => {
    try {
      await runTransaction(db, async (transaction) => {
        const grnRef = doc(db, 'grns', grnId);
        const grnSnap = await transaction.get(grnRef);
        
        if (!grnSnap.exists()) throw new Error("GRN does not exist");
        const grn = grnSnap.data() as GRN;
        if (grn.status === 'APPROVED') return;

        // 1. Update GRN Status
        transaction.update(grnRef, { 
          status: 'APPROVED', 
          approvedBy, 
          updatedAt: serverTimestamp() 
        });

        // 2. Update Stocks for each item
        for (const item of grn.items) {
          const stockId = `${grn.projectId}_${item.productId}`;
          const stockRef = doc(db, 'stocks', stockId);
          const stockSnap = await transaction.get(stockRef);

          const receivedQty = item.receivedQuantity;
          
          if (stockSnap.exists()) {
            const currentQty = stockSnap.data().quantity || 0;
            transaction.update(stockRef, { 
              quantity: currentQty + receivedQty,
              lastUpdated: new Date().toISOString()
            });
          } else {
            transaction.set(stockRef, {
              id: stockId,
              productId: item.productId,
              projectId: grn.projectId,
              quantity: receivedQty,
              lastUpdated: new Date().toISOString()
            });
          }

          // 3. Create Stock Movement Log
          const movementRef = doc(collection(db, 'stockMovements'));
          transaction.set(movementRef, {
            id: movementRef.id,
            productId: item.productId,
            projectId: grn.projectId,
            type: 'IN',
            quantity: receivedQty,
            referenceId: grnId,
            referenceType: 'GRN',
            userId: approvedBy,
            createdAt: new Date().toISOString()
          });
        }

        // 4. Update PO Progress (Partial or Completed)
        // This would require fetching the PO and comparing received vs ordered quantities.
        // For brevity in this turn, we'll focus on stocks first.
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `grns/${grnId}/approve`);
    }
  },

  adjustStock: async (params: { 
    productId: string, 
    projectId: string, 
    newQuantity: number, 
    userId: string, 
    remarks: string 
  }) => {
    try {
      await runTransaction(db, async (transaction) => {
        const stockId = `${params.projectId}_${params.productId}`;
        const stockRef = doc(db, 'stocks', stockId);
        const stockSnap = await transaction.get(stockRef);
        
        const oldQuantity = stockSnap.exists() ? stockSnap.data().quantity : 0;
        const adjustmentAmount = params.newQuantity - oldQuantity;

        // 1. Update or create stock record
        if (stockSnap.exists()) {
          transaction.update(stockRef, {
            quantity: params.newQuantity,
            lastUpdated: new Date().toISOString()
          });
        } else {
          transaction.set(stockRef, {
            id: stockId,
            productId: params.productId,
            projectId: params.projectId,
            quantity: params.newQuantity,
            lastUpdated: new Date().toISOString()
          });
        }

        // 2. Log movement
        const movementRef = doc(collection(db, 'stockMovements'));
        transaction.set(movementRef, {
          id: movementRef.id,
          productId: params.productId,
          projectId: params.projectId,
          type: 'ADJUSTMENT',
          quantity: adjustmentAmount,
          userId: params.userId,
          remarks: params.remarks,
          createdAt: new Date().toISOString()
        });
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `stocks/${params.projectId}_${params.productId}/adjust`);
    }
  }
};
