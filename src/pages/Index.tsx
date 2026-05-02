import { useState } from "react";
import Icon from "@/components/ui/icon";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const ME = {
  id: 0,
  name: "Алекс Волков",
  username: "@alexvolkov",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex&backgroundColor=b6e3f4",
  bio: "🚀 Дизайнер · Путешественник · Кофеман",
  followers: 2841,
  following: 419,
  posts: 87,
  online: true,
};

const USERS = [
  { id: 1, name: "Маша Кова", username: "@masha_k", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=masha&backgroundColor=ffd5dc", followers: 5200, following: 310, posts: 142, online: true, bio: "Фотограф 📸 Москва" },
  { id: 2, name: "Игорь Степ", username: "@igor_s", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=igor&backgroundColor=d1fae5", followers: 891, following: 203, posts: 56, online: false, bio: "Разработчик 💻" },
  { id: 3, name: "Лена Орл", username: "@lena_orl", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lena&backgroundColor=ede9fe", followers: 3100, following: 512, posts: 98, online: true, bio: "Художник 🎨 СПб" },
  { id: 4, name: "Даня Петр", username: "@danya_p", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=danya&backgroundColor=fef3c7", followers: 720, following: 88, posts: 34, online: false, bio: "Музыкант 🎵" },
  { id: 5, name: "Соня Мир", username: "@sonia_m", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sonia&backgroundColor=fee2e2", followers: 11400, following: 205, posts: 267, online: true, bio: "Блогер ✨ Контент" },
];

const POSTS = [
  {
    id: 1, userId: 1, time: "2 мин назад",
    text: "Золотой час в Москве просто нереальный сегодня 🌅 Захватила несколько кадров у Кремля — делюсь с вами!",
    image: "https://cdn.poehali.dev/projects/2ed1ee8f-969a-466a-9595-d841ddd199d8/files/55b674e9-9b72-4e83-af77-22acb917550a.jpg",
    likes: 342, comments: 28, reposts: 15, liked: false,
  },
  {
    id: 2, userId: 3, time: "15 мин назад",
    text: "Новая работа в студии! Масло на холсте, 3 месяца работы 🎨 Рада наконец показать всем",
    image: null,
    likes: 189, comments: 41, reposts: 8, liked: true,
  },
  {
    id: 3, userId: 5, time: "1 час назад",
    text: "Подборка лучших кафе Питера в моём новом ролике ☕ Ссылка в профиле — обязательно посмотрите!",
    image: null,
    likes: 2100, comments: 173, reposts: 88, liked: false,
  },
  {
    id: 4, userId: 2, time: "3 часа назад",
    text: "Только что запустил новый проект на React + TypeScript. Полгода разработки — и вот результат! 🚀",
    image: null,
    likes: 97, comments: 22, reposts: 12, liked: false,
  },
];

const MESSAGES_DATA = [
  { id: 1, userId: 1, lastMsg: "Привет! Как дела? 😊", time: "10:24", unread: 3 },
  { id: 2, userId: 3, lastMsg: "Спасибо за лайк!", time: "09:15", unread: 0 },
  { id: 3, userId: 5, lastMsg: "Увидимся на выходных?", time: "Вчера", unread: 1 },
  { id: 4, userId: 2, lastMsg: "Код выглядит отлично", time: "Вчера", unread: 0 },
  { id: 5, userId: 4, lastMsg: "Слышал новый трек? 🎵", time: "Пн", unread: 0 },
];

const CHAT_INIT = [
  { id: 1, from: "them", text: "Привет! Как дела? 😊", time: "10:20" },
  { id: 2, from: "me", text: "Отлично! Работаю над новым проектом", time: "10:21" },
  { id: 3, from: "them", text: "О, здорово! Расскажи подробнее", time: "10:22" },
  { id: 4, from: "me", text: "Соцсеть делаю 🚀 Нереально крутой дизайн получается", time: "10:23" },
  { id: 5, from: "them", text: "Ого! Покажешь когда будет готово? 🤩", time: "10:24" },
];

const NOTIFS_DATA = [
  { id: 1, type: "like", userId: 1, text: "лайкнула ваш пост", time: "2 мин", read: false },
  { id: 2, type: "follow", userId: 5, text: "подписалась на вас", time: "15 мин", read: false },
  { id: 3, type: "comment", userId: 3, text: "прокомментировала: «Невероятно красиво!»", time: "1 час", read: false },
  { id: 4, type: "like", userId: 2, text: "лайкнул ваш пост", time: "3 часа", read: true },
  { id: 5, type: "follow", userId: 4, text: "подписался на вас", time: "1 день", read: true },
  { id: 6, type: "comment", userId: 1, text: "ответила на ваш комментарий", time: "2 дня", read: true },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const fmtNum = (n: number) => n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n);
const getUser = (id: number) => USERS.find(u => u.id === id)!;

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

type AvatarUser = { avatar: string; name: string; online?: boolean };

const Avatar = ({ user, size = 40, glow = false, showOnline = false }: {
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

const PostCard = ({ post, idx }: { post: typeof POSTS[0]; idx: number }) => {
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

// ─── SCREENS ─────────────────────────────────────────────────────────────────

const FeedScreen = () => {
  const stories = [ME, ...USERS.slice(0, 4)];
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-4 flex-shrink-0">
        <h1 className="text-2xl font-black neon-text-purple" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          PULSE
        </h1>
        <div className="flex gap-2">
          <button className="glass rounded-xl p-2" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Icon name="Bell" size={20} />
          </button>
          <button className="glass rounded-xl p-2" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Icon name="Search" size={20} />
          </button>
        </div>
      </div>

      <div className="px-5 mb-4 flex-shrink-0">
        <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {stories.map((u, i) => (
            <div key={u.id} className="flex flex-col items-center gap-1.5 flex-shrink-0 animate-slide-up"
              style={{ animationDelay: `${i * 0.06}s`, opacity: 0, animationFillMode: "forwards" }}>
              <div className="story-ring cursor-pointer" style={{ borderRadius: "50%", padding: 2 }}>
                <div className="rounded-full overflow-hidden bg-[#1a1a2e]" style={{ width: 52, height: 52 }}>
                  <img src={u.avatar} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
              <span className="text-xs text-center truncate w-14" style={{ color: "rgba(255,255,255,0.5)" }}>
                {i === 0 ? "Ваша" : u.name.split(" ")[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-3">
        {POSTS.map((p, i) => <PostCard key={p.id} post={p} idx={i} />)}
      </div>
    </div>
  );
};

const ProfileScreen = () => {
  const user = ME;
  const userPosts = POSTS.filter(p => p.userId === 1);

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="relative flex-shrink-0" style={{ height: 140 }}>
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(155,89,255,0.4) 0%, rgba(0,229,255,0.2) 50%, rgba(255,45,120,0.3) 100%)" }} />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      <div className="px-5 pb-4 flex-shrink-0" style={{ marginTop: -50 }}>
        <div className="flex items-end justify-between mb-4">
          <div className="story-ring" style={{ borderRadius: "50%", padding: 3 }}>
            <img src={user.avatar} alt="" className="rounded-full bg-[#1a1a2e]" style={{ width: 80, height: 80 }} />
          </div>
          <button className="glass neon-border-purple rounded-xl px-4 py-2 text-sm font-semibold" style={{ color: "var(--neon-purple)" }}>
            Редактировать
          </button>
        </div>

        <h2 className="text-xl font-bold text-white mb-0.5">{user.name}</h2>
        <p className="text-sm mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>{user.username}</p>
        <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.7)" }}>{user.bio}</p>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: "Посты", value: user.posts },
            { label: "Подписчики", value: user.followers },
            { label: "Подписки", value: user.following },
          ].map((s, i) => (
            <div key={i} className="glass rounded-xl p-3 text-center animate-slide-up"
              style={{ animationDelay: `${i * 0.1}s`, opacity: 0, animationFillMode: "forwards" }}>
              <p className="text-lg font-black neon-text-purple">{fmtNum(s.value)}</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {userPosts.length > 0 ? (
          <div className="grid grid-cols-3 gap-1.5">
            {userPosts.map((p, i) => (
              <div key={p.id} className="rounded-xl overflow-hidden animate-fade-scale-in"
                style={{ aspectRatio: "1", background: "rgba(155,89,255,0.15)", animationDelay: `${i * 0.1}s` }}>
                {p.image ? (
                  <img src={p.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-2">
                    <p className="text-center" style={{ color: "rgba(255,255,255,0.5)", fontSize: 9 }}>
                      {p.text.substring(0, 50)}…
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="glass rounded-2xl p-8 text-center">
            <Icon name="Image" size={32} className="mx-auto mb-3" style={{ color: "rgba(255,255,255,0.2)" }} />
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>Постов пока нет</p>
          </div>
        )}
      </div>
    </div>
  );
};

const MessagesScreen = () => {
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [msgText, setMsgText] = useState("");
  const [chatMsgs, setChatMsgs] = useState(CHAT_INIT);

  const sendMsg = () => {
    if (!msgText.trim()) return;
    setChatMsgs(prev => [...prev, { id: Date.now(), from: "me", text: msgText, time: "сейчас" }]);
    setMsgText("");
  };

  if (activeChat !== null) {
    const user = getUser(activeChat);
    return (
      <div className="flex flex-col h-full animate-slide-in-right">
        <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0 glass-dark">
          <button onClick={() => setActiveChat(null)} style={{ color: "rgba(255,255,255,0.6)" }}>
            <Icon name="ArrowLeft" size={22} />
          </button>
          <Avatar user={user} size={38} showOnline />
          <div className="flex-1">
            <p className="font-semibold text-white text-sm">{user.name}</p>
            <p className="text-xs" style={{ color: user.online ? "#22c55e" : "rgba(255,255,255,0.4)" }}>
              {user.online ? "В сети" : "Не в сети"}
            </p>
          </div>
          <button style={{ color: "rgba(255,255,255,0.4)" }}><Icon name="Phone" size={20} /></button>
          <button style={{ color: "rgba(255,255,255,0.4)" }}><Icon name="Video" size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {chatMsgs.map((m, i) => (
            <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"} animate-slide-up`}
              style={{ animationDelay: `${i * 0.04}s`, opacity: 0, animationFillMode: "forwards" }}>
              <div className={`max-w-[75%] px-4 py-2.5 ${m.from === "me" ? "msg-out" : "msg-in"}`}>
                <p className="text-sm text-white">{m.text}</p>
                <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)", textAlign: m.from === "me" ? "right" : "left" }}>
                  {m.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 py-3 flex gap-2 flex-shrink-0 glass-dark">
          <input
            className="input-dark flex-1 rounded-2xl px-4 py-3 text-sm"
            placeholder="Сообщение..."
            value={msgText}
            onChange={e => setMsgText(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMsg()}
          />
          <button onClick={sendMsg} className="btn-gradient rounded-2xl w-12 h-12 flex items-center justify-center flex-shrink-0">
            <Icon name="Send" size={18} className="text-white" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-4 flex-shrink-0">
        <h2 className="text-xl font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>Сообщения</h2>
        <button className="glass rounded-xl p-2" style={{ color: "rgba(255,255,255,0.6)" }}>
          <Icon name="PenSquare" size={20} />
        </button>
      </div>

      <div className="px-5 mb-4 flex-shrink-0">
        <div className="input-dark rounded-2xl flex items-center gap-2 px-4 py-2.5">
          <Icon name="Search" size={16} style={{ color: "rgba(255,255,255,0.3)" }} />
          <input className="bg-transparent flex-1 text-sm outline-none" placeholder="Поиск по чатам..."
            style={{ color: "rgba(255,255,255,0.8)" }} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {MESSAGES_DATA.map((m, i) => {
          const user = getUser(m.userId);
          return (
            <button key={m.id} onClick={() => setActiveChat(m.userId)}
              className="w-full flex items-center gap-3 px-5 py-3.5 transition-all animate-slide-up"
              style={{
                animationDelay: `${i * 0.07}s`, opacity: 0, animationFillMode: "forwards",
                borderBottom: "1px solid rgba(255,255,255,0.05)", background: "transparent",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(155,89,255,0.08)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <Avatar user={user} size={48} showOnline />
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="font-semibold text-white text-sm truncate">{user.name}</p>
                  <span className="text-xs flex-shrink-0 ml-2" style={{ color: "rgba(255,255,255,0.35)" }}>{m.time}</span>
                </div>
                <p className="text-sm truncate" style={{ color: "rgba(255,255,255,0.45)" }}>{m.lastMsg}</p>
              </div>
              {m.unread > 0 && (
                <span className="animate-notification-pop flex-shrink-0 w-5 h-5 rounded-full btn-gradient text-white text-xs flex items-center justify-center font-bold">
                  {m.unread}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const filtered = query.length > 0
    ? USERS.filter(u => u.name.toLowerCase().includes(query.toLowerCase()) || u.username.includes(query.toLowerCase()))
    : USERS;

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-4 flex-shrink-0">
        <h2 className="text-xl font-black text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Поиск</h2>
        <div className="input-dark rounded-2xl flex items-center gap-2 px-4 py-3">
          <Icon name="Search" size={18} style={{ color: "rgba(255,255,255,0.4)" }} />
          <input className="bg-transparent flex-1 text-sm outline-none" placeholder="Поиск людей и контента..."
            style={{ color: "white" }} value={query} onChange={e => setQuery(e.target.value)} />
          {query && (
            <button onClick={() => setQuery("")} style={{ color: "rgba(255,255,255,0.4)" }}>
              <Icon name="X" size={16} />
            </button>
          )}
        </div>
      </div>

      {!query && (
        <div className="px-5 mb-4 flex-shrink-0">
          <p className="text-xs font-semibold mb-3" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>ПОПУЛЯРНЫЕ ТЕГИ</p>
          <div className="flex flex-wrap gap-2">
            {["#дизайн", "#фото", "#музыка", "#путешествия", "#код", "#арт", "#спорт"].map(tag => (
              <span key={tag} className="glass rounded-xl px-3 py-1.5 text-xs font-medium" style={{ color: "var(--neon-cyan)" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-5 space-y-2">
        {!query && <p className="text-xs font-semibold mb-3" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>ВСЕ ПОЛЬЗОВАТЕЛИ</p>}
        {filtered.map((u, i) => (
          <div key={u.id} className="post-card rounded-2xl p-3 flex items-center gap-3 cursor-pointer animate-slide-up"
            style={{ animationDelay: `${i * 0.07}s`, opacity: 0, animationFillMode: "forwards" }}>
            <Avatar user={u} size={48} glow showOnline />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white text-sm">{u.name}</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{u.username} · {fmtNum(u.followers)} подписчиков</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>{u.bio}</p>
            </div>
            <button className="btn-gradient rounded-xl px-3 py-1.5 text-xs font-semibold text-white flex-shrink-0">+</button>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-10">
            <Icon name="SearchX" size={40} className="mx-auto mb-3" style={{ color: "rgba(255,255,255,0.15)" }} />
            <p style={{ color: "rgba(255,255,255,0.3)" }}>Ничего не найдено</p>
          </div>
        )}
      </div>
    </div>
  );
};

const NotificationsScreen = () => {
  const [notifs, setNotifs] = useState(NOTIFS_DATA);
  const unreadCount = notifs.filter(n => !n.read).length;
  const markAllRead = () => setNotifs(notifs.map(n => ({ ...n, read: true })));

  const iconMap: Record<string, string> = { like: "Heart", follow: "UserPlus", comment: "MessageCircle" };
  const colorMap: Record<string, string> = { like: "var(--neon-pink)", follow: "var(--neon-cyan)", comment: "var(--neon-purple)" };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>Уведомления</h2>
          {unreadCount > 0 && (
            <span className="animate-notification-pop btn-gradient text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-xs font-medium" style={{ color: "var(--neon-purple)" }}>
            Всё прочитано
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {notifs.map((n, i) => {
          const user = getUser(n.userId);
          return (
            <div key={n.id} className="flex items-center gap-3 px-5 py-3.5 transition-all animate-slide-up"
              style={{
                animationDelay: `${i * 0.07}s`, opacity: 0, animationFillMode: "forwards",
                background: n.read ? "transparent" : "rgba(155,89,255,0.06)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}>
              <div className="relative flex-shrink-0">
                <Avatar user={user} size={44} />
                <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: colorMap[n.type] + "22", border: `1px solid ${colorMap[n.type]}40` }}>
                  <Icon name={iconMap[n.type]} size={12} style={{ color: colorMap[n.type] }} />
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>
                  <span className="font-semibold text-white">{user.name}</span> {n.text}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{n.time} назад</p>
              </div>
              {!n.read && (
                <div className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: "var(--neon-purple)", boxShadow: "0 0 8px var(--neon-purple)" }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "feed", icon: "Home", label: "Лента" },
  { id: "search", icon: "Search", label: "Поиск" },
  { id: "messages", icon: "MessageCircle", label: "Чаты" },
  { id: "notifs", icon: "Bell", label: "Уведомления" },
  { id: "profile", icon: "User", label: "Профиль" },
];

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function Index() {
  const [tab, setTab] = useState("feed");
  const unreadMsgs = MESSAGES_DATA.reduce((s, m) => s + m.unread, 0);
  const unreadNotifs = NOTIFS_DATA.filter(n => !n.read).length;
  const badgeMap: Record<string, number> = { messages: unreadMsgs, notifs: unreadNotifs };

  const renderScreen = () => {
    switch (tab) {
      case "feed": return <FeedScreen />;
      case "search": return <SearchScreen />;
      case "messages": return <MessagesScreen />;
      case "notifs": return <NotificationsScreen />;
      case "profile": return <ProfileScreen />;
      default: return <FeedScreen />;
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #06060f 0%, #0d0d1f 50%, #080813 100%)" }}>

      <div className="fixed pointer-events-none" style={{
        top: "10%", left: "15%", width: 300, height: 300,
        background: "radial-gradient(circle, rgba(155,89,255,0.12) 0%, transparent 70%)",
        filter: "blur(40px)",
      }} />
      <div className="fixed pointer-events-none" style={{
        bottom: "20%", right: "10%", width: 250, height: 250,
        background: "radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)",
        filter: "blur(40px)",
      }} />

      {/* Phone shell */}
      <div className="relative flex-shrink-0" style={{
        width: 390, height: 844, background: "#0a0a14", borderRadius: 44, overflow: "hidden",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.1), 0 30px 80px rgba(0,0,0,0.8), 0 0 60px rgba(155,89,255,0.15)",
      }}>
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 flex-shrink-0" style={{ height: 44, paddingTop: 12 }}>
          <span className="text-xs font-semibold text-white">9:41</span>
          <div className="absolute left-1/2 -translate-x-1/2 w-28 h-7 rounded-full bg-black" />
          <div className="flex items-center gap-1">
            <Icon name="Signal" size={14} className="text-white" />
            <Icon name="Wifi" size={14} className="text-white" />
            <Icon name="Battery" size={14} className="text-white" />
          </div>
        </div>

        {/* Content area */}
        <div className="bg-grid" style={{ height: "calc(844px - 44px - 80px)", overflowY: "auto", overflowX: "hidden" }}>
          <div key={tab} style={{ animation: "fade-scale-in 0.25s ease forwards" }}>
            {renderScreen()}
          </div>
        </div>

        {/* Bottom nav */}
        <div className="absolute bottom-0 left-0 right-0 glass-dark flex items-center justify-around px-2 pt-3 pb-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)", height: 80 }}>
          {NAV_ITEMS.map(item => {
            const isActive = tab === item.id;
            const badge = badgeMap[item.id];
            return (
              <button key={item.id} onClick={() => setTab(item.id)}
                className="flex flex-col items-center gap-1 relative transition-all"
                style={{ minWidth: 56, opacity: isActive ? 1 : 0.5 }}>
                <div className="relative">
                  <Icon name={item.icon} size={22} style={{
                    color: isActive ? "var(--neon-purple)" : "rgba(255,255,255,0.6)",
                    filter: isActive ? "drop-shadow(0 0 8px rgba(155,89,255,0.8))" : "none",
                    transition: "all 0.2s",
                  }} />
                  {badge > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full btn-gradient text-white flex items-center justify-center font-bold"
                      style={{ fontSize: 9 }}>
                      {badge}
                    </span>
                  )}
                </div>
                <span style={{ fontSize: 10, color: isActive ? "var(--neon-purple)" : "rgba(255,255,255,0.4)", fontWeight: isActive ? 600 : 400 }}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute -bottom-3 w-6 h-0.5 rounded-full"
                    style={{ background: "linear-gradient(90deg, var(--neon-purple), var(--neon-cyan))", boxShadow: "0 0 8px var(--neon-purple)" }} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}