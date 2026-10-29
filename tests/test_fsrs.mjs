// Kiểm thử tích hợp ts-fsrs 5.4.2 qua srs.mjs (không phải công thức tự chế).
// Chạy: node --test tests/test_fsrs.mjs
import test from "node:test";
import assert from "node:assert/strict";
import {
  FSRS_VERSION, Rating, State, applyReview, dueCards, formatDue,
  reviveCard, serializeCard,
} from "../srs.mjs";

test("khóa phiên bản ts-fsrs 5.4.2 và enum đúng của thư viện", () => {
  assert.equal(FSRS_VERSION, "ts-fsrs@5.4.2");
  assert.equal(State.New, 0);
  assert.equal(State.Learning, 1);
  assert.equal(State.Review, 2);
  assert.equal(State.Relearning, 3);
  assert.equal(Rating.Again, 1);
  assert.equal(Rating.Hard, 2);
  assert.equal(Rating.Good, 3);
  assert.equal(Rating.Easy, 4);
});

test("Good từ thẻ mới: đến hạn sau thời điểm ôn, trạng thái Learning, reps=1", () => {
  const t0 = new Date("2026-01-01T00:00:00Z");
  const r = applyReview({ cards: {}, events: [], completedLessons: [] }, "shi-noun-link", Rating.Good, t0);
  assert.equal(r.applied, true);
  assert.equal(r.card.state, State.Learning);
  assert.equal(r.card.reps, 1);
  assert.ok(new Date(r.card.due) > t0);
  assert.equal(r.event.state_before, State.New);
  assert.equal(r.event.state_after, State.Learning);
});

test("thời gian giả lập: Good lần 2 tại đúng hạn đẩy hạn xa hơn lần 1", () => {
  const t0 = new Date("2026-01-01T00:00:00Z");
  const first = applyReview({ cards: {}, events: [], completedLessons: [] }, "shi-noun-link", Rating.Good, t0);
  const due1 = new Date(first.card.due);
  const second = applyReview({ cards: first.cards, events: first.events, completedLessons: [] }, "shi-noun-link", Rating.Good, due1);
  assert.ok(new Date(second.card.due) > due1);
  assert.equal(second.card.reps, 2);
});

test("Again tại hạn sau Good: lịch lùi về bước học lại ngắn (1 phút trong test này)", () => {
  const t0 = new Date("2026-01-01T00:00:00Z");
  const first = applyReview({ cards: {}, events: [], completedLessons: [] }, "shi-noun-link", Rating.Good, t0);
  const due1 = new Date(first.card.due);
  const again = applyReview({ cards: first.cards, events: first.events, completedLessons: [] }, "shi-noun-link", Rating.Again, due1);
  assert.equal(again.card.due, new Date(due1.getTime() + 60000).toISOString());
});

test("serialize/revive giữ nguyên due và state", () => {
  const t0 = new Date("2026-01-01T00:00:00Z");
  const r = applyReview({ cards: {}, events: [], completedLessons: [] }, "shi-noun-link", Rating.Good, t0);
  const back = reviveCard(serializeCard(reviveCard(r.card)));
  assert.equal(back.due.toISOString(), r.card.due);
  assert.equal(back.state, r.card.state);
});

test("gửi lặp cùng event_id không áp dụng lần 2", () => {
  const t0 = new Date("2026-01-01T00:00:00Z");
  const state = { cards: {}, events: [], completedLessons: [] };
  const first = applyReview(state, "shi-noun-link", Rating.Good, t0);
  const second = applyReview({ cards: first.cards, events: first.events, completedLessons: [] }, "shi-noun-link", Rating.Good, t0);
  assert.equal(second.applied, false);
  assert.equal(second.events.length, 1);
  assert.deepEqual(second.cards, first.cards);
});

test("hàng đợi: bài đã hoàn thành chưa có thẻ là đến hạn ngay; bài chưa hoàn thành không vào hàng đợi", () => {
  const now = new Date("2026-01-01T00:00:00Z");
  const lessons = [{ id: "a" }, { id: "b" }];
  const queue = dueCards({ cards: {}, events: [], completedLessons: ["a"] }, lessons, now);
  assert.deepEqual(queue.map((q) => q.lesson.id), ["a"]);
  assert.equal(queue[0].isDue, true);
  assert.equal(formatDue(now, now), "đến hạn ngay");
});
