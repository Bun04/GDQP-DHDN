# Ôn thi GDQP-AN · Học phần 1

Website tĩnh ôn tập trắc nghiệm Giáo dục Quốc phòng và An ninh. Các trang chính gồm trang chủ, luyện theo chương, làm bài, lịch sử, xem lại đáp án, bí kíp chuẩn bị và thông tin Trung tâm Giáo dục quốc phòng và an ninh Đà Nẵng (Trường Quân sự Quân khu 5). Giao diện thích ứng màn hình nhỏ; lịch sử làm bài lưu cục bộ trong trình duyệt.

## Cấu trúc

- `index.html`: bảng điều khiển và thống kê ngân hàng câu hỏi.
- `pages/practice/`: chọn chương để luyện.
- `pages/preparation/`: bí kíp chuẩn bị trước khi học tập trung.
- `pages/info/`: thông tin cơ bản và ảnh có ghi nguồn.
- `pages/quiz/`: làm bài từ ngân hàng câu hỏi.
- `pages/history/`: xem điểm trung bình, kết quả tốt nhất và lịch sử.
- `pages/answer-review/`: xem đáp án của một lượt làm.
- `src/questions.json`, `src/chapters.json`: ngân hàng câu hỏi và danh sách chương.
- `src/*.js`, `src/*.css`: logic và giao diện.
- `.github/workflows/deploy.yml`: tự động xuất bản lên GitHub Pages khi push lên `main`.

## Chạy trên máy

Từ thư mục dự án, chạy `python -m http.server 8000`, rồi mở `http://localhost:8000/`. Cần dùng máy chủ tĩnh để các trang tải JSON; mở file HTML trực tiếp có thể bị trình duyệt chặn `fetch`.

## Xuất bản trên GitHub Pages

1. Đưa repository lên GitHub và push nhánh `main`.
2. Mở **Settings → Pages** trong repository.
3. Chọn **GitHub Actions** làm nguồn triển khai.
4. Workflow `Deploy to GitHub Pages` sẽ chạy sau mỗi lần push lên `main`.
