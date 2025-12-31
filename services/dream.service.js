import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    Timestamp,
    updateDoc,
    where,
} from 'firebase/firestore';
import { db } from './firebase';

const COLLECTION_NAME = 'dreams';

// Get user's dreams collection reference
const getUserDreamsRef = (userId) => {
  return collection(db, 'users', userId, COLLECTION_NAME);
};

// Add a new dream
export const addDream = async (userId, dreamData) => {
  try {
    const dreamsRef = getUserDreamsRef(userId);
    
    // Use provided dreamDate or server timestamp
    const createdAt = dreamData.dreamDate 
      ? Timestamp.fromDate(new Date(dreamData.dreamDate))
      : serverTimestamp();
    
    // Remove dreamDate from data to avoid storing it separately
    const { dreamDate, ...dataWithoutDreamDate } = dreamData;
    
    const docRef = await addDoc(dreamsRef, {
      ...dataWithoutDreamDate,
      createdAt,
      updatedAt: serverTimestamp(),
    });
    return { id: docRef.id, error: null };
  } catch (error) {
    return { id: null, error: error.message };
  }
};

// Get all dreams for a user
export const getDreams = async (userId) => {
  try {
    const dreamsRef = getUserDreamsRef(userId);
    const q = query(dreamsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const dreams = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    return { dreams, error: null };
  } catch (error) {
    return { dreams: [], error: error.message };
  }
};

// Get a single dream by ID
export const getDreamById = async (userId, dreamId) => {
  try {
    const dreamRef = doc(db, 'users', userId, COLLECTION_NAME, dreamId);
    const dreamSnap = await getDoc(dreamRef);
    
    if (dreamSnap.exists()) {
      return { dream: { id: dreamSnap.id, ...dreamSnap.data() }, error: null };
    } else {
      return { dream: null, error: 'Dream not found' };
    }
  } catch (error) {
    return { dream: null, error: error.message };
  }
};

// Update a dream
export const updateDream = async (userId, dreamId, updates) => {
  try {
    const dreamRef = doc(db, 'users', userId, COLLECTION_NAME, dreamId);
    await updateDoc(dreamRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

// Delete a dream
export const deleteDream = async (userId, dreamId) => {
  try {
    const dreamRef = doc(db, 'users', userId, COLLECTION_NAME, dreamId);
    await deleteDoc(dreamRef);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

// Get dreams by category
export const getDreamsByCategory = async (userId, category) => {
  try {
    const dreamsRef = getUserDreamsRef(userId);
    const q = query(
      dreamsRef,
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const dreams = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    return { dreams, error: null };
  } catch (error) {
    return { dreams: [], error: error.message };
  }
};

// Search dreams by title or content (client-side filtering for offline support)
export const searchDreams = async (userId, searchQuery) => {
  try {
    const { dreams, error } = await getDreams(userId);
    
    if (error) {
      return { dreams: [], error };
    }
    
    const lowerQuery = searchQuery.toLowerCase();
    const filteredDreams = dreams.filter(
      (dream) =>
        dream.title?.toLowerCase().includes(lowerQuery) ||
        dream.content?.toLowerCase().includes(lowerQuery)
    );
    
    return { dreams: filteredDreams, error: null };
  } catch (error) {
    return { dreams: [], error: error.message };
  }
};
