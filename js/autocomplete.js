/**
 * autocomplete.js
 *
 * Computer Science 50
 *
 * Autocomplete common locations.
 */

// set autocomplete function
$(function() { 

// declare array of common locations to be autocompleted
var house = [
"Adams House",
"Agassiz House",
"Apley Court",
"Baker Hall",
"Boylston Hall",
"Cabot House",
"Canaday Hall",
"CGIS South",
"Claverly Hall",
"Current Location",
"Currier House",
"Divinity Hall",
"Dunster House",
"Eliot House",
"Emerson Hall",
"Grays Hall",
"Greenough Hall",
"Hoffman Laboratory",
"Hollis Hall",
"Holworthy Hall",
"Holyoke Center Health Services",
"Holyoke Center, Garage",
"Holyoke Center, Shops",
"Hurlbut Hall",
"Kirkland House",
"Knafel Building (CGIS North)",
"Lamont Library",
"Leverett House",
"Lionel Hall",
"Littauer Center",
"Loeb Drama Center",
"Lowell House",
"Lowell Lecture Hall",
"Malkin Athletic Center",
"Massachusetts Hall",
"Mather House",
"Matthews Hall",
"Maxwell-Dworkin",
"Memorial Hall (Annenberg)",
"Mower Hall",
"Murr Building",
"Newell Boat House",
"Northwest Labs",
"Office of Admissions and Financial Aid",
"Pennypacker Hall",
"Pforzheimer House",
"Quadrangle Athletic Facility",
"Quincy House",
"Science Center",
"Sever Hall",
"Stadium",
"Stoughton Hall",
"Straus Hall",
"Thayer Hall",
"Tozzer Library",
"University Hall",
"University Museum",
"Vanderbilt Hall",
"Vanserg Building",
"Weld Boat House",
"Weld Hall",
"Wigglesworth Hall",
"Widener Library",
"Winthrop House",
"Yenching Library",  ];

    // autocomplete for search
    $("#search").autocomplete({
        source: house
    });
                
    // autocomplete for start 
    $("#start").autocomplete({
        source: house
    });
    
    // autocomplete for end
    $("#end").autocomplete({
        source: house
    });   
}); 
