// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fetch portfolio data from API and populate the page
async function loadPortfolioData() {
    try {
        const response = await fetch('/api/portfolio');
        if (!response.ok) {
            throw new Error('Failed to fetch portfolio data');
        }
        const data = await response.json();

        // Update name and title
        if (data.name) {
            document.querySelector('.logo').textContent = data.name;
        }

        // Update about section
        if (data.about) {
            const aboutText = document.querySelector('.about-text p');
            if (aboutText) {
                aboutText.textContent = data.about;
            }
        }

        // Update skills
        if (data.skills && data.skills.length > 0) {
            const skillsList = document.querySelector('.skill-category ul');
            if (skillsList) {
                skillsList.innerHTML = data.skills.map(skill => `<li>${skill}</li>`).join('');
            }
        }

        // Update projects
        if (data.projects && data.projects.length > 0) {
            const projectsGrid = document.querySelector('.projects-grid');
            if (projectsGrid) {
                projectsGrid.innerHTML = data.projects.map(project => `
                    <div class="project-card">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <a href="${project.link}" class="btn">View Project</a>
                    </div>
                `).join('');
            }
        }

        // Update contact info
        if (data.contact) {
            const contactInfo = document.querySelector('.contact-info');
            if (contactInfo) {
                contactInfo.innerHTML = `
                    <p><strong>Email:</strong> ${data.contact.email}</p>
                    <p><strong>Phone:</strong> ${data.contact.phone || 'Not provided'}</p>
                    ${data.contact.linkedin ? `<p><strong>LinkedIn:</strong> <a href="${data.contact.linkedin}" target="_blank">${data.contact.linkedin}</a></p>` : ''}
                    ${data.contact.github ? `<p><strong>GitHub:</strong> <a href="${data.contact.github}" target="_blank">${data.contact.github}</a></p>` : ''}
                `;
            }
        }

    } catch (error) {
        console.error('Error loading portfolio data:', error);
        // Fallback: keep static content
    }
}

// Add scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

// Add some CSS for animations via JavaScript
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .section.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        .project-card {
            transition: transform 0.3s ease;
        }
        .project-card:hover {
            transform: translateY(-5px);
        }
    `;
    document.head.appendChild(style);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    addAnimationStyles();
    addScrollAnimations();
    loadPortfolioData();
});

// Add loading indicator
function showLoading() {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerHTML = '<div class="spinner"></div>';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;
    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.remove();
    }
}

// Show loading before fetching data
document.addEventListener('DOMContentLoaded', function() {
    showLoading();
    setTimeout(() => {
        addAnimationStyles();
        addScrollAnimations();
        loadPortfolioData().finally(() => {
            hideLoading();
        });
    }, 100);
});
