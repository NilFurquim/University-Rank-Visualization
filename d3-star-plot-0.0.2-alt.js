d3.starPlot = function() {
	function a(a) {
		h = a.datum();
		g = a.attr("transform", "translate(" + j.left + "," + j.top + ")");
		l && b(), m && c(), d();
	}

	function b() {
		var a = 0;
		n.forEach(function() {
			var b, c, d;
			b = r
			c = b * Math.cos(a), d = b * Math.sin(a)
			g.append("line").attr("class", "star-axis")
				.attr("x1", s[0])
				.attr("y1", s[1])
				.attr("x2", s[0] + c)
				.attr("y2", s[1] + d);
			a += u;
		})
	}

	function c() {
		var a = 0;
		n.forEach(function(b, c) {
			var d, e, f;
			d = r, e = (d + k) * Math.cos(a), f = (d + k) * Math.sin(a)
			g.append("text").attr("class", "star-label")
				.attr("x", s[0] + e)
				.attr("y", s[1] + f)
				.text(p[c])
				.style("text-anchor", "middle")
				.style("dominant-baseline", "central");
			a += u;
		})
	}

	function d() {
		g.append("circle")
			.attr("class", "star-origin")
			.attr("cx", s[0])
			.attr("cy", s[1])
			.attr("r", 2);
        var a = d3.svg.line.radial(),
            b = [],
            c = Math.PI / 2;
        n.forEach(function(a, d) {
            var e = o[d] || o[0];
            b.push([v(e(h[a])), c]), c += u
        });
		console.log(a(b));
		g.append("path")
			.attr("class", "star-path")
			.attr("transform", "translate(" + s[0] + "," + s[1] + ")")
			.attr("d", a(b) + "Z");

		g.append("text")
			.attr("class", "star-title")
			.attr("x", s[0])
			.attr("y", -(j.top / 2))
			.text(q(h))
			.style("text-anchor", "middle")
    }

    function e() {
        var a = d3.svg.line.radial(),
            b = Math.PI / 2,
            c = 0;
        n.forEach(function(d, e) {
            var f, i, l, m, p, q;
            f = r;
		i = f * Math.cos(b), l = f * Math.sin(b);
		m = r + k;
		p = m * Math.cos(c) + s[0] + j.left;
		q = m * Math.sin(c) + s[1] + j.top;
		var t = o[e] || o[0];
		lValue = v(t(h[d])), x = lValue * Math.cos(c) + s[0] + j.left, y = lValue * Math.sin(c) + s[1] + j.top;
            var w = u / 2,
                z = [
                    [0, b - w],
                    [f, b - w],
                    [f, b + w]
                ],
                A = {
                    xExtent: p,
                    yExtent: q,
                    x: x,
                    y: y,
                    key: n[e],
                    datum: h
                };
			g.append("path")
				.datum(A)
				.attr("class", "star-interaction")
				.attr("transform", "translate(" + s[0] + "," + s[1] + ")")
				.attr("d", a(z) + "Z");
			b += u, c += u
        })
    }

    function f() {}
    var g, h, i = 200,
        j = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        k = 20,
        l = !0,
        m = !0,
        n = [],
        o = [],
        p = [],
        q = f,
        r = i / 2,
        s = [r, r],
        t = n.length,
        u = 2 * Math.PI / t,
        v = d3.scale.linear().domain([0, 100]).range([0, r]);
    return a.interaction = function() {
        e()
    }, a.properties = function(b) {
        return arguments.length ? (n = b, t = n.length, u = 2 * Math.PI / t, a) : n
    }, a.scales = function(b) {
        return arguments.length ? (o = Array.isArray(b) ? b : [b], a) : o
    }, a.width = function(b) {
        return arguments.length ? (i = b, r = i / 2, s = [r, r], v.range([0, r]), a) : i
    }, a.margin = function(b) {
        return arguments.length ? (j = b, s = [r, r], a) : j
    }, a.labelMargin = function(b) {
        return arguments.length ? (k = b, a) : k
    }, a.title = function(b) {
        return arguments.length ? (q = b, a) : q
    }, a.labels = function(b) {
        return arguments.length ? (p = b, a) : p
    }, a.includeGuidelines = function(b) {
        return arguments.length ? (l = b, a) : l
    }, a.includeLabels = function(b) {
        return arguments.length ? (m = b, a) : m
    }, a
};
