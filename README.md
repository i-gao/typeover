# typeover

```
import Typeover from "typeover";

const App = () => (
     <Typeover text="the quick brown fox jumps over the lazy dog" />
)
```

This is a React component that produces a text box that takes in solution text and validates user input against the solution text. Users can type into the box so long as their text loosely anagrams with the upcoming solution word. If users make an error, they are unable to type more unless they correct their mistake. The solution text can be shown as a prompt in the textbox or hidden.

Example applications: 

* a memory app in which users have to learn text by typing over the text and recall by typing with validation
* an extension that blocks users from entering a site until they have correctly typed a custom message to remind them to be conscious of their time on the site.

NPM: [page](https://www.npmjs.com/package/typeover)

# Parameters

* {string} text, required arg
* {boolean} holdOnError force user to retype if mistake, default false
* {boolean} hint if false, does not show base text, default true
* {function} onError callback function for an error
* {function} onComplete callback function for complete
* {string} id ids
* {string} className classes
* {object} styles styles for the #typeover-wrapper div
