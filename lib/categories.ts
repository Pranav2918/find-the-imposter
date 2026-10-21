export interface Category {
  id: string;
  name: string;
  emoji: string;
  words: string[];
}

export const CATEGORIES: Category[] = [
  {
    id: "bollywood",
    name: "Bollywood Movies",
    emoji: "🎬",
    words: [
      "Sholay", "Dilwale", "Baahubali", "Dangal", "3 Idiots",
      "Mughal-E-Azam", "Deewar", "Zanjeer", "Lagaan", "Kabhi Khushi Kabhie Gham",
      "Devdas", "Tare Zameen Par", "PK", "Gangs of Wasseypur", "Dil Chahta Hai",
      "Rang De Basanti", "Queen", "Barfi", "Andhadhun", "Stree",
      "RRR", "Pushpa", "KGF", "Uri", "Article 15"
    ],
  },
  {
    id: "cricket",
    name: "Indian Cricket",
    emoji: "🏏",
    words: [
      "Sachin Tendulkar", "MS Dhoni", "Virat Kohli", "Rohit Sharma", "Kapil Dev",
      "Sunil Gavaskar", "Anil Kumble", "Harbhajan Singh", "Yuvraj Singh", "Rahul Dravid",
      "VVS Laxman", "Sourav Ganguly", "Jasprit Bumrah", "Ravindra Jadeja", "Shubman Gill",
      "IPL", "Eden Gardens", "Wankhede Stadium", "World Cup 1983", "World Cup 2011",
      "Six sixes Yuvraj", "Desert Storm", "360 degree shot", "Helicopter Shot", "Switch Hit"
    ],
  },
  {
    id: "street_food",
    name: "Indian Street Food",
    emoji: "🍛",
    words: [
      "Pani Puri", "Vada Pav", "Pav Bhaji", "Chole Bhature", "Dosa",
      "Idli", "Samosa", "Kachori", "Aloo Tikki", "Bhel Puri",
      "Sev Puri", "Dabeli", "Mirchi Bada", "Litti Chokha", "Jalebi",
      "Kulfi", "Chaat", "Dahi Puri", "Raj Kachori", "Golgappa",
      "Frankies", "Kathi Roll", "Momos", "Thukpa", "Poha"
    ],
  },
  {
    id: "festivals",
    name: "Indian Festivals",
    emoji: "🪔",
    words: [
      "Diwali", "Holi", "Dussehra", "Navratri", "Eid",
      "Christmas", "Baisakhi", "Pongal", "Onam", "Ganesh Chaturthi",
      "Durga Puja", "Janmashtami", "Maha Shivaratri", "Rath Yatra", "Bihu",
      "Ugadi", "Vishu", "Lohri", "Makar Sankranti", "Raksha Bandhan",
      "Karwa Chauth", "Teej", "Chhath Puja", "Guru Nanak Jayanti", "Buddha Purnima"
    ],
  },
  {
    id: "politicians",
    name: "Indian Politicians",
    emoji: "🏛️",
    words: [
      "Narendra Modi", "Jawaharlal Nehru", "Indira Gandhi", "Rajiv Gandhi", "Mahatma Gandhi",
      "Sardar Patel", "Subhas Chandra Bose", "B R Ambedkar", "Atal Bihari Vajpayee", "Manmohan Singh",
      "Rahul Gandhi", "Arvind Kejriwal", "Mamata Banerjee", "Yogi Adityanath", "Sharad Pawar",
      "Nitish Kumar", "Chandrababu Naidu", "Pinarayi Vijayan", "Siddaramaiah", "Hemant Soren"
    ],
  },
  {
    id: "indian_dishes",
    name: "Indian Dishes",
    emoji: "🍲",
    words: [
      "Biryani", "Butter Chicken", "Dal Makhani", "Palak Paneer", "Rogan Josh",
      "Hyderabadi Biryani", "Curd Rice", "Rajma Chawal", "Kadhai Paneer", "Malai Kofta",
      "Aloo Gobi", "Baingan Bharta", "Saag", "Sambar", "Rasam",
      "Khichdi", "Pulao", "Halwa", "Kheer", "Gulab Jamun",
      "Rasgulla", "Ladoo", "Barfi", "Chum Chum", "Peda"
    ],
  },
  {
    id: "yoga",
    name: "Yoga Poses",
    emoji: "🧘",
    words: [
      "Tadasana", "Vrikshasana", "Adho Mukha Svanasana", "Bhujangasana", "Trikonasana",
      "Setu Bandhasana", "Vajrasana", "Padmasana", "Surya Namaskar", "Shavasana",
      "Balasana", "Uttanasana", "Marjaryasana", "Bitilasana", "Virabhadrasana",
      "Natarajasana", "Bakasana", "Sirsasana", "Sarvangasana", "Halasana",
      "Dhanurasana", "Paschimottanasana", "Gomukhasana", "Garudasana", "Anjaneyasana"
    ],
  },
  {
    id: "desi_shows",
    name: "Desi TV Shows",
    emoji: "📺",
    words: [
      "Ramayan", "Mahabharat", "Taarak Mehta", "KBC", "Bigg Boss",
      "Indian Idol", "Comedy Nights with Kapil", "Sarabhai vs Sarabhai", "Office Office", "Jassi Jaisi Koi Nahin",
      "Kyunki Saas Bhi Kabhi Bahu Thi", "Balika Vadhu", "CID", "Crime Patrol", "MTV Roadies",
      "MTV Splitsvilla", "Dance India Dance", "Jhalak Dikhhla Jaa", "Shark Tank India", "The Kapil Sharma Show",
      "Mirzapur", "Sacred Games", "Scam 1992", "Panchayat", "Aspirants"
    ],
  },
  {
    id: "bollywood_actors",
    name: "Bollywood Actors",
    emoji: "⭐",
    words: [
      "Shah Rukh Khan", "Amitabh Bachchan", "Salman Khan", "Aamir Khan", "Hrithik Roshan",
      "Ranbir Kapoor", "Ranveer Singh", "Akshay Kumar", "Ajay Devgn", "Deepika Padukone",
      "Priyanka Chopra", "Kareena Kapoor", "Alia Bhatt", "Katrina Kaif", "Aishwarya Rai",
      "Tabu", "Vidya Balan", "Kangana Ranaut", "Madhuri Dixit", "Juhi Chawla"
    ],
  },
  {
    id: "indian_cities",
    name: "Indian Cities",
    emoji: "🏙️",
    words: [
      "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai",
      "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow",
      "Surat", "Kochi", "Chandigarh", "Bhopal", "Patna",
      "Nagpur", "Indore", "Coimbatore", "Visakhapatnam", "Varanasi",
      "Agra", "Mysore", "Amritsar", "Goa", "Shimla"
    ],
  },
  {
    id: "dances",
    name: "Indian Dances",
    emoji: "💃",
    words: [
      "Bharatanatyam", "Kathak", "Odissi", "Kuchipudi", "Manipuri",
      "Mohiniyattam", "Kathakali", "Sattriya", "Bhangra", "Garba",
      "Dandiya", "Lavani", "Ghoomar", "Bihu", "Chhau",
      "Yakshagana", "Theyyam", "Kalbelia", "Cheraw", "Dholi"
    ],
  },
  {
    id: "sports",
    name: "Indian Sports Stars",
    emoji: "🏆",
    words: [
      "PV Sindhu", "Neeraj Chopra", "Saina Nehwal", "Sania Mirza", "Mary Kom",
      "Abhinav Bindra", "Milkha Singh", "PT Usha", "Dipa Karmakar", "Bajrang Punia",
      "Mirabai Chanu", "Lovlina Borgohain", "Vinesh Phogat", "Geeta Phogat", "Leander Paes",
      "Sunil Chhetri", "Bhaichung Bhutia", "Dhyan Chand", "PR Sreejesh", "Rani Rampal"
    ],
  },
];

export function getRandomWord(category: Category): string {
  return category.words[Math.floor(Math.random() * category.words.length)];
}
