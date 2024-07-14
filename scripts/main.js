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
    changeWater: [
        { x: 691, y: 439, type: 'characters', name: 'changeWater' }, 
        { x: 783, y: 482, type: 'seedlingDONE', index: 0}
    ],
    emptyDishwasher: [
        { x: 111, y: 770, type: 'characters', name: 'emptyDishwasher' }, 
        { x: 164, y: 737, type: 'seedlingDONE', index: 1}
    ],
    scoopCatLitter: [
        { x: 614, y: 647, type: 'characters', name: 'scoopCatLitter' }, 
        { x: 713, y: 723, type: 'seedlingDONE', index: 2}
    ],
    airOutMattress: [
        { x: 1500, y: 380, type: 'bubbles', name: 'airOutMattress' },
        { x: 1620, y: 440, type: 'strawberryND', index: 0 },
        { x: 1620, y: 487, type: 'seedlingDONE', index: 3}
    ],
    fuckItBucket: [
        { x: 1046, y: 478, type: 'bubbles', name: 'fuckItBucket' },
        { x: 1043, y: 523, type: 'strawberryND', index: 1 },
        { x: 1077, y: 473, type: 'seedlingDONE', index: 4}
    ],
    laundryLinens: [
        { x: 1313, y: 753, type: 'bubbles', name: 'laundryLinens' },
        { x: 1429, y: 810, type: 'pomegranateND', index: 0 },
        { x: 1461, y: 781, type: 'seedlingDONE', index: 5}
    ],
    wipeDownStovetop: [
        { x: 551, y: 875, type: 'bubbles', name: 'wipeDownStovetop' },
        { x: 542, y: 916, type: 'strawberryND', index: 2 },
        { x: 534, y: 869, type: 'seedlingDONE', index: 6}
    ],
    countertopDeclutter: [
        { x: 325, y: 877, type: 'bubbles', name: 'countertopDeclutter' },
        { x: 320, y: 919, type: 'pomegranateND', index: 1 },
        { x: 322, y: 887, type: 'seedlingDONE', index: 7}
    ],
    fridgeDeclutter: [
        { x: 890, y: 862, type: 'bubbles', name: 'fridgeDeclutter' },
        { x: 999, y: 914, type: 'pomegranateND', index: 2 },
        { x: 976, y: 906, type: 'seedlingDONE', index: 8}
    ],
    laundryClothes: [
        { x: 1238, y: 753, type: 'bubbles', name: 'laundryClothes' },
        { x: 1249, y: 817, type: 'strawberryND', index: 3 },
        { x: 1267, y: 840, type: 'seedlingDONE', index: 9}
    ],
    resetBulletin: [
        { x: 1227, y: 377, type: 'bubbles', name: 'resetBulletin' },
        { x: 1313, y: 423, type: 'pomegranateND', index: 3 },
        { x: 1338, y: 429, type: 'seedlingDONE', index: 10}
    ],
    tidyBathroomSink: [
        { x: 263, y: 468, type: 'bubbles', name: 'tidyBathroomSink' },
        { x: 253, y: 505, type: 'pomegranateND', index: 4 },
        { x: 234, y: 487, type: 'seedlingDONE', index: 11}
    ]
};


let draw;
let taskElements = {};

// Define helper functions here
function updateTaskStatus(taskName, status) {
    const taskPositions = TASK_POSITIONS[taskName];
    if (!taskPositions) {
        console.log(`Task positions not found for task name: ${taskName}`);
        return;
    }

    taskPositions.forEach(pos => {
        if (pos.type === 'bubbles') {
            const element = taskElements[taskName].speechBubble;
            if (status === 'done') {
                element.hide();
                console.log(`Hiding speech bubble for ${taskName}`);
            } else {
                element.show();
                console.log(`Showing speech bubble for ${taskName}`);
            }
        } else if (pos.type === 'characters') {
            const element = taskElements[taskName].character;
            if (status === 'done') {
                element.hide();
                console.log(`Hiding character for ${taskName}`);
            } else {
                element.show();
                console.log(`Showing character for ${taskName}`);
            }
        } else if (pos.type === 'seedlingDONE') {
            const element = taskElements['seedlingDONE'][pos.index];
            if (status === 'done') {
                element.image.show();
                console.log(`Showing seedling at index ${pos.index} for task ${taskName}`);
            } else {
                element.image.hide();
                console.log(`Hiding seedling at index ${pos.index} for task ${taskName}`);
            }
        } else {
            const element = taskElements[pos.type][pos.index];
            if (status === 'done') {
                element.image.hide();
                console.log(`Hiding ${pos.type} image at index ${pos.index} for task ${taskName}`);
            } else {
                element.image.show();
                console.log(`Showing ${pos.type} image at index ${pos.index} for task ${taskName}`);
            }
        }
    });
}


