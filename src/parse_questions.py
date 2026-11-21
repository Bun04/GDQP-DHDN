"""Chuyển đề .docx (câu hỏi + bảng đáp án cuối file) sang questions.json.

Dùng: python parse_questions.py De_on_tap.docx data/questions.json
Cần: pip install python-docx
"""
import json
import re
import sys
from docx import Document

src, out = sys.argv[1], sys.argv[2]
doc = Document(src)

# 1. Duyệt đoạn văn theo thứ tự -> máy trạng thái
RE_CHAPTER = re.compile(r"^Bài\s+(\d+)\.\s*(.+)$")
RE_Q = re.compile(r"^Câu\s+(\d+)\.\s*(.+)$")
RE_OPT = re.compile(r"^([ABCD])\.\s*(.+)$")

chapters, questions = {}, {}
chapter, cur = None, None

for p in doc.paragraphs:
    t = p.text.strip()
    if not t:
        continue
    if t.upper().startswith("ĐÁP ÁN"):
        break
    if m := RE_CHAPTER.match(t):
        chapter = int(m.group(1))
        chapters[chapter] = m.group(2)
    elif m := RE_Q.match(t):
        cur = {"id": int(m.group(1)), "chapter": chapter,
               "question": m.group(2), "options": {}, "answer": None}
        questions[cur["id"]] = cur
    elif (m := RE_OPT.match(t)) and cur:
        cur["options"][m.group(1)] = m.group(2)

# 2. Đọc bảng đáp án: các ô dạng "12. D"
RE_ANS = re.compile(r"(\d+)\.\s*([ABCD])")
for table in doc.tables:
    for row in table.rows:
        for cell in row.cells:
            if m := RE_ANS.fullmatch(cell.text.strip()):
                qid = int(m.group(1))
                if qid in questions:
                    questions[qid]["answer"] = m.group(2)

# 3. Kiểm tra lỗi
errors = []
for q in questions.values():
    if sorted(q["options"]) != list("ABCD"):
        errors.append(f"Câu {q['id']}: thiếu/thừa lựa chọn {sorted(q['options'])}")
    if q["answer"] is None:
        errors.append(f"Câu {q['id']}: không có đáp án")
    if q["chapter"] is None:
        errors.append(f"Câu {q['id']}: không thuộc bài nào")
ids = sorted(questions)
if ids != list(range(1, len(ids) + 1)):
    errors.append("ID câu hỏi không liên tục")

# 4. Xuất JSON (options thành mảng 4 phần tử, answer là chữ cái)
result = [
    {"id": q["id"], "chapter": q["chapter"], "question": q["question"],
     "options": [q["options"].get(k, "") for k in "ABCD"], "answer": q["answer"]}
    for q in (questions[i] for i in ids)
]
with open(out, "w", encoding="utf-8") as f:
    json.dump(result, f, ensure_ascii=False, indent=2)
with open(out.replace("questions", "chapters"), "w", encoding="utf-8") as f:
    json.dump([{"id": k, "title": v} for k, v in sorted(chapters.items())],
              f, ensure_ascii=False, indent=2)

print(f"{len(result)} câu, {len(chapters)} bài")
print("\n".join(errors) if errors else "Không có lỗi")
