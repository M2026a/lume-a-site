(function () {
  'use strict';
  var data = window.LUMEA_WORKS || { typeA: [], typeB: [], stamps: [] };

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  // TYPE A：ページへのリンク
  var listA = document.getElementById('typeA');
  data.typeA.forEach(function (w) {
    var li = el('li');
    var a = el('a', 'card');
    a.href = w.href;
    a.target = '_blank';
    a.rel = 'noopener';
    var img = el('img', 'card__img');
    img.src = w.thumb; img.alt = w.title + '（' + w.kind + '）の見本'; img.loading = 'lazy';
    img.width = 720; img.height = 540;
    var body = el('span', 'card__body');
    body.appendChild(el('span', 'card__kind', w.kind + '／自主制作'));
    body.appendChild(el('span', 'card__title', w.title));
    body.appendChild(el('span', 'card__note', w.note));
    body.appendChild(el('span', 'card__play', 'サイトを体験する ↗'));
    a.appendChild(img); a.appendChild(body); li.appendChild(a); listA.appendChild(li);
  });

  // TYPE B：ビューアで縦動画とLP全体
  var viewer = document.getElementById('viewer');
  var vVideo = document.getElementById('viewerVideo');
  var listB = document.getElementById('typeB');
  data.typeB.forEach(function (w) {
    var li = el('li');
    li.setAttribute('data-cat', w.cat || '');
    var b = el('button', 'card');
    b.type = 'button';
    var img = el('img', 'card__img');
    img.src = w.thumb; img.alt = w.title + '（' + w.kind + '）のLPデザイン'; img.loading = 'lazy';
    img.width = 560; img.height = 980;
    var body = el('span', 'card__body');
    body.appendChild(el('span', 'card__kind', w.kind));
    body.appendChild(el('span', 'card__title', w.title));
    body.appendChild(el('span', 'card__play', w.video ? '▶ デザイン・動画を見る' : 'デザインを見る'));
    b.appendChild(img); b.appendChild(body);
    b.addEventListener('click', function () { openViewer(w); });
    li.appendChild(b); listB.appendChild(li);
  });

  // 件数
  var count = document.getElementById('galleryCount');
  if (count) count.textContent = '映像で見るLPデザイン ' + data.typeB.length + '本　／　開いて体験するWebサイト ' + data.typeA.length + '本';

  // 絞り込み
  var filters = document.getElementById('filters');
  var cats = ['すべて'].concat(data.categories || []);
  cats.forEach(function (c, i) {
    var b = el('button', '', c);
    b.type = 'button';
    b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
    b.addEventListener('click', function () {
      filters.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      listB.querySelectorAll('li').forEach(function (li) { li.hidden = !(i === 0 || li.getAttribute('data-cat') === c); });
    });
    filters.appendChild(b);
  });

  // 縦動画の帯：画面に入ったものだけ再生し、外れたら止める
  var reel = document.getElementById('reel');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reelVideos = [];
  data.typeB.filter(function (w) { return w.reel && w.video; }).forEach(function (w) {
    var li = el('li');
    var b = el('button');
    b.type = 'button';
    b.setAttribute('aria-label', w.title + 'のデザインと動画を見る');
    var v = el('video');
    v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'none';
    v.setAttribute('muted', ''); v.setAttribute('playsinline', '');
    v.poster = w.thumb;
    v.setAttribute('data-src', w.video);
    b.appendChild(v);
    b.appendChild(el('span', '', w.title));
    b.addEventListener('click', function () { openViewer(w); });
    li.appendChild(b); reel.appendChild(li);
    reelVideos.push(v);
  });
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var rio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) {
          if (!v.src) v.src = v.getAttribute('data-src');
          var p = v.play(); if (p && p.catch) p.catch(function () {});
        } else { v.pause(); }
      });
    }, { threshold: 0.6 });
    reelVideos.forEach(function (v) { rio.observe(v); });
  }

  function openViewer(w) {
    reelVideos.forEach(function (v) { v.pause(); });
    document.getElementById('viewerKind').textContent = w.kind;
    document.getElementById('viewerTitle').textContent = w.title;
    var full = document.getElementById('viewerFull');
    full.href = w.full || w.thumb;
    if (w.video) {
      vVideo.hidden = false;
      vVideo.poster = w.thumb;
      vVideo.src = w.video;
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reduce) { var p = vVideo.play(); if (p && p.catch) p.catch(function () {}); }
    } else {
      vVideo.hidden = true;
      vVideo.removeAttribute('src');
    }
    if (viewer.showModal) viewer.showModal(); else viewer.setAttribute('open', '');
  }
  function closeViewer() {
    vVideo.pause();
    vVideo.removeAttribute('src');
    vVideo.load();
    if (viewer.close) viewer.close(); else viewer.removeAttribute('open');
  }
  document.getElementById('viewerClose').addEventListener('click', closeViewer);
  viewer.addEventListener('click', function (e) { if (e.target === viewer) closeViewer(); });
  viewer.addEventListener('cancel', function () { vVideo.pause(); });
  viewer.addEventListener('close', function () { vVideo.pause(); });

  // LINEスタンプ
  var listS = document.getElementById('stampList');
  data.stamps.forEach(function (s) {
    var li = el('li');
    var a = el(s.href ? 'a' : 'div', 'stamp');
    if (s.href) { a.href = s.href; a.target = '_blank'; a.rel = 'noopener'; }
    var img = el('img');
    img.src = s.img; img.alt = s.title; img.loading = 'lazy'; img.width = 360; img.height = 360;
    var body = el('span', 'stamp__body');
    body.appendChild(el('span', 'stamp__tag', s.tag));
    body.appendChild(el('span', 'stamp__title', s.title));
    body.appendChild(el('span', 'stamp__go', s.href ? 'LINE STOREで見る ↗' : '制作サンプル'));
    a.appendChild(img); a.appendChild(body); li.appendChild(a); listS.appendChild(li);
  });

  var more = document.getElementById('stampMore');
  if (data.stamps.length <= 8) { more.hidden = true; listS.classList.remove('is-folded'); }
  more.textContent = 'すべてのスタンプを見る（' + data.stamps.length + '点）';
  more.addEventListener('click', function () {
    var folded = listS.classList.toggle('is-folded');
    more.setAttribute('aria-expanded', String(!folded));
    more.textContent = folded ? 'すべてのスタンプを見る（' + data.stamps.length + '点）' : '閉じる';
  });

  // 上のバーと、スマホの追従ボタン
  var bar = document.getElementById('bar');
  var dock = document.getElementById('dock');
  var top = document.getElementById('top');
  var contact = document.getElementById('contact');
  if ('IntersectionObserver' in window) {
    var state = { top: true, contact: false };
    var update = function () {
      bar.classList.toggle('is-on', !state.top);
      dock.classList.toggle('is-on', !state.top && !state.contact);
    };
    new IntersectionObserver(function (es) { state.top = es[0].isIntersecting; update(); }, { rootMargin: '-55% 0px 0px 0px' }).observe(top);
    new IntersectionObserver(function (es) { state.contact = es[0].isIntersecting; update(); }).observe(contact);
  } else {
    bar.classList.add('is-on');
  }

  // PCの右のセクション目次：いま見ている場所に印
  var sideLinks = document.querySelectorAll('.side-nav a');
  if (sideLinks.length && 'IntersectionObserver' in window) {
    var mark = function (id) {
      sideLinks.forEach(function (a) { a.classList.toggle('is-here', a.getAttribute('href') === '#' + id); });
    };
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) mark(e.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main .sec').forEach(function (s) { io.observe(s); });
  }

  // メールアドレスのコピー
  document.querySelectorAll('.copy').forEach(function (b) {
    b.addEventListener('click', function () {
      var t = b.getAttribute('data-copy');
      var done = function () { b.textContent = 'コピーしました'; setTimeout(function () { b.textContent = 'コピー'; }, 2000); };
      if (navigator.clipboard) navigator.clipboard.writeText(t).then(done, function () {});
    });
  });
})();
