export type RobotType = {
  id: number;
  name: string;
  status: string;
  address_ipfs: number | null;
  disabled: 0;
  address_nft: number | null;
  type: string | null;
  token_id: string;
  value: number | null;
  image: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: null;
  userId: string;
  parts: RobotPartType[];
};

// export type RobotPartType = {
//   id: number;
//   name: string;
//   type: string;
//   price: number | null;
//   visible: number;
//   createdAt?: string;
//   updatedAt?: string;
//   deletedAt?: string | null;
//   partparams: RobotPartParams[];
//   images: ImageTypeInRobotPart[];
//   z_index: number;
//   isDisable: number;
// };

export type RobotPartType = {
  id: number;
  name: string;
  type: string;
  price: number | null;
  visible: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  trait_type: string;
  images: ImageTypeInRobotPart[];
  z_index: number;
  isDisable: number;
};

export type ImageTypeInRobotPart = {
  key: string;
  type: "Thumbnail_Layer" | "Layer";
  z_index: number;
  sub_position: "Left" | "Right" | null;
};

export type RobotPartParams = {
  id: number;
  trait: string;
  value: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  partId: number;
};

export type SparePartResponse = {
  count: number;
  limit: number;
  offset: number;
  order: string[];
  result: SparePart[];
};

export type SparePart = {
  id: number;
  name: string;
  type: string;
  price: number | null;
  visible: number;
  z_index: number;
  trait_type: string;
  value: string;
  isOnMarket: number;
  sell: number | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  partparams: SparePartParams[];
  images: { key: string; type: "Thumbnail_Layer" | "Layer" }[];
  isDisable: number | null;
  market: SparePartsMarket | null;
  space: {
    createdAt: string;
    deletedAt: string | null;
    id: number;
    in_inventories: number;
    in_lootboxes: number;
    in_market: number;
    partId: number;
    updatedAt: string;
  };
  users: {
    id: string;
    user_part: {
      count: number;
      id: number;
      partId: number;
      userId: string;
    };
  }[];
};

export type SparePartParams = {
  trait: string;
  value: string;
};

export type SparePartsMarket = {
  description: string;
  count: number;
};

//1

export type AdminGetOneLootBoxType = {
  id: number;
  name: string;
  active_status: 0 | 1;
  price: number;
  rarity: "Gray" | "Green" | "Blue" | "Purple" | "Red" | "Yellow";
  loot_tokens: string | "";
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  images: ImagesOneCaseType[];
  parts: AdminPartsType[];
  type: string;
};

type ImagesOneCaseType = {
  createdAt: string;
  deletedAt: string | null;
  id: number;
  key: string;
  lootbox_image: {
    createdAt: string;
    imageId: number;
    lootboxId: number;
    updatedAt: string;
  };
  partId: number | null;
  type: string;
  updatedAt: string;
};

export type AdminPartsType = {
  id: number;
  name: string;
  type: string;
  sell: number | null;
  price: number | null;
  visible: 0 | 1;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  lootbox_part: {
    createdAt: string;
    updatedAt: string;
    partId: number;
    lootboxId: number;
  };
  partparams: AdminPartParamsType[];
  images: {
    id: number;
    key: string;
    type: "Thumbnail_Layer" | "Layer";
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    partId: number;
  }[];
};

export type AdminPartParamsType = {
  id: number;
  trait: string;
  value: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  partId: number;
};

//all

export type AdminPostAllLootBoxes = {
  count: number;
  rows: AdminOneLootBoxesType[];
  limit: number;
  offset: number;
  page: number;
};

export type AdminOneLootBoxesType = {
  id: number;
  name: string;
  active_status: 0 | 1;
  price: number;
  rarity: string;
  loot_tokens: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  type: string | null;
  images: {
    id: number;
    key: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    partId: number | null;
    lootbox_image: {
      createdAt: string;
      updatedAt: string;
      lootboxId: number;
      imageId: number;
    };
  }[];
};

