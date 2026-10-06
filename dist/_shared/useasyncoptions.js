import { useCallback as e, useEffect as t, useRef as n, useState as r } from "react";
//#region src/stories/atoms/_shared/useAsyncOptions.ts
function i(i, a) {
	let [o, s] = r([]), [c, l] = r(!1), [u, d] = r(!1), f = n(null), p = n(0), m = e((e) => {
		f.current && clearTimeout(f.current);
		let t = ++p.current;
		l(!0), d(!1), Promise.resolve().then(() => i(e)).then((e) => e, () => []).then((e) => {
			t === p.current && (s(e), l(!1), d(!0));
		});
	}, [i]), h = e((e) => {
		f.current && clearTimeout(f.current), a > 0 ? f.current = setTimeout(() => m(e), a) : m(e);
	}, [a, m]), g = e(() => {
		f.current && clearTimeout(f.current), p.current += 1, l(!1);
	}, []), _ = e(() => {
		s([]), d(!1);
	}, []);
	return t(() => () => {
		p.current += 1, f.current && clearTimeout(f.current);
	}, []), {
		results: o,
		loading: c,
		hasSearched: u,
		search: m,
		schedule: h,
		cancel: g,
		clear: _
	};
}
//#endregion
export { i as t };
