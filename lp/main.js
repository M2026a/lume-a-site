/* LUME-A Studio LP — 相談シミュレーターと表示の演出（外部への送信は一切しない） */
(function () {
  'use strict';

  // ★ メールの宛先。決まったらここだけ書き換える
  var MAIL_TO = 'lumea.studio.works@gmail.com';

  var root = document.getElementById('lumea-lp');
  if (!root) return;

  /* ---------- 画像のフェードイン ---------- */
  var imgs = root.querySelectorAll('.ll-img img');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    imgs.forEach(function (img) { io.observe(img); });
  } else {
    imgs.forEach(function (img) { img.classList.add('is-in'); });
  }
  if (imgs[0]) imgs[0].classList.add('is-in');

  /* ---------- 追従ボタン ---------- */
  var sticky = root.querySelector('.ll-sticky');
  var fvHit = root.querySelector('.ll-hit--fv');
  var sim = root.querySelector('#simulator');
  var ctaPart = root.querySelector('#contact');
  if (sticky && fvHit && sim && 'IntersectionObserver' in window) {
    var fvVisible = true, endVisible = false;
    var update = function () {
      var on = !fvVisible && !endVisible;
      sticky.classList.toggle('is-on', on);
      sticky.setAttribute('aria-hidden', on ? 'false' : 'true');
      sticky.tabIndex = on ? 0 : -1;
    };
    new IntersectionObserver(function (es) { fvVisible = es[0].isIntersecting; update(); }).observe(fvHit);
    var endSeen = {};
    var endIo = new IntersectionObserver(function (es) {
      es.forEach(function (e) { endSeen[e.target.id] = e.isIntersecting; });
      endVisible = !!(endSeen.simulator || endSeen.contact);
      update();
    });
    endIo.observe(sim); endIo.observe(ctaPart);
  }

  /* ---------- 相談シミュレーター ---------- */
  var KINDS = {
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
    stamp: {
      label: 'LINEスタンプ（イラスト・キャラクター）',
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
    }
  };

  var form = root.querySelector('.ll-sim__form');
  var qsBox = root.querySelector('.ll-qs');
  var memo = root.querySelector('.ll-memo__body');
  var mailBtn = root.querySelector('#ll-mail');
  var copyBtn = root.querySelector('#ll-copy');
  var status = root.querySelector('.ll-memo__status');
  var answers = { lp: ['', '', ''], hp: ['', '', ''], stamp: ['', '', ''], vba: ['', '', ''] };

  function kind() { return form.querySelector('input[name=kind]:checked').value; }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function renderQs() {
    var k = kind();
    var html = '';
    KINDS[k].qs.forEach(function (item, i) {
      var id = 'll-q-' + k + '-' + i;
      html += '<fieldset class="ll-step" data-q="' + i + '">' +
        '<legend><span class="ll-step__no">' + (i + 1) + '</span><label for="' + id + '">' + esc(item.q) + '</label></legend>' +
        '<p class="ll-step__hint">' + esc(item.hint) + '</p>' +
        '<div class="ll-chips">' + item.chips.map(function (c) {
          return '<button type="button" class="ll-chip" data-chip="' + esc(c) + '">' + esc(c) + '</button>';
        }).join('') + '</div>' +
        '<textarea id="' + id + '" data-i="' + i + '" placeholder="' + esc(item.ph) + '">' + esc(answers[k][i]) + '</textarea>' +
        '</fieldset>';
    });
    qsBox.innerHTML = html;
  }

  function val(name) { var el = form.elements[name]; return el ? el.value.trim() : ''; }

  function buildMemo() {
    var k = kind();
    var lines = ['【LUME-A Studio 相談メモ】', '作りたいもの：' + KINDS[k].label, ''];
    KINDS[k].qs.forEach(function (item, i) {
      lines.push((i + 1) + '. ' + item.q);
      lines.push('　' + (answers[k][i].trim() || '（未入力）'));
      lines.push('');
    });
    var extra = [
      ['お名前・屋号', val('name')], ['URL', val('url')],
      ['いつごろまでに', val('when') || 'まだ決めていない'], ['写真や原稿', val('assets') || 'まだ何もない']
    ];
    extra.forEach(function (p) { if (p[1]) lines.push(p[0] + '：' + p[1]); });
    return lines.join('\n');
  }

  function refresh() {
    var text = buildMemo();
    memo.textContent = text;
    var subject = '相談シミュレーターからのご相談（' + KINDS[kind()].label.replace(/（.*）/, '') + '）';
    mailBtn.href = 'mailto:' + encodeURIComponent(MAIL_TO).replace(/%40/g, '@') +
      '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(text + '\n\n――\nこのメモをもとに、相談させてください。');
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
  });

  form.addEventListener('change', function (e) {
    if (e.target.name === 'kind') { renderQs(); }
    refresh();
  });
  form.addEventListener('input', function (e) {
    var t = e.target;
    if (t.matches('textarea[data-i]')) answers[kind()][+t.dataset.i] = t.value;
    refresh();
  });
  qsBox.addEventListener('click', function (e) {
    var chip = e.target.closest('.ll-chip');
    if (!chip) return;
    var ta = chip.closest('.ll-step').querySelector('textarea');
    var add = chip.dataset.chip;
    ta.value = ta.value.trim() ? ta.value.replace(/\s+$/, '') + '、' + add : add;
    answers[kind()][+ta.dataset.i] = ta.value;
    ta.focus();
    refresh();
  });

  mailBtn.addEventListener('click', function (e) {
    if (MAIL_TO.indexOf('@') < 0) {
      e.preventDefault();
      status.textContent = '（デモ表示）宛先のメールアドレスが未設定です。相談メモのコピーはお使いいただけます。';
    }
  });

  copyBtn.addEventListener('click', function () {
    var text = buildMemo();
    var done = function () { status.textContent = '相談メモをコピーしました。'; };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else { fallback(); }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (err) { status.textContent = 'コピーできませんでした。メモを選択してコピーしてください。'; }
      document.body.removeChild(ta);
    }
  });

  var requestedKind = new URLSearchParams(window.location.search).get('kind');
  var choice = Array.from(form.querySelectorAll('input[name="kind"]')).find(function (input) {
    return input.value === requestedKind;
  });
  if (choice) choice.checked = true;

  renderQs();
  refresh();
})();
