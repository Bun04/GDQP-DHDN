(() => {
  let dialog;
  let resolveCurrent;
  function createDialog() {
    dialog = document.createElement('dialog');
    dialog.className = 'confirm-dialog';
    dialog.setAttribute('aria-labelledby', 'app-confirm-title');
    dialog.innerHTML = '<div class="confirm-content"><div class="confirm-mark" aria-hidden="true">!</div><p class="confirm-kicker">Xác nhận thao tác</p><h2 id="app-confirm-title"></h2><p class="confirm-message" id="app-confirm-message"></p></div><div class="confirm-actions"><button class="button outline" id="app-confirm-cancel" type="button"></button><button class="button primary" id="app-confirm-ok" type="button"></button></div>';
    document.body.append(dialog);
    dialog.querySelector('#app-confirm-cancel').addEventListener('click', () => dialog.close('cancel'));
    dialog.querySelector('#app-confirm-ok').addEventListener('click', () => dialog.close('confirm'));
    dialog.addEventListener('cancel', (event) => { event.preventDefault(); dialog.close('cancel'); });
    dialog.addEventListener('close', () => {
      const resolve = resolveCurrent;
      resolveCurrent = null;
      resolve?.(dialog.returnValue === 'confirm');
    });
  }
  window.appConfirm = (options = {}) => new Promise((resolve) => {
    if (!dialog) createDialog();
    dialog.querySelector('#app-confirm-title').textContent = options.title || 'Bạn có chắc không?';
    dialog.querySelector('#app-confirm-message').textContent = options.message || '';
    dialog.querySelector('#app-confirm-cancel').textContent = options.cancelText || 'Quay lại';
    const confirmButton = dialog.querySelector('#app-confirm-ok');
    confirmButton.textContent = options.confirmText || 'Xác nhận';
    confirmButton.classList.toggle('danger-confirm', Boolean(options.danger));
    resolveCurrent = resolve;
    dialog.showModal();
    confirmButton.focus();
  });
})();
