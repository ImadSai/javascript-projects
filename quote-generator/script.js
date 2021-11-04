
let apiQuotes = [];
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const twitterBtn = document.getElementById('twitter');

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
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
    } catch (error) {
        console.error(`Error : ${error}`);
    }
}

// Load all Quotes
await getQuotes();

// Set the initial quote
newQuote();

// New Quote - On click event 
newQuoteBtn.addEventListener('click', newQuote);

// Twitter share - On click event
twitterBtn.addEventListener('click', () => console.log('share'));