export type ParamsForDetailsFilter = {
  faction: string[];
  part: string[];
};

export type GetAllImgLootBoxType = {
  id: number;
  key: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: number | null;
  partId: number | null;
}[];

// Robot

export type GetAllRobots = GetOneRobot[];

export type GetOneRobot = {
  id: number;
  name: string;
  status: string;
  address_ipfs: number | null;
  disabled: number;
  address_nft: number | null;
  type: string | null;
  value: string | null;
  token_id: string | null;
  contract_type: string | null;
  description: string | null;
  external_url: string | null;
  image: string | null;
  animation_url: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userId: string;
  parts: PartsRobot[];
};

export type PartsRobot = {
  id: number;
  name: string;
  type: string;
  price: number | null;
  sell: number | null;
  visible: number;
  z_index: number;
  trait_type: string;
  value: string;
  isOnMarket: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  robot_part: {
    createdAt: string;
    updatedAt: string;
    partId: number;
    robotId: number;
  };
  partparams: PartparamsRobot[];
  images: ImagesRobot[];
};

export type PartparamsRobot = {
  id: number;
  trait: string;
  value: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  partId: number;
};

export type ImagesRobot = {
  id: number;
  key: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  partId: number;
};

//Market

export type AllDetailsMarketType = {
  count: number;
  limit: number;
  result: [];
};

// spinner

export type WinSpinData = {
  lootbox: {
    id: number;
    is_used: boolean;
    date_used: string;
    robotId: string;
    userId: string;
    lootboxId: 5;
    updatedAt: string;
    createdAt: string;
  };
  raffle: boolean;
  winIdArray: number[];
  winData: AdminPartsType[];
};

// Profile

export type ProfileDataType = {
  spins: ProfileUserSpins[];
  userInfo: ProfileUserInfo;
};

export type ProfileUserSpins = {
  createdAt: string;
  date_used: string;
  deletedAt: string | null;
  id: number;
  is_used: number;
  lootboxId: number;
  robotId: number;
  updatedAt: string;
  userId: string;
  lootbox: { type: string; id: number };
};

export type ProfileUserInfo = {
  active_date: string;
  animation: number;
  balance: number;
  balance_xp: number;
  createdAt: string;
  deletedAt: string | null;
  email: string | null;
  garage_count: 1;
  id: number;
  wallet: string;
  language: "English" | "Russian" | "French";
  level: string;
  password: string | null;
  robots: {
    id: number;
    name: string;
    userId: string;
    status: string;
    address_ipfs: string | null;
    disabled: number;
    address_nft: string | null;
    type: string | null;
    value: string | null;
    token_id: string | null;
    contract_type: string | null;
    description: string | null;
    external_url: string | null;
    image: string | null;
    animation_url: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }[];
  role: string;
  season_pass: number;
  sound: number;
  updatedAt: string;
  tickets: TicketPayType[];
};

export type TicketPayType = {
  amount: number;
  attributes: string | null;
  class: string;
  contract_type: string;
  createdAt: string;
  deletedAt: string | null;
  description: string;
  early_access: string | null;
  id: number;
  image: string;
  level: number | null;
  name: number;
  status: number | null;
  symbol: string;
  synced_at: string;
  token_id: number;
  token_uri: string;
  updatedAt: string;
  userId: string;
};

// SeasonPass

