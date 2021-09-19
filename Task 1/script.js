/*
Task 1

After navigating to https://godsunchained.com/
if copied and pasted into the Chrome Console,
this script will traverse the DOM in Breadth First Search fashion, 
where at each node it will identify child nodes with duplicate tags,
and print each duplicate child out,
ordered alphabetically by the HTML text content of the node.
*/

function CompareStrings(s, t) {
    /*
    Returns true if s is alphabetically "less than / before" t. Returns false otherwise.
    */
    for (let i = 0 ; i < s.length && i < t.length ; i++) {
        if (i < s.length && i < t.length) {
            if (s[i].toLowerCase() > t[i].toLowerCase()) {
                return true;
            }
        }
        if (i >= s.length) {
            return true;
        } 
        else {
            return false;
        }
        
    }
    return true;
}


function SortArray(arr) {
    /*
    Sorts an array of DOM Nodes based on the alphabetical ordering of their textContent
    */
    for (i = 0 ; i < arr.length ; i++) {
        for (j = i+1 ; j < arr.length ; j++) {
            if (CompareStrings(arr[i].textContent, arr[j].textContent)) {
                //swap the strings in the array
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
            else {
            }
        }
    }
}

function IsElementNode(node) {
    /*
    Checks if a node is an HTML element or simply text / whitespace in the html document
    */
    return (node.nodeType == Node.ELEMENT_NODE);
}

function VisitNode(node) {
    /*
    Iterates through all children of a DOM tree node (html element)
    Counts occurences of each unique tag name
    Prints to console all which occur more than once along with helpful debug text including sub headings with number of occurences
    */

    //Map to count number of each unique kind of element
    let counts = {};
    //Array to hold each unique tag name (need array instead of hashset to be able to sort alphabetically later)
    let duplicated = [];
    let duplicatedd = []

    childnodes = node.children;
    for (childnode of childnodes) {
        let name = childnode.nodeName;
        
        if (!counts[name]) {
            //Add to the map if not already in
            counts[name] = 1
        }
        else {
            //Else increment its count in map
            counts[name] += 1;
            //And add it to the array of duplicate children if not already in 
            if (!duplicated.includes(name)) {
                duplicated.push(name);
                duplicatedd.push(childnode);
            }
        }

    }
    count = 1;

    
    if (duplicated.length > 0 ) {

        console.log("Duplicate children of " + node.nodeName + " in alphabetical order:");
        //For each of the duplicated children of the node, print a title line with their name and number of occurences
        //And then print each of the duplicate children ordered alphabetically by text content of html element
        for (duplicate of duplicated) {
            console.log("Duplicate child #" + count + ": " + duplicate + " | Occurences: "  + counts[duplicate]);
            
            let cur = [];
            //Actually print each of the child nodes
            for (childNode of childnodes) {
                if (childNode.nodeName == duplicate) {
                    cur.push(childNode);
                }
            }

            SortArray(cur);

            for (childNode of cur) {
                console.log(childNode);
            }
            count++;
        }
    }
}


function BFS(elem) {
    newchildnodes = elem.childNodes;
    for (childnode of newchildnodes) {
        if (IsElementNode(childnode)) {
            VisitNode(childnode);
        }
        
    }

    childnodes = newchildnodes;
    newchildnodes = [];
    for (childnode of childnodes) {
        BFS(childnode);
    }

}

console.log("BFS:")

BFS(document.body);

/*

Superfluous to requirements - already had a BFS implementation but implemented DFS also 
//
function DFS(elem) {
    if (IsElementNode(elem)) {
        childnodes = elem.childNodes;
        for (childnode of childnodes) {
            DFS(childnode);
        }
        VisitNode(elem);
    }
}

Redundant version: sorts array of strings. Updated version sorts DOM nodes by textContent
//
function SortArray(arr) {
    
    console.log("sorting " + arr.length);
    arr.push("aa");
    arr.push("AA");
    arr.push("e");
    //arr.sort();
    for (i = 0 ; i < arr.length ; i++) {
        for (j = i+1 ; j < arr.length ; j++) {
            if (CompareStrings(arr[i], arr[j])) {
                //swap the strings in the array
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
            else {
            }
        }
    }
}


*/

