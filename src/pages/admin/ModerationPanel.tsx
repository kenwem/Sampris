import React, { useState, useEffect } from 'react';
import { useCMS, CMSItem } from '../../hooks/useCMS';
import { 
  CheckCircle, 
  Clock, 
  Trash2, 
  MessageSquare, 
  Filter,
  Search,
  ExternalLink
} from 'lucide-react';
import { db } from '../../firebase';
import { 
  collection, 
  query, 
  getDocs, 
  doc, 
  deleteDoc, 
  updateDoc, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { SITE_ID } from '../../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';

export default function ModerationPanel() {
  const [comments, setComments] = useState<CMSItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('pending');

  const collections = ['posts', 'products', 'projects', 'editorials'];

  const fetchAllComments = async () => {
    setLoading(true);
    let allComments: any[] = [];

    // Loop through collections to fetch comments as requested (no collectionGroup)
    for (const coll of collections) {
      const q = query(
        collection(db, `sites/${SITE_ID}/${coll}`),
      );
      const snapshot = await getDocs(q);
      
      for (const itemDoc of snapshot.docs) {
        const commentsSnapshot = await getDocs(
          collection(db, `sites/${SITE_ID}/${coll}/${itemDoc.id}/comments`)
        );
        commentsSnapshot.docs.forEach(cDoc => {
          allComments.push({
            id: cDoc.id,
            path: `sites/${SITE_ID}/${coll}/${itemDoc.id}/comments/${cDoc.id}`,
            sourceCollection: coll,
            sourceId: itemDoc.id,
            ...cDoc.data()
          });
        });
      }
    }

    setComments(allComments.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds));
    setLoading(false);
  };

  useEffect(() => {
    fetchAllComments();
  }, []);

  const handleApprove = async (comment: any) => {
    const commentRef = doc(db, comment.path);
    await updateDoc(commentRef, { status: 'approved' });
    fetchAllComments();
  };

  const handleDelete = async (comment: any) => {
    const commentRef = doc(db, comment.path);
    await deleteDoc(commentRef);
    fetchAllComments();
  };

  const filteredComments = comments.filter(c => filter === 'all' || c.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Comment Moderation</h1>
          <p className="text-slate-500 text-sm">Manage feedback across all sections</p>
        </div>
        <div className="flex gap-2">
          {['pending', 'approved', 'all'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${
                filter === f ? 'bg-brand-primary text-white' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">
            <Clock className="animate-spin mx-auto mb-4" />
            Scanning for comments...
          </div>
        ) : filteredComments.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
            No {filter !== 'all' ? filter : ''} comments found.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredComments.map((comment: any) => (
              <div key={comment.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-brand-primary">
                      {comment.userName?.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{comment.userName}</span>
                        <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded uppercase font-bold tracking-widest">
                          {comment.sourceCollection}
                        </span>
                        {comment.status === 'pending' && (
                          <span className="text-[10px] bg-amber-100 text-amber-600 px-2 py-0.5 rounded uppercase font-bold tracking-widest">
                            Pending
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        {comment.userEmail} • {comment.createdAt ? formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true }) : ''}
                      </p>
                      <p className="mt-3 text-slate-700 text-sm leading-relaxed max-w-2xl whitespace-pre-wrap">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {comment.status === 'pending' && (
                      <button
                        onClick={() => handleApprove(comment)}
                        className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                        title="Approve"
                      >
                        <CheckCircle size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(comment)}
                      className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
