from avl_contact_manager import AVLTree, AVLNode

def main():
    tree = AVLTree()
    root = None

    while True:
        print("\n📇 Contact Manager")
        print("1. Add Contact")
        print("2. Delete Contact")
        print("3. Search Contact")
        print("4. Display All Contacts")
        print("5. Count Contacts")
        print("6. Exit")

        choice = input("Enter your choice: ")

        if choice == "1":
            name = input("Enter contact name: ")
            root = tree.insert(root, name)

        elif choice == "2":
            name = input("Enter contact name to delete: ")
            root = tree.delete(root, name)

        elif choice == "3":
            name = input("Enter contact name to search: ")
            found = tree.search(root, name)
            print("✅ Found!" if found else "❌ Not found.")

        elif choice == "4":
            print("\n📃 Contact List (Alphabetical):")
            tree.inorder(root)

        elif choice == "5":
            print("📊 Total Contacts:", tree.count_nodes(root))

        elif choice == "6":
            print("👋 Exiting... Goodbye!")
            break

        else:
            print("⚠️ Invalid option. Please try again.")

if __name__ == "__main__":
    main()