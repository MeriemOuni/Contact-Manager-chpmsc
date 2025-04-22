class AVLNode:
    def __init__(self, name):
        self.name = name
        self.left = None
        self.right = None
        self.height = 1


class AVLTree:
    def insert(self, root, name):
        if not root:
            return AVLNode(name)

        if name.lower() < root.name.lower():
            root.left = self.insert(root.left, name)
        elif name.lower() > root.name.lower():
            root.right = self.insert(root.right, name)
        else:
            return root  # Duplicate names are not inserted

        root.height = 1 + max(self.get_height(root.left), self.get_height(root.right))
        balance = self.get_balance(root)

        # Rebalance with rotations
        if balance > 1 and name.lower() < root.left.name.lower():
            return self.right_rotate(root)
        if balance < -1 and name.lower() > root.right.name.lower():
            return self.left_rotate(root)
        if balance > 1 and name.lower() > root.left.name.lower():
            root.left = self.left_rotate(root.left)
            return self.right_rotate(root)
        if balance < -1 and name.lower() < root.right.name.lower():
            root.right = self.right_rotate(root.right)
            return self.left_rotate(root)

        return root

    def delete(self, root, name):
        if not root:
            return root

        if name.lower() < root.name.lower():
            root.left = self.delete(root.left, name)
        elif name.lower() > root.name.lower():
            root.right = self.delete(root.right, name)
        else:
            if not root.left:
                return root.right
            elif not root.right:
                return root.left
            temp = self.get_min_value_node(root.right)
            root.name = temp.name
            root.right = self.delete(root.right, temp.name)

        if not root:
            return root

        root.height = 1 + max(self.get_height(root.left), self.get_height(root.right))
        balance = self.get_balance(root)

        # Rebalance
        if balance > 1 and self.get_balance(root.left) >= 0:
            return self.right_rotate(root)
        if balance > 1 and self.get_balance(root.left) < 0:
            root.left = self.left_rotate(root.left)
            return self.right_rotate(root)
        if balance < -1 and self.get_balance(root.right) <= 0:
            return self.left_rotate(root)
        if balance < -1 and self.get_balance(root.right) > 0:
            root.right = self.right_rotate(root.right)
            return self.left_rotate(root)

        return root

    def search(self, root, name):
        if not root:
            return False
        if name.lower() == root.name.lower():
            return True
        elif name.lower() < root.name.lower():
            return self.search(root.left, name)
        else:
            return self.search(root.right, name)

    def inorder(self, root):
        if root:
            self.inorder(root.left)
            print(root.name)
            self.inorder(root.right)

    def count_nodes(self, root):
        if not root:
            return 0
        return 1 + self.count_nodes(root.left) + self.count_nodes(root.right)

    # Helpers
    def get_height(self, node):
        return node.height if node else 0

    def get_balance(self, node):
        return self.get_height(node.left) - self.get_height(node.right) if node else 0

    def right_rotate(self, z):
        y = z.left
        T3 = y.right
        y.right = z
        z.left = T3
        z.height = 1 + max(self.get_height(z.left), self.get_height(z.right))
        y.height = 1 + max(self.get_height(y.left), self.get_height(y.right))
        return y

    def left_rotate(self, z):
        y = z.right
        T2 = y.left
        y.left = z
        z.right = T2
        z.height = 1 + max(self.get_height(z.left), self.get_height(z.right))
        y.height = 1 + max(self.get_height(y.left), self.get_height(y.right))
        return y

    def get_min_value_node(self, node):
        current = node
        while current.left:
            current = current.left
        return current