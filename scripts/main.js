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
        pomegranateND: 'https://raw.githubusercontent.com/amvilly/dottabase/main/assets/svg/characters/Pomegranate%20ND.svg',
        scoopCatLitter: 'https://raw.githubusercontent.com/amvilly/dottabase/main/assets/svg/characters/scoop%20cat%20litter.svg',
        seedlingDONE: 'https://raw.githubusercontent.com/amvilly/dottabase/main/assets/svg/characters/Seedling%20DONE.svg',
        strawberryND: 'https://raw.githubusercontent.com/amvilly/dottabase/main/assets/svg/characters/Strawberry%20ND.svg'
    }
};

const TASK_POSITIONS = {
    // ... (keep your existing TASK_POSITIONS object here)
};

let draw;
let taskElements = {};

async function init() {
    draw = SVG().addTo('#main-svg').size('100%', '100%');
    loadBackground();
    loadTaskIcons();
    
    const notionData = await fetchNotionData();
    if (notionData) {
        applyNotionData(notionData);
    }
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
    // ... (keep your existing loadTaskIcons function here)
}

async function fetchNotionData() {
    try {
      const response = await fetch('/api/notion');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Notion data:', error);
      return null;
    }
  }

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
                t.image.show();
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