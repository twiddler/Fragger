// Allowed mismatches, relative. A threshold of 0.01 means that 1% of a fragments amino acids might be different than expected, that is 1 of 100 amino acids is altered.
threshold = 0.01;

// Colors for the different sequence that the fragments derived from
fragment_colors = ['rgb(115, 154, 255)','rgb(255, 105, 105)','rgb(40, 203, 40)','rgb(255, 195, 66)','rgb(247, 119, 211)','rgb(125, 222, 239)','rgb(164, 96, 249)','rgb(244, 230, 89)','rgb(62, 240, 186)','rgb(234, 76, 142)'];
fragment_colors_a = ['rgba(115, 154, 255, 0.3)','rgba(255, 105, 105, 0.3)','rgba(40, 203, 40, 0.3)','rgba(255, 206, 100, 0.3)','rgba(247, 119, 211, 0.3)','rgba(125, 222, 239, 0.3)','rgba(164, 96, 249, 0.3)','rgba(244, 230, 89, 0.3)','rgba(62, 240, 186, 0.3)','rgba(234, 76, 142, 0.3)'];

// Uncomment this if you want to test the colors
// $(function(){
//    for (var i = 0; i < fragment_colors.length; i++) {
//        $('#summary').append('<div style="background-color: '+fragment_colors[i]+'; width: 100px; height: 100px; display: block;"></div>');
//    }
// });