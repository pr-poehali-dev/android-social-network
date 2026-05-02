import { useState } from "react";
import Icon from "@/components/ui/icon";
import { MESSAGES_DATA, NOTIFS_DATA, NAV_ITEMS } from "@/components/social/data";
import { FeedScreen, ProfileScreen, MessagesScreen, SearchScreen, NotificationsScreen } from "@/components/social/screens";

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
