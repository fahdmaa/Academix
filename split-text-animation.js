// Split Text Animation - Word by Word
function splitText(element) {
  const text = element.textContent.trim();
  const words = text.split(' ');
  element.innerHTML = '';
  element.classList.add('split-text');

  let charIndex = 0;
  words.forEach((word, wordIndex) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'word';

    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = char;
      span.style.animationDelay = `${charIndex * 0.03}s`;
      wordSpan.appendChild(span);
      charIndex++;
    }

    element.appendChild(wordSpan);

    // Add space between words (except after last word)
    if (wordIndex < words.length - 1) {
      const space = document.createTextNode(' ');
      element.appendChild(space);
      charIndex++; // Increment for space
    }
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    splitText(heroTitle);
  }
});
