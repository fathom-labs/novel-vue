import { defineComponent as le, ref as J, onMounted as un, onBeforeUnmount as ti, h as se, getCurrentInstance as pf, watchEffect as Et, nextTick as hf, unref as ae, Teleport as mf, shallowRef as kl, reactive as ni, markRaw as gf, customRef as Dm, getCurrentScope as _m, onScopeDispose as Nm, readonly as Lm, watch as xr, onUnmounted as fo, isReadonly as Rm, toRefs as Im, openBlock as re, createElementBlock as He, normalizeClass as Oo, createElementVNode as Q, Fragment as xt, renderList as po, createBlock as it, resolveDynamicComponent as xl, toDisplayString as wr, createCommentVNode as Sr, cloneVNode as Pm, inject as ln, provide as Kn, computed as Ae, withCtx as Dn, createVNode as Ze, withModifiers as Bm, normalizeStyle as _i } from "vue";
function ke(n) {
  this.content = n;
}
ke.prototype = {
  constructor: ke,
  find: function(n) {
    for (var e = 0; e < this.content.length; e += 2)
      if (this.content[e] === n)
        return e;
    return -1;
  },
  // :: (string) → ?any
  // Retrieve the value stored under `key`, or return undefined when
  // no such key exists.
  get: function(n) {
    var e = this.find(n);
    return e == -1 ? void 0 : this.content[e + 1];
  },
  // :: (string, any, ?string) → OrderedMap
  // Create a new map by replacing the value of `key` with a new
  // value, or adding a binding to the end of the map. If `newKey` is
  // given, the key of the binding will be replaced with that key.
  update: function(n, e, t) {
    var r = t && t != n ? this.remove(t) : this, o = r.find(n), s = r.content.slice();
    return o == -1 ? s.push(t || n, e) : (s[o + 1] = e, t && (s[o] = t)), new ke(s);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(n) {
    var e = this.find(n);
    if (e == -1)
      return this;
    var t = this.content.slice();
    return t.splice(e, 2), new ke(t);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(n, e) {
    return new ke([n, e].concat(this.remove(n).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(n, e) {
    var t = this.remove(n).content.slice();
    return t.push(n, e), new ke(t);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(n, e, t) {
    var r = this.remove(e), o = r.content.slice(), s = r.find(n);
    return o.splice(s == -1 ? o.length : s, 0, e, t), new ke(o);
  },
  // :: ((key: string, value: any))
  // Call the given function for each key/value pair in the map, in
  // order.
  forEach: function(n) {
    for (var e = 0; e < this.content.length; e += 2)
      n(this.content[e], this.content[e + 1]);
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by prepending the keys in this map that don't
  // appear in `map` before the keys in `map`.
  prepend: function(n) {
    return n = ke.from(n), n.size ? new ke(n.content.concat(this.subtract(n).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(n) {
    return n = ke.from(n), n.size ? new ke(this.subtract(n).content.concat(n.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(n) {
    var e = this;
    n = ke.from(n);
    for (var t = 0; t < n.content.length; t += 2)
      e = e.remove(n.content[t]);
    return e;
  },
  // :: () → Object
  // Turn ordered map into a plain object.
  toObject: function() {
    var n = {};
    return this.forEach(function(e, t) {
      n[e] = t;
    }), n;
  },
  // :: number
  // The amount of keys in this map.
  get size() {
    return this.content.length >> 1;
  }
};
ke.from = function(n) {
  if (n instanceof ke)
    return n;
  var e = [];
  if (n)
    for (var t in n)
      e.push(t, n[t]);
  return new ke(e);
};
function yf(n, e, t) {
  for (let r = 0; ; r++) {
    if (r == n.childCount || r == e.childCount)
      return n.childCount == e.childCount ? null : t;
    let o = n.child(r), s = e.child(r);
    if (o == s) {
      t += o.nodeSize;
      continue;
    }
    if (!o.sameMarkup(s))
      return t;
    if (o.isText && o.text != s.text) {
      for (let i = 0; o.text[i] == s.text[i]; i++)
        t++;
      return t;
    }
    if (o.content.size || s.content.size) {
      let i = yf(o.content, s.content, t + 1);
      if (i != null)
        return i;
    }
    t += o.nodeSize;
  }
}
function vf(n, e, t, r) {
  for (let o = n.childCount, s = e.childCount; ; ) {
    if (o == 0 || s == 0)
      return o == s ? null : { a: t, b: r };
    let i = n.child(--o), a = e.child(--s), l = i.nodeSize;
    if (i == a) {
      t -= l, r -= l;
      continue;
    }
    if (!i.sameMarkup(a))
      return { a: t, b: r };
    if (i.isText && i.text != a.text) {
      let c = 0, u = Math.min(i.text.length, a.text.length);
      for (; c < u && i.text[i.text.length - c - 1] == a.text[a.text.length - c - 1]; )
        c++, t--, r--;
      return { a: t, b: r };
    }
    if (i.content.size || a.content.size) {
      let c = vf(i.content, a.content, t - 1, r - 1);
      if (c)
        return c;
    }
    t -= l, r -= l;
  }
}
class M {
  /**
  @internal
  */
  constructor(e, t) {
    if (this.content = e, this.size = t || 0, t == null)
      for (let r = 0; r < e.length; r++)
        this.size += e[r].nodeSize;
  }
  /**
  Invoke a callback for all descendant nodes between the given two
  positions (relative to start of this fragment). Doesn't descend
  into a node when the callback returns `false`.
  */
  nodesBetween(e, t, r, o = 0, s) {
    for (let i = 0, a = 0; a < t; i++) {
      let l = this.content[i], c = a + l.nodeSize;
      if (c > e && r(l, o + a, s || null, i) !== !1 && l.content.size) {
        let u = a + 1;
        l.nodesBetween(Math.max(0, e - u), Math.min(l.content.size, t - u), r, o + u);
      }
      a = c;
    }
  }
  /**
  Call the given callback for every descendant node. `pos` will be
  relative to the start of the fragment. The callback may return
  `false` to prevent traversal of a given node's children.
  */
  descendants(e) {
    this.nodesBetween(0, this.size, e);
  }
  /**
  Extract the text between `from` and `to`. See the same method on
  [`Node`](https://prosemirror.net/docs/ref/#model.Node.textBetween).
  */
  textBetween(e, t, r, o) {
    let s = "", i = !0;
    return this.nodesBetween(e, t, (a, l) => {
      a.isText ? (s += a.text.slice(Math.max(e, l) - l, t - l), i = !r) : a.isLeaf ? (o ? s += typeof o == "function" ? o(a) : o : a.type.spec.leafText && (s += a.type.spec.leafText(a)), i = !r) : !i && a.isBlock && (s += r, i = !0);
    }, 0), s;
  }
  /**
  Create a new fragment containing the combined content of this
  fragment and the other.
  */
  append(e) {
    if (!e.size)
      return this;
    if (!this.size)
      return e;
    let t = this.lastChild, r = e.firstChild, o = this.content.slice(), s = 0;
    for (t.isText && t.sameMarkup(r) && (o[o.length - 1] = t.withText(t.text + r.text), s = 1); s < e.content.length; s++)
      o.push(e.content[s]);
    return new M(o, this.size + e.size);
  }
  /**
  Cut out the sub-fragment between the two given positions.
  */
  cut(e, t = this.size) {
    if (e == 0 && t == this.size)
      return this;
    let r = [], o = 0;
    if (t > e)
      for (let s = 0, i = 0; i < t; s++) {
        let a = this.content[s], l = i + a.nodeSize;
        l > e && ((i < e || l > t) && (a.isText ? a = a.cut(Math.max(0, e - i), Math.min(a.text.length, t - i)) : a = a.cut(Math.max(0, e - i - 1), Math.min(a.content.size, t - i - 1))), r.push(a), o += a.nodeSize), i = l;
      }
    return new M(r, o);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? M.empty : e == 0 && t == this.content.length ? this : new M(this.content.slice(e, t));
  }
  /**
  Create a new fragment in which the node at the given index is
  replaced by the given node.
  */
  replaceChild(e, t) {
    let r = this.content[e];
    if (r == t)
      return this;
    let o = this.content.slice(), s = this.size + t.nodeSize - r.nodeSize;
    return o[e] = t, new M(o, s);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new M([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new M(this.content.concat(e), this.size + e.nodeSize);
  }
  /**
  Compare this fragment to another one.
  */
  eq(e) {
    if (this.content.length != e.content.length)
      return !1;
    for (let t = 0; t < this.content.length; t++)
      if (!this.content[t].eq(e.content[t]))
        return !1;
    return !0;
  }
  /**
  The first child of the fragment, or `null` if it is empty.
  */
  get firstChild() {
    return this.content.length ? this.content[0] : null;
  }
  /**
  The last child of the fragment, or `null` if it is empty.
  */
  get lastChild() {
    return this.content.length ? this.content[this.content.length - 1] : null;
  }
  /**
  The number of child nodes in this fragment.
  */
  get childCount() {
    return this.content.length;
  }
  /**
  Get the child node at the given index. Raise an error when the
  index is out of range.
  */
  child(e) {
    let t = this.content[e];
    if (!t)
      throw new RangeError("Index " + e + " out of range for " + this);
    return t;
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content[e] || null;
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    for (let t = 0, r = 0; t < this.content.length; t++) {
      let o = this.content[t];
      e(o, r, t), r += o.nodeSize;
    }
  }
  /**
  Find the first position at which this fragment and another
  fragment differ, or `null` if they are the same.
  */
  findDiffStart(e, t = 0) {
    return yf(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, r = e.size) {
    return vf(this, e, t, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. (Not public.)
  */
  findIndex(e, t = -1) {
    if (e == 0)
      return Go(0, e);
    if (e == this.size)
      return Go(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let r = 0, o = 0; ; r++) {
      let s = this.child(r), i = o + s.nodeSize;
      if (i >= e)
        return i == e || t > 0 ? Go(r + 1, i) : Go(r, o);
      o = i;
    }
  }
  /**
  Return a debugging string that describes this fragment.
  */
  toString() {
    return "<" + this.toStringInner() + ">";
  }
  /**
  @internal
  */
  toStringInner() {
    return this.content.join(", ");
  }
  /**
  Create a JSON-serializeable representation of this fragment.
  */
  toJSON() {
    return this.content.length ? this.content.map((e) => e.toJSON()) : null;
  }
  /**
  Deserialize a fragment from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      return M.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return new M(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return M.empty;
    let t, r = 0;
    for (let o = 0; o < e.length; o++) {
      let s = e[o];
      r += s.nodeSize, o && s.isText && e[o - 1].sameMarkup(s) ? (t || (t = e.slice(0, o)), t[t.length - 1] = s.withText(t[t.length - 1].text + s.text)) : t && t.push(s);
    }
    return new M(t || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return M.empty;
    if (e instanceof M)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new M([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
M.empty = new M([], 0);
const Ni = { index: 0, offset: 0 };
function Go(n, e) {
  return Ni.index = n, Ni.offset = e, Ni;
}
function ys(n, e) {
  if (n === e)
    return !0;
  if (!(n && typeof n == "object") || !(e && typeof e == "object"))
    return !1;
  let t = Array.isArray(n);
  if (Array.isArray(e) != t)
    return !1;
  if (t) {
    if (n.length != e.length)
      return !1;
    for (let r = 0; r < n.length; r++)
      if (!ys(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !ys(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
let Z = class Da {
  /**
  @internal
  */
  constructor(e, t) {
    this.type = e, this.attrs = t;
  }
  /**
  Given a set of marks, create a new set which contains this one as
  well, in the right position. If this mark is already in the set,
  the set itself is returned. If any marks that are set to be
  [exclusive](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) with this mark are present,
  those are replaced by this one.
  */
  addToSet(e) {
    let t, r = !1;
    for (let o = 0; o < e.length; o++) {
      let s = e[o];
      if (this.eq(s))
        return e;
      if (this.type.excludes(s.type))
        t || (t = e.slice(0, o));
      else {
        if (s.type.excludes(this.type))
          return e;
        !r && s.type.rank > this.type.rank && (t || (t = e.slice(0, o)), t.push(this), r = !0), t && t.push(s);
      }
    }
    return t || (t = e.slice()), r || t.push(this), t;
  }
  /**
  Remove this mark from the given set, returning a new set. If this
  mark is not in the set, the set itself is returned.
  */
  removeFromSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return e.slice(0, t).concat(e.slice(t + 1));
    return e;
  }
  /**
  Test whether this mark is in the given set of marks.
  */
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return !0;
    return !1;
  }
  /**
  Test whether this mark has the same type and attributes as
  another mark.
  */
  eq(e) {
    return this == e || this.type == e.type && ys(this.attrs, e.attrs);
  }
  /**
  Convert this mark to a JSON-serializeable representation.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return e;
  }
  /**
  Deserialize a mark from JSON.
  */
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Mark.fromJSON");
    let r = e.marks[t.type];
    if (!r)
      throw new RangeError(`There is no mark type ${t.type} in this schema`);
    return r.create(t.attrs);
  }
  /**
  Test whether two sets of marks are identical.
  */
  static sameSet(e, t) {
    if (e == t)
      return !0;
    if (e.length != t.length)
      return !1;
    for (let r = 0; r < e.length; r++)
      if (!e[r].eq(t[r]))
        return !1;
    return !0;
  }
  /**
  Create a properly sorted mark set from null, a single mark, or an
  unsorted array of marks.
  */
  static setFrom(e) {
    if (!e || Array.isArray(e) && e.length == 0)
      return Da.none;
    if (e instanceof Da)
      return [e];
    let t = e.slice();
    return t.sort((r, o) => r.type.rank - o.type.rank), t;
  }
};
Z.none = [];
class vs extends Error {
}
class N {
  /**
  Create a slice. When specifying a non-zero open depth, you must
  make sure that there are nodes of at least that depth at the
  appropriate side of the fragment—i.e. if the fragment is an
  empty paragraph node, `openStart` and `openEnd` can't be greater
  than 1.
  
  It is not necessary for the content of open nodes to conform to
  the schema's content constraints, though it should be a valid
  start/end/middle for such a node, depending on which sides are
  open.
  */
  constructor(e, t, r) {
    this.content = e, this.openStart = t, this.openEnd = r;
  }
  /**
  The size this slice would add when inserted into a document.
  */
  get size() {
    return this.content.size - this.openStart - this.openEnd;
  }
  /**
  @internal
  */
  insertAt(e, t) {
    let r = kf(this.content, e + this.openStart, t);
    return r && new N(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new N(bf(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
  }
  /**
  Tests whether this slice is equal to another slice.
  */
  eq(e) {
    return this.content.eq(e.content) && this.openStart == e.openStart && this.openEnd == e.openEnd;
  }
  /**
  @internal
  */
  toString() {
    return this.content + "(" + this.openStart + "," + this.openEnd + ")";
  }
  /**
  Convert a slice to a JSON-serializable representation.
  */
  toJSON() {
    if (!this.content.size)
      return null;
    let e = { content: this.content.toJSON() };
    return this.openStart > 0 && (e.openStart = this.openStart), this.openEnd > 0 && (e.openEnd = this.openEnd), e;
  }
  /**
  Deserialize a slice from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      return N.empty;
    let r = t.openStart || 0, o = t.openEnd || 0;
    if (typeof r != "number" || typeof o != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new N(M.fromJSON(e, t.content), r, o);
  }
  /**
  Create a slice from a fragment by taking the maximum possible
  open value on both side of the fragment.
  */
  static maxOpen(e, t = !0) {
    let r = 0, o = 0;
    for (let s = e.firstChild; s && !s.isLeaf && (t || !s.type.spec.isolating); s = s.firstChild)
      r++;
    for (let s = e.lastChild; s && !s.isLeaf && (t || !s.type.spec.isolating); s = s.lastChild)
      o++;
    return new N(e, r, o);
  }
}
N.empty = new N(M.empty, 0, 0);
function bf(n, e, t) {
  let { index: r, offset: o } = n.findIndex(e), s = n.maybeChild(r), { index: i, offset: a } = n.findIndex(t);
  if (o == e || s.isText) {
    if (a != t && !n.child(i).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != i)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, s.copy(bf(s.content, e - o - 1, t - o - 1)));
}
function kf(n, e, t, r) {
  let { index: o, offset: s } = n.findIndex(e), i = n.maybeChild(o);
  if (s == e || i.isText)
    return r && !r.canReplace(o, o, t) ? null : n.cut(0, e).append(t).append(n.cut(e));
  let a = kf(i.content, e - s - 1, t);
  return a && n.replaceChild(o, i.copy(a));
}
function Fm(n, e, t) {
  if (t.openStart > n.depth)
    throw new vs("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new vs("Inconsistent open depths");
  return xf(n, e, t, 0);
}
function xf(n, e, t, r) {
  let o = n.index(r), s = n.node(r);
  if (o == e.index(r) && r < n.depth - t.openStart) {
    let i = xf(n, e, t, r + 1);
    return s.copy(s.content.replaceChild(o, i));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let i = n.parent, a = i.content;
      return Nn(i, a.cut(0, n.parentOffset).append(t.content).append(a.cut(e.parentOffset)));
    } else {
      let { start: i, end: a } = qm(t, n);
      return Nn(s, Sf(n, i, a, e, r));
    }
  else
    return Nn(s, bs(n, e, r));
}
function wf(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new vs("Cannot join " + e.type.name + " onto " + n.type.name);
}
function _a(n, e, t) {
  let r = n.node(t);
  return wf(r, e.node(t)), r;
}
function _n(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function Qr(n, e, t, r) {
  let o = (e || n).node(t), s = 0, i = e ? e.index(t) : o.childCount;
  n && (s = n.index(t), n.depth > t ? s++ : n.textOffset && (_n(n.nodeAfter, r), s++));
  for (let a = s; a < i; a++)
    _n(o.child(a), r);
  e && e.depth == t && e.textOffset && _n(e.nodeBefore, r);
}
function Nn(n, e) {
  return n.type.checkContent(e), n.copy(e);
}
function Sf(n, e, t, r, o) {
  let s = n.depth > o && _a(n, e, o + 1), i = r.depth > o && _a(t, r, o + 1), a = [];
  return Qr(null, n, o, a), s && i && e.index(o) == t.index(o) ? (wf(s, i), _n(Nn(s, Sf(n, e, t, r, o + 1)), a)) : (s && _n(Nn(s, bs(n, e, o + 1)), a), Qr(e, t, o, a), i && _n(Nn(i, bs(t, r, o + 1)), a)), Qr(r, null, o, a), new M(a);
}
function bs(n, e, t) {
  let r = [];
  if (Qr(null, n, t, r), n.depth > t) {
    let o = _a(n, e, t + 1);
    _n(Nn(o, bs(n, e, t + 1)), r);
  }
  return Qr(e, null, t, r), new M(r);
}
function qm(n, e) {
  let t = e.depth - n.openStart, o = e.node(t).copy(n.content);
  for (let s = t - 1; s >= 0; s--)
    o = e.node(s).copy(M.from(o));
  return {
    start: o.resolveNoCache(n.openStart + t),
    end: o.resolveNoCache(o.content.size - n.openEnd - t)
  };
}
class ho {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.pos = e, this.path = t, this.parentOffset = r, this.depth = t.length / 3 - 1;
  }
  /**
  @internal
  */
  resolveDepth(e) {
    return e == null ? this.depth : e < 0 ? this.depth + e : e;
  }
  /**
  The parent node that the position points into. Note that even if
  a position points into a text node, that node is not considered
  the parent—text nodes are ‘flat’ in this model, and have no content.
  */
  get parent() {
    return this.node(this.depth);
  }
  /**
  The root node in which the position was resolved.
  */
  get doc() {
    return this.node(0);
  }
  /**
  The ancestor node at the given level. `p.node(p.depth)` is the
  same as `p.parent`.
  */
  node(e) {
    return this.path[this.resolveDepth(e) * 3];
  }
  /**
  The index into the ancestor at the given level. If this points
  at the 3rd node in the 2nd paragraph on the top level, for
  example, `p.index(0)` is 1 and `p.index(1)` is 2.
  */
  index(e) {
    return this.path[this.resolveDepth(e) * 3 + 1];
  }
  /**
  The index pointing after this position into the ancestor at the
  given level.
  */
  indexAfter(e) {
    return e = this.resolveDepth(e), this.index(e) + (e == this.depth && !this.textOffset ? 0 : 1);
  }
  /**
  The (absolute) position at the start of the node at the given
  level.
  */
  start(e) {
    return e = this.resolveDepth(e), e == 0 ? 0 : this.path[e * 3 - 1] + 1;
  }
  /**
  The (absolute) position at the end of the node at the given
  level.
  */
  end(e) {
    return e = this.resolveDepth(e), this.start(e) + this.node(e).content.size;
  }
  /**
  The (absolute) position directly before the wrapping node at the
  given level, or, when `depth` is `this.depth + 1`, the original
  position.
  */
  before(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position before the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1];
  }
  /**
  The (absolute) position directly after the wrapping node at the
  given level, or the original position when `depth` is `this.depth + 1`.
  */
  after(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position after the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1] + this.path[e * 3].nodeSize;
  }
  /**
  When this position points into a text node, this returns the
  distance between the position and the start of the text node.
  Will be zero for positions that point between nodes.
  */
  get textOffset() {
    return this.pos - this.path[this.path.length - 1];
  }
  /**
  Get the node directly after the position, if any. If the position
  points into a text node, only the part of that node after the
  position is returned.
  */
  get nodeAfter() {
    let e = this.parent, t = this.index(this.depth);
    if (t == e.childCount)
      return null;
    let r = this.pos - this.path[this.path.length - 1], o = e.child(t);
    return r ? e.child(t).cut(r) : o;
  }
  /**
  Get the node directly before the position, if any. If the
  position points into a text node, only the part of that node
  before the position is returned.
  */
  get nodeBefore() {
    let e = this.index(this.depth), t = this.pos - this.path[this.path.length - 1];
    return t ? this.parent.child(e).cut(0, t) : e == 0 ? null : this.parent.child(e - 1);
  }
  /**
  Get the position at the given index in the parent node at the
  given depth (which defaults to `this.depth`).
  */
  posAtIndex(e, t) {
    t = this.resolveDepth(t);
    let r = this.path[t * 3], o = t == 0 ? 0 : this.path[t * 3 - 1] + 1;
    for (let s = 0; s < e; s++)
      o += r.child(s).nodeSize;
    return o;
  }
  /**
  Get the marks at this position, factoring in the surrounding
  marks' [`inclusive`](https://prosemirror.net/docs/ref/#model.MarkSpec.inclusive) property. If the
  position is at the start of a non-empty node, the marks of the
  node after it (if any) are returned.
  */
  marks() {
    let e = this.parent, t = this.index();
    if (e.content.size == 0)
      return Z.none;
    if (this.textOffset)
      return e.child(t).marks;
    let r = e.maybeChild(t - 1), o = e.maybeChild(t);
    if (!r) {
      let a = r;
      r = o, o = a;
    }
    let s = r.marks;
    for (var i = 0; i < s.length; i++)
      s[i].type.spec.inclusive === !1 && (!o || !s[i].isInSet(o.marks)) && (s = s[i--].removeFromSet(s));
    return s;
  }
  /**
  Get the marks after the current position, if any, except those
  that are non-inclusive and not present at position `$end`. This
  is mostly useful for getting the set of marks to preserve after a
  deletion. Will return `null` if this position is at the end of
  its parent node or its parent node isn't a textblock (in which
  case no marks should be preserved).
  */
  marksAcross(e) {
    let t = this.parent.maybeChild(this.index());
    if (!t || !t.isInline)
      return null;
    let r = t.marks, o = e.parent.maybeChild(e.index());
    for (var s = 0; s < r.length; s++)
      r[s].type.spec.inclusive === !1 && (!o || !r[s].isInSet(o.marks)) && (r = r[s--].removeFromSet(r));
    return r;
  }
  /**
  The depth up to which this position and the given (non-resolved)
  position share the same parent nodes.
  */
  sharedDepth(e) {
    for (let t = this.depth; t > 0; t--)
      if (this.start(t) <= e && this.end(t) >= e)
        return t;
    return 0;
  }
  /**
  Returns a range based on the place where this position and the
  given position diverge around block content. If both point into
  the same textblock, for example, a range around that textblock
  will be returned. If they point into different blocks, the range
  around those blocks in their shared ancestor is returned. You can
  pass in an optional predicate that will be called with a parent
  node to see if a range into that parent is acceptable.
  */
  blockRange(e = this, t) {
    if (e.pos < this.pos)
      return e.blockRange(this);
    for (let r = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); r >= 0; r--)
      if (e.pos <= this.end(r) && (!t || t(this.node(r))))
        return new ks(this, e, r);
    return null;
  }
  /**
  Query whether the given position shares the same parent node.
  */
  sameParent(e) {
    return this.pos - this.parentOffset == e.pos - e.parentOffset;
  }
  /**
  Return the greater of this and the given position.
  */
  max(e) {
    return e.pos > this.pos ? e : this;
  }
  /**
  Return the smaller of this and the given position.
  */
  min(e) {
    return e.pos < this.pos ? e : this;
  }
  /**
  @internal
  */
  toString() {
    let e = "";
    for (let t = 1; t <= this.depth; t++)
      e += (e ? "/" : "") + this.node(t).type.name + "_" + this.index(t - 1);
    return e + ":" + this.parentOffset;
  }
  /**
  @internal
  */
  static resolve(e, t) {
    if (!(t >= 0 && t <= e.content.size))
      throw new RangeError("Position " + t + " out of range");
    let r = [], o = 0, s = t;
    for (let i = e; ; ) {
      let { index: a, offset: l } = i.content.findIndex(s), c = s - l;
      if (r.push(i, a, o + l), !c || (i = i.child(a), i.isText))
        break;
      s = c - 1, o += l + 1;
    }
    return new ho(t, r, s);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    for (let o = 0; o < Li.length; o++) {
      let s = Li[o];
      if (s.pos == t && s.doc == e)
        return s;
    }
    let r = Li[Ri] = ho.resolve(e, t);
    return Ri = (Ri + 1) % zm, r;
  }
}
let Li = [], Ri = 0, zm = 12;
class ks {
  /**
  Construct a node range. `$from` and `$to` should point into the
  same node until at least the given `depth`, since a node range
  denotes an adjacent set of nodes in a single parent node.
  */
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.depth = r;
  }
  /**
  The position at the start of the range.
  */
  get start() {
    return this.$from.before(this.depth + 1);
  }
  /**
  The position at the end of the range.
  */
  get end() {
    return this.$to.after(this.depth + 1);
  }
  /**
  The parent node that the range points into.
  */
  get parent() {
    return this.$from.node(this.depth);
  }
  /**
  The start index of the range in the parent node.
  */
  get startIndex() {
    return this.$from.index(this.depth);
  }
  /**
  The end index of the range in the parent node.
  */
  get endIndex() {
    return this.$to.indexAfter(this.depth);
  }
}
const $m = /* @__PURE__ */ Object.create(null);
let Ln = class Na {
  /**
  @internal
  */
  constructor(e, t, r, o = Z.none) {
    this.type = e, this.attrs = t, this.marks = o, this.content = r || M.empty;
  }
  /**
  The size of this node, as defined by the integer-based [indexing
  scheme](/docs/guide/#doc.indexing). For text nodes, this is the
  amount of characters. For other leaf nodes, it is one. For
  non-leaf nodes, it is the size of the content plus two (the
  start and end token).
  */
  get nodeSize() {
    return this.isLeaf ? 1 : 2 + this.content.size;
  }
  /**
  The number of children that the node has.
  */
  get childCount() {
    return this.content.childCount;
  }
  /**
  Get the child node at the given index. Raises an error when the
  index is out of range.
  */
  child(e) {
    return this.content.child(e);
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content.maybeChild(e);
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    this.content.forEach(e);
  }
  /**
  Invoke a callback for all descendant nodes recursively between
  the given two positions that are relative to start of this
  node's content. The callback is invoked with the node, its
  position relative to the original node (method receiver),
  its parent node, and its child index. When the callback returns
  false for a given node, that node's children will not be
  recursed over. The last parameter can be used to specify a
  starting position to count from.
  */
  nodesBetween(e, t, r, o = 0) {
    this.content.nodesBetween(e, t, r, o, this);
  }
  /**
  Call the given callback for every descendant node. Doesn't
  descend into a node when the callback returns `false`.
  */
  descendants(e) {
    this.nodesBetween(0, this.content.size, e);
  }
  /**
  Concatenates all the text nodes found in this fragment and its
  children.
  */
  get textContent() {
    return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, "");
  }
  /**
  Get all text between positions `from` and `to`. When
  `blockSeparator` is given, it will be inserted to separate text
  from different block nodes. If `leafText` is given, it'll be
  inserted for every non-text leaf node encountered, otherwise
  [`leafText`](https://prosemirror.net/docs/ref/#model.NodeSpec^leafText) will be used.
  */
  textBetween(e, t, r, o) {
    return this.content.textBetween(e, t, r, o);
  }
  /**
  Returns this node's first child, or `null` if there are no
  children.
  */
  get firstChild() {
    return this.content.firstChild;
  }
  /**
  Returns this node's last child, or `null` if there are no
  children.
  */
  get lastChild() {
    return this.content.lastChild;
  }
  /**
  Test whether two nodes represent the same piece of document.
  */
  eq(e) {
    return this == e || this.sameMarkup(e) && this.content.eq(e.content);
  }
  /**
  Compare the markup (type, attributes, and marks) of this node to
  those of another. Returns `true` if both have the same markup.
  */
  sameMarkup(e) {
    return this.hasMarkup(e.type, e.attrs, e.marks);
  }
  /**
  Check whether this node's markup correspond to the given type,
  attributes, and marks.
  */
  hasMarkup(e, t, r) {
    return this.type == e && ys(this.attrs, t || e.defaultAttrs || $m) && Z.sameSet(this.marks, r || Z.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new Na(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new Na(this.type, this.attrs, this.content, e);
  }
  /**
  Create a copy of this node with only the content between the
  given positions. If `to` is not given, it defaults to the end of
  the node.
  */
  cut(e, t = this.content.size) {
    return e == 0 && t == this.content.size ? this : this.copy(this.content.cut(e, t));
  }
  /**
  Cut out the part of the document between the given positions, and
  return it as a `Slice` object.
  */
  slice(e, t = this.content.size, r = !1) {
    if (e == t)
      return N.empty;
    let o = this.resolve(e), s = this.resolve(t), i = r ? 0 : o.sharedDepth(t), a = o.start(i), c = o.node(i).content.cut(o.pos - a, s.pos - a);
    return new N(c, o.depth - i, s.depth - i);
  }
  /**
  Replace the part of the document between the given positions with
  the given slice. The slice must 'fit', meaning its open sides
  must be able to connect to the surrounding content, and its
  content nodes must be valid children for the node they are placed
  into. If any of this is violated, an error of type
  [`ReplaceError`](https://prosemirror.net/docs/ref/#model.ReplaceError) is thrown.
  */
  replace(e, t, r) {
    return Fm(this.resolve(e), this.resolve(t), r);
  }
  /**
  Find the node directly after the given position.
  */
  nodeAt(e) {
    for (let t = this; ; ) {
      let { index: r, offset: o } = t.content.findIndex(e);
      if (t = t.maybeChild(r), !t)
        return null;
      if (o == e || t.isText)
        return t;
      e -= o + 1;
    }
  }
  /**
  Find the (direct) child node after the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childAfter(e) {
    let { index: t, offset: r } = this.content.findIndex(e);
    return { node: this.content.maybeChild(t), index: t, offset: r };
  }
  /**
  Find the (direct) child node before the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childBefore(e) {
    if (e == 0)
      return { node: null, index: 0, offset: 0 };
    let { index: t, offset: r } = this.content.findIndex(e);
    if (r < e)
      return { node: this.content.child(t), index: t, offset: r };
    let o = this.content.child(t - 1);
    return { node: o, index: t - 1, offset: r - o.nodeSize };
  }
  /**
  Resolve the given position in the document, returning an
  [object](https://prosemirror.net/docs/ref/#model.ResolvedPos) with information about its context.
  */
  resolve(e) {
    return ho.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return ho.resolve(this, e);
  }
  /**
  Test whether a given mark or mark type occurs in this document
  between the two given positions.
  */
  rangeHasMark(e, t, r) {
    let o = !1;
    return t > e && this.nodesBetween(e, t, (s) => (r.isInSet(s.marks) && (o = !0), !o)), o;
  }
  /**
  True when this is a block (non-inline node)
  */
  get isBlock() {
    return this.type.isBlock;
  }
  /**
  True when this is a textblock node, a block node with inline
  content.
  */
  get isTextblock() {
    return this.type.isTextblock;
  }
  /**
  True when this node allows inline content.
  */
  get inlineContent() {
    return this.type.inlineContent;
  }
  /**
  True when this is an inline node (a text node or a node that can
  appear among text).
  */
  get isInline() {
    return this.type.isInline;
  }
  /**
  True when this is a text node.
  */
  get isText() {
    return this.type.isText;
  }
  /**
  True when this is a leaf node.
  */
  get isLeaf() {
    return this.type.isLeaf;
  }
  /**
  True when this is an atom, i.e. when it does not have directly
  editable content. This is usually the same as `isLeaf`, but can
  be configured with the [`atom` property](https://prosemirror.net/docs/ref/#model.NodeSpec.atom)
  on a node's spec (typically used when the node is displayed as
  an uneditable [node view](https://prosemirror.net/docs/ref/#view.NodeView)).
  */
  get isAtom() {
    return this.type.isAtom;
  }
  /**
  Return a string representation of this node for debugging
  purposes.
  */
  toString() {
    if (this.type.spec.toDebugString)
      return this.type.spec.toDebugString(this);
    let e = this.type.name;
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), Cf(this.marks, e);
  }
  /**
  Get the content match in this node at the given index.
  */
  contentMatchAt(e) {
    let t = this.type.contentMatch.matchFragment(this.content, 0, e);
    if (!t)
      throw new Error("Called contentMatchAt on a node with invalid content");
    return t;
  }
  /**
  Test whether replacing the range between `from` and `to` (by
  child index) with the given replacement fragment (which defaults
  to the empty fragment) would leave the node's content valid. You
  can optionally pass `start` and `end` indices into the
  replacement fragment.
  */
  canReplace(e, t, r = M.empty, o = 0, s = r.childCount) {
    let i = this.contentMatchAt(e).matchFragment(r, o, s), a = i && i.matchFragment(this.content, t);
    if (!a || !a.validEnd)
      return !1;
    for (let l = o; l < s; l++)
      if (!this.type.allowsMarks(r.child(l).marks))
        return !1;
    return !0;
  }
  /**
  Test whether replacing the range `from` to `to` (by index) with
  a node of the given type would leave the node's content valid.
  */
  canReplaceWith(e, t, r, o) {
    if (o && !this.type.allowsMarks(o))
      return !1;
    let s = this.contentMatchAt(e).matchType(r), i = s && s.matchFragment(this.content, t);
    return i ? i.validEnd : !1;
  }
  /**
  Test whether the given node's content could be appended to this
  node. If that node is empty, this will only return true if there
  is at least one node type that can appear in both nodes (to avoid
  merging completely incompatible nodes).
  */
  canAppend(e) {
    return e.content.size ? this.canReplace(this.childCount, this.childCount, e.content) : this.type.compatibleContent(e.type);
  }
  /**
  Check whether this node and its descendants conform to the
  schema, and raise error when they do not.
  */
  check() {
    this.type.checkContent(this.content);
    let e = Z.none;
    for (let t = 0; t < this.marks.length; t++)
      e = this.marks[t].addToSet(e);
    if (!Z.sameSet(e, this.marks))
      throw new RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map((t) => t.type.name)}`);
    this.content.forEach((t) => t.check());
  }
  /**
  Return a JSON-serializeable representation of this node.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return this.content.size && (e.content = this.content.toJSON()), this.marks.length && (e.marks = this.marks.map((t) => t.toJSON())), e;
  }
  /**
  Deserialize a node from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Node.fromJSON");
    let r = null;
    if (t.marks) {
      if (!Array.isArray(t.marks))
        throw new RangeError("Invalid mark data for Node.fromJSON");
      r = t.marks.map(e.markFromJSON);
    }
    if (t.type == "text") {
      if (typeof t.text != "string")
        throw new RangeError("Invalid text node in JSON");
      return e.text(t.text, r);
    }
    let o = M.fromJSON(e, t.content);
    return e.nodeType(t.type).create(t.attrs, o, r);
  }
};
Ln.prototype.text = void 0;
class xs extends Ln {
  /**
  @internal
  */
  constructor(e, t, r, o) {
    if (super(e, t, null, o), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : Cf(this.marks, JSON.stringify(this.text));
  }
  get textContent() {
    return this.text;
  }
  textBetween(e, t) {
    return this.text.slice(e, t);
  }
  get nodeSize() {
    return this.text.length;
  }
  mark(e) {
    return e == this.marks ? this : new xs(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new xs(this.type, this.attrs, e, this.marks);
  }
  cut(e = 0, t = this.text.length) {
    return e == 0 && t == this.text.length ? this : this.withText(this.text.slice(e, t));
  }
  eq(e) {
    return this.sameMarkup(e) && this.text == e.text;
  }
  toJSON() {
    let e = super.toJSON();
    return e.text = this.text, e;
  }
}
function Cf(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
class Bn {
  /**
  @internal
  */
  constructor(e) {
    this.validEnd = e, this.next = [], this.wrapCache = [];
  }
  /**
  @internal
  */
  static parse(e, t) {
    let r = new Hm(e, t);
    if (r.next == null)
      return Bn.empty;
    let o = Ef(r);
    r.next && r.err("Unexpected trailing text");
    let s = Jm(Gm(o));
    return Zm(s, r), s;
  }
  /**
  Match a node type, returning a match after that node if
  successful.
  */
  matchType(e) {
    for (let t = 0; t < this.next.length; t++)
      if (this.next[t].type == e)
        return this.next[t].next;
    return null;
  }
  /**
  Try to match a fragment. Returns the resulting match when
  successful.
  */
  matchFragment(e, t = 0, r = e.childCount) {
    let o = this;
    for (let s = t; o && s < r; s++)
      o = o.matchType(e.child(s).type);
    return o;
  }
  /**
  @internal
  */
  get inlineContent() {
    return this.next.length != 0 && this.next[0].type.isInline;
  }
  /**
  Get the first matching node type at this match position that can
  be generated.
  */
  get defaultType() {
    for (let e = 0; e < this.next.length; e++) {
      let { type: t } = this.next[e];
      if (!(t.isText || t.hasRequiredAttrs()))
        return t;
    }
    return null;
  }
  /**
  @internal
  */
  compatible(e) {
    for (let t = 0; t < this.next.length; t++)
      for (let r = 0; r < e.next.length; r++)
        if (this.next[t].type == e.next[r].type)
          return !0;
    return !1;
  }
  /**
  Try to match the given fragment, and if that fails, see if it can
  be made to match by inserting nodes in front of it. When
  successful, return a fragment of inserted nodes (which may be
  empty if nothing had to be inserted). When `toEnd` is true, only
  return a fragment if the resulting match goes to the end of the
  content expression.
  */
  fillBefore(e, t = !1, r = 0) {
    let o = [this];
    function s(i, a) {
      let l = i.matchFragment(e, r);
      if (l && (!t || l.validEnd))
        return M.from(a.map((c) => c.createAndFill()));
      for (let c = 0; c < i.next.length; c++) {
        let { type: u, next: d } = i.next[c];
        if (!(u.isText || u.hasRequiredAttrs()) && o.indexOf(d) == -1) {
          o.push(d);
          let f = s(d, a.concat(u));
          if (f)
            return f;
        }
      }
      return null;
    }
    return s(this, []);
  }
  /**
  Find a set of wrapping node types that would allow a node of the
  given type to appear at this position. The result may be empty
  (when it fits directly) and will be null when no such wrapping
  exists.
  */
  findWrapping(e) {
    for (let r = 0; r < this.wrapCache.length; r += 2)
      if (this.wrapCache[r] == e)
        return this.wrapCache[r + 1];
    let t = this.computeWrapping(e);
    return this.wrapCache.push(e, t), t;
  }
  /**
  @internal
  */
  computeWrapping(e) {
    let t = /* @__PURE__ */ Object.create(null), r = [{ match: this, type: null, via: null }];
    for (; r.length; ) {
      let o = r.shift(), s = o.match;
      if (s.matchType(e)) {
        let i = [];
        for (let a = o; a.type; a = a.via)
          i.push(a.type);
        return i.reverse();
      }
      for (let i = 0; i < s.next.length; i++) {
        let { type: a, next: l } = s.next[i];
        !a.isLeaf && !a.hasRequiredAttrs() && !(a.name in t) && (!o.type || l.validEnd) && (r.push({ match: a.contentMatch, type: a, via: o }), t[a.name] = !0);
      }
    }
    return null;
  }
  /**
  The number of outgoing edges this node has in the finite
  automaton that describes the content expression.
  */
  get edgeCount() {
    return this.next.length;
  }
  /**
  Get the _n_​th outgoing edge from this node in the finite
  automaton that describes the content expression.
  */
  edge(e) {
    if (e >= this.next.length)
      throw new RangeError(`There's no ${e}th edge in this content match`);
    return this.next[e];
  }
  /**
  @internal
  */
  toString() {
    let e = [];
    function t(r) {
      e.push(r);
      for (let o = 0; o < r.next.length; o++)
        e.indexOf(r.next[o].next) == -1 && t(r.next[o].next);
    }
    return t(this), e.map((r, o) => {
      let s = o + (r.validEnd ? "*" : " ") + " ";
      for (let i = 0; i < r.next.length; i++)
        s += (i ? ", " : "") + r.next[i].type.name + "->" + e.indexOf(r.next[i].next);
      return s;
    }).join(`
`);
  }
}
Bn.empty = new Bn(!0);
class Hm {
  constructor(e, t) {
    this.string = e, this.nodeTypes = t, this.inline = null, this.pos = 0, this.tokens = e.split(/\s*(?=\b|\W|$)/), this.tokens[this.tokens.length - 1] == "" && this.tokens.pop(), this.tokens[0] == "" && this.tokens.shift();
  }
  get next() {
    return this.tokens[this.pos];
  }
  eat(e) {
    return this.next == e && (this.pos++ || !0);
  }
  err(e) {
    throw new SyntaxError(e + " (in content expression '" + this.string + "')");
  }
}
function Ef(n) {
  let e = [];
  do
    e.push(Vm(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function Vm(n) {
  let e = [];
  do
    e.push(jm(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function jm(n) {
  let e = Km(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = Um(n, e);
    else
      break;
  return e;
}
function Tc(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function Um(n, e) {
  let t = Tc(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = Tc(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function Wm(n, e) {
  let t = n.nodeTypes, r = t[e];
  if (r)
    return [r];
  let o = [];
  for (let s in t) {
    let i = t[s];
    i.groups.indexOf(e) > -1 && o.push(i);
  }
  return o.length == 0 && n.err("No node type or group '" + e + "' found"), o;
}
function Km(n) {
  if (n.eat("(")) {
    let e = Ef(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = Wm(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function Gm(n) {
  let e = [[]];
  return o(s(n, 0), t()), e;
  function t() {
    return e.push([]) - 1;
  }
  function r(i, a, l) {
    let c = { term: l, to: a };
    return e[i].push(c), c;
  }
  function o(i, a) {
    i.forEach((l) => l.to = a);
  }
  function s(i, a) {
    if (i.type == "choice")
      return i.exprs.reduce((l, c) => l.concat(s(c, a)), []);
    if (i.type == "seq")
      for (let l = 0; ; l++) {
        let c = s(i.exprs[l], a);
        if (l == i.exprs.length - 1)
          return c;
        o(c, a = t());
      }
    else if (i.type == "star") {
      let l = t();
      return r(a, l), o(s(i.expr, l), l), [r(l)];
    } else if (i.type == "plus") {
      let l = t();
      return o(s(i.expr, a), l), o(s(i.expr, l), l), [r(l)];
    } else {
      if (i.type == "opt")
        return [r(a)].concat(s(i.expr, a));
      if (i.type == "range") {
        let l = a;
        for (let c = 0; c < i.min; c++) {
          let u = t();
          o(s(i.expr, l), u), l = u;
        }
        if (i.max == -1)
          o(s(i.expr, l), l);
        else
          for (let c = i.min; c < i.max; c++) {
            let u = t();
            r(l, u), o(s(i.expr, l), u), l = u;
          }
        return [r(l)];
      } else {
        if (i.type == "name")
          return [r(a, void 0, i.value)];
        throw new Error("Unknown expr type");
      }
    }
  }
}
function Af(n, e) {
  return e - n;
}
function Mc(n, e) {
  let t = [];
  return r(e), t.sort(Af);
  function r(o) {
    let s = n[o];
    if (s.length == 1 && !s[0].term)
      return r(s[0].to);
    t.push(o);
    for (let i = 0; i < s.length; i++) {
      let { term: a, to: l } = s[i];
      !a && t.indexOf(l) == -1 && r(l);
    }
  }
}
function Jm(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(Mc(n, 0));
  function t(r) {
    let o = [];
    r.forEach((i) => {
      n[i].forEach(({ term: a, to: l }) => {
        if (!a)
          return;
        let c;
        for (let u = 0; u < o.length; u++)
          o[u][0] == a && (c = o[u][1]);
        Mc(n, l).forEach((u) => {
          c || o.push([a, c = []]), c.indexOf(u) == -1 && c.push(u);
        });
      });
    });
    let s = e[r.join(",")] = new Bn(r.indexOf(n.length - 1) > -1);
    for (let i = 0; i < o.length; i++) {
      let a = o[i][1].sort(Af);
      s.next.push({ type: o[i][0], next: e[a.join(",")] || t(a) });
    }
    return s;
  }
}
function Zm(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let o = r[t], s = !o.validEnd, i = [];
    for (let a = 0; a < o.next.length; a++) {
      let { type: l, next: c } = o.next[a];
      i.push(l.name), s && !(l.isText || l.hasRequiredAttrs()) && (s = !1), r.indexOf(c) == -1 && r.push(c);
    }
    s && e.err("Only non-generatable nodes (" + i.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function Tf(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function Mf(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let r in n) {
    let o = e && e[r];
    if (o === void 0) {
      let s = n[r];
      if (s.hasDefault)
        o = s.default;
      else
        throw new RangeError("No value supplied for attribute " + r);
    }
    t[r] = o;
  }
  return t;
}
function Of(n) {
  let e = /* @__PURE__ */ Object.create(null);
  if (n)
    for (let t in n)
      e[t] = new Ym(n[t]);
  return e;
}
let Oc = class Df {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = Of(r.attrs), this.defaultAttrs = Tf(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
  }
  /**
  True if this is an inline type.
  */
  get isInline() {
    return !this.isBlock;
  }
  /**
  True if this is a textblock type, a block that contains inline
  content.
  */
  get isTextblock() {
    return this.isBlock && this.inlineContent;
  }
  /**
  True for node types that allow no content.
  */
  get isLeaf() {
    return this.contentMatch == Bn.empty;
  }
  /**
  True when this node is an atom, i.e. when it does not have
  directly editable content.
  */
  get isAtom() {
    return this.isLeaf || !!this.spec.atom;
  }
  /**
  The node type's [whitespace](https://prosemirror.net/docs/ref/#model.NodeSpec.whitespace) option.
  */
  get whitespace() {
    return this.spec.whitespace || (this.spec.code ? "pre" : "normal");
  }
  /**
  Tells you whether this node type has any required attributes.
  */
  hasRequiredAttrs() {
    for (let e in this.attrs)
      if (this.attrs[e].isRequired)
        return !0;
    return !1;
  }
  /**
  Indicates whether this node allows some of the same content as
  the given node type.
  */
  compatibleContent(e) {
    return this == e || this.contentMatch.compatible(e.contentMatch);
  }
  /**
  @internal
  */
  computeAttrs(e) {
    return !e && this.defaultAttrs ? this.defaultAttrs : Mf(this.attrs, e);
  }
  /**
  Create a `Node` of this type. The given attributes are
  checked and defaulted (you can pass `null` to use the type's
  defaults entirely, if no required attributes exist). `content`
  may be a `Fragment`, a node, an array of nodes, or
  `null`. Similarly `marks` may be `null` to default to the empty
  set of marks.
  */
  create(e = null, t, r) {
    if (this.isText)
      throw new Error("NodeType.create can't construct text nodes");
    return new Ln(this, this.computeAttrs(e), M.from(t), Z.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = M.from(t), this.checkContent(t), new Ln(this, this.computeAttrs(e), t, Z.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but see if it is
  necessary to add nodes to the start or end of the given fragment
  to make it fit the node. If no fitting wrapping can be found,
  return null. Note that, due to the fact that required nodes can
  always be created, this will always succeed if you pass null or
  `Fragment.empty` as content.
  */
  createAndFill(e = null, t, r) {
    if (e = this.computeAttrs(e), t = M.from(t), t.size) {
      let i = this.contentMatch.fillBefore(t);
      if (!i)
        return null;
      t = i.append(t);
    }
    let o = this.contentMatch.matchFragment(t), s = o && o.fillBefore(M.empty, !0);
    return s ? new Ln(this, e, t.append(s), Z.setFrom(r)) : null;
  }
  /**
  Returns true if the given fragment is valid content for this node
  type with the given attributes.
  */
  validContent(e) {
    let t = this.contentMatch.matchFragment(e);
    if (!t || !t.validEnd)
      return !1;
    for (let r = 0; r < e.childCount; r++)
      if (!this.allowsMarks(e.child(r).marks))
        return !1;
    return !0;
  }
  /**
  Throws a RangeError if the given fragment is not valid content for this
  node type.
  @internal
  */
  checkContent(e) {
    if (!this.validContent(e))
      throw new RangeError(`Invalid content for node ${this.name}: ${e.toString().slice(0, 50)}`);
  }
  /**
  Check whether the given mark type is allowed in this node.
  */
  allowsMarkType(e) {
    return this.markSet == null || this.markSet.indexOf(e) > -1;
  }
  /**
  Test whether the given set of marks are allowed in this node.
  */
  allowsMarks(e) {
    if (this.markSet == null)
      return !0;
    for (let t = 0; t < e.length; t++)
      if (!this.allowsMarkType(e[t].type))
        return !1;
    return !0;
  }
  /**
  Removes the marks that are not allowed in this node from the given set.
  */
  allowedMarks(e) {
    if (this.markSet == null)
      return e;
    let t;
    for (let r = 0; r < e.length; r++)
      this.allowsMarkType(e[r].type) ? t && t.push(e[r]) : t || (t = e.slice(0, r));
    return t ? t.length ? t : Z.none : e;
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null);
    e.forEach((s, i) => r[s] = new Df(s, t, i));
    let o = t.spec.topNode || "doc";
    if (!r[o])
      throw new RangeError("Schema is missing its top node type ('" + o + "')");
    if (!r.text)
      throw new RangeError("Every schema needs a 'text' type");
    for (let s in r.text.attrs)
      throw new RangeError("The text node type should not have attributes");
    return r;
  }
};
class Ym {
  constructor(e) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(e, "default"), this.default = e.default;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class ri {
  /**
  @internal
  */
  constructor(e, t, r, o) {
    this.name = e, this.rank = t, this.schema = r, this.spec = o, this.attrs = Of(o.attrs), this.excluded = null;
    let s = Tf(this.attrs);
    this.instance = s ? new Z(this, s) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new Z(this, Mf(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), o = 0;
    return e.forEach((s, i) => r[s] = new ri(s, o++, t, i)), r;
  }
  /**
  When there is a mark of this type in the given set, a new set
  without it is returned. Otherwise, the input set is returned.
  */
  removeFromSet(e) {
    for (var t = 0; t < e.length; t++)
      e[t].type == this && (e = e.slice(0, t).concat(e.slice(t + 1)), t--);
    return e;
  }
  /**
  Tests whether there is a mark of this type in the given set.
  */
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (e[t].type == this)
        return e[t];
  }
  /**
  Queries whether a given mark type is
  [excluded](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) by this one.
  */
  excludes(e) {
    return this.excluded.indexOf(e) > -1;
  }
}
class _f {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let o in e)
      t[o] = e[o];
    t.nodes = ke.from(e.nodes), t.marks = ke.from(e.marks || {}), this.nodes = Oc.compile(this.spec.nodes, this), this.marks = ri.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let o in this.nodes) {
      if (o in this.marks)
        throw new RangeError(o + " can not be both a node and a mark");
      let s = this.nodes[o], i = s.spec.content || "", a = s.spec.marks;
      s.contentMatch = r[i] || (r[i] = Bn.parse(i, this.nodes)), s.inlineContent = s.contentMatch.inlineContent, s.markSet = a == "_" ? null : a ? Dc(this, a.split(" ")) : a == "" || !s.inlineContent ? [] : null;
    }
    for (let o in this.marks) {
      let s = this.marks[o], i = s.spec.excludes;
      s.excluded = i == null ? [s] : i == "" ? [] : Dc(this, i.split(" "));
    }
    this.nodeFromJSON = this.nodeFromJSON.bind(this), this.markFromJSON = this.markFromJSON.bind(this), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
  }
  /**
  Create a node in this schema. The `type` may be a string or a
  `NodeType` instance. Attributes will be extended with defaults,
  `content` may be a `Fragment`, `null`, a `Node`, or an array of
  nodes.
  */
  node(e, t = null, r, o) {
    if (typeof e == "string")
      e = this.nodeType(e);
    else if (e instanceof Oc) {
      if (e.schema != this)
        throw new RangeError("Node type from different schema used (" + e.name + ")");
    } else
      throw new RangeError("Invalid node type: " + e);
    return e.createChecked(t, r, o);
  }
  /**
  Create a text node in the schema. Empty text nodes are not
  allowed.
  */
  text(e, t) {
    let r = this.nodes.text;
    return new xs(r, r.defaultAttrs, e, Z.setFrom(t));
  }
  /**
  Create a mark with the given type and attributes.
  */
  mark(e, t) {
    return typeof e == "string" && (e = this.marks[e]), e.create(t);
  }
  /**
  Deserialize a node from its JSON representation. This method is
  bound.
  */
  nodeFromJSON(e) {
    return Ln.fromJSON(this, e);
  }
  /**
  Deserialize a mark from its JSON representation. This method is
  bound.
  */
  markFromJSON(e) {
    return Z.fromJSON(this, e);
  }
  /**
  @internal
  */
  nodeType(e) {
    let t = this.nodes[e];
    if (!t)
      throw new RangeError("Unknown node type: " + e);
    return t;
  }
}
function Dc(n, e) {
  let t = [];
  for (let r = 0; r < e.length; r++) {
    let o = e[r], s = n.marks[o], i = s;
    if (s)
      t.push(s);
    else
      for (let a in n.marks) {
        let l = n.marks[a];
        (o == "_" || l.spec.group && l.spec.group.split(" ").indexOf(o) > -1) && t.push(i = l);
      }
    if (!i)
      throw new SyntaxError("Unknown mark type: '" + e[r] + "'");
  }
  return t;
}
class Fn {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [], t.forEach((r) => {
      r.tag ? this.tags.push(r) : r.style && this.styles.push(r);
    }), this.normalizeLists = !this.tags.some((r) => {
      if (!/^(ul|ol)\b/.test(r.tag) || !r.node)
        return !1;
      let o = e.nodes[r.node];
      return o.contentMatch.matchType(o);
    });
  }
  /**
  Parse a document from the content of a DOM node.
  */
  parse(e, t = {}) {
    let r = new Nc(this, t, !1);
    return r.addAll(e, t.from, t.to), r.finish();
  }
  /**
  Parses the content of the given DOM node, like
  [`parse`](https://prosemirror.net/docs/ref/#model.DOMParser.parse), and takes the same set of
  options. But unlike that method, which produces a whole node,
  this one returns a slice that is open at the sides, meaning that
  the schema constraints aren't applied to the start of nodes to
  the left of the input and the end of nodes at the end.
  */
  parseSlice(e, t = {}) {
    let r = new Nc(this, t, !0);
    return r.addAll(e, t.from, t.to), N.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, r) {
    for (let o = r ? this.tags.indexOf(r) + 1 : 0; o < this.tags.length; o++) {
      let s = this.tags[o];
      if (eg(e, s.tag) && (s.namespace === void 0 || e.namespaceURI == s.namespace) && (!s.context || t.matchesContext(s.context))) {
        if (s.getAttrs) {
          let i = s.getAttrs(e);
          if (i === !1)
            continue;
          s.attrs = i || void 0;
        }
        return s;
      }
    }
  }
  /**
  @internal
  */
  matchStyle(e, t, r, o) {
    for (let s = o ? this.styles.indexOf(o) + 1 : 0; s < this.styles.length; s++) {
      let i = this.styles[s], a = i.style;
      if (!(a.indexOf(e) != 0 || i.context && !r.matchesContext(i.context) || // Test that the style string either precisely matches the prop,
      // or has an '=' sign after the prop, followed by the given
      // value.
      a.length > e.length && (a.charCodeAt(e.length) != 61 || a.slice(e.length + 1) != t))) {
        if (i.getAttrs) {
          let l = i.getAttrs(t);
          if (l === !1)
            continue;
          i.attrs = l || void 0;
        }
        return i;
      }
    }
  }
  /**
  @internal
  */
  static schemaRules(e) {
    let t = [];
    function r(o) {
      let s = o.priority == null ? 50 : o.priority, i = 0;
      for (; i < t.length; i++) {
        let a = t[i];
        if ((a.priority == null ? 50 : a.priority) < s)
          break;
      }
      t.splice(i, 0, o);
    }
    for (let o in e.marks) {
      let s = e.marks[o].spec.parseDOM;
      s && s.forEach((i) => {
        r(i = Lc(i)), i.mark || i.ignore || i.clearMark || (i.mark = o);
      });
    }
    for (let o in e.nodes) {
      let s = e.nodes[o].spec.parseDOM;
      s && s.forEach((i) => {
        r(i = Lc(i)), i.node || i.ignore || i.mark || (i.node = o);
      });
    }
    return t;
  }
  /**
  Construct a DOM parser using the parsing rules listed in a
  schema's [node specs](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM), reordered by
  [priority](https://prosemirror.net/docs/ref/#model.ParseRule.priority).
  */
  static fromSchema(e) {
    return e.cached.domParser || (e.cached.domParser = new Fn(e, Fn.schemaRules(e)));
  }
}
const Nf = {
  address: !0,
  article: !0,
  aside: !0,
  blockquote: !0,
  canvas: !0,
  dd: !0,
  div: !0,
  dl: !0,
  fieldset: !0,
  figcaption: !0,
  figure: !0,
  footer: !0,
  form: !0,
  h1: !0,
  h2: !0,
  h3: !0,
  h4: !0,
  h5: !0,
  h6: !0,
  header: !0,
  hgroup: !0,
  hr: !0,
  li: !0,
  noscript: !0,
  ol: !0,
  output: !0,
  p: !0,
  pre: !0,
  section: !0,
  table: !0,
  tfoot: !0,
  ul: !0
}, Qm = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, Lf = { ol: !0, ul: !0 }, ws = 1, Ss = 2, Xr = 4;
function _c(n, e, t) {
  return e != null ? (e ? ws : 0) | (e === "full" ? Ss : 0) : n && n.whitespace == "pre" ? ws | Ss : t & ~Xr;
}
class Jo {
  constructor(e, t, r, o, s, i, a) {
    this.type = e, this.attrs = t, this.marks = r, this.pendingMarks = o, this.solid = s, this.options = a, this.content = [], this.activeMarks = Z.none, this.stashMarks = [], this.match = i || (a & Xr ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(M.from(e));
      if (t)
        this.match = this.type.contentMatch.matchFragment(t);
      else {
        let r = this.type.contentMatch, o;
        return (o = r.findWrapping(e.type)) ? (this.match = r, o) : null;
      }
    }
    return this.match.findWrapping(e.type);
  }
  finish(e) {
    if (!(this.options & ws)) {
      let r = this.content[this.content.length - 1], o;
      if (r && r.isText && (o = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let s = r;
        r.text.length == o[0].length ? this.content.pop() : this.content[this.content.length - 1] = s.withText(s.text.slice(0, s.text.length - o[0].length));
      }
    }
    let t = M.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(M.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  popFromStashMark(e) {
    for (let t = this.stashMarks.length - 1; t >= 0; t--)
      if (e.eq(this.stashMarks[t]))
        return this.stashMarks.splice(t, 1)[0];
  }
  applyPending(e) {
    for (let t = 0, r = this.pendingMarks; t < r.length; t++) {
      let o = r[t];
      (this.type ? this.type.allowsMarkType(o.type) : ng(o.type, e)) && !o.isInSet(this.activeMarks) && (this.activeMarks = o.addToSet(this.activeMarks), this.pendingMarks = o.removeFromSet(this.pendingMarks));
    }
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Nf.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class Nc {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0;
    let o = t.topNode, s, i = _c(null, t.preserveWhitespace, 0) | (r ? Xr : 0);
    o ? s = new Jo(o.type, o.attrs, Z.none, Z.none, !0, t.topMatch || o.type.contentMatch, i) : r ? s = new Jo(null, null, Z.none, Z.none, !0, null, i) : s = new Jo(e.schema.topNodeType, null, Z.none, Z.none, !0, null, i), this.nodes = [s], this.find = t.findPositions, this.needsBlock = !1;
  }
  get top() {
    return this.nodes[this.open];
  }
  // Add a DOM node to the content. Text is inserted as text node,
  // otherwise, the node is passed to `addElement` or, if it has a
  // `style` attribute, `addElementWithStyles`.
  addDOM(e) {
    e.nodeType == 3 ? this.addTextNode(e) : e.nodeType == 1 && this.addElement(e);
  }
  withStyleRules(e, t) {
    let r = e.getAttribute("style");
    if (!r)
      return t();
    let o = this.readStyles(tg(r));
    if (!o)
      return;
    let [s, i] = o, a = this.top;
    for (let l = 0; l < i.length; l++)
      this.removePendingMark(i[l], a);
    for (let l = 0; l < s.length; l++)
      this.addPendingMark(s[l]);
    t();
    for (let l = 0; l < s.length; l++)
      this.removePendingMark(s[l], a);
    for (let l = 0; l < i.length; l++)
      this.addPendingMark(i[l]);
  }
  addTextNode(e) {
    let t = e.nodeValue, r = this.top;
    if (r.options & Ss || r.inlineContext(e) || /[^ \t\r\n\u000c]/.test(t)) {
      if (r.options & ws)
        r.options & Ss ? t = t.replace(/\r\n?/g, `
`) : t = t.replace(/\r?\n|\r/g, " ");
      else if (t = t.replace(/[ \t\r\n\u000c]+/g, " "), /^[ \t\r\n\u000c]/.test(t) && this.open == this.nodes.length - 1) {
        let o = r.content[r.content.length - 1], s = e.previousSibling;
        (!o || s && s.nodeName == "BR" || o.isText && /[ \t\r\n\u000c]$/.test(o.text)) && (t = t.slice(1));
      }
      t && this.insertNode(this.parser.schema.text(t)), this.findInText(e);
    } else
      this.findInside(e);
  }
  // Try to find a handler for the given tag and use that to parse. If
  // none is found, the element's content nodes are added directly.
  addElement(e, t) {
    let r = e.nodeName.toLowerCase(), o;
    Lf.hasOwnProperty(r) && this.parser.normalizeLists && Xm(e);
    let s = this.options.ruleFromNode && this.options.ruleFromNode(e) || (o = this.parser.matchTag(e, this, t));
    if (s ? s.ignore : Qm.hasOwnProperty(r))
      this.findInside(e), this.ignoreFallback(e);
    else if (!s || s.skip || s.closeParent) {
      s && s.closeParent ? this.open = Math.max(0, this.open - 1) : s && s.skip.nodeType && (e = s.skip);
      let i, a = this.top, l = this.needsBlock;
      if (Nf.hasOwnProperty(r))
        a.content.length && a.content[0].isInline && this.open && (this.open--, a = this.top), i = !0, a.type || (this.needsBlock = !0);
      else if (!e.firstChild) {
        this.leafFallback(e);
        return;
      }
      s && s.skip ? this.addAll(e) : this.withStyleRules(e, () => this.addAll(e)), i && this.sync(a), this.needsBlock = l;
    } else
      this.withStyleRules(e, () => {
        this.addElementByRule(e, s, s.consuming === !1 ? o : void 0);
      });
  }
  // Called for leaf DOM nodes that would otherwise be ignored
  leafFallback(e) {
    e.nodeName == "BR" && this.top.type && this.top.type.inlineContent && this.addTextNode(e.ownerDocument.createTextNode(`
`));
  }
  // Called for ignored nodes
  ignoreFallback(e) {
    e.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent) && this.findPlace(this.parser.schema.text("-"));
  }
  // Run any style parser associated with the node's styles. Either
  // return an array of marks, or null to indicate some of the styles
  // had a rule with `ignore` set.
  readStyles(e) {
    let t = Z.none, r = Z.none;
    for (let o = 0; o < e.length; o += 2)
      for (let s = void 0; ; ) {
        let i = this.parser.matchStyle(e[o], e[o + 1], this, s);
        if (!i)
          break;
        if (i.ignore)
          return null;
        if (i.clearMark ? this.top.pendingMarks.concat(this.top.activeMarks).forEach((a) => {
          i.clearMark(a) && (r = a.addToSet(r));
        }) : t = this.parser.schema.marks[i.mark].create(i.attrs).addToSet(t), i.consuming === !1)
          s = i;
        else
          break;
      }
    return [t, r];
  }
  // Look up a handler for the given node. If none are found, return
  // false. Otherwise, apply it, use its return value to drive the way
  // the node's content is wrapped, and return true.
  addElementByRule(e, t, r) {
    let o, s, i;
    t.node ? (s = this.parser.schema.nodes[t.node], s.isLeaf ? this.insertNode(s.create(t.attrs)) || this.leafFallback(e) : o = this.enter(s, t.attrs || null, t.preserveWhitespace)) : (i = this.parser.schema.marks[t.mark].create(t.attrs), this.addPendingMark(i));
    let a = this.top;
    if (s && s.isLeaf)
      this.findInside(e);
    else if (r)
      this.addElement(e, r);
    else if (t.getContent)
      this.findInside(e), t.getContent(e, this.parser.schema).forEach((l) => this.insertNode(l));
    else {
      let l = e;
      typeof t.contentElement == "string" ? l = e.querySelector(t.contentElement) : typeof t.contentElement == "function" ? l = t.contentElement(e) : t.contentElement && (l = t.contentElement), this.findAround(e, l, !0), this.addAll(l);
    }
    o && this.sync(a) && this.open--, i && this.removePendingMark(i, a);
  }
  // Add all child nodes between `startIndex` and `endIndex` (or the
  // whole node, if not given). If `sync` is passed, use it to
  // synchronize after every block element.
  addAll(e, t, r) {
    let o = t || 0;
    for (let s = t ? e.childNodes[t] : e.firstChild, i = r == null ? null : e.childNodes[r]; s != i; s = s.nextSibling, ++o)
      this.findAtPoint(e, o), this.addDOM(s);
    this.findAtPoint(e, o);
  }
  // Try to find a way to fit the given node type into the current
  // context. May add intermediate wrappers and/or leave non-solid
  // nodes that we're in.
  findPlace(e) {
    let t, r;
    for (let o = this.open; o >= 0; o--) {
      let s = this.nodes[o], i = s.findWrapping(e);
      if (i && (!t || t.length > i.length) && (t = i, r = s, !i.length) || s.solid)
        break;
    }
    if (!t)
      return !1;
    this.sync(r);
    for (let o = 0; o < t.length; o++)
      this.enterInner(t[o], null, !1);
    return !0;
  }
  // Try to insert the given node, adjusting the context when needed.
  insertNode(e) {
    if (e.isInline && this.needsBlock && !this.top.type) {
      let t = this.textblockFromContext();
      t && this.enterInner(t);
    }
    if (this.findPlace(e)) {
      this.closeExtra();
      let t = this.top;
      t.applyPending(e.type), t.match && (t.match = t.match.matchType(e.type));
      let r = t.activeMarks;
      for (let o = 0; o < e.marks.length; o++)
        (!t.type || t.type.allowsMarkType(e.marks[o].type)) && (r = e.marks[o].addToSet(r));
      return t.content.push(e.mark(r)), !0;
    }
    return !1;
  }
  // Try to start a node of the given type, adjusting the context when
  // necessary.
  enter(e, t, r) {
    let o = this.findPlace(e.create(t));
    return o && this.enterInner(e, t, !0, r), o;
  }
  // Open a node of the given type
  enterInner(e, t = null, r = !1, o) {
    this.closeExtra();
    let s = this.top;
    s.applyPending(e), s.match = s.match && s.match.matchType(e);
    let i = _c(e, o, s.options);
    s.options & Xr && s.content.length == 0 && (i |= Xr), this.nodes.push(new Jo(e, t, s.activeMarks, s.pendingMarks, r, null, i)), this.open++;
  }
  // Make sure all nodes above this.open are finished and added to
  // their parents
  closeExtra(e = !1) {
    let t = this.nodes.length - 1;
    if (t > this.open) {
      for (; t > this.open; t--)
        this.nodes[t - 1].content.push(this.nodes[t].finish(e));
      this.nodes.length = this.open + 1;
    }
  }
  finish() {
    return this.open = 0, this.closeExtra(this.isOpen), this.nodes[0].finish(this.isOpen || this.options.topOpen);
  }
  sync(e) {
    for (let t = this.open; t >= 0; t--)
      if (this.nodes[t] == e)
        return this.open = t, !0;
    return !1;
  }
  get currentPos() {
    this.closeExtra();
    let e = 0;
    for (let t = this.open; t >= 0; t--) {
      let r = this.nodes[t].content;
      for (let o = r.length - 1; o >= 0; o--)
        e += r[o].nodeSize;
      t && e++;
    }
    return e;
  }
  findAtPoint(e, t) {
    if (this.find)
      for (let r = 0; r < this.find.length; r++)
        this.find[r].node == e && this.find[r].offset == t && (this.find[r].pos = this.currentPos);
  }
  findInside(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].pos == null && e.nodeType == 1 && e.contains(this.find[t].node) && (this.find[t].pos = this.currentPos);
  }
  findAround(e, t, r) {
    if (e != t && this.find)
      for (let o = 0; o < this.find.length; o++)
        this.find[o].pos == null && e.nodeType == 1 && e.contains(this.find[o].node) && t.compareDocumentPosition(this.find[o].node) & (r ? 2 : 4) && (this.find[o].pos = this.currentPos);
  }
  findInText(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].node == e && (this.find[t].pos = this.currentPos - (e.nodeValue.length - this.find[t].offset));
  }
  // Determines whether the given context string matches this context.
  matchesContext(e) {
    if (e.indexOf("|") > -1)
      return e.split(/\s*\|\s*/).some(this.matchesContext, this);
    let t = e.split("/"), r = this.options.context, o = !this.isOpen && (!r || r.parent.type == this.nodes[0].type), s = -(r ? r.depth + 1 : 0) + (o ? 0 : 1), i = (a, l) => {
      for (; a >= 0; a--) {
        let c = t[a];
        if (c == "") {
          if (a == t.length - 1 || a == 0)
            continue;
          for (; l >= s; l--)
            if (i(a - 1, l))
              return !0;
          return !1;
        } else {
          let u = l > 0 || l == 0 && o ? this.nodes[l].type : r && l >= s ? r.node(l - s).type : null;
          if (!u || u.name != c && u.groups.indexOf(c) == -1)
            return !1;
          l--;
        }
      }
      return !0;
    };
    return i(t.length - 1, this.open);
  }
  textblockFromContext() {
    let e = this.options.context;
    if (e)
      for (let t = e.depth; t >= 0; t--) {
        let r = e.node(t).contentMatchAt(e.indexAfter(t)).defaultType;
        if (r && r.isTextblock && r.defaultAttrs)
          return r;
      }
    for (let t in this.parser.schema.nodes) {
      let r = this.parser.schema.nodes[t];
      if (r.isTextblock && r.defaultAttrs)
        return r;
    }
  }
  addPendingMark(e) {
    let t = rg(e, this.top.pendingMarks);
    t && this.top.stashMarks.push(t), this.top.pendingMarks = e.addToSet(this.top.pendingMarks);
  }
  removePendingMark(e, t) {
    for (let r = this.open; r >= 0; r--) {
      let o = this.nodes[r];
      if (o.pendingMarks.lastIndexOf(e) > -1)
        o.pendingMarks = e.removeFromSet(o.pendingMarks);
      else {
        o.activeMarks = e.removeFromSet(o.activeMarks);
        let i = o.popFromStashMark(e);
        i && o.type && o.type.allowsMarkType(i.type) && (o.activeMarks = i.addToSet(o.activeMarks));
      }
      if (o == t)
        break;
    }
  }
}
function Xm(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && Lf.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function eg(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function tg(n) {
  let e = /\s*([\w-]+)\s*:\s*([^;]+)/g, t, r = [];
  for (; t = e.exec(n); )
    r.push(t[1], t[2].trim());
  return r;
}
function Lc(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function ng(n, e) {
  let t = e.schema.nodes;
  for (let r in t) {
    let o = t[r];
    if (!o.allowsMarkType(n))
      continue;
    let s = [], i = (a) => {
      s.push(a);
      for (let l = 0; l < a.edgeCount; l++) {
        let { type: c, next: u } = a.edge(l);
        if (c == e || s.indexOf(u) < 0 && i(u))
          return !0;
      }
    };
    if (i(o.contentMatch))
      return !0;
  }
}
function rg(n, e) {
  for (let t = 0; t < e.length; t++)
    if (n.eq(e[t]))
      return e[t];
}
class gt {
  /**
  Create a serializer. `nodes` should map node names to functions
  that take a node and return a description of the corresponding
  DOM. `marks` does the same for mark names, but also gets an
  argument that tells it whether the mark's content is block or
  inline content (for typical use, it'll always be inline). A mark
  serializer may be `null` to indicate that marks of that type
  should not be serialized.
  */
  constructor(e, t) {
    this.nodes = e, this.marks = t;
  }
  /**
  Serialize the content of this fragment to a DOM fragment. When
  not in the browser, the `document` option, containing a DOM
  document, should be passed so that the serializer can create
  nodes.
  */
  serializeFragment(e, t = {}, r) {
    r || (r = Ii(t).createDocumentFragment());
    let o = r, s = [];
    return e.forEach((i) => {
      if (s.length || i.marks.length) {
        let a = 0, l = 0;
        for (; a < s.length && l < i.marks.length; ) {
          let c = i.marks[l];
          if (!this.marks[c.type.name]) {
            l++;
            continue;
          }
          if (!c.eq(s[a][0]) || c.type.spec.spanning === !1)
            break;
          a++, l++;
        }
        for (; a < s.length; )
          o = s.pop()[1];
        for (; l < i.marks.length; ) {
          let c = i.marks[l++], u = this.serializeMark(c, i.isInline, t);
          u && (s.push([c, o]), o.appendChild(u.dom), o = u.contentDOM || u.dom);
        }
      }
      o.appendChild(this.serializeNodeInner(i, t));
    }), r;
  }
  /**
  @internal
  */
  serializeNodeInner(e, t) {
    let { dom: r, contentDOM: o } = gt.renderSpec(Ii(t), this.nodes[e.type.name](e));
    if (o) {
      if (e.isLeaf)
        throw new RangeError("Content hole not allowed in a leaf node spec");
      this.serializeFragment(e.content, t, o);
    }
    return r;
  }
  /**
  Serialize this node to a DOM node. This can be useful when you
  need to serialize a part of a document, as opposed to the whole
  document. To serialize a whole document, use
  [`serializeFragment`](https://prosemirror.net/docs/ref/#model.DOMSerializer.serializeFragment) on
  its [content](https://prosemirror.net/docs/ref/#model.Node.content).
  */
  serializeNode(e, t = {}) {
    let r = this.serializeNodeInner(e, t);
    for (let o = e.marks.length - 1; o >= 0; o--) {
      let s = this.serializeMark(e.marks[o], e.isInline, t);
      s && ((s.contentDOM || s.dom).appendChild(r), r = s.dom);
    }
    return r;
  }
  /**
  @internal
  */
  serializeMark(e, t, r = {}) {
    let o = this.marks[e.type.name];
    return o && gt.renderSpec(Ii(r), o(e, t));
  }
  /**
  Render an [output spec](https://prosemirror.net/docs/ref/#model.DOMOutputSpec) to a DOM node. If
  the spec has a hole (zero) in it, `contentDOM` will point at the
  node with the hole.
  */
  static renderSpec(e, t, r = null) {
    if (typeof t == "string")
      return { dom: e.createTextNode(t) };
    if (t.nodeType != null)
      return { dom: t };
    if (t.dom && t.dom.nodeType != null)
      return t;
    let o = t[0], s = o.indexOf(" ");
    s > 0 && (r = o.slice(0, s), o = o.slice(s + 1));
    let i, a = r ? e.createElementNS(r, o) : e.createElement(o), l = t[1], c = 1;
    if (l && typeof l == "object" && l.nodeType == null && !Array.isArray(l)) {
      c = 2;
      for (let u in l)
        if (l[u] != null) {
          let d = u.indexOf(" ");
          d > 0 ? a.setAttributeNS(u.slice(0, d), u.slice(d + 1), l[u]) : a.setAttribute(u, l[u]);
        }
    }
    for (let u = c; u < t.length; u++) {
      let d = t[u];
      if (d === 0) {
        if (u < t.length - 1 || u > c)
          throw new RangeError("Content hole must be the only child of its parent node");
        return { dom: a, contentDOM: a };
      } else {
        let { dom: f, contentDOM: p } = gt.renderSpec(e, d, r);
        if (a.appendChild(f), p) {
          if (i)
            throw new RangeError("Multiple content holes");
          i = p;
        }
      }
    }
    return { dom: a, contentDOM: i };
  }
  /**
  Build a serializer using the [`toDOM`](https://prosemirror.net/docs/ref/#model.NodeSpec.toDOM)
  properties in a schema's node and mark specs.
  */
  static fromSchema(e) {
    return e.cached.domSerializer || (e.cached.domSerializer = new gt(this.nodesFromSchema(e), this.marksFromSchema(e)));
  }
  /**
  Gather the serializers in a schema's node specs into an object.
  This can be useful as a base to build a custom serializer from.
  */
  static nodesFromSchema(e) {
    let t = Rc(e.nodes);
    return t.text || (t.text = (r) => r.text), t;
  }
  /**
  Gather the serializers in a schema's mark specs into an object.
  */
  static marksFromSchema(e) {
    return Rc(e.marks);
  }
}
function Rc(n) {
  let e = {};
  for (let t in n) {
    let r = n[t].spec.toDOM;
    r && (e[t] = r);
  }
  return e;
}
function Ii(n) {
  return n.document || window.document;
}
const Rf = 65535, If = Math.pow(2, 16);
function og(n, e) {
  return n + e * If;
}
function Ic(n) {
  return n & Rf;
}
function sg(n) {
  return (n - (n & Rf)) / If;
}
const Pf = 1, Bf = 2, ds = 4, Ff = 8;
class La {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.pos = e, this.delInfo = t, this.recover = r;
  }
  /**
  Tells you whether the position was deleted, that is, whether the
  step removed the token on the side queried (via the `assoc`)
  argument from the document.
  */
  get deleted() {
    return (this.delInfo & Ff) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (Pf | ds)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (Bf | ds)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & ds) > 0;
  }
}
class Je {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, t = !1) {
    if (this.ranges = e, this.inverted = t, !e.length && Je.empty)
      return Je.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let t = 0, r = Ic(e);
    if (!this.inverted)
      for (let o = 0; o < r; o++)
        t += this.ranges[o * 3 + 2] - this.ranges[o * 3 + 1];
    return this.ranges[r * 3] + t + sg(e);
  }
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  map(e, t = 1) {
    return this._map(e, t, !0);
  }
  /**
  @internal
  */
  _map(e, t, r) {
    let o = 0, s = this.inverted ? 2 : 1, i = this.inverted ? 1 : 2;
    for (let a = 0; a < this.ranges.length; a += 3) {
      let l = this.ranges[a] - (this.inverted ? o : 0);
      if (l > e)
        break;
      let c = this.ranges[a + s], u = this.ranges[a + i], d = l + c;
      if (e <= d) {
        let f = c ? e == l ? -1 : e == d ? 1 : t : t, p = l + o + (f < 0 ? 0 : u);
        if (r)
          return p;
        let h = e == (t < 0 ? l : d) ? null : og(a / 3, e - l), m = e == l ? Bf : e == d ? Pf : ds;
        return (t < 0 ? e != l : e != d) && (m |= Ff), new La(p, m, h);
      }
      o += u - c;
    }
    return r ? e + o : new La(e + o, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, o = Ic(t), s = this.inverted ? 2 : 1, i = this.inverted ? 1 : 2;
    for (let a = 0; a < this.ranges.length; a += 3) {
      let l = this.ranges[a] - (this.inverted ? r : 0);
      if (l > e)
        break;
      let c = this.ranges[a + s], u = l + c;
      if (e <= u && a == o * 3)
        return !0;
      r += this.ranges[a + i] - c;
    }
    return !1;
  }
  /**
  Calls the given function on each of the changed ranges included in
  this map.
  */
  forEach(e) {
    let t = this.inverted ? 2 : 1, r = this.inverted ? 1 : 2;
    for (let o = 0, s = 0; o < this.ranges.length; o += 3) {
      let i = this.ranges[o], a = i - (this.inverted ? s : 0), l = i + (this.inverted ? 0 : s), c = this.ranges[o + t], u = this.ranges[o + r];
      e(a, a + c, l, l + u), s += u - c;
    }
  }
  /**
  Create an inverted version of this map. The result can be used to
  map positions in the post-step document to the pre-step document.
  */
  invert() {
    return new Je(this.ranges, !this.inverted);
  }
  /**
  @internal
  */
  toString() {
    return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
  }
  /**
  Create a map that moves all positions by offset `n` (which may be
  negative). This can be useful when applying steps meant for a
  sub-document to a larger document, or vice-versa.
  */
  static offset(e) {
    return e == 0 ? Je.empty : new Je(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
Je.empty = new Je([]);
class mr {
  /**
  Create a new mapping with the given position maps.
  */
  constructor(e = [], t, r = 0, o = e.length) {
    this.maps = e, this.mirror = t, this.from = r, this.to = o;
  }
  /**
  Create a mapping that maps only through a part of this one.
  */
  slice(e = 0, t = this.maps.length) {
    return new mr(this.maps, this.mirror, e, t);
  }
  /**
  @internal
  */
  copy() {
    return new mr(this.maps.slice(), this.mirror && this.mirror.slice(), this.from, this.to);
  }
  /**
  Add a step map to the end of this mapping. If `mirrors` is
  given, it should be the index of the step map that is the mirror
  image of this one.
  */
  appendMap(e, t) {
    this.to = this.maps.push(e), t != null && this.setMirror(this.maps.length - 1, t);
  }
  /**
  Add all the step maps in a given mapping to this one (preserving
  mirroring information).
  */
  appendMapping(e) {
    for (let t = 0, r = this.maps.length; t < e.maps.length; t++) {
      let o = e.getMirror(t);
      this.appendMap(e.maps[t], o != null && o < t ? r + o : void 0);
    }
  }
  /**
  Finds the offset of the step map that mirrors the map at the
  given offset, in this mapping (as per the second argument to
  `appendMap`).
  */
  getMirror(e) {
    if (this.mirror) {
      for (let t = 0; t < this.mirror.length; t++)
        if (this.mirror[t] == e)
          return this.mirror[t + (t % 2 ? -1 : 1)];
    }
  }
  /**
  @internal
  */
  setMirror(e, t) {
    this.mirror || (this.mirror = []), this.mirror.push(e, t);
  }
  /**
  Append the inverse of the given mapping to this one.
  */
  appendMappingInverted(e) {
    for (let t = e.maps.length - 1, r = this.maps.length + e.maps.length; t >= 0; t--) {
      let o = e.getMirror(t);
      this.appendMap(e.maps[t].invert(), o != null && o > t ? r - o - 1 : void 0);
    }
  }
  /**
  Create an inverted version of this mapping.
  */
  invert() {
    let e = new mr();
    return e.appendMappingInverted(this), e;
  }
  /**
  Map a position through this mapping.
  */
  map(e, t = 1) {
    if (this.mirror)
      return this._map(e, t, !0);
    for (let r = this.from; r < this.to; r++)
      e = this.maps[r].map(e, t);
    return e;
  }
  /**
  Map a position through this mapping, returning a mapping
  result.
  */
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  /**
  @internal
  */
  _map(e, t, r) {
    let o = 0;
    for (let s = this.from; s < this.to; s++) {
      let i = this.maps[s], a = i.mapResult(e, t);
      if (a.recover != null) {
        let l = this.getMirror(s);
        if (l != null && l > s && l < this.to) {
          s = l, e = this.maps[l].recover(a.recover);
          continue;
        }
      }
      o |= a.delInfo, e = a.pos;
    }
    return r ? e : new La(e, o, null);
  }
}
const Pi = /* @__PURE__ */ Object.create(null);
class qe {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return Je.empty;
  }
  /**
  Try to merge this step with another one, to be applied directly
  after it. Returns the merged step when possible, null if the
  steps can't be merged.
  */
  merge(e) {
    return null;
  }
  /**
  Deserialize a step from its JSON representation. Will call
  through to the step class' own implementation of this method.
  */
  static fromJSON(e, t) {
    if (!t || !t.stepType)
      throw new RangeError("Invalid input for Step.fromJSON");
    let r = Pi[t.stepType];
    if (!r)
      throw new RangeError(`No step type ${t.stepType} defined`);
    return r.fromJSON(e, t);
  }
  /**
  To be able to serialize steps to JSON, each step needs a string
  ID to attach to its JSON representation. Use this method to
  register an ID for your step classes. Try to pick something
  that's unlikely to clash with steps from other modules.
  */
  static jsonID(e, t) {
    if (e in Pi)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return Pi[e] = t, t.prototype.jsonID = e, t;
  }
}
class pe {
  /**
  @internal
  */
  constructor(e, t) {
    this.doc = e, this.failed = t;
  }
  /**
  Create a successful step result.
  */
  static ok(e) {
    return new pe(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new pe(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, r, o) {
    try {
      return pe.ok(e.replace(t, r, o));
    } catch (s) {
      if (s instanceof vs)
        return pe.fail(s.message);
      throw s;
    }
  }
}
function wl(n, e, t) {
  let r = [];
  for (let o = 0; o < n.childCount; o++) {
    let s = n.child(o);
    s.content.size && (s = s.copy(wl(s.content, e, s))), s.isInline && (s = e(s, t, o)), r.push(s);
  }
  return M.fromArray(r);
}
class en extends qe {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), o = r.node(r.sharedDepth(this.to)), s = new N(wl(t.content, (i, a) => !i.isAtom || !a.type.allowsMarkType(this.mark.type) ? i : i.mark(this.mark.addToSet(i.marks)), o), t.openStart, t.openEnd);
    return pe.fromReplace(e, this.from, this.to, s);
  }
  invert() {
    return new yt(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new en(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof en && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new en(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "addMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for AddMarkStep.fromJSON");
    return new en(t.from, t.to, e.markFromJSON(t.mark));
  }
}
qe.jsonID("addMark", en);
class yt extends qe {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new N(wl(t.content, (o) => o.mark(this.mark.removeFromSet(o.marks)), e), t.openStart, t.openEnd);
    return pe.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new en(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new yt(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof yt && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new yt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "removeMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
    return new yt(t.from, t.to, e.markFromJSON(t.mark));
  }
}
qe.jsonID("removeMark", yt);
class tn extends qe {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return pe.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return pe.fromReplace(e, this.pos, this.pos + 1, new N(M.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let r = this.mark.addToSet(t.marks);
      if (r.length == t.marks.length) {
        for (let o = 0; o < t.marks.length; o++)
          if (!t.marks[o].isInSet(r))
            return new tn(this.pos, t.marks[o]);
        return new tn(this.pos, this.mark);
      }
    }
    return new Cr(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new tn(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "addNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");
    return new tn(t.pos, e.markFromJSON(t.mark));
  }
}
qe.jsonID("addNodeMark", tn);
class Cr extends qe {
  /**
  Create a mark-removing step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return pe.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return pe.fromReplace(e, this.pos, this.pos + 1, new N(M.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new tn(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Cr(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "removeNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
    return new Cr(t.pos, e.markFromJSON(t.mark));
  }
}
qe.jsonID("removeNodeMark", Cr);
class xe extends qe {
  /**
  The given `slice` should fit the 'gap' between `from` and
  `to`—the depths must line up, and the surrounding nodes must be
  able to be joined with the open sides of the slice. When
  `structure` is true, the step will fail if the content between
  from and to is not just a sequence of closing and then opening
  tokens (this is to guard against rebased replace steps
  overwriting something they weren't supposed to).
  */
  constructor(e, t, r, o = !1) {
    super(), this.from = e, this.to = t, this.slice = r, this.structure = o;
  }
  apply(e) {
    return this.structure && Ra(e, this.from, this.to) ? pe.fail("Structure replace would overwrite content") : pe.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new Je([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new xe(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deletedAcross && r.deletedAcross ? null : new xe(t.pos, Math.max(t.pos, r.pos), this.slice);
  }
  merge(e) {
    if (!(e instanceof xe) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? N.empty : new N(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new xe(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? N.empty : new N(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new xe(e.from, this.to, t, this.structure);
    } else
      return null;
  }
  toJSON() {
    let e = { stepType: "replace", from: this.from, to: this.to };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for ReplaceStep.fromJSON");
    return new xe(t.from, t.to, N.fromJSON(e, t.slice), !!t.structure);
  }
}
qe.jsonID("replace", xe);
class ge extends qe {
  /**
  Create a replace-around step with the given range and gap.
  `insert` should be the point in the slice into which the content
  of the gap should be moved. `structure` has the same meaning as
  it has in the [`ReplaceStep`](https://prosemirror.net/docs/ref/#transform.ReplaceStep) class.
  */
  constructor(e, t, r, o, s, i, a = !1) {
    super(), this.from = e, this.to = t, this.gapFrom = r, this.gapTo = o, this.slice = s, this.insert = i, this.structure = a;
  }
  apply(e) {
    if (this.structure && (Ra(e, this.from, this.gapFrom) || Ra(e, this.gapTo, this.to)))
      return pe.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return pe.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? pe.fromReplace(e, this.from, this.to, r) : pe.fail("Content does not fit in gap");
  }
  getMap() {
    return new Je([
      this.from,
      this.gapFrom - this.from,
      this.insert,
      this.gapTo,
      this.to - this.gapTo,
      this.slice.size - this.insert
    ]);
  }
  invert(e) {
    let t = this.gapTo - this.gapFrom;
    return new ge(this.from, this.from + this.slice.size + t, this.from + this.insert, this.from + this.insert + t, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), o = e.map(this.gapFrom, -1), s = e.map(this.gapTo, 1);
    return t.deletedAcross && r.deletedAcross || o < t.pos || s > r.pos ? null : new ge(t.pos, r.pos, o, s, this.slice, this.insert, this.structure);
  }
  toJSON() {
    let e = {
      stepType: "replaceAround",
      from: this.from,
      to: this.to,
      gapFrom: this.gapFrom,
      gapTo: this.gapTo,
      insert: this.insert
    };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number" || typeof t.gapFrom != "number" || typeof t.gapTo != "number" || typeof t.insert != "number")
      throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
    return new ge(t.from, t.to, t.gapFrom, t.gapTo, N.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
qe.jsonID("replaceAround", ge);
function Ra(n, e, t) {
  let r = n.resolve(e), o = t - e, s = r.depth;
  for (; o > 0 && s > 0 && r.indexAfter(s) == r.node(s).childCount; )
    s--, o--;
  if (o > 0) {
    let i = r.node(s).maybeChild(r.indexAfter(s));
    for (; o > 0; ) {
      if (!i || i.isLeaf)
        return !0;
      i = i.firstChild, o--;
    }
  }
  return !1;
}
function ig(n, e, t, r) {
  let o = [], s = [], i, a;
  n.doc.nodesBetween(e, t, (l, c, u) => {
    if (!l.isInline)
      return;
    let d = l.marks;
    if (!r.isInSet(d) && u.type.allowsMarkType(r.type)) {
      let f = Math.max(c, e), p = Math.min(c + l.nodeSize, t), h = r.addToSet(d);
      for (let m = 0; m < d.length; m++)
        d[m].isInSet(h) || (i && i.to == f && i.mark.eq(d[m]) ? i.to = p : o.push(i = new yt(f, p, d[m])));
      a && a.to == f ? a.to = p : s.push(a = new en(f, p, r));
    }
  }), o.forEach((l) => n.step(l)), s.forEach((l) => n.step(l));
}
function ag(n, e, t, r) {
  let o = [], s = 0;
  n.doc.nodesBetween(e, t, (i, a) => {
    if (!i.isInline)
      return;
    s++;
    let l = null;
    if (r instanceof ri) {
      let c = i.marks, u;
      for (; u = r.isInSet(c); )
        (l || (l = [])).push(u), c = u.removeFromSet(c);
    } else
      r ? r.isInSet(i.marks) && (l = [r]) : l = i.marks;
    if (l && l.length) {
      let c = Math.min(a + i.nodeSize, t);
      for (let u = 0; u < l.length; u++) {
        let d = l[u], f;
        for (let p = 0; p < o.length; p++) {
          let h = o[p];
          h.step == s - 1 && d.eq(o[p].style) && (f = h);
        }
        f ? (f.to = c, f.step = s) : o.push({ style: d, from: Math.max(a, e), to: c, step: s });
      }
    }
  }), o.forEach((i) => n.step(new yt(i.from, i.to, i.style)));
}
function lg(n, e, t, r = t.contentMatch) {
  let o = n.doc.nodeAt(e), s = [], i = e + 1;
  for (let a = 0; a < o.childCount; a++) {
    let l = o.child(a), c = i + l.nodeSize, u = r.matchType(l.type);
    if (!u)
      s.push(new xe(i, c, N.empty));
    else {
      r = u;
      for (let d = 0; d < l.marks.length; d++)
        t.allowsMarkType(l.marks[d].type) || n.step(new yt(i, c, l.marks[d]));
      if (l.isText && !t.spec.code) {
        let d, f = /\r?\n|\r/g, p;
        for (; d = f.exec(l.text); )
          p || (p = new N(M.from(t.schema.text(" ", t.allowedMarks(l.marks))), 0, 0)), s.push(new xe(i + d.index, i + d.index + d[0].length, p));
      }
    }
    i = c;
  }
  if (!r.validEnd) {
    let a = r.fillBefore(M.empty, !0);
    n.replace(i, i, new N(a, 0, 0));
  }
  for (let a = s.length - 1; a >= 0; a--)
    n.step(s[a]);
}
function cg(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function Pr(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth; ; --r) {
    let o = n.$from.node(r), s = n.$from.index(r), i = n.$to.indexAfter(r);
    if (r < n.depth && o.canReplace(s, i, t))
      return r;
    if (r == 0 || o.type.spec.isolating || !cg(o, s, i))
      break;
  }
  return null;
}
function ug(n, e, t) {
  let { $from: r, $to: o, depth: s } = e, i = r.before(s + 1), a = o.after(s + 1), l = i, c = a, u = M.empty, d = 0;
  for (let h = s, m = !1; h > t; h--)
    m || r.index(h) > 0 ? (m = !0, u = M.from(r.node(h).copy(u)), d++) : l--;
  let f = M.empty, p = 0;
  for (let h = s, m = !1; h > t; h--)
    m || o.after(h + 1) < o.end(h) ? (m = !0, f = M.from(o.node(h).copy(f)), p++) : c++;
  n.step(new ge(l, c, i, a, new N(u.append(f), d, p), u.size - d, !0));
}
function Sl(n, e, t = null, r = n) {
  let o = dg(n, e), s = o && fg(r, e);
  return s ? o.map(Pc).concat({ type: e, attrs: t }).concat(s.map(Pc)) : null;
}
function Pc(n) {
  return { type: n, attrs: null };
}
function dg(n, e) {
  let { parent: t, startIndex: r, endIndex: o } = n, s = t.contentMatchAt(r).findWrapping(e);
  if (!s)
    return null;
  let i = s.length ? s[0] : e;
  return t.canReplaceWith(r, o, i) ? s : null;
}
function fg(n, e) {
  let { parent: t, startIndex: r, endIndex: o } = n, s = t.child(r), i = e.contentMatch.findWrapping(s.type);
  if (!i)
    return null;
  let l = (i.length ? i[i.length - 1] : e).contentMatch;
  for (let c = r; l && c < o; c++)
    l = l.matchType(t.child(c).type);
  return !l || !l.validEnd ? null : i;
}
function pg(n, e, t) {
  let r = M.empty;
  for (let i = t.length - 1; i >= 0; i--) {
    if (r.size) {
      let a = t[i].type.contentMatch.matchFragment(r);
      if (!a || !a.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = M.from(t[i].type.create(t[i].attrs, r));
  }
  let o = e.start, s = e.end;
  n.step(new ge(o, s, o, s, new N(r, 0, 0), t.length, !0));
}
function hg(n, e, t, r, o) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let s = n.steps.length;
  n.doc.nodesBetween(e, t, (i, a) => {
    if (i.isTextblock && !i.hasMarkup(r, o) && mg(n.doc, n.mapping.slice(s).map(a), r)) {
      n.clearIncompatible(n.mapping.slice(s).map(a, 1), r);
      let l = n.mapping.slice(s), c = l.map(a, 1), u = l.map(a + i.nodeSize, 1);
      return n.step(new ge(c, u, c + 1, u - 1, new N(M.from(r.create(o, null, i.marks)), 0, 0), 1, !0)), !1;
    }
  });
}
function mg(n, e, t) {
  let r = n.resolve(e), o = r.index();
  return r.parent.canReplaceWith(o, o + 1, t);
}
function gg(n, e, t, r, o) {
  let s = n.doc.nodeAt(e);
  if (!s)
    throw new RangeError("No node at given position");
  t || (t = s.type);
  let i = t.create(r, null, o || s.marks);
  if (s.isLeaf)
    return n.replaceWith(e, e + s.nodeSize, i);
  if (!t.validContent(s.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new ge(e, e + s.nodeSize, e + 1, e + s.nodeSize - 1, new N(M.from(i), 0, 0), 1, !0));
}
function gr(n, e, t = 1, r) {
  let o = n.resolve(e), s = o.depth - t, i = r && r[r.length - 1] || o.parent;
  if (s < 0 || o.parent.type.spec.isolating || !o.parent.canReplace(o.index(), o.parent.childCount) || !i.type.validContent(o.parent.content.cutByIndex(o.index(), o.parent.childCount)))
    return !1;
  for (let c = o.depth - 1, u = t - 2; c > s; c--, u--) {
    let d = o.node(c), f = o.index(c);
    if (d.type.spec.isolating)
      return !1;
    let p = d.content.cutByIndex(f, d.childCount), h = r && r[u + 1];
    h && (p = p.replaceChild(0, h.type.create(h.attrs)));
    let m = r && r[u] || d;
    if (!d.canReplace(f + 1, d.childCount) || !m.type.validContent(p))
      return !1;
  }
  let a = o.indexAfter(s), l = r && r[0];
  return o.node(s).canReplaceWith(a, a, l ? l.type : o.node(s + 1).type);
}
function yg(n, e, t = 1, r) {
  let o = n.doc.resolve(e), s = M.empty, i = M.empty;
  for (let a = o.depth, l = o.depth - t, c = t - 1; a > l; a--, c--) {
    s = M.from(o.node(a).copy(s));
    let u = r && r[c];
    i = M.from(u ? u.type.create(u.attrs, i) : o.node(a).copy(i));
  }
  n.step(new xe(e, e, new N(s.append(i), t, t), !0));
}
function dn(n, e) {
  let t = n.resolve(e), r = t.index();
  return qf(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function qf(n, e) {
  return !!(n && e && !n.isLeaf && n.canAppend(e));
}
function oi(n, e, t = -1) {
  let r = n.resolve(e);
  for (let o = r.depth; ; o--) {
    let s, i, a = r.index(o);
    if (o == r.depth ? (s = r.nodeBefore, i = r.nodeAfter) : t > 0 ? (s = r.node(o + 1), a++, i = r.node(o).maybeChild(a)) : (s = r.node(o).maybeChild(a - 1), i = r.node(o + 1)), s && !s.isTextblock && qf(s, i) && r.node(o).canReplace(a, a + 1))
      return e;
    if (o == 0)
      break;
    e = t < 0 ? r.before(o) : r.after(o);
  }
}
function vg(n, e, t) {
  let r = new xe(e - t, e + t, N.empty, !0);
  n.step(r);
}
function bg(n, e, t) {
  let r = n.resolve(e);
  if (r.parent.canReplaceWith(r.index(), r.index(), t))
    return e;
  if (r.parentOffset == 0)
    for (let o = r.depth - 1; o >= 0; o--) {
      let s = r.index(o);
      if (r.node(o).canReplaceWith(s, s, t))
        return r.before(o + 1);
      if (s > 0)
        return null;
    }
  if (r.parentOffset == r.parent.content.size)
    for (let o = r.depth - 1; o >= 0; o--) {
      let s = r.indexAfter(o);
      if (r.node(o).canReplaceWith(s, s, t))
        return r.after(o + 1);
      if (s < r.node(o).childCount)
        return null;
    }
  return null;
}
function zf(n, e, t) {
  let r = n.resolve(e);
  if (!t.content.size)
    return e;
  let o = t.content;
  for (let s = 0; s < t.openStart; s++)
    o = o.firstChild.content;
  for (let s = 1; s <= (t.openStart == 0 && t.size ? 2 : 1); s++)
    for (let i = r.depth; i >= 0; i--) {
      let a = i == r.depth ? 0 : r.pos <= (r.start(i + 1) + r.end(i + 1)) / 2 ? -1 : 1, l = r.index(i) + (a > 0 ? 1 : 0), c = r.node(i), u = !1;
      if (s == 1)
        u = c.canReplace(l, l, o);
      else {
        let d = c.contentMatchAt(l).findWrapping(o.firstChild.type);
        u = d && c.canReplaceWith(l, l, d[0]);
      }
      if (u)
        return a == 0 ? r.pos : a < 0 ? r.before(i + 1) : r.after(i + 1);
    }
  return null;
}
function Cl(n, e, t = e, r = N.empty) {
  if (e == t && !r.size)
    return null;
  let o = n.resolve(e), s = n.resolve(t);
  return $f(o, s, r) ? new xe(e, t, r) : new kg(o, s, r).fit();
}
function $f(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class kg {
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.unplaced = r, this.frontier = [], this.placed = M.empty;
    for (let o = 0; o <= e.depth; o++) {
      let s = e.node(o);
      this.frontier.push({
        type: s.type,
        match: s.contentMatchAt(e.indexAfter(o))
      });
    }
    for (let o = e.depth; o > 0; o--)
      this.placed = M.from(e.node(o).copy(this.placed));
  }
  get depth() {
    return this.frontier.length - 1;
  }
  fit() {
    for (; this.unplaced.size; ) {
      let c = this.findFittable();
      c ? this.placeNodes(c) : this.openMore() || this.dropNode();
    }
    let e = this.mustMoveInline(), t = this.placed.size - this.depth - this.$from.depth, r = this.$from, o = this.close(e < 0 ? this.$to : r.doc.resolve(e));
    if (!o)
      return null;
    let s = this.placed, i = r.depth, a = o.depth;
    for (; i && a && s.childCount == 1; )
      s = s.firstChild.content, i--, a--;
    let l = new N(s, i, a);
    return e > -1 ? new ge(r.pos, e, this.$to.pos, this.$to.end(), l, t) : l.size || r.pos != this.$to.pos ? new xe(r.pos, o.pos, l) : null;
  }
  // Find a position on the start spine of `this.unplaced` that has
  // content that can be moved somewhere on the frontier. Returns two
  // depths, one for the slice and one for the frontier.
  findFittable() {
    let e = this.unplaced.openStart;
    for (let t = this.unplaced.content, r = 0, o = this.unplaced.openEnd; r < e; r++) {
      let s = t.firstChild;
      if (t.childCount > 1 && (o = 0), s.type.spec.isolating && o <= r) {
        e = r;
        break;
      }
      t = s.content;
    }
    for (let t = 1; t <= 2; t++)
      for (let r = t == 1 ? e : this.unplaced.openStart; r >= 0; r--) {
        let o, s = null;
        r ? (s = Bi(this.unplaced.content, r - 1).firstChild, o = s.content) : o = this.unplaced.content;
        let i = o.firstChild;
        for (let a = this.depth; a >= 0; a--) {
          let { type: l, match: c } = this.frontier[a], u, d = null;
          if (t == 1 && (i ? c.matchType(i.type) || (d = c.fillBefore(M.from(i), !1)) : s && l.compatibleContent(s.type)))
            return { sliceDepth: r, frontierDepth: a, parent: s, inject: d };
          if (t == 2 && i && (u = c.findWrapping(i.type)))
            return { sliceDepth: r, frontierDepth: a, parent: s, wrap: u };
          if (s && c.matchType(s.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, o = Bi(e, t);
    return !o.childCount || o.firstChild.isLeaf ? !1 : (this.unplaced = new N(e, t + 1, Math.max(r, o.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, o = Bi(e, t);
    if (o.childCount <= 1 && t > 0) {
      let s = e.size - t <= t + o.size;
      this.unplaced = new N(Jr(e, t - 1, 1), t - 1, s ? t - 1 : r);
    } else
      this.unplaced = new N(Jr(e, t, 1), t, r);
  }
  // Move content from the unplaced slice at `sliceDepth` to the
  // frontier node at `frontierDepth`. Close that frontier node when
  // applicable.
  placeNodes({ sliceDepth: e, frontierDepth: t, parent: r, inject: o, wrap: s }) {
    for (; this.depth > t; )
      this.closeFrontierNode();
    if (s)
      for (let m = 0; m < s.length; m++)
        this.openFrontierNode(s[m]);
    let i = this.unplaced, a = r ? r.content : i.content, l = i.openStart - e, c = 0, u = [], { match: d, type: f } = this.frontier[t];
    if (o) {
      for (let m = 0; m < o.childCount; m++)
        u.push(o.child(m));
      d = d.matchFragment(o);
    }
    let p = a.size + e - (i.content.size - i.openEnd);
    for (; c < a.childCount; ) {
      let m = a.child(c), g = d.matchType(m.type);
      if (!g)
        break;
      c++, (c > 1 || l == 0 || m.content.size) && (d = g, u.push(Hf(m.mark(f.allowedMarks(m.marks)), c == 1 ? l : 0, c == a.childCount ? p : -1)));
    }
    let h = c == a.childCount;
    h || (p = -1), this.placed = Zr(this.placed, t, M.from(u)), this.frontier[t].match = d, h && p < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let m = 0, g = a; m < p; m++) {
      let v = g.lastChild;
      this.frontier.push({ type: v.type, match: v.contentMatchAt(v.childCount) }), g = v.content;
    }
    this.unplaced = h ? e == 0 ? N.empty : new N(Jr(i.content, e - 1, 1), e - 1, p < 0 ? i.openEnd : e - 1) : new N(Jr(i.content, e, c), i.openStart, i.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !Fi(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, o = this.$to.after(r);
    for (; r > 1 && o == this.$to.end(--r); )
      ++o;
    return o;
  }
  findCloseLevel(e) {
    e:
      for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
        let { match: r, type: o } = this.frontier[t], s = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), i = Fi(e, t, o, r, s);
        if (i) {
          for (let a = t - 1; a >= 0; a--) {
            let { match: l, type: c } = this.frontier[a], u = Fi(e, a, c, l, !0);
            if (!u || u.childCount)
              continue e;
          }
          return { depth: t, fit: i, move: s ? e.doc.resolve(e.after(t + 1)) : e };
        }
      }
  }
  close(e) {
    let t = this.findCloseLevel(e);
    if (!t)
      return null;
    for (; this.depth > t.depth; )
      this.closeFrontierNode();
    t.fit.childCount && (this.placed = Zr(this.placed, t.depth, t.fit)), e = t.move;
    for (let r = t.depth + 1; r <= e.depth; r++) {
      let o = e.node(r), s = o.type.contentMatch.fillBefore(o.content, !0, e.index(r));
      this.openFrontierNode(o.type, o.attrs, s);
    }
    return e;
  }
  openFrontierNode(e, t = null, r) {
    let o = this.frontier[this.depth];
    o.match = o.match.matchType(e), this.placed = Zr(this.placed, this.depth, M.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(M.empty, !0);
    t.childCount && (this.placed = Zr(this.placed, this.frontier.length, t));
  }
}
function Jr(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(Jr(n.firstChild.content, e - 1, t)));
}
function Zr(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(Zr(n.lastChild.content, e - 1, t)));
}
function Bi(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function Hf(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, Hf(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(M.empty, !0)))), n.copy(r);
}
function Fi(n, e, t, r, o) {
  let s = n.node(e), i = o ? n.indexAfter(e) : n.index(e);
  if (i == s.childCount && !t.compatibleContent(s.type))
    return null;
  let a = r.fillBefore(s.content, !0, i);
  return a && !xg(t, s.content, i) ? a : null;
}
function xg(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function wg(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function Sg(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let o = n.doc.resolve(e), s = n.doc.resolve(t);
  if ($f(o, s, r))
    return n.step(new xe(e, t, r));
  let i = jf(o, n.doc.resolve(t));
  i[i.length - 1] == 0 && i.pop();
  let a = -(o.depth + 1);
  i.unshift(a);
  for (let f = o.depth, p = o.pos - 1; f > 0; f--, p--) {
    let h = o.node(f).type.spec;
    if (h.defining || h.definingAsContext || h.isolating)
      break;
    i.indexOf(f) > -1 ? a = f : o.before(f) == p && i.splice(1, 0, -f);
  }
  let l = i.indexOf(a), c = [], u = r.openStart;
  for (let f = r.content, p = 0; ; p++) {
    let h = f.firstChild;
    if (c.push(h), p == r.openStart)
      break;
    f = h.content;
  }
  for (let f = u - 1; f >= 0; f--) {
    let p = c[f], h = wg(p.type);
    if (h && !p.sameMarkup(o.node(Math.abs(a) - 1)))
      u = f;
    else if (h || !p.type.isTextblock)
      break;
  }
  for (let f = r.openStart; f >= 0; f--) {
    let p = (f + u + 1) % (r.openStart + 1), h = c[p];
    if (h)
      for (let m = 0; m < i.length; m++) {
        let g = i[(m + l) % i.length], v = !0;
        g < 0 && (v = !1, g = -g);
        let b = o.node(g - 1), x = o.index(g - 1);
        if (b.canReplaceWith(x, x, h.type, h.marks))
          return n.replace(o.before(g), v ? s.after(g) : t, new N(Vf(r.content, 0, r.openStart, p), p, r.openEnd));
      }
  }
  let d = n.steps.length;
  for (let f = i.length - 1; f >= 0 && (n.replace(e, t, r), !(n.steps.length > d)); f--) {
    let p = i[f];
    p < 0 || (e = o.before(p), t = s.after(p));
  }
}
function Vf(n, e, t, r, o) {
  if (e < t) {
    let s = n.firstChild;
    n = n.replaceChild(0, s.copy(Vf(s.content, e + 1, t, r, s)));
  }
  if (e > r) {
    let s = o.contentMatchAt(0), i = s.fillBefore(n).append(n);
    n = i.append(s.matchFragment(i).fillBefore(M.empty, !0));
  }
  return n;
}
function Cg(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let o = bg(n.doc, e, r.type);
    o != null && (e = t = o);
  }
  n.replaceRange(e, t, new N(M.from(r), 0, 0));
}
function Eg(n, e, t) {
  let r = n.doc.resolve(e), o = n.doc.resolve(t), s = jf(r, o);
  for (let i = 0; i < s.length; i++) {
    let a = s[i], l = i == s.length - 1;
    if (l && a == 0 || r.node(a).type.contentMatch.validEnd)
      return n.delete(r.start(a), o.end(a));
    if (a > 0 && (l || r.node(a - 1).canReplace(r.index(a - 1), o.indexAfter(a - 1))))
      return n.delete(r.before(a), o.after(a));
  }
  for (let i = 1; i <= r.depth && i <= o.depth; i++)
    if (e - r.start(i) == r.depth - i && t > r.end(i) && o.end(i) - t != o.depth - i)
      return n.delete(r.before(i), t);
  n.delete(e, t);
}
function jf(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let o = r; o >= 0; o--) {
    let s = n.start(o);
    if (s < n.pos - (n.depth - o) || e.end(o) > e.pos + (e.depth - o) || n.node(o).type.spec.isolating || e.node(o).type.spec.isolating)
      break;
    (s == e.start(o) || o == n.depth && o == e.depth && n.parent.inlineContent && e.parent.inlineContent && o && e.start(o - 1) == s - 1) && t.push(o);
  }
  return t;
}
class yr extends qe {
  /**
  Construct an attribute step.
  */
  constructor(e, t, r) {
    super(), this.pos = e, this.attr = t, this.value = r;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return pe.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let s in t.attrs)
      r[s] = t.attrs[s];
    r[this.attr] = this.value;
    let o = t.type.create(r, null, t.marks);
    return pe.fromReplace(e, this.pos, this.pos + 1, new N(M.from(o), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return Je.empty;
  }
  invert(e) {
    return new yr(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new yr(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new yr(t.pos, t.attr, t.value);
  }
}
qe.jsonID("attr", yr);
let Er = class extends Error {
};
Er = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
Er.prototype = Object.create(Error.prototype);
Er.prototype.constructor = Er;
Er.prototype.name = "TransformError";
class Uf {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new mr();
  }
  /**
  The starting document.
  */
  get before() {
    return this.docs.length ? this.docs[0] : this.doc;
  }
  /**
  Apply a new step in this transform, saving the result. Throws an
  error when the step fails.
  */
  step(e) {
    let t = this.maybeStep(e);
    if (t.failed)
      throw new Er(t.failed);
    return this;
  }
  /**
  Try to apply a step in this transformation, ignoring it if it
  fails. Returns the step result.
  */
  maybeStep(e) {
    let t = e.apply(this.doc);
    return t.failed || this.addStep(e, t.doc), t;
  }
  /**
  True when the document has been changed (when there are any
  steps).
  */
  get docChanged() {
    return this.steps.length > 0;
  }
  /**
  @internal
  */
  addStep(e, t) {
    this.docs.push(this.doc), this.steps.push(e), this.mapping.appendMap(e.getMap()), this.doc = t;
  }
  /**
  Replace the part of the document between `from` and `to` with the
  given `slice`.
  */
  replace(e, t = e, r = N.empty) {
    let o = Cl(this.doc, e, t, r);
    return o && this.step(o), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new N(M.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, t) {
    return this.replace(e, t, N.empty);
  }
  /**
  Insert the given content at the given position.
  */
  insert(e, t) {
    return this.replaceWith(e, e, t);
  }
  /**
  Replace a range of the document with a given slice, using
  `from`, `to`, and the slice's
  [`openStart`](https://prosemirror.net/docs/ref/#model.Slice.openStart) property as hints, rather
  than fixed start and end points. This method may grow the
  replaced area or close open nodes in the slice in order to get a
  fit that is more in line with WYSIWYG expectations, by dropping
  fully covered parent nodes of the replaced region when they are
  marked [non-defining as
  context](https://prosemirror.net/docs/ref/#model.NodeSpec.definingAsContext), or including an
  open parent node from the slice that _is_ marked as [defining
  its content](https://prosemirror.net/docs/ref/#model.NodeSpec.definingForContent).
  
  This is the method, for example, to handle paste. The similar
  [`replace`](https://prosemirror.net/docs/ref/#transform.Transform.replace) method is a more
  primitive tool which will _not_ move the start and end of its given
  range, and is useful in situations where you need more precise
  control over what happens.
  */
  replaceRange(e, t, r) {
    return Sg(this, e, t, r), this;
  }
  /**
  Replace the given range with a node, but use `from` and `to` as
  hints, rather than precise positions. When from and to are the same
  and are at the start or end of a parent node in which the given
  node doesn't fit, this method may _move_ them out towards a parent
  that does allow the given node to be placed. When the given range
  completely covers a parent node, this method may completely replace
  that parent node.
  */
  replaceRangeWith(e, t, r) {
    return Cg(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return Eg(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return ug(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return vg(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return pg(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, r, o = null) {
    return hg(this, e, t, r, o), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, o) {
    return gg(this, e, t, r, o), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  */
  setNodeAttribute(e, t, r) {
    return this.step(new yr(e, t, r)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, t) {
    return this.step(new tn(e, t)), this;
  }
  /**
  Remove a mark (or a mark of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(e, t) {
    if (!(t instanceof Z)) {
      let r = this.doc.nodeAt(e);
      if (!r)
        throw new RangeError("No node at position " + e);
      if (t = t.isInSet(r.marks), !t)
        return this;
    }
    return this.step(new Cr(e, t)), this;
  }
  /**
  Split the node at the given position, and optionally, if `depth` is
  greater than one, any number of nodes above that. By default, the
  parts split off will inherit the node type of the original node.
  This can be changed by passing an array of types and attributes to
  use after the split.
  */
  split(e, t = 1, r) {
    return yg(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return ig(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return ag(this, e, t, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, r) {
    return lg(this, e, t, r), this;
  }
}
const qi = /* @__PURE__ */ Object.create(null);
class W {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new Ag(e.min(t), e.max(t))];
  }
  /**
  The selection's anchor, as an unresolved position.
  */
  get anchor() {
    return this.$anchor.pos;
  }
  /**
  The selection's head.
  */
  get head() {
    return this.$head.pos;
  }
  /**
  The lower bound of the selection's main range.
  */
  get from() {
    return this.$from.pos;
  }
  /**
  The upper bound of the selection's main range.
  */
  get to() {
    return this.$to.pos;
  }
  /**
  The resolved lower  bound of the selection's main range.
  */
  get $from() {
    return this.ranges[0].$from;
  }
  /**
  The resolved upper bound of the selection's main range.
  */
  get $to() {
    return this.ranges[0].$to;
  }
  /**
  Indicates whether the selection contains any content.
  */
  get empty() {
    let e = this.ranges;
    for (let t = 0; t < e.length; t++)
      if (e[t].$from.pos != e[t].$to.pos)
        return !1;
    return !0;
  }
  /**
  Get the content of this selection as a slice.
  */
  content() {
    return this.$from.doc.slice(this.from, this.to, !0);
  }
  /**
  Replace the selection with a slice or, if no slice is given,
  delete the selection. Will append to the given transaction.
  */
  replace(e, t = N.empty) {
    let r = t.content.lastChild, o = null;
    for (let a = 0; a < t.openEnd; a++)
      o = r, r = r.lastChild;
    let s = e.steps.length, i = this.ranges;
    for (let a = 0; a < i.length; a++) {
      let { $from: l, $to: c } = i[a], u = e.mapping.slice(s);
      e.replaceRange(u.map(l.pos), u.map(c.pos), a ? N.empty : t), a == 0 && qc(e, s, (r ? r.isInline : o && o.isTextblock) ? -1 : 1);
    }
  }
  /**
  Replace the selection with the given node, appending the changes
  to the given transaction.
  */
  replaceWith(e, t) {
    let r = e.steps.length, o = this.ranges;
    for (let s = 0; s < o.length; s++) {
      let { $from: i, $to: a } = o[s], l = e.mapping.slice(r), c = l.map(i.pos), u = l.map(a.pos);
      s ? e.deleteRange(c, u) : (e.replaceRangeWith(c, u, t), qc(e, r, t.isInline ? -1 : 1));
    }
  }
  /**
  Find a valid cursor or leaf node selection starting at the given
  position and searching back if `dir` is negative, and forward if
  positive. When `textOnly` is true, only consider cursor
  selections. Will return null when no valid selection position is
  found.
  */
  static findFrom(e, t, r = !1) {
    let o = e.parent.inlineContent ? new j(e) : or(e.node(0), e.parent, e.pos, e.index(), t, r);
    if (o)
      return o;
    for (let s = e.depth - 1; s >= 0; s--) {
      let i = t < 0 ? or(e.node(0), e.node(s), e.before(s + 1), e.index(s), t, r) : or(e.node(0), e.node(s), e.after(s + 1), e.index(s) + 1, t, r);
      if (i)
        return i;
    }
    return null;
  }
  /**
  Find a valid cursor or leaf node selection near the given
  position. Searches forward first by default, but if `bias` is
  negative, it will search backwards first.
  */
  static near(e, t = 1) {
    return this.findFrom(e, t) || this.findFrom(e, -t) || new at(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return or(e, e, 0, 0, 1) || new at(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return or(e, e, e.content.size, e.childCount, -1) || new at(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = qi[t.type];
    if (!r)
      throw new RangeError(`No selection type ${t.type} defined`);
    return r.fromJSON(e, t);
  }
  /**
  To be able to deserialize selections from JSON, custom selection
  classes must register themselves with an ID string, so that they
  can be disambiguated. Try to pick something that's unlikely to
  clash with classes from other modules.
  */
  static jsonID(e, t) {
    if (e in qi)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return qi[e] = t, t.prototype.jsonID = e, t;
  }
  /**
  Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
  which is a value that can be mapped without having access to a
  current document, and later resolved to a real selection for a
  given document again. (This is used mostly by the history to
  track and restore old selections.) The default implementation of
  this method just converts the selection to a text selection and
  returns the bookmark for that.
  */
  getBookmark() {
    return j.between(this.$anchor, this.$head).getBookmark();
  }
}
W.prototype.visible = !0;
class Ag {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let Bc = !1;
function Fc(n) {
  !Bc && !n.parent.inlineContent && (Bc = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class j extends W {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    Fc(e), Fc(t), super(e, t);
  }
  /**
  Returns a resolved position if this is a cursor selection (an
  empty text selection), and null otherwise.
  */
  get $cursor() {
    return this.$anchor.pos == this.$head.pos ? this.$head : null;
  }
  map(e, t) {
    let r = e.resolve(t.map(this.head));
    if (!r.parent.inlineContent)
      return W.near(r);
    let o = e.resolve(t.map(this.anchor));
    return new j(o.parent.inlineContent ? o : r, r);
  }
  replace(e, t = N.empty) {
    if (super.replace(e, t), t == N.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof j && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new si(this.anchor, this.head);
  }
  toJSON() {
    return { type: "text", anchor: this.anchor, head: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number" || typeof t.head != "number")
      throw new RangeError("Invalid input for TextSelection.fromJSON");
    return new j(e.resolve(t.anchor), e.resolve(t.head));
  }
  /**
  Create a text selection from non-resolved positions.
  */
  static create(e, t, r = t) {
    let o = e.resolve(t);
    return new this(o, r == t ? o : e.resolve(r));
  }
  /**
  Return a text selection that spans the given positions or, if
  they aren't text positions, find a text selection near them.
  `bias` determines whether the method searches forward (default)
  or backwards (negative number) first. Will fall back to calling
  [`Selection.near`](https://prosemirror.net/docs/ref/#state.Selection^near) when the document
  doesn't contain a valid text position.
  */
  static between(e, t, r) {
    let o = e.pos - t.pos;
    if ((!r || o) && (r = o >= 0 ? 1 : -1), !t.parent.inlineContent) {
      let s = W.findFrom(t, r, !0) || W.findFrom(t, -r, !0);
      if (s)
        t = s.$head;
      else
        return W.near(t, r);
    }
    return e.parent.inlineContent || (o == 0 ? e = t : (e = (W.findFrom(e, -r, !0) || W.findFrom(e, r, !0)).$anchor, e.pos < t.pos != o < 0 && (e = t))), new j(e, t);
  }
}
W.jsonID("text", j);
class si {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new si(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return j.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class $ extends W {
  /**
  Create a node selection. Does not verify the validity of its
  argument.
  */
  constructor(e) {
    let t = e.nodeAfter, r = e.node(0).resolve(e.pos + t.nodeSize);
    super(e, r), this.node = t;
  }
  map(e, t) {
    let { deleted: r, pos: o } = t.mapResult(this.anchor), s = e.resolve(o);
    return r ? W.near(s) : new $(s);
  }
  content() {
    return new N(M.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof $ && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new El(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new $(e.resolve(t.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, t) {
    return new $(e.resolve(t));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
$.prototype.visible = !1;
W.jsonID("node", $);
class El {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new si(r, r) : new El(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && $.isSelectable(r) ? new $(t) : W.near(t);
  }
}
class at extends W {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = N.empty) {
    if (t == N.empty) {
      e.delete(0, e.doc.content.size);
      let r = W.atStart(e.doc);
      r.eq(e.selection) || e.setSelection(r);
    } else
      super.replace(e, t);
  }
  toJSON() {
    return { type: "all" };
  }
  /**
  @internal
  */
  static fromJSON(e) {
    return new at(e);
  }
  map(e) {
    return new at(e);
  }
  eq(e) {
    return e instanceof at;
  }
  getBookmark() {
    return Tg;
  }
}
W.jsonID("all", at);
const Tg = {
  map() {
    return this;
  },
  resolve(n) {
    return new at(n);
  }
};
function or(n, e, t, r, o, s = !1) {
  if (e.inlineContent)
    return j.create(n, t);
  for (let i = r - (o > 0 ? 0 : 1); o > 0 ? i < e.childCount : i >= 0; i += o) {
    let a = e.child(i);
    if (a.isAtom) {
      if (!s && $.isSelectable(a))
        return $.create(n, t - (o < 0 ? a.nodeSize : 0));
    } else {
      let l = or(n, a, t + o, o < 0 ? a.childCount : 0, o, s);
      if (l)
        return l;
    }
    t += a.nodeSize * o;
  }
  return null;
}
function qc(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let o = n.steps[r];
  if (!(o instanceof xe || o instanceof ge))
    return;
  let s = n.mapping.maps[r], i;
  s.forEach((a, l, c, u) => {
    i == null && (i = u);
  }), n.setSelection(W.near(n.doc.resolve(i), t));
}
const zc = 1, Zo = 2, $c = 4;
class Mg extends Uf {
  /**
  @internal
  */
  constructor(e) {
    super(e.doc), this.curSelectionFor = 0, this.updated = 0, this.meta = /* @__PURE__ */ Object.create(null), this.time = Date.now(), this.curSelection = e.selection, this.storedMarks = e.storedMarks;
  }
  /**
  The transaction's current selection. This defaults to the editor
  selection [mapped](https://prosemirror.net/docs/ref/#state.Selection.map) through the steps in the
  transaction, but can be overwritten with
  [`setSelection`](https://prosemirror.net/docs/ref/#state.Transaction.setSelection).
  */
  get selection() {
    return this.curSelectionFor < this.steps.length && (this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor)), this.curSelectionFor = this.steps.length), this.curSelection;
  }
  /**
  Update the transaction's current selection. Will determine the
  selection that the editor gets when the transaction is applied.
  */
  setSelection(e) {
    if (e.$from.doc != this.doc)
      throw new RangeError("Selection passed to setSelection must point at the current document");
    return this.curSelection = e, this.curSelectionFor = this.steps.length, this.updated = (this.updated | zc) & ~Zo, this.storedMarks = null, this;
  }
  /**
  Whether the selection was explicitly updated by this transaction.
  */
  get selectionSet() {
    return (this.updated & zc) > 0;
  }
  /**
  Set the current stored marks.
  */
  setStoredMarks(e) {
    return this.storedMarks = e, this.updated |= Zo, this;
  }
  /**
  Make sure the current stored marks or, if that is null, the marks
  at the selection, match the given set of marks. Does nothing if
  this is already the case.
  */
  ensureMarks(e) {
    return Z.sameSet(this.storedMarks || this.selection.$from.marks(), e) || this.setStoredMarks(e), this;
  }
  /**
  Add a mark to the set of stored marks.
  */
  addStoredMark(e) {
    return this.ensureMarks(e.addToSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Remove a mark or mark type from the set of stored marks.
  */
  removeStoredMark(e) {
    return this.ensureMarks(e.removeFromSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Whether the stored marks were explicitly set for this transaction.
  */
  get storedMarksSet() {
    return (this.updated & Zo) > 0;
  }
  /**
  @internal
  */
  addStep(e, t) {
    super.addStep(e, t), this.updated = this.updated & ~Zo, this.storedMarks = null;
  }
  /**
  Update the timestamp for the transaction.
  */
  setTime(e) {
    return this.time = e, this;
  }
  /**
  Replace the current selection with the given slice.
  */
  replaceSelection(e) {
    return this.selection.replace(this, e), this;
  }
  /**
  Replace the selection with the given node. When `inheritMarks` is
  true and the content is inline, it inherits the marks from the
  place where it is inserted.
  */
  replaceSelectionWith(e, t = !0) {
    let r = this.selection;
    return t && (e = e.mark(this.storedMarks || (r.empty ? r.$from.marks() : r.$from.marksAcross(r.$to) || Z.none))), r.replaceWith(this, e), this;
  }
  /**
  Delete the selection.
  */
  deleteSelection() {
    return this.selection.replace(this), this;
  }
  /**
  Replace the given range, or the selection if no range is given,
  with a text node containing the given string.
  */
  insertText(e, t, r) {
    let o = this.doc.type.schema;
    if (t == null)
      return e ? this.replaceSelectionWith(o.text(e), !0) : this.deleteSelection();
    {
      if (r == null && (r = t), r = r ?? t, !e)
        return this.deleteRange(t, r);
      let s = this.storedMarks;
      if (!s) {
        let i = this.doc.resolve(t);
        s = r == t ? i.marks() : i.marksAcross(this.doc.resolve(r));
      }
      return this.replaceRangeWith(t, r, o.text(e, s)), this.selection.empty || this.setSelection(W.near(this.selection.$to)), this;
    }
  }
  /**
  Store a metadata property in this transaction, keyed either by
  name or by plugin.
  */
  setMeta(e, t) {
    return this.meta[typeof e == "string" ? e : e.key] = t, this;
  }
  /**
  Retrieve a metadata property for a given name or plugin.
  */
  getMeta(e) {
    return this.meta[typeof e == "string" ? e : e.key];
  }
  /**
  Returns true if this transaction doesn't contain any metadata,
  and can thus safely be extended.
  */
  get isGeneric() {
    for (let e in this.meta)
      return !1;
    return !0;
  }
  /**
  Indicate that the editor should scroll the selection into view
  when updated to the state produced by this transaction.
  */
  scrollIntoView() {
    return this.updated |= $c, this;
  }
  /**
  True when this transaction has had `scrollIntoView` called on it.
  */
  get scrolledIntoView() {
    return (this.updated & $c) > 0;
  }
}
function Hc(n, e) {
  return !e || !n ? n : n.bind(e);
}
class Yr {
  constructor(e, t, r) {
    this.name = e, this.init = Hc(t.init, r), this.apply = Hc(t.apply, r);
  }
}
const Og = [
  new Yr("doc", {
    init(n) {
      return n.doc || n.schema.topNodeType.createAndFill();
    },
    apply(n) {
      return n.doc;
    }
  }),
  new Yr("selection", {
    init(n, e) {
      return n.selection || W.atStart(e.doc);
    },
    apply(n) {
      return n.selection;
    }
  }),
  new Yr("storedMarks", {
    init(n) {
      return n.storedMarks || null;
    },
    apply(n, e, t, r) {
      return r.selection.$cursor ? n.storedMarks : null;
    }
  }),
  new Yr("scrollToSelection", {
    init() {
      return 0;
    },
    apply(n, e) {
      return n.scrolledIntoView ? e + 1 : e;
    }
  })
];
class zi {
  constructor(e, t) {
    this.schema = e, this.plugins = [], this.pluginsByKey = /* @__PURE__ */ Object.create(null), this.fields = Og.slice(), t && t.forEach((r) => {
      if (this.pluginsByKey[r.key])
        throw new RangeError("Adding different instances of a keyed plugin (" + r.key + ")");
      this.plugins.push(r), this.pluginsByKey[r.key] = r, r.spec.state && this.fields.push(new Yr(r.key, r.spec.state, r));
    });
  }
}
class ur {
  /**
  @internal
  */
  constructor(e) {
    this.config = e;
  }
  /**
  The schema of the state's document.
  */
  get schema() {
    return this.config.schema;
  }
  /**
  The plugins that are active in this state.
  */
  get plugins() {
    return this.config.plugins;
  }
  /**
  Apply the given transaction to produce a new state.
  */
  apply(e) {
    return this.applyTransaction(e).state;
  }
  /**
  @internal
  */
  filterTransaction(e, t = -1) {
    for (let r = 0; r < this.config.plugins.length; r++)
      if (r != t) {
        let o = this.config.plugins[r];
        if (o.spec.filterTransaction && !o.spec.filterTransaction.call(o, e, this))
          return !1;
      }
    return !0;
  }
  /**
  Verbose variant of [`apply`](https://prosemirror.net/docs/ref/#state.EditorState.apply) that
  returns the precise transactions that were applied (which might
  be influenced by the [transaction
  hooks](https://prosemirror.net/docs/ref/#state.PluginSpec.filterTransaction) of
  plugins) along with the new state.
  */
  applyTransaction(e) {
    if (!this.filterTransaction(e))
      return { state: this, transactions: [] };
    let t = [e], r = this.applyInner(e), o = null;
    for (; ; ) {
      let s = !1;
      for (let i = 0; i < this.config.plugins.length; i++) {
        let a = this.config.plugins[i];
        if (a.spec.appendTransaction) {
          let l = o ? o[i].n : 0, c = o ? o[i].state : this, u = l < t.length && a.spec.appendTransaction.call(a, l ? t.slice(l) : t, c, r);
          if (u && r.filterTransaction(u, i)) {
            if (u.setMeta("appendedTransaction", e), !o) {
              o = [];
              for (let d = 0; d < this.config.plugins.length; d++)
                o.push(d < i ? { state: r, n: t.length } : { state: this, n: 0 });
            }
            t.push(u), r = r.applyInner(u), s = !0;
          }
          o && (o[i] = { state: r, n: t.length });
        }
      }
      if (!s)
        return { state: r, transactions: t };
    }
  }
  /**
  @internal
  */
  applyInner(e) {
    if (!e.before.eq(this.doc))
      throw new RangeError("Applying a mismatched transaction");
    let t = new ur(this.config), r = this.config.fields;
    for (let o = 0; o < r.length; o++) {
      let s = r[o];
      t[s.name] = s.apply(e, this[s.name], this, t);
    }
    return t;
  }
  /**
  Start a [transaction](https://prosemirror.net/docs/ref/#state.Transaction) from this state.
  */
  get tr() {
    return new Mg(this);
  }
  /**
  Create a new state.
  */
  static create(e) {
    let t = new zi(e.doc ? e.doc.type.schema : e.schema, e.plugins), r = new ur(t);
    for (let o = 0; o < t.fields.length; o++)
      r[t.fields[o].name] = t.fields[o].init(e, r);
    return r;
  }
  /**
  Create a new state based on this one, but with an adjusted set
  of active plugins. State fields that exist in both sets of
  plugins are kept unchanged. Those that no longer exist are
  dropped, and those that are new are initialized using their
  [`init`](https://prosemirror.net/docs/ref/#state.StateField.init) method, passing in the new
  configuration object..
  */
  reconfigure(e) {
    let t = new zi(this.schema, e.plugins), r = t.fields, o = new ur(t);
    for (let s = 0; s < r.length; s++) {
      let i = r[s].name;
      o[i] = this.hasOwnProperty(i) ? this[i] : r[s].init(e, o);
    }
    return o;
  }
  /**
  Serialize this state to JSON. If you want to serialize the state
  of plugins, pass an object mapping property names to use in the
  resulting JSON object to plugin objects. The argument may also be
  a string or number, in which case it is ignored, to support the
  way `JSON.stringify` calls `toString` methods.
  */
  toJSON(e) {
    let t = { doc: this.doc.toJSON(), selection: this.selection.toJSON() };
    if (this.storedMarks && (t.storedMarks = this.storedMarks.map((r) => r.toJSON())), e && typeof e == "object")
      for (let r in e) {
        if (r == "doc" || r == "selection")
          throw new RangeError("The JSON fields `doc` and `selection` are reserved");
        let o = e[r], s = o.spec.state;
        s && s.toJSON && (t[r] = s.toJSON.call(o, this[o.key]));
      }
    return t;
  }
  /**
  Deserialize a JSON representation of a state. `config` should
  have at least a `schema` field, and should contain array of
  plugins to initialize the state with. `pluginFields` can be used
  to deserialize the state of plugins, by associating plugin
  instances with the property names they use in the JSON object.
  */
  static fromJSON(e, t, r) {
    if (!t)
      throw new RangeError("Invalid input for EditorState.fromJSON");
    if (!e.schema)
      throw new RangeError("Required config field 'schema' missing");
    let o = new zi(e.schema, e.plugins), s = new ur(o);
    return o.fields.forEach((i) => {
      if (i.name == "doc")
        s.doc = Ln.fromJSON(e.schema, t.doc);
      else if (i.name == "selection")
        s.selection = W.fromJSON(s.doc, t.selection);
      else if (i.name == "storedMarks")
        t.storedMarks && (s.storedMarks = t.storedMarks.map(e.schema.markFromJSON));
      else {
        if (r)
          for (let a in r) {
            let l = r[a], c = l.spec.state;
            if (l.key == i.name && c && c.fromJSON && Object.prototype.hasOwnProperty.call(t, a)) {
              s[i.name] = c.fromJSON.call(l, e, t[a], s);
              return;
            }
          }
        s[i.name] = i.init(e, s);
      }
    }), s;
  }
}
function Wf(n, e, t) {
  for (let r in n) {
    let o = n[r];
    o instanceof Function ? o = o.bind(e) : r == "handleDOMEvents" && (o = Wf(o, e, {})), t[r] = o;
  }
  return t;
}
class fe {
  /**
  Create a plugin.
  */
  constructor(e) {
    this.spec = e, this.props = {}, e.props && Wf(e.props, this, this.props), this.key = e.key ? e.key.key : Kf("plugin");
  }
  /**
  Extract the plugin's state field from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const $i = /* @__PURE__ */ Object.create(null);
function Kf(n) {
  return n in $i ? n + "$" + ++$i[n] : ($i[n] = 0, n + "$");
}
class Te {
  /**
  Create a plugin key.
  */
  constructor(e = "key") {
    this.key = Kf(e);
  }
  /**
  Get the active plugin with this key, if any, from an editor
  state.
  */
  get(e) {
    return e.config.pluginsByKey[this.key];
  }
  /**
  Get the plugin's state from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const De = function(n) {
  for (var e = 0; ; e++)
    if (n = n.previousSibling, !n)
      return e;
}, mo = function(n) {
  let e = n.assignedSlot || n.parentNode;
  return e && e.nodeType == 11 ? e.host : e;
};
let Vc = null;
const Rt = function(n, e, t) {
  let r = Vc || (Vc = document.createRange());
  return r.setEnd(n, t ?? n.nodeValue.length), r.setStart(n, e || 0), r;
}, qn = function(n, e, t, r) {
  return t && (jc(n, e, t, r, -1) || jc(n, e, t, r, 1));
}, Dg = /^(img|br|input|textarea|hr)$/i;
function jc(n, e, t, r, o) {
  for (; ; ) {
    if (n == t && e == r)
      return !0;
    if (e == (o < 0 ? 0 : mt(n))) {
      let s = n.parentNode;
      if (!s || s.nodeType != 1 || Al(n) || Dg.test(n.nodeName) || n.contentEditable == "false")
        return !1;
      e = De(n) + (o < 0 ? 0 : 1), n = s;
    } else if (n.nodeType == 1) {
      if (n = n.childNodes[e + (o < 0 ? -1 : 0)], n.contentEditable == "false")
        return !1;
      e = o < 0 ? mt(n) : 0;
    } else
      return !1;
  }
}
function mt(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function _g(n, e, t) {
  for (let r = e == 0, o = e == mt(n); r || o; ) {
    if (n == t)
      return !0;
    let s = De(n);
    if (n = n.parentNode, !n)
      return !1;
    r = r && s == 0, o = o && s == mt(n);
  }
}
function Al(n) {
  let e;
  for (let t = n; t && !(e = t.pmViewDesc); t = t.parentNode)
    ;
  return e && e.node && e.node.isBlock && (e.dom == n || e.contentDOM == n);
}
const ii = function(n) {
  return n.focusNode && qn(n.focusNode, n.focusOffset, n.anchorNode, n.anchorOffset);
};
function xn(n, e) {
  let t = document.createEvent("Event");
  return t.initEvent("keydown", !0, !0), t.keyCode = n, t.key = t.code = e, t;
}
function Ng(n) {
  let e = n.activeElement;
  for (; e && e.shadowRoot; )
    e = e.shadowRoot.activeElement;
  return e;
}
function Lg(n, e, t) {
  if (n.caretPositionFromPoint)
    try {
      let r = n.caretPositionFromPoint(e, t);
      if (r)
        return { node: r.offsetNode, offset: r.offset };
    } catch {
    }
  if (n.caretRangeFromPoint) {
    let r = n.caretRangeFromPoint(e, t);
    if (r)
      return { node: r.startContainer, offset: r.startOffset };
  }
}
const wt = typeof navigator < "u" ? navigator : null, Uc = typeof document < "u" ? document : null, fn = wt && wt.userAgent || "", Ia = /Edge\/(\d+)/.exec(fn), Gf = /MSIE \d/.exec(fn), Pa = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(fn), Pe = !!(Gf || Pa || Ia), rn = Gf ? document.documentMode : Pa ? +Pa[1] : Ia ? +Ia[1] : 0, lt = !Pe && /gecko\/(\d+)/i.test(fn);
lt && +(/Firefox\/(\d+)/.exec(fn) || [0, 0])[1];
const Ba = !Pe && /Chrome\/(\d+)/.exec(fn), Ee = !!Ba, Rg = Ba ? +Ba[1] : 0, _e = !Pe && !!wt && /Apple Computer/.test(wt.vendor), Ar = _e && (/Mobile\/\w+/.test(fn) || !!wt && wt.maxTouchPoints > 2), Ge = Ar || (wt ? /Mac/.test(wt.platform) : !1), Ig = wt ? /Win/.test(wt.platform) : !1, ot = /Android \d/.test(fn), ai = !!Uc && "webkitFontSmoothing" in Uc.documentElement.style, Pg = ai ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0;
function Bg(n) {
  return {
    left: 0,
    right: n.documentElement.clientWidth,
    top: 0,
    bottom: n.documentElement.clientHeight
  };
}
function Nt(n, e) {
  return typeof n == "number" ? n : n[e];
}
function Fg(n) {
  let e = n.getBoundingClientRect(), t = e.width / n.offsetWidth || 1, r = e.height / n.offsetHeight || 1;
  return {
    left: e.left,
    right: e.left + n.clientWidth * t,
    top: e.top,
    bottom: e.top + n.clientHeight * r
  };
}
function Wc(n, e, t) {
  let r = n.someProp("scrollThreshold") || 0, o = n.someProp("scrollMargin") || 5, s = n.dom.ownerDocument;
  for (let i = t || n.dom; i; i = mo(i)) {
    if (i.nodeType != 1)
      continue;
    let a = i, l = a == s.body, c = l ? Bg(s) : Fg(a), u = 0, d = 0;
    if (e.top < c.top + Nt(r, "top") ? d = -(c.top - e.top + Nt(o, "top")) : e.bottom > c.bottom - Nt(r, "bottom") && (d = e.bottom - e.top > c.bottom - c.top ? e.top + Nt(o, "top") - c.top : e.bottom - c.bottom + Nt(o, "bottom")), e.left < c.left + Nt(r, "left") ? u = -(c.left - e.left + Nt(o, "left")) : e.right > c.right - Nt(r, "right") && (u = e.right - c.right + Nt(o, "right")), u || d)
      if (l)
        s.defaultView.scrollBy(u, d);
      else {
        let f = a.scrollLeft, p = a.scrollTop;
        d && (a.scrollTop += d), u && (a.scrollLeft += u);
        let h = a.scrollLeft - f, m = a.scrollTop - p;
        e = { left: e.left - h, top: e.top - m, right: e.right - h, bottom: e.bottom - m };
      }
    if (l || /^(fixed|sticky)$/.test(getComputedStyle(i).position))
      break;
  }
}
function qg(n) {
  let e = n.dom.getBoundingClientRect(), t = Math.max(0, e.top), r, o;
  for (let s = (e.left + e.right) / 2, i = t + 1; i < Math.min(innerHeight, e.bottom); i += 5) {
    let a = n.root.elementFromPoint(s, i);
    if (!a || a == n.dom || !n.dom.contains(a))
      continue;
    let l = a.getBoundingClientRect();
    if (l.top >= t - 20) {
      r = a, o = l.top;
      break;
    }
  }
  return { refDOM: r, refTop: o, stack: Jf(n.dom) };
}
function Jf(n) {
  let e = [], t = n.ownerDocument;
  for (let r = n; r && (e.push({ dom: r, top: r.scrollTop, left: r.scrollLeft }), n != t); r = mo(r))
    ;
  return e;
}
function zg({ refDOM: n, refTop: e, stack: t }) {
  let r = n ? n.getBoundingClientRect().top : 0;
  Zf(t, r == 0 ? 0 : r - e);
}
function Zf(n, e) {
  for (let t = 0; t < n.length; t++) {
    let { dom: r, top: o, left: s } = n[t];
    r.scrollTop != o + e && (r.scrollTop = o + e), r.scrollLeft != s && (r.scrollLeft = s);
  }
}
let er = null;
function $g(n) {
  if (n.setActive)
    return n.setActive();
  if (er)
    return n.focus(er);
  let e = Jf(n);
  n.focus(er == null ? {
    get preventScroll() {
      return er = { preventScroll: !0 }, !0;
    }
  } : void 0), er || (er = !1, Zf(e, 0));
}
function Yf(n, e) {
  let t, r = 2e8, o, s = 0, i = e.top, a = e.top, l, c;
  for (let u = n.firstChild, d = 0; u; u = u.nextSibling, d++) {
    let f;
    if (u.nodeType == 1)
      f = u.getClientRects();
    else if (u.nodeType == 3)
      f = Rt(u).getClientRects();
    else
      continue;
    for (let p = 0; p < f.length; p++) {
      let h = f[p];
      if (h.top <= i && h.bottom >= a) {
        i = Math.max(h.bottom, i), a = Math.min(h.top, a);
        let m = h.left > e.left ? h.left - e.left : h.right < e.left ? e.left - h.right : 0;
        if (m < r) {
          t = u, r = m, o = m && t.nodeType == 3 ? {
            left: h.right < e.left ? h.right : h.left,
            top: e.top
          } : e, u.nodeType == 1 && m && (s = d + (e.left >= (h.left + h.right) / 2 ? 1 : 0));
          continue;
        }
      } else
        h.top > e.top && !l && h.left <= e.left && h.right >= e.left && (l = u, c = { left: Math.max(h.left, Math.min(h.right, e.left)), top: h.top });
      !t && (e.left >= h.right && e.top >= h.top || e.left >= h.left && e.top >= h.bottom) && (s = d + 1);
    }
  }
  return !t && l && (t = l, o = c, r = 0), t && t.nodeType == 3 ? Hg(t, o) : !t || r && t.nodeType == 1 ? { node: n, offset: s } : Yf(t, o);
}
function Hg(n, e) {
  let t = n.nodeValue.length, r = document.createRange();
  for (let o = 0; o < t; o++) {
    r.setEnd(n, o + 1), r.setStart(n, o);
    let s = Kt(r, 1);
    if (s.top != s.bottom && Tl(e, s))
      return { node: n, offset: o + (e.left >= (s.left + s.right) / 2 ? 1 : 0) };
  }
  return { node: n, offset: 0 };
}
function Tl(n, e) {
  return n.left >= e.left - 1 && n.left <= e.right + 1 && n.top >= e.top - 1 && n.top <= e.bottom + 1;
}
function Vg(n, e) {
  let t = n.parentNode;
  return t && /^li$/i.test(t.nodeName) && e.left < n.getBoundingClientRect().left ? t : n;
}
function jg(n, e, t) {
  let { node: r, offset: o } = Yf(e, t), s = -1;
  if (r.nodeType == 1 && !r.firstChild) {
    let i = r.getBoundingClientRect();
    s = i.left != i.right && t.left > (i.left + i.right) / 2 ? 1 : -1;
  }
  return n.docView.posFromDOM(r, o, s);
}
function Ug(n, e, t, r) {
  let o = -1;
  for (let s = e, i = !1; s != n.dom; ) {
    let a = n.docView.nearestDesc(s, !0);
    if (!a)
      return null;
    if (a.dom.nodeType == 1 && (a.node.isBlock && a.parent && !i || !a.contentDOM)) {
      let l = a.dom.getBoundingClientRect();
      if (a.node.isBlock && a.parent && !i && (i = !0, l.left > r.left || l.top > r.top ? o = a.posBefore : (l.right < r.left || l.bottom < r.top) && (o = a.posAfter)), !a.contentDOM && o < 0 && !a.node.isText)
        return (a.node.isBlock ? r.top < (l.top + l.bottom) / 2 : r.left < (l.left + l.right) / 2) ? a.posBefore : a.posAfter;
    }
    s = a.dom.parentNode;
  }
  return o > -1 ? o : n.docView.posFromDOM(e, t, -1);
}
function Qf(n, e, t) {
  let r = n.childNodes.length;
  if (r && t.top < t.bottom)
    for (let o = Math.max(0, Math.min(r - 1, Math.floor(r * (e.top - t.top) / (t.bottom - t.top)) - 2)), s = o; ; ) {
      let i = n.childNodes[s];
      if (i.nodeType == 1) {
        let a = i.getClientRects();
        for (let l = 0; l < a.length; l++) {
          let c = a[l];
          if (Tl(e, c))
            return Qf(i, e, c);
        }
      }
      if ((s = (s + 1) % r) == o)
        break;
    }
  return n;
}
function Wg(n, e) {
  let t = n.dom.ownerDocument, r, o = 0, s = Lg(t, e.left, e.top);
  s && ({ node: r, offset: o } = s);
  let i = (n.root.elementFromPoint ? n.root : t).elementFromPoint(e.left, e.top), a;
  if (!i || !n.dom.contains(i.nodeType != 1 ? i.parentNode : i)) {
    let c = n.dom.getBoundingClientRect();
    if (!Tl(e, c) || (i = Qf(n.dom, e, c), !i))
      return null;
  }
  if (_e)
    for (let c = i; r && c; c = mo(c))
      c.draggable && (r = void 0);
  if (i = Vg(i, e), r) {
    if (lt && r.nodeType == 1 && (o = Math.min(o, r.childNodes.length), o < r.childNodes.length)) {
      let c = r.childNodes[o], u;
      c.nodeName == "IMG" && (u = c.getBoundingClientRect()).right <= e.left && u.bottom > e.top && o++;
    }
    r == n.dom && o == r.childNodes.length - 1 && r.lastChild.nodeType == 1 && e.top > r.lastChild.getBoundingClientRect().bottom ? a = n.state.doc.content.size : (o == 0 || r.nodeType != 1 || r.childNodes[o - 1].nodeName != "BR") && (a = Ug(n, r, o, e));
  }
  a == null && (a = jg(n, i, e));
  let l = n.docView.nearestDesc(i, !0);
  return { pos: a, inside: l ? l.posAtStart - l.border : -1 };
}
function Kc(n) {
  return n.top < n.bottom || n.left < n.right;
}
function Kt(n, e) {
  let t = n.getClientRects();
  if (t.length) {
    let r = t[e < 0 ? 0 : t.length - 1];
    if (Kc(r))
      return r;
  }
  return Array.prototype.find.call(t, Kc) || n.getBoundingClientRect();
}
const Kg = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function Xf(n, e, t) {
  let { node: r, offset: o, atom: s } = n.docView.domFromPos(e, t < 0 ? -1 : 1), i = ai || lt;
  if (r.nodeType == 3)
    if (i && (Kg.test(r.nodeValue) || (t < 0 ? !o : o == r.nodeValue.length))) {
      let l = Kt(Rt(r, o, o), t);
      if (lt && o && /\s/.test(r.nodeValue[o - 1]) && o < r.nodeValue.length) {
        let c = Kt(Rt(r, o - 1, o - 1), -1);
        if (c.top == l.top) {
          let u = Kt(Rt(r, o, o + 1), -1);
          if (u.top != l.top)
            return Ur(u, u.left < c.left);
        }
      }
      return l;
    } else {
      let l = o, c = o, u = t < 0 ? 1 : -1;
      return t < 0 && !o ? (c++, u = -1) : t >= 0 && o == r.nodeValue.length ? (l--, u = 1) : t < 0 ? l-- : c++, Ur(Kt(Rt(r, l, c), u), u < 0);
    }
  if (!n.state.doc.resolve(e - (s || 0)).parent.inlineContent) {
    if (s == null && o && (t < 0 || o == mt(r))) {
      let l = r.childNodes[o - 1];
      if (l.nodeType == 1)
        return Hi(l.getBoundingClientRect(), !1);
    }
    if (s == null && o < mt(r)) {
      let l = r.childNodes[o];
      if (l.nodeType == 1)
        return Hi(l.getBoundingClientRect(), !0);
    }
    return Hi(r.getBoundingClientRect(), t >= 0);
  }
  if (s == null && o && (t < 0 || o == mt(r))) {
    let l = r.childNodes[o - 1], c = l.nodeType == 3 ? Rt(l, mt(l) - (i ? 0 : 1)) : l.nodeType == 1 && (l.nodeName != "BR" || !l.nextSibling) ? l : null;
    if (c)
      return Ur(Kt(c, 1), !1);
  }
  if (s == null && o < mt(r)) {
    let l = r.childNodes[o];
    for (; l.pmViewDesc && l.pmViewDesc.ignoreForCoords; )
      l = l.nextSibling;
    let c = l ? l.nodeType == 3 ? Rt(l, 0, i ? 0 : 1) : l.nodeType == 1 ? l : null : null;
    if (c)
      return Ur(Kt(c, -1), !0);
  }
  return Ur(Kt(r.nodeType == 3 ? Rt(r) : r, -t), t >= 0);
}
function Ur(n, e) {
  if (n.width == 0)
    return n;
  let t = e ? n.left : n.right;
  return { top: n.top, bottom: n.bottom, left: t, right: t };
}
function Hi(n, e) {
  if (n.height == 0)
    return n;
  let t = e ? n.top : n.bottom;
  return { top: t, bottom: t, left: n.left, right: n.right };
}
function ep(n, e, t) {
  let r = n.state, o = n.root.activeElement;
  r != e && n.updateState(e), o != n.dom && n.focus();
  try {
    return t();
  } finally {
    r != e && n.updateState(r), o != n.dom && o && o.focus();
  }
}
function Gg(n, e, t) {
  let r = e.selection, o = t == "up" ? r.$from : r.$to;
  return ep(n, e, () => {
    let { node: s } = n.docView.domFromPos(o.pos, t == "up" ? -1 : 1);
    for (; ; ) {
      let a = n.docView.nearestDesc(s, !0);
      if (!a)
        break;
      if (a.node.isBlock) {
        s = a.contentDOM || a.dom;
        break;
      }
      s = a.dom.parentNode;
    }
    let i = Xf(n, o.pos, 1);
    for (let a = s.firstChild; a; a = a.nextSibling) {
      let l;
      if (a.nodeType == 1)
        l = a.getClientRects();
      else if (a.nodeType == 3)
        l = Rt(a, 0, a.nodeValue.length).getClientRects();
      else
        continue;
      for (let c = 0; c < l.length; c++) {
        let u = l[c];
        if (u.bottom > u.top + 1 && (t == "up" ? i.top - u.top > (u.bottom - i.top) * 2 : u.bottom - i.bottom > (i.bottom - u.top) * 2))
          return !1;
      }
    }
    return !0;
  });
}
const Jg = /[\u0590-\u08ac]/;
function Zg(n, e, t) {
  let { $head: r } = e.selection;
  if (!r.parent.isTextblock)
    return !1;
  let o = r.parentOffset, s = !o, i = o == r.parent.content.size, a = n.domSelection();
  return !Jg.test(r.parent.textContent) || !a.modify ? t == "left" || t == "backward" ? s : i : ep(n, e, () => {
    let { focusNode: l, focusOffset: c, anchorNode: u, anchorOffset: d } = n.domSelectionRange(), f = a.caretBidiLevel;
    a.modify("move", t, "character");
    let p = r.depth ? n.docView.domAfterPos(r.before()) : n.dom, { focusNode: h, focusOffset: m } = n.domSelectionRange(), g = h && !p.contains(h.nodeType == 1 ? h : h.parentNode) || l == h && c == m;
    try {
      a.collapse(u, d), l && (l != u || c != d) && a.extend && a.extend(l, c);
    } catch {
    }
    return f != null && (a.caretBidiLevel = f), g;
  });
}
let Gc = null, Jc = null, Zc = !1;
function Yg(n, e, t) {
  return Gc == e && Jc == t ? Zc : (Gc = e, Jc = t, Zc = t == "up" || t == "down" ? Gg(n, e, t) : Zg(n, e, t));
}
const Ye = 0, Yc = 1, En = 2, St = 3;
class Do {
  constructor(e, t, r, o) {
    this.parent = e, this.children = t, this.dom = r, this.contentDOM = o, this.dirty = Ye, r.pmViewDesc = this;
  }
  // Used to check whether a given description corresponds to a
  // widget/mark/node.
  matchesWidget(e) {
    return !1;
  }
  matchesMark(e) {
    return !1;
  }
  matchesNode(e, t, r) {
    return !1;
  }
  matchesHack(e) {
    return !1;
  }
  // When parsing in-editor content (in domchange.js), we allow
  // descriptions to determine the parse rules that should be used to
  // parse them.
  parseRule() {
    return null;
  }
  // Used by the editor's event handler to ignore events that come
  // from certain descs.
  stopEvent(e) {
    return !1;
  }
  // The size of the content represented by this desc.
  get size() {
    let e = 0;
    for (let t = 0; t < this.children.length; t++)
      e += this.children[t].size;
    return e;
  }
  // For block nodes, this represents the space taken up by their
  // start/end tokens.
  get border() {
    return 0;
  }
  destroy() {
    this.parent = void 0, this.dom.pmViewDesc == this && (this.dom.pmViewDesc = void 0);
    for (let e = 0; e < this.children.length; e++)
      this.children[e].destroy();
  }
  posBeforeChild(e) {
    for (let t = 0, r = this.posAtStart; ; t++) {
      let o = this.children[t];
      if (o == e)
        return r;
      r += o.size;
    }
  }
  get posBefore() {
    return this.parent.posBeforeChild(this);
  }
  get posAtStart() {
    return this.parent ? this.parent.posBeforeChild(this) + this.border : 0;
  }
  get posAfter() {
    return this.posBefore + this.size;
  }
  get posAtEnd() {
    return this.posAtStart + this.size - 2 * this.border;
  }
  localPosFromDOM(e, t, r) {
    if (this.contentDOM && this.contentDOM.contains(e.nodeType == 1 ? e : e.parentNode))
      if (r < 0) {
        let s, i;
        if (e == this.contentDOM)
          s = e.childNodes[t - 1];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          s = e.previousSibling;
        }
        for (; s && !((i = s.pmViewDesc) && i.parent == this); )
          s = s.previousSibling;
        return s ? this.posBeforeChild(i) + i.size : this.posAtStart;
      } else {
        let s, i;
        if (e == this.contentDOM)
          s = e.childNodes[t];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          s = e.nextSibling;
        }
        for (; s && !((i = s.pmViewDesc) && i.parent == this); )
          s = s.nextSibling;
        return s ? this.posBeforeChild(i) : this.posAtEnd;
      }
    let o;
    if (e == this.dom && this.contentDOM)
      o = t > De(this.contentDOM);
    else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM))
      o = e.compareDocumentPosition(this.contentDOM) & 2;
    else if (this.dom.firstChild) {
      if (t == 0)
        for (let s = e; ; s = s.parentNode) {
          if (s == this.dom) {
            o = !1;
            break;
          }
          if (s.previousSibling)
            break;
        }
      if (o == null && t == e.childNodes.length)
        for (let s = e; ; s = s.parentNode) {
          if (s == this.dom) {
            o = !0;
            break;
          }
          if (s.nextSibling)
            break;
        }
    }
    return o ?? r > 0 ? this.posAtEnd : this.posAtStart;
  }
  nearestDesc(e, t = !1) {
    for (let r = !0, o = e; o; o = o.parentNode) {
      let s = this.getDesc(o), i;
      if (s && (!t || s.node))
        if (r && (i = s.nodeDOM) && !(i.nodeType == 1 ? i.contains(e.nodeType == 1 ? e : e.parentNode) : i == e))
          r = !1;
        else
          return s;
    }
  }
  getDesc(e) {
    let t = e.pmViewDesc;
    for (let r = t; r; r = r.parent)
      if (r == this)
        return t;
  }
  posFromDOM(e, t, r) {
    for (let o = e; o; o = o.parentNode) {
      let s = this.getDesc(o);
      if (s)
        return s.localPosFromDOM(e, t, r);
    }
    return -1;
  }
  // Find the desc for the node after the given pos, if any. (When a
  // parent node overrode rendering, there might not be one.)
  descAt(e) {
    for (let t = 0, r = 0; t < this.children.length; t++) {
      let o = this.children[t], s = r + o.size;
      if (r == e && s != r) {
        for (; !o.border && o.children.length; )
          o = o.children[0];
        return o;
      }
      if (e < s)
        return o.descAt(e - r - o.border);
      r = s;
    }
  }
  domFromPos(e, t) {
    if (!this.contentDOM)
      return { node: this.dom, offset: 0, atom: e + 1 };
    let r = 0, o = 0;
    for (let s = 0; r < this.children.length; r++) {
      let i = this.children[r], a = s + i.size;
      if (a > e || i instanceof np) {
        o = e - s;
        break;
      }
      s = a;
    }
    if (o)
      return this.children[r].domFromPos(o - this.children[r].border, t);
    for (let s; r && !(s = this.children[r - 1]).size && s instanceof tp && s.side >= 0; r--)
      ;
    if (t <= 0) {
      let s, i = !0;
      for (; s = r ? this.children[r - 1] : null, !(!s || s.dom.parentNode == this.contentDOM); r--, i = !1)
        ;
      return s && t && i && !s.border && !s.domAtom ? s.domFromPos(s.size, t) : { node: this.contentDOM, offset: s ? De(s.dom) + 1 : 0 };
    } else {
      let s, i = !0;
      for (; s = r < this.children.length ? this.children[r] : null, !(!s || s.dom.parentNode == this.contentDOM); r++, i = !1)
        ;
      return s && i && !s.border && !s.domAtom ? s.domFromPos(0, t) : { node: this.contentDOM, offset: s ? De(s.dom) : this.contentDOM.childNodes.length };
    }
  }
  // Used to find a DOM range in a single parent for a given changed
  // range.
  parseRange(e, t, r = 0) {
    if (this.children.length == 0)
      return { node: this.contentDOM, from: e, to: t, fromOffset: 0, toOffset: this.contentDOM.childNodes.length };
    let o = -1, s = -1;
    for (let i = r, a = 0; ; a++) {
      let l = this.children[a], c = i + l.size;
      if (o == -1 && e <= c) {
        let u = i + l.border;
        if (e >= u && t <= c - l.border && l.node && l.contentDOM && this.contentDOM.contains(l.contentDOM))
          return l.parseRange(e, t, u);
        e = i;
        for (let d = a; d > 0; d--) {
          let f = this.children[d - 1];
          if (f.size && f.dom.parentNode == this.contentDOM && !f.emptyChildAt(1)) {
            o = De(f.dom) + 1;
            break;
          }
          e -= f.size;
        }
        o == -1 && (o = 0);
      }
      if (o > -1 && (c > t || a == this.children.length - 1)) {
        t = c;
        for (let u = a + 1; u < this.children.length; u++) {
          let d = this.children[u];
          if (d.size && d.dom.parentNode == this.contentDOM && !d.emptyChildAt(-1)) {
            s = De(d.dom);
            break;
          }
          t += d.size;
        }
        s == -1 && (s = this.contentDOM.childNodes.length);
        break;
      }
      i = c;
    }
    return { node: this.contentDOM, from: e, to: t, fromOffset: o, toOffset: s };
  }
  emptyChildAt(e) {
    if (this.border || !this.contentDOM || !this.children.length)
      return !1;
    let t = this.children[e < 0 ? 0 : this.children.length - 1];
    return t.size == 0 || t.emptyChildAt(e);
  }
  domAfterPos(e) {
    let { node: t, offset: r } = this.domFromPos(e, 0);
    if (t.nodeType != 1 || r == t.childNodes.length)
      throw new RangeError("No node after pos " + e);
    return t.childNodes[r];
  }
  // View descs are responsible for setting any selection that falls
  // entirely inside of them, so that custom implementations can do
  // custom things with the selection. Note that this falls apart when
  // a selection starts in such a node and ends in another, in which
  // case we just use whatever domFromPos produces as a best effort.
  setSelection(e, t, r, o = !1) {
    let s = Math.min(e, t), i = Math.max(e, t);
    for (let f = 0, p = 0; f < this.children.length; f++) {
      let h = this.children[f], m = p + h.size;
      if (s > p && i < m)
        return h.setSelection(e - p - h.border, t - p - h.border, r, o);
      p = m;
    }
    let a = this.domFromPos(e, e ? -1 : 1), l = t == e ? a : this.domFromPos(t, t ? -1 : 1), c = r.getSelection(), u = !1;
    if ((lt || _e) && e == t) {
      let { node: f, offset: p } = a;
      if (f.nodeType == 3) {
        if (u = !!(p && f.nodeValue[p - 1] == `
`), u && p == f.nodeValue.length)
          for (let h = f, m; h; h = h.parentNode) {
            if (m = h.nextSibling) {
              m.nodeName == "BR" && (a = l = { node: m.parentNode, offset: De(m) + 1 });
              break;
            }
            let g = h.pmViewDesc;
            if (g && g.node && g.node.isBlock)
              break;
          }
      } else {
        let h = f.childNodes[p - 1];
        u = h && (h.nodeName == "BR" || h.contentEditable == "false");
      }
    }
    if (lt && c.focusNode && c.focusNode != l.node && c.focusNode.nodeType == 1) {
      let f = c.focusNode.childNodes[c.focusOffset];
      f && f.contentEditable == "false" && (o = !0);
    }
    if (!(o || u && _e) && qn(a.node, a.offset, c.anchorNode, c.anchorOffset) && qn(l.node, l.offset, c.focusNode, c.focusOffset))
      return;
    let d = !1;
    if ((c.extend || e == t) && !u) {
      c.collapse(a.node, a.offset);
      try {
        e != t && c.extend(l.node, l.offset), d = !0;
      } catch {
      }
    }
    if (!d) {
      if (e > t) {
        let p = a;
        a = l, l = p;
      }
      let f = document.createRange();
      f.setEnd(l.node, l.offset), f.setStart(a.node, a.offset), c.removeAllRanges(), c.addRange(f);
    }
  }
  ignoreMutation(e) {
    return !this.contentDOM && e.type != "selection";
  }
  get contentLost() {
    return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM);
  }
  // Remove a subtree of the element tree that has been touched
  // by a DOM change, so that the next update will redraw it.
  markDirty(e, t) {
    for (let r = 0, o = 0; o < this.children.length; o++) {
      let s = this.children[o], i = r + s.size;
      if (r == i ? e <= i && t >= r : e < i && t > r) {
        let a = r + s.border, l = i - s.border;
        if (e >= a && t <= l) {
          this.dirty = e == r || t == i ? En : Yc, e == a && t == l && (s.contentLost || s.dom.parentNode != this.contentDOM) ? s.dirty = St : s.markDirty(e - a, t - a);
          return;
        } else
          s.dirty = s.dom == s.contentDOM && s.dom.parentNode == this.contentDOM && !s.children.length ? En : St;
      }
      r = i;
    }
    this.dirty = En;
  }
  markParentsDirty() {
    let e = 1;
    for (let t = this.parent; t; t = t.parent, e++) {
      let r = e == 1 ? En : Yc;
      t.dirty < r && (t.dirty = r);
    }
  }
  get domAtom() {
    return !1;
  }
  get ignoreForCoords() {
    return !1;
  }
}
class tp extends Do {
  constructor(e, t, r, o) {
    let s, i = t.type.toDOM;
    if (typeof i == "function" && (i = i(r, () => {
      if (!s)
        return o;
      if (s.parent)
        return s.parent.posBeforeChild(s);
    })), !t.type.spec.raw) {
      if (i.nodeType != 1) {
        let a = document.createElement("span");
        a.appendChild(i), i = a;
      }
      i.contentEditable = "false", i.classList.add("ProseMirror-widget");
    }
    super(e, [], i, null), this.widget = t, this.widget = t, s = this;
  }
  matchesWidget(e) {
    return this.dirty == Ye && e.type.eq(this.widget.type);
  }
  parseRule() {
    return { ignore: !0 };
  }
  stopEvent(e) {
    let t = this.widget.spec.stopEvent;
    return t ? t(e) : !1;
  }
  ignoreMutation(e) {
    return e.type != "selection" || this.widget.spec.ignoreSelection;
  }
  destroy() {
    this.widget.type.destroy(this.dom), super.destroy();
  }
  get domAtom() {
    return !0;
  }
  get side() {
    return this.widget.type.side;
  }
}
class Qg extends Do {
  constructor(e, t, r, o) {
    super(e, [], t, null), this.textDOM = r, this.text = o;
  }
  get size() {
    return this.text.length;
  }
  localPosFromDOM(e, t) {
    return e != this.textDOM ? this.posAtStart + (t ? this.size : 0) : this.posAtStart + t;
  }
  domFromPos(e) {
    return { node: this.textDOM, offset: e };
  }
  ignoreMutation(e) {
    return e.type === "characterData" && e.target.nodeValue == e.oldValue;
  }
}
class zn extends Do {
  constructor(e, t, r, o) {
    super(e, [], r, o), this.mark = t;
  }
  static create(e, t, r, o) {
    let s = o.nodeViews[t.type.name], i = s && s(t, o, r);
    return (!i || !i.dom) && (i = gt.renderSpec(document, t.type.spec.toDOM(t, r))), new zn(e, t, i.dom, i.contentDOM || i.dom);
  }
  parseRule() {
    return this.dirty & St || this.mark.type.spec.reparseInView ? null : { mark: this.mark.type.name, attrs: this.mark.attrs, contentElement: this.contentDOM };
  }
  matchesMark(e) {
    return this.dirty != St && this.mark.eq(e);
  }
  markDirty(e, t) {
    if (super.markDirty(e, t), this.dirty != Ye) {
      let r = this.parent;
      for (; !r.node; )
        r = r.parent;
      r.dirty < this.dirty && (r.dirty = this.dirty), this.dirty = Ye;
    }
  }
  slice(e, t, r) {
    let o = zn.create(this.parent, this.mark, !0, r), s = this.children, i = this.size;
    t < i && (s = za(s, t, i, r)), e > 0 && (s = za(s, 0, e, r));
    for (let a = 0; a < s.length; a++)
      s[a].parent = o;
    return o.children = s, o;
  }
}
class on extends Do {
  constructor(e, t, r, o, s, i, a, l, c) {
    super(e, [], s, i), this.node = t, this.outerDeco = r, this.innerDeco = o, this.nodeDOM = a;
  }
  // By default, a node is rendered using the `toDOM` method from the
  // node type spec. But client code can use the `nodeViews` spec to
  // supply a custom node view, which can influence various aspects of
  // the way the node works.
  //
  // (Using subclassing for this was intentionally decided against,
  // since it'd require exposing a whole slew of finicky
  // implementation details to the user code that they probably will
  // never need.)
  static create(e, t, r, o, s, i) {
    let a = s.nodeViews[t.type.name], l, c = a && a(t, s, () => {
      if (!l)
        return i;
      if (l.parent)
        return l.parent.posBeforeChild(l);
    }, r, o), u = c && c.dom, d = c && c.contentDOM;
    if (t.isText) {
      if (!u)
        u = document.createTextNode(t.text);
      else if (u.nodeType != 3)
        throw new RangeError("Text must be rendered as a DOM text node");
    } else
      u || ({ dom: u, contentDOM: d } = gt.renderSpec(document, t.type.spec.toDOM(t)));
    !d && !t.isText && u.nodeName != "BR" && (u.hasAttribute("contenteditable") || (u.contentEditable = "false"), t.type.spec.draggable && (u.draggable = !0));
    let f = u;
    return u = sp(u, r, t), c ? l = new Xg(e, t, r, o, u, d || null, f, c, s, i + 1) : t.isText ? new li(e, t, r, o, u, f, s) : new on(e, t, r, o, u, d || null, f, s, i + 1);
  }
  parseRule() {
    if (this.node.type.spec.reparseInView)
      return null;
    let e = { node: this.node.type.name, attrs: this.node.attrs };
    if (this.node.type.whitespace == "pre" && (e.preserveWhitespace = "full"), !this.contentDOM)
      e.getContent = () => this.node.content;
    else if (!this.contentLost)
      e.contentElement = this.contentDOM;
    else {
      for (let t = this.children.length - 1; t >= 0; t--) {
        let r = this.children[t];
        if (this.dom.contains(r.dom.parentNode)) {
          e.contentElement = r.dom.parentNode;
          break;
        }
      }
      e.contentElement || (e.getContent = () => M.empty);
    }
    return e;
  }
  matchesNode(e, t, r) {
    return this.dirty == Ye && e.eq(this.node) && qa(t, this.outerDeco) && r.eq(this.innerDeco);
  }
  get size() {
    return this.node.nodeSize;
  }
  get border() {
    return this.node.isLeaf ? 0 : 1;
  }
  // Syncs `this.children` to match `this.node.content` and the local
  // decorations, possibly introducing nesting for marks. Then, in a
  // separate step, syncs the DOM inside `this.contentDOM` to
  // `this.children`.
  updateChildren(e, t) {
    let r = this.node.inlineContent, o = t, s = e.composing ? this.localCompositionInfo(e, t) : null, i = s && s.pos > -1 ? s : null, a = s && s.pos < 0, l = new t0(this, i && i.node, e);
    o0(this.node, this.innerDeco, (c, u, d) => {
      c.spec.marks ? l.syncToMarks(c.spec.marks, r, e) : c.type.side >= 0 && !d && l.syncToMarks(u == this.node.childCount ? Z.none : this.node.child(u).marks, r, e), l.placeWidget(c, e, o);
    }, (c, u, d, f) => {
      l.syncToMarks(c.marks, r, e);
      let p;
      l.findNodeMatch(c, u, d, f) || a && e.state.selection.from > o && e.state.selection.to < o + c.nodeSize && (p = l.findIndexWithChild(s.node)) > -1 && l.updateNodeAt(c, u, d, p, e) || l.updateNextNode(c, u, d, e, f, o) || l.addNode(c, u, d, e, o), o += c.nodeSize;
    }), l.syncToMarks([], r, e), this.node.isTextblock && l.addTextblockHacks(), l.destroyRest(), (l.changed || this.dirty == En) && (i && this.protectLocalComposition(e, i), rp(this.contentDOM, this.children, e), Ar && s0(this.dom));
  }
  localCompositionInfo(e, t) {
    let { from: r, to: o } = e.state.selection;
    if (!(e.state.selection instanceof j) || r < t || o > t + this.node.content.size)
      return null;
    let s = e.domSelectionRange(), i = i0(s.focusNode, s.focusOffset);
    if (!i || !this.dom.contains(i.parentNode))
      return null;
    if (this.node.inlineContent) {
      let a = i.nodeValue, l = a0(this.node.content, a, r - t, o - t);
      return l < 0 ? null : { node: i, pos: l, text: a };
    } else
      return { node: i, pos: -1, text: "" };
  }
  protectLocalComposition(e, { node: t, pos: r, text: o }) {
    if (this.getDesc(t))
      return;
    let s = t;
    for (; s.parentNode != this.contentDOM; s = s.parentNode) {
      for (; s.previousSibling; )
        s.parentNode.removeChild(s.previousSibling);
      for (; s.nextSibling; )
        s.parentNode.removeChild(s.nextSibling);
      s.pmViewDesc && (s.pmViewDesc = void 0);
    }
    let i = new Qg(this, s, t, o);
    e.input.compositionNodes.push(i), this.children = za(this.children, r, r + o.length, e, i);
  }
  // If this desc must be updated to match the given node decoration,
  // do so and return true.
  update(e, t, r, o) {
    return this.dirty == St || !e.sameMarkup(this.node) ? !1 : (this.updateInner(e, t, r, o), !0);
  }
  updateInner(e, t, r, o) {
    this.updateOuterDeco(t), this.node = e, this.innerDeco = r, this.contentDOM && this.updateChildren(o, this.posAtStart), this.dirty = Ye;
  }
  updateOuterDeco(e) {
    if (qa(e, this.outerDeco))
      return;
    let t = this.nodeDOM.nodeType != 1, r = this.dom;
    this.dom = op(this.dom, this.nodeDOM, Fa(this.outerDeco, this.node, t), Fa(e, this.node, t)), this.dom != r && (r.pmViewDesc = void 0, this.dom.pmViewDesc = this), this.outerDeco = e;
  }
  // Mark this node as being the selected node.
  selectNode() {
    this.nodeDOM.nodeType == 1 && this.nodeDOM.classList.add("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && (this.dom.draggable = !0);
  }
  // Remove selected node marking from this node.
  deselectNode() {
    this.nodeDOM.nodeType == 1 && this.nodeDOM.classList.remove("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && this.dom.removeAttribute("draggable");
  }
  get domAtom() {
    return this.node.isAtom;
  }
}
function Qc(n, e, t, r, o) {
  sp(r, e, n);
  let s = new on(void 0, n, e, t, r, r, r, o, 0);
  return s.contentDOM && s.updateChildren(o, 0), s;
}
class li extends on {
  constructor(e, t, r, o, s, i, a) {
    super(e, t, r, o, s, null, i, a, 0);
  }
  parseRule() {
    let e = this.nodeDOM.parentNode;
    for (; e && e != this.dom && !e.pmIsDeco; )
      e = e.parentNode;
    return { skip: e || !0 };
  }
  update(e, t, r, o) {
    return this.dirty == St || this.dirty != Ye && !this.inParent() || !e.sameMarkup(this.node) ? !1 : (this.updateOuterDeco(t), (this.dirty != Ye || e.text != this.node.text) && e.text != this.nodeDOM.nodeValue && (this.nodeDOM.nodeValue = e.text, o.trackWrites == this.nodeDOM && (o.trackWrites = null)), this.node = e, this.dirty = Ye, !0);
  }
  inParent() {
    let e = this.parent.contentDOM;
    for (let t = this.nodeDOM; t; t = t.parentNode)
      if (t == e)
        return !0;
    return !1;
  }
  domFromPos(e) {
    return { node: this.nodeDOM, offset: e };
  }
  localPosFromDOM(e, t, r) {
    return e == this.nodeDOM ? this.posAtStart + Math.min(t, this.node.text.length) : super.localPosFromDOM(e, t, r);
  }
  ignoreMutation(e) {
    return e.type != "characterData" && e.type != "selection";
  }
  slice(e, t, r) {
    let o = this.node.cut(e, t), s = document.createTextNode(o.text);
    return new li(this.parent, o, this.outerDeco, this.innerDeco, s, s, r);
  }
  markDirty(e, t) {
    super.markDirty(e, t), this.dom != this.nodeDOM && (e == 0 || t == this.nodeDOM.nodeValue.length) && (this.dirty = St);
  }
  get domAtom() {
    return !1;
  }
}
class np extends Do {
  parseRule() {
    return { ignore: !0 };
  }
  matchesHack(e) {
    return this.dirty == Ye && this.dom.nodeName == e;
  }
  get domAtom() {
    return !0;
  }
  get ignoreForCoords() {
    return this.dom.nodeName == "IMG";
  }
}
class Xg extends on {
  constructor(e, t, r, o, s, i, a, l, c, u) {
    super(e, t, r, o, s, i, a, c, u), this.spec = l;
  }
  // A custom `update` method gets to decide whether the update goes
  // through. If it does, and there's a `contentDOM` node, our logic
  // updates the children.
  update(e, t, r, o) {
    if (this.dirty == St)
      return !1;
    if (this.spec.update) {
      let s = this.spec.update(e, t, r);
      return s && this.updateInner(e, t, r, o), s;
    } else
      return !this.contentDOM && !e.isLeaf ? !1 : super.update(e, t, r, o);
  }
  selectNode() {
    this.spec.selectNode ? this.spec.selectNode() : super.selectNode();
  }
  deselectNode() {
    this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode();
  }
  setSelection(e, t, r, o) {
    this.spec.setSelection ? this.spec.setSelection(e, t, r) : super.setSelection(e, t, r, o);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
  stopEvent(e) {
    return this.spec.stopEvent ? this.spec.stopEvent(e) : !1;
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
  }
}
function rp(n, e, t) {
  let r = n.firstChild, o = !1;
  for (let s = 0; s < e.length; s++) {
    let i = e[s], a = i.dom;
    if (a.parentNode == n) {
      for (; a != r; )
        r = Xc(r), o = !0;
      r = r.nextSibling;
    } else
      o = !0, n.insertBefore(a, r);
    if (i instanceof zn) {
      let l = r ? r.previousSibling : n.lastChild;
      rp(i.contentDOM, i.children, t), r = l ? l.nextSibling : n.firstChild;
    }
  }
  for (; r; )
    r = Xc(r), o = !0;
  o && t.trackWrites == n && (t.trackWrites = null);
}
const eo = function(n) {
  n && (this.nodeName = n);
};
eo.prototype = /* @__PURE__ */ Object.create(null);
const An = [new eo()];
function Fa(n, e, t) {
  if (n.length == 0)
    return An;
  let r = t ? An[0] : new eo(), o = [r];
  for (let s = 0; s < n.length; s++) {
    let i = n[s].type.attrs;
    if (i) {
      i.nodeName && o.push(r = new eo(i.nodeName));
      for (let a in i) {
        let l = i[a];
        l != null && (t && o.length == 1 && o.push(r = new eo(e.isInline ? "span" : "div")), a == "class" ? r.class = (r.class ? r.class + " " : "") + l : a == "style" ? r.style = (r.style ? r.style + ";" : "") + l : a != "nodeName" && (r[a] = l));
      }
    }
  }
  return o;
}
function op(n, e, t, r) {
  if (t == An && r == An)
    return e;
  let o = e;
  for (let s = 0; s < r.length; s++) {
    let i = r[s], a = t[s];
    if (s) {
      let l;
      a && a.nodeName == i.nodeName && o != n && (l = o.parentNode) && l.nodeName.toLowerCase() == i.nodeName || (l = document.createElement(i.nodeName), l.pmIsDeco = !0, l.appendChild(o), a = An[0]), o = l;
    }
    e0(o, a || An[0], i);
  }
  return o;
}
function e0(n, e, t) {
  for (let r in e)
    r != "class" && r != "style" && r != "nodeName" && !(r in t) && n.removeAttribute(r);
  for (let r in t)
    r != "class" && r != "style" && r != "nodeName" && t[r] != e[r] && n.setAttribute(r, t[r]);
  if (e.class != t.class) {
    let r = e.class ? e.class.split(" ").filter(Boolean) : [], o = t.class ? t.class.split(" ").filter(Boolean) : [];
    for (let s = 0; s < r.length; s++)
      o.indexOf(r[s]) == -1 && n.classList.remove(r[s]);
    for (let s = 0; s < o.length; s++)
      r.indexOf(o[s]) == -1 && n.classList.add(o[s]);
    n.classList.length == 0 && n.removeAttribute("class");
  }
  if (e.style != t.style) {
    if (e.style) {
      let r = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, o;
      for (; o = r.exec(e.style); )
        n.style.removeProperty(o[1]);
    }
    t.style && (n.style.cssText += t.style);
  }
}
function sp(n, e, t) {
  return op(n, n, An, Fa(e, t, n.nodeType != 1));
}
function qa(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++)
    if (!n[t].type.eq(e[t].type))
      return !1;
  return !0;
}
function Xc(n) {
  let e = n.nextSibling;
  return n.parentNode.removeChild(n), e;
}
class t0 {
  constructor(e, t, r) {
    this.lock = t, this.view = r, this.index = 0, this.stack = [], this.changed = !1, this.top = e, this.preMatch = n0(e.node.content, e);
  }
  // Destroy and remove the children between the given indices in
  // `this.top`.
  destroyBetween(e, t) {
    if (e != t) {
      for (let r = e; r < t; r++)
        this.top.children[r].destroy();
      this.top.children.splice(e, t - e), this.changed = !0;
    }
  }
  // Destroy all remaining children in `this.top`.
  destroyRest() {
    this.destroyBetween(this.index, this.top.children.length);
  }
  // Sync the current stack of mark descs with the given array of
  // marks, reusing existing mark descs when possible.
  syncToMarks(e, t, r) {
    let o = 0, s = this.stack.length >> 1, i = Math.min(s, e.length);
    for (; o < i && (o == s - 1 ? this.top : this.stack[o + 1 << 1]).matchesMark(e[o]) && e[o].type.spec.spanning !== !1; )
      o++;
    for (; o < s; )
      this.destroyRest(), this.top.dirty = Ye, this.index = this.stack.pop(), this.top = this.stack.pop(), s--;
    for (; s < e.length; ) {
      this.stack.push(this.top, this.index + 1);
      let a = -1;
      for (let l = this.index; l < Math.min(this.index + 3, this.top.children.length); l++) {
        let c = this.top.children[l];
        if (c.matchesMark(e[s]) && !this.isLocked(c.dom)) {
          a = l;
          break;
        }
      }
      if (a > -1)
        a > this.index && (this.changed = !0, this.destroyBetween(this.index, a)), this.top = this.top.children[this.index];
      else {
        let l = zn.create(this.top, e[s], t, r);
        this.top.children.splice(this.index, 0, l), this.top = l, this.changed = !0;
      }
      this.index = 0, s++;
    }
  }
  // Try to find a node desc matching the given data. Skip over it and
  // return true when successful.
  findNodeMatch(e, t, r, o) {
    let s = -1, i;
    if (o >= this.preMatch.index && (i = this.preMatch.matches[o - this.preMatch.index]).parent == this.top && i.matchesNode(e, t, r))
      s = this.top.children.indexOf(i, this.index);
    else
      for (let a = this.index, l = Math.min(this.top.children.length, a + 5); a < l; a++) {
        let c = this.top.children[a];
        if (c.matchesNode(e, t, r) && !this.preMatch.matched.has(c)) {
          s = a;
          break;
        }
      }
    return s < 0 ? !1 : (this.destroyBetween(this.index, s), this.index++, !0);
  }
  updateNodeAt(e, t, r, o, s) {
    let i = this.top.children[o];
    return i.dirty == St && i.dom == i.contentDOM && (i.dirty = En), i.update(e, t, r, s) ? (this.destroyBetween(this.index, o), this.index++, !0) : !1;
  }
  findIndexWithChild(e) {
    for (; ; ) {
      let t = e.parentNode;
      if (!t)
        return -1;
      if (t == this.top.contentDOM) {
        let r = e.pmViewDesc;
        if (r) {
          for (let o = this.index; o < this.top.children.length; o++)
            if (this.top.children[o] == r)
              return o;
        }
        return -1;
      }
      e = t;
    }
  }
  // Try to update the next node, if any, to the given data. Checks
  // pre-matches to avoid overwriting nodes that could still be used.
  updateNextNode(e, t, r, o, s, i) {
    for (let a = this.index; a < this.top.children.length; a++) {
      let l = this.top.children[a];
      if (l instanceof on) {
        let c = this.preMatch.matched.get(l);
        if (c != null && c != s)
          return !1;
        let u = l.dom, d, f = this.isLocked(u) && !(e.isText && l.node && l.node.isText && l.nodeDOM.nodeValue == e.text && l.dirty != St && qa(t, l.outerDeco));
        if (!f && l.update(e, t, r, o))
          return this.destroyBetween(this.index, a), l.dom != u && (this.changed = !0), this.index++, !0;
        if (!f && (d = this.recreateWrapper(l, e, t, r, o, i)))
          return this.top.children[this.index] = d, d.dirty = En, d.updateChildren(o, i + 1), d.dirty = Ye, this.changed = !0, this.index++, !0;
        break;
      }
    }
    return !1;
  }
  // When a node with content is replaced by a different node with
  // identical content, move over its children.
  recreateWrapper(e, t, r, o, s, i) {
    if (e.dirty || t.isAtom || !e.children.length || !e.node.content.eq(t.content))
      return null;
    let a = on.create(this.top, t, r, o, s, i);
    if (!a.contentDOM)
      return null;
    a.children = e.children, e.children = [], e.destroy();
    for (let l of a.children)
      l.parent = a;
    return a;
  }
  // Insert the node as a newly created node desc.
  addNode(e, t, r, o, s) {
    let i = on.create(this.top, e, t, r, o, s);
    i.contentDOM && i.updateChildren(o, s + 1), this.top.children.splice(this.index++, 0, i), this.changed = !0;
  }
  placeWidget(e, t, r) {
    let o = this.index < this.top.children.length ? this.top.children[this.index] : null;
    if (o && o.matchesWidget(e) && (e == o.widget || !o.widget.type.toDOM.parentNode))
      this.index++;
    else {
      let s = new tp(this.top, e, t, r);
      this.top.children.splice(this.index++, 0, s), this.changed = !0;
    }
  }
  // Make sure a textblock looks and behaves correctly in
  // contentEditable.
  addTextblockHacks() {
    let e = this.top.children[this.index - 1], t = this.top;
    for (; e instanceof zn; )
      t = e, e = t.children[t.children.length - 1];
    (!e || // Empty textblock
    !(e instanceof li) || /\n$/.test(e.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(e.node.text)) && ((_e || Ee) && e && e.dom.contentEditable == "false" && this.addHackNode("IMG", t), this.addHackNode("BR", this.top));
  }
  addHackNode(e, t) {
    if (t == this.top && this.index < t.children.length && t.children[this.index].matchesHack(e))
      this.index++;
    else {
      let r = document.createElement(e);
      e == "IMG" && (r.className = "ProseMirror-separator", r.alt = ""), e == "BR" && (r.className = "ProseMirror-trailingBreak");
      let o = new np(this.top, [], r, null);
      t != this.top ? t.children.push(o) : t.children.splice(this.index++, 0, o), this.changed = !0;
    }
  }
  isLocked(e) {
    return this.lock && (e == this.lock || e.nodeType == 1 && e.contains(this.lock.parentNode));
  }
}
function n0(n, e) {
  let t = e, r = t.children.length, o = n.childCount, s = /* @__PURE__ */ new Map(), i = [];
  e:
    for (; o > 0; ) {
      let a;
      for (; ; )
        if (r) {
          let c = t.children[r - 1];
          if (c instanceof zn)
            t = c, r = c.children.length;
          else {
            a = c, r--;
            break;
          }
        } else {
          if (t == e)
            break e;
          r = t.parent.children.indexOf(t), t = t.parent;
        }
      let l = a.node;
      if (l) {
        if (l != n.child(o - 1))
          break;
        --o, s.set(a, o), i.push(a);
      }
    }
  return { index: o, matched: s, matches: i.reverse() };
}
function r0(n, e) {
  return n.type.side - e.type.side;
}
function o0(n, e, t, r) {
  let o = e.locals(n), s = 0;
  if (o.length == 0) {
    for (let c = 0; c < n.childCount; c++) {
      let u = n.child(c);
      r(u, o, e.forChild(s, u), c), s += u.nodeSize;
    }
    return;
  }
  let i = 0, a = [], l = null;
  for (let c = 0; ; ) {
    if (i < o.length && o[i].to == s) {
      let h = o[i++], m;
      for (; i < o.length && o[i].to == s; )
        (m || (m = [h])).push(o[i++]);
      if (m) {
        m.sort(r0);
        for (let g = 0; g < m.length; g++)
          t(m[g], c, !!l);
      } else
        t(h, c, !!l);
    }
    let u, d;
    if (l)
      d = -1, u = l, l = null;
    else if (c < n.childCount)
      d = c, u = n.child(c++);
    else
      break;
    for (let h = 0; h < a.length; h++)
      a[h].to <= s && a.splice(h--, 1);
    for (; i < o.length && o[i].from <= s && o[i].to > s; )
      a.push(o[i++]);
    let f = s + u.nodeSize;
    if (u.isText) {
      let h = f;
      i < o.length && o[i].from < h && (h = o[i].from);
      for (let m = 0; m < a.length; m++)
        a[m].to < h && (h = a[m].to);
      h < f && (l = u.cut(h - s), u = u.cut(0, h - s), f = h, d = -1);
    }
    let p = u.isInline && !u.isLeaf ? a.filter((h) => !h.inline) : a.slice();
    r(u, p, e.forChild(s, u), d), s = f;
  }
}
function s0(n) {
  if (n.nodeName == "UL" || n.nodeName == "OL") {
    let e = n.style.cssText;
    n.style.cssText = e + "; list-style: square !important", window.getComputedStyle(n).listStyle, n.style.cssText = e;
  }
}
function i0(n, e) {
  for (; ; ) {
    if (n.nodeType == 3)
      return n;
    if (n.nodeType == 1 && e > 0) {
      if (n.childNodes.length > e && n.childNodes[e].nodeType == 3)
        return n.childNodes[e];
      n = n.childNodes[e - 1], e = mt(n);
    } else if (n.nodeType == 1 && e < n.childNodes.length)
      n = n.childNodes[e], e = 0;
    else
      return null;
  }
}
function a0(n, e, t, r) {
  for (let o = 0, s = 0; o < n.childCount && s <= r; ) {
    let i = n.child(o++), a = s;
    if (s += i.nodeSize, !i.isText)
      continue;
    let l = i.text;
    for (; o < n.childCount; ) {
      let c = n.child(o++);
      if (s += c.nodeSize, !c.isText)
        break;
      l += c.text;
    }
    if (s >= t) {
      let c = a < r ? l.lastIndexOf(e, r - a - 1) : -1;
      if (c >= 0 && c + e.length + a >= t)
        return a + c;
      if (t == r && l.length >= r + e.length - a && l.slice(r - a, r - a + e.length) == e)
        return r;
    }
  }
  return -1;
}
function za(n, e, t, r, o) {
  let s = [];
  for (let i = 0, a = 0; i < n.length; i++) {
    let l = n[i], c = a, u = a += l.size;
    c >= t || u <= e ? s.push(l) : (c < e && s.push(l.slice(0, e - c, r)), o && (s.push(o), o = void 0), u > t && s.push(l.slice(t - c, l.size, r)));
  }
  return s;
}
function Ml(n, e = null) {
  let t = n.domSelectionRange(), r = n.state.doc;
  if (!t.focusNode)
    return null;
  let o = n.docView.nearestDesc(t.focusNode), s = o && o.size == 0, i = n.docView.posFromDOM(t.focusNode, t.focusOffset, 1);
  if (i < 0)
    return null;
  let a = r.resolve(i), l, c;
  if (ii(t)) {
    for (l = a; o && !o.node; )
      o = o.parent;
    let u = o.node;
    if (o && u.isAtom && $.isSelectable(u) && o.parent && !(u.isInline && _g(t.focusNode, t.focusOffset, o.dom))) {
      let d = o.posBefore;
      c = new $(i == d ? a : r.resolve(d));
    }
  } else {
    let u = n.docView.posFromDOM(t.anchorNode, t.anchorOffset, 1);
    if (u < 0)
      return null;
    l = r.resolve(u);
  }
  if (!c) {
    let u = e == "pointer" || n.state.selection.head < a.pos && !s ? 1 : -1;
    c = Ol(n, l, a, u);
  }
  return c;
}
function ip(n) {
  return n.editable ? n.hasFocus() : lp(n) && document.activeElement && document.activeElement.contains(n.dom);
}
function zt(n, e = !1) {
  let t = n.state.selection;
  if (ap(n, t), !!ip(n)) {
    if (!e && n.input.mouseDown && n.input.mouseDown.allowDefault && Ee) {
      let r = n.domSelectionRange(), o = n.domObserver.currentSelection;
      if (r.anchorNode && o.anchorNode && qn(r.anchorNode, r.anchorOffset, o.anchorNode, o.anchorOffset)) {
        n.input.mouseDown.delayedSelectionSync = !0, n.domObserver.setCurSelection();
        return;
      }
    }
    if (n.domObserver.disconnectSelection(), n.cursorWrapper)
      c0(n);
    else {
      let { anchor: r, head: o } = t, s, i;
      eu && !(t instanceof j) && (t.$from.parent.inlineContent || (s = tu(n, t.from)), !t.empty && !t.$from.parent.inlineContent && (i = tu(n, t.to))), n.docView.setSelection(r, o, n.root, e), eu && (s && nu(s), i && nu(i)), t.visible ? n.dom.classList.remove("ProseMirror-hideselection") : (n.dom.classList.add("ProseMirror-hideselection"), "onselectionchange" in document && l0(n));
    }
    n.domObserver.setCurSelection(), n.domObserver.connectSelection();
  }
}
const eu = _e || Ee && Rg < 63;
function tu(n, e) {
  let { node: t, offset: r } = n.docView.domFromPos(e, 0), o = r < t.childNodes.length ? t.childNodes[r] : null, s = r ? t.childNodes[r - 1] : null;
  if (_e && o && o.contentEditable == "false")
    return Vi(o);
  if ((!o || o.contentEditable == "false") && (!s || s.contentEditable == "false")) {
    if (o)
      return Vi(o);
    if (s)
      return Vi(s);
  }
}
function Vi(n) {
  return n.contentEditable = "true", _e && n.draggable && (n.draggable = !1, n.wasDraggable = !0), n;
}
function nu(n) {
  n.contentEditable = "false", n.wasDraggable && (n.draggable = !0, n.wasDraggable = null);
}
function l0(n) {
  let e = n.dom.ownerDocument;
  e.removeEventListener("selectionchange", n.input.hideSelectionGuard);
  let t = n.domSelectionRange(), r = t.anchorNode, o = t.anchorOffset;
  e.addEventListener("selectionchange", n.input.hideSelectionGuard = () => {
    (t.anchorNode != r || t.anchorOffset != o) && (e.removeEventListener("selectionchange", n.input.hideSelectionGuard), setTimeout(() => {
      (!ip(n) || n.state.selection.visible) && n.dom.classList.remove("ProseMirror-hideselection");
    }, 20));
  });
}
function c0(n) {
  let e = n.domSelection(), t = document.createRange(), r = n.cursorWrapper.dom, o = r.nodeName == "IMG";
  o ? t.setEnd(r.parentNode, De(r) + 1) : t.setEnd(r, 0), t.collapse(!1), e.removeAllRanges(), e.addRange(t), !o && !n.state.selection.visible && Pe && rn <= 11 && (r.disabled = !0, r.disabled = !1);
}
function ap(n, e) {
  if (e instanceof $) {
    let t = n.docView.descAt(e.from);
    t != n.lastSelectedViewDesc && (ru(n), t && t.selectNode(), n.lastSelectedViewDesc = t);
  } else
    ru(n);
}
function ru(n) {
  n.lastSelectedViewDesc && (n.lastSelectedViewDesc.parent && n.lastSelectedViewDesc.deselectNode(), n.lastSelectedViewDesc = void 0);
}
function Ol(n, e, t, r) {
  return n.someProp("createSelectionBetween", (o) => o(n, e, t)) || j.between(e, t, r);
}
function ou(n) {
  return n.editable && !n.hasFocus() ? !1 : lp(n);
}
function lp(n) {
  let e = n.domSelectionRange();
  if (!e.anchorNode)
    return !1;
  try {
    return n.dom.contains(e.anchorNode.nodeType == 3 ? e.anchorNode.parentNode : e.anchorNode) && (n.editable || n.dom.contains(e.focusNode.nodeType == 3 ? e.focusNode.parentNode : e.focusNode));
  } catch {
    return !1;
  }
}
function u0(n) {
  let e = n.docView.domFromPos(n.state.selection.anchor, 0), t = n.domSelectionRange();
  return qn(e.node, e.offset, t.anchorNode, t.anchorOffset);
}
function $a(n, e) {
  let { $anchor: t, $head: r } = n.selection, o = e > 0 ? t.max(r) : t.min(r), s = o.parent.inlineContent ? o.depth ? n.doc.resolve(e > 0 ? o.after() : o.before()) : null : o;
  return s && W.findFrom(s, e);
}
function wn(n, e) {
  return n.dispatch(n.state.tr.setSelection(e).scrollIntoView()), !0;
}
function su(n, e, t) {
  let r = n.state.selection;
  if (r instanceof j) {
    if (!r.empty || t.indexOf("s") > -1)
      return !1;
    if (n.endOfTextblock(e > 0 ? "forward" : "backward")) {
      let o = $a(n.state, e);
      return o && o instanceof $ ? wn(n, o) : !1;
    } else if (!(Ge && t.indexOf("m") > -1)) {
      let o = r.$head, s = o.textOffset ? null : e < 0 ? o.nodeBefore : o.nodeAfter, i;
      if (!s || s.isText)
        return !1;
      let a = e < 0 ? o.pos - s.nodeSize : o.pos;
      return s.isAtom || (i = n.docView.descAt(a)) && !i.contentDOM ? $.isSelectable(s) ? wn(n, new $(e < 0 ? n.state.doc.resolve(o.pos - s.nodeSize) : o)) : ai ? wn(n, new j(n.state.doc.resolve(e < 0 ? a : a + s.nodeSize))) : !1 : !1;
    }
  } else {
    if (r instanceof $ && r.node.isInline)
      return wn(n, new j(e > 0 ? r.$to : r.$from));
    {
      let o = $a(n.state, e);
      return o ? wn(n, o) : !1;
    }
  }
}
function Cs(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function to(n) {
  if (n.contentEditable == "false")
    return !0;
  let e = n.pmViewDesc;
  return e && e.size == 0 && (n.nextSibling || n.nodeName != "BR");
}
function Wr(n, e) {
  return e < 0 ? d0(n) : cp(n);
}
function d0(n) {
  let e = n.domSelectionRange(), t = e.focusNode, r = e.focusOffset;
  if (!t)
    return;
  let o, s, i = !1;
  for (lt && t.nodeType == 1 && r < Cs(t) && to(t.childNodes[r]) && (i = !0); ; )
    if (r > 0) {
      if (t.nodeType != 1)
        break;
      {
        let a = t.childNodes[r - 1];
        if (to(a))
          o = t, s = --r;
        else if (a.nodeType == 3)
          t = a, r = t.nodeValue.length;
        else
          break;
      }
    } else {
      if (up(t))
        break;
      {
        let a = t.previousSibling;
        for (; a && to(a); )
          o = t.parentNode, s = De(a), a = a.previousSibling;
        if (a)
          t = a, r = Cs(t);
        else {
          if (t = t.parentNode, t == n.dom)
            break;
          r = 0;
        }
      }
    }
  i ? Ha(n, t, r) : o && Ha(n, o, s);
}
function cp(n) {
  let e = n.domSelectionRange(), t = e.focusNode, r = e.focusOffset;
  if (!t)
    return;
  let o = Cs(t), s, i;
  for (; ; )
    if (r < o) {
      if (t.nodeType != 1)
        break;
      let a = t.childNodes[r];
      if (to(a))
        s = t, i = ++r;
      else
        break;
    } else {
      if (up(t))
        break;
      {
        let a = t.nextSibling;
        for (; a && to(a); )
          s = a.parentNode, i = De(a) + 1, a = a.nextSibling;
        if (a)
          t = a, r = 0, o = Cs(t);
        else {
          if (t = t.parentNode, t == n.dom)
            break;
          r = o = 0;
        }
      }
    }
  s && Ha(n, s, i);
}
function up(n) {
  let e = n.pmViewDesc;
  return e && e.node && e.node.isBlock;
}
function f0(n, e) {
  for (; n && e == n.childNodes.length && !Al(n); )
    e = De(n) + 1, n = n.parentNode;
  for (; n && e < n.childNodes.length; ) {
    if (n = n.childNodes[e], n.nodeType == 3)
      return n;
    e = 0;
  }
}
function p0(n, e) {
  for (; n && !e && !Al(n); )
    e = De(n), n = n.parentNode;
  for (; n && e; ) {
    if (n = n.childNodes[e - 1], n.nodeType == 3)
      return n;
    e = n.childNodes.length;
  }
}
function Ha(n, e, t) {
  if (e.nodeType != 3) {
    let s, i;
    (i = f0(e, t)) ? (e = i, t = 0) : (s = p0(e, t)) && (e = s, t = s.nodeValue.length);
  }
  let r = n.domSelection();
  if (ii(r)) {
    let s = document.createRange();
    s.setEnd(e, t), s.setStart(e, t), r.removeAllRanges(), r.addRange(s);
  } else
    r.extend && r.extend(e, t);
  n.domObserver.setCurSelection();
  let { state: o } = n;
  setTimeout(() => {
    n.state == o && zt(n);
  }, 50);
}
function iu(n, e) {
  let t = n.state.doc.resolve(e);
  if (!(Ee || Ig) && t.parent.inlineContent) {
    let o = n.coordsAtPos(e);
    if (e > t.start()) {
      let s = n.coordsAtPos(e - 1), i = (s.top + s.bottom) / 2;
      if (i > o.top && i < o.bottom && Math.abs(s.left - o.left) > 1)
        return s.left < o.left ? "ltr" : "rtl";
    }
    if (e < t.end()) {
      let s = n.coordsAtPos(e + 1), i = (s.top + s.bottom) / 2;
      if (i > o.top && i < o.bottom && Math.abs(s.left - o.left) > 1)
        return s.left > o.left ? "ltr" : "rtl";
    }
  }
  return getComputedStyle(n.dom).direction == "rtl" ? "rtl" : "ltr";
}
function au(n, e, t) {
  let r = n.state.selection;
  if (r instanceof j && !r.empty || t.indexOf("s") > -1 || Ge && t.indexOf("m") > -1)
    return !1;
  let { $from: o, $to: s } = r;
  if (!o.parent.inlineContent || n.endOfTextblock(e < 0 ? "up" : "down")) {
    let i = $a(n.state, e);
    if (i && i instanceof $)
      return wn(n, i);
  }
  if (!o.parent.inlineContent) {
    let i = e < 0 ? o : s, a = r instanceof at ? W.near(i, e) : W.findFrom(i, e);
    return a ? wn(n, a) : !1;
  }
  return !1;
}
function lu(n, e) {
  if (!(n.state.selection instanceof j))
    return !0;
  let { $head: t, $anchor: r, empty: o } = n.state.selection;
  if (!t.sameParent(r))
    return !0;
  if (!o)
    return !1;
  if (n.endOfTextblock(e > 0 ? "forward" : "backward"))
    return !0;
  let s = !t.textOffset && (e < 0 ? t.nodeBefore : t.nodeAfter);
  if (s && !s.isText) {
    let i = n.state.tr;
    return e < 0 ? i.delete(t.pos - s.nodeSize, t.pos) : i.delete(t.pos, t.pos + s.nodeSize), n.dispatch(i), !0;
  }
  return !1;
}
function cu(n, e, t) {
  n.domObserver.stop(), e.contentEditable = t, n.domObserver.start();
}
function h0(n) {
  if (!_e || n.state.selection.$head.parentOffset > 0)
    return !1;
  let { focusNode: e, focusOffset: t } = n.domSelectionRange();
  if (e && e.nodeType == 1 && t == 0 && e.firstChild && e.firstChild.contentEditable == "false") {
    let r = e.firstChild;
    cu(n, r, "true"), setTimeout(() => cu(n, r, "false"), 20);
  }
  return !1;
}
function m0(n) {
  let e = "";
  return n.ctrlKey && (e += "c"), n.metaKey && (e += "m"), n.altKey && (e += "a"), n.shiftKey && (e += "s"), e;
}
function g0(n, e) {
  let t = e.keyCode, r = m0(e);
  if (t == 8 || Ge && t == 72 && r == "c")
    return lu(n, -1) || Wr(n, -1);
  if (t == 46 && !e.shiftKey || Ge && t == 68 && r == "c")
    return lu(n, 1) || Wr(n, 1);
  if (t == 13 || t == 27)
    return !0;
  if (t == 37 || Ge && t == 66 && r == "c") {
    let o = t == 37 ? iu(n, n.state.selection.from) == "ltr" ? -1 : 1 : -1;
    return su(n, o, r) || Wr(n, o);
  } else if (t == 39 || Ge && t == 70 && r == "c") {
    let o = t == 39 ? iu(n, n.state.selection.from) == "ltr" ? 1 : -1 : 1;
    return su(n, o, r) || Wr(n, o);
  } else {
    if (t == 38 || Ge && t == 80 && r == "c")
      return au(n, -1, r) || Wr(n, -1);
    if (t == 40 || Ge && t == 78 && r == "c")
      return h0(n) || au(n, 1, r) || cp(n);
    if (r == (Ge ? "m" : "c") && (t == 66 || t == 73 || t == 89 || t == 90))
      return !0;
  }
  return !1;
}
function dp(n, e) {
  n.someProp("transformCopied", (p) => {
    e = p(e, n);
  });
  let t = [], { content: r, openStart: o, openEnd: s } = e;
  for (; o > 1 && s > 1 && r.childCount == 1 && r.firstChild.childCount == 1; ) {
    o--, s--;
    let p = r.firstChild;
    t.push(p.type.name, p.attrs != p.type.defaultAttrs ? p.attrs : null), r = p.content;
  }
  let i = n.someProp("clipboardSerializer") || gt.fromSchema(n.state.schema), a = yp(), l = a.createElement("div");
  l.appendChild(i.serializeFragment(r, { document: a }));
  let c = l.firstChild, u, d = 0;
  for (; c && c.nodeType == 1 && (u = gp[c.nodeName.toLowerCase()]); ) {
    for (let p = u.length - 1; p >= 0; p--) {
      let h = a.createElement(u[p]);
      for (; l.firstChild; )
        h.appendChild(l.firstChild);
      l.appendChild(h), d++;
    }
    c = l.firstChild;
  }
  c && c.nodeType == 1 && c.setAttribute("data-pm-slice", `${o} ${s}${d ? ` -${d}` : ""} ${JSON.stringify(t)}`);
  let f = n.someProp("clipboardTextSerializer", (p) => p(e, n)) || e.content.textBetween(0, e.content.size, `

`);
  return { dom: l, text: f };
}
function fp(n, e, t, r, o) {
  let s = o.parent.type.spec.code, i, a;
  if (!t && !e)
    return null;
  let l = e && (r || s || !t);
  if (l) {
    if (n.someProp("transformPastedText", (f) => {
      e = f(e, s || r, n);
    }), s)
      return e ? new N(M.from(n.state.schema.text(e.replace(/\r\n?/g, `
`))), 0, 0) : N.empty;
    let d = n.someProp("clipboardTextParser", (f) => f(e, o, r, n));
    if (d)
      a = d;
    else {
      let f = o.marks(), { schema: p } = n.state, h = gt.fromSchema(p);
      i = document.createElement("div"), e.split(/(?:\r\n?|\n)+/).forEach((m) => {
        let g = i.appendChild(document.createElement("p"));
        m && g.appendChild(h.serializeNode(p.text(m, f)));
      });
    }
  } else
    n.someProp("transformPastedHTML", (d) => {
      t = d(t, n);
    }), i = b0(t), ai && k0(i);
  let c = i && i.querySelector("[data-pm-slice]"), u = c && /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(c.getAttribute("data-pm-slice") || "");
  if (u && u[3])
    for (let d = +u[3]; d > 0; d--) {
      let f = i.firstChild;
      for (; f && f.nodeType != 1; )
        f = f.nextSibling;
      if (!f)
        break;
      i = f;
    }
  if (a || (a = (n.someProp("clipboardParser") || n.someProp("domParser") || Fn.fromSchema(n.state.schema)).parseSlice(i, {
    preserveWhitespace: !!(l || u),
    context: o,
    ruleFromNode(f) {
      return f.nodeName == "BR" && !f.nextSibling && f.parentNode && !y0.test(f.parentNode.nodeName) ? { ignore: !0 } : null;
    }
  })), u)
    a = x0(uu(a, +u[1], +u[2]), u[4]);
  else if (a = N.maxOpen(v0(a.content, o), !0), a.openStart || a.openEnd) {
    let d = 0, f = 0;
    for (let p = a.content.firstChild; d < a.openStart && !p.type.spec.isolating; d++, p = p.firstChild)
      ;
    for (let p = a.content.lastChild; f < a.openEnd && !p.type.spec.isolating; f++, p = p.lastChild)
      ;
    a = uu(a, d, f);
  }
  return n.someProp("transformPasted", (d) => {
    a = d(a, n);
  }), a;
}
const y0 = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function v0(n, e) {
  if (n.childCount < 2)
    return n;
  for (let t = e.depth; t >= 0; t--) {
    let o = e.node(t).contentMatchAt(e.index(t)), s, i = [];
    if (n.forEach((a) => {
      if (!i)
        return;
      let l = o.findWrapping(a.type), c;
      if (!l)
        return i = null;
      if (c = i.length && s.length && hp(l, s, a, i[i.length - 1], 0))
        i[i.length - 1] = c;
      else {
        i.length && (i[i.length - 1] = mp(i[i.length - 1], s.length));
        let u = pp(a, l);
        i.push(u), o = o.matchType(u.type), s = l;
      }
    }), i)
      return M.from(i);
  }
  return n;
}
function pp(n, e, t = 0) {
  for (let r = e.length - 1; r >= t; r--)
    n = e[r].create(null, M.from(n));
  return n;
}
function hp(n, e, t, r, o) {
  if (o < n.length && o < e.length && n[o] == e[o]) {
    let s = hp(n, e, t, r.lastChild, o + 1);
    if (s)
      return r.copy(r.content.replaceChild(r.childCount - 1, s));
    if (r.contentMatchAt(r.childCount).matchType(o == n.length - 1 ? t.type : n[o + 1]))
      return r.copy(r.content.append(M.from(pp(t, n, o + 1))));
  }
}
function mp(n, e) {
  if (e == 0)
    return n;
  let t = n.content.replaceChild(n.childCount - 1, mp(n.lastChild, e - 1)), r = n.contentMatchAt(n.childCount).fillBefore(M.empty, !0);
  return n.copy(t.append(r));
}
function Va(n, e, t, r, o, s) {
  let i = e < 0 ? n.firstChild : n.lastChild, a = i.content;
  return n.childCount > 1 && (s = 0), o < r - 1 && (a = Va(a, e, t, r, o + 1, s)), o >= t && (a = e < 0 ? i.contentMatchAt(0).fillBefore(a, s <= o).append(a) : a.append(i.contentMatchAt(i.childCount).fillBefore(M.empty, !0))), n.replaceChild(e < 0 ? 0 : n.childCount - 1, i.copy(a));
}
function uu(n, e, t) {
  return e < n.openStart && (n = new N(Va(n.content, -1, e, n.openStart, 0, n.openEnd), e, n.openEnd)), t < n.openEnd && (n = new N(Va(n.content, 1, t, n.openEnd, 0, 0), n.openStart, t)), n;
}
const gp = {
  thead: ["table"],
  tbody: ["table"],
  tfoot: ["table"],
  caption: ["table"],
  colgroup: ["table"],
  col: ["table", "colgroup"],
  tr: ["table", "tbody"],
  td: ["table", "tbody", "tr"],
  th: ["table", "tbody", "tr"]
};
let du = null;
function yp() {
  return du || (du = document.implementation.createHTMLDocument("title"));
}
function b0(n) {
  let e = /^(\s*<meta [^>]*>)*/.exec(n);
  e && (n = n.slice(e[0].length));
  let t = yp().createElement("div"), r = /<([a-z][^>\s]+)/i.exec(n), o;
  if ((o = r && gp[r[1].toLowerCase()]) && (n = o.map((s) => "<" + s + ">").join("") + n + o.map((s) => "</" + s + ">").reverse().join("")), t.innerHTML = n, o)
    for (let s = 0; s < o.length; s++)
      t = t.querySelector(o[s]) || t;
  return t;
}
function k0(n) {
  let e = n.querySelectorAll(Ee ? "span:not([class]):not([style])" : "span.Apple-converted-space");
  for (let t = 0; t < e.length; t++) {
    let r = e[t];
    r.childNodes.length == 1 && r.textContent == " " && r.parentNode && r.parentNode.replaceChild(n.ownerDocument.createTextNode(" "), r);
  }
}
function x0(n, e) {
  if (!n.size)
    return n;
  let t = n.content.firstChild.type.schema, r;
  try {
    r = JSON.parse(e);
  } catch {
    return n;
  }
  let { content: o, openStart: s, openEnd: i } = n;
  for (let a = r.length - 2; a >= 0; a -= 2) {
    let l = t.nodes[r[a]];
    if (!l || l.hasRequiredAttrs())
      break;
    o = M.from(l.create(r[a + 1], o)), s++, i++;
  }
  return new N(o, s, i);
}
const Ne = {}, Le = {}, w0 = { touchstart: !0, touchmove: !0 };
class S0 {
  constructor() {
    this.shiftKey = !1, this.mouseDown = null, this.lastKeyCode = null, this.lastKeyCodeTime = 0, this.lastClick = { time: 0, x: 0, y: 0, type: "" }, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastIOSEnter = 0, this.lastIOSEnterFallbackTimeout = -1, this.lastFocus = 0, this.lastTouch = 0, this.lastAndroidDelete = 0, this.composing = !1, this.composingTimeout = -1, this.compositionNodes = [], this.compositionEndedAt = -2e8, this.compositionID = 1, this.compositionPendingChanges = 0, this.domChangeCount = 0, this.eventHandlers = /* @__PURE__ */ Object.create(null), this.hideSelectionGuard = null;
  }
}
function C0(n) {
  for (let e in Ne) {
    let t = Ne[e];
    n.dom.addEventListener(e, n.input.eventHandlers[e] = (r) => {
      A0(n, r) && !Dl(n, r) && (n.editable || !(r.type in Le)) && t(n, r);
    }, w0[e] ? { passive: !0 } : void 0);
  }
  _e && n.dom.addEventListener("input", () => null), ja(n);
}
function nn(n, e) {
  n.input.lastSelectionOrigin = e, n.input.lastSelectionTime = Date.now();
}
function E0(n) {
  n.domObserver.stop();
  for (let e in n.input.eventHandlers)
    n.dom.removeEventListener(e, n.input.eventHandlers[e]);
  clearTimeout(n.input.composingTimeout), clearTimeout(n.input.lastIOSEnterFallbackTimeout);
}
function ja(n) {
  n.someProp("handleDOMEvents", (e) => {
    for (let t in e)
      n.input.eventHandlers[t] || n.dom.addEventListener(t, n.input.eventHandlers[t] = (r) => Dl(n, r));
  });
}
function Dl(n, e) {
  return n.someProp("handleDOMEvents", (t) => {
    let r = t[e.type];
    return r ? r(n, e) || e.defaultPrevented : !1;
  });
}
function A0(n, e) {
  if (!e.bubbles)
    return !0;
  if (e.defaultPrevented)
    return !1;
  for (let t = e.target; t != n.dom; t = t.parentNode)
    if (!t || t.nodeType == 11 || t.pmViewDesc && t.pmViewDesc.stopEvent(e))
      return !1;
  return !0;
}
function T0(n, e) {
  !Dl(n, e) && Ne[e.type] && (n.editable || !(e.type in Le)) && Ne[e.type](n, e);
}
Le.keydown = (n, e) => {
  let t = e;
  if (n.input.shiftKey = t.keyCode == 16 || t.shiftKey, !bp(n, t) && (n.input.lastKeyCode = t.keyCode, n.input.lastKeyCodeTime = Date.now(), !(ot && Ee && t.keyCode == 13)))
    if (t.keyCode != 229 && n.domObserver.forceFlush(), Ar && t.keyCode == 13 && !t.ctrlKey && !t.altKey && !t.metaKey) {
      let r = Date.now();
      n.input.lastIOSEnter = r, n.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
        n.input.lastIOSEnter == r && (n.someProp("handleKeyDown", (o) => o(n, xn(13, "Enter"))), n.input.lastIOSEnter = 0);
      }, 200);
    } else
      n.someProp("handleKeyDown", (r) => r(n, t)) || g0(n, t) ? t.preventDefault() : nn(n, "key");
};
Le.keyup = (n, e) => {
  e.keyCode == 16 && (n.input.shiftKey = !1);
};
Le.keypress = (n, e) => {
  let t = e;
  if (bp(n, t) || !t.charCode || t.ctrlKey && !t.altKey || Ge && t.metaKey)
    return;
  if (n.someProp("handleKeyPress", (o) => o(n, t))) {
    t.preventDefault();
    return;
  }
  let r = n.state.selection;
  if (!(r instanceof j) || !r.$from.sameParent(r.$to)) {
    let o = String.fromCharCode(t.charCode);
    !/[\r\n]/.test(o) && !n.someProp("handleTextInput", (s) => s(n, r.$from.pos, r.$to.pos, o)) && n.dispatch(n.state.tr.insertText(o).scrollIntoView()), t.preventDefault();
  }
};
function ci(n) {
  return { left: n.clientX, top: n.clientY };
}
function M0(n, e) {
  let t = e.x - n.clientX, r = e.y - n.clientY;
  return t * t + r * r < 100;
}
function _l(n, e, t, r, o) {
  if (r == -1)
    return !1;
  let s = n.state.doc.resolve(r);
  for (let i = s.depth + 1; i > 0; i--)
    if (n.someProp(e, (a) => i > s.depth ? a(n, t, s.nodeAfter, s.before(i), o, !0) : a(n, t, s.node(i), s.before(i), o, !1)))
      return !0;
  return !1;
}
function vr(n, e, t) {
  n.focused || n.focus();
  let r = n.state.tr.setSelection(e);
  t == "pointer" && r.setMeta("pointer", !0), n.dispatch(r);
}
function O0(n, e) {
  if (e == -1)
    return !1;
  let t = n.state.doc.resolve(e), r = t.nodeAfter;
  return r && r.isAtom && $.isSelectable(r) ? (vr(n, new $(t), "pointer"), !0) : !1;
}
function D0(n, e) {
  if (e == -1)
    return !1;
  let t = n.state.selection, r, o;
  t instanceof $ && (r = t.node);
  let s = n.state.doc.resolve(e);
  for (let i = s.depth + 1; i > 0; i--) {
    let a = i > s.depth ? s.nodeAfter : s.node(i);
    if ($.isSelectable(a)) {
      r && t.$from.depth > 0 && i >= t.$from.depth && s.before(t.$from.depth + 1) == t.$from.pos ? o = s.before(t.$from.depth) : o = s.before(i);
      break;
    }
  }
  return o != null ? (vr(n, $.create(n.state.doc, o), "pointer"), !0) : !1;
}
function _0(n, e, t, r, o) {
  return _l(n, "handleClickOn", e, t, r) || n.someProp("handleClick", (s) => s(n, e, r)) || (o ? D0(n, t) : O0(n, t));
}
function N0(n, e, t, r) {
  return _l(n, "handleDoubleClickOn", e, t, r) || n.someProp("handleDoubleClick", (o) => o(n, e, r));
}
function L0(n, e, t, r) {
  return _l(n, "handleTripleClickOn", e, t, r) || n.someProp("handleTripleClick", (o) => o(n, e, r)) || R0(n, t, r);
}
function R0(n, e, t) {
  if (t.button != 0)
    return !1;
  let r = n.state.doc;
  if (e == -1)
    return r.inlineContent ? (vr(n, j.create(r, 0, r.content.size), "pointer"), !0) : !1;
  let o = r.resolve(e);
  for (let s = o.depth + 1; s > 0; s--) {
    let i = s > o.depth ? o.nodeAfter : o.node(s), a = o.before(s);
    if (i.inlineContent)
      vr(n, j.create(r, a + 1, a + 1 + i.content.size), "pointer");
    else if ($.isSelectable(i))
      vr(n, $.create(r, a), "pointer");
    else
      continue;
    return !0;
  }
}
function Nl(n) {
  return Es(n);
}
const vp = Ge ? "metaKey" : "ctrlKey";
Ne.mousedown = (n, e) => {
  let t = e;
  n.input.shiftKey = t.shiftKey;
  let r = Nl(n), o = Date.now(), s = "singleClick";
  o - n.input.lastClick.time < 500 && M0(t, n.input.lastClick) && !t[vp] && (n.input.lastClick.type == "singleClick" ? s = "doubleClick" : n.input.lastClick.type == "doubleClick" && (s = "tripleClick")), n.input.lastClick = { time: o, x: t.clientX, y: t.clientY, type: s };
  let i = n.posAtCoords(ci(t));
  i && (s == "singleClick" ? (n.input.mouseDown && n.input.mouseDown.done(), n.input.mouseDown = new I0(n, i, t, !!r)) : (s == "doubleClick" ? N0 : L0)(n, i.pos, i.inside, t) ? t.preventDefault() : nn(n, "pointer"));
};
class I0 {
  constructor(e, t, r, o) {
    this.view = e, this.pos = t, this.event = r, this.flushed = o, this.delayedSelectionSync = !1, this.mightDrag = null, this.startDoc = e.state.doc, this.selectNode = !!r[vp], this.allowDefault = r.shiftKey;
    let s, i;
    if (t.inside > -1)
      s = e.state.doc.nodeAt(t.inside), i = t.inside;
    else {
      let u = e.state.doc.resolve(t.pos);
      s = u.parent, i = u.depth ? u.before() : 0;
    }
    const a = o ? null : r.target, l = a ? e.docView.nearestDesc(a, !0) : null;
    this.target = l ? l.dom : null;
    let { selection: c } = e.state;
    (r.button == 0 && s.type.spec.draggable && s.type.spec.selectable !== !1 || c instanceof $ && c.from <= i && c.to > i) && (this.mightDrag = {
      node: s,
      pos: i,
      addAttr: !!(this.target && !this.target.draggable),
      setUneditable: !!(this.target && lt && !this.target.hasAttribute("contentEditable"))
    }), this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable) && (this.view.domObserver.stop(), this.mightDrag.addAttr && (this.target.draggable = !0), this.mightDrag.setUneditable && setTimeout(() => {
      this.view.input.mouseDown == this && this.target.setAttribute("contentEditable", "false");
    }, 20), this.view.domObserver.start()), e.root.addEventListener("mouseup", this.up = this.up.bind(this)), e.root.addEventListener("mousemove", this.move = this.move.bind(this)), nn(e, "pointer");
  }
  done() {
    this.view.root.removeEventListener("mouseup", this.up), this.view.root.removeEventListener("mousemove", this.move), this.mightDrag && this.target && (this.view.domObserver.stop(), this.mightDrag.addAttr && this.target.removeAttribute("draggable"), this.mightDrag.setUneditable && this.target.removeAttribute("contentEditable"), this.view.domObserver.start()), this.delayedSelectionSync && setTimeout(() => zt(this.view)), this.view.input.mouseDown = null;
  }
  up(e) {
    if (this.done(), !this.view.dom.contains(e.target))
      return;
    let t = this.pos;
    this.view.state.doc != this.startDoc && (t = this.view.posAtCoords(ci(e))), this.updateAllowDefault(e), this.allowDefault || !t ? nn(this.view, "pointer") : _0(this.view, t.pos, t.inside, e, this.selectNode) ? e.preventDefault() : e.button == 0 && (this.flushed || // Safari ignores clicks on draggable elements
    _e && this.mightDrag && !this.mightDrag.node.isAtom || // Chrome will sometimes treat a node selection as a
    // cursor, but still report that the node is selected
    // when asked through getSelection. You'll then get a
    // situation where clicking at the point where that
    // (hidden) cursor is doesn't change the selection, and
    // thus doesn't get a reaction from ProseMirror. This
    // works around that.
    Ee && !this.view.state.selection.visible && Math.min(Math.abs(t.pos - this.view.state.selection.from), Math.abs(t.pos - this.view.state.selection.to)) <= 2) ? (vr(this.view, W.near(this.view.state.doc.resolve(t.pos)), "pointer"), e.preventDefault()) : nn(this.view, "pointer");
  }
  move(e) {
    this.updateAllowDefault(e), nn(this.view, "pointer"), e.buttons == 0 && this.done();
  }
  updateAllowDefault(e) {
    !this.allowDefault && (Math.abs(this.event.x - e.clientX) > 4 || Math.abs(this.event.y - e.clientY) > 4) && (this.allowDefault = !0);
  }
}
Ne.touchstart = (n) => {
  n.input.lastTouch = Date.now(), Nl(n), nn(n, "pointer");
};
Ne.touchmove = (n) => {
  n.input.lastTouch = Date.now(), nn(n, "pointer");
};
Ne.contextmenu = (n) => Nl(n);
function bp(n, e) {
  return n.composing ? !0 : _e && Math.abs(e.timeStamp - n.input.compositionEndedAt) < 500 ? (n.input.compositionEndedAt = -2e8, !0) : !1;
}
const P0 = ot ? 5e3 : -1;
Le.compositionstart = Le.compositionupdate = (n) => {
  if (!n.composing) {
    n.domObserver.flush();
    let { state: e } = n, t = e.selection.$from;
    if (e.selection.empty && (e.storedMarks || !t.textOffset && t.parentOffset && t.nodeBefore.marks.some((r) => r.type.spec.inclusive === !1)))
      n.markCursor = n.state.storedMarks || t.marks(), Es(n, !0), n.markCursor = null;
    else if (Es(n), lt && e.selection.empty && t.parentOffset && !t.textOffset && t.nodeBefore.marks.length) {
      let r = n.domSelectionRange();
      for (let o = r.focusNode, s = r.focusOffset; o && o.nodeType == 1 && s != 0; ) {
        let i = s < 0 ? o.lastChild : o.childNodes[s - 1];
        if (!i)
          break;
        if (i.nodeType == 3) {
          n.domSelection().collapse(i, i.nodeValue.length);
          break;
        } else
          o = i, s = -1;
      }
    }
    n.input.composing = !0;
  }
  kp(n, P0);
};
Le.compositionend = (n, e) => {
  n.composing && (n.input.composing = !1, n.input.compositionEndedAt = e.timeStamp, n.input.compositionPendingChanges = n.domObserver.pendingRecords().length ? n.input.compositionID : 0, n.input.compositionPendingChanges && Promise.resolve().then(() => n.domObserver.flush()), n.input.compositionID++, kp(n, 20));
};
function kp(n, e) {
  clearTimeout(n.input.composingTimeout), e > -1 && (n.input.composingTimeout = setTimeout(() => Es(n), e));
}
function xp(n) {
  for (n.composing && (n.input.composing = !1, n.input.compositionEndedAt = B0()); n.input.compositionNodes.length > 0; )
    n.input.compositionNodes.pop().markParentsDirty();
}
function B0() {
  let n = document.createEvent("Event");
  return n.initEvent("event", !0, !0), n.timeStamp;
}
function Es(n, e = !1) {
  if (!(ot && n.domObserver.flushingSoon >= 0)) {
    if (n.domObserver.forceFlush(), xp(n), e || n.docView && n.docView.dirty) {
      let t = Ml(n);
      return t && !t.eq(n.state.selection) ? n.dispatch(n.state.tr.setSelection(t)) : n.updateState(n.state), !0;
    }
    return !1;
  }
}
function F0(n, e) {
  if (!n.dom.parentNode)
    return;
  let t = n.dom.parentNode.appendChild(document.createElement("div"));
  t.appendChild(e), t.style.cssText = "position: fixed; left: -10000px; top: 10px";
  let r = getSelection(), o = document.createRange();
  o.selectNodeContents(e), n.dom.blur(), r.removeAllRanges(), r.addRange(o), setTimeout(() => {
    t.parentNode && t.parentNode.removeChild(t), n.focus();
  }, 50);
}
const Tr = Pe && rn < 15 || Ar && Pg < 604;
Ne.copy = Le.cut = (n, e) => {
  let t = e, r = n.state.selection, o = t.type == "cut";
  if (r.empty)
    return;
  let s = Tr ? null : t.clipboardData, i = r.content(), { dom: a, text: l } = dp(n, i);
  s ? (t.preventDefault(), s.clearData(), s.setData("text/html", a.innerHTML), s.setData("text/plain", l)) : F0(n, a), o && n.dispatch(n.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
};
function q0(n) {
  return n.openStart == 0 && n.openEnd == 0 && n.content.childCount == 1 ? n.content.firstChild : null;
}
function z0(n, e) {
  if (!n.dom.parentNode)
    return;
  let t = n.input.shiftKey || n.state.selection.$from.parent.type.spec.code, r = n.dom.parentNode.appendChild(document.createElement(t ? "textarea" : "div"));
  t || (r.contentEditable = "true"), r.style.cssText = "position: fixed; left: -10000px; top: 10px", r.focus();
  let o = n.input.shiftKey && n.input.lastKeyCode != 45;
  setTimeout(() => {
    n.focus(), r.parentNode && r.parentNode.removeChild(r), t ? go(n, r.value, null, o, e) : go(n, r.textContent, r.innerHTML, o, e);
  }, 50);
}
function go(n, e, t, r, o) {
  let s = fp(n, e, t, r, n.state.selection.$from);
  if (n.someProp("handlePaste", (l) => l(n, o, s || N.empty)))
    return !0;
  if (!s)
    return !1;
  let i = q0(s), a = i ? n.state.tr.replaceSelectionWith(i, r) : n.state.tr.replaceSelection(s);
  return n.dispatch(a.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")), !0;
}
Le.paste = (n, e) => {
  let t = e;
  if (n.composing && !ot)
    return;
  let r = Tr ? null : t.clipboardData, o = n.input.shiftKey && n.input.lastKeyCode != 45;
  r && go(n, r.getData("text/plain"), r.getData("text/html"), o, t) ? t.preventDefault() : z0(n, t);
};
class $0 {
  constructor(e, t) {
    this.slice = e, this.move = t;
  }
}
const wp = Ge ? "altKey" : "ctrlKey";
Ne.dragstart = (n, e) => {
  let t = e, r = n.input.mouseDown;
  if (r && r.done(), !t.dataTransfer)
    return;
  let o = n.state.selection, s = o.empty ? null : n.posAtCoords(ci(t));
  if (!(s && s.pos >= o.from && s.pos <= (o instanceof $ ? o.to - 1 : o.to))) {
    if (r && r.mightDrag)
      n.dispatch(n.state.tr.setSelection($.create(n.state.doc, r.mightDrag.pos)));
    else if (t.target && t.target.nodeType == 1) {
      let c = n.docView.nearestDesc(t.target, !0);
      c && c.node.type.spec.draggable && c != n.docView && n.dispatch(n.state.tr.setSelection($.create(n.state.doc, c.posBefore)));
    }
  }
  let i = n.state.selection.content(), { dom: a, text: l } = dp(n, i);
  t.dataTransfer.clearData(), t.dataTransfer.setData(Tr ? "Text" : "text/html", a.innerHTML), t.dataTransfer.effectAllowed = "copyMove", Tr || t.dataTransfer.setData("text/plain", l), n.dragging = new $0(i, !t[wp]);
};
Ne.dragend = (n) => {
  let e = n.dragging;
  window.setTimeout(() => {
    n.dragging == e && (n.dragging = null);
  }, 50);
};
Le.dragover = Le.dragenter = (n, e) => e.preventDefault();
Le.drop = (n, e) => {
  let t = e, r = n.dragging;
  if (n.dragging = null, !t.dataTransfer)
    return;
  let o = n.posAtCoords(ci(t));
  if (!o)
    return;
  let s = n.state.doc.resolve(o.pos), i = r && r.slice;
  i ? n.someProp("transformPasted", (h) => {
    i = h(i, n);
  }) : i = fp(n, t.dataTransfer.getData(Tr ? "Text" : "text/plain"), Tr ? null : t.dataTransfer.getData("text/html"), !1, s);
  let a = !!(r && !t[wp]);
  if (n.someProp("handleDrop", (h) => h(n, t, i || N.empty, a))) {
    t.preventDefault();
    return;
  }
  if (!i)
    return;
  t.preventDefault();
  let l = i ? zf(n.state.doc, s.pos, i) : s.pos;
  l == null && (l = s.pos);
  let c = n.state.tr;
  a && c.deleteSelection();
  let u = c.mapping.map(l), d = i.openStart == 0 && i.openEnd == 0 && i.content.childCount == 1, f = c.doc;
  if (d ? c.replaceRangeWith(u, u, i.content.firstChild) : c.replaceRange(u, u, i), c.doc.eq(f))
    return;
  let p = c.doc.resolve(u);
  if (d && $.isSelectable(i.content.firstChild) && p.nodeAfter && p.nodeAfter.sameMarkup(i.content.firstChild))
    c.setSelection(new $(p));
  else {
    let h = c.mapping.map(l);
    c.mapping.maps[c.mapping.maps.length - 1].forEach((m, g, v, b) => h = b), c.setSelection(Ol(n, p, c.doc.resolve(h)));
  }
  n.focus(), n.dispatch(c.setMeta("uiEvent", "drop"));
};
Ne.focus = (n) => {
  n.input.lastFocus = Date.now(), n.focused || (n.domObserver.stop(), n.dom.classList.add("ProseMirror-focused"), n.domObserver.start(), n.focused = !0, setTimeout(() => {
    n.docView && n.hasFocus() && !n.domObserver.currentSelection.eq(n.domSelectionRange()) && zt(n);
  }, 20));
};
Ne.blur = (n, e) => {
  let t = e;
  n.focused && (n.domObserver.stop(), n.dom.classList.remove("ProseMirror-focused"), n.domObserver.start(), t.relatedTarget && n.dom.contains(t.relatedTarget) && n.domObserver.currentSelection.clear(), n.focused = !1);
};
Ne.beforeinput = (n, e) => {
  if (Ee && ot && e.inputType == "deleteContentBackward") {
    n.domObserver.flushSoon();
    let { domChangeCount: r } = n.input;
    setTimeout(() => {
      if (n.input.domChangeCount != r || (n.dom.blur(), n.focus(), n.someProp("handleKeyDown", (s) => s(n, xn(8, "Backspace")))))
        return;
      let { $cursor: o } = n.state.selection;
      o && o.pos > 0 && n.dispatch(n.state.tr.delete(o.pos - 1, o.pos).scrollIntoView());
    }, 50);
  }
};
for (let n in Le)
  Ne[n] = Le[n];
function yo(n, e) {
  if (n == e)
    return !0;
  for (let t in n)
    if (n[t] !== e[t])
      return !1;
  for (let t in e)
    if (!(t in n))
      return !1;
  return !0;
}
class Ll {
  constructor(e, t) {
    this.toDOM = e, this.spec = t || Rn, this.side = this.spec.side || 0;
  }
  map(e, t, r, o) {
    let { pos: s, deleted: i } = e.mapResult(t.from + o, this.side < 0 ? -1 : 1);
    return i ? null : new Ie(s - r, s - r, this);
  }
  valid() {
    return !0;
  }
  eq(e) {
    return this == e || e instanceof Ll && (this.spec.key && this.spec.key == e.spec.key || this.toDOM == e.toDOM && yo(this.spec, e.spec));
  }
  destroy(e) {
    this.spec.destroy && this.spec.destroy(e);
  }
}
class sn {
  constructor(e, t) {
    this.attrs = e, this.spec = t || Rn;
  }
  map(e, t, r, o) {
    let s = e.map(t.from + o, this.spec.inclusiveStart ? -1 : 1) - r, i = e.map(t.to + o, this.spec.inclusiveEnd ? 1 : -1) - r;
    return s >= i ? null : new Ie(s, i, this);
  }
  valid(e, t) {
    return t.from < t.to;
  }
  eq(e) {
    return this == e || e instanceof sn && yo(this.attrs, e.attrs) && yo(this.spec, e.spec);
  }
  static is(e) {
    return e.type instanceof sn;
  }
  destroy() {
  }
}
class Rl {
  constructor(e, t) {
    this.attrs = e, this.spec = t || Rn;
  }
  map(e, t, r, o) {
    let s = e.mapResult(t.from + o, 1);
    if (s.deleted)
      return null;
    let i = e.mapResult(t.to + o, -1);
    return i.deleted || i.pos <= s.pos ? null : new Ie(s.pos - r, i.pos - r, this);
  }
  valid(e, t) {
    let { index: r, offset: o } = e.content.findIndex(t.from), s;
    return o == t.from && !(s = e.child(r)).isText && o + s.nodeSize == t.to;
  }
  eq(e) {
    return this == e || e instanceof Rl && yo(this.attrs, e.attrs) && yo(this.spec, e.spec);
  }
  destroy() {
  }
}
class Ie {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.from = e, this.to = t, this.type = r;
  }
  /**
  @internal
  */
  copy(e, t) {
    return new Ie(e, t, this.type);
  }
  /**
  @internal
  */
  eq(e, t = 0) {
    return this.type.eq(e.type) && this.from + t == e.from && this.to + t == e.to;
  }
  /**
  @internal
  */
  map(e, t, r) {
    return this.type.map(e, this, t, r);
  }
  /**
  Creates a widget decoration, which is a DOM node that's shown in
  the document at the given position. It is recommended that you
  delay rendering the widget by passing a function that will be
  called when the widget is actually drawn in a view, but you can
  also directly pass a DOM node. `getPos` can be used to find the
  widget's current document position.
  */
  static widget(e, t, r) {
    return new Ie(e, e, new Ll(t, r));
  }
  /**
  Creates an inline decoration, which adds the given attributes to
  each inline node between `from` and `to`.
  */
  static inline(e, t, r, o) {
    return new Ie(e, t, new sn(r, o));
  }
  /**
  Creates a node decoration. `from` and `to` should point precisely
  before and after a node in the document. That node, and only that
  node, will receive the given attributes.
  */
  static node(e, t, r, o) {
    return new Ie(e, t, new Rl(r, o));
  }
  /**
  The spec provided when creating this decoration. Can be useful
  if you've stored extra information in that object.
  */
  get spec() {
    return this.type.spec;
  }
  /**
  @internal
  */
  get inline() {
    return this.type instanceof sn;
  }
}
const sr = [], Rn = {};
class ce {
  /**
  @internal
  */
  constructor(e, t) {
    this.local = e.length ? e : sr, this.children = t.length ? t : sr;
  }
  /**
  Create a set of decorations, using the structure of the given
  document.
  */
  static create(e, t) {
    return t.length ? As(t, e, 0, Rn) : Ce;
  }
  /**
  Find all decorations in this set which touch the given range
  (including decorations that start or end directly at the
  boundaries) and match the given predicate on their spec. When
  `start` and `end` are omitted, all decorations in the set are
  considered. When `predicate` isn't given, all decorations are
  assumed to match.
  */
  find(e, t, r) {
    let o = [];
    return this.findInner(e ?? 0, t ?? 1e9, o, 0, r), o;
  }
  findInner(e, t, r, o, s) {
    for (let i = 0; i < this.local.length; i++) {
      let a = this.local[i];
      a.from <= t && a.to >= e && (!s || s(a.spec)) && r.push(a.copy(a.from + o, a.to + o));
    }
    for (let i = 0; i < this.children.length; i += 3)
      if (this.children[i] < t && this.children[i + 1] > e) {
        let a = this.children[i] + 1;
        this.children[i + 2].findInner(e - a, t - a, r, o + a, s);
      }
  }
  /**
  Map the set of decorations in response to a change in the
  document.
  */
  map(e, t, r) {
    return this == Ce || e.maps.length == 0 ? this : this.mapInner(e, t, 0, 0, r || Rn);
  }
  /**
  @internal
  */
  mapInner(e, t, r, o, s) {
    let i;
    for (let a = 0; a < this.local.length; a++) {
      let l = this.local[a].map(e, r, o);
      l && l.type.valid(t, l) ? (i || (i = [])).push(l) : s.onRemove && s.onRemove(this.local[a].spec);
    }
    return this.children.length ? H0(this.children, i || [], e, t, r, o, s) : i ? new ce(i.sort(In), sr) : Ce;
  }
  /**
  Add the given array of decorations to the ones in the set,
  producing a new set. Needs access to the current document to
  create the appropriate tree structure.
  */
  add(e, t) {
    return t.length ? this == Ce ? ce.create(e, t) : this.addInner(e, t, 0) : this;
  }
  addInner(e, t, r) {
    let o, s = 0;
    e.forEach((a, l) => {
      let c = l + r, u;
      if (u = Cp(t, a, c)) {
        for (o || (o = this.children.slice()); s < o.length && o[s] < l; )
          s += 3;
        o[s] == l ? o[s + 2] = o[s + 2].addInner(a, u, c + 1) : o.splice(s, 0, l, l + a.nodeSize, As(u, a, c + 1, Rn)), s += 3;
      }
    });
    let i = Sp(s ? Ep(t) : t, -r);
    for (let a = 0; a < i.length; a++)
      i[a].type.valid(e, i[a]) || i.splice(a--, 1);
    return new ce(i.length ? this.local.concat(i).sort(In) : this.local, o || this.children);
  }
  /**
  Create a new set that contains the decorations in this set, minus
  the ones in the given array.
  */
  remove(e) {
    return e.length == 0 || this == Ce ? this : this.removeInner(e, 0);
  }
  removeInner(e, t) {
    let r = this.children, o = this.local;
    for (let s = 0; s < r.length; s += 3) {
      let i, a = r[s] + t, l = r[s + 1] + t;
      for (let u = 0, d; u < e.length; u++)
        (d = e[u]) && d.from > a && d.to < l && (e[u] = null, (i || (i = [])).push(d));
      if (!i)
        continue;
      r == this.children && (r = this.children.slice());
      let c = r[s + 2].removeInner(i, a + 1);
      c != Ce ? r[s + 2] = c : (r.splice(s, 3), s -= 3);
    }
    if (o.length) {
      for (let s = 0, i; s < e.length; s++)
        if (i = e[s])
          for (let a = 0; a < o.length; a++)
            o[a].eq(i, t) && (o == this.local && (o = this.local.slice()), o.splice(a--, 1));
    }
    return r == this.children && o == this.local ? this : o.length || r.length ? new ce(o, r) : Ce;
  }
  /**
  @internal
  */
  forChild(e, t) {
    if (this == Ce)
      return this;
    if (t.isLeaf)
      return ce.empty;
    let r, o;
    for (let a = 0; a < this.children.length; a += 3)
      if (this.children[a] >= e) {
        this.children[a] == e && (r = this.children[a + 2]);
        break;
      }
    let s = e + 1, i = s + t.content.size;
    for (let a = 0; a < this.local.length; a++) {
      let l = this.local[a];
      if (l.from < i && l.to > s && l.type instanceof sn) {
        let c = Math.max(s, l.from) - s, u = Math.min(i, l.to) - s;
        c < u && (o || (o = [])).push(l.copy(c, u));
      }
    }
    if (o) {
      let a = new ce(o.sort(In), sr);
      return r ? new Qt([a, r]) : a;
    }
    return r || Ce;
  }
  /**
  @internal
  */
  eq(e) {
    if (this == e)
      return !0;
    if (!(e instanceof ce) || this.local.length != e.local.length || this.children.length != e.children.length)
      return !1;
    for (let t = 0; t < this.local.length; t++)
      if (!this.local[t].eq(e.local[t]))
        return !1;
    for (let t = 0; t < this.children.length; t += 3)
      if (this.children[t] != e.children[t] || this.children[t + 1] != e.children[t + 1] || !this.children[t + 2].eq(e.children[t + 2]))
        return !1;
    return !0;
  }
  /**
  @internal
  */
  locals(e) {
    return Il(this.localsInner(e));
  }
  /**
  @internal
  */
  localsInner(e) {
    if (this == Ce)
      return sr;
    if (e.inlineContent || !this.local.some(sn.is))
      return this.local;
    let t = [];
    for (let r = 0; r < this.local.length; r++)
      this.local[r].type instanceof sn || t.push(this.local[r]);
    return t;
  }
}
ce.empty = new ce([], []);
ce.removeOverlap = Il;
const Ce = ce.empty;
class Qt {
  constructor(e) {
    this.members = e;
  }
  map(e, t) {
    const r = this.members.map((o) => o.map(e, t, Rn));
    return Qt.from(r);
  }
  forChild(e, t) {
    if (t.isLeaf)
      return ce.empty;
    let r = [];
    for (let o = 0; o < this.members.length; o++) {
      let s = this.members[o].forChild(e, t);
      s != Ce && (s instanceof Qt ? r = r.concat(s.members) : r.push(s));
    }
    return Qt.from(r);
  }
  eq(e) {
    if (!(e instanceof Qt) || e.members.length != this.members.length)
      return !1;
    for (let t = 0; t < this.members.length; t++)
      if (!this.members[t].eq(e.members[t]))
        return !1;
    return !0;
  }
  locals(e) {
    let t, r = !0;
    for (let o = 0; o < this.members.length; o++) {
      let s = this.members[o].localsInner(e);
      if (s.length)
        if (!t)
          t = s;
        else {
          r && (t = t.slice(), r = !1);
          for (let i = 0; i < s.length; i++)
            t.push(s[i]);
        }
    }
    return t ? Il(r ? t : t.sort(In)) : sr;
  }
  // Create a group for the given array of decoration sets, or return
  // a single set when possible.
  static from(e) {
    switch (e.length) {
      case 0:
        return Ce;
      case 1:
        return e[0];
      default:
        return new Qt(e.every((t) => t instanceof ce) ? e : e.reduce((t, r) => t.concat(r instanceof ce ? r : r.members), []));
    }
  }
}
function H0(n, e, t, r, o, s, i) {
  let a = n.slice();
  for (let c = 0, u = s; c < t.maps.length; c++) {
    let d = 0;
    t.maps[c].forEach((f, p, h, m) => {
      let g = m - h - (p - f);
      for (let v = 0; v < a.length; v += 3) {
        let b = a[v + 1];
        if (b < 0 || f > b + u - d)
          continue;
        let x = a[v] + u - d;
        p >= x ? a[v + 1] = f <= x ? -2 : -1 : h >= o && g && (a[v] += g, a[v + 1] += g);
      }
      d += g;
    }), u = t.maps[c].map(u, -1);
  }
  let l = !1;
  for (let c = 0; c < a.length; c += 3)
    if (a[c + 1] < 0) {
      if (a[c + 1] == -2) {
        l = !0, a[c + 1] = -1;
        continue;
      }
      let u = t.map(n[c] + s), d = u - o;
      if (d < 0 || d >= r.content.size) {
        l = !0;
        continue;
      }
      let f = t.map(n[c + 1] + s, -1), p = f - o, { index: h, offset: m } = r.content.findIndex(d), g = r.maybeChild(h);
      if (g && m == d && m + g.nodeSize == p) {
        let v = a[c + 2].mapInner(t, g, u + 1, n[c] + s + 1, i);
        v != Ce ? (a[c] = d, a[c + 1] = p, a[c + 2] = v) : (a[c + 1] = -2, l = !0);
      } else
        l = !0;
    }
  if (l) {
    let c = V0(a, n, e, t, o, s, i), u = As(c, r, 0, i);
    e = u.local;
    for (let d = 0; d < a.length; d += 3)
      a[d + 1] < 0 && (a.splice(d, 3), d -= 3);
    for (let d = 0, f = 0; d < u.children.length; d += 3) {
      let p = u.children[d];
      for (; f < a.length && a[f] < p; )
        f += 3;
      a.splice(f, 0, u.children[d], u.children[d + 1], u.children[d + 2]);
    }
  }
  return new ce(e.sort(In), a);
}
function Sp(n, e) {
  if (!e || !n.length)
    return n;
  let t = [];
  for (let r = 0; r < n.length; r++) {
    let o = n[r];
    t.push(new Ie(o.from + e, o.to + e, o.type));
  }
  return t;
}
function V0(n, e, t, r, o, s, i) {
  function a(l, c) {
    for (let u = 0; u < l.local.length; u++) {
      let d = l.local[u].map(r, o, c);
      d ? t.push(d) : i.onRemove && i.onRemove(l.local[u].spec);
    }
    for (let u = 0; u < l.children.length; u += 3)
      a(l.children[u + 2], l.children[u] + c + 1);
  }
  for (let l = 0; l < n.length; l += 3)
    n[l + 1] == -1 && a(n[l + 2], e[l] + s + 1);
  return t;
}
function Cp(n, e, t) {
  if (e.isLeaf)
    return null;
  let r = t + e.nodeSize, o = null;
  for (let s = 0, i; s < n.length; s++)
    (i = n[s]) && i.from > t && i.to < r && ((o || (o = [])).push(i), n[s] = null);
  return o;
}
function Ep(n) {
  let e = [];
  for (let t = 0; t < n.length; t++)
    n[t] != null && e.push(n[t]);
  return e;
}
function As(n, e, t, r) {
  let o = [], s = !1;
  e.forEach((a, l) => {
    let c = Cp(n, a, l + t);
    if (c) {
      s = !0;
      let u = As(c, a, t + l + 1, r);
      u != Ce && o.push(l, l + a.nodeSize, u);
    }
  });
  let i = Sp(s ? Ep(n) : n, -t).sort(In);
  for (let a = 0; a < i.length; a++)
    i[a].type.valid(e, i[a]) || (r.onRemove && r.onRemove(i[a].spec), i.splice(a--, 1));
  return i.length || o.length ? new ce(i, o) : Ce;
}
function In(n, e) {
  return n.from - e.from || n.to - e.to;
}
function Il(n) {
  let e = n;
  for (let t = 0; t < e.length - 1; t++) {
    let r = e[t];
    if (r.from != r.to)
      for (let o = t + 1; o < e.length; o++) {
        let s = e[o];
        if (s.from == r.from) {
          s.to != r.to && (e == n && (e = n.slice()), e[o] = s.copy(s.from, r.to), fu(e, o + 1, s.copy(r.to, s.to)));
          continue;
        } else {
          s.from < r.to && (e == n && (e = n.slice()), e[t] = r.copy(r.from, s.from), fu(e, o, r.copy(s.from, r.to)));
          break;
        }
      }
  }
  return e;
}
function fu(n, e, t) {
  for (; e < n.length && In(t, n[e]) > 0; )
    e++;
  n.splice(e, 0, t);
}
function ji(n) {
  let e = [];
  return n.someProp("decorations", (t) => {
    let r = t(n.state);
    r && r != Ce && e.push(r);
  }), n.cursorWrapper && e.push(ce.create(n.state.doc, [n.cursorWrapper.deco])), Qt.from(e);
}
const j0 = {
  childList: !0,
  characterData: !0,
  characterDataOldValue: !0,
  attributes: !0,
  attributeOldValue: !0,
  subtree: !0
}, U0 = Pe && rn <= 11;
class W0 {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  set(e) {
    this.anchorNode = e.anchorNode, this.anchorOffset = e.anchorOffset, this.focusNode = e.focusNode, this.focusOffset = e.focusOffset;
  }
  clear() {
    this.anchorNode = this.focusNode = null;
  }
  eq(e) {
    return e.anchorNode == this.anchorNode && e.anchorOffset == this.anchorOffset && e.focusNode == this.focusNode && e.focusOffset == this.focusOffset;
  }
}
class K0 {
  constructor(e, t) {
    this.view = e, this.handleDOMChange = t, this.queue = [], this.flushingSoon = -1, this.observer = null, this.currentSelection = new W0(), this.onCharData = null, this.suppressingSelectionUpdates = !1, this.observer = window.MutationObserver && new window.MutationObserver((r) => {
      for (let o = 0; o < r.length; o++)
        this.queue.push(r[o]);
      Pe && rn <= 11 && r.some((o) => o.type == "childList" && o.removedNodes.length || o.type == "characterData" && o.oldValue.length > o.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), U0 && (this.onCharData = (r) => {
      this.queue.push({ target: r.target, type: "characterData", oldValue: r.prevValue }), this.flushSoon();
    }), this.onSelectionChange = this.onSelectionChange.bind(this);
  }
  flushSoon() {
    this.flushingSoon < 0 && (this.flushingSoon = window.setTimeout(() => {
      this.flushingSoon = -1, this.flush();
    }, 20));
  }
  forceFlush() {
    this.flushingSoon > -1 && (window.clearTimeout(this.flushingSoon), this.flushingSoon = -1, this.flush());
  }
  start() {
    this.observer && (this.observer.takeRecords(), this.observer.observe(this.view.dom, j0)), this.onCharData && this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.connectSelection();
  }
  stop() {
    if (this.observer) {
      let e = this.observer.takeRecords();
      if (e.length) {
        for (let t = 0; t < e.length; t++)
          this.queue.push(e[t]);
        window.setTimeout(() => this.flush(), 20);
      }
      this.observer.disconnect();
    }
    this.onCharData && this.view.dom.removeEventListener("DOMCharacterDataModified", this.onCharData), this.disconnectSelection();
  }
  connectSelection() {
    this.view.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange);
  }
  disconnectSelection() {
    this.view.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange);
  }
  suppressSelectionUpdates() {
    this.suppressingSelectionUpdates = !0, setTimeout(() => this.suppressingSelectionUpdates = !1, 50);
  }
  onSelectionChange() {
    if (ou(this.view)) {
      if (this.suppressingSelectionUpdates)
        return zt(this.view);
      if (Pe && rn <= 11 && !this.view.state.selection.empty) {
        let e = this.view.domSelectionRange();
        if (e.focusNode && qn(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset))
          return this.flushSoon();
      }
      this.flush();
    }
  }
  setCurSelection() {
    this.currentSelection.set(this.view.domSelectionRange());
  }
  ignoreSelectionChange(e) {
    if (!e.focusNode)
      return !0;
    let t = /* @__PURE__ */ new Set(), r;
    for (let s = e.focusNode; s; s = mo(s))
      t.add(s);
    for (let s = e.anchorNode; s; s = mo(s))
      if (t.has(s)) {
        r = s;
        break;
      }
    let o = r && this.view.docView.nearestDesc(r);
    if (o && o.ignoreMutation({
      type: "selection",
      target: r.nodeType == 3 ? r.parentNode : r
    }))
      return this.setCurSelection(), !0;
  }
  pendingRecords() {
    if (this.observer)
      for (let e of this.observer.takeRecords())
        this.queue.push(e);
    return this.queue;
  }
  flush() {
    let { view: e } = this;
    if (!e.docView || this.flushingSoon > -1)
      return;
    let t = this.pendingRecords();
    t.length && (this.queue = []);
    let r = e.domSelectionRange(), o = !this.suppressingSelectionUpdates && !this.currentSelection.eq(r) && ou(e) && !this.ignoreSelectionChange(r), s = -1, i = -1, a = !1, l = [];
    if (e.editable)
      for (let u = 0; u < t.length; u++) {
        let d = this.registerMutation(t[u], l);
        d && (s = s < 0 ? d.from : Math.min(d.from, s), i = i < 0 ? d.to : Math.max(d.to, i), d.typeOver && (a = !0));
      }
    if (lt && l.length > 1) {
      let u = l.filter((d) => d.nodeName == "BR");
      if (u.length == 2) {
        let d = u[0], f = u[1];
        d.parentNode && d.parentNode.parentNode == f.parentNode ? f.remove() : d.remove();
      }
    }
    let c = null;
    s < 0 && o && e.input.lastFocus > Date.now() - 200 && Math.max(e.input.lastTouch, e.input.lastClick.time) < Date.now() - 300 && ii(r) && (c = Ml(e)) && c.eq(W.near(e.state.doc.resolve(0), 1)) ? (e.input.lastFocus = 0, zt(e), this.currentSelection.set(r), e.scrollToSelection()) : (s > -1 || o) && (s > -1 && (e.docView.markDirty(s, i), G0(e)), this.handleDOMChange(s, i, a, l), e.docView && e.docView.dirty ? e.updateState(e.state) : this.currentSelection.eq(r) || zt(e), this.currentSelection.set(r));
  }
  registerMutation(e, t) {
    if (t.indexOf(e.target) > -1)
      return null;
    let r = this.view.docView.nearestDesc(e.target);
    if (e.type == "attributes" && (r == this.view.docView || e.attributeName == "contenteditable" || // Firefox sometimes fires spurious events for null/empty styles
    e.attributeName == "style" && !e.oldValue && !e.target.getAttribute("style")) || !r || r.ignoreMutation(e))
      return null;
    if (e.type == "childList") {
      for (let u = 0; u < e.addedNodes.length; u++)
        t.push(e.addedNodes[u]);
      if (r.contentDOM && r.contentDOM != r.dom && !r.contentDOM.contains(e.target))
        return { from: r.posBefore, to: r.posAfter };
      let o = e.previousSibling, s = e.nextSibling;
      if (Pe && rn <= 11 && e.addedNodes.length)
        for (let u = 0; u < e.addedNodes.length; u++) {
          let { previousSibling: d, nextSibling: f } = e.addedNodes[u];
          (!d || Array.prototype.indexOf.call(e.addedNodes, d) < 0) && (o = d), (!f || Array.prototype.indexOf.call(e.addedNodes, f) < 0) && (s = f);
        }
      let i = o && o.parentNode == e.target ? De(o) + 1 : 0, a = r.localPosFromDOM(e.target, i, -1), l = s && s.parentNode == e.target ? De(s) : e.target.childNodes.length, c = r.localPosFromDOM(e.target, l, 1);
      return { from: a, to: c };
    } else
      return e.type == "attributes" ? { from: r.posAtStart - r.border, to: r.posAtEnd + r.border } : {
        from: r.posAtStart,
        to: r.posAtEnd,
        // An event was generated for a text change that didn't change
        // any text. Mark the dom change to fall back to assuming the
        // selection was typed over with an identical value if it can't
        // find another change.
        typeOver: e.target.nodeValue == e.oldValue
      };
  }
}
let pu = /* @__PURE__ */ new WeakMap(), hu = !1;
function G0(n) {
  if (!pu.has(n) && (pu.set(n, null), ["normal", "nowrap", "pre-line"].indexOf(getComputedStyle(n.dom).whiteSpace) !== -1)) {
    if (n.requiresGeckoHackNode = lt, hu)
      return;
    console.warn("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."), hu = !0;
  }
}
function J0(n) {
  let e;
  function t(l) {
    l.preventDefault(), l.stopImmediatePropagation(), e = l.getTargetRanges()[0];
  }
  n.dom.addEventListener("beforeinput", t, !0), document.execCommand("indent"), n.dom.removeEventListener("beforeinput", t, !0);
  let r = e.startContainer, o = e.startOffset, s = e.endContainer, i = e.endOffset, a = n.domAtPos(n.state.selection.anchor);
  return qn(a.node, a.offset, s, i) && ([r, o, s, i] = [s, i, r, o]), { anchorNode: r, anchorOffset: o, focusNode: s, focusOffset: i };
}
function Z0(n, e, t) {
  let { node: r, fromOffset: o, toOffset: s, from: i, to: a } = n.docView.parseRange(e, t), l = n.domSelectionRange(), c, u = l.anchorNode;
  if (u && n.dom.contains(u.nodeType == 1 ? u : u.parentNode) && (c = [{ node: u, offset: l.anchorOffset }], ii(l) || c.push({ node: l.focusNode, offset: l.focusOffset })), Ee && n.input.lastKeyCode === 8)
    for (let g = s; g > o; g--) {
      let v = r.childNodes[g - 1], b = v.pmViewDesc;
      if (v.nodeName == "BR" && !b) {
        s = g;
        break;
      }
      if (!b || b.size)
        break;
    }
  let d = n.state.doc, f = n.someProp("domParser") || Fn.fromSchema(n.state.schema), p = d.resolve(i), h = null, m = f.parse(r, {
    topNode: p.parent,
    topMatch: p.parent.contentMatchAt(p.index()),
    topOpen: !0,
    from: o,
    to: s,
    preserveWhitespace: p.parent.type.whitespace == "pre" ? "full" : !0,
    findPositions: c,
    ruleFromNode: Y0,
    context: p
  });
  if (c && c[0].pos != null) {
    let g = c[0].pos, v = c[1] && c[1].pos;
    v == null && (v = g), h = { anchor: g + i, head: v + i };
  }
  return { doc: m, sel: h, from: i, to: a };
}
function Y0(n) {
  let e = n.pmViewDesc;
  if (e)
    return e.parseRule();
  if (n.nodeName == "BR" && n.parentNode) {
    if (_e && /^(ul|ol)$/i.test(n.parentNode.nodeName)) {
      let t = document.createElement("div");
      return t.appendChild(document.createElement("li")), { skip: t };
    } else if (n.parentNode.lastChild == n || _e && /^(tr|table)$/i.test(n.parentNode.nodeName))
      return { ignore: !0 };
  } else if (n.nodeName == "IMG" && n.getAttribute("mark-placeholder"))
    return { ignore: !0 };
  return null;
}
const Q0 = /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
function X0(n, e, t, r, o) {
  let s = n.input.compositionPendingChanges || (n.composing ? n.input.compositionID : 0);
  if (n.input.compositionPendingChanges = 0, e < 0) {
    let T = n.input.lastSelectionTime > Date.now() - 50 ? n.input.lastSelectionOrigin : null, D = Ml(n, T);
    if (D && !n.state.selection.eq(D)) {
      if (Ee && ot && n.input.lastKeyCode === 13 && Date.now() - 100 < n.input.lastKeyCodeTime && n.someProp("handleKeyDown", (F) => F(n, xn(13, "Enter"))))
        return;
      let _ = n.state.tr.setSelection(D);
      T == "pointer" ? _.setMeta("pointer", !0) : T == "key" && _.scrollIntoView(), s && _.setMeta("composition", s), n.dispatch(_);
    }
    return;
  }
  let i = n.state.doc.resolve(e), a = i.sharedDepth(t);
  e = i.before(a + 1), t = n.state.doc.resolve(t).after(a + 1);
  let l = n.state.selection, c = Z0(n, e, t), u = n.state.doc, d = u.slice(c.from, c.to), f, p;
  n.input.lastKeyCode === 8 && Date.now() - 100 < n.input.lastKeyCodeTime ? (f = n.state.selection.to, p = "end") : (f = n.state.selection.from, p = "start"), n.input.lastKeyCode = null;
  let h = ny(d.content, c.doc.content, c.from, f, p);
  if ((Ar && n.input.lastIOSEnter > Date.now() - 225 || ot) && o.some((T) => T.nodeType == 1 && !Q0.test(T.nodeName)) && (!h || h.endA >= h.endB) && n.someProp("handleKeyDown", (T) => T(n, xn(13, "Enter")))) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (!h)
    if (r && l instanceof j && !l.empty && l.$head.sameParent(l.$anchor) && !n.composing && !(c.sel && c.sel.anchor != c.sel.head))
      h = { start: l.from, endA: l.to, endB: l.to };
    else {
      if (c.sel) {
        let T = mu(n, n.state.doc, c.sel);
        if (T && !T.eq(n.state.selection)) {
          let D = n.state.tr.setSelection(T);
          s && D.setMeta("composition", s), n.dispatch(D);
        }
      }
      return;
    }
  if (Ee && n.cursorWrapper && c.sel && c.sel.anchor == n.cursorWrapper.deco.from && c.sel.head == c.sel.anchor) {
    let T = h.endB - h.start;
    c.sel = { anchor: c.sel.anchor + T, head: c.sel.anchor + T };
  }
  n.input.domChangeCount++, n.state.selection.from < n.state.selection.to && h.start == h.endB && n.state.selection instanceof j && (h.start > n.state.selection.from && h.start <= n.state.selection.from + 2 && n.state.selection.from >= c.from ? h.start = n.state.selection.from : h.endA < n.state.selection.to && h.endA >= n.state.selection.to - 2 && n.state.selection.to <= c.to && (h.endB += n.state.selection.to - h.endA, h.endA = n.state.selection.to)), Pe && rn <= 11 && h.endB == h.start + 1 && h.endA == h.start && h.start > c.from && c.doc.textBetween(h.start - c.from - 1, h.start - c.from + 1) == "  " && (h.start--, h.endA--, h.endB--);
  let m = c.doc.resolveNoCache(h.start - c.from), g = c.doc.resolveNoCache(h.endB - c.from), v = u.resolve(h.start), b = m.sameParent(g) && m.parent.inlineContent && v.end() >= h.endA, x;
  if ((Ar && n.input.lastIOSEnter > Date.now() - 225 && (!b || o.some((T) => T.nodeName == "DIV" || T.nodeName == "P")) || !b && m.pos < c.doc.content.size && !m.sameParent(g) && (x = W.findFrom(c.doc.resolve(m.pos + 1), 1, !0)) && x.head == g.pos) && n.someProp("handleKeyDown", (T) => T(n, xn(13, "Enter")))) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (n.state.selection.anchor > h.start && ty(u, h.start, h.endA, m, g) && n.someProp("handleKeyDown", (T) => T(n, xn(8, "Backspace")))) {
    ot && Ee && n.domObserver.suppressSelectionUpdates();
    return;
  }
  Ee && ot && h.endB == h.start && (n.input.lastAndroidDelete = Date.now()), ot && !b && m.start() != g.start() && g.parentOffset == 0 && m.depth == g.depth && c.sel && c.sel.anchor == c.sel.head && c.sel.head == h.endA && (h.endB -= 2, g = c.doc.resolveNoCache(h.endB - c.from), setTimeout(() => {
    n.someProp("handleKeyDown", function(T) {
      return T(n, xn(13, "Enter"));
    });
  }, 20));
  let y = h.start, w = h.endA, k, S, E;
  if (b) {
    if (m.pos == g.pos)
      Pe && rn <= 11 && m.parentOffset == 0 && (n.domObserver.suppressSelectionUpdates(), setTimeout(() => zt(n), 20)), k = n.state.tr.delete(y, w), S = u.resolve(h.start).marksAcross(u.resolve(h.endA));
    else if (
      // Adding or removing a mark
      h.endA == h.endB && (E = ey(m.parent.content.cut(m.parentOffset, g.parentOffset), v.parent.content.cut(v.parentOffset, h.endA - v.start())))
    )
      k = n.state.tr, E.type == "add" ? k.addMark(y, w, E.mark) : k.removeMark(y, w, E.mark);
    else if (m.parent.child(m.index()).isText && m.index() == g.index() - (g.textOffset ? 0 : 1)) {
      let T = m.parent.textBetween(m.parentOffset, g.parentOffset);
      if (n.someProp("handleTextInput", (D) => D(n, y, w, T)))
        return;
      k = n.state.tr.insertText(T, y, w);
    }
  }
  if (k || (k = n.state.tr.replace(y, w, c.doc.slice(h.start - c.from, h.endB - c.from))), c.sel) {
    let T = mu(n, k.doc, c.sel);
    T && !(Ee && ot && n.composing && T.empty && (h.start != h.endB || n.input.lastAndroidDelete < Date.now() - 100) && (T.head == y || T.head == k.mapping.map(w) - 1) || Pe && T.empty && T.head == y) && k.setSelection(T);
  }
  S && k.ensureMarks(S), s && k.setMeta("composition", s), n.dispatch(k.scrollIntoView());
}
function mu(n, e, t) {
  return Math.max(t.anchor, t.head) > e.content.size ? null : Ol(n, e.resolve(t.anchor), e.resolve(t.head));
}
function ey(n, e) {
  let t = n.firstChild.marks, r = e.firstChild.marks, o = t, s = r, i, a, l;
  for (let u = 0; u < r.length; u++)
    o = r[u].removeFromSet(o);
  for (let u = 0; u < t.length; u++)
    s = t[u].removeFromSet(s);
  if (o.length == 1 && s.length == 0)
    a = o[0], i = "add", l = (u) => u.mark(a.addToSet(u.marks));
  else if (o.length == 0 && s.length == 1)
    a = s[0], i = "remove", l = (u) => u.mark(a.removeFromSet(u.marks));
  else
    return null;
  let c = [];
  for (let u = 0; u < e.childCount; u++)
    c.push(l(e.child(u)));
  if (M.from(c).eq(n))
    return { mark: a, type: i };
}
function ty(n, e, t, r, o) {
  if (!r.parent.isTextblock || // The content must have shrunk
  t - e <= o.pos - r.pos || // newEnd must point directly at or after the end of the block that newStart points into
  Ui(r, !0, !1) < o.pos)
    return !1;
  let s = n.resolve(e);
  if (s.parentOffset < s.parent.content.size || !s.parent.isTextblock)
    return !1;
  let i = n.resolve(Ui(s, !0, !0));
  return !i.parent.isTextblock || i.pos > t || Ui(i, !0, !1) < t ? !1 : r.parent.content.cut(r.parentOffset).eq(i.parent.content);
}
function Ui(n, e, t) {
  let r = n.depth, o = e ? n.end() : n.pos;
  for (; r > 0 && (e || n.indexAfter(r) == n.node(r).childCount); )
    r--, o++, e = !1;
  if (t) {
    let s = n.node(r).maybeChild(n.indexAfter(r));
    for (; s && !s.isLeaf; )
      s = s.firstChild, o++;
  }
  return o;
}
function ny(n, e, t, r, o) {
  let s = n.findDiffStart(e, t);
  if (s == null)
    return null;
  let { a: i, b: a } = n.findDiffEnd(e, t + n.size, t + e.size);
  if (o == "end") {
    let l = Math.max(0, s - Math.min(i, a));
    r -= i + l - s;
  }
  if (i < s && n.size < e.size) {
    let l = r <= s && r >= i ? s - r : 0;
    s -= l, a = s + (a - i), i = s;
  } else if (a < s) {
    let l = r <= s && r >= a ? s - r : 0;
    s -= l, i = s + (i - a), a = s;
  }
  return { start: s, endA: i, endB: a };
}
class ry {
  /**
  Create a view. `place` may be a DOM node that the editor should
  be appended to, a function that will place it into the document,
  or an object whose `mount` property holds the node to use as the
  document container. If it is `null`, the editor will not be
  added to the document.
  */
  constructor(e, t) {
    this._root = null, this.focused = !1, this.trackWrites = null, this.mounted = !1, this.markCursor = null, this.cursorWrapper = null, this.lastSelectedViewDesc = void 0, this.input = new S0(), this.prevDirectPlugins = [], this.pluginViews = [], this.requiresGeckoHackNode = !1, this.dragging = null, this._props = t, this.state = t.state, this.directPlugins = t.plugins || [], this.directPlugins.forEach(ku), this.dispatch = this.dispatch.bind(this), this.dom = e && e.mount || document.createElement("div"), e && (e.appendChild ? e.appendChild(this.dom) : typeof e == "function" ? e(this.dom) : e.mount && (this.mounted = !0)), this.editable = vu(this), yu(this), this.nodeViews = bu(this), this.docView = Qc(this.state.doc, gu(this), ji(this), this.dom, this), this.domObserver = new K0(this, (r, o, s, i) => X0(this, r, o, s, i)), this.domObserver.start(), C0(this), this.updatePluginViews();
  }
  /**
  Holds `true` when a
  [composition](https://w3c.github.io/uievents/#events-compositionevents)
  is active.
  */
  get composing() {
    return this.input.composing;
  }
  /**
  The view's current [props](https://prosemirror.net/docs/ref/#view.EditorProps).
  */
  get props() {
    if (this._props.state != this.state) {
      let e = this._props;
      this._props = {};
      for (let t in e)
        this._props[t] = e[t];
      this._props.state = this.state;
    }
    return this._props;
  }
  /**
  Update the view's props. Will immediately cause an update to
  the DOM.
  */
  update(e) {
    e.handleDOMEvents != this._props.handleDOMEvents && ja(this);
    let t = this._props;
    this._props = e, e.plugins && (e.plugins.forEach(ku), this.directPlugins = e.plugins), this.updateStateInner(e.state, t);
  }
  /**
  Update the view by updating existing props object with the object
  given as argument. Equivalent to `view.update(Object.assign({},
  view.props, props))`.
  */
  setProps(e) {
    let t = {};
    for (let r in this._props)
      t[r] = this._props[r];
    t.state = this.state;
    for (let r in e)
      t[r] = e[r];
    this.update(t);
  }
  /**
  Update the editor's `state` prop, without touching any of the
  other props.
  */
  updateState(e) {
    this.updateStateInner(e, this._props);
  }
  updateStateInner(e, t) {
    let r = this.state, o = !1, s = !1;
    e.storedMarks && this.composing && (xp(this), s = !0), this.state = e;
    let i = r.plugins != e.plugins || this._props.plugins != t.plugins;
    if (i || this._props.plugins != t.plugins || this._props.nodeViews != t.nodeViews) {
      let f = bu(this);
      sy(f, this.nodeViews) && (this.nodeViews = f, o = !0);
    }
    (i || t.handleDOMEvents != this._props.handleDOMEvents) && ja(this), this.editable = vu(this), yu(this);
    let a = ji(this), l = gu(this), c = r.plugins != e.plugins && !r.doc.eq(e.doc) ? "reset" : e.scrollToSelection > r.scrollToSelection ? "to selection" : "preserve", u = o || !this.docView.matchesNode(e.doc, l, a);
    (u || !e.selection.eq(r.selection)) && (s = !0);
    let d = c == "preserve" && s && this.dom.style.overflowAnchor == null && qg(this);
    if (s) {
      this.domObserver.stop();
      let f = u && (Pe || Ee) && !this.composing && !r.selection.empty && !e.selection.empty && oy(r.selection, e.selection);
      if (u) {
        let p = Ee ? this.trackWrites = this.domSelectionRange().focusNode : null;
        (o || !this.docView.update(e.doc, l, a, this)) && (this.docView.updateOuterDeco([]), this.docView.destroy(), this.docView = Qc(e.doc, l, a, this.dom, this)), p && !this.trackWrites && (f = !0);
      }
      f || !(this.input.mouseDown && this.domObserver.currentSelection.eq(this.domSelectionRange()) && u0(this)) ? zt(this, f) : (ap(this, e.selection), this.domObserver.setCurSelection()), this.domObserver.start();
    }
    this.updatePluginViews(r), c == "reset" ? this.dom.scrollTop = 0 : c == "to selection" ? this.scrollToSelection() : d && zg(d);
  }
  /**
  @internal
  */
  scrollToSelection() {
    let e = this.domSelectionRange().focusNode;
    if (!this.someProp("handleScrollToSelection", (t) => t(this)))
      if (this.state.selection instanceof $) {
        let t = this.docView.domAfterPos(this.state.selection.from);
        t.nodeType == 1 && Wc(this, t.getBoundingClientRect(), e);
      } else
        Wc(this, this.coordsAtPos(this.state.selection.head, 1), e);
  }
  destroyPluginViews() {
    let e;
    for (; e = this.pluginViews.pop(); )
      e.destroy && e.destroy();
  }
  updatePluginViews(e) {
    if (!e || e.plugins != this.state.plugins || this.directPlugins != this.prevDirectPlugins) {
      this.prevDirectPlugins = this.directPlugins, this.destroyPluginViews();
      for (let t = 0; t < this.directPlugins.length; t++) {
        let r = this.directPlugins[t];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
      for (let t = 0; t < this.state.plugins.length; t++) {
        let r = this.state.plugins[t];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
    } else
      for (let t = 0; t < this.pluginViews.length; t++) {
        let r = this.pluginViews[t];
        r.update && r.update(this, e);
      }
  }
  someProp(e, t) {
    let r = this._props && this._props[e], o;
    if (r != null && (o = t ? t(r) : r))
      return o;
    for (let i = 0; i < this.directPlugins.length; i++) {
      let a = this.directPlugins[i].props[e];
      if (a != null && (o = t ? t(a) : a))
        return o;
    }
    let s = this.state.plugins;
    if (s)
      for (let i = 0; i < s.length; i++) {
        let a = s[i].props[e];
        if (a != null && (o = t ? t(a) : a))
          return o;
      }
  }
  /**
  Query whether the view has focus.
  */
  hasFocus() {
    if (Pe) {
      let e = this.root.activeElement;
      if (e == this.dom)
        return !0;
      if (!e || !this.dom.contains(e))
        return !1;
      for (; e && this.dom != e && this.dom.contains(e); ) {
        if (e.contentEditable == "false")
          return !1;
        e = e.parentElement;
      }
      return !0;
    }
    return this.root.activeElement == this.dom;
  }
  /**
  Focus the editor.
  */
  focus() {
    this.domObserver.stop(), this.editable && $g(this.dom), zt(this), this.domObserver.start();
  }
  /**
  Get the document root in which the editor exists. This will
  usually be the top-level `document`, but might be a [shadow
  DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM)
  root if the editor is inside one.
  */
  get root() {
    let e = this._root;
    if (e == null) {
      for (let t = this.dom.parentNode; t; t = t.parentNode)
        if (t.nodeType == 9 || t.nodeType == 11 && t.host)
          return t.getSelection || (Object.getPrototypeOf(t).getSelection = () => t.ownerDocument.getSelection()), this._root = t;
    }
    return e || document;
  }
  /**
  Given a pair of viewport coordinates, return the document
  position that corresponds to them. May return null if the given
  coordinates aren't inside of the editor. When an object is
  returned, its `pos` property is the position nearest to the
  coordinates, and its `inside` property holds the position of the
  inner node that the position falls inside of, or -1 if it is at
  the top level, not in any node.
  */
  posAtCoords(e) {
    return Wg(this, e);
  }
  /**
  Returns the viewport rectangle at a given document position.
  `left` and `right` will be the same number, as this returns a
  flat cursor-ish rectangle. If the position is between two things
  that aren't directly adjacent, `side` determines which element
  is used. When < 0, the element before the position is used,
  otherwise the element after.
  */
  coordsAtPos(e, t = 1) {
    return Xf(this, e, t);
  }
  /**
  Find the DOM position that corresponds to the given document
  position. When `side` is negative, find the position as close as
  possible to the content before the position. When positive,
  prefer positions close to the content after the position. When
  zero, prefer as shallow a position as possible.
  
  Note that you should **not** mutate the editor's internal DOM,
  only inspect it (and even that is usually not necessary).
  */
  domAtPos(e, t = 0) {
    return this.docView.domFromPos(e, t);
  }
  /**
  Find the DOM node that represents the document node after the
  given position. May return `null` when the position doesn't point
  in front of a node or if the node is inside an opaque node view.
  
  This is intended to be able to call things like
  `getBoundingClientRect` on that DOM node. Do **not** mutate the
  editor DOM directly, or add styling this way, since that will be
  immediately overriden by the editor as it redraws the node.
  */
  nodeDOM(e) {
    let t = this.docView.descAt(e);
    return t ? t.nodeDOM : null;
  }
  /**
  Find the document position that corresponds to a given DOM
  position. (Whenever possible, it is preferable to inspect the
  document structure directly, rather than poking around in the
  DOM, but sometimes—for example when interpreting an event
  target—you don't have a choice.)
  
  The `bias` parameter can be used to influence which side of a DOM
  node to use when the position is inside a leaf node.
  */
  posAtDOM(e, t, r = -1) {
    let o = this.docView.posFromDOM(e, t, r);
    if (o == null)
      throw new RangeError("DOM position not inside the editor");
    return o;
  }
  /**
  Find out whether the selection is at the end of a textblock when
  moving in a given direction. When, for example, given `"left"`,
  it will return true if moving left from the current cursor
  position would leave that position's parent textblock. Will apply
  to the view's current state by default, but it is possible to
  pass a different state.
  */
  endOfTextblock(e, t) {
    return Yg(this, t || this.state, e);
  }
  /**
  Run the editor's paste logic with the given HTML string. The
  `event`, if given, will be passed to the
  [`handlePaste`](https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste) hook.
  */
  pasteHTML(e, t) {
    return go(this, "", e, !1, t || new ClipboardEvent("paste"));
  }
  /**
  Run the editor's paste logic with the given plain-text input.
  */
  pasteText(e, t) {
    return go(this, e, null, !0, t || new ClipboardEvent("paste"));
  }
  /**
  Removes the editor from the DOM and destroys all [node
  views](https://prosemirror.net/docs/ref/#view.NodeView).
  */
  destroy() {
    this.docView && (E0(this), this.destroyPluginViews(), this.mounted ? (this.docView.update(this.state.doc, [], ji(this), this), this.dom.textContent = "") : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom), this.docView.destroy(), this.docView = null);
  }
  /**
  This is true when the view has been
  [destroyed](https://prosemirror.net/docs/ref/#view.EditorView.destroy) (and thus should not be
  used anymore).
  */
  get isDestroyed() {
    return this.docView == null;
  }
  /**
  Used for testing.
  */
  dispatchEvent(e) {
    return T0(this, e);
  }
  /**
  Dispatch a transaction. Will call
  [`dispatchTransaction`](https://prosemirror.net/docs/ref/#view.DirectEditorProps.dispatchTransaction)
  when given, and otherwise defaults to applying the transaction to
  the current state and calling
  [`updateState`](https://prosemirror.net/docs/ref/#view.EditorView.updateState) with the result.
  This method is bound to the view instance, so that it can be
  easily passed around.
  */
  dispatch(e) {
    let t = this._props.dispatchTransaction;
    t ? t.call(this, e) : this.updateState(this.state.apply(e));
  }
  /**
  @internal
  */
  domSelectionRange() {
    return _e && this.root.nodeType === 11 && Ng(this.dom.ownerDocument) == this.dom ? J0(this) : this.domSelection();
  }
  /**
  @internal
  */
  domSelection() {
    return this.root.getSelection();
  }
}
function gu(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return e.class = "ProseMirror", e.contenteditable = String(n.editable), n.someProp("attributes", (t) => {
    if (typeof t == "function" && (t = t(n.state)), t)
      for (let r in t)
        r == "class" ? e.class += " " + t[r] : r == "style" ? e.style = (e.style ? e.style + ";" : "") + t[r] : !e[r] && r != "contenteditable" && r != "nodeName" && (e[r] = String(t[r]));
  }), e.translate || (e.translate = "no"), [Ie.node(0, n.state.doc.content.size, e)];
}
function yu(n) {
  if (n.markCursor) {
    let e = document.createElement("img");
    e.className = "ProseMirror-separator", e.setAttribute("mark-placeholder", "true"), e.setAttribute("alt", ""), n.cursorWrapper = { dom: e, deco: Ie.widget(n.state.selection.head, e, { raw: !0, marks: n.markCursor }) };
  } else
    n.cursorWrapper = null;
}
function vu(n) {
  return !n.someProp("editable", (e) => e(n.state) === !1);
}
function oy(n, e) {
  let t = Math.min(n.$anchor.sharedDepth(n.head), e.$anchor.sharedDepth(e.head));
  return n.$anchor.start(t) != e.$anchor.start(t);
}
function bu(n) {
  let e = /* @__PURE__ */ Object.create(null);
  function t(r) {
    for (let o in r)
      Object.prototype.hasOwnProperty.call(e, o) || (e[o] = r[o]);
  }
  return n.someProp("nodeViews", t), n.someProp("markViews", t), e;
}
function sy(n, e) {
  let t = 0, r = 0;
  for (let o in n) {
    if (n[o] != e[o])
      return !0;
    t++;
  }
  for (let o in e)
    r++;
  return t != r;
}
function ku(n) {
  if (n.spec.state || n.spec.filterTransaction || n.spec.appendTransaction)
    throw new RangeError("Plugins passed directly to the view must not have a state component");
}
var cn = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
}, Ts = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ":",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: '"'
}, iy = typeof navigator < "u" && /Mac/.test(navigator.platform), ay = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var we = 0; we < 10; we++)
  cn[48 + we] = cn[96 + we] = String(we);
for (var we = 1; we <= 24; we++)
  cn[we + 111] = "F" + we;
for (var we = 65; we <= 90; we++)
  cn[we] = String.fromCharCode(we + 32), Ts[we] = String.fromCharCode(we);
for (var Wi in cn)
  Ts.hasOwnProperty(Wi) || (Ts[Wi] = cn[Wi]);
function ly(n) {
  var e = iy && n.metaKey && n.shiftKey && !n.ctrlKey && !n.altKey || ay && n.shiftKey && n.key && n.key.length == 1 || n.key == "Unidentified", t = !e && n.key || (n.shiftKey ? Ts : cn)[n.keyCode] || n.key || "Unidentified";
  return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
const cy = typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : !1;
function uy(n) {
  let e = n.split(/-(?!$)/), t = e[e.length - 1];
  t == "Space" && (t = " ");
  let r, o, s, i;
  for (let a = 0; a < e.length - 1; a++) {
    let l = e[a];
    if (/^(cmd|meta|m)$/i.test(l))
      i = !0;
    else if (/^a(lt)?$/i.test(l))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(l))
      o = !0;
    else if (/^s(hift)?$/i.test(l))
      s = !0;
    else if (/^mod$/i.test(l))
      cy ? i = !0 : o = !0;
    else
      throw new Error("Unrecognized modifier name: " + l);
  }
  return r && (t = "Alt-" + t), o && (t = "Ctrl-" + t), i && (t = "Meta-" + t), s && (t = "Shift-" + t), t;
}
function dy(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n)
    e[uy(t)] = n[t];
  return e;
}
function Ki(n, e, t = !0) {
  return e.altKey && (n = "Alt-" + n), e.ctrlKey && (n = "Ctrl-" + n), e.metaKey && (n = "Meta-" + n), t && e.shiftKey && (n = "Shift-" + n), n;
}
function fy(n) {
  return new fe({ props: { handleKeyDown: Ap(n) } });
}
function Ap(n) {
  let e = dy(n);
  return function(t, r) {
    let o = ly(r), s, i = e[Ki(o, r)];
    if (i && i(t.state, t.dispatch, t))
      return !0;
    if (o.length == 1 && o != " ") {
      if (r.shiftKey) {
        let a = e[Ki(o, r, !1)];
        if (a && a(t.state, t.dispatch, t))
          return !0;
      }
      if ((r.shiftKey || r.altKey || r.metaKey || o.charCodeAt(0) > 127) && (s = cn[r.keyCode]) && s != o) {
        let a = e[Ki(s, r)];
        if (a && a(t.state, t.dispatch, t))
          return !0;
      }
    }
    return !1;
  };
}
const py = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function hy(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const my = (n, e, t) => {
  let r = hy(n, t);
  if (!r)
    return !1;
  let o = Tp(r);
  if (!o) {
    let i = r.blockRange(), a = i && Pr(i);
    return a == null ? !1 : (e && e(n.tr.lift(i, a).scrollIntoView()), !0);
  }
  let s = o.nodeBefore;
  if (!s.type.spec.isolating && Dp(n, o, e))
    return !0;
  if (r.parent.content.size == 0 && (Mr(s, "end") || $.isSelectable(s))) {
    let i = Cl(n.doc, r.before(), r.after(), N.empty);
    if (i && i.slice.size < i.to - i.from) {
      if (e) {
        let a = n.tr.step(i);
        a.setSelection(Mr(s, "end") ? W.findFrom(a.doc.resolve(a.mapping.map(o.pos, -1)), -1) : $.create(a.doc, o.pos - s.nodeSize)), e(a.scrollIntoView());
      }
      return !0;
    }
  }
  return s.isAtom && o.depth == r.depth - 1 ? (e && e(n.tr.delete(o.pos - s.nodeSize, o.pos).scrollIntoView()), !0) : !1;
};
function Mr(n, e, t = !1) {
  for (let r = n; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (t && r.childCount != 1)
      return !1;
  }
  return !1;
}
const gy = (n, e, t) => {
  let { $head: r, empty: o } = n.selection, s = r;
  if (!o)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    s = Tp(r);
  }
  let i = s && s.nodeBefore;
  return !i || !$.isSelectable(i) ? !1 : (e && e(n.tr.setSelection($.create(n.doc, s.pos - i.nodeSize)).scrollIntoView()), !0);
};
function Tp(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function yy(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const vy = (n, e, t) => {
  let r = yy(n, t);
  if (!r)
    return !1;
  let o = Mp(r);
  if (!o)
    return !1;
  let s = o.nodeAfter;
  if (Dp(n, o, e))
    return !0;
  if (r.parent.content.size == 0 && (Mr(s, "start") || $.isSelectable(s))) {
    let i = Cl(n.doc, r.before(), r.after(), N.empty);
    if (i && i.slice.size < i.to - i.from) {
      if (e) {
        let a = n.tr.step(i);
        a.setSelection(Mr(s, "start") ? W.findFrom(a.doc.resolve(a.mapping.map(o.pos)), 1) : $.create(a.doc, a.mapping.map(o.pos))), e(a.scrollIntoView());
      }
      return !0;
    }
  }
  return s.isAtom && o.depth == r.depth - 1 ? (e && e(n.tr.delete(o.pos, o.pos + s.nodeSize).scrollIntoView()), !0) : !1;
}, by = (n, e, t) => {
  let { $head: r, empty: o } = n.selection, s = r;
  if (!o)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    s = Mp(r);
  }
  let i = s && s.nodeAfter;
  return !i || !$.isSelectable(i) ? !1 : (e && e(n.tr.setSelection($.create(n.doc, s.pos)).scrollIntoView()), !0);
};
function Mp(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      let t = n.node(e);
      if (n.index(e) + 1 < t.childCount)
        return n.doc.resolve(n.after(e + 1));
      if (t.type.spec.isolating)
        break;
    }
  return null;
}
const ky = (n, e) => {
  let t = n.selection, r = t instanceof $, o;
  if (r) {
    if (t.node.isTextblock || !dn(n.doc, t.from))
      return !1;
    o = t.from;
  } else if (o = oi(n.doc, t.from, -1), o == null)
    return !1;
  if (e) {
    let s = n.tr.join(o);
    r && s.setSelection($.create(s.doc, o - n.doc.resolve(o).nodeBefore.nodeSize)), e(s.scrollIntoView());
  }
  return !0;
}, xy = (n, e) => {
  let t = n.selection, r;
  if (t instanceof $) {
    if (t.node.isTextblock || !dn(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = oi(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, wy = (n, e) => {
  let { $from: t, $to: r } = n.selection, o = t.blockRange(r), s = o && Pr(o);
  return s == null ? !1 : (e && e(n.tr.lift(o, s).scrollIntoView()), !0);
}, Sy = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function Op(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const Cy = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let o = t.node(-1), s = t.indexAfter(-1), i = Op(o.contentMatchAt(s));
  if (!i || !o.canReplaceWith(s, s, i))
    return !1;
  if (e) {
    let a = t.after(), l = n.tr.replaceWith(a, a, i.createAndFill());
    l.setSelection(W.near(l.doc.resolve(a), 1)), e(l.scrollIntoView());
  }
  return !0;
}, Ey = (n, e) => {
  let t = n.selection, { $from: r, $to: o } = t;
  if (t instanceof at || r.parent.inlineContent || o.parent.inlineContent)
    return !1;
  let s = Op(o.parent.contentMatchAt(o.indexAfter()));
  if (!s || !s.isTextblock)
    return !1;
  if (e) {
    let i = (!r.parentOffset && o.index() < o.parent.childCount ? r : o).pos, a = n.tr.insert(i, s.createAndFill());
    a.setSelection(j.create(a.doc, i + 1)), e(a.scrollIntoView());
  }
  return !0;
}, Ay = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let s = t.before();
    if (gr(n.doc, s))
      return e && e(n.tr.split(s).scrollIntoView()), !0;
  }
  let r = t.blockRange(), o = r && Pr(r);
  return o == null ? !1 : (e && e(n.tr.lift(r, o).scrollIntoView()), !0);
}, Ty = (n, e) => {
  let { $from: t, to: r } = n.selection, o, s = t.sharedDepth(r);
  return s == 0 ? !1 : (o = t.before(s), e && e(n.tr.setSelection($.create(n.doc, o))), !0);
};
function My(n, e, t) {
  let r = e.nodeBefore, o = e.nodeAfter, s = e.index();
  return !r || !o || !r.type.compatibleContent(o.type) ? !1 : !r.content.size && e.parent.canReplace(s - 1, s) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(s, s + 1) || !(o.isTextblock || dn(n.doc, e.pos)) ? !1 : (t && t(n.tr.clearIncompatible(e.pos, r.type, r.contentMatchAt(r.childCount)).join(e.pos).scrollIntoView()), !0);
}
function Dp(n, e, t) {
  let r = e.nodeBefore, o = e.nodeAfter, s, i;
  if (r.type.spec.isolating || o.type.spec.isolating)
    return !1;
  if (My(n, e, t))
    return !0;
  let a = e.parent.canReplace(e.index(), e.index() + 1);
  if (a && (s = (i = r.contentMatchAt(r.childCount)).findWrapping(o.type)) && i.matchType(s[0] || o.type).validEnd) {
    if (t) {
      let d = e.pos + o.nodeSize, f = M.empty;
      for (let m = s.length - 1; m >= 0; m--)
        f = M.from(s[m].create(null, f));
      f = M.from(r.copy(f));
      let p = n.tr.step(new ge(e.pos - 1, d, e.pos, d, new N(f, 1, 0), s.length, !0)), h = d + 2 * s.length;
      dn(p.doc, h) && p.join(h), t(p.scrollIntoView());
    }
    return !0;
  }
  let l = W.findFrom(e, 1), c = l && l.$from.blockRange(l.$to), u = c && Pr(c);
  if (u != null && u >= e.depth)
    return t && t(n.tr.lift(c, u).scrollIntoView()), !0;
  if (a && Mr(o, "start", !0) && Mr(r, "end")) {
    let d = r, f = [];
    for (; f.push(d), !d.isTextblock; )
      d = d.lastChild;
    let p = o, h = 1;
    for (; !p.isTextblock; p = p.firstChild)
      h++;
    if (d.canReplace(d.childCount, d.childCount, p.content)) {
      if (t) {
        let m = M.empty;
        for (let v = f.length - 1; v >= 0; v--)
          m = M.from(f[v].copy(m));
        let g = n.tr.step(new ge(e.pos - f.length, e.pos + o.nodeSize, e.pos + h, e.pos + o.nodeSize - h, new N(m, f.length, 0), 0, !0));
        t(g.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function _p(n) {
  return function(e, t) {
    let r = e.selection, o = n < 0 ? r.$from : r.$to, s = o.depth;
    for (; o.node(s).isInline; ) {
      if (!s)
        return !1;
      s--;
    }
    return o.node(s).isTextblock ? (t && t(e.tr.setSelection(j.create(e.doc, n < 0 ? o.start(s) : o.end(s)))), !0) : !1;
  };
}
const Oy = _p(-1), Dy = _p(1);
function _y(n, e = null) {
  return function(t, r) {
    let { $from: o, $to: s } = t.selection, i = o.blockRange(s), a = i && Sl(i, n, e);
    return a ? (r && r(t.tr.wrap(i, a).scrollIntoView()), !0) : !1;
  };
}
function xu(n, e = null) {
  return function(t, r) {
    let o = !1;
    for (let s = 0; s < t.selection.ranges.length && !o; s++) {
      let { $from: { pos: i }, $to: { pos: a } } = t.selection.ranges[s];
      t.doc.nodesBetween(i, a, (l, c) => {
        if (o)
          return !1;
        if (!(!l.isTextblock || l.hasMarkup(n, e)))
          if (l.type == n)
            o = !0;
          else {
            let u = t.doc.resolve(c), d = u.index();
            o = u.parent.canReplaceWith(d, d + 1, n);
          }
      });
    }
    if (!o)
      return !1;
    if (r) {
      let s = t.tr;
      for (let i = 0; i < t.selection.ranges.length; i++) {
        let { $from: { pos: a }, $to: { pos: l } } = t.selection.ranges[i];
        s.setBlockType(a, l, n, e);
      }
      r(s.scrollIntoView());
    }
    return !0;
  };
}
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function Ny(n, e = null) {
  return function(t, r) {
    let { $from: o, $to: s } = t.selection, i = o.blockRange(s), a = !1, l = i;
    if (!i)
      return !1;
    if (i.depth >= 2 && o.node(i.depth - 1).type.compatibleContent(n) && i.startIndex == 0) {
      if (o.index(i.depth - 1) == 0)
        return !1;
      let u = t.doc.resolve(i.start - 2);
      l = new ks(u, u, i.depth), i.endIndex < i.parent.childCount && (i = new ks(o, t.doc.resolve(s.end(i.depth)), i.depth)), a = !0;
    }
    let c = Sl(l, n, e, i);
    return c ? (r && r(Ly(t.tr, i, c, a, n).scrollIntoView()), !0) : !1;
  };
}
function Ly(n, e, t, r, o) {
  let s = M.empty;
  for (let u = t.length - 1; u >= 0; u--)
    s = M.from(t[u].type.create(t[u].attrs, s));
  n.step(new ge(e.start - (r ? 2 : 0), e.end, e.start, e.end, new N(s, 0, 0), t.length, !0));
  let i = 0;
  for (let u = 0; u < t.length; u++)
    t[u].type == o && (i = u + 1);
  let a = t.length - i, l = e.start + t.length - (r ? 2 : 0), c = e.parent;
  for (let u = e.startIndex, d = e.endIndex, f = !0; u < d; u++, f = !1)
    !f && gr(n.doc, l, a) && (n.split(l, a), l += 2 * a), l += c.child(u).nodeSize;
  return n;
}
function Ry(n) {
  return function(e, t) {
    let { $from: r, $to: o } = e.selection, s = r.blockRange(o, (i) => i.childCount > 0 && i.firstChild.type == n);
    return s ? t ? r.node(s.depth - 1).type == n ? Iy(e, t, n, s) : Py(e, t, s) : !0 : !1;
  };
}
function Iy(n, e, t, r) {
  let o = n.tr, s = r.end, i = r.$to.end(r.depth);
  s < i && (o.step(new ge(s - 1, i, s, i, new N(M.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new ks(o.doc.resolve(r.$from.pos), o.doc.resolve(i), r.depth));
  const a = Pr(r);
  if (a == null)
    return !1;
  o.lift(r, a);
  let l = o.mapping.map(s, -1) - 1;
  return dn(o.doc, l) && o.join(l), e(o.scrollIntoView()), !0;
}
function Py(n, e, t) {
  let r = n.tr, o = t.parent;
  for (let p = t.end, h = t.endIndex - 1, m = t.startIndex; h > m; h--)
    p -= o.child(h).nodeSize, r.delete(p - 1, p + 1);
  let s = r.doc.resolve(t.start), i = s.nodeAfter;
  if (r.mapping.map(t.end) != t.start + s.nodeAfter.nodeSize)
    return !1;
  let a = t.startIndex == 0, l = t.endIndex == o.childCount, c = s.node(-1), u = s.index(-1);
  if (!c.canReplace(u + (a ? 0 : 1), u + 1, i.content.append(l ? M.empty : M.from(o))))
    return !1;
  let d = s.pos, f = d + i.nodeSize;
  return r.step(new ge(d - (a ? 1 : 0), f + (l ? 1 : 0), d + 1, f - 1, new N((a ? M.empty : M.from(o.copy(M.empty))).append(l ? M.empty : M.from(o.copy(M.empty))), a ? 0 : 1, l ? 0 : 1), a ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function By(n) {
  return function(e, t) {
    let { $from: r, $to: o } = e.selection, s = r.blockRange(o, (c) => c.childCount > 0 && c.firstChild.type == n);
    if (!s)
      return !1;
    let i = s.startIndex;
    if (i == 0)
      return !1;
    let a = s.parent, l = a.child(i - 1);
    if (l.type != n)
      return !1;
    if (t) {
      let c = l.lastChild && l.lastChild.type == a.type, u = M.from(c ? n.create() : null), d = new N(M.from(n.create(null, M.from(a.type.create(null, u)))), c ? 3 : 1, 0), f = s.start, p = s.end;
      t(e.tr.step(new ge(f - (c ? 3 : 1), p, f, p, d, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function ui(n) {
  const { state: e, transaction: t } = n;
  let { selection: r } = t, { doc: o } = t, { storedMarks: s } = t;
  return {
    ...e,
    apply: e.apply.bind(e),
    applyTransaction: e.applyTransaction.bind(e),
    filterTransaction: e.filterTransaction,
    plugins: e.plugins,
    schema: e.schema,
    reconfigure: e.reconfigure.bind(e),
    toJSON: e.toJSON.bind(e),
    get storedMarks() {
      return s;
    },
    get selection() {
      return r;
    },
    get doc() {
      return o;
    },
    get tr() {
      return r = t.selection, o = t.doc, s = t.storedMarks, t;
    }
  };
}
class di {
  constructor(e) {
    this.editor = e.editor, this.rawCommands = this.editor.extensionManager.commands, this.customState = e.state;
  }
  get hasCustomState() {
    return !!this.customState;
  }
  get state() {
    return this.customState || this.editor.state;
  }
  get commands() {
    const { rawCommands: e, editor: t, state: r } = this, { view: o } = t, { tr: s } = r, i = this.buildProps(s);
    return Object.fromEntries(Object.entries(e).map(([a, l]) => [a, (...u) => {
      const d = l(...u)(i);
      return !s.getMeta("preventDispatch") && !this.hasCustomState && o.dispatch(s), d;
    }]));
  }
  get chain() {
    return () => this.createChain();
  }
  get can() {
    return () => this.createCan();
  }
  createChain(e, t = !0) {
    const { rawCommands: r, editor: o, state: s } = this, { view: i } = o, a = [], l = !!e, c = e || s.tr, u = () => (!l && t && !c.getMeta("preventDispatch") && !this.hasCustomState && i.dispatch(c), a.every((f) => f === !0)), d = {
      ...Object.fromEntries(Object.entries(r).map(([f, p]) => [f, (...m) => {
        const g = this.buildProps(c, t), v = p(...m)(g);
        return a.push(v), d;
      }])),
      run: u
    };
    return d;
  }
  createCan(e) {
    const { rawCommands: t, state: r } = this, o = !1, s = e || r.tr, i = this.buildProps(s, o);
    return {
      ...Object.fromEntries(Object.entries(t).map(([l, c]) => [l, (...u) => c(...u)({ ...i, dispatch: void 0 })])),
      chain: () => this.createChain(s, o)
    };
  }
  buildProps(e, t = !0) {
    const { rawCommands: r, editor: o, state: s } = this, { view: i } = o, a = {
      tr: e,
      editor: o,
      view: i,
      state: ui({
        state: s,
        transaction: e
      }),
      dispatch: t ? () => {
      } : void 0,
      chain: () => this.createChain(e, t),
      can: () => this.createCan(e),
      get commands() {
        return Object.fromEntries(Object.entries(r).map(([l, c]) => [l, (...u) => c(...u)(a)]));
      }
    };
    return a;
  }
}
class Fy {
  constructor() {
    this.callbacks = {};
  }
  on(e, t) {
    return this.callbacks[e] || (this.callbacks[e] = []), this.callbacks[e].push(t), this;
  }
  emit(e, ...t) {
    const r = this.callbacks[e];
    return r && r.forEach((o) => o.apply(this, t)), this;
  }
  off(e, t) {
    const r = this.callbacks[e];
    return r && (t ? this.callbacks[e] = r.filter((o) => o !== t) : delete this.callbacks[e]), this;
  }
  removeAllListeners() {
    this.callbacks = {};
  }
}
function R(n, e, t) {
  return n.config[e] === void 0 && n.parent ? R(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? R(n.parent, e, t) : null
  }) : n.config[e];
}
function fi(n) {
  const e = n.filter((o) => o.type === "extension"), t = n.filter((o) => o.type === "node"), r = n.filter((o) => o.type === "mark");
  return {
    baseExtensions: e,
    nodeExtensions: t,
    markExtensions: r
  };
}
function Np(n) {
  const e = [], { nodeExtensions: t, markExtensions: r } = fi(n), o = [...t, ...r], s = {
    default: null,
    rendered: !0,
    renderHTML: null,
    parseHTML: null,
    keepOnSplit: !0,
    isRequired: !1
  };
  return n.forEach((i) => {
    const a = {
      name: i.name,
      options: i.options,
      storage: i.storage
    }, l = R(i, "addGlobalAttributes", a);
    if (!l)
      return;
    l().forEach((u) => {
      u.types.forEach((d) => {
        Object.entries(u.attributes).forEach(([f, p]) => {
          e.push({
            type: d,
            name: f,
            attribute: {
              ...s,
              ...p
            }
          });
        });
      });
    });
  }), o.forEach((i) => {
    const a = {
      name: i.name,
      options: i.options,
      storage: i.storage
    }, l = R(i, "addAttributes", a);
    if (!l)
      return;
    const c = l();
    Object.entries(c).forEach(([u, d]) => {
      const f = {
        ...s,
        ...d
      };
      typeof (f == null ? void 0 : f.default) == "function" && (f.default = f.default()), f != null && f.isRequired && (f == null ? void 0 : f.default) === void 0 && delete f.default, e.push({
        type: i.name,
        name: u,
        attribute: f
      });
    });
  }), e;
}
function ve(n, e) {
  if (typeof n == "string") {
    if (!e.nodes[n])
      throw Error(`There is no node type named '${n}'. Maybe you forgot to add the extension?`);
    return e.nodes[n];
  }
  return n;
}
function te(...n) {
  return n.filter((e) => !!e).reduce((e, t) => {
    const r = { ...e };
    return Object.entries(t).forEach(([o, s]) => {
      if (!r[o]) {
        r[o] = s;
        return;
      }
      if (o === "class") {
        const a = s ? s.split(" ") : [], l = r[o] ? r[o].split(" ") : [], c = a.filter((u) => !l.includes(u));
        r[o] = [...l, ...c].join(" ");
      } else
        o === "style" ? r[o] = [r[o], s].join("; ") : r[o] = s;
    }), r;
  }, {});
}
function Ua(n, e) {
  return e.filter((t) => t.attribute.rendered).map((t) => t.attribute.renderHTML ? t.attribute.renderHTML(n.attrs) || {} : {
    [t.name]: n.attrs[t.name]
  }).reduce((t, r) => te(t, r), {});
}
function Lp(n) {
  return typeof n == "function";
}
function U(n, e = void 0, ...t) {
  return Lp(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function qy(n = {}) {
  return Object.keys(n).length === 0 && n.constructor === Object;
}
function zy(n) {
  return typeof n != "string" ? n : n.match(/^[+-]?(?:\d*\.)?\d+$/) ? Number(n) : n === "true" ? !0 : n === "false" ? !1 : n;
}
function wu(n, e) {
  return n.style ? n : {
    ...n,
    getAttrs: (t) => {
      const r = n.getAttrs ? n.getAttrs(t) : n.attrs;
      if (r === !1)
        return !1;
      const o = e.reduce((s, i) => {
        const a = i.attribute.parseHTML ? i.attribute.parseHTML(t) : zy(t.getAttribute(i.name));
        return a == null ? s : {
          ...s,
          [i.name]: a
        };
      }, {});
      return { ...r, ...o };
    }
  };
}
function Su(n) {
  return Object.fromEntries(
    // @ts-ignore
    Object.entries(n).filter(([e, t]) => e === "attrs" && qy(t) ? !1 : t != null)
  );
}
function $y(n, e) {
  var t;
  const r = Np(n), { nodeExtensions: o, markExtensions: s } = fi(n), i = (t = o.find((c) => R(c, "topNode"))) === null || t === void 0 ? void 0 : t.name, a = Object.fromEntries(o.map((c) => {
    const u = r.filter((v) => v.type === c.name), d = {
      name: c.name,
      options: c.options,
      storage: c.storage,
      editor: e
    }, f = n.reduce((v, b) => {
      const x = R(b, "extendNodeSchema", d);
      return {
        ...v,
        ...x ? x(c) : {}
      };
    }, {}), p = Su({
      ...f,
      content: U(R(c, "content", d)),
      marks: U(R(c, "marks", d)),
      group: U(R(c, "group", d)),
      inline: U(R(c, "inline", d)),
      atom: U(R(c, "atom", d)),
      selectable: U(R(c, "selectable", d)),
      draggable: U(R(c, "draggable", d)),
      code: U(R(c, "code", d)),
      defining: U(R(c, "defining", d)),
      isolating: U(R(c, "isolating", d)),
      attrs: Object.fromEntries(u.map((v) => {
        var b;
        return [v.name, { default: (b = v == null ? void 0 : v.attribute) === null || b === void 0 ? void 0 : b.default }];
      }))
    }), h = U(R(c, "parseHTML", d));
    h && (p.parseDOM = h.map((v) => wu(v, u)));
    const m = R(c, "renderHTML", d);
    m && (p.toDOM = (v) => m({
      node: v,
      HTMLAttributes: Ua(v, u)
    }));
    const g = R(c, "renderText", d);
    return g && (p.toText = g), [c.name, p];
  })), l = Object.fromEntries(s.map((c) => {
    const u = r.filter((g) => g.type === c.name), d = {
      name: c.name,
      options: c.options,
      storage: c.storage,
      editor: e
    }, f = n.reduce((g, v) => {
      const b = R(v, "extendMarkSchema", d);
      return {
        ...g,
        ...b ? b(c) : {}
      };
    }, {}), p = Su({
      ...f,
      inclusive: U(R(c, "inclusive", d)),
      excludes: U(R(c, "excludes", d)),
      group: U(R(c, "group", d)),
      spanning: U(R(c, "spanning", d)),
      code: U(R(c, "code", d)),
      attrs: Object.fromEntries(u.map((g) => {
        var v;
        return [g.name, { default: (v = g == null ? void 0 : g.attribute) === null || v === void 0 ? void 0 : v.default }];
      }))
    }), h = U(R(c, "parseHTML", d));
    h && (p.parseDOM = h.map((g) => wu(g, u)));
    const m = R(c, "renderHTML", d);
    return m && (p.toDOM = (g) => m({
      mark: g,
      HTMLAttributes: Ua(g, u)
    })), [c.name, p];
  }));
  return new _f({
    topNode: i,
    nodes: a,
    marks: l
  });
}
function Gi(n, e) {
  return e.nodes[n] || e.marks[n] || null;
}
function Cu(n, e) {
  return Array.isArray(e) ? e.some((t) => (typeof t == "string" ? t : t.name) === n.name) : e;
}
const Hy = (n, e = 500) => {
  let t = "";
  const r = n.parentOffset;
  return n.parent.nodesBetween(Math.max(0, r - e), r, (o, s, i, a) => {
    var l, c;
    const u = ((c = (l = o.type.spec).toText) === null || c === void 0 ? void 0 : c.call(l, {
      node: o,
      pos: s,
      parent: i,
      index: a
    })) || o.textContent || "%leaf%";
    t += u.slice(0, Math.max(0, r - s));
  }), t;
};
function Pl(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
class _o {
  constructor(e) {
    this.find = e.find, this.handler = e.handler;
  }
}
const Vy = (n, e) => {
  if (Pl(e))
    return e.exec(n);
  const t = e(n);
  if (!t)
    return null;
  const r = [t.text];
  return r.index = t.index, r.input = n, r.data = t.data, t.replaceWith && (t.text.includes(t.replaceWith) || console.warn('[tiptap warn]: "inputRuleMatch.replaceWith" must be part of "inputRuleMatch.text".'), r.push(t.replaceWith)), r;
};
function Ji(n) {
  var e;
  const { editor: t, from: r, to: o, text: s, rules: i, plugin: a } = n, { view: l } = t;
  if (l.composing)
    return !1;
  const c = l.state.doc.resolve(r);
  if (
    // check for code node
    c.parent.type.spec.code || !((e = c.nodeBefore || c.nodeAfter) === null || e === void 0) && e.marks.find((f) => f.type.spec.code)
  )
    return !1;
  let u = !1;
  const d = Hy(c) + s;
  return i.forEach((f) => {
    if (u)
      return;
    const p = Vy(d, f.find);
    if (!p)
      return;
    const h = l.state.tr, m = ui({
      state: l.state,
      transaction: h
    }), g = {
      from: r - (p[0].length - s.length),
      to: o
    }, { commands: v, chain: b, can: x } = new di({
      editor: t,
      state: m
    });
    f.handler({
      state: m,
      range: g,
      match: p,
      commands: v,
      chain: b,
      can: x
    }) === null || !h.steps.length || (h.setMeta(a, {
      transform: h,
      from: r,
      to: o,
      text: s
    }), l.dispatch(h), u = !0);
  }), u;
}
function jy(n) {
  const { editor: e, rules: t } = n, r = new fe({
    state: {
      init() {
        return null;
      },
      apply(o, s) {
        const i = o.getMeta(r);
        return i || (o.selectionSet || o.docChanged ? null : s);
      }
    },
    props: {
      handleTextInput(o, s, i, a) {
        return Ji({
          editor: e,
          from: s,
          to: i,
          text: a,
          rules: t,
          plugin: r
        });
      },
      handleDOMEvents: {
        compositionend: (o) => (setTimeout(() => {
          const { $cursor: s } = o.state.selection;
          s && Ji({
            editor: e,
            from: s.pos,
            to: s.pos,
            text: "",
            rules: t,
            plugin: r
          });
        }), !1)
      },
      // add support for input rules to trigger on enter
      // this is useful for example for code blocks
      handleKeyDown(o, s) {
        if (s.key !== "Enter")
          return !1;
        const { $cursor: i } = o.state.selection;
        return i ? Ji({
          editor: e,
          from: i.pos,
          to: i.pos,
          text: `
`,
          rules: t,
          plugin: r
        }) : !1;
      }
    },
    // @ts-ignore
    isInputRules: !0
  });
  return r;
}
function Uy(n) {
  return typeof n == "number";
}
class Wy {
  constructor(e) {
    this.find = e.find, this.handler = e.handler;
  }
}
const Ky = (n, e) => {
  if (Pl(e))
    return [...n.matchAll(e)];
  const t = e(n);
  return t ? t.map((r) => {
    const o = [r.text];
    return o.index = r.index, o.input = n, o.data = r.data, r.replaceWith && (r.text.includes(r.replaceWith) || console.warn('[tiptap warn]: "pasteRuleMatch.replaceWith" must be part of "pasteRuleMatch.text".'), o.push(r.replaceWith)), o;
  }) : [];
};
function Gy(n) {
  const { editor: e, state: t, from: r, to: o, rule: s } = n, { commands: i, chain: a, can: l } = new di({
    editor: e,
    state: t
  }), c = [];
  return t.doc.nodesBetween(r, o, (d, f) => {
    if (!d.isTextblock || d.type.spec.code)
      return;
    const p = Math.max(r, f), h = Math.min(o, f + d.content.size), m = d.textBetween(p - f, h - f, void 0, "￼");
    Ky(m, s.find).forEach((v) => {
      if (v.index === void 0)
        return;
      const b = p + v.index + 1, x = b + v[0].length, y = {
        from: t.tr.mapping.map(b),
        to: t.tr.mapping.map(x)
      }, w = s.handler({
        state: t,
        range: y,
        match: v,
        commands: i,
        chain: a,
        can: l
      });
      c.push(w);
    });
  }), c.every((d) => d !== null);
}
function Jy(n) {
  const { editor: e, rules: t } = n;
  let r = null, o = !1, s = !1;
  return t.map((a) => new fe({
    // we register a global drag handler to track the current drag source element
    view(l) {
      const c = (u) => {
        var d;
        r = !((d = l.dom.parentElement) === null || d === void 0) && d.contains(u.target) ? l.dom.parentElement : null;
      };
      return window.addEventListener("dragstart", c), {
        destroy() {
          window.removeEventListener("dragstart", c);
        }
      };
    },
    props: {
      handleDOMEvents: {
        drop: (l) => (s = r === l.dom.parentElement, !1),
        paste: (l, c) => {
          var u;
          const d = (u = c.clipboardData) === null || u === void 0 ? void 0 : u.getData("text/html");
          return o = !!(d != null && d.includes("data-pm-slice")), !1;
        }
      }
    },
    appendTransaction: (l, c, u) => {
      const d = l[0], f = d.getMeta("uiEvent") === "paste" && !o, p = d.getMeta("uiEvent") === "drop" && !s;
      if (!f && !p)
        return;
      const h = c.doc.content.findDiffStart(u.doc.content), m = c.doc.content.findDiffEnd(u.doc.content);
      if (!Uy(h) || !m || h === m.b)
        return;
      const g = u.tr, v = ui({
        state: u,
        transaction: g
      });
      if (!(!Gy({
        editor: e,
        state: v,
        from: Math.max(h - 1, 0),
        to: m.b - 1,
        rule: a
      }) || !g.steps.length))
        return g;
    }
  }));
}
function Zy(n) {
  const e = n.filter((t, r) => n.indexOf(t) !== r);
  return [...new Set(e)];
}
class dr {
  constructor(e, t) {
    this.splittableMarks = [], this.editor = t, this.extensions = dr.resolve(e), this.schema = $y(this.extensions, t), this.extensions.forEach((r) => {
      var o;
      this.editor.extensionStorage[r.name] = r.storage;
      const s = {
        name: r.name,
        options: r.options,
        storage: r.storage,
        editor: this.editor,
        type: Gi(r.name, this.schema)
      };
      r.type === "mark" && (!((o = U(R(r, "keepOnSplit", s))) !== null && o !== void 0) || o) && this.splittableMarks.push(r.name);
      const i = R(r, "onBeforeCreate", s);
      i && this.editor.on("beforeCreate", i);
      const a = R(r, "onCreate", s);
      a && this.editor.on("create", a);
      const l = R(r, "onUpdate", s);
      l && this.editor.on("update", l);
      const c = R(r, "onSelectionUpdate", s);
      c && this.editor.on("selectionUpdate", c);
      const u = R(r, "onTransaction", s);
      u && this.editor.on("transaction", u);
      const d = R(r, "onFocus", s);
      d && this.editor.on("focus", d);
      const f = R(r, "onBlur", s);
      f && this.editor.on("blur", f);
      const p = R(r, "onDestroy", s);
      p && this.editor.on("destroy", p);
    });
  }
  static resolve(e) {
    const t = dr.sort(dr.flatten(e)), r = Zy(t.map((o) => o.name));
    return r.length && console.warn(`[tiptap warn]: Duplicate extension names found: [${r.map((o) => `'${o}'`).join(", ")}]. This can lead to issues.`), t;
  }
  static flatten(e) {
    return e.map((t) => {
      const r = {
        name: t.name,
        options: t.options,
        storage: t.storage
      }, o = R(t, "addExtensions", r);
      return o ? [t, ...this.flatten(o())] : t;
    }).flat(10);
  }
  static sort(e) {
    return e.sort((r, o) => {
      const s = R(r, "priority") || 100, i = R(o, "priority") || 100;
      return s > i ? -1 : s < i ? 1 : 0;
    });
  }
  get commands() {
    return this.extensions.reduce((e, t) => {
      const r = {
        name: t.name,
        options: t.options,
        storage: t.storage,
        editor: this.editor,
        type: Gi(t.name, this.schema)
      }, o = R(t, "addCommands", r);
      return o ? {
        ...e,
        ...o()
      } : e;
    }, {});
  }
  get plugins() {
    const { editor: e } = this, t = dr.sort([...this.extensions].reverse()), r = [], o = [], s = t.map((i) => {
      const a = {
        name: i.name,
        options: i.options,
        storage: i.storage,
        editor: e,
        type: Gi(i.name, this.schema)
      }, l = [], c = R(i, "addKeyboardShortcuts", a);
      let u = {};
      if (i.type === "mark" && i.config.exitable && (u.ArrowRight = () => de.handleExit({ editor: e, mark: i })), c) {
        const m = Object.fromEntries(Object.entries(c()).map(([g, v]) => [g, () => v({ editor: e })]));
        u = { ...u, ...m };
      }
      const d = fy(u);
      l.push(d);
      const f = R(i, "addInputRules", a);
      Cu(i, e.options.enableInputRules) && f && r.push(...f());
      const p = R(i, "addPasteRules", a);
      Cu(i, e.options.enablePasteRules) && p && o.push(...p());
      const h = R(i, "addProseMirrorPlugins", a);
      if (h) {
        const m = h();
        l.push(...m);
      }
      return l;
    }).flat();
    return [
      jy({
        editor: e,
        rules: r
      }),
      ...Jy({
        editor: e,
        rules: o
      }),
      ...s
    ];
  }
  get attributes() {
    return Np(this.extensions);
  }
  get nodeViews() {
    const { editor: e } = this, { nodeExtensions: t } = fi(this.extensions);
    return Object.fromEntries(t.filter((r) => !!R(r, "addNodeView")).map((r) => {
      const o = this.attributes.filter((l) => l.type === r.name), s = {
        name: r.name,
        options: r.options,
        storage: r.storage,
        editor: e,
        type: ve(r.name, this.schema)
      }, i = R(r, "addNodeView", s);
      if (!i)
        return [];
      const a = (l, c, u, d) => {
        const f = Ua(l, o);
        return i()({
          editor: e,
          node: l,
          getPos: u,
          decorations: d,
          HTMLAttributes: f,
          extension: r
        });
      };
      return [r.name, a];
    }));
  }
}
function Yy(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function Zi(n) {
  return Yy(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function pi(n, e) {
  const t = { ...n };
  return Zi(n) && Zi(e) && Object.keys(e).forEach((r) => {
    Zi(e[r]) ? r in n ? t[r] = pi(n[r], e[r]) : Object.assign(t, { [r]: e[r] }) : Object.assign(t, { [r]: e[r] });
  }), t;
}
class ue {
  constructor(e = {}) {
    this.type = "extension", this.name = "extension", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = U(R(this, "addOptions", {
      name: this.name
    }))), this.storage = U(R(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new ue(e);
  }
  configure(e = {}) {
    const t = this.extend();
    return t.options = pi(this.options, e), t.storage = U(R(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
  extend(e = {}) {
    const t = new ue(e);
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = U(R(t, "addOptions", {
      name: t.name
    })), t.storage = U(R(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
}
function Rp(n, e, t) {
  const { from: r, to: o } = e, { blockSeparator: s = `

`, textSerializers: i = {} } = t || {};
  let a = "", l = !0;
  return n.nodesBetween(r, o, (c, u, d, f) => {
    var p;
    const h = i == null ? void 0 : i[c.type.name];
    h ? (c.isBlock && !l && (a += s, l = !0), d && (a += h({
      node: c,
      pos: u,
      parent: d,
      index: f,
      range: e
    }))) : c.isText ? (a += (p = c == null ? void 0 : c.text) === null || p === void 0 ? void 0 : p.slice(Math.max(r, u) - u, o - u), l = !1) : c.isBlock && !l && (a += s, l = !0);
  }), a;
}
function Ip(n) {
  return Object.fromEntries(Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
const Qy = ue.create({
  name: "clipboardTextSerializer",
  addProseMirrorPlugins() {
    return [
      new fe({
        key: new Te("clipboardTextSerializer"),
        props: {
          clipboardTextSerializer: () => {
            const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: o } = e, { ranges: s } = o, i = Math.min(...s.map((u) => u.$from.pos)), a = Math.max(...s.map((u) => u.$to.pos)), l = Ip(t);
            return Rp(r, { from: i, to: a }, {
              textSerializers: l
            });
          }
        }
      })
    ];
  }
}), Xy = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  var t;
  n.isDestroyed || (e.dom.blur(), (t = window == null ? void 0 : window.getSelection()) === null || t === void 0 || t.removeAllRanges());
}), !0), ev = (n = !1) => ({ commands: e }) => e.setContent("", n), tv = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: o } = r;
  return t && o.forEach(({ $from: s, $to: i }) => {
    n.doc.nodesBetween(s.pos, i.pos, (a, l) => {
      if (a.type.isText)
        return;
      const { doc: c, mapping: u } = e, d = c.resolve(u.map(l)), f = c.resolve(u.map(l + a.nodeSize)), p = d.blockRange(f);
      if (!p)
        return;
      const h = Pr(p);
      if (a.type.isTextblock) {
        const { defaultType: m } = d.parent.contentMatchAt(d.index());
        e.setNodeMarkup(p.start, m);
      }
      (h || h === 0) && e.lift(p, h);
    });
  }), !0;
}, nv = (n) => (e) => n(e), rv = () => ({ state: n, dispatch: e }) => Ey(n, e), ov = (n, e) => ({ editor: t, tr: r }) => {
  const { state: o } = t, s = o.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const i = r.mapping.map(e);
  return r.insert(i, s.content), r.setSelection(new j(r.doc.resolve(i - 1))), !0;
}, sv = () => ({ tr: n, dispatch: e }) => {
  const { selection: t } = n, r = t.$anchor.node();
  if (r.content.size > 0)
    return !1;
  const o = n.selection.$anchor;
  for (let s = o.depth; s > 0; s -= 1)
    if (o.node(s).type === r.type) {
      if (e) {
        const a = o.before(s), l = o.after(s);
        n.delete(a, l).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, iv = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const o = ve(n, t.schema), s = e.selection.$anchor;
  for (let i = s.depth; i > 0; i -= 1)
    if (s.node(i).type === o) {
      if (r) {
        const l = s.before(i), c = s.after(i);
        e.delete(l, c).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, av = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: o } = n;
  return t && e.delete(r, o), !0;
}, lv = () => ({ state: n, dispatch: e }) => py(n, e), cv = () => ({ commands: n }) => n.keyboardShortcut("Enter"), uv = () => ({ state: n, dispatch: e }) => Cy(n, e);
function Ms(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((o) => t.strict ? e[o] === n[o] : Pl(e[o]) ? e[o].test(n[o]) : e[o] === n[o]) : !0;
}
function Wa(n, e, t = {}) {
  return n.find((r) => r.type === e && Ms(r.attrs, t));
}
function dv(n, e, t = {}) {
  return !!Wa(n, e, t);
}
function Bl(n, e, t = {}) {
  if (!n || !e)
    return;
  let r = n.parent.childAfter(n.parentOffset);
  if (n.parentOffset === r.offset && r.offset !== 0 && (r = n.parent.childBefore(n.parentOffset)), !r.node)
    return;
  const o = Wa([...r.node.marks], e, t);
  if (!o)
    return;
  let s = r.index, i = n.start() + r.offset, a = s + 1, l = i + r.node.nodeSize;
  for (Wa([...r.node.marks], e, t); s > 0 && o.isInSet(n.parent.child(s - 1).marks); )
    s -= 1, i -= n.parent.child(s).nodeSize;
  for (; a < n.parent.childCount && dv([...n.parent.child(a).marks], e, t); )
    l += n.parent.child(a).nodeSize, a += 1;
  return {
    from: i,
    to: l
  };
}
function pn(n, e) {
  if (typeof n == "string") {
    if (!e.marks[n])
      throw Error(`There is no mark type named '${n}'. Maybe you forgot to add the extension?`);
    return e.marks[n];
  }
  return n;
}
const fv = (n, e = {}) => ({ tr: t, state: r, dispatch: o }) => {
  const s = pn(n, r.schema), { doc: i, selection: a } = t, { $from: l, from: c, to: u } = a;
  if (o) {
    const d = Bl(l, s, e);
    if (d && d.from <= c && d.to >= u) {
      const f = j.create(i, d.from, d.to);
      t.setSelection(f);
    }
  }
  return !0;
}, pv = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1)
    if (t[r](e))
      return !0;
  return !1;
};
function Fl(n) {
  return n instanceof j;
}
function Bt(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function Pp(n, e = null) {
  if (!e)
    return null;
  const t = W.atStart(n), r = W.atEnd(n);
  if (e === "start" || e === !0)
    return t;
  if (e === "end")
    return r;
  const o = t.from, s = r.to;
  return e === "all" ? j.create(n, Bt(0, o, s), Bt(n.content.size, o, s)) : j.create(n, Bt(e, o, s), Bt(e, o, s));
}
function ql() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
const hv = (n = null, e = {}) => ({ editor: t, view: r, tr: o, dispatch: s }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const i = () => {
    ql() && r.dom.focus(), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  if (r.hasFocus() && n === null || n === !1)
    return !0;
  if (s && n === null && !Fl(t.state.selection))
    return i(), !0;
  const a = Pp(o.doc, n) || t.state.selection, l = t.state.selection.eq(a);
  return s && (l || o.setSelection(a), l && o.storedMarks && o.setStoredMarks(o.storedMarks), i()), !0;
}, mv = (n, e) => (t) => n.every((r, o) => e(r, { ...t, index: o })), gv = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt({ from: t.selection.from, to: t.selection.to }, n, e);
function Eu(n) {
  const e = `<body>${n}</body>`;
  return new window.DOMParser().parseFromString(e, "text/html").body;
}
function Os(n, e, t) {
  if (t = {
    slice: !0,
    parseOptions: {},
    ...t
  }, typeof n == "object" && n !== null)
    try {
      return Array.isArray(n) && n.length > 0 ? M.fromArray(n.map((r) => e.nodeFromJSON(r))) : e.nodeFromJSON(n);
    } catch (r) {
      return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", r), Os("", e, t);
    }
  if (typeof n == "string") {
    const r = Fn.fromSchema(e);
    return t.slice ? r.parseSlice(Eu(n), t.parseOptions).content : r.parse(Eu(n), t.parseOptions);
  }
  return Os("", e, t);
}
function yv(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e)
    return;
  const o = n.steps[r];
  if (!(o instanceof xe || o instanceof ge))
    return;
  const s = n.mapping.maps[r];
  let i = 0;
  s.forEach((a, l, c, u) => {
    i === 0 && (i = u);
  }), n.setSelection(W.near(n.doc.resolve(i), t));
}
const vv = (n) => n.toString().startsWith("<"), bv = (n, e, t) => ({ tr: r, dispatch: o, editor: s }) => {
  if (o) {
    t = {
      parseOptions: {},
      updateSelection: !0,
      ...t
    };
    const i = Os(e, s.schema, {
      parseOptions: {
        preserveWhitespace: "full",
        ...t.parseOptions
      }
    });
    if (i.toString() === "<>")
      return !0;
    let { from: a, to: l } = typeof n == "number" ? { from: n, to: n } : { from: n.from, to: n.to }, c = !0, u = !0;
    if ((vv(i) ? i : [i]).forEach((f) => {
      f.check(), c = c ? f.isText && f.marks.length === 0 : !1, u = u ? f.isBlock : !1;
    }), a === l && u) {
      const { parent: f } = r.doc.resolve(a);
      f.isTextblock && !f.type.spec.code && !f.childCount && (a -= 1, l += 1);
    }
    c ? Array.isArray(e) ? r.insertText(e.map((f) => f.text || "").join(""), a, l) : typeof e == "object" && e && e.text ? r.insertText(e.text, a, l) : r.insertText(e, a, l) : r.replaceWith(a, l, i), t.updateSelection && yv(r, r.steps.length - 1, -1);
  }
  return !0;
}, kv = () => ({ state: n, dispatch: e }) => ky(n, e), xv = () => ({ state: n, dispatch: e }) => xy(n, e), wv = () => ({ state: n, dispatch: e }) => my(n, e), Sv = () => ({ state: n, dispatch: e }) => vy(n, e), Cv = () => ({ tr: n, state: e, dispatch: t }) => {
  try {
    const r = oi(e.doc, e.selection.$from.pos, -1);
    return r == null ? !1 : (n.join(r, 2), t && t(n), !0);
  } catch {
    return !1;
  }
}, Ev = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = oi(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
};
function zl() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function Av(n) {
  const e = n.split(/-(?!$)/);
  let t = e[e.length - 1];
  t === "Space" && (t = " ");
  let r, o, s, i;
  for (let a = 0; a < e.length - 1; a += 1) {
    const l = e[a];
    if (/^(cmd|meta|m)$/i.test(l))
      i = !0;
    else if (/^a(lt)?$/i.test(l))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(l))
      o = !0;
    else if (/^s(hift)?$/i.test(l))
      s = !0;
    else if (/^mod$/i.test(l))
      ql() || zl() ? i = !0 : o = !0;
    else
      throw new Error(`Unrecognized modifier name: ${l}`);
  }
  return r && (t = `Alt-${t}`), o && (t = `Ctrl-${t}`), i && (t = `Meta-${t}`), s && (t = `Shift-${t}`), t;
}
const Tv = (n) => ({ editor: e, view: t, tr: r, dispatch: o }) => {
  const s = Av(n).split(/-(?!$)/), i = s.find((c) => !["Alt", "Ctrl", "Meta", "Shift"].includes(c)), a = new KeyboardEvent("keydown", {
    key: i === "Space" ? " " : i,
    altKey: s.includes("Alt"),
    ctrlKey: s.includes("Ctrl"),
    metaKey: s.includes("Meta"),
    shiftKey: s.includes("Shift"),
    bubbles: !0,
    cancelable: !0
  }), l = e.captureTransaction(() => {
    t.someProp("handleKeyDown", (c) => c(t, a));
  });
  return l == null || l.steps.forEach((c) => {
    const u = c.map(r.mapping);
    u && o && r.maybeStep(u);
  }), !0;
};
function vo(n, e, t = {}) {
  const { from: r, to: o, empty: s } = n.selection, i = e ? ve(e, n.schema) : null, a = [];
  n.doc.nodesBetween(r, o, (d, f) => {
    if (d.isText)
      return;
    const p = Math.max(r, f), h = Math.min(o, f + d.nodeSize);
    a.push({
      node: d,
      from: p,
      to: h
    });
  });
  const l = o - r, c = a.filter((d) => i ? i.name === d.node.type.name : !0).filter((d) => Ms(d.node.attrs, t, { strict: !1 }));
  return s ? !!c.length : c.reduce((d, f) => d + f.to - f.from, 0) >= l;
}
const Mv = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const o = ve(n, t.schema);
  return vo(t, o, e) ? wy(t, r) : !1;
}, Ov = () => ({ state: n, dispatch: e }) => Ay(n, e), Dv = (n) => ({ state: e, dispatch: t }) => {
  const r = ve(n, e.schema);
  return Ry(r)(e, t);
}, _v = () => ({ state: n, dispatch: e }) => Sy(n, e);
function hi(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function Au(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, o) => (t.includes(o) || (r[o] = n[o]), r), {});
}
const Nv = (n, e) => ({ tr: t, state: r, dispatch: o }) => {
  let s = null, i = null;
  const a = hi(typeof n == "string" ? n : n.name, r.schema);
  return a ? (a === "node" && (s = ve(n, r.schema)), a === "mark" && (i = pn(n, r.schema)), o && t.selection.ranges.forEach((l) => {
    r.doc.nodesBetween(l.$from.pos, l.$to.pos, (c, u) => {
      s && s === c.type && t.setNodeMarkup(u, void 0, Au(c.attrs, e)), i && c.marks.length && c.marks.forEach((d) => {
        i === d.type && t.addMark(u, u + c.nodeSize, i.create(Au(d.attrs, e)));
      });
    });
  }), !0) : !1;
}, Lv = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), Rv = () => ({ tr: n, commands: e }) => e.setTextSelection({
  from: 0,
  to: n.doc.content.size
}), Iv = () => ({ state: n, dispatch: e }) => gy(n, e), Pv = () => ({ state: n, dispatch: e }) => by(n, e), Bv = () => ({ state: n, dispatch: e }) => Ty(n, e), Fv = () => ({ state: n, dispatch: e }) => Dy(n, e), qv = () => ({ state: n, dispatch: e }) => Oy(n, e);
function Bp(n, e, t = {}) {
  return Os(n, e, { slice: !1, parseOptions: t });
}
const zv = (n, e = !1, t = {}) => ({ tr: r, editor: o, dispatch: s }) => {
  const { doc: i } = r, a = Bp(n, o.schema, t);
  return s && r.replaceWith(0, i.content.size, a).setMeta("preventUpdate", !e), !0;
};
function No(n, e) {
  const t = pn(e, n.schema), { from: r, to: o, empty: s } = n.selection, i = [];
  s ? (n.storedMarks && i.push(...n.storedMarks), i.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, o, (l) => {
    i.push(...l.marks);
  });
  const a = i.find((l) => l.type.name === t.name);
  return a ? { ...a.attrs } : {};
}
function $v(n, e) {
  const t = new Uf(n);
  return e.forEach((r) => {
    r.steps.forEach((o) => {
      t.step(o);
    });
  }), t;
}
function Hv(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
function Vv(n, e, t) {
  const r = [];
  return n.nodesBetween(e.from, e.to, (o, s) => {
    t(o) && r.push({
      node: o,
      pos: s
    });
  }), r;
}
function jv(n, e) {
  for (let t = n.depth; t > 0; t -= 1) {
    const r = n.node(t);
    if (e(r))
      return {
        pos: t > 0 ? n.before(t) : 0,
        start: n.start(t),
        depth: t,
        node: r
      };
  }
}
function $l(n) {
  return (e) => jv(e.$from, n);
}
function Hl(n, e) {
  const t = gt.fromSchema(e).serializeFragment(n), o = document.implementation.createHTMLDocument().createElement("div");
  return o.appendChild(t), o.innerHTML;
}
function Uv(n, e) {
  const t = {
    from: 0,
    to: n.content.size
  };
  return Rp(n, t, e);
}
function Wv(n, e) {
  const t = ve(e, n.schema), { from: r, to: o } = n.selection, s = [];
  n.doc.nodesBetween(r, o, (a) => {
    s.push(a);
  });
  const i = s.reverse().find((a) => a.type.name === t.name);
  return i ? { ...i.attrs } : {};
}
function Fp(n, e) {
  const t = hi(typeof e == "string" ? e : e.name, n.schema);
  return t === "node" ? Wv(n, e) : t === "mark" ? No(n, e) : {};
}
function Kv(n, e = JSON.stringify) {
  const t = {};
  return n.filter((r) => {
    const o = e(r);
    return Object.prototype.hasOwnProperty.call(t, o) ? !1 : t[o] = !0;
  });
}
function Gv(n) {
  const e = Kv(n);
  return e.length === 1 ? e : e.filter((t, r) => !e.filter((s, i) => i !== r).some((s) => t.oldRange.from >= s.oldRange.from && t.oldRange.to <= s.oldRange.to && t.newRange.from >= s.newRange.from && t.newRange.to <= s.newRange.to));
}
function Jv(n) {
  const { mapping: e, steps: t } = n, r = [];
  return e.maps.forEach((o, s) => {
    const i = [];
    if (o.ranges.length)
      o.forEach((a, l) => {
        i.push({ from: a, to: l });
      });
    else {
      const { from: a, to: l } = t[s];
      if (a === void 0 || l === void 0)
        return;
      i.push({ from: a, to: l });
    }
    i.forEach(({ from: a, to: l }) => {
      const c = e.slice(s).map(a, -1), u = e.slice(s).map(l), d = e.invert().map(c, -1), f = e.invert().map(u);
      r.push({
        oldRange: {
          from: d,
          to: f
        },
        newRange: {
          from: c,
          to: u
        }
      });
    });
  }), Gv(r);
}
function Vl(n, e, t) {
  const r = [];
  return n === e ? t.resolve(n).marks().forEach((o) => {
    const s = t.resolve(n - 1), i = Bl(s, o.type);
    i && r.push({
      mark: o,
      ...i
    });
  }) : t.nodesBetween(n, e, (o, s) => {
    r.push(...o.marks.map((i) => ({
      from: s,
      to: s + o.nodeSize,
      mark: i
    })));
  }), r;
}
function fs(n, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([r]) => {
    const o = n.find((s) => s.type === e && s.name === r);
    return o ? o.attribute.keepOnSplit : !1;
  }));
}
function Ka(n, e, t = {}) {
  const { empty: r, ranges: o } = n.selection, s = e ? pn(e, n.schema) : null;
  if (r)
    return !!(n.storedMarks || n.selection.$from.marks()).filter((d) => s ? s.name === d.type.name : !0).find((d) => Ms(d.attrs, t, { strict: !1 }));
  let i = 0;
  const a = [];
  if (o.forEach(({ $from: d, $to: f }) => {
    const p = d.pos, h = f.pos;
    n.doc.nodesBetween(p, h, (m, g) => {
      if (!m.isText && !m.marks.length)
        return;
      const v = Math.max(p, g), b = Math.min(h, g + m.nodeSize), x = b - v;
      i += x, a.push(...m.marks.map((y) => ({
        mark: y,
        from: v,
        to: b
      })));
    });
  }), i === 0)
    return !1;
  const l = a.filter((d) => s ? s.name === d.mark.type.name : !0).filter((d) => Ms(d.mark.attrs, t, { strict: !1 })).reduce((d, f) => d + f.to - f.from, 0), c = a.filter((d) => s ? d.mark.type !== s && d.mark.type.excludes(s) : !0).reduce((d, f) => d + f.to - f.from, 0);
  return (l > 0 ? l + c : l) >= i;
}
function Zv(n, e, t = {}) {
  if (!e)
    return vo(n, null, t) || Ka(n, null, t);
  const r = hi(e, n.schema);
  return r === "node" ? vo(n, e, t) : r === "mark" ? Ka(n, e, t) : !1;
}
function Tu(n, e) {
  const { nodeExtensions: t } = fi(e), r = t.find((i) => i.name === n);
  if (!r)
    return !1;
  const o = {
    name: r.name,
    options: r.options,
    storage: r.storage
  }, s = U(R(r, "group", o));
  return typeof s != "string" ? !1 : s.split(" ").includes("list");
}
function Yv(n) {
  var e;
  const t = (e = n.type.createAndFill()) === null || e === void 0 ? void 0 : e.toJSON(), r = n.toJSON();
  return JSON.stringify(t) === JSON.stringify(r);
}
function Qv(n) {
  return n instanceof $;
}
function qp(n, e, t) {
  const o = n.state.doc.content.size, s = Bt(e, 0, o), i = Bt(t, 0, o), a = n.coordsAtPos(s), l = n.coordsAtPos(i, -1), c = Math.min(a.top, l.top), u = Math.max(a.bottom, l.bottom), d = Math.min(a.left, l.left), f = Math.max(a.right, l.right), p = f - d, h = u - c, v = {
    top: c,
    bottom: u,
    left: d,
    right: f,
    width: p,
    height: h,
    x: d,
    y: c
  };
  return {
    ...v,
    toJSON: () => v
  };
}
function Xv(n, e, t) {
  var r;
  const { selection: o } = e;
  let s = null;
  if (Fl(o) && (s = o.$cursor), s) {
    const a = (r = n.storedMarks) !== null && r !== void 0 ? r : s.marks();
    return !!t.isInSet(a) || !a.some((l) => l.type.excludes(t));
  }
  const { ranges: i } = o;
  return i.some(({ $from: a, $to: l }) => {
    let c = a.depth === 0 ? n.doc.inlineContent && n.doc.type.allowsMarkType(t) : !1;
    return n.doc.nodesBetween(a.pos, l.pos, (u, d, f) => {
      if (c)
        return !1;
      if (u.isInline) {
        const p = !f || f.type.allowsMarkType(t), h = !!t.isInSet(u.marks) || !u.marks.some((m) => m.type.excludes(t));
        c = p && h;
      }
      return !c;
    }), c;
  });
}
const eb = (n, e = {}) => ({ tr: t, state: r, dispatch: o }) => {
  const { selection: s } = t, { empty: i, ranges: a } = s, l = pn(n, r.schema);
  if (o)
    if (i) {
      const c = No(r, l);
      t.addStoredMark(l.create({
        ...c,
        ...e
      }));
    } else
      a.forEach((c) => {
        const u = c.$from.pos, d = c.$to.pos;
        r.doc.nodesBetween(u, d, (f, p) => {
          const h = Math.max(p, u), m = Math.min(p + f.nodeSize, d);
          f.marks.find((v) => v.type === l) ? f.marks.forEach((v) => {
            l === v.type && t.addMark(h, m, l.create({
              ...v.attrs,
              ...e
            }));
          }) : t.addMark(h, m, l.create(e));
        });
      });
  return Xv(r, t, l);
}, tb = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), nb = (n, e = {}) => ({ state: t, dispatch: r, chain: o }) => {
  const s = ve(n, t.schema);
  return s.isTextblock ? o().command(({ commands: i }) => xu(s, e)(t) ? !0 : i.clearNodes()).command(({ state: i }) => xu(s, e)(i, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, rb = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, o = Bt(n, 0, r.content.size), s = $.create(r, o);
    e.setSelection(s);
  }
  return !0;
}, ob = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: o, to: s } = typeof n == "number" ? { from: n, to: n } : n, i = j.atStart(r).from, a = j.atEnd(r).to, l = Bt(o, i, a), c = Bt(s, i, a), u = j.create(r, l, c);
    e.setSelection(u);
  }
  return !0;
}, sb = (n) => ({ state: e, dispatch: t }) => {
  const r = ve(n, e.schema);
  return By(r)(e, t);
};
function Mu(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((o) => e == null ? void 0 : e.includes(o.type.name));
    n.tr.ensureMarks(r);
  }
}
const ib = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: o }) => {
  const { selection: s, doc: i } = e, { $from: a, $to: l } = s, c = o.extensionManager.attributes, u = fs(c, a.node().type.name, a.node().attrs);
  if (s instanceof $ && s.node.isBlock)
    return !a.parentOffset || !gr(i, a.pos) ? !1 : (r && (n && Mu(t, o.extensionManager.splittableMarks), e.split(a.pos).scrollIntoView()), !0);
  if (!a.parent.isBlock)
    return !1;
  if (r) {
    const d = l.parentOffset === l.parent.content.size;
    s instanceof j && e.deleteSelection();
    const f = a.depth === 0 ? void 0 : Hv(a.node(-1).contentMatchAt(a.indexAfter(-1)));
    let p = d && f ? [
      {
        type: f,
        attrs: u
      }
    ] : void 0, h = gr(e.doc, e.mapping.map(a.pos), 1, p);
    if (!p && !h && gr(e.doc, e.mapping.map(a.pos), 1, f ? [{ type: f }] : void 0) && (h = !0, p = f ? [
      {
        type: f,
        attrs: u
      }
    ] : void 0), h && (e.split(e.mapping.map(a.pos), 1, p), f && !d && !a.parentOffset && a.parent.type !== f)) {
      const m = e.mapping.map(a.before()), g = e.doc.resolve(m);
      a.node(-1).canReplaceWith(g.index(), g.index() + 1, f) && e.setNodeMarkup(e.mapping.map(a.before()), f);
    }
    n && Mu(t, o.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return !0;
}, ab = (n) => ({ tr: e, state: t, dispatch: r, editor: o }) => {
  var s;
  const i = ve(n, t.schema), { $from: a, $to: l } = t.selection, c = t.selection.node;
  if (c && c.isBlock || a.depth < 2 || !a.sameParent(l))
    return !1;
  const u = a.node(-1);
  if (u.type !== i)
    return !1;
  const d = o.extensionManager.attributes;
  if (a.parent.content.size === 0 && a.node(-1).childCount === a.indexAfter(-1)) {
    if (a.depth === 2 || a.node(-3).type !== i || a.index(-2) !== a.node(-2).childCount - 1)
      return !1;
    if (r) {
      let g = M.empty;
      const v = a.index(-1) ? 1 : a.index(-2) ? 2 : 3;
      for (let S = a.depth - v; S >= a.depth - 3; S -= 1)
        g = M.from(a.node(S).copy(g));
      const b = a.indexAfter(-1) < a.node(-2).childCount ? 1 : a.indexAfter(-2) < a.node(-3).childCount ? 2 : 3, x = fs(d, a.node().type.name, a.node().attrs), y = ((s = i.contentMatch.defaultType) === null || s === void 0 ? void 0 : s.createAndFill(x)) || void 0;
      g = g.append(M.from(i.createAndFill(null, y) || void 0));
      const w = a.before(a.depth - (v - 1));
      e.replace(w, a.after(-b), new N(g, 4 - v, 0));
      let k = -1;
      e.doc.nodesBetween(w, e.doc.content.size, (S, E) => {
        if (k > -1)
          return !1;
        S.isTextblock && S.content.size === 0 && (k = E + 1);
      }), k > -1 && e.setSelection(j.near(e.doc.resolve(k))), e.scrollIntoView();
    }
    return !0;
  }
  const f = l.pos === a.end() ? u.contentMatchAt(0).defaultType : null, p = fs(d, u.type.name, u.attrs), h = fs(d, a.node().type.name, a.node().attrs);
  e.delete(a.pos, l.pos);
  const m = f ? [
    { type: i, attrs: p },
    { type: f, attrs: h }
  ] : [{ type: i, attrs: p }];
  if (!gr(e.doc, a.pos, 2))
    return !1;
  if (r) {
    const { selection: g, storedMarks: v } = t, { splittableMarks: b } = o.extensionManager, x = v || g.$to.parentOffset && g.$from.marks();
    if (e.split(a.pos, 2, m).scrollIntoView(), !x || !r)
      return !0;
    const y = x.filter((w) => b.includes(w.type.name));
    e.ensureMarks(y);
  }
  return !0;
}, Yi = (n, e) => {
  const t = $l((i) => i.type === e)(n.selection);
  if (!t)
    return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0)
    return !0;
  const o = n.doc.nodeAt(r);
  return t.node.type === (o == null ? void 0 : o.type) && dn(n.doc, t.pos) && n.join(t.pos), !0;
}, Qi = (n, e) => {
  const t = $l((i) => i.type === e)(n.selection);
  if (!t)
    return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0)
    return !0;
  const o = n.doc.nodeAt(r);
  return t.node.type === (o == null ? void 0 : o.type) && dn(n.doc, r) && n.join(r), !0;
}, lb = (n, e, t, r = {}) => ({ editor: o, tr: s, state: i, dispatch: a, chain: l, commands: c, can: u }) => {
  const { extensions: d, splittableMarks: f } = o.extensionManager, p = ve(n, i.schema), h = ve(e, i.schema), { selection: m, storedMarks: g } = i, { $from: v, $to: b } = m, x = v.blockRange(b), y = g || m.$to.parentOffset && m.$from.marks();
  if (!x)
    return !1;
  const w = $l((k) => Tu(k.type.name, d))(m);
  if (x.depth >= 1 && w && x.depth - w.depth <= 1) {
    if (w.node.type === p)
      return c.liftListItem(h);
    if (Tu(w.node.type.name, d) && p.validContent(w.node.content) && a)
      return l().command(() => (s.setNodeMarkup(w.pos, p), !0)).command(() => Yi(s, p)).command(() => Qi(s, p)).run();
  }
  return !t || !y || !a ? l().command(() => u().wrapInList(p, r) ? !0 : c.clearNodes()).wrapInList(p, r).command(() => Yi(s, p)).command(() => Qi(s, p)).run() : l().command(() => {
    const k = u().wrapInList(p, r), S = y.filter((E) => f.includes(E.type.name));
    return s.ensureMarks(S), k ? !0 : c.clearNodes();
  }).wrapInList(p, r).command(() => Yi(s, p)).command(() => Qi(s, p)).run();
}, cb = (n, e = {}, t = {}) => ({ state: r, commands: o }) => {
  const { extendEmptyMarkRange: s = !1 } = t, i = pn(n, r.schema);
  return Ka(r, i, e) ? o.unsetMark(i, { extendEmptyMarkRange: s }) : o.setMark(i, e);
}, ub = (n, e, t = {}) => ({ state: r, commands: o }) => {
  const s = ve(n, r.schema), i = ve(e, r.schema);
  return vo(r, s, t) ? o.setNode(i) : o.setNode(s, t);
}, db = (n, e = {}) => ({ state: t, commands: r }) => {
  const o = ve(n, t.schema);
  return vo(t, o, e) ? r.lift(o) : r.wrapIn(o, e);
}, fb = () => ({ state: n, dispatch: e }) => {
  const t = n.plugins;
  for (let r = 0; r < t.length; r += 1) {
    const o = t[r];
    let s;
    if (o.spec.isInputRules && (s = o.getState(n))) {
      if (e) {
        const i = n.tr, a = s.transform;
        for (let l = a.steps.length - 1; l >= 0; l -= 1)
          i.step(a.steps[l].invert(a.docs[l]));
        if (s.text) {
          const l = i.doc.resolve(s.from).marks();
          i.replaceWith(s.from, s.to, n.schema.text(s.text, l));
        } else
          i.delete(s.from, s.to);
      }
      return !0;
    }
  }
  return !1;
}, pb = () => ({ tr: n, dispatch: e }) => {
  const { selection: t } = n, { empty: r, ranges: o } = t;
  return r || e && o.forEach((s) => {
    n.removeMark(s.$from.pos, s.$to.pos);
  }), !0;
}, hb = (n, e = {}) => ({ tr: t, state: r, dispatch: o }) => {
  var s;
  const { extendEmptyMarkRange: i = !1 } = e, { selection: a } = t, l = pn(n, r.schema), { $from: c, empty: u, ranges: d } = a;
  if (!o)
    return !0;
  if (u && i) {
    let { from: f, to: p } = a;
    const h = (s = c.marks().find((g) => g.type === l)) === null || s === void 0 ? void 0 : s.attrs, m = Bl(c, l, h);
    m && (f = m.from, p = m.to), t.removeMark(f, p, l);
  } else
    d.forEach((f) => {
      t.removeMark(f.$from.pos, f.$to.pos, l);
    });
  return t.removeStoredMark(l), !0;
}, mb = (n, e = {}) => ({ tr: t, state: r, dispatch: o }) => {
  let s = null, i = null;
  const a = hi(typeof n == "string" ? n : n.name, r.schema);
  return a ? (a === "node" && (s = ve(n, r.schema)), a === "mark" && (i = pn(n, r.schema)), o && t.selection.ranges.forEach((l) => {
    const c = l.$from.pos, u = l.$to.pos;
    r.doc.nodesBetween(c, u, (d, f) => {
      s && s === d.type && t.setNodeMarkup(f, void 0, {
        ...d.attrs,
        ...e
      }), i && d.marks.length && d.marks.forEach((p) => {
        if (i === p.type) {
          const h = Math.max(f, c), m = Math.min(f + d.nodeSize, u);
          t.addMark(h, m, i.create({
            ...p.attrs,
            ...e
          }));
        }
      });
    });
  }), !0) : !1;
}, gb = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const o = ve(n, t.schema);
  return _y(o, e)(t, r);
}, yb = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const o = ve(n, t.schema);
  return Ny(o, e)(t, r);
};
var vb = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  blur: Xy,
  clearContent: ev,
  clearNodes: tv,
  command: nv,
  createParagraphNear: rv,
  cut: ov,
  deleteCurrentNode: sv,
  deleteNode: iv,
  deleteRange: av,
  deleteSelection: lv,
  enter: cv,
  exitCode: uv,
  extendMarkRange: fv,
  first: pv,
  focus: hv,
  forEach: mv,
  insertContent: gv,
  insertContentAt: bv,
  joinUp: kv,
  joinDown: xv,
  joinBackward: wv,
  joinForward: Sv,
  joinItemBackward: Cv,
  joinItemForward: Ev,
  keyboardShortcut: Tv,
  lift: Mv,
  liftEmptyBlock: Ov,
  liftListItem: Dv,
  newlineInCode: _v,
  resetAttributes: Nv,
  scrollIntoView: Lv,
  selectAll: Rv,
  selectNodeBackward: Iv,
  selectNodeForward: Pv,
  selectParentNode: Bv,
  selectTextblockEnd: Fv,
  selectTextblockStart: qv,
  setContent: zv,
  setMark: eb,
  setMeta: tb,
  setNode: nb,
  setNodeSelection: rb,
  setTextSelection: ob,
  sinkListItem: sb,
  splitBlock: ib,
  splitListItem: ab,
  toggleList: lb,
  toggleMark: cb,
  toggleNode: ub,
  toggleWrap: db,
  undoInputRule: fb,
  unsetAllMarks: pb,
  unsetMark: hb,
  updateAttributes: mb,
  wrapIn: gb,
  wrapInList: yb
});
const bb = ue.create({
  name: "commands",
  addCommands() {
    return {
      ...vb
    };
  }
}), kb = ue.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [
      new fe({
        key: new Te("editable"),
        props: {
          editable: () => this.editor.options.editable
        }
      })
    ];
  }
}), xb = ue.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [
      new fe({
        key: new Te("focusEvents"),
        props: {
          handleDOMEvents: {
            focus: (e, t) => {
              n.isFocused = !0;
              const r = n.state.tr.setMeta("focus", { event: t }).setMeta("addToHistory", !1);
              return e.dispatch(r), !1;
            },
            blur: (e, t) => {
              n.isFocused = !1;
              const r = n.state.tr.setMeta("blur", { event: t }).setMeta("addToHistory", !1);
              return e.dispatch(r), !1;
            }
          }
        }
      })
    ];
  }
}), wb = ue.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: i }) => [
      () => i.undoInputRule(),
      // maybe convert first text block node to default node
      () => i.command(({ tr: a }) => {
        const { selection: l, doc: c } = a, { empty: u, $anchor: d } = l, { pos: f, parent: p } = d, h = d.parent.isTextblock ? a.doc.resolve(f - 1) : d, m = h.parent.type.spec.isolating, g = d.pos - d.parentOffset, v = m && h.parent.childCount === 1 ? g === d.pos : W.atStart(c).from === f;
        return !u || !v || !p.type.isTextblock || p.textContent.length ? !1 : i.clearNodes();
      }),
      () => i.deleteSelection(),
      () => i.joinBackward(),
      () => i.selectNodeBackward()
    ]), e = () => this.editor.commands.first(({ commands: i }) => [
      () => i.deleteSelection(),
      () => i.deleteCurrentNode(),
      () => i.joinForward(),
      () => i.selectNodeForward()
    ]), r = {
      Enter: () => this.editor.commands.first(({ commands: i }) => [
        () => i.newlineInCode(),
        () => i.createParagraphNear(),
        () => i.liftEmptyBlock(),
        () => i.splitBlock()
      ]),
      "Mod-Enter": () => this.editor.commands.exitCode(),
      Backspace: n,
      "Mod-Backspace": n,
      "Shift-Backspace": n,
      Delete: e,
      "Mod-Delete": e,
      "Mod-a": () => this.editor.commands.selectAll()
    }, o = {
      ...r
    }, s = {
      ...r,
      "Ctrl-h": n,
      "Alt-Backspace": n,
      "Ctrl-d": e,
      "Ctrl-Alt-Backspace": e,
      "Alt-Delete": e,
      "Alt-d": e,
      "Ctrl-a": () => this.editor.commands.selectTextblockStart(),
      "Ctrl-e": () => this.editor.commands.selectTextblockEnd()
    };
    return ql() || zl() ? s : o;
  },
  addProseMirrorPlugins() {
    return [
      // With this plugin we check if the whole document was selected and deleted.
      // In this case we will additionally call `clearNodes()` to convert e.g. a heading
      // to a paragraph if necessary.
      // This is an alternative to ProseMirror's `AllSelection`, which doesn’t work well
      // with many other commands.
      new fe({
        key: new Te("clearDocument"),
        appendTransaction: (n, e, t) => {
          if (!(n.some((h) => h.docChanged) && !e.doc.eq(t.doc)))
            return;
          const { empty: o, from: s, to: i } = e.selection, a = W.atStart(e.doc).from, l = W.atEnd(e.doc).to;
          if (o || !(s === a && i === l) || !(t.doc.textBetween(0, t.doc.content.size, " ", " ").length === 0))
            return;
          const d = t.tr, f = ui({
            state: t,
            transaction: d
          }), { commands: p } = new di({
            editor: this.editor,
            state: f
          });
          if (p.clearNodes(), !!d.steps.length)
            return d;
        }
      })
    ];
  }
}), Sb = ue.create({
  name: "tabindex",
  addProseMirrorPlugins() {
    return [
      new fe({
        key: new Te("tabindex"),
        props: {
          attributes: this.editor.isEditable ? { tabindex: "0" } : {}
        }
      })
    ];
  }
});
var zp = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ClipboardTextSerializer: Qy,
  Commands: bb,
  Editable: kb,
  FocusEvents: xb,
  Keymap: wb,
  Tabindex: Sb
});
const Cb = `.ProseMirror {
  position: relative;
}

.ProseMirror {
  word-wrap: break-word;
  white-space: pre-wrap;
  white-space: break-spaces;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0; /* the above doesn't seem to work in Edge */
}

.ProseMirror [contenteditable="false"] {
  white-space: normal;
}

.ProseMirror [contenteditable="false"] [contenteditable="true"] {
  white-space: pre-wrap;
}

.ProseMirror pre {
  white-space: pre-wrap;
}

img.ProseMirror-separator {
  display: inline !important;
  border: none !important;
  margin: 0 !important;
  width: 1px !important;
  height: 1px !important;
}

.ProseMirror-gapcursor {
  display: none;
  pointer-events: none;
  position: absolute;
  margin: 0;
}

.ProseMirror-gapcursor:after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  width: 20px;
  border-top: 1px solid black;
  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
}

@keyframes ProseMirror-cursor-blink {
  to {
    visibility: hidden;
  }
}

.ProseMirror-hideselection *::selection {
  background: transparent;
}

.ProseMirror-hideselection *::-moz-selection {
  background: transparent;
}

.ProseMirror-hideselection * {
  caret-color: transparent;
}

.ProseMirror-focused .ProseMirror-gapcursor {
  display: block;
}

.tippy-box[data-animation=fade][data-state=hidden] {
  opacity: 0
}`;
function Eb(n, e, t) {
  const r = document.querySelector(`style[data-tiptap-style${t ? `-${t}` : ""}]`);
  if (r !== null)
    return r;
  const o = document.createElement("style");
  return e && o.setAttribute("nonce", e), o.setAttribute(`data-tiptap-style${t ? `-${t}` : ""}`, ""), o.innerHTML = n, document.getElementsByTagName("head")[0].appendChild(o), o;
}
let Ab = class extends Fy {
  constructor(e = {}) {
    super(), this.isFocused = !1, this.extensionStorage = {}, this.options = {
      element: document.createElement("div"),
      content: "",
      injectCSS: !0,
      injectNonce: void 0,
      extensions: [],
      autofocus: !1,
      editable: !0,
      editorProps: {},
      parseOptions: {},
      enableInputRules: !0,
      enablePasteRules: !0,
      enableCoreExtensions: !0,
      onBeforeCreate: () => null,
      onCreate: () => null,
      onUpdate: () => null,
      onSelectionUpdate: () => null,
      onTransaction: () => null,
      onFocus: () => null,
      onBlur: () => null,
      onDestroy: () => null
    }, this.isCapturingTransaction = !1, this.capturedTransaction = null, this.setOptions(e), this.createExtensionManager(), this.createCommandManager(), this.createSchema(), this.on("beforeCreate", this.options.onBeforeCreate), this.emit("beforeCreate", { editor: this }), this.createView(), this.injectCSS(), this.on("create", this.options.onCreate), this.on("update", this.options.onUpdate), this.on("selectionUpdate", this.options.onSelectionUpdate), this.on("transaction", this.options.onTransaction), this.on("focus", this.options.onFocus), this.on("blur", this.options.onBlur), this.on("destroy", this.options.onDestroy), window.setTimeout(() => {
      this.isDestroyed || (this.commands.focus(this.options.autofocus), this.emit("create", { editor: this }));
    }, 0);
  }
  /**
   * Returns the editor storage.
   */
  get storage() {
    return this.extensionStorage;
  }
  /**
   * An object of all registered commands.
   */
  get commands() {
    return this.commandManager.commands;
  }
  /**
   * Create a command chain to call multiple commands at once.
   */
  chain() {
    return this.commandManager.chain();
  }
  /**
   * Check if a command or a command chain can be executed. Without executing it.
   */
  can() {
    return this.commandManager.can();
  }
  /**
   * Inject CSS styles.
   */
  injectCSS() {
    this.options.injectCSS && document && (this.css = Eb(Cb, this.options.injectNonce));
  }
  /**
   * Update editor options.
   *
   * @param options A list of options
   */
  setOptions(e = {}) {
    this.options = {
      ...this.options,
      ...e
    }, !(!this.view || !this.state || this.isDestroyed) && (this.options.editorProps && this.view.setProps(this.options.editorProps), this.view.updateState(this.state));
  }
  /**
   * Update editable state of the editor.
   */
  setEditable(e, t = !0) {
    this.setOptions({ editable: e }), t && this.emit("update", { editor: this, transaction: this.state.tr });
  }
  /**
   * Returns whether the editor is editable.
   */
  get isEditable() {
    return this.options.editable && this.view && this.view.editable;
  }
  /**
   * Returns the editor state.
   */
  get state() {
    return this.view.state;
  }
  /**
   * Register a ProseMirror plugin.
   *
   * @param plugin A ProseMirror plugin
   * @param handlePlugins Control how to merge the plugin into the existing plugins.
   */
  registerPlugin(e, t) {
    const r = Lp(t) ? t(e, [...this.state.plugins]) : [...this.state.plugins, e], o = this.state.reconfigure({ plugins: r });
    this.view.updateState(o);
  }
  /**
   * Unregister a ProseMirror plugin.
   *
   * @param nameOrPluginKey The plugins name
   */
  unregisterPlugin(e) {
    if (this.isDestroyed)
      return;
    const t = typeof e == "string" ? `${e}$` : e.key, r = this.state.reconfigure({
      // @ts-ignore
      plugins: this.state.plugins.filter((o) => !o.key.startsWith(t))
    });
    this.view.updateState(r);
  }
  /**
   * Creates an extension manager.
   */
  createExtensionManager() {
    const t = [...this.options.enableCoreExtensions ? Object.values(zp) : [], ...this.options.extensions].filter((r) => ["extension", "node", "mark"].includes(r == null ? void 0 : r.type));
    this.extensionManager = new dr(t, this);
  }
  /**
   * Creates an command manager.
   */
  createCommandManager() {
    this.commandManager = new di({
      editor: this
    });
  }
  /**
   * Creates a ProseMirror schema.
   */
  createSchema() {
    this.schema = this.extensionManager.schema;
  }
  /**
   * Creates a ProseMirror view.
   */
  createView() {
    const e = Bp(this.options.content, this.schema, this.options.parseOptions), t = Pp(e, this.options.autofocus);
    this.view = new ry(this.options.element, {
      ...this.options.editorProps,
      dispatchTransaction: this.dispatchTransaction.bind(this),
      state: ur.create({
        doc: e,
        selection: t || void 0
      })
    });
    const r = this.state.reconfigure({
      plugins: this.extensionManager.plugins
    });
    this.view.updateState(r), this.createNodeViews(), this.prependClass();
    const o = this.view.dom;
    o.editor = this;
  }
  /**
   * Creates all node views.
   */
  createNodeViews() {
    this.view.setProps({
      nodeViews: this.extensionManager.nodeViews
    });
  }
  /**
   * Prepend class name to element.
   */
  prependClass() {
    this.view.dom.className = `tiptap ${this.view.dom.className}`;
  }
  captureTransaction(e) {
    this.isCapturingTransaction = !0, e(), this.isCapturingTransaction = !1;
    const t = this.capturedTransaction;
    return this.capturedTransaction = null, t;
  }
  /**
   * The callback over which to send transactions (state updates) produced by the view.
   *
   * @param transaction An editor state transaction
   */
  dispatchTransaction(e) {
    if (this.view.isDestroyed)
      return;
    if (this.isCapturingTransaction) {
      if (!this.capturedTransaction) {
        this.capturedTransaction = e;
        return;
      }
      e.steps.forEach((i) => {
        var a;
        return (a = this.capturedTransaction) === null || a === void 0 ? void 0 : a.step(i);
      });
      return;
    }
    const t = this.state.apply(e), r = !this.state.selection.eq(t.selection);
    this.view.updateState(t), this.emit("transaction", {
      editor: this,
      transaction: e
    }), r && this.emit("selectionUpdate", {
      editor: this,
      transaction: e
    });
    const o = e.getMeta("focus"), s = e.getMeta("blur");
    o && this.emit("focus", {
      editor: this,
      event: o.event,
      transaction: e
    }), s && this.emit("blur", {
      editor: this,
      event: s.event,
      transaction: e
    }), !(!e.docChanged || e.getMeta("preventUpdate")) && this.emit("update", {
      editor: this,
      transaction: e
    });
  }
  /**
   * Get attributes of the currently selected node or mark.
   */
  getAttributes(e) {
    return Fp(this.state, e);
  }
  isActive(e, t) {
    const r = typeof e == "string" ? e : null, o = typeof e == "string" ? t : e;
    return Zv(this.state, r, o);
  }
  /**
   * Get the document as JSON.
   */
  getJSON() {
    return this.state.doc.toJSON();
  }
  /**
   * Get the document as HTML.
   */
  getHTML() {
    return Hl(this.state.doc.content, this.schema);
  }
  /**
   * Get the document as text.
   */
  getText(e) {
    const { blockSeparator: t = `

`, textSerializers: r = {} } = e || {};
    return Uv(this.state.doc, {
      blockSeparator: t,
      textSerializers: {
        ...Ip(this.schema),
        ...r
      }
    });
  }
  /**
   * Check if there is no content.
   */
  get isEmpty() {
    return Yv(this.state.doc);
  }
  /**
   * Get the number of characters for the current document.
   *
   * @deprecated
   */
  getCharacterCount() {
    return console.warn('[tiptap warn]: "editor.getCharacterCount()" is deprecated. Please use "editor.storage.characterCount.characters()" instead.'), this.state.doc.content.size - 2;
  }
  /**
   * Destroy the editor.
   */
  destroy() {
    this.emit("destroy"), this.view && this.view.destroy(), this.removeAllListeners();
  }
  /**
   * Check if the editor is already destroyed.
   */
  get isDestroyed() {
    var e;
    return !(!((e = this.view) === null || e === void 0) && e.docView);
  }
};
function $n(n) {
  return new _o({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const o = U(n.getAttributes, void 0, r);
      if (o === !1 || o === null)
        return null;
      const { tr: s } = e, i = r[r.length - 1], a = r[0];
      if (i) {
        const l = a.search(/\S/), c = t.from + a.indexOf(i), u = c + i.length;
        if (Vl(t.from, t.to, e.doc).filter((p) => p.mark.type.excluded.find((m) => m === n.type && m !== p.mark.type)).filter((p) => p.to > c).length)
          return null;
        u < t.to && s.delete(u, t.to), c > t.from && s.delete(t.from + l, c);
        const f = t.from + l + i.length;
        s.addMark(t.from + l, f, n.type.create(o || {})), s.removeStoredMark(n.type);
      }
    }
  });
}
function Tb(n) {
  return new _o({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const o = U(n.getAttributes, void 0, r) || {}, { tr: s } = e, i = t.from;
      let a = t.to;
      const l = n.type.create(o);
      if (r[1]) {
        const c = r[0].lastIndexOf(r[1]);
        let u = i + c;
        u > a ? u = a : a = u + r[1].length;
        const d = r[0][r[0].length - 1];
        s.insertText(d, i + r[0].length - 1), s.replaceWith(u, a, l);
      } else
        r[0] && s.insert(i - 1, n.type.create(o)).delete(s.mapping.map(i), s.mapping.map(a));
      s.scrollIntoView();
    }
  });
}
function Ga(n) {
  return new _o({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const o = e.doc.resolve(t.from), s = U(n.getAttributes, void 0, r) || {};
      if (!o.node(-1).canReplaceWith(o.index(-1), o.indexAfter(-1), n.type))
        return null;
      e.tr.delete(t.from, t.to).setBlockType(t.from, t.from, n.type, s);
    }
  });
}
function Or(n) {
  return new _o({
    find: n.find,
    handler: ({ state: e, range: t, match: r, chain: o }) => {
      const s = U(n.getAttributes, void 0, r) || {}, i = e.tr.delete(t.from, t.to), l = i.doc.resolve(t.from).blockRange(), c = l && Sl(l, n.type, s);
      if (!c)
        return null;
      if (i.wrap(l, c), n.keepMarks && n.editor) {
        const { selection: d, storedMarks: f } = e, { splittableMarks: p } = n.editor.extensionManager, h = f || d.$to.parentOffset && d.$from.marks();
        if (h) {
          const m = h.filter((g) => p.includes(g.type.name));
          i.ensureMarks(m);
        }
      }
      if (n.keepAttributes) {
        const d = n.type.name === "bulletList" || n.type.name === "orderedList" ? "listItem" : "taskList";
        o().updateAttributes(d, s).run();
      }
      const u = i.doc.resolve(t.from - 1).nodeBefore;
      u && u.type === n.type && dn(i.doc, t.from - 1) && (!n.joinPredicate || n.joinPredicate(r, u)) && i.join(t.from - 1);
    }
  });
}
class de {
  constructor(e = {}) {
    this.type = "mark", this.name = "mark", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = U(R(this, "addOptions", {
      name: this.name
    }))), this.storage = U(R(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new de(e);
  }
  configure(e = {}) {
    const t = this.extend();
    return t.options = pi(this.options, e), t.storage = U(R(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
  extend(e = {}) {
    const t = new de(e);
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = U(R(t, "addOptions", {
      name: t.name
    })), t.storage = U(R(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
  static handleExit({ editor: e, mark: t }) {
    const { tr: r } = e.state, o = e.state.selection.$from;
    if (o.pos === o.end()) {
      const i = o.marks();
      if (!!!i.find((c) => (c == null ? void 0 : c.type.name) === t.name))
        return !1;
      const l = i.find((c) => (c == null ? void 0 : c.type.name) === t.name);
      return l && r.removeStoredMark(l), r.insertText(" ", o.pos), e.view.dispatch(r), !0;
    }
    return !1;
  }
}
let X = class Ja {
  constructor(e = {}) {
    this.type = "node", this.name = "node", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = U(R(this, "addOptions", {
      name: this.name
    }))), this.storage = U(R(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new Ja(e);
  }
  configure(e = {}) {
    const t = this.extend();
    return t.options = pi(this.options, e), t.storage = U(R(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
  extend(e = {}) {
    const t = new Ja(e);
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = U(R(t, "addOptions", {
      name: t.name
    })), t.storage = U(R(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
};
function Hn(n) {
  return new Wy({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const o = U(n.getAttributes, void 0, r);
      if (o === !1 || o === null)
        return null;
      const { tr: s } = e, i = r[r.length - 1], a = r[0];
      let l = t.to;
      if (i) {
        const c = a.search(/\S/), u = t.from + a.indexOf(i), d = u + i.length;
        if (Vl(t.from, t.to, e.doc).filter((p) => p.mark.type.excluded.find((m) => m === n.type && m !== p.mark.type)).filter((p) => p.to > u).length)
          return null;
        d < t.to && s.delete(d, t.to), u > t.from && s.delete(t.from + c, u), l = t.from + c + i.length, s.addMark(t.from + c, l, n.type.create(o || {})), s.removeStoredMark(n.type);
      }
    }
  });
}
function Mb(n) {
  return n.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
}
var Be = "top", Xe = "bottom", et = "right", Fe = "left", jl = "auto", Lo = [Be, Xe, et, Fe], Dr = "start", bo = "end", Ob = "clippingParents", $p = "viewport", Kr = "popper", Db = "reference", Ou = /* @__PURE__ */ Lo.reduce(function(n, e) {
  return n.concat([e + "-" + Dr, e + "-" + bo]);
}, []), Hp = /* @__PURE__ */ [].concat(Lo, [jl]).reduce(function(n, e) {
  return n.concat([e, e + "-" + Dr, e + "-" + bo]);
}, []), _b = "beforeRead", Nb = "read", Lb = "afterRead", Rb = "beforeMain", Ib = "main", Pb = "afterMain", Bb = "beforeWrite", Fb = "write", qb = "afterWrite", zb = [_b, Nb, Lb, Rb, Ib, Pb, Bb, Fb, qb];
function Ct(n) {
  return n ? (n.nodeName || "").toLowerCase() : null;
}
function Ve(n) {
  if (n == null)
    return window;
  if (n.toString() !== "[object Window]") {
    var e = n.ownerDocument;
    return e && e.defaultView || window;
  }
  return n;
}
function Vn(n) {
  var e = Ve(n).Element;
  return n instanceof e || n instanceof Element;
}
function Qe(n) {
  var e = Ve(n).HTMLElement;
  return n instanceof e || n instanceof HTMLElement;
}
function Ul(n) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = Ve(n).ShadowRoot;
  return n instanceof e || n instanceof ShadowRoot;
}
function $b(n) {
  var e = n.state;
  Object.keys(e.elements).forEach(function(t) {
    var r = e.styles[t] || {}, o = e.attributes[t] || {}, s = e.elements[t];
    !Qe(s) || !Ct(s) || (Object.assign(s.style, r), Object.keys(o).forEach(function(i) {
      var a = o[i];
      a === !1 ? s.removeAttribute(i) : s.setAttribute(i, a === !0 ? "" : a);
    }));
  });
}
function Hb(n) {
  var e = n.state, t = {
    popper: {
      position: e.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(e.elements.popper.style, t.popper), e.styles = t, e.elements.arrow && Object.assign(e.elements.arrow.style, t.arrow), function() {
    Object.keys(e.elements).forEach(function(r) {
      var o = e.elements[r], s = e.attributes[r] || {}, i = Object.keys(e.styles.hasOwnProperty(r) ? e.styles[r] : t[r]), a = i.reduce(function(l, c) {
        return l[c] = "", l;
      }, {});
      !Qe(o) || !Ct(o) || (Object.assign(o.style, a), Object.keys(s).forEach(function(l) {
        o.removeAttribute(l);
      }));
    });
  };
}
const Vp = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: $b,
  effect: Hb,
  requires: ["computeStyles"]
};
function kt(n) {
  return n.split("-")[0];
}
var Pn = Math.max, Ds = Math.min, _r = Math.round;
function Za() {
  var n = navigator.userAgentData;
  return n != null && n.brands && Array.isArray(n.brands) ? n.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function jp() {
  return !/^((?!chrome|android).)*safari/i.test(Za());
}
function Nr(n, e, t) {
  e === void 0 && (e = !1), t === void 0 && (t = !1);
  var r = n.getBoundingClientRect(), o = 1, s = 1;
  e && Qe(n) && (o = n.offsetWidth > 0 && _r(r.width) / n.offsetWidth || 1, s = n.offsetHeight > 0 && _r(r.height) / n.offsetHeight || 1);
  var i = Vn(n) ? Ve(n) : window, a = i.visualViewport, l = !jp() && t, c = (r.left + (l && a ? a.offsetLeft : 0)) / o, u = (r.top + (l && a ? a.offsetTop : 0)) / s, d = r.width / o, f = r.height / s;
  return {
    width: d,
    height: f,
    top: u,
    right: c + d,
    bottom: u + f,
    left: c,
    x: c,
    y: u
  };
}
function Wl(n) {
  var e = Nr(n), t = n.offsetWidth, r = n.offsetHeight;
  return Math.abs(e.width - t) <= 1 && (t = e.width), Math.abs(e.height - r) <= 1 && (r = e.height), {
    x: n.offsetLeft,
    y: n.offsetTop,
    width: t,
    height: r
  };
}
function Up(n, e) {
  var t = e.getRootNode && e.getRootNode();
  if (n.contains(e))
    return !0;
  if (t && Ul(t)) {
    var r = e;
    do {
      if (r && n.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function $t(n) {
  return Ve(n).getComputedStyle(n);
}
function Vb(n) {
  return ["table", "td", "th"].indexOf(Ct(n)) >= 0;
}
function hn(n) {
  return ((Vn(n) ? n.ownerDocument : (
    // $FlowFixMe[prop-missing]
    n.document
  )) || window.document).documentElement;
}
function mi(n) {
  return Ct(n) === "html" ? n : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    n.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    n.parentNode || // DOM Element detected
    (Ul(n) ? n.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    hn(n)
  );
}
function Du(n) {
  return !Qe(n) || // https://github.com/popperjs/popper-core/issues/837
  $t(n).position === "fixed" ? null : n.offsetParent;
}
function jb(n) {
  var e = /firefox/i.test(Za()), t = /Trident/i.test(Za());
  if (t && Qe(n)) {
    var r = $t(n);
    if (r.position === "fixed")
      return null;
  }
  var o = mi(n);
  for (Ul(o) && (o = o.host); Qe(o) && ["html", "body"].indexOf(Ct(o)) < 0; ) {
    var s = $t(o);
    if (s.transform !== "none" || s.perspective !== "none" || s.contain === "paint" || ["transform", "perspective"].indexOf(s.willChange) !== -1 || e && s.willChange === "filter" || e && s.filter && s.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function Ro(n) {
  for (var e = Ve(n), t = Du(n); t && Vb(t) && $t(t).position === "static"; )
    t = Du(t);
  return t && (Ct(t) === "html" || Ct(t) === "body" && $t(t).position === "static") ? e : t || jb(n) || e;
}
function Kl(n) {
  return ["top", "bottom"].indexOf(n) >= 0 ? "x" : "y";
}
function no(n, e, t) {
  return Pn(n, Ds(e, t));
}
function Ub(n, e, t) {
  var r = no(n, e, t);
  return r > t ? t : r;
}
function Wp() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Kp(n) {
  return Object.assign({}, Wp(), n);
}
function Gp(n, e) {
  return e.reduce(function(t, r) {
    return t[r] = n, t;
  }, {});
}
var Wb = function(e, t) {
  return e = typeof e == "function" ? e(Object.assign({}, t.rects, {
    placement: t.placement
  })) : e, Kp(typeof e != "number" ? e : Gp(e, Lo));
};
function Kb(n) {
  var e, t = n.state, r = n.name, o = n.options, s = t.elements.arrow, i = t.modifiersData.popperOffsets, a = kt(t.placement), l = Kl(a), c = [Fe, et].indexOf(a) >= 0, u = c ? "height" : "width";
  if (!(!s || !i)) {
    var d = Wb(o.padding, t), f = Wl(s), p = l === "y" ? Be : Fe, h = l === "y" ? Xe : et, m = t.rects.reference[u] + t.rects.reference[l] - i[l] - t.rects.popper[u], g = i[l] - t.rects.reference[l], v = Ro(s), b = v ? l === "y" ? v.clientHeight || 0 : v.clientWidth || 0 : 0, x = m / 2 - g / 2, y = d[p], w = b - f[u] - d[h], k = b / 2 - f[u] / 2 + x, S = no(y, k, w), E = l;
    t.modifiersData[r] = (e = {}, e[E] = S, e.centerOffset = S - k, e);
  }
}
function Gb(n) {
  var e = n.state, t = n.options, r = t.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = e.elements.popper.querySelector(o), !o) || Up(e.elements.popper, o) && (e.elements.arrow = o));
}
const Jb = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Kb,
  effect: Gb,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Lr(n) {
  return n.split("-")[1];
}
var Zb = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Yb(n, e) {
  var t = n.x, r = n.y, o = e.devicePixelRatio || 1;
  return {
    x: _r(t * o) / o || 0,
    y: _r(r * o) / o || 0
  };
}
function _u(n) {
  var e, t = n.popper, r = n.popperRect, o = n.placement, s = n.variation, i = n.offsets, a = n.position, l = n.gpuAcceleration, c = n.adaptive, u = n.roundOffsets, d = n.isFixed, f = i.x, p = f === void 0 ? 0 : f, h = i.y, m = h === void 0 ? 0 : h, g = typeof u == "function" ? u({
    x: p,
    y: m
  }) : {
    x: p,
    y: m
  };
  p = g.x, m = g.y;
  var v = i.hasOwnProperty("x"), b = i.hasOwnProperty("y"), x = Fe, y = Be, w = window;
  if (c) {
    var k = Ro(t), S = "clientHeight", E = "clientWidth";
    if (k === Ve(t) && (k = hn(t), $t(k).position !== "static" && a === "absolute" && (S = "scrollHeight", E = "scrollWidth")), k = k, o === Be || (o === Fe || o === et) && s === bo) {
      y = Xe;
      var T = d && k === w && w.visualViewport ? w.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        k[S]
      );
      m -= T - r.height, m *= l ? 1 : -1;
    }
    if (o === Fe || (o === Be || o === Xe) && s === bo) {
      x = et;
      var D = d && k === w && w.visualViewport ? w.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        k[E]
      );
      p -= D - r.width, p *= l ? 1 : -1;
    }
  }
  var _ = Object.assign({
    position: a
  }, c && Zb), F = u === !0 ? Yb({
    x: p,
    y: m
  }, Ve(t)) : {
    x: p,
    y: m
  };
  if (p = F.x, m = F.y, l) {
    var P;
    return Object.assign({}, _, (P = {}, P[y] = b ? "0" : "", P[x] = v ? "0" : "", P.transform = (w.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + m + "px)" : "translate3d(" + p + "px, " + m + "px, 0)", P));
  }
  return Object.assign({}, _, (e = {}, e[y] = b ? m + "px" : "", e[x] = v ? p + "px" : "", e.transform = "", e));
}
function Qb(n) {
  var e = n.state, t = n.options, r = t.gpuAcceleration, o = r === void 0 ? !0 : r, s = t.adaptive, i = s === void 0 ? !0 : s, a = t.roundOffsets, l = a === void 0 ? !0 : a, c = {
    placement: kt(e.placement),
    variation: Lr(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: o,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, _u(Object.assign({}, c, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: i,
    roundOffsets: l
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, _u(Object.assign({}, c, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: l
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const Xb = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Qb,
  data: {}
};
var Yo = {
  passive: !0
};
function ek(n) {
  var e = n.state, t = n.instance, r = n.options, o = r.scroll, s = o === void 0 ? !0 : o, i = r.resize, a = i === void 0 ? !0 : i, l = Ve(e.elements.popper), c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return s && c.forEach(function(u) {
    u.addEventListener("scroll", t.update, Yo);
  }), a && l.addEventListener("resize", t.update, Yo), function() {
    s && c.forEach(function(u) {
      u.removeEventListener("scroll", t.update, Yo);
    }), a && l.removeEventListener("resize", t.update, Yo);
  };
}
const tk = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: ek,
  data: {}
};
var nk = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function ps(n) {
  return n.replace(/left|right|bottom|top/g, function(e) {
    return nk[e];
  });
}
var rk = {
  start: "end",
  end: "start"
};
function Nu(n) {
  return n.replace(/start|end/g, function(e) {
    return rk[e];
  });
}
function Gl(n) {
  var e = Ve(n), t = e.pageXOffset, r = e.pageYOffset;
  return {
    scrollLeft: t,
    scrollTop: r
  };
}
function Jl(n) {
  return Nr(hn(n)).left + Gl(n).scrollLeft;
}
function ok(n, e) {
  var t = Ve(n), r = hn(n), o = t.visualViewport, s = r.clientWidth, i = r.clientHeight, a = 0, l = 0;
  if (o) {
    s = o.width, i = o.height;
    var c = jp();
    (c || !c && e === "fixed") && (a = o.offsetLeft, l = o.offsetTop);
  }
  return {
    width: s,
    height: i,
    x: a + Jl(n),
    y: l
  };
}
function sk(n) {
  var e, t = hn(n), r = Gl(n), o = (e = n.ownerDocument) == null ? void 0 : e.body, s = Pn(t.scrollWidth, t.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), i = Pn(t.scrollHeight, t.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), a = -r.scrollLeft + Jl(n), l = -r.scrollTop;
  return $t(o || t).direction === "rtl" && (a += Pn(t.clientWidth, o ? o.clientWidth : 0) - s), {
    width: s,
    height: i,
    x: a,
    y: l
  };
}
function Zl(n) {
  var e = $t(n), t = e.overflow, r = e.overflowX, o = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(t + o + r);
}
function Jp(n) {
  return ["html", "body", "#document"].indexOf(Ct(n)) >= 0 ? n.ownerDocument.body : Qe(n) && Zl(n) ? n : Jp(mi(n));
}
function ro(n, e) {
  var t;
  e === void 0 && (e = []);
  var r = Jp(n), o = r === ((t = n.ownerDocument) == null ? void 0 : t.body), s = Ve(r), i = o ? [s].concat(s.visualViewport || [], Zl(r) ? r : []) : r, a = e.concat(i);
  return o ? a : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    a.concat(ro(mi(i)))
  );
}
function Ya(n) {
  return Object.assign({}, n, {
    left: n.x,
    top: n.y,
    right: n.x + n.width,
    bottom: n.y + n.height
  });
}
function ik(n, e) {
  var t = Nr(n, !1, e === "fixed");
  return t.top = t.top + n.clientTop, t.left = t.left + n.clientLeft, t.bottom = t.top + n.clientHeight, t.right = t.left + n.clientWidth, t.width = n.clientWidth, t.height = n.clientHeight, t.x = t.left, t.y = t.top, t;
}
function Lu(n, e, t) {
  return e === $p ? Ya(ok(n, t)) : Vn(e) ? ik(e, t) : Ya(sk(hn(n)));
}
function ak(n) {
  var e = ro(mi(n)), t = ["absolute", "fixed"].indexOf($t(n).position) >= 0, r = t && Qe(n) ? Ro(n) : n;
  return Vn(r) ? e.filter(function(o) {
    return Vn(o) && Up(o, r) && Ct(o) !== "body";
  }) : [];
}
function lk(n, e, t, r) {
  var o = e === "clippingParents" ? ak(n) : [].concat(e), s = [].concat(o, [t]), i = s[0], a = s.reduce(function(l, c) {
    var u = Lu(n, c, r);
    return l.top = Pn(u.top, l.top), l.right = Ds(u.right, l.right), l.bottom = Ds(u.bottom, l.bottom), l.left = Pn(u.left, l.left), l;
  }, Lu(n, i, r));
  return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
}
function Zp(n) {
  var e = n.reference, t = n.element, r = n.placement, o = r ? kt(r) : null, s = r ? Lr(r) : null, i = e.x + e.width / 2 - t.width / 2, a = e.y + e.height / 2 - t.height / 2, l;
  switch (o) {
    case Be:
      l = {
        x: i,
        y: e.y - t.height
      };
      break;
    case Xe:
      l = {
        x: i,
        y: e.y + e.height
      };
      break;
    case et:
      l = {
        x: e.x + e.width,
        y: a
      };
      break;
    case Fe:
      l = {
        x: e.x - t.width,
        y: a
      };
      break;
    default:
      l = {
        x: e.x,
        y: e.y
      };
  }
  var c = o ? Kl(o) : null;
  if (c != null) {
    var u = c === "y" ? "height" : "width";
    switch (s) {
      case Dr:
        l[c] = l[c] - (e[u] / 2 - t[u] / 2);
        break;
      case bo:
        l[c] = l[c] + (e[u] / 2 - t[u] / 2);
        break;
    }
  }
  return l;
}
function ko(n, e) {
  e === void 0 && (e = {});
  var t = e, r = t.placement, o = r === void 0 ? n.placement : r, s = t.strategy, i = s === void 0 ? n.strategy : s, a = t.boundary, l = a === void 0 ? Ob : a, c = t.rootBoundary, u = c === void 0 ? $p : c, d = t.elementContext, f = d === void 0 ? Kr : d, p = t.altBoundary, h = p === void 0 ? !1 : p, m = t.padding, g = m === void 0 ? 0 : m, v = Kp(typeof g != "number" ? g : Gp(g, Lo)), b = f === Kr ? Db : Kr, x = n.rects.popper, y = n.elements[h ? b : f], w = lk(Vn(y) ? y : y.contextElement || hn(n.elements.popper), l, u, i), k = Nr(n.elements.reference), S = Zp({
    reference: k,
    element: x,
    strategy: "absolute",
    placement: o
  }), E = Ya(Object.assign({}, x, S)), T = f === Kr ? E : k, D = {
    top: w.top - T.top + v.top,
    bottom: T.bottom - w.bottom + v.bottom,
    left: w.left - T.left + v.left,
    right: T.right - w.right + v.right
  }, _ = n.modifiersData.offset;
  if (f === Kr && _) {
    var F = _[o];
    Object.keys(D).forEach(function(P) {
      var A = [et, Xe].indexOf(P) >= 0 ? 1 : -1, q = [Be, Xe].indexOf(P) >= 0 ? "y" : "x";
      D[P] += F[q] * A;
    });
  }
  return D;
}
function ck(n, e) {
  e === void 0 && (e = {});
  var t = e, r = t.placement, o = t.boundary, s = t.rootBoundary, i = t.padding, a = t.flipVariations, l = t.allowedAutoPlacements, c = l === void 0 ? Hp : l, u = Lr(r), d = u ? a ? Ou : Ou.filter(function(h) {
    return Lr(h) === u;
  }) : Lo, f = d.filter(function(h) {
    return c.indexOf(h) >= 0;
  });
  f.length === 0 && (f = d);
  var p = f.reduce(function(h, m) {
    return h[m] = ko(n, {
      placement: m,
      boundary: o,
      rootBoundary: s,
      padding: i
    })[kt(m)], h;
  }, {});
  return Object.keys(p).sort(function(h, m) {
    return p[h] - p[m];
  });
}
function uk(n) {
  if (kt(n) === jl)
    return [];
  var e = ps(n);
  return [Nu(n), e, Nu(e)];
}
function dk(n) {
  var e = n.state, t = n.options, r = n.name;
  if (!e.modifiersData[r]._skip) {
    for (var o = t.mainAxis, s = o === void 0 ? !0 : o, i = t.altAxis, a = i === void 0 ? !0 : i, l = t.fallbackPlacements, c = t.padding, u = t.boundary, d = t.rootBoundary, f = t.altBoundary, p = t.flipVariations, h = p === void 0 ? !0 : p, m = t.allowedAutoPlacements, g = e.options.placement, v = kt(g), b = v === g, x = l || (b || !h ? [ps(g)] : uk(g)), y = [g].concat(x).reduce(function(Mt, rt) {
      return Mt.concat(kt(rt) === jl ? ck(e, {
        placement: rt,
        boundary: u,
        rootBoundary: d,
        padding: c,
        flipVariations: h,
        allowedAutoPlacements: m
      }) : rt);
    }, []), w = e.rects.reference, k = e.rects.popper, S = /* @__PURE__ */ new Map(), E = !0, T = y[0], D = 0; D < y.length; D++) {
      var _ = y[D], F = kt(_), P = Lr(_) === Dr, A = [Be, Xe].indexOf(F) >= 0, q = A ? "width" : "height", L = ko(e, {
        placement: _,
        boundary: u,
        rootBoundary: d,
        altBoundary: f,
        padding: c
      }), z = A ? P ? et : Fe : P ? Xe : Be;
      w[q] > k[q] && (z = ps(z));
      var K = ps(z), ne = [];
      if (s && ne.push(L[F] <= 0), a && ne.push(L[z] <= 0, L[K] <= 0), ne.every(function(Mt) {
        return Mt;
      })) {
        T = _, E = !1;
        break;
      }
      S.set(_, ne);
    }
    if (E)
      for (var he = h ? 3 : 1, Se = function(rt) {
        var Ot = y.find(function(Jn) {
          var Dt = S.get(Jn);
          if (Dt)
            return Dt.slice(0, rt).every(function(Zn) {
              return Zn;
            });
        });
        if (Ot)
          return T = Ot, "break";
      }, Me = he; Me > 0; Me--) {
        var Ue = Se(Me);
        if (Ue === "break")
          break;
      }
    e.placement !== T && (e.modifiersData[r]._skip = !0, e.placement = T, e.reset = !0);
  }
}
const fk = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: dk,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Ru(n, e, t) {
  return t === void 0 && (t = {
    x: 0,
    y: 0
  }), {
    top: n.top - e.height - t.y,
    right: n.right - e.width + t.x,
    bottom: n.bottom - e.height + t.y,
    left: n.left - e.width - t.x
  };
}
function Iu(n) {
  return [Be, et, Xe, Fe].some(function(e) {
    return n[e] >= 0;
  });
}
function pk(n) {
  var e = n.state, t = n.name, r = e.rects.reference, o = e.rects.popper, s = e.modifiersData.preventOverflow, i = ko(e, {
    elementContext: "reference"
  }), a = ko(e, {
    altBoundary: !0
  }), l = Ru(i, r), c = Ru(a, o, s), u = Iu(l), d = Iu(c);
  e.modifiersData[t] = {
    referenceClippingOffsets: l,
    popperEscapeOffsets: c,
    isReferenceHidden: u,
    hasPopperEscaped: d
  }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-reference-hidden": u,
    "data-popper-escaped": d
  });
}
const hk = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: pk
};
function mk(n, e, t) {
  var r = kt(n), o = [Fe, Be].indexOf(r) >= 0 ? -1 : 1, s = typeof t == "function" ? t(Object.assign({}, e, {
    placement: n
  })) : t, i = s[0], a = s[1];
  return i = i || 0, a = (a || 0) * o, [Fe, et].indexOf(r) >= 0 ? {
    x: a,
    y: i
  } : {
    x: i,
    y: a
  };
}
function gk(n) {
  var e = n.state, t = n.options, r = n.name, o = t.offset, s = o === void 0 ? [0, 0] : o, i = Hp.reduce(function(u, d) {
    return u[d] = mk(d, e.rects, s), u;
  }, {}), a = i[e.placement], l = a.x, c = a.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += l, e.modifiersData.popperOffsets.y += c), e.modifiersData[r] = i;
}
const yk = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: gk
};
function vk(n) {
  var e = n.state, t = n.name;
  e.modifiersData[t] = Zp({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
const bk = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: vk,
  data: {}
};
function kk(n) {
  return n === "x" ? "y" : "x";
}
function xk(n) {
  var e = n.state, t = n.options, r = n.name, o = t.mainAxis, s = o === void 0 ? !0 : o, i = t.altAxis, a = i === void 0 ? !1 : i, l = t.boundary, c = t.rootBoundary, u = t.altBoundary, d = t.padding, f = t.tether, p = f === void 0 ? !0 : f, h = t.tetherOffset, m = h === void 0 ? 0 : h, g = ko(e, {
    boundary: l,
    rootBoundary: c,
    padding: d,
    altBoundary: u
  }), v = kt(e.placement), b = Lr(e.placement), x = !b, y = Kl(v), w = kk(y), k = e.modifiersData.popperOffsets, S = e.rects.reference, E = e.rects.popper, T = typeof m == "function" ? m(Object.assign({}, e.rects, {
    placement: e.placement
  })) : m, D = typeof T == "number" ? {
    mainAxis: T,
    altAxis: T
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, T), _ = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, F = {
    x: 0,
    y: 0
  };
  if (k) {
    if (s) {
      var P, A = y === "y" ? Be : Fe, q = y === "y" ? Xe : et, L = y === "y" ? "height" : "width", z = k[y], K = z + g[A], ne = z - g[q], he = p ? -E[L] / 2 : 0, Se = b === Dr ? S[L] : E[L], Me = b === Dr ? -E[L] : -S[L], Ue = e.elements.arrow, Mt = p && Ue ? Wl(Ue) : {
        width: 0,
        height: 0
      }, rt = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : Wp(), Ot = rt[A], Jn = rt[q], Dt = no(0, S[L], Mt[L]), Zn = x ? S[L] / 2 - he - Dt - Ot - D.mainAxis : Se - Dt - Ot - D.mainAxis, jt = x ? -S[L] / 2 + he + Dt + Jn + D.mainAxis : Me + Dt + Jn + D.mainAxis, Yn = e.elements.arrow && Ro(e.elements.arrow), Bo = Yn ? y === "y" ? Yn.clientTop || 0 : Yn.clientLeft || 0 : 0, zr = (P = _ == null ? void 0 : _[y]) != null ? P : 0, Fo = z + Zn - zr - Bo, qo = z + jt - zr, $r = no(p ? Ds(K, Fo) : K, z, p ? Pn(ne, qo) : ne);
      k[y] = $r, F[y] = $r - z;
    }
    if (a) {
      var Hr, zo = y === "x" ? Be : Fe, $o = y === "x" ? Xe : et, _t = k[w], Ut = w === "y" ? "height" : "width", Vr = _t + g[zo], gn = _t - g[$o], jr = [Be, Fe].indexOf(v) !== -1, Ho = (Hr = _ == null ? void 0 : _[w]) != null ? Hr : 0, Vo = jr ? Vr : _t - S[Ut] - E[Ut] - Ho + D.altAxis, jo = jr ? _t + S[Ut] + E[Ut] - Ho - D.altAxis : gn, Uo = p && jr ? Ub(Vo, _t, jo) : no(p ? Vo : Vr, _t, p ? jo : gn);
      k[w] = Uo, F[w] = Uo - _t;
    }
    e.modifiersData[r] = F;
  }
}
const wk = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: xk,
  requiresIfExists: ["offset"]
};
function Sk(n) {
  return {
    scrollLeft: n.scrollLeft,
    scrollTop: n.scrollTop
  };
}
function Ck(n) {
  return n === Ve(n) || !Qe(n) ? Gl(n) : Sk(n);
}
function Ek(n) {
  var e = n.getBoundingClientRect(), t = _r(e.width) / n.offsetWidth || 1, r = _r(e.height) / n.offsetHeight || 1;
  return t !== 1 || r !== 1;
}
function Ak(n, e, t) {
  t === void 0 && (t = !1);
  var r = Qe(e), o = Qe(e) && Ek(e), s = hn(e), i = Nr(n, o, t), a = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = {
    x: 0,
    y: 0
  };
  return (r || !r && !t) && ((Ct(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Zl(s)) && (a = Ck(e)), Qe(e) ? (l = Nr(e, !0), l.x += e.clientLeft, l.y += e.clientTop) : s && (l.x = Jl(s))), {
    x: i.left + a.scrollLeft - l.x,
    y: i.top + a.scrollTop - l.y,
    width: i.width,
    height: i.height
  };
}
function Tk(n) {
  var e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set(), r = [];
  n.forEach(function(s) {
    e.set(s.name, s);
  });
  function o(s) {
    t.add(s.name);
    var i = [].concat(s.requires || [], s.requiresIfExists || []);
    i.forEach(function(a) {
      if (!t.has(a)) {
        var l = e.get(a);
        l && o(l);
      }
    }), r.push(s);
  }
  return n.forEach(function(s) {
    t.has(s.name) || o(s);
  }), r;
}
function Mk(n) {
  var e = Tk(n);
  return zb.reduce(function(t, r) {
    return t.concat(e.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function Ok(n) {
  var e;
  return function() {
    return e || (e = new Promise(function(t) {
      Promise.resolve().then(function() {
        e = void 0, t(n());
      });
    })), e;
  };
}
function Dk(n) {
  var e = n.reduce(function(t, r) {
    var o = t[r.name];
    return t[r.name] = o ? Object.assign({}, o, r, {
      options: Object.assign({}, o.options, r.options),
      data: Object.assign({}, o.data, r.data)
    }) : r, t;
  }, {});
  return Object.keys(e).map(function(t) {
    return e[t];
  });
}
var Pu = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Bu() {
  for (var n = arguments.length, e = new Array(n), t = 0; t < n; t++)
    e[t] = arguments[t];
  return !e.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function _k(n) {
  n === void 0 && (n = {});
  var e = n, t = e.defaultModifiers, r = t === void 0 ? [] : t, o = e.defaultOptions, s = o === void 0 ? Pu : o;
  return function(a, l, c) {
    c === void 0 && (c = s);
    var u = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Pu, s),
      modifiersData: {},
      elements: {
        reference: a,
        popper: l
      },
      attributes: {},
      styles: {}
    }, d = [], f = !1, p = {
      state: u,
      setOptions: function(v) {
        var b = typeof v == "function" ? v(u.options) : v;
        m(), u.options = Object.assign({}, s, u.options, b), u.scrollParents = {
          reference: Vn(a) ? ro(a) : a.contextElement ? ro(a.contextElement) : [],
          popper: ro(l)
        };
        var x = Mk(Dk([].concat(r, u.options.modifiers)));
        return u.orderedModifiers = x.filter(function(y) {
          return y.enabled;
        }), h(), p.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!f) {
          var v = u.elements, b = v.reference, x = v.popper;
          if (Bu(b, x)) {
            u.rects = {
              reference: Ak(b, Ro(x), u.options.strategy === "fixed"),
              popper: Wl(x)
            }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function(D) {
              return u.modifiersData[D.name] = Object.assign({}, D.data);
            });
            for (var y = 0; y < u.orderedModifiers.length; y++) {
              if (u.reset === !0) {
                u.reset = !1, y = -1;
                continue;
              }
              var w = u.orderedModifiers[y], k = w.fn, S = w.options, E = S === void 0 ? {} : S, T = w.name;
              typeof k == "function" && (u = k({
                state: u,
                options: E,
                name: T,
                instance: p
              }) || u);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Ok(function() {
        return new Promise(function(g) {
          p.forceUpdate(), g(u);
        });
      }),
      destroy: function() {
        m(), f = !0;
      }
    };
    if (!Bu(a, l))
      return p;
    p.setOptions(c).then(function(g) {
      !f && c.onFirstUpdate && c.onFirstUpdate(g);
    });
    function h() {
      u.orderedModifiers.forEach(function(g) {
        var v = g.name, b = g.options, x = b === void 0 ? {} : b, y = g.effect;
        if (typeof y == "function") {
          var w = y({
            state: u,
            name: v,
            instance: p,
            options: x
          }), k = function() {
          };
          d.push(w || k);
        }
      });
    }
    function m() {
      d.forEach(function(g) {
        return g();
      }), d = [];
    }
    return p;
  };
}
var Nk = [tk, bk, Xb, Vp, yk, fk, wk, Jb, hk], Lk = /* @__PURE__ */ _k({
  defaultModifiers: Nk
}), Rk = "tippy-box", Yp = "tippy-content", Ik = "tippy-backdrop", Qp = "tippy-arrow", Xp = "tippy-svg-arrow", kn = {
  passive: !0,
  capture: !0
}, eh = function() {
  return document.body;
};
function Pk(n, e) {
  return {}.hasOwnProperty.call(n, e);
}
function Xi(n, e, t) {
  if (Array.isArray(n)) {
    var r = n[e];
    return r ?? (Array.isArray(t) ? t[e] : t);
  }
  return n;
}
function Yl(n, e) {
  var t = {}.toString.call(n);
  return t.indexOf("[object") === 0 && t.indexOf(e + "]") > -1;
}
function th(n, e) {
  return typeof n == "function" ? n.apply(void 0, e) : n;
}
function Fu(n, e) {
  if (e === 0)
    return n;
  var t;
  return function(r) {
    clearTimeout(t), t = setTimeout(function() {
      n(r);
    }, e);
  };
}
function Bk(n, e) {
  var t = Object.assign({}, n);
  return e.forEach(function(r) {
    delete t[r];
  }), t;
}
function Fk(n) {
  return n.split(/\s+/).filter(Boolean);
}
function ir(n) {
  return [].concat(n);
}
function qu(n, e) {
  n.indexOf(e) === -1 && n.push(e);
}
function qk(n) {
  return n.filter(function(e, t) {
    return n.indexOf(e) === t;
  });
}
function zk(n) {
  return n.split("-")[0];
}
function _s(n) {
  return [].slice.call(n);
}
function zu(n) {
  return Object.keys(n).reduce(function(e, t) {
    return n[t] !== void 0 && (e[t] = n[t]), e;
  }, {});
}
function oo() {
  return document.createElement("div");
}
function xo(n) {
  return ["Element", "Fragment"].some(function(e) {
    return Yl(n, e);
  });
}
function $k(n) {
  return Yl(n, "NodeList");
}
function Hk(n) {
  return Yl(n, "MouseEvent");
}
function Vk(n) {
  return !!(n && n._tippy && n._tippy.reference === n);
}
function jk(n) {
  return xo(n) ? [n] : $k(n) ? _s(n) : Array.isArray(n) ? n : _s(document.querySelectorAll(n));
}
function ea(n, e) {
  n.forEach(function(t) {
    t && (t.style.transitionDuration = e + "ms");
  });
}
function $u(n, e) {
  n.forEach(function(t) {
    t && t.setAttribute("data-state", e);
  });
}
function Uk(n) {
  var e, t = ir(n), r = t[0];
  return r != null && (e = r.ownerDocument) != null && e.body ? r.ownerDocument : document;
}
function Wk(n, e) {
  var t = e.clientX, r = e.clientY;
  return n.every(function(o) {
    var s = o.popperRect, i = o.popperState, a = o.props, l = a.interactiveBorder, c = zk(i.placement), u = i.modifiersData.offset;
    if (!u)
      return !0;
    var d = c === "bottom" ? u.top.y : 0, f = c === "top" ? u.bottom.y : 0, p = c === "right" ? u.left.x : 0, h = c === "left" ? u.right.x : 0, m = s.top - r + d > l, g = r - s.bottom - f > l, v = s.left - t + p > l, b = t - s.right - h > l;
    return m || g || v || b;
  });
}
function ta(n, e, t) {
  var r = e + "EventListener";
  ["transitionend", "webkitTransitionEnd"].forEach(function(o) {
    n[r](o, t);
  });
}
function Hu(n, e) {
  for (var t = e; t; ) {
    var r;
    if (n.contains(t))
      return !0;
    t = t.getRootNode == null || (r = t.getRootNode()) == null ? void 0 : r.host;
  }
  return !1;
}
var ht = {
  isTouch: !1
}, Vu = 0;
function Kk() {
  ht.isTouch || (ht.isTouch = !0, window.performance && document.addEventListener("mousemove", nh));
}
function nh() {
  var n = performance.now();
  n - Vu < 20 && (ht.isTouch = !1, document.removeEventListener("mousemove", nh)), Vu = n;
}
function Gk() {
  var n = document.activeElement;
  if (Vk(n)) {
    var e = n._tippy;
    n.blur && !e.state.isVisible && n.blur();
  }
}
function Jk() {
  document.addEventListener("touchstart", Kk, kn), window.addEventListener("blur", Gk);
}
var Zk = typeof window < "u" && typeof document < "u", Yk = Zk ? (
  // @ts-ignore
  !!window.msCrypto
) : !1;
function tr(n) {
  var e = n === "destroy" ? "n already-" : " ";
  return [n + "() was called on a" + e + "destroyed instance. This is a no-op but", "indicates a potential memory leak."].join(" ");
}
function ju(n) {
  var e = /[ \t]{2,}/g, t = /^[ \t]*/gm;
  return n.replace(e, " ").replace(t, "").trim();
}
function Qk(n) {
  return ju(`
  %ctippy.js

  %c` + ju(n) + `

  %c👷‍ This is a development-only message. It will be removed in production.
  `);
}
function rh(n) {
  return [
    Qk(n),
    // title
    "color: #00C584; font-size: 1.3em; font-weight: bold;",
    // message
    "line-height: 1.5",
    // footer
    "color: #a6a095;"
  ];
}
var wo;
process.env.NODE_ENV !== "production" && Xk();
function Xk() {
  wo = /* @__PURE__ */ new Set();
}
function It(n, e) {
  if (n && !wo.has(e)) {
    var t;
    wo.add(e), (t = console).warn.apply(t, rh(e));
  }
}
function Qa(n, e) {
  if (n && !wo.has(e)) {
    var t;
    wo.add(e), (t = console).error.apply(t, rh(e));
  }
}
function e1(n) {
  var e = !n, t = Object.prototype.toString.call(n) === "[object Object]" && !n.addEventListener;
  Qa(e, ["tippy() was passed", "`" + String(n) + "`", "as its targets (first) argument. Valid types are: String, Element,", "Element[], or NodeList."].join(" ")), Qa(t, ["tippy() was passed a plain object which is not supported as an argument", "for virtual positioning. Use props.getReferenceClientRect instead."].join(" "));
}
var oh = {
  animateFill: !1,
  followCursor: !1,
  inlinePositioning: !1,
  sticky: !1
}, t1 = {
  allowHTML: !1,
  animation: "fade",
  arrow: !0,
  content: "",
  inertia: !1,
  maxWidth: 350,
  role: "tooltip",
  theme: "",
  zIndex: 9999
}, $e = Object.assign({
  appendTo: eh,
  aria: {
    content: "auto",
    expanded: "auto"
  },
  delay: 0,
  duration: [300, 250],
  getReferenceClientRect: null,
  hideOnClick: !0,
  ignoreAttributes: !1,
  interactive: !1,
  interactiveBorder: 2,
  interactiveDebounce: 0,
  moveTransition: "",
  offset: [0, 10],
  onAfterUpdate: function() {
  },
  onBeforeUpdate: function() {
  },
  onCreate: function() {
  },
  onDestroy: function() {
  },
  onHidden: function() {
  },
  onHide: function() {
  },
  onMount: function() {
  },
  onShow: function() {
  },
  onShown: function() {
  },
  onTrigger: function() {
  },
  onUntrigger: function() {
  },
  onClickOutside: function() {
  },
  placement: "top",
  plugins: [],
  popperOptions: {},
  render: null,
  showOnCreate: !1,
  touch: !0,
  trigger: "mouseenter focus",
  triggerTarget: null
}, oh, t1), n1 = Object.keys($e), r1 = function(e) {
  process.env.NODE_ENV !== "production" && ih(e, []);
  var t = Object.keys(e);
  t.forEach(function(r) {
    $e[r] = e[r];
  });
};
function sh(n) {
  var e = n.plugins || [], t = e.reduce(function(r, o) {
    var s = o.name, i = o.defaultValue;
    if (s) {
      var a;
      r[s] = n[s] !== void 0 ? n[s] : (a = $e[s]) != null ? a : i;
    }
    return r;
  }, {});
  return Object.assign({}, n, t);
}
function o1(n, e) {
  var t = e ? Object.keys(sh(Object.assign({}, $e, {
    plugins: e
  }))) : n1, r = t.reduce(function(o, s) {
    var i = (n.getAttribute("data-tippy-" + s) || "").trim();
    if (!i)
      return o;
    if (s === "content")
      o[s] = i;
    else
      try {
        o[s] = JSON.parse(i);
      } catch {
        o[s] = i;
      }
    return o;
  }, {});
  return r;
}
function Uu(n, e) {
  var t = Object.assign({}, e, {
    content: th(e.content, [n])
  }, e.ignoreAttributes ? {} : o1(n, e.plugins));
  return t.aria = Object.assign({}, $e.aria, t.aria), t.aria = {
    expanded: t.aria.expanded === "auto" ? e.interactive : t.aria.expanded,
    content: t.aria.content === "auto" ? e.interactive ? null : "describedby" : t.aria.content
  }, t;
}
function ih(n, e) {
  n === void 0 && (n = {}), e === void 0 && (e = []);
  var t = Object.keys(n);
  t.forEach(function(r) {
    var o = Bk($e, Object.keys(oh)), s = !Pk(o, r);
    s && (s = e.filter(function(i) {
      return i.name === r;
    }).length === 0), It(s, ["`" + r + "`", "is not a valid prop. You may have spelled it incorrectly, or if it's", "a plugin, forgot to pass it in an array as props.plugins.", `

`, `All props: https://atomiks.github.io/tippyjs/v6/all-props/
`, "Plugins: https://atomiks.github.io/tippyjs/v6/plugins/"].join(" "));
  });
}
var s1 = function() {
  return "innerHTML";
};
function Xa(n, e) {
  n[s1()] = e;
}
function Wu(n) {
  var e = oo();
  return n === !0 ? e.className = Qp : (e.className = Xp, xo(n) ? e.appendChild(n) : Xa(e, n)), e;
}
function Ku(n, e) {
  xo(e.content) ? (Xa(n, ""), n.appendChild(e.content)) : typeof e.content != "function" && (e.allowHTML ? Xa(n, e.content) : n.textContent = e.content);
}
function el(n) {
  var e = n.firstElementChild, t = _s(e.children);
  return {
    box: e,
    content: t.find(function(r) {
      return r.classList.contains(Yp);
    }),
    arrow: t.find(function(r) {
      return r.classList.contains(Qp) || r.classList.contains(Xp);
    }),
    backdrop: t.find(function(r) {
      return r.classList.contains(Ik);
    })
  };
}
function ah(n) {
  var e = oo(), t = oo();
  t.className = Rk, t.setAttribute("data-state", "hidden"), t.setAttribute("tabindex", "-1");
  var r = oo();
  r.className = Yp, r.setAttribute("data-state", "hidden"), Ku(r, n.props), e.appendChild(t), t.appendChild(r), o(n.props, n.props);
  function o(s, i) {
    var a = el(e), l = a.box, c = a.content, u = a.arrow;
    i.theme ? l.setAttribute("data-theme", i.theme) : l.removeAttribute("data-theme"), typeof i.animation == "string" ? l.setAttribute("data-animation", i.animation) : l.removeAttribute("data-animation"), i.inertia ? l.setAttribute("data-inertia", "") : l.removeAttribute("data-inertia"), l.style.maxWidth = typeof i.maxWidth == "number" ? i.maxWidth + "px" : i.maxWidth, i.role ? l.setAttribute("role", i.role) : l.removeAttribute("role"), (s.content !== i.content || s.allowHTML !== i.allowHTML) && Ku(c, n.props), i.arrow ? u ? s.arrow !== i.arrow && (l.removeChild(u), l.appendChild(Wu(i.arrow))) : l.appendChild(Wu(i.arrow)) : u && l.removeChild(u);
  }
  return {
    popper: e,
    onUpdate: o
  };
}
ah.$$tippy = !0;
var i1 = 1, Qo = [], na = [];
function a1(n, e) {
  var t = Uu(n, Object.assign({}, $e, sh(zu(e)))), r, o, s, i = !1, a = !1, l = !1, c = !1, u, d, f, p = [], h = Fu(Fo, t.interactiveDebounce), m, g = i1++, v = null, b = qk(t.plugins), x = {
    // Is the instance currently enabled?
    isEnabled: !0,
    // Is the tippy currently showing and not transitioning out?
    isVisible: !1,
    // Has the instance been destroyed?
    isDestroyed: !1,
    // Is the tippy currently mounted to the DOM?
    isMounted: !1,
    // Has the tippy finished transitioning in?
    isShown: !1
  }, y = {
    // properties
    id: g,
    reference: n,
    popper: oo(),
    popperInstance: v,
    props: t,
    state: x,
    plugins: b,
    // methods
    clearDelayTimeouts: Vo,
    setProps: jo,
    setContent: Uo,
    show: Cm,
    hide: Em,
    hideWithInteractivity: Am,
    enable: jr,
    disable: Ho,
    unmount: Tm,
    destroy: Mm
  };
  if (!t.render)
    return process.env.NODE_ENV !== "production" && Qa(!0, "render() function has not been supplied."), y;
  var w = t.render(y), k = w.popper, S = w.onUpdate;
  k.setAttribute("data-tippy-root", ""), k.id = "tippy-" + y.id, y.popper = k, n._tippy = y, k._tippy = y;
  var E = b.map(function(C) {
    return C.fn(y);
  }), T = n.hasAttribute("aria-expanded");
  return Yn(), he(), z(), K("onCreate", [y]), t.showOnCreate && Vr(), k.addEventListener("mouseenter", function() {
    y.props.interactive && y.state.isVisible && y.clearDelayTimeouts();
  }), k.addEventListener("mouseleave", function() {
    y.props.interactive && y.props.trigger.indexOf("mouseenter") >= 0 && A().addEventListener("mousemove", h);
  }), y;
  function D() {
    var C = y.props.touch;
    return Array.isArray(C) ? C : [C, 0];
  }
  function _() {
    return D()[0] === "hold";
  }
  function F() {
    var C;
    return !!((C = y.props.render) != null && C.$$tippy);
  }
  function P() {
    return m || n;
  }
  function A() {
    var C = P().parentNode;
    return C ? Uk(C) : document;
  }
  function q() {
    return el(k);
  }
  function L(C) {
    return y.state.isMounted && !y.state.isVisible || ht.isTouch || u && u.type === "focus" ? 0 : Xi(y.props.delay, C ? 0 : 1, $e.delay);
  }
  function z(C) {
    C === void 0 && (C = !1), k.style.pointerEvents = y.props.interactive && !C ? "" : "none", k.style.zIndex = "" + y.props.zIndex;
  }
  function K(C, I, H) {
    if (H === void 0 && (H = !0), E.forEach(function(G) {
      G[C] && G[C].apply(G, I);
    }), H) {
      var ee;
      (ee = y.props)[C].apply(ee, I);
    }
  }
  function ne() {
    var C = y.props.aria;
    if (C.content) {
      var I = "aria-" + C.content, H = k.id, ee = ir(y.props.triggerTarget || n);
      ee.forEach(function(G) {
        var Oe = G.getAttribute(I);
        if (y.state.isVisible)
          G.setAttribute(I, Oe ? Oe + " " + H : H);
        else {
          var We = Oe && Oe.replace(H, "").trim();
          We ? G.setAttribute(I, We) : G.removeAttribute(I);
        }
      });
    }
  }
  function he() {
    if (!(T || !y.props.aria.expanded)) {
      var C = ir(y.props.triggerTarget || n);
      C.forEach(function(I) {
        y.props.interactive ? I.setAttribute("aria-expanded", y.state.isVisible && I === P() ? "true" : "false") : I.removeAttribute("aria-expanded");
      });
    }
  }
  function Se() {
    A().removeEventListener("mousemove", h), Qo = Qo.filter(function(C) {
      return C !== h;
    });
  }
  function Me(C) {
    if (!(ht.isTouch && (l || C.type === "mousedown"))) {
      var I = C.composedPath && C.composedPath()[0] || C.target;
      if (!(y.props.interactive && Hu(k, I))) {
        if (ir(y.props.triggerTarget || n).some(function(H) {
          return Hu(H, I);
        })) {
          if (ht.isTouch || y.state.isVisible && y.props.trigger.indexOf("click") >= 0)
            return;
        } else
          K("onClickOutside", [y, C]);
        y.props.hideOnClick === !0 && (y.clearDelayTimeouts(), y.hide(), a = !0, setTimeout(function() {
          a = !1;
        }), y.state.isMounted || Ot());
      }
    }
  }
  function Ue() {
    l = !0;
  }
  function Mt() {
    l = !1;
  }
  function rt() {
    var C = A();
    C.addEventListener("mousedown", Me, !0), C.addEventListener("touchend", Me, kn), C.addEventListener("touchstart", Mt, kn), C.addEventListener("touchmove", Ue, kn);
  }
  function Ot() {
    var C = A();
    C.removeEventListener("mousedown", Me, !0), C.removeEventListener("touchend", Me, kn), C.removeEventListener("touchstart", Mt, kn), C.removeEventListener("touchmove", Ue, kn);
  }
  function Jn(C, I) {
    Zn(C, function() {
      !y.state.isVisible && k.parentNode && k.parentNode.contains(k) && I();
    });
  }
  function Dt(C, I) {
    Zn(C, I);
  }
  function Zn(C, I) {
    var H = q().box;
    function ee(G) {
      G.target === H && (ta(H, "remove", ee), I());
    }
    if (C === 0)
      return I();
    ta(H, "remove", d), ta(H, "add", ee), d = ee;
  }
  function jt(C, I, H) {
    H === void 0 && (H = !1);
    var ee = ir(y.props.triggerTarget || n);
    ee.forEach(function(G) {
      G.addEventListener(C, I, H), p.push({
        node: G,
        eventType: C,
        handler: I,
        options: H
      });
    });
  }
  function Yn() {
    _() && (jt("touchstart", zr, {
      passive: !0
    }), jt("touchend", qo, {
      passive: !0
    })), Fk(y.props.trigger).forEach(function(C) {
      if (C !== "manual")
        switch (jt(C, zr), C) {
          case "mouseenter":
            jt("mouseleave", qo);
            break;
          case "focus":
            jt(Yk ? "focusout" : "blur", $r);
            break;
          case "focusin":
            jt("focusout", $r);
            break;
        }
    });
  }
  function Bo() {
    p.forEach(function(C) {
      var I = C.node, H = C.eventType, ee = C.handler, G = C.options;
      I.removeEventListener(H, ee, G);
    }), p = [];
  }
  function zr(C) {
    var I, H = !1;
    if (!(!y.state.isEnabled || Hr(C) || a)) {
      var ee = ((I = u) == null ? void 0 : I.type) === "focus";
      u = C, m = C.currentTarget, he(), !y.state.isVisible && Hk(C) && Qo.forEach(function(G) {
        return G(C);
      }), C.type === "click" && (y.props.trigger.indexOf("mouseenter") < 0 || i) && y.props.hideOnClick !== !1 && y.state.isVisible ? H = !0 : Vr(C), C.type === "click" && (i = !H), H && !ee && gn(C);
    }
  }
  function Fo(C) {
    var I = C.target, H = P().contains(I) || k.contains(I);
    if (!(C.type === "mousemove" && H)) {
      var ee = Ut().concat(k).map(function(G) {
        var Oe, We = G._tippy, Qn = (Oe = We.popperInstance) == null ? void 0 : Oe.state;
        return Qn ? {
          popperRect: G.getBoundingClientRect(),
          popperState: Qn,
          props: t
        } : null;
      }).filter(Boolean);
      Wk(ee, C) && (Se(), gn(C));
    }
  }
  function qo(C) {
    var I = Hr(C) || y.props.trigger.indexOf("click") >= 0 && i;
    if (!I) {
      if (y.props.interactive) {
        y.hideWithInteractivity(C);
        return;
      }
      gn(C);
    }
  }
  function $r(C) {
    y.props.trigger.indexOf("focusin") < 0 && C.target !== P() || y.props.interactive && C.relatedTarget && k.contains(C.relatedTarget) || gn(C);
  }
  function Hr(C) {
    return ht.isTouch ? _() !== C.type.indexOf("touch") >= 0 : !1;
  }
  function zo() {
    $o();
    var C = y.props, I = C.popperOptions, H = C.placement, ee = C.offset, G = C.getReferenceClientRect, Oe = C.moveTransition, We = F() ? el(k).arrow : null, Qn = G ? {
      getBoundingClientRect: G,
      contextElement: G.contextElement || P()
    } : n, Ac = {
      name: "$$tippy",
      enabled: !0,
      phase: "beforeWrite",
      requires: ["computeStyles"],
      fn: function(Wo) {
        var Xn = Wo.state;
        if (F()) {
          var Om = q(), Di = Om.box;
          ["placement", "reference-hidden", "escaped"].forEach(function(Ko) {
            Ko === "placement" ? Di.setAttribute("data-placement", Xn.placement) : Xn.attributes.popper["data-popper-" + Ko] ? Di.setAttribute("data-" + Ko, "") : Di.removeAttribute("data-" + Ko);
          }), Xn.attributes.popper = {};
        }
      }
    }, yn = [{
      name: "offset",
      options: {
        offset: ee
      }
    }, {
      name: "preventOverflow",
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    }, {
      name: "flip",
      options: {
        padding: 5
      }
    }, {
      name: "computeStyles",
      options: {
        adaptive: !Oe
      }
    }, Ac];
    F() && We && yn.push({
      name: "arrow",
      options: {
        element: We,
        padding: 3
      }
    }), yn.push.apply(yn, (I == null ? void 0 : I.modifiers) || []), y.popperInstance = Lk(Qn, k, Object.assign({}, I, {
      placement: H,
      onFirstUpdate: f,
      modifiers: yn
    }));
  }
  function $o() {
    y.popperInstance && (y.popperInstance.destroy(), y.popperInstance = null);
  }
  function _t() {
    var C = y.props.appendTo, I, H = P();
    y.props.interactive && C === eh || C === "parent" ? I = H.parentNode : I = th(C, [H]), I.contains(k) || I.appendChild(k), y.state.isMounted = !0, zo(), process.env.NODE_ENV !== "production" && It(y.props.interactive && C === $e.appendTo && H.nextElementSibling !== k, ["Interactive tippy element may not be accessible via keyboard", "navigation because it is not directly after the reference element", "in the DOM source order.", `

`, "Using a wrapper <div> or <span> tag around the reference element", "solves this by creating a new parentNode context.", `

`, "Specifying `appendTo: document.body` silences this warning, but it", "assumes you are using a focus management solution to handle", "keyboard navigation.", `

`, "See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity"].join(" "));
  }
  function Ut() {
    return _s(k.querySelectorAll("[data-tippy-root]"));
  }
  function Vr(C) {
    y.clearDelayTimeouts(), C && K("onTrigger", [y, C]), rt();
    var I = L(!0), H = D(), ee = H[0], G = H[1];
    ht.isTouch && ee === "hold" && G && (I = G), I ? r = setTimeout(function() {
      y.show();
    }, I) : y.show();
  }
  function gn(C) {
    if (y.clearDelayTimeouts(), K("onUntrigger", [y, C]), !y.state.isVisible) {
      Ot();
      return;
    }
    if (!(y.props.trigger.indexOf("mouseenter") >= 0 && y.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(C.type) >= 0 && i)) {
      var I = L(!1);
      I ? o = setTimeout(function() {
        y.state.isVisible && y.hide();
      }, I) : s = requestAnimationFrame(function() {
        y.hide();
      });
    }
  }
  function jr() {
    y.state.isEnabled = !0;
  }
  function Ho() {
    y.hide(), y.state.isEnabled = !1;
  }
  function Vo() {
    clearTimeout(r), clearTimeout(o), cancelAnimationFrame(s);
  }
  function jo(C) {
    if (process.env.NODE_ENV !== "production" && It(y.state.isDestroyed, tr("setProps")), !y.state.isDestroyed) {
      K("onBeforeUpdate", [y, C]), Bo();
      var I = y.props, H = Uu(n, Object.assign({}, I, zu(C), {
        ignoreAttributes: !0
      }));
      y.props = H, Yn(), I.interactiveDebounce !== H.interactiveDebounce && (Se(), h = Fu(Fo, H.interactiveDebounce)), I.triggerTarget && !H.triggerTarget ? ir(I.triggerTarget).forEach(function(ee) {
        ee.removeAttribute("aria-expanded");
      }) : H.triggerTarget && n.removeAttribute("aria-expanded"), he(), z(), S && S(I, H), y.popperInstance && (zo(), Ut().forEach(function(ee) {
        requestAnimationFrame(ee._tippy.popperInstance.forceUpdate);
      })), K("onAfterUpdate", [y, C]);
    }
  }
  function Uo(C) {
    y.setProps({
      content: C
    });
  }
  function Cm() {
    process.env.NODE_ENV !== "production" && It(y.state.isDestroyed, tr("show"));
    var C = y.state.isVisible, I = y.state.isDestroyed, H = !y.state.isEnabled, ee = ht.isTouch && !y.props.touch, G = Xi(y.props.duration, 0, $e.duration);
    if (!(C || I || H || ee) && !P().hasAttribute("disabled") && (K("onShow", [y], !1), y.props.onShow(y) !== !1)) {
      if (y.state.isVisible = !0, F() && (k.style.visibility = "visible"), z(), rt(), y.state.isMounted || (k.style.transition = "none"), F()) {
        var Oe = q(), We = Oe.box, Qn = Oe.content;
        ea([We, Qn], 0);
      }
      f = function() {
        var yn;
        if (!(!y.state.isVisible || c)) {
          if (c = !0, k.offsetHeight, k.style.transition = y.props.moveTransition, F() && y.props.animation) {
            var Oi = q(), Wo = Oi.box, Xn = Oi.content;
            ea([Wo, Xn], G), $u([Wo, Xn], "visible");
          }
          ne(), he(), qu(na, y), (yn = y.popperInstance) == null || yn.forceUpdate(), K("onMount", [y]), y.props.animation && F() && Dt(G, function() {
            y.state.isShown = !0, K("onShown", [y]);
          });
        }
      }, _t();
    }
  }
  function Em() {
    process.env.NODE_ENV !== "production" && It(y.state.isDestroyed, tr("hide"));
    var C = !y.state.isVisible, I = y.state.isDestroyed, H = !y.state.isEnabled, ee = Xi(y.props.duration, 1, $e.duration);
    if (!(C || I || H) && (K("onHide", [y], !1), y.props.onHide(y) !== !1)) {
      if (y.state.isVisible = !1, y.state.isShown = !1, c = !1, i = !1, F() && (k.style.visibility = "hidden"), Se(), Ot(), z(!0), F()) {
        var G = q(), Oe = G.box, We = G.content;
        y.props.animation && (ea([Oe, We], ee), $u([Oe, We], "hidden"));
      }
      ne(), he(), y.props.animation ? F() && Jn(ee, y.unmount) : y.unmount();
    }
  }
  function Am(C) {
    process.env.NODE_ENV !== "production" && It(y.state.isDestroyed, tr("hideWithInteractivity")), A().addEventListener("mousemove", h), qu(Qo, h), h(C);
  }
  function Tm() {
    process.env.NODE_ENV !== "production" && It(y.state.isDestroyed, tr("unmount")), y.state.isVisible && y.hide(), y.state.isMounted && ($o(), Ut().forEach(function(C) {
      C._tippy.unmount();
    }), k.parentNode && k.parentNode.removeChild(k), na = na.filter(function(C) {
      return C !== y;
    }), y.state.isMounted = !1, K("onHidden", [y]));
  }
  function Mm() {
    process.env.NODE_ENV !== "production" && It(y.state.isDestroyed, tr("destroy")), !y.state.isDestroyed && (y.clearDelayTimeouts(), y.unmount(), Bo(), delete n._tippy, y.state.isDestroyed = !0, K("onDestroy", [y]));
  }
}
function Gn(n, e) {
  e === void 0 && (e = {});
  var t = $e.plugins.concat(e.plugins || []);
  process.env.NODE_ENV !== "production" && (e1(n), ih(e, t)), Jk();
  var r = Object.assign({}, e, {
    plugins: t
  }), o = jk(n);
  if (process.env.NODE_ENV !== "production") {
    var s = xo(r.content), i = o.length > 1;
    It(s && i, ["tippy() was passed an Element as the `content` prop, but more than", "one tippy instance was created by this invocation. This means the", "content element will only be appended to the last tippy instance.", `

`, "Instead, pass the .innerHTML of the element, or use a function that", "returns a cloned version of the element instead.", `

`, `1) content: element.innerHTML
`, "2) content: () => element.cloneNode(true)"].join(" "));
  }
  var a = o.reduce(function(l, c) {
    var u = c && a1(c, r);
    return u && l.push(u), l;
  }, []);
  return xo(n) ? a[0] : a;
}
Gn.defaultProps = $e;
Gn.setDefaultProps = r1;
Gn.currentInput = ht;
Object.assign({}, Vp, {
  effect: function(e) {
    var t = e.state, r = {
      popper: {
        position: t.options.strategy,
        left: "0",
        top: "0",
        margin: "0"
      },
      arrow: {
        position: "absolute"
      },
      reference: {}
    };
    Object.assign(t.elements.popper.style, r.popper), t.styles = r, t.elements.arrow && Object.assign(t.elements.arrow.style, r.arrow);
  }
});
Gn.setDefaultProps({
  render: ah
});
class l1 {
  constructor({ editor: e, element: t, view: r, tippyOptions: o = {}, updateDelay: s = 250, shouldShow: i }) {
    this.preventHide = !1, this.shouldShow = ({ view: a, state: l, from: c, to: u }) => {
      const { doc: d, selection: f } = l, { empty: p } = f, h = !d.textBetween(c, u).length && Fl(l.selection), m = this.element.contains(document.activeElement);
      return !(!(a.hasFocus() || m) || p || h || !this.editor.isEditable);
    }, this.mousedownHandler = () => {
      this.preventHide = !0;
    }, this.dragstartHandler = () => {
      this.hide();
    }, this.focusHandler = () => {
      setTimeout(() => this.update(this.editor.view));
    }, this.blurHandler = ({ event: a }) => {
      var l;
      if (this.preventHide) {
        this.preventHide = !1;
        return;
      }
      a != null && a.relatedTarget && (!((l = this.element.parentNode) === null || l === void 0) && l.contains(a.relatedTarget)) || this.hide();
    }, this.tippyBlurHandler = (a) => {
      this.blurHandler({ event: a });
    }, this.handleDebouncedUpdate = (a, l) => {
      const c = !(l != null && l.selection.eq(a.state.selection)), u = !(l != null && l.doc.eq(a.state.doc));
      !c && !u || (this.updateDebounceTimer && clearTimeout(this.updateDebounceTimer), this.updateDebounceTimer = window.setTimeout(() => {
        this.updateHandler(a, c, u, l);
      }, this.updateDelay));
    }, this.updateHandler = (a, l, c, u) => {
      var d, f, p;
      const { state: h, composing: m } = a, { selection: g } = h;
      if (m || !l && !c)
        return;
      this.createTooltip();
      const { ranges: b } = g, x = Math.min(...b.map((k) => k.$from.pos)), y = Math.max(...b.map((k) => k.$to.pos));
      if (!((d = this.shouldShow) === null || d === void 0 ? void 0 : d.call(this, {
        editor: this.editor,
        view: a,
        state: h,
        oldState: u,
        from: x,
        to: y
      }))) {
        this.hide();
        return;
      }
      (f = this.tippy) === null || f === void 0 || f.setProps({
        getReferenceClientRect: ((p = this.tippyOptions) === null || p === void 0 ? void 0 : p.getReferenceClientRect) || (() => {
          if (Qv(h.selection)) {
            let k = a.nodeDOM(x);
            const S = k.dataset.nodeViewWrapper ? k : k.querySelector("[data-node-view-wrapper]");
            if (S && (k = S.firstChild), k)
              return k.getBoundingClientRect();
          }
          return qp(a, x, y);
        })
      }), this.show();
    }, this.editor = e, this.element = t, this.view = r, this.updateDelay = s, i && (this.shouldShow = i), this.element.addEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.view.dom.addEventListener("dragstart", this.dragstartHandler), this.editor.on("focus", this.focusHandler), this.editor.on("blur", this.blurHandler), this.tippyOptions = o, this.element.remove(), this.element.style.visibility = "visible";
  }
  createTooltip() {
    const { element: e } = this.editor.options, t = !!e.parentElement;
    this.tippy || !t || (this.tippy = Gn(e, {
      duration: 0,
      getReferenceClientRect: null,
      content: this.element,
      interactive: !0,
      trigger: "manual",
      placement: "top",
      hideOnClick: "toggle",
      ...this.tippyOptions
    }), this.tippy.popper.firstChild && this.tippy.popper.firstChild.addEventListener("blur", this.tippyBlurHandler));
  }
  update(e, t) {
    const { state: r } = e, o = r.selection.$from.pos !== r.selection.$to.pos;
    if (this.updateDelay > 0 && o) {
      this.handleDebouncedUpdate(e, t);
      return;
    }
    const s = !(t != null && t.selection.eq(e.state.selection)), i = !(t != null && t.doc.eq(e.state.doc));
    this.updateHandler(e, s, i, t);
  }
  show() {
    var e;
    (e = this.tippy) === null || e === void 0 || e.show();
  }
  hide() {
    var e;
    (e = this.tippy) === null || e === void 0 || e.hide();
  }
  destroy() {
    var e, t;
    !((e = this.tippy) === null || e === void 0) && e.popper.firstChild && this.tippy.popper.firstChild.removeEventListener("blur", this.tippyBlurHandler), (t = this.tippy) === null || t === void 0 || t.destroy(), this.element.removeEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.view.dom.removeEventListener("dragstart", this.dragstartHandler), this.editor.off("focus", this.focusHandler), this.editor.off("blur", this.blurHandler);
  }
}
const lh = (n) => new fe({
  key: typeof n.pluginKey == "string" ? new Te(n.pluginKey) : n.pluginKey,
  view: (e) => new l1({ view: e, ...n })
});
ue.create({
  name: "bubbleMenu",
  addOptions() {
    return {
      element: null,
      tippyOptions: {},
      pluginKey: "bubbleMenu",
      updateDelay: void 0,
      shouldShow: null
    };
  },
  addProseMirrorPlugins() {
    return this.options.element ? [
      lh({
        pluginKey: this.options.pluginKey,
        editor: this.editor,
        element: this.options.element,
        tippyOptions: this.options.tippyOptions,
        updateDelay: this.options.updateDelay,
        shouldShow: this.options.shouldShow
      })
    ] : [];
  }
});
class c1 {
  constructor({ editor: e, element: t, view: r, tippyOptions: o = {}, shouldShow: s }) {
    this.preventHide = !1, this.shouldShow = ({ view: i, state: a }) => {
      const { selection: l } = a, { $anchor: c, empty: u } = l, d = c.depth === 1, f = c.parent.isTextblock && !c.parent.type.spec.code && !c.parent.textContent;
      return !(!i.hasFocus() || !u || !d || !f || !this.editor.isEditable);
    }, this.mousedownHandler = () => {
      this.preventHide = !0;
    }, this.focusHandler = () => {
      setTimeout(() => this.update(this.editor.view));
    }, this.blurHandler = ({ event: i }) => {
      var a;
      if (this.preventHide) {
        this.preventHide = !1;
        return;
      }
      i != null && i.relatedTarget && (!((a = this.element.parentNode) === null || a === void 0) && a.contains(i.relatedTarget)) || this.hide();
    }, this.tippyBlurHandler = (i) => {
      this.blurHandler({ event: i });
    }, this.editor = e, this.element = t, this.view = r, s && (this.shouldShow = s), this.element.addEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.editor.on("focus", this.focusHandler), this.editor.on("blur", this.blurHandler), this.tippyOptions = o, this.element.remove(), this.element.style.visibility = "visible";
  }
  createTooltip() {
    const { element: e } = this.editor.options, t = !!e.parentElement;
    this.tippy || !t || (this.tippy = Gn(e, {
      duration: 0,
      getReferenceClientRect: null,
      content: this.element,
      interactive: !0,
      trigger: "manual",
      placement: "right",
      hideOnClick: "toggle",
      ...this.tippyOptions
    }), this.tippy.popper.firstChild && this.tippy.popper.firstChild.addEventListener("blur", this.tippyBlurHandler));
  }
  update(e, t) {
    var r, o, s;
    const { state: i } = e, { doc: a, selection: l } = i, { from: c, to: u } = l;
    if (t && t.doc.eq(a) && t.selection.eq(l))
      return;
    if (this.createTooltip(), !((r = this.shouldShow) === null || r === void 0 ? void 0 : r.call(this, {
      editor: this.editor,
      view: e,
      state: i,
      oldState: t
    }))) {
      this.hide();
      return;
    }
    (o = this.tippy) === null || o === void 0 || o.setProps({
      getReferenceClientRect: ((s = this.tippyOptions) === null || s === void 0 ? void 0 : s.getReferenceClientRect) || (() => qp(e, c, u))
    }), this.show();
  }
  show() {
    var e;
    (e = this.tippy) === null || e === void 0 || e.show();
  }
  hide() {
    var e;
    (e = this.tippy) === null || e === void 0 || e.hide();
  }
  destroy() {
    var e, t;
    !((e = this.tippy) === null || e === void 0) && e.popper.firstChild && this.tippy.popper.firstChild.removeEventListener("blur", this.tippyBlurHandler), (t = this.tippy) === null || t === void 0 || t.destroy(), this.element.removeEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.editor.off("focus", this.focusHandler), this.editor.off("blur", this.blurHandler);
  }
}
const ch = (n) => new fe({
  key: typeof n.pluginKey == "string" ? new Te(n.pluginKey) : n.pluginKey,
  view: (e) => new c1({ view: e, ...n })
});
ue.create({
  name: "floatingMenu",
  addOptions() {
    return {
      element: null,
      tippyOptions: {},
      pluginKey: "floatingMenu",
      shouldShow: null
    };
  },
  addProseMirrorPlugins() {
    return this.options.element ? [
      ch({
        pluginKey: this.options.pluginKey,
        editor: this.editor,
        element: this.options.element,
        tippyOptions: this.options.tippyOptions,
        shouldShow: this.options.shouldShow
      })
    ] : [];
  }
});
const u1 = le({
  name: "BubbleMenu",
  props: {
    pluginKey: {
      type: [String, Object],
      default: "bubbleMenu"
    },
    editor: {
      type: Object,
      required: !0
    },
    updateDelay: {
      type: Number,
      default: void 0
    },
    tippyOptions: {
      type: Object,
      default: () => ({})
    },
    shouldShow: {
      type: Function,
      default: null
    }
  },
  setup(n, { slots: e }) {
    const t = J(null);
    return un(() => {
      const { updateDelay: r, editor: o, pluginKey: s, shouldShow: i, tippyOptions: a } = n;
      o.registerPlugin(lh({
        updateDelay: r,
        editor: o,
        element: t.value,
        pluginKey: s,
        shouldShow: i,
        tippyOptions: a
      }));
    }), ti(() => {
      const { pluginKey: r, editor: o } = n;
      o.unregisterPlugin(r);
    }), () => {
      var r;
      return se("div", { ref: t }, (r = e.default) === null || r === void 0 ? void 0 : r.call(e));
    };
  }
});
function Gu(n) {
  return Dm((e, t) => ({
    get() {
      return e(), n;
    },
    set(r) {
      n = r, requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          t();
        });
      });
    }
  }));
}
class d1 extends Ab {
  constructor(e = {}) {
    return super(e), this.vueRenderers = ni(/* @__PURE__ */ new Map()), this.contentComponent = null, this.reactiveState = Gu(this.view.state), this.reactiveExtensionStorage = Gu(this.extensionStorage), this.on("transaction", () => {
      this.reactiveState.value = this.view.state, this.reactiveExtensionStorage.value = this.extensionStorage;
    }), gf(this);
  }
  get state() {
    return this.reactiveState ? this.reactiveState.value : this.view.state;
  }
  get storage() {
    return this.reactiveExtensionStorage ? this.reactiveExtensionStorage.value : super.storage;
  }
  /**
   * Register a ProseMirror plugin.
   */
  registerPlugin(e, t) {
    super.registerPlugin(e, t), this.reactiveState.value = this.view.state;
  }
  /**
   * Unregister a ProseMirror plugin.
   */
  unregisterPlugin(e) {
    super.unregisterPlugin(e), this.reactiveState.value = this.view.state;
  }
}
const f1 = le({
  name: "EditorContent",
  props: {
    editor: {
      default: null,
      type: Object
    }
  },
  setup(n) {
    const e = J(), t = pf();
    return Et(() => {
      const r = n.editor;
      r && r.options.element && e.value && hf(() => {
        if (!e.value || !r.options.element.firstChild)
          return;
        const o = ae(e.value);
        e.value.append(...r.options.element.childNodes), r.contentComponent = t.ctx._, r.setOptions({
          element: o
        }), r.createNodeViews();
      });
    }), ti(() => {
      const r = n.editor;
      if (!r || (r.isDestroyed || r.view.setProps({
        nodeViews: {}
      }), r.contentComponent = null, !r.options.element.firstChild))
        return;
      const o = document.createElement("div");
      o.append(...r.options.element.childNodes), r.setOptions({
        element: o
      });
    }), { rootEl: e };
  },
  render() {
    const n = [];
    return this.editor && this.editor.vueRenderers.forEach((e) => {
      const t = se(mf, {
        to: e.teleportElement,
        key: e.id
      }, se(e.component, {
        ref: e.id,
        ...e.props
      }));
      n.push(t);
    }), se("div", {
      ref: (e) => {
        this.rootEl = e;
      }
    }, ...n);
  }
});
le({
  name: "FloatingMenu",
  props: {
    pluginKey: {
      // TODO: TypeScript breaks :(
      // type: [String, Object as PropType<Exclude<FloatingMenuPluginProps['pluginKey'], string>>],
      type: null,
      default: "floatingMenu"
    },
    editor: {
      type: Object,
      required: !0
    },
    tippyOptions: {
      type: Object,
      default: () => ({})
    },
    shouldShow: {
      type: Function,
      default: null
    }
  },
  setup(n, { slots: e }) {
    const t = J(null);
    return un(() => {
      const { pluginKey: r, editor: o, tippyOptions: s, shouldShow: i } = n;
      o.registerPlugin(ch({
        pluginKey: r,
        editor: o,
        element: t.value,
        tippyOptions: s,
        shouldShow: i
      }));
    }), ti(() => {
      const { pluginKey: r, editor: o } = n;
      o.unregisterPlugin(r);
    }), () => {
      var r;
      return se("div", { ref: t }, (r = e.default) === null || r === void 0 ? void 0 : r.call(e));
    };
  }
});
le({
  name: "NodeViewContent",
  props: {
    as: {
      type: String,
      default: "div"
    }
  },
  render() {
    return se(this.as, {
      style: {
        whiteSpace: "pre-wrap"
      },
      "data-node-view-content": ""
    });
  }
});
le({
  name: "NodeViewWrapper",
  props: {
    as: {
      type: String,
      default: "div"
    }
  },
  inject: ["onDragStart", "decorationClasses"],
  render() {
    var n, e;
    return se(this.as, {
      // @ts-ignore
      class: this.decorationClasses,
      style: {
        whiteSpace: "normal"
      },
      "data-node-view-wrapper": "",
      // @ts-ignore (https://github.com/vuejs/vue-next/issues/3031)
      onDragstart: this.onDragStart
    }, (e = (n = this.$slots).default) === null || e === void 0 ? void 0 : e.call(n));
  }
});
const p1 = (n = {}) => {
  const e = kl();
  return un(() => {
    e.value = new d1(n);
  }), ti(() => {
    var t;
    (t = e.value) === null || t === void 0 || t.destroy();
  }), e;
};
class h1 {
  constructor(e, { props: t = {}, editor: r }) {
    if (this.id = Math.floor(Math.random() * 4294967295).toString(), this.editor = r, this.component = gf(e), this.teleportElement = document.createElement("div"), this.element = this.teleportElement, this.props = ni(t), this.editor.vueRenderers.set(this.id, this), this.editor.contentComponent) {
      if (this.editor.contentComponent.update(), this.teleportElement.children.length !== 1)
        throw Error("VueRenderer doesn’t support multiple child elements.");
      this.element = this.teleportElement.firstElementChild;
    }
  }
  get ref() {
    var e;
    return (e = this.editor.contentComponent) === null || e === void 0 ? void 0 : e.refs[this.id];
  }
  updateProps(e = {}) {
    Object.entries(e).forEach(([t, r]) => {
      this.props[t] = r;
    });
  }
  destroy() {
    this.editor.vueRenderers.delete(this.id);
  }
}
function m1(n) {
  return _m() ? (Nm(n), !0) : !1;
}
function So(n) {
  return typeof n == "function" ? n() : ae(n);
}
const g1 = typeof window < "u" && typeof document < "u", y1 = Object.prototype.toString, v1 = (n) => y1.call(n) === "[object Object]", tl = () => {
};
function uh(n, e) {
  function t(...r) {
    return new Promise((o, s) => {
      Promise.resolve(n(() => e.apply(this, r), { fn: e, thisArg: this, args: r })).then(o).catch(s);
    });
  }
  return t;
}
const dh = (n) => n();
function b1(n, e = {}) {
  let t, r, o = tl;
  const s = (a) => {
    clearTimeout(a), o(), o = tl;
  };
  return (a) => {
    const l = So(n), c = So(e.maxWait);
    return t && s(t), l <= 0 || c !== void 0 && c <= 0 ? (r && (s(r), r = null), Promise.resolve(a())) : new Promise((u, d) => {
      o = e.rejectOnCancel ? d : u, c && !r && (r = setTimeout(() => {
        t && s(t), r = null, u(a());
      }, c)), t = setTimeout(() => {
        r && s(r), r = null, u(a());
      }, l);
    });
  };
}
function k1(n = dh) {
  const e = J(!0);
  function t() {
    e.value = !1;
  }
  function r() {
    e.value = !0;
  }
  const o = (...s) => {
    e.value && n(...s);
  };
  return { isActive: Lm(e), pause: t, resume: r, eventFilter: o };
}
function x1(n, e = 200, t = {}) {
  return uh(
    b1(e, t),
    n
  );
}
function w1(n, e, t = {}) {
  const {
    eventFilter: r = dh,
    ...o
  } = t;
  return xr(
    n,
    uh(
      r,
      e
    ),
    o
  );
}
function S1(n, e, t = {}) {
  const {
    eventFilter: r,
    ...o
  } = t, { eventFilter: s, pause: i, resume: a, isActive: l } = k1(r);
  return { stop: w1(
    n,
    e,
    {
      ...o,
      eventFilter: s
    }
  ), pause: i, resume: a, isActive: l };
}
function C1(n) {
  var e;
  const t = So(n);
  return (e = t == null ? void 0 : t.$el) != null ? e : t;
}
const nl = g1 ? window : void 0;
function Ju(...n) {
  let e, t, r, o;
  if (typeof n[0] == "string" || Array.isArray(n[0]) ? ([t, r, o] = n, e = nl) : [e, t, r, o] = n, !e)
    return tl;
  Array.isArray(t) || (t = [t]), Array.isArray(r) || (r = [r]);
  const s = [], i = () => {
    s.forEach((u) => u()), s.length = 0;
  }, a = (u, d, f, p) => (u.addEventListener(d, f, p), () => u.removeEventListener(d, f, p)), l = xr(
    () => [C1(e), So(o)],
    ([u, d]) => {
      if (i(), !u)
        return;
      const f = v1(d) ? { ...d } : d;
      s.push(
        ...t.flatMap((p) => r.map((h) => a(u, p, h, f)))
      );
    },
    { immediate: !0, flush: "post" }
  ), c = () => {
    l(), i();
  };
  return m1(c), c;
}
const Xo = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, es = "__vueuse_ssr_handlers__", E1 = /* @__PURE__ */ A1();
function A1() {
  return es in Xo || (Xo[es] = Xo[es] || {}), Xo[es];
}
function T1(n, e) {
  return E1[n] || e;
}
function M1(n) {
  return n == null ? "any" : n instanceof Set ? "set" : n instanceof Map ? "map" : n instanceof Date ? "date" : typeof n == "boolean" ? "boolean" : typeof n == "string" ? "string" : typeof n == "object" ? "object" : Number.isNaN(n) ? "any" : "number";
}
const O1 = {
  boolean: {
    read: (n) => n === "true",
    write: (n) => String(n)
  },
  object: {
    read: (n) => JSON.parse(n),
    write: (n) => JSON.stringify(n)
  },
  number: {
    read: (n) => Number.parseFloat(n),
    write: (n) => String(n)
  },
  any: {
    read: (n) => n,
    write: (n) => String(n)
  },
  string: {
    read: (n) => n,
    write: (n) => String(n)
  },
  map: {
    read: (n) => new Map(JSON.parse(n)),
    write: (n) => JSON.stringify(Array.from(n.entries()))
  },
  set: {
    read: (n) => new Set(JSON.parse(n)),
    write: (n) => JSON.stringify(Array.from(n))
  },
  date: {
    read: (n) => new Date(n),
    write: (n) => n.toISOString()
  }
}, Zu = "vueuse-storage";
function D1(n, e, t, r = {}) {
  var o;
  const {
    flush: s = "pre",
    deep: i = !0,
    listenToStorageChanges: a = !0,
    writeDefaults: l = !0,
    mergeDefaults: c = !1,
    shallow: u,
    window: d = nl,
    eventFilter: f,
    onError: p = (E) => {
      console.error(E);
    }
  } = r, h = (u ? kl : J)(e);
  if (!t)
    try {
      t = T1("getDefaultStorage", () => {
        var E;
        return (E = nl) == null ? void 0 : E.localStorage;
      })();
    } catch (E) {
      p(E);
    }
  if (!t)
    return h;
  const m = So(e), g = M1(m), v = (o = r.serializer) != null ? o : O1[g], { pause: b, resume: x } = S1(
    h,
    () => y(h.value),
    { flush: s, deep: i, eventFilter: f }
  );
  return d && a && (Ju(d, "storage", S), Ju(d, Zu, k)), S(), h;
  function y(E) {
    try {
      if (E == null)
        t.removeItem(n);
      else {
        const T = v.write(E), D = t.getItem(n);
        D !== T && (t.setItem(n, T), d && d.dispatchEvent(new CustomEvent(Zu, {
          detail: {
            key: n,
            oldValue: D,
            newValue: T,
            storageArea: t
          }
        })));
      }
    } catch (T) {
      p(T);
    }
  }
  function w(E) {
    const T = E ? E.newValue : t.getItem(n);
    if (T == null)
      return l && m !== null && t.setItem(n, v.write(m)), m;
    if (!E && c) {
      const D = v.read(T);
      return typeof c == "function" ? c(D, m) : g === "object" && !Array.isArray(D) ? { ...m, ...D } : D;
    } else
      return typeof T != "string" ? T : v.read(T);
  }
  function k(E) {
    S(E.detail);
  }
  function S(E) {
    if (!(E && E.storageArea !== t)) {
      if (E && E.key == null) {
        h.value = m;
        return;
      }
      if (!(E && E.key !== n)) {
        b();
        try {
          (E == null ? void 0 : E.newValue) !== v.write(h.value) && (h.value = w(E));
        } catch (T) {
          p(T);
        } finally {
          E ? hf(x) : x();
        }
      }
    }
  }
}
var ra = /* @__PURE__ */ new WeakMap(), Yu = 0;
function _1(n) {
  if (!n.length)
    return "";
  for (var e = "arg", t = 0; t < n.length; ++t) {
    var r = void 0;
    n[t] === null || typeof n[t] != "object" && typeof n[t] != "function" ? typeof n[t] == "string" ? r = '"' + n[t] + '"' : r = String(n[t]) : ra.has(n[t]) ? r = ra.get(n[t]) : (r = Yu, ra.set(n[t], Yu++)), e += "@" + r;
  }
  return e;
}
function N1(n) {
  if (typeof n == "function")
    try {
      n = n();
    } catch {
      n = "";
    }
  return Array.isArray(n) ? n = _1(n) : n = String(n || ""), n;
}
var Ql = (
  /** @class */
  function() {
    function n(e) {
      e === void 0 && (e = 0), this.items = /* @__PURE__ */ new Map(), this.ttl = e;
    }
    return n.prototype.serializeKey = function(e) {
      return N1(e);
    }, n.prototype.get = function(e) {
      var t = this.serializeKey(e);
      return this.items.get(t);
    }, n.prototype.set = function(e, t, r) {
      var o = this.serializeKey(e), s = r || this.ttl, i = Date.now(), a = {
        data: t,
        createdAt: i,
        expiresAt: s ? i + s : 1 / 0
      };
      this.dispatchExpire(s, a, o), this.items.set(o, a);
    }, n.prototype.dispatchExpire = function(e, t, r) {
      var o = this;
      e && setTimeout(function() {
        var s = Date.now(), i = s >= t.expiresAt;
        i && o.delete(r);
      }, e);
    }, n.prototype.delete = function(e) {
      this.items.delete(e);
    }, n;
  }()
);
function L1() {
  return typeof navigator.onLine < "u" ? navigator.onLine : !0;
}
function R1() {
  return typeof document < "u" && typeof document.visibilityState < "u" ? document.visibilityState !== "hidden" : !0;
}
var I1 = function(n) {
  return fetch(n).then(function(e) {
    return e.json();
  });
};
const oa = {
  isOnline: L1,
  isDocumentVisible: R1,
  fetcher: I1
};
var Pt = globalThis && globalThis.__assign || function() {
  return Pt = Object.assign || function(n) {
    for (var e, t = 1, r = arguments.length; t < r; t++) {
      e = arguments[t];
      for (var o in e)
        Object.prototype.hasOwnProperty.call(e, o) && (n[o] = e[o]);
    }
    return n;
  }, Pt.apply(this, arguments);
}, ar = globalThis && globalThis.__awaiter || function(n, e, t, r) {
  function o(s) {
    return s instanceof t ? s : new t(function(i) {
      i(s);
    });
  }
  return new (t || (t = Promise))(function(s, i) {
    function a(u) {
      try {
        c(r.next(u));
      } catch (d) {
        i(d);
      }
    }
    function l(u) {
      try {
        c(r.throw(u));
      } catch (d) {
        i(d);
      }
    }
    function c(u) {
      u.done ? s(u.value) : o(u.value).then(a, l);
    }
    c((r = r.apply(n, e || [])).next());
  });
}, lr = globalThis && globalThis.__generator || function(n, e) {
  var t = { label: 0, sent: function() {
    if (s[0] & 1)
      throw s[1];
    return s[1];
  }, trys: [], ops: [] }, r, o, s, i;
  return i = { next: a(0), throw: a(1), return: a(2) }, typeof Symbol == "function" && (i[Symbol.iterator] = function() {
    return this;
  }), i;
  function a(c) {
    return function(u) {
      return l([c, u]);
    };
  }
  function l(c) {
    if (r)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (r = 1, o && (s = c[0] & 2 ? o.return : c[0] ? o.throw || ((s = o.return) && s.call(o), 0) : o.next) && !(s = s.call(o, c[1])).done)
          return s;
        switch (o = 0, s && (c = [c[0] & 2, s.value]), c[0]) {
          case 0:
          case 1:
            s = c;
            break;
          case 4:
            return t.label++, { value: c[1], done: !1 };
          case 5:
            t.label++, o = c[1], c = [0];
            continue;
          case 7:
            c = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (s = t.trys, !(s = s.length > 0 && s[s.length - 1]) && (c[0] === 6 || c[0] === 2)) {
              t = 0;
              continue;
            }
            if (c[0] === 3 && (!s || c[1] > s[0] && c[1] < s[3])) {
              t.label = c[1];
              break;
            }
            if (c[0] === 6 && t.label < s[1]) {
              t.label = s[1], s = c;
              break;
            }
            if (s && t.label < s[2]) {
              t.label = s[2], t.ops.push(c);
              break;
            }
            s[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        c = e.call(n, t);
      } catch (u) {
        c = [6, u], o = 0;
      } finally {
        r = s = 0;
      }
    if (c[0] & 5)
      throw c[1];
    return { value: c[0] ? c[1] : void 0, done: !0 };
  }
}, P1 = globalThis && globalThis.__read || function(n, e) {
  var t = typeof Symbol == "function" && n[Symbol.iterator];
  if (!t)
    return n;
  var r = t.call(n), o, s = [], i;
  try {
    for (; (e === void 0 || e-- > 0) && !(o = r.next()).done; )
      s.push(o.value);
  } catch (a) {
    i = { error: a };
  } finally {
    try {
      o && !o.done && (t = r.return) && t.call(r);
    } finally {
      if (i)
        throw i.error;
    }
  }
  return s;
}, B1 = globalThis && globalThis.__spreadArray || function(n, e, t) {
  if (t || arguments.length === 2)
    for (var r = 0, o = e.length, s; r < o; r++)
      (s || !(r in e)) && (s || (s = Array.prototype.slice.call(e, 0, r)), s[r] = e[r]);
  return n.concat(s || Array.prototype.slice.call(e));
}, fh = new Ql(), Ns = new Ql(), sa = new Ql(), ph = {
  cache: fh,
  refreshInterval: 0,
  ttl: 0,
  serverTTL: 1e3,
  dedupingInterval: 2e3,
  revalidateOnFocus: !0,
  revalidateDebounce: 0,
  shouldRetryOnError: !0,
  errorRetryInterval: 5e3,
  errorRetryCount: 5,
  fetcher: oa.fetcher,
  isOnline: oa.isOnline,
  isDocumentVisible: oa.isDocumentVisible
};
function F1(n, e, t) {
  var r = Ns.get(n);
  if (r)
    r.data.push(e);
  else {
    var o = 5e3;
    Ns.set(n, [e], t > 0 ? t + o : t);
  }
}
function q1(n, e, t) {
  if (t.isDocumentVisible() && !(t.errorRetryCount !== void 0 && e > t.errorRetryCount)) {
    var r = Math.min(e || 0, t.errorRetryCount), o = r * t.errorRetryInterval;
    setTimeout(function() {
      n(null, { errorRetryCount: r + 1, shouldRetryOnError: !0 });
    }, o);
  }
}
var Qu = function(n, e, t, r) {
  return t === void 0 && (t = fh), r === void 0 && (r = ph.ttl), ar(void 0, void 0, void 0, function() {
    var o, s, i, a, l, c, u;
    return lr(this, function(d) {
      switch (d.label) {
        case 0:
          if (!z1(e))
            return [3, 5];
          d.label = 1;
        case 1:
          return d.trys.push([1, 3, , 4]), [4, e];
        case 2:
          return o = d.sent(), [3, 4];
        case 3:
          return a = d.sent(), s = a, [3, 4];
        case 4:
          return [3, 6];
        case 5:
          o = e, d.label = 6;
        case 6:
          if (i = !1, l = { data: o, error: s, isValidating: i }, typeof o < "u")
            try {
              t.set(n, l, r);
            } catch (f) {
              console.error("swrv(mutate): failed to set cache", f);
            }
          return c = Ns.get(n), c && c.data.length && (u = c.data.filter(function(f) {
            return f.key === n;
          }), u.forEach(function(f, p) {
            typeof l.data < "u" && (f.data = l.data), f.error = l.error, f.isValidating = l.isValidating;
            var h = p === u.length - 1;
            h || delete u[p];
          }), u = u.filter(Boolean)), [2, l];
      }
    });
  });
};
function Xu() {
  for (var n = this, e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  var r, o, s = Pt({}, ph), i = !1, a = !1, l = pf(), c = (l == null ? void 0 : l.proxy) || l;
  if (!c)
    return console.error("Could not get current instance, check to make sure that `useSwrv` is declared in the top level of the setup function."), null;
  var u = (c == null ? void 0 : c.$isServer) || !1;
  e.length >= 1 && (r = e[0]), e.length >= 2 && (o = e[1]), e.length > 2 && (s = Pt(Pt({}, s), e[2]));
  var d = u ? s.serverTTL : s.ttl, f = typeof r == "function" ? r : J(r);
  typeof o > "u" && (o = s.fetcher);
  var p = null;
  p || (p = ni({
    data: void 0,
    error: void 0,
    isValidating: !0,
    key: null
  }));
  var h = function(b, x) {
    return ar(n, void 0, void 0, function() {
      var y, w, k, S, E, T, D, _ = this;
      return lr(this, function(F) {
        switch (F.label) {
          case 0:
            return y = p.data === void 0, w = f.value, w ? (k = s.cache.get(w), S = k && k.data, p.isValidating = !0, S && (p.data = S.data, p.error = S.error), E = b || o, !E || !s.isDocumentVisible() && !y || (x == null ? void 0 : x.forceRevalidate) !== void 0 && !(x != null && x.forceRevalidate) ? (p.isValidating = !1, [
              2
              /*return*/
            ]) : k && (T = !!(Date.now() - k.createdAt >= s.dedupingInterval || x != null && x.forceRevalidate), !T) ? (p.isValidating = !1, [
              2
              /*return*/
            ]) : (D = function() {
              return ar(_, void 0, void 0, function() {
                var P, A, q, L;
                return lr(this, function(z) {
                  switch (z.label) {
                    case 0:
                      return P = sa.get(w), P ? [3, 2] : (A = Array.isArray(w) ? w : [w], q = E.apply(void 0, B1([], P1(A), !1)), sa.set(w, q, s.dedupingInterval), [4, Qu(w, q, s.cache, d)]);
                    case 1:
                      return z.sent(), [3, 4];
                    case 2:
                      return [4, Qu(w, P.data, s.cache, d)];
                    case 3:
                      z.sent(), z.label = 4;
                    case 4:
                      return p.isValidating = !1, sa.delete(w), p.error !== void 0 && (L = !i && s.shouldRetryOnError && (x ? x.shouldRetryOnError : !0), L && q1(h, x ? x.errorRetryCount : 1, s)), [
                        2
                        /*return*/
                      ];
                  }
                });
              });
            }, S && s.revalidateDebounce ? (setTimeout(function() {
              return ar(_, void 0, void 0, function() {
                return lr(this, function(P) {
                  switch (P.label) {
                    case 0:
                      return i ? [3, 2] : [4, D()];
                    case 1:
                      P.sent(), P.label = 2;
                    case 2:
                      return [
                        2
                        /*return*/
                      ];
                  }
                });
              });
            }, s.revalidateDebounce), [3, 3]) : [3, 1])) : [
              2
              /*return*/
            ];
          case 1:
            return [4, D()];
          case 2:
            F.sent(), F.label = 3;
          case 3:
            return [
              2
              /*return*/
            ];
        }
      });
    });
  }, m = function() {
    return ar(n, void 0, void 0, function() {
      return lr(this, function(b) {
        return [2, h(null, { shouldRetryOnError: !1 })];
      });
    });
  }, g = null;
  un(function() {
    var b = function() {
      return ar(n, void 0, void 0, function() {
        return lr(this, function(x) {
          switch (x.label) {
            case 0:
              return !p.error && s.isOnline() ? [4, h()] : [3, 2];
            case 1:
              return x.sent(), [3, 3];
            case 2:
              g && clearTimeout(g), x.label = 3;
            case 3:
              return s.refreshInterval && !i && (g = setTimeout(b, s.refreshInterval)), [
                2
                /*return*/
              ];
          }
        });
      });
    };
    s.refreshInterval && (g = setTimeout(b, s.refreshInterval)), s.revalidateOnFocus && (document.addEventListener("visibilitychange", m, !1), window.addEventListener("focus", m, !1));
  }), fo(function() {
    i = !0, g && clearTimeout(g), s.revalidateOnFocus && (document.removeEventListener("visibilitychange", m, !1), window.removeEventListener("focus", m, !1));
    var b = Ns.get(f.value);
    b && (b.data = b.data.filter(function(x) {
      return x !== p;
    }));
  });
  try {
    xr(f, function(b) {
      Rm(f) || (f.value = b), p.key = b, p.isValidating = !!b, F1(f.value, p, d), !u && !a && f.value && h(), a = !1;
    }, {
      immediate: !0
    });
  } catch {
  }
  var v = Pt(Pt({}, Im(p)), { mutate: function(b, x) {
    return h(b, Pt(Pt({}, x), { forceRevalidate: !0 }));
  } });
  return v;
}
function z1(n) {
  return n !== null && typeof n == "object" && typeof n.then == "function";
}
function $1(n) {
  const e = new TextDecoder();
  return n ? function(t) {
    return e.decode(t, { stream: !0 }).split(`
`).map(H1).filter(Boolean);
  } : function(t) {
    return t ? e.decode(t, { stream: !0 }) : "";
  };
}
var ed = {
  text: 0,
  function_call: 1,
  data: 2
  // user_err: 3?
}, H1 = (n) => {
  const e = n.indexOf(":"), t = n.slice(0, e), r = Object.keys(ed).find(
    (i) => ed[i] === Number(t)
  ), o = n.slice(e + 1);
  let s = o;
  if (!o)
    return { type: r, value: "" };
  try {
    s = JSON.parse(o);
  } catch {
    console.error("Failed to parse JSON value:", o);
  }
  return { type: r, value: s };
}, V1 = 0, td = Xu.default || Xu, nd = {};
function hh({
  api: n = "/api/completion",
  id: e,
  initialCompletion: t = "",
  initialInput: r = "",
  credentials: o,
  headers: s,
  body: i,
  onResponse: a,
  onFinish: l,
  onError: c
} = {}) {
  var u;
  const d = e || `completion-${V1++}`, f = `${n}|${d}`, { data: p, mutate: h } = td(
    f,
    () => nd[f] || t
  ), { data: m, mutate: g } = td(
    `${d}-loading`,
    null
  );
  (u = m.value) != null || (m.value = !1), p.value || (p.value = t);
  const v = (_) => (nd[f] = _, h()), b = p, x = J(void 0);
  let y = null;
  async function w(_, F) {
    try {
      g(() => !0), y = new AbortController(), v("");
      const P = await fetch(n, {
        method: "POST",
        body: JSON.stringify({
          prompt: _,
          ...i,
          ...F == null ? void 0 : F.body
        }),
        headers: {
          ...s,
          ...F == null ? void 0 : F.headers
        },
        signal: y.signal,
        credentials: o
      }).catch((z) => {
        throw z;
      });
      if (a)
        try {
          await a(P);
        } catch (z) {
          throw z;
        }
      if (!P.ok)
        throw new Error(
          await P.text() || "Failed to fetch the chat response."
        );
      if (!P.body)
        throw new Error("The response body is empty.");
      let A = "";
      const q = P.body.getReader(), L = $1();
      for (; ; ) {
        const { done: z, value: K } = await q.read();
        if (z)
          break;
        if (A += L(K), v(A), y === null) {
          q.cancel();
          break;
        }
      }
      return l && l(_, A), y = null, A;
    } catch (P) {
      if (P.name === "AbortError")
        return y = null, null;
      c && x instanceof Error && c(x), x.value = P;
    } finally {
      g(() => !1);
    }
  }
  const k = async (_, F) => w(_, F), S = () => {
    y && (y.abort(), y = null);
  }, E = (_) => {
    v(_);
  }, T = J(r);
  return {
    completion: b,
    complete: k,
    error: x,
    stop: S,
    setCompletion: E,
    input: T,
    handleSubmit: (_) => {
      _.preventDefault();
      const F = T.value;
      if (F)
        return k(F);
    },
    isLoading: m
  };
}
const j1 = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Introducing Novel" }]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://github.com/steven-tey/novel",
                target: "_blank",
                class: "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer"
              }
            }
          ],
          text: "Novel"
        },
        {
          type: "text",
          text: " is a Notion-style WYSIWYG editor with AI-powered autocompletion. Built with "
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://tiptap.dev/",
                target: "_blank",
                class: "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer"
              }
            }
          ],
          text: "Tiptap"
        },
        { type: "text", text: " + " },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://sdk.vercel.ai/docs",
                target: "_blank",
                class: "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer"
              }
            }
          ],
          text: "Vercel AI SDK"
        },
        { type: "text", text: "." }
      ]
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Installation" }]
    },
    {
      type: "codeBlock",
      attrs: { language: null },
      content: [{ type: "text", text: "npm i novel" }]
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Usage" }]
    },
    {
      type: "codeBlock",
      attrs: { language: null },
      content: [
        {
          type: "text",
          text: `import { Editor } from "novel";

export default function App() {
  return (
     <Editor />
  )
}`
        }
      ]
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Features" }]
    },
    {
      type: "orderedList",
      attrs: { tight: !0, start: 1 },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Slash menu & bubble menu" }]
            }
          ]
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "AI autocomplete (type " },
                { type: "text", marks: [{ type: "code" }], text: "++" },
                {
                  type: "text",
                  text: " to activate, or select from slash menu)"
                }
              ]
            }
          ]
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Image uploads (drag & drop / copy & paste, or select from slash menu) "
                }
              ]
            }
          ]
        }
      ]
    },
    // {
    //   type: "image",
    //   attrs: {
    //     src: "https://public.blob.vercel-storage.com/pJrjXbdONOnAeZAZ/banner-2wQk82qTwyVgvlhTW21GIkWgqPGD2C.png",
    //     alt: "banner.png",
    //     title: "banner.png",
    //     width: null,
    //     height: null,
    //   },
    // },
    { type: "horizontalRule" },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Learn more" }]
    },
    {
      type: "taskList",
      content: [
        {
          type: "taskItem",
          attrs: { checked: !1 },
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "Star us on " },
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://github.com/steven-tey/novel",
                        target: "_blank",
                        class: "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer"
                      }
                    }
                  ],
                  text: "GitHub"
                }
              ]
            }
          ]
        },
        {
          type: "taskItem",
          attrs: { checked: !1 },
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "Install the " },
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://www.npmjs.com/package/novel",
                        target: "_blank",
                        class: "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer"
                      }
                    }
                  ],
                  text: "NPM package"
                }
              ]
            }
          ]
        },
        {
          type: "taskItem",
          attrs: { checked: !1 },
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://vercel.com/templates/next.js/novel",
                        target: "_blank",
                        class: "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer"
                      }
                    }
                  ],
                  text: "Deploy your own"
                },
                { type: "text", text: " to Vercel" }
              ]
            }
          ]
        }
      ]
    }
  ]
}, U1 = /^\s*>\s$/, W1 = X.create({
  name: "blockquote",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  group: "block",
  defining: !0,
  parseHTML() {
    return [
      { tag: "blockquote" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["blockquote", te(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setBlockquote: () => ({ commands: n }) => n.wrapIn(this.name),
      toggleBlockquote: () => ({ commands: n }) => n.toggleWrap(this.name),
      unsetBlockquote: () => ({ commands: n }) => n.lift(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-b": () => this.editor.commands.toggleBlockquote()
    };
  },
  addInputRules() {
    return [
      Or({
        find: U1,
        type: this.type
      })
    ];
  }
}), K1 = /(?:^|\s)((?:\*\*)((?:[^*]+))(?:\*\*))$/, G1 = /(?:^|\s)((?:\*\*)((?:[^*]+))(?:\*\*))/g, J1 = /(?:^|\s)((?:__)((?:[^__]+))(?:__))$/, Z1 = /(?:^|\s)((?:__)((?:[^__]+))(?:__))/g, Y1 = de.create({
  name: "bold",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "strong"
      },
      {
        tag: "b",
        getAttrs: (n) => n.style.fontWeight !== "normal" && null
      },
      {
        style: "font-weight",
        getAttrs: (n) => /^(bold(er)?|[5-9]\d{2,})$/.test(n) && null
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["strong", te(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setBold: () => ({ commands: n }) => n.setMark(this.name),
      toggleBold: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetBold: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-b": () => this.editor.commands.toggleBold(),
      "Mod-B": () => this.editor.commands.toggleBold()
    };
  },
  addInputRules() {
    return [
      $n({
        find: K1,
        type: this.type
      }),
      $n({
        find: J1,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Hn({
        find: G1,
        type: this.type
      }),
      Hn({
        find: Z1,
        type: this.type
      })
    ];
  }
}), Q1 = X.create({
  name: "listItem",
  addOptions() {
    return {
      HTMLAttributes: {},
      bulletListTypeName: "bulletList",
      orderedListTypeName: "orderedList"
    };
  },
  content: "paragraph block*",
  defining: !0,
  parseHTML() {
    return [
      {
        tag: "li"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["li", te(this.options.HTMLAttributes, n), 0];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
}), rd = de.create({
  name: "textStyle",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (n) => n.hasAttribute("style") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["span", te(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      removeEmptyTextStyle: () => ({ state: n, commands: e }) => {
        const t = No(n, this.type);
        return Object.entries(t).some(([, o]) => !!o) ? !0 : e.unsetMark(this.name);
      }
    };
  }
}), od = /^\s*([-+*])\s$/, X1 = X.create({
  name: "bulletList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: !1,
      keepAttributes: !1
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  parseHTML() {
    return [
      { tag: "ul" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["ul", te(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      toggleBulletList: () => ({ commands: n, chain: e }) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(Q1.name, this.editor.getAttributes(rd.name)).run() : n.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-8": () => this.editor.commands.toggleBulletList()
    };
  },
  addInputRules() {
    let n = Or({
      find: od,
      type: this.type
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (n = Or({
      find: od,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: () => this.editor.getAttributes(rd.name),
      editor: this.editor
    })), [
      n
    ];
  }
}), ex = /(?:^|\s)((?:`)((?:[^`]+))(?:`))$/, tx = /(?:^|\s)((?:`)((?:[^`]+))(?:`))/g, nx = de.create({
  name: "code",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  excludes: "_",
  code: !0,
  exitable: !0,
  parseHTML() {
    return [
      { tag: "code" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["code", te(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setCode: () => ({ commands: n }) => n.setMark(this.name),
      toggleCode: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetCode: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-e": () => this.editor.commands.toggleCode()
    };
  },
  addInputRules() {
    return [
      $n({
        find: ex,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Hn({
        find: tx,
        type: this.type
      })
    ];
  }
}), rx = /^```([a-z]+)?[\s\n]$/, ox = /^~~~([a-z]+)?[\s\n]$/, sx = X.create({
  name: "codeBlock",
  addOptions() {
    return {
      languageClassPrefix: "language-",
      exitOnTripleEnter: !0,
      exitOnArrowDown: !0,
      HTMLAttributes: {}
    };
  },
  content: "text*",
  marks: "",
  group: "block",
  code: !0,
  defining: !0,
  addAttributes() {
    return {
      language: {
        default: null,
        parseHTML: (n) => {
          var e;
          const { languageClassPrefix: t } = this.options, s = [...((e = n.firstElementChild) === null || e === void 0 ? void 0 : e.classList) || []].filter((i) => i.startsWith(t)).map((i) => i.replace(t, ""))[0];
          return s || null;
        },
        rendered: !1
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "pre",
        preserveWhitespace: "full"
      }
    ];
  },
  renderHTML({ node: n, HTMLAttributes: e }) {
    return [
      "pre",
      te(this.options.HTMLAttributes, e),
      [
        "code",
        {
          class: n.attrs.language ? this.options.languageClassPrefix + n.attrs.language : null
        },
        0
      ]
    ];
  },
  addCommands() {
    return {
      setCodeBlock: (n) => ({ commands: e }) => e.setNode(this.name, n),
      toggleCodeBlock: (n) => ({ commands: e }) => e.toggleNode(this.name, "paragraph", n)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-c": () => this.editor.commands.toggleCodeBlock(),
      // remove code block when at start of document or code block is empty
      Backspace: () => {
        const { empty: n, $anchor: e } = this.editor.state.selection, t = e.pos === 1;
        return !n || e.parent.type.name !== this.name ? !1 : t || !e.parent.textContent.length ? this.editor.commands.clearNodes() : !1;
      },
      // exit node on triple enter
      Enter: ({ editor: n }) => {
        if (!this.options.exitOnTripleEnter)
          return !1;
        const { state: e } = n, { selection: t } = e, { $from: r, empty: o } = t;
        if (!o || r.parent.type !== this.type)
          return !1;
        const s = r.parentOffset === r.parent.nodeSize - 2, i = r.parent.textContent.endsWith(`

`);
        return !s || !i ? !1 : n.chain().command(({ tr: a }) => (a.delete(r.pos - 2, r.pos), !0)).exitCode().run();
      },
      // exit node on arrow down
      ArrowDown: ({ editor: n }) => {
        if (!this.options.exitOnArrowDown)
          return !1;
        const { state: e } = n, { selection: t, doc: r } = e, { $from: o, empty: s } = t;
        if (!s || o.parent.type !== this.type || !(o.parentOffset === o.parent.nodeSize - 2))
          return !1;
        const a = o.after();
        return a === void 0 || r.nodeAt(a) ? !1 : n.commands.exitCode();
      }
    };
  },
  addInputRules() {
    return [
      Ga({
        find: rx,
        type: this.type,
        getAttributes: (n) => ({
          language: n[1]
        })
      }),
      Ga({
        find: ox,
        type: this.type,
        getAttributes: (n) => ({
          language: n[1]
        })
      })
    ];
  },
  addProseMirrorPlugins() {
    return [
      // this plugin creates a code block for pasted content from VS Code
      // we can also detect the copied code language
      new fe({
        key: new Te("codeBlockVSCodeHandler"),
        props: {
          handlePaste: (n, e) => {
            if (!e.clipboardData || this.editor.isActive(this.type.name))
              return !1;
            const t = e.clipboardData.getData("text/plain"), r = e.clipboardData.getData("vscode-editor-data"), o = r ? JSON.parse(r) : void 0, s = o == null ? void 0 : o.mode;
            if (!t || !s)
              return !1;
            const { tr: i } = n.state;
            return i.replaceSelectionWith(this.type.create({ language: s })), i.setSelection(j.near(i.doc.resolve(Math.max(0, i.selection.from - 2)))), i.insertText(t.replace(/\r\n?/g, `
`)), i.setMeta("paste", !0), n.dispatch(i), !0;
          }
        }
      })
    ];
  }
}), ix = X.create({
  name: "doc",
  topNode: !0,
  content: "block+"
});
function ax(n = {}) {
  return new fe({
    view(e) {
      return new lx(e, n);
    }
  });
}
class lx {
  constructor(e, t) {
    var r;
    this.editorView = e, this.cursorPos = null, this.element = null, this.timeout = -1, this.width = (r = t.width) !== null && r !== void 0 ? r : 1, this.color = t.color === !1 ? void 0 : t.color || "black", this.class = t.class, this.handlers = ["dragover", "dragend", "drop", "dragleave"].map((o) => {
      let s = (i) => {
        this[o](i);
      };
      return e.dom.addEventListener(o, s), { name: o, handler: s };
    });
  }
  destroy() {
    this.handlers.forEach(({ name: e, handler: t }) => this.editorView.dom.removeEventListener(e, t));
  }
  update(e, t) {
    this.cursorPos != null && t.doc != e.state.doc && (this.cursorPos > e.state.doc.content.size ? this.setCursor(null) : this.updateOverlay());
  }
  setCursor(e) {
    e != this.cursorPos && (this.cursorPos = e, e == null ? (this.element.parentNode.removeChild(this.element), this.element = null) : this.updateOverlay());
  }
  updateOverlay() {
    let e = this.editorView.state.doc.resolve(this.cursorPos), t = !e.parent.inlineContent, r;
    if (t) {
      let a = e.nodeBefore, l = e.nodeAfter;
      if (a || l) {
        let c = this.editorView.nodeDOM(this.cursorPos - (a ? a.nodeSize : 0));
        if (c) {
          let u = c.getBoundingClientRect(), d = a ? u.bottom : u.top;
          a && l && (d = (d + this.editorView.nodeDOM(this.cursorPos).getBoundingClientRect().top) / 2), r = { left: u.left, right: u.right, top: d - this.width / 2, bottom: d + this.width / 2 };
        }
      }
    }
    if (!r) {
      let a = this.editorView.coordsAtPos(this.cursorPos);
      r = { left: a.left - this.width / 2, right: a.left + this.width / 2, top: a.top, bottom: a.bottom };
    }
    let o = this.editorView.dom.offsetParent;
    this.element || (this.element = o.appendChild(document.createElement("div")), this.class && (this.element.className = this.class), this.element.style.cssText = "position: absolute; z-index: 50; pointer-events: none;", this.color && (this.element.style.backgroundColor = this.color)), this.element.classList.toggle("prosemirror-dropcursor-block", t), this.element.classList.toggle("prosemirror-dropcursor-inline", !t);
    let s, i;
    if (!o || o == document.body && getComputedStyle(o).position == "static")
      s = -pageXOffset, i = -pageYOffset;
    else {
      let a = o.getBoundingClientRect();
      s = a.left - o.scrollLeft, i = a.top - o.scrollTop;
    }
    this.element.style.left = r.left - s + "px", this.element.style.top = r.top - i + "px", this.element.style.width = r.right - r.left + "px", this.element.style.height = r.bottom - r.top + "px";
  }
  scheduleRemoval(e) {
    clearTimeout(this.timeout), this.timeout = setTimeout(() => this.setCursor(null), e);
  }
  dragover(e) {
    if (!this.editorView.editable)
      return;
    let t = this.editorView.posAtCoords({ left: e.clientX, top: e.clientY }), r = t && t.inside >= 0 && this.editorView.state.doc.nodeAt(t.inside), o = r && r.type.spec.disableDropCursor, s = typeof o == "function" ? o(this.editorView, t, e) : o;
    if (t && !s) {
      let i = t.pos;
      if (this.editorView.dragging && this.editorView.dragging.slice) {
        let a = zf(this.editorView.state.doc, i, this.editorView.dragging.slice);
        a != null && (i = a);
      }
      this.setCursor(i), this.scheduleRemoval(5e3);
    }
  }
  dragend() {
    this.scheduleRemoval(20);
  }
  drop() {
    this.scheduleRemoval(20);
  }
  dragleave(e) {
    (e.target == this.editorView.dom || !this.editorView.dom.contains(e.relatedTarget)) && this.setCursor(null);
  }
}
const cx = ue.create({
  name: "dropCursor",
  addOptions() {
    return {
      color: "currentColor",
      width: 1,
      class: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      ax(this.options)
    ];
  }
});
class ie extends W {
  /**
  Create a gap cursor.
  */
  constructor(e) {
    super(e, e);
  }
  map(e, t) {
    let r = e.resolve(t.map(this.head));
    return ie.valid(r) ? new ie(r) : W.near(r);
  }
  content() {
    return N.empty;
  }
  eq(e) {
    return e instanceof ie && e.head == this.head;
  }
  toJSON() {
    return { type: "gapcursor", pos: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for GapCursor.fromJSON");
    return new ie(e.resolve(t.pos));
  }
  /**
  @internal
  */
  getBookmark() {
    return new Xl(this.anchor);
  }
  /**
  @internal
  */
  static valid(e) {
    let t = e.parent;
    if (t.isTextblock || !ux(e) || !dx(e))
      return !1;
    let r = t.type.spec.allowGapCursor;
    if (r != null)
      return r;
    let o = t.contentMatchAt(e.index()).defaultType;
    return o && o.isTextblock;
  }
  /**
  @internal
  */
  static findGapCursorFrom(e, t, r = !1) {
    e:
      for (; ; ) {
        if (!r && ie.valid(e))
          return e;
        let o = e.pos, s = null;
        for (let i = e.depth; ; i--) {
          let a = e.node(i);
          if (t > 0 ? e.indexAfter(i) < a.childCount : e.index(i) > 0) {
            s = a.child(t > 0 ? e.indexAfter(i) : e.index(i) - 1);
            break;
          } else if (i == 0)
            return null;
          o += t;
          let l = e.doc.resolve(o);
          if (ie.valid(l))
            return l;
        }
        for (; ; ) {
          let i = t > 0 ? s.firstChild : s.lastChild;
          if (!i) {
            if (s.isAtom && !s.isText && !$.isSelectable(s)) {
              e = e.doc.resolve(o + s.nodeSize * t), r = !1;
              continue e;
            }
            break;
          }
          s = i, o += t;
          let a = e.doc.resolve(o);
          if (ie.valid(a))
            return a;
        }
        return null;
      }
  }
}
ie.prototype.visible = !1;
ie.findFrom = ie.findGapCursorFrom;
W.jsonID("gapcursor", ie);
class Xl {
  constructor(e) {
    this.pos = e;
  }
  map(e) {
    return new Xl(e.map(this.pos));
  }
  resolve(e) {
    let t = e.resolve(this.pos);
    return ie.valid(t) ? new ie(t) : W.near(t);
  }
}
function ux(n) {
  for (let e = n.depth; e >= 0; e--) {
    let t = n.index(e), r = n.node(e);
    if (t == 0) {
      if (r.type.spec.isolating)
        return !0;
      continue;
    }
    for (let o = r.child(t - 1); ; o = o.lastChild) {
      if (o.childCount == 0 && !o.inlineContent || o.isAtom || o.type.spec.isolating)
        return !0;
      if (o.inlineContent)
        return !1;
    }
  }
  return !0;
}
function dx(n) {
  for (let e = n.depth; e >= 0; e--) {
    let t = n.indexAfter(e), r = n.node(e);
    if (t == r.childCount) {
      if (r.type.spec.isolating)
        return !0;
      continue;
    }
    for (let o = r.child(t); ; o = o.firstChild) {
      if (o.childCount == 0 && !o.inlineContent || o.isAtom || o.type.spec.isolating)
        return !0;
      if (o.inlineContent)
        return !1;
    }
  }
  return !0;
}
function fx() {
  return new fe({
    props: {
      decorations: gx,
      createSelectionBetween(n, e, t) {
        return e.pos == t.pos && ie.valid(t) ? new ie(t) : null;
      },
      handleClick: hx,
      handleKeyDown: px,
      handleDOMEvents: { beforeinput: mx }
    }
  });
}
const px = Ap({
  ArrowLeft: ts("horiz", -1),
  ArrowRight: ts("horiz", 1),
  ArrowUp: ts("vert", -1),
  ArrowDown: ts("vert", 1)
});
function ts(n, e) {
  const t = n == "vert" ? e > 0 ? "down" : "up" : e > 0 ? "right" : "left";
  return function(r, o, s) {
    let i = r.selection, a = e > 0 ? i.$to : i.$from, l = i.empty;
    if (i instanceof j) {
      if (!s.endOfTextblock(t) || a.depth == 0)
        return !1;
      l = !1, a = r.doc.resolve(e > 0 ? a.after() : a.before());
    }
    let c = ie.findGapCursorFrom(a, e, l);
    return c ? (o && o(r.tr.setSelection(new ie(c))), !0) : !1;
  };
}
function hx(n, e, t) {
  if (!n || !n.editable)
    return !1;
  let r = n.state.doc.resolve(e);
  if (!ie.valid(r))
    return !1;
  let o = n.posAtCoords({ left: t.clientX, top: t.clientY });
  return o && o.inside > -1 && $.isSelectable(n.state.doc.nodeAt(o.inside)) ? !1 : (n.dispatch(n.state.tr.setSelection(new ie(r))), !0);
}
function mx(n, e) {
  if (e.inputType != "insertCompositionText" || !(n.state.selection instanceof ie))
    return !1;
  let { $from: t } = n.state.selection, r = t.parent.contentMatchAt(t.index()).findWrapping(n.state.schema.nodes.text);
  if (!r)
    return !1;
  let o = M.empty;
  for (let i = r.length - 1; i >= 0; i--)
    o = M.from(r[i].createAndFill(null, o));
  let s = n.state.tr.replace(t.pos, t.pos, new N(o, 0, 0));
  return s.setSelection(j.near(s.doc.resolve(t.pos + 1))), n.dispatch(s), !1;
}
function gx(n) {
  if (!(n.selection instanceof ie))
    return null;
  let e = document.createElement("div");
  return e.className = "ProseMirror-gapcursor", ce.create(n.doc, [Ie.widget(n.selection.head, e, { key: "gapcursor" })]);
}
const yx = ue.create({
  name: "gapCursor",
  addProseMirrorPlugins() {
    return [
      fx()
    ];
  },
  extendNodeSchema(n) {
    var e;
    const t = {
      name: n.name,
      options: n.options,
      storage: n.storage
    };
    return {
      allowGapCursor: (e = U(R(n, "allowGapCursor", t))) !== null && e !== void 0 ? e : null
    };
  }
}), vx = X.create({
  name: "hardBreak",
  addOptions() {
    return {
      keepMarks: !0,
      HTMLAttributes: {}
    };
  },
  inline: !0,
  group: "inline",
  selectable: !1,
  parseHTML() {
    return [
      { tag: "br" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["br", te(this.options.HTMLAttributes, n)];
  },
  renderText() {
    return `
`;
  },
  addCommands() {
    return {
      setHardBreak: () => ({ commands: n, chain: e, state: t, editor: r }) => n.first([
        () => n.exitCode(),
        () => n.command(() => {
          const { selection: o, storedMarks: s } = t;
          if (o.$from.parent.type.spec.isolating)
            return !1;
          const { keepMarks: i } = this.options, { splittableMarks: a } = r.extensionManager, l = s || o.$to.parentOffset && o.$from.marks();
          return e().insertContent({ type: this.name }).command(({ tr: c, dispatch: u }) => {
            if (u && l && i) {
              const d = l.filter((f) => a.includes(f.type.name));
              c.ensureMarks(d);
            }
            return !0;
          }).run();
        })
      ])
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Enter": () => this.editor.commands.setHardBreak(),
      "Shift-Enter": () => this.editor.commands.setHardBreak()
    };
  }
}), bx = X.create({
  name: "heading",
  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {}
    };
  },
  content: "inline*",
  group: "block",
  defining: !0,
  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: !1
      }
    };
  },
  parseHTML() {
    return this.options.levels.map((n) => ({
      tag: `h${n}`,
      attrs: { level: n }
    }));
  },
  renderHTML({ node: n, HTMLAttributes: e }) {
    return [`h${this.options.levels.includes(n.attrs.level) ? n.attrs.level : this.options.levels[0]}`, te(this.options.HTMLAttributes, e), 0];
  },
  addCommands() {
    return {
      setHeading: (n) => ({ commands: e }) => this.options.levels.includes(n.level) ? e.setNode(this.name, n) : !1,
      toggleHeading: (n) => ({ commands: e }) => this.options.levels.includes(n.level) ? e.toggleNode(this.name, "paragraph", n) : !1
    };
  },
  addKeyboardShortcuts() {
    return this.options.levels.reduce((n, e) => ({
      ...n,
      [`Mod-Alt-${e}`]: () => this.editor.commands.toggleHeading({ level: e })
    }), {});
  },
  addInputRules() {
    return this.options.levels.map((n) => Ga({
      find: new RegExp(`^(#{1,${n}})\\s$`),
      type: this.type,
      getAttributes: {
        level: n
      }
    }));
  }
});
var Ls = 200, ye = function() {
};
ye.prototype.append = function(e) {
  return e.length ? (e = ye.from(e), !this.length && e || e.length < Ls && this.leafAppend(e) || this.length < Ls && e.leafPrepend(this) || this.appendInner(e)) : this;
};
ye.prototype.prepend = function(e) {
  return e.length ? ye.from(e).append(this) : this;
};
ye.prototype.appendInner = function(e) {
  return new kx(this, e);
};
ye.prototype.slice = function(e, t) {
  return e === void 0 && (e = 0), t === void 0 && (t = this.length), e >= t ? ye.empty : this.sliceInner(Math.max(0, e), Math.min(this.length, t));
};
ye.prototype.get = function(e) {
  if (!(e < 0 || e >= this.length))
    return this.getInner(e);
};
ye.prototype.forEach = function(e, t, r) {
  t === void 0 && (t = 0), r === void 0 && (r = this.length), t <= r ? this.forEachInner(e, t, r, 0) : this.forEachInvertedInner(e, t, r, 0);
};
ye.prototype.map = function(e, t, r) {
  t === void 0 && (t = 0), r === void 0 && (r = this.length);
  var o = [];
  return this.forEach(function(s, i) {
    return o.push(e(s, i));
  }, t, r), o;
};
ye.from = function(e) {
  return e instanceof ye ? e : e && e.length ? new mh(e) : ye.empty;
};
var mh = /* @__PURE__ */ function(n) {
  function e(r) {
    n.call(this), this.values = r;
  }
  n && (e.__proto__ = n), e.prototype = Object.create(n && n.prototype), e.prototype.constructor = e;
  var t = { length: { configurable: !0 }, depth: { configurable: !0 } };
  return e.prototype.flatten = function() {
    return this.values;
  }, e.prototype.sliceInner = function(o, s) {
    return o == 0 && s == this.length ? this : new e(this.values.slice(o, s));
  }, e.prototype.getInner = function(o) {
    return this.values[o];
  }, e.prototype.forEachInner = function(o, s, i, a) {
    for (var l = s; l < i; l++)
      if (o(this.values[l], a + l) === !1)
        return !1;
  }, e.prototype.forEachInvertedInner = function(o, s, i, a) {
    for (var l = s - 1; l >= i; l--)
      if (o(this.values[l], a + l) === !1)
        return !1;
  }, e.prototype.leafAppend = function(o) {
    if (this.length + o.length <= Ls)
      return new e(this.values.concat(o.flatten()));
  }, e.prototype.leafPrepend = function(o) {
    if (this.length + o.length <= Ls)
      return new e(o.flatten().concat(this.values));
  }, t.length.get = function() {
    return this.values.length;
  }, t.depth.get = function() {
    return 0;
  }, Object.defineProperties(e.prototype, t), e;
}(ye);
ye.empty = new mh([]);
var kx = /* @__PURE__ */ function(n) {
  function e(t, r) {
    n.call(this), this.left = t, this.right = r, this.length = t.length + r.length, this.depth = Math.max(t.depth, r.depth) + 1;
  }
  return n && (e.__proto__ = n), e.prototype = Object.create(n && n.prototype), e.prototype.constructor = e, e.prototype.flatten = function() {
    return this.left.flatten().concat(this.right.flatten());
  }, e.prototype.getInner = function(r) {
    return r < this.left.length ? this.left.get(r) : this.right.get(r - this.left.length);
  }, e.prototype.forEachInner = function(r, o, s, i) {
    var a = this.left.length;
    if (o < a && this.left.forEachInner(r, o, Math.min(s, a), i) === !1 || s > a && this.right.forEachInner(r, Math.max(o - a, 0), Math.min(this.length, s) - a, i + a) === !1)
      return !1;
  }, e.prototype.forEachInvertedInner = function(r, o, s, i) {
    var a = this.left.length;
    if (o > a && this.right.forEachInvertedInner(r, o - a, Math.max(s, a) - a, i + a) === !1 || s < a && this.left.forEachInvertedInner(r, Math.min(o, a), s, i) === !1)
      return !1;
  }, e.prototype.sliceInner = function(r, o) {
    if (r == 0 && o == this.length)
      return this;
    var s = this.left.length;
    return o <= s ? this.left.slice(r, o) : r >= s ? this.right.slice(r - s, o - s) : this.left.slice(r, s).append(this.right.slice(0, o - s));
  }, e.prototype.leafAppend = function(r) {
    var o = this.right.leafAppend(r);
    if (o)
      return new e(this.left, o);
  }, e.prototype.leafPrepend = function(r) {
    var o = this.left.leafPrepend(r);
    if (o)
      return new e(o, this.right);
  }, e.prototype.appendInner = function(r) {
    return this.left.depth >= Math.max(this.right.depth, r.depth) + 1 ? new e(this.left, new e(this.right, r)) : new e(this, r);
  }, e;
}(ye);
const xx = 500;
class st {
  constructor(e, t) {
    this.items = e, this.eventCount = t;
  }
  // Pop the latest event off the branch's history and apply it
  // to a document transform.
  popEvent(e, t) {
    if (this.eventCount == 0)
      return null;
    let r = this.items.length;
    for (; ; r--)
      if (this.items.get(r - 1).selection) {
        --r;
        break;
      }
    let o, s;
    t && (o = this.remapping(r, this.items.length), s = o.maps.length);
    let i = e.tr, a, l, c = [], u = [];
    return this.items.forEach((d, f) => {
      if (!d.step) {
        o || (o = this.remapping(r, f + 1), s = o.maps.length), s--, u.push(d);
        return;
      }
      if (o) {
        u.push(new ut(d.map));
        let p = d.step.map(o.slice(s)), h;
        p && i.maybeStep(p).doc && (h = i.mapping.maps[i.mapping.maps.length - 1], c.push(new ut(h, void 0, void 0, c.length + u.length))), s--, h && o.appendMap(h, s);
      } else
        i.maybeStep(d.step);
      if (d.selection)
        return a = o ? d.selection.map(o.slice(s)) : d.selection, l = new st(this.items.slice(0, r).append(u.reverse().concat(c)), this.eventCount - 1), !1;
    }, this.items.length, 0), { remaining: l, transform: i, selection: a };
  }
  // Create a new branch with the given transform added.
  addTransform(e, t, r, o) {
    let s = [], i = this.eventCount, a = this.items, l = !o && a.length ? a.get(a.length - 1) : null;
    for (let u = 0; u < e.steps.length; u++) {
      let d = e.steps[u].invert(e.docs[u]), f = new ut(e.mapping.maps[u], d, t), p;
      (p = l && l.merge(f)) && (f = p, u ? s.pop() : a = a.slice(0, a.length - 1)), s.push(f), t && (i++, t = void 0), o || (l = f);
    }
    let c = i - r.depth;
    return c > Sx && (a = wx(a, c), i -= c), new st(a.append(s), i);
  }
  remapping(e, t) {
    let r = new mr();
    return this.items.forEach((o, s) => {
      let i = o.mirrorOffset != null && s - o.mirrorOffset >= e ? r.maps.length - o.mirrorOffset : void 0;
      r.appendMap(o.map, i);
    }, e, t), r;
  }
  addMaps(e) {
    return this.eventCount == 0 ? this : new st(this.items.append(e.map((t) => new ut(t))), this.eventCount);
  }
  // When the collab module receives remote changes, the history has
  // to know about those, so that it can adjust the steps that were
  // rebased on top of the remote changes, and include the position
  // maps for the remote changes in its array of items.
  rebased(e, t) {
    if (!this.eventCount)
      return this;
    let r = [], o = Math.max(0, this.items.length - t), s = e.mapping, i = e.steps.length, a = this.eventCount;
    this.items.forEach((f) => {
      f.selection && a--;
    }, o);
    let l = t;
    this.items.forEach((f) => {
      let p = s.getMirror(--l);
      if (p == null)
        return;
      i = Math.min(i, p);
      let h = s.maps[p];
      if (f.step) {
        let m = e.steps[p].invert(e.docs[p]), g = f.selection && f.selection.map(s.slice(l + 1, p));
        g && a++, r.push(new ut(h, m, g));
      } else
        r.push(new ut(h));
    }, o);
    let c = [];
    for (let f = t; f < i; f++)
      c.push(new ut(s.maps[f]));
    let u = this.items.slice(0, o).append(c).append(r), d = new st(u, a);
    return d.emptyItemCount() > xx && (d = d.compress(this.items.length - r.length)), d;
  }
  emptyItemCount() {
    let e = 0;
    return this.items.forEach((t) => {
      t.step || e++;
    }), e;
  }
  // Compressing a branch means rewriting it to push the air (map-only
  // items) out. During collaboration, these naturally accumulate
  // because each remote change adds one. The `upto` argument is used
  // to ensure that only the items below a given level are compressed,
  // because `rebased` relies on a clean, untouched set of items in
  // order to associate old items with rebased steps.
  compress(e = this.items.length) {
    let t = this.remapping(0, e), r = t.maps.length, o = [], s = 0;
    return this.items.forEach((i, a) => {
      if (a >= e)
        o.push(i), i.selection && s++;
      else if (i.step) {
        let l = i.step.map(t.slice(r)), c = l && l.getMap();
        if (r--, c && t.appendMap(c, r), l) {
          let u = i.selection && i.selection.map(t.slice(r));
          u && s++;
          let d = new ut(c.invert(), l, u), f, p = o.length - 1;
          (f = o.length && o[p].merge(d)) ? o[p] = f : o.push(d);
        }
      } else
        i.map && r--;
    }, this.items.length, 0), new st(ye.from(o.reverse()), s);
  }
}
st.empty = new st(ye.empty, 0);
function wx(n, e) {
  let t;
  return n.forEach((r, o) => {
    if (r.selection && e-- == 0)
      return t = o, !1;
  }), n.slice(t);
}
class ut {
  constructor(e, t, r, o) {
    this.map = e, this.step = t, this.selection = r, this.mirrorOffset = o;
  }
  merge(e) {
    if (this.step && e.step && !e.selection) {
      let t = e.step.merge(this.step);
      if (t)
        return new ut(t.getMap().invert(), t, this.selection);
    }
  }
}
class Gt {
  constructor(e, t, r, o, s) {
    this.done = e, this.undone = t, this.prevRanges = r, this.prevTime = o, this.prevComposition = s;
  }
}
const Sx = 20;
function Cx(n, e, t, r) {
  let o = t.getMeta(an), s;
  if (o)
    return o.historyState;
  t.getMeta(Ax) && (n = new Gt(n.done, n.undone, null, 0, -1));
  let i = t.getMeta("appendedTransaction");
  if (t.steps.length == 0)
    return n;
  if (i && i.getMeta(an))
    return i.getMeta(an).redo ? new Gt(n.done.addTransform(t, void 0, r, hs(e)), n.undone, sd(t.mapping.maps[t.steps.length - 1]), n.prevTime, n.prevComposition) : new Gt(n.done, n.undone.addTransform(t, void 0, r, hs(e)), null, n.prevTime, n.prevComposition);
  if (t.getMeta("addToHistory") !== !1 && !(i && i.getMeta("addToHistory") === !1)) {
    let a = t.getMeta("composition"), l = n.prevTime == 0 || !i && n.prevComposition != a && (n.prevTime < (t.time || 0) - r.newGroupDelay || !Ex(t, n.prevRanges)), c = i ? ia(n.prevRanges, t.mapping) : sd(t.mapping.maps[t.steps.length - 1]);
    return new Gt(n.done.addTransform(t, l ? e.selection.getBookmark() : void 0, r, hs(e)), st.empty, c, t.time, a ?? n.prevComposition);
  } else
    return (s = t.getMeta("rebased")) ? new Gt(n.done.rebased(t, s), n.undone.rebased(t, s), ia(n.prevRanges, t.mapping), n.prevTime, n.prevComposition) : new Gt(n.done.addMaps(t.mapping.maps), n.undone.addMaps(t.mapping.maps), ia(n.prevRanges, t.mapping), n.prevTime, n.prevComposition);
}
function Ex(n, e) {
  if (!e)
    return !1;
  if (!n.docChanged)
    return !0;
  let t = !1;
  return n.mapping.maps[0].forEach((r, o) => {
    for (let s = 0; s < e.length; s += 2)
      r <= e[s + 1] && o >= e[s] && (t = !0);
  }), t;
}
function sd(n) {
  let e = [];
  return n.forEach((t, r, o, s) => e.push(o, s)), e;
}
function ia(n, e) {
  if (!n)
    return null;
  let t = [];
  for (let r = 0; r < n.length; r += 2) {
    let o = e.map(n[r], 1), s = e.map(n[r + 1], -1);
    o <= s && t.push(o, s);
  }
  return t;
}
function gh(n, e, t, r) {
  let o = hs(e), s = an.get(e).spec.config, i = (r ? n.undone : n.done).popEvent(e, o);
  if (!i)
    return;
  let a = i.selection.resolve(i.transform.doc), l = (r ? n.done : n.undone).addTransform(i.transform, e.selection.getBookmark(), s, o), c = new Gt(r ? l : i.remaining, r ? i.remaining : l, null, 0, -1);
  t(i.transform.setSelection(a).setMeta(an, { redo: r, historyState: c }).scrollIntoView());
}
let aa = !1, id = null;
function hs(n) {
  let e = n.plugins;
  if (id != e) {
    aa = !1, id = e;
    for (let t = 0; t < e.length; t++)
      if (e[t].spec.historyPreserveItems) {
        aa = !0;
        break;
      }
  }
  return aa;
}
const an = new Te("history"), Ax = new Te("closeHistory");
function Tx(n = {}) {
  return n = {
    depth: n.depth || 100,
    newGroupDelay: n.newGroupDelay || 500
  }, new fe({
    key: an,
    state: {
      init() {
        return new Gt(st.empty, st.empty, null, 0, -1);
      },
      apply(e, t, r) {
        return Cx(t, r, e, n);
      }
    },
    config: n,
    props: {
      handleDOMEvents: {
        beforeinput(e, t) {
          let r = t.inputType, o = r == "historyUndo" ? yh : r == "historyRedo" ? vh : null;
          return o ? (t.preventDefault(), o(e.state, e.dispatch)) : !1;
        }
      }
    }
  });
}
const yh = (n, e) => {
  let t = an.getState(n);
  return !t || t.done.eventCount == 0 ? !1 : (e && gh(t, n, e, !1), !0);
}, vh = (n, e) => {
  let t = an.getState(n);
  return !t || t.undone.eventCount == 0 ? !1 : (e && gh(t, n, e, !0), !0);
}, Mx = ue.create({
  name: "history",
  addOptions() {
    return {
      depth: 100,
      newGroupDelay: 500
    };
  },
  addCommands() {
    return {
      undo: () => ({ state: n, dispatch: e }) => yh(n, e),
      redo: () => ({ state: n, dispatch: e }) => vh(n, e)
    };
  },
  addProseMirrorPlugins() {
    return [
      Tx(this.options)
    ];
  },
  addKeyboardShortcuts() {
    return {
      "Mod-z": () => this.editor.commands.undo(),
      "Mod-Z": () => this.editor.commands.undo(),
      "Mod-y": () => this.editor.commands.redo(),
      "Mod-Y": () => this.editor.commands.redo(),
      "Shift-Mod-z": () => this.editor.commands.redo(),
      "Shift-Mod-Z": () => this.editor.commands.redo(),
      // Russian keyboard layouts
      "Mod-я": () => this.editor.commands.undo(),
      "Shift-Mod-я": () => this.editor.commands.redo()
    };
  }
}), bh = X.create({
  name: "horizontalRule",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  parseHTML() {
    return [{ tag: "hr" }];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["hr", te(this.options.HTMLAttributes, n)];
  },
  addCommands() {
    return {
      setHorizontalRule: () => ({ chain: n, state: e }) => {
        const { $to: t } = e.selection, r = n();
        return t.parentOffset === 0 ? r.insertContentAt(Math.max(t.pos - 2, 0), { type: this.name }) : r.insertContent({ type: this.name }), r.command(({ tr: o, dispatch: s }) => {
          var i;
          if (s) {
            const { $to: a } = o.selection, l = a.end();
            if (a.nodeAfter)
              a.nodeAfter.isTextblock ? o.setSelection(j.create(o.doc, a.pos + 1)) : a.nodeAfter.isBlock ? o.setSelection($.create(o.doc, a.pos)) : o.setSelection(j.create(o.doc, a.pos));
            else {
              const c = (i = a.parent.type.contentMatch.defaultType) === null || i === void 0 ? void 0 : i.create();
              c && (o.insert(l, c), o.setSelection(j.create(o.doc, l + 1)));
            }
            o.scrollIntoView();
          }
          return !0;
        }).run();
      }
    };
  },
  addInputRules() {
    return [
      Tb({
        find: /^(?:---|—-|___\s|\*\*\*\s)$/,
        type: this.type
      })
    ];
  }
}), Ox = /(?:^|\s)((?:\*)((?:[^*]+))(?:\*))$/, Dx = /(?:^|\s)((?:\*)((?:[^*]+))(?:\*))/g, _x = /(?:^|\s)((?:_)((?:[^_]+))(?:_))$/, Nx = /(?:^|\s)((?:_)((?:[^_]+))(?:_))/g, Lx = de.create({
  name: "italic",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "em"
      },
      {
        tag: "i",
        getAttrs: (n) => n.style.fontStyle !== "normal" && null
      },
      {
        style: "font-style=italic"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["em", te(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setItalic: () => ({ commands: n }) => n.setMark(this.name),
      toggleItalic: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetItalic: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-i": () => this.editor.commands.toggleItalic(),
      "Mod-I": () => this.editor.commands.toggleItalic()
    };
  },
  addInputRules() {
    return [
      $n({
        find: Ox,
        type: this.type
      }),
      $n({
        find: _x,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Hn({
        find: Dx,
        type: this.type
      }),
      Hn({
        find: Nx,
        type: this.type
      })
    ];
  }
}), Rx = X.create({
  name: "listItem",
  addOptions() {
    return {
      HTMLAttributes: {},
      bulletListTypeName: "bulletList",
      orderedListTypeName: "orderedList"
    };
  },
  content: "paragraph block*",
  defining: !0,
  parseHTML() {
    return [
      {
        tag: "li"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["li", te(this.options.HTMLAttributes, n), 0];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
}), Ix = X.create({
  name: "listItem",
  addOptions() {
    return {
      HTMLAttributes: {},
      bulletListTypeName: "bulletList",
      orderedListTypeName: "orderedList"
    };
  },
  content: "paragraph block*",
  defining: !0,
  parseHTML() {
    return [
      {
        tag: "li"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["li", te(this.options.HTMLAttributes, n), 0];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
}), ad = de.create({
  name: "textStyle",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (n) => n.hasAttribute("style") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["span", te(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      removeEmptyTextStyle: () => ({ state: n, commands: e }) => {
        const t = No(n, this.type);
        return Object.entries(t).some(([, o]) => !!o) ? !0 : e.unsetMark(this.name);
      }
    };
  }
}), ld = /^(\d+)\.\s$/, Px = X.create({
  name: "orderedList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: !1,
      keepAttributes: !1
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  addAttributes() {
    return {
      start: {
        default: 1,
        parseHTML: (n) => n.hasAttribute("start") ? parseInt(n.getAttribute("start") || "", 10) : 1
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "ol"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    const { start: e, ...t } = n;
    return e === 1 ? ["ol", te(this.options.HTMLAttributes, t), 0] : ["ol", te(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands: n, chain: e }) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(Ix.name, this.editor.getAttributes(ad.name)).run() : n.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-7": () => this.editor.commands.toggleOrderedList()
    };
  },
  addInputRules() {
    let n = Or({
      find: ld,
      type: this.type,
      getAttributes: (e) => ({ start: +e[1] }),
      joinPredicate: (e, t) => t.childCount + t.attrs.start === +e[1]
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (n = Or({
      find: ld,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: (e) => ({ start: +e[1], ...this.editor.getAttributes(ad.name) }),
      joinPredicate: (e, t) => t.childCount + t.attrs.start === +e[1],
      editor: this.editor
    })), [
      n
    ];
  }
}), Bx = X.create({
  name: "paragraph",
  priority: 1e3,
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  content: "inline*",
  parseHTML() {
    return [
      { tag: "p" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["p", te(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setParagraph: () => ({ commands: n }) => n.setNode(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-0": () => this.editor.commands.setParagraph()
    };
  }
}), Fx = /(?:^|\s)((?:~~)((?:[^~]+))(?:~~))$/, qx = /(?:^|\s)((?:~~)((?:[^~]+))(?:~~))/g, zx = de.create({
  name: "strike",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "s"
      },
      {
        tag: "del"
      },
      {
        tag: "strike"
      },
      {
        style: "text-decoration",
        consuming: !1,
        getAttrs: (n) => n.includes("line-through") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["s", te(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setStrike: () => ({ commands: n }) => n.setMark(this.name),
      toggleStrike: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetStrike: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    const n = {};
    return zl() ? n["Mod-Shift-s"] = () => this.editor.commands.toggleStrike() : n["Ctrl-Shift-s"] = () => this.editor.commands.toggleStrike(), n;
  },
  addInputRules() {
    return [
      $n({
        find: Fx,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Hn({
        find: qx,
        type: this.type
      })
    ];
  }
}), $x = X.create({
  name: "text",
  group: "inline"
}), Hx = ue.create({
  name: "starterKit",
  addExtensions() {
    var n, e, t, r, o, s, i, a, l, c, u, d, f, p, h, m, g, v;
    const b = [];
    return this.options.blockquote !== !1 && b.push(W1.configure((n = this.options) === null || n === void 0 ? void 0 : n.blockquote)), this.options.bold !== !1 && b.push(Y1.configure((e = this.options) === null || e === void 0 ? void 0 : e.bold)), this.options.bulletList !== !1 && b.push(X1.configure((t = this.options) === null || t === void 0 ? void 0 : t.bulletList)), this.options.code !== !1 && b.push(nx.configure((r = this.options) === null || r === void 0 ? void 0 : r.code)), this.options.codeBlock !== !1 && b.push(sx.configure((o = this.options) === null || o === void 0 ? void 0 : o.codeBlock)), this.options.document !== !1 && b.push(ix.configure((s = this.options) === null || s === void 0 ? void 0 : s.document)), this.options.dropcursor !== !1 && b.push(cx.configure((i = this.options) === null || i === void 0 ? void 0 : i.dropcursor)), this.options.gapcursor !== !1 && b.push(yx.configure((a = this.options) === null || a === void 0 ? void 0 : a.gapcursor)), this.options.hardBreak !== !1 && b.push(vx.configure((l = this.options) === null || l === void 0 ? void 0 : l.hardBreak)), this.options.heading !== !1 && b.push(bx.configure((c = this.options) === null || c === void 0 ? void 0 : c.heading)), this.options.history !== !1 && b.push(Mx.configure((u = this.options) === null || u === void 0 ? void 0 : u.history)), this.options.horizontalRule !== !1 && b.push(bh.configure((d = this.options) === null || d === void 0 ? void 0 : d.horizontalRule)), this.options.italic !== !1 && b.push(Lx.configure((f = this.options) === null || f === void 0 ? void 0 : f.italic)), this.options.listItem !== !1 && b.push(Rx.configure((p = this.options) === null || p === void 0 ? void 0 : p.listItem)), this.options.orderedList !== !1 && b.push(Px.configure((h = this.options) === null || h === void 0 ? void 0 : h.orderedList)), this.options.paragraph !== !1 && b.push(Bx.configure((m = this.options) === null || m === void 0 ? void 0 : m.paragraph)), this.options.strike !== !1 && b.push(zx.configure((g = this.options) === null || g === void 0 ? void 0 : g.strike)), this.options.text !== !1 && b.push($x.configure((v = this.options) === null || v === void 0 ? void 0 : v.text)), b;
  }
}), Vx = "aaa1rp3barth4b0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0faromeo7ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4vianca6w0s2x0a2z0ure5ba0by2idu3namex3narepublic11d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2ntley5rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re2s2c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y0eats7k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0cast4mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking0channel11l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dabur3d1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3nlop4pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t0isalat7u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0at2delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d0network8tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntdoor4ier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2o0dyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0ardian6cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5gtv3iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0eles2s3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6logistics9properties14fh2g1h1i0a1ds2m1nder2le4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3ncaster5ia3d0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4de2k2psy3ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0cys3drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7serati6ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rckmsd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic3tual5v1w1x1y1z2na0b1goya4me2tura4vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rthwesternmutual14on4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9dnavy5lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3ssagens7y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0america6xi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0stone5umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cher3ks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0a1b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp2w2ell3ia1ksha5oes2p0ping5uji3w0time7i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ffany5ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0channel7ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lkswagen7vo3te1ing3o2yage5u0elos6wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2olterskluwer11odside6rk0s2ld3w2s1tc1f3xbox3erox4finity6ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", jx = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5تصالات6رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", Rr = (n, e) => {
  for (const t in e)
    n[t] = e[t];
  return n;
}, rl = "numeric", ol = "ascii", sl = "alpha", ms = "asciinumeric", ns = "alphanumeric", il = "domain", kh = "emoji", Ux = "scheme", Wx = "slashscheme", cd = "whitespace";
function Kx(n, e) {
  return n in e || (e[n] = []), e[n];
}
function Tn(n, e, t) {
  e[rl] && (e[ms] = !0, e[ns] = !0), e[ol] && (e[ms] = !0, e[sl] = !0), e[ms] && (e[ns] = !0), e[sl] && (e[ns] = !0), e[ns] && (e[il] = !0), e[kh] && (e[il] = !0);
  for (const r in e) {
    const o = Kx(r, t);
    o.indexOf(n) < 0 && o.push(n);
  }
}
function Gx(n, e) {
  const t = {};
  for (const r in e)
    e[r].indexOf(n) >= 0 && (t[r] = !0);
  return t;
}
function Re(n) {
  n === void 0 && (n = null), this.j = {}, this.jr = [], this.jd = null, this.t = n;
}
Re.groups = {};
Re.prototype = {
  accepts() {
    return !!this.t;
  },
  /**
   * Follow an existing transition from the given input to the next state.
   * Does not mutate.
   * @param {string} input character or token type to transition on
   * @returns {?State<T>} the next state, if any
   */
  go(n) {
    const e = this, t = e.j[n];
    if (t)
      return t;
    for (let r = 0; r < e.jr.length; r++) {
      const o = e.jr[r][0], s = e.jr[r][1];
      if (s && o.test(n))
        return s;
    }
    return e.jd;
  },
  /**
   * Whether the state has a transition for the given input. Set the second
   * argument to true to only look for an exact match (and not a default or
   * regular-expression-based transition)
   * @param {string} input
   * @param {boolean} exactOnly
   */
  has(n, e) {
    return e === void 0 && (e = !1), e ? n in this.j : !!this.go(n);
  },
  /**
   * Short for "transition all"; create a transition from the array of items
   * in the given list to the same final resulting state.
   * @param {string | string[]} inputs Group of inputs to transition on
   * @param {Transition<T> | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   */
  ta(n, e, t, r) {
    for (let o = 0; o < n.length; o++)
      this.tt(n[o], e, t, r);
  },
  /**
   * Short for "take regexp transition"; defines a transition for this state
   * when it encounters a token which matches the given regular expression
   * @param {RegExp} regexp Regular expression transition (populate first)
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  tr(n, e, t, r) {
    r = r || Re.groups;
    let o;
    return e && e.j ? o = e : (o = new Re(e), t && r && Tn(e, t, r)), this.jr.push([n, o]), o;
  },
  /**
   * Short for "take transitions", will take as many sequential transitions as
   * the length of the given input and returns the
   * resulting final state.
   * @param {string | string[]} input
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  ts(n, e, t, r) {
    let o = this;
    const s = n.length;
    if (!s)
      return o;
    for (let i = 0; i < s - 1; i++)
      o = o.tt(n[i]);
    return o.tt(n[s - 1], e, t, r);
  },
  /**
   * Short for "take transition", this is a method for building/working with
   * state machines.
   *
   * If a state already exists for the given input, returns it.
   *
   * If a token is specified, that state will emit that token when reached by
   * the linkify engine.
   *
   * If no state exists, it will be initialized with some default transitions
   * that resemble existing default transitions.
   *
   * If a state is given for the second argument, that state will be
   * transitioned to on the given input regardless of what that input
   * previously did.
   *
   * Specify a token group flags to define groups that this token belongs to.
   * The token will be added to corresponding entires in the given groups
   * object.
   *
   * @param {string} input character, token type to transition on
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of groups
   * @returns {State<T>} taken after the given input
   */
  tt(n, e, t, r) {
    r = r || Re.groups;
    const o = this;
    if (e && e.j)
      return o.j[n] = e, e;
    const s = e;
    let i, a = o.go(n);
    if (a ? (i = new Re(), Rr(i.j, a.j), i.jr.push.apply(i.jr, a.jr), i.jd = a.jd, i.t = a.t) : i = new Re(), s) {
      if (r)
        if (i.t && typeof i.t == "string") {
          const l = Rr(Gx(i.t, r), t);
          Tn(s, l, r);
        } else
          t && Tn(s, t, r);
      i.t = s;
    }
    return o.j[n] = i, i;
  }
};
const B = (n, e, t, r, o) => n.ta(e, t, r, o), Ke = (n, e, t, r, o) => n.tr(e, t, r, o), ud = (n, e, t, r, o) => n.ts(e, t, r, o), O = (n, e, t, r, o) => n.tt(e, t, r, o), Lt = "WORD", al = "UWORD", Co = "LOCALHOST", ll = "TLD", cl = "UTLD", gs = "SCHEME", cr = "SLASH_SCHEME", ec = "NUM", xh = "WS", tc = "NL", fr = "OPENBRACE", so = "OPENBRACKET", io = "OPENANGLEBRACKET", ao = "OPENPAREN", Sn = "CLOSEBRACE", pr = "CLOSEBRACKET", hr = "CLOSEANGLEBRACKET", Cn = "CLOSEPAREN", Rs = "AMPERSAND", Is = "APOSTROPHE", Ps = "ASTERISK", Jt = "AT", Bs = "BACKSLASH", Fs = "BACKTICK", qs = "CARET", Xt = "COLON", nc = "COMMA", zs = "DOLLAR", dt = "DOT", $s = "EQUALS", rc = "EXCLAMATION", ft = "HYPHEN", Hs = "PERCENT", Vs = "PIPE", js = "PLUS", Us = "POUND", Ws = "QUERY", oc = "QUOTE", sc = "SEMI", pt = "SLASH", lo = "TILDE", Ks = "UNDERSCORE", wh = "EMOJI", Gs = "SYM";
var Sh = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  WORD: Lt,
  UWORD: al,
  LOCALHOST: Co,
  TLD: ll,
  UTLD: cl,
  SCHEME: gs,
  SLASH_SCHEME: cr,
  NUM: ec,
  WS: xh,
  NL: tc,
  OPENBRACE: fr,
  OPENBRACKET: so,
  OPENANGLEBRACKET: io,
  OPENPAREN: ao,
  CLOSEBRACE: Sn,
  CLOSEBRACKET: pr,
  CLOSEANGLEBRACKET: hr,
  CLOSEPAREN: Cn,
  AMPERSAND: Rs,
  APOSTROPHE: Is,
  ASTERISK: Ps,
  AT: Jt,
  BACKSLASH: Bs,
  BACKTICK: Fs,
  CARET: qs,
  COLON: Xt,
  COMMA: nc,
  DOLLAR: zs,
  DOT: dt,
  EQUALS: $s,
  EXCLAMATION: rc,
  HYPHEN: ft,
  PERCENT: Hs,
  PIPE: Vs,
  PLUS: js,
  POUND: Us,
  QUERY: Ws,
  QUOTE: oc,
  SEMI: sc,
  SLASH: pt,
  TILDE: lo,
  UNDERSCORE: Ks,
  EMOJI: wh,
  SYM: Gs
});
const nr = /[a-z]/, la = /\p{L}/u, ca = /\p{Emoji}/u, ua = /\d/, dd = /\s/, fd = `
`, Jx = "️", Zx = "‍";
let rs = null, ss = null;
function Yx(n) {
  n === void 0 && (n = []);
  const e = {};
  Re.groups = e;
  const t = new Re();
  rs == null && (rs = pd(Vx)), ss == null && (ss = pd(jx)), O(t, "'", Is), O(t, "{", fr), O(t, "[", so), O(t, "<", io), O(t, "(", ao), O(t, "}", Sn), O(t, "]", pr), O(t, ">", hr), O(t, ")", Cn), O(t, "&", Rs), O(t, "*", Ps), O(t, "@", Jt), O(t, "`", Fs), O(t, "^", qs), O(t, ":", Xt), O(t, ",", nc), O(t, "$", zs), O(t, ".", dt), O(t, "=", $s), O(t, "!", rc), O(t, "-", ft), O(t, "%", Hs), O(t, "|", Vs), O(t, "+", js), O(t, "#", Us), O(t, "?", Ws), O(t, '"', oc), O(t, "/", pt), O(t, ";", sc), O(t, "~", lo), O(t, "_", Ks), O(t, "\\", Bs);
  const r = Ke(t, ua, ec, {
    [rl]: !0
  });
  Ke(r, ua, r);
  const o = Ke(t, nr, Lt, {
    [ol]: !0
  });
  Ke(o, nr, o);
  const s = Ke(t, la, al, {
    [sl]: !0
  });
  Ke(s, nr), Ke(s, la, s);
  const i = Ke(t, dd, xh, {
    [cd]: !0
  });
  O(t, fd, tc, {
    [cd]: !0
  }), O(i, fd), Ke(i, dd, i);
  const a = Ke(t, ca, wh, {
    [kh]: !0
  });
  Ke(a, ca, a), O(a, Jx, a);
  const l = O(a, Zx);
  Ke(l, ca, a);
  const c = [[nr, o]], u = [[nr, null], [la, s]];
  for (let d = 0; d < rs.length; d++)
    Wt(t, rs[d], ll, Lt, c);
  for (let d = 0; d < ss.length; d++)
    Wt(t, ss[d], cl, al, u);
  Tn(ll, {
    tld: !0,
    ascii: !0
  }, e), Tn(cl, {
    utld: !0,
    alpha: !0
  }, e), Wt(t, "file", gs, Lt, c), Wt(t, "mailto", gs, Lt, c), Wt(t, "http", cr, Lt, c), Wt(t, "https", cr, Lt, c), Wt(t, "ftp", cr, Lt, c), Wt(t, "ftps", cr, Lt, c), Tn(gs, {
    scheme: !0,
    ascii: !0
  }, e), Tn(cr, {
    slashscheme: !0,
    ascii: !0
  }, e), n = n.sort((d, f) => d[0] > f[0] ? 1 : -1);
  for (let d = 0; d < n.length; d++) {
    const f = n[d][0], h = n[d][1] ? {
      [Ux]: !0
    } : {
      [Wx]: !0
    };
    f.indexOf("-") >= 0 ? h[il] = !0 : nr.test(f) ? ua.test(f) ? h[ms] = !0 : h[ol] = !0 : h[rl] = !0, ud(t, f, f, h);
  }
  return ud(t, "localhost", Co, {
    ascii: !0
  }), t.jd = new Re(Gs), {
    start: t,
    tokens: Rr({
      groups: e
    }, Sh)
  };
}
function Qx(n, e) {
  const t = Xx(e.replace(/[A-Z]/g, (a) => a.toLowerCase())), r = t.length, o = [];
  let s = 0, i = 0;
  for (; i < r; ) {
    let a = n, l = null, c = 0, u = null, d = -1, f = -1;
    for (; i < r && (l = a.go(t[i])); )
      a = l, a.accepts() ? (d = 0, f = 0, u = a) : d >= 0 && (d += t[i].length, f++), c += t[i].length, s += t[i].length, i++;
    s -= d, i -= f, c -= d, o.push({
      t: u.t,
      // token type/name
      v: e.slice(s - c, s),
      // string value
      s: s - c,
      // start index
      e: s
      // end index (excluding)
    });
  }
  return o;
}
function Xx(n) {
  const e = [], t = n.length;
  let r = 0;
  for (; r < t; ) {
    let o = n.charCodeAt(r), s, i = o < 55296 || o > 56319 || r + 1 === t || (s = n.charCodeAt(r + 1)) < 56320 || s > 57343 ? n[r] : n.slice(r, r + 2);
    e.push(i), r += i.length;
  }
  return e;
}
function Wt(n, e, t, r, o) {
  let s;
  const i = e.length;
  for (let a = 0; a < i - 1; a++) {
    const l = e[a];
    n.j[l] ? s = n.j[l] : (s = new Re(r), s.jr = o.slice(), n.j[l] = s), n = s;
  }
  return s = new Re(t), s.jr = o.slice(), n.j[e[i - 1]] = s, s;
}
function pd(n) {
  const e = [], t = [];
  let r = 0, o = "0123456789";
  for (; r < n.length; ) {
    let s = 0;
    for (; o.indexOf(n[r + s]) >= 0; )
      s++;
    if (s > 0) {
      e.push(t.join(""));
      for (let i = parseInt(n.substring(r, r + s), 10); i > 0; i--)
        t.pop();
      r += s;
    } else
      t.push(n[r]), r++;
  }
  return e;
}
const Eo = {
  defaultProtocol: "http",
  events: null,
  format: hd,
  formatHref: hd,
  nl2br: !1,
  tagName: "a",
  target: null,
  rel: null,
  validate: !0,
  truncate: 1 / 0,
  className: null,
  attributes: null,
  ignoreTags: [],
  render: null
};
function ic(n, e) {
  e === void 0 && (e = null);
  let t = Rr({}, Eo);
  n && (t = Rr(t, n instanceof ic ? n.o : n));
  const r = t.ignoreTags, o = [];
  for (let s = 0; s < r.length; s++)
    o.push(r[s].toUpperCase());
  this.o = t, e && (this.defaultRender = e), this.ignoreTags = o;
}
ic.prototype = {
  o: Eo,
  /**
   * @type string[]
   */
  ignoreTags: [],
  /**
   * @param {IntermediateRepresentation} ir
   * @returns {any}
   */
  defaultRender(n) {
    return n;
  },
  /**
   * Returns true or false based on whether a token should be displayed as a
   * link based on the user options.
   * @param {MultiToken} token
   * @returns {boolean}
   */
  check(n) {
    return this.get("validate", n.toString(), n);
  },
  // Private methods
  /**
   * Resolve an option's value based on the value of the option and the given
   * params. If operator and token are specified and the target option is
   * callable, automatically calls the function with the given argument.
   * @template {keyof Opts} K
   * @param {K} key Name of option to use
   * @param {string} [operator] will be passed to the target option if it's a
   * function. If not specified, RAW function value gets returned
   * @param {MultiToken} [token] The token from linkify.tokenize
   * @returns {Opts[K] | any}
   */
  get(n, e, t) {
    const r = e != null;
    let o = this.o[n];
    return o && (typeof o == "object" ? (o = t.t in o ? o[t.t] : Eo[n], typeof o == "function" && r && (o = o(e, t))) : typeof o == "function" && r && (o = o(e, t.t, t)), o);
  },
  /**
   * @template {keyof Opts} L
   * @param {L} key Name of options object to use
   * @param {string} [operator]
   * @param {MultiToken} [token]
   * @returns {Opts[L] | any}
   */
  getObj(n, e, t) {
    let r = this.o[n];
    return typeof r == "function" && e != null && (r = r(e, t.t, t)), r;
  },
  /**
   * Convert the given token to a rendered element that may be added to the
   * calling-interface's DOM
   * @param {MultiToken} token Token to render to an HTML element
   * @returns {any} Render result; e.g., HTML string, DOM element, React
   *   Component, etc.
   */
  render(n) {
    const e = n.render(this);
    return (this.get("render", null, n) || this.defaultRender)(e, n.t, n);
  }
};
function hd(n) {
  return n;
}
function Ch(n, e) {
  this.t = "token", this.v = n, this.tk = e;
}
Ch.prototype = {
  isLink: !1,
  /**
   * Return the string this token represents.
   * @return {string}
   */
  toString() {
    return this.v;
  },
  /**
   * What should the value for this token be in the `href` HTML attribute?
   * Returns the `.toString` value by default.
   * @param {string} [scheme]
   * @return {string}
  */
  toHref(n) {
    return this.toString();
  },
  /**
   * @param {Options} options Formatting options
   * @returns {string}
   */
  toFormattedString(n) {
    const e = this.toString(), t = n.get("truncate", e, this), r = n.get("format", e, this);
    return t && r.length > t ? r.substring(0, t) + "…" : r;
  },
  /**
   *
   * @param {Options} options
   * @returns {string}
   */
  toFormattedHref(n) {
    return n.get("formatHref", this.toHref(n.get("defaultProtocol")), this);
  },
  /**
   * The start index of this token in the original input string
   * @returns {number}
   */
  startIndex() {
    return this.tk[0].s;
  },
  /**
   * The end index of this token in the original input string (up to this
   * index but not including it)
   * @returns {number}
   */
  endIndex() {
    return this.tk[this.tk.length - 1].e;
  },
  /**
  	Returns an object  of relevant values for this token, which includes keys
  	* type - Kind of token ('url', 'email', etc.)
  	* value - Original text
  	* href - The value that should be added to the anchor tag's href
  		attribute
  		@method toObject
  	@param {string} [protocol] `'http'` by default
  */
  toObject(n) {
    return n === void 0 && (n = Eo.defaultProtocol), {
      type: this.t,
      value: this.toString(),
      isLink: this.isLink,
      href: this.toHref(n),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   *
   * @param {Options} options Formatting option
   */
  toFormattedObject(n) {
    return {
      type: this.t,
      value: this.toFormattedString(n),
      isLink: this.isLink,
      href: this.toFormattedHref(n),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   * Whether this token should be rendered as a link according to the given options
   * @param {Options} options
   * @returns {boolean}
   */
  validate(n) {
    return n.get("validate", this.toString(), this);
  },
  /**
   * Return an object that represents how this link should be rendered.
   * @param {Options} options Formattinng options
   */
  render(n) {
    const e = this, t = this.toHref(n.get("defaultProtocol")), r = n.get("formatHref", t, this), o = n.get("tagName", t, e), s = this.toFormattedString(n), i = {}, a = n.get("className", t, e), l = n.get("target", t, e), c = n.get("rel", t, e), u = n.getObj("attributes", t, e), d = n.getObj("events", t, e);
    return i.href = r, a && (i.class = a), l && (i.target = l), c && (i.rel = c), u && Rr(i, u), {
      tagName: o,
      attributes: i,
      content: s,
      eventListeners: d
    };
  }
};
function gi(n, e) {
  class t extends Ch {
    constructor(o, s) {
      super(o, s), this.t = n;
    }
  }
  for (const r in e)
    t.prototype[r] = e[r];
  return t.t = n, t;
}
const md = gi("email", {
  isLink: !0,
  toHref() {
    return "mailto:" + this.toString();
  }
}), gd = gi("text"), ew = gi("nl"), vn = gi("url", {
  isLink: !0,
  /**
  	Lowercases relevant parts of the domain and adds the protocol if
  	required. Note that this will not escape unsafe HTML characters in the
  	URL.
  		@param {string} [scheme] default scheme (e.g., 'https')
  	@return {string} the full href
  */
  toHref(n) {
    return n === void 0 && (n = Eo.defaultProtocol), this.hasProtocol() ? this.v : `${n}://${this.v}`;
  },
  /**
   * Check whether this URL token has a protocol
   * @return {boolean}
   */
  hasProtocol() {
    const n = this.tk;
    return n.length >= 2 && n[0].t !== Co && n[1].t === Xt;
  }
}), me = (n) => new Re(n);
function tw(n) {
  let {
    groups: e
  } = n;
  const t = e.domain.concat([Rs, Ps, Jt, Bs, Fs, qs, zs, $s, ft, ec, Hs, Vs, js, Us, pt, Gs, lo, Ks]), r = [Is, hr, Sn, pr, Cn, Xt, nc, dt, rc, io, fr, so, ao, Ws, oc, sc], o = [Rs, Is, Ps, Bs, Fs, qs, Sn, zs, $s, ft, fr, Hs, Vs, js, Us, Ws, pt, Gs, lo, Ks], s = me(), i = O(s, lo);
  B(i, o, i), B(i, e.domain, i);
  const a = me(), l = me(), c = me();
  B(s, e.domain, a), B(s, e.scheme, l), B(s, e.slashscheme, c), B(a, o, i), B(a, e.domain, a);
  const u = O(a, Jt);
  O(i, Jt, u), O(l, Jt, u), O(c, Jt, u);
  const d = O(i, dt);
  B(d, o, i), B(d, e.domain, i);
  const f = me();
  B(u, e.domain, f), B(f, e.domain, f);
  const p = O(f, dt);
  B(p, e.domain, f);
  const h = me(md);
  B(p, e.tld, h), B(p, e.utld, h), O(u, Co, h);
  const m = O(f, ft);
  B(m, e.domain, f), B(h, e.domain, f), O(h, dt, p), O(h, ft, m);
  const g = O(h, Xt);
  B(g, e.numeric, md);
  const v = O(a, ft), b = O(a, dt);
  B(v, e.domain, a), B(b, o, i), B(b, e.domain, a);
  const x = me(vn);
  B(b, e.tld, x), B(b, e.utld, x), B(x, e.domain, a), B(x, o, i), O(x, dt, b), O(x, ft, v), O(x, Jt, u);
  const y = O(x, Xt), w = me(vn);
  B(y, e.numeric, w);
  const k = me(vn), S = me();
  B(k, t, k), B(k, r, S), B(S, t, k), B(S, r, S), O(x, pt, k), O(w, pt, k);
  const E = O(l, Xt), T = O(c, Xt), D = O(T, pt), _ = O(D, pt);
  B(l, e.domain, a), O(l, dt, b), O(l, ft, v), B(c, e.domain, a), O(c, dt, b), O(c, ft, v), B(E, e.domain, k), O(E, pt, k), B(_, e.domain, k), B(_, t, k), O(_, pt, k);
  const F = O(k, fr), P = O(k, so), A = O(k, io), q = O(k, ao);
  O(S, fr, F), O(S, so, P), O(S, io, A), O(S, ao, q), O(F, Sn, k), O(P, pr, k), O(A, hr, k), O(q, Cn, k), O(F, Sn, k);
  const L = me(vn), z = me(vn), K = me(vn), ne = me(vn);
  B(F, t, L), B(P, t, z), B(A, t, K), B(q, t, ne);
  const he = me(), Se = me(), Me = me(), Ue = me();
  return B(F, r), B(P, r), B(A, r), B(q, r), B(L, t, L), B(z, t, z), B(K, t, K), B(ne, t, ne), B(L, r, L), B(z, r, z), B(K, r, K), B(ne, r, ne), B(he, t, he), B(Se, t, z), B(Me, t, K), B(Ue, t, ne), B(he, r, he), B(Se, r, Se), B(Me, r, Me), B(Ue, r, Ue), O(z, pr, k), O(K, hr, k), O(ne, Cn, k), O(L, Sn, k), O(Se, pr, k), O(Me, hr, k), O(Ue, Cn, k), O(he, Cn, k), O(s, Co, x), O(s, tc, ew), {
    start: s,
    tokens: Sh
  };
}
function nw(n, e, t) {
  let r = t.length, o = 0, s = [], i = [];
  for (; o < r; ) {
    let a = n, l = null, c = null, u = 0, d = null, f = -1;
    for (; o < r && !(l = a.go(t[o].t)); )
      i.push(t[o++]);
    for (; o < r && (c = l || a.go(t[o].t)); )
      l = null, a = c, a.accepts() ? (f = 0, d = a) : f >= 0 && f++, o++, u++;
    if (f < 0)
      o -= u, o < r && (i.push(t[o]), o++);
    else {
      i.length > 0 && (s.push(da(gd, e, i)), i = []), o -= f, u -= f;
      const p = d.t, h = t.slice(o - u, o);
      s.push(da(p, e, h));
    }
  }
  return i.length > 0 && s.push(da(gd, e, i)), s;
}
function da(n, e, t) {
  const r = t[0].s, o = t[t.length - 1].e, s = e.slice(r, o);
  return new n(s, t);
}
const rw = typeof console < "u" && console && console.warn || (() => {
}), ow = "until manual call of linkify.init(). Register all schemes and plugins before invoking linkify the first time.", oe = {
  scanner: null,
  parser: null,
  tokenQueue: [],
  pluginQueue: [],
  customSchemes: [],
  initialized: !1
};
function sw() {
  Re.groups = {}, oe.scanner = null, oe.parser = null, oe.tokenQueue = [], oe.pluginQueue = [], oe.customSchemes = [], oe.initialized = !1;
}
function yd(n, e) {
  if (e === void 0 && (e = !1), oe.initialized && rw(`linkifyjs: already initialized - will not register custom scheme "${n}" ${ow}`), !/^[0-9a-z]+(-[0-9a-z]+)*$/.test(n))
    throw new Error(`linkifyjs: incorrect scheme format.
 1. Must only contain digits, lowercase ASCII letters or "-"
 2. Cannot start or end with "-"
 3. "-" cannot repeat`);
  oe.customSchemes.push([n, e]);
}
function iw() {
  oe.scanner = Yx(oe.customSchemes);
  for (let n = 0; n < oe.tokenQueue.length; n++)
    oe.tokenQueue[n][1]({
      scanner: oe.scanner
    });
  oe.parser = tw(oe.scanner.tokens);
  for (let n = 0; n < oe.pluginQueue.length; n++)
    oe.pluginQueue[n][1]({
      scanner: oe.scanner,
      parser: oe.parser
    });
  oe.initialized = !0;
}
function aw(n) {
  return oe.initialized || iw(), nw(oe.parser.start, n, Qx(oe.scanner.start, n));
}
function ul(n, e, t) {
  if (e === void 0 && (e = null), t === void 0 && (t = null), e && typeof e == "object") {
    if (t)
      throw Error(`linkifyjs: Invalid link type ${e}; must be a string`);
    t = e, e = null;
  }
  const r = new ic(t), o = aw(n), s = [];
  for (let i = 0; i < o.length; i++) {
    const a = o[i];
    a.isLink && (!e || a.t === e) && s.push(a.toFormattedObject(r));
  }
  return s;
}
function lw(n) {
  return new fe({
    key: new Te("autolink"),
    appendTransaction: (e, t, r) => {
      const o = e.some((c) => c.docChanged) && !t.doc.eq(r.doc), s = e.some((c) => c.getMeta("preventAutolink"));
      if (!o || s)
        return;
      const { tr: i } = r, a = $v(t.doc, [...e]);
      if (Jv(a).forEach(({ newRange: c }) => {
        const u = Vv(r.doc, c, (p) => p.isTextblock);
        let d, f;
        if (u.length > 1 ? (d = u[0], f = r.doc.textBetween(d.pos, d.pos + d.node.nodeSize, void 0, " ")) : u.length && r.doc.textBetween(c.from, c.to, " ", " ").endsWith(" ") && (d = u[0], f = r.doc.textBetween(d.pos, c.to, void 0, " ")), d && f) {
          const p = f.split(" ").filter((g) => g !== "");
          if (p.length <= 0)
            return !1;
          const h = p[p.length - 1], m = d.pos + f.lastIndexOf(h);
          if (!h)
            return !1;
          ul(h).filter((g) => g.isLink).map((g) => ({
            ...g,
            from: m + g.start + 1,
            to: m + g.end + 1
          })).filter((g) => r.schema.marks.code ? !r.doc.rangeHasMark(g.from, g.to, r.schema.marks.code) : !0).filter((g) => n.validate ? n.validate(g.value) : !0).forEach((g) => {
            Vl(g.from, g.to, r.doc).some((v) => v.mark.type === n.type) || i.addMark(g.from, g.to, n.type.create({
              href: g.href
            }));
          });
        }
      }), !!i.steps.length)
        return i;
    }
  });
}
function cw(n) {
  return new fe({
    key: new Te("handleClickLink"),
    props: {
      handleClick: (e, t, r) => {
        var o, s;
        if (r.button !== 0)
          return !1;
        const i = Fp(e.state, n.type.name), a = r.target, l = (o = a == null ? void 0 : a.href) !== null && o !== void 0 ? o : i.href, c = (s = a == null ? void 0 : a.target) !== null && s !== void 0 ? s : i.target;
        return a && l ? (e.editable && window.open(l, c), !0) : !1;
      }
    }
  });
}
function uw(n) {
  return new fe({
    key: new Te("handlePasteLink"),
    props: {
      handlePaste: (e, t, r) => {
        var o, s;
        const { state: i } = e, { selection: a } = i;
        if (i.doc.resolve(a.from).parent.type.spec.code)
          return !1;
        let l = "";
        r.content.forEach((b) => {
          l += b.textContent;
        });
        let c = !1;
        if (r.content.descendants((b) => {
          b.marks.some((x) => x.type.name === n.type.name) && (c = !0);
        }), c)
          return;
        const u = ul(l).find((b) => b.isLink && b.value === l);
        if (!a.empty && n.linkOnPaste) {
          const b = (u == null ? void 0 : u.href) || null;
          if (b)
            return n.editor.commands.setMark(n.type, { href: b }), !0;
        }
        const d = ((o = r.content.firstChild) === null || o === void 0 ? void 0 : o.type.name) === "text", f = (s = r.content.firstChild) === null || s === void 0 ? void 0 : s.marks.some((b) => b.type.name === n.type.name);
        if (d && f || !n.linkOnPaste)
          return !1;
        if (u && a.empty)
          return n.editor.commands.insertContent(`<a href="${u.href}">${u.href}</a>`), !0;
        const { tr: p } = i;
        let h = !1;
        a.empty || (h = !0, p.delete(a.from, a.to));
        let m = a.from, g = [];
        r.content.forEach((b) => {
          g = ul(b.textContent), p.insert(m - 1, b), g.length > 0 && (h = !1, g.forEach((x) => {
            const y = m + x.start, w = m + x.end;
            p.doc.rangeHasMark(y, w, n.type) || p.addMark(y, w, n.type.create({ href: x.href }));
          })), m += b.nodeSize;
        });
        const v = g.length > 0;
        return p.docChanged && !h && v ? (n.editor.view.dispatch(p), !0) : !1;
      }
    }
  });
}
const dw = de.create({
  name: "link",
  priority: 1e3,
  keepOnSplit: !1,
  onCreate() {
    this.options.protocols.forEach((n) => {
      if (typeof n == "string") {
        yd(n);
        return;
      }
      yd(n.scheme, n.optionalSlashes);
    });
  },
  onDestroy() {
    sw();
  },
  inclusive() {
    return this.options.autolink;
  },
  addOptions() {
    return {
      openOnClick: !0,
      linkOnPaste: !0,
      autolink: !0,
      protocols: [],
      HTMLAttributes: {
        target: "_blank",
        rel: "noopener noreferrer nofollow",
        class: null
      },
      validate: void 0
    };
  },
  addAttributes() {
    return {
      href: {
        default: null
      },
      target: {
        default: this.options.HTMLAttributes.target
      },
      rel: {
        default: this.options.HTMLAttributes.rel
      },
      class: {
        default: this.options.HTMLAttributes.class
      }
    };
  },
  parseHTML() {
    return [{ tag: 'a[href]:not([href *= "javascript:" i])' }];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["a", te(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setLink: (n) => ({ chain: e }) => e().setMark(this.name, n).setMeta("preventAutolink", !0).run(),
      toggleLink: (n) => ({ chain: e }) => e().toggleMark(this.name, n, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run(),
      unsetLink: () => ({ chain: n }) => n().unsetMark(this.name, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run()
    };
  },
  addProseMirrorPlugins() {
    const n = [];
    return this.options.autolink && n.push(lw({
      type: this.type,
      validate: this.options.validate
    })), this.options.openOnClick && n.push(cw({
      type: this.type
    })), n.push(uw({
      editor: this.editor,
      type: this.type,
      linkOnPaste: this.options.linkOnPaste
    })), n;
  }
}), fw = ue.create({
  name: "placeholder",
  addOptions() {
    return {
      emptyEditorClass: "is-editor-empty",
      emptyNodeClass: "is-empty",
      placeholder: "Write something …",
      showOnlyWhenEditable: !0,
      showOnlyCurrent: !0,
      includeChildren: !1
    };
  },
  addProseMirrorPlugins() {
    return [
      new fe({
        key: new Te("placeholder"),
        props: {
          decorations: ({ doc: n, selection: e }) => {
            const t = this.editor.isEditable || !this.options.showOnlyWhenEditable, { anchor: r } = e, o = [];
            if (!t)
              return null;
            const s = n.type.createAndFill(), i = (s == null ? void 0 : s.sameMarkup(n)) && s.content.findDiffStart(n.content) === null;
            return n.descendants((a, l) => {
              const c = r >= l && r <= l + a.nodeSize, u = !a.isLeaf && !a.childCount;
              if ((c || !this.options.showOnlyCurrent) && u) {
                const d = [this.options.emptyNodeClass];
                i && d.push(this.options.emptyEditorClass);
                const f = Ie.node(l, l + a.nodeSize, {
                  class: d.join(" "),
                  "data-placeholder": typeof this.options.placeholder == "function" ? this.options.placeholder({
                    editor: this.editor,
                    node: a,
                    pos: l,
                    hasAnchor: c
                  }) : this.options.placeholder
                });
                o.push(f);
              }
              return this.options.includeChildren;
            }), ce.create(n, o);
          }
        }
      })
    ];
  }
}), pw = de.create({
  name: "underline",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "u"
      },
      {
        style: "text-decoration",
        consuming: !1,
        getAttrs: (n) => n.includes("underline") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["u", te(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setUnderline: () => ({ commands: n }) => n.setMark(this.name),
      toggleUnderline: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetUnderline: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-u": () => this.editor.commands.toggleUnderline(),
      "Mod-U": () => this.editor.commands.toggleUnderline()
    };
  }
}), hw = de.create({
  name: "textStyle",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (n) => n.hasAttribute("style") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["span", te(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      removeEmptyTextStyle: () => ({ state: n, commands: e }) => {
        const t = No(n, this.type);
        return Object.entries(t).some(([, o]) => !!o) ? !0 : e.unsetMark(this.name);
      }
    };
  }
}), mw = ue.create({
  name: "color",
  addOptions() {
    return {
      types: ["textStyle"]
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          color: {
            default: null,
            parseHTML: (n) => {
              var e;
              return (e = n.style.color) === null || e === void 0 ? void 0 : e.replace(/['"]+/g, "");
            },
            renderHTML: (n) => n.color ? {
              style: `color: ${n.color}`
            } : {}
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setColor: (n) => ({ chain: e }) => e().setMark("textStyle", { color: n }).run(),
      unsetColor: () => ({ chain: n }) => n().setMark("textStyle", { color: null }).removeEmptyTextStyle().run()
    };
  }
}), gw = /^\s*(\[([( |x])?\])\s$/, yw = X.create({
  name: "taskItem",
  addOptions() {
    return {
      nested: !1,
      HTMLAttributes: {},
      taskListTypeName: "taskList"
    };
  },
  content() {
    return this.options.nested ? "paragraph block*" : "paragraph+";
  },
  defining: !0,
  addAttributes() {
    return {
      checked: {
        default: !1,
        keepOnSplit: !1,
        parseHTML: (n) => n.getAttribute("data-checked") === "true",
        renderHTML: (n) => ({
          "data-checked": n.checked
        })
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: `li[data-type="${this.name}"]`,
        priority: 51
      }
    ];
  },
  renderHTML({ node: n, HTMLAttributes: e }) {
    return [
      "li",
      te(this.options.HTMLAttributes, e, {
        "data-type": this.name
      }),
      [
        "label",
        [
          "input",
          {
            type: "checkbox",
            checked: n.attrs.checked ? "checked" : null
          }
        ],
        ["span"]
      ],
      ["div", 0]
    ];
  },
  addKeyboardShortcuts() {
    const n = {
      Enter: () => this.editor.commands.splitListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
    return this.options.nested ? {
      ...n,
      Tab: () => this.editor.commands.sinkListItem(this.name)
    } : n;
  },
  addNodeView() {
    return ({ node: n, HTMLAttributes: e, getPos: t, editor: r }) => {
      const o = document.createElement("li"), s = document.createElement("label"), i = document.createElement("span"), a = document.createElement("input"), l = document.createElement("div");
      return s.contentEditable = "false", a.type = "checkbox", a.addEventListener("change", (c) => {
        if (!r.isEditable && !this.options.onReadOnlyChecked) {
          a.checked = !a.checked;
          return;
        }
        const { checked: u } = c.target;
        r.isEditable && typeof t == "function" && r.chain().focus(void 0, { scrollIntoView: !1 }).command(({ tr: d }) => {
          const f = t(), p = d.doc.nodeAt(f);
          return d.setNodeMarkup(f, void 0, {
            ...p == null ? void 0 : p.attrs,
            checked: u
          }), !0;
        }).run(), !r.isEditable && this.options.onReadOnlyChecked && (this.options.onReadOnlyChecked(n, u) || (a.checked = !a.checked));
      }), Object.entries(this.options.HTMLAttributes).forEach(([c, u]) => {
        o.setAttribute(c, u);
      }), o.dataset.checked = n.attrs.checked, n.attrs.checked && a.setAttribute("checked", "checked"), s.append(a, i), o.append(s, l), Object.entries(e).forEach(([c, u]) => {
        o.setAttribute(c, u);
      }), {
        dom: o,
        contentDOM: l,
        update: (c) => c.type !== this.type ? !1 : (o.dataset.checked = c.attrs.checked, c.attrs.checked ? a.setAttribute("checked", "checked") : a.removeAttribute("checked"), !0)
      };
    };
  },
  addInputRules() {
    return [
      Or({
        find: gw,
        type: this.type,
        getAttributes: (n) => ({
          checked: n[n.length - 1] === "x"
        })
      })
    ];
  }
}), vw = X.create({
  name: "taskList",
  addOptions() {
    return {
      itemTypeName: "taskItem",
      HTMLAttributes: {}
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  parseHTML() {
    return [
      {
        tag: `ul[data-type="${this.name}"]`,
        priority: 51
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["ul", te(this.options.HTMLAttributes, n, { "data-type": this.name }), 0];
  },
  addCommands() {
    return {
      toggleTaskList: () => ({ commands: n }) => n.toggleList(this.name, this.options.itemTypeName)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-9": () => this.editor.commands.toggleTaskList()
    };
  }
});
function Eh(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
function bw(n) {
  if (n.__esModule)
    return n;
  var e = n.default;
  if (typeof e == "function") {
    var t = function r() {
      return this instanceof r ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else
    t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(n).forEach(function(r) {
    var o = Object.getOwnPropertyDescriptor(n, r);
    Object.defineProperty(t, r, o.get ? o : {
      enumerable: !0,
      get: function() {
        return n[r];
      }
    });
  }), t;
}
var Y = {};
const kw = "Á", xw = "á", ww = "Ă", Sw = "ă", Cw = "∾", Ew = "∿", Aw = "∾̳", Tw = "Â", Mw = "â", Ow = "´", Dw = "А", _w = "а", Nw = "Æ", Lw = "æ", Rw = "⁡", Iw = "𝔄", Pw = "𝔞", Bw = "À", Fw = "à", qw = "ℵ", zw = "ℵ", $w = "Α", Hw = "α", Vw = "Ā", jw = "ā", Uw = "⨿", Ww = "&", Kw = "&", Gw = "⩕", Jw = "⩓", Zw = "∧", Yw = "⩜", Qw = "⩘", Xw = "⩚", eS = "∠", tS = "⦤", nS = "∠", rS = "⦨", oS = "⦩", sS = "⦪", iS = "⦫", aS = "⦬", lS = "⦭", cS = "⦮", uS = "⦯", dS = "∡", fS = "∟", pS = "⊾", hS = "⦝", mS = "∢", gS = "Å", yS = "⍼", vS = "Ą", bS = "ą", kS = "𝔸", xS = "𝕒", wS = "⩯", SS = "≈", CS = "⩰", ES = "≊", AS = "≋", TS = "'", MS = "⁡", OS = "≈", DS = "≊", _S = "Å", NS = "å", LS = "𝒜", RS = "𝒶", IS = "≔", PS = "*", BS = "≈", FS = "≍", qS = "Ã", zS = "ã", $S = "Ä", HS = "ä", VS = "∳", jS = "⨑", US = "≌", WS = "϶", KS = "‵", GS = "∽", JS = "⋍", ZS = "∖", YS = "⫧", QS = "⊽", XS = "⌅", eC = "⌆", tC = "⌅", nC = "⎵", rC = "⎶", oC = "≌", sC = "Б", iC = "б", aC = "„", lC = "∵", cC = "∵", uC = "∵", dC = "⦰", fC = "϶", pC = "ℬ", hC = "ℬ", mC = "Β", gC = "β", yC = "ℶ", vC = "≬", bC = "𝔅", kC = "𝔟", xC = "⋂", wC = "◯", SC = "⋃", CC = "⨀", EC = "⨁", AC = "⨂", TC = "⨆", MC = "★", OC = "▽", DC = "△", _C = "⨄", NC = "⋁", LC = "⋀", RC = "⤍", IC = "⧫", PC = "▪", BC = "▴", FC = "▾", qC = "◂", zC = "▸", $C = "␣", HC = "▒", VC = "░", jC = "▓", UC = "█", WC = "=⃥", KC = "≡⃥", GC = "⫭", JC = "⌐", ZC = "𝔹", YC = "𝕓", QC = "⊥", XC = "⊥", eE = "⋈", tE = "⧉", nE = "┐", rE = "╕", oE = "╖", sE = "╗", iE = "┌", aE = "╒", lE = "╓", cE = "╔", uE = "─", dE = "═", fE = "┬", pE = "╤", hE = "╥", mE = "╦", gE = "┴", yE = "╧", vE = "╨", bE = "╩", kE = "⊟", xE = "⊞", wE = "⊠", SE = "┘", CE = "╛", EE = "╜", AE = "╝", TE = "└", ME = "╘", OE = "╙", DE = "╚", _E = "│", NE = "║", LE = "┼", RE = "╪", IE = "╫", PE = "╬", BE = "┤", FE = "╡", qE = "╢", zE = "╣", $E = "├", HE = "╞", VE = "╟", jE = "╠", UE = "‵", WE = "˘", KE = "˘", GE = "¦", JE = "𝒷", ZE = "ℬ", YE = "⁏", QE = "∽", XE = "⋍", eA = "⧅", tA = "\\", nA = "⟈", rA = "•", oA = "•", sA = "≎", iA = "⪮", aA = "≏", lA = "≎", cA = "≏", uA = "Ć", dA = "ć", fA = "⩄", pA = "⩉", hA = "⩋", mA = "∩", gA = "⋒", yA = "⩇", vA = "⩀", bA = "ⅅ", kA = "∩︀", xA = "⁁", wA = "ˇ", SA = "ℭ", CA = "⩍", EA = "Č", AA = "č", TA = "Ç", MA = "ç", OA = "Ĉ", DA = "ĉ", _A = "∰", NA = "⩌", LA = "⩐", RA = "Ċ", IA = "ċ", PA = "¸", BA = "¸", FA = "⦲", qA = "¢", zA = "·", $A = "·", HA = "𝔠", VA = "ℭ", jA = "Ч", UA = "ч", WA = "✓", KA = "✓", GA = "Χ", JA = "χ", ZA = "ˆ", YA = "≗", QA = "↺", XA = "↻", eT = "⊛", tT = "⊚", nT = "⊝", rT = "⊙", oT = "®", sT = "Ⓢ", iT = "⊖", aT = "⊕", lT = "⊗", cT = "○", uT = "⧃", dT = "≗", fT = "⨐", pT = "⫯", hT = "⧂", mT = "∲", gT = "”", yT = "’", vT = "♣", bT = "♣", kT = ":", xT = "∷", wT = "⩴", ST = "≔", CT = "≔", ET = ",", AT = "@", TT = "∁", MT = "∘", OT = "∁", DT = "ℂ", _T = "≅", NT = "⩭", LT = "≡", RT = "∮", IT = "∯", PT = "∮", BT = "𝕔", FT = "ℂ", qT = "∐", zT = "∐", $T = "©", HT = "©", VT = "℗", jT = "∳", UT = "↵", WT = "✗", KT = "⨯", GT = "𝒞", JT = "𝒸", ZT = "⫏", YT = "⫑", QT = "⫐", XT = "⫒", eM = "⋯", tM = "⤸", nM = "⤵", rM = "⋞", oM = "⋟", sM = "↶", iM = "⤽", aM = "⩈", lM = "⩆", cM = "≍", uM = "∪", dM = "⋓", fM = "⩊", pM = "⊍", hM = "⩅", mM = "∪︀", gM = "↷", yM = "⤼", vM = "⋞", bM = "⋟", kM = "⋎", xM = "⋏", wM = "¤", SM = "↶", CM = "↷", EM = "⋎", AM = "⋏", TM = "∲", MM = "∱", OM = "⌭", DM = "†", _M = "‡", NM = "ℸ", LM = "↓", RM = "↡", IM = "⇓", PM = "‐", BM = "⫤", FM = "⊣", qM = "⤏", zM = "˝", $M = "Ď", HM = "ď", VM = "Д", jM = "д", UM = "‡", WM = "⇊", KM = "ⅅ", GM = "ⅆ", JM = "⤑", ZM = "⩷", YM = "°", QM = "∇", XM = "Δ", eO = "δ", tO = "⦱", nO = "⥿", rO = "𝔇", oO = "𝔡", sO = "⥥", iO = "⇃", aO = "⇂", lO = "´", cO = "˙", uO = "˝", dO = "`", fO = "˜", pO = "⋄", hO = "⋄", mO = "⋄", gO = "♦", yO = "♦", vO = "¨", bO = "ⅆ", kO = "ϝ", xO = "⋲", wO = "÷", SO = "÷", CO = "⋇", EO = "⋇", AO = "Ђ", TO = "ђ", MO = "⌞", OO = "⌍", DO = "$", _O = "𝔻", NO = "𝕕", LO = "¨", RO = "˙", IO = "⃜", PO = "≐", BO = "≑", FO = "≐", qO = "∸", zO = "∔", $O = "⊡", HO = "⌆", VO = "∯", jO = "¨", UO = "⇓", WO = "⇐", KO = "⇔", GO = "⫤", JO = "⟸", ZO = "⟺", YO = "⟹", QO = "⇒", XO = "⊨", eD = "⇑", tD = "⇕", nD = "∥", rD = "⤓", oD = "↓", sD = "↓", iD = "⇓", aD = "⇵", lD = "̑", cD = "⇊", uD = "⇃", dD = "⇂", fD = "⥐", pD = "⥞", hD = "⥖", mD = "↽", gD = "⥟", yD = "⥗", vD = "⇁", bD = "↧", kD = "⊤", xD = "⤐", wD = "⌟", SD = "⌌", CD = "𝒟", ED = "𝒹", AD = "Ѕ", TD = "ѕ", MD = "⧶", OD = "Đ", DD = "đ", _D = "⋱", ND = "▿", LD = "▾", RD = "⇵", ID = "⥯", PD = "⦦", BD = "Џ", FD = "џ", qD = "⟿", zD = "É", $D = "é", HD = "⩮", VD = "Ě", jD = "ě", UD = "Ê", WD = "ê", KD = "≖", GD = "≕", JD = "Э", ZD = "э", YD = "⩷", QD = "Ė", XD = "ė", e_ = "≑", t_ = "ⅇ", n_ = "≒", r_ = "𝔈", o_ = "𝔢", s_ = "⪚", i_ = "È", a_ = "è", l_ = "⪖", c_ = "⪘", u_ = "⪙", d_ = "∈", f_ = "⏧", p_ = "ℓ", h_ = "⪕", m_ = "⪗", g_ = "Ē", y_ = "ē", v_ = "∅", b_ = "∅", k_ = "◻", x_ = "∅", w_ = "▫", S_ = " ", C_ = " ", E_ = " ", A_ = "Ŋ", T_ = "ŋ", M_ = " ", O_ = "Ę", D_ = "ę", __ = "𝔼", N_ = "𝕖", L_ = "⋕", R_ = "⧣", I_ = "⩱", P_ = "ε", B_ = "Ε", F_ = "ε", q_ = "ϵ", z_ = "≖", $_ = "≕", H_ = "≂", V_ = "⪖", j_ = "⪕", U_ = "⩵", W_ = "=", K_ = "≂", G_ = "≟", J_ = "⇌", Z_ = "≡", Y_ = "⩸", Q_ = "⧥", X_ = "⥱", e2 = "≓", t2 = "ℯ", n2 = "ℰ", r2 = "≐", o2 = "⩳", s2 = "≂", i2 = "Η", a2 = "η", l2 = "Ð", c2 = "ð", u2 = "Ë", d2 = "ë", f2 = "€", p2 = "!", h2 = "∃", m2 = "∃", g2 = "ℰ", y2 = "ⅇ", v2 = "ⅇ", b2 = "≒", k2 = "Ф", x2 = "ф", w2 = "♀", S2 = "ﬃ", C2 = "ﬀ", E2 = "ﬄ", A2 = "𝔉", T2 = "𝔣", M2 = "ﬁ", O2 = "◼", D2 = "▪", _2 = "fj", N2 = "♭", L2 = "ﬂ", R2 = "▱", I2 = "ƒ", P2 = "𝔽", B2 = "𝕗", F2 = "∀", q2 = "∀", z2 = "⋔", $2 = "⫙", H2 = "ℱ", V2 = "⨍", j2 = "½", U2 = "⅓", W2 = "¼", K2 = "⅕", G2 = "⅙", J2 = "⅛", Z2 = "⅔", Y2 = "⅖", Q2 = "¾", X2 = "⅗", eN = "⅜", tN = "⅘", nN = "⅚", rN = "⅝", oN = "⅞", sN = "⁄", iN = "⌢", aN = "𝒻", lN = "ℱ", cN = "ǵ", uN = "Γ", dN = "γ", fN = "Ϝ", pN = "ϝ", hN = "⪆", mN = "Ğ", gN = "ğ", yN = "Ģ", vN = "Ĝ", bN = "ĝ", kN = "Г", xN = "г", wN = "Ġ", SN = "ġ", CN = "≥", EN = "≧", AN = "⪌", TN = "⋛", MN = "≥", ON = "≧", DN = "⩾", _N = "⪩", NN = "⩾", LN = "⪀", RN = "⪂", IN = "⪄", PN = "⋛︀", BN = "⪔", FN = "𝔊", qN = "𝔤", zN = "≫", $N = "⋙", HN = "⋙", VN = "ℷ", jN = "Ѓ", UN = "ѓ", WN = "⪥", KN = "≷", GN = "⪒", JN = "⪤", ZN = "⪊", YN = "⪊", QN = "⪈", XN = "≩", eL = "⪈", tL = "≩", nL = "⋧", rL = "𝔾", oL = "𝕘", sL = "`", iL = "≥", aL = "⋛", lL = "≧", cL = "⪢", uL = "≷", dL = "⩾", fL = "≳", pL = "𝒢", hL = "ℊ", mL = "≳", gL = "⪎", yL = "⪐", vL = "⪧", bL = "⩺", kL = ">", xL = ">", wL = "≫", SL = "⋗", CL = "⦕", EL = "⩼", AL = "⪆", TL = "⥸", ML = "⋗", OL = "⋛", DL = "⪌", _L = "≷", NL = "≳", LL = "≩︀", RL = "≩︀", IL = "ˇ", PL = " ", BL = "½", FL = "ℋ", qL = "Ъ", zL = "ъ", $L = "⥈", HL = "↔", VL = "⇔", jL = "↭", UL = "^", WL = "ℏ", KL = "Ĥ", GL = "ĥ", JL = "♥", ZL = "♥", YL = "…", QL = "⊹", XL = "𝔥", eR = "ℌ", tR = "ℋ", nR = "⤥", rR = "⤦", oR = "⇿", sR = "∻", iR = "↩", aR = "↪", lR = "𝕙", cR = "ℍ", uR = "―", dR = "─", fR = "𝒽", pR = "ℋ", hR = "ℏ", mR = "Ħ", gR = "ħ", yR = "≎", vR = "≏", bR = "⁃", kR = "‐", xR = "Í", wR = "í", SR = "⁣", CR = "Î", ER = "î", AR = "И", TR = "и", MR = "İ", OR = "Е", DR = "е", _R = "¡", NR = "⇔", LR = "𝔦", RR = "ℑ", IR = "Ì", PR = "ì", BR = "ⅈ", FR = "⨌", qR = "∭", zR = "⧜", $R = "℩", HR = "Ĳ", VR = "ĳ", jR = "Ī", UR = "ī", WR = "ℑ", KR = "ⅈ", GR = "ℐ", JR = "ℑ", ZR = "ı", YR = "ℑ", QR = "⊷", XR = "Ƶ", eI = "⇒", tI = "℅", nI = "∞", rI = "⧝", oI = "ı", sI = "⊺", iI = "∫", aI = "∬", lI = "ℤ", cI = "∫", uI = "⊺", dI = "⋂", fI = "⨗", pI = "⨼", hI = "⁣", mI = "⁢", gI = "Ё", yI = "ё", vI = "Į", bI = "į", kI = "𝕀", xI = "𝕚", wI = "Ι", SI = "ι", CI = "⨼", EI = "¿", AI = "𝒾", TI = "ℐ", MI = "∈", OI = "⋵", DI = "⋹", _I = "⋴", NI = "⋳", LI = "∈", RI = "⁢", II = "Ĩ", PI = "ĩ", BI = "І", FI = "і", qI = "Ï", zI = "ï", $I = "Ĵ", HI = "ĵ", VI = "Й", jI = "й", UI = "𝔍", WI = "𝔧", KI = "ȷ", GI = "𝕁", JI = "𝕛", ZI = "𝒥", YI = "𝒿", QI = "Ј", XI = "ј", eP = "Є", tP = "є", nP = "Κ", rP = "κ", oP = "ϰ", sP = "Ķ", iP = "ķ", aP = "К", lP = "к", cP = "𝔎", uP = "𝔨", dP = "ĸ", fP = "Х", pP = "х", hP = "Ќ", mP = "ќ", gP = "𝕂", yP = "𝕜", vP = "𝒦", bP = "𝓀", kP = "⇚", xP = "Ĺ", wP = "ĺ", SP = "⦴", CP = "ℒ", EP = "Λ", AP = "λ", TP = "⟨", MP = "⟪", OP = "⦑", DP = "⟨", _P = "⪅", NP = "ℒ", LP = "«", RP = "⇤", IP = "⤟", PP = "←", BP = "↞", FP = "⇐", qP = "⤝", zP = "↩", $P = "↫", HP = "⤹", VP = "⥳", jP = "↢", UP = "⤙", WP = "⤛", KP = "⪫", GP = "⪭", JP = "⪭︀", ZP = "⤌", YP = "⤎", QP = "❲", XP = "{", eB = "[", tB = "⦋", nB = "⦏", rB = "⦍", oB = "Ľ", sB = "ľ", iB = "Ļ", aB = "ļ", lB = "⌈", cB = "{", uB = "Л", dB = "л", fB = "⤶", pB = "“", hB = "„", mB = "⥧", gB = "⥋", yB = "↲", vB = "≤", bB = "≦", kB = "⟨", xB = "⇤", wB = "←", SB = "←", CB = "⇐", EB = "⇆", AB = "↢", TB = "⌈", MB = "⟦", OB = "⥡", DB = "⥙", _B = "⇃", NB = "⌊", LB = "↽", RB = "↼", IB = "⇇", PB = "↔", BB = "↔", FB = "⇔", qB = "⇆", zB = "⇋", $B = "↭", HB = "⥎", VB = "↤", jB = "⊣", UB = "⥚", WB = "⋋", KB = "⧏", GB = "⊲", JB = "⊴", ZB = "⥑", YB = "⥠", QB = "⥘", XB = "↿", eF = "⥒", tF = "↼", nF = "⪋", rF = "⋚", oF = "≤", sF = "≦", iF = "⩽", aF = "⪨", lF = "⩽", cF = "⩿", uF = "⪁", dF = "⪃", fF = "⋚︀", pF = "⪓", hF = "⪅", mF = "⋖", gF = "⋚", yF = "⪋", vF = "⋚", bF = "≦", kF = "≶", xF = "≶", wF = "⪡", SF = "≲", CF = "⩽", EF = "≲", AF = "⥼", TF = "⌊", MF = "𝔏", OF = "𝔩", DF = "≶", _F = "⪑", NF = "⥢", LF = "↽", RF = "↼", IF = "⥪", PF = "▄", BF = "Љ", FF = "љ", qF = "⇇", zF = "≪", $F = "⋘", HF = "⌞", VF = "⇚", jF = "⥫", UF = "◺", WF = "Ŀ", KF = "ŀ", GF = "⎰", JF = "⎰", ZF = "⪉", YF = "⪉", QF = "⪇", XF = "≨", eq = "⪇", tq = "≨", nq = "⋦", rq = "⟬", oq = "⇽", sq = "⟦", iq = "⟵", aq = "⟵", lq = "⟸", cq = "⟷", uq = "⟷", dq = "⟺", fq = "⟼", pq = "⟶", hq = "⟶", mq = "⟹", gq = "↫", yq = "↬", vq = "⦅", bq = "𝕃", kq = "𝕝", xq = "⨭", wq = "⨴", Sq = "∗", Cq = "_", Eq = "↙", Aq = "↘", Tq = "◊", Mq = "◊", Oq = "⧫", Dq = "(", _q = "⦓", Nq = "⇆", Lq = "⌟", Rq = "⇋", Iq = "⥭", Pq = "‎", Bq = "⊿", Fq = "‹", qq = "𝓁", zq = "ℒ", $q = "↰", Hq = "↰", Vq = "≲", jq = "⪍", Uq = "⪏", Wq = "[", Kq = "‘", Gq = "‚", Jq = "Ł", Zq = "ł", Yq = "⪦", Qq = "⩹", Xq = "<", e3 = "<", t3 = "≪", n3 = "⋖", r3 = "⋋", o3 = "⋉", s3 = "⥶", i3 = "⩻", a3 = "◃", l3 = "⊴", c3 = "◂", u3 = "⦖", d3 = "⥊", f3 = "⥦", p3 = "≨︀", h3 = "≨︀", m3 = "¯", g3 = "♂", y3 = "✠", v3 = "✠", b3 = "↦", k3 = "↦", x3 = "↧", w3 = "↤", S3 = "↥", C3 = "▮", E3 = "⨩", A3 = "М", T3 = "м", M3 = "—", O3 = "∺", D3 = "∡", _3 = " ", N3 = "ℳ", L3 = "𝔐", R3 = "𝔪", I3 = "℧", P3 = "µ", B3 = "*", F3 = "⫰", q3 = "∣", z3 = "·", $3 = "⊟", H3 = "−", V3 = "∸", j3 = "⨪", U3 = "∓", W3 = "⫛", K3 = "…", G3 = "∓", J3 = "⊧", Z3 = "𝕄", Y3 = "𝕞", Q3 = "∓", X3 = "𝓂", ez = "ℳ", tz = "∾", nz = "Μ", rz = "μ", oz = "⊸", sz = "⊸", iz = "∇", az = "Ń", lz = "ń", cz = "∠⃒", uz = "≉", dz = "⩰̸", fz = "≋̸", pz = "ŉ", hz = "≉", mz = "♮", gz = "ℕ", yz = "♮", vz = " ", bz = "≎̸", kz = "≏̸", xz = "⩃", wz = "Ň", Sz = "ň", Cz = "Ņ", Ez = "ņ", Az = "≇", Tz = "⩭̸", Mz = "⩂", Oz = "Н", Dz = "н", _z = "–", Nz = "⤤", Lz = "↗", Rz = "⇗", Iz = "↗", Pz = "≠", Bz = "≐̸", Fz = "​", qz = "​", zz = "​", $z = "​", Hz = "≢", Vz = "⤨", jz = "≂̸", Uz = "≫", Wz = "≪", Kz = `
`, Gz = "∄", Jz = "∄", Zz = "𝔑", Yz = "𝔫", Qz = "≧̸", Xz = "≱", e$ = "≱", t$ = "≧̸", n$ = "⩾̸", r$ = "⩾̸", o$ = "⋙̸", s$ = "≵", i$ = "≫⃒", a$ = "≯", l$ = "≯", c$ = "≫̸", u$ = "↮", d$ = "⇎", f$ = "⫲", p$ = "∋", h$ = "⋼", m$ = "⋺", g$ = "∋", y$ = "Њ", v$ = "њ", b$ = "↚", k$ = "⇍", x$ = "‥", w$ = "≦̸", S$ = "≰", C$ = "↚", E$ = "⇍", A$ = "↮", T$ = "⇎", M$ = "≰", O$ = "≦̸", D$ = "⩽̸", _$ = "⩽̸", N$ = "≮", L$ = "⋘̸", R$ = "≴", I$ = "≪⃒", P$ = "≮", B$ = "⋪", F$ = "⋬", q$ = "≪̸", z$ = "∤", $$ = "⁠", H$ = " ", V$ = "𝕟", j$ = "ℕ", U$ = "⫬", W$ = "¬", K$ = "≢", G$ = "≭", J$ = "∦", Z$ = "∉", Y$ = "≠", Q$ = "≂̸", X$ = "∄", eH = "≯", tH = "≱", nH = "≧̸", rH = "≫̸", oH = "≹", sH = "⩾̸", iH = "≵", aH = "≎̸", lH = "≏̸", cH = "∉", uH = "⋵̸", dH = "⋹̸", fH = "∉", pH = "⋷", hH = "⋶", mH = "⧏̸", gH = "⋪", yH = "⋬", vH = "≮", bH = "≰", kH = "≸", xH = "≪̸", wH = "⩽̸", SH = "≴", CH = "⪢̸", EH = "⪡̸", AH = "∌", TH = "∌", MH = "⋾", OH = "⋽", DH = "⊀", _H = "⪯̸", NH = "⋠", LH = "∌", RH = "⧐̸", IH = "⋫", PH = "⋭", BH = "⊏̸", FH = "⋢", qH = "⊐̸", zH = "⋣", $H = "⊂⃒", HH = "⊈", VH = "⊁", jH = "⪰̸", UH = "⋡", WH = "≿̸", KH = "⊃⃒", GH = "⊉", JH = "≁", ZH = "≄", YH = "≇", QH = "≉", XH = "∤", e4 = "∦", t4 = "∦", n4 = "⫽⃥", r4 = "∂̸", o4 = "⨔", s4 = "⊀", i4 = "⋠", a4 = "⊀", l4 = "⪯̸", c4 = "⪯̸", u4 = "⤳̸", d4 = "↛", f4 = "⇏", p4 = "↝̸", h4 = "↛", m4 = "⇏", g4 = "⋫", y4 = "⋭", v4 = "⊁", b4 = "⋡", k4 = "⪰̸", x4 = "𝒩", w4 = "𝓃", S4 = "∤", C4 = "∦", E4 = "≁", A4 = "≄", T4 = "≄", M4 = "∤", O4 = "∦", D4 = "⋢", _4 = "⋣", N4 = "⊄", L4 = "⫅̸", R4 = "⊈", I4 = "⊂⃒", P4 = "⊈", B4 = "⫅̸", F4 = "⊁", q4 = "⪰̸", z4 = "⊅", $4 = "⫆̸", H4 = "⊉", V4 = "⊃⃒", j4 = "⊉", U4 = "⫆̸", W4 = "≹", K4 = "Ñ", G4 = "ñ", J4 = "≸", Z4 = "⋪", Y4 = "⋬", Q4 = "⋫", X4 = "⋭", e5 = "Ν", t5 = "ν", n5 = "#", r5 = "№", o5 = " ", s5 = "≍⃒", i5 = "⊬", a5 = "⊭", l5 = "⊮", c5 = "⊯", u5 = "≥⃒", d5 = ">⃒", f5 = "⤄", p5 = "⧞", h5 = "⤂", m5 = "≤⃒", g5 = "<⃒", y5 = "⊴⃒", v5 = "⤃", b5 = "⊵⃒", k5 = "∼⃒", x5 = "⤣", w5 = "↖", S5 = "⇖", C5 = "↖", E5 = "⤧", A5 = "Ó", T5 = "ó", M5 = "⊛", O5 = "Ô", D5 = "ô", _5 = "⊚", N5 = "О", L5 = "о", R5 = "⊝", I5 = "Ő", P5 = "ő", B5 = "⨸", F5 = "⊙", q5 = "⦼", z5 = "Œ", $5 = "œ", H5 = "⦿", V5 = "𝔒", j5 = "𝔬", U5 = "˛", W5 = "Ò", K5 = "ò", G5 = "⧁", J5 = "⦵", Z5 = "Ω", Y5 = "∮", Q5 = "↺", X5 = "⦾", eV = "⦻", tV = "‾", nV = "⧀", rV = "Ō", oV = "ō", sV = "Ω", iV = "ω", aV = "Ο", lV = "ο", cV = "⦶", uV = "⊖", dV = "𝕆", fV = "𝕠", pV = "⦷", hV = "“", mV = "‘", gV = "⦹", yV = "⊕", vV = "↻", bV = "⩔", kV = "∨", xV = "⩝", wV = "ℴ", SV = "ℴ", CV = "ª", EV = "º", AV = "⊶", TV = "⩖", MV = "⩗", OV = "⩛", DV = "Ⓢ", _V = "𝒪", NV = "ℴ", LV = "Ø", RV = "ø", IV = "⊘", PV = "Õ", BV = "õ", FV = "⨶", qV = "⨷", zV = "⊗", $V = "Ö", HV = "ö", VV = "⌽", jV = "‾", UV = "⏞", WV = "⎴", KV = "⏜", GV = "¶", JV = "∥", ZV = "∥", YV = "⫳", QV = "⫽", XV = "∂", ej = "∂", tj = "П", nj = "п", rj = "%", oj = ".", sj = "‰", ij = "⊥", aj = "‱", lj = "𝔓", cj = "𝔭", uj = "Φ", dj = "φ", fj = "ϕ", pj = "ℳ", hj = "☎", mj = "Π", gj = "π", yj = "⋔", vj = "ϖ", bj = "ℏ", kj = "ℎ", xj = "ℏ", wj = "⨣", Sj = "⊞", Cj = "⨢", Ej = "+", Aj = "∔", Tj = "⨥", Mj = "⩲", Oj = "±", Dj = "±", _j = "⨦", Nj = "⨧", Lj = "±", Rj = "ℌ", Ij = "⨕", Pj = "𝕡", Bj = "ℙ", Fj = "£", qj = "⪷", zj = "⪻", $j = "≺", Hj = "≼", Vj = "⪷", jj = "≺", Uj = "≼", Wj = "≺", Kj = "⪯", Gj = "≼", Jj = "≾", Zj = "⪯", Yj = "⪹", Qj = "⪵", Xj = "⋨", e6 = "⪯", t6 = "⪳", n6 = "≾", r6 = "′", o6 = "″", s6 = "ℙ", i6 = "⪹", a6 = "⪵", l6 = "⋨", c6 = "∏", u6 = "∏", d6 = "⌮", f6 = "⌒", p6 = "⌓", h6 = "∝", m6 = "∝", g6 = "∷", y6 = "∝", v6 = "≾", b6 = "⊰", k6 = "𝒫", x6 = "𝓅", w6 = "Ψ", S6 = "ψ", C6 = " ", E6 = "𝔔", A6 = "𝔮", T6 = "⨌", M6 = "𝕢", O6 = "ℚ", D6 = "⁗", _6 = "𝒬", N6 = "𝓆", L6 = "ℍ", R6 = "⨖", I6 = "?", P6 = "≟", B6 = '"', F6 = '"', q6 = "⇛", z6 = "∽̱", $6 = "Ŕ", H6 = "ŕ", V6 = "√", j6 = "⦳", U6 = "⟩", W6 = "⟫", K6 = "⦒", G6 = "⦥", J6 = "⟩", Z6 = "»", Y6 = "⥵", Q6 = "⇥", X6 = "⤠", e8 = "⤳", t8 = "→", n8 = "↠", r8 = "⇒", o8 = "⤞", s8 = "↪", i8 = "↬", a8 = "⥅", l8 = "⥴", c8 = "⤖", u8 = "↣", d8 = "↝", f8 = "⤚", p8 = "⤜", h8 = "∶", m8 = "ℚ", g8 = "⤍", y8 = "⤏", v8 = "⤐", b8 = "❳", k8 = "}", x8 = "]", w8 = "⦌", S8 = "⦎", C8 = "⦐", E8 = "Ř", A8 = "ř", T8 = "Ŗ", M8 = "ŗ", O8 = "⌉", D8 = "}", _8 = "Р", N8 = "р", L8 = "⤷", R8 = "⥩", I8 = "”", P8 = "”", B8 = "↳", F8 = "ℜ", q8 = "ℛ", z8 = "ℜ", $8 = "ℝ", H8 = "ℜ", V8 = "▭", j8 = "®", U8 = "®", W8 = "∋", K8 = "⇋", G8 = "⥯", J8 = "⥽", Z8 = "⌋", Y8 = "𝔯", Q8 = "ℜ", X8 = "⥤", eU = "⇁", tU = "⇀", nU = "⥬", rU = "Ρ", oU = "ρ", sU = "ϱ", iU = "⟩", aU = "⇥", lU = "→", cU = "→", uU = "⇒", dU = "⇄", fU = "↣", pU = "⌉", hU = "⟧", mU = "⥝", gU = "⥕", yU = "⇂", vU = "⌋", bU = "⇁", kU = "⇀", xU = "⇄", wU = "⇌", SU = "⇉", CU = "↝", EU = "↦", AU = "⊢", TU = "⥛", MU = "⋌", OU = "⧐", DU = "⊳", _U = "⊵", NU = "⥏", LU = "⥜", RU = "⥔", IU = "↾", PU = "⥓", BU = "⇀", FU = "˚", qU = "≓", zU = "⇄", $U = "⇌", HU = "‏", VU = "⎱", jU = "⎱", UU = "⫮", WU = "⟭", KU = "⇾", GU = "⟧", JU = "⦆", ZU = "𝕣", YU = "ℝ", QU = "⨮", XU = "⨵", e9 = "⥰", t9 = ")", n9 = "⦔", r9 = "⨒", o9 = "⇉", s9 = "⇛", i9 = "›", a9 = "𝓇", l9 = "ℛ", c9 = "↱", u9 = "↱", d9 = "]", f9 = "’", p9 = "’", h9 = "⋌", m9 = "⋊", g9 = "▹", y9 = "⊵", v9 = "▸", b9 = "⧎", k9 = "⧴", x9 = "⥨", w9 = "℞", S9 = "Ś", C9 = "ś", E9 = "‚", A9 = "⪸", T9 = "Š", M9 = "š", O9 = "⪼", D9 = "≻", _9 = "≽", N9 = "⪰", L9 = "⪴", R9 = "Ş", I9 = "ş", P9 = "Ŝ", B9 = "ŝ", F9 = "⪺", q9 = "⪶", z9 = "⋩", $9 = "⨓", H9 = "≿", V9 = "С", j9 = "с", U9 = "⊡", W9 = "⋅", K9 = "⩦", G9 = "⤥", J9 = "↘", Z9 = "⇘", Y9 = "↘", Q9 = "§", X9 = ";", e7 = "⤩", t7 = "∖", n7 = "∖", r7 = "✶", o7 = "𝔖", s7 = "𝔰", i7 = "⌢", a7 = "♯", l7 = "Щ", c7 = "щ", u7 = "Ш", d7 = "ш", f7 = "↓", p7 = "←", h7 = "∣", m7 = "∥", g7 = "→", y7 = "↑", v7 = "­", b7 = "Σ", k7 = "σ", x7 = "ς", w7 = "ς", S7 = "∼", C7 = "⩪", E7 = "≃", A7 = "≃", T7 = "⪞", M7 = "⪠", O7 = "⪝", D7 = "⪟", _7 = "≆", N7 = "⨤", L7 = "⥲", R7 = "←", I7 = "∘", P7 = "∖", B7 = "⨳", F7 = "⧤", q7 = "∣", z7 = "⌣", $7 = "⪪", H7 = "⪬", V7 = "⪬︀", j7 = "Ь", U7 = "ь", W7 = "⌿", K7 = "⧄", G7 = "/", J7 = "𝕊", Z7 = "𝕤", Y7 = "♠", Q7 = "♠", X7 = "∥", eW = "⊓", tW = "⊓︀", nW = "⊔", rW = "⊔︀", oW = "√", sW = "⊏", iW = "⊑", aW = "⊏", lW = "⊑", cW = "⊐", uW = "⊒", dW = "⊐", fW = "⊒", pW = "□", hW = "□", mW = "⊓", gW = "⊏", yW = "⊑", vW = "⊐", bW = "⊒", kW = "⊔", xW = "▪", wW = "□", SW = "▪", CW = "→", EW = "𝒮", AW = "𝓈", TW = "∖", MW = "⌣", OW = "⋆", DW = "⋆", _W = "☆", NW = "★", LW = "ϵ", RW = "ϕ", IW = "¯", PW = "⊂", BW = "⋐", FW = "⪽", qW = "⫅", zW = "⊆", $W = "⫃", HW = "⫁", VW = "⫋", jW = "⊊", UW = "⪿", WW = "⥹", KW = "⊂", GW = "⋐", JW = "⊆", ZW = "⫅", YW = "⊆", QW = "⊊", XW = "⫋", eK = "⫇", tK = "⫕", nK = "⫓", rK = "⪸", oK = "≻", sK = "≽", iK = "≻", aK = "⪰", lK = "≽", cK = "≿", uK = "⪰", dK = "⪺", fK = "⪶", pK = "⋩", hK = "≿", mK = "∋", gK = "∑", yK = "∑", vK = "♪", bK = "¹", kK = "²", xK = "³", wK = "⊃", SK = "⋑", CK = "⪾", EK = "⫘", AK = "⫆", TK = "⊇", MK = "⫄", OK = "⊃", DK = "⊇", _K = "⟉", NK = "⫗", LK = "⥻", RK = "⫂", IK = "⫌", PK = "⊋", BK = "⫀", FK = "⊃", qK = "⋑", zK = "⊇", $K = "⫆", HK = "⊋", VK = "⫌", jK = "⫈", UK = "⫔", WK = "⫖", KK = "⤦", GK = "↙", JK = "⇙", ZK = "↙", YK = "⤪", QK = "ß", XK = "	", eG = "⌖", tG = "Τ", nG = "τ", rG = "⎴", oG = "Ť", sG = "ť", iG = "Ţ", aG = "ţ", lG = "Т", cG = "т", uG = "⃛", dG = "⌕", fG = "𝔗", pG = "𝔱", hG = "∴", mG = "∴", gG = "∴", yG = "Θ", vG = "θ", bG = "ϑ", kG = "ϑ", xG = "≈", wG = "∼", SG = "  ", CG = " ", EG = " ", AG = "≈", TG = "∼", MG = "Þ", OG = "þ", DG = "˜", _G = "∼", NG = "≃", LG = "≅", RG = "≈", IG = "⨱", PG = "⊠", BG = "×", FG = "⨰", qG = "∭", zG = "⤨", $G = "⌶", HG = "⫱", VG = "⊤", jG = "𝕋", UG = "𝕥", WG = "⫚", KG = "⤩", GG = "‴", JG = "™", ZG = "™", YG = "▵", QG = "▿", XG = "◃", eJ = "⊴", tJ = "≜", nJ = "▹", rJ = "⊵", oJ = "◬", sJ = "≜", iJ = "⨺", aJ = "⃛", lJ = "⨹", cJ = "⧍", uJ = "⨻", dJ = "⏢", fJ = "𝒯", pJ = "𝓉", hJ = "Ц", mJ = "ц", gJ = "Ћ", yJ = "ћ", vJ = "Ŧ", bJ = "ŧ", kJ = "≬", xJ = "↞", wJ = "↠", SJ = "Ú", CJ = "ú", EJ = "↑", AJ = "↟", TJ = "⇑", MJ = "⥉", OJ = "Ў", DJ = "ў", _J = "Ŭ", NJ = "ŭ", LJ = "Û", RJ = "û", IJ = "У", PJ = "у", BJ = "⇅", FJ = "Ű", qJ = "ű", zJ = "⥮", $J = "⥾", HJ = "𝔘", VJ = "𝔲", jJ = "Ù", UJ = "ù", WJ = "⥣", KJ = "↿", GJ = "↾", JJ = "▀", ZJ = "⌜", YJ = "⌜", QJ = "⌏", XJ = "◸", eZ = "Ū", tZ = "ū", nZ = "¨", rZ = "_", oZ = "⏟", sZ = "⎵", iZ = "⏝", aZ = "⋃", lZ = "⊎", cZ = "Ų", uZ = "ų", dZ = "𝕌", fZ = "𝕦", pZ = "⤒", hZ = "↑", mZ = "↑", gZ = "⇑", yZ = "⇅", vZ = "↕", bZ = "↕", kZ = "⇕", xZ = "⥮", wZ = "↿", SZ = "↾", CZ = "⊎", EZ = "↖", AZ = "↗", TZ = "υ", MZ = "ϒ", OZ = "ϒ", DZ = "Υ", _Z = "υ", NZ = "↥", LZ = "⊥", RZ = "⇈", IZ = "⌝", PZ = "⌝", BZ = "⌎", FZ = "Ů", qZ = "ů", zZ = "◹", $Z = "𝒰", HZ = "𝓊", VZ = "⋰", jZ = "Ũ", UZ = "ũ", WZ = "▵", KZ = "▴", GZ = "⇈", JZ = "Ü", ZZ = "ü", YZ = "⦧", QZ = "⦜", XZ = "ϵ", eY = "ϰ", tY = "∅", nY = "ϕ", rY = "ϖ", oY = "∝", sY = "↕", iY = "⇕", aY = "ϱ", lY = "ς", cY = "⊊︀", uY = "⫋︀", dY = "⊋︀", fY = "⫌︀", pY = "ϑ", hY = "⊲", mY = "⊳", gY = "⫨", yY = "⫫", vY = "⫩", bY = "В", kY = "в", xY = "⊢", wY = "⊨", SY = "⊩", CY = "⊫", EY = "⫦", AY = "⊻", TY = "∨", MY = "⋁", OY = "≚", DY = "⋮", _Y = "|", NY = "‖", LY = "|", RY = "‖", IY = "∣", PY = "|", BY = "❘", FY = "≀", qY = " ", zY = "𝔙", $Y = "𝔳", HY = "⊲", VY = "⊂⃒", jY = "⊃⃒", UY = "𝕍", WY = "𝕧", KY = "∝", GY = "⊳", JY = "𝒱", ZY = "𝓋", YY = "⫋︀", QY = "⊊︀", XY = "⫌︀", eQ = "⊋︀", tQ = "⊪", nQ = "⦚", rQ = "Ŵ", oQ = "ŵ", sQ = "⩟", iQ = "∧", aQ = "⋀", lQ = "≙", cQ = "℘", uQ = "𝔚", dQ = "𝔴", fQ = "𝕎", pQ = "𝕨", hQ = "℘", mQ = "≀", gQ = "≀", yQ = "𝒲", vQ = "𝓌", bQ = "⋂", kQ = "◯", xQ = "⋃", wQ = "▽", SQ = "𝔛", CQ = "𝔵", EQ = "⟷", AQ = "⟺", TQ = "Ξ", MQ = "ξ", OQ = "⟵", DQ = "⟸", _Q = "⟼", NQ = "⋻", LQ = "⨀", RQ = "𝕏", IQ = "𝕩", PQ = "⨁", BQ = "⨂", FQ = "⟶", qQ = "⟹", zQ = "𝒳", $Q = "𝓍", HQ = "⨆", VQ = "⨄", jQ = "△", UQ = "⋁", WQ = "⋀", KQ = "Ý", GQ = "ý", JQ = "Я", ZQ = "я", YQ = "Ŷ", QQ = "ŷ", XQ = "Ы", eX = "ы", tX = "¥", nX = "𝔜", rX = "𝔶", oX = "Ї", sX = "ї", iX = "𝕐", aX = "𝕪", lX = "𝒴", cX = "𝓎", uX = "Ю", dX = "ю", fX = "ÿ", pX = "Ÿ", hX = "Ź", mX = "ź", gX = "Ž", yX = "ž", vX = "З", bX = "з", kX = "Ż", xX = "ż", wX = "ℨ", SX = "​", CX = "Ζ", EX = "ζ", AX = "𝔷", TX = "ℨ", MX = "Ж", OX = "ж", DX = "⇝", _X = "𝕫", NX = "ℤ", LX = "𝒵", RX = "𝓏", IX = "‍", PX = "‌", BX = {
  Aacute: kw,
  aacute: xw,
  Abreve: ww,
  abreve: Sw,
  ac: Cw,
  acd: Ew,
  acE: Aw,
  Acirc: Tw,
  acirc: Mw,
  acute: Ow,
  Acy: Dw,
  acy: _w,
  AElig: Nw,
  aelig: Lw,
  af: Rw,
  Afr: Iw,
  afr: Pw,
  Agrave: Bw,
  agrave: Fw,
  alefsym: qw,
  aleph: zw,
  Alpha: $w,
  alpha: Hw,
  Amacr: Vw,
  amacr: jw,
  amalg: Uw,
  amp: Ww,
  AMP: Kw,
  andand: Gw,
  And: Jw,
  and: Zw,
  andd: Yw,
  andslope: Qw,
  andv: Xw,
  ang: eS,
  ange: tS,
  angle: nS,
  angmsdaa: rS,
  angmsdab: oS,
  angmsdac: sS,
  angmsdad: iS,
  angmsdae: aS,
  angmsdaf: lS,
  angmsdag: cS,
  angmsdah: uS,
  angmsd: dS,
  angrt: fS,
  angrtvb: pS,
  angrtvbd: hS,
  angsph: mS,
  angst: gS,
  angzarr: yS,
  Aogon: vS,
  aogon: bS,
  Aopf: kS,
  aopf: xS,
  apacir: wS,
  ap: SS,
  apE: CS,
  ape: ES,
  apid: AS,
  apos: TS,
  ApplyFunction: MS,
  approx: OS,
  approxeq: DS,
  Aring: _S,
  aring: NS,
  Ascr: LS,
  ascr: RS,
  Assign: IS,
  ast: PS,
  asymp: BS,
  asympeq: FS,
  Atilde: qS,
  atilde: zS,
  Auml: $S,
  auml: HS,
  awconint: VS,
  awint: jS,
  backcong: US,
  backepsilon: WS,
  backprime: KS,
  backsim: GS,
  backsimeq: JS,
  Backslash: ZS,
  Barv: YS,
  barvee: QS,
  barwed: XS,
  Barwed: eC,
  barwedge: tC,
  bbrk: nC,
  bbrktbrk: rC,
  bcong: oC,
  Bcy: sC,
  bcy: iC,
  bdquo: aC,
  becaus: lC,
  because: cC,
  Because: uC,
  bemptyv: dC,
  bepsi: fC,
  bernou: pC,
  Bernoullis: hC,
  Beta: mC,
  beta: gC,
  beth: yC,
  between: vC,
  Bfr: bC,
  bfr: kC,
  bigcap: xC,
  bigcirc: wC,
  bigcup: SC,
  bigodot: CC,
  bigoplus: EC,
  bigotimes: AC,
  bigsqcup: TC,
  bigstar: MC,
  bigtriangledown: OC,
  bigtriangleup: DC,
  biguplus: _C,
  bigvee: NC,
  bigwedge: LC,
  bkarow: RC,
  blacklozenge: IC,
  blacksquare: PC,
  blacktriangle: BC,
  blacktriangledown: FC,
  blacktriangleleft: qC,
  blacktriangleright: zC,
  blank: $C,
  blk12: HC,
  blk14: VC,
  blk34: jC,
  block: UC,
  bne: WC,
  bnequiv: KC,
  bNot: GC,
  bnot: JC,
  Bopf: ZC,
  bopf: YC,
  bot: QC,
  bottom: XC,
  bowtie: eE,
  boxbox: tE,
  boxdl: nE,
  boxdL: rE,
  boxDl: oE,
  boxDL: sE,
  boxdr: iE,
  boxdR: aE,
  boxDr: lE,
  boxDR: cE,
  boxh: uE,
  boxH: dE,
  boxhd: fE,
  boxHd: pE,
  boxhD: hE,
  boxHD: mE,
  boxhu: gE,
  boxHu: yE,
  boxhU: vE,
  boxHU: bE,
  boxminus: kE,
  boxplus: xE,
  boxtimes: wE,
  boxul: SE,
  boxuL: CE,
  boxUl: EE,
  boxUL: AE,
  boxur: TE,
  boxuR: ME,
  boxUr: OE,
  boxUR: DE,
  boxv: _E,
  boxV: NE,
  boxvh: LE,
  boxvH: RE,
  boxVh: IE,
  boxVH: PE,
  boxvl: BE,
  boxvL: FE,
  boxVl: qE,
  boxVL: zE,
  boxvr: $E,
  boxvR: HE,
  boxVr: VE,
  boxVR: jE,
  bprime: UE,
  breve: WE,
  Breve: KE,
  brvbar: GE,
  bscr: JE,
  Bscr: ZE,
  bsemi: YE,
  bsim: QE,
  bsime: XE,
  bsolb: eA,
  bsol: tA,
  bsolhsub: nA,
  bull: rA,
  bullet: oA,
  bump: sA,
  bumpE: iA,
  bumpe: aA,
  Bumpeq: lA,
  bumpeq: cA,
  Cacute: uA,
  cacute: dA,
  capand: fA,
  capbrcup: pA,
  capcap: hA,
  cap: mA,
  Cap: gA,
  capcup: yA,
  capdot: vA,
  CapitalDifferentialD: bA,
  caps: kA,
  caret: xA,
  caron: wA,
  Cayleys: SA,
  ccaps: CA,
  Ccaron: EA,
  ccaron: AA,
  Ccedil: TA,
  ccedil: MA,
  Ccirc: OA,
  ccirc: DA,
  Cconint: _A,
  ccups: NA,
  ccupssm: LA,
  Cdot: RA,
  cdot: IA,
  cedil: PA,
  Cedilla: BA,
  cemptyv: FA,
  cent: qA,
  centerdot: zA,
  CenterDot: $A,
  cfr: HA,
  Cfr: VA,
  CHcy: jA,
  chcy: UA,
  check: WA,
  checkmark: KA,
  Chi: GA,
  chi: JA,
  circ: ZA,
  circeq: YA,
  circlearrowleft: QA,
  circlearrowright: XA,
  circledast: eT,
  circledcirc: tT,
  circleddash: nT,
  CircleDot: rT,
  circledR: oT,
  circledS: sT,
  CircleMinus: iT,
  CirclePlus: aT,
  CircleTimes: lT,
  cir: cT,
  cirE: uT,
  cire: dT,
  cirfnint: fT,
  cirmid: pT,
  cirscir: hT,
  ClockwiseContourIntegral: mT,
  CloseCurlyDoubleQuote: gT,
  CloseCurlyQuote: yT,
  clubs: vT,
  clubsuit: bT,
  colon: kT,
  Colon: xT,
  Colone: wT,
  colone: ST,
  coloneq: CT,
  comma: ET,
  commat: AT,
  comp: TT,
  compfn: MT,
  complement: OT,
  complexes: DT,
  cong: _T,
  congdot: NT,
  Congruent: LT,
  conint: RT,
  Conint: IT,
  ContourIntegral: PT,
  copf: BT,
  Copf: FT,
  coprod: qT,
  Coproduct: zT,
  copy: $T,
  COPY: HT,
  copysr: VT,
  CounterClockwiseContourIntegral: jT,
  crarr: UT,
  cross: WT,
  Cross: KT,
  Cscr: GT,
  cscr: JT,
  csub: ZT,
  csube: YT,
  csup: QT,
  csupe: XT,
  ctdot: eM,
  cudarrl: tM,
  cudarrr: nM,
  cuepr: rM,
  cuesc: oM,
  cularr: sM,
  cularrp: iM,
  cupbrcap: aM,
  cupcap: lM,
  CupCap: cM,
  cup: uM,
  Cup: dM,
  cupcup: fM,
  cupdot: pM,
  cupor: hM,
  cups: mM,
  curarr: gM,
  curarrm: yM,
  curlyeqprec: vM,
  curlyeqsucc: bM,
  curlyvee: kM,
  curlywedge: xM,
  curren: wM,
  curvearrowleft: SM,
  curvearrowright: CM,
  cuvee: EM,
  cuwed: AM,
  cwconint: TM,
  cwint: MM,
  cylcty: OM,
  dagger: DM,
  Dagger: _M,
  daleth: NM,
  darr: LM,
  Darr: RM,
  dArr: IM,
  dash: PM,
  Dashv: BM,
  dashv: FM,
  dbkarow: qM,
  dblac: zM,
  Dcaron: $M,
  dcaron: HM,
  Dcy: VM,
  dcy: jM,
  ddagger: UM,
  ddarr: WM,
  DD: KM,
  dd: GM,
  DDotrahd: JM,
  ddotseq: ZM,
  deg: YM,
  Del: QM,
  Delta: XM,
  delta: eO,
  demptyv: tO,
  dfisht: nO,
  Dfr: rO,
  dfr: oO,
  dHar: sO,
  dharl: iO,
  dharr: aO,
  DiacriticalAcute: lO,
  DiacriticalDot: cO,
  DiacriticalDoubleAcute: uO,
  DiacriticalGrave: dO,
  DiacriticalTilde: fO,
  diam: pO,
  diamond: hO,
  Diamond: mO,
  diamondsuit: gO,
  diams: yO,
  die: vO,
  DifferentialD: bO,
  digamma: kO,
  disin: xO,
  div: wO,
  divide: SO,
  divideontimes: CO,
  divonx: EO,
  DJcy: AO,
  djcy: TO,
  dlcorn: MO,
  dlcrop: OO,
  dollar: DO,
  Dopf: _O,
  dopf: NO,
  Dot: LO,
  dot: RO,
  DotDot: IO,
  doteq: PO,
  doteqdot: BO,
  DotEqual: FO,
  dotminus: qO,
  dotplus: zO,
  dotsquare: $O,
  doublebarwedge: HO,
  DoubleContourIntegral: VO,
  DoubleDot: jO,
  DoubleDownArrow: UO,
  DoubleLeftArrow: WO,
  DoubleLeftRightArrow: KO,
  DoubleLeftTee: GO,
  DoubleLongLeftArrow: JO,
  DoubleLongLeftRightArrow: ZO,
  DoubleLongRightArrow: YO,
  DoubleRightArrow: QO,
  DoubleRightTee: XO,
  DoubleUpArrow: eD,
  DoubleUpDownArrow: tD,
  DoubleVerticalBar: nD,
  DownArrowBar: rD,
  downarrow: oD,
  DownArrow: sD,
  Downarrow: iD,
  DownArrowUpArrow: aD,
  DownBreve: lD,
  downdownarrows: cD,
  downharpoonleft: uD,
  downharpoonright: dD,
  DownLeftRightVector: fD,
  DownLeftTeeVector: pD,
  DownLeftVectorBar: hD,
  DownLeftVector: mD,
  DownRightTeeVector: gD,
  DownRightVectorBar: yD,
  DownRightVector: vD,
  DownTeeArrow: bD,
  DownTee: kD,
  drbkarow: xD,
  drcorn: wD,
  drcrop: SD,
  Dscr: CD,
  dscr: ED,
  DScy: AD,
  dscy: TD,
  dsol: MD,
  Dstrok: OD,
  dstrok: DD,
  dtdot: _D,
  dtri: ND,
  dtrif: LD,
  duarr: RD,
  duhar: ID,
  dwangle: PD,
  DZcy: BD,
  dzcy: FD,
  dzigrarr: qD,
  Eacute: zD,
  eacute: $D,
  easter: HD,
  Ecaron: VD,
  ecaron: jD,
  Ecirc: UD,
  ecirc: WD,
  ecir: KD,
  ecolon: GD,
  Ecy: JD,
  ecy: ZD,
  eDDot: YD,
  Edot: QD,
  edot: XD,
  eDot: e_,
  ee: t_,
  efDot: n_,
  Efr: r_,
  efr: o_,
  eg: s_,
  Egrave: i_,
  egrave: a_,
  egs: l_,
  egsdot: c_,
  el: u_,
  Element: d_,
  elinters: f_,
  ell: p_,
  els: h_,
  elsdot: m_,
  Emacr: g_,
  emacr: y_,
  empty: v_,
  emptyset: b_,
  EmptySmallSquare: k_,
  emptyv: x_,
  EmptyVerySmallSquare: w_,
  emsp13: S_,
  emsp14: C_,
  emsp: E_,
  ENG: A_,
  eng: T_,
  ensp: M_,
  Eogon: O_,
  eogon: D_,
  Eopf: __,
  eopf: N_,
  epar: L_,
  eparsl: R_,
  eplus: I_,
  epsi: P_,
  Epsilon: B_,
  epsilon: F_,
  epsiv: q_,
  eqcirc: z_,
  eqcolon: $_,
  eqsim: H_,
  eqslantgtr: V_,
  eqslantless: j_,
  Equal: U_,
  equals: W_,
  EqualTilde: K_,
  equest: G_,
  Equilibrium: J_,
  equiv: Z_,
  equivDD: Y_,
  eqvparsl: Q_,
  erarr: X_,
  erDot: e2,
  escr: t2,
  Escr: n2,
  esdot: r2,
  Esim: o2,
  esim: s2,
  Eta: i2,
  eta: a2,
  ETH: l2,
  eth: c2,
  Euml: u2,
  euml: d2,
  euro: f2,
  excl: p2,
  exist: h2,
  Exists: m2,
  expectation: g2,
  exponentiale: y2,
  ExponentialE: v2,
  fallingdotseq: b2,
  Fcy: k2,
  fcy: x2,
  female: w2,
  ffilig: S2,
  fflig: C2,
  ffllig: E2,
  Ffr: A2,
  ffr: T2,
  filig: M2,
  FilledSmallSquare: O2,
  FilledVerySmallSquare: D2,
  fjlig: _2,
  flat: N2,
  fllig: L2,
  fltns: R2,
  fnof: I2,
  Fopf: P2,
  fopf: B2,
  forall: F2,
  ForAll: q2,
  fork: z2,
  forkv: $2,
  Fouriertrf: H2,
  fpartint: V2,
  frac12: j2,
  frac13: U2,
  frac14: W2,
  frac15: K2,
  frac16: G2,
  frac18: J2,
  frac23: Z2,
  frac25: Y2,
  frac34: Q2,
  frac35: X2,
  frac38: eN,
  frac45: tN,
  frac56: nN,
  frac58: rN,
  frac78: oN,
  frasl: sN,
  frown: iN,
  fscr: aN,
  Fscr: lN,
  gacute: cN,
  Gamma: uN,
  gamma: dN,
  Gammad: fN,
  gammad: pN,
  gap: hN,
  Gbreve: mN,
  gbreve: gN,
  Gcedil: yN,
  Gcirc: vN,
  gcirc: bN,
  Gcy: kN,
  gcy: xN,
  Gdot: wN,
  gdot: SN,
  ge: CN,
  gE: EN,
  gEl: AN,
  gel: TN,
  geq: MN,
  geqq: ON,
  geqslant: DN,
  gescc: _N,
  ges: NN,
  gesdot: LN,
  gesdoto: RN,
  gesdotol: IN,
  gesl: PN,
  gesles: BN,
  Gfr: FN,
  gfr: qN,
  gg: zN,
  Gg: $N,
  ggg: HN,
  gimel: VN,
  GJcy: jN,
  gjcy: UN,
  gla: WN,
  gl: KN,
  glE: GN,
  glj: JN,
  gnap: ZN,
  gnapprox: YN,
  gne: QN,
  gnE: XN,
  gneq: eL,
  gneqq: tL,
  gnsim: nL,
  Gopf: rL,
  gopf: oL,
  grave: sL,
  GreaterEqual: iL,
  GreaterEqualLess: aL,
  GreaterFullEqual: lL,
  GreaterGreater: cL,
  GreaterLess: uL,
  GreaterSlantEqual: dL,
  GreaterTilde: fL,
  Gscr: pL,
  gscr: hL,
  gsim: mL,
  gsime: gL,
  gsiml: yL,
  gtcc: vL,
  gtcir: bL,
  gt: kL,
  GT: xL,
  Gt: wL,
  gtdot: SL,
  gtlPar: CL,
  gtquest: EL,
  gtrapprox: AL,
  gtrarr: TL,
  gtrdot: ML,
  gtreqless: OL,
  gtreqqless: DL,
  gtrless: _L,
  gtrsim: NL,
  gvertneqq: LL,
  gvnE: RL,
  Hacek: IL,
  hairsp: PL,
  half: BL,
  hamilt: FL,
  HARDcy: qL,
  hardcy: zL,
  harrcir: $L,
  harr: HL,
  hArr: VL,
  harrw: jL,
  Hat: UL,
  hbar: WL,
  Hcirc: KL,
  hcirc: GL,
  hearts: JL,
  heartsuit: ZL,
  hellip: YL,
  hercon: QL,
  hfr: XL,
  Hfr: eR,
  HilbertSpace: tR,
  hksearow: nR,
  hkswarow: rR,
  hoarr: oR,
  homtht: sR,
  hookleftarrow: iR,
  hookrightarrow: aR,
  hopf: lR,
  Hopf: cR,
  horbar: uR,
  HorizontalLine: dR,
  hscr: fR,
  Hscr: pR,
  hslash: hR,
  Hstrok: mR,
  hstrok: gR,
  HumpDownHump: yR,
  HumpEqual: vR,
  hybull: bR,
  hyphen: kR,
  Iacute: xR,
  iacute: wR,
  ic: SR,
  Icirc: CR,
  icirc: ER,
  Icy: AR,
  icy: TR,
  Idot: MR,
  IEcy: OR,
  iecy: DR,
  iexcl: _R,
  iff: NR,
  ifr: LR,
  Ifr: RR,
  Igrave: IR,
  igrave: PR,
  ii: BR,
  iiiint: FR,
  iiint: qR,
  iinfin: zR,
  iiota: $R,
  IJlig: HR,
  ijlig: VR,
  Imacr: jR,
  imacr: UR,
  image: WR,
  ImaginaryI: KR,
  imagline: GR,
  imagpart: JR,
  imath: ZR,
  Im: YR,
  imof: QR,
  imped: XR,
  Implies: eI,
  incare: tI,
  in: "∈",
  infin: nI,
  infintie: rI,
  inodot: oI,
  intcal: sI,
  int: iI,
  Int: aI,
  integers: lI,
  Integral: cI,
  intercal: uI,
  Intersection: dI,
  intlarhk: fI,
  intprod: pI,
  InvisibleComma: hI,
  InvisibleTimes: mI,
  IOcy: gI,
  iocy: yI,
  Iogon: vI,
  iogon: bI,
  Iopf: kI,
  iopf: xI,
  Iota: wI,
  iota: SI,
  iprod: CI,
  iquest: EI,
  iscr: AI,
  Iscr: TI,
  isin: MI,
  isindot: OI,
  isinE: DI,
  isins: _I,
  isinsv: NI,
  isinv: LI,
  it: RI,
  Itilde: II,
  itilde: PI,
  Iukcy: BI,
  iukcy: FI,
  Iuml: qI,
  iuml: zI,
  Jcirc: $I,
  jcirc: HI,
  Jcy: VI,
  jcy: jI,
  Jfr: UI,
  jfr: WI,
  jmath: KI,
  Jopf: GI,
  jopf: JI,
  Jscr: ZI,
  jscr: YI,
  Jsercy: QI,
  jsercy: XI,
  Jukcy: eP,
  jukcy: tP,
  Kappa: nP,
  kappa: rP,
  kappav: oP,
  Kcedil: sP,
  kcedil: iP,
  Kcy: aP,
  kcy: lP,
  Kfr: cP,
  kfr: uP,
  kgreen: dP,
  KHcy: fP,
  khcy: pP,
  KJcy: hP,
  kjcy: mP,
  Kopf: gP,
  kopf: yP,
  Kscr: vP,
  kscr: bP,
  lAarr: kP,
  Lacute: xP,
  lacute: wP,
  laemptyv: SP,
  lagran: CP,
  Lambda: EP,
  lambda: AP,
  lang: TP,
  Lang: MP,
  langd: OP,
  langle: DP,
  lap: _P,
  Laplacetrf: NP,
  laquo: LP,
  larrb: RP,
  larrbfs: IP,
  larr: PP,
  Larr: BP,
  lArr: FP,
  larrfs: qP,
  larrhk: zP,
  larrlp: $P,
  larrpl: HP,
  larrsim: VP,
  larrtl: jP,
  latail: UP,
  lAtail: WP,
  lat: KP,
  late: GP,
  lates: JP,
  lbarr: ZP,
  lBarr: YP,
  lbbrk: QP,
  lbrace: XP,
  lbrack: eB,
  lbrke: tB,
  lbrksld: nB,
  lbrkslu: rB,
  Lcaron: oB,
  lcaron: sB,
  Lcedil: iB,
  lcedil: aB,
  lceil: lB,
  lcub: cB,
  Lcy: uB,
  lcy: dB,
  ldca: fB,
  ldquo: pB,
  ldquor: hB,
  ldrdhar: mB,
  ldrushar: gB,
  ldsh: yB,
  le: vB,
  lE: bB,
  LeftAngleBracket: kB,
  LeftArrowBar: xB,
  leftarrow: wB,
  LeftArrow: SB,
  Leftarrow: CB,
  LeftArrowRightArrow: EB,
  leftarrowtail: AB,
  LeftCeiling: TB,
  LeftDoubleBracket: MB,
  LeftDownTeeVector: OB,
  LeftDownVectorBar: DB,
  LeftDownVector: _B,
  LeftFloor: NB,
  leftharpoondown: LB,
  leftharpoonup: RB,
  leftleftarrows: IB,
  leftrightarrow: PB,
  LeftRightArrow: BB,
  Leftrightarrow: FB,
  leftrightarrows: qB,
  leftrightharpoons: zB,
  leftrightsquigarrow: $B,
  LeftRightVector: HB,
  LeftTeeArrow: VB,
  LeftTee: jB,
  LeftTeeVector: UB,
  leftthreetimes: WB,
  LeftTriangleBar: KB,
  LeftTriangle: GB,
  LeftTriangleEqual: JB,
  LeftUpDownVector: ZB,
  LeftUpTeeVector: YB,
  LeftUpVectorBar: QB,
  LeftUpVector: XB,
  LeftVectorBar: eF,
  LeftVector: tF,
  lEg: nF,
  leg: rF,
  leq: oF,
  leqq: sF,
  leqslant: iF,
  lescc: aF,
  les: lF,
  lesdot: cF,
  lesdoto: uF,
  lesdotor: dF,
  lesg: fF,
  lesges: pF,
  lessapprox: hF,
  lessdot: mF,
  lesseqgtr: gF,
  lesseqqgtr: yF,
  LessEqualGreater: vF,
  LessFullEqual: bF,
  LessGreater: kF,
  lessgtr: xF,
  LessLess: wF,
  lesssim: SF,
  LessSlantEqual: CF,
  LessTilde: EF,
  lfisht: AF,
  lfloor: TF,
  Lfr: MF,
  lfr: OF,
  lg: DF,
  lgE: _F,
  lHar: NF,
  lhard: LF,
  lharu: RF,
  lharul: IF,
  lhblk: PF,
  LJcy: BF,
  ljcy: FF,
  llarr: qF,
  ll: zF,
  Ll: $F,
  llcorner: HF,
  Lleftarrow: VF,
  llhard: jF,
  lltri: UF,
  Lmidot: WF,
  lmidot: KF,
  lmoustache: GF,
  lmoust: JF,
  lnap: ZF,
  lnapprox: YF,
  lne: QF,
  lnE: XF,
  lneq: eq,
  lneqq: tq,
  lnsim: nq,
  loang: rq,
  loarr: oq,
  lobrk: sq,
  longleftarrow: iq,
  LongLeftArrow: aq,
  Longleftarrow: lq,
  longleftrightarrow: cq,
  LongLeftRightArrow: uq,
  Longleftrightarrow: dq,
  longmapsto: fq,
  longrightarrow: pq,
  LongRightArrow: hq,
  Longrightarrow: mq,
  looparrowleft: gq,
  looparrowright: yq,
  lopar: vq,
  Lopf: bq,
  lopf: kq,
  loplus: xq,
  lotimes: wq,
  lowast: Sq,
  lowbar: Cq,
  LowerLeftArrow: Eq,
  LowerRightArrow: Aq,
  loz: Tq,
  lozenge: Mq,
  lozf: Oq,
  lpar: Dq,
  lparlt: _q,
  lrarr: Nq,
  lrcorner: Lq,
  lrhar: Rq,
  lrhard: Iq,
  lrm: Pq,
  lrtri: Bq,
  lsaquo: Fq,
  lscr: qq,
  Lscr: zq,
  lsh: $q,
  Lsh: Hq,
  lsim: Vq,
  lsime: jq,
  lsimg: Uq,
  lsqb: Wq,
  lsquo: Kq,
  lsquor: Gq,
  Lstrok: Jq,
  lstrok: Zq,
  ltcc: Yq,
  ltcir: Qq,
  lt: Xq,
  LT: e3,
  Lt: t3,
  ltdot: n3,
  lthree: r3,
  ltimes: o3,
  ltlarr: s3,
  ltquest: i3,
  ltri: a3,
  ltrie: l3,
  ltrif: c3,
  ltrPar: u3,
  lurdshar: d3,
  luruhar: f3,
  lvertneqq: p3,
  lvnE: h3,
  macr: m3,
  male: g3,
  malt: y3,
  maltese: v3,
  Map: "⤅",
  map: b3,
  mapsto: k3,
  mapstodown: x3,
  mapstoleft: w3,
  mapstoup: S3,
  marker: C3,
  mcomma: E3,
  Mcy: A3,
  mcy: T3,
  mdash: M3,
  mDDot: O3,
  measuredangle: D3,
  MediumSpace: _3,
  Mellintrf: N3,
  Mfr: L3,
  mfr: R3,
  mho: I3,
  micro: P3,
  midast: B3,
  midcir: F3,
  mid: q3,
  middot: z3,
  minusb: $3,
  minus: H3,
  minusd: V3,
  minusdu: j3,
  MinusPlus: U3,
  mlcp: W3,
  mldr: K3,
  mnplus: G3,
  models: J3,
  Mopf: Z3,
  mopf: Y3,
  mp: Q3,
  mscr: X3,
  Mscr: ez,
  mstpos: tz,
  Mu: nz,
  mu: rz,
  multimap: oz,
  mumap: sz,
  nabla: iz,
  Nacute: az,
  nacute: lz,
  nang: cz,
  nap: uz,
  napE: dz,
  napid: fz,
  napos: pz,
  napprox: hz,
  natural: mz,
  naturals: gz,
  natur: yz,
  nbsp: vz,
  nbump: bz,
  nbumpe: kz,
  ncap: xz,
  Ncaron: wz,
  ncaron: Sz,
  Ncedil: Cz,
  ncedil: Ez,
  ncong: Az,
  ncongdot: Tz,
  ncup: Mz,
  Ncy: Oz,
  ncy: Dz,
  ndash: _z,
  nearhk: Nz,
  nearr: Lz,
  neArr: Rz,
  nearrow: Iz,
  ne: Pz,
  nedot: Bz,
  NegativeMediumSpace: Fz,
  NegativeThickSpace: qz,
  NegativeThinSpace: zz,
  NegativeVeryThinSpace: $z,
  nequiv: Hz,
  nesear: Vz,
  nesim: jz,
  NestedGreaterGreater: Uz,
  NestedLessLess: Wz,
  NewLine: Kz,
  nexist: Gz,
  nexists: Jz,
  Nfr: Zz,
  nfr: Yz,
  ngE: Qz,
  nge: Xz,
  ngeq: e$,
  ngeqq: t$,
  ngeqslant: n$,
  nges: r$,
  nGg: o$,
  ngsim: s$,
  nGt: i$,
  ngt: a$,
  ngtr: l$,
  nGtv: c$,
  nharr: u$,
  nhArr: d$,
  nhpar: f$,
  ni: p$,
  nis: h$,
  nisd: m$,
  niv: g$,
  NJcy: y$,
  njcy: v$,
  nlarr: b$,
  nlArr: k$,
  nldr: x$,
  nlE: w$,
  nle: S$,
  nleftarrow: C$,
  nLeftarrow: E$,
  nleftrightarrow: A$,
  nLeftrightarrow: T$,
  nleq: M$,
  nleqq: O$,
  nleqslant: D$,
  nles: _$,
  nless: N$,
  nLl: L$,
  nlsim: R$,
  nLt: I$,
  nlt: P$,
  nltri: B$,
  nltrie: F$,
  nLtv: q$,
  nmid: z$,
  NoBreak: $$,
  NonBreakingSpace: H$,
  nopf: V$,
  Nopf: j$,
  Not: U$,
  not: W$,
  NotCongruent: K$,
  NotCupCap: G$,
  NotDoubleVerticalBar: J$,
  NotElement: Z$,
  NotEqual: Y$,
  NotEqualTilde: Q$,
  NotExists: X$,
  NotGreater: eH,
  NotGreaterEqual: tH,
  NotGreaterFullEqual: nH,
  NotGreaterGreater: rH,
  NotGreaterLess: oH,
  NotGreaterSlantEqual: sH,
  NotGreaterTilde: iH,
  NotHumpDownHump: aH,
  NotHumpEqual: lH,
  notin: cH,
  notindot: uH,
  notinE: dH,
  notinva: fH,
  notinvb: pH,
  notinvc: hH,
  NotLeftTriangleBar: mH,
  NotLeftTriangle: gH,
  NotLeftTriangleEqual: yH,
  NotLess: vH,
  NotLessEqual: bH,
  NotLessGreater: kH,
  NotLessLess: xH,
  NotLessSlantEqual: wH,
  NotLessTilde: SH,
  NotNestedGreaterGreater: CH,
  NotNestedLessLess: EH,
  notni: AH,
  notniva: TH,
  notnivb: MH,
  notnivc: OH,
  NotPrecedes: DH,
  NotPrecedesEqual: _H,
  NotPrecedesSlantEqual: NH,
  NotReverseElement: LH,
  NotRightTriangleBar: RH,
  NotRightTriangle: IH,
  NotRightTriangleEqual: PH,
  NotSquareSubset: BH,
  NotSquareSubsetEqual: FH,
  NotSquareSuperset: qH,
  NotSquareSupersetEqual: zH,
  NotSubset: $H,
  NotSubsetEqual: HH,
  NotSucceeds: VH,
  NotSucceedsEqual: jH,
  NotSucceedsSlantEqual: UH,
  NotSucceedsTilde: WH,
  NotSuperset: KH,
  NotSupersetEqual: GH,
  NotTilde: JH,
  NotTildeEqual: ZH,
  NotTildeFullEqual: YH,
  NotTildeTilde: QH,
  NotVerticalBar: XH,
  nparallel: e4,
  npar: t4,
  nparsl: n4,
  npart: r4,
  npolint: o4,
  npr: s4,
  nprcue: i4,
  nprec: a4,
  npreceq: l4,
  npre: c4,
  nrarrc: u4,
  nrarr: d4,
  nrArr: f4,
  nrarrw: p4,
  nrightarrow: h4,
  nRightarrow: m4,
  nrtri: g4,
  nrtrie: y4,
  nsc: v4,
  nsccue: b4,
  nsce: k4,
  Nscr: x4,
  nscr: w4,
  nshortmid: S4,
  nshortparallel: C4,
  nsim: E4,
  nsime: A4,
  nsimeq: T4,
  nsmid: M4,
  nspar: O4,
  nsqsube: D4,
  nsqsupe: _4,
  nsub: N4,
  nsubE: L4,
  nsube: R4,
  nsubset: I4,
  nsubseteq: P4,
  nsubseteqq: B4,
  nsucc: F4,
  nsucceq: q4,
  nsup: z4,
  nsupE: $4,
  nsupe: H4,
  nsupset: V4,
  nsupseteq: j4,
  nsupseteqq: U4,
  ntgl: W4,
  Ntilde: K4,
  ntilde: G4,
  ntlg: J4,
  ntriangleleft: Z4,
  ntrianglelefteq: Y4,
  ntriangleright: Q4,
  ntrianglerighteq: X4,
  Nu: e5,
  nu: t5,
  num: n5,
  numero: r5,
  numsp: o5,
  nvap: s5,
  nvdash: i5,
  nvDash: a5,
  nVdash: l5,
  nVDash: c5,
  nvge: u5,
  nvgt: d5,
  nvHarr: f5,
  nvinfin: p5,
  nvlArr: h5,
  nvle: m5,
  nvlt: g5,
  nvltrie: y5,
  nvrArr: v5,
  nvrtrie: b5,
  nvsim: k5,
  nwarhk: x5,
  nwarr: w5,
  nwArr: S5,
  nwarrow: C5,
  nwnear: E5,
  Oacute: A5,
  oacute: T5,
  oast: M5,
  Ocirc: O5,
  ocirc: D5,
  ocir: _5,
  Ocy: N5,
  ocy: L5,
  odash: R5,
  Odblac: I5,
  odblac: P5,
  odiv: B5,
  odot: F5,
  odsold: q5,
  OElig: z5,
  oelig: $5,
  ofcir: H5,
  Ofr: V5,
  ofr: j5,
  ogon: U5,
  Ograve: W5,
  ograve: K5,
  ogt: G5,
  ohbar: J5,
  ohm: Z5,
  oint: Y5,
  olarr: Q5,
  olcir: X5,
  olcross: eV,
  oline: tV,
  olt: nV,
  Omacr: rV,
  omacr: oV,
  Omega: sV,
  omega: iV,
  Omicron: aV,
  omicron: lV,
  omid: cV,
  ominus: uV,
  Oopf: dV,
  oopf: fV,
  opar: pV,
  OpenCurlyDoubleQuote: hV,
  OpenCurlyQuote: mV,
  operp: gV,
  oplus: yV,
  orarr: vV,
  Or: bV,
  or: kV,
  ord: xV,
  order: wV,
  orderof: SV,
  ordf: CV,
  ordm: EV,
  origof: AV,
  oror: TV,
  orslope: MV,
  orv: OV,
  oS: DV,
  Oscr: _V,
  oscr: NV,
  Oslash: LV,
  oslash: RV,
  osol: IV,
  Otilde: PV,
  otilde: BV,
  otimesas: FV,
  Otimes: qV,
  otimes: zV,
  Ouml: $V,
  ouml: HV,
  ovbar: VV,
  OverBar: jV,
  OverBrace: UV,
  OverBracket: WV,
  OverParenthesis: KV,
  para: GV,
  parallel: JV,
  par: ZV,
  parsim: YV,
  parsl: QV,
  part: XV,
  PartialD: ej,
  Pcy: tj,
  pcy: nj,
  percnt: rj,
  period: oj,
  permil: sj,
  perp: ij,
  pertenk: aj,
  Pfr: lj,
  pfr: cj,
  Phi: uj,
  phi: dj,
  phiv: fj,
  phmmat: pj,
  phone: hj,
  Pi: mj,
  pi: gj,
  pitchfork: yj,
  piv: vj,
  planck: bj,
  planckh: kj,
  plankv: xj,
  plusacir: wj,
  plusb: Sj,
  pluscir: Cj,
  plus: Ej,
  plusdo: Aj,
  plusdu: Tj,
  pluse: Mj,
  PlusMinus: Oj,
  plusmn: Dj,
  plussim: _j,
  plustwo: Nj,
  pm: Lj,
  Poincareplane: Rj,
  pointint: Ij,
  popf: Pj,
  Popf: Bj,
  pound: Fj,
  prap: qj,
  Pr: zj,
  pr: $j,
  prcue: Hj,
  precapprox: Vj,
  prec: jj,
  preccurlyeq: Uj,
  Precedes: Wj,
  PrecedesEqual: Kj,
  PrecedesSlantEqual: Gj,
  PrecedesTilde: Jj,
  preceq: Zj,
  precnapprox: Yj,
  precneqq: Qj,
  precnsim: Xj,
  pre: e6,
  prE: t6,
  precsim: n6,
  prime: r6,
  Prime: o6,
  primes: s6,
  prnap: i6,
  prnE: a6,
  prnsim: l6,
  prod: c6,
  Product: u6,
  profalar: d6,
  profline: f6,
  profsurf: p6,
  prop: h6,
  Proportional: m6,
  Proportion: g6,
  propto: y6,
  prsim: v6,
  prurel: b6,
  Pscr: k6,
  pscr: x6,
  Psi: w6,
  psi: S6,
  puncsp: C6,
  Qfr: E6,
  qfr: A6,
  qint: T6,
  qopf: M6,
  Qopf: O6,
  qprime: D6,
  Qscr: _6,
  qscr: N6,
  quaternions: L6,
  quatint: R6,
  quest: I6,
  questeq: P6,
  quot: B6,
  QUOT: F6,
  rAarr: q6,
  race: z6,
  Racute: $6,
  racute: H6,
  radic: V6,
  raemptyv: j6,
  rang: U6,
  Rang: W6,
  rangd: K6,
  range: G6,
  rangle: J6,
  raquo: Z6,
  rarrap: Y6,
  rarrb: Q6,
  rarrbfs: X6,
  rarrc: e8,
  rarr: t8,
  Rarr: n8,
  rArr: r8,
  rarrfs: o8,
  rarrhk: s8,
  rarrlp: i8,
  rarrpl: a8,
  rarrsim: l8,
  Rarrtl: c8,
  rarrtl: u8,
  rarrw: d8,
  ratail: f8,
  rAtail: p8,
  ratio: h8,
  rationals: m8,
  rbarr: g8,
  rBarr: y8,
  RBarr: v8,
  rbbrk: b8,
  rbrace: k8,
  rbrack: x8,
  rbrke: w8,
  rbrksld: S8,
  rbrkslu: C8,
  Rcaron: E8,
  rcaron: A8,
  Rcedil: T8,
  rcedil: M8,
  rceil: O8,
  rcub: D8,
  Rcy: _8,
  rcy: N8,
  rdca: L8,
  rdldhar: R8,
  rdquo: I8,
  rdquor: P8,
  rdsh: B8,
  real: F8,
  realine: q8,
  realpart: z8,
  reals: $8,
  Re: H8,
  rect: V8,
  reg: j8,
  REG: U8,
  ReverseElement: W8,
  ReverseEquilibrium: K8,
  ReverseUpEquilibrium: G8,
  rfisht: J8,
  rfloor: Z8,
  rfr: Y8,
  Rfr: Q8,
  rHar: X8,
  rhard: eU,
  rharu: tU,
  rharul: nU,
  Rho: rU,
  rho: oU,
  rhov: sU,
  RightAngleBracket: iU,
  RightArrowBar: aU,
  rightarrow: lU,
  RightArrow: cU,
  Rightarrow: uU,
  RightArrowLeftArrow: dU,
  rightarrowtail: fU,
  RightCeiling: pU,
  RightDoubleBracket: hU,
  RightDownTeeVector: mU,
  RightDownVectorBar: gU,
  RightDownVector: yU,
  RightFloor: vU,
  rightharpoondown: bU,
  rightharpoonup: kU,
  rightleftarrows: xU,
  rightleftharpoons: wU,
  rightrightarrows: SU,
  rightsquigarrow: CU,
  RightTeeArrow: EU,
  RightTee: AU,
  RightTeeVector: TU,
  rightthreetimes: MU,
  RightTriangleBar: OU,
  RightTriangle: DU,
  RightTriangleEqual: _U,
  RightUpDownVector: NU,
  RightUpTeeVector: LU,
  RightUpVectorBar: RU,
  RightUpVector: IU,
  RightVectorBar: PU,
  RightVector: BU,
  ring: FU,
  risingdotseq: qU,
  rlarr: zU,
  rlhar: $U,
  rlm: HU,
  rmoustache: VU,
  rmoust: jU,
  rnmid: UU,
  roang: WU,
  roarr: KU,
  robrk: GU,
  ropar: JU,
  ropf: ZU,
  Ropf: YU,
  roplus: QU,
  rotimes: XU,
  RoundImplies: e9,
  rpar: t9,
  rpargt: n9,
  rppolint: r9,
  rrarr: o9,
  Rrightarrow: s9,
  rsaquo: i9,
  rscr: a9,
  Rscr: l9,
  rsh: c9,
  Rsh: u9,
  rsqb: d9,
  rsquo: f9,
  rsquor: p9,
  rthree: h9,
  rtimes: m9,
  rtri: g9,
  rtrie: y9,
  rtrif: v9,
  rtriltri: b9,
  RuleDelayed: k9,
  ruluhar: x9,
  rx: w9,
  Sacute: S9,
  sacute: C9,
  sbquo: E9,
  scap: A9,
  Scaron: T9,
  scaron: M9,
  Sc: O9,
  sc: D9,
  sccue: _9,
  sce: N9,
  scE: L9,
  Scedil: R9,
  scedil: I9,
  Scirc: P9,
  scirc: B9,
  scnap: F9,
  scnE: q9,
  scnsim: z9,
  scpolint: $9,
  scsim: H9,
  Scy: V9,
  scy: j9,
  sdotb: U9,
  sdot: W9,
  sdote: K9,
  searhk: G9,
  searr: J9,
  seArr: Z9,
  searrow: Y9,
  sect: Q9,
  semi: X9,
  seswar: e7,
  setminus: t7,
  setmn: n7,
  sext: r7,
  Sfr: o7,
  sfr: s7,
  sfrown: i7,
  sharp: a7,
  SHCHcy: l7,
  shchcy: c7,
  SHcy: u7,
  shcy: d7,
  ShortDownArrow: f7,
  ShortLeftArrow: p7,
  shortmid: h7,
  shortparallel: m7,
  ShortRightArrow: g7,
  ShortUpArrow: y7,
  shy: v7,
  Sigma: b7,
  sigma: k7,
  sigmaf: x7,
  sigmav: w7,
  sim: S7,
  simdot: C7,
  sime: E7,
  simeq: A7,
  simg: T7,
  simgE: M7,
  siml: O7,
  simlE: D7,
  simne: _7,
  simplus: N7,
  simrarr: L7,
  slarr: R7,
  SmallCircle: I7,
  smallsetminus: P7,
  smashp: B7,
  smeparsl: F7,
  smid: q7,
  smile: z7,
  smt: $7,
  smte: H7,
  smtes: V7,
  SOFTcy: j7,
  softcy: U7,
  solbar: W7,
  solb: K7,
  sol: G7,
  Sopf: J7,
  sopf: Z7,
  spades: Y7,
  spadesuit: Q7,
  spar: X7,
  sqcap: eW,
  sqcaps: tW,
  sqcup: nW,
  sqcups: rW,
  Sqrt: oW,
  sqsub: sW,
  sqsube: iW,
  sqsubset: aW,
  sqsubseteq: lW,
  sqsup: cW,
  sqsupe: uW,
  sqsupset: dW,
  sqsupseteq: fW,
  square: pW,
  Square: hW,
  SquareIntersection: mW,
  SquareSubset: gW,
  SquareSubsetEqual: yW,
  SquareSuperset: vW,
  SquareSupersetEqual: bW,
  SquareUnion: kW,
  squarf: xW,
  squ: wW,
  squf: SW,
  srarr: CW,
  Sscr: EW,
  sscr: AW,
  ssetmn: TW,
  ssmile: MW,
  sstarf: OW,
  Star: DW,
  star: _W,
  starf: NW,
  straightepsilon: LW,
  straightphi: RW,
  strns: IW,
  sub: PW,
  Sub: BW,
  subdot: FW,
  subE: qW,
  sube: zW,
  subedot: $W,
  submult: HW,
  subnE: VW,
  subne: jW,
  subplus: UW,
  subrarr: WW,
  subset: KW,
  Subset: GW,
  subseteq: JW,
  subseteqq: ZW,
  SubsetEqual: YW,
  subsetneq: QW,
  subsetneqq: XW,
  subsim: eK,
  subsub: tK,
  subsup: nK,
  succapprox: rK,
  succ: oK,
  succcurlyeq: sK,
  Succeeds: iK,
  SucceedsEqual: aK,
  SucceedsSlantEqual: lK,
  SucceedsTilde: cK,
  succeq: uK,
  succnapprox: dK,
  succneqq: fK,
  succnsim: pK,
  succsim: hK,
  SuchThat: mK,
  sum: gK,
  Sum: yK,
  sung: vK,
  sup1: bK,
  sup2: kK,
  sup3: xK,
  sup: wK,
  Sup: SK,
  supdot: CK,
  supdsub: EK,
  supE: AK,
  supe: TK,
  supedot: MK,
  Superset: OK,
  SupersetEqual: DK,
  suphsol: _K,
  suphsub: NK,
  suplarr: LK,
  supmult: RK,
  supnE: IK,
  supne: PK,
  supplus: BK,
  supset: FK,
  Supset: qK,
  supseteq: zK,
  supseteqq: $K,
  supsetneq: HK,
  supsetneqq: VK,
  supsim: jK,
  supsub: UK,
  supsup: WK,
  swarhk: KK,
  swarr: GK,
  swArr: JK,
  swarrow: ZK,
  swnwar: YK,
  szlig: QK,
  Tab: XK,
  target: eG,
  Tau: tG,
  tau: nG,
  tbrk: rG,
  Tcaron: oG,
  tcaron: sG,
  Tcedil: iG,
  tcedil: aG,
  Tcy: lG,
  tcy: cG,
  tdot: uG,
  telrec: dG,
  Tfr: fG,
  tfr: pG,
  there4: hG,
  therefore: mG,
  Therefore: gG,
  Theta: yG,
  theta: vG,
  thetasym: bG,
  thetav: kG,
  thickapprox: xG,
  thicksim: wG,
  ThickSpace: SG,
  ThinSpace: CG,
  thinsp: EG,
  thkap: AG,
  thksim: TG,
  THORN: MG,
  thorn: OG,
  tilde: DG,
  Tilde: _G,
  TildeEqual: NG,
  TildeFullEqual: LG,
  TildeTilde: RG,
  timesbar: IG,
  timesb: PG,
  times: BG,
  timesd: FG,
  tint: qG,
  toea: zG,
  topbot: $G,
  topcir: HG,
  top: VG,
  Topf: jG,
  topf: UG,
  topfork: WG,
  tosa: KG,
  tprime: GG,
  trade: JG,
  TRADE: ZG,
  triangle: YG,
  triangledown: QG,
  triangleleft: XG,
  trianglelefteq: eJ,
  triangleq: tJ,
  triangleright: nJ,
  trianglerighteq: rJ,
  tridot: oJ,
  trie: sJ,
  triminus: iJ,
  TripleDot: aJ,
  triplus: lJ,
  trisb: cJ,
  tritime: uJ,
  trpezium: dJ,
  Tscr: fJ,
  tscr: pJ,
  TScy: hJ,
  tscy: mJ,
  TSHcy: gJ,
  tshcy: yJ,
  Tstrok: vJ,
  tstrok: bJ,
  twixt: kJ,
  twoheadleftarrow: xJ,
  twoheadrightarrow: wJ,
  Uacute: SJ,
  uacute: CJ,
  uarr: EJ,
  Uarr: AJ,
  uArr: TJ,
  Uarrocir: MJ,
  Ubrcy: OJ,
  ubrcy: DJ,
  Ubreve: _J,
  ubreve: NJ,
  Ucirc: LJ,
  ucirc: RJ,
  Ucy: IJ,
  ucy: PJ,
  udarr: BJ,
  Udblac: FJ,
  udblac: qJ,
  udhar: zJ,
  ufisht: $J,
  Ufr: HJ,
  ufr: VJ,
  Ugrave: jJ,
  ugrave: UJ,
  uHar: WJ,
  uharl: KJ,
  uharr: GJ,
  uhblk: JJ,
  ulcorn: ZJ,
  ulcorner: YJ,
  ulcrop: QJ,
  ultri: XJ,
  Umacr: eZ,
  umacr: tZ,
  uml: nZ,
  UnderBar: rZ,
  UnderBrace: oZ,
  UnderBracket: sZ,
  UnderParenthesis: iZ,
  Union: aZ,
  UnionPlus: lZ,
  Uogon: cZ,
  uogon: uZ,
  Uopf: dZ,
  uopf: fZ,
  UpArrowBar: pZ,
  uparrow: hZ,
  UpArrow: mZ,
  Uparrow: gZ,
  UpArrowDownArrow: yZ,
  updownarrow: vZ,
  UpDownArrow: bZ,
  Updownarrow: kZ,
  UpEquilibrium: xZ,
  upharpoonleft: wZ,
  upharpoonright: SZ,
  uplus: CZ,
  UpperLeftArrow: EZ,
  UpperRightArrow: AZ,
  upsi: TZ,
  Upsi: MZ,
  upsih: OZ,
  Upsilon: DZ,
  upsilon: _Z,
  UpTeeArrow: NZ,
  UpTee: LZ,
  upuparrows: RZ,
  urcorn: IZ,
  urcorner: PZ,
  urcrop: BZ,
  Uring: FZ,
  uring: qZ,
  urtri: zZ,
  Uscr: $Z,
  uscr: HZ,
  utdot: VZ,
  Utilde: jZ,
  utilde: UZ,
  utri: WZ,
  utrif: KZ,
  uuarr: GZ,
  Uuml: JZ,
  uuml: ZZ,
  uwangle: YZ,
  vangrt: QZ,
  varepsilon: XZ,
  varkappa: eY,
  varnothing: tY,
  varphi: nY,
  varpi: rY,
  varpropto: oY,
  varr: sY,
  vArr: iY,
  varrho: aY,
  varsigma: lY,
  varsubsetneq: cY,
  varsubsetneqq: uY,
  varsupsetneq: dY,
  varsupsetneqq: fY,
  vartheta: pY,
  vartriangleleft: hY,
  vartriangleright: mY,
  vBar: gY,
  Vbar: yY,
  vBarv: vY,
  Vcy: bY,
  vcy: kY,
  vdash: xY,
  vDash: wY,
  Vdash: SY,
  VDash: CY,
  Vdashl: EY,
  veebar: AY,
  vee: TY,
  Vee: MY,
  veeeq: OY,
  vellip: DY,
  verbar: _Y,
  Verbar: NY,
  vert: LY,
  Vert: RY,
  VerticalBar: IY,
  VerticalLine: PY,
  VerticalSeparator: BY,
  VerticalTilde: FY,
  VeryThinSpace: qY,
  Vfr: zY,
  vfr: $Y,
  vltri: HY,
  vnsub: VY,
  vnsup: jY,
  Vopf: UY,
  vopf: WY,
  vprop: KY,
  vrtri: GY,
  Vscr: JY,
  vscr: ZY,
  vsubnE: YY,
  vsubne: QY,
  vsupnE: XY,
  vsupne: eQ,
  Vvdash: tQ,
  vzigzag: nQ,
  Wcirc: rQ,
  wcirc: oQ,
  wedbar: sQ,
  wedge: iQ,
  Wedge: aQ,
  wedgeq: lQ,
  weierp: cQ,
  Wfr: uQ,
  wfr: dQ,
  Wopf: fQ,
  wopf: pQ,
  wp: hQ,
  wr: mQ,
  wreath: gQ,
  Wscr: yQ,
  wscr: vQ,
  xcap: bQ,
  xcirc: kQ,
  xcup: xQ,
  xdtri: wQ,
  Xfr: SQ,
  xfr: CQ,
  xharr: EQ,
  xhArr: AQ,
  Xi: TQ,
  xi: MQ,
  xlarr: OQ,
  xlArr: DQ,
  xmap: _Q,
  xnis: NQ,
  xodot: LQ,
  Xopf: RQ,
  xopf: IQ,
  xoplus: PQ,
  xotime: BQ,
  xrarr: FQ,
  xrArr: qQ,
  Xscr: zQ,
  xscr: $Q,
  xsqcup: HQ,
  xuplus: VQ,
  xutri: jQ,
  xvee: UQ,
  xwedge: WQ,
  Yacute: KQ,
  yacute: GQ,
  YAcy: JQ,
  yacy: ZQ,
  Ycirc: YQ,
  ycirc: QQ,
  Ycy: XQ,
  ycy: eX,
  yen: tX,
  Yfr: nX,
  yfr: rX,
  YIcy: oX,
  yicy: sX,
  Yopf: iX,
  yopf: aX,
  Yscr: lX,
  yscr: cX,
  YUcy: uX,
  yucy: dX,
  yuml: fX,
  Yuml: pX,
  Zacute: hX,
  zacute: mX,
  Zcaron: gX,
  zcaron: yX,
  Zcy: vX,
  zcy: bX,
  Zdot: kX,
  zdot: xX,
  zeetrf: wX,
  ZeroWidthSpace: SX,
  Zeta: CX,
  zeta: EX,
  zfr: AX,
  Zfr: TX,
  ZHcy: MX,
  zhcy: OX,
  zigrarr: DX,
  zopf: _X,
  Zopf: NX,
  Zscr: LX,
  zscr: RX,
  zwj: IX,
  zwnj: PX
};
var Ah = BX, ac = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4E\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/, Br = {}, vd = {};
function FX(n) {
  var e, t, r = vd[n];
  if (r)
    return r;
  for (r = vd[n] = [], e = 0; e < 128; e++)
    t = String.fromCharCode(e), /^[0-9a-z]$/i.test(t) ? r.push(t) : r.push("%" + ("0" + e.toString(16).toUpperCase()).slice(-2));
  for (e = 0; e < n.length; e++)
    r[n.charCodeAt(e)] = n[e];
  return r;
}
function yi(n, e, t) {
  var r, o, s, i, a, l = "";
  for (typeof e != "string" && (t = e, e = yi.defaultChars), typeof t > "u" && (t = !0), a = FX(e), r = 0, o = n.length; r < o; r++) {
    if (s = n.charCodeAt(r), t && s === 37 && r + 2 < o && /^[0-9a-f]{2}$/i.test(n.slice(r + 1, r + 3))) {
      l += n.slice(r, r + 3), r += 2;
      continue;
    }
    if (s < 128) {
      l += a[s];
      continue;
    }
    if (s >= 55296 && s <= 57343) {
      if (s >= 55296 && s <= 56319 && r + 1 < o && (i = n.charCodeAt(r + 1), i >= 56320 && i <= 57343)) {
        l += encodeURIComponent(n[r] + n[r + 1]), r++;
        continue;
      }
      l += "%EF%BF%BD";
      continue;
    }
    l += encodeURIComponent(n[r]);
  }
  return l;
}
yi.defaultChars = ";/?:@&=+$,-_.!~*'()#";
yi.componentChars = "-_.!~*'()";
var qX = yi, bd = {};
function zX(n) {
  var e, t, r = bd[n];
  if (r)
    return r;
  for (r = bd[n] = [], e = 0; e < 128; e++)
    t = String.fromCharCode(e), r.push(t);
  for (e = 0; e < n.length; e++)
    t = n.charCodeAt(e), r[t] = "%" + ("0" + t.toString(16).toUpperCase()).slice(-2);
  return r;
}
function vi(n, e) {
  var t;
  return typeof e != "string" && (e = vi.defaultChars), t = zX(e), n.replace(/(%[a-f0-9]{2})+/gi, function(r) {
    var o, s, i, a, l, c, u, d = "";
    for (o = 0, s = r.length; o < s; o += 3) {
      if (i = parseInt(r.slice(o + 1, o + 3), 16), i < 128) {
        d += t[i];
        continue;
      }
      if ((i & 224) === 192 && o + 3 < s && (a = parseInt(r.slice(o + 4, o + 6), 16), (a & 192) === 128)) {
        u = i << 6 & 1984 | a & 63, u < 128 ? d += "��" : d += String.fromCharCode(u), o += 3;
        continue;
      }
      if ((i & 240) === 224 && o + 6 < s && (a = parseInt(r.slice(o + 4, o + 6), 16), l = parseInt(r.slice(o + 7, o + 9), 16), (a & 192) === 128 && (l & 192) === 128)) {
        u = i << 12 & 61440 | a << 6 & 4032 | l & 63, u < 2048 || u >= 55296 && u <= 57343 ? d += "���" : d += String.fromCharCode(u), o += 6;
        continue;
      }
      if ((i & 248) === 240 && o + 9 < s && (a = parseInt(r.slice(o + 4, o + 6), 16), l = parseInt(r.slice(o + 7, o + 9), 16), c = parseInt(r.slice(o + 10, o + 12), 16), (a & 192) === 128 && (l & 192) === 128 && (c & 192) === 128)) {
        u = i << 18 & 1835008 | a << 12 & 258048 | l << 6 & 4032 | c & 63, u < 65536 || u > 1114111 ? d += "����" : (u -= 65536, d += String.fromCharCode(55296 + (u >> 10), 56320 + (u & 1023))), o += 9;
        continue;
      }
      d += "�";
    }
    return d;
  });
}
vi.defaultChars = ";/?:@&=+$,#";
vi.componentChars = "";
var $X = vi, HX = function(e) {
  var t = "";
  return t += e.protocol || "", t += e.slashes ? "//" : "", t += e.auth ? e.auth + "@" : "", e.hostname && e.hostname.indexOf(":") !== -1 ? t += "[" + e.hostname + "]" : t += e.hostname || "", t += e.port ? ":" + e.port : "", t += e.pathname || "", t += e.search || "", t += e.hash || "", t;
};
function Js() {
  this.protocol = null, this.slashes = null, this.auth = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.pathname = null;
}
var VX = /^([a-z0-9.+-]+:)/i, jX = /:[0-9]*$/, UX = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, WX = ["<", ">", '"', "`", " ", "\r", `
`, "	"], KX = ["{", "}", "|", "\\", "^", "`"].concat(WX), GX = ["'"].concat(KX), kd = ["%", "/", "?", ";", "#"].concat(GX), xd = ["/", "?", "#"], JX = 255, wd = /^[+a-z0-9A-Z_-]{0,63}$/, ZX = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, Sd = {
  javascript: !0,
  "javascript:": !0
}, Cd = {
  http: !0,
  https: !0,
  ftp: !0,
  gopher: !0,
  file: !0,
  "http:": !0,
  "https:": !0,
  "ftp:": !0,
  "gopher:": !0,
  "file:": !0
};
function YX(n, e) {
  if (n && n instanceof Js)
    return n;
  var t = new Js();
  return t.parse(n, e), t;
}
Js.prototype.parse = function(n, e) {
  var t, r, o, s, i, a = n;
  if (a = a.trim(), !e && n.split("#").length === 1) {
    var l = UX.exec(a);
    if (l)
      return this.pathname = l[1], l[2] && (this.search = l[2]), this;
  }
  var c = VX.exec(a);
  if (c && (c = c[0], o = c.toLowerCase(), this.protocol = c, a = a.substr(c.length)), (e || c || a.match(/^\/\/[^@\/]+@[^@\/]+/)) && (i = a.substr(0, 2) === "//", i && !(c && Sd[c]) && (a = a.substr(2), this.slashes = !0)), !Sd[c] && (i || c && !Cd[c])) {
    var u = -1;
    for (t = 0; t < xd.length; t++)
      s = a.indexOf(xd[t]), s !== -1 && (u === -1 || s < u) && (u = s);
    var d, f;
    for (u === -1 ? f = a.lastIndexOf("@") : f = a.lastIndexOf("@", u), f !== -1 && (d = a.slice(0, f), a = a.slice(f + 1), this.auth = d), u = -1, t = 0; t < kd.length; t++)
      s = a.indexOf(kd[t]), s !== -1 && (u === -1 || s < u) && (u = s);
    u === -1 && (u = a.length), a[u - 1] === ":" && u--;
    var p = a.slice(0, u);
    a = a.slice(u), this.parseHost(p), this.hostname = this.hostname || "";
    var h = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
    if (!h) {
      var m = this.hostname.split(/\./);
      for (t = 0, r = m.length; t < r; t++) {
        var g = m[t];
        if (g && !g.match(wd)) {
          for (var v = "", b = 0, x = g.length; b < x; b++)
            g.charCodeAt(b) > 127 ? v += "x" : v += g[b];
          if (!v.match(wd)) {
            var y = m.slice(0, t), w = m.slice(t + 1), k = g.match(ZX);
            k && (y.push(k[1]), w.unshift(k[2])), w.length && (a = w.join(".") + a), this.hostname = y.join(".");
            break;
          }
        }
      }
    }
    this.hostname.length > JX && (this.hostname = ""), h && (this.hostname = this.hostname.substr(1, this.hostname.length - 2));
  }
  var S = a.indexOf("#");
  S !== -1 && (this.hash = a.substr(S), a = a.slice(0, S));
  var E = a.indexOf("?");
  return E !== -1 && (this.search = a.substr(E), a = a.slice(0, E)), a && (this.pathname = a), Cd[o] && this.hostname && !this.pathname && (this.pathname = ""), this;
};
Js.prototype.parseHost = function(n) {
  var e = jX.exec(n);
  e && (e = e[0], e !== ":" && (this.port = e.substr(1)), n = n.substr(0, n.length - e.length)), n && (this.hostname = n);
};
var QX = YX;
Br.encode = qX;
Br.decode = $X;
Br.format = HX;
Br.parse = QX;
var bn = {}, fa, Ed;
function Th() {
  return Ed || (Ed = 1, fa = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/), fa;
}
var pa, Ad;
function Mh() {
  return Ad || (Ad = 1, pa = /[\0-\x1F\x7F-\x9F]/), pa;
}
var ha, Td;
function XX() {
  return Td || (Td = 1, ha = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/), ha;
}
var ma, Md;
function Oh() {
  return Md || (Md = 1, ma = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/), ma;
}
var Od;
function eee() {
  return Od || (Od = 1, bn.Any = Th(), bn.Cc = Mh(), bn.Cf = XX(), bn.P = ac, bn.Z = Oh()), bn;
}
(function(n) {
  function e(A) {
    return Object.prototype.toString.call(A);
  }
  function t(A) {
    return e(A) === "[object String]";
  }
  var r = Object.prototype.hasOwnProperty;
  function o(A, q) {
    return r.call(A, q);
  }
  function s(A) {
    var q = Array.prototype.slice.call(arguments, 1);
    return q.forEach(function(L) {
      if (L) {
        if (typeof L != "object")
          throw new TypeError(L + "must be object");
        Object.keys(L).forEach(function(z) {
          A[z] = L[z];
        });
      }
    }), A;
  }
  function i(A, q, L) {
    return [].concat(A.slice(0, q), L, A.slice(q + 1));
  }
  function a(A) {
    return !(A >= 55296 && A <= 57343 || A >= 64976 && A <= 65007 || (A & 65535) === 65535 || (A & 65535) === 65534 || A >= 0 && A <= 8 || A === 11 || A >= 14 && A <= 31 || A >= 127 && A <= 159 || A > 1114111);
  }
  function l(A) {
    if (A > 65535) {
      A -= 65536;
      var q = 55296 + (A >> 10), L = 56320 + (A & 1023);
      return String.fromCharCode(q, L);
    }
    return String.fromCharCode(A);
  }
  var c = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g, u = /&([a-z#][a-z0-9]{1,31});/gi, d = new RegExp(c.source + "|" + u.source, "gi"), f = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i, p = Ah;
  function h(A, q) {
    var L = 0;
    return o(p, q) ? p[q] : q.charCodeAt(0) === 35 && f.test(q) && (L = q[1].toLowerCase() === "x" ? parseInt(q.slice(2), 16) : parseInt(q.slice(1), 10), a(L)) ? l(L) : A;
  }
  function m(A) {
    return A.indexOf("\\") < 0 ? A : A.replace(c, "$1");
  }
  function g(A) {
    return A.indexOf("\\") < 0 && A.indexOf("&") < 0 ? A : A.replace(d, function(q, L, z) {
      return L || h(q, z);
    });
  }
  var v = /[&<>"]/, b = /[&<>"]/g, x = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  };
  function y(A) {
    return x[A];
  }
  function w(A) {
    return v.test(A) ? A.replace(b, y) : A;
  }
  var k = /[.?*+^$[\]\\(){}|-]/g;
  function S(A) {
    return A.replace(k, "\\$&");
  }
  function E(A) {
    switch (A) {
      case 9:
      case 32:
        return !0;
    }
    return !1;
  }
  function T(A) {
    if (A >= 8192 && A <= 8202)
      return !0;
    switch (A) {
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 32:
      case 160:
      case 5760:
      case 8239:
      case 8287:
      case 12288:
        return !0;
    }
    return !1;
  }
  var D = ac;
  function _(A) {
    return D.test(A);
  }
  function F(A) {
    switch (A) {
      case 33:
      case 34:
      case 35:
      case 36:
      case 37:
      case 38:
      case 39:
      case 40:
      case 41:
      case 42:
      case 43:
      case 44:
      case 45:
      case 46:
      case 47:
      case 58:
      case 59:
      case 60:
      case 61:
      case 62:
      case 63:
      case 64:
      case 91:
      case 92:
      case 93:
      case 94:
      case 95:
      case 96:
      case 123:
      case 124:
      case 125:
      case 126:
        return !0;
      default:
        return !1;
    }
  }
  function P(A) {
    return A = A.trim().replace(/\s+/g, " "), "ẞ".toLowerCase() === "Ṿ" && (A = A.replace(/ẞ/g, "ß")), A.toLowerCase().toUpperCase();
  }
  n.lib = {}, n.lib.mdurl = Br, n.lib.ucmicro = eee(), n.assign = s, n.isString = t, n.has = o, n.unescapeMd = m, n.unescapeAll = g, n.isValidEntityCode = a, n.fromCodePoint = l, n.escapeHtml = w, n.arrayReplaceAt = i, n.isSpace = E, n.isWhiteSpace = T, n.isMdAsciiPunct = F, n.isPunctChar = _, n.escapeRE = S, n.normalizeReference = P;
})(Y);
var bi = {}, tee = function(e, t, r) {
  var o, s, i, a, l = -1, c = e.posMax, u = e.pos;
  for (e.pos = t + 1, o = 1; e.pos < c; ) {
    if (i = e.src.charCodeAt(e.pos), i === 93 && (o--, o === 0)) {
      s = !0;
      break;
    }
    if (a = e.pos, e.md.inline.skipToken(e), i === 91) {
      if (a === e.pos - 1)
        o++;
      else if (r)
        return e.pos = u, -1;
    }
  }
  return s && (l = e.pos), e.pos = u, l;
}, Dd = Y.unescapeAll, nee = function(e, t, r) {
  var o, s, i = 0, a = t, l = {
    ok: !1,
    pos: 0,
    lines: 0,
    str: ""
  };
  if (e.charCodeAt(t) === 60) {
    for (t++; t < r; ) {
      if (o = e.charCodeAt(t), o === 10 || o === 60)
        return l;
      if (o === 62)
        return l.pos = t + 1, l.str = Dd(e.slice(a + 1, t)), l.ok = !0, l;
      if (o === 92 && t + 1 < r) {
        t += 2;
        continue;
      }
      t++;
    }
    return l;
  }
  for (s = 0; t < r && (o = e.charCodeAt(t), !(o === 32 || o < 32 || o === 127)); ) {
    if (o === 92 && t + 1 < r) {
      if (e.charCodeAt(t + 1) === 32)
        break;
      t += 2;
      continue;
    }
    if (o === 40 && (s++, s > 32))
      return l;
    if (o === 41) {
      if (s === 0)
        break;
      s--;
    }
    t++;
  }
  return a === t || s !== 0 || (l.str = Dd(e.slice(a, t)), l.lines = i, l.pos = t, l.ok = !0), l;
}, ree = Y.unescapeAll, oee = function(e, t, r) {
  var o, s, i = 0, a = t, l = {
    ok: !1,
    pos: 0,
    lines: 0,
    str: ""
  };
  if (t >= r || (s = e.charCodeAt(t), s !== 34 && s !== 39 && s !== 40))
    return l;
  for (t++, s === 40 && (s = 41); t < r; ) {
    if (o = e.charCodeAt(t), o === s)
      return l.pos = t + 1, l.lines = i, l.str = ree(e.slice(a + 1, t)), l.ok = !0, l;
    if (o === 40 && s === 41)
      return l;
    o === 10 ? i++ : o === 92 && t + 1 < r && (t++, e.charCodeAt(t) === 10 && i++), t++;
  }
  return l;
};
bi.parseLinkLabel = tee;
bi.parseLinkDestination = nee;
bi.parseLinkTitle = oee;
var see = Y.assign, iee = Y.unescapeAll, jn = Y.escapeHtml, At = {};
At.code_inline = function(n, e, t, r, o) {
  var s = n[e];
  return "<code" + o.renderAttrs(s) + ">" + jn(n[e].content) + "</code>";
};
At.code_block = function(n, e, t, r, o) {
  var s = n[e];
  return "<pre" + o.renderAttrs(s) + "><code>" + jn(n[e].content) + `</code></pre>
`;
};
At.fence = function(n, e, t, r, o) {
  var s = n[e], i = s.info ? iee(s.info).trim() : "", a = "", l = "", c, u, d, f, p;
  return i && (d = i.split(/(\s+)/g), a = d[0], l = d.slice(2).join("")), t.highlight ? c = t.highlight(s.content, a, l) || jn(s.content) : c = jn(s.content), c.indexOf("<pre") === 0 ? c + `
` : i ? (u = s.attrIndex("class"), f = s.attrs ? s.attrs.slice() : [], u < 0 ? f.push(["class", t.langPrefix + a]) : (f[u] = f[u].slice(), f[u][1] += " " + t.langPrefix + a), p = {
    attrs: f
  }, "<pre><code" + o.renderAttrs(p) + ">" + c + `</code></pre>
`) : "<pre><code" + o.renderAttrs(s) + ">" + c + `</code></pre>
`;
};
At.image = function(n, e, t, r, o) {
  var s = n[e];
  return s.attrs[s.attrIndex("alt")][1] = o.renderInlineAsText(s.children, t, r), o.renderToken(n, e, t);
};
At.hardbreak = function(n, e, t) {
  return t.xhtmlOut ? `<br />
` : `<br>
`;
};
At.softbreak = function(n, e, t) {
  return t.breaks ? t.xhtmlOut ? `<br />
` : `<br>
` : `
`;
};
At.text = function(n, e) {
  return jn(n[e].content);
};
At.html_block = function(n, e) {
  return n[e].content;
};
At.html_inline = function(n, e) {
  return n[e].content;
};
function Fr() {
  this.rules = see({}, At);
}
Fr.prototype.renderAttrs = function(e) {
  var t, r, o;
  if (!e.attrs)
    return "";
  for (o = "", t = 0, r = e.attrs.length; t < r; t++)
    o += " " + jn(e.attrs[t][0]) + '="' + jn(e.attrs[t][1]) + '"';
  return o;
};
Fr.prototype.renderToken = function(e, t, r) {
  var o, s = "", i = !1, a = e[t];
  return a.hidden ? "" : (a.block && a.nesting !== -1 && t && e[t - 1].hidden && (s += `
`), s += (a.nesting === -1 ? "</" : "<") + a.tag, s += this.renderAttrs(a), a.nesting === 0 && r.xhtmlOut && (s += " /"), a.block && (i = !0, a.nesting === 1 && t + 1 < e.length && (o = e[t + 1], (o.type === "inline" || o.hidden || o.nesting === -1 && o.tag === a.tag) && (i = !1))), s += i ? `>
` : ">", s);
};
Fr.prototype.renderInline = function(n, e, t) {
  for (var r, o = "", s = this.rules, i = 0, a = n.length; i < a; i++)
    r = n[i].type, typeof s[r] < "u" ? o += s[r](n, i, e, t, this) : o += this.renderToken(n, i, e);
  return o;
};
Fr.prototype.renderInlineAsText = function(n, e, t) {
  for (var r = "", o = 0, s = n.length; o < s; o++)
    n[o].type === "text" ? r += n[o].content : n[o].type === "image" ? r += this.renderInlineAsText(n[o].children, e, t) : n[o].type === "softbreak" && (r += `
`);
  return r;
};
Fr.prototype.render = function(n, e, t) {
  var r, o, s, i = "", a = this.rules;
  for (r = 0, o = n.length; r < o; r++)
    s = n[r].type, s === "inline" ? i += this.renderInline(n[r].children, e, t) : typeof a[s] < "u" ? i += a[n[r].type](n, r, e, t, this) : i += this.renderToken(n, r, e, t);
  return i;
};
var aee = Fr;
function ct() {
  this.__rules__ = [], this.__cache__ = null;
}
ct.prototype.__find__ = function(n) {
  for (var e = 0; e < this.__rules__.length; e++)
    if (this.__rules__[e].name === n)
      return e;
  return -1;
};
ct.prototype.__compile__ = function() {
  var n = this, e = [""];
  n.__rules__.forEach(function(t) {
    t.enabled && t.alt.forEach(function(r) {
      e.indexOf(r) < 0 && e.push(r);
    });
  }), n.__cache__ = {}, e.forEach(function(t) {
    n.__cache__[t] = [], n.__rules__.forEach(function(r) {
      r.enabled && (t && r.alt.indexOf(t) < 0 || n.__cache__[t].push(r.fn));
    });
  });
};
ct.prototype.at = function(n, e, t) {
  var r = this.__find__(n), o = t || {};
  if (r === -1)
    throw new Error("Parser rule not found: " + n);
  this.__rules__[r].fn = e, this.__rules__[r].alt = o.alt || [], this.__cache__ = null;
};
ct.prototype.before = function(n, e, t, r) {
  var o = this.__find__(n), s = r || {};
  if (o === -1)
    throw new Error("Parser rule not found: " + n);
  this.__rules__.splice(o, 0, {
    name: e,
    enabled: !0,
    fn: t,
    alt: s.alt || []
  }), this.__cache__ = null;
};
ct.prototype.after = function(n, e, t, r) {
  var o = this.__find__(n), s = r || {};
  if (o === -1)
    throw new Error("Parser rule not found: " + n);
  this.__rules__.splice(o + 1, 0, {
    name: e,
    enabled: !0,
    fn: t,
    alt: s.alt || []
  }), this.__cache__ = null;
};
ct.prototype.push = function(n, e, t) {
  var r = t || {};
  this.__rules__.push({
    name: n,
    enabled: !0,
    fn: e,
    alt: r.alt || []
  }), this.__cache__ = null;
};
ct.prototype.enable = function(n, e) {
  Array.isArray(n) || (n = [n]);
  var t = [];
  return n.forEach(function(r) {
    var o = this.__find__(r);
    if (o < 0) {
      if (e)
        return;
      throw new Error("Rules manager: invalid rule name " + r);
    }
    this.__rules__[o].enabled = !0, t.push(r);
  }, this), this.__cache__ = null, t;
};
ct.prototype.enableOnly = function(n, e) {
  Array.isArray(n) || (n = [n]), this.__rules__.forEach(function(t) {
    t.enabled = !1;
  }), this.enable(n, e);
};
ct.prototype.disable = function(n, e) {
  Array.isArray(n) || (n = [n]);
  var t = [];
  return n.forEach(function(r) {
    var o = this.__find__(r);
    if (o < 0) {
      if (e)
        return;
      throw new Error("Rules manager: invalid rule name " + r);
    }
    this.__rules__[o].enabled = !1, t.push(r);
  }, this), this.__cache__ = null, t;
};
ct.prototype.getRules = function(n) {
  return this.__cache__ === null && this.__compile__(), this.__cache__[n] || [];
};
var lc = ct, lee = /\r\n?|\n/g, cee = /\0/g, uee = function(e) {
  var t;
  t = e.src.replace(lee, `
`), t = t.replace(cee, "�"), e.src = t;
}, dee = function(e) {
  var t;
  e.inlineMode ? (t = new e.Token("inline", "", 0), t.content = e.src, t.map = [0, 1], t.children = [], e.tokens.push(t)) : e.md.block.parse(e.src, e.md, e.env, e.tokens);
}, fee = function(e) {
  var t = e.tokens, r, o, s;
  for (o = 0, s = t.length; o < s; o++)
    r = t[o], r.type === "inline" && e.md.inline.parse(r.content, e.md, e.env, r.children);
}, pee = Y.arrayReplaceAt;
function hee(n) {
  return /^<a[>\s]/i.test(n);
}
function mee(n) {
  return /^<\/a\s*>/i.test(n);
}
var gee = function(e) {
  var t, r, o, s, i, a, l, c, u, d, f, p, h, m, g, v, b = e.tokens, x;
  if (e.md.options.linkify) {
    for (r = 0, o = b.length; r < o; r++)
      if (!(b[r].type !== "inline" || !e.md.linkify.pretest(b[r].content)))
        for (s = b[r].children, h = 0, t = s.length - 1; t >= 0; t--) {
          if (a = s[t], a.type === "link_close") {
            for (t--; s[t].level !== a.level && s[t].type !== "link_open"; )
              t--;
            continue;
          }
          if (a.type === "html_inline" && (hee(a.content) && h > 0 && h--, mee(a.content) && h++), !(h > 0) && a.type === "text" && e.md.linkify.test(a.content)) {
            for (u = a.content, x = e.md.linkify.match(u), l = [], p = a.level, f = 0, x.length > 0 && x[0].index === 0 && t > 0 && s[t - 1].type === "text_special" && (x = x.slice(1)), c = 0; c < x.length; c++)
              m = x[c].url, g = e.md.normalizeLink(m), e.md.validateLink(g) && (v = x[c].text, x[c].schema ? x[c].schema === "mailto:" && !/^mailto:/i.test(v) ? v = e.md.normalizeLinkText("mailto:" + v).replace(/^mailto:/, "") : v = e.md.normalizeLinkText(v) : v = e.md.normalizeLinkText("http://" + v).replace(/^http:\/\//, ""), d = x[c].index, d > f && (i = new e.Token("text", "", 0), i.content = u.slice(f, d), i.level = p, l.push(i)), i = new e.Token("link_open", "a", 1), i.attrs = [["href", g]], i.level = p++, i.markup = "linkify", i.info = "auto", l.push(i), i = new e.Token("text", "", 0), i.content = v, i.level = p, l.push(i), i = new e.Token("link_close", "a", -1), i.level = --p, i.markup = "linkify", i.info = "auto", l.push(i), f = x[c].lastIndex);
            f < u.length && (i = new e.Token("text", "", 0), i.content = u.slice(f), i.level = p, l.push(i)), b[r].children = s = pee(s, t, l);
          }
        }
  }
}, Dh = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/, yee = /\((c|tm|r)\)/i, vee = /\((c|tm|r)\)/ig, bee = {
  c: "©",
  r: "®",
  tm: "™"
};
function kee(n, e) {
  return bee[e.toLowerCase()];
}
function xee(n) {
  var e, t, r = 0;
  for (e = n.length - 1; e >= 0; e--)
    t = n[e], t.type === "text" && !r && (t.content = t.content.replace(vee, kee)), t.type === "link_open" && t.info === "auto" && r--, t.type === "link_close" && t.info === "auto" && r++;
}
function wee(n) {
  var e, t, r = 0;
  for (e = n.length - 1; e >= 0; e--)
    t = n[e], t.type === "text" && !r && Dh.test(t.content) && (t.content = t.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/mg, "$1—").replace(/(^|\s)--(?=\s|$)/mg, "$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg, "$1–")), t.type === "link_open" && t.info === "auto" && r--, t.type === "link_close" && t.info === "auto" && r++;
}
var See = function(e) {
  var t;
  if (e.md.options.typographer)
    for (t = e.tokens.length - 1; t >= 0; t--)
      e.tokens[t].type === "inline" && (yee.test(e.tokens[t].content) && xee(e.tokens[t].children), Dh.test(e.tokens[t].content) && wee(e.tokens[t].children));
}, _d = Y.isWhiteSpace, Nd = Y.isPunctChar, Ld = Y.isMdAsciiPunct, Cee = /['"]/, Rd = /['"]/g, Id = "’";
function is(n, e, t) {
  return n.slice(0, e) + t + n.slice(e + 1);
}
function Eee(n, e) {
  var t, r, o, s, i, a, l, c, u, d, f, p, h, m, g, v, b, x, y, w, k;
  for (y = [], t = 0; t < n.length; t++) {
    for (r = n[t], l = n[t].level, b = y.length - 1; b >= 0 && !(y[b].level <= l); b--)
      ;
    if (y.length = b + 1, r.type === "text") {
      o = r.content, i = 0, a = o.length;
      e:
        for (; i < a && (Rd.lastIndex = i, s = Rd.exec(o), !!s); ) {
          if (g = v = !0, i = s.index + 1, x = s[0] === "'", u = 32, s.index - 1 >= 0)
            u = o.charCodeAt(s.index - 1);
          else
            for (b = t - 1; b >= 0 && !(n[b].type === "softbreak" || n[b].type === "hardbreak"); b--)
              if (n[b].content) {
                u = n[b].content.charCodeAt(n[b].content.length - 1);
                break;
              }
          if (d = 32, i < a)
            d = o.charCodeAt(i);
          else
            for (b = t + 1; b < n.length && !(n[b].type === "softbreak" || n[b].type === "hardbreak"); b++)
              if (n[b].content) {
                d = n[b].content.charCodeAt(0);
                break;
              }
          if (f = Ld(u) || Nd(String.fromCharCode(u)), p = Ld(d) || Nd(String.fromCharCode(d)), h = _d(u), m = _d(d), m ? g = !1 : p && (h || f || (g = !1)), h ? v = !1 : f && (m || p || (v = !1)), d === 34 && s[0] === '"' && u >= 48 && u <= 57 && (v = g = !1), g && v && (g = f, v = p), !g && !v) {
            x && (r.content = is(r.content, s.index, Id));
            continue;
          }
          if (v) {
            for (b = y.length - 1; b >= 0 && (c = y[b], !(y[b].level < l)); b--)
              if (c.single === x && y[b].level === l) {
                c = y[b], x ? (w = e.md.options.quotes[2], k = e.md.options.quotes[3]) : (w = e.md.options.quotes[0], k = e.md.options.quotes[1]), r.content = is(r.content, s.index, k), n[c.token].content = is(
                  n[c.token].content,
                  c.pos,
                  w
                ), i += k.length - 1, c.token === t && (i += w.length - 1), o = r.content, a = o.length, y.length = b;
                continue e;
              }
          }
          g ? y.push({
            token: t,
            pos: s.index,
            single: x,
            level: l
          }) : v && x && (r.content = is(r.content, s.index, Id));
        }
    }
  }
}
var Aee = function(e) {
  var t;
  if (e.md.options.typographer)
    for (t = e.tokens.length - 1; t >= 0; t--)
      e.tokens[t].type !== "inline" || !Cee.test(e.tokens[t].content) || Eee(e.tokens[t].children, e);
}, Tee = function(e) {
  var t, r, o, s, i, a, l = e.tokens;
  for (t = 0, r = l.length; t < r; t++)
    if (l[t].type === "inline") {
      for (o = l[t].children, i = o.length, s = 0; s < i; s++)
        o[s].type === "text_special" && (o[s].type = "text");
      for (s = a = 0; s < i; s++)
        o[s].type === "text" && s + 1 < i && o[s + 1].type === "text" ? o[s + 1].content = o[s].content + o[s + 1].content : (s !== a && (o[a] = o[s]), a++);
      s !== a && (o.length = a);
    }
};
function qr(n, e, t) {
  this.type = n, this.tag = e, this.attrs = null, this.map = null, this.nesting = t, this.level = 0, this.children = null, this.content = "", this.markup = "", this.info = "", this.meta = null, this.block = !1, this.hidden = !1;
}
qr.prototype.attrIndex = function(e) {
  var t, r, o;
  if (!this.attrs)
    return -1;
  for (t = this.attrs, r = 0, o = t.length; r < o; r++)
    if (t[r][0] === e)
      return r;
  return -1;
};
qr.prototype.attrPush = function(e) {
  this.attrs ? this.attrs.push(e) : this.attrs = [e];
};
qr.prototype.attrSet = function(e, t) {
  var r = this.attrIndex(e), o = [e, t];
  r < 0 ? this.attrPush(o) : this.attrs[r] = o;
};
qr.prototype.attrGet = function(e) {
  var t = this.attrIndex(e), r = null;
  return t >= 0 && (r = this.attrs[t][1]), r;
};
qr.prototype.attrJoin = function(e, t) {
  var r = this.attrIndex(e);
  r < 0 ? this.attrPush([e, t]) : this.attrs[r][1] = this.attrs[r][1] + " " + t;
};
var cc = qr, Mee = cc;
function _h(n, e, t) {
  this.src = n, this.env = t, this.tokens = [], this.inlineMode = !1, this.md = e;
}
_h.prototype.Token = Mee;
var Oee = _h, Dee = lc, ga = [
  ["normalize", uee],
  ["block", dee],
  ["inline", fee],
  ["linkify", gee],
  ["replacements", See],
  ["smartquotes", Aee],
  // `text_join` finds `text_special` tokens (for escape sequences)
  // and joins them with the rest of the text
  ["text_join", Tee]
];
function uc() {
  this.ruler = new Dee();
  for (var n = 0; n < ga.length; n++)
    this.ruler.push(ga[n][0], ga[n][1]);
}
uc.prototype.process = function(n) {
  var e, t, r;
  for (r = this.ruler.getRules(""), e = 0, t = r.length; e < t; e++)
    r[e](n);
};
uc.prototype.State = Oee;
var _ee = uc, ya = Y.isSpace;
function va(n, e) {
  var t = n.bMarks[e] + n.tShift[e], r = n.eMarks[e];
  return n.src.slice(t, r);
}
function Pd(n) {
  var e = [], t = 0, r = n.length, o, s = !1, i = 0, a = "";
  for (o = n.charCodeAt(t); t < r; )
    o === 124 && (s ? (a += n.substring(i, t - 1), i = t) : (e.push(a + n.substring(i, t)), a = "", i = t + 1)), s = o === 92, t++, o = n.charCodeAt(t);
  return e.push(a + n.substring(i)), e;
}
var Nee = function(e, t, r, o) {
  var s, i, a, l, c, u, d, f, p, h, m, g, v, b, x, y, w, k;
  if (t + 2 > r || (u = t + 1, e.sCount[u] < e.blkIndent) || e.sCount[u] - e.blkIndent >= 4 || (a = e.bMarks[u] + e.tShift[u], a >= e.eMarks[u]) || (w = e.src.charCodeAt(a++), w !== 124 && w !== 45 && w !== 58) || a >= e.eMarks[u] || (k = e.src.charCodeAt(a++), k !== 124 && k !== 45 && k !== 58 && !ya(k)) || w === 45 && ya(k))
    return !1;
  for (; a < e.eMarks[u]; ) {
    if (s = e.src.charCodeAt(a), s !== 124 && s !== 45 && s !== 58 && !ya(s))
      return !1;
    a++;
  }
  for (i = va(e, t + 1), d = i.split("|"), h = [], l = 0; l < d.length; l++) {
    if (m = d[l].trim(), !m) {
      if (l === 0 || l === d.length - 1)
        continue;
      return !1;
    }
    if (!/^:?-+:?$/.test(m))
      return !1;
    m.charCodeAt(m.length - 1) === 58 ? h.push(m.charCodeAt(0) === 58 ? "center" : "right") : m.charCodeAt(0) === 58 ? h.push("left") : h.push("");
  }
  if (i = va(e, t).trim(), i.indexOf("|") === -1 || e.sCount[t] - e.blkIndent >= 4 || (d = Pd(i), d.length && d[0] === "" && d.shift(), d.length && d[d.length - 1] === "" && d.pop(), f = d.length, f === 0 || f !== h.length))
    return !1;
  if (o)
    return !0;
  for (b = e.parentType, e.parentType = "table", y = e.md.block.ruler.getRules("blockquote"), p = e.push("table_open", "table", 1), p.map = g = [t, 0], p = e.push("thead_open", "thead", 1), p.map = [t, t + 1], p = e.push("tr_open", "tr", 1), p.map = [t, t + 1], l = 0; l < d.length; l++)
    p = e.push("th_open", "th", 1), h[l] && (p.attrs = [["style", "text-align:" + h[l]]]), p = e.push("inline", "", 0), p.content = d[l].trim(), p.children = [], p = e.push("th_close", "th", -1);
  for (p = e.push("tr_close", "tr", -1), p = e.push("thead_close", "thead", -1), u = t + 2; u < r && !(e.sCount[u] < e.blkIndent); u++) {
    for (x = !1, l = 0, c = y.length; l < c; l++)
      if (y[l](e, u, r, !0)) {
        x = !0;
        break;
      }
    if (x || (i = va(e, u).trim(), !i) || e.sCount[u] - e.blkIndent >= 4)
      break;
    for (d = Pd(i), d.length && d[0] === "" && d.shift(), d.length && d[d.length - 1] === "" && d.pop(), u === t + 2 && (p = e.push("tbody_open", "tbody", 1), p.map = v = [t + 2, 0]), p = e.push("tr_open", "tr", 1), p.map = [u, u + 1], l = 0; l < f; l++)
      p = e.push("td_open", "td", 1), h[l] && (p.attrs = [["style", "text-align:" + h[l]]]), p = e.push("inline", "", 0), p.content = d[l] ? d[l].trim() : "", p.children = [], p = e.push("td_close", "td", -1);
    p = e.push("tr_close", "tr", -1);
  }
  return v && (p = e.push("tbody_close", "tbody", -1), v[1] = u), p = e.push("table_close", "table", -1), g[1] = u, e.parentType = b, e.line = u, !0;
}, Lee = function(e, t, r) {
  var o, s, i;
  if (e.sCount[t] - e.blkIndent < 4)
    return !1;
  for (s = o = t + 1; o < r; ) {
    if (e.isEmpty(o)) {
      o++;
      continue;
    }
    if (e.sCount[o] - e.blkIndent >= 4) {
      o++, s = o;
      continue;
    }
    break;
  }
  return e.line = s, i = e.push("code_block", "code", 0), i.content = e.getLines(t, s, 4 + e.blkIndent, !1) + `
`, i.map = [t, e.line], !0;
}, Ree = function(e, t, r, o) {
  var s, i, a, l, c, u, d, f = !1, p = e.bMarks[t] + e.tShift[t], h = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4 || p + 3 > h || (s = e.src.charCodeAt(p), s !== 126 && s !== 96) || (c = p, p = e.skipChars(p, s), i = p - c, i < 3) || (d = e.src.slice(c, p), a = e.src.slice(p, h), s === 96 && a.indexOf(String.fromCharCode(s)) >= 0))
    return !1;
  if (o)
    return !0;
  for (l = t; l++, !(l >= r || (p = c = e.bMarks[l] + e.tShift[l], h = e.eMarks[l], p < h && e.sCount[l] < e.blkIndent)); )
    if (e.src.charCodeAt(p) === s && !(e.sCount[l] - e.blkIndent >= 4) && (p = e.skipChars(p, s), !(p - c < i) && (p = e.skipSpaces(p), !(p < h)))) {
      f = !0;
      break;
    }
  return i = e.sCount[t], e.line = l + (f ? 1 : 0), u = e.push("fence", "code", 0), u.info = a, u.content = e.getLines(t + 1, l, i, !0), u.markup = d, u.map = [t, e.line], !0;
}, Bd = Y.isSpace, Iee = function(e, t, r, o) {
  var s, i, a, l, c, u, d, f, p, h, m, g, v, b, x, y, w, k, S, E, T = e.lineMax, D = e.bMarks[t] + e.tShift[t], _ = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4 || e.src.charCodeAt(D++) !== 62)
    return !1;
  if (o)
    return !0;
  for (l = p = e.sCount[t] + 1, e.src.charCodeAt(D) === 32 ? (D++, l++, p++, s = !1, y = !0) : e.src.charCodeAt(D) === 9 ? (y = !0, (e.bsCount[t] + p) % 4 === 3 ? (D++, l++, p++, s = !1) : s = !0) : y = !1, h = [e.bMarks[t]], e.bMarks[t] = D; D < _ && (i = e.src.charCodeAt(D), Bd(i)); ) {
    i === 9 ? p += 4 - (p + e.bsCount[t] + (s ? 1 : 0)) % 4 : p++;
    D++;
  }
  for (m = [e.bsCount[t]], e.bsCount[t] = e.sCount[t] + 1 + (y ? 1 : 0), u = D >= _, b = [e.sCount[t]], e.sCount[t] = p - l, x = [e.tShift[t]], e.tShift[t] = D - e.bMarks[t], k = e.md.block.ruler.getRules("blockquote"), v = e.parentType, e.parentType = "blockquote", f = t + 1; f < r && (E = e.sCount[f] < e.blkIndent, D = e.bMarks[f] + e.tShift[f], _ = e.eMarks[f], !(D >= _)); f++) {
    if (e.src.charCodeAt(D++) === 62 && !E) {
      for (l = p = e.sCount[f] + 1, e.src.charCodeAt(D) === 32 ? (D++, l++, p++, s = !1, y = !0) : e.src.charCodeAt(D) === 9 ? (y = !0, (e.bsCount[f] + p) % 4 === 3 ? (D++, l++, p++, s = !1) : s = !0) : y = !1, h.push(e.bMarks[f]), e.bMarks[f] = D; D < _ && (i = e.src.charCodeAt(D), Bd(i)); ) {
        i === 9 ? p += 4 - (p + e.bsCount[f] + (s ? 1 : 0)) % 4 : p++;
        D++;
      }
      u = D >= _, m.push(e.bsCount[f]), e.bsCount[f] = e.sCount[f] + 1 + (y ? 1 : 0), b.push(e.sCount[f]), e.sCount[f] = p - l, x.push(e.tShift[f]), e.tShift[f] = D - e.bMarks[f];
      continue;
    }
    if (u)
      break;
    for (w = !1, a = 0, c = k.length; a < c; a++)
      if (k[a](e, f, r, !0)) {
        w = !0;
        break;
      }
    if (w) {
      e.lineMax = f, e.blkIndent !== 0 && (h.push(e.bMarks[f]), m.push(e.bsCount[f]), x.push(e.tShift[f]), b.push(e.sCount[f]), e.sCount[f] -= e.blkIndent);
      break;
    }
    h.push(e.bMarks[f]), m.push(e.bsCount[f]), x.push(e.tShift[f]), b.push(e.sCount[f]), e.sCount[f] = -1;
  }
  for (g = e.blkIndent, e.blkIndent = 0, S = e.push("blockquote_open", "blockquote", 1), S.markup = ">", S.map = d = [t, 0], e.md.block.tokenize(e, t, f), S = e.push("blockquote_close", "blockquote", -1), S.markup = ">", e.lineMax = T, e.parentType = v, d[1] = e.line, a = 0; a < x.length; a++)
    e.bMarks[a + t] = h[a], e.tShift[a + t] = x[a], e.sCount[a + t] = b[a], e.bsCount[a + t] = m[a];
  return e.blkIndent = g, !0;
}, Pee = Y.isSpace, Bee = function(e, t, r, o) {
  var s, i, a, l, c = e.bMarks[t] + e.tShift[t], u = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4 || (s = e.src.charCodeAt(c++), s !== 42 && s !== 45 && s !== 95))
    return !1;
  for (i = 1; c < u; ) {
    if (a = e.src.charCodeAt(c++), a !== s && !Pee(a))
      return !1;
    a === s && i++;
  }
  return i < 3 ? !1 : (o || (e.line = t + 1, l = e.push("hr", "hr", 0), l.map = [t, e.line], l.markup = Array(i + 1).join(String.fromCharCode(s))), !0);
}, Nh = Y.isSpace;
function Fd(n, e) {
  var t, r, o, s;
  return r = n.bMarks[e] + n.tShift[e], o = n.eMarks[e], t = n.src.charCodeAt(r++), t !== 42 && t !== 45 && t !== 43 || r < o && (s = n.src.charCodeAt(r), !Nh(s)) ? -1 : r;
}
function qd(n, e) {
  var t, r = n.bMarks[e] + n.tShift[e], o = r, s = n.eMarks[e];
  if (o + 1 >= s || (t = n.src.charCodeAt(o++), t < 48 || t > 57))
    return -1;
  for (; ; ) {
    if (o >= s)
      return -1;
    if (t = n.src.charCodeAt(o++), t >= 48 && t <= 57) {
      if (o - r >= 10)
        return -1;
      continue;
    }
    if (t === 41 || t === 46)
      break;
    return -1;
  }
  return o < s && (t = n.src.charCodeAt(o), !Nh(t)) ? -1 : o;
}
function Fee(n, e) {
  var t, r, o = n.level + 2;
  for (t = e + 2, r = n.tokens.length - 2; t < r; t++)
    n.tokens[t].level === o && n.tokens[t].type === "paragraph_open" && (n.tokens[t + 2].hidden = !0, n.tokens[t].hidden = !0, t += 2);
}
var qee = function(e, t, r, o) {
  var s, i, a, l, c, u, d, f, p, h, m, g, v, b, x, y, w, k, S, E, T, D, _, F, P, A, q, L, z = !1, K = !0;
  if (e.sCount[t] - e.blkIndent >= 4 || e.listIndent >= 0 && e.sCount[t] - e.listIndent >= 4 && e.sCount[t] < e.blkIndent)
    return !1;
  if (o && e.parentType === "paragraph" && e.sCount[t] >= e.blkIndent && (z = !0), (_ = qd(e, t)) >= 0) {
    if (d = !0, P = e.bMarks[t] + e.tShift[t], v = Number(e.src.slice(P, _ - 1)), z && v !== 1)
      return !1;
  } else if ((_ = Fd(e, t)) >= 0)
    d = !1;
  else
    return !1;
  if (z && e.skipSpaces(_) >= e.eMarks[t])
    return !1;
  if (g = e.src.charCodeAt(_ - 1), o)
    return !0;
  for (m = e.tokens.length, d ? (L = e.push("ordered_list_open", "ol", 1), v !== 1 && (L.attrs = [["start", v]])) : L = e.push("bullet_list_open", "ul", 1), L.map = h = [t, 0], L.markup = String.fromCharCode(g), x = t, F = !1, q = e.md.block.ruler.getRules("list"), k = e.parentType, e.parentType = "list"; x < r; ) {
    for (D = _, b = e.eMarks[x], u = y = e.sCount[x] + _ - (e.bMarks[t] + e.tShift[t]); D < b; ) {
      if (s = e.src.charCodeAt(D), s === 9)
        y += 4 - (y + e.bsCount[x]) % 4;
      else if (s === 32)
        y++;
      else
        break;
      D++;
    }
    if (i = D, i >= b ? c = 1 : c = y - u, c > 4 && (c = 1), l = u + c, L = e.push("list_item_open", "li", 1), L.markup = String.fromCharCode(g), L.map = f = [t, 0], d && (L.info = e.src.slice(P, _ - 1)), T = e.tight, E = e.tShift[t], S = e.sCount[t], w = e.listIndent, e.listIndent = e.blkIndent, e.blkIndent = l, e.tight = !0, e.tShift[t] = i - e.bMarks[t], e.sCount[t] = y, i >= b && e.isEmpty(t + 1) ? e.line = Math.min(e.line + 2, r) : e.md.block.tokenize(e, t, r, !0), (!e.tight || F) && (K = !1), F = e.line - t > 1 && e.isEmpty(e.line - 1), e.blkIndent = e.listIndent, e.listIndent = w, e.tShift[t] = E, e.sCount[t] = S, e.tight = T, L = e.push("list_item_close", "li", -1), L.markup = String.fromCharCode(g), x = t = e.line, f[1] = x, i = e.bMarks[t], x >= r || e.sCount[x] < e.blkIndent || e.sCount[t] - e.blkIndent >= 4)
      break;
    for (A = !1, a = 0, p = q.length; a < p; a++)
      if (q[a](e, x, r, !0)) {
        A = !0;
        break;
      }
    if (A)
      break;
    if (d) {
      if (_ = qd(e, x), _ < 0)
        break;
      P = e.bMarks[x] + e.tShift[x];
    } else if (_ = Fd(e, x), _ < 0)
      break;
    if (g !== e.src.charCodeAt(_ - 1))
      break;
  }
  return d ? L = e.push("ordered_list_close", "ol", -1) : L = e.push("bullet_list_close", "ul", -1), L.markup = String.fromCharCode(g), h[1] = x, e.line = x, e.parentType = k, K && Fee(e, m), !0;
}, zee = Y.normalizeReference, as = Y.isSpace, $ee = function(e, t, r, o) {
  var s, i, a, l, c, u, d, f, p, h, m, g, v, b, x, y, w = 0, k = e.bMarks[t] + e.tShift[t], S = e.eMarks[t], E = t + 1;
  if (e.sCount[t] - e.blkIndent >= 4 || e.src.charCodeAt(k) !== 91)
    return !1;
  for (; ++k < S; )
    if (e.src.charCodeAt(k) === 93 && e.src.charCodeAt(k - 1) !== 92) {
      if (k + 1 === S || e.src.charCodeAt(k + 1) !== 58)
        return !1;
      break;
    }
  for (l = e.lineMax, x = e.md.block.ruler.getRules("reference"), h = e.parentType, e.parentType = "reference"; E < l && !e.isEmpty(E); E++)
    if (!(e.sCount[E] - e.blkIndent > 3) && !(e.sCount[E] < 0)) {
      for (b = !1, u = 0, d = x.length; u < d; u++)
        if (x[u](e, E, l, !0)) {
          b = !0;
          break;
        }
      if (b)
        break;
    }
  for (v = e.getLines(t, E, e.blkIndent, !1).trim(), S = v.length, k = 1; k < S; k++) {
    if (s = v.charCodeAt(k), s === 91)
      return !1;
    if (s === 93) {
      p = k;
      break;
    } else
      s === 10 ? w++ : s === 92 && (k++, k < S && v.charCodeAt(k) === 10 && w++);
  }
  if (p < 0 || v.charCodeAt(p + 1) !== 58)
    return !1;
  for (k = p + 2; k < S; k++)
    if (s = v.charCodeAt(k), s === 10)
      w++;
    else if (!as(s))
      break;
  if (m = e.md.helpers.parseLinkDestination(v, k, S), !m.ok || (c = e.md.normalizeLink(m.str), !e.md.validateLink(c)))
    return !1;
  for (k = m.pos, w += m.lines, i = k, a = w, g = k; k < S; k++)
    if (s = v.charCodeAt(k), s === 10)
      w++;
    else if (!as(s))
      break;
  for (m = e.md.helpers.parseLinkTitle(v, k, S), k < S && g !== k && m.ok ? (y = m.str, k = m.pos, w += m.lines) : (y = "", k = i, w = a); k < S && (s = v.charCodeAt(k), !!as(s)); )
    k++;
  if (k < S && v.charCodeAt(k) !== 10 && y)
    for (y = "", k = i, w = a; k < S && (s = v.charCodeAt(k), !!as(s)); )
      k++;
  return k < S && v.charCodeAt(k) !== 10 || (f = zee(v.slice(1, p)), !f) ? !1 : (o || (typeof e.env.references > "u" && (e.env.references = {}), typeof e.env.references[f] > "u" && (e.env.references[f] = { title: y, href: c }), e.parentType = h, e.line = t + w + 1), !0);
}, Hee = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "section",
  "source",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], ki = {}, Vee = "[a-zA-Z_:][a-zA-Z0-9:._-]*", jee = "[^\"'=<>`\\x00-\\x20]+", Uee = "'[^']*'", Wee = '"[^"]*"', Kee = "(?:" + jee + "|" + Uee + "|" + Wee + ")", Gee = "(?:\\s+" + Vee + "(?:\\s*=\\s*" + Kee + ")?)", Lh = "<[A-Za-z][A-Za-z0-9\\-]*" + Gee + "*\\s*\\/?>", Rh = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>", Jee = "<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->", Zee = "<[?][\\s\\S]*?[?]>", Yee = "<![A-Z]+\\s+[^>]*>", Qee = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>", Xee = new RegExp("^(?:" + Lh + "|" + Rh + "|" + Jee + "|" + Zee + "|" + Yee + "|" + Qee + ")"), ete = new RegExp("^(?:" + Lh + "|" + Rh + ")");
ki.HTML_TAG_RE = Xee;
ki.HTML_OPEN_CLOSE_TAG_RE = ete;
var tte = Hee, nte = ki.HTML_OPEN_CLOSE_TAG_RE, rr = [
  [/^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, !0],
  [/^<!--/, /-->/, !0],
  [/^<\?/, /\?>/, !0],
  [/^<![A-Z]/, />/, !0],
  [/^<!\[CDATA\[/, /\]\]>/, !0],
  [new RegExp("^</?(" + tte.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, !0],
  [new RegExp(nte.source + "\\s*$"), /^$/, !1]
], rte = function(e, t, r, o) {
  var s, i, a, l, c = e.bMarks[t] + e.tShift[t], u = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4 || !e.md.options.html || e.src.charCodeAt(c) !== 60)
    return !1;
  for (l = e.src.slice(c, u), s = 0; s < rr.length && !rr[s][0].test(l); s++)
    ;
  if (s === rr.length)
    return !1;
  if (o)
    return rr[s][2];
  if (i = t + 1, !rr[s][1].test(l)) {
    for (; i < r && !(e.sCount[i] < e.blkIndent); i++)
      if (c = e.bMarks[i] + e.tShift[i], u = e.eMarks[i], l = e.src.slice(c, u), rr[s][1].test(l)) {
        l.length !== 0 && i++;
        break;
      }
  }
  return e.line = i, a = e.push("html_block", "", 0), a.map = [t, i], a.content = e.getLines(t, i, e.blkIndent, !0), !0;
}, zd = Y.isSpace, ote = function(e, t, r, o) {
  var s, i, a, l, c = e.bMarks[t] + e.tShift[t], u = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4 || (s = e.src.charCodeAt(c), s !== 35 || c >= u))
    return !1;
  for (i = 1, s = e.src.charCodeAt(++c); s === 35 && c < u && i <= 6; )
    i++, s = e.src.charCodeAt(++c);
  return i > 6 || c < u && !zd(s) ? !1 : (o || (u = e.skipSpacesBack(u, c), a = e.skipCharsBack(u, 35, c), a > c && zd(e.src.charCodeAt(a - 1)) && (u = a), e.line = t + 1, l = e.push("heading_open", "h" + String(i), 1), l.markup = "########".slice(0, i), l.map = [t, e.line], l = e.push("inline", "", 0), l.content = e.src.slice(c, u).trim(), l.map = [t, e.line], l.children = [], l = e.push("heading_close", "h" + String(i), -1), l.markup = "########".slice(0, i)), !0);
}, ste = function(e, t, r) {
  var o, s, i, a, l, c, u, d, f, p = t + 1, h, m = e.md.block.ruler.getRules("paragraph");
  if (e.sCount[t] - e.blkIndent >= 4)
    return !1;
  for (h = e.parentType, e.parentType = "paragraph"; p < r && !e.isEmpty(p); p++)
    if (!(e.sCount[p] - e.blkIndent > 3)) {
      if (e.sCount[p] >= e.blkIndent && (c = e.bMarks[p] + e.tShift[p], u = e.eMarks[p], c < u && (f = e.src.charCodeAt(c), (f === 45 || f === 61) && (c = e.skipChars(c, f), c = e.skipSpaces(c), c >= u)))) {
        d = f === 61 ? 1 : 2;
        break;
      }
      if (!(e.sCount[p] < 0)) {
        for (s = !1, i = 0, a = m.length; i < a; i++)
          if (m[i](e, p, r, !0)) {
            s = !0;
            break;
          }
        if (s)
          break;
      }
    }
  return d ? (o = e.getLines(t, p, e.blkIndent, !1).trim(), e.line = p + 1, l = e.push("heading_open", "h" + String(d), 1), l.markup = String.fromCharCode(f), l.map = [t, e.line], l = e.push("inline", "", 0), l.content = o, l.map = [t, e.line - 1], l.children = [], l = e.push("heading_close", "h" + String(d), -1), l.markup = String.fromCharCode(f), e.parentType = h, !0) : !1;
}, ite = function(e, t) {
  var r, o, s, i, a, l, c = t + 1, u = e.md.block.ruler.getRules("paragraph"), d = e.lineMax;
  for (l = e.parentType, e.parentType = "paragraph"; c < d && !e.isEmpty(c); c++)
    if (!(e.sCount[c] - e.blkIndent > 3) && !(e.sCount[c] < 0)) {
      for (o = !1, s = 0, i = u.length; s < i; s++)
        if (u[s](e, c, d, !0)) {
          o = !0;
          break;
        }
      if (o)
        break;
    }
  return r = e.getLines(t, c, e.blkIndent, !1).trim(), e.line = c, a = e.push("paragraph_open", "p", 1), a.map = [t, e.line], a = e.push("inline", "", 0), a.content = r, a.map = [t, e.line], a.children = [], a = e.push("paragraph_close", "p", -1), e.parentType = l, !0;
}, Ih = cc, xi = Y.isSpace;
function Tt(n, e, t, r) {
  var o, s, i, a, l, c, u, d;
  for (this.src = n, this.md = e, this.env = t, this.tokens = r, this.bMarks = [], this.eMarks = [], this.tShift = [], this.sCount = [], this.bsCount = [], this.blkIndent = 0, this.line = 0, this.lineMax = 0, this.tight = !1, this.ddIndent = -1, this.listIndent = -1, this.parentType = "root", this.level = 0, this.result = "", s = this.src, d = !1, i = a = c = u = 0, l = s.length; a < l; a++) {
    if (o = s.charCodeAt(a), !d)
      if (xi(o)) {
        c++, o === 9 ? u += 4 - u % 4 : u++;
        continue;
      } else
        d = !0;
    (o === 10 || a === l - 1) && (o !== 10 && a++, this.bMarks.push(i), this.eMarks.push(a), this.tShift.push(c), this.sCount.push(u), this.bsCount.push(0), d = !1, c = 0, u = 0, i = a + 1);
  }
  this.bMarks.push(s.length), this.eMarks.push(s.length), this.tShift.push(0), this.sCount.push(0), this.bsCount.push(0), this.lineMax = this.bMarks.length - 1;
}
Tt.prototype.push = function(n, e, t) {
  var r = new Ih(n, e, t);
  return r.block = !0, t < 0 && this.level--, r.level = this.level, t > 0 && this.level++, this.tokens.push(r), r;
};
Tt.prototype.isEmpty = function(e) {
  return this.bMarks[e] + this.tShift[e] >= this.eMarks[e];
};
Tt.prototype.skipEmptyLines = function(e) {
  for (var t = this.lineMax; e < t && !(this.bMarks[e] + this.tShift[e] < this.eMarks[e]); e++)
    ;
  return e;
};
Tt.prototype.skipSpaces = function(e) {
  for (var t, r = this.src.length; e < r && (t = this.src.charCodeAt(e), !!xi(t)); e++)
    ;
  return e;
};
Tt.prototype.skipSpacesBack = function(e, t) {
  if (e <= t)
    return e;
  for (; e > t; )
    if (!xi(this.src.charCodeAt(--e)))
      return e + 1;
  return e;
};
Tt.prototype.skipChars = function(e, t) {
  for (var r = this.src.length; e < r && this.src.charCodeAt(e) === t; e++)
    ;
  return e;
};
Tt.prototype.skipCharsBack = function(e, t, r) {
  if (e <= r)
    return e;
  for (; e > r; )
    if (t !== this.src.charCodeAt(--e))
      return e + 1;
  return e;
};
Tt.prototype.getLines = function(e, t, r, o) {
  var s, i, a, l, c, u, d, f = e;
  if (e >= t)
    return "";
  for (u = new Array(t - e), s = 0; f < t; f++, s++) {
    for (i = 0, d = l = this.bMarks[f], f + 1 < t || o ? c = this.eMarks[f] + 1 : c = this.eMarks[f]; l < c && i < r; ) {
      if (a = this.src.charCodeAt(l), xi(a))
        a === 9 ? i += 4 - (i + this.bsCount[f]) % 4 : i++;
      else if (l - d < this.tShift[f])
        i++;
      else
        break;
      l++;
    }
    i > r ? u[s] = new Array(i - r + 1).join(" ") + this.src.slice(l, c) : u[s] = this.src.slice(l, c);
  }
  return u.join("");
};
Tt.prototype.Token = Ih;
var ate = Tt, lte = lc, ls = [
  // First 2 params - rule name & source. Secondary array - list of rules,
  // which can be terminated by this one.
  ["table", Nee, ["paragraph", "reference"]],
  ["code", Lee],
  ["fence", Ree, ["paragraph", "reference", "blockquote", "list"]],
  ["blockquote", Iee, ["paragraph", "reference", "blockquote", "list"]],
  ["hr", Bee, ["paragraph", "reference", "blockquote", "list"]],
  ["list", qee, ["paragraph", "reference", "blockquote"]],
  ["reference", $ee],
  ["html_block", rte, ["paragraph", "reference", "blockquote"]],
  ["heading", ote, ["paragraph", "reference", "blockquote"]],
  ["lheading", ste],
  ["paragraph", ite]
];
function wi() {
  this.ruler = new lte();
  for (var n = 0; n < ls.length; n++)
    this.ruler.push(ls[n][0], ls[n][1], { alt: (ls[n][2] || []).slice() });
}
wi.prototype.tokenize = function(n, e, t) {
  for (var r, o, s = this.ruler.getRules(""), i = s.length, a = e, l = !1, c = n.md.options.maxNesting; a < t && (n.line = a = n.skipEmptyLines(a), !(a >= t || n.sCount[a] < n.blkIndent)); ) {
    if (n.level >= c) {
      n.line = t;
      break;
    }
    for (o = 0; o < i && (r = s[o](n, a, t, !1), !r); o++)
      ;
    n.tight = !l, n.isEmpty(n.line - 1) && (l = !0), a = n.line, a < t && n.isEmpty(a) && (l = !0, a++, n.line = a);
  }
};
wi.prototype.parse = function(n, e, t, r) {
  var o;
  n && (o = new this.State(n, e, t, r), this.tokenize(o, o.line, o.lineMax));
};
wi.prototype.State = ate;
var cte = wi;
function ute(n) {
  switch (n) {
    case 10:
    case 33:
    case 35:
    case 36:
    case 37:
    case 38:
    case 42:
    case 43:
    case 45:
    case 58:
    case 60:
    case 61:
    case 62:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 125:
    case 126:
      return !0;
    default:
      return !1;
  }
}
var dte = function(e, t) {
  for (var r = e.pos; r < e.posMax && !ute(e.src.charCodeAt(r)); )
    r++;
  return r === e.pos ? !1 : (t || (e.pending += e.src.slice(e.pos, r)), e.pos = r, !0);
}, fte = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i, pte = function(e, t) {
  var r, o, s, i, a, l, c, u;
  return !e.md.options.linkify || e.linkLevel > 0 || (r = e.pos, o = e.posMax, r + 3 > o) || e.src.charCodeAt(r) !== 58 || e.src.charCodeAt(r + 1) !== 47 || e.src.charCodeAt(r + 2) !== 47 || (s = e.pending.match(fte), !s) || (i = s[1], a = e.md.linkify.matchAtStart(e.src.slice(r - i.length)), !a) || (l = a.url, l = l.replace(/\*+$/, ""), c = e.md.normalizeLink(l), !e.md.validateLink(c)) ? !1 : (t || (e.pending = e.pending.slice(0, -i.length), u = e.push("link_open", "a", 1), u.attrs = [["href", c]], u.markup = "linkify", u.info = "auto", u = e.push("text", "", 0), u.content = e.md.normalizeLinkText(l), u = e.push("link_close", "a", -1), u.markup = "linkify", u.info = "auto"), e.pos += l.length - i.length, !0);
}, hte = Y.isSpace, mte = function(e, t) {
  var r, o, s, i = e.pos;
  if (e.src.charCodeAt(i) !== 10)
    return !1;
  if (r = e.pending.length - 1, o = e.posMax, !t)
    if (r >= 0 && e.pending.charCodeAt(r) === 32)
      if (r >= 1 && e.pending.charCodeAt(r - 1) === 32) {
        for (s = r - 1; s >= 1 && e.pending.charCodeAt(s - 1) === 32; )
          s--;
        e.pending = e.pending.slice(0, s), e.push("hardbreak", "br", 0);
      } else
        e.pending = e.pending.slice(0, -1), e.push("softbreak", "br", 0);
    else
      e.push("softbreak", "br", 0);
  for (i++; i < o && hte(e.src.charCodeAt(i)); )
    i++;
  return e.pos = i, !0;
}, gte = Y.isSpace, dc = [];
for (var $d = 0; $d < 256; $d++)
  dc.push(0);
"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(n) {
  dc[n.charCodeAt(0)] = 1;
});
var yte = function(e, t) {
  var r, o, s, i, a, l = e.pos, c = e.posMax;
  if (e.src.charCodeAt(l) !== 92 || (l++, l >= c))
    return !1;
  if (r = e.src.charCodeAt(l), r === 10) {
    for (t || e.push("hardbreak", "br", 0), l++; l < c && (r = e.src.charCodeAt(l), !!gte(r)); )
      l++;
    return e.pos = l, !0;
  }
  return i = e.src[l], r >= 55296 && r <= 56319 && l + 1 < c && (o = e.src.charCodeAt(l + 1), o >= 56320 && o <= 57343 && (i += e.src[l + 1], l++)), s = "\\" + i, t || (a = e.push("text_special", "", 0), r < 256 && dc[r] !== 0 ? a.content = i : a.content = s, a.markup = s, a.info = "escape"), e.pos = l + 1, !0;
}, vte = function(e, t) {
  var r, o, s, i, a, l, c, u, d = e.pos, f = e.src.charCodeAt(d);
  if (f !== 96)
    return !1;
  for (r = d, d++, o = e.posMax; d < o && e.src.charCodeAt(d) === 96; )
    d++;
  if (s = e.src.slice(r, d), c = s.length, e.backticksScanned && (e.backticks[c] || 0) <= r)
    return t || (e.pending += s), e.pos += c, !0;
  for (a = l = d; (a = e.src.indexOf("`", l)) !== -1; ) {
    for (l = a + 1; l < o && e.src.charCodeAt(l) === 96; )
      l++;
    if (u = l - a, u === c)
      return t || (i = e.push("code_inline", "code", 0), i.markup = s, i.content = e.src.slice(d, a).replace(/\n/g, " ").replace(/^ (.+) $/, "$1")), e.pos = l, !0;
    e.backticks[u] = a;
  }
  return e.backticksScanned = !0, t || (e.pending += s), e.pos += c, !0;
}, Si = {};
Si.tokenize = function(e, t) {
  var r, o, s, i, a, l = e.pos, c = e.src.charCodeAt(l);
  if (t || c !== 126 || (o = e.scanDelims(e.pos, !0), i = o.length, a = String.fromCharCode(c), i < 2))
    return !1;
  for (i % 2 && (s = e.push("text", "", 0), s.content = a, i--), r = 0; r < i; r += 2)
    s = e.push("text", "", 0), s.content = a + a, e.delimiters.push({
      marker: c,
      length: 0,
      // disable "rule of 3" length checks meant for emphasis
      token: e.tokens.length - 1,
      end: -1,
      open: o.can_open,
      close: o.can_close
    });
  return e.pos += o.length, !0;
};
function Hd(n, e) {
  var t, r, o, s, i, a = [], l = e.length;
  for (t = 0; t < l; t++)
    o = e[t], o.marker === 126 && o.end !== -1 && (s = e[o.end], i = n.tokens[o.token], i.type = "s_open", i.tag = "s", i.nesting = 1, i.markup = "~~", i.content = "", i = n.tokens[s.token], i.type = "s_close", i.tag = "s", i.nesting = -1, i.markup = "~~", i.content = "", n.tokens[s.token - 1].type === "text" && n.tokens[s.token - 1].content === "~" && a.push(s.token - 1));
  for (; a.length; ) {
    for (t = a.pop(), r = t + 1; r < n.tokens.length && n.tokens[r].type === "s_close"; )
      r++;
    r--, t !== r && (i = n.tokens[r], n.tokens[r] = n.tokens[t], n.tokens[t] = i);
  }
}
Si.postProcess = function(e) {
  var t, r = e.tokens_meta, o = e.tokens_meta.length;
  for (Hd(e, e.delimiters), t = 0; t < o; t++)
    r[t] && r[t].delimiters && Hd(e, r[t].delimiters);
};
var Ci = {};
Ci.tokenize = function(e, t) {
  var r, o, s, i = e.pos, a = e.src.charCodeAt(i);
  if (t || a !== 95 && a !== 42)
    return !1;
  for (o = e.scanDelims(e.pos, a === 42), r = 0; r < o.length; r++)
    s = e.push("text", "", 0), s.content = String.fromCharCode(a), e.delimiters.push({
      // Char code of the starting marker (number).
      //
      marker: a,
      // Total length of these series of delimiters.
      //
      length: o.length,
      // A position of the token this delimiter corresponds to.
      //
      token: e.tokens.length - 1,
      // If this delimiter is matched as a valid opener, `end` will be
      // equal to its position, otherwise it's `-1`.
      //
      end: -1,
      // Boolean flags that determine if this delimiter could open or close
      // an emphasis.
      //
      open: o.can_open,
      close: o.can_close
    });
  return e.pos += o.length, !0;
};
function Vd(n, e) {
  var t, r, o, s, i, a, l = e.length;
  for (t = l - 1; t >= 0; t--)
    r = e[t], !(r.marker !== 95 && r.marker !== 42) && r.end !== -1 && (o = e[r.end], a = t > 0 && e[t - 1].end === r.end + 1 && // check that first two markers match and adjacent
    e[t - 1].marker === r.marker && e[t - 1].token === r.token - 1 && // check that last two markers are adjacent (we can safely assume they match)
    e[r.end + 1].token === o.token + 1, i = String.fromCharCode(r.marker), s = n.tokens[r.token], s.type = a ? "strong_open" : "em_open", s.tag = a ? "strong" : "em", s.nesting = 1, s.markup = a ? i + i : i, s.content = "", s = n.tokens[o.token], s.type = a ? "strong_close" : "em_close", s.tag = a ? "strong" : "em", s.nesting = -1, s.markup = a ? i + i : i, s.content = "", a && (n.tokens[e[t - 1].token].content = "", n.tokens[e[r.end + 1].token].content = "", t--));
}
Ci.postProcess = function(e) {
  var t, r = e.tokens_meta, o = e.tokens_meta.length;
  for (Vd(e, e.delimiters), t = 0; t < o; t++)
    r[t] && r[t].delimiters && Vd(e, r[t].delimiters);
};
var bte = Y.normalizeReference, ba = Y.isSpace, kte = function(e, t) {
  var r, o, s, i, a, l, c, u, d, f = "", p = "", h = e.pos, m = e.posMax, g = e.pos, v = !0;
  if (e.src.charCodeAt(e.pos) !== 91 || (a = e.pos + 1, i = e.md.helpers.parseLinkLabel(e, e.pos, !0), i < 0))
    return !1;
  if (l = i + 1, l < m && e.src.charCodeAt(l) === 40) {
    for (v = !1, l++; l < m && (o = e.src.charCodeAt(l), !(!ba(o) && o !== 10)); l++)
      ;
    if (l >= m)
      return !1;
    if (g = l, c = e.md.helpers.parseLinkDestination(e.src, l, e.posMax), c.ok) {
      for (f = e.md.normalizeLink(c.str), e.md.validateLink(f) ? l = c.pos : f = "", g = l; l < m && (o = e.src.charCodeAt(l), !(!ba(o) && o !== 10)); l++)
        ;
      if (c = e.md.helpers.parseLinkTitle(e.src, l, e.posMax), l < m && g !== l && c.ok)
        for (p = c.str, l = c.pos; l < m && (o = e.src.charCodeAt(l), !(!ba(o) && o !== 10)); l++)
          ;
    }
    (l >= m || e.src.charCodeAt(l) !== 41) && (v = !0), l++;
  }
  if (v) {
    if (typeof e.env.references > "u")
      return !1;
    if (l < m && e.src.charCodeAt(l) === 91 ? (g = l + 1, l = e.md.helpers.parseLinkLabel(e, l), l >= 0 ? s = e.src.slice(g, l++) : l = i + 1) : l = i + 1, s || (s = e.src.slice(a, i)), u = e.env.references[bte(s)], !u)
      return e.pos = h, !1;
    f = u.href, p = u.title;
  }
  return t || (e.pos = a, e.posMax = i, d = e.push("link_open", "a", 1), d.attrs = r = [["href", f]], p && r.push(["title", p]), e.linkLevel++, e.md.inline.tokenize(e), e.linkLevel--, d = e.push("link_close", "a", -1)), e.pos = l, e.posMax = m, !0;
}, xte = Y.normalizeReference, ka = Y.isSpace, wte = function(e, t) {
  var r, o, s, i, a, l, c, u, d, f, p, h, m, g = "", v = e.pos, b = e.posMax;
  if (e.src.charCodeAt(e.pos) !== 33 || e.src.charCodeAt(e.pos + 1) !== 91 || (l = e.pos + 2, a = e.md.helpers.parseLinkLabel(e, e.pos + 1, !1), a < 0))
    return !1;
  if (c = a + 1, c < b && e.src.charCodeAt(c) === 40) {
    for (c++; c < b && (o = e.src.charCodeAt(c), !(!ka(o) && o !== 10)); c++)
      ;
    if (c >= b)
      return !1;
    for (m = c, d = e.md.helpers.parseLinkDestination(e.src, c, e.posMax), d.ok && (g = e.md.normalizeLink(d.str), e.md.validateLink(g) ? c = d.pos : g = ""), m = c; c < b && (o = e.src.charCodeAt(c), !(!ka(o) && o !== 10)); c++)
      ;
    if (d = e.md.helpers.parseLinkTitle(e.src, c, e.posMax), c < b && m !== c && d.ok)
      for (f = d.str, c = d.pos; c < b && (o = e.src.charCodeAt(c), !(!ka(o) && o !== 10)); c++)
        ;
    else
      f = "";
    if (c >= b || e.src.charCodeAt(c) !== 41)
      return e.pos = v, !1;
    c++;
  } else {
    if (typeof e.env.references > "u")
      return !1;
    if (c < b && e.src.charCodeAt(c) === 91 ? (m = c + 1, c = e.md.helpers.parseLinkLabel(e, c), c >= 0 ? i = e.src.slice(m, c++) : c = a + 1) : c = a + 1, i || (i = e.src.slice(l, a)), u = e.env.references[xte(i)], !u)
      return e.pos = v, !1;
    g = u.href, f = u.title;
  }
  return t || (s = e.src.slice(l, a), e.md.inline.parse(
    s,
    e.md,
    e.env,
    h = []
  ), p = e.push("image", "img", 0), p.attrs = r = [["src", g], ["alt", ""]], p.children = h, p.content = s, f && r.push(["title", f])), e.pos = c, e.posMax = b, !0;
}, Ste = /^([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/, Cte = /^([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)$/, Ete = function(e, t) {
  var r, o, s, i, a, l, c = e.pos;
  if (e.src.charCodeAt(c) !== 60)
    return !1;
  for (a = e.pos, l = e.posMax; ; ) {
    if (++c >= l || (i = e.src.charCodeAt(c), i === 60))
      return !1;
    if (i === 62)
      break;
  }
  return r = e.src.slice(a + 1, c), Cte.test(r) ? (o = e.md.normalizeLink(r), e.md.validateLink(o) ? (t || (s = e.push("link_open", "a", 1), s.attrs = [["href", o]], s.markup = "autolink", s.info = "auto", s = e.push("text", "", 0), s.content = e.md.normalizeLinkText(r), s = e.push("link_close", "a", -1), s.markup = "autolink", s.info = "auto"), e.pos += r.length + 2, !0) : !1) : Ste.test(r) ? (o = e.md.normalizeLink("mailto:" + r), e.md.validateLink(o) ? (t || (s = e.push("link_open", "a", 1), s.attrs = [["href", o]], s.markup = "autolink", s.info = "auto", s = e.push("text", "", 0), s.content = e.md.normalizeLinkText(r), s = e.push("link_close", "a", -1), s.markup = "autolink", s.info = "auto"), e.pos += r.length + 2, !0) : !1) : !1;
}, Ate = ki.HTML_TAG_RE;
function Tte(n) {
  return /^<a[>\s]/i.test(n);
}
function Mte(n) {
  return /^<\/a\s*>/i.test(n);
}
function Ote(n) {
  var e = n | 32;
  return e >= 97 && e <= 122;
}
var Dte = function(e, t) {
  var r, o, s, i, a = e.pos;
  return !e.md.options.html || (s = e.posMax, e.src.charCodeAt(a) !== 60 || a + 2 >= s) || (r = e.src.charCodeAt(a + 1), r !== 33 && r !== 63 && r !== 47 && !Ote(r)) || (o = e.src.slice(a).match(Ate), !o) ? !1 : (t || (i = e.push("html_inline", "", 0), i.content = e.src.slice(a, a + o[0].length), Tte(i.content) && e.linkLevel++, Mte(i.content) && e.linkLevel--), e.pos += o[0].length, !0);
}, jd = Ah, _te = Y.has, Nte = Y.isValidEntityCode, Ud = Y.fromCodePoint, Lte = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i, Rte = /^&([a-z][a-z0-9]{1,31});/i, Ite = function(e, t) {
  var r, o, s, i, a = e.pos, l = e.posMax;
  if (e.src.charCodeAt(a) !== 38 || a + 1 >= l)
    return !1;
  if (r = e.src.charCodeAt(a + 1), r === 35) {
    if (s = e.src.slice(a).match(Lte), s)
      return t || (o = s[1][0].toLowerCase() === "x" ? parseInt(s[1].slice(1), 16) : parseInt(s[1], 10), i = e.push("text_special", "", 0), i.content = Nte(o) ? Ud(o) : Ud(65533), i.markup = s[0], i.info = "entity"), e.pos += s[0].length, !0;
  } else if (s = e.src.slice(a).match(Rte), s && _te(jd, s[1]))
    return t || (i = e.push("text_special", "", 0), i.content = jd[s[1]], i.markup = s[0], i.info = "entity"), e.pos += s[0].length, !0;
  return !1;
};
function Wd(n, e) {
  var t, r, o, s, i, a, l, c, u = {}, d = e.length;
  if (d) {
    var f = 0, p = -2, h = [];
    for (t = 0; t < d; t++)
      if (o = e[t], h.push(0), (e[f].marker !== o.marker || p !== o.token - 1) && (f = t), p = o.token, o.length = o.length || 0, !!o.close) {
        for (u.hasOwnProperty(o.marker) || (u[o.marker] = [-1, -1, -1, -1, -1, -1]), i = u[o.marker][(o.open ? 3 : 0) + o.length % 3], r = f - h[f] - 1, a = r; r > i; r -= h[r] + 1)
          if (s = e[r], s.marker === o.marker && s.open && s.end < 0 && (l = !1, (s.close || o.open) && (s.length + o.length) % 3 === 0 && (s.length % 3 !== 0 || o.length % 3 !== 0) && (l = !0), !l)) {
            c = r > 0 && !e[r - 1].open ? h[r - 1] + 1 : 0, h[t] = t - r + c, h[r] = c, o.open = !1, s.end = t, s.close = !1, a = -1, p = -2;
            break;
          }
        a !== -1 && (u[o.marker][(o.open ? 3 : 0) + (o.length || 0) % 3] = a);
      }
  }
}
var Pte = function(e) {
  var t, r = e.tokens_meta, o = e.tokens_meta.length;
  for (Wd(e, e.delimiters), t = 0; t < o; t++)
    r[t] && r[t].delimiters && Wd(e, r[t].delimiters);
}, Bte = function(e) {
  var t, r, o = 0, s = e.tokens, i = e.tokens.length;
  for (t = r = 0; t < i; t++)
    s[t].nesting < 0 && o--, s[t].level = o, s[t].nesting > 0 && o++, s[t].type === "text" && t + 1 < i && s[t + 1].type === "text" ? s[t + 1].content = s[t].content + s[t + 1].content : (t !== r && (s[r] = s[t]), r++);
  t !== r && (s.length = r);
}, fc = cc, Kd = Y.isWhiteSpace, Gd = Y.isPunctChar, Jd = Y.isMdAsciiPunct;
function Io(n, e, t, r) {
  this.src = n, this.env = t, this.md = e, this.tokens = r, this.tokens_meta = Array(r.length), this.pos = 0, this.posMax = this.src.length, this.level = 0, this.pending = "", this.pendingLevel = 0, this.cache = {}, this.delimiters = [], this._prev_delimiters = [], this.backticks = {}, this.backticksScanned = !1, this.linkLevel = 0;
}
Io.prototype.pushPending = function() {
  var n = new fc("text", "", 0);
  return n.content = this.pending, n.level = this.pendingLevel, this.tokens.push(n), this.pending = "", n;
};
Io.prototype.push = function(n, e, t) {
  this.pending && this.pushPending();
  var r = new fc(n, e, t), o = null;
  return t < 0 && (this.level--, this.delimiters = this._prev_delimiters.pop()), r.level = this.level, t > 0 && (this.level++, this._prev_delimiters.push(this.delimiters), this.delimiters = [], o = { delimiters: this.delimiters }), this.pendingLevel = this.level, this.tokens.push(r), this.tokens_meta.push(o), r;
};
Io.prototype.scanDelims = function(n, e) {
  var t = n, r, o, s, i, a, l, c, u, d, f = !0, p = !0, h = this.posMax, m = this.src.charCodeAt(n);
  for (r = n > 0 ? this.src.charCodeAt(n - 1) : 32; t < h && this.src.charCodeAt(t) === m; )
    t++;
  return s = t - n, o = t < h ? this.src.charCodeAt(t) : 32, c = Jd(r) || Gd(String.fromCharCode(r)), d = Jd(o) || Gd(String.fromCharCode(o)), l = Kd(r), u = Kd(o), u ? f = !1 : d && (l || c || (f = !1)), l ? p = !1 : c && (u || d || (p = !1)), e ? (i = f, a = p) : (i = f && (!p || c), a = p && (!f || d)), {
    can_open: i,
    can_close: a,
    length: s
  };
};
Io.prototype.Token = fc;
var Fte = Io, Zd = lc, xa = [
  ["text", dte],
  ["linkify", pte],
  ["newline", mte],
  ["escape", yte],
  ["backticks", vte],
  ["strikethrough", Si.tokenize],
  ["emphasis", Ci.tokenize],
  ["link", kte],
  ["image", wte],
  ["autolink", Ete],
  ["html_inline", Dte],
  ["entity", Ite]
], wa = [
  ["balance_pairs", Pte],
  ["strikethrough", Si.postProcess],
  ["emphasis", Ci.postProcess],
  // rules for pairs separate '**' into its own text tokens, which may be left unused,
  // rule below merges unused segments back with the rest of the text
  ["fragments_join", Bte]
];
function Po() {
  var n;
  for (this.ruler = new Zd(), n = 0; n < xa.length; n++)
    this.ruler.push(xa[n][0], xa[n][1]);
  for (this.ruler2 = new Zd(), n = 0; n < wa.length; n++)
    this.ruler2.push(wa[n][0], wa[n][1]);
}
Po.prototype.skipToken = function(n) {
  var e, t, r = n.pos, o = this.ruler.getRules(""), s = o.length, i = n.md.options.maxNesting, a = n.cache;
  if (typeof a[r] < "u") {
    n.pos = a[r];
    return;
  }
  if (n.level < i)
    for (t = 0; t < s && (n.level++, e = o[t](n, !0), n.level--, !e); t++)
      ;
  else
    n.pos = n.posMax;
  e || n.pos++, a[r] = n.pos;
};
Po.prototype.tokenize = function(n) {
  for (var e, t, r = this.ruler.getRules(""), o = r.length, s = n.posMax, i = n.md.options.maxNesting; n.pos < s; ) {
    if (n.level < i)
      for (t = 0; t < o && (e = r[t](n, !1), !e); t++)
        ;
    if (e) {
      if (n.pos >= s)
        break;
      continue;
    }
    n.pending += n.src[n.pos++];
  }
  n.pending && n.pushPending();
};
Po.prototype.parse = function(n, e, t, r) {
  var o, s, i, a = new this.State(n, e, t, r);
  for (this.tokenize(a), s = this.ruler2.getRules(""), i = s.length, o = 0; o < i; o++)
    s[o](a);
};
Po.prototype.State = Fte;
var qte = Po, Sa, Yd;
function zte() {
  return Yd || (Yd = 1, Sa = function(n) {
    var e = {};
    n = n || {}, e.src_Any = Th().source, e.src_Cc = Mh().source, e.src_Z = Oh().source, e.src_P = ac.source, e.src_ZPCc = [e.src_Z, e.src_P, e.src_Cc].join("|"), e.src_ZCc = [e.src_Z, e.src_Cc].join("|");
    var t = "[><｜]";
    return e.src_pseudo_letter = "(?:(?!" + t + "|" + e.src_ZPCc + ")" + e.src_Any + ")", e.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)", e.src_auth = "(?:(?:(?!" + e.src_ZCc + "|[@/\\[\\]()]).)+@)?", e.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?", e.src_host_terminator = "(?=$|" + t + "|" + e.src_ZPCc + ")(?!" + (n["---"] ? "-(?!--)|" : "-|") + "_|:\\d|\\.-|\\.(?!$|" + e.src_ZPCc + "))", e.src_path = "(?:[/?#](?:(?!" + e.src_ZCc + "|" + t + `|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!` + e.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + e.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + e.src_ZCc + '|[}]).)*\\}|\\"(?:(?!' + e.src_ZCc + `|["]).)+\\"|\\'(?:(?!` + e.src_ZCc + "|[']).)+\\'|\\'(?=" + e.src_pseudo_letter + "|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!" + e.src_ZCc + "|[.]|$)|" + (n["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + ",(?!" + e.src_ZCc + "|$)|;(?!" + e.src_ZCc + "|$)|\\!+(?!" + e.src_ZCc + "|[!]|$)|\\?(?!" + e.src_ZCc + "|[?]|$))+|\\/)?", e.src_email_name = '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*', e.src_xn = "xn--[a-z0-9\\-]{1,59}", e.src_domain_root = // Allow letters & digits (http://test1)
    "(?:" + e.src_xn + "|" + e.src_pseudo_letter + "{1,63})", e.src_domain = "(?:" + e.src_xn + "|(?:" + e.src_pseudo_letter + ")|(?:" + e.src_pseudo_letter + "(?:-|" + e.src_pseudo_letter + "){0,61}" + e.src_pseudo_letter + "))", e.src_host = "(?:(?:(?:(?:" + e.src_domain + ")\\.)*" + e.src_domain + "))", e.tpl_host_fuzzy = "(?:" + e.src_ip4 + "|(?:(?:(?:" + e.src_domain + ")\\.)+(?:%TLDS%)))", e.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + e.src_domain + ")\\.)+(?:%TLDS%))", e.src_host_strict = e.src_host + e.src_host_terminator, e.tpl_host_fuzzy_strict = e.tpl_host_fuzzy + e.src_host_terminator, e.src_host_port_strict = e.src_host + e.src_port + e.src_host_terminator, e.tpl_host_port_fuzzy_strict = e.tpl_host_fuzzy + e.src_port + e.src_host_terminator, e.tpl_host_port_no_ip_fuzzy_strict = e.tpl_host_no_ip_fuzzy + e.src_port + e.src_host_terminator, e.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + e.src_ZPCc + "|>|$))", e.tpl_email_fuzzy = "(^|" + t + '|"|\\(|' + e.src_ZCc + ")(" + e.src_email_name + "@" + e.tpl_host_fuzzy_strict + ")", e.tpl_link_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
    // but can start with > (markdown blockquote)
    "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + e.src_ZPCc + "))((?![$+<=>^`|｜])" + e.tpl_host_port_fuzzy_strict + e.src_path + ")", e.tpl_link_no_ip_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
    // but can start with > (markdown blockquote)
    "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + e.src_ZPCc + "))((?![$+<=>^`|｜])" + e.tpl_host_port_no_ip_fuzzy_strict + e.src_path + ")", e;
  }), Sa;
}
function dl(n) {
  var e = Array.prototype.slice.call(arguments, 1);
  return e.forEach(function(t) {
    t && Object.keys(t).forEach(function(r) {
      n[r] = t[r];
    });
  }), n;
}
function Ei(n) {
  return Object.prototype.toString.call(n);
}
function $te(n) {
  return Ei(n) === "[object String]";
}
function Hte(n) {
  return Ei(n) === "[object Object]";
}
function Vte(n) {
  return Ei(n) === "[object RegExp]";
}
function Qd(n) {
  return Ei(n) === "[object Function]";
}
function jte(n) {
  return n.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}
var Ph = {
  fuzzyLink: !0,
  fuzzyEmail: !0,
  fuzzyIP: !1
};
function Ute(n) {
  return Object.keys(n || {}).reduce(function(e, t) {
    return e || Ph.hasOwnProperty(t);
  }, !1);
}
var Wte = {
  "http:": {
    validate: function(n, e, t) {
      var r = n.slice(e);
      return t.re.http || (t.re.http = new RegExp(
        "^\\/\\/" + t.re.src_auth + t.re.src_host_port_strict + t.re.src_path,
        "i"
      )), t.re.http.test(r) ? r.match(t.re.http)[0].length : 0;
    }
  },
  "https:": "http:",
  "ftp:": "http:",
  "//": {
    validate: function(n, e, t) {
      var r = n.slice(e);
      return t.re.no_http || (t.re.no_http = new RegExp(
        "^" + t.re.src_auth + // Don't allow single-level domains, because of false positives like '//test'
        // with code comments
        "(?:localhost|(?:(?:" + t.re.src_domain + ")\\.)+" + t.re.src_domain_root + ")" + t.re.src_port + t.re.src_host_terminator + t.re.src_path,
        "i"
      )), t.re.no_http.test(r) ? e >= 3 && n[e - 3] === ":" || e >= 3 && n[e - 3] === "/" ? 0 : r.match(t.re.no_http)[0].length : 0;
    }
  },
  "mailto:": {
    validate: function(n, e, t) {
      var r = n.slice(e);
      return t.re.mailto || (t.re.mailto = new RegExp(
        "^" + t.re.src_email_name + "@" + t.re.src_host_strict,
        "i"
      )), t.re.mailto.test(r) ? r.match(t.re.mailto)[0].length : 0;
    }
  }
}, Kte = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]", Gte = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
function Jte(n) {
  n.__index__ = -1, n.__text_cache__ = "";
}
function Zte(n) {
  return function(e, t) {
    var r = e.slice(t);
    return n.test(r) ? r.match(n)[0].length : 0;
  };
}
function Xd() {
  return function(n, e) {
    e.normalize(n);
  };
}
function Zs(n) {
  var e = n.re = zte()(n.__opts__), t = n.__tlds__.slice();
  n.onCompile(), n.__tlds_replaced__ || t.push(Kte), t.push(e.src_xn), e.src_tlds = t.join("|");
  function r(a) {
    return a.replace("%TLDS%", e.src_tlds);
  }
  e.email_fuzzy = RegExp(r(e.tpl_email_fuzzy), "i"), e.link_fuzzy = RegExp(r(e.tpl_link_fuzzy), "i"), e.link_no_ip_fuzzy = RegExp(r(e.tpl_link_no_ip_fuzzy), "i"), e.host_fuzzy_test = RegExp(r(e.tpl_host_fuzzy_test), "i");
  var o = [];
  n.__compiled__ = {};
  function s(a, l) {
    throw new Error('(LinkifyIt) Invalid schema "' + a + '": ' + l);
  }
  Object.keys(n.__schemas__).forEach(function(a) {
    var l = n.__schemas__[a];
    if (l !== null) {
      var c = { validate: null, link: null };
      if (n.__compiled__[a] = c, Hte(l)) {
        Vte(l.validate) ? c.validate = Zte(l.validate) : Qd(l.validate) ? c.validate = l.validate : s(a, l), Qd(l.normalize) ? c.normalize = l.normalize : l.normalize ? s(a, l) : c.normalize = Xd();
        return;
      }
      if ($te(l)) {
        o.push(a);
        return;
      }
      s(a, l);
    }
  }), o.forEach(function(a) {
    n.__compiled__[n.__schemas__[a]] && (n.__compiled__[a].validate = n.__compiled__[n.__schemas__[a]].validate, n.__compiled__[a].normalize = n.__compiled__[n.__schemas__[a]].normalize);
  }), n.__compiled__[""] = { validate: null, normalize: Xd() };
  var i = Object.keys(n.__compiled__).filter(function(a) {
    return a.length > 0 && n.__compiled__[a];
  }).map(jte).join("|");
  n.re.schema_test = RegExp("(^|(?!_)(?:[><｜]|" + e.src_ZPCc + "))(" + i + ")", "i"), n.re.schema_search = RegExp("(^|(?!_)(?:[><｜]|" + e.src_ZPCc + "))(" + i + ")", "ig"), n.re.schema_at_start = RegExp("^" + n.re.schema_search.source, "i"), n.re.pretest = RegExp(
    "(" + n.re.schema_test.source + ")|(" + n.re.host_fuzzy_test.source + ")|@",
    "i"
  ), Jte(n);
}
function Yte(n, e) {
  var t = n.__index__, r = n.__last_index__, o = n.__text_cache__.slice(t, r);
  this.schema = n.__schema__.toLowerCase(), this.index = t + e, this.lastIndex = r + e, this.raw = o, this.text = o, this.url = o;
}
function fl(n, e) {
  var t = new Yte(n, e);
  return n.__compiled__[t.schema].normalize(t, n), t;
}
function je(n, e) {
  if (!(this instanceof je))
    return new je(n, e);
  e || Ute(n) && (e = n, n = {}), this.__opts__ = dl({}, Ph, e), this.__index__ = -1, this.__last_index__ = -1, this.__schema__ = "", this.__text_cache__ = "", this.__schemas__ = dl({}, Wte, n), this.__compiled__ = {}, this.__tlds__ = Gte, this.__tlds_replaced__ = !1, this.re = {}, Zs(this);
}
je.prototype.add = function(e, t) {
  return this.__schemas__[e] = t, Zs(this), this;
};
je.prototype.set = function(e) {
  return this.__opts__ = dl(this.__opts__, e), this;
};
je.prototype.test = function(e) {
  if (this.__text_cache__ = e, this.__index__ = -1, !e.length)
    return !1;
  var t, r, o, s, i, a, l, c, u;
  if (this.re.schema_test.test(e)) {
    for (l = this.re.schema_search, l.lastIndex = 0; (t = l.exec(e)) !== null; )
      if (s = this.testSchemaAt(e, t[2], l.lastIndex), s) {
        this.__schema__ = t[2], this.__index__ = t.index + t[1].length, this.__last_index__ = t.index + t[0].length + s;
        break;
      }
  }
  return this.__opts__.fuzzyLink && this.__compiled__["http:"] && (c = e.search(this.re.host_fuzzy_test), c >= 0 && (this.__index__ < 0 || c < this.__index__) && (r = e.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null && (i = r.index + r[1].length, (this.__index__ < 0 || i < this.__index__) && (this.__schema__ = "", this.__index__ = i, this.__last_index__ = r.index + r[0].length))), this.__opts__.fuzzyEmail && this.__compiled__["mailto:"] && (u = e.indexOf("@"), u >= 0 && (o = e.match(this.re.email_fuzzy)) !== null && (i = o.index + o[1].length, a = o.index + o[0].length, (this.__index__ < 0 || i < this.__index__ || i === this.__index__ && a > this.__last_index__) && (this.__schema__ = "mailto:", this.__index__ = i, this.__last_index__ = a))), this.__index__ >= 0;
};
je.prototype.pretest = function(e) {
  return this.re.pretest.test(e);
};
je.prototype.testSchemaAt = function(e, t, r) {
  return this.__compiled__[t.toLowerCase()] ? this.__compiled__[t.toLowerCase()].validate(e, r, this) : 0;
};
je.prototype.match = function(e) {
  var t = 0, r = [];
  this.__index__ >= 0 && this.__text_cache__ === e && (r.push(fl(this, t)), t = this.__last_index__);
  for (var o = t ? e.slice(t) : e; this.test(o); )
    r.push(fl(this, t)), o = o.slice(this.__last_index__), t += this.__last_index__;
  return r.length ? r : null;
};
je.prototype.matchAtStart = function(e) {
  if (this.__text_cache__ = e, this.__index__ = -1, !e.length)
    return null;
  var t = this.re.schema_at_start.exec(e);
  if (!t)
    return null;
  var r = this.testSchemaAt(e, t[2], t[0].length);
  return r ? (this.__schema__ = t[2], this.__index__ = t.index + t[1].length, this.__last_index__ = t.index + t[0].length + r, fl(this, 0)) : null;
};
je.prototype.tlds = function(e, t) {
  return e = Array.isArray(e) ? e : [e], t ? (this.__tlds__ = this.__tlds__.concat(e).sort().filter(function(r, o, s) {
    return r !== s[o - 1];
  }).reverse(), Zs(this), this) : (this.__tlds__ = e.slice(), this.__tlds_replaced__ = !0, Zs(this), this);
};
je.prototype.normalize = function(e) {
  e.schema || (e.url = "http://" + e.url), e.schema === "mailto:" && !/^mailto:/i.test(e.url) && (e.url = "mailto:" + e.url);
};
je.prototype.onCompile = function() {
};
var Qte = je;
const br = 2147483647, vt = 36, pc = 1, Ao = 26, Xte = 38, ene = 700, Bh = 72, Fh = 128, qh = "-", tne = /^xn--/, nne = /[^\0-\x7F]/, rne = /[\x2E\u3002\uFF0E\uFF61]/g, one = {
  overflow: "Overflow: input needs wider integers to process",
  "not-basic": "Illegal input >= 0x80 (not a basic code point)",
  "invalid-input": "Invalid input"
}, Ca = vt - pc, bt = Math.floor, Ea = String.fromCharCode;
function Zt(n) {
  throw new RangeError(one[n]);
}
function sne(n, e) {
  const t = [];
  let r = n.length;
  for (; r--; )
    t[r] = e(n[r]);
  return t;
}
function zh(n, e) {
  const t = n.split("@");
  let r = "";
  t.length > 1 && (r = t[0] + "@", n = t[1]), n = n.replace(rne, ".");
  const o = n.split("."), s = sne(o, e).join(".");
  return r + s;
}
function hc(n) {
  const e = [];
  let t = 0;
  const r = n.length;
  for (; t < r; ) {
    const o = n.charCodeAt(t++);
    if (o >= 55296 && o <= 56319 && t < r) {
      const s = n.charCodeAt(t++);
      (s & 64512) == 56320 ? e.push(((o & 1023) << 10) + (s & 1023) + 65536) : (e.push(o), t--);
    } else
      e.push(o);
  }
  return e;
}
const $h = (n) => String.fromCodePoint(...n), ine = function(n) {
  return n >= 48 && n < 58 ? 26 + (n - 48) : n >= 65 && n < 91 ? n - 65 : n >= 97 && n < 123 ? n - 97 : vt;
}, ef = function(n, e) {
  return n + 22 + 75 * (n < 26) - ((e != 0) << 5);
}, Hh = function(n, e, t) {
  let r = 0;
  for (n = t ? bt(n / ene) : n >> 1, n += bt(n / e); n > Ca * Ao >> 1; r += vt)
    n = bt(n / Ca);
  return bt(r + (Ca + 1) * n / (n + Xte));
}, mc = function(n) {
  const e = [], t = n.length;
  let r = 0, o = Fh, s = Bh, i = n.lastIndexOf(qh);
  i < 0 && (i = 0);
  for (let a = 0; a < i; ++a)
    n.charCodeAt(a) >= 128 && Zt("not-basic"), e.push(n.charCodeAt(a));
  for (let a = i > 0 ? i + 1 : 0; a < t; ) {
    const l = r;
    for (let u = 1, d = vt; ; d += vt) {
      a >= t && Zt("invalid-input");
      const f = ine(n.charCodeAt(a++));
      f >= vt && Zt("invalid-input"), f > bt((br - r) / u) && Zt("overflow"), r += f * u;
      const p = d <= s ? pc : d >= s + Ao ? Ao : d - s;
      if (f < p)
        break;
      const h = vt - p;
      u > bt(br / h) && Zt("overflow"), u *= h;
    }
    const c = e.length + 1;
    s = Hh(r - l, c, l == 0), bt(r / c) > br - o && Zt("overflow"), o += bt(r / c), r %= c, e.splice(r++, 0, o);
  }
  return String.fromCodePoint(...e);
}, gc = function(n) {
  const e = [];
  n = hc(n);
  const t = n.length;
  let r = Fh, o = 0, s = Bh;
  for (const l of n)
    l < 128 && e.push(Ea(l));
  const i = e.length;
  let a = i;
  for (i && e.push(qh); a < t; ) {
    let l = br;
    for (const u of n)
      u >= r && u < l && (l = u);
    const c = a + 1;
    l - r > bt((br - o) / c) && Zt("overflow"), o += (l - r) * c, r = l;
    for (const u of n)
      if (u < r && ++o > br && Zt("overflow"), u === r) {
        let d = o;
        for (let f = vt; ; f += vt) {
          const p = f <= s ? pc : f >= s + Ao ? Ao : f - s;
          if (d < p)
            break;
          const h = d - p, m = vt - p;
          e.push(
            Ea(ef(p + h % m, 0))
          ), d = bt(h / m);
        }
        e.push(Ea(ef(d, 0))), s = Hh(o, c, a === i), o = 0, ++a;
      }
    ++o, ++r;
  }
  return e.join("");
}, Vh = function(n) {
  return zh(n, function(e) {
    return tne.test(e) ? mc(e.slice(4).toLowerCase()) : e;
  });
}, jh = function(n) {
  return zh(n, function(e) {
    return nne.test(e) ? "xn--" + gc(e) : e;
  });
}, ane = {
  /**
   * A string representing the current Punycode.js version number.
   * @memberOf punycode
   * @type String
   */
  version: "2.1.0",
  /**
   * An object of methods to convert from JavaScript's internal character
   * representation (UCS-2) to Unicode code points, and back.
   * @see <https://mathiasbynens.be/notes/javascript-encoding>
   * @memberOf punycode
   * @type Object
   */
  ucs2: {
    decode: hc,
    encode: $h
  },
  decode: mc,
  encode: gc,
  toASCII: jh,
  toUnicode: Vh
}, lne = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: mc,
  default: ane,
  encode: gc,
  toASCII: jh,
  toUnicode: Vh,
  ucs2decode: hc,
  ucs2encode: $h
}, Symbol.toStringTag, { value: "Module" })), cne = /* @__PURE__ */ bw(lne);
var une = {
  options: {
    html: !1,
    // Enable HTML tags in source
    xhtmlOut: !1,
    // Use '/' to close single tags (<br />)
    breaks: !1,
    // Convert '\n' in paragraphs into <br>
    langPrefix: "language-",
    // CSS language prefix for fenced blocks
    linkify: !1,
    // autoconvert URL-like texts to links
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    maxNesting: 100
    // Internal protection, recursion limit
  },
  components: {
    core: {},
    block: {},
    inline: {}
  }
}, dne = {
  options: {
    html: !1,
    // Enable HTML tags in source
    xhtmlOut: !1,
    // Use '/' to close single tags (<br />)
    breaks: !1,
    // Convert '\n' in paragraphs into <br>
    langPrefix: "language-",
    // CSS language prefix for fenced blocks
    linkify: !1,
    // autoconvert URL-like texts to links
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    maxNesting: 20
    // Internal protection, recursion limit
  },
  components: {
    core: {
      rules: [
        "normalize",
        "block",
        "inline",
        "text_join"
      ]
    },
    block: {
      rules: [
        "paragraph"
      ]
    },
    inline: {
      rules: [
        "text"
      ],
      rules2: [
        "balance_pairs",
        "fragments_join"
      ]
    }
  }
}, fne = {
  options: {
    html: !0,
    // Enable HTML tags in source
    xhtmlOut: !0,
    // Use '/' to close single tags (<br />)
    breaks: !1,
    // Convert '\n' in paragraphs into <br>
    langPrefix: "language-",
    // CSS language prefix for fenced blocks
    linkify: !1,
    // autoconvert URL-like texts to links
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    maxNesting: 20
    // Internal protection, recursion limit
  },
  components: {
    core: {
      rules: [
        "normalize",
        "block",
        "inline",
        "text_join"
      ]
    },
    block: {
      rules: [
        "blockquote",
        "code",
        "fence",
        "heading",
        "hr",
        "html_block",
        "lheading",
        "list",
        "reference",
        "paragraph"
      ]
    },
    inline: {
      rules: [
        "autolink",
        "backticks",
        "emphasis",
        "entity",
        "escape",
        "html_inline",
        "image",
        "link",
        "newline",
        "text"
      ],
      rules2: [
        "balance_pairs",
        "emphasis",
        "fragments_join"
      ]
    }
  }
}, co = Y, pne = bi, hne = aee, mne = _ee, gne = cte, yne = qte, vne = Qte, Mn = Br, Uh = cne, bne = {
  default: une,
  zero: dne,
  commonmark: fne
}, kne = /^(vbscript|javascript|file|data):/, xne = /^data:image\/(gif|png|jpeg|webp);/;
function wne(n) {
  var e = n.trim().toLowerCase();
  return kne.test(e) ? !!xne.test(e) : !0;
}
var Wh = ["http:", "https:", "mailto:"];
function Sne(n) {
  var e = Mn.parse(n, !0);
  if (e.hostname && (!e.protocol || Wh.indexOf(e.protocol) >= 0))
    try {
      e.hostname = Uh.toASCII(e.hostname);
    } catch {
    }
  return Mn.encode(Mn.format(e));
}
function Cne(n) {
  var e = Mn.parse(n, !0);
  if (e.hostname && (!e.protocol || Wh.indexOf(e.protocol) >= 0))
    try {
      e.hostname = Uh.toUnicode(e.hostname);
    } catch {
    }
  return Mn.decode(Mn.format(e), Mn.decode.defaultChars + "%");
}
function tt(n, e) {
  if (!(this instanceof tt))
    return new tt(n, e);
  e || co.isString(n) || (e = n || {}, n = "default"), this.inline = new yne(), this.block = new gne(), this.core = new mne(), this.renderer = new hne(), this.linkify = new vne(), this.validateLink = wne, this.normalizeLink = Sne, this.normalizeLinkText = Cne, this.utils = co, this.helpers = co.assign({}, pne), this.options = {}, this.configure(n), e && this.set(e);
}
tt.prototype.set = function(n) {
  return co.assign(this.options, n), this;
};
tt.prototype.configure = function(n) {
  var e = this, t;
  if (co.isString(n) && (t = n, n = bne[t], !n))
    throw new Error('Wrong `markdown-it` preset "' + t + '", check name');
  if (!n)
    throw new Error("Wrong `markdown-it` preset, can't be empty");
  return n.options && e.set(n.options), n.components && Object.keys(n.components).forEach(function(r) {
    n.components[r].rules && e[r].ruler.enableOnly(n.components[r].rules), n.components[r].rules2 && e[r].ruler2.enableOnly(n.components[r].rules2);
  }), this;
};
tt.prototype.enable = function(n, e) {
  var t = [];
  Array.isArray(n) || (n = [n]), ["core", "block", "inline"].forEach(function(o) {
    t = t.concat(this[o].ruler.enable(n, !0));
  }, this), t = t.concat(this.inline.ruler2.enable(n, !0));
  var r = n.filter(function(o) {
    return t.indexOf(o) < 0;
  });
  if (r.length && !e)
    throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + r);
  return this;
};
tt.prototype.disable = function(n, e) {
  var t = [];
  Array.isArray(n) || (n = [n]), ["core", "block", "inline"].forEach(function(o) {
    t = t.concat(this[o].ruler.disable(n, !0));
  }, this), t = t.concat(this.inline.ruler2.disable(n, !0));
  var r = n.filter(function(o) {
    return t.indexOf(o) < 0;
  });
  if (r.length && !e)
    throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + r);
  return this;
};
tt.prototype.use = function(n) {
  var e = [this].concat(Array.prototype.slice.call(arguments, 1));
  return n.apply(n, e), this;
};
tt.prototype.parse = function(n, e) {
  if (typeof n != "string")
    throw new Error("Input data should be a String");
  var t = new this.core.State(n, this, e);
  return this.core.process(t), t.tokens;
};
tt.prototype.render = function(n, e) {
  return e = e || {}, this.renderer.render(this.parse(n, e), this.options, e);
};
tt.prototype.parseInline = function(n, e) {
  var t = new this.core.State(n, this, e);
  return t.inlineMode = !0, this.core.process(t), t.tokens;
};
tt.prototype.renderInline = function(n, e) {
  return e = e || {}, this.renderer.render(this.parseInline(n, e), this.options, e);
};
var Ene = tt, Ane = Ene;
const yc = /* @__PURE__ */ Eh(Ane), Tne = new _f({
  nodes: {
    doc: {
      content: "block+"
    },
    paragraph: {
      content: "inline*",
      group: "block",
      parseDOM: [{ tag: "p" }],
      toDOM() {
        return ["p", 0];
      }
    },
    blockquote: {
      content: "block+",
      group: "block",
      parseDOM: [{ tag: "blockquote" }],
      toDOM() {
        return ["blockquote", 0];
      }
    },
    horizontal_rule: {
      group: "block",
      parseDOM: [{ tag: "hr" }],
      toDOM() {
        return ["div", ["hr"]];
      }
    },
    heading: {
      attrs: { level: { default: 1 } },
      content: "(text | image)*",
      group: "block",
      defining: !0,
      parseDOM: [
        { tag: "h1", attrs: { level: 1 } },
        { tag: "h2", attrs: { level: 2 } },
        { tag: "h3", attrs: { level: 3 } },
        { tag: "h4", attrs: { level: 4 } },
        { tag: "h5", attrs: { level: 5 } },
        { tag: "h6", attrs: { level: 6 } }
      ],
      toDOM(n) {
        return ["h" + n.attrs.level, 0];
      }
    },
    code_block: {
      content: "text*",
      group: "block",
      code: !0,
      defining: !0,
      marks: "",
      attrs: { params: { default: "" } },
      parseDOM: [{ tag: "pre", preserveWhitespace: "full", getAttrs: (n) => ({ params: n.getAttribute("data-params") || "" }) }],
      toDOM(n) {
        return ["pre", n.attrs.params ? { "data-params": n.attrs.params } : {}, ["code", 0]];
      }
    },
    ordered_list: {
      content: "list_item+",
      group: "block",
      attrs: { order: { default: 1 }, tight: { default: !1 } },
      parseDOM: [{ tag: "ol", getAttrs(n) {
        return {
          order: n.hasAttribute("start") ? +n.getAttribute("start") : 1,
          tight: n.hasAttribute("data-tight")
        };
      } }],
      toDOM(n) {
        return ["ol", {
          start: n.attrs.order == 1 ? null : n.attrs.order,
          "data-tight": n.attrs.tight ? "true" : null
        }, 0];
      }
    },
    bullet_list: {
      content: "list_item+",
      group: "block",
      attrs: { tight: { default: !1 } },
      parseDOM: [{ tag: "ul", getAttrs: (n) => ({ tight: n.hasAttribute("data-tight") }) }],
      toDOM(n) {
        return ["ul", { "data-tight": n.attrs.tight ? "true" : null }, 0];
      }
    },
    list_item: {
      content: "block+",
      defining: !0,
      parseDOM: [{ tag: "li" }],
      toDOM() {
        return ["li", 0];
      }
    },
    text: {
      group: "inline"
    },
    image: {
      inline: !0,
      attrs: {
        src: {},
        alt: { default: null },
        title: { default: null }
      },
      group: "inline",
      draggable: !0,
      parseDOM: [{ tag: "img[src]", getAttrs(n) {
        return {
          src: n.getAttribute("src"),
          title: n.getAttribute("title"),
          alt: n.getAttribute("alt")
        };
      } }],
      toDOM(n) {
        return ["img", n.attrs];
      }
    },
    hard_break: {
      inline: !0,
      group: "inline",
      selectable: !1,
      parseDOM: [{ tag: "br" }],
      toDOM() {
        return ["br"];
      }
    }
  },
  marks: {
    em: {
      parseDOM: [
        { tag: "i" },
        { tag: "em" },
        { style: "font-style=italic" },
        { style: "font-style=normal", clearMark: (n) => n.type.name == "em" }
      ],
      toDOM() {
        return ["em"];
      }
    },
    strong: {
      parseDOM: [
        { tag: "strong" },
        { tag: "b", getAttrs: (n) => n.style.fontWeight != "normal" && null },
        { style: "font-weight=400", clearMark: (n) => n.type.name == "strong" },
        { style: "font-weight", getAttrs: (n) => /^(bold(er)?|[5-9]\d{2,})$/.test(n) && null }
      ],
      toDOM() {
        return ["strong"];
      }
    },
    link: {
      attrs: {
        href: {},
        title: { default: null }
      },
      inclusive: !1,
      parseDOM: [{ tag: "a[href]", getAttrs(n) {
        return { href: n.getAttribute("href"), title: n.getAttribute("title") };
      } }],
      toDOM(n) {
        return ["a", n.attrs];
      }
    },
    code: {
      parseDOM: [{ tag: "code" }],
      toDOM() {
        return ["code"];
      }
    }
  }
});
function Mne(n, e) {
  if (n.isText && e.isText && Z.sameSet(n.marks, e.marks))
    return n.withText(n.text + e.text);
}
class One {
  constructor(e, t) {
    this.schema = e, this.tokenHandlers = t, this.stack = [{ type: e.topNodeType, attrs: null, content: [], marks: Z.none }];
  }
  top() {
    return this.stack[this.stack.length - 1];
  }
  push(e) {
    this.stack.length && this.top().content.push(e);
  }
  // Adds the given text to the current position in the document,
  // using the current marks as styling.
  addText(e) {
    if (!e)
      return;
    let t = this.top(), r = t.content, o = r[r.length - 1], s = this.schema.text(e, t.marks), i;
    o && (i = Mne(o, s)) ? r[r.length - 1] = i : r.push(s);
  }
  // Adds the given mark to the set of active marks.
  openMark(e) {
    let t = this.top();
    t.marks = e.addToSet(t.marks);
  }
  // Removes the given mark from the set of active marks.
  closeMark(e) {
    let t = this.top();
    t.marks = e.removeFromSet(t.marks);
  }
  parseTokens(e) {
    for (let t = 0; t < e.length; t++) {
      let r = e[t], o = this.tokenHandlers[r.type];
      if (!o)
        throw new Error("Token type `" + r.type + "` not supported by Markdown parser");
      o(this, r, e, t);
    }
  }
  // Add a node at the current position.
  addNode(e, t, r) {
    let o = this.top(), s = e.createAndFill(t, r, o ? o.marks : []);
    return s ? (this.push(s), s) : null;
  }
  // Wrap subsequent content in a node of the given type.
  openNode(e, t) {
    this.stack.push({ type: e, attrs: t, content: [], marks: Z.none });
  }
  // Close and return the node that is currently on top of the stack.
  closeNode() {
    let e = this.stack.pop();
    return this.addNode(e.type, e.attrs, e.content);
  }
}
function Gr(n, e, t, r) {
  return n.getAttrs ? n.getAttrs(e, t, r) : n.attrs instanceof Function ? n.attrs(e) : n.attrs;
}
function Aa(n, e) {
  return n.noCloseToken || e == "code_inline" || e == "code_block" || e == "fence";
}
function tf(n) {
  return n[n.length - 1] == `
` ? n.slice(0, n.length - 1) : n;
}
function Ta() {
}
function Dne(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let r in e) {
    let o = e[r];
    if (o.block) {
      let s = n.nodeType(o.block);
      Aa(o, r) ? t[r] = (i, a, l, c) => {
        i.openNode(s, Gr(o, a, l, c)), i.addText(tf(a.content)), i.closeNode();
      } : (t[r + "_open"] = (i, a, l, c) => i.openNode(s, Gr(o, a, l, c)), t[r + "_close"] = (i) => i.closeNode());
    } else if (o.node) {
      let s = n.nodeType(o.node);
      t[r] = (i, a, l, c) => i.addNode(s, Gr(o, a, l, c));
    } else if (o.mark) {
      let s = n.marks[o.mark];
      Aa(o, r) ? t[r] = (i, a, l, c) => {
        i.openMark(s.create(Gr(o, a, l, c))), i.addText(tf(a.content)), i.closeMark(s);
      } : (t[r + "_open"] = (i, a, l, c) => i.openMark(s.create(Gr(o, a, l, c))), t[r + "_close"] = (i) => i.closeMark(s));
    } else if (o.ignore)
      Aa(o, r) ? t[r] = Ta : (t[r + "_open"] = Ta, t[r + "_close"] = Ta);
    else
      throw new RangeError("Unrecognized parsing spec " + JSON.stringify(o));
  }
  return t.text = (r, o) => r.addText(o.content), t.inline = (r, o) => r.parseTokens(o.children), t.softbreak = t.softbreak || ((r) => r.addText(" ")), t;
}
let _ne = class {
  /**
  Create a parser with the given configuration. You can configure
  the markdown-it parser to parse the dialect you want, and provide
  a description of the ProseMirror entities those tokens map to in
  the `tokens` object, which maps token names to descriptions of
  what to do with them. Such a description is an object, and may
  have the following properties:
  */
  constructor(e, t, r) {
    this.schema = e, this.tokenizer = t, this.tokens = r, this.tokenHandlers = Dne(e, r);
  }
  /**
  Parse a string as [CommonMark](http://commonmark.org/) markup,
  and create a ProseMirror document as prescribed by this parser's
  rules.
  
  The second argument, when given, is passed through to the
  [Markdown
  parser](https://markdown-it.github.io/markdown-it/#MarkdownIt.parse).
  */
  parse(e, t = {}) {
    let r = new One(this.schema, this.tokenHandlers), o;
    r.parseTokens(this.tokenizer.parse(e, t));
    do
      o = r.closeNode();
    while (r.stack.length);
    return o || this.schema.topNodeType.createAndFill();
  }
};
function nf(n, e) {
  for (; ++e < n.length; )
    if (n[e].type != "list_item_open")
      return n[e].hidden;
  return !1;
}
new _ne(Tne, yc("commonmark", { html: !1 }), {
  blockquote: { block: "blockquote" },
  paragraph: { block: "paragraph" },
  list_item: { block: "list_item" },
  bullet_list: { block: "bullet_list", getAttrs: (n, e, t) => ({ tight: nf(e, t) }) },
  ordered_list: { block: "ordered_list", getAttrs: (n, e, t) => ({
    order: +n.attrGet("start") || 1,
    tight: nf(e, t)
  }) },
  heading: { block: "heading", getAttrs: (n) => ({ level: +n.tag.slice(1) }) },
  code_block: { block: "code_block", noCloseToken: !0 },
  fence: { block: "code_block", getAttrs: (n) => ({ params: n.info || "" }), noCloseToken: !0 },
  hr: { node: "horizontal_rule" },
  image: { node: "image", getAttrs: (n) => ({
    src: n.attrGet("src"),
    title: n.attrGet("title") || null,
    alt: n.children[0] && n.children[0].content || null
  }) },
  hardbreak: { node: "hard_break" },
  em: { mark: "em" },
  strong: { mark: "strong" },
  link: { mark: "link", getAttrs: (n) => ({
    href: n.attrGet("href"),
    title: n.attrGet("title") || null
  }) },
  code_inline: { mark: "code", noCloseToken: !0 }
});
let Nne = class {
  /**
  Construct a serializer with the given configuration. The `nodes`
  object should map node names in a given schema to function that
  take a serializer state and such a node, and serialize the node.
  */
  constructor(e, t, r = {}) {
    this.nodes = e, this.marks = t, this.options = r;
  }
  /**
  Serialize the content of the given node to
  [CommonMark](http://commonmark.org/).
  */
  serialize(e, t = {}) {
    t = Object.assign({}, this.options, t);
    let r = new Kh(this.nodes, this.marks, t);
    return r.renderContent(e), r.out;
  }
};
const nt = new Nne({
  blockquote(n, e) {
    n.wrapBlock("> ", null, e, () => n.renderContent(e));
  },
  code_block(n, e) {
    const t = e.textContent.match(/`{3,}/gm), r = t ? t.sort().slice(-1)[0] + "`" : "```";
    n.write(r + (e.attrs.params || "") + `
`), n.text(e.textContent, !1), n.write(`
`), n.write(r), n.closeBlock(e);
  },
  heading(n, e) {
    n.write(n.repeat("#", e.attrs.level) + " "), n.renderInline(e), n.closeBlock(e);
  },
  horizontal_rule(n, e) {
    n.write(e.attrs.markup || "---"), n.closeBlock(e);
  },
  bullet_list(n, e) {
    n.renderList(e, "  ", () => (e.attrs.bullet || "*") + " ");
  },
  ordered_list(n, e) {
    let t = e.attrs.order || 1, r = String(t + e.childCount - 1).length, o = n.repeat(" ", r + 2);
    n.renderList(e, o, (s) => {
      let i = String(t + s);
      return n.repeat(" ", r - i.length) + i + ". ";
    });
  },
  list_item(n, e) {
    n.renderContent(e);
  },
  paragraph(n, e) {
    n.renderInline(e), n.closeBlock(e);
  },
  image(n, e) {
    n.write("![" + n.esc(e.attrs.alt || "") + "](" + e.attrs.src.replace(/[\(\)]/g, "\\$&") + (e.attrs.title ? ' "' + e.attrs.title.replace(/"/g, '\\"') + '"' : "") + ")");
  },
  hard_break(n, e, t, r) {
    for (let o = r + 1; o < t.childCount; o++)
      if (t.child(o).type != e.type) {
        n.write(`\\
`);
        return;
      }
  },
  text(n, e) {
    n.text(e.text, !n.inAutolink);
  }
}, {
  em: { open: "*", close: "*", mixable: !0, expelEnclosingWhitespace: !0 },
  strong: { open: "**", close: "**", mixable: !0, expelEnclosingWhitespace: !0 },
  link: {
    open(n, e, t, r) {
      return n.inAutolink = Lne(e, t, r), n.inAutolink ? "<" : "[";
    },
    close(n, e, t, r) {
      let { inAutolink: o } = n;
      return n.inAutolink = void 0, o ? ">" : "](" + e.attrs.href.replace(/[\(\)"]/g, "\\$&") + (e.attrs.title ? ` "${e.attrs.title.replace(/"/g, '\\"')}"` : "") + ")";
    },
    mixable: !0
  },
  code: {
    open(n, e, t, r) {
      return rf(t.child(r), -1);
    },
    close(n, e, t, r) {
      return rf(t.child(r - 1), 1);
    },
    escape: !1
  }
});
function rf(n, e) {
  let t = /`+/g, r, o = 0;
  if (n.isText)
    for (; r = t.exec(n.text); )
      o = Math.max(o, r[0].length);
  let s = o > 0 && e > 0 ? " `" : "`";
  for (let i = 0; i < o; i++)
    s += "`";
  return o > 0 && e < 0 && (s += " "), s;
}
function Lne(n, e, t) {
  if (n.attrs.title || !/^\w+:/.test(n.attrs.href))
    return !1;
  let r = e.child(t);
  return !r.isText || r.text != n.attrs.href || r.marks[r.marks.length - 1] != n ? !1 : t == e.childCount - 1 || !n.isInSet(e.child(t + 1).marks);
}
let Kh = class {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.nodes = e, this.marks = t, this.options = r, this.delim = "", this.out = "", this.closed = null, this.inAutolink = void 0, this.atBlockStart = !1, this.inTightList = !1, typeof this.options.tightLists > "u" && (this.options.tightLists = !1), typeof this.options.hardBreakNodeName > "u" && (this.options.hardBreakNodeName = "hard_break");
  }
  /**
  @internal
  */
  flushClose(e = 2) {
    if (this.closed) {
      if (this.atBlank() || (this.out += `
`), e > 1) {
        let t = this.delim, r = /\s+$/.exec(t);
        r && (t = t.slice(0, t.length - r[0].length));
        for (let o = 1; o < e; o++)
          this.out += t + `
`;
      }
      this.closed = null;
    }
  }
  /**
  Render a block, prefixing each line with `delim`, and the first
  line in `firstDelim`. `node` should be the node that is closed at
  the end of the block, and `f` is a function that renders the
  content of the block.
  */
  wrapBlock(e, t, r, o) {
    let s = this.delim;
    this.write(t ?? e), this.delim += e, o(), this.delim = s, this.closeBlock(r);
  }
  /**
  @internal
  */
  atBlank() {
    return /(^|\n)$/.test(this.out);
  }
  /**
  Ensure the current content ends with a newline.
  */
  ensureNewLine() {
    this.atBlank() || (this.out += `
`);
  }
  /**
  Prepare the state for writing output (closing closed paragraphs,
  adding delimiters, and so on), and then optionally add content
  (unescaped) to the output.
  */
  write(e) {
    this.flushClose(), this.delim && this.atBlank() && (this.out += this.delim), e && (this.out += e);
  }
  /**
  Close the block for the given node.
  */
  closeBlock(e) {
    this.closed = e;
  }
  /**
  Add the given text to the document. When escape is not `false`,
  it will be escaped.
  */
  text(e, t = !0) {
    let r = e.split(`
`);
    for (let o = 0; o < r.length; o++)
      this.write(), !t && r[o][0] == "[" && /(^|[^\\])\!$/.test(this.out) && (this.out = this.out.slice(0, this.out.length - 1) + "\\!"), this.out += t ? this.esc(r[o], this.atBlockStart) : r[o], o != r.length - 1 && (this.out += `
`);
  }
  /**
  Render the given node as a block.
  */
  render(e, t, r) {
    if (typeof t == "number")
      throw new Error("!");
    if (!this.nodes[e.type.name])
      throw new Error("Token type `" + e.type.name + "` not supported by Markdown renderer");
    this.nodes[e.type.name](this, e, t, r);
  }
  /**
  Render the contents of `parent` as block nodes.
  */
  renderContent(e) {
    e.forEach((t, r, o) => this.render(t, e, o));
  }
  /**
  Render the contents of `parent` as inline content.
  */
  renderInline(e) {
    this.atBlockStart = !0;
    let t = [], r = "", o = (s, i, a) => {
      let l = s ? s.marks : [];
      s && s.type.name === this.options.hardBreakNodeName && (l = l.filter((h) => {
        if (a + 1 == e.childCount)
          return !1;
        let m = e.child(a + 1);
        return h.isInSet(m.marks) && (!m.isText || /\S/.test(m.text));
      }));
      let c = r;
      if (r = "", s && s.isText && l.some((h) => {
        let m = this.marks[h.type.name];
        return m && m.expelEnclosingWhitespace && !h.isInSet(t);
      })) {
        let [h, m, g] = /^(\s*)(.*)$/m.exec(s.text);
        m && (c += m, s = g ? s.withText(g) : null, s || (l = t));
      }
      if (s && s.isText && l.some((h) => {
        let m = this.marks[h.type.name];
        return m && m.expelEnclosingWhitespace && (a == e.childCount - 1 || !h.isInSet(e.child(a + 1).marks));
      })) {
        let [h, m, g] = /^(.*?)(\s*)$/m.exec(s.text);
        g && (r = g, s = m ? s.withText(m) : null, s || (l = t));
      }
      let u = l.length ? l[l.length - 1] : null, d = u && this.marks[u.type.name].escape === !1, f = l.length - (d ? 1 : 0);
      e:
        for (let h = 0; h < f; h++) {
          let m = l[h];
          if (!this.marks[m.type.name].mixable)
            break;
          for (let g = 0; g < t.length; g++) {
            let v = t[g];
            if (!this.marks[v.type.name].mixable)
              break;
            if (m.eq(v)) {
              h > g ? l = l.slice(0, g).concat(m).concat(l.slice(g, h)).concat(l.slice(h + 1, f)) : g > h && (l = l.slice(0, h).concat(l.slice(h + 1, g)).concat(m).concat(l.slice(g, f)));
              continue e;
            }
          }
        }
      let p = 0;
      for (; p < Math.min(t.length, f) && l[p].eq(t[p]); )
        ++p;
      for (; p < t.length; )
        this.text(this.markString(t.pop(), !1, e, a), !1);
      if (c && this.text(c), s) {
        for (; t.length < f; ) {
          let h = l[t.length];
          t.push(h), this.text(this.markString(h, !0, e, a), !1), this.atBlockStart = !1;
        }
        d && s.isText ? this.text(this.markString(u, !0, e, a) + s.text + this.markString(u, !1, e, a + 1), !1) : this.render(s, e, a), this.atBlockStart = !1;
      }
      s != null && s.isText && s.nodeSize > 0 && (this.atBlockStart = !1);
    };
    e.forEach(o), o(null, 0, e.childCount), this.atBlockStart = !1;
  }
  /**
  Render a node's content as a list. `delim` should be the extra
  indentation added to all lines except the first in an item,
  `firstDelim` is a function going from an item index to a
  delimiter for the first line of the item.
  */
  renderList(e, t, r) {
    this.closed && this.closed.type == e.type ? this.flushClose(3) : this.inTightList && this.flushClose(1);
    let o = typeof e.attrs.tight < "u" ? e.attrs.tight : this.options.tightLists, s = this.inTightList;
    this.inTightList = o, e.forEach((i, a, l) => {
      l && o && this.flushClose(1), this.wrapBlock(t, r(l), e, () => this.render(i, e, l));
    }), this.inTightList = s;
  }
  /**
  Escape the given string so that it can safely appear in Markdown
  content. If `startOfLine` is true, also escape characters that
  have special meaning only at the start of the line.
  */
  esc(e, t = !1) {
    return e = e.replace(/[`*\\~\[\]_]/g, (r, o) => r == "_" && o > 0 && o + 1 < e.length && e[o - 1].match(/\w/) && e[o + 1].match(/\w/) ? r : "\\" + r), t && (e = e.replace(/^[\-*+>]/, "\\$&").replace(/^(\s*)(#{1,6})(\s|$)/, "$1\\$2$3").replace(/^(\s*\d+)\.\s/, "$1\\. ")), this.options.escapeExtraCharacters && (e = e.replace(this.options.escapeExtraCharacters, "\\$&")), e;
  }
  /**
  @internal
  */
  quote(e) {
    let t = e.indexOf('"') == -1 ? '""' : e.indexOf("'") == -1 ? "''" : "()";
    return t[0] + e + t[1];
  }
  /**
  Repeat the given string `n` times.
  */
  repeat(e, t) {
    let r = "";
    for (let o = 0; o < t; o++)
      r += e;
    return r;
  }
  /**
  Get the markdown string for a given opening or closing mark.
  */
  markString(e, t, r, o) {
    let s = this.marks[e.type.name], i = t ? s.open : s.close;
    return typeof i == "string" ? i : i(this, e, r, o);
  }
  /**
  Get leading and trailing whitespace from a string. Values of
  leading or trailing property of the return object will be undefined
  if there is no match.
  */
  getEnclosingWhitespace(e) {
    return {
      leading: (e.match(/^(\s+)/) || [void 0])[0],
      trailing: (e.match(/(\s+)$/) || [void 0])[0]
    };
  }
};
var pl = !0, Gh = !1, Jh = !1, Rne = function(n, e) {
  e && (pl = !e.enabled, Gh = !!e.label, Jh = !!e.labelAfter), n.core.ruler.after("inline", "github-task-lists", function(t) {
    for (var r = t.tokens, o = 2; o < r.length; o++)
      Pne(r, o) && (Bne(r[o], t.Token), of(r[o - 2], "class", "task-list-item" + (pl ? "" : " enabled")), of(r[Ine(r, o - 2)], "class", "contains-task-list"));
  });
};
function of(n, e, t) {
  var r = n.attrIndex(e), o = [e, t];
  r < 0 ? n.attrPush(o) : n.attrs[r] = o;
}
function Ine(n, e) {
  for (var t = n[e].level - 1, r = e - 1; r >= 0; r--)
    if (n[r].level === t)
      return r;
  return -1;
}
function Pne(n, e) {
  return Hne(n[e]) && Vne(n[e - 1]) && jne(n[e - 2]) && Une(n[e]);
}
function Bne(n, e) {
  if (n.children.unshift(Fne(n, e)), n.children[1].content = n.children[1].content.slice(3), n.content = n.content.slice(3), Gh)
    if (Jh) {
      n.children.pop();
      var t = "task-item-" + Math.ceil(Math.random() * (1e4 * 1e3) - 1e3);
      n.children[0].content = n.children[0].content.slice(0, -1) + ' id="' + t + '">', n.children.push($ne(n.content, t, e));
    } else
      n.children.unshift(qne(e)), n.children.push(zne(e));
}
function Fne(n, e) {
  var t = new e("html_inline", "", 0), r = pl ? ' disabled="" ' : "";
  return n.content.indexOf("[ ] ") === 0 ? t.content = '<input class="task-list-item-checkbox"' + r + 'type="checkbox">' : (n.content.indexOf("[x] ") === 0 || n.content.indexOf("[X] ") === 0) && (t.content = '<input class="task-list-item-checkbox" checked=""' + r + 'type="checkbox">'), t;
}
function qne(n) {
  var e = new n("html_inline", "", 0);
  return e.content = "<label>", e;
}
function zne(n) {
  var e = new n("html_inline", "", 0);
  return e.content = "</label>", e;
}
function $ne(n, e, t) {
  var r = new t("html_inline", "", 0);
  return r.content = '<label class="task-list-item-label" for="' + e + '">' + n + "</label>", r.attrs = [{ for: e }], r;
}
function Hne(n) {
  return n.type === "inline";
}
function Vne(n) {
  return n.type === "paragraph_open";
}
function jne(n) {
  return n.type === "list_item_open";
}
function Une(n) {
  return n.content.indexOf("[ ] ") === 0 || n.content.indexOf("[x] ") === 0 || n.content.indexOf("[X] ") === 0;
}
const Wne = /* @__PURE__ */ Eh(Rne);
function sf(n, e) {
  var t = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(n);
    e && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    })), t.push.apply(t, r);
  }
  return t;
}
function ze(n) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? sf(Object(t), !0).forEach(function(r) {
      Ys(n, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : sf(Object(t)).forEach(function(r) {
      Object.defineProperty(n, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return n;
}
function vc(n, e) {
  if (!(n instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function af(n, e) {
  for (var t = 0; t < e.length; t++) {
    var r = e[t];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(n, Zh(r.key), r);
  }
}
function bc(n, e, t) {
  return e && af(n.prototype, e), t && af(n, t), Object.defineProperty(n, "prototype", {
    writable: !1
  }), n;
}
function Ys(n, e, t) {
  return e = Zh(e), e in n ? Object.defineProperty(n, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : n[e] = t, n;
}
function Kne(n, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Super expression must either be null or a function");
  n.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: n,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(n, "prototype", {
    writable: !1
  }), e && hl(n, e);
}
function Un(n) {
  return Un = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, Un(n);
}
function hl(n, e) {
  return hl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, hl(n, e);
}
function Gne() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function Jne(n) {
  if (n === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return n;
}
function Zne(n, e) {
  if (e && (typeof e == "object" || typeof e == "function"))
    return e;
  if (e !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Jne(n);
}
function Yne(n) {
  var e = Gne();
  return function() {
    var r = Un(n), o;
    if (e) {
      var s = Un(this).constructor;
      o = Reflect.construct(r, arguments, s);
    } else
      o = r.apply(this, arguments);
    return Zne(this, o);
  };
}
function Qne(n, e) {
  for (; !Object.prototype.hasOwnProperty.call(n, e) && (n = Un(n), n !== null); )
    ;
  return n;
}
function uo() {
  return typeof Reflect < "u" && Reflect.get ? uo = Reflect.get.bind() : uo = function(e, t, r) {
    var o = Qne(e, t);
    if (o) {
      var s = Object.getOwnPropertyDescriptor(o, t);
      return s.get ? s.get.call(arguments.length < 3 ? e : r) : s.value;
    }
  }, uo.apply(this, arguments);
}
function kc(n) {
  return Xne(n) || ere(n) || tre(n) || nre();
}
function Xne(n) {
  if (Array.isArray(n))
    return ml(n);
}
function ere(n) {
  if (typeof Symbol < "u" && n[Symbol.iterator] != null || n["@@iterator"] != null)
    return Array.from(n);
}
function tre(n, e) {
  if (n) {
    if (typeof n == "string")
      return ml(n, e);
    var t = Object.prototype.toString.call(n).slice(8, -1);
    if (t === "Object" && n.constructor && (t = n.constructor.name), t === "Map" || t === "Set")
      return Array.from(n);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))
      return ml(n, e);
  }
}
function ml(n, e) {
  (e == null || e > n.length) && (e = n.length);
  for (var t = 0, r = new Array(e); t < e; t++)
    r[t] = n[t];
  return r;
}
function nre() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function rre(n, e) {
  if (typeof n != "object" || n === null)
    return n;
  var t = n[Symbol.toPrimitive];
  if (t !== void 0) {
    var r = t.call(n, e || "default");
    if (typeof r != "object")
      return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(n);
}
function Zh(n) {
  var e = rre(n, "string");
  return typeof e == "symbol" ? e : String(e);
}
var ore = ue.create({
  name: "markdownTightLists",
  addOptions: function() {
    return {
      tight: !0,
      tightClass: "tight",
      listTypes: ["bulletList", "orderedList"]
    };
  },
  addGlobalAttributes: function() {
    var e = this;
    return [{
      types: this.options.listTypes,
      attributes: {
        tight: {
          default: this.options.tight,
          parseHTML: function(r) {
            return r.getAttribute("data-tight") === "true" || !r.querySelector("p");
          },
          renderHTML: function(r) {
            return {
              class: r.tight ? e.options.tightClass : null,
              "data-tight": r.tight ? "true" : null
            };
          }
        }
      }
    }];
  },
  addCommands: function() {
    var e = this;
    return {
      toggleTight: function() {
        var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
        return function(o) {
          var s = o.editor, i = o.commands;
          function a(l) {
            if (!s.isActive(l))
              return !1;
            var c = s.getAttributes(l);
            return i.updateAttributes(l, {
              tight: r ?? !(c != null && c.tight)
            });
          }
          return e.options.listTypes.some(function(l) {
            return a(l);
          });
        };
      }
    };
  }
}), lf = yc();
function Yh(n, e) {
  lf.inline.State.prototype.scanDelims.call({
    src: n,
    posMax: n.length
  });
  var t = new lf.inline.State(n, null, null, []);
  return t.scanDelims(e, !0);
}
function Qh(n, e, t, r) {
  var o = n.substring(0, t) + n.substring(t + e.length);
  return o = o.substring(0, t + r) + e + o.substring(t + r), o;
}
function sre(n, e, t, r) {
  for (var o = t, s = n; o < r && !Yh(s, o).can_open; )
    s = Qh(s, e, o, 1), o++;
  return {
    text: s,
    from: o,
    to: r
  };
}
function ire(n, e, t, r) {
  for (var o = r, s = n; o > t && !Yh(s, o).can_close; )
    s = Qh(s, e, o, -1), o--;
  return {
    text: s,
    from: t,
    to: o
  };
}
function are(n, e, t, r) {
  var o = {
    text: n,
    from: t,
    to: r
  };
  return o = sre(o.text, e, o.from, o.to), o = ire(o.text, e, o.from, o.to), o.to - o.from < e.length + 1 && (o.text = o.text.substring(0, o.from) + o.text.substring(o.to + e.length)), o.text;
}
var lre = /* @__PURE__ */ function(n) {
  Kne(t, n);
  var e = Yne(t);
  function t(r, o, s) {
    var i;
    return vc(this, t), i = e.call(this, r, o, s ?? {}), i.inlines = [], i;
  }
  return bc(t, [{
    key: "render",
    value: function(o, s, i) {
      uo(Un(t.prototype), "render", this).call(this, o, s, i);
      var a = this.inlines[this.inlines.length - 1];
      if (a != null && a.start && a !== null && a !== void 0 && a.end) {
        var l = this.normalizeInline(a), c = l.delimiter, u = l.start, d = l.end;
        this.out = are(this.out, c, u, d), this.inlines.pop();
      }
    }
  }, {
    key: "markString",
    value: function(o, s, i, a) {
      var l = this.marks[o.type.name];
      if (l.expelEnclosingWhitespace)
        if (s)
          this.inlines.push({
            start: this.out.length,
            delimiter: l.open
          });
        else {
          var c = this.inlines.pop();
          this.inlines.push(ze(ze({}, c), {}, {
            end: this.out.length
          }));
        }
      return uo(Un(t.prototype), "markString", this).call(this, o, s, i, a);
    }
  }, {
    key: "normalizeInline",
    value: function(o) {
      var s = o.start;
      for (o.end; this.out.charAt(s).match(/\s/); )
        s++;
      return ze(ze({}, o), {}, {
        start: s
      });
    }
  }]), t;
}(Kh), Xh = de.create({
  name: "markdownHTMLMark",
  /**
   * @return {{markdown: MarkdownMarkSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: {
          open: function(t, r) {
            var o, s;
            return this.editor.storage.markdown.options.html ? (o = (s = cf(r)) === null || s === void 0 ? void 0 : s[0]) !== null && o !== void 0 ? o : "" : (console.warn('Tiptap Markdown: "'.concat(r.type.name, '" mark is only available in html mode')), "");
          },
          close: function(t, r) {
            var o, s;
            return this.editor.storage.markdown.options.html && (o = (s = cf(r)) === null || s === void 0 ? void 0 : s[1]) !== null && o !== void 0 ? o : "";
          }
        },
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
});
function cf(n) {
  var e = n.type.schema, t = e.text(" ", [n]), r = Hl(M.from(t), e), o = r.match(/^(<.*?>) (<\/.*?>)$/);
  return o ? [o[1], o[2]] : null;
}
function xc(n) {
  var e = "<body>".concat(n, "</body>");
  return new window.DOMParser().parseFromString(e, "text/html").body;
}
function cre(n) {
  return n == null ? void 0 : n.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function ure(n) {
  for (var e = n.parentElement, t = e.cloneNode(); e.firstChild && e.firstChild !== n; )
    t.appendChild(e.firstChild);
  t.childNodes.length > 0 && e.parentElement.insertBefore(t, e), e.parentElement.insertBefore(n, e), e.childNodes.length === 0 && e.remove();
}
function dre(n) {
  for (var e = n.parentNode; n.firstChild; )
    e.insertBefore(n.firstChild, n);
  e.removeChild(n);
}
var wc = X.create({
  name: "markdownHTMLNode",
  addStorage: function() {
    return {
      markdown: {
        serialize: function(t, r, o) {
          this.editor.storage.markdown.options.html ? t.write(fre(r, o)) : (console.warn('Tiptap Markdown: "'.concat(r.type.name, '" node is only available in html mode')), t.write("[".concat(r.type.name, "]"))), r.isBlock && t.closeBlock(r);
        },
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
});
function fre(n, e) {
  var t = n.type.schema, r = Hl(M.from(n), t);
  return n.isBlock && e.type.name === t.topNodeType.name ? pre(r) : r;
}
function pre(n) {
  var e = xc(n), t = e.firstElementChild;
  return t.innerHTML = t.innerHTML.trim() ? `
`.concat(t.innerHTML, `
`) : `
`, t.outerHTML;
}
var hre = X.create({
  name: "blockquote"
}), mre = hre.extend({
  /**
   * @return {{markdown: MarkdownNodeSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: nt.nodes.blockquote,
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
}), gre = X.create({
  name: "bulletList"
}), em = gre.extend({
  /**
   * @return {{markdown: MarkdownNodeSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: function(t, r) {
          var o = this;
          return t.renderList(r, "  ", function() {
            return (o.editor.storage.markdown.options.bulletListMarker || "-") + " ";
          });
        },
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
}), yre = X.create({
  name: "codeBlock"
}), vre = yre.extend({
  /**
   * @return {{markdown: MarkdownNodeSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: function(t, r) {
          t.write("```" + (r.attrs.language || "") + `
`), t.text(r.textContent, !1), t.ensureNewLine(), t.write("```"), t.closeBlock(r);
        },
        parse: {
          setup: function(t) {
            var r;
            t.set({
              langPrefix: (r = this.options.languageClassPrefix) !== null && r !== void 0 ? r : "language-"
            });
          },
          updateDOM: function(t) {
            t.innerHTML = t.innerHTML.replace(/\n<\/code><\/pre>/g, "</code></pre>");
          }
        }
      }
    };
  }
}), bre = X.create({
  name: "hardBreak"
}), tm = bre.extend({
  /**
   * @return {{markdown: MarkdownNodeSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: nt.nodes.hard_break,
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
}), kre = X.create({
  name: "heading"
}), xre = kre.extend({
  /**
   * @return {{markdown: MarkdownNodeSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: nt.nodes.heading,
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
}), wre = X.create({
  name: "horizontalRule"
}), Sre = wre.extend({
  /**
   * @return {{markdown: MarkdownNodeSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: nt.nodes.horizontal_rule,
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
}), Cre = X.create({
  name: "image"
}), Ere = Cre.extend({
  /**
   * @return {{markdown: MarkdownNodeSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: nt.nodes.image,
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
}), Are = X.create({
  name: "listItem"
}), Tre = Are.extend({
  /**
   * @return {{markdown: MarkdownNodeSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: nt.nodes.list_item,
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
}), Mre = X.create({
  name: "orderedList"
}), Ore = Mre.extend({
  /**
   * @return {{markdown: MarkdownNodeSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: nt.nodes.ordered_list,
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
}), Dre = X.create({
  name: "paragraph"
}), _re = Dre.extend({
  /**
   * @return {{markdown: MarkdownNodeSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: nt.nodes.paragraph,
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
});
function Ma(n) {
  var e, t;
  return (e = n == null || (t = n.content) === null || t === void 0 ? void 0 : t.content) !== null && e !== void 0 ? e : [];
}
var Nre = X.create({
  name: "table"
}), Lre = Nre.extend({
  /**
   * @return {{markdown: MarkdownNodeSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: function(t, r, o) {
          if (!Rre(r)) {
            wc.storage.markdown.serialize.call(this, t, r, o);
            return;
          }
          r.forEach(function(s, i, a) {
            if (t.write("| "), s.forEach(function(c, u, d) {
              d && t.write(" | ");
              var f = c.firstChild;
              f.textContent.trim() && t.renderInline(f);
            }), t.write(" |"), t.ensureNewLine(), !a) {
              var l = Array.from({
                length: s.childCount
              }).map(function() {
                return "---";
              }).join(" | ");
              t.write("| ".concat(l, " |")), t.ensureNewLine();
            }
          }), t.closeBlock(r);
        },
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
});
function uf(n) {
  return n.attrs.colspan > 1 || n.attrs.rowspan > 1;
}
function Rre(n) {
  var e = Ma(n), t = e[0], r = e.slice(1);
  return !(Ma(t).some(function(o) {
    return o.type.name !== "tableHeader" || uf(o);
  }) || r.some(function(o) {
    return Ma(o).some(function(s) {
      return s.type.name === "tableHeader" || uf(s);
    });
  }));
}
var Ire = X.create({
  name: "taskItem"
}), Pre = Ire.extend({
  /**
   * @return {{markdown: MarkdownNodeSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: function(t, r) {
          var o = r.attrs.checked ? "[x]" : "[ ]";
          t.write("".concat(o, " ")), t.renderContent(r);
        },
        parse: {
          updateDOM: function(t) {
            kc(t.querySelectorAll(".task-list-item")).forEach(function(r) {
              var o = r.querySelector("input");
              r.setAttribute("data-type", "taskItem"), o && (r.setAttribute("data-checked", o.checked), o.remove());
            });
          }
        }
      }
    };
  }
}), Bre = X.create({
  name: "taskList"
}), Fre = Bre.extend({
  /**
   * @return {{markdown: MarkdownNodeSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: em.storage.markdown.serialize,
        parse: {
          setup: function(t) {
            t.use(Wne);
          },
          updateDOM: function(t) {
            kc(t.querySelectorAll(".contains-task-list")).forEach(function(r) {
              r.setAttribute("data-type", "taskList");
            });
          }
        }
      }
    };
  }
}), qre = X.create({
  name: "text"
}), zre = qre.extend({
  /**
   * @return {{markdown: MarkdownNodeSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: function(t, r) {
          t.text(cre(r.text));
        },
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
}), $re = de.create({
  name: "bold"
}), Hre = $re.extend({
  /**
   * @return {{markdown: MarkdownMarkSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: nt.marks.strong,
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
}), Vre = de.create({
  name: "code"
}), jre = Vre.extend({
  /**
   * @return {{markdown: MarkdownMarkSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: nt.marks.code,
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
}), Ure = de.create({
  name: "italic"
}), Wre = Ure.extend({
  /**
   * @return {{markdown: MarkdownMarkSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: nt.marks.em,
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
}), Kre = de.create({
  name: "link"
}), Gre = Kre.extend({
  /**
   * @return {{markdown: MarkdownMarkSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: nt.marks.link,
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
}), Jre = de.create({
  name: "strike"
}), Zre = Jre.extend({
  /**
   * @return {{markdown: MarkdownMarkSpec}}
   */
  addStorage: function() {
    return {
      markdown: {
        serialize: {
          open: "~~",
          close: "~~",
          expelEnclosingWhitespace: !0
        },
        parse: {
          // handled by markdown-it
        }
      }
    };
  }
}), Yre = [mre, em, vre, tm, xre, Sre, wc, Ere, Tre, Ore, _re, Lre, Pre, Fre, zre, Hre, jre, Xh, Wre, Gre, Zre];
function Qs(n) {
  var e, t, r = (e = n.storage) === null || e === void 0 ? void 0 : e.markdown, o = (t = Yre.find(function(s) {
    return s.name === n.name;
  })) === null || t === void 0 ? void 0 : t.storage.markdown;
  return r || o ? ze(ze({}, o), r) : null;
}
var Qre = /* @__PURE__ */ function() {
  function n(e) {
    vc(this, n), Ys(this, "editor", null), this.editor = e;
  }
  return bc(n, [{
    key: "serialize",
    value: function(t) {
      var r = new lre(this.nodes, this.marks, {
        hardBreakNodeName: tm.name
      });
      return r.renderContent(t), r.out;
    }
  }, {
    key: "nodes",
    get: function() {
      var t = this, r;
      return ze(ze({}, Object.fromEntries(Object.keys(this.editor.schema.nodes).map(function(o) {
        return [o, t.serializeNode(wc)];
      }))), Object.fromEntries((r = this.editor.extensionManager.extensions.filter(function(o) {
        return o.type === "node" && t.serializeNode(o);
      }).map(function(o) {
        return [o.name, t.serializeNode(o)];
      })) !== null && r !== void 0 ? r : []));
    }
  }, {
    key: "marks",
    get: function() {
      var t = this, r;
      return ze(ze({}, Object.fromEntries(Object.keys(this.editor.schema.marks).map(function(o) {
        return [o, t.serializeMark(Xh)];
      }))), Object.fromEntries((r = this.editor.extensionManager.extensions.filter(function(o) {
        return o.type === "mark" && t.serializeMark(o);
      }).map(function(o) {
        return [o.name, t.serializeMark(o)];
      })) !== null && r !== void 0 ? r : []));
    }
  }, {
    key: "serializeNode",
    value: function(t) {
      var r, o;
      return (r = Qs(t)) === null || r === void 0 || (o = r.serialize) === null || o === void 0 ? void 0 : o.bind({
        editor: this.editor,
        options: t.options
      });
    }
  }, {
    key: "serializeMark",
    value: function(t) {
      var r, o = (r = Qs(t)) === null || r === void 0 ? void 0 : r.serialize;
      return o ? ze(ze({}, o), {}, {
        open: typeof o.open == "function" ? o.open.bind({
          editor: this.editor,
          options: t.options
        }) : o.open,
        close: typeof o.close == "function" ? o.close.bind({
          editor: this.editor,
          options: t.options
        }) : o.close
      }) : null;
    }
  }]), n;
}(), Xre = /* @__PURE__ */ function() {
  function n(e, t) {
    var r = t.html, o = t.linkify, s = t.breaks;
    vc(this, n), Ys(this, "editor", null), Ys(this, "md", null), this.editor = e, this.md = yc({
      html: r,
      linkify: o,
      breaks: s
    });
  }
  return bc(n, [{
    key: "parse",
    value: function(t) {
      var r = this, o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, s = o.inline;
      if (typeof t == "string") {
        var i = this.md;
        this.editor.extensionManager.extensions.forEach(function(c) {
          var u, d, f;
          return (u = Qs(c)) === null || u === void 0 || (d = u.parse) === null || d === void 0 || (f = d.setup) === null || f === void 0 ? void 0 : f.call({
            editor: r.editor,
            options: c.options
          }, i);
        });
        var a = i.render(t), l = xc(a);
        return this.editor.extensionManager.extensions.forEach(function(c) {
          var u, d, f;
          return (u = Qs(c)) === null || u === void 0 || (d = u.parse) === null || d === void 0 || (f = d.updateDOM) === null || f === void 0 ? void 0 : f.call({
            editor: r.editor,
            options: c.options
          }, l);
        }), this.normalizeDOM(l, {
          inline: s,
          content: t
        }), l.innerHTML;
      }
      return t;
    }
  }, {
    key: "normalizeDOM",
    value: function(t) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o = r.inline, s = r.content;
      return this.normalizeBlocks(t), o && this.normalizeInline(t, s), t;
    }
  }, {
    key: "normalizeBlocks",
    value: function(t) {
      var r = Object.values(this.editor.schema.nodes).filter(function(s) {
        return s.isBlock;
      }), o = r.map(function(s) {
        var i;
        return (i = s.spec.parseDOM) === null || i === void 0 ? void 0 : i.map(function(a) {
          return a.tag;
        });
      }).flat().filter(Boolean).join(",");
      o && kc(t.querySelectorAll(o)).forEach(function(s) {
        s.parentElement.matches("p") && ure(s);
      });
    }
  }, {
    key: "normalizeInline",
    value: function(t, r) {
      var o;
      if ((o = t.firstElementChild) !== null && o !== void 0 && o.matches("p")) {
        var s, i, a, l, c = t.firstElementChild, u = c.nextSibling, d = c.nextElementSibling, f = (s = (i = r.match(/^\s+/)) === null || i === void 0 ? void 0 : i[0]) !== null && s !== void 0 ? s : "", p = d ? "" : (a = (l = r.match(/\s+$/)) === null || l === void 0 ? void 0 : l[0]) !== null && a !== void 0 ? a : "";
        if ((u == null ? void 0 : u.nodeType) === Node.TEXT_NODE && (u.textContent = u.textContent.replace(/^\n/, "")), r.match(/^\n\n/)) {
          c.innerHTML = "".concat(c.innerHTML).concat(p);
          return;
        }
        dre(c), t.innerHTML = "".concat(f).concat(t.innerHTML).concat(p);
      }
    }
  }]), n;
}(), eoe = ue.create({
  name: "markdownClipboard",
  addOptions: function() {
    return {
      transformPastedText: !1,
      transformCopiedText: !1
    };
  },
  addProseMirrorPlugins: function() {
    var e = this;
    return [new fe({
      key: new Te("markdownClipboard"),
      props: {
        clipboardTextParser: function(r, o, s) {
          if (s || !e.options.transformPastedText)
            return null;
          var i = e.editor.storage.markdown.parser.parse(r, {
            inline: !0
          });
          return Fn.fromSchema(e.editor.schema).parseSlice(xc(i), {
            preserveWhitespace: !0
          });
        },
        /**
         * @param {import('prosemirror-model').Slice} slice
         */
        clipboardTextSerializer: function(r) {
          return e.options.transformCopiedText ? e.editor.storage.markdown.serializer.serialize(r.content) : null;
        }
      }
    })];
  }
}), toe = ue.create({
  name: "markdown",
  priority: 50,
  addOptions: function() {
    return {
      html: !0,
      tightLists: !0,
      tightListClass: "tight",
      bulletListMarker: "-",
      linkify: !1,
      breaks: !1,
      transformPastedText: !1,
      transformCopiedText: !1
    };
  },
  addCommands: function() {
    var e = zp.Commands.config.addCommands();
    return {
      setContent: function(r, o, s) {
        return function(i) {
          return e.setContent(i.editor.storage.markdown.parser.parse(r), o, s)(i);
        };
      },
      insertContentAt: function(r, o, s) {
        return function(i) {
          return e.insertContentAt(r, i.editor.storage.markdown.parser.parse(o, {
            inline: !0
          }), s)(i);
        };
      }
    };
  },
  onBeforeCreate: function() {
    var e = this;
    this.editor.storage.markdown = {
      options: ze({}, this.options),
      parser: new Xre(this.editor, this.options),
      serializer: new Qre(this.editor),
      getMarkdown: function() {
        return e.editor.storage.markdown.serializer.serialize(e.editor.state.doc);
      }
    }, this.editor.options.initialContent = this.editor.options.content, this.editor.options.content = this.editor.storage.markdown.parser.parse(this.editor.options.content);
  },
  onCreate: function() {
    this.editor.options.content = this.editor.options.initialContent, delete this.editor.options.initialContent;
  },
  addStorage: function() {
    return {
      /// storage will be defined in onBeforeCreate() to prevent initial object overriding
    };
  },
  addExtensions: function() {
    return [ore.configure({
      tight: this.options.tightLists,
      tightClass: this.options.tightListClass
    }), eoe.configure({
      transformPastedText: this.options.transformPastedText,
      transformCopiedText: this.options.transformCopiedText
    })];
  }
});
const noe = /(?:^|\s)((?:==)((?:[^~=]+))(?:==))$/, roe = /(?:^|\s)((?:==)((?:[^~=]+))(?:==))/g, ooe = de.create({
  name: "highlight",
  addOptions() {
    return {
      multicolor: !1,
      HTMLAttributes: {}
    };
  },
  addAttributes() {
    return this.options.multicolor ? {
      color: {
        default: null,
        parseHTML: (n) => n.getAttribute("data-color") || n.style.backgroundColor,
        renderHTML: (n) => n.color ? {
          "data-color": n.color,
          style: `background-color: ${n.color}; color: inherit`
        } : {}
      }
    } : {};
  },
  parseHTML() {
    return [
      {
        tag: "mark"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["mark", te(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setHighlight: (n) => ({ commands: e }) => e.setMark(this.name, n),
      toggleHighlight: (n) => ({ commands: e }) => e.toggleMark(this.name, n),
      unsetHighlight: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-h": () => this.editor.commands.toggleHighlight()
    };
  },
  addInputRules() {
    return [
      $n({
        find: noe,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Hn({
        find: roe,
        type: this.type
      })
    ];
  }
});
function soe(n) {
  var e;
  const { char: t, allowSpaces: r, allowedPrefixes: o, startOfLine: s, $position: i } = n, a = Mb(t), l = new RegExp(`\\s${a}$`), c = s ? "^" : "", u = r ? new RegExp(`${c}${a}.*?(?=\\s${a}|$)`, "gm") : new RegExp(`${c}(?:^)?${a}[^\\s${a}]*`, "gm"), d = ((e = i.nodeBefore) === null || e === void 0 ? void 0 : e.isText) && i.nodeBefore.text;
  if (!d)
    return null;
  const f = i.pos - d.length, p = Array.from(d.matchAll(u)).pop();
  if (!p || p.input === void 0 || p.index === void 0)
    return null;
  const h = p.input.slice(Math.max(0, p.index - 1), p.index), m = new RegExp(`^[${o == null ? void 0 : o.join("")}\0]?$`).test(h);
  if (o !== null && !m)
    return null;
  const g = f + p.index;
  let v = g + p[0].length;
  return r && l.test(d.slice(v - 1, v + 1)) && (p[0] += " ", v += 1), g < i.pos && v >= i.pos ? {
    range: {
      from: g,
      to: v
    },
    query: p[0].slice(t.length),
    text: p[0]
  } : null;
}
const ioe = new Te("suggestion");
function aoe({ pluginKey: n = ioe, editor: e, char: t = "@", allowSpaces: r = !1, allowedPrefixes: o = [" "], startOfLine: s = !1, decorationTag: i = "span", decorationClass: a = "suggestion", command: l = () => null, items: c = () => [], render: u = () => ({}), allow: d = () => !0 }) {
  let f;
  const p = u == null ? void 0 : u(), h = new fe({
    key: n,
    view() {
      return {
        update: async (m, g) => {
          var v, b, x, y, w, k, S;
          const E = (v = this.key) === null || v === void 0 ? void 0 : v.getState(g), T = (b = this.key) === null || b === void 0 ? void 0 : b.getState(m.state), D = E.active && T.active && E.range.from !== T.range.from, _ = !E.active && T.active, F = E.active && !T.active, P = !_ && !F && E.query !== T.query, A = _ || D, q = P && !D, L = F || D;
          if (!A && !q && !L)
            return;
          const z = L && !A ? E : T, K = m.dom.querySelector(`[data-decoration-id="${z.decorationId}"]`);
          f = {
            editor: e,
            range: z.range,
            query: z.query,
            text: z.text,
            items: [],
            command: (ne) => {
              l({
                editor: e,
                range: z.range,
                props: ne
              });
            },
            decorationNode: K,
            // virtual node for popper.js or tippy.js
            // this can be used for building popups without a DOM node
            clientRect: K ? () => {
              var ne;
              const { decorationId: he } = (ne = this.key) === null || ne === void 0 ? void 0 : ne.getState(e.state), Se = m.dom.querySelector(`[data-decoration-id="${he}"]`);
              return (Se == null ? void 0 : Se.getBoundingClientRect()) || null;
            } : null
          }, A && ((x = p == null ? void 0 : p.onBeforeStart) === null || x === void 0 || x.call(p, f)), q && ((y = p == null ? void 0 : p.onBeforeUpdate) === null || y === void 0 || y.call(p, f)), (q || A) && (f.items = await c({
            editor: e,
            query: z.query
          })), L && ((w = p == null ? void 0 : p.onExit) === null || w === void 0 || w.call(p, f)), q && ((k = p == null ? void 0 : p.onUpdate) === null || k === void 0 || k.call(p, f)), A && ((S = p == null ? void 0 : p.onStart) === null || S === void 0 || S.call(p, f));
        },
        destroy: () => {
          var m;
          f && ((m = p == null ? void 0 : p.onExit) === null || m === void 0 || m.call(p, f));
        }
      };
    },
    state: {
      // Initialize the plugin's internal state.
      init() {
        return {
          active: !1,
          range: {
            from: 0,
            to: 0
          },
          query: null,
          text: null,
          composing: !1
        };
      },
      // Apply changes to the plugin state from a view transaction.
      apply(m, g, v, b) {
        const { isEditable: x } = e, { composing: y } = e.view, { selection: w } = m, { empty: k, from: S } = w, E = { ...g };
        if (E.composing = y, x && (k || e.view.composing)) {
          (S < g.range.from || S > g.range.to) && !y && !g.composing && (E.active = !1);
          const T = soe({
            char: t,
            allowSpaces: r,
            allowedPrefixes: o,
            startOfLine: s,
            $position: w.$from
          }), D = `id_${Math.floor(Math.random() * 4294967295)}`;
          T && d({ editor: e, state: b, range: T.range }) ? (E.active = !0, E.decorationId = g.decorationId ? g.decorationId : D, E.range = T.range, E.query = T.query, E.text = T.text) : E.active = !1;
        } else
          E.active = !1;
        return E.active || (E.decorationId = null, E.range = { from: 0, to: 0 }, E.query = null, E.text = null), E;
      }
    },
    props: {
      // Call the keydown hook if suggestion is active.
      handleKeyDown(m, g) {
        var v;
        const { active: b, range: x } = h.getState(m.state);
        return b && ((v = p == null ? void 0 : p.onKeyDown) === null || v === void 0 ? void 0 : v.call(p, { view: m, event: g, range: x })) || !1;
      },
      // Setup decorator on the currently active suggestion.
      decorations(m) {
        const { active: g, range: v, decorationId: b } = h.getState(m);
        return g ? ce.create(m.doc, [
          Ie.inline(v.from, v.to, {
            nodeName: i,
            class: a,
            "data-decoration-id": b
          })
        ]) : null;
      }
    }
  });
  return h;
}
var cs = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
const loe = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), be = (n, e) => ({ size: t, strokeWidth: r = 2, absoluteStrokeWidth: o, color: s, ...i }, { attrs: a, slots: l }) => se(
  "svg",
  {
    ...cs,
    width: t || cs.width,
    height: t || cs.height,
    stroke: s || cs.stroke,
    "stroke-width": o ? Number(r) * 24 / Number(t) : r,
    ...a,
    class: ["lucide", `lucide-${loe(n)}`, (a == null ? void 0 : a.class) || ""],
    ...i
  },
  [
    ...e.map((c) => se(...c)),
    ...l.default ? [l.default()] : []
  ]
), coe = be("BoldIcon", [
  ["path", { d: "M14 12a4 4 0 0 0 0-8H6v8", key: "v2sylx" }],
  ["path", { d: "M15 20a4 4 0 0 0 0-8H6v8Z", key: "1ef5ya" }]
]), nm = be("CheckSquareIcon", [
  ["polyline", { points: "9 11 12 14 22 4", key: "19ybtz" }],
  [
    "path",
    {
      d: "M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
      key: "1jnkn4"
    }
  ]
]), Xs = be("CheckIcon", [
  ["polyline", { points: "20 6 9 17 4 12", key: "10jjfj" }]
]), rm = be("ChevronDownIcon", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]), Sc = be("CodeIcon", [
  ["polyline", { points: "16 18 22 12 16 6", key: "z7tu5w" }],
  ["polyline", { points: "8 6 2 12 8 18", key: "1eg1df" }]
]), om = be("Heading1Icon", [
  ["path", { d: "M4 12h8", key: "17cfdx" }],
  ["path", { d: "M4 18V6", key: "1rz3zl" }],
  ["path", { d: "M12 18V6", key: "zqpxq5" }],
  ["path", { d: "m17 12 3-2v8", key: "1hhhft" }]
]), sm = be("Heading2Icon", [
  ["path", { d: "M4 12h8", key: "17cfdx" }],
  ["path", { d: "M4 18V6", key: "1rz3zl" }],
  ["path", { d: "M12 18V6", key: "zqpxq5" }],
  ["path", { d: "M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1", key: "9jr5yi" }]
]), im = be("Heading3Icon", [
  ["path", { d: "M4 12h8", key: "17cfdx" }],
  ["path", { d: "M4 18V6", key: "1rz3zl" }],
  ["path", { d: "M12 18V6", key: "zqpxq5" }],
  [
    "path",
    { d: "M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2", key: "68ncm8" }
  ],
  ["path", { d: "M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2", key: "1ejuhz" }]
]), uoe = be("ItalicIcon", [
  ["line", { x1: "19", x2: "10", y1: "4", y2: "4", key: "15jd3p" }],
  ["line", { x1: "14", x2: "5", y1: "20", y2: "20", key: "bu0au3" }],
  ["line", { x1: "15", x2: "9", y1: "4", y2: "20", key: "uljnxc" }]
]), gl = be("ListOrderedIcon", [
  ["line", { x1: "10", x2: "21", y1: "6", y2: "6", key: "76qw6h" }],
  ["line", { x1: "10", x2: "21", y1: "12", y2: "12", key: "16nom4" }],
  ["line", { x1: "10", x2: "21", y1: "18", y2: "18", key: "u3jurt" }],
  ["path", { d: "M4 6h1v4", key: "cnovpq" }],
  ["path", { d: "M4 10h2", key: "16xx2s" }],
  ["path", { d: "M6 18H4c0-1 2-2 2-3s-1-1.5-2-1", key: "m9a95d" }]
]), doe = be("ListIcon", [
  ["line", { x1: "8", x2: "21", y1: "6", y2: "6", key: "7ey8pc" }],
  ["line", { x1: "8", x2: "21", y1: "12", y2: "12", key: "rjfblc" }],
  ["line", { x1: "8", x2: "21", y1: "18", y2: "18", key: "c3b1m8" }],
  ["line", { x1: "3", x2: "3.01", y1: "6", y2: "6", key: "1g7gq3" }],
  ["line", { x1: "3", x2: "3.01", y1: "12", y2: "12", key: "1pjlvk" }],
  ["line", { x1: "3", x2: "3.01", y1: "18", y2: "18", key: "28t2mc" }]
]), foe = be("MessageSquarePlusIcon", [
  [
    "path",
    {
      d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
      key: "1lielz"
    }
  ],
  ["line", { x1: "9", x2: "15", y1: "10", y2: "10", key: "1lj1wd" }],
  ["line", { x1: "12", x2: "12", y1: "7", y2: "13", key: "1cppfj" }]
]), poe = be("SparklesIcon", [
  [
    "path",
    {
      d: "m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",
      key: "17u4zn"
    }
  ],
  ["path", { d: "M5 3v4", key: "bklmnn" }],
  ["path", { d: "M19 17v4", key: "iiml17" }],
  ["path", { d: "M3 5h4", key: "nem4j1" }],
  ["path", { d: "M17 19h4", key: "lbex7p" }]
]), hoe = be("StrikethroughIcon", [
  ["path", { d: "M16 4H9a3 3 0 0 0-2.83 4", key: "43sutm" }],
  ["path", { d: "M14 12a4 4 0 0 1 0 8H6", key: "nlfj13" }],
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }]
]), am = be("TextQuoteIcon", [
  ["path", { d: "M17 6H3", key: "16j9eg" }],
  ["path", { d: "M21 12H8", key: "scolzb" }],
  ["path", { d: "M21 18H8", key: "1wfozv" }],
  ["path", { d: "M3 12v6", key: "fv4c87" }]
]), lm = be("TextIcon", [
  ["path", { d: "M17 6.1H3", key: "wptmhv" }],
  ["path", { d: "M21 12.1H3", key: "1j38uz" }],
  ["path", { d: "M15.1 18H3", key: "1nb16a" }]
]), moe = be("TrashIcon", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }]
]), goe = be("UnderlineIcon", [
  ["path", { d: "M6 4v6a6 6 0 0 0 12 0V4", key: "9kb039" }],
  ["line", { x1: "4", x2: "20", y1: "20", y2: "20", key: "nun2al" }]
]), yoe = /* @__PURE__ */ Q("path", {
  d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
  fill: "currentColor"
}, null, -1), voe = /* @__PURE__ */ Q("path", {
  d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
  fill: "currentFill"
}, null, -1), boe = [
  yoe,
  voe
], koe = /* @__PURE__ */ le({
  __name: "loadingCircle",
  props: {
    dimensions: {
      type: String,
      default: "h-4 w-4",
      required: !1
    }
  },
  setup(n) {
    return (e, t) => (re(), He("svg", {
      "aria-hidden": "true",
      class: Oo(["animate-spin fill-stone-600 text-stone-200", n.dimensions]),
      viewBox: "0 0 100 101",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, boe, 2));
  }
}), yl = (n, {
  chars: e,
  offset: t = 0
}) => n.state.doc.textBetween(
  Math.max(0, n.state.selection.from - e),
  n.state.selection.from - t,
  `
`
), xoe = ["onClick"], woe = { class: "flex items-center justify-center w-10 h-10 bg-white border rounded-md border-stone-200" }, Soe = { class: "font-medium" }, Coe = { class: "text-xs text-stone-500" }, Eoe = /* @__PURE__ */ le({
  __name: "slashCommandList",
  props: {
    items: {
      type: Array,
      required: !0
    },
    command: {
      type: Function,
      required: !0
    },
    editor: {
      type: Object,
      required: !0
    },
    range: {
      type: Object,
      required: !0
    }
  },
  setup(n, { expose: e }) {
    const t = n, r = J(0), { complete: o, isLoading: s } = hh({
      id: "novel",
      api: "/api/generate",
      onResponse: (f) => {
        t.editor.chain().focus().deleteRange(t.range).run();
      },
      onFinish: (f, p) => {
        t.editor.commands.setTextSelection({
          from: t.range.from,
          to: t.range.from + p.length
        });
      },
      onError: (f) => {
        console.error(f);
      }
    }), i = J(), a = ["ArrowUp", "ArrowDown", "Enter"];
    function l(f) {
      if (a.includes(f.key))
        return f.preventDefault(), f.key === "ArrowUp" ? (r.value = (r.value + t.items.length - 1) % t.items.length, d(), !0) : f.key === "ArrowDown" ? (r.value = (r.value + 1) % t.items.length, d(), !0) : f.key === "Enter" ? (c(r.value), !0) : !1;
    }
    xr(
      () => t.items,
      () => {
        r.value = 0;
      }
    ), e({
      onKeyDown: l
    });
    function c(f) {
      const p = t.items[f];
      if (p)
        if (p.title === "Continue writing") {
          if (s.value)
            return;
          o(
            yl(t.editor, {
              chars: 5e3
            })
          );
        } else
          t.command(p);
    }
    function u(f, p) {
      const h = f.offsetHeight, m = p ? p.offsetHeight : 0, g = p.offsetTop, v = g + m;
      g < f.scrollTop ? f.scrollTop -= f.scrollTop - g + 5 : v > h + f.scrollTop && (f.scrollTop += v - h - f.scrollTop + 5);
    }
    function d() {
      const f = i.value, p = f == null ? void 0 : f.children[r.value];
      f && p && u(f, p);
    }
    return (f, p) => n.items.length > 0 ? (re(), He("div", {
      key: 0,
      ref_key: "commandListContainer",
      ref: i,
      class: "z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-stone-200 bg-white px-1 py-2 shadow-md transition-all"
    }, [
      (re(!0), He(xt, null, po(n.items, (h, m) => (re(), He("button", {
        class: Oo(["flex items-center w-full px-2 py-1 space-x-2 text-sm text-left rounded-md text-stone-900 hover:bg-stone-100", m === r.value ? "bg-stone-100 text-stone-900" : ""]),
        key: m,
        onClick: (g) => c(m)
      }, [
        Q("div", woe, [
          h.title === "Continue writing" && ae(s) ? (re(), it(koe, { key: 0 })) : (re(), it(xl(h.icon), {
            key: 1,
            size: "18"
          }))
        ]),
        Q("div", null, [
          Q("p", Soe, wr(h.title), 1),
          Q("p", Coe, wr(h.description), 1)
        ])
      ], 10, xoe))), 128))
    ], 512)) : Sr("", !0);
  }
}), Aoe = ue.create({
  name: "slash-command",
  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({
          editor: n,
          range: e,
          props: t
        }) => {
          t.command({ editor: n, range: e });
        }
      }
    };
  },
  addProseMirrorPlugins() {
    return [
      aoe({
        editor: this.editor,
        ...this.options.suggestion
      })
    ];
  }
}), Toe = ({ query: n }) => [
  {
    title: "Send Feedback",
    description: "Let us know how we can improve.",
    icon: foe,
    command: ({ editor: e, range: t }) => {
      e.chain().focus().deleteRange(t).run(), document.getElementById('fdButton').click();
    }
  },
  {
    title: "Text",
    description: "Just start typing with plain text.",
    searchTerms: ["p", "paragraph"],
    icon: lm,
    command: ({ editor: e, range: t }) => {
      e.chain().focus().deleteRange(t).toggleNode("paragraph", "paragraph").run();
    }
  },
  {
    title: "To-do List",
    description: "Track tasks with a to-do list.",
    searchTerms: ["todo", "task", "list", "check", "checkbox"],
    icon: nm,
    command: ({ editor: e, range: t }) => {
      e.chain().focus().deleteRange(t).toggleTaskList().run();
    }
  },
  {
    title: "Heading 1",
    description: "Big section heading.",
    searchTerms: ["title", "big", "large"],
    icon: om,
    command: ({ editor: e, range: t }) => {
      e.chain().focus().deleteRange(t).setNode("heading", { level: 1 }).run();
    }
  },
  {
    title: "Heading 2",
    description: "Medium section heading.",
    searchTerms: ["subtitle", "medium"],
    icon: sm,
    command: ({ editor: e, range: t }) => {
      e.chain().focus().deleteRange(t).setNode("heading", { level: 2 }).run();
    }
  },
  {
    title: "Heading 3",
    description: "Small section heading.",
    searchTerms: ["subtitle", "small"],
    icon: im,
    command: ({ editor: e, range: t }) => {
      e.chain().focus().deleteRange(t).setNode("heading", { level: 3 }).run();
    }
  },
  {
    title: "Bullet List",
    description: "Create a simple bullet list.",
    searchTerms: ["unordered", "point"],
    icon: doe,
    command: ({ editor: e, range: t }) => {
      e.chain().focus().deleteRange(t).toggleBulletList().run();
    }
  },
  {
    title: "Numbered List",
    description: "Create a list with numbering.",
    searchTerms: ["ordered"],
    icon: gl,
    command: ({ editor: e, range: t }) => {
      e.chain().focus().deleteRange(t).toggleOrderedList().run();
    }
  },
  {
    title: "Quote",
    description: "Capture a quote.",
    searchTerms: ["blockquote"],
    icon: am,
    command: ({ editor: e, range: t }) => e.chain().focus().deleteRange(t).toggleNode("paragraph", "paragraph").toggleBlockquote().run()
  },
  {
    title: "Code",
    description: "Capture a code snippet.",
    searchTerms: ["codeblock"],
    icon: Sc,
    command: ({ editor: e, range: t }) => e.chain().focus().deleteRange(t).toggleCodeBlock().run()
  }
].filter((e) => {
  if (typeof n == "string" && n.length > 0) {
    const t = n.toLowerCase();
    return e.title.toLowerCase().includes(t) || e.description.toLowerCase().includes(t) || e.searchTerms && e.searchTerms.some((r) => r.includes(t));
  }
  return !0;
}), Moe = () => {
  let n = null, e = null;
  return {
    onStart: (t) => {
      n = new h1(Eoe, {
        props: t,
        editor: t.editor
      }), t.clientRect && (e = Gn("body", {
        getReferenceClientRect: t.clientRect,
        appendTo: () => document.body,
        content: n.element,
        showOnCreate: !0,
        interactive: !0,
        trigger: "manual",
        placement: "bottom-start"
      }));
    },
    onUpdate: (t) => {
      n == null || n.updateProps(t), e && e[0].setProps({
        getReferenceClientRect: t.clientRect
      });
    },
    onKeyDown: (t) => {
      var r;
      return t.event.key === "Escape" ? (e == null || e[0].hide(), !0) : (r = n == null ? void 0 : n.ref) == null ? void 0 : r.onKeyDown(t.event);
    },
    onExit: () => {
      e == null || e[0].destroy(), n == null || n.destroy();
    }
  };
}, Ooe = Aoe.configure({
  suggestion: {
    items: Toe,
    render: Moe
  }
}), Doe = [
  Hx.configure({
    bulletList: {
      HTMLAttributes: {
        class: "list-disc list-outside leading-3 -mt-2"
      }
    },
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal list-outside leading-3 -mt-2"
      }
    },
    listItem: {
      HTMLAttributes: {
        class: "leading-normal -mb-2"
      }
    },
    blockquote: {
      HTMLAttributes: {
        class: "border-l-4 border-stone-700"
      }
    },
    codeBlock: {
      HTMLAttributes: {
        class: "rounded-sm bg-stone-100 p-5 font-mono font-medium text-stone-800"
      }
    },
    code: {
      HTMLAttributes: {
        class: "rounded-md bg-stone-200 px-1.5 py-1 font-mono font-medium text-stone-900",
        spellcheck: "false"
      }
    },
    horizontalRule: !1,
    dropcursor: {
      color: "#DBEAFE",
      width: 4
    },
    gapcursor: !1
  }),
  // patch to fix horizontal rule bug: https://github.com/ueberdosis/tiptap/pull/3859#issuecomment-1536799740
  bh.extend({
    addInputRules() {
      return [
        new _o({
          find: /^(?:---|—-|___\s|\*\*\*\s)$/,
          handler: ({ state: n, range: e }) => {
            const t = {}, { tr: r } = n, o = e.from;
            let s = e.to;
            r.insert(o - 1, this.type.create(t)).delete(
              r.mapping.map(o),
              r.mapping.map(s)
            );
          }
        })
      ];
    }
  }).configure({
    HTMLAttributes: {
      class: "mt-4 mb-6 border-t border-stone-300"
    }
  }),
  dw.configure({
    HTMLAttributes: {
      class: "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer"
    }
  }),
  // TiptapImage.extend({
  //   addProseMirrorPlugins() {
  //     return [UploadImagesPlugin()];
  //   },
  // }).configure({
  //   allowBase64: true,
  //   HTMLAttributes: {
  //     class: "rounded-lg border border-stone-200",
  //   },
  // }),
  // UpdatedImage.configure({
  //   HTMLAttributes: {
  //     class: "rounded-lg border border-stone-200",
  //   },
  // }),
  fw.configure({
    placeholder: ({ node: n }) => n.type.name === "heading" ? `Heading ${n.attrs.level}` : "Press '/' for commands, or '++' for AI autocomplete...",
    includeChildren: !0
  }),
  pw,
  hw,
  mw,
  ooe.configure({
    multicolor: !0
  }),
  vw.configure({
    HTMLAttributes: {
      class: "not-prose pl-2"
    }
  }),
  yw.configure({
    HTMLAttributes: {
      class: "flex items-start my-4"
    },
    nested: !0
  }),
  toe.configure({
    html: !1,
    transformCopiedText: !0
  }),
  Ooe
], _oe = {
  attributes: {
    class: "prose-lg prose-stone dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full"
  },
  handleDOMEvents: {
    keydown: (n, e) => {
      if (["ArrowUp", "ArrowDown", "Enter"].includes(e.key) && document.querySelector("#slash-command"))
        return !0;
    }
  }
};
function Ht(n, e, ...t) {
  if (n in e) {
    let o = e[n];
    return typeof o == "function" ? o(...t) : o;
  }
  let r = new Error(`Tried to handle "${n}" but there is no handler defined. Only defined handlers are: ${Object.keys(e).map((o) => `"${o}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(r, Ht), r;
}
var To = ((n) => (n[n.None = 0] = "None", n[n.RenderStrategy = 1] = "RenderStrategy", n[n.Static = 2] = "Static", n))(To || {}), Noe = ((n) => (n[n.Unmount = 0] = "Unmount", n[n.Hidden = 1] = "Hidden", n))(Noe || {});
function Vt({ visible: n = !0, features: e = 0, ourProps: t, theirProps: r, ...o }) {
  var s;
  let i = um(r, t), a = Object.assign(o, { props: i });
  if (n || e & 2 && i.static)
    return Oa(a);
  if (e & 1) {
    let l = (s = i.unmount) == null || s ? 0 : 1;
    return Ht(l, { 0() {
      return null;
    }, 1() {
      return Oa({ ...o, props: { ...i, hidden: !0, style: { display: "none" } } });
    } });
  }
  return Oa(a);
}
function Oa({ props: n, attrs: e, slots: t, slot: r, name: o }) {
  var s, i;
  let { as: a, ...l } = Loe(n, ["unmount", "static"]), c = (s = t.default) == null ? void 0 : s.call(t, r), u = {};
  if (r) {
    let d = !1, f = [];
    for (let [p, h] of Object.entries(r))
      typeof h == "boolean" && (d = !0), h === !0 && f.push(p);
    d && (u["data-headlessui-state"] = f.join(" "));
  }
  if (a === "template") {
    if (c = cm(c ?? []), Object.keys(l).length > 0 || Object.keys(e).length > 0) {
      let [d, ...f] = c ?? [];
      if (!Roe(d) || f.length > 0)
        throw new Error(['Passing props on "template"!', "", `The current component <${o} /> is rendering a "template".`, "However we need to passthrough the following props:", Object.keys(l).concat(Object.keys(e)).map((m) => m.trim()).filter((m, g, v) => v.indexOf(m) === g).sort((m, g) => m.localeCompare(g)).map((m) => `  - ${m}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".', "Render a single element as the child so that we can forward the props onto that element."].map((m) => `  - ${m}`).join(`
`)].join(`
`));
      let p = um((i = d.props) != null ? i : {}, l), h = Pm(d, p);
      for (let m in p)
        m.startsWith("on") && (h.props || (h.props = {}), h.props[m] = p[m]);
      return h;
    }
    return Array.isArray(c) && c.length === 1 ? c[0] : c;
  }
  return se(a, Object.assign({}, l, u), { default: () => c });
}
function cm(n) {
  return n.flatMap((e) => e.type === xt ? cm(e.children) : [e]);
}
function um(...n) {
  if (n.length === 0)
    return {};
  if (n.length === 1)
    return n[0];
  let e = {}, t = {};
  for (let r of n)
    for (let o in r)
      o.startsWith("on") && typeof r[o] == "function" ? (t[o] != null || (t[o] = []), t[o].push(r[o])) : e[o] = r[o];
  if (e.disabled || e["aria-disabled"])
    return Object.assign(e, Object.fromEntries(Object.keys(t).map((r) => [r, void 0])));
  for (let r in t)
    Object.assign(e, { [r](o, ...s) {
      let i = t[r];
      for (let a of i) {
        if (o instanceof Event && o.defaultPrevented)
          return;
        a(o, ...s);
      }
    } });
  return e;
}
function Loe(n, e = []) {
  let t = Object.assign({}, n);
  for (let r of e)
    r in t && delete t[r];
  return t;
}
function Roe(n) {
  return n == null ? !1 : typeof n.type == "string" || typeof n.type == "object" || typeof n.type == "function";
}
let Ioe = 0;
function Poe() {
  return ++Ioe;
}
function kr() {
  return Poe();
}
var Yt = ((n) => (n.Space = " ", n.Enter = "Enter", n.Escape = "Escape", n.Backspace = "Backspace", n.Delete = "Delete", n.ArrowLeft = "ArrowLeft", n.ArrowUp = "ArrowUp", n.ArrowRight = "ArrowRight", n.ArrowDown = "ArrowDown", n.Home = "Home", n.End = "End", n.PageUp = "PageUp", n.PageDown = "PageDown", n.Tab = "Tab", n))(Yt || {});
function V(n) {
  var e;
  return n == null || n.value == null ? null : (e = n.value.$el) != null ? e : n.value;
}
let dm = Symbol("Context");
var Wn = ((n) => (n[n.Open = 1] = "Open", n[n.Closed = 2] = "Closed", n[n.Closing = 4] = "Closing", n[n.Opening = 8] = "Opening", n))(Wn || {});
function fm() {
  return ln(dm, null);
}
function Boe(n) {
  Kn(dm, n);
}
function df(n, e) {
  if (n)
    return n;
  let t = e ?? "button";
  if (typeof t == "string" && t.toLowerCase() === "button")
    return "button";
}
function Foe(n, e) {
  let t = J(df(n.value.type, n.value.as));
  return un(() => {
    t.value = df(n.value.type, n.value.as);
  }), Et(() => {
    var r;
    t.value || V(e) && V(e) instanceof HTMLButtonElement && !((r = V(e)) != null && r.hasAttribute("type")) && (t.value = "button");
  }), t;
}
var qoe = Object.defineProperty, zoe = (n, e, t) => e in n ? qoe(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, ff = (n, e, t) => (zoe(n, typeof e != "symbol" ? e + "" : e, t), t);
class $oe {
  constructor() {
    ff(this, "current", this.detect()), ff(this, "currentId", 0);
  }
  set(e) {
    this.current !== e && (this.currentId = 0, this.current = e);
  }
  reset() {
    this.set(this.detect());
  }
  nextId() {
    return ++this.currentId;
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return typeof window > "u" || typeof document > "u" ? "server" : "client";
  }
}
let Ai = new $oe();
function mn(n) {
  if (Ai.isServer)
    return null;
  if (n instanceof Node)
    return n.ownerDocument;
  if (n != null && n.hasOwnProperty("value")) {
    let e = V(n);
    if (e)
      return e.ownerDocument;
  }
  return document;
}
let vl = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((n) => `${n}:not([tabindex='-1'])`).join(",");
var Ft = ((n) => (n[n.First = 1] = "First", n[n.Previous = 2] = "Previous", n[n.Next = 4] = "Next", n[n.Last = 8] = "Last", n[n.WrapAround = 16] = "WrapAround", n[n.NoScroll = 32] = "NoScroll", n))(Ft || {}), ei = ((n) => (n[n.Error = 0] = "Error", n[n.Overflow = 1] = "Overflow", n[n.Success = 2] = "Success", n[n.Underflow = 3] = "Underflow", n))(ei || {}), Hoe = ((n) => (n[n.Previous = -1] = "Previous", n[n.Next = 1] = "Next", n))(Hoe || {});
function Ti(n = document.body) {
  return n == null ? [] : Array.from(n.querySelectorAll(vl)).sort((e, t) => Math.sign((e.tabIndex || Number.MAX_SAFE_INTEGER) - (t.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var Cc = ((n) => (n[n.Strict = 0] = "Strict", n[n.Loose = 1] = "Loose", n))(Cc || {});
function pm(n, e = 0) {
  var t;
  return n === ((t = mn(n)) == null ? void 0 : t.body) ? !1 : Ht(e, { 0() {
    return n.matches(vl);
  }, 1() {
    let r = n;
    for (; r !== null; ) {
      if (r.matches(vl))
        return !0;
      r = r.parentElement;
    }
    return !1;
  } });
}
var Voe = ((n) => (n[n.Keyboard = 0] = "Keyboard", n[n.Mouse = 1] = "Mouse", n))(Voe || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (n) => {
  n.metaKey || n.altKey || n.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (n) => {
  n.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : n.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
let joe = ["textarea", "input"].join(",");
function Uoe(n) {
  var e, t;
  return (t = (e = n == null ? void 0 : n.matches) == null ? void 0 : e.call(n, joe)) != null ? t : !1;
}
function Woe(n, e = (t) => t) {
  return n.slice().sort((t, r) => {
    let o = e(t), s = e(r);
    if (o === null || s === null)
      return 0;
    let i = o.compareDocumentPosition(s);
    return i & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : i & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function On(n, e, { sorted: t = !0, relativeTo: r = null, skipElements: o = [] } = {}) {
  var s;
  let i = (s = Array.isArray(n) ? n.length > 0 ? n[0].ownerDocument : document : n == null ? void 0 : n.ownerDocument) != null ? s : document, a = Array.isArray(n) ? t ? Woe(n) : n : Ti(n);
  o.length > 0 && a.length > 1 && (a = a.filter((h) => !o.includes(h))), r = r ?? i.activeElement;
  let l = (() => {
    if (e & 5)
      return 1;
    if (e & 10)
      return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), c = (() => {
    if (e & 1)
      return 0;
    if (e & 2)
      return Math.max(0, a.indexOf(r)) - 1;
    if (e & 4)
      return Math.max(0, a.indexOf(r)) + 1;
    if (e & 8)
      return a.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), u = e & 32 ? { preventScroll: !0 } : {}, d = 0, f = a.length, p;
  do {
    if (d >= f || d + f <= 0)
      return 0;
    let h = c + d;
    if (e & 16)
      h = (h + f) % f;
    else {
      if (h < 0)
        return 3;
      if (h >= f)
        return 1;
    }
    p = a[h], p == null || p.focus(u), d += l;
  } while (p !== i.activeElement);
  return e & 6 && Uoe(p) && p.select(), 2;
}
function us(n, e, t) {
  Ai.isServer || Et((r) => {
    document.addEventListener(n, e, t), r(() => document.removeEventListener(n, e, t));
  });
}
function hm(n, e, t) {
  Ai.isServer || Et((r) => {
    window.addEventListener(n, e, t), r(() => window.removeEventListener(n, e, t));
  });
}
function Koe(n, e, t = Ae(() => !0)) {
  function r(s, i) {
    if (!t.value || s.defaultPrevented)
      return;
    let a = i(s);
    if (a === null || !a.getRootNode().contains(a))
      return;
    let l = function c(u) {
      return typeof u == "function" ? c(u()) : Array.isArray(u) || u instanceof Set ? u : [u];
    }(n);
    for (let c of l) {
      if (c === null)
        continue;
      let u = c instanceof HTMLElement ? c : V(c);
      if (u != null && u.contains(a) || s.composed && s.composedPath().includes(u))
        return;
    }
    return !pm(a, Cc.Loose) && a.tabIndex !== -1 && s.preventDefault(), e(s, a);
  }
  let o = J(null);
  us("pointerdown", (s) => {
    var i, a;
    t.value && (o.value = ((a = (i = s.composedPath) == null ? void 0 : i.call(s)) == null ? void 0 : a[0]) || s.target);
  }, !0), us("mousedown", (s) => {
    var i, a;
    t.value && (o.value = ((a = (i = s.composedPath) == null ? void 0 : i.call(s)) == null ? void 0 : a[0]) || s.target);
  }, !0), us("click", (s) => {
    o.value && (r(s, () => o.value), o.value = null);
  }, !0), us("touchend", (s) => r(s, () => s.target instanceof HTMLElement ? s.target : null), !0), hm("blur", (s) => r(s, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0);
}
var Ir = ((n) => (n[n.None = 1] = "None", n[n.Focusable = 2] = "Focusable", n[n.Hidden = 4] = "Hidden", n))(Ir || {});
let Mo = le({ name: "Hidden", props: { as: { type: [Object, String], default: "div" }, features: { type: Number, default: 1 } }, setup(n, { slots: e, attrs: t }) {
  return () => {
    let { features: r, ...o } = n, s = { "aria-hidden": (r & 2) === 2 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(r & 4) === 4 && (r & 2) !== 2 && { display: "none" } } };
    return Vt({ ourProps: s, theirProps: o, slot: {}, attrs: t, slots: e, name: "Hidden" });
  };
} });
var qt = ((n) => (n[n.Forwards = 0] = "Forwards", n[n.Backwards = 1] = "Backwards", n))(qt || {});
function mm() {
  let n = J(0);
  return hm("keydown", (e) => {
    e.key === "Tab" && (n.value = e.shiftKey ? 1 : 0);
  }), n;
}
function Goe(n, e, t, r) {
  Ai.isServer || Et((o) => {
    n = n ?? window, n.addEventListener(e, t, r), o(() => n.removeEventListener(e, t, r));
  });
}
let gm = Symbol("ForcePortalRootContext");
function Joe() {
  return ln(gm, !1);
}
le({ name: "ForcePortalRoot", props: { as: { type: [Object, String], default: "template" }, force: { type: Boolean, default: !1 } }, setup(n, { slots: e, attrs: t }) {
  return Kn(gm, n.force), () => {
    let { force: r, ...o } = n;
    return Vt({ theirProps: o, ourProps: {}, slot: {}, slots: e, attrs: t, name: "ForcePortalRoot" });
  };
} });
function Zoe(n) {
  let e = mn(n);
  if (!e) {
    if (n === null)
      return null;
    throw new Error(`[Headless UI]: Cannot find ownerDocument for contextElement: ${n}`);
  }
  let t = e.getElementById("headlessui-portal-root");
  if (t)
    return t;
  let r = e.createElement("div");
  return r.setAttribute("id", "headlessui-portal-root"), e.body.appendChild(r);
}
le({ name: "Portal", props: { as: { type: [Object, String], default: "div" } }, setup(n, { slots: e, attrs: t }) {
  let r = J(null), o = Ae(() => mn(r)), s = Joe(), i = ln(ym, null), a = J(s === !0 || i == null ? Zoe(r.value) : i.resolveTarget());
  Et(() => {
    s || i != null && (a.value = i.resolveTarget());
  });
  let l = ln(bl, null);
  return un(() => {
    let c = V(r);
    c && l && fo(l.register(c));
  }), fo(() => {
    var c, u;
    let d = (c = o.value) == null ? void 0 : c.getElementById("headlessui-portal-root");
    d && a.value === d && a.value.children.length <= 0 && ((u = a.value.parentElement) == null || u.removeChild(a.value));
  }), () => {
    if (a.value === null)
      return null;
    let c = { ref: r, "data-headlessui-portal": "" };
    return se(mf, { to: a.value }, Vt({ ourProps: c, theirProps: n, slot: {}, attrs: t, slots: e, name: "Portal" }));
  };
} });
let bl = Symbol("PortalParentContext");
function Yoe() {
  let n = ln(bl, null), e = J([]);
  function t(s) {
    return e.value.push(s), n && n.register(s), () => r(s);
  }
  function r(s) {
    let i = e.value.indexOf(s);
    i !== -1 && e.value.splice(i, 1), n && n.unregister(s);
  }
  let o = { register: t, unregister: r, portals: e };
  return [e, le({ name: "PortalWrapper", setup(s, { slots: i }) {
    return Kn(bl, o), () => {
      var a;
      return (a = i.default) == null ? void 0 : a.call(i);
    };
  } })];
}
let ym = Symbol("PortalGroupContext");
le({ name: "PortalGroup", props: { as: { type: [Object, String], default: "template" }, target: { type: Object, default: null } }, setup(n, { attrs: e, slots: t }) {
  let r = ni({ resolveTarget() {
    return n.target;
  } });
  return Kn(ym, r), () => {
    let { target: o, ...s } = n;
    return Vt({ theirProps: s, ourProps: {}, slot: {}, attrs: e, slots: t, name: "PortalGroup" });
  };
} });
function Qoe({ defaultContainers: n = [], portals: e, mainTreeNodeRef: t } = {}) {
  let r = J(null), o = mn(r);
  function s() {
    var i;
    let a = [];
    for (let l of n)
      l !== null && (l instanceof HTMLElement ? a.push(l) : "value" in l && l.value instanceof HTMLElement && a.push(l.value));
    if (e != null && e.value)
      for (let l of e.value)
        a.push(l);
    for (let l of (i = o == null ? void 0 : o.querySelectorAll("html > *, body > *")) != null ? i : [])
      l !== document.body && l !== document.head && l instanceof HTMLElement && l.id !== "headlessui-portal-root" && (l.contains(V(r)) || a.some((c) => l.contains(c)) || a.push(l));
    return a;
  }
  return { resolveContainers: s, contains(i) {
    return s().some((a) => a.contains(i));
  }, mainTreeNodeRef: r, MainTreeNode() {
    return t != null ? null : se(Mo, { features: Ir.Hidden, ref: r });
  } };
}
function Xoe() {
  let n = J(null);
  return { mainTreeNodeRef: n, MainTreeNode() {
    return se(Mo, { features: Ir.Hidden, ref: n });
  } };
}
var ese = ((n) => (n[n.Open = 0] = "Open", n[n.Closed = 1] = "Closed", n))(ese || {});
let vm = Symbol("PopoverContext");
function Mi(n) {
  let e = ln(vm, null);
  if (e === null) {
    let t = new Error(`<${n} /> is missing a parent <${Ec.name} /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(t, Mi), t;
  }
  return e;
}
let bm = Symbol("PopoverGroupContext");
function km() {
  return ln(bm, null);
}
let xm = Symbol("PopoverPanelContext");
function tse() {
  return ln(xm, null);
}
let Ec = le({ name: "Popover", inheritAttrs: !1, props: { as: { type: [Object, String], default: "div" } }, setup(n, { slots: e, attrs: t, expose: r }) {
  var o;
  let s = J(null);
  r({ el: s, $el: s });
  let i = J(1), a = J(null), l = J(null), c = J(null), u = J(null), d = Ae(() => mn(s)), f = Ae(() => {
    var w, k;
    if (!V(a) || !V(u))
      return !1;
    for (let P of document.querySelectorAll("body > *"))
      if (Number(P == null ? void 0 : P.contains(V(a))) ^ Number(P == null ? void 0 : P.contains(V(u))))
        return !0;
    let S = Ti(), E = S.indexOf(V(a)), T = (E + S.length - 1) % S.length, D = (E + 1) % S.length, _ = S[T], F = S[D];
    return !((w = V(u)) != null && w.contains(_)) && !((k = V(u)) != null && k.contains(F));
  }), p = { popoverState: i, buttonId: J(null), panelId: J(null), panel: u, button: a, isPortalled: f, beforePanelSentinel: l, afterPanelSentinel: c, togglePopover() {
    i.value = Ht(i.value, { 0: 1, 1: 0 });
  }, closePopover() {
    i.value !== 1 && (i.value = 1);
  }, close(w) {
    p.closePopover();
    let k = (() => w ? w instanceof HTMLElement ? w : w.value instanceof HTMLElement ? V(w) : V(p.button) : V(p.button))();
    k == null || k.focus();
  } };
  Kn(vm, p), Boe(Ae(() => Ht(i.value, { 0: Wn.Open, 1: Wn.Closed })));
  let h = { buttonId: p.buttonId, panelId: p.panelId, close() {
    p.closePopover();
  } }, m = km(), g = m == null ? void 0 : m.registerPopover, [v, b] = Yoe(), x = Qoe({ mainTreeNodeRef: m == null ? void 0 : m.mainTreeNodeRef, portals: v, defaultContainers: [a, u] });
  function y() {
    var w, k, S, E;
    return (E = m == null ? void 0 : m.isFocusWithinPopoverGroup()) != null ? E : ((w = d.value) == null ? void 0 : w.activeElement) && (((k = V(a)) == null ? void 0 : k.contains(d.value.activeElement)) || ((S = V(u)) == null ? void 0 : S.contains(d.value.activeElement)));
  }
  return Et(() => g == null ? void 0 : g(h)), Goe((o = d.value) == null ? void 0 : o.defaultView, "focus", (w) => {
    var k, S;
    w.target !== window && w.target instanceof HTMLElement && i.value === 0 && (y() || a && u && (x.contains(w.target) || (k = V(p.beforePanelSentinel)) != null && k.contains(w.target) || (S = V(p.afterPanelSentinel)) != null && S.contains(w.target) || p.closePopover()));
  }, !0), Koe(x.resolveContainers, (w, k) => {
    var S;
    p.closePopover(), pm(k, Cc.Loose) || (w.preventDefault(), (S = V(a)) == null || S.focus());
  }, Ae(() => i.value === 0)), () => {
    let w = { open: i.value === 0, close: p.close };
    return se(xt, [se(b, {}, () => Vt({ theirProps: { ...n, ...t }, ourProps: { ref: s }, slot: w, slots: e, attrs: t, name: "Popover" })), se(x.MainTreeNode)]);
  };
} }), wm = le({ name: "PopoverButton", props: { as: { type: [Object, String], default: "button" }, disabled: { type: [Boolean], default: !1 }, id: { type: String, default: () => `headlessui-popover-button-${kr()}` } }, inheritAttrs: !1, setup(n, { attrs: e, slots: t, expose: r }) {
  let o = Mi("PopoverButton"), s = Ae(() => mn(o.button));
  r({ el: o.button, $el: o.button }), un(() => {
    o.buttonId.value = n.id;
  }), fo(() => {
    o.buttonId.value = null;
  });
  let i = km(), a = i == null ? void 0 : i.closeOthers, l = tse(), c = Ae(() => l === null ? !1 : l.value === o.panelId.value), u = J(null), d = `headlessui-focus-sentinel-${kr()}`;
  c.value || Et(() => {
    o.button.value = u.value;
  });
  let f = Foe(Ae(() => ({ as: n.as, type: e.type })), u);
  function p(x) {
    var y, w, k, S, E;
    if (c.value) {
      if (o.popoverState.value === 1)
        return;
      switch (x.key) {
        case Yt.Space:
        case Yt.Enter:
          x.preventDefault(), (w = (y = x.target).click) == null || w.call(y), o.closePopover(), (k = V(o.button)) == null || k.focus();
          break;
      }
    } else
      switch (x.key) {
        case Yt.Space:
        case Yt.Enter:
          x.preventDefault(), x.stopPropagation(), o.popoverState.value === 1 && (a == null || a(o.buttonId.value)), o.togglePopover();
          break;
        case Yt.Escape:
          if (o.popoverState.value !== 0)
            return a == null ? void 0 : a(o.buttonId.value);
          if (!V(o.button) || (S = s.value) != null && S.activeElement && !((E = V(o.button)) != null && E.contains(s.value.activeElement)))
            return;
          x.preventDefault(), x.stopPropagation(), o.closePopover();
          break;
      }
  }
  function h(x) {
    c.value || x.key === Yt.Space && x.preventDefault();
  }
  function m(x) {
    var y, w;
    n.disabled || (c.value ? (o.closePopover(), (y = V(o.button)) == null || y.focus()) : (x.preventDefault(), x.stopPropagation(), o.popoverState.value === 1 && (a == null || a(o.buttonId.value)), o.togglePopover(), (w = V(o.button)) == null || w.focus()));
  }
  function g(x) {
    x.preventDefault(), x.stopPropagation();
  }
  let v = mm();
  function b() {
    let x = V(o.panel);
    if (!x)
      return;
    function y() {
      Ht(v.value, { [qt.Forwards]: () => On(x, Ft.First), [qt.Backwards]: () => On(x, Ft.Last) }) === ei.Error && On(Ti().filter((w) => w.dataset.headlessuiFocusGuard !== "true"), Ht(v.value, { [qt.Forwards]: Ft.Next, [qt.Backwards]: Ft.Previous }), { relativeTo: V(o.button) });
    }
    y();
  }
  return () => {
    let x = o.popoverState.value === 0, y = { open: x }, { id: w, ...k } = n, S = c.value ? { ref: u, type: f.value, onKeydown: p, onClick: m } : { ref: u, id: w, type: f.value, "aria-expanded": o.popoverState.value === 0, "aria-controls": V(o.panel) ? o.panelId.value : void 0, disabled: n.disabled ? !0 : void 0, onKeydown: p, onKeyup: h, onClick: m, onMousedown: g };
    return se(xt, [Vt({ ourProps: S, theirProps: { ...e, ...k }, slot: y, attrs: e, slots: t, name: "PopoverButton" }), x && !c.value && o.isPortalled.value && se(Mo, { id: d, features: Ir.Focusable, "data-headlessui-focus-guard": !0, as: "button", type: "button", onFocus: b })]);
  };
} });
le({ name: "PopoverOverlay", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: !1 }, unmount: { type: Boolean, default: !0 } }, setup(n, { attrs: e, slots: t }) {
  let r = Mi("PopoverOverlay"), o = `headlessui-popover-overlay-${kr()}`, s = fm(), i = Ae(() => s !== null ? (s.value & Wn.Open) === Wn.Open : r.popoverState.value === 0);
  function a() {
    r.closePopover();
  }
  return () => {
    let l = { open: r.popoverState.value === 0 };
    return Vt({ ourProps: { id: o, "aria-hidden": !0, onClick: a }, theirProps: n, slot: l, attrs: e, slots: t, features: To.RenderStrategy | To.Static, visible: i.value, name: "PopoverOverlay" });
  };
} });
let Sm = le({ name: "PopoverPanel", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: !1 }, unmount: { type: Boolean, default: !0 }, focus: { type: Boolean, default: !1 }, id: { type: String, default: () => `headlessui-popover-panel-${kr()}` } }, inheritAttrs: !1, setup(n, { attrs: e, slots: t, expose: r }) {
  let { focus: o } = n, s = Mi("PopoverPanel"), i = Ae(() => mn(s.panel)), a = `headlessui-focus-sentinel-before-${kr()}`, l = `headlessui-focus-sentinel-after-${kr()}`;
  r({ el: s.panel, $el: s.panel }), un(() => {
    s.panelId.value = n.id;
  }), fo(() => {
    s.panelId.value = null;
  }), Kn(xm, s.panelId), Et(() => {
    var g, v;
    if (!o || s.popoverState.value !== 0 || !s.panel)
      return;
    let b = (g = i.value) == null ? void 0 : g.activeElement;
    (v = V(s.panel)) != null && v.contains(b) || On(V(s.panel), Ft.First);
  });
  let c = fm(), u = Ae(() => c !== null ? (c.value & Wn.Open) === Wn.Open : s.popoverState.value === 0);
  function d(g) {
    var v, b;
    switch (g.key) {
      case Yt.Escape:
        if (s.popoverState.value !== 0 || !V(s.panel) || i.value && !((v = V(s.panel)) != null && v.contains(i.value.activeElement)))
          return;
        g.preventDefault(), g.stopPropagation(), s.closePopover(), (b = V(s.button)) == null || b.focus();
        break;
    }
  }
  function f(g) {
    var v, b, x, y, w;
    let k = g.relatedTarget;
    k && V(s.panel) && ((v = V(s.panel)) != null && v.contains(k) || (s.closePopover(), ((x = (b = V(s.beforePanelSentinel)) == null ? void 0 : b.contains) != null && x.call(b, k) || (w = (y = V(s.afterPanelSentinel)) == null ? void 0 : y.contains) != null && w.call(y, k)) && k.focus({ preventScroll: !0 })));
  }
  let p = mm();
  function h() {
    let g = V(s.panel);
    if (!g)
      return;
    function v() {
      Ht(p.value, { [qt.Forwards]: () => {
        var b;
        On(g, Ft.First) === ei.Error && ((b = V(s.afterPanelSentinel)) == null || b.focus());
      }, [qt.Backwards]: () => {
        var b;
        (b = V(s.button)) == null || b.focus({ preventScroll: !0 });
      } });
    }
    v();
  }
  function m() {
    let g = V(s.panel);
    if (!g)
      return;
    function v() {
      Ht(p.value, { [qt.Forwards]: () => {
        let b = V(s.button), x = V(s.panel);
        if (!b)
          return;
        let y = Ti(), w = y.indexOf(b), k = y.slice(0, w + 1), S = [...y.slice(w + 1), ...k];
        for (let E of S.slice())
          if (E.dataset.headlessuiFocusGuard === "true" || x != null && x.contains(E)) {
            let T = S.indexOf(E);
            T !== -1 && S.splice(T, 1);
          }
        On(S, Ft.First, { sorted: !1 });
      }, [qt.Backwards]: () => {
        var b;
        On(g, Ft.Previous) === ei.Error && ((b = V(s.button)) == null || b.focus());
      } });
    }
    v();
  }
  return () => {
    let g = { open: s.popoverState.value === 0, close: s.close }, { id: v, focus: b, ...x } = n, y = { ref: s.panel, id: v, onKeydown: d, onFocusout: o && s.popoverState.value === 0 ? f : void 0, tabIndex: -1 };
    return Vt({ ourProps: y, theirProps: { ...e, ...x }, attrs: e, slot: g, slots: { ...t, default: (...w) => {
      var k;
      return [se(xt, [u.value && s.isPortalled.value && se(Mo, { id: a, ref: s.beforePanelSentinel, features: Ir.Focusable, "data-headlessui-focus-guard": !0, as: "button", type: "button", onFocus: h }), (k = t.default) == null ? void 0 : k.call(t, ...w), u.value && s.isPortalled.value && se(Mo, { id: l, ref: s.afterPanelSentinel, features: Ir.Focusable, "data-headlessui-focus-guard": !0, as: "button", type: "button", onFocus: m })])];
    } }, features: To.RenderStrategy | To.Static, visible: u.value, name: "PopoverPanel" });
  };
} });
le({ name: "PopoverGroup", inheritAttrs: !1, props: { as: { type: [Object, String], default: "div" } }, setup(n, { attrs: e, slots: t, expose: r }) {
  let o = J(null), s = kl([]), i = Ae(() => mn(o)), a = Xoe();
  r({ el: o, $el: o });
  function l(f) {
    let p = s.value.indexOf(f);
    p !== -1 && s.value.splice(p, 1);
  }
  function c(f) {
    return s.value.push(f), () => {
      l(f);
    };
  }
  function u() {
    var f;
    let p = i.value;
    if (!p)
      return !1;
    let h = p.activeElement;
    return (f = V(o)) != null && f.contains(h) ? !0 : s.value.some((m) => {
      var g, v;
      return ((g = p.getElementById(m.buttonId.value)) == null ? void 0 : g.contains(h)) || ((v = p.getElementById(m.panelId.value)) == null ? void 0 : v.contains(h));
    });
  }
  function d(f) {
    for (let p of s.value)
      p.buttonId.value !== f && p.close();
  }
  return Kn(bm, { registerPopover: c, unregisterPopover: l, isFocusWithinPopoverGroup: u, closeOthers: d, mainTreeNodeRef: a.mainTreeNodeRef }), () => se(xt, [Vt({ ourProps: { ref: o }, theirProps: { ...n, ...e }, slot: {}, attrs: e, slots: t, name: "PopoverGroup" }), se(a.MainTreeNode)]);
} });
const nse = { class: "relative" }, rse = ["onClick"], ose = { class: "flex items-center space-x-2" }, sse = { class: "p-1 border rounded-sm border-stone-200" }, ise = /* @__PURE__ */ le({
  __name: "NodeSelector",
  props: {
    editor: {
      type: Object,
      required: !0
    }
  },
  setup(n) {
    const e = n, t = [
      {
        name: "Text",
        icon: lm,
        command: () => e.editor.chain().focus().toggleNode("paragraph", "paragraph").run(),
        isActive: () => e.editor.isActive("paragraph") && !e.editor.isActive("bulletList") && !e.editor.isActive("orderedList")
      },
      {
        name: "Heading 1",
        icon: om,
        command: () => e.editor.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: () => e.editor.isActive("heading", { level: 1 })
      },
      {
        name: "Heading 2",
        icon: sm,
        command: () => e.editor.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: () => e.editor.isActive("heading", { level: 2 })
      },
      {
        name: "Heading 3",
        icon: im,
        command: () => e.editor.chain().focus().toggleHeading({ level: 3 }).run(),
        isActive: () => e.editor.isActive("heading", { level: 3 })
      },
      {
        name: "To-do List",
        icon: nm,
        command: () => e.editor.chain().focus().toggleTaskList().run(),
        isActive: () => e.editor.isActive("taskItem")
      },
      {
        name: "Bullet List",
        icon: gl,
        command: () => e.editor.chain().focus().toggleBulletList().run(),
        isActive: () => e.editor.isActive("bulletList")
      },
      {
        name: "Numbered List",
        icon: gl,
        command: () => e.editor.chain().focus().toggleOrderedList().run(),
        isActive: () => e.editor.isActive("orderedList")
      },
      {
        name: "Quote",
        icon: am,
        command: () => e.editor.chain().focus().toggleNode("paragraph", "paragraph").toggleBlockquote().run(),
        isActive: () => e.editor.isActive("blockquote")
      },
      {
        name: "Code",
        icon: Sc,
        command: () => e.editor.chain().focus().toggleCodeBlock().run(),
        isActive: () => e.editor.isActive("codeBlock")
      }
    ], r = Ae(
      () => t.filter((o) => o.isActive()).pop() ?? {
        name: "Multiple"
      }
    );
    return (o, s) => (re(), it(ae(Ec), null, {
      default: Dn(() => [
        Q("div", nse, [
          Ze(ae(wm), { class: "flex items-center gap-1 p-2 text-sm font-medium whitespace-nowrap text-stone-600 hover:bg-stone-100 active:bg-stone-200 focus:outline-none" }, {
            default: Dn(() => {
              var i;
              return [
                Q("span", null, wr((i = r.value) == null ? void 0 : i.name), 1),
                Ze(ae(rm), { class: "w-4 h-4" })
              ];
            }),
            _: 1
          }),
          Ze(ae(Sm), {
            align: "start",
            class: "z-[99999] absolute my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border border-stone-200 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1"
          }, {
            default: Dn(({ close: i }) => [
              (re(), He(xt, null, po(t, (a, l) => Q("button", {
                key: l,
                class: "flex items-center justify-between px-2 py-1 text-sm rounded-sm text-stone-600 hover:bg-stone-100",
                type: "button",
                onClick: () => {
                  a.command(), i();
                }
              }, [
                Q("div", ose, [
                  Q("div", sse, [
                    (re(), it(xl(a.icon), { class: "w-3 h-3" }))
                  ]),
                  Q("span", null, wr(a.name), 1)
                ]),
                r.value.name === a.name ? (re(), it(ae(Xs), {
                  key: 0,
                  class: "w-4 h-4"
                })) : Sr("", !0)
              ], 8, rse)), 64))
            ]),
            _: 1
          })
        ])
      ]),
      _: 1
    }));
  }
}), ase = { class: "relative" }, lse = /* @__PURE__ */ Q("p", { class: "text-base" }, "↗", -1), cse = ["onSubmit"], use = ["defaultValue"], dse = {
  key: 1,
  class: "flex items-center p-1 transition-all rounded-sm text-stone-600 hover:bg-stone-100"
}, fse = /* @__PURE__ */ le({
  __name: "LinkSelector",
  props: {
    editor: {
      type: Object,
      required: !0
    }
  },
  setup(n) {
    const e = J(!1), t = J(null);
    function r(o) {
      console.log(o);
    }
    return (o, s) => (re(), He("div", ase, [
      Q("button", {
        type: "button",
        class: "flex h-full items-center space-x-2 px-3 py-1.5 text-sm font-medium text-stone-600 hover:bg-stone-100 active:bg-stone-200",
        onClick: s[0] || (s[0] = (i) => e.value = !e.value)
      }, [
        lse,
        Q("p", {
          class: Oo(["underline decoration-stone-400 underline-offset-4", {
            "text-blue-500": n.editor.isActive("link")
          }])
        }, " Link ", 2)
      ]),
      e.value ? (re(), He("form", {
        key: 0,
        onSubmit: Bm(r, ["prevent"]),
        class: "fixed top-full z-[99999] mt-1 flex w-60 overflow-hidden rounded border border-stone-200 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1"
      }, [
        Q("input", {
          ref_key: "inputRef",
          ref: t,
          type: "text",
          placeholder: "Paste a link",
          class: "flex-1 p-1 text-sm bg-white outline-none",
          defaultValue: n.editor.getAttributes("link").href || ""
        }, null, 8, use),
        n.editor.getAttributes("link").href ? (re(), He("button", {
          key: 0,
          type: "button",
          class: "flex items-center p-1 text-red-600 transition-all rounded-sm hover:bg-red-100 dark:hover:bg-red-800",
          onClick: s[1] || (s[1] = () => {
            n.editor.chain().focus().unsetLink().run(), e.value = !1;
          })
        }, [
          Ze(ae(moe), { class: "w-4 h-4" })
        ])) : (re(), He("button", dse, [
          Ze(ae(Xs), { class: "w-4 h-4" })
        ]))
      ], 40, cse)) : Sr("", !0)
    ]));
  }
}), pse = { class: "relative" }, hse = /* @__PURE__ */ Q("div", { class: "px-2 my-1 text-sm text-stone-500" }, "Color", -1), mse = ["onClick"], gse = { class: "flex items-center space-x-2" }, yse = /* @__PURE__ */ Q("div", { class: "px-2 mt-2 mb-1 text-sm text-stone-500" }, "Background", -1), vse = ["onClick"], bse = { class: "flex items-center space-x-2" }, kse = /* @__PURE__ */ le({
  __name: "ColorSelector",
  props: {
    editor: {
      type: Object,
      required: !0
    }
  },
  setup(n) {
    const e = n, t = [
      {
        name: "Default",
        color: "var(--novel-black)"
      },
      {
        name: "Purple",
        color: "#9333EA"
      },
      {
        name: "Red",
        color: "#E00000"
      },
      {
        name: "Yellow",
        color: "#EAB308"
      },
      {
        name: "Blue",
        color: "#2563EB"
      },
      {
        name: "Green",
        color: "#008A00"
      },
      {
        name: "Orange",
        color: "#FFA500"
      },
      {
        name: "Pink",
        color: "#BA4081"
      },
      {
        name: "Gray",
        color: "#A8A29E"
      }
    ], r = [
      {
        name: "Default",
        color: "var(--novel-highlight-default)"
      },
      {
        name: "Purple",
        color: "var(--novel-highlight-purple)"
      },
      {
        name: "Red",
        color: "var(--novel-highlight-red)"
      },
      {
        name: "Yellow",
        color: "var(--novel-highlight-yellow)"
      },
      {
        name: "Blue",
        color: "var(--novel-highlight-blue)"
      },
      {
        name: "Green",
        color: "var(--novel-highlight-green)"
      },
      {
        name: "Orange",
        color: "var(--novel-highlight-orange)"
      },
      {
        name: "Pink",
        color: "var(--novel-highlight-pink)"
      },
      {
        name: "Gray",
        color: "var(--novel-highlight-gray)"
      }
    ], o = Ae(
      () => t.find(({ color: i }) => e.editor.isActive("textStyle", { color: i }))
    ), s = Ae(
      () => r.find(
        ({ color: i }) => e.editor.isActive("highlight", { color: i })
      )
    );
    return (i, a) => (re(), it(ae(Ec), null, {
      default: Dn(() => [
        Q("div", pse, [
          Ze(ae(wm), { class: "flex items-center h-full gap-1 p-2 text-sm font-medium text-stone-600 hover:bg-stone-100 active:bg-stone-200 focus:outline-none" }, {
            default: Dn(() => {
              var l, c;
              return [
                Q("span", {
                  class: "px-1 rounded-sm",
                  style: _i({
                    color: (l = o.value) == null ? void 0 : l.color,
                    backgroundColor: (c = s.value) == null ? void 0 : c.color
                  })
                }, " A ", 4),
                Ze(ae(rm), { class: "w-4 h-4" })
              ];
            }),
            _: 1
          }),
          Ze(ae(Sm), {
            align: "start",
            class: "z-[99999] absolute my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border border-stone-200 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1"
          }, {
            default: Dn(({ close: l }) => [
              hse,
              (re(), He(xt, null, po(t, (c, u) => Q("button", {
                key: u,
                class: "flex items-center justify-between px-2 py-1 text-sm rounded-sm text-stone-600 hover:bg-stone-100",
                type: "button",
                onClick: () => {
                  n.editor.commands.unsetColor(), c.name !== "Default" && n.editor.chain().focus().setColor(c.color || "").run(), l();
                }
              }, [
                Q("div", gse, [
                  Q("div", {
                    class: "px-1 py-px font-medium border rounded-sm border-stone-200",
                    style: _i({ color: c.color })
                  }, " A ", 4),
                  Q("span", null, wr(c.name), 1)
                ]),
                n.editor.isActive("textStyle", { color: c.color }) ? (re(), it(ae(Xs), {
                  key: 0,
                  class: "w-4 h-4"
                })) : Sr("", !0)
              ], 8, mse)), 64)),
              yse,
              (re(), He(xt, null, po(r, (c, u) => Q("button", {
                key: u,
                onClick: () => {
                  n.editor.commands.unsetHighlight(), c.name !== "Default" && n.editor.commands.setHighlight({ color: c.color }), l();
                },
                class: "flex items-center justify-between px-2 py-1 text-sm rounded-sm text-stone-600 hover:bg-stone-100",
                type: "button"
              }, [
                Q("div", bse, [
                  Q("div", {
                    class: "px-1 py-px font-medium border rounded-sm border-stone-200",
                    style: _i({ backgroundColor: c.color })
                  }, " A ", 4),
                  Q("span", null, wr(c.name), 1)
                ]),
                n.editor.isActive("highlight", { color: c.color }) ? (re(), it(ae(Xs), {
                  key: 0,
                  class: "w-4 h-4"
                })) : Sr("", !0)
              ], 8, vse)), 64))
            ]),
            _: 1
          })
        ])
      ]),
      _: 1
    }));
  }
}), xse = { class: "flex" }, wse = ["onClick"], Sse = /* @__PURE__ */ le({
  __name: "index",
  props: {
    editor: {
      type: Object,
      required: !0
    }
  },
  setup(n) {
    const e = n, t = [
      {
        name: "bold",
        isActive: () => e.editor.isActive("bold"),
        command: () => e.editor.chain().focus().toggleBold().run(),
        icon: coe
      },
      {
        name: "italic",
        isActive: () => e.editor.isActive("italic"),
        command: () => e.editor.chain().focus().toggleItalic().run(),
        icon: uoe
      },
      {
        name: "underline",
        isActive: () => e.editor.isActive("underline"),
        command: () => e.editor.chain().focus().toggleUnderline().run(),
        icon: goe
      },
      {
        name: "strike",
        isActive: () => e.editor.isActive("strike"),
        command: () => e.editor.chain().focus().toggleStrike().run(),
        icon: hoe
      },
      {
        name: "code",
        isActive: () => e.editor.isActive("code"),
        command: () => e.editor.chain().focus().toggleCode().run(),
        icon: Sc
      }
    ];
    return (r, o) => (re(), it(ae(u1), {
      editor: n.editor,
      class: "flex bg-white border divide-x rounded shadow-xl w-fit divide-stone-200 border-stone-200"
    }, {
      default: Dn(() => [
        Q("div", xse, [
          Ze(ise, { editor: n.editor }, null, 8, ["editor"]),
          Ze(fse, { editor: n.editor }, null, 8, ["editor"]),
          (re(), He(xt, null, po(t, (s, i) => Q("button", {
            key: i,
            onClick: (a) => s.command(),
            class: "p-2 text-stone-600 hover:bg-stone-100 active:bg-stone-200",
            type: "button"
          }, [
            (re(), it(xl(s.icon), {
              class: Oo(["w-4 h-4", {
                "text-blue-500": s.isActive()
              }])
            }, null, 8, ["class"]))
          ], 8, wse)), 64)),
          Ze(kse, { editor: n.editor }, null, 8, ["editor"])
        ])
      ]),
      _: 1
    }, 8, ["editor"]));
  }
}), Ose = /* @__PURE__ */ le({
  __name: "Editor",
  props: {
    /**
     * The API route to use for the OpenAI completion API.
     * Defaults to "/api/generate".
     */
    completionApi: {
      type: String,
      default: "/api/generate"
    },
    /**
     * Additional classes to add to the editor container.
     * Defaults to "relative min-h-[500px] w-full max-w-screen-lg border-stone-200 bg-white p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg".
     */
    className: {
      type: String,
      default: "relative min-h-[500px] w-full mx-auto max-w-screen-lg border-stone-200 bg-white p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg"
    },
    /**
     * The default value to use for the editor.
     * Defaults to defaultEditorContent.
     */
    defaultValue: {
      type: Object,
      default: () => j1
    },
    /**
     * A list of extensions to use for the editor, in addition to the default Novel extensions.
     * Defaults to [].
     */
    extensions: {
      type: Array,
      default: []
    },
    /**
     * Props to pass to the underlying Tiptap editor, in addition to the default Novel editor props.
     * Defaults to {}.
     */
    editorProps: {
      type: Object,
      default: {}
    },
    /**
     * A callback function that is called whenever the editor is updated.
     * Defaults to () => {}.
     */
    onUpdate: {
      type: Function,
      default: () => {
      }
    },
    /**
     * A callback function that is called whenever the editor is updated, but only after the defined debounce duration.
     * Defaults to () => {}.
     */
    onDebouncedUpdate: {
      type: Function,
      default: () => {
      }
    },
    /**
     * The duration (in milliseconds) to debounce the onDebouncedUpdate callback.
     * Defaults to 750.
     */
    debounceDuration: {
      type: Number,
      default: 750
    },
    /**
     * The key to use for storing the editor's value in local storage.
     * Defaults to "novel__content".
     */
    storageKey: {
      type: String,
      default: "novel__content"
    }
  },
  setup(n, { expose: e }) {
    const t = n, r = D1(t.storageKey, t.defaultValue), o = x1(({ editor: p }) => {
      const h = p.getJSON();
      r.value = h, t.onDebouncedUpdate(p);
    }, t.debounceDuration), s = p1({
      extensions: [...Doe, ...t.extensions],
      editorProps: {
        ..._oe,
        ...t.editorProps
      },
      onUpdate: (p) => {
        const h = p.editor.state.selection;
        yl(p.editor, {
          chars: 2
        }) === "++" && !l.value ? (p.editor.commands.deleteRange({
          from: h.from - 2,
          to: h.from
        }), i(
          yl(p.editor, {
            chars: 5e3
          })
        )) : (t.onUpdate(p.editor), o(p));
      },
      autofocus: "end"
    });
    e({
      editor: s
    });
    const { complete: i, completion: a, isLoading: l, stop: c } = hh({
      id: "novel-vue",
      api: t.completionApi,
      onFinish: (p, h) => {
        var m;
        (m = s.value) == null || m.commands.setTextSelection({
          from: s.value.state.selection.from - h.length,
          to: s.value.state.selection.from
        });
      },
      onError: (p) => {
        console.error(p);
      }
    });
    xr(
      () => a.value,
      (p, h) => {
        var g;
        const m = p == null ? void 0 : p.slice(h == null ? void 0 : h.length);
        m && ((g = s.value) == null || g.commands.insertContent(m));
      }
    );
    const u = (p) => {
      var h, m;
      (p.key === "Escape" || p.metaKey && p.key === "z") && (c(), p.key === "Escape" && ((h = s.value) == null || h.commands.deleteRange({
        from: s.value.state.selection.from - a.value.length,
        to: s.value.state.selection.from
      })), (m = s.value) == null || m.commands.insertContent("++"));
    }, d = (p) => {
      var h;
      p.preventDefault(), p.stopPropagation(), c(), window.confirm("AI writing paused. Continue?") && i(((h = s.value) == null ? void 0 : h.getText()) || "");
    };
    xr(
      () => l.value,
      (p) => {
        p ? (document.addEventListener("keydown", u), window.addEventListener("mousedown", d)) : (document.removeEventListener("keydown", u), window.removeEventListener("mousedown", d));
      }
    );
    const f = J(!1);
    return Et(() => {
      s.value && r.value && !f.value && (s.value.commands.setContent(r.value), f.value = !0);
    }), (p, h) => (re(), He("div", {
      onClick: h[0] || (h[0] = (m) => {
        var g;
        return (g = ae(s)) == null ? void 0 : g.chain().focus().run();
      }),
      class: Oo(n.className)
    }, [
      ae(s) ? (re(), it(Sse, {
        key: 0,
        editor: ae(s)
      }, null, 8, ["editor"])) : Sr("", !0),
      Ze(ae(f1), { editor: ae(s) }, null, 8, ["editor"])
    ], 2));
  }
});
export {
  Ose as Editor
};
