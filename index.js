import { program } from "commander";
import * as contactsService from "./contacts.js"

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await contactsService.listContacts();
      console.table(allContacts);
      break;
    case 'get':
      const oneContact = await contactsService.getContactById(id);
      console.log(oneContact);
      break;
    case 'add':
      const newContact = await contactsService.addContact(name, email, phone);
      console.log(newContact);
      break;
    case 'remove':
      const deletedContact = await contactsService.removeContact(id);
      console.log(deletedContact);
      break;
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);
