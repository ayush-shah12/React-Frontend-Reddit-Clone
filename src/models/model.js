

export default class Model {
    constructor() {
        this.data = {
            communities: [ //array of community objects
                {// community object 1
                    communityID: 'community1',
                    name: 'Am I the Jerk?',
                    description: 'A practical application of the principles of justice.',
                    postIDs: ['p1', 'p3'],
                    startDate: new Date('August 10, 2014 04:18:00'),
                    members: ['rollo', 'shemp', 'catlady13', 'astyanax', 'trucknutz69'],
                    memberCount: 5,
                },
                { // community object 2
                    communityID: 'community2',
                    name: 'The History Channel',
                    description: 'A fantastical reimagining of our past and present.',
                    postIDs: ['p2'],
                    startDate: new Date('May 4, 2017 08:32:00'),
                    members: ['MarcoArelius', 'astyanax', 'outtheretruth47', 'bigfeet'],
                    memberCount: 4,
                }
            ],
            linkFlairs: [ // array of link flair objects
                { // link flair 1
                    linkFlairID: 'lf1',
                    content: 'The jerkstore called...', 
                },
                { //link flair 2
                    linkFlairID: 'lf2',
                    content: 'Literal Saint',
                },
                { //link flair 3
                    linkFlairID: 'lf3',
                    content: 'The walk among us',
                },
                { //link flair 4
                    linkFlairID: 'lf4',
                    content: 'Worse than Hitler',
                },
            ],
            posts: [ // array of post objects
                { // post 1
                    postID: 'p1',
                    title: 'AITJ: I parked my cybertruck in the handicapped spot to protect it from bitter, jealous losers.',
                    content: 'Recently I went to the store in my brand new Tesla cybertruck. I know there are lots of haters out there, so I wanted to make sure my truck was protected. So I parked it so it overlapped with two of those extra-wide handicapped spots.  When I came out of the store with my beef jerky some Karen in a wheelchair was screaming at me.  So tell me prhreddit, was I the jerk?',
                    linkFlairID: 'lf1',
                    postedBy: 'trucknutz69',
                    postedDate: new Date('August 23, 2024 01:19:00'),
                    commentIDs: ['comment1', 'comment2'],
                    views: 14,
                },
                { // post 2
                    postID: 'p2',
                    title: "Remember when this was a HISTORY channel?",
                    content: 'Does anyone else remember when they used to show actual historical content on this channel and not just an endless stream of alien encounters, conspiracy theories, and cryptozoology? I do.\n\nBut, I am pretty sure I was abducted last night just as described in that show from last week, "Finding the Alien Within".  Just thought I\'d let you all know.',
                    linkFlairID: 'lf3',
                    postedBy: 'MarcoArelius',
                    postedDate: new Date('September 9, 2024 14:24:00'),
                    commentIDs: ['comment4', 'comment5'],
                    views: 1023,
                },
            ],
            comments: [ //array of comment objects
                { // comment 1
                    commentID: 'comment1',
                    content: 'There is no higher calling than the protection of Tesla products.  God bless you sir and God bless Elon Musk. Oh, NTJ.',
                    commentIDs: ['comment3'],
                    commentedBy: 'shemp',
                    commentedDate: new Date('August 23, 2024 08:22:00'),
                },
                { // comment 2
                    commentID: 'comment2',
                    content: 'Obvious rage bait, but if not, then you are absolutely the jerk in this situation. Please delete your Tron vehicle and leave is in peace.  YTJ.',
                    commentIDs: [],
                    commentedBy: 'astyanax',
                    commentedDate: new Date('August 23, 2024 10:57:00'),
                },
                { // comment 3
                    commentID: 'comment3',
                    content: 'My brother in Christ, are you ok? Also, YTJ.',
                    commentIDs: [],
                    commentedBy: 'rollo',
                    commentedDate: new Date('August 23, 2024 09:31:00'),
                },
                { // comment 4
                    commentID: 'comment4',
                    content: 'The truth is out there.',
                    commentIDs: ['comment6'],
                    commentedBy: "astyanax",
                    commentedDate: new Date('September 10, 2024 6:41:00'),
                },
                { // comment 5
                    commentID: 'comment5',
                    content: 'The same thing happened to me. I guest this channel does still show real history.',
                    commentIDs: [],
                    commentedBy: 'bigfeet',
                    commentedDate: new Date('September 09, 2024 017:03:00'),
                },
                { // comment 6
                    commentID: 'comment6',
                    content: 'I want to believe.',
                    commentIDs: ['comment7'],
                    commentedBy: 'outtheretruth47',
                    commentedDate: new Date('September 10, 2024 07:18:00'),
                },
                { // comment 7
                    commentID: 'comment7',
                    content: 'Generic poster slogan #42',
                    commentIDs: [],
                    commentedBy: 'bigfeet',
                    commentedDate: new Date('September 10, 2024 09:43:00'),
                },
            ],
        }; //end this.data object
    } // end constructor()
} // end Model
