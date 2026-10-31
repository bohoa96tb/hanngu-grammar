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
    # REL-01 (2026-10-31): tiền xử lý bản đồ id -> bài và id -> related_ids
    # trước vòng lặp, để kiểm tra tồn tại/đối xứng của related_ids cần nhìn
    # toàn bộ tập bài (bài đích có thể nằm sau bài nguồn trong danh sách).
    lesson_by_id: dict = {}
    for _les in lessons:
        _lid = _les.get("id")
        if isinstance(_lid, str) and _lid not in lesson_by_id:
            lesson_by_id[_lid] = _les
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
        # Lô std2 30/10/2026 (D26): bài published phải có hsk_evidence —
        # trạng thái đối chiếu cấp HSK của chính bài theo đề cương HSK 3.0.
        if les.get("status") == "published":
            ev = les.get("hsk_evidence")
            if not isinstance(ev, dict):
                errors.append(f"{lid}: bài published thiếu hsk_evidence (phải là object)")
            elif ev.get("status") not in ("verified", "partial"):
                errors.append(f"{lid}: hsk_evidence.status phải là 'verified' hoặc 'partial', "
                              f"có {ev.get('status')!r}")
            else:
                note = ev.get("note")
                if ev.get("status") == "partial":
                    if not note:
                        errors.append(f"{lid}: hsk_evidence partial bắt buộc có note")
                    elif not (20 <= len(note) <= 220):
                        errors.append(f"{lid}: hsk_evidence.note (partial) phải 20–220 ký tự, "
                                      f"có {len(note)}")
                elif note is not None and len(note) > 220:
                    errors.append(f"{lid}: hsk_evidence.note tối đa 220 ký tự, có {len(note)}")
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
        # REL-01 (2026-10-31): related_ids là trường tùy chọn — bài không
        # có trường này vẫn hợp lệ. Khi có mặt: list các str, không trùng,
        # tối đa 4, không tự trỏ, mọi id phải tồn tại, đối xứng hai chiều,
        # và bài published chỉ được trỏ tới bài published.
        if "related_ids" in les:
            rel = les.get("related_ids")
            if not isinstance(rel, list) or not all(
                    isinstance(x, str) for x in rel):
                errors.append(f"{lid}: related_ids phải là danh sách các chuỗi (list các str)")
            else:
                if len(rel) > 4:
                    errors.append(f"{lid}: related_ids tối đa 4 phần tử, có {len(rel)}")
                if len(set(rel)) != len(rel):
                    errors.append(f"{lid}: related_ids không được trùng phần tử")
                if lid in rel:
                    errors.append(f"{lid}: related_ids không được chứa id của chính bài")
                for rid in rel:
                    if rid == lid:
                        continue
                    target = lesson_by_id.get(rid)
                    if target is None:
                        errors.append(f"{lid}: related_ids chứa id không tồn tại: {rid}")
                        continue
                    if les.get("status") == "published" and target.get("status") != "published":
                        errors.append(f"{lid}: related_ids trỏ tới bài chưa published: {rid}")
                    target_rel = target.get("related_ids")
                    if not isinstance(target_rel, list) or lid not in target_rel:
                        errors.append(f"{lid}: related_ids không đối xứng — bài {rid} chưa liệt kê lại bài này")
    return errors


CURRICULUM_PATH = ROOT / "data" / "curriculum.json"
LEVEL_KEYS = ("1", "2", "3", "4", "5", "6")


