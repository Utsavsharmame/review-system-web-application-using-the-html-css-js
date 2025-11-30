class ReviewSystem {
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
        
        this.updateStatistics();
        this.displayReviews();
    }
    
    loadReviews() {
        const stored = localStorage.getItem('reviews');
        return stored ? JSON.parse(stored) : [];
    }
    
    saveReviews() {
        localStorage.setItem('reviews', JSON.stringify(this.reviews));
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        try {
            const formData = new FormData(this.form);
            const username = formData.get('username').trim();
            const comment = formData.get('comment').trim();
            const rating = parseInt(formData.get('rating'));
            
            if (!username || !comment || !rating || rating < 1 || rating > 5) {
                throw new Error('Invalid form data');
            }
            
            const review = {
                id: Date.now(),
                username,
                rating,
                comment,
                timestamp: new Date().toISOString()
            };
            
            this.addReview(review);
            this.form.reset();
            
            this.showNotification('Review submitted successfully!', 'success');
        } catch (error) {
            this.showNotification('Error submitting review. Please try again.', 'error');
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
    
    createReviewElement(review) {
        const reviewDiv = document.createElement('div');
        reviewDiv.className = 'review-item';
        reviewDiv.innerHTML = `
            <div class="review-header">
                <span class="review-username">${this.escapeHtml(review.username)}</span>
                <span class="review-rating">${review.rating}/5</span>
            </div>
            <div class="review-time">${this.formatTimestamp(review.timestamp)}</div>
            <div class="review-comment">${this.escapeHtml(review.comment)}</div>
            <div style="margin-top: 10px; font-size: 1.2em;">
                ${this.getRatingStars(review.rating)}
            </div>
            <div class="review-actions">
                <button class="edit-btn" onclick="reviewSystem.editReview(${review.id})">Edit</button>
                <button class="delete-btn" onclick="reviewSystem.confirmDelete(${review.id})">Delete</button>
            </div>
        `;
        return reviewDiv;
    }
    
    editReview(id) {
        const review = this.reviews.find(r => r.id === id);
        if (!review) return;
        
        const newComment = prompt('Edit your comment:', review.comment);
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
            review.comment.toLowerCase().includes(searchTerm)
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
            paginationHTML += `<button onclick="reviewSystem.goToPage(${this.currentPage - 1})">Previous</button>`;
        }
        
        for (let i = 1; i <= totalPages; i++) {
            const activeClass = i === this.currentPage ? 'active' : '';
            paginationHTML += `<button class="${activeClass}" onclick="reviewSystem.goToPage(${i})">${i}</button>`;
        }
        
        if (this.currentPage < totalPages) {
            paginationHTML += `<button onclick="reviewSystem.goToPage(${this.currentPage + 1})">Next</button>`;
        }
        
        this.pagination.innerHTML = paginationHTML;
    }
    
    goToPage(page) {
        this.currentPage = page;
        this.displayReviews();
    }
}

let reviewSystem;

document.addEventListener('DOMContentLoaded', () => {
    reviewSystem = new ReviewSystem();
});