export type SeasonPass = {
  level: number;
  nextXp: number;
  free_pass: {
    tokens: number | null;
    tier: string;
    description_tier: string;
    loots?: {
      id: number;
      name: string;
      active_status: number;
      price: number;
      rarity: string;
      loot_tokens: number;
      type: string;
      createdAt: string | null;
      updatedAt: string | null;
      deletedAt: string | null;
      images: {
        id: number;
        key: string;
        type: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
        partId: number | null;
        lootbox_image: {
          createdAt: string;
          updatedAt: string;
          lootboxId: number;
          imageId: number;
        };
      }[];
    }[];
  };
  premium_pass: {
    tokens: number | null;
    tier: string;
    description_tier: string;
    loots?: {
      id: number;
      name: string;
      active_status: number;
      price: number;
      rarity: string;
      loot_tokens: number;
      type: string;
      createdAt: string | null;
      updatedAt: string | null;
      deletedAt: string | null;
      images: {
        id: number;
        key: string;
        type: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
        partId: number | null;
        lootbox_image: {
          createdAt: string;
          updatedAt: string;
          lootboxId: number;
          imageId: number;
        };
      }[];
    }[];
  };
}[];

// HISTORY

export type HistoryUser = {
  id: number;
  description: null | string;
  amount: number;
  type_transfer: "sell" | "bue";
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  partId: number;
  userId: string;
  part: {
    id: number;
    name: string;
    type: string;
    price: null | number;
    visible: number;
    trait_type: string;
    value: string;
    isOnMarket: number;
    sell: null | number;
    service: null;
    createdAt: string;
    updatedAt: string;
    deletedAt: null | string;
    images: {
      id: number;
      key: string;
      type: "Thumbnail_Layer" | "Layer";
      part_type: string;
      sub_position: null | string;
      z_index: null | number;
      createdAt: string;
      updatedAt: string;
      deletedAt: null | string;
      partId: number;
    }[];
  };
}[];

export type BonusesAllGarageProgress = BonusProgressType[];

export type BonusProgressType = {
  next_level_xp: number;
  next: boolean;
  bonuses: {
    level: number;
    nextXp: number;
    free_pass: {
      tokens: number;
    };
    premium_pass: {
      tokens: number;
      tier: string;
      description_tier: string;
    };
  };
  dataBonuses: {};
  garage: {
    id: number;
    name: string;
    status: string;
    address_ipfs: string | null;
    disabled: 0 | 1;
    address_nft: string | null;
    type: string | null;
    value: string | null;
    token_id: string;
    contract_type: string;
    description: string;
    external_url: string;
    image: string;
    animation_url: string | null;
    balance_xp: number;
    level: number;
    active_date: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: null;
    userId: string;
  };
};

