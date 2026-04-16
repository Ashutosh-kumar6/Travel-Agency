/* ============== Premium Travel Agency JS ============== */

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href'))?.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add hover effects to cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });

    // Button click feedback
    document.querySelectorAll('.btn, .card-button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255,255,255,0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Form validation
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            console.log('Form submitted:', Object.fromEntries(formData));
            
            // Show success message
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '✓ Sent Successfully!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
            }, 3000);
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(30, 41, 59, 0.98)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.background = 'rgba(30, 41, 59, 0.95)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        }
    });

    // Counter animation for stats
    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    };

    // Lazy load effect for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .fade-in').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Add ripple animation to stylesheet dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);


// book your trip page js
// Sample bus data
        const busData = {
            'Vijayawada-Hyderabad': [
                {
                    from: 'Vijayawada',
                    to: 'Hyderabad',
                    duration: '4hrs 16mins',
                    operator: 'Amaravathi - VOLVO/S',
                    type: 'seater',
                    price: 436,
                    availableBuses: 116,
                    departure: '14:30',
                    arrival: '18:46'
                },
                {
                    from: 'Vijayawada',
                    to: 'Hyderabad',
                    duration: '5hrs 30mins',
                    operator: 'Express - AC',
                    type: 'ac',
                    price: 520,
                    availableBuses: 89,
                    departure: '10:00',
                    arrival: '15:30'
                },
                {
                    from: 'Vijayawada',
                    to: 'Hyderabad',
                    duration: '6hrs 00mins',
                    operator: 'Night Premium - Sleeper',
                    type: 'sleeper',
                    price: 650,
                    availableBuses: 45,
                    departure: '22:00',
                    arrival: '04:00'
                }
            ],
            'Hyderabad-Vijayawada': [
                {
                    from: 'Hyderabad',
                    to: 'Vijayawada',
                    duration: '4hrs 15mins',
                    operator: 'Amaravathi - VOLVO/S',
                    type: 'seater',
                    price: 436,
                    availableBuses: 137,
                    departure: '06:00',
                    arrival: '10:15'
                },
                {
                    from: 'Hyderabad',
                    to: 'Vijayawada',
                    duration: '5hrs 45mins',
                    operator: 'Comfort Plus - AC',
                    type: 'ac',
                    price: 550,
                    availableBuses: 72,
                    departure: '18:00',
                    arrival: '23:45'
                }
            ]
        };

        // Set minimum date to today
        document.getElementById('departure').min = new Date().toISOString().split('T')[0];

        // Generate date buttons
        function generateDateButtons() {
            const container = document.getElementById('dateButtons');
            const today = new Date();
            
            for (let i = 0; i < 6; i++) {
                const date = new Date(today);
                date.setDate(date.getDate() + i);
                
                const options = { month: 'short', day: 'numeric' };
                const dateStr = date.toLocaleDateString('en-US', options);
                const dateValue = date.toISOString().split('T')[0];
                
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'date-btn' + (i === 0 ? ' active' : '');
                btn.textContent = dateStr;
                btn.dataset.date = dateValue;
                btn.onclick = () => selectDate(btn);
                
                container.appendChild(btn);
            }
        }

        // Select date
        function selectDate(btn) {
            document.querySelectorAll('.date-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('departure').value = btn.dataset.date;
            displayBuses();
        }

        // Display buses
        function displayBuses() {
            const from = document.getElementById('from').value.trim();
            const to = document.getElementById('to').value.trim();
            const key = `${from}-${to}`;
            
            const buses = busData[key] || [];
            const resultsDiv = document.getElementById('busResults');

            if (buses.length === 0) {
                resultsDiv.innerHTML = '<div class="no-results"><i class="ri-bus-line"></i><p>No buses available for this route</p></div>';
                return;
            }

            resultsDiv.innerHTML = buses.map(bus => `
                <div class="bus-card">
                    <div class="bus-icon">
                        <i class="ri-bus-2-line"></i>
                    </div>
                    <div class="bus-details">
                        <div class="route-title">${bus.from} to ${bus.to}</div>
                        <div class="route-meta">
                            <div class="meta-item">
                                <i class="ri-time-line"></i> ${bus.duration}
                            </div>
                            <div class="meta-item">
                                <i class="ri-car-line"></i> ${bus.operator}
                            </div>
                        </div>
                        <div style="color: #475569; font-size: 0.9rem; margin-top: 0.5rem;">
                            Departure: <strong>${bus.departure}</strong> | Arrival: <strong>${bus.arrival}</strong>
                        </div>
                        <span class="bus-type-tag">${bus.type.toUpperCase()}</span>
                    </div>
                    <div class="bus-pricing">
                        <div class="price">₹${bus.price}</div>
                        <div class="price-label">Onwards</div>
                        <span class="bus-count">${bus.availableBuses} Buses</span>
                        <button class="book-btn">Book Now</button>
                    </div>
                </div>
            `).join('');
        }

        // Swap destinations
        document.querySelector('.swap-btn').onclick = () => {
            const from = document.getElementById('from');
            const to = document.getElementById('to');
            [from.value, to.value] = [to.value, from.value];
        };

        // Search form
        document.getElementById('searchForm').onsubmit = (e) => {
            e.preventDefault();
            displayBuses();
        };

        // Filter functions
        function filterByType(btn) {
            btn.classList.toggle('active');
        }

        function updatePrice() {
            document.getElementById('priceValue').textContent = document.getElementById('priceRange').value;
        }

        function clearFilters() {
            document.querySelectorAll('.type-btn').forEach(btn => btn.classList.remove('active'));
            document.getElementById('priceRange').value = 5000;
            document.getElementById('priceValue').textContent = '5000';
            document.getElementById('wifi').checked = false;
            document.getElementById('charging').checked = false;
            document.getElementById('food').checked = false;
        }

        // Initialize
        generateDateButtons();
    