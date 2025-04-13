import inquirer from 'inquirer';
import * as notes from './utils/notes.js';

async function main() {
  const { action } = await inquirer.prompt({
    name: 'action',
    type: 'list',
    message: 'What do you want to do?',
    choices: ['Create', 'List', 'View', 'Edit', 'Delete', 'Search', 'Exit'],
  });

  switch (action) {
    case 'Create':
      await notes.createNote();
      break;
    case 'List':
      await notes.listNotes();
      break;
    case 'View':
      await notes.viewNote();
      break;
    case 'Edit':
      await notes.editNote();
      break;
    case 'Delete':
      await notes.deleteNote();
      break;
    case 'Search':
      await notes.searchNotes();
      break;
    case 'Exit':
      console.log('Goodbye!');
      process.exit();
  }

  main(); 
}

main();
