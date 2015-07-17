// The fragments of which the sequences should consist of. Fragments have to be entered in the following format:
//
// fragments = [
//   [fragment 1 of sequence A, fragment 2 of sequence A, fragment 3 of sequence A, ...],
//   [fragment 1 of sequence B, fragment 2 of sequence B, ...],
//   ...
// ]
//
// Example:
//
// sequences = [
//   ['ABCD','EF','AADD'],
//   ['GHH','HIIJKK']
// ]
//
// Do not include any line breaks in the sequences themselves! Sequences have to be encapsulated with 'quotes'.

fragments = [
	['CTGCCGACCAGCAATCCGGCACAAGAACTGGAAGCACGTCAGCTGGGTCGTACCACCCGTGATGATCTGATTAATGGTAATAGCGCAAGCTGTGCCGATGTGATTTTTATCTATGCACGT','AGCGCAGCAATTCGTGAAATGCTGGGTCTGTTTCAGCAGGCAAATACCAAATGTCCGGATGCCACC','GCAGCAGCAAGCATTGAAGATCTGGATAGTGCCATTCGTGATAAAATTGCAGGCACCGTTCTGTTTGGCTATACCAAAAATCTGCAGAATCGTGGTCGTATTCCGAATTATCCGGCAGATCGTACCAAAGTTTTTTGCAATACCGGTGATCTGGTTTGT','TATGGTCCTGATGCCCGTGGTCCGGCACCGGAATTTCTGATTGAAAAAGTTCGTGCAGTTCGTGGTAGCGCA'],
	['GGTCGTGGCACCAAACAGGTTTATATCATTCATGGTTATCGTGCCAGCAGCACCAATCATTGGTTTCCGTG','GCAGATATTCTGAATATGCCGAATCCGCTGCAGCCTCGTCTGGAAGATTGGCTGGATACCCTGAGCCTGTATCAGCATACCCTGCATGAAAAT','ATTCTGCGTTTTCTGGAACATCTGCAGCTGCGTGCAGCACTGGGTGGTATTATTCTGGTTAGCGGTTTTGCCAAAAGCCTGCCGACCCTGCAGATGCTGGATGAATTTACCCAGGGTAGCTTTGATCATCAGAAAATTATCGAAAGCGCAAAACATCGTGCAGTGATT','AGCAAAGATCTGGCACAGCAGATTGATGCAGCCCTGTATGAAGTTCAGCATGGTGGTCATTTTCTGGAAGATGAAGGTTTTACCAGCCTGCCTATTGTTTATGACGTTCTGACCAGCTATTTCAGCAAAGAAACCCGT'],
	['AGTCCGGTTGATCTGCAGGATCGCCAGCTGACCGGTGGTGATGAACTGCGTGATGGTCCGTGTAAACCGATTACCTTTATCTTTGCACGTGCCAGCACCGAACCGGGTCTGCTGGGTATTAGCACCGGTCCGGCAGTTTGTAATCGTCTGAAACTGGCACGTAGCGGTGATGTTGCATGTCAGGGTGTTGGTCCGCGTTATACAGCC','CAGGCAGCAATTGCAGAAGCACAGGGTCTGTTTGAACAGGCAGTTAGCAAATGTCCGGATACCCAG','ATGAATGGTGCAATTAAACGTCTGAGCGCAGATGTTCAGGATAAAATCAAAGGTGTTGTGCTGTTTGGTTATACCCGTAATGCACAAGAACGTGGTCAGATTGCAAATTTCCCGAAAGACAAAGTGAAAGTGTATTGTGCAGTTGGTGATCTGGTTTGT','TATCTGAGCGATACCGGTGATGCAAGCGATTTTCTGCTGAGCCAGCTGGGT'],
	['GCAATGGCAATTAGCGATCCGCAGAGCAGCACCCGTAATGAACTGGAAACCGGTAGCAGCAGCGCATGTCCGAAAGTGATTTATATCTTTGCACGTGCCAGCACCGAACCGGGTAATATGGGTATTAGCGCAGGTCCGATTGTTGCAGATGCACTGGAACGTATTTATGGTGCAAATGATGTTTGGGTTCAGGGTGTTGGTGGTCCGTATCTGGCA','AGCGCAGCAATTAATGAAGCACGTCGTCTGTTTACCCTGGCAAATACCAAATGTCCGAATGCAGCA','ATGGCAGGTAGCATTAGCGGTCTGAGCACCACCATTAAAAACCAGATTAAAGGTGTTGTGCTGTTTGGCTATACCAAAAATCTGCAGAATCTGGGTCGTATCCCGAATTTTGAAACCAGCAAAACCGAAGTGTATTGCGATATTGCCGATGCAGTTTGT','TATCAGACCGATGCAGCAGTTGCAGCACCGCGTTTTCTGCAGGCACGTATTGGT'],
	['ATGAGCGTTACCACACCGCGTCGTGAAACCAGCCTGCTGAGCCGTGCACTGCGTGCAACCGCAGCAGCAGCCACCGCAGTTGTTGCAACCGTTGCACTGGCAGCACCGGCACAGGCAGCAAATCCGTATGAACGTGGTCCGAATCCGACCGAAAGCATGCTGGAAGCACGTAGCGGTCCGTTTAGCGTTAGCGAAGAACGTGCAAGCCGTTTTGGTGCAGATGGTTTTGGTGGTGGCACCATCTATTATCCGCGTGAAAATAACACCTATGGTGCCATTGCAATTAGTCCGGGTTATACCGGCACCCAGAGCAGCATTGCA','GTTATTGCCATTGATACCAATACCACCCTGGATCAGCCGGATAGCCGTGCCCGTCAGCTGAATGCAGCACTGGATTATATGCTGACCGATGCAAGCAGCGCAGTTCGTAATCGTATTGATGCCAGCCGT','ACACTGCGTCTGGCAAGCCAGCGTCCGGATCTGAAAGCAGCAATTCCGCTGACCCCGTGGCATCTGAATAAAAGCTGGCGTGATATTACCGTTCCGACCCTGATTATT','CATAGCAAACCGTTTTATAACAGCATTCCGAGCCCGACCGATAAAGCATATCTG','ACCAATAAAACCATCGGCATGTATAGCGTTGCCTGGCTGAAACGTTTTGTTGATGAAGATACCCGTTATACCCAGTTTCTGTGTCCGGGTCCGCGTACCGGTCTGCTGAGTGATGTTGAAGAATATCGTAGCACCTGTCCGTTT'],
	['ATGCAGCAGCCGAATCGTGCACTGCCTGCAGGTCCGGAACCGAGTCCGCGTCGTCCGCATCGTCTGACCGGTCGTCTGGTTCGTGCAGGTCTGGCAGTTCTGCTGGCAGCGGGTGGTCTGGTTGCAGCACAGGCAACCGGTGCCGGTGCAGTTACCACCCGTACCGTTAGCGCACAGGCAGCAGCAAATCCGTATGAACGTGGTCCGGCACCGACCGTTGCAAGCATTGAAGCAACCACCGGTCCGTATGCAGTTAGCACCAGCAGCGTGAGCGCACTGAGCGTTAGCGGTTTTGGTGGTGGCACCATCTATTATCCGACCAGCACCGCAGATGGCACCTTTGGTGCAGTTGCAGTTAGTCCGGGTTATACCGCATATCAGAGCAGCATTGCA','GTTTTTACCATTGATACCCTGACCACCCTGGATCAGCCGGATAGCCGTGGTCGTCAGCTGCTGGCTGCACTGGATTATCTGACCCAGACCAGCAGTGTTCGTAGCCGTATTGATAGCAGCCGT','ACACTGGAAGCAGCAAAAAGCCGTCCGAGCCTGCAAGCAGCAATTCCGCTGACCGCATGGAATCTGGATACCACCTGGCCTGAAATCAAAACCCCGACCCTGATTGTT','CATAGCGAACCGTTTTATGCAAGCCTGCCGAGTACCCTGGATAAAGCATATCTG','AGCAATACCACCATTGCCAAATATAGCATTAGCTGGCTGAAACGCTTCATCGATAATGATACCCGTTATGAACAGTTTCTGTGTCCGCTGCCGCAGGCAAGCCTGACCATTGCAGAATATCGTGGTAATTGTCCGCATACCAGC'],
	['ATGAAACGTTATCTGGCAGCAGCAACCGCAGTTACCGCAGGTCTGACCCTGCTGCTGGCACCGGGTGCTGGTGCAGCAGCCGGTAATCCGTATGAACGTGGTCCGGCACCGACCGTTGCAAGCATTGAAGCAAGCCGTGGTCCGTATGCAGTTGCACAGACCAGCGTTAGCAGCCTGGCAGCCGTTGGTTTTGGTGGTGGCACCATCTATTATCCGACCAGCACCGCAGATGGCACCTTTGGTGCAGTTGCCATTAGTCCGGGTTTTACCGCAACCCAGAGCAGCGTTGCA','GTTTTTGTTATTGATACCCTGACCACCCTGGATCAGCCGGATAGTCGTGGTCGTCAACTGCTGGCAGCACTGGATCATCTGACCCAGCGTAGCGCAGTTCGTGATCGCATTGATACCAGCCGT','ACACTGGAAGCAGCAAAAAGCCGTCCGAGCCTGAAAGCAGCAGTTCCGCTGACCGGTTGGAATACCGATAAAACCTGGCCTGAACTGCGTACCCCGACCCTGGTTATT','CATAGCGAACCGTTTTATGAAAGCCTGCCTGCAGGTCTGGATAAAGCATATCTG','AGCGATACCACCATTGCAAAATATAGCATTGCCTGGCTGAAACGCTTTATCGATGATGATACCCGTTATGAACAGTTTCTGTGTCCGCTGCCTCGTCCGAGTCTGACCATTGAAGAATATCGTGGTAGCTGTCCGCTGGGTAGC'],
	['ATGGAAGCACTGGTTACACCGGAAGCAGATGTGACACCGGCAGCAACCGTTCGTGGTCATCGTCGTACCACCGCAACCGGTCGTAATCGTCTGTTTCGTGGTCGTACCGTTGCCGGTGCAGCACTGGCAGCAGCACTGACCGCAGGTAGCATTGCACTGGTTCCGAGCGCAGATGCAGCAACCAATCCGTTTGAACGTGGTCCGAGCCCGACCACCACCAGTATTGAAGCAACCCGTGGTAGCTTTGCAGTTAGCCAGACCAGCGTTAGCAGCCTGAGCGCAAGCGGTTTTGGTGGTGGCGATATCTATTATCCGACCAGCACCACCGCAGGCACCTTTGGTGCAGTTGCCATTGCACCGGGTTATACCGCACGTAAAAGCAGCATGGCA','GTTTTTAACATTGATACCCTGACCACCAGTGATCAGCCTGCAAGCCGTGGTCGTCAGCTGCTGGCAGCCCTGGATTATCTGACCCAGCGTAGCACCGTTCGTACCCGTATTGATAGCAGCCGT','ACCCTGGAAGCAGCAGATGATCGTCCGGCACTGCAGGCAGCAATTCCGCTGACCCCGTGGAATCTGACCAAACTGTGGCCTGGTGTTACCGTTCCGACCATGGTTATT','CATAGCGAACGTTTTTATAGCAGTCTGCCGAGCACCCTGAATAAAGCATATCTG','AGCAATACCACCATTGCCAAATATAGCATTGCGTGGCTGAAACGCTTTATCGATGATGATCTGCGTTATGATCAGTTTCTGTGTCCGGCTCCGCGTGTTAGCACCGCAATTAGCGAATATCGTGATACCTGTCCGCATAGC'],
	['ATGGCCAATCCGTATGAACGTGGTCCGAATCCGACCAATAGCAGCATTGAAGCACTGCGTGGTCCGTTTCGTGTTGATGAAGAACGTGTTAGCCGTCTGCAGGCACGTGGTTTTGGTGGTGGCACCATCTATTATCCGACCGATAATAACACCTTTGGTGCAGTTGCAATTAGTCCGGGTTATACCGGCACCCAGAGCAGCATTAGC','GTTATGACCATTGATACCAATACCACCCTGGATCAGCCGGATAGCCGTGCAAGCCAGCTGGATGCAGCACTGGATTATATGGTTGAAGATAGCAGCTATAGCGTGCGTAATCGTATTGATAGCAGCCGT','ACACTGCGTCTGGCCGAACGTCGTCCGGATCTGCAAGCAGCAATTCCGCTGACCCCGTGGCATACCGATAAAACCTGGGGTAGCGTTCGTGTTCCGACCCTGATTATT','CATAGCGAACCGTTTTATAACAGCCTGCCTGGTAGCCTGGATAAAGCATATCTG','AGTAATACCACCATTGCCAAATATAGCATCAGTTGGCTGAAACGCTTTGTGGATGATGATACCCGTTATACCCAGTTTCTGTGTCCGGGTCCGAGCACCGGTTGGGGTAGTGATGTTGAAGAATATCGTAGCACCTGTCCGTTT'],
    ['ATGAAACGTACCCTGAAACGTGCACTGAGCCTGCTGCCTGCAGCAGCCCTGGCAGCAAGCGCACTGGTTGCAGCAAGTCCGGCACAGGCAGCCGCAAATCCGTATCAGCGTGGTCCGAATCCGACCGAAGCAAGCATTACCGCAGCACGTGGTCCGTTTAATACCGCAGAAATCACCGTTAGCCGTCTGAGCGTTAGCGGTTTTGGTGGTGGTAAAATCTATTATCCGACCACCACAAGCGAAGGCACCTTTGGTGCAATTGCCATTAGTCCGGGTTTTACCGCATATTGGAGCAGCCTGGAA','GTTATTGGTATTGAAACCAATACCACCCTGGATCAGCCGGATCAACGTGGTCAGCAACTGCTGGCAGCACTGGATTATCTGACCCAGCGTAGCGCAGTTCGTGATCGTGTTGATGCAAGCCGT','AGCCTGGAAGCAGCAAAAGCACGTACCAGCCTGAAAGCCGCAATTCCGCTGGCACCGTGGAATCTGGATAAAACCTGGCCTGAAGTTCGTACCCCGACCCTGATTATT','CATAGCATTCCGTTTTATAACAGCCTGAGCAATGCACCGGAAAAAGCATATCTG','ACCAATACCCAGATGGCCAAATATATGATCGCATGGATGAAACGCTTTATCGATGATGATACCCGTTATACCCAGTTTCTGTGTCCGCCTCCGAGCACCGGTCTGCTGAGCGATTTTAGTGATGCACGTTTTACCTGTCCGATG']
];