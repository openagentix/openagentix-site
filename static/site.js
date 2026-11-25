// The whole client script of the site: theme toggle, copy buttons, mobile menu.
// No tracking, no cookies. The theme choice is kept in localStorage only.
(function () {
	var root = document.documentElement;
	function currentTheme() {
		if (root.dataset.theme) return root.dataset.theme;
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}
	function syncToggles() {
		var dark = currentTheme() === 'dark';
		document.querySelectorAll('[data-theme-toggle]').forEach(function (b) {
			b.setAttribute('aria-pressed', String(dark));
			b.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
		});
	}
	document.addEventListener('click', function (e) {
		var target = e.target instanceof Element ? e.target : null;
		if (!target) return;
		var toggle = target.closest('[data-theme-toggle]');
		if (toggle) {
			var next = currentTheme() === 'dark' ? 'light' : 'dark';
			root.dataset.theme = next;
			try {
				localStorage.setItem('oax-theme', next);
			} catch {
				/* storage blocked: the choice lasts for this page only */
			}
			syncToggles();
			return;
		}
		var copy = target.closest('[data-copy]');
		if (copy) {
			var src = document.getElementById(copy.getAttribute('data-copy') || '');
			if (!src) return;
			var text = src.getAttribute('data-text') || src.textContent || '';
			var label = copy.querySelector('[data-copy-label]');
			var done = function (ok) {
				if (label) label.textContent = ok ? 'Copied' : 'Press Ctrl+C';
				copy.setAttribute('data-copied', ok ? 'true' : 'false');
				var status = document.getElementById(copy.getAttribute('data-copy') + '-status');
				if (status)
					status.textContent = ok
						? 'Command copied to the clipboard.'
						: 'Copy failed. Select the text and copy it.';
				setTimeout(function () {
					if (label) label.textContent = 'Copy';
					copy.removeAttribute('data-copied');
				}, 2000);
			};
			if (navigator.clipboard && window.isSecureContext) {
				navigator.clipboard.writeText(text).then(
					function () {
						done(true);
					},
					function () {
						done(false);
					}
				);
			} else {
				done(false);
			}
			return;
		}
		var menu = target.closest('[data-menu-toggle]');
		if (menu) {
			var panel = document.getElementById('mobile-menu');
			var open = menu.getAttribute('aria-expanded') === 'true';
			menu.setAttribute('aria-expanded', String(!open));
			if (panel) panel.hidden = open;
		}
	});
	document.addEventListener('keydown', function (e) {
		if (e.key !== 'Escape') return;
		var menu = document.querySelector('[data-menu-toggle][aria-expanded="true"]');
		if (menu instanceof HTMLElement) {
			menu.click();
			menu.focus();
		}
	});
	if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', syncToggles);
	else syncToggles();
})();
