function createStars() {
    const body = document.body;
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.backgroundColor = 'white';
        star.style.position = 'absolute';
        star.style.borderRadius = '50%';
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite`;
        body.appendChild(star);
    }
}

createStars();

const revealButton = document.querySelector('.reveal-button');

revealButton.addEventListener('touchstart', (event) => {
    event.preventDefault();
    handleRevealButtonClick();
}, { passive: false });

revealButton.addEventListener('click', handleRevealButtonClick);

function handleRevealButtonClick() {
    revealButton.style.opacity = 0;
    const stars = document.querySelectorAll('.star');

    document.body.style.transition = 'background-color 1s ease-in-out';
    document.body.style.backgroundColor = 'black';

    stars.forEach(star => {
        star.classList.add('star-moving');
        const delay = Math.random() * 1000;
        setTimeout(() => {
            star.style.left = '50vw';
            star.style.top = '50vh';
            star.style.transition = 'left 1s ease-in-out, top 1s ease-in-out, opacity 1s ease-in-out';

            setTimeout(() => {
                star.remove();
            }, 1000);
        }, delay);
    });

    setTimeout(() => {
        revealButton.remove();

        const shockwave = document.createElement('div');
        shockwave.className = 'shockwave';
        document.body.appendChild(shockwave);

        document.body.style.transition = 'background-color 1s ease-in-out';
        document.body.style.backgroundColor = '#410061';

        document.body.style.animation = 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both';

        setTimeout(() => {
            document.body.style.animation = '';
        }, 500);
    }, 2000);
}