def validate_curriculum(cur, lessons) -> list[str]:
    """CUR-02 (D28, 2026-10-31): kiểm tra data/curriculum.json — thứ tự
    học chính thức. Mọi bài published phải xuất hiện đúng một lần, ở
    đúng cấp của nó; không id lạ; requires phải tồn tại, không tự trỏ,
    và mọi tiên quyết phải đứng TRƯỚC bài phụ thuộc trong thứ tự toàn
    cục (nối các cấp 1→6)."""
    errors: list[str] = []
    if not isinstance(cur, dict):
        return ["curriculum: nội dung phải là một object"]
    levels = cur.get("levels")
    if not isinstance(levels, dict):
        return ["curriculum: thiếu trường levels (phải là object)"]
    by_id = {}
    for les in lessons:
        if isinstance(les.get("id"), str) and les["id"] not in by_id:
            by_id[les["id"]] = les
    for key in LEVEL_KEYS:
        if key not in levels:
            errors.append(f"curriculum: levels thiếu khóa '{key}'")
        elif not isinstance(levels[key], list):
            errors.append(f"curriculum: levels['{key}'] phải là danh sách id bài")
    # Vị trí toàn cục: nối levels 1→6 theo thứ tự.
    pos: dict = {}
    gidx = 0
    for key in LEVEL_KEYS:
        ids = levels.get(key)
        if not isinstance(ids, list):
            continue
        for lid in ids:
            if lid in pos:
                errors.append(f"curriculum: bài {lid} xuất hiện hơn một lần trong levels")
            pos[lid] = gidx
            gidx += 1
            les = by_id.get(lid)
            if les is None:
                errors.append(f"curriculum: id lạ trong levels: {lid}")
            elif str(les.get("hsk_level")) != key:
                errors.append(f"curriculum: bài {lid} nằm trong levels['{key}'] "
                              f"nhưng hsk_level của bài là {les.get('hsk_level')}")
    for les in lessons:
        if les.get("status") == "published" and les.get("id") not in pos:
            errors.append(f"curriculum: bài published {les.get('id')} chưa có trong levels")
    req = cur.get("requires", {})
    if not isinstance(req, dict):
        errors.append("curriculum: requires phải là object ánh xạ id -> danh sách id tiên quyết")
        req = {}
    for lid, pres in req.items():
        if lid not in by_id:
            errors.append(f"curriculum: requires chứa id lạ: {lid}")
            continue
        if not isinstance(pres, list):
            errors.append(f"curriculum: requires của bài {lid} phải là danh sách id")
            continue
        for pre in pres:
            if pre == lid:
                errors.append(f"curriculum: bài {lid} không được tự làm tiên quyết của chính mình")
            elif pre not in by_id:
                errors.append(f"curriculum: tiên quyết của bài {lid} không tồn tại: {pre}")
            elif pre not in pos:
                errors.append(f"curriculum: tiên quyết {pre} của bài {lid} chưa có trong levels")
            elif lid in pos and pos[pre] >= pos[lid]:
                errors.append(f"curriculum: tiên quyết {pre} của bài {lid} phải đứng trước "
                              f"bài {lid} trong thứ tự toàn cục")
    return errors


APPLIED_DIR = ROOT / "data" / "applied"


def _applied_asset_exists(rel):
    return isinstance(rel, str) and bool(rel.strip()) \
        and (ROOT / rel).is_file()


