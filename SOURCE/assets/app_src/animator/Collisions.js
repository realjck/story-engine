/*

Collisions of Animate movieclips
author: JCK

*/

define(function() {

	return {
		check: function (mc1, mc2) {
		
			m1w = mc1.nominalBounds.width;
			m1h = mc1.nominalBounds.height;
			m1x = mc1.x - m1w/2;
			m1y = mc1.y - m1h/2;
			
			m2w = mc2.nominalBounds.width;
			m2h = mc2.nominalBounds.height;
			m2x = mc2.x - m2w/2;
			m2y = mc2.y - m2h/2;
			
			if (	m1x >= m2x + m2w
				||	m1x + m1w <= m2x
				||	m1y >= m2y + m2h
				||	m1y + m1h <= m2y) {
				return false;
			} else {
				return true;
			}
		}
	};
});