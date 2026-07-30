from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, Image as RLImage
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/"public"/"parent-guide.pdf"
pdfmetrics.registerFont(TTFont("TC","C:/Windows/Fonts/kaiu.ttf"))
NAVY=colors.HexColor("#071A31"); AMBER=colors.HexColor("#F6A623"); ORANGE=colors.HexColor("#E86F3D")
PAPER=colors.HexColor("#FFFDF8"); PALE=colors.HexColor("#F6F1E7"); BLUE=colors.HexColor("#DDEFF3")
styles=getSampleStyleSheet()
styles.add(ParagraphStyle(name="TCTitle",fontName="TC",fontSize=27,leading=37,textColor=NAVY,alignment=TA_CENTER,spaceAfter=12))
styles.add(ParagraphStyle(name="TCH1",fontName="TC",fontSize=21,leading=29,textColor=NAVY,spaceAfter=10))
styles.add(ParagraphStyle(name="TCH2",fontName="TC",fontSize=14,leading=20,textColor=ORANGE,spaceAfter=6))
styles.add(ParagraphStyle(name="TCBody",fontName="TC",fontSize=10.5,leading=18,textColor=NAVY))
styles.add(ParagraphStyle(name="TCSmall",fontName="TC",fontSize=8.5,leading=13,textColor=colors.HexColor("#526779")))
styles.add(ParagraphStyle(name="TCCenter",fontName="TC",fontSize=11,leading=18,textColor=NAVY,alignment=TA_CENTER))

