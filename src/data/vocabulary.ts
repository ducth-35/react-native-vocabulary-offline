import { Topic } from '../types';

// Dữ liệu từ vựng mẫu cho ứng dụng "Từ Vựng Mỗi Ngày"

export const vocabularyData: Topic[] = [
  {
    id: 'fruits',
    name: 'Fruits',
    nameVietnamese: 'Trái Cây',
    description: 'Học từ vựng về các loại trái cây',
    icon: '🍎',
    color: '#FF6B6B',
    words: [
      {
        id: 'apple',
        english: 'Apple',
        vietnamese: 'Táo',
        phonetic: '/ˈæpəl/',
        example: 'I eat an apple every day.',
        topicId: 'fruits'
      },
      {
        id: 'banana',
        english: 'Banana',
        vietnamese: 'Chuối',
        phonetic: '/bəˈnænə/',
        example: 'The banana is yellow.',
        topicId: 'fruits'
      },
      {
        id: 'orange',
        english: 'Orange',
        vietnamese: 'Cam',
        phonetic: '/ˈɔːrɪndʒ/',
        example: 'Orange juice is delicious.',
        topicId: 'fruits'
      },
      {
        id: 'grape',
        english: 'Grape',
        vietnamese: 'Nho',
        phonetic: '/ɡreɪp/',
        example: 'Grapes are sweet.',
        topicId: 'fruits'
      },
      {
        id: 'strawberry',
        english: 'Strawberry',
        vietnamese: 'Dâu tây',
        phonetic: '/ˈstrɔːberi/',
        example: 'Strawberries are red.',
        topicId: 'fruits'
      },
      {
        id: 'mango',
        english: 'Mango',
        vietnamese: 'Xoài',
        phonetic: '/ˈmæŋɡoʊ/',
        example: 'Mango is a tropical fruit.',
        topicId: 'fruits'
      },
      {
        id: 'pineapple',
        english: 'Pineapple',
        vietnamese: 'Dứa/Thơm',
        phonetic: '/ˈpaɪnæpəl/',
        example: 'Pineapple is sweet and sour.',
        topicId: 'fruits'
      },
      {
        id: 'watermelon',
        english: 'Watermelon',
        vietnamese: 'Dưa hấu',
        phonetic: '/ˈwɔːtərmelən/',
        example: 'Watermelon is refreshing in summer.',
        topicId: 'fruits'
      },
      {
        id: 'coconut',
        english: 'Coconut',
        vietnamese: 'Dừa',
        phonetic: '/ˈkoʊkənʌt/',
        example: 'Coconut water is healthy.',
        topicId: 'fruits'
      },
      {
        id: 'lemon',
        english: 'Lemon',
        vietnamese: 'Chanh vàng',
        phonetic: '/ˈlemən/',
        example: 'Lemon is sour.',
        topicId: 'fruits'
      },
      {
        id: 'peach',
        english: 'Peach',
        vietnamese: 'Đào',
        phonetic: '/piːtʃ/',
        example: 'Peach is soft and sweet.',
        topicId: 'fruits'
      }
    ]
  },
  {
    id: 'animals',
    name: 'Animals',
    nameVietnamese: 'Động Vật',
    description: 'Học từ vựng về các loài động vật',
    icon: '🐶',
    color: '#4ECDC4',
    words: [
      {
        id: 'dog',
        english: 'Dog',
        vietnamese: 'Chó',
        phonetic: '/dɔːɡ/',
        example: 'The dog is friendly.',
        topicId: 'animals'
      },
      {
        id: 'cat',
        english: 'Cat',
        vietnamese: 'Mèo',
        phonetic: '/kæt/',
        example: 'The cat is sleeping.',
        topicId: 'animals'
      },
      {
        id: 'bird',
        english: 'Bird',
        vietnamese: 'Chim',
        phonetic: '/bɜːrd/',
        example: 'The bird can fly.',
        topicId: 'animals'
      },
      {
        id: 'fish',
        english: 'Fish',
        vietnamese: 'Cá',
        phonetic: '/fɪʃ/',
        example: 'Fish live in water.',
        topicId: 'animals'
      },
      {
        id: 'elephant',
        english: 'Elephant',
        vietnamese: 'Voi',
        phonetic: '/ˈeləfənt/',
        example: 'The elephant is big.',
        topicId: 'animals'
      },
      {
        id: 'lion',
        english: 'Lion',
        vietnamese: 'Sư tử',
        phonetic: '/ˈlaɪən/',
        example: 'The lion is the king of animals.',
        topicId: 'animals'
      },
      {
        id: 'tiger',
        english: 'Tiger',
        vietnamese: 'Hổ',
        phonetic: '/ˈtaɪɡər/',
        example: 'Tigers have orange fur with black stripes.',
        topicId: 'animals'
      },
      {
        id: 'monkey',
        english: 'Monkey',
        vietnamese: 'Khỉ',
        phonetic: '/ˈmʌŋki/',
        example: 'Monkeys like to eat bananas.',
        topicId: 'animals'
      },
      {
        id: 'rabbit',
        english: 'Rabbit',
        vietnamese: 'Thỏ',
        phonetic: '/ˈræbɪt/',
        example: 'Rabbits have long ears.',
        topicId: 'animals'
      },
      {
        id: 'horse',
        english: 'Horse',
        vietnamese: 'Ngựa',
        phonetic: '/hɔːrs/',
        example: 'Horses can run very fast.',
        topicId: 'animals'
      },
      {
        id: 'cow',
        english: 'Cow',
        vietnamese: 'Bò',
        phonetic: '/kaʊ/',
        example: 'Cows give us milk.',
        topicId: 'animals'
      },
      {
        id: 'pig',
        english: 'Pig',
        vietnamese: 'Heo/Lợn',
        phonetic: '/pɪɡ/',
        example: 'Pigs are intelligent animals.',
        topicId: 'animals'
      }
    ]
  },
  {
    id: 'colors',
    name: 'Colors',
    nameVietnamese: 'Màu Sắc',
    description: 'Học từ vựng về các màu sắc',
    icon: '🌈',
    color: '#FFE66D',
    words: [
      {
        id: 'red',
        english: 'Red',
        vietnamese: 'Đỏ',
        phonetic: '/red/',
        example: 'The rose is red.',
        topicId: 'colors'
      },
      {
        id: 'blue',
        english: 'Blue',
        vietnamese: 'Xanh dương',
        phonetic: '/bluː/',
        example: 'The sky is blue.',
        topicId: 'colors'
      },
      {
        id: 'green',
        english: 'Green',
        vietnamese: 'Xanh lá',
        phonetic: '/ɡriːn/',
        example: 'Grass is green.',
        topicId: 'colors'
      },
      {
        id: 'yellow',
        english: 'Yellow',
        vietnamese: 'Vàng',
        phonetic: '/ˈjeloʊ/',
        example: 'The sun is yellow.',
        topicId: 'colors'
      },
      {
        id: 'purple',
        english: 'Purple',
        vietnamese: 'Tím',
        phonetic: '/ˈpɜːrpəl/',
        example: 'The flower is purple.',
        topicId: 'colors'
      },
      {
        id: 'orange',
        english: 'Orange',
        vietnamese: 'Cam (màu)',
        phonetic: '/ˈɔːrɪndʒ/',
        example: 'Orange is a warm color.',
        topicId: 'colors'
      },
      {
        id: 'pink',
        english: 'Pink',
        vietnamese: 'Hồng',
        phonetic: '/pɪŋk/',
        example: 'Pink roses are beautiful.',
        topicId: 'colors'
      },
      {
        id: 'brown',
        english: 'Brown',
        vietnamese: 'Nâu',
        phonetic: '/braʊn/',
        example: 'The tree trunk is brown.',
        topicId: 'colors'
      },
      {
        id: 'black',
        english: 'Black',
        vietnamese: 'Đen',
        phonetic: '/blæk/',
        example: 'The night sky is black.',
        topicId: 'colors'
      },
      {
        id: 'white',
        english: 'White',
        vietnamese: 'Trắng',
        phonetic: '/waɪt/',
        example: 'Snow is white.',
        topicId: 'colors'
      },
      {
        id: 'gray',
        english: 'Gray',
        vietnamese: 'Xám',
        phonetic: '/ɡreɪ/',
        example: 'Clouds are gray before rain.',
        topicId: 'colors'
      }
    ]
  },
  {
    id: 'family',
    name: 'Family',
    nameVietnamese: 'Gia Đình',
    description: 'Học từ vựng về các thành viên trong gia đình',
    icon: '👨‍👩‍👧‍👦',
    color: '#FF8E53',
    words: [
      {
        id: 'father',
        english: 'Father',
        vietnamese: 'Bố',
        phonetic: '/ˈfɑːðər/',
        example: 'My father is tall.',
        topicId: 'family'
      },
      {
        id: 'mother',
        english: 'Mother',
        vietnamese: 'Mẹ',
        phonetic: '/ˈmʌðər/',
        example: 'My mother is kind.',
        topicId: 'family'
      },
      {
        id: 'brother',
        english: 'Brother',
        vietnamese: 'Anh/Em trai',
        phonetic: '/ˈbrʌðər/',
        example: 'I have one brother.',
        topicId: 'family'
      },
      {
        id: 'sister',
        english: 'Sister',
        vietnamese: 'Chị/Em gái',
        phonetic: '/ˈsɪstər/',
        example: 'My sister is smart.',
        topicId: 'family'
      },
      {
        id: 'grandmother',
        english: 'Grandmother',
        vietnamese: 'Bà',
        phonetic: '/ˈɡrænmʌðər/',
        example: 'Grandmother tells stories.',
        topicId: 'family'
      },
      {
        id: 'grandfather',
        english: 'Grandfather',
        vietnamese: 'Ông',
        phonetic: '/ˈɡrænfɑːðər/',
        example: 'Grandfather reads newspapers.',
        topicId: 'family'
      },
      {
        id: 'uncle',
        english: 'Uncle',
        vietnamese: 'Chú/Bác',
        phonetic: '/ˈʌŋkəl/',
        example: 'My uncle is funny.',
        topicId: 'family'
      },
      {
        id: 'aunt',
        english: 'Aunt',
        vietnamese: 'Cô/Dì',
        phonetic: '/ænt/',
        example: 'Aunt Mary cooks well.',
        topicId: 'family'
      },
      {
        id: 'cousin',
        english: 'Cousin',
        vietnamese: 'Anh/Chị/Em họ',
        phonetic: '/ˈkʌzən/',
        example: 'My cousin lives far away.',
        topicId: 'family'
      },
      {
        id: 'son',
        english: 'Son',
        vietnamese: 'Con trai',
        phonetic: '/sʌn/',
        example: 'Their son is very smart.',
        topicId: 'family'
      },
      {
        id: 'daughter',
        english: 'Daughter',
        vietnamese: 'Con gái',
        phonetic: '/ˈdɔːtər/',
        example: 'Their daughter loves music.',
        topicId: 'family'
      }
    ]
  },
  {
    id: 'jobs',
    name: 'Jobs',
    nameVietnamese: 'Nghề Nghiệp',
    description: 'Học từ vựng về các nghề nghiệp',
    icon: '👨‍💼',
    color: '#A8E6CF',
    words: [
      {
        id: 'teacher',
        english: 'Teacher',
        vietnamese: 'Giáo viên',
        phonetic: '/ˈtiːtʃər/',
        example: 'The teacher is helpful.',
        topicId: 'jobs'
      },
      {
        id: 'doctor',
        english: 'Doctor',
        vietnamese: 'Bác sĩ',
        phonetic: '/ˈdɑːktər/',
        example: 'The doctor helps people.',
        topicId: 'jobs'
      },
      {
        id: 'nurse',
        english: 'Nurse',
        vietnamese: 'Y tá',
        phonetic: '/nɜːrs/',
        example: 'The nurse is caring.',
        topicId: 'jobs'
      },
      {
        id: 'police',
        english: 'Police Officer',
        vietnamese: 'Cảnh sát',
        phonetic: '/pəˈliːs ˈɔːfɪsər/',
        example: 'Police officers keep us safe.',
        topicId: 'jobs'
      },
      {
        id: 'chef',
        english: 'Chef',
        vietnamese: 'Đầu bếp',
        phonetic: '/ʃef/',
        example: 'The chef cooks delicious food.',
        topicId: 'jobs'
      },
      {
        id: 'engineer',
        english: 'Engineer',
        vietnamese: 'Kỹ sư',
        phonetic: '/ˌendʒɪˈnɪr/',
        example: 'Engineers design buildings.',
        topicId: 'jobs'
      },
      {
        id: 'lawyer',
        english: 'Lawyer',
        vietnamese: 'Luật sư',
        phonetic: '/ˈlɔːjər/',
        example: 'Lawyers work in courts.',
        topicId: 'jobs'
      },
      {
        id: 'pilot',
        english: 'Pilot',
        vietnamese: 'Phi công',
        phonetic: '/ˈpaɪlət/',
        example: 'Pilots fly airplanes.',
        topicId: 'jobs'
      },
      {
        id: 'farmer',
        english: 'Farmer',
        vietnamese: 'Nông dân',
        phonetic: '/ˈfɑːrmər/',
        example: 'Farmers grow crops.',
        topicId: 'jobs'
      },
      {
        id: 'artist',
        english: 'Artist',
        vietnamese: 'Nghệ sĩ',
        phonetic: '/ˈɑːrtɪst/',
        example: 'Artists create beautiful paintings.',
        topicId: 'jobs'
      },
      {
        id: 'musician',
        english: 'Musician',
        vietnamese: 'Nhạc sĩ',
        phonetic: '/mjuˈzɪʃən/',
        example: 'Musicians play instruments.',
        topicId: 'jobs'
      },
      {
        id: 'driver',
        english: 'Driver',
        vietnamese: 'Tài xế',
        phonetic: '/ˈdraɪvər/',
        example: 'Bus drivers transport people.',
        topicId: 'jobs'
      }
    ]
  }
];
