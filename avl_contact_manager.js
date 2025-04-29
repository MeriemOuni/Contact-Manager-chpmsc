class AVLNode {
	constructor(name) {
		this.name = name;
		this.left = null;
		this.right = null;
		this.height = 1;
	}
}

class AVLTree {
	insert(root, name) {
		if (!root) return new AVLNode(name);

		const n = name.toLowerCase();
		const r = root.name.toLowerCase();

		if (n < r) root.left = this.insert(root.left, name);
		else if (n > r) root.right = this.insert(root.right, name);
		else return root; // Duplicate

		root.height =
			1 + Math.max(this.getHeight(root.left), this.getHeight(root.right));
		return this.rebalance(root, name);
	}

	delete(root, name) {
		if (!root) return root;

		const n = name.toLowerCase();
		const r = root.name.toLowerCase();

		if (n < r) root.left = this.delete(root.left, name);
		else if (n > r) root.right = this.delete(root.right, name);
		else {
			if (!root.left || !root.right) {
				root = root.left || root.right;
			} else {
				let temp = this.getMinValueNode(root.right);
				root.name = temp.name;
				root.right = this.delete(root.right, temp.name);
			}
		}

		if (!root) return root;
		root.height =
			1 + Math.max(this.getHeight(root.left), this.getHeight(root.right));
		return this.rebalance(root);
	}

	search(root, name) {
		if (!root) return false;

		const n = name.toLowerCase();
		const r = root.name.toLowerCase();

		if (n === r) return true;
		else if (n < r) return this.search(root.left, name);
		else return this.search(root.right, name);
	}

	inorder(root) {
		if (root) {
			this.inorder(root.left);
			console.log(root.name);
			this.inorder(root.right);
		}
	}

	countNodes(root) {
		if (!root) return 0;
		return 1 + this.countNodes(root.left) + this.countNodes(root.right);
	}

	// Helpers
	getHeight(node) {
		return node ? node.height : 0;
	}

	getBalance(node) {
		return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
	}

	getMinValueNode(node) {
		let current = node;
		while (current.left) current = current.left;
		return current;
	}

	rightRotate(z) {
		const y = z.left;
		z.left = y.right;
		y.right = z;

		z.height = 1 + Math.max(this.getHeight(z.left), this.getHeight(z.right));
		y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
		return y;
	}

	leftRotate(z) {
		const y = z.right;
		z.right = y.left;
		y.left = z;

		z.height = 1 + Math.max(this.getHeight(z.left), this.getHeight(z.right));
		y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
		return y;
	}

	rebalance(node, name = null) {
		const balance = this.getBalance(node);

		if (
			balance > 1 &&
			(!name || name.toLowerCase() < node.left.name.toLowerCase())
		) {
			return this.rightRotate(node);
		}

		if (
			balance < -1 &&
			(!name || name.toLowerCase() > node.right.name.toLowerCase())
		) {
			return this.leftRotate(node);
		}

		if (
			balance > 1 &&
			name &&
			name.toLowerCase() > node.left.name.toLowerCase()
		) {
			node.left = this.leftRotate(node.left);
			return this.rightRotate(node);
		}

		if (
			balance < -1 &&
			name &&
			name.toLowerCase() < node.right.name.toLowerCase()
		) {
			node.right = this.rightRotate(node.right);
			return this.leftRotate(node);
		}

		return node;
	}
}
