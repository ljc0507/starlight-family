import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
//#region app/course-data.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var avatars = [
	"🧑‍🚀",
	"👩‍🚒",
	"🧑‍🔧",
	"👩‍🔬",
	"🦊",
	"🐻",
	"🐰",
	"🐯",
	"🐼",
	"🦁"
];
var phonics = [
	[
		"ㄅ",
		"ㄆ",
		"ㄇ"
	],
	[
		"ㄈ",
		"ㄉ",
		"ㄊ"
	],
	[
		"ㄋ",
		"ㄌ",
		"ㄍ"
	],
	[
		"ㄎ",
		"ㄏ",
		"ㄐ"
	],
	[
		"ㄑ",
		"ㄒ",
		"ㄓ"
	],
	[
		"ㄔ",
		"ㄕ",
		"ㄖ"
	],
	[
		"ㄗ",
		"ㄘ",
		"ㄙ"
	],
	[
		"ㄧ",
		"ㄨ",
		"ㄩ"
	],
	[
		"ㄚ",
		"ㄛ",
		"ㄜ"
	],
	[
		"ㄝ",
		"ㄞ",
		"ㄟ"
	],
	[
		"ㄠ",
		"ㄡ",
		"ㄢ"
	],
	[
		"ㄣ",
		"ㄤ",
		"ㄥ"
	],
	["ㄦ"],
	[
		"ㄅ",
		"ㄇ",
		"ㄈ",
		"ㄉ",
		"ㄊ",
		"ㄋ",
		"ㄌ",
		"ㄍ",
		"ㄎ",
		"ㄏ",
		"ㄐ",
		"ㄑ",
		"ㄒ",
		"ㄓ",
		"ㄔ",
		"ㄕ",
		"ㄖ",
		"ㄗ",
		"ㄘ",
		"ㄙ",
		"ㄧ",
		"ㄨ",
		"ㄩ",
		"ㄚ",
		"ㄛ",
		"ㄜ",
		"ㄝ",
		"ㄞ",
		"ㄟ",
		"ㄠ",
		"ㄡ",
		"ㄢ",
		"ㄣ",
		"ㄤ",
		"ㄥ",
		"ㄦ"
	]
];
var raw = [
	[
		"指揮中心報到",
		"問候、聽指令、輪流與合作",
		"旋風",
		"🚁",
		"先向夥伴問好",
		"直接拿走工具",
		"先問好，再輪流使用工具。",
		"今晚，星光指揮中心亮起柔柔的橙色燈。星隊長請旋風帶兩位小隊長參觀基地。旋風先說：「大家晚安，我可以加入嗎？」大力把工具箱推到桌邊，挖挖也把位置讓出來。大家發現，只要先問好、聽完說明，再輪流動手，任務就會又快又安全。最後，每位隊員都說出一句謝謝，指揮桌亮起第一顆合作星。",
		"和家人練習問好、等待與輪流。"
	],
	[
		"消滅牙齒小怪獸",
		"刷牙順序與兩分鐘觀念",
		"小焰",
		"🚒",
		"外側、內側、咬合面都要刷",
		"只刷看得到的門牙",
		"牙刷像小消防車，每個角落都要巡邏。",
		"牙齒城傳來警報，小怪獸躲進後排牙齒。小焰沒有急著噴水，而是請牙醫老師示範：先擠一顆豌豆大小的牙膏，外側畫小圓、內側慢慢刷，再清潔咬合面和舌頭。小焰聽完才出發，足足巡邏兩分鐘。牙齒城恢復閃亮，小焰向老師鞠躬說謝謝，也答應早晚都完成任務。",
		"用計時器完成一次兩分鐘刷牙。"
	],
	[
		"泡泡清潔救援",
		"自己洗澡與防滑安全",
		"挖挖",
		"🚜",
		"先試水溫並站穩",
		"在浴室奔跑",
		"浴室裡要慢慢走，先請大人確認水溫。",
		"泡泡山谷被灰塵霧罩住了。挖挖先停在防滑墊上，請大人確認水溫，再從頭髮、脖子、手臂、肚子、腿到腳，一區一區清潔。耳朵和眼睛需要溫柔照顧，地上的泡泡也要沖乾淨。挖挖沒有奔跑，洗好後關水、擦乾、穿衣，基地送來一枚乾淨又安全的泡泡章。",
		"在家長陪伴下說出並完成洗澡順序。"
	],
	[
		"失蹤玩具歸隊",
		"分類、收納與物歸原位",
		"大力",
		"🚧",
		"依種類放回有標記的家",
		"把玩具推到床底",
		"每件物品都有自己的停車位。",
		"基地準備休息時，積木、繪本和小車卻全不見了。大力沒有把它們隨便堆起來，而是畫出三個停車標誌：積木進盒子、繪本上書架、小車回車庫。小隊長一件件辨認、分類，再檢查走道是否暢通。星隊長稱讚大家愛惜物品，也提醒借用前要詢問、使用後要歸還。",
		"選三類玩具，各自找到固定收納位置。"
	],
	[
		"時鐘塔修復",
		"早上、下午、晚上與作息",
		"高高",
		"🪜",
		"晚上洗澡、刷牙、上床",
		"半夜開始大聲玩車",
		"晚上是身體充電的時間。",
		"時鐘塔的三扇窗混在一起：太陽升起、陽光高掛、月亮出現。高高升起雲梯，請小隊長把早餐放到早上、遊戲和學習放到白天、洗澡刷牙放到晚上。當順序排好，時鐘重新滴答前進。大家明白時間不是用來催促，而是幫助我們知道現在該做什麼，安心完成後就能休息。",
		"用三張圖排出早上、下午、晚上的活動。"
	],
	[
		"準時出發任務",
		"等待、倒數與五分鐘概念",
		"旋風",
		"🚁",
		"聽到五分鐘提醒就開始收尾",
		"直到最後一刻才找東西",
		"提早準備，出發時就不慌張。",
		"旋風要在八點整送零件，但大家還在玩。星隊長先給五分鐘提醒：第一分鐘收玩具，第二分鐘上廁所，第三分鐘穿鞋，最後檢查水壺。旋風看著時鐘，沒有一直催促。當長針走到整點，全隊已經準備好。準時不是比誰最快，而是尊重一起等待的人，也讓旅程安全平穩。",
		"設定五分鐘倒數，練習完成一項收尾工作。"
	],
	[
		"制服整備站",
		"穿脫衣服、辨認前後",
		"大力",
		"🚧",
		"先找領口、標籤和正面圖案",
		"用力拉扯卡住的衣服",
		"看標記、慢慢穿，卡住時請求幫忙。",
		"整備站送來一堆制服。大力先找領口，再看標籤在哪一面，最後讓雙手各自找到袖口。襪子拉平、鞋子的左右也排好。遇到拉鍊卡住，大力沒有生氣硬拉，而是說：「請老師幫我看一看。」老師示範對齊底座，大力道謝後再試一次，制服終於整齊完成。",
		"選一件衣服，找出正面、背面並自己穿好。"
	],
	[
		"泡泡防護罩",
		"正確洗手與洗手時機",
		"小焰",
		"🚒",
		"吃飯前和回家後洗手",
		"手看起來乾淨就不用洗",
		"看不見的小髒污也需要用肥皂帶走。",
		"基地的防護罩忽然變弱，原來看不見的小髒污搭著隊員回來了。小焰打開水、抹肥皂，手心、手背、指縫、指尖、拇指和手腕都搓到，再沖淨擦乾。飯前、上廁所後、回家後都要啟動泡泡防護罩。小焰還記得關緊水龍頭，不浪費每一滴水。",
		"跟著六部位口訣完整洗手一次。"
	],
	[
		"健康燃料補給",
		"均衡飲食、喝水與餐桌禮貌",
		"挖挖",
		"🚜",
		"每一類食物都試一點",
		"只吃甜點不喝水",
		"彩色蔬果、主食、蛋白質和水都是好燃料。",
		"救援隊準備遠行，挖挖卻只想裝甜甜燃料。營養師老師拿出彩虹餐盤，說明主食給力量、蛋白質幫助成長、蔬果照顧身體，白開水讓機器順利運轉。挖挖先說謝謝，再試一小口不熟悉的蔬菜。用餐時坐好、慢慢咀嚼、不浪費，油箱很快亮起健康綠燈。",
		"一起找出餐桌上的三種顏色和一杯水。"
	],
	[
		"安全道路救援",
		"過馬路與乘車安全",
		"高高",
		"🪜",
		"停、看、聽並牽好大人",
		"看到對面朋友就衝過去",
		"過馬路要停下來觀察，乘車要坐安全座椅。",
		"馬路另一邊有人需要幫忙，高高先在路口停住。他牽好大人的手，看左邊、看右邊、再聽車聲，等綠燈和行人號誌才通過。上車後，他坐進適合自己的安全座椅並扣好帶子。真正勇敢不是衝得快，而是懂得保護自己；找不到家人時，要留在安全處向穿制服的工作人員求助。",
		"在家中用膠帶做道路，演練停、看、聽。"
	],
	[
		"老師的秘密工具箱",
		"尊重老師與學習禮儀",
		"大力",
		"🚧",
		"聽完示範、愛惜工具並道謝",
		"打斷老師並亂丟工具",
		"尊敬老師，是珍惜他用心教我們的每一步。",
		"橋梁零件怎麼都接不起來，大力急得想用力敲。工程老師溫和地打開工具箱，請大家先看圖、再選工具、最後依序固定。大力放下手中的槌子，眼睛看老師、耳朵聽完整，等老師說完才提問。橋完成後，他把工具擦乾淨放回原位，真誠地說：「謝謝老師教我。」老師也謝謝大力認真學習。尊重讓知識像星光一樣傳下去。",
		"練習看著對方聽完一句話，再說謝謝。"
	],
	[
		"情緒警報解除",
		"說出感受與安全冷靜",
		"小焰",
		"🚒",
		"說我很生氣，先深呼吸",
		"推人或摔東西",
		"感受都可以說，手腳要保持安全。",
		"任務積木倒下時，小焰的警報燈變紅了。他很生氣，卻先把雙手抱在胸前，說：「我很失望，需要休息。」星隊長陪他吸氣像聞花、吐氣像吹蠟燭，做了三次。紅燈慢慢變成暖黃。冷靜後，小焰請夥伴一起重搭，也為剛才的大聲說話道歉。情緒不是壞怪獸，它是在提醒我們需要幫助。",
		"親子一起做三次聞花、吹蠟燭呼吸。"
	],
	[
		"家庭合作大修復",
		"主動幫忙、感謝與責任",
		"全隊",
		"⭐",
		"選一件自己能完成的家事",
		"等別人做完所有事情",
		"家是共同基地，每個人都能出一份力。",
		"一陣風吹亂家庭基地。大力收積木，挖挖把衣服放進籃子，小焰擦乾桌面，高高整理繪本，旋風從上方確認走道安全。每個任務都不大，合在一起卻讓家很快恢復溫暖。隊員完成自己的責任，也注意到別人的付出，互相說謝謝。星隊長宣布：主動幫忙就是最可靠的變身力量。",
		"選一件適齡家事，自己完成並請家人檢查。"
	],
	[
		"星光總部大考驗",
		"綜合複習與結業",
		"全隊",
		"🌟",
		"先想步驟、合作完成",
		"遇到困難立刻放棄",
		"會照顧自己、尊重別人，就是最棒的小隊長。",
		"十四顆任務星同時亮起，基地迎來最後考驗。小隊長要整理工具、看時間準備、走安全路線，再用乾淨雙手送出健康補給。遇到不會的地方，他們先聽星隊長說明，也禮貌地向老師求助。所有車隊一起抵達星光廣場。大家發現，真正的結業不是從此不犯錯，而是願意再試一次、照顧自己、尊重別人並和家人合作。",
		"從前 13 天選一項最想持續的習慣，訂下明日約定。"
	]
];
var mathPrompts = [
	[
		"數一數，基地裡有幾顆星星？",
		"⭐⭐⭐",
		"3",
		[
			"2",
			"3",
			"5"
		]
	],
	[
		"哪一組比較多？",
		"🚒🚒🚒　或　🚁🚁",
		"消防車",
		["消防車", "直升機"]
	],
	[
		"找出最大的工具。",
		"🔧　🔨　🪛",
		"🔨",
		[
			"🔧",
			"🔨",
			"🪛"
		]
	],
	[
		"哪一個是圓形？",
		"🔺　⚪　⬛",
		"⚪",
		[
			"🔺",
			"⚪",
			"⬛"
		]
	],
	[
		"接下來是什麼？",
		"🔵🟠🔵🟠 ？",
		"🔵",
		[
			"🔵",
			"🟠",
			"🟢"
		]
	],
	[
		"缺少哪個數字？",
		"1、2、3、？、5",
		"4",
		[
			"3",
			"4",
			"6"
		]
	],
	[
		"有幾件制服？",
		"👕👕👕👕",
		"4",
		[
			"3",
			"4",
			"5"
		]
	],
	[
		"哪一組一樣多？",
		"🫧🫧🫧",
		"🚿🚿🚿",
		[
			"🚿🚿",
			"🚿🚿🚿",
			"🚿🚿🚿🚿"
		]
	],
	[
		"把 6 份燃料送進基地。",
		"🍎🍎🍎🍎🍎🍎",
		"6",
		[
			"5",
			"6",
			"7"
		]
	],
	[
		"直升機在基地的哪裡？",
		"🏢　🚁",
		"上面",
		[
			"上面",
			"裡面",
			"下面"
		]
	],
	[
		"數一數工具箱有幾件工具。",
		"🔧🔨🪛📏",
		"4",
		[
			"3",
			"4",
			"5"
		]
	],
	[
		"哪一排是 AB 規律？",
		"⭐🌙⭐🌙",
		"⭐🌙⭐🌙",
		[
			"⭐⭐🌙🌙",
			"⭐🌙⭐🌙",
			"⭐⭐⭐🌙"
		]
	],
	[
		"5 個玩具和 5 個盒子，數量如何？",
		"🚗×5　📦×5",
		"一樣多",
		[
			"玩具多",
			"盒子多",
			"一樣多"
		]
	],
	[
		"哪個數字排在 9 後面？",
		"7、8、9、？",
		"10",
		[
			"8",
			"9",
			"10"
		]
	]
];
var missions = raw.map((m, i) => ({
	day: i + 1,
	title: m[0],
	goal: m[1],
	hero: m[2],
	icon: m[3],
	correct: m[4],
	wrong: m[5],
	tip: m[6],
	story: m[7],
	practice: m[8],
	phonics: phonics[i],
	math: {
		prompt: mathPrompts[i][0],
		visual: mathPrompts[i][1],
		answer: mathPrompts[i][2],
		options: mathPrompts[i][3]
	}
}));
"ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄧㄨㄩㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ".split("");
var characters = {
	星隊長: {
		slot: 0,
		icon: "🧑‍✈️",
		pitch: 1,
		rate: .82
	},
	大力: {
		slot: 1,
		icon: "🚧",
		pitch: .82,
		rate: .78
	},
	挖挖: {
		slot: 2,
		icon: "🚜",
		pitch: 1.08,
		rate: .84
	},
	高高: {
		slot: 3,
		icon: "🪜",
		pitch: .92,
		rate: .8
	},
	小焰: {
		slot: 4,
		icon: "🚒",
		pitch: 1.2,
		rate: .88
	},
	旋風: {
		slot: 5,
		icon: "🚁",
		pitch: 1.12,
		rate: .9
	}
};
var partners = [
	"大力",
	"挖挖",
	"旋風",
	"挖挖",
	"旋風",
	"大力",
	"挖挖",
	"高高",
	"旋風",
	"小焰",
	"星隊長",
	"旋風",
	"大力",
	"小焰"
];
var monsters = [
	"搶話泡泡",
	"牙菌小怪",
	"灰塵雲",
	"混亂團",
	"時間迷霧",
	"拖延雲",
	"皺衣球",
	"髒污泡泡",
	"偏食雲",
	"冒失球",
	"急躁螺絲",
	"生氣火球",
	"家事亂流",
	"忘記怪"
];
var sceneIcons = [
	"👋",
	"🪥",
	"🛁",
	"🧸",
	"🕰️",
	"🎒",
	"👕",
	"🧼",
	"🥗",
	"🚦",
	"🧰",
	"🌬️",
	"🏠",
	"🌟"
];
var wrongIcons = [
	"🙉",
	"🍬",
	"🏃",
	"🛏️",
	"🎮",
	"😴",
	"👕",
	"🖐️",
	"🍭",
	"🏃",
	"🔨",
	"💥",
	"🛋️",
	"🙈"
];
var orderSets = [
	[
		"先問好",
		"聽完說明",
		"輪流動手",
		"說謝謝"
	],
	[
		"擠牙膏",
		"刷外側",
		"刷內側",
		"刷咬合面"
	],
	[
		"試水溫",
		"沖濕身體",
		"抹泡泡清潔",
		"沖淨擦乾"
	],
	[
		"分辨種類",
		"放回固定位置",
		"檢查走道",
		"向夥伴道謝"
	],
	[
		"認早上",
		"認下午",
		"認晚上",
		"準備睡覺"
	],
	[
		"聽五分鐘提醒",
		"收玩具",
		"穿鞋帶水壺",
		"準時出發"
	],
	[
		"看正反面",
		"套入頭部",
		"伸進袖口",
		"整理拉平"
	],
	[
		"沖濕雙手",
		"抹肥皂搓洗",
		"沖乾淨",
		"擦乾雙手"
	],
	[
		"看彩色餐盤",
		"每類試一點",
		"慢慢咀嚼",
		"喝白開水"
	],
	[
		"停下來",
		"左右看",
		"仔細聽",
		"牽手通過"
	],
	[
		"看老師示範",
		"選正確工具",
		"依步驟操作",
		"收好並道謝"
	],
	[
		"說出感受",
		"停下手腳",
		"深呼吸三次",
		"請求幫助"
	],
	[
		"選一件家事",
		"自己完成",
		"請家人檢查",
		"彼此說謝謝"
	],
	[
		"回想學過的事",
		"選擇好方法",
		"合作完成",
		"訂下明日約定"
	]
];
var orderIconSets = [
	[
		"👋",
		"👂",
		"🤝",
		"🙏"
	],
	[
		"🪥",
		"😁",
		"👄",
		"🦷"
	],
	[
		"🌡️",
		"🚿",
		"🫧",
		"🧻"
	],
	[
		"🔎",
		"📦",
		"🚶",
		"🙏"
	],
	[
		"🌅",
		"☀️",
		"🌙",
		"🛏️"
	],
	[
		"⏳",
		"🧸",
		"🎒",
		"🚪"
	],
	[
		"🏷️",
		"👕",
		"🙌",
		"✨"
	],
	[
		"💧",
		"🧼",
		"🚿",
		"🧻"
	],
	[
		"🥗",
		"🥄",
		"😋",
		"💧"
	],
	[
		"✋",
		"👀",
		"👂",
		"🤝"
	],
	[
		"👩‍🏫",
		"🧰",
		"🔧",
		"🙏"
	],
	[
		"💬",
		"👐",
		"🌬️",
		"🙋"
	],
	[
		"🧺",
		"💪",
		"✅",
		"💗"
	],
	[
		"💭",
		"💡",
		"🤝",
		"📅"
	]
];
var tools = [
	"👂",
	"🪥",
	"🧴",
	"📦",
	"🕰️",
	"⏳",
	"👕",
	"🧼",
	"🥗",
	"🚦",
	"🧰",
	"🌬️",
	"🧺",
	"🌟"
];
var decoys = [
	"📣",
	"🍭",
	"⚽",
	"🛋️",
	"🎮",
	"🧸",
	"✂️",
	"🎨",
	"🍬",
	"🏎️",
	"🔨",
	"💥",
	"📺",
	"🙈"
];
var storySceneSets = [
	[
		"🌙🏢🚨",
		"🚁👋🧰",
		"🤝🙏⭐"
	],
	[
		"🌙🏰🦷",
		"🪥🫧😁",
		"🚒🙏✨"
	],
	[
		"🌙🛁💧",
		"🌡️🫧🚿",
		"🧻✨⭐"
	],
	[
		"🌙🏠🧸",
		"🔎🧱🚗",
		"📦📚🙏"
	],
	[
		"🌅☀️🌙",
		"🍳🎨🛁",
		"🪥🛏️⭐"
	],
	[
		"🕗🏢🚁",
		"⏳🧸🎒",
		"👟🚪⭐"
	],
	[
		"🌙👕🧦",
		"🏷️🙌👕",
		"✨🙏⭐"
	],
	[
		"🏠🫧👐",
		"💧🧼🙌",
		"🚿🧻✨"
	],
	[
		"🌙🍽️🥗",
		"🍚🥦🥚",
		"💧🙏⭐"
	],
	[
		"🏙️🚦🚗",
		"✋👀👂",
		"🤝🚶⭐"
	],
	[
		"🌙🏫🧰",
		"👩‍🏫👀👂",
		"🔧🙏⭐"
	],
	[
		"🌙🔥💭",
		"💬👐🌬️",
		"🙋🤝⭐"
	],
	[
		"🌙🏠🌀",
		"🧺🧹📚",
		"💗🙏⭐"
	],
	[
		"🌙🏢🌟",
		"🧰🕗🚦",
		"🤝🏆⭐"
	]
];
var coopActionSets = [
	[["先說你好", "大聲搶話"], ["耐心輪流", "搶走工具"]],
	[["刷外側牙齒", "先吃糖果"], ["刷內側和咬合面", "只刷門牙"]],
	[["先確認水溫", "直接跳進水裡"], ["站穩慢慢清洗", "在浴室奔跑"]],
	[["先把玩具分類", "全部塞在一起"], ["放回固定位置", "推到床底下"]],
	[["分清早晚活動", "半夜開始玩車"], ["洗澡刷牙上床", "繼續大聲遊戲"]],
	[["聽到提醒就收尾", "假裝沒聽見"], ["準備好再出發", "最後才找東西"]],
	[["先看衣服前後", "閉眼亂套"], ["卡住時請幫忙", "用力拉扯"]],
	[["用肥皂搓六部位", "只用水沖一下"], ["沖淨並擦乾", "把水甩得到處都是"]],
	[["每類食物試一點", "只拿甜點"], ["慢慢吃並喝水", "邊跑邊吃"]],
	[["路口先停看聽", "直接衝過去"], ["牽大人再通過", "自己跑到馬路上"]],
	[["先看老師示範", "打斷老師"], ["收好工具並道謝", "用完隨手亂丟"]],
	[["說出我的感受", "推人或摔東西"], ["深呼吸再求助", "繼續大吼"]],
	[["選一件家事", "等別人全部做"], ["完成後互相道謝", "做完就嘲笑別人"]],
	[["先回想正確步驟", "遇到就放棄"], ["全隊合作完成", "自己搶著做完"]]
];
var enhancedMissions = missions.map((m, i) => {
	const hero = m.hero === "全隊" ? "星隊長" : m.hero;
	const partner = partners[i];
	const steps = orderSets[i];
	return {
		...m,
		characters: [hero, partner],
		storyScenes: storySceneSets[i],
		dialogue: [
			{
				speaker: "星隊長",
				text: `小隊長，今晚的任務是${m.title}。我們要學會${m.goal}。`
			},
			{
				speaker: hero,
				text: m.story
			},
			{
				speaker: partner,
				text: `我會和你一起完成任務。記得：${m.tip}`
			}
		],
		visualChallenges: [
			{
				kind: "picture",
				title: "看圖找答案",
				prompt: `哪一張圖最符合「${m.goal}」？`,
				options: [{
					icon: sceneIcons[i],
					label: m.correct,
					ok: true
				}, {
					icon: wrongIcons[i],
					label: m.wrong,
					ok: false
				}]
			},
			{
				kind: "order",
				title: "步驟排排隊",
				prompt: "先選一張圖卡，再放進上方發光的編號空格。",
				steps,
				icons: orderIconSets[i]
			},
			{
				kind: "scene",
				title: "情境操作站",
				prompt: `幫${hero}選出最適合的任務工具。`,
				options: [{
					icon: tools[i],
					label: "任務工具",
					ok: true
				}, {
					icon: decoys[i],
					label: "不適合的工具",
					ok: false
				}]
			}
		],
		coopBattle: {
			monster: monsters[i],
			monsterIcon: [
				"🫧",
				"🦠",
				"☁️",
				"🌀",
				"🌫️",
				"☁️",
				"〰️",
				"🫧",
				"☁️",
				"🔴",
				"🔩",
				"🔥",
				"🌀",
				"👾"
			][i],
			heroes: [hero, partner],
			rounds: [{
				speaker: hero,
				prompt: `先幫${hero}選出正確的第一步。`,
				correct: tools[i],
				wrong: decoys[i],
				correctLabel: coopActionSets[i][0][0],
				wrongLabel: coopActionSets[i][0][1]
			}, {
				speaker: partner,
				prompt: `再幫${partner}選出接力完成的方法。`,
				correct: sceneIcons[i],
				wrong: wrongIcons[i],
				correctLabel: coopActionSets[i][1][0],
				wrongLabel: coopActionSets[i][1][1]
			}],
			thanks: `${hero}和${partner}互相說謝謝，${monsters[i]}變成一顆溫柔的小星星。`
		},
		audioAssets: {
			briefing: null,
			dialogue: [],
			feedback: null
		}
	};
});
//#endregion
//#region app/rescue-app.tsx
var import_jsx_runtime = require_jsx_runtime();
var baseProfile = (name, age, avatar) => ({
	name,
	age,
	avatar,
	main: [],
	math: [],
	phonics: [],
	visual: [],
	battle: [],
	stars: 0,
	lastSteps: {},
	seenTutorials: [],
	missionStartStars: {},
	orderState: {}
});
var initial = {
	version: 3,
	profiles: [baseProfile("小隊長 A", 3, avatars[4]), baseProfile("小隊長 B", 5, avatars[7])],
	active: 0,
	rate: .85,
	volume: .9
};
var steps = [
	"接收任務",
	"有聲故事",
	"生活判斷",
	"看圖找答案",
	"步驟排序",
	"情境操作",
	"合作任務",
	"支援任務",
	"基地晚安"
];
var characterProfiles = {
	星隊長: {
		role: "救援隊總指揮",
		personality: "冷靜、溫暖，會先聽大家說完。",
		skill: "安排任務、鼓勵合作"
	},
	大力: {
		role: "黃色工程車",
		personality: "可靠又有耐心，喜歡把東西整理好。",
		skill: "建造、分類、收納"
	},
	挖挖: {
		role: "橘色怪手",
		personality: "好奇又細心，會一步一步找線索。",
		skill: "清潔、挖掘、步驟排序"
	},
	高高: {
		role: "紅色雲梯車",
		personality: "勇敢但不冒失，遇到困難懂得求助。",
		skill: "安全觀念、登高救援"
	},
	小焰: {
		role: "紅色消防車",
		personality: "活潑又貼心，最會照顧大家的身體。",
		skill: "刷牙、洗手、情緒冷靜"
	},
	旋風: {
		role: "藍白直升機",
		personality: "觀察力很好，會從空中看清楚全局。",
		skill: "時間、方向、注音偵察"
	}
};
var characterFiles = {
	星隊長: "commander",
	大力: "dali",
	挖挖: "wawa",
	高高: "gaogao",
	小焰: "xiaoyan",
	旋風: "xuanfeng"
};
var behaviorArt = [
	{
		theme: "禮",
		good: [
			"先問好",
			"等一等",
			"輪流用"
		],
		bad: ["不問好", "伸手搶"]
	},
	{
		theme: "牙",
		good: [
			"刷外側",
			"刷內側",
			"刷咬合"
		],
		bad: ["只刷門牙", "後面沒刷"]
	},
	{
		theme: "浴",
		good: ["試水溫", "站穩洗"],
		bad: ["浴室奔跑", "容易滑倒"]
	},
	{
		theme: "收",
		good: ["先分類", "放回家"],
		bad: ["塞床底", "走道凌亂"]
	},
	{
		theme: "時",
		good: [
			"洗澡",
			"刷牙",
			"上床"
		],
		bad: ["半夜玩車", "沒有休息"]
	},
	{
		theme: "準",
		good: ["提早收尾", "準時出發"],
		bad: ["最後才找", "大家等待"]
	},
	{
		theme: "衣",
		good: ["看前後", "慢慢穿"],
		bad: ["用力拉扯", "衣服卡住"]
	},
	{
		theme: "手",
		good: ["飯前洗", "回家洗"],
		bad: ["看似乾淨", "就不洗手"]
	},
	{
		theme: "食",
		good: ["每類一點", "記得喝水"],
		bad: ["只吃甜點", "不喝水"]
	},
	{
		theme: "安",
		good: ["停看聽", "牽大人"],
		bad: ["直接衝過去", "沒有觀察"]
	},
	{
		theme: "師",
		good: ["聽示範", "收好道謝"],
		bad: ["打斷老師", "亂丟工具"]
	},
	{
		theme: "心",
		good: ["說出感受", "深呼吸"],
		bad: ["推人摔物", "傷害別人"]
	},
	{
		theme: "家",
		good: ["選一件事", "自己完成"],
		bad: ["都等別人", "不願幫忙"]
	},
	{
		theme: "星",
		good: ["先想步驟", "合作完成"],
		bad: ["立刻放棄", "不再嘗試"]
	}
];
function migrate(raw) {
	const src = raw || initial;
	return {
		version: 3,
		active: src.active ?? 0,
		rate: src.rate ?? .85,
		volume: src.volume ?? .9,
		profiles: (src.profiles || initial.profiles).map((p, i) => ({
			...baseProfile(p.name || `小隊長 ${i ? "B" : "A"}`, p.age === 5 ? 5 : 3, p.avatar || avatars[i ? 7 : 4]),
			...p,
			visual: Array.isArray(p.visual) ? p.visual : [],
			battle: Array.isArray(p.battle) ? p.battle : [],
			lastSteps: p.lastSteps || {},
			seenTutorials: Array.isArray(p.seenTutorials) ? p.seenTutorials : [],
			missionStartStars: p.missionStartStars || {},
			orderState: p.orderState || {}
		}))
	};
}
function Character({ name, state = "idle", small = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `character ${state} ${small ? "small" : ""}`,
		"aria-label": name,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "characterFrame",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: `/characters/${characterFiles[name]}.webp`,
				alt: name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "imageFallback",
				children: characters[name].icon
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: name })]
	});
}
function useVoice(rate, volume) {
	const [speaking, setSpeaking] = (0, import_react.useState)(false);
	const [paused, setPaused] = (0, import_react.useState)(false);
	const speak = (text, who = "星隊長", done) => {
		if (!("speechSynthesis" in window)) return;
		speechSynthesis.cancel();
		const cfg = characters[who], u = new SpeechSynthesisUtterance(text);
		const vs = speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith("zh"));
		u.lang = "zh-TW";
		u.rate = Math.max(.62, Math.min(1.05, rate * (cfg.rate / .82)));
		u.pitch = cfg.pitch;
		u.volume = volume;
		u.voice = vs[cfg.slot % Math.max(vs.length, 1)] || vs.find((v) => v.lang.toLowerCase().includes("zh-tw")) || null;
		u.onstart = () => {
			setSpeaking(true);
			setPaused(false);
		};
		u.onend = () => {
			setSpeaking(false);
			setPaused(false);
			done?.();
		};
		u.onerror = () => setSpeaking(false);
		speechSynthesis.speak(u);
	};
	return {
		speak,
		speaking,
		paused,
		pause: () => {
			speechSynthesis.pause();
			setPaused(true);
		},
		resume: () => {
			speechSynthesis.resume();
			setPaused(false);
		},
		stop: () => {
			speechSynthesis.cancel();
			setSpeaking(false);
		}
	};
}
function RescueApp() {
	const [store, setStore] = (0, import_react.useState)(initial), [ready, setReady] = (0, import_react.useState)(false);
	const [view, setView] = (0, import_react.useState)("home"), [day, setDay] = (0, import_react.useState)(1), [step, setStepState] = (0, import_react.useState)(0);
	const [branch, setBranch] = (0, import_react.useState)(null), [feedback, setFeedback] = (0, import_react.useState)("");
	const [dialogueIndex, setDialogueIndex] = (0, import_react.useState)(0), [selectedCard, setSelectedCard] = (0, import_react.useState)(null), [placed, setPlaced] = (0, import_react.useState)([]);
	const [battleRound, setBattleRound] = (0, import_react.useState)(0), [monsterPower, setMonsterPower] = (0, import_react.useState)(2);
	const [selectedTool, setSelectedTool] = (0, import_react.useState)(null), [sceneSolved, setSceneSolved] = (0, import_react.useState)(false), [tutorial, setTutorial] = (0, import_react.useState)(null);
	const [celebration, setCelebration] = (0, import_react.useState)(null);
	const profile = store.profiles[store.active], m = enhancedMissions[day - 1], voice = useVoice(store.rate, store.volume), storyText = m.dialogue[dialogueIndex];
	const autoRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		try {
			const old = localStorage.getItem("starlight-rescue-v2") || localStorage.getItem("starlight-rescue-v1");
			if (old) setStore(migrate(JSON.parse(old)));
		} catch {}
		setReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (ready) localStorage.setItem("starlight-rescue-v2", JSON.stringify(store));
	}, [store, ready]);
	(0, import_react.useEffect)(() => () => voice.stop(), []);
	const update = (patch) => setStore((s) => ({
		...s,
		profiles: s.profiles.map((p, i) => i === s.active ? {
			...p,
			...patch
		} : p)
	}));
	const addUnique = (field, value, star = true) => {
		const list = profile[field];
		if (list.includes(value)) return;
		update({
			[field]: [...list, value],
			stars: profile.stars + (star ? 1 : 0)
		});
	};
	const chime = () => {
		try {
			const ctx = new (window.AudioContext || window.webkitAudioContext)();
			[
				523,
				659,
				784
			].forEach((f, i) => {
				const o = ctx.createOscillator(), g = ctx.createGain();
				o.frequency.value = f;
				g.gain.setValueAtTime(.04, ctx.currentTime + i * .12);
				g.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + i * .12 + .32);
				o.connect(g);
				g.connect(ctx.destination);
				o.start(ctx.currentTime + i * .12);
				o.stop(ctx.currentTime + i * .12 + .34);
			});
		} catch {}
	};
	const celebrate = (who, title, done) => {
		chime();
		setCelebration({
			who,
			title
		});
		done?.();
	};
	const showTutorial = (kind) => {
		setTutorial(kind);
		if (!profile.seenTutorials.includes(kind)) update({ seenTutorials: [...profile.seenTutorials, kind] });
	};
	const setStep = (n) => {
		voice.stop();
		setFeedback("");
		setSelectedTool(null);
		if (n === 5) setSceneSolved(false);
		setStepState(n);
		update({ lastSteps: {
			...profile.lastSteps,
			[day]: n
		} });
		const kinds = {
			4: "排序",
			5: "情境",
			6: "合作"
		};
		if (kinds[n] && !profile.seenTutorials.includes(kinds[n])) setTimeout(() => showTutorial(kinds[n]), 250);
	};
	const openMission = (d) => {
		const dm = enhancedMissions[d - 1], saved = profile.orderState[d];
		setDay(d);
		setBranch(null);
		setFeedback("");
		setDialogueIndex(0);
		setBattleRound(0);
		setMonsterPower(profile.battle.includes(d) ? 0 : 2);
		setSelectedCard(null);
		setPlaced(saved?.length ? saved : Array(dm.visualChallenges[1].steps.length).fill(null));
		setSelectedTool(null);
		setSceneSolved(false);
		setView("mission");
		setStepState(profile.lastSteps[d] || 0);
		if (profile.missionStartStars[d] === void 0) update({ missionStartStars: {
			...profile.missionStartStars,
			[d]: profile.stars
		} });
	};
	const visualAnswer = (challenge, ok) => {
		if (ok) {
			setFeedback("");
			celebrate(m.characters[(challenge - 1) % 2], "答對了！", () => addUnique("visual", day * 10 + challenge));
		} else setFeedback("再觀察一次：看看角色真正需要哪一個做法。");
	};
	const pool = m.visualChallenges[1].steps.filter((x) => !placed.includes(x));
	const placeCard = (slot) => {
		if (!selectedCard) return;
		const next = [...placed];
		next[slot] = selectedCard;
		setPlaced(next);
		setSelectedCard(null);
		voice.speak(selectedCard, m.characters[0]);
		update({ orderState: {
			...profile.orderState,
			[day]: next
		} });
	};
	const removePlaced = (slot) => {
		const next = [...placed];
		next[slot] = null;
		setPlaced(next);
		update({ orderState: {
			...profile.orderState,
			[day]: next
		} });
	};
	const checkOrder = () => {
		if (placed.every((x, i) => x === m.visualChallenges[1].steps[i])) {
			setFeedback("");
			celebrate(m.characters[1], "順序完全正確！", () => addUnique("visual", day * 10 + 2));
		} else setFeedback("第一步還不太對。想想哪件事一定要最先做。");
	};
	const sceneTarget = () => {
		if (!selectedTool) {
			setFeedback("先從工具盤選一個工具，選好後再按橙色的下一步按鈕。");
			return;
		}
		if (selectedTool.ok) {
			setSceneSolved(true);
			setFeedback("");
			celebrate(m.characters[0], "場景修復成功！", () => addUnique("visual", day * 10 + 3));
		} else setFeedback("這個工具不適合。請改選另一張工具圖卡，再按橙色按鈕試試看。");
	};
	const battlePick = (ok) => {
		if (!ok) {
			setFeedback("這個技能還不適合。看看中間的小麻煩需要什麼。");
			return;
		}
		setMonsterPower((p) => p - 1);
		setFeedback("");
		if (battleRound === 0) {
			celebrate(m.coopBattle.heroes[0], "第一回合成功！");
			setBattleRound(1);
		} else celebrate(m.coopBattle.heroes[1], "合作成功！", () => addUnique("battle", day));
	};
	const playDialogue = (idx = dialogueIndex) => {
		const line = m.dialogue[idx];
		voice.speak(line.text, line.speaker, () => {
			if (autoRef.current && idx < m.dialogue.length - 1) {
				setDialogueIndex(idx + 1);
				playDialogue(idx + 1);
			}
		});
	};
	const progress = Math.round(profile.main.length / 14 * 100), enhancedDone = profile.visual.filter((v) => Math.floor(v / 10) === day).length;
	const dayStars = Math.max(0, profile.stars - (profile.missionStartStars[day] ?? profile.stars));
	const nextDay = Math.min(profile.main.length + 1, 14);
	const completePhonics = (0, import_react.useMemo)(() => profile.phonics.length, [profile.phonics]);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "loading",
		children: "正在開啟星光基地…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "topbar",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "brand",
				onClick: () => setView("home"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✦" }),
					" 星光救援指揮中心 ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
						className: "v2",
						children: "2.1"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setView("characters"),
					children: "角色圖鑑"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setView("map"),
					children: "任務地圖"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setView("parent"),
					children: "家長專區"
				})
			] })]
		}),
		view === "home" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "home",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "heroCopy",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "全新角色互動版"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
							"星光亮起，",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "救援隊集合！" })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "14 天生活力 × 數學 × 注音 × 合作任務" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "primary",
							onClick: () => setView("map"),
							children: "進入指揮中心 →"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "heroStats",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: profile.stars }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "任務星星" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [progress, "%"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "主線完成" })
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "profilePanel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "今天由誰出任務？"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "profileTabs",
					children: store.profiles.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: i === store.active ? "selected" : "",
						onClick: () => setStore((s) => ({
							...s,
							active: i
						})),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.avatar }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: p.name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [p.age, " 歲小隊長"] })
						]
					}, i))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "todayCard",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "dayFlag",
							children: "推薦任務 · 約 12–15 分鐘"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Character, {
							name: enhancedMissions[nextDay - 1].characters[0],
							small: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								"第 ",
								nextDay,
								" 天"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: enhancedMissions[nextDay - 1].title }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: enhancedMissions[nextDay - 1].goal })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "roundGo",
							onClick: () => openMission(nextDay),
							children: "→"
						})
					]
				})]
			})]
		}),
		view === "map" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "content roadPage",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sectionHead",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "從救援基地一路前往星光總部"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
						profile.avatar,
						" ",
						profile.name,
						" 的救援道路"
					] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "starPill",
						children: [
							"★ ",
							profile.stars,
							" 顆星"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mapLegend",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🏠 救援基地" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🚧 沿著道路前進" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🏰 星光總部" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "roadMap",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "roadLine" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "landmark base",
							children: ["🏠", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "救援基地" })]
						}),
						enhancedMissions.map((x, i) => {
							const current = x.day === nextDay, done = profile.main.includes(x.day), who = x.characters[0];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: `roadStop side${i % 2} ${done ? "done" : ""} ${current ? "current" : ""}`,
								onClick: () => openMission(x.day),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "stopDay",
										children: x.day
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: done ? "★" : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: `/characters/${characterFiles[who]}.webp`,
										alt: who
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: x.title }),
									current && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "從這裡繼續" })
								]
							}, x.day);
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "landmark finish",
							children: ["🏰", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "星光總部" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "scenery hill",
							children: "⛰️"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "scenery bridge",
							children: "🌉"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "scenery school",
							children: "🏫"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "scenery city",
							children: "🏙️"
						})
					]
				})
			]
		}),
		view === "mission" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "missionView",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "back",
					onClick: () => {
						voice.stop();
						setView("map");
					},
					children: "← 返回任務地圖"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "missionTitleV2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Character, {
						name: m.characters[0],
						state: voice.speaking ? "talk" : "idle"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "eyebrow",
							children: [
								"DAY ",
								day,
								" · ",
								m.hero,
								" 出動 · 已完成新增關卡 ",
								enhancedDone,
								"/3"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: m.title }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: m.goal })
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "stepper v2steps",
					children: steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: step === i ? "active" : step > i ? "past" : "",
						onClick: () => setStep(i),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: step > i ? "✓" : i + 1 }), s]
					}, s))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "stage visualStage",
					children: [
						step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Scene, {
							who: "星隊長",
							title: "星隊長的任務簡報",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["今晚要學會：", m.goal] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "bigTip",
									children: [
										"「",
										m.tip,
										"」"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceButton, {
									onClick: () => voice.speak(`${m.title}。今晚要學會${m.goal}。${m.tip}`, "星隊長"),
									label: "聽星隊長說"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Next, {
									onClick: () => setStep(1),
									label: "收到，開始任務"
								})
							]
						}),
						step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dialogueStage",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "tonightCast",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "eyebrow",
										children: "今晚登場角色"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: m.characters.map((who) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Character, {
										name: who,
										small: true
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: who }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: characterProfiles[who].role }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: characterProfiles[who].personality })
									] })] }, who)) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "storyScene",
									"aria-label": `第 ${dialogueIndex + 1} 段情境圖`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "sceneSky",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✦" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "☾" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "sceneEmoji",
											children: m.storyScenes[dialogueIndex]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: dialogueIndex === 0 ? "任務發生了" : dialogueIndex === 1 ? "隊員正在行動" : "大家合作完成" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "speakerPanel",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Character, {
										name: storyText.speaker,
										state: voice.speaking ? "talk" : "idle"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "speechBubble",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "eyebrow",
												children: [
													"有聲故事 · 第 ",
													dialogueIndex + 1,
													"/",
													m.dialogue.length,
													" 段"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: storyText.speaker }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: storyText.text })
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "audioConsole",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											disabled: dialogueIndex === 0,
											onClick: () => {
												setDialogueIndex((i) => i - 1);
												voice.stop();
											},
											children: "上一段"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: "play",
											onClick: () => voice.speaking ? voice.paused ? voice.resume() : voice.pause() : playDialogue(),
											children: voice.speaking ? voice.paused ? "▶ 繼續" : "Ⅱ 暫停" : "▶ 播放"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											disabled: dialogueIndex === m.dialogue.length - 1,
											onClick: () => {
												setDialogueIndex((i) => i + 1);
												voice.stop();
											},
											children: "下一段"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => playDialogue(),
											children: "↻ 重播"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: autoRef.current,
											onChange: (e) => {
												autoRef.current = e.target.checked;
											}
										}), " 自動播放"] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Next, {
									onClick: () => setStep(2),
									label: "故事聽完了"
								})
							]
						}),
						step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Scene, {
							who: m.characters[0],
							title: "生活判斷任務",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "哪一個做法最棒？" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionGuide, { items: [
									"看兩張情境圖",
									"選出好方法",
									"獲得星星"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pictureChoices",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Picture, {
										day,
										ok: true,
										label: m.correct,
										onClick: () => celebrate(m.characters[0], "答對了！", () => addUnique("main", day))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Picture, {
										day,
										ok: false,
										label: m.wrong,
										onClick: () => setFeedback("再想一想，看看角色需要的是安全、整潔還是尊重。")
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feedback, { text: feedback }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Next, {
									onClick: () => setStep(3),
									label: "前往看圖任務"
								})
							]
						}),
						step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ChallengeHead, {
							m,
							index: 0,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pictureChoices",
									children: m.visualChallenges[0].options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Picture, {
										day,
										ok: o.ok,
										label: o.label,
										onClick: () => visualAnswer(1, o.ok)
									}, o.label))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feedback, { text: feedback }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Next, {
									onClick: () => setStep(4),
									label: "前往步驟排序"
								})
							]
						}),
						step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ChallengeHead, {
							m,
							index: 1,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TutorialButton, { onClick: () => showTutorial("排序") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionGuide, { items: [
									"選下面圖卡",
									"放進發光空格",
									"全部放滿再檢查"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "orderSlots",
									children: placed.map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: `${x ? "filled" : ""} ${selectedCard && !x ? "ready" : ""}`,
										onClick: () => x ? removePlaced(i) : placeCard(i),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: i + 1 }), x ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "stepPicture",
											children: m.visualChallenges[1].icons[m.visualChallenges[1].steps.indexOf(x)]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: x })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
											"放第 ",
											i + 1,
											" 步"
										] })]
									}, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "trayLabel",
									children: "👇 先選一張步驟圖卡"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "cardTray",
									children: pool.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: selectedCard === x ? "selected" : "",
										onClick: () => setSelectedCard(x),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m.visualChallenges[1].icons[m.visualChallenges[1].steps.indexOf(x)] }), x]
									}, x))
								}),
								placed.every(Boolean) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "checkBtn bigCheck",
									onClick: checkOrder,
									children: "✓ 全部放好了，檢查順序"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feedback, { text: feedback }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Next, {
									onClick: () => setStep(5),
									label: "前往情境操作"
								})
							]
						}),
						step === 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ChallengeHead, {
							m,
							index: 2,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TutorialButton, { onClick: () => showTutorial("情境") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionGuide, { items: [
									"選一個工具",
									"按橙色下一步",
									"看看場景變化"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sceneGame",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "sceneProblem",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Character, {
													name: m.characters[0],
													state: sceneSolved ? "success" : "think",
													small: true
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: sceneSolved ? "任務完成，場景恢復了！" : `問題：${m.goal}` }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													className: `targetZone ${selectedTool ? "ready" : ""} ${sceneSolved ? "fixed" : ""}`,
													onClick: sceneTarget,
													children: sceneSolved ? "✨ 完成" : "↓ 把工具用在這裡"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "trayLabel",
											children: "工具盤：先選一個工具"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "toolTray",
											children: m.visualChallenges[2].options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												className: selectedTool?.icon === o.icon ? "selected" : "",
												onClick: () => {
													setSelectedTool({
														icon: o.icon,
														label: o.label,
														ok: o.ok
													});
													setFeedback(`已選「${o.label}」。請按下面的橙色按鈕。`);
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: o.icon }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: o.label })]
											}, o.label))
										}),
										selectedTool && !sceneSolved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											className: "sceneApplyButton",
											onClick: sceneTarget,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "下一步" }),
												"把「",
												selectedTool.label,
												"」用到場景裡 →"
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feedback, { text: feedback }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Next, {
									onClick: () => setStep(6),
									label: "前往合作任務"
								})
							]
						}),
						step === 6 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "battleStage",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "兩位角色接力 · 每人完成一個生活步驟"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
									"選對兩個做法，讓「",
									m.coopBattle.monster,
									"」變成星星！"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TutorialButton, { onClick: () => showTutorial("合作") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionGuide, { items: [
									"看輪到哪位角色",
									"選出正確做法",
									"交棒給下一位"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "turnBanner",
									children: [
										store.profiles.length > 1 ? `${store.profiles[battleRound]?.avatar || profile.avatar} ${store.profiles[battleRound]?.name || profile.name}` : `第 ${battleRound + 1} 回合`,
										"，請幫 ",
										m.coopBattle.rounds[battleRound]?.speaker,
										" 選方法！"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "battleArena",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Character, {
											name: m.coopBattle.heroes[0],
											state: battleRound === 0 ? "talk" : "success"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `friendlyMonster fixedPower${monsterPower}`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonsterPicture, {
													name: m.coopBattle.monster,
													power: monsterPower
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: monsterPower === 0 ? "變成小星星！" : m.coopBattle.monster }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: [0, 1].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: i >= monsterPower ? "off" : "" }, i)) })
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Character, {
											name: m.coopBattle.heroes[1],
											state: battleRound === 1 ? "talk" : "idle"
										})
									]
								}),
								monsterPower > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "turnCue",
										children: m.coopBattle.rounds[battleRound].prompt
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceButton, {
										onClick: () => voice.speak(`${m.coopBattle.rounds[battleRound].prompt} 可以選 ${m.coopBattle.rounds[battleRound].correctLabel}，或是 ${m.coopBattle.rounds[battleRound].wrongLabel}。`, m.coopBattle.rounds[battleRound].speaker),
										label: "聽題目和兩個做法"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "skillRow actionSkills",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => battlePick(true),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "方法 A" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: m.coopBattle.rounds[battleRound].correctLabel }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "點一下選這個做法" })
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => battlePick(false),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "方法 B" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: m.coopBattle.rounds[battleRound].wrongLabel }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "點一下選這個做法" })
											]
										})]
									})
								] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "victory",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "合作成功！" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: m.coopBattle.thanks })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feedback, { text: feedback }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Next, {
									onClick: () => setStep(7),
									label: "前往支援任務"
								})
							]
						}),
						step === 7 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "branchStage",
							children: !branch ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "自由選擇 · 另一關可隨時補玩"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "要去哪一座支援站？" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "branchChoice",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setBranch("math"),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "∑" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "數學補給站" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "數量、圖形、規律與空間" })
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setBranch("phonics"),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ㄅ" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "注音通訊站" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "聽音、認形、找朋友" })
										]
									})]
								})
							] }) : branch === "math" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "quizCard",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "textBack",
										onClick: () => setBranch(null),
										children: "← 換一座支援站"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: m.math.prompt }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mathVisual",
										children: m.math.visual
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "answerRow",
										children: m.math.options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => {
												setFeedback(o === m.math.answer ? "任務成功，獲得數學星！" : "再數一次看看。");
												if (o === m.math.answer) addUnique("math", day);
											},
											children: o
										}, o))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feedback, { text: feedback }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Next, {
										onClick: () => setStep(8),
										label: "完成，回基地"
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "quizCard",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "textBack",
										onClick: () => setBranch(null),
										children: "← 換一座支援站"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: day === 14 ? "37 個注音總複習" : `今天認識 ${m.phonics.join("、")}` }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `phonicsSet ${day === 14 ? "all" : ""}`,
										children: m.phonics.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => voice.speak(p, "旋風"),
											children: [p, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "點我聽音" })]
										}, p))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "checkBtn",
										onClick: () => {
											addUnique("phonics", day);
											setFeedback("注音通訊完成！");
										},
										children: "完成今天的注音"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feedback, { text: feedback }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Next, {
										onClick: () => setStep(8),
										label: "完成，回基地"
									})
								]
							})
						}),
						step === 8 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "goodnight",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Character, {
									name: m.characters[1],
									state: "success"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "基地燈光已調暗"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["晚安，", profile.name] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"今天完成了「",
									m.title,
									"」。",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"生活實作：",
									m.practice
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "dayReward",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
											"今天獲得 ",
											dayStars,
											" 顆星"
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "starCollection",
											children: dayStars > 0 ? Array.from({ length: dayStars }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												style: { animationDelay: `${i * .12}s` },
												children: "★"
											}, i)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "☆ 完成一個未完成任務就能獲得星星" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
											"累積共 ",
											profile.stars,
											" 顆任務星"
										] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceButton, {
									onClick: () => voice.speak(`晚安，${profile.name}。今天獲得${dayStars}顆星，累積共有${profile.stars}顆。`, "星隊長"),
									label: "聽晚安祝福"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Next, {
									onClick: () => setView("map"),
									label: "收下星星，查看地圖"
								})
							]
						})
					]
				})
			]
		}),
		tutorial && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tutorial, {
			kind: tutorial,
			onClose: () => setTutorial(null)
		}),
		celebration && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Celebration, {
			data: celebration,
			onClose: () => setCelebration(null)
		}),
		view === "characters" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "content characterDex",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sectionHead",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "先認識夥伴，再開始故事"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "星光救援隊角色圖鑑" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "點擊「聽我介紹」就能聽角色自己說話。" })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "download",
					onClick: () => setView("map"),
					children: "前往任務地圖 →"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dexGrid",
				children: Object.keys(characterProfiles).map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Character, { name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: characterProfiles[name].role
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: name }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: characterProfiles[name].personality }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "skillTag",
						children: ["擅長：", characterProfiles[name].skill]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceButton, {
						label: "聽我介紹",
						onClick: () => voice.speak(`你好，我是${name}，我是${characterProfiles[name].role}。${characterProfiles[name].personality}我最擅長${characterProfiles[name].skill}。`, name)
					})
				] })] }, name))
			})]
		}),
		view === "parent" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "content parent",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sectionHead",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "家長專區 · 2.1"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "陪伴成長，不比較快慢" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "download",
						onClick: () => window.open("/parent-guide.pdf", "_blank"),
						children: "↓ 下載新版 A4 手冊"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "parentGrid",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "profileEditor",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "孩子檔案" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["暱稱", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: profile.name,
								maxLength: 8,
								onChange: (e) => update({ name: e.target.value })
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["年齡", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ageBtns",
								children: [3, 5].map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: profile.age === a ? "active" : "",
									onClick: () => update({ age: a }),
									children: [a, " 歲"]
								}, a))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "選擇頭像" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "avatarGrid",
								children: avatars.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: profile.avatar === a ? "active" : "",
									onClick: () => update({ avatar: a }),
									children: a
								}, a))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "report",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [profile.name, " 的成長紀錄"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "reportRows",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "生活主線" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [profile.main.length, "/14"] })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "新增闖關" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [profile.visual.length, "/42"] })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "合作任務" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [profile.battle.length, "/14"] })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "數學補給" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [profile.math.length, "/14"] })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "注音通訊" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [completePhonics, "/14"] })] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
								"角色語速 ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [store.rate.toFixed(2), "×"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: ".65",
									max: "1.05",
									step: ".05",
									value: store.rate,
									onChange: (e) => setStore((s) => ({
										...s,
										rate: Number(e.target.value)
									}))
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
								"語音音量 ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [Math.round(store.volume * 100), "%"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: "0",
									max: "1",
									step: ".1",
									value: store.volume,
									onChange: (e) => setStore((s) => ({
										...s,
										volume: Number(e.target.value)
									}))
								})
							] })
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "guidance",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "2.1 陪玩提示" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "3 歲" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"看大圖、聽角色說話、完成三步驟即可；排序時由家長讀出卡片。"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "5 歲" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"鼓勵孩子說明選擇原因，並獨立完成四步驟排序。"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "雙人合作" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"合作任務會提示兩位孩子輪流操作；只有一位孩子也能完成兩回合。"
						] })
					] })]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✦ 星光救援指揮中心 2.1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "所有進度只保存在這台裝置" })] })
	] });
}
function Scene({ who, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "sceneLayout",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Character, { name: who }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sceneContent",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: title
			}), children]
		})]
	});
}
function ChallengeHead({ m, index, children }) {
	const c = m.visualChallenges[index];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "challengeWrap",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "challengeIntro",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Character, {
				name: m.characters[index % 2],
				state: "think",
				small: true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "eyebrow",
					children: [
						"新增闖關 ",
						index + 1,
						"/3"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: c.title }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: c.prompt })
			] })]
		}), children]
	});
}
function Picture({ day, ok, label, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: "pictureCard behaviorCard",
		onClick,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BehaviorPicture, {
				day,
				ok
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: label }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "點一下選擇" })
		]
	});
}
function BehaviorPicture({ day, ok }) {
	const art = behaviorArt[day - 1], cues = ok ? art.good : art.bad;
	if (day === 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "behaviorPicture",
		viewBox: "0 0 320 170",
		role: "img",
		"aria-label": ok ? "牙刷清潔外側、內側與咬合面" : "牙刷只清潔前排門牙",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "320",
				height: "170",
				rx: "22",
				fill: ok ? "#e5f5f1" : "#fff0df"
			}),
			[
				55,
				125,
				195
			].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: `M${x} 45 C${x - 18} 45 ${x - 20} 68 ${x - 12} 88 L${x - 5} 116 C${x} 132 ${x + 9} 132 ${x + 14} 116 L${x + 25} 88 C${x + 33} 65 ${x + 18} 45 ${x} 45Z`,
				fill: "#fff",
				stroke: "#173b54",
				strokeWidth: "5"
			}, x)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				transform: ok ? "translate(38 70) rotate(-13)" : "translate(38 70) rotate(-13)",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						width: ok ? "230" : "78",
						height: "16",
						rx: "8",
						fill: "#2b718b"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: ok ? "205" : "53",
						y: "-8",
						width: "35",
						height: "32",
						rx: "7",
						fill: "#f6a623"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: ok ? "M208 -4v25M219 -4v25M230 -4v25" : "M56 -4v25M67 -4v25M78 -4v25",
						stroke: "#fff",
						strokeWidth: "3"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "285",
				cy: "30",
				r: "21",
				fill: ok ? "#68a84f" : "#df8b35"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: ok ? "M275 30l7 7 13-16" : "M276 21l18 18M294 21l-18 18",
				fill: "none",
				stroke: "#fff",
				strokeWidth: "6",
				strokeLinecap: "round"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "behaviorPicture",
		viewBox: "0 0 320 170",
		role: "img",
		"aria-label": `${art.theme}：${cues.join("、")}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "320",
				height: "170",
				rx: "22",
				fill: ok ? "#e5f5f1" : "#fff0df"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "72",
				cy: "82",
				r: "48",
				fill: ok ? "#2b718b" : "#c96b43"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "72",
				y: "99",
				textAnchor: "middle",
				fontSize: "48",
				fontWeight: "900",
				fill: "#fff",
				children: art.theme
			}),
			cues.map((cue, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				transform: `translate(135 ${35 + i * 58})`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					width: "150",
					height: "44",
					rx: "14",
					fill: "#fff",
					stroke: ok ? "#79aa9c" : "#dea17e",
					strokeWidth: "3"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "75",
					y: "29",
					textAnchor: "middle",
					fontSize: "19",
					fontWeight: "800",
					fill: "#173b54",
					children: cue
				})]
			}, cue)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "294",
				cy: "24",
				r: "18",
				fill: ok ? "#68a84f" : "#df8b35"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: ok ? "M286 24l6 6 10-14" : "M287 17l14 14M301 17l-14 14",
				fill: "none",
				stroke: "#fff",
				strokeWidth: "5",
				strokeLinecap: "round"
			})
		]
	});
}
function MonsterPicture({ name, power }) {
	const mark = {
		"搶話泡泡": "話",
		"牙菌小怪": "菌",
		"灰塵雲": "塵",
		"混亂團": "亂",
		"時間迷霧": "時",
		"拖延雲": "拖",
		"皺衣球": "衣",
		"髒污泡泡": "髒",
		"偏食雲": "食",
		"冒失球": "衝",
		"急躁螺絲": "急",
		"生氣火球": "氣",
		"家事亂流": "家",
		"忘記怪": "忘"
	};
	if (power === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "monsterPicture",
		viewBox: "0 0 150 120",
		role: "img",
		"aria-label": "合作星星",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M75 10l16 34 38 5-28 26 8 37-34-19-34 19 8-37-28-26 38-5z",
				fill: "#ffd15c",
				stroke: "#9f6710",
				strokeWidth: "6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "62",
				cy: "64",
				r: "4",
				fill: "#173b54"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "88",
				cy: "64",
				r: "4",
				fill: "#173b54"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M62 76q13 12 26 0",
				fill: "none",
				stroke: "#173b54",
				strokeWidth: "4",
				strokeLinecap: "round"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "monsterPicture",
		viewBox: "0 0 150 120",
		role: "img",
		"aria-label": `${name}圖案`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M38 92C12 86 15 56 35 51C27 24 58 10 76 29C96 8 126 26 119 52C143 61 135 94 111 94Z",
				fill: power === 2 ? "#d7e8ed" : "#edf3dd",
				stroke: "#2b718b",
				strokeWidth: "6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M31 43h43l12 12-12 12H31c-12 0-12-24 0-24Z",
				fill: "#fff",
				stroke: "#f0a52f",
				strokeWidth: "4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M76 24h39c12 0 12 24 0 24H88L76 58Z",
				fill: "#fff",
				stroke: "#f0a52f",
				strokeWidth: "4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "76",
				y: "91",
				textAnchor: "middle",
				fontSize: "31",
				fontWeight: "900",
				fill: "#173b54",
				children: mark[name] || "困"
			})
		]
	});
}
function Feedback({ text }) {
	return text ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "feedback",
		children: text
	}) : null;
}
function Next({ onClick, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: "primary nextBtn",
		onClick,
		children: [label, " →"]
	});
}
function VoiceButton({ onClick, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: "listen",
		onClick,
		children: ["🔊 ", label]
	});
}
function TutorialButton({ onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: "tutorialBtn",
		onClick,
		children: "👆 再看一次玩法示範"
	});
}
function ActionGuide({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "actionGuide",
		children: items.map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: i + 1 }),
			x,
			i < items.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "→" })
		] }, x))
	});
}
function Tutorial({ kind, onClose }) {
	const d = {
		排序: {
			title: "步驟排序這樣玩",
			steps: [
				"點下面一張卡片",
				"點上面發光空格",
				"放滿後按檢查"
			],
			demo: "🧩　☝️　➡️　1️⃣"
		},
		情境: {
			title: "情境操作這樣玩",
			steps: [
				"先從工具盤選工具",
				"再點場景發光處",
				"看問題被修好"
			],
			demo: "🧰　☝️　➡️　✨"
		},
		合作: {
			title: "合作任務這樣玩",
			steps: [
				"看現在輪到誰",
				"選一個合作技能",
				"兩回合都完成"
			],
			demo: "🚒　🤝　🚁"
		}
	}[kind];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "tutorialOverlay",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tutorialCard",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "角色示範"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: d.title }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "handDemo",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: d.demo }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "👆" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: d.steps.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: x }, x)) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "primary",
					onClick: onClose,
					children: "我會了，換我玩！"
				})
			]
		})
	});
}
function Celebration({ data, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "celebrationOverlay",
		role: "dialog",
		"aria-live": "assertive",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "celebrationBurst",
			children: Array.from({ length: 9 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "★" }, i))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "celebrationCard",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Character, {
					name: data.who,
					state: "success"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: data.title }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "太棒了！你得到一顆任務星" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flyingStar",
					children: "★"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "primary celebrationContinue",
					autoFocus: true,
					onClick: onClose,
					children: "繼續闖關 →"
				})
			]
		})]
	});
}
//#endregion
export { RescueApp as default };
