class IDZDigitalInterviewData {
    constructor() {
        this.interviews = [
            {
                id: 1,
                date: "Aug 2025",
                location: "Thāne",
                rounds: 4,
                experience: "Negative",
                difficulty: "Average",
                process: "1 day",
                rounds: [
                    {
                        name: "Round 1",
                        type: "Aptitude & Coding",
                        details: "Basic logical, math and 4 coding questions (count num, reverse digit, reverse string, prime number)"
                    },
                    {
                        name: "Round 2", 
                        type: "Game Based",
                        details: "Game based round, must complete 5 levels of each game"
                    },
                    {
                        name: "Round 3",
                        type: "Technical Interview",
                        details: "Logical based questions, few math questions (classical mug problem, extension of mug problem)"
                    },
                    {
                        name: "Round 4",
                        type: "One-on-one with CEO",
                        details: "Logical question & verbal answering, focus on problem-solving approach"
                    }
                ],
                questions: ["Classical jug problem", "factorial recursive code"],
                outcome: "Rejected",
                salary: null,
                notes: "Interviewer was rude, not interested, didn't share name or role"
            },
            {
                id: 2,
                date: "Dec 2024",
                location: "Thāne", 
                rounds: 4,
                experience: "Positive",
                difficulty: "Easy",
                process: "2 days",
                rounds: [
                    {
                        name: "Round 1a",
                        type: "Aptitude & Coding",
                        details: "Google form with basic math questions"
                    },
                    {
                        name: "Round 1b",
                        type: "Puzzles",
                        details: "Puzzles on PC"
                    },
                    {
                        name: "Round 2",
                        type: "Technical Interview",
                        details: "Focus on logical reasoning"
                    },
                    {
                        name: "Round 3",
                        type: "HR Interview",
                        details: "HR round"
                    },
                    {
                        name: "Round 4",
                        type: "Director Round",
                        details: "Director round on different day"
                    }
                ],
                questions: ["Logical reasoning questions", "Water jug problem", "Speed of car", "Logic for basic games"],
                outcome: "Not specified",
                salary: null,
                notes: "Coding questions such as water jug problem, speed of car, logic for basic games"
            },
            {
                id: 3,
                date: "Oct 2024",
                location: "Thāne",
                rounds: 3,
                experience: "Positive", 
                difficulty: "Easy",
                process: "3 days",
                rounds: [
                    {
                        name: "Round 1",
                        type: "Aptitude & Coding",
                        details: "Aptitude and 3 coding questions. Star patterns and simple questions. Simple OOPs and logical memory test."
                    }
                ],
                questions: ["Star patterns", "Simple OOPs questions", "Logical memory test"],
                outcome: "No offer",
                salary: null,
                notes: "Simple OOPs and must prepare for logical memory test"
            },
            {
                id: 4,
                date: "Jun 2024",
                location: "Mumbai",
                rounds: 2,
                experience: "Positive",
                difficulty: "Average", 
                process: "1 day",
                rounds: [
                    {
                        name: "Round 1",
                        type: "Aptitude & Coding",
                        details: "2 coding questions and 7-10 aptitude questions"
                    },
                    {
                        name: "Round 2",
                        type: "Technical Coding Interview",
                        details: "Write code for factorial, find second largest digit in array"
                    }
                ],
                questions: ["Find 2nd largest number in array", "Factorial"],
                outcome: "No offer",
                salary: null,
                notes: null
            },
            {
                id: 5,
                date: "Feb 2024",
                location: "Thāne",
                rounds: 2,
                experience: "Negative",
                difficulty: "Average",
                process: "5 days",
                rounds: [
                    {
                        name: "Round 1",
                        type: "Aptitude Test",
                        details: "Around 20 questions and 3 coding questions"
                    },
                    {
                        name: "Round 2", 
                        type: "Technical Interview",
                        details: "Questions based on Java, OOPs, logical reasoning and few puzzles"
                    }
                ],
                questions: ["Types of access modifier", "OOPs concepts"],
                outcome: "No offer",
                salary: null,
                notes: "Very poor hospitality and arrangement, noise during exam, waiting time too long"
            },
            {
                id: 6,
                date: "Feb 2024",
                location: "Thāne",
                rounds: 3,
                experience: "Not specified",
                difficulty: "Easy",
                process: "1 day",
                rounds: [
                    {
                        name: "Round 1",
                        type: "Aptitude & Coding",
                        details: "Aptitude questions based on trains speed, easy maths. Coding questions about reverse a three digit number"
                    }
                ],
                questions: ["Reverse a three digit number", "Train speed problems"],
                outcome: "Not selected",
                salary: null,
                notes: null
            },
            {
                id: 7,
                date: "Feb 2024",
                location: "Not specified",
                rounds: 3,
                experience: "Negative",
                difficulty: "Not specified",
                process: "Not specified",
                rounds: [
                    {
                        name: "Round 1",
                        type: "Coding",
                        details: "3 coding questions - fibonacci, second largest elements, sum of digit"
                    },
                    {
                        name: "Round 1",
                        type: "Aptitude", 
                        details: "20 easy aptitude questions"
                    },
                    {
                        name: "Round 2",
                        type: "Technical",
                        details: "Logical simple questions, basic OOPs"
                    },
                    {
                        name: "Round 3",
                        type: "HR",
                        details: "Offered 8k for internship, 1.80 LPA after"
                    }
                ],
                questions: ["Fibonacci", "Second largest elements", "Sum of digits", "What is class object"],
                outcome: "Declined offer",
                salary: "1.80 LPA",
                notes: "Low salary offer"
            },
            {
                id: 8,
                date: "Jul 2023",
                location: "Thāne",
                rounds: 3,
                experience: "Positive",
                difficulty: "Not specified",
                process: "1 day",
                rounds: [
                    {
                        name: "Round 1",
                        type: "Aptitude & Programming",
                        details: "Assess problem-solving and coding skills"
                    },
                    {
                        name: "Round 2",
                        type: "Technical",
                        details: "Domain expertise"
                    },
                    {
                        name: "Round 3",
                        type: "HR",
                        details: "Communication, teamwork, cultural fit"
                    }
                ],
                questions: ["Programs on array", "Pattern programs", "Palindrome"],
                outcome: "Not specified",
                salary: null,
                notes: "3 rounds - apti, technical and HR"
            },
            {
                id: 9,
                date: "Jun 2023",
                location: "Thāne",
                rounds: 3,
                experience: "Negative",
                difficulty: "High",
                process: "1 day",
                rounds: [
                    {
                        name: "Round 1",
                        type: "Coding & Aptitude",
                        details: "Coding and aptitude round"
                    },
                    {
                        name: "Round 2",
                        type: "Technical",
                        details: "Asked to solve 6-7 coding problems"
                    },
                    {
                        name: "Round 3",
                        type: "HR",
                        details: "HR round"
                    }
                ],
                questions: ["Finding a sub-string in main string", "6-7 coding problems"],
                outcome: "No offer",
                salary: null,
                notes: "Only offline interviews, difficulty very high compared to salary for fresher level"
            }
        ];
    }

