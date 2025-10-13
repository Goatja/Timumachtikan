
document.addEventListener('DOMContentLoaded', async () => {
    // --- DATA LOADING ---
    const loadData = async () => {
        try {
            const [dictionaryRes, lessonsRes] = await Promise.all([
                fetch('data/dictionary.json'),
                fetch('data/lessons.json')
            ]);
            const dictionary = await dictionaryRes.json();
            const lessons = await lessonsRes.json();
            return { dictionary, lessons };
        } catch (error) {
            console.error("Error loading data:", error);
            return { dictionary: [], lessons: [] };
        }
    };

    const { dictionary, lessons } = await loadData();

    // --- INITIALIZATION ---
    initFooter();
    initScrollToTop();
    if (document.querySelector('#diccionario')) initDictionary(dictionary);
    if (document.querySelector('#lecciones')) initLessons(lessons);
    if (document.querySelector('#juegos')) initJuegos(dictionary, lessons);
});

// --- COMPONENT INITIALIZERS ---

const initFooter = () => {
    const footer = document.querySelector('#footer');
    if (footer) {
        footer.innerHTML = `
            <div class="mx-auto max-w-screen-xl text-center">
                <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="index.html" class="hover:underline">Timumachtikan Nawat™</a>. All Rights Reserved.</span>
                <br>
                <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">Desarrollado por <a href="https://github.com/Goatja" class="hover:underline">Jorge Galdamez</a>.</span>
                <br>
                <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">Inspirado y con datos de la iniciativa <a href="https://www.timumachtikan.com/" target="_blank" rel="noopener noreferrer" class="hover:underline">Timumachtikan Nawat</a>.</span>
            </div>
        `;
    }
};

const initDictionary = (dictionary) => {
    const dictionarySection = document.querySelector('#diccionario');
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Escribe una palabra para buscar...';
    searchInput.className = 'w-full max-w-lg mx-auto block p-4 mb-4 border border-gray-300 rounded-lg text-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white';
    
    const dictionaryContainer = document.createElement('div');
    dictionaryContainer.id = 'dictionary-container';
    dictionaryContainer.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4';

    dictionarySection.insertBefore(searchInput, dictionarySection.firstChild.nextSibling);
    dictionarySection.appendChild(dictionaryContainer);

    const renderDictionary = (filter = '') => {
        dictionaryContainer.innerHTML = '';
        if (filter.length < 2) {
            dictionaryContainer.innerHTML = '<p class="text-gray-500 dark:text-gray-400 text-center">Escribe al menos 2 letras para buscar.</p>';
            return;
        }

        const lowercasedFilter = filter.toLowerCase();
        const filteredDictionary = dictionary.filter(word => 
            word.nahuat.toLowerCase().includes(lowercasedFilter) || 
            word.spanish.toLowerCase().includes(lowercasedFilter)
        );

        if (filteredDictionary.length === 0) {
            dictionaryContainer.innerHTML = '<p class="text-gray-500 dark:text-gray-400 text-center">No se encontraron palabras.</p>';
            return;
        }

        filteredDictionary.forEach(word => {
            const card = document.createElement('div');
            card.className = 'p-4 bg-white rounded-lg shadow-md dark:bg-gray-800';
            card.innerHTML = `
                <h3 class="text-lg font-bold text-gray-900 dark:text-white">${word.nahuat}</h3>
                <p class="text-gray-600 dark:text-gray-400">${word.spanish}</p>
            `;
            dictionaryContainer.appendChild(card);
        });
    };

    searchInput.addEventListener('input', (e) => {
        renderDictionary(e.target.value);
    });

    dictionaryContainer.innerHTML = '<p class="text-gray-500 dark:text-gray-400 text-center">Escribe al menos 2 letras para buscar.</p>';
};





