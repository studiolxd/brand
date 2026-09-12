import { Body as e, Button as t, Container as n, Font as r, Head as i, Heading as a, Hr as o, Html as s, Img as c, Link as l, Preview as u, Section as d, Text as f } from "react-email";
import { Fragment as p, jsx as m, jsxs as h } from "react/jsx-runtime";
//#region src/stories/email/emailTokens.ts
var g = {
	"--email-max-width": "600px",
	"--email-font-family": "\"Google Sans Flex\", system-ui, sans-serif",
	"--email-font-size": "20px",
	"--email-font-weight": "300",
	"--email-font-weight-range": "1 1000",
	"--email-line-height": "1.5",
	"--email-border-width": "1px",
	"--email-canvas-padding-block": "24px",
	"--email-canvas-padding-inline": "12px",
	"--email-padding-block": "24px",
	"--email-padding-inline": "24px",
	"--email-brand-padding-block": "16px",
	"--email-brand-padding-inline": "16px",
	"--email-opt-out-margin-block-start": "16px",
	"--email-heading-font-size": "32px",
	"--email-heading-font-weight": "500",
	"--email-heading-line-height": "1.1",
	"--email-heading-margin-block-end": "12px",
	"--email-text-margin-block-end": "16px",
	"--email-note-font-size": "16px",
	"--email-note-line-height": "1.65",
	"--email-text-emphasis-font-weight": "500",
	"--email-heading-2-font-size": "24px",
	"--email-heading-2-font-weight": "500",
	"--email-heading-2-line-height": "1.3",
	"--email-heading-2-margin-block-start": "24px",
	"--email-heading-2-margin-block-end": "12px",
	"--email-heading-2-color": "#111e30",
	"--email-list-margin-block-end": "16px",
	"--email-list-padding-inline-start": "24px",
	"--email-list-item-margin-block-end": "8px",
	"--email-quote-border-width": "2px",
	"--email-quote-border-color": "#4a4a4a",
	"--email-quote-padding-inline-start": "12px",
	"--email-quote-margin-block-end": "16px",
	"--email-divider-width": "1px",
	"--email-divider-color": "#d0d0d0",
	"--email-divider-margin-block": "24px",
	"--email-tag-font-size": "16px",
	"--email-tag-font-weight": "500",
	"--email-tag-border-radius": "9999px",
	"--email-tag-padding-block": "4px",
	"--email-tag-padding-inline": "12px",
	"--email-tag-margin-block-end": "16px",
	"--email-tone-success-bg": "#006616",
	"--email-tone-success-color": "#ffffff",
	"--email-tone-warning-bg": "#ffcd00",
	"--email-tone-warning-color": "#111e30",
	"--email-tone-error-bg": "#b30000",
	"--email-tone-error-color": "#ffffff",
	"--email-button-bg": "#baabff",
	"--email-button-color": "#111e30",
	"--email-button-hover-bg": "#ffcd00",
	"--email-button-hover-color": "#111e30",
	"--email-button-font-size": "20px",
	"--email-button-font-weight": "300",
	"--email-button-padding-block": "16px",
	"--email-button-width": "100%",
	"--email-button-fallback-margin-block-start": "12px",
	"--email-button-margin-block-end": "24px",
	"--email-logo-mark-size": "48px",
	"--email-logo-padding": "8px",
	"--email-canvas-bg": "#ffffff",
	"--email-bg": "#ffffff",
	"--email-color": "#111e30",
	"--email-muted-color": "#4a4a4a",
	"--email-border-color": "#111e30"
};
//#endregion
//#region src/stories/email/emailTheme.ts
function _(e) {
	return g[e];
}
var v = {
	canvas: _("--email-canvas-bg"),
	background: _("--email-bg"),
	text: _("--email-color"),
	muted: _("--email-muted-color"),
	border: _("--email-border-color")
}, y = _("--email-font-family"), b = _("--email-font-weight-range"), x = _("--email-max-width"), S = {
	size: Number.parseFloat(_("--email-logo-mark-size")) + Number.parseFloat(_("--email-logo-padding")) * 2,
	filename: "logo-v1.png"
}, C = "https://slxd.app/brand/email", w = "google-sans-flex-normal-latin-v1.woff2", T = {
	color: v.muted,
	fontFamily: y,
	fontWeight: Number(_("--email-font-weight")),
	fontSize: _("--email-note-font-size"),
	lineHeight: _("--email-note-line-height"),
	margin: 0
}, E = {
	heading: {
		color: v.text,
		fontFamily: y,
		fontSize: _("--email-heading-font-size"),
		fontWeight: Number(_("--email-heading-font-weight")),
		lineHeight: _("--email-heading-line-height"),
		margin: `0 0 ${_("--email-heading-margin-block-end")}`
	},
	text: {
		color: v.text,
		fontFamily: y,
		fontWeight: Number(_("--email-font-weight")),
		fontSize: _("--email-font-size"),
		lineHeight: _("--email-line-height"),
		margin: `0 0 ${_("--email-text-margin-block-end")}`
	},
	textEmphasis: { fontWeight: Number(_("--email-text-emphasis-font-weight")) },
	muted: T,
	footnote: {
		color: v.text,
		fontFamily: y,
		fontWeight: Number(_("--email-font-weight")),
		fontSize: _("--email-note-font-size"),
		lineHeight: _("--email-note-line-height"),
		margin: 0
	},
	button: {
		backgroundColor: _("--email-button-bg"),
		color: _("--email-button-color"),
		display: "block",
		width: _("--email-button-width"),
		textAlign: "center",
		fontFamily: y,
		fontSize: _("--email-button-font-size"),
		fontWeight: Number(_("--email-button-font-weight")),
		padding: `${_("--email-button-padding-block")} 0`,
		textDecoration: "none",
		marginBottom: _("--email-button-margin-block-end")
	},
	buttonFallback: {
		...T,
		margin: `${_("--email-button-fallback-margin-block-start")} 0 ${_("--email-button-margin-block-end")}`
	},
	buttonFallbackUrl: {
		color: v.text,
		wordBreak: "break-all",
		wordWrap: "break-word"
	},
	link: {
		color: v.text,
		fontFamily: y,
		fontWeight: Number(_("--email-font-weight")),
		textDecoration: "underline"
	},
	heading2: {
		color: _("--email-heading-2-color"),
		fontFamily: y,
		fontSize: _("--email-heading-2-font-size"),
		fontWeight: Number(_("--email-heading-2-font-weight")),
		lineHeight: _("--email-heading-2-line-height"),
		margin: `${_("--email-heading-2-margin-block-start")} 0 ${_("--email-heading-2-margin-block-end")}`
	},
	list: {
		color: v.text,
		fontFamily: y,
		fontSize: _("--email-font-size"),
		fontWeight: Number(_("--email-font-weight")),
		lineHeight: _("--email-line-height"),
		margin: `0 0 ${_("--email-list-margin-block-end")}`,
		paddingLeft: _("--email-list-padding-inline-start")
	},
	listItem: { margin: `0 0 ${_("--email-list-item-margin-block-end")}` },
	quote: {
		borderLeft: `${_("--email-quote-border-width")} solid ${_("--email-quote-border-color")}`,
		margin: `0 0 ${_("--email-quote-margin-block-end")}`,
		paddingLeft: _("--email-quote-padding-inline-start")
	},
	tag: {
		borderRadius: _("--email-tag-border-radius"),
		display: "inline-block",
		fontFamily: y,
		fontSize: _("--email-tag-font-size"),
		fontWeight: Number(_("--email-tag-font-weight")),
		padding: `${_("--email-tag-padding-block")} ${_("--email-tag-padding-inline")}`
	},
	divider: {
		border: 0,
		borderTop: `${_("--email-divider-width")} solid ${_("--email-divider-color")}`,
		margin: `${_("--email-divider-margin-block")} 0`,
		width: "100%"
	}
}, D = {
	success: {
		backgroundColor: _("--email-tone-success-bg"),
		color: _("--email-tone-success-color")
	},
	warning: {
		backgroundColor: _("--email-tone-warning-bg"),
		color: _("--email-tone-warning-color")
	},
	error: {
		backgroundColor: _("--email-tone-error-bg"),
		color: _("--email-tone-error-color")
	}
}, O = "email-button", k = `
  a:hover { text-decoration: none !important; }
  a.${O}:hover {
    background-color: ${_("--email-button-hover-bg")} !important;
    color: ${_("--email-button-hover-color")} !important;
  }
`;
//#endregion
//#region src/stories/email/EmailLayout.tsx
function A(e) {
	if (e.reasonLabel !== void 0) return /* @__PURE__ */ h(f, {
		style: E.footnote,
		children: [
			e.reasonLabel,
			" ",
			/* @__PURE__ */ m(l, {
				href: e.unsubscribeUrl,
				style: E.link,
				children: e.unsubscribeLabel
			})
		]
	});
	let { unsubscribeUrl: t, preferencesUrl: n, manageLabel: r = "Para dejar de recibir estos avisos,", unsubscribeLabel: i = n ? "Darse de baja" : "date de baja", manageBeforeLabel: a = " o ", managePreferencesLabel: o = "gestiona tus preferencias", manageAfterLabel: s = "." } = e, c = /* @__PURE__ */ m(l, {
		href: t,
		style: E.link,
		children: i
	});
	return n ? /* @__PURE__ */ h(f, {
		style: E.footnote,
		children: [
			c,
			a,
			/* @__PURE__ */ m(l, {
				href: n,
				style: E.link,
				children: o
			}),
			s
		]
	}) : /* @__PURE__ */ h(f, {
		style: E.footnote,
		children: [
			r,
			" ",
			c
		]
	});
}
function j({ preview: t, appName: a, locale: o = "es", assetsBaseUrl: l = C, logoAlt: f, optOut: p, children: g }) {
	let y = l.replace(/\/$/, "");
	return /* @__PURE__ */ h(s, {
		lang: o,
		children: [
			/* @__PURE__ */ h(i, { children: [/* @__PURE__ */ m(r, {
				fontFamily: "Google Sans Flex",
				fallbackFontFamily: "sans-serif",
				webFont: {
					url: `${y}/${w}`,
					format: "woff2"
				},
				fontWeight: b,
				fontStyle: "normal"
			}), /* @__PURE__ */ m("style", { dangerouslySetInnerHTML: { __html: k } })] }),
			/* @__PURE__ */ m(u, { children: t }),
			/* @__PURE__ */ m(e, {
				style: {
					backgroundColor: v.canvas,
					color: v.text,
					fontFamily: E.text.fontFamily,
					fontSize: E.text.fontSize,
					fontWeight: E.text.fontWeight,
					lineHeight: E.text.lineHeight,
					margin: 0,
					padding: 0
				},
				children: /* @__PURE__ */ h(d, {
					style: {
						backgroundColor: v.canvas,
						padding: `${_("--email-canvas-padding-block")} ${_("--email-canvas-padding-inline")}`,
						width: "100%"
					},
					children: [
						/* @__PURE__ */ m(n, {
							style: {
								backgroundColor: v.background,
								margin: "0 auto",
								maxWidth: x,
								padding: `${_("--email-brand-padding-block")} ${_("--email-brand-padding-inline")}`
							},
							children: /* @__PURE__ */ m(c, {
								src: `${y}/${S.filename}`,
								alt: f ?? a,
								width: S.size,
								height: S.size,
								style: {
									border: 0,
									display: "block"
								}
							})
						}),
						/* @__PURE__ */ m(n, {
							style: {
								backgroundColor: v.background,
								border: `${_("--email-border-width")} solid ${v.border}`,
								borderRadius: 0,
								margin: "0 auto",
								maxWidth: x,
								padding: `${_("--email-padding-block")} ${_("--email-padding-inline")}`
							},
							children: /* @__PURE__ */ m(d, { children: g })
						}),
						p && /* @__PURE__ */ m(n, {
							style: {
								backgroundColor: v.canvas,
								margin: "0 auto",
								maxWidth: x,
								padding: `${_("--email-opt-out-margin-block-start")} 0 0`
							},
							children: /* @__PURE__ */ m(A, { ...p })
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/stories/email/EmailPrimitives.tsx
function M({ children: e, level: t = 1, style: n }) {
	let r = t === 1 ? E.heading : E.heading2;
	return /* @__PURE__ */ m(a, {
		as: `h${t}`,
		style: {
			...r,
			...n
		},
		children: e
	});
}
function N({ children: e, emphasis: t = !1, style: n }) {
	return /* @__PURE__ */ m(f, {
		style: {
			...E.text,
			...t && E.textEmphasis,
			...n
		},
		children: e
	});
}
function P({ children: e, ordered: t = !1, style: n }) {
	return /* @__PURE__ */ m(t ? "ol" : "ul", {
		style: {
			...E.list,
			...n
		},
		children: e
	});
}
function F({ children: e, style: t }) {
	return /* @__PURE__ */ m("li", {
		style: {
			...E.listItem,
			...t
		},
		children: e
	});
}
function I({ children: e, style: t }) {
	return /* @__PURE__ */ m(d, {
		style: {
			...E.quote,
			...t
		},
		children: e
	});
}
function L({ children: e, tone: t, style: n }) {
	return /* @__PURE__ */ m("span", {
		style: {
			...E.tag,
			...D[t],
			...n
		},
		children: e
	});
}
function R({ style: e }) {
	return /* @__PURE__ */ m(o, { style: {
		...E.divider,
		...e
	} });
}
function z({ children: e, tone: t = "muted", style: n }) {
	return /* @__PURE__ */ m(f, {
		style: {
			...t === "muted" ? E.muted : E.footnote,
			...n
		},
		children: e
	});
}
function B({ href: e, children: t, style: n }) {
	return /* @__PURE__ */ m(l, {
		href: e,
		style: {
			...E.link,
			...n
		},
		children: t
	});
}
function V({ href: e, children: n, fallbackLabel: r, style: i }) {
	return /* @__PURE__ */ h(p, { children: [/* @__PURE__ */ m(t, {
		href: e,
		className: O,
		style: {
			...E.button,
			marginBottom: 0,
			...i
		},
		children: n
	}), /* @__PURE__ */ h(f, {
		style: E.buttonFallback,
		children: [
			r,
			/* @__PURE__ */ m("br", {}),
			/* @__PURE__ */ m("span", {
				style: E.buttonFallbackUrl,
				children: e
			})
		]
	})] });
}
//#endregion
export { V as EmailButton, R as EmailDivider, M as EmailHeading, j as EmailLayout, B as EmailLink, P as EmailList, F as EmailListItem, z as EmailNote, I as EmailQuote, L as EmailTag, N as EmailText, C as emailAssetsBaseUrl, y as emailFontFamily, w as emailFontFilename, S as emailLogo, x as emailMaxWidth, v as emailPalette, k as emailStyleSheet, E as emailStyles, D as emailTones };
