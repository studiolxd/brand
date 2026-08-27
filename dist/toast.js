'use client';
import { Toast as e } from "@base-ui-components/react/toast";
//#region src/stories/molecules/Toast/toast.ts
var t = e.createToastManager(), n = 5e3, r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Map(), a = n;
function o(e) {
	a = e;
}
function s(e) {
	r.forEach((t) => {
		e.includes(t) || (r.delete(t), u(t));
	}), e.forEach((e) => r.add(e));
}
function c(e) {
	if (e !== void 0) return Number.isFinite(e) ? e : 0;
}
function l(e) {
	return e === "error" || e === "warning" ? "high" : "low";
}
function u(e) {
	let t = i.get(e);
	t !== void 0 && (clearTimeout(t), i.delete(e));
}
function d(e, n, r) {
	if (u(e), n === "loading") return;
	let o = c(r) ?? a;
	o <= 0 || i.set(e, setTimeout(() => {
		i.delete(e), t.close(e);
	}, o));
}
function f(e, t, n) {
	return {
		title: e,
		type: t,
		description: n?.description,
		timeout: c(n?.duration),
		priority: l(t),
		actionProps: n?.action ? {
			children: n.action.label,
			onClick: n.action.onClick
		} : void 0,
		onClose: n?.onClose
	};
}
function p(e, n, i) {
	let a = i?.id;
	if (a !== void 0 && r.has(a)) return t.update(a, f(e, n, i)), d(a, n, i?.duration), a;
	let o = t.add({
		...f(e, n, i),
		id: a
	});
	return r.add(o), o;
}
function m(e) {
	return typeof e == "string" ? { title: e } : e;
}
function h(e, t) {
	return p(e, "default", t);
}
var g = Object.assign(h, {
	message: (e, t) => p(e, "default", t),
	success: (e, t) => p(e, "success", t),
	error: (e, t) => p(e, "error", t),
	warning: (e, t) => p(e, "warning", t),
	info: (e, t) => p(e, "info", t),
	loading: (e, t) => p(e, "loading", t),
	dismiss: (e) => {
		if (e !== void 0) {
			u(e), t.close(e);
			return;
		}
		r.forEach((e) => {
			u(e), t.close(e);
		});
	},
	promise: (e, n) => {
		let r = (e, t, n) => {
			let r = m(typeof e == "function" ? e(t) : e);
			return f(r.title, n, r);
		};
		return t.promise(e, {
			loading: f(m(n.loading).title, "loading", m(n.loading)),
			success: (e) => r(n.success, e, "success"),
			error: (e) => r(n.error, e, "error")
		});
	}
});
//#endregion
export { n as TOAST_DURATION, o as setToastDefaultDuration, s as syncLiveToasts, g as toast, t as toastManager };