const initLessons = (lessons) => {
    const lessonsSection = document.querySelector('#lecciones');
    if (!lessonsSection) return;

    const levels = ['Básico', 'Intermedio', 'Avanzado'];

    levels.forEach(level => {
        const lessonsForLevel = lessons.filter(lesson => lesson.level === level);
        if (lessonsForLevel.length > 0) {
            const levelHeader = document.createElement('h2');
            levelHeader.className = 'text-3xl font-bold text-gray-900 dark:text-white mb-4 mt-8';
            levelHeader.textContent = level;
            lessonsSection.appendChild(levelHeader);

            const accordionItems = [];
            const accordionWrapper = document.createElement('div'); // Wrapper for this level's accordion

            lessonsForLevel.forEach((lesson, index) => {
                const lessonId = `lesson-${level.replace(/\s+/g, '-')}-${index}`;
                const headerId = `header-${level.replace(/\s+/g, '-')}-${index}`;

                // The trigger element
                const header = document.createElement('h2');
                header.id = headerId;
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-orange-200 dark:focus:ring-orange-800 dark:border-gray-700 dark:text-gray-400 hover:bg-orange-100 dark:hover:bg-gray-800';
                button.innerHTML = `<span>${lesson.title}</span><svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/></svg>`;
                header.appendChild(button);

                // The content element
                const body = document.createElement('div');
                body.id = lessonId;
                body.className = 'hidden';
                body.setAttribute('aria-labelledby', headerId);
                const content = document.createElement('div');
                content.className = 'p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900';
                content.innerHTML = `<p class="mb-2 text-gray-500 dark:text-gray-400">${lesson.content}</p><ul class="list-disc pl-5 text-gray-500 dark:text-gray-400">${lesson.vocabulary.map(item => `<li><strong>${item.nahuat}:</strong> ${item.spanish}</li>`).join('')}</ul>`;
                body.appendChild(content);

                accordionWrapper.appendChild(header);
                accordionWrapper.appendChild(body);

                accordionItems.push({
                    id: lessonId,
                    triggerEl: button,
                    targetEl: body,
                    active: false
                });
            });

            lessonsSection.appendChild(accordionWrapper);

            if (typeof Accordion !== 'undefined') {
                new Accordion(accordionWrapper, accordionItems);
            } else {
                console.warn('Flowbite Accordion component not found.');
            }
        }
    });
};


