class IDZDigitalAnalysis {
    constructor() {
        this.data = new IDZDigitalInterviewData();
        this.allInterviews = this.data.getAllInterviews();
        this.filteredInterviews = [...this.allInterviews];
        this.init();
    }

    init() {
        this.updateStatistics();
        this.populateFilters();
        this.displayInterviews();
        this.displayCommonQuestions();
        this.displayDetailedStatistics();
    }

    updateStatistics() {
        const total = this.allInterviews.length;
        const avgRounds = (this.allInterviews.reduce((sum, interview) => sum + interview.rounds, 0) / total).toFixed(1);
        const positiveExp = this.allInterviews.filter(i => i.experience === "Positive").length;
        const positivePercentage = ((positiveExp / total) * 100).toFixed(0);
        
        const locations = {};
        this.allInterviews.forEach(interview => {
            locations[interview.location] = (locations[interview.location] || 0) + 1;
        });
        const commonLocation = Object.entries(locations).sort((a, b) => b[1] - a[1])[0][0];

        document.getElementById('totalInterviews').textContent = total;
        document.getElementById('avgRounds').textContent = avgRounds;
        document.getElementById('positiveExp').textContent = positivePercentage + '%';
        document.getElementById('commonLocation').textContent = commonLocation;
    }

    populateFilters() {
        const locations = [...new Set(this.allInterviews.map(i => i.location))];
        const experiences = [...new Set(this.allInterviews.map(i => i.experience))];
        const difficulties = [...new Set(this.allInterviews.map(i => i.difficulty))];

        const locationFilter = document.getElementById('locationFilter');
        const experienceFilter = document.getElementById('experienceFilter');
        const difficultyFilter = document.getElementById('difficultyFilter');

        locations.forEach(location => {
            const option = document.createElement('option');
            option.value = location;
            option.textContent = location;
            locationFilter.appendChild(option);
        });

        experiences.forEach(experience => {
            const option = document.createElement('option');
            option.value = experience;
            option.textContent = experience;
            experienceFilter.appendChild(option);
        });

        difficulties.forEach(difficulty => {
            const option = document.createElement('option');
            option.value = difficulty;
            option.textContent = difficulty;
            difficultyFilter.appendChild(option);
        });
    }

    displayInterviews() {
        const container = document.getElementById('interviewsList');
        
        if (this.filteredInterviews.length === 0) {
            container.innerHTML = '<p>No interviews found matching the selected filters.</p>';
            return;
        }

        container.innerHTML = this.filteredInterviews.map(interview => this.createInterviewCard(interview)).join('');
    }

    createInterviewCard(interview) {
        const experienceClass = interview.experience.toLowerCase() === 'positive' ? 'experience-positive' : 
                               interview.experience.toLowerCase() === 'negative' ? 'experience-negative' : 'experience-neutral';

        const roundsHTML = interview.rounds.map(round => `
            <div class="round-item">
                <div class="round-name">${round.name}</div>
                <div class="round-type">${round.type}</div>
                <div>${round.details}</div>
            </div>
        `).join('');

        const questionsHTML = interview.questions.map(question => 
            `<span class="question-tag">${question}</span>`
        ).join('');

        return `
            <div class="interview-card">
                <div class="interview-header">
                    <div>
                        <h3>Interview #${interview.id}</h3>
                        <div class="interview-meta">
                            <span class="meta-item">📅 ${interview.date}</span>
                            <span class="meta-item">📍 ${interview.location}</span>
                            <span class="meta-item">⏱️ ${interview.process}</span>
                            <span class="meta-item">🔄 ${interview.rounds} rounds</span>
                            <span class="meta-item ${experienceClass}">${interview.experience}</span>
                            <span class="meta-item">📊 ${interview.difficulty}</span>
                        </div>
                    </div>
                </div>
                
                <div class="rounds-list">
                    <h4>Interview Rounds:</h4>
                    ${roundsHTML}
                </div>

                ${questionsHTML ? `
                    <div class="questions-list">
                        <h4>Questions Asked:</h4>
                        ${questionsHTML}
                    </div>
                ` : ''}

                ${interview.salary ? `
                    <div class="salary-info">
                        <strong>Salary Offer:</strong> ${interview.salary}
                    </div>
                ` : ''}

                ${interview.notes ? `
                    <div class="notes">
                        <strong>Notes:</strong> ${interview.notes}
                    </div>
                ` : ''}

                <div style="margin-top: 10px;">
                    <strong>Outcome:</strong> ${interview.outcome}
                </div>
            </div>
        `;
    }

    displayCommonQuestions() {
        const commonQuestions = this.data.getCommonQuestions();
        const container = document.getElementById('commonQuestionsList');

        if (commonQuestions.length === 0) {
            container.innerHTML = '<p>No questions data available.</p>';
            return;
        }

        container.innerHTML = commonQuestions.map(item => `
            <div class="question-item">
                <div class="question-text">${item.question}</div>
                <div class="question-count">${item.count} times</div>
            </div>
        `).join('');
    }

    displayDetailedStatistics() {
        const stats = this.data.getStatistics();
        const container = document.getElementById('detailedStats');

        const experiencesHTML = Object.entries(stats.experiences).map(([exp, count]) => `
            <div style="margin: 10px 0;">
                <strong>${exp}:</strong> ${count} (${((count/stats.total)*100).toFixed(1)}%)
            </div>
        `).join('');

        const difficultiesHTML = Object.entries(stats.difficulties).map(([diff, count]) => `
            <div style="margin: 10px 0;">
                <strong>${diff}:</strong> ${count} (${((count/stats.total)*100).toFixed(1)}%)
            </div>
        `).join('');

        const locationsHTML = Object.entries(stats.locations).map(([loc, count]) => `
            <div style="margin: 10px 0;">
                <strong>${loc}:</strong> ${count} (${((count/stats.total)*100).toFixed(1)}%)
            </div>
        `).join('');

        container.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                <div class="stat-card">
                    <h3>Experience Breakdown</h3>
                    ${experiencesHTML}
                </div>
                <div class="stat-card">
                    <h3>Difficulty Breakdown</h3>
                    ${difficultiesHTML}
                </div>
                <div class="stat-card">
                    <h3>Location Breakdown</h3>
                    ${locationsHTML}
                </div>
            </div>
        `;
    }

    filterInterviews() {
        const locationFilter = document.getElementById('locationFilter').value;
        const experienceFilter = document.getElementById('experienceFilter').value;
        const difficultyFilter = document.getElementById('difficultyFilter').value;

        this.filteredInterviews = this.allInterviews.filter(interview => {
            return (!locationFilter || interview.location === locationFilter) &&
                   (!experienceFilter || interview.experience === experienceFilter) &&
                   (!difficultyFilter || interview.difficulty === difficultyFilter);
        });

        this.displayInterviews();
    }
}

function showTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked tab
    event.target.classList.add('active');
}

// Initialize the analysis when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new IDZDigitalAnalysis();
});