def _applied_in_app_errors(mat, where):
    """APP-01 v2 (D31): học liệu dùng TRONG app (access=in_app) — quyền
    tái sử dụng phải đã xác minh, audio thật nằm trong assets/applied/,
    nội dung truyện nằm ngay trong bản ghi. Chỉ kiểm tra cấu trúc/quyền
    khai báo và sự tồn tại của file, không chứng minh nội dung nguồn."""
    errs = []
    rights = mat.get("rights") or {}
    if rights.get("status") != "reuse_allowed":
        errs.append(f"{where}: access=in_app phải đi với rights.status "
                    f"reuse_allowed")
    lic = mat.get("license") or {}
    for key in ("text", "audio", "evidence"):
        if not str(lic.get(key) or "").strip():
            errs.append(f"{where}: license.{key} không được trống (giấy "
                        f"phép văn bản/audio, đường dẫn bằng chứng)")
    att = mat.get("attribution") or {}
    for key in ("text_by", "translation_by"):
        if not str(att.get(key) or "").strip():
            errs.append(f"{where}: attribution.{key} không được trống")
    audio = mat.get("audio") or {}
    if audio.get("kind") != "in_app_file":
        errs.append(f"{where}: audio.kind của học liệu in_app phải là "
                    f"in_app_file")
    if audio.get("voice") not in ("human_verified", "synthetic", "unknown"):
        errs.append(f"{where}: audio.voice không hợp lệ: "
                    f"{audio.get('voice')}")
    afile = str(audio.get("file") or "")
    if not afile.startswith("assets/applied/"):
        errs.append(f"{where}: audio.file phải nằm trong assets/applied/")
    elif not _applied_asset_exists(afile):
        errs.append(f"{where}: audio.file không tồn tại trên đĩa: {afile}")
    dur = audio.get("duration_sec")
    if not isinstance(dur, (int, float)) or isinstance(dur, bool) \
            or dur <= 0:
        errs.append(f"{where}: audio.duration_sec phải là số > 0")
    content = mat.get("content") or {}
    pages = content.get("pages")
    if not isinstance(pages, list) or not pages:
        errs.append(f"{where}: content.pages cần ít nhất 1 đoạn")
        pages = pages if isinstance(pages, list) else []
    n_target = 0
    for pi, page in enumerate(pages):
        pw = f"{where} đoạn {pi + 1}"
        if not isinstance(page, dict):
            errs.append(f"{pw}: đoạn phải là object")
            continue
        pfile = str(page.get("audio_file") or "")
        if not _applied_asset_exists(pfile):
            errs.append(f"{pw}: audio_file không tồn tại trên đĩa: {pfile}")
        sents = page.get("sentences")
        if not isinstance(sents, list) or not sents:
            errs.append(f"{pw}: cần ít nhất 1 câu")
            sents = sents if isinstance(sents, list) else []
        for si, sent in enumerate(sents):
            sw = f"{pw} câu {si + 1}"
            if not isinstance(sent, dict):
                errs.append(f"{sw}: câu phải là object")
                continue
            for key in ("zh", "pinyin", "vi"):
                if not str(sent.get(key) or "").strip():
                    errs.append(f"{sw}: thiếu {key}")
            if not isinstance(sent.get("target"), bool):
                errs.append(f"{sw}: target phải là true/false")
            elif sent["target"]:
                n_target += 1
    if pages and n_target < 1:
        errs.append(f"{where}: toàn truyện cần ít nhất 1 câu chứa cấu "
                    f"trúc mục tiêu (target=true)")
    return errs


def _applied_sentence_practice_errors(sp, where):
    """APP-01 v2 (D31): luyện nghe từng câu — câu có audio riêng trong
    dự án, nhãn giọng và ghi chú giấy phép bắt buộc."""
    errs = []
    if not isinstance(sp, dict):
        return [f"{where}: sentence_practice phải là object"]
    for key in ("voice_label_vi", "license_note_vi"):
        if not str(sp.get(key) or "").strip():
            errs.append(f"{where}: sentence_practice thiếu {key}")
    items = sp.get("items")
    if not isinstance(items, list) or len(items) < 3:
        errs.append(f"{where}: sentence_practice cần ít nhất 3 câu")
        items = items if isinstance(items, list) else []
    for i, item in enumerate(items):
        iw = f"{where} câu luyện nghe {i + 1}"
        if not isinstance(item, dict):
            errs.append(f"{iw}: câu phải là object")
            continue
        for key in ("zh", "pinyin", "vi"):
            if not str(item.get(key) or "").strip():
                errs.append(f"{iw}: thiếu {key}")
        afile = str(item.get("audio_file") or "")
        if not _applied_asset_exists(afile):
            errs.append(f"{iw}: audio_file không tồn tại trên đĩa: {afile}")
    return errs


