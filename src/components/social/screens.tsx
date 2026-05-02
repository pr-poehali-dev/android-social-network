import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Avatar, PostCard } from "./shared";
import { ME, USERS, POSTS, MESSAGES_DATA, CHAT_INIT, NOTIFS_DATA, fmtNum, getUser } from "./data";

// ─── FEED ─────────────────────────────────────────────────────────────────────

export const FeedScreen = () => {
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

// ─── PROFILE ──────────────────────────────────────────────────────────────────

export const ProfileScreen = () => {
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

// ─── MESSAGES ─────────────────────────────────────────────────────────────────

export const MessagesScreen = () => {
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

// ─── SEARCH ───────────────────────────────────────────────────────────────────

export const SearchScreen = () => {
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

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────

export const NotificationsScreen = () => {
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
