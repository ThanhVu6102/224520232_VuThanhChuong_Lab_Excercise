# Hướng dẫn chạy Lab 4

Sinh viên: Vũ Thành Chương — 24520232.

Ba thư mục con là ba ứng dụng độc lập, giống cách tổ chức Lab 3:

- Lab4_Exercise1: Exercise 1.1 — lazy loading, Suspense và skeleton.
- Lab4_Exercise2: Exercise 1.2, 1.2.1, 1.2.2 — router và danh sách–chi tiết.
- Lab4_Exercise3: Exercise 1.3 — form dùng Context, validation đồng bộ và ShowData.

Mở terminal tại thư mục bài muốn chạy:

```powershell
npm install
npm run dev
```

Mở địa chỉ Local mà Vite hiển thị. Nếu đã có node_modules thì có thể chạy npm run dev ngay.
Muốn mở cả ba cùng lúc, dùng ba terminal; Vite tự chọn cổng còn trống.

Kiểm tra:

```powershell
npm test
npm run build
```

Bài 1 và 2: vào People, chọn tên, thử /people/sp-2 và /people/missing.
Bài 3: thử gửi form trống, sửa lỗi, nhập hai mật khẩu khác nhau rồi giống nhau, gửi hợp lệ và Reset.

Tên, email và cặp mật khẩu là các trường được chọn để minh họa vì slide không quy định chi tiết. Mật khẩu không được đưa vào bảng kết quả và không gửi lên server.

Mỗi bài có README, PROJECT_RULES, TASK_DECOMPOSITION, AI_FAILURE_AUDIT và VERIFICATION. Các kiểm tra trình duyệt chưa thực hiện được ghi rõ trong VERIFICATION. Lịch sử commit bàn giao được ghi trong GIT_SUBMISSION.md; các commit phản ánh đợt bàn giao sau khi hoàn thành và kiểm tra.

Kiểm tra chất lượng sau rà soát: chạy `npm run check` trong từng bài. Chi tiết lỗi đã sửa và giới hạn kiểm tra nằm trong `CODE_REVIEW.txt` và `VERIFICATION.md`.
