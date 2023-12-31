#!/usr/bin/env node

let boss = {};

const BOSS_NAMES = ["Zorgon", "Joorian", "Zellephen", "Quvlix", "Massulune"];

function randInt() {
 return Math.round(Math.random() * 100);
};

function randBossName() {
  return Math.floor(Math.random() * BOSS_NAMES.length);
};

function newBoss() {
   boss = {
    name: BOSS_NAMES[randBossName()],
    level: 100,
    attack: randInt(),
    defence: randInt()
  }
  console.log(`
  A new Boss, ${boss.name}, has spawned!
   | ATK: ${boss.attack}
   | DEF: ${boss.defence}
   | LEVEL: ${boss.level}
  `)
};

async function main() {
  try {
    newBoss();
  } catch(error) {
    console.error(`Error occurred: ${error}`)
  }
}

export { main };

