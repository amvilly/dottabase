const SVG_URLS = {
    background: {
        floorPlan: 'https://raw.githubusercontent.com/amvilly/dottabase/main/assets/svg/background/floor%20plan.svg',
    },
    bubbles: {
        airOutMattress: 'https://raw.githubusercontent.com/amvilly/dottabase/main/assets/svg/bubbles/air%20out%20mattress.svg',
        countertopDeclutter: 'https://raw.githubusercontent.com/amvilly/dottabase/main/assets/svg/bubbles/countertop%20declutter.svg',
        fridgeDeclutter: 'https://raw.githubusercontent.com/amvilly/dottabase/main/assets/svg/bubbles/fridge%20declutter.svg',
        fuckItBucket: 'https://raw.githubusercontent.com/amvilly/dottabase/main/assets/svg/bubbles/fuck%20it%20bucket%20clean%20out.svg',
        laundryClothes: 'https://raw.githubusercontent.com/amvilly/dottabase/main/assets/svg/bubbles/laundry%20clothes.svg',
        laundryLinens: 'https://raw.githubusercontent.com/amvilly/dottabase/main/assets/svg/bubbles/laundry%20linens.svg',
        resetBulletin: 'https://raw.githubusercontent.com/amvilly/dottabase/main/assets/svg/bubbles/reset%20bulletin.svg',
        tidyBathroomSink: 'https://raw.githubusercontent.com/amvilly/dottabase/main/assets/svg/bubbles/tidy%20bathroom%20sink.svg',
        wipeDownStovetop: 'https://raw.githubusercontent.com/amvilly/dottabase/main/assets/svg/bubbles/wipe%20down%20stovetop.svg'
    },
    characters: {
        changeWater: 'https://raw.githubusercontent.com/amvilly/dottabase/main/assets/svg/characters/change%20water.svg',
        emptyDishwasher: 'https://raw.githubusercontent.com/amvilly/dottabase/main/assets/svg/characters/empty%20dishwasher.svg',
        pomegranateND: 'https://raw.githubusercontent.com/amvilly/dottabase/main/assets/svg/characters/pomegranate%20ND.svg',
        scoopCatLitter: 'https://raw.githubusercontent.com/amvilly/dottabase/main/assets/svg/characters/scoop%20cat%20litter.svg',
        seedlingDONE: 'https://raw.githubusercontent.com/amvilly/dottabase/main/assets/svg/characters/seedling%20DONE.svg',
        strawberryND: 'https://raw.githubusercontent.com/amvilly/dottabase/main/assets/svg/characters/strawberry%20ND.svg'
    }
};

const TASK_POSITIONS = {
    seedlingDONE: [
        { x: 783, y: 482 },  // change water
        { x: 164, y: 737 },  // empty dish
        { x: 713, y: 723 },  // scoop the poop
        { x: 1620, y: 487 }, // air out mattress/futon
        { x: 322, y: 887 }, // countertop
        { x: 976, y: 906 },  // fridge
        { x: 1077, y: 473 },  // fuck it bucket
        { x: 1267, y: 840 },  // laundry clothes
        { x: 1461, y: 781 },  // laundry linens
        { x: 1338, y: 429 }, // reset bulletin
        { x: 234, y: 487 },  // tidy bathroom sink
        { x: 534, y: 869 },  // wipe down stovetop
    ],
    strawberryND: [
        { x: 542, y: 916 }, // countertops
        { x: 1043, y: 523 },  // fuck it bucket
        { x: 1249, y: 817 },  // laundry clothes
        { x: 1620, y: 440 }, // air out mattress
    ],
    pomegranateND: [
        { x: 320, y: 919 },  // stovetop
        { x: 253, y: 505 },  // tidy bathroom sink
        { x: 1429, y: 810 },  // laundry linens
        { x: 1313, y: 423 },  // reset bulletin
        { x: 999, y: 914 }, // fridge declutter
    ],
    // cats with bubbles
    changeWater: { x: 691, y: 439 },
    emptyDishwasher: { x: 111, y: 770 },
    scoopCatLitter: { x: 614, y: 647 },
    // bubbles only
    airOutMattress: { x: 1568, y: 404 },
    countertopDeclutter: { x: 551, y: 875 },
    fridgeDeclutter: { x: 890, y: 862 },
    fuckItBucket: { x: 1046, y: 478 },
    laundryClothes: { x: 1238, y: 753 },
    laundryLinens: { x: 1313, y: 753 },
    resetBulletin: { x: 1227, y: 390 },
    tidyBathroomSink: { x: 263, y: 468 },
    wipeDownStovetop: { x: 325, y: 877 },
};

