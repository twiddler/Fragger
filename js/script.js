$(function() {
	console.time("Runtime");
	
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
		$('#summary').append('<div class="message errormessage">'+err+'</div>');
	}
	
	// Initialize the counter for how often each fragment has been found, to put out a warning later for fragments that have not been found at all
	// Also, reuse colors if there were not enough colors defined, and output a warning
	var fragments_found = [];
	var fragment_colors_initial_length = fragment_colors.length; // For later modulo calculation
	for (var i = 0; i < fragments.length; i++) {
		fragments_found[i] = [];
		for (var j = 0; j < fragments[i].length; j++) {
			fragments_found[i][j] = 0;
		}
		
		// Reuse color
		if (fragment_colors[i] === undefined) {
			color = fragment_colors[i % fragment_colors_initial_length];
			$('#summary').append('<div class="message warningmessage">Not enough different sequence colors defined. <span style="color: rgb('+color[0]+','+color[1]+','+color[2]+')">This color</span> is now used for one more sequence.</div>');
			fragment_colors.push(color);
		}
	}
	
	// Create reverse fragments, and store initial fragment numbers for later identification of reversed fragments
	var fragments_counts = [];
	for (var i = 0; i < fragments.length; i++) {
		fragments_counts[i] = fragments[i].length;
		for (var j = (fragments[i].length - 1); j >= 0; j--) {
			fragments[i].push(invertsequence(fragments[i][j]));
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
	}
	
	var html_results = '';
	// search each fraction in the sequence, and if found, append a bar to show the range
	for (var i_sequences = 0; i_sequences < results.length; i_sequences++) {
		// get relative position and width to display the spanned region
		var result = results[i_sequences];
		var sequence = result.sequence;
		
		// SEQUENCE - This is the sequence that is displayed above the alignments
		// For each position, get colors of fragments that would fit here
		var html_sequence = '';
		var pos_colors = [];
		for (var pos = 0; pos < sequence.length; pos++) {
			// for each fragment that could be aligned
			for (var i = 0; i < result.alignments.length; i++) {
				var alignment = result.alignments[i];
				if ((pos >= alignment.position) && (pos < (alignment.position + fragments[alignment.fragment_parent][alignment.fragment].length))) {
					// Add color of current fragment to color list
					if (pos_colors[pos] === undefined) {
						pos_colors[pos] = [];
					}
					pos_colors[pos].push(fragment_colors[alignment.fragment_parent]);
				}
			}
		}
		// Display colors and position information
		for (var pos = 0; pos < sequence.length; pos++) {
			// Multiply and display colors of all fragments that were aligned to this position
			var style_colors = '';
			if (!(pos_colors[pos] === undefined)) {
				var colors = multiplyRGB(pos_colors[pos]);
				style_colors = 'background-color: rgba('+colors[0]+','+colors[1]+','+colors[2]+',0.3);';
			}
			
			// Check if there is a mismatch for any of the aligned fragments
			var style_mismatch = '';
			for (var i = 0; i < result.alignments.length; i++) {
				var alignment = result.alignments[i];
				
				for (var k = 0; k < alignment.mismatches.length; k++) {
					if (pos == alignment.mismatches[k]) {
						style_mismatch = 'outline: 1px dashed red;';
						if (!(colors === undefined)) {
							style_mismatch += 'background-color: rgba('+colors[0]+','+colors[1]+','+colors[2]+',0.1);';
						}
					}
				}
			}
			
			// Add character to sequence
			html_sequence += '<span class="seq_char" style="'+style_colors+style_mismatch+'" data-pos="'+(pos+1)+'">'+sequence[pos]+'</span>';
		}
		
		// ALIGNMENTS
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
			
			colors = fragment_colors[alignment.fragment_parent];
			// If fragment was a reversed one, adjust number and add class
			var class_reverse = '';
			var offset_reverse = 0;
			if (alignment.fragment >= fragments_counts[alignment.fragment_parent]) {
				class_reverse = ' reverse';
				offset_reverse = fragments_counts[alignment.fragment_parent];
			}
			html_alignments += '<div class="alignment'+class_reverse+'" style="width: '+length_relative+'%; left: '+position_relative+'%;"><p>'+(position+1)+'</p><p>'+(position+length)+'</p><p style="background-color: rgb('+colors[0]+','+colors[1]+','+colors[2]+');">'+(alignment.fragment_parent+1)+'.'+(alignment.fragment+1-offset_reverse)+'</p>'+html_mismatches+'</div><div class="overlay" style="width: '+length_relative+'%; left: '+position_relative+'%;background-color: rgb('+colors[0]+','+colors[1]+','+colors[2]+');opacity: 0.3;">&nbsp;</div>';
			
			//fragments_found[i][j] = 1;
		}
		
		// insert sequence and full width bar
		html_results += '<li class="result"><input type="checkbox" id="c'+i_sequences+'"/><label for="c'+i_sequences+'">></label><p class="sequence">'+html_sequence+'</p><div class="alignments"><div class="alignment sequence"><p>'+1+'</p><p>'+sequence.length+'</p><p>&nbsp;</p></div>'+html_alignments+'</div></li>';
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