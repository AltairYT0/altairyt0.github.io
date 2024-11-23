function createStars() {
    const body = document.body;
    for (let i = 0; i < 213; i++) {
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

    document.body.style.transition = 'background-color 1.5s ease-in-out';
    document.body.style.backgroundColor = 'black';

    stars.forEach(star => {
        star.classList.add('star-moving');
        const delay = Math.random() * 1000;
        setTimeout(() => {
            star.style.left = '50vw';
            star.style.top = '50vh';
            star.style.transition = 'left 1s ease-in-out, top 1s ease-in-out, opacity 1s ease-in-out, transform 1s ease-in-out';
            star.style.transform = 'scale(0.1)';

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

        document.body.style.transition = 'background-color 1.5s ease-in-out';
        document.body.style.backgroundColor = '#410061';

        document.body.style.animation = 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both';
        
        const animatedBox = document.createElement('div');
        animatedBox.className = 'animated-box';
        document.body.appendChild(animatedBox);

        setTimeout(() => {
            document.body.style.animation = '';
            animatedBox.classList.add('animate');

            setTimeout(() => {
                fetchAndDisplayProfile(animatedBox);
            }, 1500);
        }, 500);
    }, 2000);

    revealButton.disabled = true;


}

function fetchAndDisplayProfile(container) {
    fetch("https://api.github.com/users/AltairYT0")
        .then(response => response.json())
        .then(data => {
            const profileImage = document.createElement('img');
            profileImage.src = data.avatar_url;
            profileImage.alt = `${data.login}'s profile image`;

            const nameElement = document.createElement('div');
            nameElement.className = 'profile-name';
            nameElement.textContent = data.login;

            container.appendChild(profileImage);
            container.appendChild(nameElement);

            const age = new Date().getFullYear() - 2006;
            const aboutMeText = `Hi there! I'm AltairYT0. I’m an ${age}-year-old coding enthusiast with a passion for technology. My primary programming language is Java, but I enjoy experimenting with other languages to expand my skills. Outside of coding, I’m a big fan of a good kebab. When I’m not deep into programming, you’ll likely find me immersed in horror movies and games, enjoying the thrill and suspense they bring. 😊`;

            const aboutMeElement = document.createElement('div');
            aboutMeElement.className = 'profile-about';
            aboutMeElement.textContent = aboutMeText;

            container.appendChild(aboutMeElement);
        })
        .catch(error => console.error('Error fetching profile:', error));
}