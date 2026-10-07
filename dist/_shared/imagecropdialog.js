import '../imagecropdialog.css';
import { n as e } from "./brandmessagescontext.js";
import { Spinner as t } from "../spinner.js";
import { Button as n } from "../button.js";
import { t as r } from "./alert.js";
import { t as i } from "./modal.js";
import { useRef as a, useState as o } from "react";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
import u, { centerCrop as d, makeAspectCrop as f } from "react-image-crop";
//#region src/stories/molecules/ImageCropDialog/crop.ts
async function p(e, t, n = {}) {
	let r = n.outputSize ?? 512, i = n.mimeType ?? "image/jpeg", a = n.quality ?? .9, o = document.createElement("canvas");
	o.width = r, o.height = r;
	let s = o.getContext("2d");
	if (!s) throw Error("Failed to acquire 2D canvas context");
	let c = e.naturalWidth / e.width, l = e.naturalHeight / e.height;
	return s.drawImage(e, t.x * c, t.y * l, t.width * c, t.height * l, 0, 0, r, r), new Promise((e, t) => {
		o.toBlob((n) => n ? e(n) : t(/* @__PURE__ */ Error("Canvas toBlob returned null")), i, a);
	});
}
function m(e, t, n) {
	return d(f(t / n >= e ? {
		unit: "%",
		height: 100
	} : {
		unit: "%",
		width: 100
	}, e, t, n), t, n);
}
//#endregion
//#region src/stories/messages/es/imageCropDialog.ts
var h = {
	loading: "Cargando imagen…",
	error: "No hemos podido cargar la imagen. Prueba con otro archivo."
};
//#endregion
//#region src/stories/molecules/ImageCropDialog/ImageCropDialog.tsx
function g({ sourceUrl: d, title: f, description: g, circularCrop: _ = !1, aspect: v = 1, outputSize: y = 512, outputMimeType: b, busy: x = !1, cancelLabel: S, confirmLabel: C, closeLabel: w, loadingLabel: T, errorMessage: E, onConfirm: D, onClose: O, className: k }) {
	let A = e("imageCropDialog", h), j = a(null), [M, N] = o(), [P, F] = o(), [I, L] = o("loading"), [R, z] = o(d);
	d !== R && (z(d), L("loading"), N(void 0), F(void 0));
	let B = () => {
		N(void 0), F(void 0), O();
	}, V = async () => {
		let e = j.current;
		!e || !P || P.width === 0 || (await D(await p(e, P, {
			mimeType: b,
			outputSize: y
		})), B());
	};
	return /* @__PURE__ */ c(i, {
		open: d !== null,
		onClose: () => {
			x || B();
		},
		title: f,
		...w ? { closeLabel: w } : {},
		...g == null ? {} : { description: g },
		footerClassName: "image-crop-dialog__actions",
		footer: /* @__PURE__ */ l(s, { children: [/* @__PURE__ */ c(n, {
			variant: "outline",
			disabled: x,
			onClick: B,
			children: S
		}), /* @__PURE__ */ c(n, {
			disabled: x || !P?.width,
			onClick: V,
			children: C
		})] }),
		children: /* @__PURE__ */ c("div", {
			className: ["image-crop-dialog", k].filter(Boolean).join(" "),
			children: /* @__PURE__ */ l("div", {
				className: "image-crop-dialog__area",
				children: [
					I === "loading" && /* @__PURE__ */ c(t, {
						size: "lg",
						label: A("loading", T)
					}),
					I === "error" && /* @__PURE__ */ c(r, {
						tone: "error",
						description: A("error", E),
						className: "image-crop-dialog__error"
					}),
					d && I !== "error" && /* @__PURE__ */ c(u, {
						crop: M,
						onChange: (e, t) => N(t),
						onComplete: (e) => F(e),
						aspect: v,
						circularCrop: _,
						minWidth: 64,
						keepSelection: !0,
						children: /* @__PURE__ */ c("img", {
							ref: j,
							src: d,
							alt: "",
							onLoad: (e) => {
								let { width: t, height: n } = e.currentTarget;
								L("ready"), N(m(v, t, n));
							},
							onError: () => L("error")
						})
					})
				]
			})
		})
	});
}
//#endregion
export { g as t };
