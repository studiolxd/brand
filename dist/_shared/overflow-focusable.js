import { useEffect as e, useState as t } from "react";
//#region src/stories/constants/overflow-focusable.ts
function n(n) {
	let [r, i] = t(!1);
	return e(() => {
		let e = n.current;
		if (!e || typeof ResizeObserver > "u") return;
		let t = () => i(e.scrollWidth > e.clientWidth || e.scrollHeight > e.clientHeight);
		t();
		let r = new ResizeObserver(t);
		return r.observe(e), e.firstElementChild && r.observe(e.firstElementChild), () => r.disconnect();
	}, [n]), r;
}
//#endregion
export { n as t };
