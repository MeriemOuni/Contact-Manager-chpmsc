const readline = require("readline");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const tree = new AVLTree();
let root = null;

function showMenu() {
	console.log("\nContact Manager");
	console.log("1. Add Contact");
	console.log("2. Delete Contact");
	console.log("3. Search Contact");
	console.log("4. View All Contacts");
	console.log("5. Count Contacts");
	console.log("6. Exit");
}

function prompt() {
	showMenu();
	rl.question("Choose an option (1-6): ", (answer) => {
		switch (answer.trim()) {
			case "1":
				rl.question("Enter contact name to add: ", (name) => {
					root = tree.insert(root, name.trim());
					console.log(`Added: ${name.trim()}`);
					prompt();
				});
				break;
			case "2":
				rl.question("Enter contact name to delete: ", (name) => {
					root = tree.delete(root, name.trim());
					console.log(`Deleted: ${name.trim()}`);
					prompt();
				});
				break;
			case "3":
				rl.question("Enter name to search: ", (name) => {
					const found = tree.search(root, name.trim());
					console.log(
						found
							? `${name.trim()} is in contacts.`
							: `${name.trim()} not found.`
					);
					prompt();
				});
				break;
			case "4":
				console.log("All Contacts (A-Z):");
				tree.inorder(root);
				prompt();
				break;
			case "5":
				console.log(`Total Contacts: ${tree.countNodes(root)}`);
				prompt();
				break;
			case "6":
				rl.close();
				break;
			default:
				console.log("Invalid option. Please choose 1–6.");
				prompt();
		}
	});
}

prompt();
