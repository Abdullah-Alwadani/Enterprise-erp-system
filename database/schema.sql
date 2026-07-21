-- Enterprise ERP System SQLite schema
-- Generated from backend/erp.db for the local MVP.

CREATE TABLE audit_logs (
	user_id INTEGER, 
	action VARCHAR(100) NOT NULL, 
	module VARCHAR(100) NOT NULL, 
	entity_name VARCHAR(100), 
	entity_id INTEGER, 
	details TEXT, 
	id INTEGER NOT NULL, 
	created_at DATETIME NOT NULL, 
	updated_at DATETIME NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(user_id) REFERENCES users (id)
);

CREATE TABLE customers (
	name VARCHAR(200) NOT NULL, 
	contact_name VARCHAR(150), 
	email VARCHAR(255), 
	phone VARCHAR(50), 
	address TEXT, 
	id INTEGER NOT NULL, 
	created_at DATETIME NOT NULL, 
	updated_at DATETIME NOT NULL, 
	status VARCHAR(50) NOT NULL, 
	is_active BOOLEAN NOT NULL, 
	PRIMARY KEY (id)
);

CREATE TABLE departments (
	name VARCHAR(150) NOT NULL, 
	description VARCHAR(255), 
	id INTEGER NOT NULL, 
	created_at DATETIME NOT NULL, 
	updated_at DATETIME NOT NULL, 
	status VARCHAR(50) NOT NULL, 
	is_active BOOLEAN NOT NULL, 
	PRIMARY KEY (id)
);

CREATE TABLE employees (
	employee_code VARCHAR(50) NOT NULL, 
	first_name VARCHAR(100) NOT NULL, 
	last_name VARCHAR(100) NOT NULL, 
	email VARCHAR(255) NOT NULL, 
	phone VARCHAR(50), 
	job_title VARCHAR(150) NOT NULL, 
	hire_date DATE, 
	department_id INTEGER NOT NULL, 
	id INTEGER NOT NULL, 
	created_at DATETIME NOT NULL, 
	updated_at DATETIME NOT NULL, 
	status VARCHAR(50) NOT NULL, 
	is_active BOOLEAN NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(department_id) REFERENCES departments (id)
);

CREATE TABLE invoices (
	invoice_number VARCHAR(80) NOT NULL, 
	sales_order_id INTEGER NOT NULL, 
	invoice_date DATETIME, 
	due_date DATETIME, 
	total_amount NUMERIC(12, 2) NOT NULL, 
	id INTEGER NOT NULL, 
	created_at DATETIME NOT NULL, 
	updated_at DATETIME NOT NULL, 
	status VARCHAR(50) NOT NULL, 
	is_active BOOLEAN NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(sales_order_id) REFERENCES sales_orders (id)
);

CREATE TABLE notifications (
	user_id INTEGER NOT NULL, 
	title VARCHAR(200) NOT NULL, 
	message TEXT NOT NULL, 
	notification_type VARCHAR(80) NOT NULL, 
	id INTEGER NOT NULL, 
	created_at DATETIME NOT NULL, 
	updated_at DATETIME NOT NULL, 
	status VARCHAR(50) NOT NULL, 
	is_active BOOLEAN NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(user_id) REFERENCES users (id)
);

CREATE TABLE payments (
	payment_number VARCHAR(80) NOT NULL, 
	invoice_id INTEGER NOT NULL, 
	payment_date DATETIME, 
	amount NUMERIC(12, 2) NOT NULL, 
	method VARCHAR(80), 
	id INTEGER NOT NULL, 
	created_at DATETIME NOT NULL, 
	updated_at DATETIME NOT NULL, 
	status VARCHAR(50) NOT NULL, 
	is_active BOOLEAN NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(invoice_id) REFERENCES invoices (id)
);

CREATE TABLE product_categories (
	name VARCHAR(150) NOT NULL, 
	description TEXT, 
	id INTEGER NOT NULL, 
	created_at DATETIME NOT NULL, 
	updated_at DATETIME NOT NULL, 
	status VARCHAR(50) NOT NULL, 
	is_active BOOLEAN NOT NULL, 
	PRIMARY KEY (id)
);

CREATE TABLE products (
	sku VARCHAR(80) NOT NULL, 
	name VARCHAR(200) NOT NULL, 
	description TEXT, 
	unit_price NUMERIC(12, 2) NOT NULL, 
	quantity_on_hand INTEGER NOT NULL, 
	reorder_level INTEGER NOT NULL, 
	category_id INTEGER NOT NULL, 
	supplier_id INTEGER, 
	id INTEGER NOT NULL, 
	created_at DATETIME NOT NULL, 
	updated_at DATETIME NOT NULL, 
	status VARCHAR(50) NOT NULL, 
	is_active BOOLEAN NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(category_id) REFERENCES product_categories (id), 
	FOREIGN KEY(supplier_id) REFERENCES suppliers (id)
);