def _applied_material_errors(mat, where, version=1):
    errs = []
    if not isinstance(mat, dict):
        return [f"{where}: material phải là object"]
    access = mat.get("access")
    in_app_v2 = version == 2 and access == "in_app"
    for key in ("source_name", "title_vi", "situation_vi",
                "target_structure_vi", "length_label_vi",
                "duration_label_vi"):
        # v2 in_app: thời lượng lấy từ audio.duration_sec (số thật),
        # không dùng nhãn duration_label_vi của v1.
        if in_app_v2 and key == "duration_label_vi":
            continue
        if not str(mat.get(key) or "").strip():
            errs.append(f"{where}: material thiếu {key}")
    url = str(mat.get("source_url") or "")
    if not url.startswith("https://"):
        errs.append(f"{where}: material.source_url phải là URL https")
    if access not in ("external", "embed", "in_app"):
        errs.append(f"{where}: material.access không hợp lệ: {access}")
    rights = mat.get("rights") or {}
    if rights.get("status") not in ("link_only", "embed_allowed",
                                    "reuse_allowed"):
        errs.append(f"{where}: rights.status không hợp lệ")
    if not str(rights.get("basis_vi") or "").strip():
        errs.append(f"{where}: rights.basis_vi không được trống")
    if access == "external" and rights.get("status") != "link_only":
        errs.append(f"{where}: access=external phải đi với rights link_only")
    if in_app_v2:
        errs.extend(_applied_in_app_errors(mat, where))
    else:
        audio = mat.get("audio") or {}
        if audio.get("kind") not in ("source_page_player", "none"):
            errs.append(f"{where}: audio.kind không hợp lệ")
        if audio.get("voice") not in ("native_claimed_by_source", "unknown"):
            errs.append(f"{where}: audio.voice không hợp lệ")
        if audio.get("kind") == "source_page_player" \
                and audio.get("verified_playback") is not True:
            errs.append(f"{where}: có player nguồn nhưng chưa kiểm chứng "
                        f"phát (audio.verified_playback phải là true)")
    vocab = mat.get("vocab_support")
    if not isinstance(vocab, list) or any(
            not str(v.get("zh") or "").strip()
            or not str(v.get("vi") or "").strip()
            for v in vocab if isinstance(v, dict)) \
            or any(not isinstance(v, dict) for v in vocab):
        errs.append(f"{where}: vocab_support phải là danh sách {{zh, vi}}")
    return errs


def _applied_activity_errors(act, where, need_material, version=1):
    errs = []
    if not isinstance(act, dict):
        return [f"{where}: hoạt động phải là object"]
    if not str(act.get("guide_vi") or "").strip():
        errs.append(f"{where}: thiếu guide_vi")
    if need_material:
        errs.extend(_applied_material_errors(act.get("material"), where,
                                             version))
    elif act.get("material") is not None:
        errs.append(f"{where}: dùng chung học liệu (shared) thì không khai "
                    f"material riêng")
    extra = act.get("extra_external")
    if extra is not None and (not isinstance(extra, dict)
                              or not str(extra.get("source_url") or "")
                              .startswith("https://")):
        errs.append(f"{where}: extra_external.source_url phải là URL https")
    if act.get("sentence_practice") is not None:
        errs.extend(_applied_sentence_practice_errors(
            act.get("sentence_practice"), where))
    questions = act.get("questions")
    if not isinstance(questions, list) or not 2 <= len(questions) <= 3:
        errs.append(f"{where}: cần 2–3 câu hỏi")
        questions = questions if isinstance(questions, list) else []
    for i, q in enumerate(questions):
        qw = f"{where} câu {i + 1}"
        if not str(q.get("prompt_vi") or "").strip():
            errs.append(f"{qw}: thiếu prompt_vi")
        opts = q.get("options")
        if not isinstance(opts, list) or len(opts) != 3 \
                or len({str(o).strip() for o in opts}) != 3 \
                or any(not str(o).strip() for o in opts):
            errs.append(f"{qw}: cần đúng 3 phương án khác nhau, không trống")
        if q.get("answer") not in (0, 1, 2):
            errs.append(f"{qw}: answer phải là 0, 1 hoặc 2")
        if not str(q.get("explain_vi") or "").strip():
            errs.append(f"{qw}: thiếu explain_vi")
    return errs


