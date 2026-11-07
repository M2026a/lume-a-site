(() => {
  const field = document.getElementById('stamp-request-text');
  const link = document.getElementById('stamp-request-mail');
  if (!field || !link) return;
  const address = "lumea.studio.works@gmail.com";
  const subject = encodeURIComponent('LINEスタンプのリクエスト');
  function updateDraft() {
    const text = field.value.trim();
    if (!text) {
      link.removeAttribute('href');
      link.setAttribute('aria-disabled', 'true');
      return;
    }
    link.href = 'mailto:' + address + '?subject=' + subject + '&body=' + encodeURIComponent(text);
    link.removeAttribute('aria-disabled');
  }
  field.addEventListener('input', updateDraft);
  updateDraft();
})();
