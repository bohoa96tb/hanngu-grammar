// srs.mjs — logic ôn tập FSRS thuần, không phụ thuộc DOM.
// Dùng thư viện ts-fsrs đã khóa phiên bản (vendor/ts-fsrs-5.4.2.mjs).
// Không tự chế công thức mang tên FSRS: mọi lịch ôn đều do thư viện tính.
// Trạng thái thẻ lưu đúng enum của thư viện, không tự quy ước lại:
// State: New=0, Learning=1, Review=2, Relearning=3.
// Rating: Again=1, Hard=2, Good=3, Easy=4 (Manual=0 không dùng ở UI).
import { createEmptyCard, fsrs, Rating, State } from "./vendor/ts-fsrs-5.4.2.mjs";

export const FSRS_VERSION = "ts-fsrs@5.4.2";
// Tắt fuzz để lịch ôn xác định và kiểm thử được lặp lại chính xác.
// Thư viện vẫn tính stability/difficulty/interval; chỉ bỏ nhiễu ngẫu nhiên.
export const FSRS_PARAMS = { enable_fuzz: false };

export const RATING_LABELS = {
  [Rating.Again]: "Quên rồi (Again)",
  [Rating.Hard]: "Khó (Hard)",
  [Rating.Good]: "Nhớ được (Good)",
  [Rating.Easy]: "Dễ dàng (Easy)",
};
export const STATE_LABELS = {
  [State.New]: "Mới",
  [State.Learning]: "Đang học",
  [State.Review]: "Đang ôn",
  [State.Relearning]: "Học lại",
};
export { Rating, State };

export function createScheduler() {
  return fsrs(FSRS_PARAMS);
}

export function serializeCard(card) {
  return {
    ...card,
    due: card.due ? new Date(card.due).toISOString() : null,
    last_review: card.last_review ? new Date(card.last_review).toISOString() : null,
  };
}

export function reviveCard(serialized, now = new Date()) {
  if (!serialized) return createEmptyCard(now);
  return {
    ...serialized,
    due: new Date(serialized.due),
    last_review: serialized.last_review ? new Date(serialized.last_review) : undefined,
  };
}

export function makeEventId(cardId, reviewDate, rating) {
  return `${cardId}|${new Date(reviewDate).toISOString()}|${rating}`;
}

// Áp dụng một lần ôn. Trả về { applied, cards, events, event, card }.
// Nếu event_id đã tồn tại (gửi lặp), không áp dụng lần nữa.
export function applyReview(state, lessonId, rating, now = new Date()) {
  const reviewDate = new Date(now);
  const eventId = makeEventId(lessonId, reviewDate, rating);
  const events = Array.isArray(state.events) ? state.events : [];
  if (events.some((e) => e.event_id === eventId)) {
    return { applied: false, cards: state.cards || {}, events, event: null, card: null };
  }
  const scheduler = createScheduler();
  const before = reviveCard(state.cards ? state.cards[lessonId] : null, reviewDate);
  const result = scheduler.next(before, reviewDate, rating);
  const card = serializeCard(result.card);
  const event = {
    event_id: eventId,
    card_id: lessonId,
    rating,
    rating_label: RATING_LABELS[rating] || String(rating),
    state_before: before.state,
    state_after: result.card.state,
    review: reviewDate.toISOString(),
    due_after: card.due,
    scheduled_days: result.card.scheduled_days,
  };
  return {
    applied: true,
    cards: { ...(state.cards || {}), [lessonId]: card },
    events: [...events, event],
    event,
    card,
  };
}

// Hàng đợi ôn cho các bài đã hoàn thành. Bài chưa hoàn thành không tạo thẻ,
// để không khóa học mới và không quá tải. Bài đã hoàn thành nhưng chưa có thẻ
// được coi là đến hạn ngay (thẻ mới).
export function dueCards(state, lessons, now = new Date()) {
  const nowMs = new Date(now).getTime();
  const completed = new Set((state.completedLessons || []));
  return lessons
    .filter((l) => completed.has(l.id))
    .map((lesson) => {
      const serialized = state.cards ? state.cards[lesson.id] : null;
      const due = serialized ? new Date(serialized.due) : new Date(now);
      return { lesson, serialized, due, isDue: due.getTime() <= nowMs };
    })
    .sort((a, b) => a.due - b.due);
}

export function formatDue(due, now = new Date()) {
  const diffMs = new Date(due).getTime() - new Date(now).getTime();
  if (diffMs <= 0) return "đến hạn ngay";
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return `sau ${mins} phút`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `sau ${hours} giờ`;
  return `ngày ${new Date(due).toLocaleDateString("vi-VN")} lúc ${new Date(due).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}`;
}
