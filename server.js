const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint to get portfolio data
app.get('/api/portfolio', (req, res) => {
    const portfolioData = {
        name: "Nishant Baul",
        title: "Student Developer",
        about: "Hello! I'm a passionate student pursuing computer science. I love creating innovative solutions and learning new technologies. Currently, I'm focused on web development and software engineering. I'm always eager to take on new challenges and collaborate on exciting projects.",
        skills: ["HTML/CSS", "JavaScript", "Python", "Java", "C", "React", "Node.js", "Express", "Bootstrap", "Tailwind", "Git", "VS Code", "Figma", "Docker"],
        projects: [
            {
                title: "Project 1",
                description: "Description of your first project. What technologies did you use? What was the outcome?",
                link: "#"
            },
            {
                title: "Project 2",
                description: "Description of your second project. Highlight the key features and your role in it.",
                link: "#"
            },
            {
                title: "Project 3",
                description: "Description of your third project. What challenges did you overcome?",
                link: "#"
            }
        ],
        contact: {
            email: "nishantbaul@gmail.com",
            phone: "9890533947",
            linkedin: "",
            github: "https://github.com/nishantbaul"
        }
    };
    res.json(portfolioData);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
