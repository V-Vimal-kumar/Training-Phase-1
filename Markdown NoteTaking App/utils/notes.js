import fs from 'fs/promises';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { marked } from 'marked';

const notesDir = path.resolve('notes');

await fs.mkdir(notesDir, { recursive: true });

export async function createNote() {
  const { title, content } = await inquirer.prompt([
    { name: 'title', message: 'Note title:' },
    { name: 'content', message: 'Note content (Markdown supported):' },
  ]);

  const filename = path.join(notesDir, `${title}.md`);
  await fs.writeFile(filename, content);
  console.log(chalk.green('Note created.'));
}

export async function listNotes() {
  const files = await fs.readdir(notesDir);
  console.log(chalk.blue('Your notes:'));
  files.forEach(f => console.log('- ' + f.replace('.md', '')));
}

export async function viewNote() {
  const { title } = await inquirer.prompt({
    name: 'title',
    message: 'Enter the note title to view:',
  });

  const filePath = path.join(notesDir, `${title}.md`);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    console.log(chalk.yellowBright.bold(title));
    console.log(marked.parse(content));
  } catch {
    console.log(chalk.red('Note not found.'));
  }
}

export async function editNote() {
  const { title } = await inquirer.prompt({ name: 'title', message: 'Note title to edit:' });
  const filePath = path.join(notesDir, `${title}.md`);

  try {
    const oldContent = await fs.readFile(filePath, 'utf-8');
    const { newContent } = await inquirer.prompt({ name: 'newContent', message: 'Edit content:', default: oldContent });
    await fs.writeFile(filePath, newContent);
    console.log(chalk.green('Note updated.'));
  } catch {
    console.log(chalk.red('Note not found.'));
  }
}

export async function deleteNote() {
  const { title } = await inquirer.prompt({ name: 'title', message: 'Note title to delete:' });
  const filePath = path.join(notesDir, `${title}.md`);

  try {
    await fs.unlink(filePath);
    console.log(chalk.red('Note deleted.'));
  } catch {
    console.log(chalk.red('Note not found.'));
  }
}

export async function searchNotes() {
  const { query } = await inquirer.prompt({ name: 'query', message: 'Search keyword:' });
  const files = await fs.readdir(notesDir);

  for (const file of files) {
    const content = await fs.readFile(path.join(notesDir, file), 'utf-8');
    if (content.toLowerCase().includes(query.toLowerCase())) {
      console.log(chalk.green(`Found in ${file.replace('.md', '')}`));
    }
  }
}
