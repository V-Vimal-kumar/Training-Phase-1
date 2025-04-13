const { readTasks, writeTasks } = require('./utils');
const [,, command, ...args] = process.argv;

const getDate = () => new Date().toISOString().split('T')[0];

const run = async () => {
  let tasks = await readTasks();

  switch (command) {
    case 'add': {
      const [title, description] = args;
      if (!title || !description) {
        return console.log('Usage: node index.js add "Title" "Description"');
      }
      const newTask = {
        id: Date.now(),
        title,
        description,
        status: 'pending',
        dueDate: getDate()
      };
      tasks.push(newTask);
      await writeTasks(tasks);
      console.log('✅ Task added.');
      break;
    }

    case 'list': {
      const status = args[0];
      const filtered = status ? tasks.filter(t => t.status === status) : tasks;
      if (!filtered.length) return console.log('No tasks found.');
      filtered.forEach(({ id, title, status, dueDate }) => {
        console.log(`${id} | ${title} | ${status} | Due: ${dueDate}`);
      });
      break;
    }

    case 'update': {
      const [id, field, value] = args;
      const task = tasks.find(t => t.id == id);
      if (!task) return console.log('❌ Task not found.');
      if (['title', 'description', 'status', 'dueDate'].includes(field)) {
        task[field] = value;
        await writeTasks(tasks);
        console.log(`✅ Task ${id} updated.`);
      } else {
        console.log('❌ Invalid field. Use title, description, status, or dueDate.');
      }
      break;
    }

    case 'delete': {
      const [id] = args;
      const filtered = tasks.filter(t => t.id != id);
      if (filtered.length === tasks.length) return console.log('❌ Task not found.');
      await writeTasks(filtered);
      console.log(`🗑️ Task ${id} deleted.`);
      break;
    }

    default:
      console.log(`
Available commands:
- add "title" "description"
- list [status]
- update <id> <field> <new_value>
- delete <id>
      `);
  }
};

run();


// const { readTasks, writeTasks } = require('./utils');
// const [, , command, ...args] = process.argv;

// const getDate = () => new Date().toISOString().split('T')[0];

// const run = async () => {
//     let tasks = await readTasks();

//     switch (command) {
//         case 'add': {
//             const [title, description] = args;
//             if (!title || !description) {
//                 console.log('title or description is missing!');
//             }
//             const newTask = {
//                 id: Date.now(),
//                 title,
//                 description,
//                 status: 'pending',
//                 dueDate: getDate()
//             };
//             tasks.push(newTask);
//             await writeTasks(tasks);
//             console.log('TASK ADDED!');
//             break;
//         }

//         case 'list': {
//             const status = args[0];
//             const filtered = status ? task.filter(t => t.status === status) : tasks;
//             if (!filtered.length) return console.log('No tasks found.');
//             filtered.forEach(({ id, title, status, dueDate }) => {
//                 console.log(`${id} | ${title} | ${status} | Due: ${dueDate}`);
//             });
//             break;
//         }

//         case 'update': {
//             const [id, field, value] = args;
//             const task = tasks.find(t => t.id == id);
//             if (!task) {
//                 console.log('not found');
//             }
//             if (['title', 'description', 'status', 'dueDate'].includes(field)) {
//                 task[field] = value;
//                 await writeTasks(tasks);
//                 console.log(`Task ${id} updated`);
//             } else {
//                 console.log('Invalid')
//             }
//         }

//         case 'delete': {
//             const [id] = args;
//             const filtered = tasks.filter(t => t.id != id);
//             if (filtered.length === tasks.length) {
//                 console.log('not found')
//             }
//             await writeTasks(filtered);
//             console.log(`task ${id} deleted`);
//             break;
//         }
//         default:
//             console.log(`
//       Available commands:
//       - add "title" "description"
//       - list [status]
//       - update <id> <field> <new_value>
//       - delete <id>
//             `);
//     }
// };