const initJuegos = (dictionary, lessons) => {
    // --- Memorama Game ---
    const initMemoramaGame = () => {
        const gameBoard = document.querySelector('#game-board-memorama');
        const scoreElement = document.querySelector('#score-memorama');
        const restartButton = document.querySelector('#restart-memorama');

        let gameVocabulary = [...dictionary].sort(() => 0.5 - Math.random()).slice(0, 8);
        let cards = [];
        let flippedCards = [];
        let score = 0;
        let lockBoard = false;

        function createGameBoard() {
            gameBoard.innerHTML = '';
            score = 0;
            scoreElement.textContent = score;
            cards = [];
            flippedCards = [];
            gameVocabulary = [...dictionary].sort(() => 0.5 - Math.random()).slice(0, 8);

            let cardValues = [];
            gameVocabulary.forEach(item => {
                cardValues.push({ type: 'nahuat', value: item.nahuat, pair: item.spanish });
                cardValues.push({ type: 'spanish', value: item.spanish, pair: item.nahuat });
            });

            cardValues.sort(() => Math.random() - 0.5);

            cardValues.forEach(item => {
                const cardElement = document.createElement('div');
                cardElement.className = 'game-card';
                cardElement.dataset.value = item.value;
                cardElement.dataset.pair = item.pair;

                const cardInner = document.createElement('div');
                cardInner.className = 'game-card-inner';
                const cardFront = document.createElement('div');
                cardFront.className = 'game-card-front';
                const cardBack = document.createElement('div');
                cardBack.className = 'game-card-back';
                cardBack.textContent = item.value;

                cardInner.appendChild(cardFront);
                cardInner.appendChild(cardBack);
                cardElement.appendChild(cardInner);
                gameBoard.appendChild(cardElement);

                cardElement.addEventListener('click', () => flipCard(cardElement));
                cards.push(cardElement);
            });
        }

        function flipCard(card) {
            if (lockBoard || card.classList.contains('flipped') || flippedCards.length >= 2) return;
            card.classList.add('flipped');
            flippedCards.push(card);
            if (flippedCards.length === 2) checkForMatch();
        }

        function checkForMatch() {
            lockBoard = true;
            const [card1, card2] = flippedCards;
            if (card1.dataset.pair === card2.dataset.value && card2.dataset.pair === card1.dataset.value) {
                score++;
                scoreElement.textContent = score;
                disableCards();
            } else {
                unflipCards();
            }
        }

        function disableCards() {
            flippedCards.forEach(card => card.removeEventListener('click', () => flipCard(card)));
            resetBoard();
        }

        function unflipCards() {
            setTimeout(() => {
                flippedCards.forEach(card => card.classList.remove('flipped'));
                resetBoard();
            }, 1000);
        }

        function resetBoard() {
            [flippedCards, lockBoard] = [[], false];
        }

        restartButton.addEventListener('click', createGameBoard);
        createGameBoard();
    };

    // --- Quiz Game ---
    const initQuizGame = () => {
        const container = document.querySelector('#quiz-container');
        let score = 0;

        const generateQuestion = () => {
            container.innerHTML = '';
            const questionWord = dictionary[Math.floor(Math.random() * dictionary.length)];
            let options = [questionWord];

            while (options.length < 4) {
                const randomWord = dictionary[Math.floor(Math.random() * dictionary.length)];
                if (!options.some(opt => opt.nahuat === randomWord.nahuat)) {
                    options.push(randomWord);
                }
            }

            options.sort(() => Math.random() - 0.5);

            const questionEl = document.createElement('p');
            questionEl.className = 'text-2xl font-bold text-gray-900 dark:text-white mb-4';
            questionEl.textContent = `¿Cuál es la traducción de "${questionWord.nahuat}"?`;
            container.appendChild(questionEl);

            const optionsGrid = document.createElement('div');
            optionsGrid.className = 'grid grid-cols-2 gap-4';

            options.forEach(option => {
                const button = document.createElement('button');
                button.className = 'p-4 bg-white rounded-lg shadow-md dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600';
                button.textContent = option.spanish;
                button.onclick = () => {
                    if (option.nahuat === questionWord.nahuat) {
                        button.classList.add('bg-green-500', 'dark:bg-green-500');
                        score++;
                    } else {
                        button.classList.add('bg-red-500', 'dark:bg-red-500');
                    }
                    setTimeout(generateQuestion, 1000);
                };
                optionsGrid.appendChild(button);
            });
            container.appendChild(optionsGrid);
        };
        generateQuestion();
    };

    // --- Word Scramble Game ---
    const initScrambleGame = () => {
        const container = document.querySelector('#scramble-container');
        let currentWord = null;

        const generateScramble = () => {
            container.innerHTML = '';
            currentWord = dictionary[Math.floor(Math.random() * dictionary.length)];
            if (!currentWord || currentWord.nahuat.length < 3) { // Ensure word is scramble-able
                generateScramble();
                return;
            }

            let scrambled = currentWord.nahuat.split('').sort(() => Math.random() - 0.5).join('');
            if (scrambled === currentWord.nahuat) { // Avoid already correct scrambles
                generateScramble();
                return;
            }

            const hintEl = document.createElement('p');
            hintEl.className = 'text-lg text-gray-600 dark:text-gray-400 mb-2';
            hintEl.textContent = `Pista (Español): ${currentWord.spanish}`;

            const scrambleEl = document.createElement('p');
            scrambleEl.className = 'text-3xl font-bold tracking-widest text-gray-900 dark:text-white mb-4';
            scrambleEl.textContent = scrambled;

            const inputEl = document.createElement('input');
            inputEl.type = 'text';
            inputEl.className = 'w-full max-w-xs mx-auto block p-2 mb-4 border border-gray-300 rounded-lg dark:bg-gray-700';
            
            const button = document.createElement('button');
            button.textContent = 'Revisar';
            button.className = 'px-4 py-2 bg-primary-700 text-white rounded-lg hover:bg-primary-800';

            const feedbackEl = document.createElement('p');
            feedbackEl.className = 'mt-4 text-lg';

            button.onclick = () => {
                if (inputEl.value.toLowerCase() === currentWord.nahuat.toLowerCase()) {
                    feedbackEl.textContent = '¡Correcto!';
                    feedbackEl.className = 'mt-4 text-lg text-green-500';
                    setTimeout(generateScramble, 1500);
                } else {
                    feedbackEl.textContent = 'Inténtalo de nuevo.';
                    feedbackEl.className = 'mt-4 text-lg text-red-500';
                }
            };

            container.append(hintEl, scrambleEl, inputEl, button, feedbackEl);
        };

        generateScramble();
    };

    // --- Fill in the Blank Game ---
    const initFillBlankGame = () => {
        const container = document.querySelector('#fill-blank-container');
        const sentences = lessons
            .flatMap(l => l.vocabulary)
            .filter(v => v.nahuat.includes(' ')); // Get phrases

        const generateFillBlank = () => {
            container.innerHTML = '';
            if (sentences.length === 0) {
                container.innerHTML = '<p>No hay frases disponibles para este juego.</p>';
                return;
            }

            const phrase = sentences[Math.floor(Math.random() * sentences.length)];
            const words = phrase.nahuat.split(' ');
            const blankIndex = Math.floor(Math.random() * words.length);
            const blankWord = words[blankIndex];

            words[blankIndex] = '______';
            const sentenceWithBlank = words.join(' ');

            const sentenceEl = document.createElement('p');
            sentenceEl.className = 'text-2xl text-gray-900 dark:text-white mb-4';
            sentenceEl.textContent = sentenceWithBlank;

            const hintEl = document.createElement('p');
            hintEl.className = 'text-lg text-gray-600 dark:text-gray-400 mb-2';
            hintEl.textContent = `Traducción: ${phrase.spanish}`;

            const inputEl = document.createElement('input');
            inputEl.type = 'text';
            inputEl.className = 'w-full max-w-xs mx-auto block p-2 mb-4 border border-gray-300 rounded-lg dark:bg-gray-700';

            const button = document.createElement('button');
            button.textContent = 'Revisar';
            button.className = 'px-4 py-2 bg-primary-700 text-white rounded-lg hover:bg-primary-800';

            const feedbackEl = document.createElement('p');
            feedbackEl.className = 'mt-4 text-lg';

            button.onclick = () => {
                if (inputEl.value.toLowerCase().trim() === blankWord.toLowerCase().replace(/[?]/g, '')) {
                    feedbackEl.textContent = '¡Correcto!';
                    feedbackEl.className = 'mt-4 text-lg text-green-500';
                    setTimeout(generateFillBlank, 1500);
                } else {
                    feedbackEl.textContent = 'Inténtalo de nuevo.';
                    feedbackEl.className = 'mt-4 text-lg text-red-500';
                }
            };

            container.append(sentenceEl, hintEl, inputEl, button, feedbackEl);
        };

        generateFillBlank();
    };

    // Initialize all games
    initMemoramaGame();
    initQuizGame();
    initScrambleGame();
    initFillBlankGame();
};

const initScrollToTop = () => {
    const toTopButton = document.querySelector('#to-top-button');

    if (!toTopButton) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            toTopButton.classList.remove('opacity-0', 'pointer-events-none');
            toTopButton.classList.add('opacity-100');
        } else {
            toTopButton.classList.add('opacity-0', 'pointer-events-none');
            toTopButton.classList.remove('opacity-100');
        }
    });
};
