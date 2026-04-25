import { ArrowLeft, Calendar } from 'lucide-react';
import type { BlogPost as BlogPostType } from '../types';

type BlogPostViewProps = {
  post: BlogPostType;
  onBack: () => void;
};

export function BlogPostView({ post, onBack }: BlogPostViewProps) {
  return (
    <article className="blog-detail">
      <button className="blog-back-btn" type="button" onClick={onBack}>
        <ArrowLeft size={18} />
        Back to portfolio
      </button>

      {post.coverImage && (
        <img className="blog-detail-cover" src={post.coverImage} alt="" />
      )}

      <div className="blog-detail-header">
        <div className="blog-meta">
          <Calendar size={14} />
          <time>{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
        </div>
        <h1>{post.title}</h1>
        <p className="blog-detail-excerpt">{post.excerpt}</p>
        <div className="tags">
          {post.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>

      <div className="blog-detail-content">
        {post.content.split('\n\n').map((paragraph, index) => {
          if (paragraph.startsWith('## ')) {
            return <h2 key={index}>{paragraph.replace('## ', '')}</h2>;
          }
          if (paragraph.startsWith('### ')) {
            return <h3 key={index}>{paragraph.replace('### ', '')}</h3>;
          }
          return <p key={index}>{paragraph}</p>;
        })}
      </div>
    </article>
  );
}