export const faqSectionData = [
  {
    value: "user",
    tabs: [
      {
        id: 1,
        title: "Section 1",
        content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
        laborum cupiditate possimus labore, hic temporibus velit dicta earum
        suscipit commodi eum enim atque at? Et perspiciatis dolore iure
        voluptatem.`,
      },
      {
        id: 2,
        title: "Section 11",
        content: `11`,
      },
      {
        id: 3,
        title: "Section 111",
        content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
        laborum cupiditate possimus labore, hic temporibus velit dicta earum
        suscipit commodi eum enim atque at? Et perspiciatis dolore iure
        voluptatem.`,
      },
    ],
  },
  {
    value: "wallet",
    tabs: [
      {
        id: 4,
        title: "Section 21",
        content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
        laborum cupiditate possimus labore, hic temporibus velit dicta earum
        suscipit commodi eum enim atque at? Et perspiciatis dolore iure
        voluptatem.`,
      },
      {
        id: 5,
        title: "Section 22",
        content: `22`,
      },
      {
        id: 6,
        title: "Section 221",
        content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
        laborum cupiditate possimus labore, hic temporibus velit dicta earum
        suscipit commodi eum enim atque at? Et perspiciatis dolore iure
        voluptatem.`,
      },
    ],
  },
  {
    value: "shield",
    tabs: [
      {
        id: 7,
        title: "Section 13",
        content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
        laborum cupiditate possimus labore, hic temporibus velit dicta earum
        suscipit commodi eum enim atque at? Et perspiciatis dolore iure
        voluptatem.`,
      },
      {
        id: 8,
        title: "Section 33",
        content: `33`,
      },
      {
        id: 9,
        title: "Section 331",
        content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
        laborum cupiditate possimus labore, hic temporibus velit dicta earum
        suscipit commodi eum enim atque at? Et perspiciatis dolore iure
        voluptatem.`,
      },
    ],
  },
  {
    value: "arrow",
    tabs: [
      {
        id: 10,
        title: "Section 14",
        content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
        laborum cupiditate possimus labore, hic temporibus velit dicta earum
        suscipit commodi eum enim atque at? Et perspiciatis dolore iure
        voluptatem.`,
      },
      {
        id: 11,
        title: "Section 44",
        content: `44`,
      },
      {
        id: 12,
        title: "Section 441",
        content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
        laborum cupiditate possimus labore, hic temporibus velit dicta earum
        suscipit commodi eum enim atque at? Et perspiciatis dolore iure
        voluptatem.`,
      },
    ],
  },
  {
    value: "clock",
    tabs: [
      {
        id: 13,
        title: "Section 15",
        content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
        laborum cupiditate possimus labore, hic temporibus velit dicta earum
        suscipit commodi eum enim atque at? Et perspiciatis dolore iure
        voluptatem.`,
      },
      {
        id: 14,
        title: "Section 55",
        content: `55`,
      },
      {
        id: 15,
        title: "Section 551",
        content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
        laborum cupiditate possimus labore, hic temporibus velit dicta earum
        suscipit commodi eum enim atque at? Et perspiciatis dolore iure
        voluptatem.`,
      },
    ],
  },
  {
    value: "game",
    tabs: [
      {
        id: 16,
        title: "Section 16",
        content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
        laborum cupiditate possimus labore, hic temporibus velit dicta earum
        suscipit commodi eum enim atque at? Et perspiciatis dolore iure
        voluptatem.`,
      },
      {
        id: 17,
        title: "Section 66",
        content: `66`,
      },
      {
        id: 18,
        title: "Section 666",
        content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
        laborum cupiditate possimus labore, hic temporibus velit dicta earum
        suscipit commodi eum enim atque at? Et perspiciatis dolore iure
        voluptatem.`,
      },
    ],
  },
];

export const seasonPass = [
  {
    id: 1,
    freePass: {
      name: "Head of Thrones",
      descr: "Skin",
      robot: true,
    },
    premPass: {
      name: "Head of Throns",
      descr: "Skin",
      robot: true,
    },
  },
  {
    id: 2,
    freePass: {
      name: "Head of Thrones",
      descr: "Skin",
    },
    premPass: {
      name: "Head of Throns",
      descr: "Skin",
      coin: 10,
    },
  },
  {
    id: 3,
    freePass: {
      name: "Head of Thrones",
      descr: "Skin",
      coin: 33,
    },
    premPass: {
      name: "Head of Throns",
      descr: "Skin",
      coin: 10,
    },
  },
  {
    id: 4,
    freePass: {
      name: "Head of Thrones",
      descr: "Skin",
      robot: true,
    },
    premPass: {
      name: "Head of Throns",
      descr: "Skin",
      coin: 10,
    },
  },
  {
    id: 5,
    freePass: {
      name: "Head of Thrones",
      descr: "Skin",
      coin: 53,
    },
    premPass: {
      name: "Head of Throns",
      descr: "Skin",
      robot: true,
    },
  },
  {
    id: 6,
    freePass: {
      name: "Head of Thrones",
      descr: "Skin",
      coin: 63,
    },
    premPass: {
      name: "Head of Throns",
      descr: "Skin",
      coin: 10,
      lock: false,
    },
  },
  {
    id: 7,
    freePass: {
      name: "Head of Thrones",
      descr: "Skin",
      coin: 73,
    },
    premPass: {
      name: "Head of Throns",
      descr: "Skin",
      robot: true,
    },
  },
];

