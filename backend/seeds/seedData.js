import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Analytics from '../models/Analytics.js';

export const seedDatabase = async () => {
  try {
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany([
        {
          title: "Agentic RAG – Career Path Advisor",
          description: "Developed an Agentic Retrieval-Augmented Generation system for personalized career recommendations, implementing multi-step reasoning with tool-based interactions.",
          longDescription: "An end-to-end intelligent career advising platform leveraging state-of-the-art Agentic RAG architecture. Features autonomous multi-step reasoning, dynamic tool selection for resume parsing and job trend analysis, and personalized career roadmapping.",
          architecture: "Python (LangChain / LlamaIndex), FastAPI, Vector DB (MongoDB Atlas Vector Search), OpenAI / Llama 3.",
          tags: ["Python", "RAG", "LLMs", "Agentic AI", "FastAPI"],
          demoUrl: "https://github.com/SatyamAnilkumarMishra",
          codeUrl: "https://github.com/SatyamAnilkumarMishra"
        },
        {
          title: "Image Similarity Search",
          description: "Built an image similarity system using ResNet-50 and cosine similarity, with the backend integrated into a React frontend for real-time search results.",
          longDescription: "Deep learning-backed visually similar image search engine. Extracts 2048-dimensional feature vectors using pre-trained ResNet-50 and evaluates vector similarity in high-dimensional space.",
          architecture: "Python, PyTorch (ResNet-50), Flask REST API, React.js frontend.",
          tags: ["Python", "Flask", "React", "ResNet-50", "PyTorch"],
          demoUrl: "https://github.com/SatyamAnilkumarMishra",
          codeUrl: "https://github.com/SatyamAnilkumarMishra"
        },
        {
          title: "Fitness & Wellness Tracker App",
          description: "Contributed to and expanded a full-stack fitness application to demonstrate React component architecture, state management, and API integration.",
          longDescription: "A comprehensive workout and wellness tracking web app featuring exercise library exploration, custom workout logging, and progress visualization.",
          architecture: "React.js, Node.js, Express, RapidAPI ExerciseDB, Tailwind CSS.",
          tags: ["ReactJS", "Express.js", "Node.js", "REST APIs"],
          demoUrl: "https://github.com/SatyamAnilkumarMishra",
          codeUrl: "https://github.com/SatyamAnilkumarMishra"
        }
      ]);
      console.log('[Seeder] Projects seeded successfully.');
    }

    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      await Skill.insertMany([
        {
          categoryName: "Languages & Core",
          items: [
            { name: "Python", level: 90 },
            { name: "Java", level: 80 },
            { name: "C++", level: 75 },
            { name: "Data Structures & Algorithms", level: 85 }
          ]
        },
        {
          categoryName: "Frontend & Backend",
          items: [
            { name: "React / JavaScript / Node.js", level: 85 },
            { name: "Express.js / REST APIs", level: 85 },
            { name: "FastAPI / Flask", level: 82 },
            { name: "Tailwind CSS & CSS Grid/Flex", level: 80 }
          ]
        },
        {
          categoryName: "AI/ML & Databases",
          items: [
            { name: "MongoDB & Vector Search", level: 88 },
            { name: "MySQL / SQL Queries", level: 82 },
            { name: "NumPy / Pandas / Matplotlib", level: 85 },
            { name: "TensorFlow & PyTorch", level: 75 }
          ]
        }
      ]);
      console.log('[Seeder] Skills seeded successfully.');
    }

    const viewsExist = await Analytics.findOne({ metricName: 'site_views' });
    if (!viewsExist) {
      await Analytics.create({ metricName: 'site_views', value: 142 });
      console.log('[Seeder] Visitor analytics initialized.');
    }
  } catch (err) {
    console.error('[Seeder] Error seeding database:', err.message);
  }
};
