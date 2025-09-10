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

        let steps = 0; // 控制提示階段
        let currentPrize = null; // 暫存壽星選到的獎品

        function drawPrize(folderNumber) {
            if (hasDrawn) return;

            const resultElement = document.getElementById('result');
            currentPrize = prizes[folderNumber]; // 先記住壽星選的獎品
            steps = 0; // 從第一層開始
                
            showStep(resultElement);

            hasDrawn = true;

            // 禁用所有資料夾按鈕
            const folders = document.querySelectorAll('.folder');
            folders.forEach(folder => {
                folder.style.opacity = '0.5';
                folder.style.pointerEvents = 'none';
            });
        }

        function showStep(resultElement) {
            const messages = ["繼續...", "再一次...", "快抽到了..."];

            if (steps < messages.length) {
                // 還在提示階段
                resultElement.innerHTML = `
                    <p style="font-size:18px;font-weight:bold;">${messages[steps]}</p>
                    <button class="reset-btn" onclick="nextStep()">點我</button>
                `;
                resultElement.className = `result show consolation`; // 統一用藍色背景提示
            } else {
                // 最後顯示獎品
                if (currentPrize.type === "prize") {
                    resultElement.innerHTML = `
                        <span class="prize-icon">${currentPrize.icon}</span>
                        🎉 恭喜！您抽到了<br>
                        <strong>${currentPrize.name}</strong>
                        <br><br>
                        <button class="reset-btn" onclick="resetDraw()">再抽一次</button>
                    `;
                    resultElement.className = `result ${currentPrize.type} show`;
                } else {
                    resultElement.innerHTML = `
                        <span class="prize-icon">${currentPrize.icon}</span>
                        😅 很可惜！您抽到的是<br>
                        <strong>${currentPrize.name}</strong>
                        <br><br>
                    `;
                    resultElement.className = `result ${currentPrize.type} show`;
                }
            }
        }

        function nextStep() {
            const resultElement = document.getElementById('result');
            steps++;
            showStep(resultElement);
        }

        function resetDraw() {
            const resultElement = document.getElementById('result');
            resultElement.className = 'result';
            resultElement.innerHTML = '';
            hasDrawn = false; // 重新打亂禮物分配 
            initializePrizes(); // 重新啟用所有資料夾按鈕
            const folders = document.querySelectorAll('.folder');
            folders.forEach(folder => {
                folder.style.opacity = '1';
                folder.style.pointerEvents = 'auto';
            });
        }