function applyNotionData(data) {
    data.forEach(item => {
        const status = item.redGreen === 'done' ? 'done' : 'needsDoing';
        console.log(`Applying status for ${item.name}: ${status}`);
        updateTaskStatus(item.name, status);
    });
}

async function fetchData() {
    try {
        const response = await fetch('/api/notion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Parsing the JSON response
        console.log('Fetched data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Define core functions here
async function init() {
    console.log('Initializing...');
    try {
        draw = SVG().addTo('#main-svg').size(1920, 1080);
        console.log('SVG canvas created');

        loadBackground();
        console.log('Background loaded');

        loadTaskIcons();
        console.log('Task icons loaded');

        console.log('Setting default task statuses...');
        // Set all tasks to "needsDoing" by default
        Object.keys(TASK_POSITIONS).forEach(taskName => {
            if (taskName !== 'seedlingDONE') {
                updateTaskStatus(taskName, 'needsDoing');
            }
        });

        console.log('Fetching Notion data...');
        // Fetch the actual data
        const notionData = await fetchData();
        if (notionData) {
            console.log('Applying Notion data...');
            applyNotionData(notionData);
        } else {
            console.log('No Notion data received');
        }
        console.log('Initialization complete');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
}

function loadBackground() {
    console.log('Loading background...');
    draw.rect(1920, 1080).fill('#63699A');  // Adjust the color as needed

    // Then, load the floor plan
    draw.image(SVG_URLS.background.floorPlan)
        .size(1561, 922)
        .move((1920 - 1561) / 2, (1080 - 922) / 2)  // Center the floor plan
        .on('load', function() {
            console.log('Floor plan loaded successfully');
        })
        .on('error', function(error) {
            console.error('Error loading floor plan:', error);
        });
}

function loadTaskIcons() {
    console.log('Loading task icons...');

    const characterSizes = {
        seedlingDONE: { width: 66, height: 82 },
        strawberryND: { width: 64, height: 77 },
        pomegranateND: { width: 68, height: 77 },
        changeWater: { width: 199, height: 159 },
        emptyDishwasher: { width: 197, height: 120 },
        scoopCatLitter: { width: 353, height: 191 }
    };

    Object.keys(TASK_POSITIONS).forEach(taskName => {
        const positions = TASK_POSITIONS[taskName];
        positions.forEach(pos => {
            if (pos.type === 'bubbles') {
                const speechBubble = draw.image(SVG_URLS.bubbles[pos.name])
                    .size(200, 65)
                    .move(pos.x, pos.y);
                console.log(`${pos.name} speech bubble loaded at x: ${pos.x}, y: ${pos.y}`);

                if (!taskElements[taskName]) {
                    taskElements[taskName] = {};
                }
                taskElements[taskName].speechBubble = speechBubble;
            } else if (pos.type === 'characters') {
                const size = characterSizes[pos.name];
                const character = draw.image(SVG_URLS.characters[pos.name])
                    .size(size.width, size.height)
                    .move(pos.x, pos.y);
                console.log(`${pos.name} character loaded at x: ${pos.x}, y: ${pos.y}`);

                if (!taskElements[taskName]) {
                    taskElements[taskName] = {};
                }
                taskElements[taskName].character = character;
            } else {
                const size = characterSizes[pos.type];
                const image = draw.image(SVG_URLS.characters[pos.type])
                    .size(size.width, size.height)
                    .move(pos.x, pos.y);
                console.log(`${pos.type} image loaded at position ${pos.index}, x: ${pos.x}, y: ${pos.y}`);

                if (!taskElements[pos.type]) {
                    taskElements[pos.type] = [];
                }
                taskElements[pos.type][pos.index] = { image: image };

                if (pos.type === 'seedlingDONE') {
                    image.hide();
                } else {
                    image.show().forward();
                }
            }
        });
    });

    console.log('All task icons loaded');
}

// Add event listener at the end
window.addEventListener('load', init);