def validate_applied(doc, lesson_ids, file_stem):
    """APP-01 (2026-10-31): kiểm tra một file data/applied/<id>.json —
    học liệu đọc/nghe vận dụng gắn với bài đã published. schema_version
    1 = thẻ dẫn link (link_only, D30); schema_version 2 (D31) có thể
    chứa học liệu dùng trong app (access=in_app) và luyện nghe câu.
    Chỉ kiểm tra cấu trúc/quyền khai báo, không chứng minh nội dung
    nguồn."""
    errs = []
    where = f"applied/{file_stem}"
    if not isinstance(doc, dict):
        return [f"{where}: nội dung phải là object"]
    version = doc.get("schema_version")
    if version not in (1, 2):
        errs.append(f"{where}: schema_version phải bằng 1 hoặc 2")
        version = 1
    lid = doc.get("lesson_id")
    if lid != file_stem:
        errs.append(f"{where}: lesson_id '{lid}' phải trùng tên file")
    if lid not in lesson_ids:
        errs.append(f"{where}: bài {lid} không tồn tại hoặc chưa published")
    if doc.get("qa_status") not in ("internal_review", "verified"):
        errs.append(f"{where}: qa_status không hợp lệ")
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}",
                        str(doc.get("checked_date") or "")):
        errs.append(f"{where}: checked_date phải dạng YYYY-MM-DD")
    shared = doc.get("shared")
    if not isinstance(shared, bool):
        errs.append(f"{where}: shared phải là true/false")
        shared = False
    if shared and not str(doc.get("shared_note_vi") or "").strip():
        errs.append(f"{where}: shared=true cần shared_note_vi")
    errs.extend(_applied_activity_errors(doc.get("reading"),
                                         f"{where} reading", True, version))
    errs.extend(_applied_activity_errors(doc.get("listening"),
                                         f"{where} listening", not shared,
                                         version))
    answers = []
    for act_key in ("reading", "listening"):
        act = doc.get(act_key) or {}
        for q in act.get("questions") or []:
            if q.get("answer") in (0, 1, 2):
                answers.append(q["answer"])
    if len(answers) >= 4 and len(set(answers)) == 1:
        errs.append(f"{where}: đáp án đúng dồn hết về một vị trí")
    return errs


def main(argv) -> int:
    path = Path(argv[1]) if len(argv) > 1 else DEFAULT
    try:
        data = load_data(path)
    except Exception as exc:  # noqa: BLE001 - báo lỗi đọc file cho người dùng
        print(f"LỖI: không đọc được {path}: {exc}")
        return 1
    errors = check(data, path)
    # CUR-02 (D28): data/curriculum.json là file BẮT BUỘC từ nay — thiếu
    # file là lỗi (khác với giao diện, nơi thiếu file chỉ fallback).
    if not CURRICULUM_PATH.exists():
        errors.append("curriculum: thiếu file data/curriculum.json "
                      "(bắt buộc từ CUR-02/D28 — giao diện fallback không áp dụng cho validator)")
    else:
        try:
            cur = json.loads(CURRICULUM_PATH.read_text(encoding="utf-8"))
            errors.extend(validate_curriculum(cur, data["lessons"]))
        except Exception as exc:  # noqa: BLE001
            errors.append(f"curriculum: không đọc được data/curriculum.json: {exc}")
    # APP-01: data/applied/ là thư mục tùy chọn; có file thì phải đạt,
    # và data/applied-manifest.json phải khớp đúng tập file hiện có.
    published_ids = {les["id"] for les in data["lessons"]
                     if les["status"] == "published"}
    applied_files = {}
    if APPLIED_DIR.exists():
        for ap in sorted(APPLIED_DIR.glob("*.json")):
            try:
                doc = json.loads(ap.read_text(encoding="utf-8"))
                applied_files[ap.stem] = doc
                errors.extend(validate_applied(doc, published_ids, ap.stem))
            except Exception as exc:  # noqa: BLE001
                errors.append(f"applied/{ap.stem}: không đọc được: {exc}")
    manifest_path = ROOT / "data" / "applied-manifest.json"
    if applied_files and not manifest_path.exists():
        errors.append("applied: có file học liệu nhưng thiếu "
                      "data/applied-manifest.json")
    if manifest_path.exists():
        try:
            man = json.loads(manifest_path.read_text(encoding="utf-8"))
            listed = man.get("lessons")
            if man.get("schema_version") != 1 or not isinstance(listed, list) \
                    or len(set(listed)) != len(listed):
                errors.append("applied-manifest: schema_version phải bằng 1 "
                              "và lessons là danh sách id không trùng")
            elif set(listed) != set(applied_files):
                errors.append("applied-manifest: danh sách id không khớp "
                              "tập file trong data/applied/")
        except Exception as exc:  # noqa: BLE001
            errors.append(f"applied-manifest: không đọc được: {exc}")
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