let draw;
let taskElements = {};

function init() {
    draw = SVG().addTo('#main-svg').size('100%', '100%');
    loadBackground();
    loadTaskIcons();
}

function loadBackground() {
    draw.image(SVG_URLS.background.floorPlan)
        .size('100%', '100%')
        .loaded(function(loader) {
            console.log('Background loaded successfully');
        })
        .error(function(error) {
            console.error('Error loading background:', error);
        });
}

function loadTaskIcons() {
    // Load multi-position characters
    ['seedlingDONE', 'strawberryND', 'pomegranateND'].forEach(character => {
        taskElements[character] = TASK_POSITIONS[character].map((pos, index) => {
            const group = draw.group().move(pos.x, pos.y);
            const image = group.image(SVG_URLS.characters[character], function(event) {
                this.size(50, 50);  // Adjust size as needed
            });
            image.hide(); // Hide all characters initially
            return { group, image };
        });
    });

    // Load single-position characters and speech bubbles
    Object.keys(TASK_POSITIONS).forEach(taskName => {
        if (Array.isArray(TASK_POSITIONS[taskName])) return; // Skip multi-position characters

        const pos = TASK_POSITIONS[taskName];
        const group = draw.group().move(pos.x, pos.y);
        
        // Load character (for cats)
        let character;
        if (['changeWater', 'emptyDishwasher', 'scoopCatLitter'].includes(taskName)) {
            character = group.image(SVG_URLS.characters[taskName], function(event) {
                this.size(50, 50).hide();  // Adjust size as needed
            });
        }

        // Load speech bubble
        const speechBubble = group.image(SVG_URLS.bubbles[taskName], function(event) {
            this.size(100, 50).hide();  // Adjust size as needed
        });

        taskElements[taskName] = { group, character, speechBubble };
    });
}

function getTaskIcon(taskName) {
    // Map task names to their corresponding icons
    const iconMap = {
        'changeWater': 'changeWater',
        'emptyDishwasher': 'emptyDishwasher',
        'scoopCatLitter': 'scoopCatLitter',
        // Add more mappings as needed
    };
    return iconMap[taskName] || 'seedling';
}

function updateTaskStatus(taskName, status) {
    const task = taskElements[taskName];
    if (!task) return;

    if (Array.isArray(task)) {
        // Handle multi-position characters (seedling, strawberry, pomegranate)
        task.forEach((t, index) => {
            if (status === 'done' && taskName === 'seedlingDONE') {
                t.image.show();
            } else if (status === 'needsDoing' && (taskName === 'strawberryND' || taskName === 'pomegranateND')) {
                t.image.show();
            } else {
                t.image.hide();
            }
        });
    } else {
        // Handle single-position characters (cats) and speech bubbles
        if (status === 'done') {
            if (task.character) task.character.hide();
            task.speechBubble.hide();
            // Show seedling at this position
            const seedlingIndex = getSeedlingIndex(taskName);
            if (seedlingIndex !== -1) {
                taskElements.seedlingDONE[seedlingIndex].image.show();
            }
        } else {
            if (task.character) task.character.show();
            task.speechBubble.show();
            // Hide seedling at this position
            const seedlingIndex = getSeedlingIndex(taskName);
            if (seedlingIndex !== -1) {
                taskElements.seedlingDONE[seedlingIndex].image.hide();
            }
        }
    }
}

function getSeedlingIndex(taskName) {
    const seedlingOrder = [
        'changeWater', 'emptyDishwasher', 'scoopCatLitter', 'airOutMattress', 
        'countertopDeclutter', 'fridgeDeclutter', 'fuckItBucket', 'laundryClothes', 
        'laundryLinens', 'resetBulletin', 'tidyBathroomSink', 'wipeDownStovetop'
    ];
    return seedlingOrder.indexOf(taskName);
}

// Call init when the page loads
window.addEventListener('load', init);

// Example usage:
// updateTaskStatus('strawberry', 'needsDoing', 2);
// updateTaskStatus('changeWater', 'needsDoing');
// updateTaskStatus('emptyDishwasher', 'done', 4);