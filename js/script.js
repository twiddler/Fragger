$(function() {
	console.time("Runtime");
	
	//sequences = sequences.concat(sequences); // 6 10 s, y=0,0721*x^2+0,6824*x+7,7211
	//sequences = sequences.concat(sequences); // 12 27 s
	//sequences = sequences.concat(sequences);
	//sequences = sequences.concat(sequences); // 48 217
	//sequences = sequences.concat(sequences); // 96 723
	//sequences = sequences.concat(sequences);
	//console.log(sequences.length);
	//throw 'cowboy in your town.';
	
	// Check for correct input
	try {
		// Sequences entered as array?
		if (!(typeof sequences === 'array' || sequences instanceof Array)) {
			throw 'Sequences are not entered as an array.';
		}
		// Is each sequence a string?
		for (var i = 0; i < sequences.length; i++) {
			if (!(typeof sequences[i] === 'string' || sequences[i] instanceof String)) {
				throw 'Sequence '+(i+1).toString()+' is not a string.'
			}
		}
		
		// Fragments entered as array?
		if (!(typeof fragments  === 'array' || fragments  instanceof Array)) {
			throw 'Fragments are not entered as an array.';
		}
		for (var i = 0; i < fragments.length; i++) {
			if (!(typeof fragments[i] === 'array' || fragments[i] instanceof Array)) {
				throw 'Fragments of sequence '+(i+1).toString()+' are not entered as an array.'
			}
			for (var j = 0; j < fragments[i].length; j++) {
				if (!(typeof fragments[i][j] === 'string' || fragments[i][j] instanceof String)) {
					throw 'Fragment '+(j+1).toString()+' of sequence '+(i+1).toString()+' is not a string.'
				}
			}
		}
	} catch(err) {
		$('#summary').append('<div class="errormessage">'+err+'</div>');
	}
	
	// initialize the counter for how often each fragment has been found, to put out a warning later for fragments that have not been found at all
	var fragments_found = [];
	for (var i = 0; i < fragments.length; i++) {
		fragments_found[i] = [];
		for (var j = 0; j < fragments[i].length; j++) {
			fragments_found[i][j] = 0;
		}
	}
	
	// Build variable holding all results
	var results = [];
	// for each sequence of the submitted sequences
	for (var i_sequences = 0; i_sequences < sequences.length; i_sequences++) {
		var sequence = sequences[i_sequences];
		results.push({sequence: sequence, alignments: []});
		
		// search each fraction in the sequence
		for (var i = 0; i < fragments.length; i++) {
			for (var j = 0; j < fragments[i].length; j++) {
				// get relative position and width to display the spanned region
				var positions = stringsearch(sequence,(fragments[i][j]),threshold);
				for (var k = 0; k < positions.length; k++) {
					results[i_sequences].alignments.push({
						fragment: j,
						fragment_parent: i,
						position: positions[k].substr_pos,
						end: (positions[k].substr_pos + fragments[i][j].length - 1),
						mismatches: positions[k].mismatches_pos
					});
				}
			}
		}
		
		// sort fragments
		sortfragments(results[i_sequences].alignments); // fragments have to be sorted by starting and end position

function f(fragments,c) {
	if (c>30) {
		console.log("abort");
		return 30;
	}
//	console.log(fragments.length)
	// Collect all starter elements, which are those that cannot be reached from any other fragment from the passed fragments
	var starters = [];
	// get maximum end among fragments
	var max = fragments[0].end;
	for (var i = 1; i < fragments.length; i++) {
		max = Math.min(fragments[i].end, max);
	}
	// add all fragments whose start is not greater max to the starter set
	for (var i = fragments.length - 1; i >= 0; i--) {
		if (fragments[i].start <= max) {
			starters.unshift(fragments.splice(i,1).pop());
		}
	}
	console.log("starters:")
	console.log(starters)
	console.log("")
//	for (var i = fragments.length - 1; i >= 0; i--) {
//		console.log(fragments[i]);
//	}
	
	// If there are no elements left that could follow the starters
	if (fragments.length == 0) {
		if (c==0) {
			console.log("result f()")
		}
		return starters;
	}
	
	following = f(fragments,c);
	var results = [];
	for (var i = 0; i < starters.length; i++) {
		for (var j = 0; j < following.length; j++) {
			results.push([starters[i]].concat(following[j]))
		}
	}
	return results;
}
//console.log([{seq:'A'}].concat([{seq:'B'},{seq:'C'}]));
console.log(f([
	{
		start: 0,
		end: 0,
		seq: 'A'
	},
	{
		start: 1,
		end: 3,
		seq: 'B'
	},
	{
		start: 2,
		end: 2,
		seq: 'C'
	},
	{
		start: 3,
		end: 3,
		seq: 'D'
	},
],0));
		
		
		//hier weitermachen
		// create possible orders
        console.log(results[i_sequences]);
        alignments = results[i_sequences].alignments;
        console.log(alignments);
		var starters = [alignments[0]];
		var orders = [];
		while (starters.length > 0) {
			var rest = alignments.slice(0); // klonieren
			//starters.push(alignments.pop());
			var order = [starters.pop()];
			/*while (rest.length > 0) {
                var tail = order[order.length-1];
				if (rest[0].position > tail.end) {
					order = [rest.pop()];
				} else {
					starters.push(rest.pop());
                }
			}*/
			orders.push(order);
		}
		/*while (starters.length > 0) {
			var rest = alignments.slice(0); // klonieren
			var order = [starters.pop()];
			while (rest.length > 0) {
				if (rest[0].position > wenn das nächste passt
					order = [rest.pop()];
				else
					starters.push(rest.pop());
			}
			orders.push(order);
		}*/
	}
	//console.log(results);
	
	var html_results = '';
	// search each fraction in the sequence, and if found, append a bar to show the range
	for (var i_sequences = 0; i_sequences < results.length; i_sequences++) {
		// get relative position and width to display the spanned region
		var result = results[i_sequences];
		var sequence = result.sequence;
		
		// Color each character with the colors of all fragments that would fit here
		// Iterate over each position in the sequence
		var html_sequence = '';
		for (var pos = 0; pos < sequence.length; pos++) {
			// Insert a span, inside which the following spans with the background can be easily inserted. Every character will be wrapped in at least one span, even uncolored ones.
			var span_opening = '';
			var span_closing = '';
			
			// for each fragment that could be aligned
			for (var i = 0; i < result.alignments.length; i++) {
				var alignment = result.alignments[i];
				
				if ((pos >= alignment.position) && (pos < (alignment.position + fragments[alignment.fragment_parent][alignment.fragment].length))) {
					span_opening += '"><span style="background-color: '+fragment_colors_a[alignment.fragment_parent]+'';
					span_closing += '</span>';
				}
				
				for (var k = 0; k < alignment.mismatches.length; k++) {
					if (pos == alignment.mismatches[k]) {
						span_opening += '"><span style="background: rgba(255,255,255,0.6); outline: 1px dashed red;';
						span_closing += '</span>';
					}
				}
			}
			
			// if there was no fragment covering the current character, insert a span so that the position can be displayed when hovering the character
			if (span_opening.length > 0) {
				span_opening = span_opening.substring(2)+'; padding: 4px; position: relative">';
			} else {
				span_opening = '<span style="padding: 4px; position: relative">';
				span_closing = '</span>';
			}
			html_sequence += span_opening+sequence[pos]+'<span class="pos">'+(pos+1)+'</span>'+span_closing;
		}
		
		var html_alignments = '';
		for (var i_alignments = 0; i_alignments < result.alignments.length; i_alignments++) {
			var alignment = result.alignments[i_alignments];
			var length = fragments[alignment.fragment_parent][alignment.fragment].length;
			
			var position = alignment.position;
			var position_relative = position/sequence.length*100;
			var length_relative = 100*length/sequence.length;
			var mismatches = alignment.mismatches;
			
			// highlight mismatches
			var html_mismatches = '';
			for (var l = 0; l < mismatches.length; l++) {
				html_mismatches += '<div class="mismatch" style="width: '+100/length+'%; left: '+(mismatches[l]-position)/length*100+'%;">'+'<span class="pos">'+(mismatches[l]+1)+'</span>'+'</div>'
			}
			
			html_alignments += '<div class="alignment" style="width: '+length_relative+'%; left: '+position_relative+'%;"><p>'+(position+1)+'</p><p>'+(position+length)+'</p><p style="background-color: '+fragment_colors[alignment.fragment_parent]+';">'+(alignment.fragment_parent+1)+'.'+(alignment.fragment+1)+'</p>'+html_mismatches+'</div><div class="overlay" style="width: '+length_relative+'%; left: '+position_relative+'%;background-color: '+fragment_colors[alignment.fragment_parent]+';opacity: 0.3;">&nbsp;</div>';
			
			//fragments_found[i][j] = 1;
		}
		
		// insert sequence and full width bar
		html_results += '<li class="result"><p class="sequence">'+html_sequence+'</p><div class="alignments"><div class="alignment sequence"><p>'+1+'</p><p>'+sequence.length+'</p><p>&nbsp;</p></div>'+html_alignments+'</div></li>';
	}
	$("#results").html(html_results);
	
	// Put out a summary, including hints for possible errors
	// Put out fragments that were not found, as they might have been entered wrong
	/*$('#summary').append(
		'<p>The following fragments were not found:</p><ul></ul>'
	);
	for (var i = 0; i < fragments.length; i++) {
		for (var j = 0; j < fragments[i].length; j++) {
			if (fragments_found[i][j] == 0) {
				$('#summary ul').append('<li>'+i+'.'+j+'</li>');
			};
		}
	}/**/
	
	console.timeEnd("Runtime");
});