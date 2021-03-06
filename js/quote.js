// QUOTE
const quote = document.getElementById('quote'),
      quoteAuthor = document.getElementById('quote-author'),
      nextQuote = document.getElementById('next-quote');
      // quoteTitle = document.getElementById('quote-title');

const showQuote = () => {
  fetch('./assets/data/quotes.json')
    .then(res => res.json())
    .then(data => {
      const randQuote = +getRandomNumber(1, data.quotes.length)
      const currentQuote = data.quotes[randQuote]
      quote.innerHTML = currentQuote.quote;
      quoteAuthor.innerHTML = currentQuote.author;
    })
    .catch(err => {
      quote.innerHTML = `Good day!`;
    })
}

nextQuote.addEventListener('click', showQuote);
showQuote();