export const bonusMap = [
  {
    id: 1,
    currentProg: 2,
    descrBonus: "Hold every day",
    nameBonus: "Name Paladin",
    needProg: 3,
    rewardCoin: 20,
  },
  {
    id: 2,
    currentProg: 3,
    descrBonus: "Hold every day",
    nameBonus: "Name Avon",
    needProg: 3,
    rewardCoin: 20,
  },
  {
    id: 3,
    currentProg: 2,
    descrBonus: "Hold every day",
    nameBonus: "Name Gaara",
    needProg: 3,
    rewardCoin: 20,
  },
  {
    id: 4,
    currentProg: 2,
    descrBonus: "Hold every day",
    nameBonus: "Name Naruto",
    needProg: 3,
    rewardCoin: 20,
  },
  {
    id: 5,
    currentProg: 1,
    descrBonus: "Hold every day",
    nameBonus: "Name Nimito",
    needProg: 3,
    rewardCoin: 80,
  },
  {
    id: 6,
    currentProg: 3,
    descrBonus: "Hold every day",
    nameBonus: "Name Avatar",
    needProg: 3,
    rewardCoin: 20,
  },
];

export const bonusesNewsMap = [
  {
    title: "News book",
    type: "book",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna Ut enim ad minim veniam, quis nostrud",
  },

  {
    title: "News game",
    type: "game",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna Ut enim ad minim veniam, quis nostrud",
  },
  {
    title: "News game",
    type: "game",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna Ut enim ad minim veniam, quis nostrud",
  },
  {
    title: "News user",
    type: "user",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna Ut enim ad minim veniam, quis nostrud",
  },
  {
    title: "News book",
    type: "book",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna Ut enim ad minim veniam, quis nostrud",
  },
];

export const horizontItemsMap = [
  { name: "Speed Run", descr: "Foot", coin: "666", status: "sell", id: 0 },
  { name: "Random Body", descr: "Body", coin: "4123", status: "buy", id: 1 },
  { name: "Gold Head", descr: "Head", coin: "1234", status: "buy", id: 2 },
  { name: "Max Armor", descr: "Shield", coin: "33", status: "sell", id: 3 },
  { name: "Frostmorne", descr: "Weapon", coin: "777", status: "buy", id: 4 },
  { name: "Max Armor", descr: "Shield", coin: "33", status: "sell", id: 3 },
  { name: "Speed Run", descr: "Foot", coin: "666", status: "sell", id: 0 },
  { name: "Frostmorne", descr: "Weapon", coin: "777", status: "buy", id: 4 },
  { name: "Max Armor", descr: "Shield", coin: "33", status: "sell", id: 3 },
  { name: "Frostmorne", descr: "Weapon", coin: "777", status: "buy", id: 4 },
];

export const verticalItemsMap = [
  {
    addCoin: 481,
    robotName: "Rob Name",
    robotDescr: "Head",
    caseName: "Case Name",
    caseCoin: 666,
  },
  {
    addCoin: 313,
    robotName: "Rob Name",
    robotDescr: "Head",
    caseName: "Case Name",
    caseCoin: 666,
  },
  {
    addCoin: 212,
    robotName: "Rob Name",
    robotDescr: "Head",
    caseName: "Case Name",
    caseCoin: 666,
  },
  {
    addCoin: 101,
    robotName: "Rob Name",
    robotDescr: "Head",
    caseName: "Case Name",
    caseCoin: 666,
  },
  {
    addCoin: 110,
    robotName: "Rob Name",
    robotDescr: "Head",
    caseName: "Case Name",
    caseCoin: 666,
  },
  {
    addCoin: 421,
    robotName: "Rob Name",
    robotDescr: "Head",
    caseName: "Case Name",
    caseCoin: 666,
  },
  {
    addCoin: 411,
    robotName: "Rob Name",
    robotDescr: "Head",
    caseName: "Case Name",
    caseCoin: 666,
  },
  {
    addCoin: 333,
    robotName: "Rob Name",
    robotDescr: "Head",
    caseName: "Case Name",
    caseCoin: 666,
  },
];
