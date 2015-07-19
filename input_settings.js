// Allowed mismatches, relative. A threshold of 0.01 means that 1% of a fragments amino acids might be different than expected, that is 1 of 100 amino acids is altered.
threshold = 0.01;

// Colors for the different sequence that the fragments derived from
fragment_colors = [[115,154,255], [255,105,105], [40,203,40], [255,195,66], [247,119,211], [125,222,239], [164,96,249], [244,230,89], [62,240,186], [234,76,142]];

// Uncomment this if you want to test the colors
// $(function(){
//    for (var i = 0; i < fragment_colors.length; i++) {
//        $('#summary').append('<div style="background-color: '+fragment_colors[i]+'; width: 100px; height: 100px; display: block;"></div>');
//    }
// });