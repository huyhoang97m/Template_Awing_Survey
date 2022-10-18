Để chạy unit-test: 

B1. Mở Terminal chạy:  npm install npm install --save-dev jest

B2: Mở file main_v1.0.js comment 2 dòng code 
	postAnalyticEvent("survey", JSON.stringify(answerResultArray));
        	nextView();
      và bỏ comment các dòng exoports ở cuối file.

B3: Mở terminal rồi gõ code " npm run test".
B4: Để kiểm tra coverage mở terminal và gõ dòng lệnh " npm test -- --coverage ".
