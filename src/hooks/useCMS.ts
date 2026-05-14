import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter,
  QueryConstraint,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { SITE_ID } from '../context/AuthContext';
import slugify from 'slugify';

export const getCMSCollectionPath = (collectionName: string) => `sites/${SITE_ID}/${collectionName}`;

export interface CMSItem {
  id: string;
  [key: string]: any;
}

export const useCMS = () => {
  const fetchItems = async (collectionName: string, constraints: QueryConstraint[] = []) => {
    const q = query(collection(db, getCMSCollectionPath(collectionName)), ...constraints);
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CMSItem));
  };

  const fetchItemBySlug = async (collectionName: string, slug: string) => {
    const q = query(
      collection(db, getCMSCollectionPath(collectionName)), 
      where('slug', '==', slug),
      limit(1)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as CMSItem;
  };

  const saveItem = async (collectionName: string, data: any, id?: string) => {
    const siteCollection = collection(db, getCMSCollectionPath(collectionName));
    const now = Timestamp.now();
    
    // Auto-generate slug if title exists
    if (data.title && !data.slug) {
      data.slug = slugify(data.title, { lower: true, strict: true });
    }

    const payload = {
      ...data,
      updatedAt: now,
      createdAt: data.createdAt || now,
    };

    if (id) {
      await updateDoc(doc(db, getCMSCollectionPath(collectionName), id), payload);
      return id;
    } else {
      const docRef = await addDoc(siteCollection, payload);
      return docRef.id;
    }
  };

  const deleteItem = async (collectionName: string, id: string) => {
    await deleteDoc(doc(db, getCMSCollectionPath(collectionName), id));
  };

  const uploadFile = async (file: File) => {
    const isVideo = file.type.startsWith('video/');
    const maxSize = isVideo ? 20 * 1024 * 1024 : 2 * 1024 * 1024; // 20MB for video, 2MB for images
    if (file.size > maxSize) throw new Error(`File too large (max ${maxSize / (1024 * 1024)}MB)`);
    const storageRef = ref(storage, `sites/${SITE_ID}/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  };

  return { fetchItems, fetchItemBySlug, saveItem, deleteItem, uploadFile, uploadImage: uploadFile };
};
