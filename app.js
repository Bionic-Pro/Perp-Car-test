// List of phase 1 questions and options
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

// Current state
let answers = {};
let currentPhase = 0;

// Utility
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
    }
    // Note: Phase 2 and 3 can be similarly added if extended
}

// Build phase 1 UI
function buildPhase1() {
    const container = document.getElementById('phase1Container');
    container.innerHTML = '';
    phase1Questions.forEach(q => {
        container.appendChild(createSelectInput(q));
    });
}

document.getElementById('startButton').addEventListener('click', () => {
    currentPhase = 1;
    showPhase(currentPhase);
});

document.getElementById('phase1Next').addEventListener('click', () => {
    const container = document.getElementById('phase1Container');
    phase1Questions.forEach(q => {
        answers[q.id] = container.querySelector(`#${q.id}`).value;
    });
    alert('Answers recorded: ' + JSON.stringify(answers, null, 2));
    // Advance or proceed to phase 2 as needed
});

// Initial display
showPhase(0);
