"""Kiểm thử validator: chấp nhận dữ liệu hợp lệ, bắt lỗi cố ý."""
import copy
import json
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "scripts"))
from validate import check, load_data, validate_applied, validate_curriculum  # noqa: E402

DATA = load_data()


def make_valid_curriculum():
    """CUR-02: dựng curriculum hợp lệ TỪ dữ liệu thật (nhóm các bài
    published theo đúng hsk_level của chúng, giữ thứ tự trong dữ liệu),
    để test không phụ thuộc trạng thái nhất thời của file thật."""
    levels = {str(k): [] for k in range(1, 7)}
    for les in DATA["lessons"]:
        if les["status"] == "published":
            levels[str(les["hsk_level"])].append(les["id"])
    return {"schema_version": 1, "levels": levels, "requires": {}}


def global_order(cur):
    return [lid for k in ("1", "2", "3", "4", "5", "6") for lid in cur["levels"][k]]


class TestValidator(unittest.TestCase):
    def test_valid_data_passes(self):
        self.assertEqual(check(copy.deepcopy(DATA), Path("x")), [])

    def test_duplicate_lesson_id_fails(self):
        bad = copy.deepcopy(DATA)
        bad["lessons"].append(copy.deepcopy(bad["lessons"][0]))
        self.assertTrue(check(bad, Path("x")))

    def test_order_wrong_tokens_fails(self):
        bad = copy.deepcopy(DATA)
        for les in bad["lessons"]:
            for ex in les["exercises"]:
                if ex["type"] == "order":
                    ex["accepted_answers"] = [["không", "đúng"]]
                    self.assertTrue(check(bad, Path("x")))
                    return
        self.fail("không tìm thấy bài order để kiểm tra")

    def test_published_without_review_fails(self):
        bad = copy.deepcopy(DATA)
        bad["lessons"][0].pop("review", None)
        self.assertTrue(check(bad, Path("x")))

    def test_published_without_quick_memory_fails(self):
        bad = copy.deepcopy(DATA)
        bad["lessons"][0].pop("quick_memory", None)
        self.assertTrue(check(bad, Path("x")))

    def test_published_without_hsk_evidence_fails(self):
        bad = copy.deepcopy(DATA)
        les = next(l for l in bad["lessons"] if l["status"] == "published")
        les.pop("hsk_evidence", None)
        errors = check(bad, Path("x"))
        self.assertTrue(any("hsk_evidence" in e for e in errors))

    def test_partial_hsk_evidence_without_note_fails(self):
        bad = copy.deepcopy(DATA)
        les = next(l for l in bad["lessons"] if l["status"] == "published")
        les["hsk_evidence"] = {"status": "partial"}
        errors = check(bad, Path("x"))
        self.assertTrue(any("hsk_evidence" in e and "note" in e for e in errors))

    def test_unstepped_formula_notes_fails(self):
        bad = copy.deepcopy(DATA)
        bad["lessons"][0]["formula_notes"] = "Đoạn văn liền không chia bước."
        self.assertTrue(check(bad, Path("x")))

    # --- REL-01: related_ids (trường tùy chọn) ---
    @staticmethod
    def _without_related(data):
        """Bản sao dữ liệu đã gỡ mọi related_ids để dựng ca kiểm tra tách biệt."""
        for les in data["lessons"]:
            les.pop("related_ids", None)
        return data

    @staticmethod
    def _published(data, count=2):
        return [l for l in data["lessons"] if l["status"] == "published"][:count]

    def test_related_ids_nonexistent_target_fails(self):
        bad = self._without_related(copy.deepcopy(DATA))
        les = self._published(bad, 1)[0]
        les["related_ids"] = ["id-khong-ton-tai-rel01"]
        errors = check(bad, Path("x"))
        self.assertTrue(any("related_ids" in e for e in errors), errors)

    def test_related_ids_self_reference_fails(self):
        bad = self._without_related(copy.deepcopy(DATA))
        les = self._published(bad, 1)[0]
        les["related_ids"] = [les["id"]]
        errors = check(bad, Path("x"))
        self.assertTrue(any("related_ids" in e for e in errors), errors)

    def test_related_ids_asymmetric_fails(self):
        bad = self._without_related(copy.deepcopy(DATA))
        a, b = self._published(bad, 2)
        a["related_ids"] = [b["id"]]
        # b cố ý không liệt kê lại a -> không đối xứng
        errors = check(bad, Path("x"))
        self.assertTrue(any("related_ids" in e and "đối xứng" in e for e in errors), errors)

    def test_related_ids_more_than_four_fails(self):
        bad = self._without_related(copy.deepcopy(DATA))
        published = [l for l in bad["lessons"] if l["status"] == "published"]
        source, targets = published[0], published[1:6]
        self.assertEqual(len(targets), 5)
        source["related_ids"] = [t["id"] for t in targets]
        # Giữ đối xứng + published để lỗi duy nhất còn lại là vượt quá 4.
        for t in targets:
            t["related_ids"] = [source["id"]]
        errors = check(bad, Path("x"))
        self.assertTrue(
            any("related_ids" in e and "4" in e for e in errors), errors)

    def test_related_ids_symmetric_pair_passes(self):
        bad = self._without_related(copy.deepcopy(DATA))
        a, b = self._published(bad, 2)
        a["related_ids"] = [b["id"]]
        b["related_ids"] = [a["id"]]
        errors = check(bad, Path("x"))
        self.assertFalse(any("related_ids" in e for e in errors), errors)

    def test_missing_vietnamese_intent_example_fails(self):
        bad = copy.deepcopy(DATA)
        for e in bad["lessons"][0]["examples"]:
            e["from_vietnamese_intent"] = False
        self.assertTrue(check(bad, Path("x")))


