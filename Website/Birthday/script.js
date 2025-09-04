// 所有可能的禮物
        const allPrizes = [{
            name: "餐券一張",
            icon: "🍽️",
            type: "prize"
        }, {
            name: "行動電源",
            icon: "🔋",
            type: "prize"
        }, {
            name: "銘謝惠顧",
            icon: "💝",
            type: "consolation"
        }];

        let prizes = {};
        let hasDrawn = false;

        // 打亂陣列順序的函數
        function shuffleArray(array) {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        }

        // 初始化或重新分配禮物到資料夾
        function initializePrizes() {
            const shuffledPrizes = shuffleArray(allPrizes);
            prizes = {
                1: shuffledPrizes[0],
                2: shuffledPrizes[1],
                3: shuffledPrizes[2]
            };
            updateDebugInfo();
        }

        // 更新偷偷看資訊
        function updateDebugInfo() {
            const debugContent = document.getElementById('debugContent');
            debugContent.innerHTML = `
                資料夾 1: ${prizes[1].icon} ${prizes[1].name}<br>
                資料夾 2: ${prizes[2].icon} ${prizes[2].name}<br>
                資料夾 3: ${prizes[3].icon} ${prizes[3].name}
            `;
        }

        // 切換偷偷看顯示
        function toggleDebug() {
            const debugInfo = document.getElementById('debugInfo');
            debugInfo.classList.toggle('show');
        }

        // 頁面載入時初始化
        initializePrizes();

        function drawPrize(folderNumber) {
            if (hasDrawn) {
                return;
            }

            const resultElement = document.getElementById('result');

            // 直接取得該資料夾的固定禮物
            const selectedPrize = prizes[folderNumber];

            // 顯示結果
            resultElement.innerHTML = `
                <span class="prize-icon">${selectedPrize.icon}</span>
                恭喜！您抽到了<br>
                <strong>${selectedPrize.name}</strong>
                <br><br>
                <button class="reset-btn" onclick="resetDraw()">再抽一次</button>
            `;

            resultElement.className = `result ${selectedPrize.type} show`;
            hasDrawn = true;

            // 禁用所有資料夾按鈕
            const folders = document.querySelectorAll('.folder');
            folders.forEach(folder => {
                folder.style.opacity = '0.5';
                folder.style.pointerEvents = 'none';
            });
        }

        function resetDraw() {
            const resultElement = document.getElementById('result');
            resultElement.className = 'result';
            resultElement.innerHTML = '';
            hasDrawn = false;

            // 重新打亂禮物分配
            initializePrizes();

            // 重新啟用所有資料夾按鈕
            const folders = document.querySelectorAll('.folder');
            folders.forEach(folder => {
                folder.style.opacity = '1';
                folder.style.pointerEvents = 'auto';
            });
        }
