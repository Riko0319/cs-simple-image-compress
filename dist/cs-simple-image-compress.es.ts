function Za(Z) {
  return Z && Z.__esModule && Object.prototype.hasOwnProperty.call(Z, "default") ? Z.default : Z;
}
function Ca(Z) {
  throw new Error('Could not dynamically require "' + Z + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var Ra = { exports: {} }, Pe = {}, _a;
function Ne() {
  return _a || (_a = 1, function(Z) {
    var W = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
    function P(a, r) {
      return Object.prototype.hasOwnProperty.call(a, r);
    }
    Z.assign = function(a) {
      for (var r = Array.prototype.slice.call(arguments, 1); r.length; ) {
        var h = r.shift();
        if (h) {
          if (typeof h != "object")
            throw new TypeError(h + "must be non-object");
          for (var n in h)
            P(h, n) && (a[n] = h[n]);
        }
      }
      return a;
    }, Z.shrinkBuf = function(a, r) {
      return a.length === r ? a : a.subarray ? a.subarray(0, r) : (a.length = r, a);
    };
    var b = {
      arraySet: function(a, r, h, n, s) {
        if (r.subarray && a.subarray) {
          a.set(r.subarray(h, h + n), s);
          return;
        }
        for (var v = 0; v < n; v++)
          a[s + v] = r[h + v];
      },
      // Join array of chunks to single array.
      flattenChunks: function(a) {
        var r, h, n, s, v, l;
        for (n = 0, r = 0, h = a.length; r < h; r++)
          n += a[r].length;
        for (l = new Uint8Array(n), s = 0, r = 0, h = a.length; r < h; r++)
          v = a[r], l.set(v, s), s += v.length;
        return l;
      }
    }, J = {
      arraySet: function(a, r, h, n, s) {
        for (var v = 0; v < n; v++)
          a[s + v] = r[h + v];
      },
      // Join array of chunks to single array.
      flattenChunks: function(a) {
        return [].concat.apply([], a);
      }
    };
    Z.setTyped = function(a) {
      a ? (Z.Buf8 = Uint8Array, Z.Buf16 = Uint16Array, Z.Buf32 = Int32Array, Z.assign(Z, b)) : (Z.Buf8 = Array, Z.Buf16 = Array, Z.Buf32 = Array, Z.assign(Z, J));
    }, Z.setTyped(W);
  }(Pe)), Pe;
}
var We = {}, Ce = {}, Ue = {}, ua;
function Ba() {
  if (ua) return Ue;
  ua = 1;
  var Z = Ne(), W = 4, P = 0, b = 1, J = 2;
  function a(o) {
    for (var I = o.length; --I >= 0; )
      o[I] = 0;
  }
  var r = 0, h = 1, n = 2, s = 3, v = 258, l = 29, u = 256, w = u + 1 + l, f = 30, R = 19, A = 2 * w + 1, _ = 15, d = 16, k = 7, T = 256, y = 16, C = 17, x = 18, D = (
    /* extra bits for each length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
  ), N = (
    /* extra bits for each distance code */
    [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
  ), H = (
    /* extra bits for each bit length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
  ), O = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], M = 512, L = new Array((w + 2) * 2);
  a(L);
  var U = new Array(f * 2);
  a(U);
  var V = new Array(M);
  a(V);
  var j = new Array(v - s + 1);
  a(j);
  var q = new Array(l);
  a(q);
  var X = new Array(f);
  a(X);
  function te(o, I, B, Y, g) {
    this.static_tree = o, this.extra_bits = I, this.extra_base = B, this.elems = Y, this.max_length = g, this.has_stree = o && o.length;
  }
  var we, pe, ue;
  function he(o, I) {
    this.dyn_tree = o, this.max_code = 0, this.stat_desc = I;
  }
  function de(o) {
    return o < 256 ? V[o] : V[256 + (o >>> 7)];
  }
  function _e(o, I) {
    o.pending_buf[o.pending++] = I & 255, o.pending_buf[o.pending++] = I >>> 8 & 255;
  }
  function ie(o, I, B) {
    o.bi_valid > d - B ? (o.bi_buf |= I << o.bi_valid & 65535, _e(o, o.bi_buf), o.bi_buf = I >> d - o.bi_valid, o.bi_valid += B - d) : (o.bi_buf |= I << o.bi_valid & 65535, o.bi_valid += B);
  }
  function le(o, I, B) {
    ie(
      o,
      B[I * 2],
      B[I * 2 + 1]
      /*.Len*/
    );
  }
  function ae(o, I) {
    var B = 0;
    do
      B |= o & 1, o >>>= 1, B <<= 1;
    while (--I > 0);
    return B >>> 1;
  }
  function G(o) {
    o.bi_valid === 16 ? (_e(o, o.bi_buf), o.bi_buf = 0, o.bi_valid = 0) : o.bi_valid >= 8 && (o.pending_buf[o.pending++] = o.bi_buf & 255, o.bi_buf >>= 8, o.bi_valid -= 8);
  }
  function Se(o, I) {
    var B = I.dyn_tree, Y = I.max_code, g = I.stat_desc.static_tree, z = I.stat_desc.has_stree, t = I.stat_desc.extra_bits, m = I.stat_desc.extra_base, Q = I.stat_desc.max_length, e, E, S, i, c, p, $ = 0;
    for (i = 0; i <= _; i++)
      o.bl_count[i] = 0;
    for (B[o.heap[o.heap_max] * 2 + 1] = 0, e = o.heap_max + 1; e < A; e++)
      E = o.heap[e], i = B[B[E * 2 + 1] * 2 + 1] + 1, i > Q && (i = Q, $++), B[E * 2 + 1] = i, !(E > Y) && (o.bl_count[i]++, c = 0, E >= m && (c = t[E - m]), p = B[E * 2], o.opt_len += p * (i + c), z && (o.static_len += p * (g[E * 2 + 1] + c)));
    if ($ !== 0) {
      do {
        for (i = Q - 1; o.bl_count[i] === 0; )
          i--;
        o.bl_count[i]--, o.bl_count[i + 1] += 2, o.bl_count[Q]--, $ -= 2;
      } while ($ > 0);
      for (i = Q; i !== 0; i--)
        for (E = o.bl_count[i]; E !== 0; )
          S = o.heap[--e], !(S > Y) && (B[S * 2 + 1] !== i && (o.opt_len += (i - B[S * 2 + 1]) * B[S * 2], B[S * 2 + 1] = i), E--);
    }
  }
  function Ae(o, I, B) {
    var Y = new Array(_ + 1), g = 0, z, t;
    for (z = 1; z <= _; z++)
      Y[z] = g = g + B[z - 1] << 1;
    for (t = 0; t <= I; t++) {
      var m = o[t * 2 + 1];
      m !== 0 && (o[t * 2] = ae(Y[m]++, m));
    }
  }
  function ee() {
    var o, I, B, Y, g, z = new Array(_ + 1);
    for (B = 0, Y = 0; Y < l - 1; Y++)
      for (q[Y] = B, o = 0; o < 1 << D[Y]; o++)
        j[B++] = Y;
    for (j[B - 1] = Y, g = 0, Y = 0; Y < 16; Y++)
      for (X[Y] = g, o = 0; o < 1 << N[Y]; o++)
        V[g++] = Y;
    for (g >>= 7; Y < f; Y++)
      for (X[Y] = g << 7, o = 0; o < 1 << N[Y] - 7; o++)
        V[256 + g++] = Y;
    for (I = 0; I <= _; I++)
      z[I] = 0;
    for (o = 0; o <= 143; )
      L[o * 2 + 1] = 8, o++, z[8]++;
    for (; o <= 255; )
      L[o * 2 + 1] = 9, o++, z[9]++;
    for (; o <= 279; )
      L[o * 2 + 1] = 7, o++, z[7]++;
    for (; o <= 287; )
      L[o * 2 + 1] = 8, o++, z[8]++;
    for (Ae(L, w + 1, z), o = 0; o < f; o++)
      U[o * 2 + 1] = 5, U[o * 2] = ae(o, 5);
    we = new te(L, D, u + 1, w, _), pe = new te(U, N, 0, f, _), ue = new te(new Array(0), H, 0, R, k);
  }
  function ce(o) {
    var I;
    for (I = 0; I < w; I++)
      o.dyn_ltree[I * 2] = 0;
    for (I = 0; I < f; I++)
      o.dyn_dtree[I * 2] = 0;
    for (I = 0; I < R; I++)
      o.bl_tree[I * 2] = 0;
    o.dyn_ltree[T * 2] = 1, o.opt_len = o.static_len = 0, o.last_lit = o.matches = 0;
  }
  function Te(o) {
    o.bi_valid > 8 ? _e(o, o.bi_buf) : o.bi_valid > 0 && (o.pending_buf[o.pending++] = o.bi_buf), o.bi_buf = 0, o.bi_valid = 0;
  }
  function ze(o, I, B, Y) {
    Te(o), _e(o, B), _e(o, ~B), Z.arraySet(o.pending_buf, o.window, I, B, o.pending), o.pending += B;
  }
  function be(o, I, B, Y) {
    var g = I * 2, z = B * 2;
    return o[g] < o[z] || o[g] === o[z] && Y[I] <= Y[B];
  }
  function oe(o, I, B) {
    for (var Y = o.heap[B], g = B << 1; g <= o.heap_len && (g < o.heap_len && be(I, o.heap[g + 1], o.heap[g], o.depth) && g++, !be(I, Y, o.heap[g], o.depth)); )
      o.heap[B] = o.heap[g], B = g, g <<= 1;
    o.heap[B] = Y;
  }
  function re(o, I, B) {
    var Y, g, z = 0, t, m;
    if (o.last_lit !== 0)
      do
        Y = o.pending_buf[o.d_buf + z * 2] << 8 | o.pending_buf[o.d_buf + z * 2 + 1], g = o.pending_buf[o.l_buf + z], z++, Y === 0 ? le(o, g, I) : (t = j[g], le(o, t + u + 1, I), m = D[t], m !== 0 && (g -= q[t], ie(o, g, m)), Y--, t = de(Y), le(o, t, B), m = N[t], m !== 0 && (Y -= X[t], ie(o, Y, m)));
      while (z < o.last_lit);
    le(o, T, I);
  }
  function ye(o, I) {
    var B = I.dyn_tree, Y = I.stat_desc.static_tree, g = I.stat_desc.has_stree, z = I.stat_desc.elems, t, m, Q = -1, e;
    for (o.heap_len = 0, o.heap_max = A, t = 0; t < z; t++)
      B[t * 2] !== 0 ? (o.heap[++o.heap_len] = Q = t, o.depth[t] = 0) : B[t * 2 + 1] = 0;
    for (; o.heap_len < 2; )
      e = o.heap[++o.heap_len] = Q < 2 ? ++Q : 0, B[e * 2] = 1, o.depth[e] = 0, o.opt_len--, g && (o.static_len -= Y[e * 2 + 1]);
    for (I.max_code = Q, t = o.heap_len >> 1; t >= 1; t--)
      oe(o, B, t);
    e = z;
    do
      t = o.heap[
        1
        /*SMALLEST*/
      ], o.heap[
        1
        /*SMALLEST*/
      ] = o.heap[o.heap_len--], oe(
        o,
        B,
        1
        /*SMALLEST*/
      ), m = o.heap[
        1
        /*SMALLEST*/
      ], o.heap[--o.heap_max] = t, o.heap[--o.heap_max] = m, B[e * 2] = B[t * 2] + B[m * 2], o.depth[e] = (o.depth[t] >= o.depth[m] ? o.depth[t] : o.depth[m]) + 1, B[t * 2 + 1] = B[m * 2 + 1] = e, o.heap[
        1
        /*SMALLEST*/
      ] = e++, oe(
        o,
        B,
        1
        /*SMALLEST*/
      );
    while (o.heap_len >= 2);
    o.heap[--o.heap_max] = o.heap[
      1
      /*SMALLEST*/
    ], Se(o, I), Ae(B, Q, o.bl_count);
  }
  function Ye(o, I, B) {
    var Y, g = -1, z, t = I[0 * 2 + 1], m = 0, Q = 7, e = 4;
    for (t === 0 && (Q = 138, e = 3), I[(B + 1) * 2 + 1] = 65535, Y = 0; Y <= B; Y++)
      z = t, t = I[(Y + 1) * 2 + 1], !(++m < Q && z === t) && (m < e ? o.bl_tree[z * 2] += m : z !== 0 ? (z !== g && o.bl_tree[z * 2]++, o.bl_tree[y * 2]++) : m <= 10 ? o.bl_tree[C * 2]++ : o.bl_tree[x * 2]++, m = 0, g = z, t === 0 ? (Q = 138, e = 3) : z === t ? (Q = 6, e = 3) : (Q = 7, e = 4));
  }
  function Fe(o, I, B) {
    var Y, g = -1, z, t = I[0 * 2 + 1], m = 0, Q = 7, e = 4;
    for (t === 0 && (Q = 138, e = 3), Y = 0; Y <= B; Y++)
      if (z = t, t = I[(Y + 1) * 2 + 1], !(++m < Q && z === t)) {
        if (m < e)
          do
            le(o, z, o.bl_tree);
          while (--m !== 0);
        else z !== 0 ? (z !== g && (le(o, z, o.bl_tree), m--), le(o, y, o.bl_tree), ie(o, m - 3, 2)) : m <= 10 ? (le(o, C, o.bl_tree), ie(o, m - 3, 3)) : (le(o, x, o.bl_tree), ie(o, m - 11, 7));
        m = 0, g = z, t === 0 ? (Q = 138, e = 3) : z === t ? (Q = 6, e = 3) : (Q = 7, e = 4);
      }
  }
  function Ie(o) {
    var I;
    for (Ye(o, o.dyn_ltree, o.l_desc.max_code), Ye(o, o.dyn_dtree, o.d_desc.max_code), ye(o, o.bl_desc), I = R - 1; I >= 3 && o.bl_tree[O[I] * 2 + 1] === 0; I--)
      ;
    return o.opt_len += 3 * (I + 1) + 5 + 5 + 4, I;
  }
  function Xe(o, I, B, Y) {
    var g;
    for (ie(o, I - 257, 5), ie(o, B - 1, 5), ie(o, Y - 4, 4), g = 0; g < Y; g++)
      ie(o, o.bl_tree[O[g] * 2 + 1], 3);
    Fe(o, o.dyn_ltree, I - 1), Fe(o, o.dyn_dtree, B - 1);
  }
  function He(o) {
    var I = 4093624447, B;
    for (B = 0; B <= 31; B++, I >>>= 1)
      if (I & 1 && o.dyn_ltree[B * 2] !== 0)
        return P;
    if (o.dyn_ltree[9 * 2] !== 0 || o.dyn_ltree[10 * 2] !== 0 || o.dyn_ltree[13 * 2] !== 0)
      return b;
    for (B = 32; B < u; B++)
      if (o.dyn_ltree[B * 2] !== 0)
        return b;
    return P;
  }
  var Ze = !1;
  function je(o) {
    Ze || (ee(), Ze = !0), o.l_desc = new he(o.dyn_ltree, we), o.d_desc = new he(o.dyn_dtree, pe), o.bl_desc = new he(o.bl_tree, ue), o.bi_buf = 0, o.bi_valid = 0, ce(o);
  }
  function qe(o, I, B, Y) {
    ie(o, (r << 1) + (Y ? 1 : 0), 3), ze(o, I, B);
  }
  function ke(o) {
    ie(o, h << 1, 3), le(o, T, L), G(o);
  }
  function Be(o, I, B, Y) {
    var g, z, t = 0;
    o.level > 0 ? (o.strm.data_type === J && (o.strm.data_type = He(o)), ye(o, o.l_desc), ye(o, o.d_desc), t = Ie(o), g = o.opt_len + 3 + 7 >>> 3, z = o.static_len + 3 + 7 >>> 3, z <= g && (g = z)) : g = z = B + 5, B + 4 <= g && I !== -1 ? qe(o, I, B, Y) : o.strategy === W || z === g ? (ie(o, (h << 1) + (Y ? 1 : 0), 3), re(o, L, U)) : (ie(o, (n << 1) + (Y ? 1 : 0), 3), Xe(o, o.l_desc.max_code + 1, o.d_desc.max_code + 1, t + 1), re(o, o.dyn_ltree, o.dyn_dtree)), ce(o), Y && Te(o);
  }
  function $e(o, I, B) {
    return o.pending_buf[o.d_buf + o.last_lit * 2] = I >>> 8 & 255, o.pending_buf[o.d_buf + o.last_lit * 2 + 1] = I & 255, o.pending_buf[o.l_buf + o.last_lit] = B & 255, o.last_lit++, I === 0 ? o.dyn_ltree[B * 2]++ : (o.matches++, I--, o.dyn_ltree[(j[B] + u + 1) * 2]++, o.dyn_dtree[de(I) * 2]++), o.last_lit === o.lit_bufsize - 1;
  }
  return Ue._tr_init = je, Ue._tr_stored_block = qe, Ue._tr_flush_block = Be, Ue._tr_tally = $e, Ue._tr_align = ke, Ue;
}
var Ge, va;
function Ta() {
  if (va) return Ge;
  va = 1;
  function Z(W, P, b, J) {
    for (var a = W & 65535 | 0, r = W >>> 16 & 65535 | 0, h = 0; b !== 0; ) {
      h = b > 2e3 ? 2e3 : b, b -= h;
      do
        a = a + P[J++] | 0, r = r + a | 0;
      while (--h);
      a %= 65521, r %= 65521;
    }
    return a | r << 16 | 0;
  }
  return Ge = Z, Ge;
}
var ea, da;
function ya() {
  if (da) return ea;
  da = 1;
  function Z() {
    for (var b, J = [], a = 0; a < 256; a++) {
      b = a;
      for (var r = 0; r < 8; r++)
        b = b & 1 ? 3988292384 ^ b >>> 1 : b >>> 1;
      J[a] = b;
    }
    return J;
  }
  var W = Z();
  function P(b, J, a, r) {
    var h = W, n = r + a;
    b ^= -1;
    for (var s = r; s < n; s++)
      b = b >>> 8 ^ h[(b ^ J[s]) & 255];
    return b ^ -1;
  }
  return ea = P, ea;
}
var aa, ca;
function oa() {
  return ca || (ca = 1, aa = {
    2: "need dictionary",
    /* Z_NEED_DICT       2  */
    1: "stream end",
    /* Z_STREAM_END      1  */
    0: "",
    /* Z_OK              0  */
    "-1": "file error",
    /* Z_ERRNO         (-1) */
    "-2": "stream error",
    /* Z_STREAM_ERROR  (-2) */
    "-3": "data error",
    /* Z_DATA_ERROR    (-3) */
    "-4": "insufficient memory",
    /* Z_MEM_ERROR     (-4) */
    "-5": "buffer error",
    /* Z_BUF_ERROR     (-5) */
    "-6": "incompatible version"
    /* Z_VERSION_ERROR (-6) */
  }), aa;
}
var sa;
function La() {
  if (sa) return Ce;
  sa = 1;
  var Z = Ne(), W = Ba(), P = Ta(), b = ya(), J = oa(), a = 0, r = 1, h = 3, n = 4, s = 5, v = 0, l = 1, u = -2, w = -3, f = -5, R = -1, A = 1, _ = 2, d = 3, k = 4, T = 0, y = 2, C = 8, x = 9, D = 15, N = 8, H = 29, O = 256, M = O + 1 + H, L = 30, U = 19, V = 2 * M + 1, j = 15, q = 3, X = 258, te = X + q + 1, we = 32, pe = 42, ue = 69, he = 73, de = 91, _e = 103, ie = 113, le = 666, ae = 1, G = 2, Se = 3, Ae = 4, ee = 3;
  function ce(e, E) {
    return e.msg = J[E], E;
  }
  function Te(e) {
    return (e << 1) - (e > 4 ? 9 : 0);
  }
  function ze(e) {
    for (var E = e.length; --E >= 0; )
      e[E] = 0;
  }
  function be(e) {
    var E = e.state, S = E.pending;
    S > e.avail_out && (S = e.avail_out), S !== 0 && (Z.arraySet(e.output, E.pending_buf, E.pending_out, S, e.next_out), e.next_out += S, E.pending_out += S, e.total_out += S, e.avail_out -= S, E.pending -= S, E.pending === 0 && (E.pending_out = 0));
  }
  function oe(e, E) {
    W._tr_flush_block(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, E), e.block_start = e.strstart, be(e.strm);
  }
  function re(e, E) {
    e.pending_buf[e.pending++] = E;
  }
  function ye(e, E) {
    e.pending_buf[e.pending++] = E >>> 8 & 255, e.pending_buf[e.pending++] = E & 255;
  }
  function Ye(e, E, S, i) {
    var c = e.avail_in;
    return c > i && (c = i), c === 0 ? 0 : (e.avail_in -= c, Z.arraySet(E, e.input, e.next_in, c, S), e.state.wrap === 1 ? e.adler = P(e.adler, E, c, S) : e.state.wrap === 2 && (e.adler = b(e.adler, E, c, S)), e.next_in += c, e.total_in += c, c);
  }
  function Fe(e, E) {
    var S = e.max_chain_length, i = e.strstart, c, p, $ = e.prev_length, F = e.nice_match, K = e.strstart > e.w_size - te ? e.strstart - (e.w_size - te) : 0, ne = e.window, Oe = e.w_mask, ve = e.prev, fe = e.strstart + X, ge = ne[i + $ - 1], Ee = ne[i + $];
    e.prev_length >= e.good_match && (S >>= 2), F > e.lookahead && (F = e.lookahead);
    do
      if (c = E, !(ne[c + $] !== Ee || ne[c + $ - 1] !== ge || ne[c] !== ne[i] || ne[++c] !== ne[i + 1])) {
        i += 2, c++;
        do
          ;
        while (ne[++i] === ne[++c] && ne[++i] === ne[++c] && ne[++i] === ne[++c] && ne[++i] === ne[++c] && ne[++i] === ne[++c] && ne[++i] === ne[++c] && ne[++i] === ne[++c] && ne[++i] === ne[++c] && i < fe);
        if (p = X - (fe - i), i = fe - X, p > $) {
          if (e.match_start = E, $ = p, p >= F)
            break;
          ge = ne[i + $ - 1], Ee = ne[i + $];
        }
      }
    while ((E = ve[E & Oe]) > K && --S !== 0);
    return $ <= e.lookahead ? $ : e.lookahead;
  }
  function Ie(e) {
    var E = e.w_size, S, i, c, p, $;
    do {
      if (p = e.window_size - e.lookahead - e.strstart, e.strstart >= E + (E - te)) {
        Z.arraySet(e.window, e.window, E, E, 0), e.match_start -= E, e.strstart -= E, e.block_start -= E, i = e.hash_size, S = i;
        do
          c = e.head[--S], e.head[S] = c >= E ? c - E : 0;
        while (--i);
        i = E, S = i;
        do
          c = e.prev[--S], e.prev[S] = c >= E ? c - E : 0;
        while (--i);
        p += E;
      }
      if (e.strm.avail_in === 0)
        break;
      if (i = Ye(e.strm, e.window, e.strstart + e.lookahead, p), e.lookahead += i, e.lookahead + e.insert >= q)
        for ($ = e.strstart - e.insert, e.ins_h = e.window[$], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[$ + 1]) & e.hash_mask; e.insert && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[$ + q - 1]) & e.hash_mask, e.prev[$ & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = $, $++, e.insert--, !(e.lookahead + e.insert < q)); )
          ;
    } while (e.lookahead < te && e.strm.avail_in !== 0);
  }
  function Xe(e, E) {
    var S = 65535;
    for (S > e.pending_buf_size - 5 && (S = e.pending_buf_size - 5); ; ) {
      if (e.lookahead <= 1) {
        if (Ie(e), e.lookahead === 0 && E === a)
          return ae;
        if (e.lookahead === 0)
          break;
      }
      e.strstart += e.lookahead, e.lookahead = 0;
      var i = e.block_start + S;
      if ((e.strstart === 0 || e.strstart >= i) && (e.lookahead = e.strstart - i, e.strstart = i, oe(e, !1), e.strm.avail_out === 0) || e.strstart - e.block_start >= e.w_size - te && (oe(e, !1), e.strm.avail_out === 0))
        return ae;
    }
    return e.insert = 0, E === n ? (oe(e, !0), e.strm.avail_out === 0 ? Se : Ae) : (e.strstart > e.block_start && (oe(e, !1), e.strm.avail_out === 0), ae);
  }
  function He(e, E) {
    for (var S, i; ; ) {
      if (e.lookahead < te) {
        if (Ie(e), e.lookahead < te && E === a)
          return ae;
        if (e.lookahead === 0)
          break;
      }
      if (S = 0, e.lookahead >= q && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + q - 1]) & e.hash_mask, S = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), S !== 0 && e.strstart - S <= e.w_size - te && (e.match_length = Fe(e, S)), e.match_length >= q)
        if (i = W._tr_tally(e, e.strstart - e.match_start, e.match_length - q), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= q) {
          e.match_length--;
          do
            e.strstart++, e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + q - 1]) & e.hash_mask, S = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart;
          while (--e.match_length !== 0);
          e.strstart++;
        } else
          e.strstart += e.match_length, e.match_length = 0, e.ins_h = e.window[e.strstart], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 1]) & e.hash_mask;
      else
        i = W._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
      if (i && (oe(e, !1), e.strm.avail_out === 0))
        return ae;
    }
    return e.insert = e.strstart < q - 1 ? e.strstart : q - 1, E === n ? (oe(e, !0), e.strm.avail_out === 0 ? Se : Ae) : e.last_lit && (oe(e, !1), e.strm.avail_out === 0) ? ae : G;
  }
  function Ze(e, E) {
    for (var S, i, c; ; ) {
      if (e.lookahead < te) {
        if (Ie(e), e.lookahead < te && E === a)
          return ae;
        if (e.lookahead === 0)
          break;
      }
      if (S = 0, e.lookahead >= q && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + q - 1]) & e.hash_mask, S = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = q - 1, S !== 0 && e.prev_length < e.max_lazy_match && e.strstart - S <= e.w_size - te && (e.match_length = Fe(e, S), e.match_length <= 5 && (e.strategy === A || e.match_length === q && e.strstart - e.match_start > 4096) && (e.match_length = q - 1)), e.prev_length >= q && e.match_length <= e.prev_length) {
        c = e.strstart + e.lookahead - q, i = W._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - q), e.lookahead -= e.prev_length - 1, e.prev_length -= 2;
        do
          ++e.strstart <= c && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + q - 1]) & e.hash_mask, S = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart);
        while (--e.prev_length !== 0);
        if (e.match_available = 0, e.match_length = q - 1, e.strstart++, i && (oe(e, !1), e.strm.avail_out === 0))
          return ae;
      } else if (e.match_available) {
        if (i = W._tr_tally(e, 0, e.window[e.strstart - 1]), i && oe(e, !1), e.strstart++, e.lookahead--, e.strm.avail_out === 0)
          return ae;
      } else
        e.match_available = 1, e.strstart++, e.lookahead--;
    }
    return e.match_available && (i = W._tr_tally(e, 0, e.window[e.strstart - 1]), e.match_available = 0), e.insert = e.strstart < q - 1 ? e.strstart : q - 1, E === n ? (oe(e, !0), e.strm.avail_out === 0 ? Se : Ae) : e.last_lit && (oe(e, !1), e.strm.avail_out === 0) ? ae : G;
  }
  function je(e, E) {
    for (var S, i, c, p, $ = e.window; ; ) {
      if (e.lookahead <= X) {
        if (Ie(e), e.lookahead <= X && E === a)
          return ae;
        if (e.lookahead === 0)
          break;
      }
      if (e.match_length = 0, e.lookahead >= q && e.strstart > 0 && (c = e.strstart - 1, i = $[c], i === $[++c] && i === $[++c] && i === $[++c])) {
        p = e.strstart + X;
        do
          ;
        while (i === $[++c] && i === $[++c] && i === $[++c] && i === $[++c] && i === $[++c] && i === $[++c] && i === $[++c] && i === $[++c] && c < p);
        e.match_length = X - (p - c), e.match_length > e.lookahead && (e.match_length = e.lookahead);
      }
      if (e.match_length >= q ? (S = W._tr_tally(e, 1, e.match_length - q), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (S = W._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), S && (oe(e, !1), e.strm.avail_out === 0))
        return ae;
    }
    return e.insert = 0, E === n ? (oe(e, !0), e.strm.avail_out === 0 ? Se : Ae) : e.last_lit && (oe(e, !1), e.strm.avail_out === 0) ? ae : G;
  }
  function qe(e, E) {
    for (var S; ; ) {
      if (e.lookahead === 0 && (Ie(e), e.lookahead === 0)) {
        if (E === a)
          return ae;
        break;
      }
      if (e.match_length = 0, S = W._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, S && (oe(e, !1), e.strm.avail_out === 0))
        return ae;
    }
    return e.insert = 0, E === n ? (oe(e, !0), e.strm.avail_out === 0 ? Se : Ae) : e.last_lit && (oe(e, !1), e.strm.avail_out === 0) ? ae : G;
  }
  function ke(e, E, S, i, c) {
    this.good_length = e, this.max_lazy = E, this.nice_length = S, this.max_chain = i, this.func = c;
  }
  var Be;
  Be = [
    /*      good lazy nice chain */
    new ke(0, 0, 0, 0, Xe),
    /* 0 store only */
    new ke(4, 4, 8, 4, He),
    /* 1 max speed, no lazy matches */
    new ke(4, 5, 16, 8, He),
    /* 2 */
    new ke(4, 6, 32, 32, He),
    /* 3 */
    new ke(4, 4, 16, 16, Ze),
    /* 4 lazy matches */
    new ke(8, 16, 32, 32, Ze),
    /* 5 */
    new ke(8, 16, 128, 128, Ze),
    /* 6 */
    new ke(8, 32, 128, 256, Ze),
    /* 7 */
    new ke(32, 128, 258, 1024, Ze),
    /* 8 */
    new ke(32, 258, 258, 4096, Ze)
    /* 9 max compression */
  ];
  function $e(e) {
    e.window_size = 2 * e.w_size, ze(e.head), e.max_lazy_match = Be[e.level].max_lazy, e.good_match = Be[e.level].good_length, e.nice_match = Be[e.level].nice_length, e.max_chain_length = Be[e.level].max_chain, e.strstart = 0, e.block_start = 0, e.lookahead = 0, e.insert = 0, e.match_length = e.prev_length = q - 1, e.match_available = 0, e.ins_h = 0;
  }
  function o() {
    this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = C, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new Z.Buf16(V * 2), this.dyn_dtree = new Z.Buf16((2 * L + 1) * 2), this.bl_tree = new Z.Buf16((2 * U + 1) * 2), ze(this.dyn_ltree), ze(this.dyn_dtree), ze(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new Z.Buf16(j + 1), this.heap = new Z.Buf16(2 * M + 1), ze(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new Z.Buf16(2 * M + 1), ze(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
  }
  function I(e) {
    var E;
    return !e || !e.state ? ce(e, u) : (e.total_in = e.total_out = 0, e.data_type = y, E = e.state, E.pending = 0, E.pending_out = 0, E.wrap < 0 && (E.wrap = -E.wrap), E.status = E.wrap ? pe : ie, e.adler = E.wrap === 2 ? 0 : 1, E.last_flush = a, W._tr_init(E), v);
  }
  function B(e) {
    var E = I(e);
    return E === v && $e(e.state), E;
  }
  function Y(e, E) {
    return !e || !e.state || e.state.wrap !== 2 ? u : (e.state.gzhead = E, v);
  }
  function g(e, E, S, i, c, p) {
    if (!e)
      return u;
    var $ = 1;
    if (E === R && (E = 6), i < 0 ? ($ = 0, i = -i) : i > 15 && ($ = 2, i -= 16), c < 1 || c > x || S !== C || i < 8 || i > 15 || E < 0 || E > 9 || p < 0 || p > k)
      return ce(e, u);
    i === 8 && (i = 9);
    var F = new o();
    return e.state = F, F.strm = e, F.wrap = $, F.gzhead = null, F.w_bits = i, F.w_size = 1 << F.w_bits, F.w_mask = F.w_size - 1, F.hash_bits = c + 7, F.hash_size = 1 << F.hash_bits, F.hash_mask = F.hash_size - 1, F.hash_shift = ~~((F.hash_bits + q - 1) / q), F.window = new Z.Buf8(F.w_size * 2), F.head = new Z.Buf16(F.hash_size), F.prev = new Z.Buf16(F.w_size), F.lit_bufsize = 1 << c + 6, F.pending_buf_size = F.lit_bufsize * 4, F.pending_buf = new Z.Buf8(F.pending_buf_size), F.d_buf = 1 * F.lit_bufsize, F.l_buf = 3 * F.lit_bufsize, F.level = E, F.strategy = p, F.method = S, B(e);
  }
  function z(e, E) {
    return g(e, E, C, D, N, T);
  }
  function t(e, E) {
    var S, i, c, p;
    if (!e || !e.state || E > s || E < 0)
      return e ? ce(e, u) : u;
    if (i = e.state, !e.output || !e.input && e.avail_in !== 0 || i.status === le && E !== n)
      return ce(e, e.avail_out === 0 ? f : u);
    if (i.strm = e, S = i.last_flush, i.last_flush = E, i.status === pe)
      if (i.wrap === 2)
        e.adler = 0, re(i, 31), re(i, 139), re(i, 8), i.gzhead ? (re(
          i,
          (i.gzhead.text ? 1 : 0) + (i.gzhead.hcrc ? 2 : 0) + (i.gzhead.extra ? 4 : 0) + (i.gzhead.name ? 8 : 0) + (i.gzhead.comment ? 16 : 0)
        ), re(i, i.gzhead.time & 255), re(i, i.gzhead.time >> 8 & 255), re(i, i.gzhead.time >> 16 & 255), re(i, i.gzhead.time >> 24 & 255), re(i, i.level === 9 ? 2 : i.strategy >= _ || i.level < 2 ? 4 : 0), re(i, i.gzhead.os & 255), i.gzhead.extra && i.gzhead.extra.length && (re(i, i.gzhead.extra.length & 255), re(i, i.gzhead.extra.length >> 8 & 255)), i.gzhead.hcrc && (e.adler = b(e.adler, i.pending_buf, i.pending, 0)), i.gzindex = 0, i.status = ue) : (re(i, 0), re(i, 0), re(i, 0), re(i, 0), re(i, 0), re(i, i.level === 9 ? 2 : i.strategy >= _ || i.level < 2 ? 4 : 0), re(i, ee), i.status = ie);
      else {
        var $ = C + (i.w_bits - 8 << 4) << 8, F = -1;
        i.strategy >= _ || i.level < 2 ? F = 0 : i.level < 6 ? F = 1 : i.level === 6 ? F = 2 : F = 3, $ |= F << 6, i.strstart !== 0 && ($ |= we), $ += 31 - $ % 31, i.status = ie, ye(i, $), i.strstart !== 0 && (ye(i, e.adler >>> 16), ye(i, e.adler & 65535)), e.adler = 1;
      }
    if (i.status === ue)
      if (i.gzhead.extra) {
        for (c = i.pending; i.gzindex < (i.gzhead.extra.length & 65535) && !(i.pending === i.pending_buf_size && (i.gzhead.hcrc && i.pending > c && (e.adler = b(e.adler, i.pending_buf, i.pending - c, c)), be(e), c = i.pending, i.pending === i.pending_buf_size)); )
          re(i, i.gzhead.extra[i.gzindex] & 255), i.gzindex++;
        i.gzhead.hcrc && i.pending > c && (e.adler = b(e.adler, i.pending_buf, i.pending - c, c)), i.gzindex === i.gzhead.extra.length && (i.gzindex = 0, i.status = he);
      } else
        i.status = he;
    if (i.status === he)
      if (i.gzhead.name) {
        c = i.pending;
        do {
          if (i.pending === i.pending_buf_size && (i.gzhead.hcrc && i.pending > c && (e.adler = b(e.adler, i.pending_buf, i.pending - c, c)), be(e), c = i.pending, i.pending === i.pending_buf_size)) {
            p = 1;
            break;
          }
          i.gzindex < i.gzhead.name.length ? p = i.gzhead.name.charCodeAt(i.gzindex++) & 255 : p = 0, re(i, p);
        } while (p !== 0);
        i.gzhead.hcrc && i.pending > c && (e.adler = b(e.adler, i.pending_buf, i.pending - c, c)), p === 0 && (i.gzindex = 0, i.status = de);
      } else
        i.status = de;
    if (i.status === de)
      if (i.gzhead.comment) {
        c = i.pending;
        do {
          if (i.pending === i.pending_buf_size && (i.gzhead.hcrc && i.pending > c && (e.adler = b(e.adler, i.pending_buf, i.pending - c, c)), be(e), c = i.pending, i.pending === i.pending_buf_size)) {
            p = 1;
            break;
          }
          i.gzindex < i.gzhead.comment.length ? p = i.gzhead.comment.charCodeAt(i.gzindex++) & 255 : p = 0, re(i, p);
        } while (p !== 0);
        i.gzhead.hcrc && i.pending > c && (e.adler = b(e.adler, i.pending_buf, i.pending - c, c)), p === 0 && (i.status = _e);
      } else
        i.status = _e;
    if (i.status === _e && (i.gzhead.hcrc ? (i.pending + 2 > i.pending_buf_size && be(e), i.pending + 2 <= i.pending_buf_size && (re(i, e.adler & 255), re(i, e.adler >> 8 & 255), e.adler = 0, i.status = ie)) : i.status = ie), i.pending !== 0) {
      if (be(e), e.avail_out === 0)
        return i.last_flush = -1, v;
    } else if (e.avail_in === 0 && Te(E) <= Te(S) && E !== n)
      return ce(e, f);
    if (i.status === le && e.avail_in !== 0)
      return ce(e, f);
    if (e.avail_in !== 0 || i.lookahead !== 0 || E !== a && i.status !== le) {
      var K = i.strategy === _ ? qe(i, E) : i.strategy === d ? je(i, E) : Be[i.level].func(i, E);
      if ((K === Se || K === Ae) && (i.status = le), K === ae || K === Se)
        return e.avail_out === 0 && (i.last_flush = -1), v;
      if (K === G && (E === r ? W._tr_align(i) : E !== s && (W._tr_stored_block(i, 0, 0, !1), E === h && (ze(i.head), i.lookahead === 0 && (i.strstart = 0, i.block_start = 0, i.insert = 0))), be(e), e.avail_out === 0))
        return i.last_flush = -1, v;
    }
    return E !== n ? v : i.wrap <= 0 ? l : (i.wrap === 2 ? (re(i, e.adler & 255), re(i, e.adler >> 8 & 255), re(i, e.adler >> 16 & 255), re(i, e.adler >> 24 & 255), re(i, e.total_in & 255), re(i, e.total_in >> 8 & 255), re(i, e.total_in >> 16 & 255), re(i, e.total_in >> 24 & 255)) : (ye(i, e.adler >>> 16), ye(i, e.adler & 65535)), be(e), i.wrap > 0 && (i.wrap = -i.wrap), i.pending !== 0 ? v : l);
  }
  function m(e) {
    var E;
    return !e || !e.state ? u : (E = e.state.status, E !== pe && E !== ue && E !== he && E !== de && E !== _e && E !== ie && E !== le ? ce(e, u) : (e.state = null, E === ie ? ce(e, w) : v));
  }
  function Q(e, E) {
    var S = E.length, i, c, p, $, F, K, ne, Oe;
    if (!e || !e.state || (i = e.state, $ = i.wrap, $ === 2 || $ === 1 && i.status !== pe || i.lookahead))
      return u;
    for ($ === 1 && (e.adler = P(e.adler, E, S, 0)), i.wrap = 0, S >= i.w_size && ($ === 0 && (ze(i.head), i.strstart = 0, i.block_start = 0, i.insert = 0), Oe = new Z.Buf8(i.w_size), Z.arraySet(Oe, E, S - i.w_size, i.w_size, 0), E = Oe, S = i.w_size), F = e.avail_in, K = e.next_in, ne = e.input, e.avail_in = S, e.next_in = 0, e.input = E, Ie(i); i.lookahead >= q; ) {
      c = i.strstart, p = i.lookahead - (q - 1);
      do
        i.ins_h = (i.ins_h << i.hash_shift ^ i.window[c + q - 1]) & i.hash_mask, i.prev[c & i.w_mask] = i.head[i.ins_h], i.head[i.ins_h] = c, c++;
      while (--p);
      i.strstart = c, i.lookahead = q - 1, Ie(i);
    }
    return i.strstart += i.lookahead, i.block_start = i.strstart, i.insert = i.lookahead, i.lookahead = 0, i.match_length = i.prev_length = q - 1, i.match_available = 0, e.next_in = K, e.input = ne, e.avail_in = F, i.wrap = $, v;
  }
  return Ce.deflateInit = z, Ce.deflateInit2 = g, Ce.deflateReset = B, Ce.deflateResetKeep = I, Ce.deflateSetHeader = Y, Ce.deflate = t, Ce.deflateEnd = m, Ce.deflateSetDictionary = Q, Ce.deflateInfo = "pako deflate (from Nodeca project)", Ce;
}
var Ke = {}, ga;
function Ia() {
  if (ga) return Ke;
  ga = 1;
  var Z = Ne(), W = !0, P = !0;
  try {
    String.fromCharCode.apply(null, [0]);
  } catch {
    W = !1;
  }
  try {
    String.fromCharCode.apply(null, new Uint8Array(1));
  } catch {
    P = !1;
  }
  for (var b = new Z.Buf8(256), J = 0; J < 256; J++)
    b[J] = J >= 252 ? 6 : J >= 248 ? 5 : J >= 240 ? 4 : J >= 224 ? 3 : J >= 192 ? 2 : 1;
  b[254] = b[254] = 1, Ke.string2buf = function(r) {
    var h, n, s, v, l, u = r.length, w = 0;
    for (v = 0; v < u; v++)
      n = r.charCodeAt(v), (n & 64512) === 55296 && v + 1 < u && (s = r.charCodeAt(v + 1), (s & 64512) === 56320 && (n = 65536 + (n - 55296 << 10) + (s - 56320), v++)), w += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
    for (h = new Z.Buf8(w), l = 0, v = 0; l < w; v++)
      n = r.charCodeAt(v), (n & 64512) === 55296 && v + 1 < u && (s = r.charCodeAt(v + 1), (s & 64512) === 56320 && (n = 65536 + (n - 55296 << 10) + (s - 56320), v++)), n < 128 ? h[l++] = n : n < 2048 ? (h[l++] = 192 | n >>> 6, h[l++] = 128 | n & 63) : n < 65536 ? (h[l++] = 224 | n >>> 12, h[l++] = 128 | n >>> 6 & 63, h[l++] = 128 | n & 63) : (h[l++] = 240 | n >>> 18, h[l++] = 128 | n >>> 12 & 63, h[l++] = 128 | n >>> 6 & 63, h[l++] = 128 | n & 63);
    return h;
  };
  function a(r, h) {
    if (h < 65534 && (r.subarray && P || !r.subarray && W))
      return String.fromCharCode.apply(null, Z.shrinkBuf(r, h));
    for (var n = "", s = 0; s < h; s++)
      n += String.fromCharCode(r[s]);
    return n;
  }
  return Ke.buf2binstring = function(r) {
    return a(r, r.length);
  }, Ke.binstring2buf = function(r) {
    for (var h = new Z.Buf8(r.length), n = 0, s = h.length; n < s; n++)
      h[n] = r.charCodeAt(n);
    return h;
  }, Ke.buf2string = function(r, h) {
    var n, s, v, l, u = h || r.length, w = new Array(u * 2);
    for (s = 0, n = 0; n < u; ) {
      if (v = r[n++], v < 128) {
        w[s++] = v;
        continue;
      }
      if (l = b[v], l > 4) {
        w[s++] = 65533, n += l - 1;
        continue;
      }
      for (v &= l === 2 ? 31 : l === 3 ? 15 : 7; l > 1 && n < u; )
        v = v << 6 | r[n++] & 63, l--;
      if (l > 1) {
        w[s++] = 65533;
        continue;
      }
      v < 65536 ? w[s++] = v : (v -= 65536, w[s++] = 55296 | v >> 10 & 1023, w[s++] = 56320 | v & 1023);
    }
    return a(w, s);
  }, Ke.utf8border = function(r, h) {
    var n;
    for (h = h || r.length, h > r.length && (h = r.length), n = h - 1; n >= 0 && (r[n] & 192) === 128; )
      n--;
    return n < 0 || n === 0 ? h : n + b[r[n]] > h ? n : h;
  }, Ke;
}
var ta, wa;
function Da() {
  if (wa) return ta;
  wa = 1;
  function Z() {
    this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
  }
  return ta = Z, ta;
}
var ba;
function Oa() {
  if (ba) return We;
  ba = 1;
  var Z = La(), W = Ne(), P = Ia(), b = oa(), J = Da(), a = Object.prototype.toString, r = 0, h = 4, n = 0, s = 1, v = 2, l = -1, u = 0, w = 8;
  function f(d) {
    if (!(this instanceof f)) return new f(d);
    this.options = W.assign({
      level: l,
      method: w,
      chunkSize: 16384,
      windowBits: 15,
      memLevel: 8,
      strategy: u,
      to: ""
    }, d || {});
    var k = this.options;
    k.raw && k.windowBits > 0 ? k.windowBits = -k.windowBits : k.gzip && k.windowBits > 0 && k.windowBits < 16 && (k.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new J(), this.strm.avail_out = 0;
    var T = Z.deflateInit2(
      this.strm,
      k.level,
      k.method,
      k.windowBits,
      k.memLevel,
      k.strategy
    );
    if (T !== n)
      throw new Error(b[T]);
    if (k.header && Z.deflateSetHeader(this.strm, k.header), k.dictionary) {
      var y;
      if (typeof k.dictionary == "string" ? y = P.string2buf(k.dictionary) : a.call(k.dictionary) === "[object ArrayBuffer]" ? y = new Uint8Array(k.dictionary) : y = k.dictionary, T = Z.deflateSetDictionary(this.strm, y), T !== n)
        throw new Error(b[T]);
      this._dict_set = !0;
    }
  }
  f.prototype.push = function(d, k) {
    var T = this.strm, y = this.options.chunkSize, C, x;
    if (this.ended)
      return !1;
    x = k === ~~k ? k : k === !0 ? h : r, typeof d == "string" ? T.input = P.string2buf(d) : a.call(d) === "[object ArrayBuffer]" ? T.input = new Uint8Array(d) : T.input = d, T.next_in = 0, T.avail_in = T.input.length;
    do {
      if (T.avail_out === 0 && (T.output = new W.Buf8(y), T.next_out = 0, T.avail_out = y), C = Z.deflate(T, x), C !== s && C !== n)
        return this.onEnd(C), this.ended = !0, !1;
      (T.avail_out === 0 || T.avail_in === 0 && (x === h || x === v)) && (this.options.to === "string" ? this.onData(P.buf2binstring(W.shrinkBuf(T.output, T.next_out))) : this.onData(W.shrinkBuf(T.output, T.next_out)));
    } while ((T.avail_in > 0 || T.avail_out === 0) && C !== s);
    return x === h ? (C = Z.deflateEnd(this.strm), this.onEnd(C), this.ended = !0, C === n) : (x === v && (this.onEnd(n), T.avail_out = 0), !0);
  }, f.prototype.onData = function(d) {
    this.chunks.push(d);
  }, f.prototype.onEnd = function(d) {
    d === n && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = W.flattenChunks(this.chunks)), this.chunks = [], this.err = d, this.msg = this.strm.msg;
  };
  function R(d, k) {
    var T = new f(k);
    if (T.push(d, !0), T.err)
      throw T.msg || b[T.err];
    return T.result;
  }
  function A(d, k) {
    return k = k || {}, k.raw = !0, R(d, k);
  }
  function _(d, k) {
    return k = k || {}, k.gzip = !0, R(d, k);
  }
  return We.Deflate = f, We.deflate = R, We.deflateRaw = A, We.gzip = _, We;
}
var Ve = {}, me = {}, ra, xa;
function Ma() {
  if (xa) return ra;
  xa = 1;
  var Z = 30, W = 12;
  return ra = function(b, J) {
    var a, r, h, n, s, v, l, u, w, f, R, A, _, d, k, T, y, C, x, D, N, H, O, M, L;
    a = b.state, r = b.next_in, M = b.input, h = r + (b.avail_in - 5), n = b.next_out, L = b.output, s = n - (J - b.avail_out), v = n + (b.avail_out - 257), l = a.dmax, u = a.wsize, w = a.whave, f = a.wnext, R = a.window, A = a.hold, _ = a.bits, d = a.lencode, k = a.distcode, T = (1 << a.lenbits) - 1, y = (1 << a.distbits) - 1;
    e:
      do {
        _ < 15 && (A += M[r++] << _, _ += 8, A += M[r++] << _, _ += 8), C = d[A & T];
        a:
          for (; ; ) {
            if (x = C >>> 24, A >>>= x, _ -= x, x = C >>> 16 & 255, x === 0)
              L[n++] = C & 65535;
            else if (x & 16) {
              D = C & 65535, x &= 15, x && (_ < x && (A += M[r++] << _, _ += 8), D += A & (1 << x) - 1, A >>>= x, _ -= x), _ < 15 && (A += M[r++] << _, _ += 8, A += M[r++] << _, _ += 8), C = k[A & y];
              t:
                for (; ; ) {
                  if (x = C >>> 24, A >>>= x, _ -= x, x = C >>> 16 & 255, x & 16) {
                    if (N = C & 65535, x &= 15, _ < x && (A += M[r++] << _, _ += 8, _ < x && (A += M[r++] << _, _ += 8)), N += A & (1 << x) - 1, N > l) {
                      b.msg = "invalid distance too far back", a.mode = Z;
                      break e;
                    }
                    if (A >>>= x, _ -= x, x = n - s, N > x) {
                      if (x = N - x, x > w && a.sane) {
                        b.msg = "invalid distance too far back", a.mode = Z;
                        break e;
                      }
                      if (H = 0, O = R, f === 0) {
                        if (H += u - x, x < D) {
                          D -= x;
                          do
                            L[n++] = R[H++];
                          while (--x);
                          H = n - N, O = L;
                        }
                      } else if (f < x) {
                        if (H += u + f - x, x -= f, x < D) {
                          D -= x;
                          do
                            L[n++] = R[H++];
                          while (--x);
                          if (H = 0, f < D) {
                            x = f, D -= x;
                            do
                              L[n++] = R[H++];
                            while (--x);
                            H = n - N, O = L;
                          }
                        }
                      } else if (H += f - x, x < D) {
                        D -= x;
                        do
                          L[n++] = R[H++];
                        while (--x);
                        H = n - N, O = L;
                      }
                      for (; D > 2; )
                        L[n++] = O[H++], L[n++] = O[H++], L[n++] = O[H++], D -= 3;
                      D && (L[n++] = O[H++], D > 1 && (L[n++] = O[H++]));
                    } else {
                      H = n - N;
                      do
                        L[n++] = L[H++], L[n++] = L[H++], L[n++] = L[H++], D -= 3;
                      while (D > 2);
                      D && (L[n++] = L[H++], D > 1 && (L[n++] = L[H++]));
                    }
                  } else if (x & 64) {
                    b.msg = "invalid distance code", a.mode = Z;
                    break e;
                  } else {
                    C = k[(C & 65535) + (A & (1 << x) - 1)];
                    continue t;
                  }
                  break;
                }
            } else if (x & 64)
              if (x & 32) {
                a.mode = W;
                break e;
              } else {
                b.msg = "invalid literal/length code", a.mode = Z;
                break e;
              }
            else {
              C = d[(C & 65535) + (A & (1 << x) - 1)];
              continue a;
            }
            break;
          }
      } while (r < h && n < v);
    D = _ >> 3, r -= D, _ -= D << 3, A &= (1 << _) - 1, b.next_in = r, b.next_out = n, b.avail_in = r < h ? 5 + (h - r) : 5 - (r - h), b.avail_out = n < v ? 257 + (v - n) : 257 - (n - v), a.hold = A, a.bits = _;
  }, ra;
}
var ia, pa;
function Fa() {
  if (pa) return ia;
  pa = 1;
  var Z = Ne(), W = 15, P = 852, b = 592, J = 0, a = 1, r = 2, h = [
    /* Length codes 257..285 base */
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    13,
    15,
    17,
    19,
    23,
    27,
    31,
    35,
    43,
    51,
    59,
    67,
    83,
    99,
    115,
    131,
    163,
    195,
    227,
    258,
    0,
    0
  ], n = [
    /* Length codes 257..285 extra */
    16,
    16,
    16,
    16,
    16,
    16,
    16,
    16,
    17,
    17,
    17,
    17,
    18,
    18,
    18,
    18,
    19,
    19,
    19,
    19,
    20,
    20,
    20,
    20,
    21,
    21,
    21,
    21,
    16,
    72,
    78
  ], s = [
    /* Distance codes 0..29 base */
    1,
    2,
    3,
    4,
    5,
    7,
    9,
    13,
    17,
    25,
    33,
    49,
    65,
    97,
    129,
    193,
    257,
    385,
    513,
    769,
    1025,
    1537,
    2049,
    3073,
    4097,
    6145,
    8193,
    12289,
    16385,
    24577,
    0,
    0
  ], v = [
    /* Distance codes 0..29 extra */
    16,
    16,
    16,
    16,
    17,
    17,
    18,
    18,
    19,
    19,
    20,
    20,
    21,
    21,
    22,
    22,
    23,
    23,
    24,
    24,
    25,
    25,
    26,
    26,
    27,
    27,
    28,
    28,
    29,
    29,
    64,
    64
  ];
  return ia = function(u, w, f, R, A, _, d, k) {
    var T = k.bits, y = 0, C = 0, x = 0, D = 0, N = 0, H = 0, O = 0, M = 0, L = 0, U = 0, V, j, q, X, te, we = null, pe = 0, ue, he = new Z.Buf16(W + 1), de = new Z.Buf16(W + 1), _e = null, ie = 0, le, ae, G;
    for (y = 0; y <= W; y++)
      he[y] = 0;
    for (C = 0; C < R; C++)
      he[w[f + C]]++;
    for (N = T, D = W; D >= 1 && he[D] === 0; D--)
      ;
    if (N > D && (N = D), D === 0)
      return A[_++] = 1 << 24 | 64 << 16 | 0, A[_++] = 1 << 24 | 64 << 16 | 0, k.bits = 1, 0;
    for (x = 1; x < D && he[x] === 0; x++)
      ;
    for (N < x && (N = x), M = 1, y = 1; y <= W; y++)
      if (M <<= 1, M -= he[y], M < 0)
        return -1;
    if (M > 0 && (u === J || D !== 1))
      return -1;
    for (de[1] = 0, y = 1; y < W; y++)
      de[y + 1] = de[y] + he[y];
    for (C = 0; C < R; C++)
      w[f + C] !== 0 && (d[de[w[f + C]]++] = C);
    if (u === J ? (we = _e = d, ue = 19) : u === a ? (we = h, pe -= 257, _e = n, ie -= 257, ue = 256) : (we = s, _e = v, ue = -1), U = 0, C = 0, y = x, te = _, H = N, O = 0, q = -1, L = 1 << N, X = L - 1, u === a && L > P || u === r && L > b)
      return 1;
    for (; ; ) {
      le = y - O, d[C] < ue ? (ae = 0, G = d[C]) : d[C] > ue ? (ae = _e[ie + d[C]], G = we[pe + d[C]]) : (ae = 96, G = 0), V = 1 << y - O, j = 1 << H, x = j;
      do
        j -= V, A[te + (U >> O) + j] = le << 24 | ae << 16 | G | 0;
      while (j !== 0);
      for (V = 1 << y - 1; U & V; )
        V >>= 1;
      if (V !== 0 ? (U &= V - 1, U += V) : U = 0, C++, --he[y] === 0) {
        if (y === D)
          break;
        y = w[f + d[C]];
      }
      if (y > N && (U & X) !== q) {
        for (O === 0 && (O = N), te += x, H = y - O, M = 1 << H; H + O < D && (M -= he[H + O], !(M <= 0)); )
          H++, M <<= 1;
        if (L += 1 << H, u === a && L > P || u === r && L > b)
          return 1;
        q = U & X, A[q] = N << 24 | H << 16 | te - _ | 0;
      }
    }
    return U !== 0 && (A[te + U] = y - O << 24 | 64 << 16 | 0), k.bits = N, 0;
  }, ia;
}
var ka;
function Ha() {
  if (ka) return me;
  ka = 1;
  var Z = Ne(), W = Ta(), P = ya(), b = Ma(), J = Fa(), a = 0, r = 1, h = 2, n = 4, s = 5, v = 6, l = 0, u = 1, w = 2, f = -2, R = -3, A = -4, _ = -5, d = 8, k = 1, T = 2, y = 3, C = 4, x = 5, D = 6, N = 7, H = 8, O = 9, M = 10, L = 11, U = 12, V = 13, j = 14, q = 15, X = 16, te = 17, we = 18, pe = 19, ue = 20, he = 21, de = 22, _e = 23, ie = 24, le = 25, ae = 26, G = 27, Se = 28, Ae = 29, ee = 30, ce = 31, Te = 32, ze = 852, be = 592, oe = 15, re = oe;
  function ye(g) {
    return (g >>> 24 & 255) + (g >>> 8 & 65280) + ((g & 65280) << 8) + ((g & 255) << 24);
  }
  function Ye() {
    this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Z.Buf16(320), this.work = new Z.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
  }
  function Fe(g) {
    var z;
    return !g || !g.state ? f : (z = g.state, g.total_in = g.total_out = z.total = 0, g.msg = "", z.wrap && (g.adler = z.wrap & 1), z.mode = k, z.last = 0, z.havedict = 0, z.dmax = 32768, z.head = null, z.hold = 0, z.bits = 0, z.lencode = z.lendyn = new Z.Buf32(ze), z.distcode = z.distdyn = new Z.Buf32(be), z.sane = 1, z.back = -1, l);
  }
  function Ie(g) {
    var z;
    return !g || !g.state ? f : (z = g.state, z.wsize = 0, z.whave = 0, z.wnext = 0, Fe(g));
  }
  function Xe(g, z) {
    var t, m;
    return !g || !g.state || (m = g.state, z < 0 ? (t = 0, z = -z) : (t = (z >> 4) + 1, z < 48 && (z &= 15)), z && (z < 8 || z > 15)) ? f : (m.window !== null && m.wbits !== z && (m.window = null), m.wrap = t, m.wbits = z, Ie(g));
  }
  function He(g, z) {
    var t, m;
    return g ? (m = new Ye(), g.state = m, m.window = null, t = Xe(g, z), t !== l && (g.state = null), t) : f;
  }
  function Ze(g) {
    return He(g, re);
  }
  var je = !0, qe, ke;
  function Be(g) {
    if (je) {
      var z;
      for (qe = new Z.Buf32(512), ke = new Z.Buf32(32), z = 0; z < 144; )
        g.lens[z++] = 8;
      for (; z < 256; )
        g.lens[z++] = 9;
      for (; z < 280; )
        g.lens[z++] = 7;
      for (; z < 288; )
        g.lens[z++] = 8;
      for (J(r, g.lens, 0, 288, qe, 0, g.work, { bits: 9 }), z = 0; z < 32; )
        g.lens[z++] = 5;
      J(h, g.lens, 0, 32, ke, 0, g.work, { bits: 5 }), je = !1;
    }
    g.lencode = qe, g.lenbits = 9, g.distcode = ke, g.distbits = 5;
  }
  function $e(g, z, t, m) {
    var Q, e = g.state;
    return e.window === null && (e.wsize = 1 << e.wbits, e.wnext = 0, e.whave = 0, e.window = new Z.Buf8(e.wsize)), m >= e.wsize ? (Z.arraySet(e.window, z, t - e.wsize, e.wsize, 0), e.wnext = 0, e.whave = e.wsize) : (Q = e.wsize - e.wnext, Q > m && (Q = m), Z.arraySet(e.window, z, t - m, Q, e.wnext), m -= Q, m ? (Z.arraySet(e.window, z, t - m, m, 0), e.wnext = m, e.whave = e.wsize) : (e.wnext += Q, e.wnext === e.wsize && (e.wnext = 0), e.whave < e.wsize && (e.whave += Q))), 0;
  }
  function o(g, z) {
    var t, m, Q, e, E, S, i, c, p, $, F, K, ne, Oe, ve = 0, fe, ge, Ee, Re, Je, Qe, se, De, xe = new Z.Buf8(4), Me, Le, ha = (
      /* permutation of code lengths */
      [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
    );
    if (!g || !g.state || !g.output || !g.input && g.avail_in !== 0)
      return f;
    t = g.state, t.mode === U && (t.mode = V), E = g.next_out, Q = g.output, i = g.avail_out, e = g.next_in, m = g.input, S = g.avail_in, c = t.hold, p = t.bits, $ = S, F = i, De = l;
    e:
      for (; ; )
        switch (t.mode) {
          case k:
            if (t.wrap === 0) {
              t.mode = V;
              break;
            }
            for (; p < 16; ) {
              if (S === 0)
                break e;
              S--, c += m[e++] << p, p += 8;
            }
            if (t.wrap & 2 && c === 35615) {
              t.check = 0, xe[0] = c & 255, xe[1] = c >>> 8 & 255, t.check = P(t.check, xe, 2, 0), c = 0, p = 0, t.mode = T;
              break;
            }
            if (t.flags = 0, t.head && (t.head.done = !1), !(t.wrap & 1) || /* check if zlib header allowed */
            (((c & 255) << 8) + (c >> 8)) % 31) {
              g.msg = "incorrect header check", t.mode = ee;
              break;
            }
            if ((c & 15) !== d) {
              g.msg = "unknown compression method", t.mode = ee;
              break;
            }
            if (c >>>= 4, p -= 4, se = (c & 15) + 8, t.wbits === 0)
              t.wbits = se;
            else if (se > t.wbits) {
              g.msg = "invalid window size", t.mode = ee;
              break;
            }
            t.dmax = 1 << se, g.adler = t.check = 1, t.mode = c & 512 ? M : U, c = 0, p = 0;
            break;
          case T:
            for (; p < 16; ) {
              if (S === 0)
                break e;
              S--, c += m[e++] << p, p += 8;
            }
            if (t.flags = c, (t.flags & 255) !== d) {
              g.msg = "unknown compression method", t.mode = ee;
              break;
            }
            if (t.flags & 57344) {
              g.msg = "unknown header flags set", t.mode = ee;
              break;
            }
            t.head && (t.head.text = c >> 8 & 1), t.flags & 512 && (xe[0] = c & 255, xe[1] = c >>> 8 & 255, t.check = P(t.check, xe, 2, 0)), c = 0, p = 0, t.mode = y;
          case y:
            for (; p < 32; ) {
              if (S === 0)
                break e;
              S--, c += m[e++] << p, p += 8;
            }
            t.head && (t.head.time = c), t.flags & 512 && (xe[0] = c & 255, xe[1] = c >>> 8 & 255, xe[2] = c >>> 16 & 255, xe[3] = c >>> 24 & 255, t.check = P(t.check, xe, 4, 0)), c = 0, p = 0, t.mode = C;
          case C:
            for (; p < 16; ) {
              if (S === 0)
                break e;
              S--, c += m[e++] << p, p += 8;
            }
            t.head && (t.head.xflags = c & 255, t.head.os = c >> 8), t.flags & 512 && (xe[0] = c & 255, xe[1] = c >>> 8 & 255, t.check = P(t.check, xe, 2, 0)), c = 0, p = 0, t.mode = x;
          case x:
            if (t.flags & 1024) {
              for (; p < 16; ) {
                if (S === 0)
                  break e;
                S--, c += m[e++] << p, p += 8;
              }
              t.length = c, t.head && (t.head.extra_len = c), t.flags & 512 && (xe[0] = c & 255, xe[1] = c >>> 8 & 255, t.check = P(t.check, xe, 2, 0)), c = 0, p = 0;
            } else t.head && (t.head.extra = null);
            t.mode = D;
          case D:
            if (t.flags & 1024 && (K = t.length, K > S && (K = S), K && (t.head && (se = t.head.extra_len - t.length, t.head.extra || (t.head.extra = new Array(t.head.extra_len)), Z.arraySet(
              t.head.extra,
              m,
              e,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              K,
              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
              se
            )), t.flags & 512 && (t.check = P(t.check, m, K, e)), S -= K, e += K, t.length -= K), t.length))
              break e;
            t.length = 0, t.mode = N;
          case N:
            if (t.flags & 2048) {
              if (S === 0)
                break e;
              K = 0;
              do
                se = m[e + K++], t.head && se && t.length < 65536 && (t.head.name += String.fromCharCode(se));
              while (se && K < S);
              if (t.flags & 512 && (t.check = P(t.check, m, K, e)), S -= K, e += K, se)
                break e;
            } else t.head && (t.head.name = null);
            t.length = 0, t.mode = H;
          case H:
            if (t.flags & 4096) {
              if (S === 0)
                break e;
              K = 0;
              do
                se = m[e + K++], t.head && se && t.length < 65536 && (t.head.comment += String.fromCharCode(se));
              while (se && K < S);
              if (t.flags & 512 && (t.check = P(t.check, m, K, e)), S -= K, e += K, se)
                break e;
            } else t.head && (t.head.comment = null);
            t.mode = O;
          case O:
            if (t.flags & 512) {
              for (; p < 16; ) {
                if (S === 0)
                  break e;
                S--, c += m[e++] << p, p += 8;
              }
              if (c !== (t.check & 65535)) {
                g.msg = "header crc mismatch", t.mode = ee;
                break;
              }
              c = 0, p = 0;
            }
            t.head && (t.head.hcrc = t.flags >> 9 & 1, t.head.done = !0), g.adler = t.check = 0, t.mode = U;
            break;
          case M:
            for (; p < 32; ) {
              if (S === 0)
                break e;
              S--, c += m[e++] << p, p += 8;
            }
            g.adler = t.check = ye(c), c = 0, p = 0, t.mode = L;
          case L:
            if (t.havedict === 0)
              return g.next_out = E, g.avail_out = i, g.next_in = e, g.avail_in = S, t.hold = c, t.bits = p, w;
            g.adler = t.check = 1, t.mode = U;
          case U:
            if (z === s || z === v)
              break e;
          case V:
            if (t.last) {
              c >>>= p & 7, p -= p & 7, t.mode = G;
              break;
            }
            for (; p < 3; ) {
              if (S === 0)
                break e;
              S--, c += m[e++] << p, p += 8;
            }
            switch (t.last = c & 1, c >>>= 1, p -= 1, c & 3) {
              case 0:
                t.mode = j;
                break;
              case 1:
                if (Be(t), t.mode = ue, z === v) {
                  c >>>= 2, p -= 2;
                  break e;
                }
                break;
              case 2:
                t.mode = te;
                break;
              case 3:
                g.msg = "invalid block type", t.mode = ee;
            }
            c >>>= 2, p -= 2;
            break;
          case j:
            for (c >>>= p & 7, p -= p & 7; p < 32; ) {
              if (S === 0)
                break e;
              S--, c += m[e++] << p, p += 8;
            }
            if ((c & 65535) !== (c >>> 16 ^ 65535)) {
              g.msg = "invalid stored block lengths", t.mode = ee;
              break;
            }
            if (t.length = c & 65535, c = 0, p = 0, t.mode = q, z === v)
              break e;
          case q:
            t.mode = X;
          case X:
            if (K = t.length, K) {
              if (K > S && (K = S), K > i && (K = i), K === 0)
                break e;
              Z.arraySet(Q, m, e, K, E), S -= K, e += K, i -= K, E += K, t.length -= K;
              break;
            }
            t.mode = U;
            break;
          case te:
            for (; p < 14; ) {
              if (S === 0)
                break e;
              S--, c += m[e++] << p, p += 8;
            }
            if (t.nlen = (c & 31) + 257, c >>>= 5, p -= 5, t.ndist = (c & 31) + 1, c >>>= 5, p -= 5, t.ncode = (c & 15) + 4, c >>>= 4, p -= 4, t.nlen > 286 || t.ndist > 30) {
              g.msg = "too many length or distance symbols", t.mode = ee;
              break;
            }
            t.have = 0, t.mode = we;
          case we:
            for (; t.have < t.ncode; ) {
              for (; p < 3; ) {
                if (S === 0)
                  break e;
                S--, c += m[e++] << p, p += 8;
              }
              t.lens[ha[t.have++]] = c & 7, c >>>= 3, p -= 3;
            }
            for (; t.have < 19; )
              t.lens[ha[t.have++]] = 0;
            if (t.lencode = t.lendyn, t.lenbits = 7, Me = { bits: t.lenbits }, De = J(a, t.lens, 0, 19, t.lencode, 0, t.work, Me), t.lenbits = Me.bits, De) {
              g.msg = "invalid code lengths set", t.mode = ee;
              break;
            }
            t.have = 0, t.mode = pe;
          case pe:
            for (; t.have < t.nlen + t.ndist; ) {
              for (; ve = t.lencode[c & (1 << t.lenbits) - 1], fe = ve >>> 24, ge = ve >>> 16 & 255, Ee = ve & 65535, !(fe <= p); ) {
                if (S === 0)
                  break e;
                S--, c += m[e++] << p, p += 8;
              }
              if (Ee < 16)
                c >>>= fe, p -= fe, t.lens[t.have++] = Ee;
              else {
                if (Ee === 16) {
                  for (Le = fe + 2; p < Le; ) {
                    if (S === 0)
                      break e;
                    S--, c += m[e++] << p, p += 8;
                  }
                  if (c >>>= fe, p -= fe, t.have === 0) {
                    g.msg = "invalid bit length repeat", t.mode = ee;
                    break;
                  }
                  se = t.lens[t.have - 1], K = 3 + (c & 3), c >>>= 2, p -= 2;
                } else if (Ee === 17) {
                  for (Le = fe + 3; p < Le; ) {
                    if (S === 0)
                      break e;
                    S--, c += m[e++] << p, p += 8;
                  }
                  c >>>= fe, p -= fe, se = 0, K = 3 + (c & 7), c >>>= 3, p -= 3;
                } else {
                  for (Le = fe + 7; p < Le; ) {
                    if (S === 0)
                      break e;
                    S--, c += m[e++] << p, p += 8;
                  }
                  c >>>= fe, p -= fe, se = 0, K = 11 + (c & 127), c >>>= 7, p -= 7;
                }
                if (t.have + K > t.nlen + t.ndist) {
                  g.msg = "invalid bit length repeat", t.mode = ee;
                  break;
                }
                for (; K--; )
                  t.lens[t.have++] = se;
              }
            }
            if (t.mode === ee)
              break;
            if (t.lens[256] === 0) {
              g.msg = "invalid code -- missing end-of-block", t.mode = ee;
              break;
            }
            if (t.lenbits = 9, Me = { bits: t.lenbits }, De = J(r, t.lens, 0, t.nlen, t.lencode, 0, t.work, Me), t.lenbits = Me.bits, De) {
              g.msg = "invalid literal/lengths set", t.mode = ee;
              break;
            }
            if (t.distbits = 6, t.distcode = t.distdyn, Me = { bits: t.distbits }, De = J(h, t.lens, t.nlen, t.ndist, t.distcode, 0, t.work, Me), t.distbits = Me.bits, De) {
              g.msg = "invalid distances set", t.mode = ee;
              break;
            }
            if (t.mode = ue, z === v)
              break e;
          case ue:
            t.mode = he;
          case he:
            if (S >= 6 && i >= 258) {
              g.next_out = E, g.avail_out = i, g.next_in = e, g.avail_in = S, t.hold = c, t.bits = p, b(g, F), E = g.next_out, Q = g.output, i = g.avail_out, e = g.next_in, m = g.input, S = g.avail_in, c = t.hold, p = t.bits, t.mode === U && (t.back = -1);
              break;
            }
            for (t.back = 0; ve = t.lencode[c & (1 << t.lenbits) - 1], fe = ve >>> 24, ge = ve >>> 16 & 255, Ee = ve & 65535, !(fe <= p); ) {
              if (S === 0)
                break e;
              S--, c += m[e++] << p, p += 8;
            }
            if (ge && !(ge & 240)) {
              for (Re = fe, Je = ge, Qe = Ee; ve = t.lencode[Qe + ((c & (1 << Re + Je) - 1) >> Re)], fe = ve >>> 24, ge = ve >>> 16 & 255, Ee = ve & 65535, !(Re + fe <= p); ) {
                if (S === 0)
                  break e;
                S--, c += m[e++] << p, p += 8;
              }
              c >>>= Re, p -= Re, t.back += Re;
            }
            if (c >>>= fe, p -= fe, t.back += fe, t.length = Ee, ge === 0) {
              t.mode = ae;
              break;
            }
            if (ge & 32) {
              t.back = -1, t.mode = U;
              break;
            }
            if (ge & 64) {
              g.msg = "invalid literal/length code", t.mode = ee;
              break;
            }
            t.extra = ge & 15, t.mode = de;
          case de:
            if (t.extra) {
              for (Le = t.extra; p < Le; ) {
                if (S === 0)
                  break e;
                S--, c += m[e++] << p, p += 8;
              }
              t.length += c & (1 << t.extra) - 1, c >>>= t.extra, p -= t.extra, t.back += t.extra;
            }
            t.was = t.length, t.mode = _e;
          case _e:
            for (; ve = t.distcode[c & (1 << t.distbits) - 1], fe = ve >>> 24, ge = ve >>> 16 & 255, Ee = ve & 65535, !(fe <= p); ) {
              if (S === 0)
                break e;
              S--, c += m[e++] << p, p += 8;
            }
            if (!(ge & 240)) {
              for (Re = fe, Je = ge, Qe = Ee; ve = t.distcode[Qe + ((c & (1 << Re + Je) - 1) >> Re)], fe = ve >>> 24, ge = ve >>> 16 & 255, Ee = ve & 65535, !(Re + fe <= p); ) {
                if (S === 0)
                  break e;
                S--, c += m[e++] << p, p += 8;
              }
              c >>>= Re, p -= Re, t.back += Re;
            }
            if (c >>>= fe, p -= fe, t.back += fe, ge & 64) {
              g.msg = "invalid distance code", t.mode = ee;
              break;
            }
            t.offset = Ee, t.extra = ge & 15, t.mode = ie;
          case ie:
            if (t.extra) {
              for (Le = t.extra; p < Le; ) {
                if (S === 0)
                  break e;
                S--, c += m[e++] << p, p += 8;
              }
              t.offset += c & (1 << t.extra) - 1, c >>>= t.extra, p -= t.extra, t.back += t.extra;
            }
            if (t.offset > t.dmax) {
              g.msg = "invalid distance too far back", t.mode = ee;
              break;
            }
            t.mode = le;
          case le:
            if (i === 0)
              break e;
            if (K = F - i, t.offset > K) {
              if (K = t.offset - K, K > t.whave && t.sane) {
                g.msg = "invalid distance too far back", t.mode = ee;
                break;
              }
              K > t.wnext ? (K -= t.wnext, ne = t.wsize - K) : ne = t.wnext - K, K > t.length && (K = t.length), Oe = t.window;
            } else
              Oe = Q, ne = E - t.offset, K = t.length;
            K > i && (K = i), i -= K, t.length -= K;
            do
              Q[E++] = Oe[ne++];
            while (--K);
            t.length === 0 && (t.mode = he);
            break;
          case ae:
            if (i === 0)
              break e;
            Q[E++] = t.length, i--, t.mode = he;
            break;
          case G:
            if (t.wrap) {
              for (; p < 32; ) {
                if (S === 0)
                  break e;
                S--, c |= m[e++] << p, p += 8;
              }
              if (F -= i, g.total_out += F, t.total += F, F && (g.adler = t.check = /*UPDATE(state.check, put - _out, _out);*/
              t.flags ? P(t.check, Q, F, E - F) : W(t.check, Q, F, E - F)), F = i, (t.flags ? c : ye(c)) !== t.check) {
                g.msg = "incorrect data check", t.mode = ee;
                break;
              }
              c = 0, p = 0;
            }
            t.mode = Se;
          case Se:
            if (t.wrap && t.flags) {
              for (; p < 32; ) {
                if (S === 0)
                  break e;
                S--, c += m[e++] << p, p += 8;
              }
              if (c !== (t.total & 4294967295)) {
                g.msg = "incorrect length check", t.mode = ee;
                break;
              }
              c = 0, p = 0;
            }
            t.mode = Ae;
          case Ae:
            De = u;
            break e;
          case ee:
            De = R;
            break e;
          case ce:
            return A;
          case Te:
          default:
            return f;
        }
    return g.next_out = E, g.avail_out = i, g.next_in = e, g.avail_in = S, t.hold = c, t.bits = p, (t.wsize || F !== g.avail_out && t.mode < ee && (t.mode < G || z !== n)) && $e(g, g.output, g.next_out, F - g.avail_out), $ -= g.avail_in, F -= g.avail_out, g.total_in += $, g.total_out += F, t.total += F, t.wrap && F && (g.adler = t.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
    t.flags ? P(t.check, Q, F, g.next_out - F) : W(t.check, Q, F, g.next_out - F)), g.data_type = t.bits + (t.last ? 64 : 0) + (t.mode === U ? 128 : 0) + (t.mode === ue || t.mode === q ? 256 : 0), ($ === 0 && F === 0 || z === n) && De === l && (De = _), De;
  }
  function I(g) {
    if (!g || !g.state)
      return f;
    var z = g.state;
    return z.window && (z.window = null), g.state = null, l;
  }
  function B(g, z) {
    var t;
    return !g || !g.state || (t = g.state, !(t.wrap & 2)) ? f : (t.head = z, z.done = !1, l);
  }
  function Y(g, z) {
    var t = z.length, m, Q, e;
    return !g || !g.state || (m = g.state, m.wrap !== 0 && m.mode !== L) ? f : m.mode === L && (Q = 1, Q = W(Q, z, t, 0), Q !== m.check) ? R : (e = $e(g, z, t, t), e ? (m.mode = ce, A) : (m.havedict = 1, l));
  }
  return me.inflateReset = Ie, me.inflateReset2 = Xe, me.inflateResetKeep = Fe, me.inflateInit = Ze, me.inflateInit2 = He, me.inflate = o, me.inflateEnd = I, me.inflateGetHeader = B, me.inflateSetDictionary = Y, me.inflateInfo = "pako inflate (from Nodeca project)", me;
}
var na, Ea;
function ma() {
  return Ea || (Ea = 1, na = {
    /* Allowed flush values; see deflate() and inflate() below for details */
    Z_NO_FLUSH: 0,
    Z_PARTIAL_FLUSH: 1,
    Z_SYNC_FLUSH: 2,
    Z_FULL_FLUSH: 3,
    Z_FINISH: 4,
    Z_BLOCK: 5,
    Z_TREES: 6,
    /* Return codes for the compression/decompression functions. Negative values
    * are errors, positive values are used for special but normal events.
    */
    Z_OK: 0,
    Z_STREAM_END: 1,
    Z_NEED_DICT: 2,
    Z_ERRNO: -1,
    Z_STREAM_ERROR: -2,
    Z_DATA_ERROR: -3,
    //Z_MEM_ERROR:     -4,
    Z_BUF_ERROR: -5,
    //Z_VERSION_ERROR: -6,
    /* compression levels */
    Z_NO_COMPRESSION: 0,
    Z_BEST_SPEED: 1,
    Z_BEST_COMPRESSION: 9,
    Z_DEFAULT_COMPRESSION: -1,
    Z_FILTERED: 1,
    Z_HUFFMAN_ONLY: 2,
    Z_RLE: 3,
    Z_FIXED: 4,
    Z_DEFAULT_STRATEGY: 0,
    /* Possible values of the data_type field (though see inflate()) */
    Z_BINARY: 0,
    Z_TEXT: 1,
    //Z_ASCII:                1, // = Z_TEXT (deprecated)
    Z_UNKNOWN: 2,
    /* The deflate compression method */
    Z_DEFLATED: 8
    //Z_NULL:                 null // Use -1 or null inline, depending on var type
  }), na;
}
var fa, Sa;
function qa() {
  if (Sa) return fa;
  Sa = 1;
  function Z() {
    this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
  }
  return fa = Z, fa;
}
var Aa;
function Na() {
  if (Aa) return Ve;
  Aa = 1;
  var Z = Ha(), W = Ne(), P = Ia(), b = ma(), J = oa(), a = Da(), r = qa(), h = Object.prototype.toString;
  function n(l) {
    if (!(this instanceof n)) return new n(l);
    this.options = W.assign({
      chunkSize: 16384,
      windowBits: 0,
      to: ""
    }, l || {});
    var u = this.options;
    u.raw && u.windowBits >= 0 && u.windowBits < 16 && (u.windowBits = -u.windowBits, u.windowBits === 0 && (u.windowBits = -15)), u.windowBits >= 0 && u.windowBits < 16 && !(l && l.windowBits) && (u.windowBits += 32), u.windowBits > 15 && u.windowBits < 48 && (u.windowBits & 15 || (u.windowBits |= 15)), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new a(), this.strm.avail_out = 0;
    var w = Z.inflateInit2(
      this.strm,
      u.windowBits
    );
    if (w !== b.Z_OK)
      throw new Error(J[w]);
    if (this.header = new r(), Z.inflateGetHeader(this.strm, this.header), u.dictionary && (typeof u.dictionary == "string" ? u.dictionary = P.string2buf(u.dictionary) : h.call(u.dictionary) === "[object ArrayBuffer]" && (u.dictionary = new Uint8Array(u.dictionary)), u.raw && (w = Z.inflateSetDictionary(this.strm, u.dictionary), w !== b.Z_OK)))
      throw new Error(J[w]);
  }
  n.prototype.push = function(l, u) {
    var w = this.strm, f = this.options.chunkSize, R = this.options.dictionary, A, _, d, k, T, y = !1;
    if (this.ended)
      return !1;
    _ = u === ~~u ? u : u === !0 ? b.Z_FINISH : b.Z_NO_FLUSH, typeof l == "string" ? w.input = P.binstring2buf(l) : h.call(l) === "[object ArrayBuffer]" ? w.input = new Uint8Array(l) : w.input = l, w.next_in = 0, w.avail_in = w.input.length;
    do {
      if (w.avail_out === 0 && (w.output = new W.Buf8(f), w.next_out = 0, w.avail_out = f), A = Z.inflate(w, b.Z_NO_FLUSH), A === b.Z_NEED_DICT && R && (A = Z.inflateSetDictionary(this.strm, R)), A === b.Z_BUF_ERROR && y === !0 && (A = b.Z_OK, y = !1), A !== b.Z_STREAM_END && A !== b.Z_OK)
        return this.onEnd(A), this.ended = !0, !1;
      w.next_out && (w.avail_out === 0 || A === b.Z_STREAM_END || w.avail_in === 0 && (_ === b.Z_FINISH || _ === b.Z_SYNC_FLUSH)) && (this.options.to === "string" ? (d = P.utf8border(w.output, w.next_out), k = w.next_out - d, T = P.buf2string(w.output, d), w.next_out = k, w.avail_out = f - k, k && W.arraySet(w.output, w.output, d, k, 0), this.onData(T)) : this.onData(W.shrinkBuf(w.output, w.next_out))), w.avail_in === 0 && w.avail_out === 0 && (y = !0);
    } while ((w.avail_in > 0 || w.avail_out === 0) && A !== b.Z_STREAM_END);
    return A === b.Z_STREAM_END && (_ = b.Z_FINISH), _ === b.Z_FINISH ? (A = Z.inflateEnd(this.strm), this.onEnd(A), this.ended = !0, A === b.Z_OK) : (_ === b.Z_SYNC_FLUSH && (this.onEnd(b.Z_OK), w.avail_out = 0), !0);
  }, n.prototype.onData = function(l) {
    this.chunks.push(l);
  }, n.prototype.onEnd = function(l) {
    l === b.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = W.flattenChunks(this.chunks)), this.chunks = [], this.err = l, this.msg = this.strm.msg;
  };
  function s(l, u) {
    var w = new n(u);
    if (w.push(l, !0), w.err)
      throw w.msg || J[w.err];
    return w.result;
  }
  function v(l, u) {
    return u = u || {}, u.raw = !0, s(l, u);
  }
  return Ve.Inflate = n, Ve.inflate = s, Ve.inflateRaw = v, Ve.ungzip = s, Ve;
}
var la, za;
function Ua() {
  if (za) return la;
  za = 1;
  var Z = Ne().assign, W = Oa(), P = Na(), b = ma(), J = {};
  return Z(J, W, P, b), la = J, la;
}
(function(Z) {
  (function() {
    var W = {}, P;
    Z.exports = W, typeof Ca == "function" ? P = Ua() : P = window.pako, function(b, J) {
      b.toRGBA8 = function(a) {
        var r = a.width, h = a.height;
        if (a.tabs.acTL == null) return [b.toRGBA8.decodeImage(a.data, r, h, a).buffer];
        var n = [];
        a.frames[0].data == null && (a.frames[0].data = a.data);
        for (var s, v = new Uint8Array(r * h * 4), l = 0; l < a.frames.length; l++) {
          var u = a.frames[l], w = u.rect.x, f = u.rect.y, R = u.rect.width, A = u.rect.height, _ = b.toRGBA8.decodeImage(u.data, R, A, a);
          if (l == 0 ? s = _ : u.blend == 0 ? b._copyTile(_, R, A, s, r, h, w, f, 0) : u.blend == 1 && b._copyTile(_, R, A, s, r, h, w, f, 1), n.push(s.buffer), s = s.slice(0), u.dispose != 0) {
            if (u.dispose == 1) b._copyTile(v, R, A, s, r, h, w, f, 0);
            else if (u.dispose == 2) {
              for (var d = l - 1; a.frames[d].dispose == 2; ) d--;
              s = new Uint8Array(n[d]).slice(0);
            }
          }
        }
        return n;
      }, b.toRGBA8.decodeImage = function(a, r, h, n) {
        var s = r * h, v = b.decode._getBPP(n), l = Math.ceil(r * v / 8), u = new Uint8Array(s * 4), w = new Uint32Array(u.buffer), f = n.ctype, R = n.depth, A = b._bin.readUshort;
        if (f == 6) {
          var _ = s << 2;
          if (R == 8) for (var d = 0; d < _; d++)
            u[d] = a[d];
          if (R == 16) for (var d = 0; d < _; d++)
            u[d] = a[d << 1];
        } else if (f == 2) {
          var k = n.tabs.tRNS, T = -1, y = -1, C = -1;
          if (k && (T = k[0], y = k[1], C = k[2]), R == 8) for (var d = 0; d < s; d++) {
            var x = d << 2, D = d * 3;
            u[x] = a[D], u[x + 1] = a[D + 1], u[x + 2] = a[D + 2], u[x + 3] = 255, T != -1 && a[D] == T && a[D + 1] == y && a[D + 2] == C && (u[x + 3] = 0);
          }
          if (R == 16) for (var d = 0; d < s; d++) {
            var x = d << 2, D = d * 6;
            u[x] = a[D], u[x + 1] = a[D + 2], u[x + 2] = a[D + 4], u[x + 3] = 255, T != -1 && A(a, D) == T && A(a, D + 2) == y && A(a, D + 4) == C && (u[x + 3] = 0);
          }
        } else if (f == 3) {
          var N = n.tabs.PLTE, H = n.tabs.tRNS, O = H ? H.length : 0;
          if (R == 1) for (var M = 0; M < h; M++)
            for (var L = M * l, U = M * r, d = 0; d < r; d++) {
              var x = U + d << 2, V = a[L + (d >> 3)] >> 7 - ((d & 7) << 0) & 1, j = 3 * V;
              u[x] = N[j], u[x + 1] = N[j + 1], u[x + 2] = N[j + 2], u[x + 3] = V < O ? H[V] : 255;
            }
          if (R == 2) for (var M = 0; M < h; M++)
            for (var L = M * l, U = M * r, d = 0; d < r; d++) {
              var x = U + d << 2, V = a[L + (d >> 2)] >> 6 - ((d & 3) << 1) & 3, j = 3 * V;
              u[x] = N[j], u[x + 1] = N[j + 1], u[x + 2] = N[j + 2], u[x + 3] = V < O ? H[V] : 255;
            }
          if (R == 4) for (var M = 0; M < h; M++)
            for (var L = M * l, U = M * r, d = 0; d < r; d++) {
              var x = U + d << 2, V = a[L + (d >> 1)] >> 4 - ((d & 1) << 2) & 15, j = 3 * V;
              u[x] = N[j], u[x + 1] = N[j + 1], u[x + 2] = N[j + 2], u[x + 3] = V < O ? H[V] : 255;
            }
          if (R == 8) for (var d = 0; d < s; d++) {
            var x = d << 2, V = a[d], j = 3 * V;
            u[x] = N[j], u[x + 1] = N[j + 1], u[x + 2] = N[j + 2], u[x + 3] = V < O ? H[V] : 255;
          }
        } else if (f == 4) {
          if (R == 8) for (var d = 0; d < s; d++) {
            var x = d << 2, q = d << 1, X = a[q];
            u[x] = X, u[x + 1] = X, u[x + 2] = X, u[x + 3] = a[q + 1];
          }
          if (R == 16) for (var d = 0; d < s; d++) {
            var x = d << 2, q = d << 2, X = a[q];
            u[x] = X, u[x + 1] = X, u[x + 2] = X, u[x + 3] = a[q + 2];
          }
        } else if (f == 0) {
          var T = n.tabs.tRNS ? n.tabs.tRNS : -1;
          if (R == 1) for (var d = 0; d < s; d++) {
            var X = 255 * (a[d >> 3] >> 7 - (d & 7) & 1), te = X == T * 255 ? 0 : 255;
            w[d] = te << 24 | X << 16 | X << 8 | X;
          }
          if (R == 2) for (var d = 0; d < s; d++) {
            var X = 85 * (a[d >> 2] >> 6 - ((d & 3) << 1) & 3), te = X == T * 85 ? 0 : 255;
            w[d] = te << 24 | X << 16 | X << 8 | X;
          }
          if (R == 4) for (var d = 0; d < s; d++) {
            var X = 17 * (a[d >> 1] >> 4 - ((d & 1) << 2) & 15), te = X == T * 17 ? 0 : 255;
            w[d] = te << 24 | X << 16 | X << 8 | X;
          }
          if (R == 8) for (var d = 0; d < s; d++) {
            var X = a[d], te = X == T ? 0 : 255;
            w[d] = te << 24 | X << 16 | X << 8 | X;
          }
          if (R == 16) for (var d = 0; d < s; d++) {
            var X = a[d << 1], te = A(a, d << 1) == T ? 0 : 255;
            w[d] = te << 24 | X << 16 | X << 8 | X;
          }
        }
        return u;
      }, b.decode = function(a) {
        for (var r = new Uint8Array(a), h = 8, n = b._bin, s = n.readUshort, v = n.readUint, l = { tabs: {}, frames: [] }, u = new Uint8Array(r.length), w = 0, f, R = 0, A = [137, 80, 78, 71, 13, 10, 26, 10], _ = 0; _ < 8; _++) if (r[_] != A[_]) throw "The input is not a PNG file!";
        for (; h < r.length; ) {
          var d = n.readUint(r, h);
          h += 4;
          var k = n.readASCII(r, h, 4);
          if (h += 4, k == "IHDR")
            b.decode._IHDR(r, h, l);
          else if (k == "IDAT") {
            for (var _ = 0; _ < d; _++) u[w + _] = r[h + _];
            w += d;
          } else if (k == "acTL")
            l.tabs[k] = { num_frames: v(r, h), num_plays: v(r, h + 4) }, f = new Uint8Array(r.length);
          else if (k == "fcTL") {
            if (R != 0) {
              var T = l.frames[l.frames.length - 1];
              T.data = b.decode._decompress(l, f.slice(0, R), T.rect.width, T.rect.height), R = 0;
            }
            var y = { x: v(r, h + 12), y: v(r, h + 16), width: v(r, h + 4), height: v(r, h + 8) }, C = s(r, h + 22);
            C = s(r, h + 20) / (C == 0 ? 100 : C);
            var x = { rect: y, delay: Math.round(C * 1e3), dispose: r[h + 24], blend: r[h + 25] };
            l.frames.push(x);
          } else if (k == "fdAT") {
            for (var _ = 0; _ < d - 4; _++) f[R + _] = r[h + _ + 4];
            R += d - 4;
          } else if (k == "pHYs")
            l.tabs[k] = [n.readUint(r, h), n.readUint(r, h + 4), r[h + 8]];
          else if (k == "cHRM") {
            l.tabs[k] = [];
            for (var _ = 0; _ < 8; _++) l.tabs[k].push(n.readUint(r, h + _ * 4));
          } else if (k == "tEXt") {
            l.tabs[k] == null && (l.tabs[k] = {});
            var D = n.nextZero(r, h), N = n.readASCII(r, h, D - h), H = n.readASCII(r, D + 1, h + d - D - 1);
            l.tabs[k][N] = H;
          } else if (k == "iTXt") {
            l.tabs[k] == null && (l.tabs[k] = {});
            var D = 0, O = h;
            D = n.nextZero(r, O);
            var N = n.readASCII(r, O, D - O);
            O = D + 1, r[O], r[O + 1], O += 2, D = n.nextZero(r, O), n.readASCII(r, O, D - O), O = D + 1, D = n.nextZero(r, O), n.readUTF8(r, O, D - O), O = D + 1;
            var H = n.readUTF8(r, O, d - (O - h));
            l.tabs[k][N] = H;
          } else if (k == "PLTE")
            l.tabs[k] = n.readBytes(r, h, d);
          else if (k == "hIST") {
            var M = l.tabs.PLTE.length / 3;
            l.tabs[k] = [];
            for (var _ = 0; _ < M; _++) l.tabs[k].push(s(r, h + _ * 2));
          } else if (k == "tRNS")
            l.ctype == 3 ? l.tabs[k] = n.readBytes(r, h, d) : l.ctype == 0 ? l.tabs[k] = s(r, h) : l.ctype == 2 && (l.tabs[k] = [s(r, h), s(r, h + 2), s(r, h + 4)]);
          else if (k == "gAMA") l.tabs[k] = n.readUint(r, h) / 1e5;
          else if (k == "sRGB") l.tabs[k] = r[h];
          else if (k == "bKGD")
            l.ctype == 0 || l.ctype == 4 ? l.tabs[k] = [s(r, h)] : l.ctype == 2 || l.ctype == 6 ? l.tabs[k] = [s(r, h), s(r, h + 2), s(r, h + 4)] : l.ctype == 3 && (l.tabs[k] = r[h]);
          else if (k == "IEND") {
            if (R != 0) {
              var T = l.frames[l.frames.length - 1];
              T.data = b.decode._decompress(l, f.slice(0, R), T.rect.width, T.rect.height), R = 0;
            }
            l.data = b.decode._decompress(l, u, l.width, l.height);
            break;
          }
          h += d, n.readUint(r, h), h += 4;
        }
        return delete l.compress, delete l.interlace, delete l.filter, l;
      }, b.decode._decompress = function(a, r, h, n) {
        return a.compress == 0 && (r = b.decode._inflate(r)), a.interlace == 0 ? r = b.decode._filterZero(r, a, 0, h, n) : a.interlace == 1 && (r = b.decode._readInterlace(r, a)), r;
      }, b.decode._inflate = function(a) {
        return J.inflate(a);
      }, b.decode._readInterlace = function(a, r) {
        for (var h = r.width, n = r.height, s = b.decode._getBPP(r), v = s >> 3, l = Math.ceil(h * s / 8), u = new Uint8Array(n * l), w = 0, f = [0, 0, 4, 0, 2, 0, 1], R = [0, 4, 0, 2, 0, 1, 0], A = [8, 8, 8, 4, 4, 2, 2], _ = [8, 8, 4, 4, 2, 2, 1], d = 0; d < 7; ) {
          for (var k = A[d], T = _[d], y = 0, C = 0, x = f[d]; x < n; )
            x += k, C++;
          for (var D = R[d]; D < h; )
            D += T, y++;
          var N = Math.ceil(y * s / 8);
          b.decode._filterZero(a, r, w, y, C);
          for (var H = 0, O = f[d]; O < n; ) {
            for (var M = R[d], L = w + H * N << 3; M < h; ) {
              if (s == 1) {
                var U = a[L >> 3];
                U = U >> 7 - (L & 7) & 1, u[O * l + (M >> 3)] |= U << 7 - ((M & 3) << 0);
              }
              if (s == 2) {
                var U = a[L >> 3];
                U = U >> 6 - (L & 7) & 3, u[O * l + (M >> 2)] |= U << 6 - ((M & 3) << 1);
              }
              if (s == 4) {
                var U = a[L >> 3];
                U = U >> 4 - (L & 7) & 15, u[O * l + (M >> 1)] |= U << 4 - ((M & 1) << 2);
              }
              if (s >= 8)
                for (var V = O * l + M * v, j = 0; j < v; j++) u[V + j] = a[(L >> 3) + j];
              L += s, M += T;
            }
            H++, O += k;
          }
          y * C != 0 && (w += C * (1 + N)), d = d + 1;
        }
        return u;
      }, b.decode._getBPP = function(a) {
        var r = [1, null, 3, 1, 2, null, 4][a.ctype];
        return r * a.depth;
      }, b.decode._filterZero = function(a, r, h, n, s) {
        var v = b.decode._getBPP(r), l = Math.ceil(n * v / 8), u = b.decode._paeth;
        v = Math.ceil(v / 8);
        for (var w = 0; w < s; w++) {
          var f = h + w * l, R = f + w + 1, A = a[R - 1];
          if (A == 0) for (var _ = 0; _ < l; _++) a[f + _] = a[R + _];
          else if (A == 1) {
            for (var _ = 0; _ < v; _++) a[f + _] = a[R + _];
            for (var _ = v; _ < l; _++) a[f + _] = a[R + _] + a[f + _ - v] & 255;
          } else if (w == 0) {
            for (var _ = 0; _ < v; _++) a[f + _] = a[R + _];
            if (A == 2) for (var _ = v; _ < l; _++) a[f + _] = a[R + _] & 255;
            if (A == 3) for (var _ = v; _ < l; _++) a[f + _] = a[R + _] + (a[f + _ - v] >> 1) & 255;
            if (A == 4) for (var _ = v; _ < l; _++) a[f + _] = a[R + _] + u(a[f + _ - v], 0, 0) & 255;
          } else {
            if (A == 2)
              for (var _ = 0; _ < l; _++) a[f + _] = a[R + _] + a[f + _ - l] & 255;
            if (A == 3) {
              for (var _ = 0; _ < v; _++) a[f + _] = a[R + _] + (a[f + _ - l] >> 1) & 255;
              for (var _ = v; _ < l; _++) a[f + _] = a[R + _] + (a[f + _ - l] + a[f + _ - v] >> 1) & 255;
            }
            if (A == 4) {
              for (var _ = 0; _ < v; _++) a[f + _] = a[R + _] + u(0, a[f + _ - l], 0) & 255;
              for (var _ = v; _ < l; _++) a[f + _] = a[R + _] + u(a[f + _ - v], a[f + _ - l], a[f + _ - v - l]) & 255;
            }
          }
        }
        return a;
      }, b.decode._paeth = function(a, r, h) {
        var n = a + r - h, s = Math.abs(n - a), v = Math.abs(n - r), l = Math.abs(n - h);
        return s <= v && s <= l ? a : v <= l ? r : h;
      }, b.decode._IHDR = function(a, r, h) {
        var n = b._bin;
        h.width = n.readUint(a, r), r += 4, h.height = n.readUint(a, r), r += 4, h.depth = a[r], r++, h.ctype = a[r], r++, h.compress = a[r], r++, h.filter = a[r], r++, h.interlace = a[r], r++;
      }, b._bin = {
        nextZero: function(a, r) {
          for (; a[r] != 0; ) r++;
          return r;
        },
        readUshort: function(a, r) {
          return a[r] << 8 | a[r + 1];
        },
        writeUshort: function(a, r, h) {
          a[r] = h >> 8 & 255, a[r + 1] = h & 255;
        },
        readUint: function(a, r) {
          return a[r] * (256 * 256 * 256) + (a[r + 1] << 16 | a[r + 2] << 8 | a[r + 3]);
        },
        writeUint: function(a, r, h) {
          a[r] = h >> 24 & 255, a[r + 1] = h >> 16 & 255, a[r + 2] = h >> 8 & 255, a[r + 3] = h & 255;
        },
        readASCII: function(a, r, h) {
          for (var n = "", s = 0; s < h; s++) n += String.fromCharCode(a[r + s]);
          return n;
        },
        writeASCII: function(a, r, h) {
          for (var n = 0; n < h.length; n++) a[r + n] = h.charCodeAt(n);
        },
        readBytes: function(a, r, h) {
          for (var n = [], s = 0; s < h; s++) n.push(a[r + s]);
          return n;
        },
        pad: function(a) {
          return a.length < 2 ? "0" + a : a;
        },
        readUTF8: function(a, r, h) {
          for (var n = "", s, v = 0; v < h; v++) n += "%" + b._bin.pad(a[r + v].toString(16));
          try {
            s = decodeURIComponent(n);
          } catch {
            return b._bin.readASCII(a, r, h);
          }
          return s;
        }
      }, b._copyTile = function(a, r, h, n, s, v, l, u, w) {
        for (var f = Math.min(r, s), R = Math.min(h, v), A = 0, _ = 0, d = 0; d < R; d++)
          for (var k = 0; k < f; k++)
            if (l >= 0 && u >= 0 ? (A = d * r + k << 2, _ = (u + d) * s + l + k << 2) : (A = (-u + d) * r - l + k << 2, _ = d * s + k << 2), w == 0)
              n[_] = a[A], n[_ + 1] = a[A + 1], n[_ + 2] = a[A + 2], n[_ + 3] = a[A + 3];
            else if (w == 1) {
              var T = a[A + 3] * 0.00392156862745098, y = a[A] * T, C = a[A + 1] * T, x = a[A + 2] * T, D = n[_ + 3] * (1 / 255), N = n[_] * D, H = n[_ + 1] * D, O = n[_ + 2] * D, M = 1 - T, L = T + D * M, U = L == 0 ? 0 : 1 / L;
              n[_ + 3] = 255 * L, n[_ + 0] = (y + N * M) * U, n[_ + 1] = (C + H * M) * U, n[_ + 2] = (x + O * M) * U;
            } else if (w == 2) {
              var T = a[A + 3], y = a[A], C = a[A + 1], x = a[A + 2], D = n[_ + 3], N = n[_], H = n[_ + 1], O = n[_ + 2];
              T == D && y == N && C == H && x == O ? (n[_] = 0, n[_ + 1] = 0, n[_ + 2] = 0, n[_ + 3] = 0) : (n[_] = y, n[_ + 1] = C, n[_ + 2] = x, n[_ + 3] = T);
            } else if (w == 3) {
              var T = a[A + 3], y = a[A], C = a[A + 1], x = a[A + 2], D = n[_ + 3], N = n[_], H = n[_ + 1], O = n[_ + 2];
              if (T == D && y == N && C == H && x == O) continue;
              if (T < 220 && D > 20) return !1;
            }
        return !0;
      }, b.encode = function(a, r, h, n, s, v) {
        n == null && (n = 0), v == null && (v = !1);
        for (var l = new Uint8Array(a[0].byteLength * a.length + 100), u = [137, 80, 78, 71, 13, 10, 26, 10], w = 0; w < 8; w++) l[w] = u[w];
        var f = 8, R = b._bin, A = b.crc.crc, _ = R.writeUint, d = R.writeUshort, k = R.writeASCII, T = b.encode.compressPNG(a, r, h, n, v);
        _(l, f, 13), f += 4, k(l, f, "IHDR"), f += 4, _(l, f, r), f += 4, _(l, f, h), f += 4, l[f] = T.depth, f++, l[f] = T.ctype, f++, l[f] = 0, f++, l[f] = 0, f++, l[f] = 0, f++, _(l, f, A(l, f - 17, 17)), f += 4, _(l, f, 1), f += 4, k(l, f, "sRGB"), f += 4, l[f] = 1, f++, _(l, f, A(l, f - 5, 5)), f += 4;
        var y = a.length > 1;
        if (y && (_(l, f, 8), f += 4, k(l, f, "acTL"), f += 4, _(l, f, a.length), f += 4, _(l, f, 0), f += 4, _(l, f, A(l, f - 12, 12)), f += 4), T.ctype == 3) {
          var C = T.plte.length;
          _(l, f, C * 3), f += 4, k(l, f, "PLTE"), f += 4;
          for (var w = 0; w < C; w++) {
            var x = w * 3, D = T.plte[w], N = D & 255, H = D >> 8 & 255, O = D >> 16 & 255;
            l[f + x + 0] = N, l[f + x + 1] = H, l[f + x + 2] = O;
          }
          if (f += C * 3, _(l, f, A(l, f - C * 3 - 4, C * 3 + 4)), f += 4, T.gotAlpha) {
            _(l, f, C), f += 4, k(l, f, "tRNS"), f += 4;
            for (var w = 0; w < C; w++) l[f + w] = T.plte[w] >> 24 & 255;
            f += C, _(l, f, A(l, f - C - 4, C + 4)), f += 4;
          }
        }
        for (var M = 0, L = 0; L < T.frames.length; L++) {
          var U = T.frames[L];
          y && (_(l, f, 26), f += 4, k(l, f, "fcTL"), f += 4, _(l, f, M++), f += 4, _(l, f, U.rect.width), f += 4, _(l, f, U.rect.height), f += 4, _(l, f, U.rect.x), f += 4, _(l, f, U.rect.y), f += 4, d(l, f, s[L]), f += 2, d(l, f, 1e3), f += 2, l[f] = U.dispose, f++, l[f] = U.blend, f++, _(l, f, A(l, f - 30, 30)), f += 4);
          var V = U.cimg, C = V.length;
          _(l, f, C + (L == 0 ? 0 : 4)), f += 4;
          var j = f;
          k(l, f, L == 0 ? "IDAT" : "fdAT"), f += 4, L != 0 && (_(l, f, M++), f += 4);
          for (var w = 0; w < C; w++) l[f + w] = V[w];
          f += C, _(l, f, A(l, j, f - j)), f += 4;
        }
        return _(l, f, 0), f += 4, k(l, f, "IEND"), f += 4, _(l, f, A(l, f - 4, 4)), f += 4, l.buffer.slice(0, f);
      }, b.encode.compressPNG = function(a, r, h, n, s) {
        for (var v = b.encode.compress(a, r, h, n, !1, s), l = 0; l < a.length; l++) {
          var u = v.frames[l];
          u.rect.width;
          var w = u.rect.height, f = u.bpl, R = u.bpp, A = new Uint8Array(w * f + w);
          u.cimg = b.encode._filterZero(u.img, w, R, f, A);
        }
        return v;
      }, b.encode.compress = function(a, r, h, n, s, v) {
        v == null && (v = !1);
        for (var l = 6, u = 8, w = 4, f = 255, R = 0; R < a.length; R++)
          for (var A = new Uint8Array(a[R]), _ = A.length, d = 0; d < _; d += 4) f &= A[d + 3];
        var k = f != 255, T = {}, y = [];
        if (a.length != 0 && (T[0] = 0, y.push(0), n != 0 && n--), n != 0) {
          var C = b.quantize(a, n, s);
          a = C.bufs;
          for (var d = 0; d < C.plte.length; d++) {
            var x = C.plte[d].est.rgba;
            T[x] == null && (T[x] = y.length, y.push(x));
          }
        } else
          for (var R = 0; R < a.length; R++)
            for (var D = new Uint32Array(a[R]), _ = D.length, d = 0; d < _; d++) {
              var x = D[d];
              if ((d < r || x != D[d - 1] && x != D[d - r]) && T[x] == null && (T[x] = y.length, y.push(x), y.length >= 300))
                break;
            }
        var N = k ? s : !1, H = y.length;
        H <= 256 && v == !1 && (H <= 2 ? u = 1 : H <= 4 ? u = 2 : H <= 16 ? u = 4 : u = 8, s && (u = 8), k = !0);
        for (var O = [], R = 0; R < a.length; R++) {
          var M = new Uint8Array(a[R]), L = new Uint32Array(M.buffer), U = 0, V = 0, j = r, q = h, X = 0;
          if (R != 0 && !N) {
            for (var te = s || R == 1 || O[O.length - 2].dispose == 2 ? 1 : 2, we = 0, pe = 1e9, ue = 0; ue < te; ue++) {
              for (var Ae = new Uint8Array(a[R - 1 - ue]), he = new Uint32Array(a[R - 1 - ue]), de = r, _e = h, ie = -1, le = -1, ae = 0; ae < h; ae++) for (var G = 0; G < r; G++) {
                var d = ae * r + G;
                L[d] != he[d] && (G < de && (de = G), G > ie && (ie = G), ae < _e && (_e = ae), ae > le && (le = ae));
              }
              var Se = ie == -1 ? 1 : (ie - de + 1) * (le - _e + 1);
              Se < pe && (pe = Se, we = ue, ie == -1 ? (U = V = 0, j = q = 1) : (U = de, V = _e, j = ie - de + 1, q = le - _e + 1));
            }
            var Ae = new Uint8Array(a[R - 1 - we]);
            we == 1 && (O[O.length - 1].dispose = 2);
            var ee = new Uint8Array(j * q * 4);
            new Uint32Array(ee.buffer), b._copyTile(Ae, r, h, ee, j, q, -U, -V, 0), b._copyTile(M, r, h, ee, j, q, -U, -V, 3) ? (b._copyTile(M, r, h, ee, j, q, -U, -V, 2), X = 1) : (b._copyTile(M, r, h, ee, j, q, -U, -V, 0), X = 0), M = ee, L = new Uint32Array(M.buffer);
          }
          var ce = 4 * j;
          if (H <= 256 && v == !1) {
            ce = Math.ceil(u * j / 8);
            for (var ee = new Uint8Array(ce * q), ae = 0; ae < q; ae++) {
              var d = ae * ce, Te = ae * j;
              if (u == 8) for (var G = 0; G < j; G++) ee[d + G] = T[L[Te + G]];
              else if (u == 4) for (var G = 0; G < j; G++) ee[d + (G >> 1)] |= T[L[Te + G]] << 4 - (G & 1) * 4;
              else if (u == 2) for (var G = 0; G < j; G++) ee[d + (G >> 2)] |= T[L[Te + G]] << 6 - (G & 3) * 2;
              else if (u == 1) for (var G = 0; G < j; G++) ee[d + (G >> 3)] |= T[L[Te + G]] << 7 - (G & 7) * 1;
            }
            M = ee, l = 3, w = 1;
          } else if (k == !1 && a.length == 1) {
            for (var ee = new Uint8Array(j * q * 3), ze = j * q, d = 0; d < ze; d++) {
              var be = d * 3, oe = d * 4;
              ee[be] = M[oe], ee[be + 1] = M[oe + 1], ee[be + 2] = M[oe + 2];
            }
            M = ee, l = 2, w = 3, ce = 3 * j;
          }
          O.push({ rect: { x: U, y: V, width: j, height: q }, img: M, bpl: ce, bpp: w, blend: X, dispose: N ? 1 : 0 });
        }
        return { ctype: l, depth: u, plte: y, gotAlpha: k, frames: O };
      }, b.encode._filterZero = function(a, r, h, n, s) {
        for (var v = [], l = 0; l < 5; l++)
          if (!(r * n > 5e5 && (l == 2 || l == 3 || l == 4))) {
            for (var u = 0; u < r; u++) b.encode._filterLine(s, a, u, n, h, l);
            if (v.push(J.deflate(s)), h == 1) break;
          }
        for (var w, f = 1e9, R = 0; R < v.length; R++) v[R].length < f && (w = R, f = v[R].length);
        return v[w];
      }, b.encode._filterLine = function(a, r, h, n, s, v) {
        var l = h * n, u = l + h, w = b.decode._paeth;
        if (a[u] = v, u++, v == 0) for (var f = 0; f < n; f++) a[u + f] = r[l + f];
        else if (v == 1) {
          for (var f = 0; f < s; f++) a[u + f] = r[l + f];
          for (var f = s; f < n; f++) a[u + f] = r[l + f] - r[l + f - s] + 256 & 255;
        } else if (h == 0) {
          for (var f = 0; f < s; f++) a[u + f] = r[l + f];
          if (v == 2) for (var f = s; f < n; f++) a[u + f] = r[l + f];
          if (v == 3) for (var f = s; f < n; f++) a[u + f] = r[l + f] - (r[l + f - s] >> 1) + 256 & 255;
          if (v == 4) for (var f = s; f < n; f++) a[u + f] = r[l + f] - w(r[l + f - s], 0, 0) + 256 & 255;
        } else {
          if (v == 2)
            for (var f = 0; f < n; f++) a[u + f] = r[l + f] + 256 - r[l + f - n] & 255;
          if (v == 3) {
            for (var f = 0; f < s; f++) a[u + f] = r[l + f] + 256 - (r[l + f - n] >> 1) & 255;
            for (var f = s; f < n; f++) a[u + f] = r[l + f] + 256 - (r[l + f - n] + r[l + f - s] >> 1) & 255;
          }
          if (v == 4) {
            for (var f = 0; f < s; f++) a[u + f] = r[l + f] + 256 - w(0, r[l + f - n], 0) & 255;
            for (var f = s; f < n; f++) a[u + f] = r[l + f] + 256 - w(r[l + f - s], r[l + f - n], r[l + f - s - n]) & 255;
          }
        }
      }, b.crc = {
        table: function() {
          for (var a = new Uint32Array(256), r = 0; r < 256; r++) {
            for (var h = r, n = 0; n < 8; n++)
              h & 1 ? h = 3988292384 ^ h >>> 1 : h = h >>> 1;
            a[r] = h;
          }
          return a;
        }(),
        update: function(a, r, h, n) {
          for (var s = 0; s < n; s++) a = b.crc.table[(a ^ r[h + s]) & 255] ^ a >>> 8;
          return a;
        },
        crc: function(a, r, h) {
          return b.crc.update(4294967295, a, r, h) ^ 4294967295;
        }
      }, b.quantize = function(a, r, h) {
        for (var n = [], s = 0, v = 0; v < a.length; v++)
          n.push(b.encode.alphaMul(new Uint8Array(a[v]), h)), s += a[v].byteLength;
        for (var l = new Uint8Array(s), u = new Uint32Array(l.buffer), w = 0, v = 0; v < n.length; v++) {
          for (var f = n[v], R = f.length, A = 0; A < R; A++) l[w + A] = f[A];
          w += R;
        }
        var _ = { i0: 0, i1: l.length, bst: null, est: null, tdst: 0, left: null, right: null };
        _.bst = b.quantize.stats(l, _.i0, _.i1), _.est = b.quantize.estats(_.bst);
        for (var d = [_]; d.length < r; ) {
          for (var k = 0, T = 0, v = 0; v < d.length; v++) d[v].est.L > k && (k = d[v].est.L, T = v);
          if (k < 1e-3) break;
          var y = d[T], C = b.quantize.splitPixels(l, u, y.i0, y.i1, y.est.e, y.est.eMq255), x = { i0: y.i0, i1: C, bst: null, est: null, tdst: 0, left: null, right: null };
          x.bst = b.quantize.stats(l, x.i0, x.i1), x.est = b.quantize.estats(x.bst);
          var D = { i0: C, i1: y.i1, bst: null, est: null, tdst: 0, left: null, right: null };
          D.bst = { R: [], m: [], N: y.bst.N - x.bst.N };
          for (var v = 0; v < 16; v++) D.bst.R[v] = y.bst.R[v] - x.bst.R[v];
          for (var v = 0; v < 4; v++) D.bst.m[v] = y.bst.m[v] - x.bst.m[v];
          D.est = b.quantize.estats(D.bst), y.left = x, y.right = D, d[T] = x, d.push(D);
        }
        d.sort(function(te, we) {
          return we.bst.N - te.bst.N;
        });
        for (var N = 0; N < n.length; N++) {
          for (var H = b.quantize.planeDst, O = new Uint8Array(n[N].buffer), M = new Uint32Array(n[N].buffer), L = O.length, v = 0; v < L; v += 4) {
            for (var U = O[v] * 0.00392156862745098, V = O[v + 1] * (1 / 255), j = O[v + 2] * (1 / 255), q = O[v + 3] * (1 / 255), X = _; X.left; ) X = H(X.est, U, V, j, q) <= 0 ? X.left : X.right;
            M[v >> 2] = X.est.rgba;
          }
          n[N] = M.buffer;
        }
        return { bufs: n, plte: d };
      }, b.quantize.getNearest = function(a, r, h, n, s) {
        if (a.left == null)
          return a.tdst = b.quantize.dist(a.est.q, r, h, n, s), a;
        var v = b.quantize.planeDst(a.est, r, h, n, s), l = a.left, u = a.right;
        v > 0 && (l = a.right, u = a.left);
        var w = b.quantize.getNearest(l, r, h, n, s);
        if (w.tdst <= v * v) return w;
        var f = b.quantize.getNearest(u, r, h, n, s);
        return f.tdst < w.tdst ? f : w;
      }, b.quantize.planeDst = function(a, r, h, n, s) {
        var v = a.e;
        return v[0] * r + v[1] * h + v[2] * n + v[3] * s - a.eMq;
      }, b.quantize.dist = function(a, r, h, n, s) {
        var v = r - a[0], l = h - a[1], u = n - a[2], w = s - a[3];
        return v * v + l * l + u * u + w * w;
      }, b.quantize.splitPixels = function(a, r, h, n, s, v) {
        var l = b.quantize.vecDot;
        for (n -= 4; h < n; ) {
          for (; l(a, h, s) <= v; ) h += 4;
          for (; l(a, n, s) > v; ) n -= 4;
          if (h >= n) break;
          var u = r[h >> 2];
          r[h >> 2] = r[n >> 2], r[n >> 2] = u, h += 4, n -= 4;
        }
        for (; l(a, h, s) > v; ) h -= 4;
        return h + 4;
      }, b.quantize.vecDot = function(a, r, h) {
        return a[r] * h[0] + a[r + 1] * h[1] + a[r + 2] * h[2] + a[r + 3] * h[3];
      }, b.quantize.stats = function(a, r, h) {
        for (var n = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], s = [0, 0, 0, 0], v = h - r >> 2, l = r; l < h; l += 4) {
          var u = a[l] * 0.00392156862745098, w = a[l + 1] * (1 / 255), f = a[l + 2] * (1 / 255), R = a[l + 3] * (1 / 255);
          s[0] += u, s[1] += w, s[2] += f, s[3] += R, n[0] += u * u, n[1] += u * w, n[2] += u * f, n[3] += u * R, n[5] += w * w, n[6] += w * f, n[7] += w * R, n[10] += f * f, n[11] += f * R, n[15] += R * R;
        }
        return n[4] = n[1], n[8] = n[2], n[12] = n[3], n[9] = n[6], n[13] = n[7], n[14] = n[11], { R: n, m: s, N: v };
      }, b.quantize.estats = function(a) {
        var r = a.R, h = a.m, n = a.N, s = h[0], v = h[1], l = h[2], u = h[3], w = n == 0 ? 0 : 1 / n, f = [
          r[0] - s * s * w,
          r[1] - s * v * w,
          r[2] - s * l * w,
          r[3] - s * u * w,
          r[4] - v * s * w,
          r[5] - v * v * w,
          r[6] - v * l * w,
          r[7] - v * u * w,
          r[8] - l * s * w,
          r[9] - l * v * w,
          r[10] - l * l * w,
          r[11] - l * u * w,
          r[12] - u * s * w,
          r[13] - u * v * w,
          r[14] - u * l * w,
          r[15] - u * u * w
        ], R = f, A = b.M4, _ = [0.5, 0.5, 0.5, 0.5], d = 0, k = 0;
        if (n != 0)
          for (var T = 0; T < 10 && (_ = A.multVec(R, _), k = Math.sqrt(A.dot(_, _)), _ = A.sml(1 / k, _), !(Math.abs(k - d) < 1e-9)); T++)
            d = k;
        var y = [s * w, v * w, l * w, u * w], C = A.dot(A.sml(255, y), _), x = y[3] < 1e-3 ? 0 : 1 / y[3];
        return {
          Cov: f,
          q: y,
          e: _,
          L: d,
          eMq255: C,
          eMq: A.dot(_, y),
          rgba: (Math.round(255 * y[3]) << 24 | Math.round(255 * y[2] * x) << 16 | Math.round(255 * y[1] * x) << 8 | Math.round(255 * y[0] * x) << 0) >>> 0
        };
      }, b.M4 = {
        multVec: function(a, r) {
          return [
            a[0] * r[0] + a[1] * r[1] + a[2] * r[2] + a[3] * r[3],
            a[4] * r[0] + a[5] * r[1] + a[6] * r[2] + a[7] * r[3],
            a[8] * r[0] + a[9] * r[1] + a[10] * r[2] + a[11] * r[3],
            a[12] * r[0] + a[13] * r[1] + a[14] * r[2] + a[15] * r[3]
          ];
        },
        dot: function(a, r) {
          return a[0] * r[0] + a[1] * r[1] + a[2] * r[2] + a[3] * r[3];
        },
        sml: function(a, r) {
          return [a * r[0], a * r[1], a * r[2], a * r[3]];
        }
      }, b.encode.alphaMul = function(a, r) {
        for (var h = new Uint8Array(a.length), n = a.length >> 2, s = 0; s < n; s++) {
          var v = s << 2, l = a[v + 3];
          r && (l = l < 128 ? 0 : 255);
          var u = l * (1 / 255);
          h[v + 0] = a[v + 0] * u, h[v + 1] = a[v + 1] * u, h[v + 2] = a[v + 2] * u, h[v + 3] = l;
        }
        return h;
      };
    }(W, P);
  })();
})(Ra);
var Ka = Ra.exports;
const Ya = /* @__PURE__ */ Za(Ka);
function Xa(Z, W) {
  const { outputWidth: P, outputHeight: b, ratio: J = 1, toJPEG: a = !1 } = W;
  return new Promise((r) => {
    const h = new FileReader(), n = Z.name, s = document.createElement("canvas"), v = s.getContext("2d");
    if (Z.type === "image/png" && !a)
      try {
        h.readAsDataURL(Z), h.onload = function(l) {
          const u = new Image();
          u.src = l.target && l.target.result ? l.target.result.toString() : "", u.onload = function() {
            const w = P ?? u.width * J, f = b ?? u.height * J;
            if (s.width = w, s.height = f, v) {
              v.clearRect(0, 0, w, f), v.drawImage(u, 0, 0, w, f);
              const A = v.getImageData(
                0,
                0,
                w,
                f
              ).data, _ = Ya.encode(
                [A.buffer],
                w,
                f,
                256
              ), d = new Blob([_], {
                type: "image/png"
              }), k = new File([d], n, {
                type: "image/png"
              });
              r(k);
            }
          };
        };
      } catch (l) {
        console.log(l);
      }
    else
      h.readAsDataURL(Z), h.onload = function(l) {
        const u = new Image();
        u.src = l.target && l.target.result ? l.target.result.toString() : "", u.onload = function() {
          const w = P ?? u.width * J, f = b ?? u.height * J;
          s.width = w, s.height = f, v && v.clearRect(0, 0, w, f), v && v.drawImage(u, 0, 0, w, f);
          const A = s.toDataURL("image/jpeg", 0.8).split(","), _ = A[0].match(/:(.*?);/)[1], d = atob(A[1]);
          let k = d.length;
          const T = new Uint8Array(k);
          for (; k--; )
            T[k] = d.charCodeAt(k);
          const y = new File([T], n, { type: _ });
          r(y);
        };
      };
  });
}
export {
  Xa as default
};
