
let apiQuotes = [];
const spinner = document.getElementById('spinner');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const twitterBtn = document.getElementById('twitter');
const quoteContainer = document.getElementById('quote-container');


const loading = () => {
    quoteContainer.hidden = true;
    spinner.hidden = false;
}

const complete = () => {
    quoteContainer.hidden = false;
    spinner.hidden = true;
}

// Show New Quote
function newQuote() {
    let quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    quoteText.textContent = quote.text;
    authorText.textContent = quote.author ? quote.author : 'Unknown';

    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
}

// Get quotes From API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
    } catch (error) {
        console.error(`Error : ${error}`);
    }
    complete();
}

// Load all Quotes
await getQuotes();

// Set the initial quote
newQuote();

// New Quote - On click event 
newQuoteBtn.addEventListener('click', newQuote);

// Twitter share - On click event
twitterBtn.addEventListener('click', () => console.log('share'));