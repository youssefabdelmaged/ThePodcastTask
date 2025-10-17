require("dotenv").config();
const mongoose = require("mongoose");
const Episode = require("../models/Episode");

// Random audio URLs for testing
const audioUrls = [
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-18.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-19.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-20.mp3",
];

// Sample episode data
const episodesData = [
  {
    title: "O que é um bom código?",
    description:
      "Neste episódio, discutimos os princípios fundamentais de código limpo e as melhores práticas para escrever código de qualidade.",
    hosts: "Diego e Richard",
    duration: "1:35:18",
    date: "8 Jan 21",
    thumbnail: "/assets/thumbnail.png",
    category: "programming",
    isFeatured: true,
    tags: ["programming", "clean code", "best practices"],
  },
  {
    title: "Como começar na programação...",
    description:
      "Um guia completo para iniciantes que querem entrar no mundo da programação. Dicas práticas e recursos essenciais.",
    hosts: "Tiago, Diego e Pellizzetti",
    duration: "35:40",
    date: "8 Jan 21",
    thumbnail: "/assets/thumbnail.png",
    category: "programming",
    isFeatured: true,
    tags: ["programming", "beginner", "career"],
  },
  {
    title: "A vida é boa",
    description:
      "Reflexões sobre a vida, carreira e como encontrar equilíbrio entre trabalho e vida pessoal.",
    hosts: "Tiago, Diego e Pellizzetti",
    duration: "1:35:18",
    date: "8 Jan 21",
    thumbnail: "/assets/thumbnail.png",
    category: "lifestyle",
    tags: ["lifestyle", "motivation", "balance"],
  },
  {
    title: "Como programar like a god",
    description:
      "Técnicas avançadas de programação e como se tornar um desenvolvedor excepcional.",
    hosts: "Maria, Tiago e Samuel",
    duration: "35:40",
    date: "7 Jan 21",
    thumbnail: "/assets/thumbnail.png",
    category: "programming",
    tags: ["programming", "advanced", "skills"],
  },
  {
    title: "Bora viver!",
    description:
      "Motivação e inspiração para aproveitar a vida ao máximo e seguir seus sonhos.",
    hosts: "Diego e Richard",
    duration: "54:27",
    date: "12 Fev 21",
    thumbnail: "/assets/thumbnail.png",
    category: "motivation",
    tags: ["motivation", "inspiration", "life"],
  },
  {
    title: "Não desista de você",
    description:
      "Conversa sobre perseverança, resiliência e como superar os desafios da vida.",
    hosts: "Pelpas, Pulili, Pepe e Pupa",
    duration: "1:27:11",
    date: "24 Mar 21",
    thumbnail: "/assets/thumbnail.png",
    category: "motivation",
    tags: ["motivation", "perseverance", "challenges"],
  },
  {
    title: "A vida é incrível",
    description:
      "Celebrando as pequenas coisas da vida e como encontrar alegria no dia a dia.",
    hosts: "B1 e B2 descendo as escadas",
    duration: "1:35:18",
    date: "25 Mar 21",
    thumbnail: "/assets/thumbnail.png",
    category: "lifestyle",
    tags: ["lifestyle", "happiness", "gratitude"],
  },
  {
    title: "Tecnologia e Sociedade",
    description:
      "Como a tecnologia está moldando nossa sociedade e o que esperar do futuro.",
    hosts: "Ana e Carlos",
    duration: "42:15",
    date: "30 Mar 21",
    thumbnail: "/assets/thumbnail.png",
    category: "technology",
    tags: ["technology", "society", "future"],
  },
  {
    title: "Empreendedorismo Digital",
    description:
      "Dicas práticas para começar seu próprio negócio online e ter sucesso no mundo digital.",
    hosts: "João e Maria",
    duration: "58:33",
    date: "5 Abr 21",
    thumbnail: "/assets/thumbnail.png",
    category: "business",
    tags: ["entrepreneurship", "digital", "business"],
  },
  {
    title: "Inteligência Artificial e Você",
    description:
      "Como a IA está mudando o mundo do trabalho e o que isso significa para sua carreira.",
    hosts: "Dr. Silva e Eng. Santos",
    duration: "1:12:45",
    date: "10 Abr 21",
    thumbnail: "/assets/thumbnail.png",
    category: "technology",
    tags: ["AI", "career", "future of work"],
  },
  {
    title: "Mindfulness e Produtividade",
    description:
      "Como práticas de mindfulness podem melhorar sua produtividade e bem-estar.",
    hosts: "Prof. Mindfulness",
    duration: "38:22",
    date: "15 Abr 21",
    thumbnail: "/assets/thumbnail.png",
    category: "wellness",
    tags: ["mindfulness", "productivity", "wellness"],
  },
  {
    title: "O Futuro da Educação",
    description:
      "Como a tecnologia está revolucionando a educação e o que esperar dos próximos anos.",
    hosts: "Dra. Educação",
    duration: "1:05:18",
    date: "20 Abr 21",
    thumbnail: "/assets/thumbnail.png",
    category: "education",
    tags: ["education", "technology", "future"],
  },
];

const connectDB = async () => {
  try {
    const MONGODB_URI =
      process.env.MONGODB_URI ||
      "mongodb+srv://youssefabdelmaged50_db_user:6Lg0WCko3e1G7NST@cluster0.vbgcvao.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

const seedEpisodes = async () => {
  try {
    // Clear existing episodes
    await Episode.deleteMany({});
    console.log("🗑️  Cleared existing episodes");

    // Add random audio URLs to episodes
    const episodesWithAudio = episodesData.map((episode, index) => ({
      ...episode,
      audioUrl: audioUrls[index % audioUrls.length],
      publishedAt: new Date(2021, 0, 8 + index), // Spread dates
      playCount: Math.floor(Math.random() * 1000),
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // Random rating between 3-5
    }));

    // Insert episodes
    const episodes = await Episode.insertMany(episodesWithAudio);
    console.log(`✅ Seeded ${episodes.length} episodes`);

    // Show some statistics
    const featuredCount = await Episode.countDocuments({ isFeatured: true });
    const categories = await Episode.distinct("category");

    console.log(`📊 Featured episodes: ${featuredCount}`);
    console.log(`📊 Categories: ${categories.join(", ")}`);
    console.log(`📊 Total episodes: ${episodes.length}`);
  } catch (error) {
    console.error("❌ Error seeding episodes:", error);
  }
};

const runSeed = async () => {
  await connectDB();
  await seedEpisodes();
  console.log("🎉 Seeding completed!");
  process.exit(0);
};

// Run if called directly
if (require.main === module) {
  runSeed();
}

module.exports = { seedEpisodes, connectDB };