CREATE TABLE purchase_order_items (
	purchase_order_id INTEGER NOT NULL, 
	product_id INTEGER NOT NULL, 
	quantity INTEGER NOT NULL, 
	unit_cost NUMERIC(12, 2) NOT NULL, 
	id INTEGER NOT NULL, 
	created_at DATETIME NOT NULL, 
	updated_at DATETIME NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(purchase_order_id) REFERENCES purchase_orders (id), 
	FOREIGN KEY(product_id) REFERENCES products (id)
);

CREATE TABLE purchase_orders (
	order_number VARCHAR(80) NOT NULL, 
	supplier_id INTEGER NOT NULL, 
	purchase_request_id INTEGER, 
	order_date DATETIME, 
	total_amount NUMERIC(12, 2) NOT NULL, 
	id INTEGER NOT NULL, 
	created_at DATETIME NOT NULL, 
	updated_at DATETIME NOT NULL, 
	status VARCHAR(50) NOT NULL, 
	is_active BOOLEAN NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(supplier_id) REFERENCES suppliers (id), 
	FOREIGN KEY(purchase_request_id) REFERENCES purchase_requests (id)
);

CREATE TABLE purchase_request_items (
	purchase_request_id INTEGER NOT NULL, 
	product_id INTEGER NOT NULL, 
	quantity INTEGER NOT NULL, 
	estimated_unit_cost NUMERIC(12, 2) NOT NULL, 
	id INTEGER NOT NULL, 
	created_at DATETIME NOT NULL, 
	updated_at DATETIME NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(purchase_request_id) REFERENCES purchase_requests (id), 
	FOREIGN KEY(product_id) REFERENCES products (id)
);

CREATE TABLE purchase_requests (
	request_number VARCHAR(80) NOT NULL, 
	requested_by VARCHAR(150) NOT NULL, 
	needed_by DATETIME, 
	notes TEXT, 
	id INTEGER NOT NULL, 
	created_at DATETIME NOT NULL, 
	updated_at DATETIME NOT NULL, 
	status VARCHAR(50) NOT NULL, 
	is_active BOOLEAN NOT NULL, 
	PRIMARY KEY (id)
);

CREATE TABLE roles (
	name VARCHAR(100) NOT NULL, 
	description VARCHAR(255), 
	id INTEGER NOT NULL, 
	created_at DATETIME NOT NULL, 
	updated_at DATETIME NOT NULL, 
	status VARCHAR(50) NOT NULL, 
	is_active BOOLEAN NOT NULL, 
	PRIMARY KEY (id)
);

CREATE TABLE sales_order_items (
	sales_order_id INTEGER NOT NULL, 
	product_id INTEGER NOT NULL, 
	quantity INTEGER NOT NULL, 
	unit_price NUMERIC(12, 2) NOT NULL, 
	id INTEGER NOT NULL, 
	created_at DATETIME NOT NULL, 
	updated_at DATETIME NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(sales_order_id) REFERENCES sales_orders (id), 
	FOREIGN KEY(product_id) REFERENCES products (id)
);

CREATE TABLE sales_orders (
	order_number VARCHAR(80) NOT NULL, 
	customer_id INTEGER NOT NULL, 
	order_date DATETIME, 
	total_amount NUMERIC(12, 2) NOT NULL, 
	notes TEXT, 
	id INTEGER NOT NULL, 
	created_at DATETIME NOT NULL, 
	updated_at DATETIME NOT NULL, 
	status VARCHAR(50) NOT NULL, 
	is_active BOOLEAN NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(customer_id) REFERENCES customers (id)
);

CREATE TABLE suppliers (
	name VARCHAR(200) NOT NULL, 
	contact_name VARCHAR(150), 
	email VARCHAR(255), 
	phone VARCHAR(50), 
	address TEXT, 
	id INTEGER NOT NULL, 
	created_at DATETIME NOT NULL, 
	updated_at DATETIME NOT NULL, 
	status VARCHAR(50) NOT NULL, 
	is_active BOOLEAN NOT NULL, 
	PRIMARY KEY (id)
);

CREATE TABLE users (
	email VARCHAR(255) NOT NULL, 
	full_name VARCHAR(255) NOT NULL, 
	hashed_password VARCHAR(255) NOT NULL, 
	role_id INTEGER NOT NULL, 
	is_superuser BOOLEAN NOT NULL, 
	id INTEGER NOT NULL, 
	created_at DATETIME NOT NULL, 
	updated_at DATETIME NOT NULL, 
	status VARCHAR(50) NOT NULL, 
	is_active BOOLEAN NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(role_id) REFERENCES roles (id)
);
