const container = document.querySelector('.container');
const containerWidth = container.offsetWidth;
const containerHeight = container.offsetHeight;
const containerRadius = Math.min(containerWidth, containerHeight) / 2;

let intervalIDs = [];
let lastParticleID = 0;

const startThinking = () => {

    // Remove the last particle from the DOM
    if (lastParticleID !== 0) {
        const lastParticle = document.querySelector(`#particle-${lastParticleID}`);
        lastParticle.remove();
    }

    // Rotate the container
    container.style.animation = 'rotate 100s linear infinite';

    for (let i = 1; i <= 500; i++) {
        const div = document.createElement('div');
        div.classList.add('particle');
        div.id = `particle-${i}`;
        container.appendChild(div);
        let count = 0;

        // Assign each particle a random initial angle
        let angle = Math.random() * 2 * Math.PI;

        // Randomly set the initial position for each particle within the container
        const randomAngle = Math.random() * 360;
        const randomDistance = Math.random() * containerRadius * 0.1;
        const x = containerWidth / 2;
        const y = containerHeight / 2;
        div.style.transform = `translate(${x}px, ${y}px)`;
        div.style.transition = 'transform 3s ease-out'; // Add CSS transition

        // Update particle position at regular intervals
        const moveParticleInterval = setInterval(() => {
            // Increase the angle and count to move the particle in a clockwise manner
            angle += 0.01;
            count++;

            const randomAngle = Math.random(angle) * 360;
            const randomDistance = Math.random() * containerRadius;
            const newX = (Math.cos(randomAngle) * containerRadius + containerWidth / 2);
            const newY = (Math.sin(randomAngle) * containerRadius + containerHeight / 2);

            // Check if the new position exceeds the container radius
            const distanceFromCenter = Math.sqrt((newX - containerWidth / 2) ** 2 + (newY - containerHeight / 2) ** 2);
            if (count === 1) {
                div.style.transform = `translate(${newX}px, ${newY}px)`;
            }
            else {
                if (distanceFromCenter <= containerRadius) {
                    div.style.transform = `translate(${newX}px, ${newY}px)`;
                }
            }
        }, 1200); // Adjust the interval duration as needed

        intervalIDs.push(moveParticleInterval);
    }
}

const stopThinking = () => {
    intervalIDs.forEach(id => clearInterval(id));
    intervalIDs = [];

    // Make all particles disappear slowly except the any random one which will be in the center
    const particles = document.querySelectorAll('.particle');
    const randomIndex = Math.floor(Math.random() * particles.length);
    lastParticleID = randomIndex;
    particles.forEach((particle, index) => {
        if (index !== randomIndex) {
            particle.style.opacity = 0;

            // Remove the particle from the DOM after it disappears
            setTimeout(() => {
                particle.remove();
            }, 3000);
        }
    });

    // Stop container from rotating
    container.style.animation = 'none';

    // Make the random particle in the center grow in size
    particles[randomIndex].style.transform = 'translate(200px, 200px)';
    particles[randomIndex].style.transition = 'transform 0s ease-out';
    // Grow it with some animation
    particles[randomIndex].style.transition = 'height 1s ease-out, width 1s ease-out';
    particles[randomIndex].style.width = '100px';
    particles[randomIndex].style.height = '100px';

    // Add startThingking() to the click event listener
    document.removeEventListener('click', stopThinking);
    document.addEventListener('click', startThinking);
}

// Start thinking animation when the page loads
startThinking();

// Stop thinking animation when the page is clicked
document.addEventListener('click', stopThinking);
