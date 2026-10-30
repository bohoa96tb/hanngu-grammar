#!/usr/bin/env python3
"""Validator cho dữ liệu bài học theo docs/schema.md (schema v1).

Nguồn dữ liệu là các shard theo cấp trong data/lessons/, liệt kê theo thứ
tự trong data/lessons-manifest.json (shard là nguồn duy nhất; không còn
file data/lessons.json tổng hợp). Chạy: python3 scripts/validate.py
Trả về 0 khi đạt, 1 khi có lỗi.
Lưu ý: validator kiểm tra cấu trúc/liên kết, KHÔNG chứng minh tiếng Trung đúng.
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DEFAULT = ROOT / "data" / "lessons-manifest.json"


def load_data(manifest_path=DEFAULT):
    """Đọc manifest và gộp các shard theo thứ tự, trả về dict schema v1."""
    manifest = json.loads(Path(manifest_path).read_text(encoding="utf-8"))
    lessons = []
    for rel in manifest["shards"]:
        shard = json.loads((ROOT / rel).read_text(encoding="utf-8"))
        if shard.get("schema_version") != 1:
            raise ValueError(f"{rel}: schema_version phải bằng 1")
        lessons.extend(shard["lessons"])
    return {"schema_version": 1, "lessons": lessons}

PLACEHOLDERS = ("TODO", "Lorem", "XXX", "TBD")
# Một số ký tự phồn thể phổ biến để cảnh báo (không phải kiểm tra toàn diện).
TRADITIONAL = set("學國個時說話車馬長門開關見東對發裡與讓")
PUNCT = "。，、；：？！·…「」『』（）《》\"' "
VERDICTS = {
    "sai_ngu_phap", "doi_nghia", "khac_van_phong",
    "thieu_ngu_canh", "kem_tu_nhien", "thay_duoc_co_dieu_kien",
}


def norm(text: str) -> str:
    out = "".join(ch for ch in str(text) if ch not in PUNCT)
    return re.sub(r"\s+", "", out)


def check(data, path) -> list[str]:
    errors: list[str] = []
    if data.get("schema_version") != 1:
        errors.append("schema_version phải bằng 1")
    lessons = data.get("lessons")
    if not isinstance(lessons, list) or not lessons:
        return errors + ["lessons phải là danh sách không rỗng"]
    seen_lessons, seen_ex = set(), set()
    for les in lessons:
        lid = les.get("id", "?")
        if lid in seen_lessons:
            errors.append(f"{lid}: trùng id bài học")
        seen_lessons.add(lid)
        for field in ("title_vi", "pattern", "objective", "when_to_use",
                      "formula_notes"):
            val = les.get(field, "")
            if not val:
                errors.append(f"{lid}: thiếu {field}")
            elif any(p in val for p in PLACEHOLDERS):
                errors.append(f"{lid}: placeholder trong {field}")
        # Chuẩn hóa 30/10/2026 (D25): formula_notes phải chia bước "1) ...",
        # bài published phải có quick_memory 40–110 ký tự.
        fn = les.get("formula_notes", "")
        if fn and not fn.lstrip().startswith("1)"):
            errors.append(f"{lid}: formula_notes chưa chia bước (phải bắt đầu bằng '1)')")
        if les.get("status") == "published":
            qm = les.get("quick_memory", "")
            if not qm:
                errors.append(f"{lid}: bài published thiếu quick_memory")
            elif not (40 <= len(qm) <= 110):
                errors.append(f"{lid}: quick_memory phải 40–110 ký tự, có {len(qm)}")
        if les.get("hsk_level") not in (1, 2, 3, 4, 5, 6):
            errors.append(f"{lid}: hsk_level phải 1-6")
        diff = les.get("difficulty")
        min_ex = 2 if diff == "easy" else 3
        min_practice = 3 if diff == "easy" else 4
        examples = les.get("examples", [])
        if len(examples) < min_ex:
            errors.append(f"{lid}: cần ≥{min_ex} ví dụ, có {len(examples)}")
        if not any(e.get("from_vietnamese_intent") for e in examples):
            errors.append(f"{lid}: cần ≥1 ví dụ xuất phát từ ý muốn nói bằng tiếng Việt")
        for e in examples:
            zh = e.get("zh", "")
            if any(ch in TRADITIONAL for ch in zh):
                errors.append(f"{lid}: ví dụ '{zh}' chứa ký tự có thể là phồn thể, cần kiểm tra tay")
            if not e.get("vi"):
                errors.append(f"{lid}: ví dụ '{zh}' thiếu nghĩa tiếng Việt")
            tokens = e.get("tokens")
            if tokens and norm("".join(tokens)) != norm(zh):
                errors.append(f"{lid}: tokens của '{zh}' nối lại không khớp câu")
        for c in les.get("confusions", []):
            if c.get("verdict") not in VERDICTS:
                errors.append(f"{lid}: verdict không hợp lệ: {c.get('verdict')}")
        exercises = les.get("exercises", [])
        if len(exercises) < min_practice:
            errors.append(f"{lid}: cần ≥{min_practice} bài tập, có {len(exercises)}")
        for ex in exercises:
            key = f"{lid}/{ex.get('id')}"
            if key in seen_ex:
                errors.append(f"{key}: trùng id bài tập")
            seen_ex.add(key)
            if ex.get("is_open_ended") is not False:
                errors.append(f"{key}: is_open_ended phải có mặt và bằng false (schema v1)")
            if not ex.get("prompt_vi") or not ex.get("explanation"):
                errors.append(f"{key}: thiếu đề bài hoặc lời giải")
            if not ex.get("accepted_answers"):
                errors.append(f"{key}: thiếu accepted_answers")
            if ex.get("type") == "order":
                payload_tokens = ex.get("payload", {}).get("tokens", [])
                for ans in ex.get("accepted_answers", []):
                    if sorted(ans) != sorted(payload_tokens):
                        errors.append(f"{key}: đáp án xếp từ không dùng đúng bộ token")
            if ex.get("type") == "choice":
                opts = ex.get("payload", {}).get("options", [])
                if not any(norm(a) in [norm(o) for o in opts]
                           for a in ex.get("accepted_answers", [])):
                    errors.append(f"{key}: đáp án đúng không nằm trong options")
        if les.get("status") == "published":
            rev = les.get("review", {})
            if not rev.get("reviewer") or not rev.get("date"):
                errors.append(f"{lid}: bài published thiếu review")
            if not les.get("sources"):
                errors.append(f"{lid}: bài published thiếu sources")
        if les.get("status") not in ("draft", "reviewed", "published"):
            errors.append(f"{lid}: status không hợp lệ")
    return errors


def main(argv) -> int:
    path = Path(argv[1]) if len(argv) > 1 else DEFAULT
    try:
        data = load_data(path)
    except Exception as exc:  # noqa: BLE001 - báo lỗi đọc file cho người dùng
        print(f"LỖI: không đọc được {path}: {exc}")
        return 1
    errors = check(data, path)
    if errors:
        print(f"KHÔNG ĐẠT ({len(errors)} lỗi) — {path}")
        for err in errors:
            print(f"  - {err}")
        return 1
    lessons = data["lessons"]
    published = sum(1 for les in lessons if les["status"] == "published")
    print(f"ĐẠT: {len(lessons)} bài, {published} bài published, "
          f"{sum(len(les.get('exercises', [])) for les in lessons)} bài tập.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