class TestCurriculum(unittest.TestCase):
    """CUR-02 (D28): validate_curriculum cho data/curriculum.json."""

    def test_valid_curriculum_passes(self):
        cur = make_valid_curriculum()
        self.assertEqual(validate_curriculum(cur, DATA["lessons"]), [])

    def test_curriculum_missing_published_lesson_fails(self):
        cur = make_valid_curriculum()
        les = next(l for l in DATA["lessons"] if l["status"] == "published")
        cur["levels"][str(les["hsk_level"])].remove(les["id"])
        errors = validate_curriculum(cur, DATA["lessons"])
        self.assertTrue(any("curriculum" in e and les["id"] in e for e in errors), errors)

    def test_curriculum_wrong_level_fails(self):
        cur = make_valid_curriculum()
        les = next(l for l in DATA["lessons"]
                   if l["status"] == "published" and l["hsk_level"] != 1)
        cur["levels"][str(les["hsk_level"])].remove(les["id"])
        cur["levels"]["1"].append(les["id"])
        errors = validate_curriculum(cur, DATA["lessons"])
        self.assertTrue(any("curriculum" in e and les["id"] in e for e in errors), errors)

    def test_curriculum_requires_after_dependent_fails(self):
        cur = make_valid_curriculum()
        order = global_order(cur)
        first, last = order[0], order[-1]
        cur["requires"] = {first: [last]}
        errors = validate_curriculum(cur, DATA["lessons"])
        self.assertTrue(any("curriculum" in e and "đứng trước" in e for e in errors), errors)

    def test_curriculum_unknown_id_fails(self):
        cur = make_valid_curriculum()
        cur["levels"]["1"].append("id-khong-ton-tai-nay")
        errors = validate_curriculum(cur, DATA["lessons"])
        self.assertTrue(any("curriculum" in e and "id lạ" in e for e in errors), errors)


class TestApplied(unittest.TestCase):
    """APP-01: học liệu đọc/nghe vận dụng trong data/applied/."""

    def _doc(self):
        p = (Path(__file__).resolve().parent.parent
             / "data" / "applied" / "shi-noun-link.json")
        return json.loads(p.read_text(encoding="utf-8"))

    def _ids(self):
        return {les["id"] for les in DATA["lessons"]
                if les["status"] == "published"}

    def test_real_pilot_file_passes(self):
        errors = validate_applied(self._doc(), self._ids(), "shi-noun-link")
        self.assertEqual(errors, [], errors)

    def test_external_without_link_only_fails(self):
        doc = self._doc()
        doc["reading"]["material"]["rights"]["status"] = "reuse_allowed"
        errors = validate_applied(doc, self._ids(), "shi-noun-link")
        self.assertTrue(any("link_only" in e for e in errors), errors)

    def test_unverified_playback_fails(self):
        doc = self._doc()
        doc["reading"]["material"]["audio"]["verified_playback"] = False
        errors = validate_applied(doc, self._ids(), "shi-noun-link")
        self.assertTrue(any("verified_playback" in e for e in errors), errors)

    def test_shared_with_separate_listening_material_fails(self):
        doc = self._doc()
        doc["listening"]["material"] = copy.deepcopy(
            doc["reading"]["material"])
        errors = validate_applied(doc, self._ids(), "shi-noun-link")
        self.assertTrue(any("dùng chung" in e for e in errors), errors)

    def test_all_answers_same_position_fails(self):
        doc = self._doc()
        for act in ("reading", "listening"):
            for q in doc[act]["questions"]:
                q["answer"] = 0
        errors = validate_applied(doc, self._ids(), "shi-noun-link")
        self.assertTrue(any("một vị trí" in e for e in errors), errors)

    def test_unknown_lesson_fails(self):
        doc = self._doc()
        doc["lesson_id"] = "bai-khong-ton-tai"
        errors = validate_applied(doc, self._ids(), "bai-khong-ton-tai")
        self.assertTrue(any("không tồn tại" in e for e in errors), errors)


if __name__ == "__main__":
    unittest.main()
