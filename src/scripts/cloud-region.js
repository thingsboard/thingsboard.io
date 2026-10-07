(function () {
	if (typeof window === 'undefined') return;

	const KEY = 'tb.site.lastSigninRegion';
	const GREENLAND = /^America\/(Nuuk|Godthab|Scoresbysund|Danmarkshavn|Thule)$/;

	window.tbCloudRegion = {
		readLast: function () {
			try {
				const value = localStorage.getItem(KEY);
				return value === 'us' || value === 'eu' ? value : null;
			} catch {
				return null;
			}
		},
		writeLast: function (id) {
			try {
				localStorage.setItem(KEY, id);
			} catch {
				return;
			}
		},
		nearest: function () {
			const west = new Date().getTimezoneOffset() > 60;
			return west && !GREENLAND.test(Intl.DateTimeFormat().resolvedOptions().timeZone) ? 'us' : 'eu';
		},
	};
})();
