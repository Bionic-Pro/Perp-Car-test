const phase1Questions = [
    {
        id: 'age',
        question: 'Select your age group:',
        type: 'select',
        options: [
            'Youth (<25)',
            'Young Adult (25-34)',
            'Mid-life (35-54)',
            'Pre-retiree (55-64)',
            'Senior (65+)'
        ]
    },
    {
        id: 'gender',
        question: 'Select your gender:',
        type: 'select',
        options: [
            'Male',
            'Female',
            'Non-binary',
            'Prefer not to say'
        ]
    },
    {
        id: 'location',
        question: 'Where do you primarily drive?',
        type: 'select',
        options: [
            'Urban city',
            'Suburban',
            'Rural countryside',
            'Coastal area',
            'Mountain region',
        ]
    },
    {
        id: 'driving_experience',
        question: 'Driving experience:',
        type: 'select',
        options: [
            'Newbie (<2 years)',
            'Intermediate (2-10 years)',
            'Seasoned (10+ years)',
            'Expert (advanced skills)'
        ]
    },
    {
        id: 'budget',
        question: 'Your budget range:',
        type: 'select',
        options: [
            'Under $10k (older used)',
            '$10k-$20k (mid-range used)',
            '$20k-$30k (recent used or certified pre-owned)',
            '$30k-$50k (new entry-level)',
            '$50k+ (premium new)'
        ]
    },
    {
        id: 'fuel_type',
        question: 'Preferred fuel/powertrain type:',
        type: 'select',
        options: [
            'Petrol (standard)',
            'Petrol (premium)',
            'Diesel',
            'Full hybrid (self-charging)',
            'Mild hybrid',
            'Plug-in hybrid (PHEV)',
            'Full electric (BEV)',
            'Extended-range electric',
            'GPL/LPG',
            'Biofuels',
            'Hydrogen fuel cell',
            'Flex-fuel (multi-type compatible)'
        ]
    }
];

// Simple example car database 
const carDatabase = [
    {
        make: "Toyota",
        model: "Corolla",
        fuel: "Full hybrid (self-charging)",
        priceRange: "$20k-$30k (recent used or certified pre-owned)",
        description: "Reliable, efficient full hybrid sedan."
    },
    {
        make: "Honda",
        model: "Civic",
        fuel: "Petrol (standard)",
        priceRange: "$20k-$30k (recent used or certified pre-owned)",
        description: "Compact sedan with sporty feel."
    },
    {
        make: "Tesla",
        model: "Model 3",
        fuel: "Full electric (BEV)",
        priceRange: "$30k-$50k (new entry-level)",
        description: "Cutting-edge electric vehicle."
    },
    {
        make: "Ford",
        model: "Escape",
        fuel: "Mild hybrid",
        priceRange: "$20k-$30k (recent used or certified pre-owned)",
        description: "Versatile mild hybrid SUV."
    },
    {
        make: "Volkswagen",
        model: "Golf",
        fuel: "Petrol (premium)",
        priceRange: "$20k-$30k (recent used or certified pre-owned)",
        description: "Fun-to-drive compact hatchback."
    }
];

// State storage
let answers = {};
let currentPhase = 0;

// Utility functions
function createSelectInput(question) {
    const container = document.createElement('div');
    const label = document.createElement('label');
    label.textContent = question.question;
    label.htmlFor = question.id;
    container.appendChild(label);

    const select = document.createElement('select');
    select.id = question.id;

    question.options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt;
        option.textContent = opt;
        select.appendChild(option);
    });

    container.appendChild(select);
    return container;
}

function showPhase(phaseIndex) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

    if (phaseIndex === 0) {
        document.getElementById('welcome').classList.add('active');
    } else if (phaseIndex === 1) {
        document.getElementById('phase1').classList.add('active');
        buildPhase1();
    } else if (phaseIndex === 2) {
        document.getElementById('phase2').classList.add('active');
        buildPhase2();
    }
    currentPhase = phaseIndex;
}

// Build UI for phase 1 questions
function buildPhase1() {
    const container = document.getElementById('phase1Container');
    container.innerHTML = '';
    phase1Questions.forEach(q => {
        container.appendChild(createSelectInput(q));
    });
}

// Build UI for phase 2 recommendation list based on answers
function buildPhase2() {
    const container = document.getElementById('phase2Container');
    container.innerHTML = '';

    // Example: Simple filter to show cars matching budget and fuel preference
    const filteredCars = carDatabase.filter(car => 
        car.priceRange === answers.budget &&
        car.fuel === answers.fuel_type);

    if (filteredCars.length === 0) {
        container.textContent = 'No cars match your preferences exactly. Try adjusting your selections.';
        return;
    }

    filteredCars.forEach(car => {
        const card = document.createElement('div');
        card.className = 'car-card';

        const title = document.createElement('h3');
        title.textContent = `${car.make} ${car.model}`;
        card.appendChild(title);

        const desc = document.createElement('p');
        desc.textContent = car.description;
        card.appendChild(desc);

        container.appendChild(card);
    });

    // Add a restart button
    const restartBtn = document.createElement('button');
    restartBtn.textContent = 'Start Over';
    restartBtn.addEventListener('click', () => {
        answers = {};
        showPhase(1);
    });
    container.appendChild(restartBtn);
}

// Event Listeners
document.getElementById('startButton').addEventListener('click', () => {
    showPhase(1);
});

document.getElementById('phase1Next').addEventListener('click', () => {
    const container = document.getElementById('phase1Container');
    phase1Questions.forEach(q => {
        answers[q.id] = container.querySelector(`#${q.id}`).value;
    });
    showPhase(2);
});

// Initialize app
showPhase(0);
