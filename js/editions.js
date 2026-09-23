const EDITIONS = [
  {
    id: "vietnam-foxi",
    name: "Vietnam — Cờ Tỷ Phú",
    language: "vi",

    boardImage: {
      src: "assets/boards/vn-foxi.jpg",
      alt: "Foxi Cờ Tỷ Phú Việt Nam board layout"
    },

    boardSpaces: [
      { id: "start", space: 0, name: "Bắt đầu", subtitle: "Nhận 2000", type: "start" },
      { id: "cao-bang", space: 1, name: "Cao Bằng", type: "property" },
      { id: "chance-1", space: 2, name: "Cơ hội", type: "chance" },
      { id: "lai-chau", space: 3, name: "Lai Châu", type: "property" },
      { id: "dien-bien", space: 4, name: "Điện Biên", type: "property" },
      { id: "son-la-hydropower", space: 5, name: "Thủy điện Sơn La", type: "utility" },
      { id: "da-nang-tourism", space: 6, name: "TP. Du lịch Đà Nẵng", type: "property" },
      { id: "lang-son", space: 7, name: "Lạng Sơn", type: "property" },
      { id: "hue", space: 8, name: "TP. Huế", type: "property" },
      { id: "hai-phong-seaport", space: 9, name: "Cảng biển Hải Phòng", type: "transport" },
      { id: "tuyen-quang", space: 10, name: "Tuyên Quang", type: "property" },
      { id: "jail", space: 11, name: "Thăm tù", type: "jail" },
      { id: "ha-tinh", space: 12, name: "Hà Tĩnh", type: "property" },
      { id: "quang-tri", space: 13, name: "Quảng Trị", type: "property" },
      { id: "khi-van-1", space: 14, name: "Khí vận", type: "utility-card" },
      { id: "lao-cai", space: 15, name: "Lào Cai", type: "property" },
      { id: "nha-trang-khanh-hoa-tourism", space: 16, name: "TP. Du lịch Nha Trang Khánh Hòa", type: "property" },
      { id: "ca-mau", space: 17, name: "Cà Mau", type: "property" },
      { id: "quang-ngai", space: 18, name: "Quảng Ngãi", type: "property" },
      { id: "thai-nguyen", space: 19, name: "Thái Nguyên", type: "property" },
      { id: "chance-2", space: 20, name: "Cơ hội", type: "chance" },
      { id: "dak-lak", space: 21, name: "Đắk Lắk", type: "property" },
      { id: "free-parking", space: 22, name: "Miễn phí", type: "free-parking" },
      { id: "nghe-an", space: 23, name: "Nghệ An", type: "property" },
      { id: "khi-van-2", space: 24, name: "Khí vận", type: "utility-card" },
      { id: "gia-lai", space: 25, name: "Gia Lai", type: "property" },
      { id: "vinh-long", space: 26, name: "Vĩnh Long", type: "property" },
      { id: "song-da-phu-tho-waterworks", space: 27, name: "Nhà máy nước sông Đà - Phú Thọ", type: "utility" },
      { id: "da-lat-tourism", space: 28, name: "TP. Du lịch Đà Lạt", type: "property" },
      { id: "dong-thap", space: 29, name: "Đồng Tháp", type: "property" },
      { id: "chance-3", space: 30, name: "Cơ hội", type: "chance" },
      { id: "an-giang", space: 31, name: "An Giang", type: "property" },
      { id: "can-tho", space: 32, name: "Cần Thơ", type: "property" },
      { id: "go-to-jail", space: 33, name: "Vào tù", type: "go-to-jail" },
      { id: "hung-yen", space: 34, name: "Hưng Yên", type: "property" },
      { id: "ha-long-tourism", space: 35, name: "TP. Du lịch Hạ Long", type: "property" },
      { id: "ninh-binh", space: 36, name: "Ninh Bình", type: "property" },
      { id: "tay-ninh", space: 37, name: "Tây Ninh", type: "property" },
      { id: "long-thanh-dong-nai-airport", space: 38, name: "Sân bay Long Thành Đồng Nai", type: "transport" },
      { id: "thanh-hoa", space: 39, name: "Thanh Hóa", type: "property" },
      { id: "bac-ninh", space: 40, name: "Bắc Ninh", type: "property" },
      { id: "khi-van-3", space: 41, name: "Khí vận", type: "utility-card" },
      { id: "ha-noi", space: 42, name: "Hà Nội", type: "property" },
      { id: "ho-chi-minh-city", space: 43, name: "TP. Hồ Chí Minh", type: "property" }
    ],

    properties: [
      { id: "cao-bang", name: "Cao Bằng", type: "property", category: "province", colourGroup: "light-green", canBuild: true },
      { id: "lai-chau", name: "Lai Châu", type: "property", category: "province", colourGroup: "light-green", canBuild: true },
      { id: "dien-bien", name: "Điện Biên", type: "property", category: "province", colourGroup: "light-green", canBuild: true },
      { id: "lang-son", name: "Lạng Sơn", type: "property", category: "province", colourGroup: "light-blue", canBuild: true },
      { id: "hue", name: "TP. Huế", type: "property", category: "city", colourGroup: "light-blue", canBuild: true },
      { id: "tuyen-quang", name: "Tuyên Quang", type: "property", category: "province", colourGroup: "light-blue", canBuild: true },
      { id: "ha-tinh", name: "Hà Tĩnh", type: "property", category: "province", colourGroup: "orange", canBuild: true },
      { id: "quang-tri", name: "Quảng Trị", type: "property", category: "province", colourGroup: "orange", canBuild: true },
      { id: "lao-cai", name: "Lào Cai", type: "property", category: "province", colourGroup: "orange", canBuild: true },
      { id: "ca-mau", name: "Cà Mau", type: "property", category: "province", colourGroup: "green", canBuild: true },
      { id: "quang-ngai", name: "Quảng Ngãi", type: "property", category: "province", colourGroup: "green", canBuild: true },
      { id: "thai-nguyen", name: "Thái Nguyên", type: "property", category: "province", colourGroup: "light-brown", canBuild: true },
      { id: "dak-lak", name: "Đắk Lắk", type: "property", category: "province", colourGroup: "light-brown", canBuild: true },
      { id: "nghe-an", name: "Nghệ An", type: "property", category: "province", colourGroup: "purple", canBuild: true },
      { id: "gia-lai", name: "Gia Lai", type: "property", category: "province", colourGroup: "purple", canBuild: true },
      { id: "vinh-long", name: "Vĩnh Long", type: "property", category: "province", colourGroup: "purple", canBuild: true },
      { id: "dong-thap", name: "Đồng Tháp", type: "property", category: "province", colourGroup: "pink", canBuild: true },
      { id: "an-giang", name: "An Giang", type: "property", category: "province", colourGroup: "pink", canBuild: true },
      { id: "can-tho", name: "Cần Thơ", type: "property", category: "city", colourGroup: "pink", canBuild: true },
      { id: "hung-yen", name: "Hưng Yên", type: "property", category: "province", colourGroup: "yellow", canBuild: true },
      { id: "ninh-binh", name: "Ninh Bình", type: "property", category: "province", colourGroup: "yellow", canBuild: true },
      { id: "tay-ninh", name: "Tây Ninh", type: "property", category: "province", colourGroup: "yellow", canBuild: true },
      { id: "thanh-hoa", name: "Thanh Hóa", type: "property", category: "province", colourGroup: "dark-green", canBuild: true },
      { id: "bac-ninh", name: "Bắc Ninh", type: "property", category: "province", colourGroup: "dark-green", canBuild: true },
      { id: "ha-noi", name: "Hà Nội", type: "property", category: "city", colourGroup: "brown", canBuild: true },
      { id: "ho-chi-minh-city", name: "TP. Hồ Chí Minh", type: "property", category: "city", colourGroup: "brown", canBuild: true },
      { id: "son-la-hydropower", name: "Thủy điện Sơn La", type: "utility", category: "utility", colourGroup: "utility", canBuild: false },
      { id: "song-da-phu-tho-waterworks", name: "Nhà máy nước sông Đà - Phú Thọ", type: "utility", category: "utility", colourGroup: "utility", canBuild: false },
      { id: "hai-phong-seaport", name: "Cảng biển Hải Phòng", type: "transport", category: "transport", colourGroup: "transport", canBuild: false },
      { id: "long-thanh-dong-nai-airport", name: "Sân bay Long Thành Đồng Nai", type: "transport", category: "transport", colourGroup: "transport", canBuild: false },
      { id: "da-nang-tourism", name: "TP. Du lịch Đà Nẵng", type: "property", category: "tourism", colourGroup: "tourism", canBuild: false },
      { id: "nha-trang-khanh-hoa-tourism", name: "TP. Du lịch Nha Trang Khánh Hòa", type: "property", category: "tourism", colourGroup: "tourism", canBuild: false },
      { id: "da-lat-tourism", name: "TP. Du lịch Đà Lạt", type: "property", category: "tourism", colourGroup: "tourism", canBuild: false },
      { id: "ha-long-tourism", name: "TP. Du lịch Hạ Long", type: "property", category: "tourism", colourGroup: "tourism", canBuild: false }
    ]
  },
  {
    id: "english",
    name: "English edition",
    language: "en",
    boardSpaces: [],
    properties: []
  },
  {
    id: "australian-classic",
    name: "Australia — Classic edition",
    language: "en",
    boardImage: {
      src: "assets/boards/aus-classic.jpg",
      alt: "Classic Australian Monopoly board layout"
    },

    boardSpaces: [
      { id: "go", space: 0, name: "GO", subtitle: "Collect $200 as you pass", type: "start" },
      { id: "todd-street", space: 1, name: "Todd Street", type: "property" },
      { id: "community-chest-1", space: 2, name: "Community Chest", type: "community-chest" },
      { id: "smith-street", space: 3, name: "Smith Street", type: "property" },
      { id: "income-tax", space: 4, name: "Income Tax", subtitle: "Pay 10% or $200", type: "tax" },
      { id: "perth-station", space: 5, name: "Perth Station", type: "transport" },
      { id: "salamanca-place", space: 6, name: "Salamanca Place", type: "property" },
      { id: "chance-1", space: 7, name: "Chance", type: "chance" },
      { id: "davey-street", space: 8, name: "Davey Street", type: "property" },
      { id: "macquarie-street", space: 9, name: "Macquarie Street", type: "property" },
      { id: "jail", space: 10, name: "Jail", subtitle: "Just Visiting", type: "jail" },
      { id: "williams-street", space: 11, name: "Williams Street", type: "property" },
      { id: "australia-post", space: 12, name: "Australia Post", type: "utility" },
      { id: "barrack-street", space: 13, name: "Barrack Street", type: "property" },
      { id: "hay-street", space: 14, name: "Hay Street", type: "property" },
      { id: "adelaide-station", space: 15, name: "Adelaide Station", type: "transport" },
      { id: "north-terrace", space: 16, name: "North Terrace", type: "property" },
      { id: "community-chest-2", space: 17, name: "Community Chest", type: "community-chest" },
      { id: "victoria-square", space: 18, name: "Victoria Square", type: "property" },
      { id: "rundle-mall", space: 19, name: "Rundle Mall", type: "property" },
      { id: "free-parking", space: 20, name: "Free Parking", type: "free-parking" },
      { id: "stanley-street", space: 21, name: "Stanley Street", type: "property" },
      { id: "chance-2", space: 22, name: "Chance", type: "chance" },
      { id: "petries-bight", space: 23, name: "Petrie's Bight", type: "property" },
      { id: "wickham-terrace", space: 24, name: "Wickham Terrace", type: "property" },
      { id: "flinders-street-station", space: 25, name: "Flinders Street Station", type: "transport" },
      { id: "collins-street", space: 26, name: "Collins Street", type: "property" },
      { id: "elizabeth-street", space: 27, name: "Elizabeth Street", type: "property" },
      { id: "telecom-australia", space: 28, name: "Telecom Australia", type: "utility" },
      { id: "bourke-street", space: 29, name: "Bourke Street", type: "property" },
      { id: "go-to-jail", space: 30, name: "Go to Jail", type: "go-to-jail" },
      { id: "castlereagh-street", space: 31, name: "Castlereagh Street", type: "property" },
      { id: "george-street", space: 32, name: "George Street", type: "property" },
      { id: "community-chest-3", space: 33, name: "Community Chest", type: "community-chest" },
      { id: "pitt-street", space: 34, name: "Pitt Street", type: "property" },
      { id: "sydney-station", space: 35, name: "Sydney Station", type: "transport" },
      { id: "chance-3", space: 36, name: "Chance", type: "chance" },
      { id: "flinders-street", space: 37, name: "Flinders Street", type: "property" },
      { id: "sales-tax", space: 38, name: "Sales Tax", subtitle: "Pay $100", type: "tax" },
      { id: "kings-avenue", space: 39, name: "Kings Avenue", type: "property" }
    ],

    properties: [
      { id: "todd-street", name: "Todd Street", type: "property", category: "street", colourGroup: "brown", canBuild: true },
      { id: "smith-street", name: "Smith Street", type: "property", category: "street", colourGroup: "brown", canBuild: true },

      { id: "salamanca-place", name: "Salamanca Place", type: "property", category: "street", colourGroup: "light-blue", canBuild: true },
      { id: "davey-street", name: "Davey Street", type: "property", category: "street", colourGroup: "light-blue", canBuild: true },
      { id: "macquarie-street", name: "Macquarie Street", type: "property", category: "street", colourGroup: "light-blue", canBuild: true },

      { id: "williams-street", name: "Williams Street", type: "property", category: "street", colourGroup: "purple", canBuild: true },
      { id: "barrack-street", name: "Barrack Street", type: "property", category: "street", colourGroup: "purple", canBuild: true },
      { id: "hay-street", name: "Hay Street", type: "property", category: "street", colourGroup: "purple", canBuild: true },

      { id: "north-terrace", name: "North Terrace", type: "property", category: "street", colourGroup: "orange", canBuild: true },
      { id: "victoria-square", name: "Victoria Square", type: "property", category: "street", colourGroup: "orange", canBuild: true },
      { id: "rundle-mall", name: "Rundle Mall", type: "property", category: "street", colourGroup: "orange", canBuild: true },

      { id: "stanley-street", name: "Stanley Street", type: "property", category: "street", colourGroup: "red", canBuild: true },
      { id: "petries-bight", name: "Petrie's Bight", type: "property", category: "street", colourGroup: "red", canBuild: true },
      { id: "wickham-terrace", name: "Wickham Terrace", type: "property", category: "street", colourGroup: "red", canBuild: true },

      { id: "collins-street", name: "Collins Street", type: "property", category: "street", colourGroup: "yellow", canBuild: true },
      { id: "elizabeth-street", name: "Elizabeth Street", type: "property", category: "street", colourGroup: "yellow", canBuild: true },
      { id: "bourke-street", name: "Bourke Street", type: "property", category: "street", colourGroup: "yellow", canBuild: true },

      { id: "castlereagh-street", name: "Castlereagh Street", type: "property", category: "street", colourGroup: "green", canBuild: true },
      { id: "george-street", name: "George Street", type: "property", category: "street", colourGroup: "green", canBuild: true },
      { id: "pitt-street", name: "Pitt Street", type: "property", category: "street", colourGroup: "green", canBuild: true },

      { id: "flinders-street", name: "Flinders Street", type: "property", category: "street", colourGroup: "dark-blue", canBuild: true },
      { id: "kings-avenue", name: "Kings Avenue", type: "property", category: "street", colourGroup: "dark-blue", canBuild: true },

      { id: "perth-station", name: "Perth Station", type: "transport", category: "station", colourGroup: "transport", canBuild: false },
      { id: "adelaide-station", name: "Adelaide Station", type: "transport", category: "station", colourGroup: "transport", canBuild: false },
      { id: "flinders-street-station", name: "Flinders Street Station", type: "transport", category: "station", colourGroup: "transport", canBuild: false },
      { id: "sydney-station", name: "Sydney Station", type: "transport", category: "station", colourGroup: "transport", canBuild: false },

      { id: "australia-post", name: "Australia Post", type: "utility", category: "utility", colourGroup: "utility", canBuild: false },
      { id: "telecom-australia", name: "Telecom Australia", type: "utility", category: "utility", colourGroup: "utility", canBuild: false }
    ]
  },
  {
    id: "french",
    name: "French edition",
    language: "fr",
    boardSpaces: [],
    properties: []
  }
];

function getEditionById(editionId) {
  return EDITIONS.find((edition) => edition.id === editionId) || null;
}

function getBoardSpaceById(editionId, spaceId) {
  const edition = getEditionById(editionId);

  if (!edition) {
    return null;
  }

  return edition.boardSpaces.find((space) => space.id === spaceId) || null;
}

function getBoardSpaceByNumber(editionId, spaceNumber) {
  const edition = getEditionById(editionId);

  if (!edition) {
    return null;
  }

  return (
    edition.boardSpaces.find((space) => space.space === spaceNumber) || null
  );
}
