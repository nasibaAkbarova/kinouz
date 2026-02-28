import { Movie } from "../types/movie";

export interface MovieWithTrailer extends Movie {
  trailer_url: string;
}

// Mock data for the demo
const MOCK_MOVIES: MovieWithTrailer[] = [
  {
    id: 1,
    title: "Stranger Things",
    overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
    poster_path: "https://picsum.photos/seed/st/400/600",
    backdrop_path: "https://picsum.photos/seed/st-bg/1920/1080",
    release_date: "2016-07-15",
    vote_average: 8.7,
    genre_ids: [18, 10765, 9648],
    trailer_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: 7,
    title: "Mr. Bean's Holiday",
    overview: "Mr. Bean wins a trip to Cannes where he unwittingly separates a young boy from his father and must help the two reunite. On the way he discovers France, bicycling, and true love.",
    poster_path: "https://picsum.photos/seed/bean1/400/600",
    backdrop_path: "https://picsum.photos/seed/bean1-bg/1920/1080",
    release_date: "2007-03-24",
    vote_average: 6.4,
    genre_ids: [35, 10751],
    trailer_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    id: 8,
    title: "Bean: The Movie",
    overview: "The bumbling Mr. Bean travels to America when he is given the responsibility of bringing a highly valuable painting to a Los Angeles museum.",
    poster_path: "https://picsum.photos/seed/bean2/400/600",
    backdrop_path: "https://picsum.photos/seed/bean2-bg/1920/1080",
    release_date: "1997-07-03",
    vote_average: 6.2,
    genre_ids: [35, 10751],
    trailer_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  {
    id: 2,
    title: "The Witcher",
    overview: "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.",
    poster_path: "https://picsum.photos/seed/tw/400/600",
    backdrop_path: "https://picsum.photos/seed/tw-bg/1920/1080",
    release_date: "2019-12-20",
    vote_average: 8.1,
    genre_ids: [18, 10759, 10765],
    trailer_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  {
    id: 3,
    title: "Money Heist",
    overview: "To carry out the biggest heist in history, a mysterious man called The Professor recruits a band of eight robbers who have a single characteristic: none of them has anything to lose.",
    poster_path: "https://picsum.photos/seed/mh/400/600",
    backdrop_path: "https://picsum.photos/seed/mh-bg/1920/1080",
    release_date: "2017-05-02",
    vote_average: 8.3,
    genre_ids: [18, 80, 10759],
    trailer_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  }
];

const MOCK_ANIMATIONS: MovieWithTrailer[] = [
  {
    id: 101,
    title: "Kung Fu Panda",
    overview: "When the Valley of Peace is threatened, lazy Po the panda discovers his destiny as the 'chosen one' and trains to become a kung fu hero.",
    poster_path: "https://picsum.photos/seed/panda/400/600",
    backdrop_path: "https://picsum.photos/seed/panda-bg/1920/1080",
    release_date: "2008-06-06",
    vote_average: 7.3,
    genre_ids: [16, 10751, 35],
    trailer_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: 102,
    title: "Ice Age",
    overview: "Set during the Ice Age, a sabertooth tiger, a sloth, and a wooly mammoth find a lost human infant and they try to return him to his tribe.",
    poster_path: "https://picsum.photos/seed/iceage/400/600",
    backdrop_path: "https://picsum.photos/seed/iceage-bg/1920/1080",
    release_date: "2002-03-15",
    vote_average: 7.5,
    genre_ids: [16, 12, 35],
    trailer_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  {
    id: 103,
    title: "Finding Nemo",
    overview: "After his son is captured in the Great Barrier Reef and taken to Sydney, a timid clownfish sets out on a journey to bring him home.",
    poster_path: "https://picsum.photos/seed/nemo/400/600",
    backdrop_path: "https://picsum.photos/seed/nemo-bg/1920/1080",
    release_date: "2003-05-30",
    vote_average: 8.2,
    genre_ids: [16, 10751],
    trailer_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  }
];

const MOCK_DORAMAS: MovieWithTrailer[] = [
  {
    id: 201,
    title: "Goblin (Tokkebi)",
    overview: "O'lmaslik la'natiga duchor bo'lgan Goblin o'z hayotiga nuqta qo'yish uchun 'Goblin kelini'ni qidiradi. Bu yo'lda u xotirasini yo'qotgan o'lim farishtasi bilan uchrashadi.",
    poster_path: "https://picsum.photos/seed/goblin/400/600",
    backdrop_path: "https://picsum.photos/seed/goblin-bg/1920/1080",
    release_date: "2016-12-02",
    vote_average: 8.8,
    genre_ids: [18, 10765, 35],
    trailer_url: "https://www.youtube.com/embed/S94z6H197_U"
  },
  {
    id: 202,
    title: "Vincenzo",
    overview: "Italiya mafiyasi maslahatchisi bo'lgan koreyalik advokat o'z vataniga qaytadi va yovuz korporatsiyaga qarshi o'ziga xos usullar bilan kurashadi.",
    poster_path: "https://picsum.photos/seed/vincenzo/400/600",
    backdrop_path: "https://picsum.photos/seed/vincenzo-bg/1920/1080",
    release_date: "2021-02-20",
    vote_average: 8.5,
    genre_ids: [18, 80, 35],
    trailer_url: "https://www.youtube.com/embed/S12-4mXCNj4"
  },
  {
    id: 203,
    title: "Biz hammamiz o'lganmiz",
    overview: "Maktabda zombi virusi tarqaladi. Qamalib qolgan o'quvchilar tirik qolish uchun bor kuchlari bilan kurashishlari kerak. (All of Us Are Dead)",
    poster_path: "https://picsum.photos/seed/zombie/400/600",
    backdrop_path: "https://picsum.photos/seed/zombie-bg/1920/1080",
    release_date: "2022-01-28",
    vote_average: 8.3,
    genre_ids: [10759, 18, 10765],
    trailer_url: "https://www.youtube.com/embed/IN5TD4dqW68"
  },
  {
    id: 204,
    title: "Ish bo'yicha taklif",
    overview: "Do'stining o'rniga ko'r-ko'rona uchrashuvga chiqqan qiz, uchrashuvga kelgan yigit o'zi ishlaydigan kompaniyaning direktori ekanini bilib qoladi. (Business Proposal)",
    poster_path: "https://picsum.photos/seed/business/400/600",
    backdrop_path: "https://picsum.photos/seed/business-bg/1920/1080",
    release_date: "2022-02-28",
    vote_average: 8.7,
    genre_ids: [18, 35],
    trailer_url: "https://www.youtube.com/embed/M-PF8L38zTY"
  },
  {
    id: 205,
    title: "Ruhlar maskani",
    overview: "Taqdirni o'zgartiruvchi sehrli kuchlar va ruhlar almashinuvi haqidagi hayajonli fantaziya hikoyasi. (Alchemy of Souls)",
    poster_path: "https://picsum.photos/seed/alchemy/400/600",
    backdrop_path: "https://picsum.photos/seed/alchemy-bg/1920/1080",
    release_date: "2022-06-18",
    vote_average: 8.9,
    genre_ids: [18, 10759, 10765],
    trailer_url: "https://www.youtube.com/embed/fZp_vT_93_M"
  }
];

export const getTrendingMovies = async (): Promise<MovieWithTrailer[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_MOVIES;
};

export const getAnimations = async (): Promise<MovieWithTrailer[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_ANIMATIONS;
};

export const getDoramas = async (): Promise<MovieWithTrailer[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_DORAMAS;
};

export const getMoviesByGenre = async (genreId: number): Promise<MovieWithTrailer[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const all = [...MOCK_MOVIES, ...MOCK_ANIMATIONS, ...MOCK_DORAMAS];
  return all.filter(m => m.genre_ids.includes(genreId));
};

export const getMovieById = async (id: number): Promise<MovieWithTrailer | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const all = [...MOCK_MOVIES, ...MOCK_ANIMATIONS, ...MOCK_DORAMAS];
  return all.find(m => m.id === id);
};

export const searchMovies = async (query: string): Promise<MovieWithTrailer[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  const all = [...MOCK_MOVIES, ...MOCK_ANIMATIONS, ...MOCK_DORAMAS];
  return all.filter(m => m.title.toLowerCase().includes(query.toLowerCase()));
};
