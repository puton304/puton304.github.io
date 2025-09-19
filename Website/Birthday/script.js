let currentState = 0;
        let folderName = "";

        // 使用者點資料夾
        function drawPrize(folderNumber) {
            currentState = 0;
            const resultElement = document.getElementById('result');
            resultElement.classList.remove('show'); // reset

            // 資料夾移除
            const folders = document.querySelectorAll('.folder');
            folders.forEach(folder => {
                folder.remove()
            });
            document.querySelector('.result').style.marginTop = "0";

            setTimeout(() => showState(), 50);
        }

        // 狀態流程
        function showState(choice = null) {
            const resultElement = document.getElementById('result');
            let html = "";

            switch (currentState) {
                case 0:
                    html = `
                        <button class="flow-btn" onclick="nextState('big')">大禮物</button>
                        <button class="flow-btn" onclick="nextState('small')">小禮物</button>
                        <button class="flow-btn" onclick="nextState('both')">兩個都要</button>`;
                    break;

                case 1:
                    html = `<p>你太貪心了</p>
                    <p>需要再給你一次選擇機會嗎？</p>
                    <button class="flow-btn" onclick="nextState('yes')">Yes</button>
                    <button class="flow-btn" onclick="nextState('no')">No</button>`;
                    break;

                case 2:
                    html = `<p>你確定嗎？</p>
                    <button class="flow-btn" onclick="nextState('yes-final')">Yes</button>
                    <button class="flow-btn" onclick="nextState('no-final')">No</button>`;
                    break;

                case 3:
                    html = `<p>人生有很多事是不能反悔的</p>
                    <button class="flow-btn" onclick="nextState('anyway')">Next</button>`;
                    break;

                case 4:
                    html = `<p>你到底要怎樣</p>
                    <button class="flow-btn" onclick="nextState('anyway')">Next</button>`;
                    break;

                case 5:
                    html = `
                    <div class="final-prize">
                        <span class="prize-icon">🎉🍽️</span>
                        <p>生日快樂！</p>
                        <p><strong>恭喜獲得：大餐一頓</strong></p>
                        <p class="note">P.S. 金額新台幣 1000 元，不限次數，用完為止</p>
                    </div>`;
                    break;
            }

            resultElement.innerHTML = html;
            resultElement.classList.add('show'); // 顯示結果
        }

        // 控制下一步
        function nextState(choice) {
            if (choice === "both") {
                currentState = 1;
            } else if (choice === "yes" || choice === "no") {
                currentState = 2;
            } else if (choice === "yes-final") {
                currentState = 3;
            } else if (choice === "no-final") {
                currentState = 4;
            } else if (choice === "anyway") {
                currentState = 5;
            } else {
                currentState = 5; // 預設直接到最後
            }
            showState();
        }
