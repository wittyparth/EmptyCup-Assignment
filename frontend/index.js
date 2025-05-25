
document.addEventListener('DOMContentLoaded', () => {
    const designerListingsContainer = document.getElementById('designer-listings');
    const shortlistedFilterBtn = document.getElementById('shortlisted-filter-btn');
    const shortlistedFilterIcon = shortlistedFilterBtn.querySelector('i');

    let allDesigners = []

    const fetchDesigners = async () => {
        try {
            const response = await fetch('/api/designers');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allDesigners = await response.json();
            renderDesigners();
        } catch (error) {
            console.error('Error fetching designers:', error);
            allDesigners = [
                {
                    id: 99,
                    name: "Fallback Designer",
                    rating: 2.0,
                    description: "Could not load data from backend. Showing fallback.",
                    projects: 0,
                    years: 0,
                    price: "$",
                    phone1: "N/A",
                    phone2: "N/A",
                    details: "Please ensure your Flask backend is running on http://127.0.0.1:5000."
                }
            ];
            renderDesigners();
        }
    };

    fetchDesigners()

    let shortlistedDesignerIds = new Set(JSON.parse(localStorage.getItem('shortlistedDesigners') || '[]'));

    const saveShortlistedDesigners = () => {
        localStorage.setItem('shortlistedDesigners', JSON.stringify(Array.from(shortlistedDesignerIds)));
    };


    const getStarRatingHtml = (rating) => {
        let starsHtml = '<div class="star-rating flex items-center">';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                starsHtml += '<i class="fas fa-star"></i>';
            } else if (hasHalfStar && i === fullStars) {
                starsHtml += '<i class="fas fa-star-half-alt"></i>';
            } else {
                starsHtml += '<i class="far fa-star"></i>';
            }
        }
        starsHtml += '</div>';
        return starsHtml;
    };


    const renderDesigners = () => {
        designerListingsContainer.innerHTML = '';

        const isShortlistedFilterActive = shortlistedFilterBtn.classList.contains('active');
        const designersToDisplay = isShortlistedFilterActive
            ? allDesigners.filter(designer => shortlistedDesignerIds.has(designer.id))
            : allDesigners;

        if (designersToDisplay.length === 0 && isShortlistedFilterActive) {
            designerListingsContainer.innerHTML = `
                        <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg" role="alert">
                            <p class="font-bold">No Shortlisted Designers</p>
                            <p>You haven't shortlisted any designers yet. Toggle the 'Shortlisted' filter off to see all designers.</p>
                        </div>
                    `;
            return;
        } else if (designersToDisplay.length === 0) {
            designerListingsContainer.innerHTML = `
                        <div class="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-lg" role="alert">
                            <p class="font-bold">No Designers Found</p>
                            <p>There are no designers to display at the moment.</p>
                        </div>
                    `;
            return;
        }

        designersToDisplay.forEach(designer => {
            const isShortlisted = shortlistedDesignerIds.has(designer.id);
            const shortlistBtnClasses = `card-action-btn shortlist-btn ${isShortlisted ? 'active' : ''}`;
            const shortlistIconClass = isShortlisted ? 'fas fa-heart' : 'far fa-heart';

            const designerCard = document.createElement('div');
            designerCard.classList.add('designer-card');
            designerCard.innerHTML = `
    <div class="card-content-area"> <h2 class="text-xl font-semibold text-gray-900 mb-1">${designer.name}</h2>
        ${getStarRatingHtml(designer.rating)}
        <p class="text-gray-600 text-sm mt-2 mb-3">${designer.description}</p>
        <div class="flex flex-wrap gap-2 text-xs font-medium text-gray-700 mb-3">
            <span class="stats-badge">${designer.projects} Projects</span>
            <span class="stats-badge">${designer.years} Years</span>
            <span class="stats-badge price">${designer.price}</span>
        </div>
        <p class="text-gray-700 text-sm">${designer.phone1}</p>
        <p class="text-gray-700 text-sm">${designer.phone2}</p>

        <div class="designer-details-expanded text-gray-700 text-sm mt-4">
            <p>${designer.details}</p>
        </div>
    </div>

    <div class="card-actions-vertical"> <button class="card-action-btn details-toggle-btn" data-designer-id="${designer.id}">
        <i class="fas fa-info-circle"></i>
        <span>Details</span>
    </button>
        <button class="card-action-btn">
            <i class="fas fa-eye-slash"></i>
            <span>Hide</span>
        </button>
        <button class="${shortlistBtnClasses}" data-designer-id="${designer.id}">
            <i class="${shortlistIconClass}"></i>
            <span>Shortlist</span>
        </button>
        <a href="tel:${designer.phone1}" class="card-action-btn">
            <i class="fas fa-phone"></i>
            <span>Call</span>
        </a>
        <button class="card-action-btn">
            <i class="fas fa-flag"></i>
            <span>Report</span>
        </button>
    </div>
                    `;
            designerListingsContainer.appendChild(designerCard);
        });

        document.querySelectorAll('.shortlist-btn').forEach(button => {
            button.addEventListener('click', toggleShortlist);
        });
        document.querySelectorAll('.details-toggle-btn').forEach(button => {
            button.addEventListener('click', toggleDetails);
        });
    };

    const toggleShortlist = (event) => {
        const button = event.currentTarget;
        const designerId = parseInt(button.dataset.designerId);
        const icon = button.querySelector('i');

        if (shortlistedDesignerIds.has(designerId)) {
            shortlistedDesignerIds.delete(designerId);
            button.classList.remove('active');
            icon.classList.replace('fas', 'far');
        } else {
            shortlistedDesignerIds.add(designerId);
            button.classList.add('active');
            icon.classList.replace('far', 'fas');
        }
        saveShortlistedDesigners();
        renderDesigners();
    };

    const toggleDetails = (event) => {
        const button = event.currentTarget;
        const designerCard = button.closest('.designer-card');
        const detailsSection = designerCard.querySelector('.designer-details-expanded');

        detailsSection.classList.toggle('show');
    };

    shortlistedFilterBtn.addEventListener('click', () => {
        shortlistedFilterBtn.classList.toggle('active');
        // Toggle heart icon on filter button
        if (shortlistedFilterBtn.classList.contains('active')) {
            shortlistedFilterIcon.classList.replace('far', 'fas');
        } else {
            shortlistedFilterIcon.classList.replace('fas', 'far');
        }
        renderDesigners();
    });

    renderDesigners();
});