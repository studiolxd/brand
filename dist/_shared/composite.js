import { m as e } from "./useRenderElement.js";
import { o as t } from "./event.js";
import { a as n } from "./owner.js";
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/composite.js
function r(e, t, n) {
	return Math.floor(e / t) !== n;
}
function i(e, t) {
	return t < 0 || t >= e.current.length;
}
function a(e, t) {
	return s(e, { disabledIndices: t });
}
function o(e, t) {
	return s(e, {
		decrement: !0,
		startingIndex: e.current.length,
		disabledIndices: t
	});
}
function s(e, { startingIndex: t = -1, decrement: n = !1, disabledIndices: r, amount: i = 1 } = {}) {
	let a = t;
	do
		a += n ? -i : i;
	while (a >= 0 && a <= e.current.length - 1 && f(e, a, r));
	return a;
}
function c(e, { event: a, orientation: o, loopFocus: c, rtl: l, cols: u, disabledIndices: d, minIndex: p, maxIndex: m, prevIndex: h, stopEvent: g = !1 }) {
	let _ = h, v = [], y = {}, b = !1;
	{
		let t = null, n = -1;
		e.current.forEach((e, r) => {
			if (e == null) return;
			let i = e.closest("[role=\"row\"]");
			i && (b = !0), (i !== t || n === -1) && (t = i, n += 1, v[n] = []), v[n].push(r), y[r] = n;
		});
	}
	let x = b && v.length > 0 && v.some((e) => e.length !== u);
	function S(t) {
		if (!x || h === -1) return;
		let n = y[h];
		if (n == null) return;
		let r = v[n].indexOf(h), i = t === "up" ? n - 1 : n + 1;
		c && (i < 0 ? i = v.length - 1 : i >= v.length && (i = 0));
		let a = /* @__PURE__ */ new Set();
		for (; i >= 0 && i < v.length && !a.has(i);) {
			a.add(i);
			let n = v[i];
			if (n.length === 0) {
				i = t === "up" ? i - 1 : i + 1;
				continue;
			}
			let o = Math.min(r, n.length - 1);
			for (let t = o; t >= 0; --t) {
				let r = n[t];
				if (!f(e, r, d)) return r;
			}
			i = t === "up" ? i - 1 : i + 1, c && (i < 0 ? i = v.length - 1 : i >= v.length && (i = 0));
		}
	}
	if (a.key === "ArrowUp") {
		let n = S("up");
		if (n !== void 0) g && t(a), _ = n;
		else {
			if (g && t(a), h === -1) _ = m;
			else if (_ = s(e, {
				startingIndex: _,
				amount: u,
				decrement: !0,
				disabledIndices: d
			}), c && (h - u < p || _ < 0)) {
				let e = h % u, t = m % u, n = m - (t - e);
				_ = t === e ? m : t > e ? n : n - u;
			}
			i(e, _) && (_ = h);
		}
	}
	if (a.key === "ArrowDown") {
		let n = S("down");
		n === void 0 ? (g && t(a), h === -1 ? _ = p : (_ = s(e, {
			startingIndex: h,
			amount: u,
			disabledIndices: d
		}), c && h + u > m && (_ = s(e, {
			startingIndex: h % u - u,
			amount: u,
			disabledIndices: d
		}))), i(e, _) && (_ = h)) : (g && t(a), _ = n);
	}
	if (o === "both") {
		let o = n(h / u);
		a.key === (l ? "ArrowLeft" : "ArrowRight") && (g && t(a), h % u === u - 1 ? c && (_ = s(e, {
			startingIndex: h - h % u - 1,
			disabledIndices: d
		})) : (_ = s(e, {
			startingIndex: h,
			disabledIndices: d
		}), c && r(_, u, o) && (_ = s(e, {
			startingIndex: h - h % u - 1,
			disabledIndices: d
		}))), r(_, u, o) && (_ = h)), a.key === (l ? "ArrowRight" : "ArrowLeft") && (g && t(a), h % u === 0 ? c && (_ = s(e, {
			startingIndex: h + (u - h % u),
			decrement: !0,
			disabledIndices: d
		})) : (_ = s(e, {
			startingIndex: h,
			decrement: !0,
			disabledIndices: d
		}), c && r(_, u, o) && (_ = s(e, {
			startingIndex: h + (u - h % u),
			decrement: !0,
			disabledIndices: d
		}))), r(_, u, o) && (_ = h));
		let f = n(m / u) === o;
		i(e, _) && (_ = c && f ? a.key === (l ? "ArrowRight" : "ArrowLeft") ? m : s(e, {
			startingIndex: h - h % u - 1,
			disabledIndices: d
		}) : h);
	}
	return _;
}
function l(t, n, r) {
	let i = [], a = 0;
	return t.forEach(({ width: t, height: o }, s) => {
		if (t > n && process.env.NODE_ENV !== "production") throw Error(process.env.NODE_ENV === "production" ? e(29, s) : `[Floating UI]: Invalid grid - item width at index ${s} is greater than grid columns`);
		let c = !1;
		for (r && (a = 0); !c;) {
			let e = [];
			for (let r = 0; r < t; r += 1) for (let t = 0; t < o; t += 1) e.push(a + r + t * n);
			a % n + t <= n && e.every((e) => i[e] == null) ? (e.forEach((e) => {
				i[e] = s;
			}), c = !0) : a += 1;
		}
	}), [...i];
}
function u(e, t, n, r, i) {
	if (e === -1) return -1;
	let a = n.indexOf(e), o = t[e];
	switch (i) {
		case "tl": return a;
		case "tr": return o ? a + o.width - 1 : a;
		case "bl": return o ? a + (o.height - 1) * r : a;
		case "br": return n.lastIndexOf(e);
		default: return -1;
	}
}
function d(e, t) {
	return t.flatMap((t, n) => e.includes(t) ? [n] : []);
}
function f(e, t, n) {
	if (typeof n == "function") return n(t);
	if (n) return n.includes(t);
	let r = e.current[t];
	return r ? r.hasAttribute("disabled") || r.getAttribute("aria-disabled") === "true" : !1;
}
//#endregion
export { c as a, i as c, d as i, f as l, s as n, o, u as r, a as s, l as t };
