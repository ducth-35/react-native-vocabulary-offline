# Từ Vựng Mỗi Ngày 📚

Ứng dụng học từ vựng tiếng Anh dành cho người Việt Nam - đơn giản, thân thiện và hoạt động hoàn toàn offline.

## 🌟 Tính năng chính

### 📖 Học theo chủ đề
- **Trái cây** 🍎 - Học từ vựng về các loại trái cây
- **Động vật** 🐶 - Khám phá thế giới động vật
- **Màu sắc** 🌈 - Nắm vững các màu sắc cơ bản
- **Gia đình** 👨‍👩‍👧‍👦 - Từ vựng về thành viên gia đình
- **Nghề nghiệp** 👨‍💼 - Tìm hiểu các nghề nghiệp phổ biến

### 🃏 Flashcard thông minh
- Chế độ lật thẻ để học nhanh
- Xem từ tiếng Anh → bấm để hiện nghĩa tiếng Việt
- Ôn tập không giới hạn số lần

### 🧠 Quiz kiểm tra
- Bài trắc nghiệm 3-5 câu sau mỗi chủ đề
- Hiển thị kết quả đúng/sai ngay lập tức
- Theo dõi điểm số và tiến độ

### 📅 Học mỗi ngày
- Tự động tạo danh sách từ mới mỗi ngày
- Tùy chỉnh số lượng từ học (3-20 từ/ngày)
- Theo dõi chuỗi ngày học liên tiếp

### 🔊 Phát âm chuẩn
- Text-to-Speech tích hợp
- Phát âm tiếng Anh chuẩn
- Hỗ trợ học phát âm chính xác

## 🎨 Thiết kế thân thiện

- **Giao diện sáng, rõ ràng** - Dễ nhìn cho mọi độ tuổi
- **Chữ to, icon rõ** - Phù hợp với người mới bắt đầu
- **Màu sắc tươi sáng** - Tạo cảm giác vui vẻ khi học
- **Navigation đơn giản** - Dễ sử dụng và điều hướng

## 🔒 Bảo mật & Quyền riêng tư

- ✅ **Không cần đăng nhập** - Sử dụng ngay lập tức
- ✅ **Hoạt động offline** - Không cần internet (trừ TTS)
- ✅ **Không thu thập dữ liệu** - Bảo vệ quyền riêng tư
- ✅ **Không quảng cáo** - Tập trung vào học tập
- ✅ **Không cần quyền nhạy cảm** - Camera, GPS, v.v.

## 🚀 Cài đặt và chạy ứng dụng

### Yêu cầu hệ thống
- Node.js >= 18
- React Native CLI
- Android Studio (cho Android)
- Xcode (cho iOS)

### Bước 1: Cài đặt dependencies
```bash
npm install
# hoặc
yarn install
```

### Bước 2: Cài đặt pods (iOS)
```bash
cd ios && pod install && cd ..
```

### Bước 3: Chạy ứng dụng

#### Android
```bash
npm run android
# hoặc
yarn android
```

#### iOS
```bash
npm run ios
# hoặc
yarn ios
```

## 📱 Cấu trúc ứng dụng

```
src/
├── components/          # Components tái sử dụng
│   ├── WordCard/       # Component hiển thị từ vựng
│   └── textApp/        # Component text tùy chỉnh
├── data/               # Dữ liệu từ vựng
│   └── vocabulary.ts   # Dữ liệu từ vựng theo chủ đề
├── navigators/         # Cấu hình navigation
├── screens/            # Các màn hình ứng dụng
│   ├── Home/          # Màn hình chính
│   ├── Topics/        # Danh sách chủ đề
│   ├── TopicDetail/   # Chi tiết chủ đề
│   ├── Flashcard/     # Màn hình flashcard
│   ├── Quiz/          # Màn hình quiz
│   ├── DailyWords/    # Từ vựng hàng ngày
│   ├── Settings/      # Cài đặt
│   └── Profile/       # Hồ sơ người dùng
├── store/              # Quản lý state với Zustand
├── styles/             # Theme và styling
├── types/              # TypeScript types
└── utils/              # Utilities và services
    └── ttsService.ts   # Service Text-to-Speech
```

## 🎯 Tính năng nổi bật

### 💾 Lưu trữ offline
- Sử dụng AsyncStorage để lưu tiến độ học tập
- Dữ liệu từ vựng được tích hợp sẵn trong ứng dụng
- Không cần kết nối internet để sử dụng

### 📊 Theo dõi tiến độ
- Chuỗi ngày học liên tiếp
- Tổng số từ đã học
- Thống kê chi tiết theo ngày
- Điểm số quiz

### 🔧 Tùy chỉnh linh hoạt
- Số lượng từ học mỗi ngày (3-20 từ)
- Bật/tắt âm thanh phát âm
- Cài đặt ngôn ngữ giao diện

## 🛠️ Công nghệ sử dụng

- **React Native 0.77.1** - Framework chính
- **TypeScript** - Type safety
- **Zustand** - State management
- **React Navigation 6** - Navigation
- **AsyncStorage** - Local storage
- **react-native-tts** - Text-to-Speech
- **React Native Vector Icons** - Icons

## 📋 Roadmap

### Phiên bản tiếp theo
- [ ] Thêm nhiều chủ đề từ vựng
- [ ] Chế độ học nâng cao
- [ ] Thống kê chi tiết hơn
- [ ] Xuất/nhập dữ liệu học tập
- [ ] Chế độ tối (Dark mode)
- [ ] Hỗ trợ nhiều ngôn ngữ

### Tính năng mở rộng
- [ ] Từ vựng theo cấp độ (A1, A2, B1, B2)
- [ ] Trò chơi học từ vựng
- [ ] Nhắc nhở học tập
- [ ] Chia sẻ tiến độ

---

**Từ Vựng Mỗi Ngày** - Học một chút mỗi ngày, tiến bộ mỗi ngày! 🌟
| |
│ └── types/
│ | └── global.ts
│ | └── ....etc.ts
│ |
│ └── utils/
│ | └── intex.ts
│ | └── ....etc.ts
| |
├── App.js
└── ...
```
