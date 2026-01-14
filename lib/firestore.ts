import { adminDb } from './firebase-admin';

export interface PaginationOptions {
  page?: number;
  limit?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class FirestoreService {
  async create<T>(collection: string, data: any, customId?: string): Promise<T> {
    const docRef = customId 
      ? adminDb.collection(collection).doc(customId)
      : adminDb.collection(collection).doc();
    
    const timestamp = new Date().toISOString();
    const docData = {
      ...data,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    
    await docRef.set(docData);
    
    return {
      id: docRef.id,
      ...docData
    } as T;
  }

  async findById<T>(collection: string, id: string): Promise<T | null> {
    const doc = await adminDb.collection(collection).doc(id).get();
    if (!doc.exists) return null;
    
    return {
      id: doc.id,
      ...doc.data()
    } as T;
  }

  async findOne<T>(collection: string, field: string, value: any): Promise<T | null> {
    const snapshot = await adminDb.collection(collection)
      .where(field, '==', value)
      .limit(1)
      .get();
    
    if (snapshot.empty) return null;
    
    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    } as T;
  }

  async findAll<T>(
    collection: string,
    filters?: { field: string; operator: any; value: any }[],
    options?: PaginationOptions
  ): Promise<PaginatedResult<T>> {
    let query: any = adminDb.collection(collection);
    
    if (filters) {
      filters.forEach(filter => {
        query = query.where(filter.field, filter.operator, filter.value);
      });
    }
    
    // Get total count first (without orderBy to avoid index issues)
    const countSnapshot = await query.get();
    const total = countSnapshot.size;
    
    // Apply pagination
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const offset = (page - 1) * limit;
    
    query = query.offset(offset).limit(limit);
    
    const snapshot = await query.get();
    let data = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data()
    })) as T[];
    
    // Sort client-side to avoid Firebase index requirement
    if (options?.orderBy) {
      const direction = options.orderDirection || 'asc';
      data = data.sort((a: any, b: any) => {
        const aVal = a[options.orderBy!];
        const bVal = b[options.orderBy!];
        if (direction === 'asc') {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });
    }
    
    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  async update<T>(collection: string, id: string, data: any): Promise<T> {
    const docRef = adminDb.collection(collection).doc(id);
    const updateData = {
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    await docRef.update(updateData);
    
    const doc = await docRef.get();
    return {
      id: doc.id,
      ...doc.data()
    } as T;
  }

  async delete(collection: string, id: string): Promise<void> {
    await adminDb.collection(collection).doc(id).delete();
  }

  async count(collection: string, filters?: { field: string; operator: any; value: any }[]): Promise<number> {
    let query: any = adminDb.collection(collection);
    
    if (filters) {
      filters.forEach(filter => {
        query = query.where(filter.field, filter.operator, filter.value);
      });
    }
    
    const snapshot = await query.get();
    return snapshot.size;
  }
}

export const firestoreService = new FirestoreService();
