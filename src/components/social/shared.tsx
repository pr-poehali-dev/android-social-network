import { useState } from "react";
import Icon from "@/components/ui/icon";
import { POSTS, fmtNum, getUser } from "./data";

// ─── AVATAR ───────────────────────────────────────────────────────────────────

export type AvatarUser = { avatar: string; name: string; online?: boolean };

export const Avatar = ({ user, size = 40, glow = false, showOnline = false }: {
  user: AvatarUser; size?: number; glow?: boolean; showOnline?: boolean;
}) => (
  <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
    <div className={glow ? "story-ring" : ""} style={{ borderRadius: "50%", padding: glow ? 2 : 0 }}>
      <img
        src={user.avatar}
        alt={user.name}
        className="rounded-full object-cover bg-[#1a1a2e]"
        style={{ width: glow ? size - 4 : size, height: glow ? size - 4 : size }}
      />
    </div>
    {showOnline && user.online && (
      <span className="online-dot absolute bottom-0 right-0" />
    )}
  </div>
);

// ─── POST CARD ────────────────────────────────────────────────────────────────

export const PostCard = ({ post, idx }: { post: typeof POSTS[0]; idx: number }) => {
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);
  const author = getUser(post.userId);

  return (
    <div
      className="post-card rounded-2xl overflow-hidden animate-slide-up"
      style={{ animationDelay: `${idx * 0.08}s`, opacity: 0, animationFillMode: "forwards" }}
    >
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar user={author} size={42} glow showOnline />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-white text-sm">{author.name}</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{author.username} · {post.time}</p>
          </div>
          <button className="p-1 rounded-lg" style={{ color: "rgba(255,255,255,0.3)" }}>
            <Icon name="MoreHorizontal" size={18} />
          </button>
        </div>

        <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.85)" }}>
          {post.text}
        </p>

        {post.image && (
          <div className="rounded-xl overflow-hidden mb-3" style={{ height: 180 }}>
            <img src={post.image} alt="" className="w-full h-full object-cover" />
          </div>
        )}

        <div className="flex items-center gap-5 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button
            className="like-btn flex items-center gap-1.5 text-xs font-medium transition-all"
            style={{ color: liked ? "var(--neon-pink)" : "rgba(255,255,255,0.4)" }}
            onClick={() => { setLiked(!liked); setLikes(liked ? likes - 1 : likes + 1); }}
          >
            <Icon name="Heart" size={17} style={liked ? { fill: "var(--neon-pink)" } : {}} />
            {fmtNum(likes)}
          </button>
          <button className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
            <Icon name="MessageCircle" size={17} />
            {post.comments}
          </button>
          <button className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
            <Icon name="Repeat2" size={17} />
            {post.reposts}
          </button>
          <button className="ml-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
            <Icon name="Bookmark" size={17} />
          </button>
        </div>
      </div>
    </div>
  );
};
