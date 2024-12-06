// src/data/quizzes.ts

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface ChapterQuiz {
  title: string;
  description: string;
  questions: Question[];
}

interface ChapterQuizzes {
  [key: string]: ChapterQuiz;
}

export const chapterQuizzes: ChapterQuizzes = {
  circulation: {
    title: "Ocean Circulation Systems",
    description: "Test your knowledge about ocean circulation systems and their impact on marine life",
    questions: [
      {
        id: "circ_1",
        text: "What drives the global ocean conveyor belt?",
        options: [
          "Wind patterns only",
          "Temperature and salinity differences",
          "Earth's rotation",
          "Tidal forces"
        ],
        correctAnswer: 1,
        explanation: "The global ocean conveyor belt is primarily driven by differences in temperature and salinity, a process known as thermohaline circulation."
      },
      {
        id: "circ_2",
        text: "Which of these is a major surface current in the Atlantic Ocean?",
        options: [
          "Kuroshio Current",
          "California Current",
          "Gulf Stream",
          "Humboldt Current"
        ],
        correctAnswer: 2,
        explanation: "The Gulf Stream is a powerful surface current in the Atlantic Ocean that carries warm water from the Gulf of Mexico to Europe."
      },
      {
        id: "circ_3",
        text: "How do ocean currents affect marine ecosystems?",
        options: [
          "They have no effect on marine life",
          "They only affect surface organisms",
          "They transport nutrients and regulate temperature",
          "They only impact coastal regions"
        ],
        correctAnswer: 2,
        explanation: "Ocean currents play a crucial role in transporting nutrients and regulating temperature, which directly impacts marine ecosystems at all depths."
      }
    ]
  },
  ecosystem: {
    title: "Marine Ecosystems",
    description: "Explore the interconnections between ocean systems and marine life",
    questions: [
      {
        id: "eco_1",
        text: "What role do phytoplankton play in ocean ecosystems?",
        options: [
          "They only serve as food for larger organisms",
          "They produce oxygen and form the base of marine food webs",
          "They only affect surface water temperature",
          "They have no significant impact"
        ],
        correctAnswer: 1,
        explanation: "Phytoplankton are crucial as they produce oxygen through photosynthesis and form the foundation of marine food webs."
      },
      {
        id: "eco_2",
        text: "How do coral reefs benefit ocean ecosystems?",
        options: [
          "They only provide aesthetic value",
          "They only protect coastlines",
          "They provide habitat and support biodiversity",
          "They only affect water chemistry"
        ],
        correctAnswer: 2,
        explanation: "Coral reefs are vital as they provide habitat for numerous species, support biodiversity, protect coastlines, and maintain ocean chemistry."
      }
    ]
  },
  climate: {
    title: "Ocean and Climate",
    description: "Understand how oceans influence and respond to climate change",
    questions: [
      {
        id: "clim_1",
        text: "How do oceans help regulate Earth's climate?",
        options: [
          "By absorbing heat and CO2",
          "Through wave action only",
          "By reflecting sunlight",
          "They don't affect climate"
        ],
        correctAnswer: 0,
        explanation: "Oceans play a crucial role in climate regulation by absorbing and storing heat and carbon dioxide from the atmosphere."
      },
      {
        id: "clim_2",
        text: "What is ocean acidification?",
        options: [
          "Natural pH fluctuation",
          "Decrease in ocean temperature",
          "Increase in ocean pH",
          "Decrease in ocean pH from absorbed CO2"
        ],
        correctAnswer: 3,
        explanation: "Ocean acidification occurs when the ocean absorbs CO2 from the atmosphere, leading to a decrease in pH levels."
      }
    ]
  }
};

// Helper function to get quiz by chapter id
export const getQuizByChapter = (chapterId: string): ChapterQuiz | undefined => {
  return chapterQuizzes[chapterId];
};

// Helper function to calculate maximum possible score for a quiz
export const calculateMaxScore = (quiz: ChapterQuiz): number => {
  return quiz.questions.reduce((total, question) => total + 1, 0);
};

// Helper function to get all available chapters
export const getAvailableChapters = (): string[] => {
  return Object.keys(chapterQuizzes);
};