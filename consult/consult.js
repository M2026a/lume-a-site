/* LUME-A Studio 相談シミュレーター（外部への送信は一切しない。メモはこの端末の中だけ） */
(function () {
  'use strict';

  // メールの宛先。変わったらここだけ書き換える
  var MAIL_TO = 'lumea.studio.works@gmail.com';

  var KINDS = {
    hp: {
      label: 'ホームページ（お店や事業のサイト）',
      qs: [
        { q: 'どんなお店・事業ですか？', hint: '一言で大丈夫です。いまのHPやSNSがあれば下のURL欄へ。',
          chips: ['飲食店・カフェ', 'サロン・教室', '工務店・職人', '士業・相談業', '会社・団体'],
          ph: '例：駅前で10年続く、夫婦2人のパン屋です' },
        { q: 'HPを見た人に、何を知ってほしいですか？', hint: 'いちばん伝えたいことから順に。',
          chips: ['お店の雰囲気', 'メニュー・料金', 'つくり手の想い', '場所・営業時間', '実績・事例'],
          ph: '例：毎朝4時から焼いていること、予約すると取り置きできること' },
        { q: '見た人に、何をしてほしいですか？', hint: '来店・予約・問い合わせなど。',
          chips: ['来店してほしい', '予約してほしい', '問い合わせてほしい', '採用に応募してほしい'],
          ph: '例：近所の人に、まず一度来店してほしい' }
      ]
    },
    lp: {
      label: 'LP（販売・申込のページ）',
      qs: [
        { q: '誰に届けたいですか？', hint: '顔が浮かぶくらい1人に絞ると、刺さるLPになります。',
          chips: ['30〜40代の女性', '近所に住む家族連れ', '個人事業主', 'はじめての人'],
          ph: '例：仕事帰りに立ち寄れるカフェを探している、30代の会社員' },
        { q: 'その人の困りごとを、商品でどう解決しますか？', hint: '商品説明やURLの貼り付けでも大丈夫です。',
          chips: ['時間がない', '何を選べばいいか分からない', '続かない', '自分に合うか不安'],
          ph: '例：忙しくて朝ごはんを抜きがち → 5分で受け取れるモーニングセット' },
        { q: '読み終えた人に、何をしてほしいですか？', hint: 'どんな気持ちで、何をしてほしいかを一言で。',
          chips: ['予約してほしい', '申し込んでほしい', '問い合わせてほしい', '来店してほしい', '購入してほしい'],
          ph: '例：「行ってみよう」と思って、来週の席を予約してほしい' }
      ]
    },
    banner: {
      label: 'バナー・縦動画',
      qs: [
        { q: 'どこに載せますか？', hint: '載せる場所で、サイズや長さが変わります。',
          chips: ['Instagram', 'Threads・X', 'LINE公式アカウント', 'Web広告', 'お店のHP'],
          ph: '例：Instagramの投稿とストーリーズ' },
        { q: '何を知らせたいですか？', hint: '新商品・キャンペーン・イベントなど。',
          chips: ['新商品・新メニュー', 'キャンペーン', 'イベント・募集', 'お店の紹介'],
          ph: '例：12月の限定メニューを知らせたい' },
        { q: '作りたいものと数は？', hint: 'わかる範囲で。',
          chips: ['バナー1枚', 'バナー数枚のセット', '縦動画1本', 'バナーと縦動画'],
          ph: '例：投稿用のバナー3枚と、15秒くらいの縦動画1本' }
      ]
    },
    tools: {
      label: '業務アプリ・ダッシュボード',
      qs: [
        { q: 'いま、どんなデータを扱っていますか？', hint: 'ExcelやCSV、紙の台帳など。',
          chips: ['売上', '経費', '在庫', '予定・シフト', '顧客の一覧'],
          ph: '例：毎月、売上のCSVをレジから出してExcelで集計している' },
        { q: '何が見える・できるようになると助かりますか？', hint: '画面のイメージでも大丈夫です。',
          chips: ['数字をグラフで見たい', '月ごとに比べたい', '入力を楽にしたい', '予定を一覧で見たい'],
          ph: '例：店舗ごとの売上を、月ごとのグラフでひと目で見たい' },
        { q: '誰が、どの端末で使いますか？', hint: '使う人数や環境が分かると、作り方を決めやすくなります。',
          chips: ['自分だけ', 'スタッフ数人', 'パソコン', 'スマホ・タブレット'],
          ph: '例：店長3人が、パソコンとスマホで見る' }
      ]
    },
    vba: {
      label: 'Excel VBA',
      qs: [
        { q: 'Excelで、どんな作業に困っていますか？', hint: 'いつ、何を手作業でしているか、分かる範囲で教えてください。',
          chips: ['毎月の集計', '一覧への転記', '書式をそろえる', '複数のファイルをまとめる'],
          ph: '例：月末に担当者ごとの表を開き、数字を1つの集計表へ転記している' },
        { q: 'どこが楽になると助かりますか？', hint: '作業の一部だけでも大丈夫です。',
          chips: ['転記の手間を減らしたい', '入力ミスを減らしたい', '集計表を作りたい'],
          ph: '例：数字を集めるところだけ自動にして、最後は自分で確認したい' },
        { q: 'お使いのExcel環境は分かりますか？', hint: 'Windows・Mac・ブラウザー版など。分からなければ空欄でも大丈夫です。',
          chips: ['Windows版', 'Mac版', 'ブラウザー版', '分からない'],
          ph: '例：会社のWindows PCで、デスクトップ版Excelを使用' }
      ]
    },
    stamp: {
      label: 'イラスト・LINEスタンプ',
      qs: [
        { q: 'どんなキャラクター・絵柄にしたいですか？', hint: 'イメージに近い言葉を選ぶか、自由に書いてください。',
          chips: ['ゆるい動物', 'お店のマスコット', 'ご本人の似顔絵', 'シンプルな線画', 'カラフル・ポップ'],
          ph: '例：お店の看板犬（柴犬）をゆるいタッチで' },
        { q: '誰が、どんな場面で使いますか？', hint: '使う人と場面が分かると、セリフを決めやすくなります。',
          chips: ['家族や友だちとの日常', 'お店のお客さんとのやりとり', '仕事の連絡', 'あいさつ・お礼'],
          ph: '例：常連のお客さんとのLINEで、お礼や予約の返事に' },
        { q: '用途と、作りたい個数は？', hint: 'わかる範囲で。',
          chips: ['自分用', '販売したい', 'お店の販促に', '8個', '16個', '24個以上'],
          ph: '例：お店の販促用に、まず8個' }
      ]
    }
  };

  var form = document.getElementById('simForm');
  var qsBox = document.getElementById('simQs');
  var memo = document.getElementById('memoBody');
  var mailBtn = document.getElementById('mailBtn');
  var copyBtn = document.getElementById('copyBtn');
  var status = document.getElementById('memoStatus');
  var answers = {};
  Object.keys(KINDS).forEach(function (k) { answers[k] = ['', '', '']; });

  function kind() { return form.querySelector('input[name=kind]:checked').value; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function val(name) { var el = form.elements[name]; return el ? el.value.trim() : ''; }

  function renderQs() {
    var k = kind();
    qsBox.innerHTML = KINDS[k].qs.map(function (item, i) {
      var id = 'q-' + k + '-' + i;
      return '<fieldset class="c-step">' +
        '<legend><span class="c-no">' + (i + 1) + '</span><label for="' + id + '">' + esc(item.q) + '</label></legend>' +
        '<p class="c-hint">' + esc(item.hint) + '</p>' +
        '<div class="c-chips">' + item.chips.map(function (c) {
          return '<button type="button" class="c-chip" data-chip="' + esc(c) + '">' + esc(c) + '</button>';
        }).join('') + '</div>' +
        '<textarea id="' + id + '" data-i="' + i + '" placeholder="' + esc(item.ph) + '">' + esc(answers[k][i]) + '</textarea>' +
        '</fieldset>';
    }).join('');
  }

  function buildMemo() {
    var k = kind();
    var lines = ['【LUME-A Studio 相談メモ】', '作りたいもの：' + KINDS[k].label, ''];
    KINDS[k].qs.forEach(function (item, i) {
      lines.push((i + 1) + '. ' + item.q);
      lines.push('　' + (answers[k][i].trim() || '（未入力）'));
      lines.push('');
    });
    [['お名前・屋号', val('name')], ['URL', val('url')],
      ['いつごろまでに', val('when') || 'まだ決めていない'], ['写真や原稿', val('assets') || 'まだ何もない']
    ].forEach(function (p) { if (p[1]) lines.push(p[0] + '：' + p[1]); });
    return lines.join('\n');
  }

  function refresh() {
    var text = buildMemo();
    memo.textContent = text;
    var subject = '相談シミュレーターからのご相談（' + KINDS[kind()].label.replace(/（.*）/, '') + '）';
    mailBtn.href = 'mailto:' + MAIL_TO + '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(text + '\n\n――\nこのメモをもとに、相談させてください。');
  }

  form.addEventListener('submit', function (e) { e.preventDefault(); });
  form.addEventListener('change', function (e) {
    if (e.target.name === 'kind') renderQs();
    refresh();
  });
  form.addEventListener('input', function (e) {
    var t = e.target;
    if (t.matches('textarea[data-i]')) answers[kind()][+t.dataset.i] = t.value;
    refresh();
  });
  qsBox.addEventListener('click', function (e) {
    var chip = e.target.closest('.c-chip');
    if (!chip) return;
    var ta = chip.closest('.c-step').querySelector('textarea');
    var add = chip.dataset.chip;
    ta.value = ta.value.trim() ? ta.value.replace(/\s+$/, '') + '、' + add : add;
    answers[kind()][+ta.dataset.i] = ta.value;
    ta.focus();
    refresh();
  });

  copyBtn.addEventListener('click', function () {
    var text = buildMemo();
    var done = function () { status.textContent = '相談メモをコピーしました。'; };
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (err) { status.textContent = 'コピーできませんでした。メモを選択してコピーしてください。'; }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback);
    else fallback();
  });

  // ?kind=vba のように、選んだ状態で開ける
  var requested = new URLSearchParams(window.location.search).get('kind');
  var choice = Array.prototype.find.call(form.querySelectorAll('input[name="kind"]'), function (input) { return input.value === requested; });
  if (choice) choice.checked = true;

  renderQs();
  refresh();
})();
