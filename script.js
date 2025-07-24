// DOM読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {
    // ハンバーガーメニュー
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    
    hamburgerMenu.addEventListener('click', function() {
        hamburgerMenu.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // ヒーロースライダー
    const heroSlider = {
        slides: document.querySelectorAll('.hero-slider .slide'),
        dots: document.querySelectorAll('.slider-dots .dot'),
        currentSlide: 0,
        interval: null,

        init: function() {
            this.showSlide(0);
            this.startAutoSlide();
            this.bindEvents();
        },

        showSlide: function(index) {
            // すべてのスライドを非表示
            this.slides.forEach(slide => slide.classList.remove('active'));
            this.dots.forEach(dot => dot.classList.remove('active'));
            
            // 現在のスライドを表示
            this.slides[index].classList.add('active');
            this.dots[index].classList.add('active');
            this.currentSlide = index;
        },

        nextSlide: function() {
            const nextIndex = (this.currentSlide + 1) % this.slides.length;
            this.showSlide(nextIndex);
        },

        startAutoSlide: function() {
            this.interval = setInterval(() => {
                this.nextSlide();
            }, 5000); // 5秒ごとにスライド
        },

        stopAutoSlide: function() {
            if (this.interval) {
                clearInterval(this.interval);
            }
        },

        bindEvents: function() {
            // ドットクリックイベント
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    this.showSlide(index);
                    this.stopAutoSlide();
                    this.startAutoSlide();
                });
            });

            // マウスオーバーで自動スライド停止
            const heroSection = document.querySelector('.hero-section');
            heroSection.addEventListener('mouseenter', () => {
                this.stopAutoSlide();
            });

            heroSection.addEventListener('mouseleave', () => {
                this.startAutoSlide();
            });
        }
    };

    // ムービースライダー
    const movieSlider = {
        container: document.querySelector('.movie-slider'),
        items: document.querySelectorAll('.movie-item'),
        currentIndex: 0,
        interval: null,

        init: function() {
            this.startAutoSlide();
        },

        nextSlide: function() {
            this.currentIndex = (this.currentIndex + 1) % this.items.length;
            this.updateSlider();
        },

        updateSlider: function() {
            const translateX = -this.currentIndex * 100;
            this.container.style.transform = `translateX(${translateX}%)`;
        },

        startAutoSlide: function() {
            this.interval = setInterval(() => {
                this.nextSlide();
            }, 5000); // 5秒ごとにスライド
        },

        stopAutoSlide: function() {
            if (this.interval) {
                clearInterval(this.interval);
            }
        }
    };

    // 商品スライダー
    const productSliders = document.querySelectorAll('.product-slider');
    
    productSliders.forEach(slider => {
        const container = slider.querySelector('.product-container');
        const prevBtn = slider.querySelector('.slider-btn.prev');
        const nextBtn = slider.querySelector('.slider-btn.next');
        const items = slider.querySelectorAll('.product-item');
        let currentIndex = 0;

        function updateSlider() {
            const translateX = -currentIndex * 100;
            container.style.transform = `translateX(${translateX}%)`;
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = Math.max(currentIndex - 1, 0);
                updateSlider();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = Math.min(currentIndex + 1, items.length - 1);
                updateSlider();
            });
        }
    });

    // カレンダー機能
    const calendar = {
        currentDate: new Date(2025, 6, 1), // 2025年7月
        holidays: [6, 13, 20, 21, 27, 28], // 休日リスト

        init: function() {
            this.renderCalendar();
            this.bindEvents();
        },

        renderCalendar: function() {
            const daysContainer = document.getElementById('calendar-days');
            const year = this.currentDate.getFullYear();
            const month = this.currentDate.getMonth();
            
            // 月の最初の日と最後の日を取得
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const startDate = new Date(firstDay);
            startDate.setDate(startDate.getDate() - firstDay.getDay());

            daysContainer.innerHTML = '';

            // 6週間分の日付を生成
            for (let week = 0; week < 6; week++) {
                for (let day = 0; day < 7; day++) {
                    const date = new Date(startDate);
                    date.setDate(startDate.getDate() + (week * 7) + day);
                    
                    const dayElement = document.createElement('div');
                    dayElement.className = 'day';
                    dayElement.textContent = date.getDate();

                    // 現在の月以外の日付は薄く表示
                    if (date.getMonth() !== month) {
                        dayElement.style.color = '#ccc';
                    }

                    // 休日かどうかチェック
                    if (this.holidays.includes(date.getDate()) && date.getMonth() === month) {
                        dayElement.classList.add('holiday');
                    }

                    daysContainer.appendChild(dayElement);
                }
            }
        },

        bindEvents: function() {
            const prevBtn = document.querySelector('.prev-month');
            const nextBtn = document.querySelector('.next-month');

            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
                    this.renderCalendar();
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
                    this.renderCalendar();
                });
            }
        }
    };

    // お気に入りボタン機能
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const icon = this.querySelector('i');
            if (icon.classList.contains('fas')) {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.color = '#ccc';
            } else {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.color = '#e74c3c';
            }
        });
    });

    // 検索機能
    const searchInput = document.querySelector('.search-bar input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                alert(`検索クエリ: ${query}`);
                // 実際の検索機能をここに実装
            }
        });
    }

    // Qボタン機能
    const qBtn = document.querySelector('.q-btn');
    if (qBtn) {
        qBtn.addEventListener('click', function() {
            alert('よくある質問ページに移動します');
            // 実際のQ&Aページへのリンクをここに実装
        });
    }

    // 初期化
    heroSlider.init();
    movieSlider.init();
    calendar.init();

    // スムーススクロール
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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

    // レスポンシブ対応
    function handleResize() {
        const isMobile = window.innerWidth <= 768;
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        
        if (!isMobile) {
            hamburgerMenu.classList.remove('active');
            document.querySelector('.main-nav').classList.remove('active');
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // 初期実行
}); 