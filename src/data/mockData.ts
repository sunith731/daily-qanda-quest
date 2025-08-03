// Mock data for the Q&A application

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface User {
  id: string;
  name: string;
  email: string;
  stats: {
    totalQuestions: number;
    correctAnswers: number;
    streak: number;
    averageScore: number;
  };
}

export interface QuizAttempt {
  id: string;
  date: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  category: string;
  difficulty: string;
  percentage: number;
}

export const mockQuestions: Question[] = [
  {
    id: 1,
    question: "Which country hosted the 2024 Summer Olympics?",
    options: ["Japan", "France", "United Kingdom", "Australia"],
    correctAnswer: 1,
    explanation: "France hosted the 2024 Summer Olympics in Paris from July 26 to August 11, 2024.",
    category: "Sports",
    difficulty: "easy"
  },
  {
    id: 2,
    question: "What is the current Secretary-General of the United Nations?",
    options: ["Ban Ki-moon", "António Guterres", "Kofi Annan", "Boutros Boutros-Ghali"],
    correctAnswer: 1,
    explanation: "António Guterres has been serving as the UN Secretary-General since January 1, 2017, and was re-elected for a second term.",
    category: "Politics",
    difficulty: "medium"
  },
  {
    id: 3,
    question: "Which company became the first to reach a $3 trillion market capitalization in 2024?",
    options: ["Microsoft", "Apple", "Amazon", "Google"],
    correctAnswer: 1,
    explanation: "Apple became the first company to reach a $3 trillion market cap in January 2024, highlighting its continued dominance in the tech sector.",
    category: "Business",
    difficulty: "hard"
  },
  {
    id: 4,
    question: "What is the name of the AI chatbot developed by OpenAI that gained widespread attention in 2024?",
    options: ["Bard", "Claude", "ChatGPT", "Copilot"],
    correctAnswer: 2,
    explanation: "ChatGPT, developed by OpenAI, continued to evolve and gain widespread adoption throughout 2024, revolutionizing how people interact with AI.",
    category: "Technology",
    difficulty: "easy"
  },
  {
    id: 5,
    question: "Which country experienced significant political changes with the election of Javier Milei as president in 2023?",
    options: ["Brazil", "Argentina", "Chile", "Uruguay"],
    correctAnswer: 1,
    explanation: "Argentina elected Javier Milei as president in 2023, marking a significant shift toward libertarian economic policies.",
    category: "Politics",
    difficulty: "medium"
  },
  {
    id: 6,
    question: "What major climate agreement was renewed at COP28 in Dubai?",
    options: ["Kyoto Protocol", "Paris Agreement", "Montreal Protocol", "Copenhagen Accord"],
    correctAnswer: 1,
    explanation: "COP28 in Dubai saw countries reaffirm and strengthen commitments under the Paris Agreement, with new pledges for climate action.",
    category: "Environment",
    difficulty: "hard"
  },
  {
    id: 7,
    question: "Which space mission successfully landed on the Moon's south pole in 2023?",
    options: ["Artemis 1", "Chang'e 5", "Chandrayaan-3", "Luna 25"],
    correctAnswer: 2,
    explanation: "India's Chandrayaan-3 mission successfully landed on the Moon's south pole in August 2023, making India the fourth country to land on the Moon.",
    category: "Science",
    difficulty: "medium"
  },
  {
    id: 8,
    question: "What is the name of the new variant of COVID-19 that emerged in late 2023?",
    options: ["Omicron", "Delta Plus", "Pirola", "Centaurus"],
    correctAnswer: 2,
    explanation: "The Pirola variant (BA.2.86) emerged in late 2023, prompting renewed attention from health authorities worldwide.",
    category: "Health",
    difficulty: "hard"
  },
  {
    id: 9,
    question: "Which social media platform was acquired by Elon Musk and rebranded as 'X'?",
    options: ["Instagram", "TikTok", "Twitter", "LinkedIn"],
    correctAnswer: 2,
    explanation: "Elon Musk acquired Twitter in 2022 and gradually rebranded it to 'X' throughout 2023, changing its iconic bird logo and domain.",
    category: "Technology",
    difficulty: "easy"
  },
  {
    id: 10,
    question: "Which country won the ICC Cricket World Cup 2023?",
    options: ["India", "Australia", "England", "New Zealand"],
    correctAnswer: 1,
    explanation: "Australia won the ICC Cricket World Cup 2023, defeating India in the final match held in Ahmedabad, India.",
    category: "Sports",
    difficulty: "medium"
  }
];

export const mockUser: User = {
  id: "user1",
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  stats: {
    totalQuestions: 87,
    correctAnswers: 65,
    streak: 7,
    averageScore: 74.7
  }
};

export const mockQuizHistory: QuizAttempt[] = [
  {
    id: "attempt1",
    date: "2024-01-15T10:30:00Z",
    score: 8,
    totalQuestions: 10,
    timeSpent: 720,
    category: "Current Affairs",
    difficulty: "mixed",
    percentage: 80
  },
  {
    id: "attempt2",
    date: "2024-01-14T09:15:00Z",
    score: 7,
    totalQuestions: 10,
    timeSpent: 645,
    category: "Current Affairs",
    difficulty: "mixed",
    percentage: 70
  },
  {
    id: "attempt3",
    date: "2024-01-13T11:45:00Z",
    score: 9,
    totalQuestions: 10,
    timeSpent: 580,
    category: "Current Affairs",
    difficulty: "mixed",
    percentage: 90
  },
  {
    id: "attempt4",
    date: "2024-01-12T14:20:00Z",
    score: 6,
    totalQuestions: 10,
    timeSpent: 750,
    category: "Current Affairs",
    difficulty: "mixed",
    percentage: 60
  },
  {
    id: "attempt5",
    date: "2024-01-11T16:10:00Z",
    score: 8,
    totalQuestions: 10,
    timeSpent: 690,
    category: "Current Affairs",
    difficulty: "mixed",
    percentage: 80
  }
];