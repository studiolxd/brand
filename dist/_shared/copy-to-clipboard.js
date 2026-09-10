import { useCallback as e, useEffect as t, useState as n } from "react";
//#region src/stories/constants/copy-to-clipboard.ts
var r = 1500;
function i(i = r) {
	let [a, o] = n("idle");
	return t(() => {
		if (a === "idle") return;
		let e = setTimeout(() => o("idle"), i);
		return () => clearTimeout(e);
	}, [a, i]), {
		status: a,
		copy: e(async (e) => {
			let t = typeof e == "function" ? e() : e;
			try {
				return await navigator.clipboard.writeText(t), o("copied"), {
					ok: !0,
					text: t
				};
			} catch (e) {
				return o("error"), {
					ok: !1,
					text: t,
					error: e
				};
			}
		}, [])
	};
}
//#endregion
export { i as n, r as t };
