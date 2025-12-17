class InterviewReviewSystem {
    constructor() {
        this.reviews = this.loadReviews();
        this.form = document.getElementById('reviewForm');
        this.reviewsContainer = document.getElementById('reviewsContainer');
        this.searchInput = document.getElementById('searchInput');
        this.sortSelect = document.getElementById('sortSelect');
        this.filterSelect = document.getElementById('filterSelect');
        this.pagination = document.getElementById('pagination');
        
        this.currentPage = 1;
        this.reviewsPerPage = 5;
        this.filteredReviews = [...this.reviews];
        
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.searchInput.addEventListener('input', () => this.handleSearch());
        this.sortSelect.addEventListener('change', () => this.handleSort());
        this.filterSelect.addEventListener('change', () => this.handleFilter());
        
        this.initStarRating();
        this.initCharCounter();
        this.loadIDZData();
        this.updateStatistics();
        this.displayReviews();
    }
    
    loadReviews() {
        const stored = localStorage.getItem('interviewReviews');
        return stored ? JSON.parse(stored) : [];
    }
    
    saveReviews() {
        localStorage.setItem('interviewReviews', JSON.stringify(this.reviews));
    }
    
    loadIDZData() {
        if (this.reviews.length === 0) {
            const idzInterviews = [
                {
                    id: Date.now() - 100000,
                    username: "Anonymous Candidate",
                    rating: 2,
                    rounds: "4",
                    experience: "negative",
                    comment: "Very third class. Tech employees who take interviews don't even know actual logical questions and only they know is their answers. Instead of focusing on technical abilities they waste their time asking Logical questions which they don't even know about. Programming questions on array and oops",
                    timestamp: new Date(Date.now() - 864000000).toISOString()
                },
                {
                    id: Date.now() - 90000,
                    username: "Thane Candidate",
                    rating: 3,
                    rounds: "3",
                    experience: "neutral",
                    comment: "First Round was an aptitude and coding round like 2 coding questions and 7-10 aptitude, Second was Technical coding interview, asked questions to write code like to find second largest digit in array, factorial. Average difficulty interview.",
                    timestamp: new Date(Date.now() - 777600000).toISOString()
                },
                {
                    id: Date.now() - 80000,
                    username: "Referral Candidate",
                    rating: 3,
                    rounds: "4",
                    experience: "neutral",
                    comment: "There are total 4 rounds of interview 1] a) Aptitude, coding ( Google form) b)Puzzles on PC 2] Technical Interview 3] HR interview 4] Director round (on a different day). In aptitude, just basic math question are asked. In coding section, we've to write code for 3 questions (easy- fibbonaci, prime number, reverse of a 3 digit number)",
                    timestamp: new Date(Date.now() - 691200000).toISOString()
                },
                {
                    id: Date.now() - 70000,
                    username: "Oct 2024 Candidate",
                    rating: 2,
                    rounds: "3",
                    experience: "negative",
                    comment: "3-4round 1 round.apptitude and 3coding .in coding star patten and simple question . Simple oops and must prepare for logical memorial test. The process took 3 days. Difficult interview.",
                    timestamp: new Date(Date.now() - 604800000).toISOString()
                },
                {
                    id: Date.now() - 60000,
                    username: "Mumbai Candidate",
                    rating: 3,
                    rounds: "2",
                    experience: "neutral",
                    comment: "First round: 3coding fibbonaci, second largest elements, sum of digit, 20 easy Apptitute Second round: technical round, logic al simple question, basic opps Hr round: offered 8k for interdhip after that 1.80 LPA. Easy interview.",
                    timestamp: new Date(Date.now() - 518400000).toISOString()
                },
                {
                    id: Date.now() - 50000,
                    username: "Feb 2024 Candidate",
                    rating: 1,
                    rounds: "2",
                    experience: "negative",
                    comment: "First round was aptitude questions round. Very poor hospitality and arrangement. There was noise all around while giving the exam. Second round was interview which took more than 3 hrs to conduct. They make you wait unnecessarily. Waiting time is too much.",
                    timestamp: new Date(Date.now() - 432000000).toISOString()
                },
                {
                    id: Date.now() - 40000,
                    username: "Jul 2023 Candidate",
                    rating: 2,
                    rounds: "3",
                    experience: "negative",
                    comment: "Only offline interviews. 3 rounds. 1. coding and Aptitude Round. 2. Technical round. 3. HR round. Asked to solve 6 to 7 coding problems in technical round itself. For a fresher level the difficulty is very high compared to the salary.",
                    timestamp: new Date(Date.now() - 345600000).toISOString()
                },
                {
                    id: Date.now() - 30000,
                    username: "Recent Candidate",
                    rating: 1,
                    rounds: "3",
                    experience: "negative",
                    comment: "Round 1 :- basic logical, math and 4 coding questions(count num, reverse digit, reverse string,prime number). Round 2 :- It was game based round we have to play on game and must complete 5 level of each game. Round 3 :- the interview was very rude, and also after solving all the correct questions in both first two round, the interviewer seems not interested.",
                    timestamp: new Date(Date.now() - 259200000).toISOString()
                }
            ];
            
            this.reviews = idzInterviews;
            this.filteredReviews = [...this.reviews];
            this.saveReviews();
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        try {
            const formData = new FormData(this.form);
            const username = formData.get('username').trim();
            const rounds = formData.get('rounds');
            const experience = formData.get('experience');
            const comment = formData.get('comment').trim();
            const rating = parseInt(formData.get('rating'));
            
            if (!username || !rounds || !experience || !comment || !rating || rating < 1 || rating > 5) {
                throw new Error('Invalid form data');
            }
            
            const review = {
                id: Date.now(),
                username,
                rounds,
                experience,
                rating,
                comment,
                timestamp: new Date().toISOString()
            };
            
            this.addReview(review);
            this.form.reset();
            document.getElementById('ratingText').textContent = 'Please select a rating';
            document.getElementById('charCount').textContent = '0';
            this.updateStarDisplay(0);
            
            this.showNotification('Interview experience submitted successfully!', 'success');
        } catch (error) {
            this.showNotification('Error submitting experience. Please try again.', 'error');
            console.error('Submit error:', error);
        }
    }
    
    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            background: ${type === 'success' ? '#28a745' : '#dc3545'};
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    addReview(review) {
        this.reviews.unshift(review);
        this.saveReviews();
        this.updateStatistics();
        this.handleSearch();
    }
    
    deleteReview(id) {
        this.reviews = this.reviews.filter(review => review.id !== id);
        this.saveReviews();
        this.updateStatistics();
        this.handleSearch();
    }
    
    formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    getRatingStars(rating) {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push('⭐');
            } else {
                stars.push('☆');
            }
        }
        return stars.join('');
    }
    
    getExperienceBadge(experience) {
        const colors = {
            'positive': '#28a745',
            'negative': '#dc3545',
            'neutral': '#ffc107'
        };
        const labels = {
            'positive': 'Positive',
            'negative': 'Negative', 
            'neutral': 'Neutral'
        };
        return `<span style="background: ${colors[experience]}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8em;">${labels[experience]}</span>`;
    }
    
    createReviewElement(review) {
        const reviewDiv = document.createElement('div');
        reviewDiv.className = 'review-item';
        reviewDiv.innerHTML = `
            <div class="review-header">
                <span class="review-username">${this.escapeHtml(review.username)}</span>
                <span class="review-rating">${review.rating}/5</span>
            </div>
            <div class="review-meta">
                ${this.getExperienceBadge(review.experience)}
                <span style="margin-left: 10px; color: #666;">📋 ${review.rounds} Round${review.rounds > 1 ? 's' : ''}</span>
            </div>
            <div class="review-time">${this.formatTimestamp(review.timestamp)}</div>
            <div class="review-comment">${this.escapeHtml(review.comment)}</div>
            <div style="margin-top: 10px; font-size: 1.2em;">
                ${this.getRatingStars(review.rating)}
            </div>
            <div class="review-actions">
                <button class="edit-btn" onclick="interviewReviewSystem.editReview(${review.id})">Edit</button>
                <button class="delete-btn" onclick="interviewReviewSystem.confirmDelete(${review.id})">Delete</button>
            </div>
        `;
        return reviewDiv;
    }
    
    editReview(id) {
        const review = this.reviews.find(r => r.id === id);
        if (!review) return;
        
        const newComment = prompt('Edit your review:', review.comment);
        if (newComment !== null && newComment.trim() !== '') {
            review.comment = newComment.trim();
            review.timestamp = new Date().toISOString();
            this.saveReviews();
            this.updateStatistics();
            this.handleSearch();
        }
    }
    
    confirmDelete(id) {
        if (confirm('Are you sure you want to delete this review?')) {
            this.deleteReview(id);
        }
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    updateStatistics() {
        const totalReviews = this.reviews.length;
        const averageRating = totalReviews > 0 
            ? (this.reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1)
            : '0.0';
        
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const recentReviews = this.reviews.filter(review => 
            new Date(review.timestamp) > oneWeekAgo
        ).length;
        
        document.getElementById('totalReviews').textContent = totalReviews;
        document.getElementById('averageRating').textContent = averageRating;
        document.getElementById('recentReviews').textContent = recentReviews;
        
        this.updateRatingBreakdown();
    }
    
    updateRatingBreakdown() {
        const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        this.reviews.forEach(review => {
            ratingCounts[review.rating]++;
        });
        
        const breakdownHTML = Object.entries(ratingCounts)
            .reverse()
            .map(([rating, count]) => {
                const percentage = this.reviews.length > 0 
                    ? (count / this.reviews.length * 100).toFixed(1)
                    : 0;
                
                return `
                    <div class="rating-bar">
                        <div class="rating-bar-label">${rating} ⭐</div>
                        <div class="rating-bar-track">
                            <div class="rating-bar-fill" style="width: ${percentage}%"></div>
                        </div>
                        <div class="rating-bar-count">${count}</div>
                    </div>
                `;
            }).join('');
        
        document.getElementById('ratingBreakdown').innerHTML = breakdownHTML;
    }
    
    handleSearch() {
        const searchTerm = this.searchInput.value.toLowerCase();
        this.filteredReviews = this.reviews.filter(review =>
            review.username.toLowerCase().includes(searchTerm) ||
            review.comment.toLowerCase().includes(searchTerm) ||
            review.experience.toLowerCase().includes(searchTerm) ||
            review.rounds.includes(searchTerm)
        );
        this.currentPage = 1;
        this.displayReviews();
    }
    
    handleSort() {
        const sortValue = this.sortSelect.value;
        
        switch(sortValue) {
            case 'newest':
                this.filteredReviews.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                break;
            case 'oldest':
                this.filteredReviews.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
                break;
            case 'highest':
                this.filteredReviews.sort((a, b) => b.rating - a.rating);
                break;
            case 'lowest':
                this.filteredReviews.sort((a, b) => a.rating - b.rating);
                break;
        }
        
        this.currentPage = 1;
        this.displayReviews();
    }
    
    handleFilter() {
        const filterValue = this.filterSelect.value;
        
        if (filterValue === 'all') {
            this.filteredReviews = [...this.reviews];
        } else {
            this.filteredReviews = this.reviews.filter(review => 
                review.rating === parseInt(filterValue)
            );
        }
        
        this.currentPage = 1;
        this.displayReviews();
    }
    
    displayReviews() {
        if (this.filteredReviews.length === 0) {
            this.reviewsContainer.innerHTML = '<div class="no-reviews">No reviews found.</div>';
            this.pagination.innerHTML = '';
            return;
        }
        
        const startIndex = (this.currentPage - 1) * this.reviewsPerPage;
        const endIndex = startIndex + this.reviewsPerPage;
        const paginatedReviews = this.filteredReviews.slice(startIndex, endIndex);
        
        this.reviewsContainer.innerHTML = '';
        paginatedReviews.forEach(review => {
            this.reviewsContainer.appendChild(this.createReviewElement(review));
        });
        
        this.displayPagination();
    }
    
    displayPagination() {
        const totalPages = Math.ceil(this.filteredReviews.length / this.reviewsPerPage);
        
        if (totalPages <= 1) {
            this.pagination.innerHTML = '';
            return;
        }
        
        let paginationHTML = '';
        
        if (this.currentPage > 1) {
            paginationHTML += `<button onclick="interviewReviewSystem.goToPage(${this.currentPage - 1})">Previous</button>`;
        }
        
        for (let i = 1; i <= totalPages; i++) {
            const activeClass = i === this.currentPage ? 'active' : '';
            paginationHTML += `<button class="${activeClass}" onclick="interviewReviewSystem.goToPage(${i})">${i}</button>`;
        }
        
        if (this.currentPage < totalPages) {
            paginationHTML += `<button onclick="interviewReviewSystem.goToPage(${this.currentPage + 1})">Next</button>`;
        }
        
        this.pagination.innerHTML = paginationHTML;
    }
    
    goToPage(page) {
        this.currentPage = page;
        this.displayReviews();
    }
    
    initStarRating() {
        const stars = document.querySelectorAll('.star');
        const ratingInput = document.getElementById('rating');
        const ratingText = document.getElementById('ratingText');
        
        const ratingTexts = {
            1: 'Poor',
            2: 'Fair', 
            3: 'Good',
            4: 'Very Good',
            5: 'Excellent'
        };
        
        stars.forEach(star => {
            star.addEventListener('click', () => {
                const rating = parseInt(star.dataset.rating);
                ratingInput.value = rating;
                ratingText.textContent = ratingTexts[rating];
                this.updateStarDisplay(rating);
            });
            
            star.addEventListener('mouseenter', () => {
                const rating = parseInt(star.dataset.rating);
                this.updateStarDisplay(rating);
            });
        });
        
        document.getElementById('starRating').addEventListener('mouseleave', () => {
            const currentRating = parseInt(ratingInput.value) || 0;
            this.updateStarDisplay(currentRating);
        });
    }
    
    updateStarDisplay(rating) {
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.style.opacity = '1';
                star.style.transform = 'scale(1.1)';
            } else {
                star.style.opacity = '0.3';
                star.style.transform = 'scale(1)';
            }
        });
    }
    
    initCharCounter() {
        const commentTextarea = document.getElementById('comment');
        const charCount = document.getElementById('charCount');
        
        commentTextarea.addEventListener('input', () => {
            const currentLength = commentTextarea.value.length;
            charCount.textContent = currentLength;
            
            if (currentLength > 450) {
                charCount.style.color = '#dc3545';
            } else if (currentLength > 400) {
                charCount.style.color = '#ffc107';
            } else {
                charCount.style.color = '#666';
            }
        });
    }
}

let interviewReviewSystem;

document.addEventListener('DOMContentLoaded', () => {
    interviewReviewSystem = new InterviewReviewSystem();
});