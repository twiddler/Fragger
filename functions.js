/* Returns all substring positions, and allows a number of mismatches for which the positions are also returned.
   Returned array consists of
   [
     [
	   first found substring position,
	   [
	     position of first mismatch in the haystack,
		 position of second mismatch in the haystack,
		 ...
	   ]
	 ],
	 ...
   ]
     haystack: string in which the substring  shall be searched in
     needle: the substring
     threshold: relative allowed mismatches. Examples: 0 = none, 1 = no matches, 0.5 = every second character mismatches
	 
	 Example of a possible call: stringsearch('aaaaabbaaaaa','aabaa',0.2);
*/
function stringsearch(haystack, needle, threshold) {
	var results = [];
	var allowed_mismatches = threshold * haystack.length;
	
	// for each position in the haystack
	for (var i = 0; i <= haystack.length-needle.length; i++) {
		var mismatches = [];
		
		// for each position in the needle, if there aren't already too many mismatches
		var j = 0;
		while (j < needle.length && mismatches.length <= allowed_mismatches) {
			if (needle[j] != haystack[i+j]) {
				mismatches.push(i+j);
			}
			j++;
		}
		if (j == needle.length && mismatches.length <= allowed_mismatches) {
		results.push({substr_pos: i, mismatches_pos: mismatches});
		}
	}
	return results;
}

// Inverts a DNA sequence and replaces bases with their complement base
function invertsequence(sequence) {
	var complement = '';
	var complements = {A: 'T', T: 'A', C: 'G', G: 'C'};
	for (var i = 0; i < sequence.length; i++) {
		complement += complements[sequence[i]];
	}
	return esrever.reverse(complement);
}

// Compares two objects by property
function compare(a,b,property) {
	if (a[property] < b[property]) {
		return -1;
	}
	if (a[property] > b[property]) {
		return 1;
	}
	return 0;
}

// Compares two objects by property
function sortfragments_compare(a,b) {
	var properties = ['position', 'end', 'fragment_parent', 'fragment'];
	var order = 0;
	var i = 0;
	do {
		order = compare(a,b,properties[i]);
		i++;
	} while (order == 0);
	return order;
}

// Sorts the results by starting position, then by fragment parent, then by fragment
function sortfragments(alignments) {
	return alignments.sort(sortfragments_compare);
}