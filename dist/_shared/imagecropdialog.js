import '../imagecropdialog.css';
import { n as e } from "./env.js";
import { r as t } from "./brandmessagescontext.js";
import { Spinner as n } from "../spinner.js";
import { Button as r } from "../button.js";
import { t as i } from "./alert.js";
import { t as a } from "./modal.js";
import { useRef as o, useState as s } from "react";
import { Fragment as c, jsx as l, jsxs as u } from "react/jsx-runtime";
import d, { centerCrop as f, makeAspectCrop as p } from "react-image-crop";
//#region src/stories/molecules/ImageCropDialog/crop.ts
async function m(e, t, n = {}) {
	let r = n.outputSize ?? 512, i = n.mimeType ?? "image/jpeg", a = n.quality ?? .9, o = document.createElement("canvas");
	o.width = r, o.height = r;
	let s = o.getContext("2d");
	if (!s) throw Error("Failed to acquire 2D canvas context");
	let c = e.naturalWidth / e.width, l = e.naturalHeight / e.height;
	return s.drawImage(e, t.x * c, t.y * l, t.width * c, t.height * l, 0, 0, r, r), new Promise((e, t) => {
		o.toBlob((n) => n ? e(n) : t(/* @__PURE__ */ Error("Canvas toBlob returned null")), i, a);
	});
}
function h(e, t, n) {
	return f(p(t / n >= e ? {
		unit: "%",
		height: 100
	} : {
		unit: "%",
		width: 100
	}, e, t, n), t, n);
}
//#endregion
//#region src/stories/messages/es/imageCropDialog.ts
var g = {
	loading: "Cargando imagen…",
	error: "No hemos podido cargar la imagen. Prueba con otro archivo."
};
//#endregion
//#region src/stories/molecules/ImageCropDialog/ImageCropDialog.tsx
function _({ sourceUrl: f, title: p, description: _, circularCrop: v = !1, aspect: y = 1, outputSize: b = 512, outputMimeType: x, busy: S = !1, cancelLabel: C, confirmLabel: w, closeLabel: T, loadingLabel: E, errorMessage: D, onConfirm: O, onOpenChange: k, onClose: A, className: j }) {
	A !== void 0 && e("ImageCropDialog", "onClose", "`onOpenChange`");
	let M = t("imageCropDialog", g), N = o(null), [P, F] = s(), [I, L] = s(), [R, z] = s("loading"), [B, V] = s(f);
	f !== B && (V(f), z("loading"), F(void 0), L(void 0));
	let H = () => {
		F(void 0), L(void 0), k?.(!1), A?.();
	}, U = async () => {
		let e = N.current;
		!e || !I || I.width === 0 || (await O(await m(e, I, {
			mimeType: x,
			outputSize: b
		})), H());
	};
	return /* @__PURE__ */ l(a, {
		open: f !== null,
		onOpenChange: (e) => {
			!e && !S && H();
		},
		title: p,
		...T ? { closeLabel: T } : {},
		..._ == null ? {} : { description: _ },
		footerClassName: "image-crop-dialog__actions",
		footer: /* @__PURE__ */ u(c, { children: [/* @__PURE__ */ l(r, {
			variant: "outline",
			disabled: S,
			onClick: H,
			children: C
		}), /* @__PURE__ */ l(r, {
			disabled: S || !I?.width,
			onClick: U,
			children: w
		})] }),
		children: /* @__PURE__ */ l("div", {
			className: ["image-crop-dialog", j].filter(Boolean).join(" "),
			children: /* @__PURE__ */ u("div", {
				className: "image-crop-dialog__area",
				children: [
					R === "loading" && /* @__PURE__ */ l(n, {
						size: "lg",
						label: M("loading", E)
					}),
					R === "error" && /* @__PURE__ */ l(i, {
						tone: "error",
						description: M("error", D),
						className: "image-crop-dialog__error"
					}),
					f && R !== "error" && /* @__PURE__ */ l(d, {
						crop: P,
						onChange: (e, t) => F(t),
						onComplete: (e) => L(e),
						aspect: y,
						circularCrop: v,
						minWidth: 64,
						keepSelection: !0,
						children: /* @__PURE__ */ l("img", {
							ref: N,
							src: f,
							alt: "",
							onLoad: (e) => {
								let { width: t, height: n } = e.currentTarget;
								z("ready"), F(h(y, t, n));
							},
							onError: () => z("error")
						})
					})
				]
			})
		})
	});
}
//#endregion
export { _ as t };
