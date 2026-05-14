import React, { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  Timestamp,
  doc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth, SITE_ID, ADMIN_EMAIL } from '../context/AuthContext';
import { MessageSquare, Trash2, CheckCircle, Reply } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Comment {
  id: string;
  userId: string;
  userEmail: string;
  userName?: string;
  text: string;
  status: 'pending' | 'approved';
  createdAt: any;
  parentId?: string;
}

export const Comments = ({ collectionName, docId }: { collectionName: string, docId: string }) => {
  const { user, isAdmin } = useAuth();
  const [text, setText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyTo, setReplyTo] = useState<string | null>(null);

  const commentsPath = `sites/${SITE_ID}/${collectionName}/${docId}/comments`;

  useEffect(() => {
    const q = query(
      collection(db, commentsPath),
      where('status', '==', 'approved'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Comment));
      setComments(docs);
    });

    return unsubscribe;
  }, [commentsPath]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !text.trim()) return;

    const data: any = {
      userId: user.uid,
      userEmail: user.email,
      userName: user.displayName || user.email?.split('@')[0],
      text: text.trim(),
      status: user.email === ADMIN_EMAIL ? 'approved' : 'pending',
      createdAt: Timestamp.now(),
    };

    if (replyTo) {
      data.parentId = replyTo;
    }

    await addDoc(collection(db, commentsPath), data);
    setText('');
    setReplyTo(null);
  };

  const handleDelete = async (comment: Comment) => {
    if (!user) return;
    if (user.uid === comment.userId || user.email === ADMIN_EMAIL) {
      await deleteDoc(doc(db, commentsPath, comment.id));
    }
  };

  const renderComment = (comment: Comment) => (
    <div key={comment.id} className="border-l-2 border-brand-accent/20 pl-4 py-2 my-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-bold text-sm text-brand-primary">{comment.userName}</p>
          <p className="text-xs text-neutral-400">
            {comment.createdAt?.seconds ? formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true }) : 'just now'}
          </p>
        </div>
        <div className="flex gap-2">
          {!comment.parentId && (
            <button onClick={() => setReplyTo(comment.id)} className="text-brand-accent hover:text-brand-accent/80">
              <Reply size={14} />
            </button>
          )}
          {(user?.uid === comment.userId || isAdmin) && (
            <button onClick={() => handleDelete(comment)} className="text-red-500 hover:text-red-700">
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>
      <p className="mt-2 text-neutral-700 text-sm whitespace-pre-wrap">{comment.text}</p>
      
      {/* Nested Replies would be better handled by a flat structure with parentId or another subcollection as per prompt requirements */}
      {comments.filter(c => c.parentId === comment.id).map(renderComment)}
    </div>
  );

  return (
    <div className="mt-12 bg-white p-6 rounded-lg shadow-sm border border-neutral-100">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <MessageSquare className="text-brand-accent" />
        Comments ({comments.length})
      </h3>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          {replyTo && (
            <div className="text-xs text-brand-accent mb-2 flex items-center gap-1">
              Replying to comment... <button type="button" onClick={() => setReplyTo(null)} className="underline">Cancel</button>
            </div>
          )}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-brand-accent outline-none text-sm transition-all"
            placeholder={replyTo ? "Write a reply..." : "Add a comment..."}
            rows={3}
          />
          <button
            type="submit"
            className="mt-2 px-6 py-2 bg-brand-primary text-white text-sm font-bold uppercase tracking-widest rounded hover:bg-brand-primary/90 transition-colors"
          >
            Post {replyTo ? 'Reply' : 'Comment'}
          </button>
        </form>
      ) : (
        <p className="text-sm text-neutral-500 mb-8 italic">Please sign in to leave a comment.</p>
      )}

      <div className="space-y-4">
        {comments.filter(c => !c.parentId).map(renderComment)}
      </div>
    </div>
  );
};
