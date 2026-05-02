export const ME = {
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

export const USERS = [
  { id: 1, name: "Маша Кова", username: "@masha_k", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=masha&backgroundColor=ffd5dc", followers: 5200, following: 310, posts: 142, online: true, bio: "Фотограф 📸 Москва" },
  { id: 2, name: "Игорь Степ", username: "@igor_s", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=igor&backgroundColor=d1fae5", followers: 891, following: 203, posts: 56, online: false, bio: "Разработчик 💻" },
  { id: 3, name: "Лена Орл", username: "@lena_orl", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lena&backgroundColor=ede9fe", followers: 3100, following: 512, posts: 98, online: true, bio: "Художник 🎨 СПб" },
  { id: 4, name: "Даня Петр", username: "@danya_p", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=danya&backgroundColor=fef3c7", followers: 720, following: 88, posts: 34, online: false, bio: "Музыкант 🎵" },
  { id: 5, name: "Соня Мир", username: "@sonia_m", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sonia&backgroundColor=fee2e2", followers: 11400, following: 205, posts: 267, online: true, bio: "Блогер ✨ Контент" },
];

export const POSTS = [
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

export const MESSAGES_DATA = [
  { id: 1, userId: 1, lastMsg: "Привет! Как дела? 😊", time: "10:24", unread: 3 },
  { id: 2, userId: 3, lastMsg: "Спасибо за лайк!", time: "09:15", unread: 0 },
  { id: 3, userId: 5, lastMsg: "Увидимся на выходных?", time: "Вчера", unread: 1 },
  { id: 4, userId: 2, lastMsg: "Код выглядит отлично", time: "Вчера", unread: 0 },
  { id: 5, userId: 4, lastMsg: "Слышал новый трек? 🎵", time: "Пн", unread: 0 },
];

export const CHAT_INIT = [
  { id: 1, from: "them", text: "Привет! Как дела? 😊", time: "10:20" },
  { id: 2, from: "me", text: "Отлично! Работаю над новым проектом", time: "10:21" },
  { id: 3, from: "them", text: "О, здорово! Расскажи подробнее", time: "10:22" },
  { id: 4, from: "me", text: "Соцсеть делаю 🚀 Нереально крутой дизайн получается", time: "10:23" },
  { id: 5, from: "them", text: "Ого! Покажешь когда будет готово? 🤩", time: "10:24" },
];

export const NOTIFS_DATA = [
  { id: 1, type: "like", userId: 1, text: "лайкнула ваш пост", time: "2 мин", read: false },
  { id: 2, type: "follow", userId: 5, text: "подписалась на вас", time: "15 мин", read: false },
  { id: 3, type: "comment", userId: 3, text: "прокомментировала: «Невероятно красиво!»", time: "1 час", read: false },
  { id: 4, type: "like", userId: 2, text: "лайкнул ваш пост", time: "3 часа", read: true },
  { id: 5, type: "follow", userId: 4, text: "подписался на вас", time: "1 день", read: true },
  { id: 6, type: "comment", userId: 1, text: "ответила на ваш комментарий", time: "2 дня", read: true },
];

export const NAV_ITEMS = [
  { id: "feed", icon: "Home", label: "Лента" },
  { id: "search", icon: "Search", label: "Поиск" },
  { id: "messages", icon: "MessageCircle", label: "Чаты" },
  { id: "notifs", icon: "Bell", label: "Уведомления" },
  { id: "profile", icon: "User", label: "Профиль" },
];

export const fmtNum = (n: number) => n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n);
export const getUser = (id: number) => USERS.find(u => u.id === id)!;
