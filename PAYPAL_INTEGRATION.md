# Hướng dẫn tích hợp PayPal

## Cách hoạt động

Tính năng thanh toán PayPal hoạt động hoàn toàn ở frontend:

1. Người dùng chọn phương thức thanh toán **PAYPAL** và nhập đầy đủ thông tin giao hàng
2. Click nút "Tiếp tục với PayPal" → Hiện modal PayPal
3. Thanh toán qua PayPal (sandbox hoặc live)
4. Sau khi PayPal xác nhận thanh toán thành công, frontend gọi API `createOrder` hiện có
5. Order được tạo trong hệ thống với thông tin PayPal transaction ID

## Cấu hình

### 1. Lấy PayPal Client ID

1. Truy cập [PayPal Developer Dashboard](https://developer.paypal.com/)
2. Đăng nhập với tài khoản PayPal
3. Vào **Dashboard** > **Apps & Credentials**
4. Chọn **Sandbox** (để test) hoặc **Live** (production)
5. Tạo app mới hoặc chọn app có sẵn
6. Copy **Client ID**

### 2. Cấu hình Frontend

Tạo/cập nhật file `.env` trong thư mục `e-commerce-fe`:

```env
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id_here
```

### 3. Tài khoản PayPal Sandbox (để test)

Khi sử dụng Sandbox mode, bạn cần:

1. Vào [Sandbox Accounts](https://developer.paypal.com/developer/accounts/)
2. Tạo hoặc sử dụng tài khoản test có sẵn
3. Có 2 loại tài khoản:
   - **Business**: Người bán (nhận tiền)
   - **Personal**: Người mua (thanh toán)
4. Sử dụng thông tin đăng nhập của tài khoản Personal để test thanh toán

## Cấu trúc Code

### Frontend

```
src/
├── components/
│   └── PayPalButton/
│       └── index.jsx          # Component xử lý PayPal
├── pages/
│   └── user/
│       └── Checkout/
│           └── index.jsx      # Trang checkout với PayPal modal
└── redux/
    └── thunks/
        └── order.thunk.js     # Gọi API createOrder
```

### Flow thanh toán PayPal

```
1. User chọn PAYPAL → Click "Tiếp tục với PayPal"
   ↓
2. Hiện Modal với PayPal Button
   ↓
3. PayPal xử lý thanh toán (chuyển VND → USD)
   ↓
4. PayPal trả về transaction ID khi thành công
   ↓
5. Frontend gọi API createOrder với:
   - Thông tin đơn hàng
   - paypalTransactionId
   - paypalPayerEmail
   ↓
6. Backend tạo order như bình thường
   ↓
7. Redirect đến trang thành công
```

## Tỷ giá chuyển đổi

Hiện tại sử dụng tỷ giá cố định: **1 USD = 24,000 VND**

Để cập nhật tỷ giá động, bạn có thể:

- Tích hợp API tỷ giá (ví dụ: ExchangeRate-API)
- Cấu hình trong admin panel
- Sử dụng biến môi trường

## Backend (Không cần thay đổi)

API `POST /orders/create-order` hiện tại đã đủ để xử lý order PayPal. Dữ liệu gửi lên:

```json
{
  "recipientName": "...",
  "recipientPhone": "...",
  "recipientEmail": "...",
  "cityCode": "...",
  "districtCode": "...",
  "wardCode": "...",
  "shippingAddress": "...",
  "paymentMethod": "PAYPAL",
  "paypalTransactionId": "xxx",
  "paypalPayerEmail": "xxx@example.com"
}
```

Nếu muốn lưu thông tin PayPal trong database, bạn có thể:

1. Thêm các trường `paypalTransactionId`, `paypalPayerEmail` vào model `orders`
2. Cập nhật controller để lưu thông tin này

## Test PayPal

### Test với Sandbox

1. Đảm bảo đã cấu hình `VITE_PAYPAL_CLIENT_ID` (Sandbox)
2. Chạy ứng dụng: `npm run dev`
3. Thêm sản phẩm vào giỏ hàng
4. Checkout và chọn **PAYPAL**
5. Click "Tiếp tục với PayPal"
6. Đăng nhập bằng tài khoản Sandbox Personal
7. Hoàn tất thanh toán

### Kiểm tra transaction

1. Vào [PayPal Developer Dashboard](https://developer.paypal.com/)
2. Chọn **Sandbox** > **Accounts**
3. Click vào tài khoản Business để xem transaction

## Lưu ý

- **Sandbox vs Live**: Nhớ chuyển từ Sandbox sang Live khi deploy production
- **Security**: KHÔNG commit file `.env` chứa Client ID lên Git
- **Error handling**: Component đã xử lý các lỗi phổ biến
- **Tỷ giá**: Cân nhắc tích hợp API tỷ giá thực tế cho production

## Troubleshooting

### PayPal button không hiển thị

- Kiểm tra `VITE_PAYPAL_CLIENT_ID` đã được cấu hình chưa
- Mở Console để xem lỗi
- Đảm bảo đã cài `@paypal/react-paypal-js`

### Thanh toán thất bại

- Kiểm tra tài khoản Sandbox có đủ số dư không
- Xem lỗi trong Console
- Kiểm tra PayPal Developer Dashboard

### API createOrder lỗi

- Kiểm tra backend đang chạy
- Xem console log để debug
- Kiểm tra format dữ liệu gửi lên

## Tài liệu tham khảo

- [PayPal Developer Documentation](https://developer.paypal.com/docs/)
- [PayPal React SDK](https://github.com/paypal/react-paypal-js)
- [PayPal REST API](https://developer.paypal.com/api/rest/)
