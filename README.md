## Demo Video
[![Demo](https://i.ytimg.com/vi/PMlr5LC3iqo/maxresdefault.jpg)](https://www.youtube.com/watch?v=PMlr5LC3iqo&ab_channel=tzuwei "Demo") <br>

## 操作方式 Instruction

### 如何於下載後於本地端操作 How to open after downloading to the Local

Step 1: yarn install:all  
Setp 2: yarn start  
Step 3: yarn server

_或 Or_

Step 1: docker build -t [name] .  
Step 2: docker run --name [name] -p 4000:4000 [name]  
其餘操作與 Deploy 處無異 

### Deploy

server 無需任何操作方式，皆已完整連接，會由前端操作控制。透過 graphql 去 mongodb 將對應的對應的從資料庫取回，並使用 Websocket 訂閱通知，將所得之資訊回傳給前端。

連到網址後，前端會顯示登入介面，若無登入帳號，可透過創建帳號處新創帳號。

登入介面後，會自動導向主頁面，在這裡使用者可以閱覽所有的發文，包含活動內容、類型、時間及其發文者，使用者可以在觀看後貼文內容後，選擇是否有興趣參與此活動。

或是可以"What's on your mind?"處點選發文，創起新活動讓大家一同加入。

若點選上方"Chat and Event"按鈕，可以進入聊天室及個人活動頁面，在這裡，使用者可以檢視自己參加的活動之聊天室，當點擊聊天室，即可檢視此活動的細節資訊，並與一同參與此活動的人聊天，討論活動的細節。

更多細節可以參考 HackMD: [聚會吧](https://hackmd.io/@DVCmcNLyR3yTBuTONeC_Tw/Group6/edit)

## 每位組員之負責項目 Work distribution

#### **B07611046 鄭婷卉 Tinghui**

前後端串聯，將後端收到的資訊與前段頁面進行整合，與最終部屬。

#### **B08611010 謝方智 Andrew**

前端，運用 material ui 進行前端介面建立與優化以及前端邏輯判斷。

#### **B08611033 邱子瑋 Tzewei**

後端，利用 graphql 與資料庫互動以及其他後端簡單邏輯判斷。