missions=[
("指揮中心報到","問候、聽指令、輪流與合作","先向孩子問好：「今晚歡迎你加入救援隊。當別人說話時，我們先用眼睛看、耳朵聽，聽完再行動。」","和家人練習問好、等待與輪流。","數一數 3 顆任務星，將數量與數字 3 配對。","ㄅ、ㄆ、ㄇ"),
("消滅牙齒小怪獸","刷牙順序與兩分鐘觀念","請孩子用手指當牙刷，跟著說：「外面畫小圓、裡面慢慢刷、咬合面來回走，最後照顧舌頭。」","使用計時器完成一次兩分鐘刷牙。","比較 3 輛消防車與 2 架直升機，說出哪一組較多。","ㄈ、ㄉ、ㄊ"),
("泡泡清潔救援","自己洗澡與防滑安全","提醒孩子：「進浴室慢慢走，先請大人確認水溫。從頭到腳，一個部位一個部位洗乾淨。」","在陪伴下說出並完成洗澡順序。","從三件工具中找出最大的一件。","ㄋ、ㄌ、ㄍ"),
("失蹤玩具歸隊","分類、收納與物歸原位","問孩子：「積木、繪本、小車各自住在哪裡？用完送它們回家，就是愛惜物品。」","選三類玩具，各自找到固定收納位置。","辨認圓形、三角形與正方形。","ㄎ、ㄏ、ㄐ"),
("時鐘塔修復","早上、下午、晚上與作息","一起看窗外或生活照片，請孩子判斷是早上、下午還是晚上，並說出那個時間會做的事。","用三張圖排出一天的活動。","完成藍、橙、藍、橙的 AB 規律。","ㄑ、ㄒ、ㄓ"),
("準時出發任務","等待、倒數與五分鐘概念","在活動結束前說：「還有五分鐘，我們要開始收尾了。」帶孩子把準備工作拆成幾個小步驟。","設定五分鐘倒數，完成一項收尾工作。","找出 1、2、3、□、5 中缺少的數字。","ㄔ、ㄕ、ㄖ"),
("制服整備站","穿脫衣服、辨認前後","帶孩子找領口、標籤與正面圖案。卡住時示範說：「請幫我看一看。」完成後稱讚具體步驟。","自己辨認並穿好一件衣服。","數一數四件制服。","ㄗ、ㄘ、ㄙ"),
("泡泡防護罩","正確洗手與洗手時機","一起念：手心、手背、指縫、指尖、拇指、手腕。問孩子飯前、如廁後、回家後該做什麼。","跟著六部位口訣完整洗手。","找出與三顆泡泡一樣多的組合。","ㄧ、ㄨ、ㄩ"),
("健康燃料補給","均衡飲食、喝水與餐桌禮貌","指出餐盤不同顏色，說明每類食物都為身體提供不同幫助。鼓勵嘗試，不強迫吃完。","找出餐桌上的三種顏色和一杯水。","數出六份健康燃料。","ㄚ、ㄛ、ㄜ"),
("安全道路救援","過馬路與乘車安全","在室內模擬路口，練習「停、看、聽、牽」。提醒乘車坐安全座椅，找不到家人時向工作人員求助。","用膠帶做道路，演練停、看、聽。","辨認直升機位於基地的上面。","ㄝ、ㄞ、ㄟ"),
("老師的秘密工具箱","尊重老師與學習禮儀","請孩子看著您，聽完一個完整示範再操作。引導說：「謝謝老師教我。」尊重是珍惜他人的用心。","練習聽完一句話，再提問或道謝。","數一數工具箱中的四件工具。","ㄠ、ㄡ、ㄢ"),
("情緒警報解除","說出感受與安全冷靜","示範說：「我很生氣，需要休息。」一起做三次聞花、吹蠟燭呼吸，提醒感受可以說，手腳保持安全。","親子一起做三次慢呼吸。","找出星、月、星、月的 AB 規律。","ㄣ、ㄤ、ㄥ"),
("家庭合作大修復","主動幫忙、感謝與責任","請孩子選一件能力所及的家事。完成後說出您觀察到的努力，並彼此感謝。","選一件適齡家事，自己完成。","比較五個玩具與五個盒子，認識一樣多。","ㄦ與綜合複習"),
("星光總部大考驗","綜合複習、自選任務與結業","回顧孩子最喜歡、最進步與想繼續練習的任務。強調結業不是全都會，而是願意持續嘗試。","選一項習慣，訂下明日約定。","找出排在數字 9 後面的 10。","37 個注音總複習"),
]
stories=[
"星光指揮中心亮起柔柔的燈。旋風先向大家問好，再請兩位小隊長輪流參觀。大力把工具箱推到桌邊，挖挖也把位置讓出來。大家發現，只要先問好、聽完說明，再輪流動手，任務就會又快又安全。最後，每位隊員都說出一句謝謝，指揮桌亮起第一顆合作星。",
"牙齒城傳來警報，小怪獸躲進後排牙齒。小焰請牙醫老師示範：外側畫小圓、內側慢慢刷，再清潔咬合面和舌頭。小焰聽完才出發，巡邏足足兩分鐘。牙齒城恢復閃亮，他向老師道謝，也答應早晚都完成任務。",
"泡泡山谷被灰塵霧罩住了。挖挖先站在防滑墊，請大人確認水溫，再從頭髮、脖子、手臂、肚子、腿到腳，一區一區清潔。他沒有奔跑，洗好後關水、擦乾、穿衣，基地送來一枚乾淨又安全的泡泡章。",
"基地準備休息時，積木、繪本和小車卻全不見了。大力畫出三個停車標誌：積木進盒子、繪本上書架、小車回車庫。小隊長一件件分類，再檢查走道。星隊長提醒大家，借用前要詢問，使用後要歸還。",
"時鐘塔的三扇窗混在一起：太陽升起、陽光高掛、月亮出現。高高請小隊長把早餐放到早上、遊戲和學習放到白天、洗澡刷牙放到晚上。順序排好，時鐘重新滴答。時間幫助我們知道現在該做什麼。",
"旋風要在八點整送零件，但大家還在玩。星隊長先給五分鐘提醒：收玩具、上廁所、穿鞋、檢查水壺。旋風沒有一直催促。整點時全隊已準備好。準時不是比誰最快，而是尊重一起等待的人。",
"整備站送來一堆制服。大力先找領口，再看標籤，最後讓雙手各自找到袖口。遇到拉鍊卡住，他沒有生氣硬拉，而是請老師幫忙。老師示範後，大力道謝再試一次，制服終於整齊完成。",
"基地防護罩忽然變弱，原來小髒污搭著隊員回來了。小焰抹肥皂，把手心、手背、指縫、指尖、拇指和手腕都搓到，再沖淨擦乾。飯前、如廁後、回家後都要啟動泡泡防護罩。",
"救援隊準備遠行，挖挖只想裝甜甜燃料。營養師老師說明主食給力量、蛋白質幫助成長、蔬果照顧身體，白開水讓機器順利運轉。挖挖先說謝謝，再試一小口蔬菜，油箱亮起健康綠燈。",
"馬路另一邊有人需要幫忙，高高先在路口停住。他牽好大人的手，看左右、聽車聲，等綠燈才通過。上車後坐進安全座椅。真正勇敢不是衝得快，而是懂得保護自己並在需要時求助。",
"橋梁零件怎麼都接不起來，大力急得想用力敲。工程老師請大家先看圖、再選工具、最後依序固定。大力放下槌子，眼睛看老師、耳朵聽完整，等老師說完才提問。橋完成後，他把工具放回原位，真誠地說謝謝。",
"積木倒下時，小焰的警報燈變紅。他很生氣，卻先說：「我很失望，需要休息。」星隊長陪他吸氣像聞花、吐氣像吹蠟燭。冷靜後，小焰請夥伴一起重搭，也為剛才的大聲說話道歉。",
"一陣風吹亂家庭基地。大力收積木，挖挖整理衣服，小焰擦桌面，高高收繪本，旋風檢查走道。每件事都不大，合起來卻讓家很快恢復溫暖。大家互相道謝，發現主動幫忙就是可靠的變身力量。",
"十四顆任務星同時亮起。小隊長整理工具、看時間準備、走安全路線，再用乾淨雙手送出健康補給。遇到不會的地方，他先聽說明，也禮貌求助。真正的結業不是從此不犯錯，而是願意再試一次、照顧自己並尊重別人。"
]

