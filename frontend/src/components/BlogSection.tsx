import { ArrowRight, Calendar } from 'lucide-react';
import type { BlogPost } from '../types';
import { SectionTitle } from './SectionTitle';

type BlogSectionProps = {
  blogPosts: BlogPost[];
  onSelectPost: (slug: string) => void;
};

export function BlogSection({ blogPosts, onSelectPost }: BlogSectionProps) {
  if (blogPosts.length === 0) {
    return null;
  }

  return (
    <section className="section" id="blog">
      <SectionTitle
        eyebrow="Blog"
        title="Thoughts, tutorials, and lessons learned"
        description="Notes from the dev trenches — what I'm building, what I'm learning, and what I'd do differently."
      />

      <div className="blog-grid">
        {blogPosts.map((post) => (
          <article className="blog-card" key={post.id}>
            {post.coverImage && (
              <img src={post.coverImage} alt="" loading="lazy" />
            )}
            <div className="blog-body">
              <div className="blog-meta">
                <Calendar size={14} />
                <time>{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</time>
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="tags">
                {post.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <button
                className="blog-read-more"
                type="button"
                onClick={() => onSelectPost(post.id)}
              >
                Read More
                <ArrowRight size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
