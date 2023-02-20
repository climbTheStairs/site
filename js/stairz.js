;(() => {
"use strict"

const $ = document.querySelector.bind(document)
const $$ = (sel) => [...document.querySelectorAll(sel)]
const $head = document.head || document
const $body = document.body || document
const $create = (tag, ...props) => {
	const $el = document.createElement(tag)
	return Object.assign($el, ...props)
}

const arrProto = {
	equals(arr) {
		if (!Array.isArray(arr))
			throw new TypeError("arg must be of type array")
		if (this.length !== arr.length)
			return false
		for (let i = 0, l = this.length; i < l; i++)
			if (this[i] !== arr[i])
				return false
		return true
	},
	neg(i) {
		return this[this.length - i]
	},
	random() {
		return this[Math.floor(Math.random() * this.length)]
	},
	remove(i) {
		const [removed] = this.splice(i, 1)
		return removed
	},
	unique() {
		return [...new Set(this)]
	},
}

const elProto = {
	$: Element.prototype.querySelector,
	$$(sel) {
		return [...this.querySelectorAll(sel)]
	},
	appendAfter($el) {
		// https://stackoverflow.com/a/5192810/9281985
		$el.parentNode.insertBefore(this, $el.nextSibling)
		return this
	},
	appendBefore($el) {
		$el.parentNode.insertBefore(this, $el)
		return this
	},
	appendTo($el) {
		$el.append(this)
		return this
	},
	css(props) {
		Object.assign(this.style, props)
		return this
	},
	fade(cb, dur = 500) {
		const { opacity, transition } = this.style
		this.css({
			transition: `opacity ${dur}ms`,
			opacity: 0,
		})
		setTimeout(() => {
			cb()
			this.css({ opacity })
			setTimeout(() => this.css({ transition }), dur)
		}, dur)
		return this
	},
}

const stairz = {
	$, $$, $head, $body, $create,
	copy(value) {
		const $tmp = $create("textarea", { value })
		$tmp.appendTo($body).select()
		document.execCommand("copy")
		$tmp.remove()
	},
	createDataResource(contentType, val) {
		return `data:${contentType},${encodeURIComponent(val)}`
	},
	dl(href, download = "go_drink_water_and_do_hwk") {
		$create("a", { href, download }).click()
	},
	getRandStr(length = 50, charTypes = "luns") {
		const chars = []
		const allChars = {
			l: "abcdefghijklmnopqrstuvwxyz".split(""),
			u: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
			n: "0123456789".split(""),
			s: "!@#$%^&*()-=_+,.".split(""),
		}
		for (const charType of charTypes)
			chars.push(...allChars[charType])
		const res = []
		while (length--)
			res.push(chars.random())
		return res.join("")
	},
	importModule(name) {
		stairz.importScript(`https://climbthestairs.org/js/${name}.js`)
	},
	importScript(src) {
		$create("script", { src }).appendTo($body).remove()
	},
	subst(str, substs) {
		for (const [key, val] of Object.entries(substs))
			str = str.replace("${" + key + "}", val)
		return str
	},
}

const assignToProto = (target, source) => {
	const proto = target.prototype
	Object.entries(source).forEach(([key, val]) => {
		const fullName = `${proto.constructor.name}.prototype.${key}`
		if (proto.hasOwnProperty(key))
			console.warn(`Overriding ${fullName}!`)
		proto[key] = val
		Object.defineProperty(proto, key, { enumerable: false })
	})
}
assignToProto(Array, arrProto)
assignToProto(Element, elProto)
window.stairz = stairz
console.log("Hello there, world!!!")
})();