def footer(canvas,doc):
    canvas.saveState(); canvas.setStrokeColor(colors.HexColor("#D9D3C8")); canvas.line(18*mm,15*mm,192*mm,15*mm)
    canvas.setFont("TC",8); canvas.setFillColor(colors.HexColor("#71808B")); canvas.drawString(18*mm,9*mm,"星光救援指揮中心 · 14 天親子帶領手冊"); canvas.drawRightString(192*mm,9*mm,str(doc.page)); canvas.restoreState()

doc=SimpleDocTemplate(str(OUT),pagesize=A4,rightMargin=18*mm,leftMargin=18*mm,topMargin=17*mm,bottomMargin=20*mm)
S=[]
S += [Spacer(1,24*mm),Paragraph("星光救援指揮中心 2.1",styles["TCTitle"]),Paragraph("14 天睡前生活力 × 數學 × 注音 × 合作<br/>親子帶領手冊",styles["TCTitle"]),Spacer(1,10*mm)]
cover=Table([[Paragraph("適用年齡",styles["TCSmall"]),Paragraph("每日時間",styles["TCSmall"]),Paragraph("使用方式",styles["TCSmall"])],[Paragraph("3–5 歲",styles["TCCenter"]),Paragraph("15–20 分鐘",styles["TCCenter"]),Paragraph("家長陪伴",styles["TCCenter"])]],colWidths=[52*mm]*3)
cover.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),NAVY),("TEXTCOLOR",(0,0),(-1,0),colors.white),("BACKGROUND",(0,1),(-1,1),BLUE),("BOX",(0,0),(-1,-1),1,NAVY),("INNERGRID",(0,0),(-1,-1),.5,NAVY),("VALIGN",(0,0),(-1,-1),"MIDDLE"),("TOPPADDING",(0,0),(-1,-1),10),("BOTTOMPADDING",(0,0),(-1,-1),10)]))
S += [cover,Spacer(1,14*mm),Paragraph("給家長的話",styles["TCH1"]),Paragraph("2.1 每天包含三個圖像闖關與一個兩角色合作任務，完整流程約 12–15 分鐘。第一次進入排序、情境與合作玩法時會播放操作示範，孩子可隨時按「再看一次」。若孩子疲倦，可在任何步驟離開，隔天從上次位置繼續。",styles["TCBody"]),Spacer(1,5*mm),Paragraph("星星與共玩",styles["TCH2"]),Paragraph("答對後會顯示角色慶祝畫面。晚安頁會逐顆顯示本日所得星星，並另外標示累積總數。兩位孩子共玩時依序輪流；只有一位孩子時可獨自完成兩回合。",styles["TCBody"]),PageBreak()]
roles=[("commander.webp","星隊長","救援隊總指揮","冷靜、溫暖；安排任務並鼓勵合作。"),("dali.webp","大力","黃色工程車","可靠有耐心；擅長建造、分類與收納。"),("wawa.webp","挖挖","橘色怪手","好奇又細心；擅長清潔、挖掘與排序。"),("gaogao.webp","高高","紅色雲梯車","勇敢不冒失；擅長安全觀念與求助。"),("xiaoyan.webp","小焰","紅色消防車","活潑又貼心；擅長身體照顧與冷靜。"),("xuanfeng.webp","旋風","藍白直升機","觀察力很好；擅長時間、方向與注音。")]
S += [Paragraph("星光救援隊角色總表",styles["TCH1"]),Paragraph("進入有聲故事前，先和孩子看角色圖片、讀名字，再說明今晚由誰出任務。",styles["TCBody"]),Spacer(1,5*mm)]
role_data=[[Paragraph("圖像",styles["TCSmall"]),Paragraph("角色",styles["TCSmall"]),Paragraph("身分與個性",styles["TCSmall"])]]
for filename,name,role,desc in roles:
    portrait=RLImage(str(ROOT/"public"/"characters"/filename),width=18*mm,height=18*mm)
    role_data.append([portrait,Paragraph(name,styles["TCBody"]),Paragraph(f"<b>{role}</b><br/>{desc}",styles["TCSmall"])])