    getAllInterviews() {
        return this.interviews;
    }

    getInterviewById(id) {
        return this.interviews.find(interview => interview.id === id);
    }

    getInterviewsByLocation(location) {
        return this.interviews.filter(interview => 
            interview.location.toLowerCase().includes(location.toLowerCase())
        );
    }

    getInterviewsByExperience(experience) {
        return this.interviews.filter(interview => 
            interview.experience.toLowerCase().includes(experience.toLowerCase())
        );
    }

    getCommonQuestions() {
        const questionMap = new Map();
        
        this.interviews.forEach(interview => {
            interview.questions.forEach(question => {
                const count = questionMap.get(question) || 0;
                questionMap.set(question, count + 1);
            });
        });

        return Array.from(questionMap.entries())
            .sort((a, b) => b[1] - a[1])
            .map(([question, count]) => ({ question, count }));
    }

    getStatistics() {
        const total = this.interviews.length;
        const experiences = {};
        const difficulties = {};
        const locations = {};
        
        this.interviews.forEach(interview => {
            experiences[interview.experience] = (experiences[interview.experience] || 0) + 1;
            difficulties[interview.difficulty] = (difficulties[interview.difficulty] || 0) + 1;
            locations[interview.location] = (locations[interview.location] || 0) + 1;
        });

        return {
            total,
            experiences,
            difficulties,
            locations
        };
    }
}