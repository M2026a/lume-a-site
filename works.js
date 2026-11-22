/*
  制作見本とLINEスタンプの一覧。
  作品を足す・入れ替えるときは、この配列だけを書き換えます（HTMLは触らなくて大丈夫です）。
  - TYPE A：開いて体験するWebサイト（href にページへのリンク）
  - TYPE B：映像で見るLPデザイン（video があれば再生、full でLP全体の画像）
      cat：絞り込みの分類（categories のどれか）
      reel：true にすると、作品ギャラリーの上の「縦動画の帯」で自動再生する（6本くらいまで）
*/
window.LUMEA_WORKS = {
  categories: ["教室・講座", "物販・定期便", "店舗・サービス", "イベント・アプリ"],
  typeA: [
    { title: "café muku", kind: "店舗型HP・3ページ", note: "トップ・メニュー・お店について。写真で伝える店舗サイト。", thumb: "works/hp-muku.webp", href: "samples/hp-muku/index.html" },
    { title: "クリーンホーム", kind: "地域サービス型HP・3ページ", note: "サービス・料金・依頼の流れから、相談画面まで。", thumb: "works/hp-clean.webp", href: "samples/hp-clean/index.html" },
    { title: "MINATO WORKS", kind: "企業型HP・3ページ", note: "事業案内・会社情報・問い合わせをまとめた企業サイト。", thumb: "works/hp-minato.webp", href: "samples/hp-minato/index.html" },
    { title: "SEREIN", kind: "美容サロン型HP・動きあり", note: "静かな動きと予約の操作例を備えたサロンサイト。", thumb: "works/hp-serein.webp", href: "samples/hp-serein/index.html" },
    { title: "PULSE CITY", kind: "イベント型HP・動きあり", note: "常に動く演出と時間帯の切り替えを体験。", thumb: "works/hp-pulse.webp", href: "samples/hp-pulse/index.html" },
    { title: "YORIMICHI MARKET", kind: "街歩きイベント型HP・実写動画", note: "人が行き交う夜の街を、映像で体験。", thumb: "works/hp-yorimichi.webp", href: "samples/hp-yorimichi/index.html" },
    { title: "クリーンホーム", kind: "清掃・見積もり案内LP", note: "料金と依頼の流れを見せて、相談へつなぐページ。", thumb: "works/lp-clean.webp", href: "samples/clean/index.html" },
    { title: "PERSONAL GYM FIT", kind: "ジム・体験案内LP", note: "体験内容・プラン・申込の流れを分かりやすく。", thumb: "works/lp-gym.webp", href: "samples/gym/index.html" },
    { title: "nail salon nico", kind: "美容サロン・予約案内LP", note: "施術写真・料金・予約の流れを、ひとつのページに。", thumb: "works/lp-nico.webp", href: "samples/nico/index.html" },
    { title: "café muku", kind: "カフェ・店舗紹介LP", note: "写真とメニューで、お店の雰囲気を伝えるページ。", thumb: "works/lp-muku.webp", href: "samples/muku/index.html" }
  ],
  typeB: [
    { title: "夜のハーブティー", kind: "物販・ハーブティー", cat: "物販・定期便", reel: true, thumb: "works/herbtea.webp", full: "works/herbtea-full.webp", video: "videos/herbtea.mp4" },
    { title: "金継ぎ教室", kind: "教室・大人の習いごと", cat: "教室・講座", reel: true, thumb: "works/kintsugi.webp", full: "works/kintsugi-full.webp", video: "videos/kintsugi.mp4" },
    { title: "一日一組の宿", kind: "宿・予約", cat: "店舗・サービス", reel: true, thumb: "works/yururi.webp", full: "works/yururi-full.webp", video: "videos/yururi.mp4" },
    { title: "シフト表アプリ", kind: "業務アプリ・飲食店向け", cat: "イベント・アプリ", reel: true, thumb: "works/shiftpon.webp", full: "works/shiftpon-full.webp", video: "videos/shiftpon.mp4" },
    { title: "町の自転車屋 冬の点検フェア", kind: "店舗・キャンペーン", cat: "店舗・サービス", reel: true, thumb: "works/jitensha.webp", full: "works/jitensha-full.webp", video: "videos/jitensha.mp4" },
    { title: "大人のはじめてのバレエ", kind: "スクール・体験レッスン", cat: "教室・講座", reel: true, thumb: "works/ballet.webp", full: "works/ballet-full.webp", video: "videos/ballet.mp4" },
    { title: "親子の星空キャンプ", kind: "イベント・参加募集", cat: "イベント・アプリ", thumb: "works/hoshizora.webp", full: "works/hoshizora-full.webp", video: "videos/hoshizora.mp4" },
    { title: "LINE公式アカウント入門ウェビナー", kind: "ウェビナー・無料参加", cat: "教室・講座", thumb: "works/mise-webinar.webp", full: "works/mise-webinar-full.webp", video: "videos/mise-webinar.mp4" },
    { title: "Excel VBA講座", kind: "オンライン講座", cat: "教室・講座", thumb: "works/teijimacro.webp", full: "works/teijimacro-full.webp", video: "videos/teijimacro.mp4" },
    { title: "冷凍おかずの定期便", kind: "食品・定期便", cat: "物販・定期便", thumb: "works/totonoe.webp", full: "works/totonoe-full.webp", video: "videos/totonoe.mp4" },
    { title: "プロフィール写真の撮影", kind: "写真スタジオ・予約", cat: "店舗・サービス", thumb: "works/hikariphoto.webp", full: "works/hikariphoto-full.webp", video: "videos/hikariphoto.mp4" },
    { title: "シニア猫のペットシッター", kind: "訪問サービス・事前相談", cat: "店舗・サービス", thumb: "works/nyagomi.webp", full: "works/nyagomi-full.webp", video: "videos/nyagomi.mp4" }
  ],
  stamps: [
    { title: "動く♪バーニーズの日常①", tag: "バーニーズ / 日常の返事 / 動くスタンプ", img: "stamps/work-37800771.webp", href: "https://store.line.me/stickershop/product/37800771/ja" },
    { title: "チワワの大きな文字・丁寧な敬語40", tag: "チワワ / 丁寧な敬語", img: "stamps/work-37329690.webp", href: "https://store.line.me/stickershop/product/37329690/ja" },
    { title: "動く♪ふわもこトイプードルの日常①", tag: "トイプードル / 日常の返事 / 動くスタンプ", img: "stamps/work-37635927.webp", href: "https://store.line.me/stickershop/product/37635927/ja" },
    { title: "ゴールデンの家族連絡40", tag: "ゴールデン / 家族連絡", img: "stamps/work-37329983.webp", href: "https://store.line.me/stickershop/product/37329983/ja" },
    { title: "ブラックタンダックスの丁寧な敬語40", tag: "ダックス / 丁寧な敬語", img: "stamps/work-37352565.webp", href: "https://store.line.me/stickershop/product/37352565/ja" },
    { title: "チワワ やさしい気づかいと応援40", tag: "チワワ / 気づかい・応援", img: "stamps/work-37419871.webp", href: "https://store.line.me/stickershop/product/37419871/ja" },
    { title: "動く♪ゴールデンの日常①", tag: "ゴールデン / 日常の返事 / 動くスタンプ", img: "stamps/work-37575769.webp", href: "https://store.line.me/stickershop/product/37575769/ja" },
    { title: "動く♪こげ茶トイプードルの日常②", tag: "トイプードル / 日常の返事 / 動くスタンプ", img: "stamps/work-37588826.webp", href: "https://store.line.me/stickershop/product/37588826/ja" },
    { title: "動く♪チワワの日常①", tag: "チワワ / 日常の返事 / 動くスタンプ", img: "stamps/work-37575766.webp", href: "https://store.line.me/stickershop/product/37575766/ja" },
    { title: "動く♪黒カニヘンダックスの日常①", tag: "ダックス / 日常の返事 / 動くスタンプ", img: "stamps/work-37575716.webp", href: "https://store.line.me/stickershop/product/37575716/ja" },
    { title: "ダックスの大きな文字・日常40", tag: "ダックス / 日常の返事", img: "stamps/work-37329881.webp", href: "https://store.line.me/stickershop/product/37329881/ja" },
    { title: "ゴールデンの丁寧な敬語40", tag: "ゴールデン / 丁寧な敬語", img: "stamps/work-37329676.webp", href: "https://store.line.me/stickershop/product/37329676/ja" },
    { title: "ダックスの大きな文字・丁寧な敬語40", tag: "ダックス / 丁寧な敬語", img: "stamps/work-37329675.webp", href: "https://store.line.me/stickershop/product/37329675/ja" },
    { title: "チワワの家族連絡・大きな文字40", tag: "チワワ / 家族連絡", img: "stamps/work-37329918.webp", href: "https://store.line.me/stickershop/product/37329918/ja" },
    { title: "ブラックタンダックスの家族連絡40", tag: "ダックス / 家族連絡", img: "stamps/work-37352590.webp", href: "https://store.line.me/stickershop/product/37352590/ja" },
    { title: "黒タンダックス やさしい気づかいと応援40", tag: "ダックス / 気づかい・応援", img: "stamps/work-37419863.webp", href: "https://store.line.me/stickershop/product/37419863/ja" },
    { title: "ゴールデン やさしい気づかいと応援40", tag: "ゴールデン / 気づかい・応援", img: "stamps/work-37419875.webp", href: "https://store.line.me/stickershop/product/37419875/ja" },
    { title: "ゴールデン 冬と年末年始40", tag: "ゴールデン / 季節の言葉", img: "stamps/work-37442093.webp", href: "https://store.line.me/stickershop/product/37442093/ja" },
    { title: "カメラ好き茶トラ猫の日常40", tag: "茶トラ猫 / カメラ", img: "stamps/work-37329674.webp", href: "https://store.line.me/stickershop/product/37329674/ja" },
    { title: "シェルティ「ありがとう！」", tag: "シェルティ / 制作サンプル・ショップ未掲載", img: "stamps/work-sheltie-thanks.webp", href: "" }
  ]
};
