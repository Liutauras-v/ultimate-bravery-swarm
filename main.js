class Weapon {

    constructor(name, evolve, mainWeapon) {
        this.name = name;
        this.evolve = evolve;
        this.mainWeapon = mainWeapon;
    }
}

class Passive {

    constructor(name) {
        this.name = name
    }
}

class Champion {

    constructor(name, weapon) {
        this.name = name;
        this.weapon = weapon;
    }
}

const weaponList = [
    new Weapon("Ani-Mines", "Area_Size", false),
    new Weapon("Anti-Shark_Sea_Mine", "Damage", false),
    new Weapon("Battle_Bunny_Crossbow", "Critical_Chance", false),
    new Weapon("Blade-o-rang", "Move_Speed", false),
    new Weapon("Bunny_Mega-Blast", "Critical_Chance", false),
    new Weapon("Cyclonic_Slicers", "Health_Regen", false),
    new Weapon("Echoing_Batblades", "Projectile_Count", false),
    new Weapon("Final_City_Transit", "Damage", false),
    new Weapon("Gatling_Bunny-Guns", "Duration", false),
    new Weapon("Iceblast_Armor", "Armor", false),
    new Weapon("Lioness_Lament", "Ability_Haste", false),
    new Weapon("Paw_Print_Poisoner", "Move_Speed", false),
    new Weapon("Radiant_Field", "Max_Health", false),
    new Weapon("Searing_Shortbow", "Area_Size", false),
    new Weapon("Statikk_Sword", "Max_Health", false),
    new Weapon("T.I.B.B.E.R.S", "Duration", false),
    new Weapon("The_Annihilator", "EXP", false),
    new Weapon("UwU_Blaster", "Ability_Haste", false),
    new Weapon("Vortex_Glove", "Health_Regen", false),
    new Weapon("YuumiBot", "Pickup_Radius", false),
    new Weapon("Meow_Meow", "Ability_Haste", true),
    new Weapon("Sound_Wave", "Projectile_Count", true),
    new Weapon("Shield_Slam", "Armor", true),
    new Weapon("Tentacle_Slam", "Duration", true),
    new Weapon("Pillory_Swipe", "Max_Health", true),
    new Weapon("Steel_Tempest", "Critical_Chance", true),
    new Weapon("Bunny_Hop", "Move_Speed", true),
    new Weapon("Guiding_Hex", "EXP", true),
    new Weapon("Winged_Dagger", "Pickup_Radius", true)
];

const passiveList = [
    new Passive("Ability_Haste"),
    new Passive("Area_Size"),
    new Passive("Armor"),
    new Passive("Critical_Chance"),
    new Passive("Damage"),
    new Passive("Duration"),
    new Passive("EXP"),
    new Passive("Health_Regen"),
    new Passive("Max_Health"),
    new Passive("Move_Speed"),
    new Passive("Pickup_Radius"),
    new Passive("Projectile_Count")
];

const championList = [
    new Champion("Jinx", "Meow_Meow"),
    new Champion("Seraphine", "Sound_Wave"),
    new Champion("Leona", "Shield_Slam"),
    new Champion("Illaoi", "Tentacle_Slam"),
    new Champion("Briar", "Pillory_Swipe"),
    new Champion("Yasuo", "Steel_Tempest"),
    new Champion("Riven", "Bunny_Hop"),
    new Champion("Aurora", "Guiding_Hex"),
    new Champion("Xayah", "Winged_Dagger")
];

var hardMode = false;


function renderChamps() {
    var div = document.querySelector("#champSelection");
    var html = "";

    championList.forEach(champion => {
        html += `<div class="champImg" lolData="${champion.name}" style="background-image:url('/imgs/champs/${champion.name}.png')" onclick="renderItems('${champion.name}')"></div>`;
    });

    html += `<div class="champImg" lolData="Random" style="background-image:url('/imgs/champs/Random.png')" onclick="renderItemsRandom()"></div>`;

    div.innerHTML = html;
}

renderChamps();

function toggleHardMode() {
    var btn = document.querySelector("#btnHardMode");

    hardMode = !hardMode;

    if (hardMode) {
        btn.value = "Hard mode";
    }
    else {
        btn.value = "Normal mode";
    }
}

function renderItemsRandom() {
    renderItems(championList[Math.floor(Math.random() * championList.length)].name);
}

function getMainWeapon(champion) {
    return championList.find(champ => champ.name == champion).weapon;
}

function getWeaponPassive(weapon) {
    return weaponList.find(wpn => wpn.name == weapon).evolve;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getItems(champion) {

    var inventory = { weapons: [], passives: [] }

    var mainWpn = getMainWeapon(champion);
    var mainWpnPassive = getWeaponPassive(mainWpn)

    var newWeaponList = weaponList;
    var newPassiveList = passiveList;

    inventory.weapons.push(mainWpn)
    newWeaponList = newWeaponList.filter(wpn => wpn.mainWeapon == false);

    if (!hardMode) {
        inventory.passives.push(mainWpnPassive)
        newPassiveList = newPassiveList.filter(passive => passive.name != mainWpnPassive);
    }

    newWeaponList = shuffleArray(newWeaponList);
    newPassiveList = shuffleArray(newPassiveList);

    for (let i = 0; i < 4; i++) {
        inventory.weapons.push(newWeaponList[i].name);

        if (!hardMode && newPassiveList.some(passive => passive.name == newWeaponList[i].evolve)) {
            inventory.passives.push(newWeaponList[i].evolve);
            newPassiveList = newPassiveList.filter(passive => passive.name != newWeaponList[i].evolve)
        }
    }

    var missingPassiveCount = (6 - inventory.passives.length);

    for (let i = 0; i < missingPassiveCount; i++) {
        inventory.passives.push(newPassiveList[i].name);
    }

    return inventory
}

function renderItems(champion) {

    var items = getItems(champion);

    var html = `<h3>${champion}:</h3>`;
    var div = document.querySelector("#build");

    html += "<div class='items'>";
    items.weapons.forEach(wpn => {
        html += `<div class="item" style="background-image:url('/imgs/weapons/${wpn}.webp')"></div>`
    });
    html += "</div>";

    html += "<div class='passives'>";
    items.passives.forEach(passive => {
        html += `<div class="passive" style="background-image:url('/imgs/passives/${passive}.webp')"></div>`
    });
    html += "</div>";

    div.innerHTML = html;
}
