// DOM読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {
    // ハンバーガーメニュー
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (hamburgerMenu && mobileMenu) {
        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
        
        // モバイルメニューの背景をクリックして閉じる
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                hamburgerMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    }

    // 検索機能
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                alert(`検索クエリ: ${query}`);
                // 実際の検索機能をここに実装
            }
        });

        // Enterキーでも検索
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    alert(`検索クエリ: ${query}`);
                    // 実際の検索機能をここに実装
                }
            }
        });
    }

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
        
        if (!isMobile && hamburgerMenu) {
            hamburgerMenu.classList.remove('active');
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // 初期実行
}); 