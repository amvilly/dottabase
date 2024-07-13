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
    airOutMattress: { x: 1500, y: 380 },
    countertopDeclutter: { x: 551, y: 875 },
    fridgeDeclutter: { x: 890, y: 862 },
    fuckItBucket: { x: 1046, y: 478 },
    laundryClothes: { x: 1238, y: 753 },
    laundryLinens: { x: 1313, y: 753 },
    resetBulletin: { x: 1227, y: 377 },
    tidyBathroomSink: { x: 263, y: 468 },
    wipeDownStovetop: { x: 325, y: 877 },
};

let draw;
let taskElements = {};

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
        const notionData = await fetchNotionData();
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
    // First, create a purple background
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
        strawberryND: { width: 64, height: 77 }, // Adjust these values as needed
        pomegranateND: { width: 68, height: 77 }, // Adjust these values as needed
        changeWater: { width: 199, height: 159 },
        emptyDishwasher: { width: 197, height: 120 },
        scoopCatLitter: { width: 353, height: 191 }
    };

    // First, load all speech bubbles
    Object.keys(TASK_POSITIONS).forEach(taskName => {
        if (Array.isArray(TASK_POSITIONS[taskName])) return; // Skip multi-position characters

        const pos = TASK_POSITIONS[taskName];
        const speechBubble = draw.image(SVG_URLS.bubbles[taskName])
            .size(200, 65)
            .move(pos.x, pos.y);
        console.log(`${taskName} speech bubble loaded at x: ${pos.x}, y: ${pos.y}`);
        
        if (!taskElements[taskName]) {
            taskElements[taskName] = {};
        }
        taskElements[taskName].speechBubble = speechBubble;
    });

    // Then, load cat characters
    ['changeWater', 'emptyDishwasher', 'scoopCatLitter'].forEach(taskName => {
        const pos = TASK_POSITIONS[taskName];
        const size = characterSizes[taskName];
        const character = draw.image(SVG_URLS.characters[taskName])
            .size(size.width, size.height)
            .move(pos.x, pos.y);
        console.log(`${taskName} character loaded at x: ${pos.x}, y: ${pos.y}`);
        
        taskElements[taskName].character = character;
    });

    // Load multi-position characters (fruits and seedlings)
    ['seedlingDONE', 'strawberryND', 'pomegranateND'].forEach(character => {
        console.log(`Loading ${character}...`);
        taskElements[character] = TASK_POSITIONS[character].map((pos, index) => {
            const size = characterSizes[character];
            const image = draw.image(SVG_URLS.characters[character])
                .size(size.width, size.height)
                .move(pos.x, pos.y);
            console.log(`${character} loaded at position ${index}, x: ${pos.x}, y: ${pos.y}`);
            
            if (character === 'seedlingDONE') {
                image.hide();
            } else {
                image.show().forward(); // Move fruits to the front
            }
            
            return { image };
        });
    });

    // Move 'laundry clothes' speech bubble to the front
    if (taskElements['laundryClothes'] && taskElements['laundryClothes'].speechBubble) {
        taskElements['laundryClothes'].speechBubble.forward();
    }

    console.log('All task icons loaded');
}

async function fetchNotionData() {
    console.log('Fetching Notion data...');
    try {
      const response = await fetch('/api/notion', {
        method: 'GET',
        headers: {
          'Notion-Version': '2022-06-28'
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching Notion data:', error);
      return null;
    }
  }
  
  window.addEventListener('load', () => {
    fetchNotionData().then(data => {
      if (data) {
        // Process the fetched data
      }
    });
  });
      
      window.addEventListener('load', () => {
        fetchNotionData().then(data => {
          if (data) {
            // Process the fetched data
          }
        });
      });

function applyNotionData(data) {
    data.forEach(item => {
        const status = item['red-green'] === 'done' ? 'done' : 'needsDoing';
        updateTaskStatus(item.name, status);
    });
}

function updateTaskStatus(taskName, status) {
    const task = taskElements[taskName];
    if (!task) return;

    if (Array.isArray(task)) {
        // Handle multi-position characters (seedlingDONE, strawberryND, pomegranateND)
        task.forEach((t, index) => {
            if (status === 'done') {
                t.image.hide();
                taskElements.seedlingDONE[index].image.show();
            } else {
                if (taskName !== 'seedlingDONE') {
                    t.image.show();
                }
                taskElements.seedlingDONE[index].image.hide();
            }
        });
    } else {
        // Handle single-position characters (cats) and speech bubbles
        if (status === 'done') {
            if (task.character) task.character.hide();
            task.speechBubble.hide();
            const seedlingIndex = getSeedlingIndex(taskName);
            if (seedlingIndex !== -1) {
                taskElements.seedlingDONE[seedlingIndex].image.show();
            }
        } else {
            if (task.character) task.character.show();
            task.speechBubble.show();
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

window.addEventListener('load', init);
