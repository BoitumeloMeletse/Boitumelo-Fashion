// Shopping List functionality
var ul = document.getElementById("ul_pr");

function add(id) {
  var li_new = document.createElement("li");
  var li_inp = document.createTextNode(id);
  li_new.appendChild(li_inp);
  ul.appendChild(li_new);
  ul.appendChild(document.createElement("br"));
}

window.emptyList = function () {
  var ul = document.querySelector('#ul_pr');
  var listLength = ul.children.length;

  for (let i = 0; i < listLength; i++) {
    ul.removeChild(ul.children[0]);
  }
};

// Fashion Quotes API Integration
const quoteText = document.getElementById('fashion-quote');
const quoteAuthor = document.getElementById('quote-author');
const refreshBtn = document.getElementById('refresh-quote');

async function fetchFashionQuote() {
  try {
    const response = await fetch('https://api.api-ninjas.com/v1/quotes?category=fashion', {
      headers: {
        'X-Api-Key': 'pub_aaf28fe170654f08b47d2e1fec4d8449'
      }
    });

    if (!response.ok) throw new Error('Could not fetch quote');

    const data = await response.json();
    const quote = data[0];

    quoteText.textContent = `"${quote.quote}"`;
    quoteAuthor.textContent = `– ${quote.author}`;
  } catch (error) {
    quoteText.textContent = 'Sorry! Could not load a quote.';
    quoteAuthor.textContent = '';
    console.error(error);
  }
}

// Load initial quote on page load
fetchFashionQuote();

// Refresh quote on button click
refreshBtn.addEventListener('click', fetchFashionQuote);