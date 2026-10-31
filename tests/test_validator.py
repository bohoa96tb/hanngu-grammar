"""Kiểm thử validator: chấp nhận dữ liệu hợp lệ, bắt lỗi cố ý."""
import copy
import json
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "scripts"))
from validate import check, load_data  # noqa: E402

DATA = load_data()


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


if __name__ == "__main__":
    unittest.main()