rt=Table(role_data,colWidths=[25*mm,28*mm,114*mm],repeatRows=1)
rt.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),NAVY),("TEXTCOLOR",(0,0),(-1,0),colors.white),("ROWBACKGROUNDS",(0,1),(-1,-1),[PAPER,BLUE]),("GRID",(0,0),(-1,-1),.5,NAVY),("VALIGN",(0,0),(-1,-1),"MIDDLE"),("TOPPADDING",(0,0),(-1,-1),12),("BOTTOMPADDING",(0,0),(-1,-1),12)]))
S += [rt,Spacer(1,8*mm),Paragraph("網站中的「角色圖鑑」提供完整圖片與角色自我介紹語音；故事頁也會顯示當晚登場角色。",styles["TCBody"]),PageBreak()]
S += [Paragraph("14 天任務總覽",styles["TCH1"])]
data=[[Paragraph("天",styles["TCSmall"]),Paragraph("生活主線",styles["TCSmall"]),Paragraph("學習目標",styles["TCSmall"]),Paragraph("注音",styles["TCSmall"])]]
for i,m in enumerate(missions): data.append([str(i+1),Paragraph(m[0],styles["TCSmall"]),Paragraph(m[1],styles["TCSmall"]),Paragraph(m[5],styles["TCSmall"])])
t=Table(data,colWidths=[10*mm,48*mm,82*mm,27*mm],repeatRows=1)
t.setStyle(TableStyle([("FONTNAME",(0,0),(-1,-1),"TC"),("BACKGROUND",(0,0),(-1,0),NAVY),("TEXTCOLOR",(0,0),(-1,0),colors.white),("GRID",(0,0),(-1,-1),.35,colors.HexColor("#BFC7CC")),("VALIGN",(0,0),(-1,-1),"TOP"),("ROWBACKGROUNDS",(0,1),(-1,-1),[PAPER,PALE]),("TOPPADDING",(0,0),(-1,-1),5),("BOTTOMPADDING",(0,0),(-1,-1),5)]))
S += [t,PageBreak()]
for i,m in enumerate(missions):
    S += [Paragraph(f"DAY {i+1:02d}　{m[0]}",styles["TCH1"])]
    chips=Table([[Paragraph(f"生活目標<br/><b>{m[1]}</b>",styles["TCBody"]),Paragraph(f"注音通訊<br/><b>{m[5]}</b>",styles["TCBody"])]],colWidths=[85*mm,82*mm])
    chips.setStyle(TableStyle([("BACKGROUND",(0,0),(0,0),colors.HexColor("#FFF1CF")),("BACKGROUND",(1,0),(1,0),BLUE),("BOX",(0,0),(-1,-1),.6,NAVY),("INNERGRID",(0,0),(-1,-1),.4,NAVY),("VALIGN",(0,0),(-1,-1),"TOP"),("TOPPADDING",(0,0),(-1,-1),9),("BOTTOMPADDING",(0,0),(-1,-1),9)]))
    S += [chips,Spacer(1,5*mm),Paragraph("家長開場引導",styles["TCH2"]),Paragraph(m[2],styles["TCBody"]),Spacer(1,3*mm),Paragraph("今晚故事",styles["TCH2"]),Paragraph(stories[i],styles["TCBody"]),Spacer(1,3*mm)]
    activity=Table([[Paragraph("生活實作",styles["TCSmall"]),Paragraph("數學補給站",styles["TCSmall"])],[Paragraph(m[3],styles["TCBody"]),Paragraph(m[4],styles["TCBody"])]],colWidths=[83.5*mm,83.5*mm])
    activity.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),NAVY),("TEXTCOLOR",(0,0),(-1,0),colors.white),("BOX",(0,0),(-1,-1),.6,NAVY),("INNERGRID",(0,0),(-1,-1),.4,NAVY),("VALIGN",(0,0),(-1,-1),"TOP"),("TOPPADDING",(0,0),(-1,-1),7),("BOTTOMPADDING",(0,0),(-1,-1),7)]))
    S += [activity,Spacer(1,3*mm),Paragraph("2.1 圖像闖關與合作任務",styles["TCH2"]),Paragraph(f"<b>看圖：</b>選出符合「{m[1]}」的行為。　<b>排序：</b>先選卡片，再放入發光編號空格。<br/><b>情境：</b>先選工具，再點場景發光處。　<b>合作：</b>看輪到誰，選技能完成兩回合。",styles["TCSmall"]),Spacer(1,2*mm),Paragraph("分齡提示",styles["TCH2"]),Paragraph("<b>3 歲：</b>先播放示範並由家長讀卡。　<b>5 歲：</b>請孩子說出步驟與理由。",styles["TCSmall"]),Spacer(1,2*mm),Paragraph("家長觀察記錄",styles["TCH2"]),Paragraph("今天願意嘗試：＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿<br/>明天想再練習：＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿",styles["TCSmall"]),PageBreak()]
S += [Spacer(1,22*mm),Paragraph("星光小隊長 2.1 結業證書",styles["TCTitle"]),Spacer(1,10*mm),Paragraph("恭喜",styles["TCCenter"]),Spacer(1,6*mm),Paragraph("＿＿＿＿＿＿＿＿＿＿＿＿＿＿",styles["TCTitle"]),Paragraph("完成 14 天星光救援任務",styles["TCH1"]),Spacer(1,5*mm),Paragraph("學會照顧自己、尊重他人、勇敢表達與合作，<br/>也願意在遇到困難時，再試一次。",styles["TCCenter"]),Spacer(1,18*mm),Paragraph("家長簽名：＿＿＿＿＿＿＿＿　　日期：＿＿＿＿＿＿＿＿",styles["TCCenter"])]
doc.build(S,onFirstPage=footer,onLaterPages=footer)
print(OUT)
