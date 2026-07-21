-- Enterprise ERP System sample data summary
-- Run backend/seed.py to recreate the full SQLite demo database.

-- roles: 7 rows
-- users: 7 rows
-- departments: 5 rows
-- employees: 15 rows
-- product_categories: 5 rows
-- suppliers: 8 rows
-- products: 20 rows
-- customers: 10 rows
-- purchase_requests: 8 rows
-- purchase_orders: 6 rows
-- sales_orders: 8 rows
-- invoices: 10 rows
-- payments: 8 rows
-- audit_logs: 8 rows
-- notifications: 4 rows

INSERT INTO "audit_logs" VALUES(1,'login','authentication','User',1,'Admin signed in',1,'2026-06-28 22:49:12.481635','2026-06-28 22:49:12.481640');
INSERT INTO "audit_logs" VALUES(1,'create','hr','Employee',1,'Employee record created',2,'2026-06-28 22:49:12.484397','2026-06-28 22:49:12.484401');
INSERT INTO "audit_logs" VALUES(1,'update','inventory','Product',3,'Stock level updated',3,'2026-06-28 22:49:12.486594','2026-06-28 22:49:12.486598');
INSERT INTO "audit_logs" VALUES(1,'approve','procurement','PurchaseRequest',2,'Purchase request approved',4,'2026-06-28 22:49:12.488615','2026-06-28 22:49:12.488618');
INSERT INTO "audit_logs" VALUES(1,'confirm','sales','SalesOrder',1,'Sales order confirmed',5,'2026-06-28 22:49:12.490239','2026-06-28 22:49:12.490243');
INSERT INTO "audit_logs" VALUES(1,'mark_paid','finance','Invoice',1,'Invoice marked as paid',6,'2026-06-28 22:49:12.491441','2026-06-28 22:49:12.491442');
INSERT INTO "audit_logs" VALUES(1,'read','notifications','Notification',1,'Notification read',7,'2026-06-28 22:49:12.492478','2026-06-28 22:49:12.492479');
INSERT INTO "audit_logs" VALUES(1,'export','reports','SalesReport',NULL,'Sales report reviewed',8,'2026-06-28 22:49:12.493627','2026-06-28 22:49:12.493629');
INSERT INTO "customers" VALUES('Acme Enterprises','Customer Contact 1','customer1@example.com','+966520000001','Saudi Arabia',1,'2026-06-28 22:49:12.374378','2026-06-28 22:49:12.374379','active',1);
INSERT INTO "customers" VALUES('Riyadh Retail Group','Customer Contact 2','customer2@example.com','+966520000002','Saudi Arabia',2,'2026-06-28 22:49:12.375686','2026-06-28 22:49:12.375687','active',1);
INSERT INTO "customers" VALUES('Gulf Manufacturing Co.','Customer Contact 3','customer3@example.com','+966520000003','Saudi Arabia',3,'2026-06-28 22:49:12.376623','2026-06-28 22:49:12.376624','active',1);
INSERT INTO "customers" VALUES('Blue Horizon Logistics','Customer Contact 4','customer4@example.com','+966520000004','Saudi Arabia',4,'2026-06-28 22:49:12.377567','2026-06-28 22:49:12.377568','active',1);
INSERT INTO "customers" VALUES('Nour Health Services','Customer Contact 5','customer5@example.com','+966520000005','Saudi Arabia',5,'2026-06-28 22:49:12.378528','2026-06-28 22:49:12.378529','active',1);
INSERT INTO "customers" VALUES('Smart City Solutions','Customer Contact 6','customer6@example.com','+966520000006','Saudi Arabia',6,'2026-06-28 22:49:12.379392','2026-06-28 22:49:12.379392','active',1);
INSERT INTO "customers" VALUES('Falcon Hospitality','Customer Contact 7','customer7@example.com','+966520000007','Saudi Arabia',7,'2026-06-28 22:49:12.380264','2026-06-28 22:49:12.380265','active',1);
INSERT INTO "customers" VALUES('Desert Cloud Systems','Customer Contact 8','customer8@example.com','+966520000008','Saudi Arabia',8,'2026-06-28 22:49:12.381112','2026-06-28 22:49:12.381113','active',1);
INSERT INTO "customers" VALUES('Eastern Trading House','Customer Contact 9','customer9@example.com','+966520000009','Saudi Arabia',9,'2026-06-28 22:49:12.382029','2026-06-28 22:49:12.382030','active',1);
INSERT INTO "customers" VALUES('Capital Education Group','Customer Contact 10','customer10@example.com','+966520000010','Saudi Arabia',10,'2026-06-28 22:49:12.382906','2026-06-28 22:49:12.382907','active',1);
INSERT INTO "departments" VALUES('Human Resources','Recruitment, payroll coordination, and employee records',1,'2026-06-28 22:49:12.311046','2026-06-28 22:49:12.311048','active',1);
INSERT INTO "departments" VALUES('Inventory','Warehousing, stock control, and product catalog management',2,'2026-06-28 22:49:12.312361','2026-06-28 22:49:12.312363','active',1);
INSERT INTO "departments" VALUES('Procurement','Supplier relations, purchasing, and approvals',3,'2026-06-28 22:49:12.313337','2026-06-28 22:49:12.313339','active',1);
INSERT INTO "departments" VALUES('Sales','Customer management, orders, and revenue operations',4,'2026-06-28 22:49:12.314209','2026-06-28 22:49:12.314210','active',1);
INSERT INTO "departments" VALUES('Finance','Invoicing, payments, and financial controls',5,'2026-06-28 22:49:12.315048','2026-06-28 22:49:12.315049','active',1);
INSERT INTO "employees" VALUES('EMP-001','Sara','Ahmed','sara.ahmed@erp.com','+966500000001','HR Business Partner','2026-04-29',1,1,'2026-06-28 22:49:12.317285','2026-06-28 22:49:12.317286','active',1);
INSERT INTO "employees" VALUES('EMP-002','Omar','Khalid','omar.khalid@erp.com','+966500000002','Recruitment Specialist','2026-03-30',1,2,'2026-06-28 22:49:12.318790','2026-06-28 22:49:12.318791','active',1);
INSERT INTO "employees" VALUES('EMP-003','Layla','Hassan','layla.hassan@erp.com','+966500000003','Training Coordinator','2026-02-28',1,3,'2026-06-28 22:49:12.319767','2026-06-28 22:49:12.319768','active',1);
INSERT INTO "employees" VALUES('EMP-004','Faisal','Nasser','faisal.nasser@erp.com','+966500000004','Warehouse Supervisor','2026-01-29',2,4,'2026-06-28 22:49:12.320857','2026-06-28 22:49:12.320858','active',1);
INSERT INTO "employees" VALUES('EMP-005','Huda','Saleh','huda.saleh@erp.com','+966500000005','Inventory Analyst','2025-12-30',2,5,'2026-06-28 22:49:12.321909','2026-06-28 22:49:12.321910','active',1);
INSERT INTO "employees" VALUES('EMP-006','Yousef','Adel','yousef.adel@erp.com','+966500000006','Stock Controller','2025-11-30',2,6,'2026-06-28 22:49:12.322942','2026-06-28 22:49:12.322943','active',1);
INSERT INTO "employees" VALUES('EMP-007','Noura','Saeed','noura.saeed@erp.com','+966500000007','Procurement Lead','2025-10-31',3,7,'2026-06-28 22:49:12.323869','2026-06-28 22:49:12.323870','active',1);
INSERT INTO "employees" VALUES('EMP-008','Rakan','Majed','rakan.majed@erp.com','+966500000008','Supplier Coordinator','2025-10-01',3,8,'2026-06-28 22:49:12.325095','2026-06-28 22:49:12.325096','active',1);
INSERT INTO "employees" VALUES('EMP-009','Amani','Yasser','amani.yasser@erp.com','+966500000009','Purchasing Officer','2025-09-01',3,9,'2026-06-28 22:49:12.326112','2026-06-28 22:49:12.326113','active',1);
INSERT INTO "employees" VALUES('EMP-010','Khalid','Farhan','khalid.farhan@erp.com','+966500000010','Sales Manager','2025-08-02',4,10,'2026-06-28 22:49:12.327037','2026-06-28 22:49:12.327037','active',1);
INSERT INTO "employees" VALUES('EMP-011','Reema','Othman','reema.othman@erp.com','+966500000011','Account Executive','2025-07-03',4,11,'2026-06-28 22:49:12.327946','2026-06-28 22:49:12.327946','active',1);
INSERT INTO "employees" VALUES('EMP-012','Maha','Ibrahim','maha.ibrahim@erp.com','+966500000012','Customer Success Lead','2025-06-03',4,12,'2026-06-28 22:49:12.328870','2026-06-28 22:49:12.328870','active',1);
INSERT INTO "employees" VALUES('EMP-013','Abdulaziz','Rashid','abdulaziz.rashid@erp.com','+966500000013','Finance Controller','2025-05-04',5,13,'2026-06-28 22:49:12.329786','2026-06-28 22:49:12.329787','active',1);
INSERT INTO "employees" VALUES('EMP-014','Dana','Tariq','dana.tariq@erp.com','+966500000014','Accounts Receivable Analyst','2025-04-04',5,14,'2026-06-28 22:49:12.330696','2026-06-28 22:49:12.330697','active',1);
INSERT INTO "employees" VALUES('EMP-015','Ziad','Hamdan','ziad.hamdan@erp.com','+966500000015','Treasury Specialist','2025-03-05',5,15,'2026-06-28 22:49:12.331683','2026-06-28 22:49:12.331684','active',1);
INSERT INTO "invoices" VALUES('INV-0001',1,'2026-06-04 22:49:12.452300','2026-07-04 22:49:12.452304',2085,1,'2026-06-28 22:49:12.453659','2026-06-28 22:49:12.453661','paid',1);
INSERT INTO "invoices" VALUES('INV-0002',2,'2026-06-05 22:49:12.457232','2026-07-05 22:49:12.457234',2530,2,'2026-06-28 22:49:12.457517','2026-06-28 22:49:12.457519','unpaid',1);
INSERT INTO "invoices" VALUES('INV-0003',3,'2026-06-06 22:49:12.460225','2026-07-06 22:49:12.460227',3855,3,'2026-06-28 22:49:12.460555','2026-06-28 22:49:12.460556','partially_paid',1);
INSERT INTO "invoices" VALUES('INV-0004',4,'2026-06-07 22:49:12.462870','2026-07-07 22:49:12.462873',780,4,'2026-06-28 22:49:12.463147','2026-06-28 22:49:12.463148','paid',1);
INSERT INTO "invoices" VALUES('INV-0005',5,'2026-06-08 22:49:12.465445','2026-07-08 22:49:12.465447',1105,5,'2026-06-28 22:49:12.465714','2026-06-28 22:49:12.465715','overdue',1);
INSERT INTO "invoices" VALUES('INV-0006',6,'2026-06-09 22:49:12.468896','2026-07-09 22:49:12.468899',1890,6,'2026-06-28 22:49:12.469200','2026-06-28 22:49:12.469201','unpaid',1);
INSERT INTO "invoices" VALUES('INV-0007',7,'2026-06-10 22:49:12.471499','2026-07-10 22:49:12.471501',6275,7,'2026-06-28 22:49:12.471772','2026-06-28 22:49:12.471773','paid',1);
INSERT INTO "invoices" VALUES('INV-0008',8,'2026-06-11 22:49:12.473892','2026-07-11 22:49:12.473894',1110,8,'2026-06-28 22:49:12.474199','2026-06-28 22:49:12.474200','partially_paid',1);
INSERT INTO "invoices" VALUES('INV-0009',1,'2026-06-12 22:49:12.477040','2026-07-12 22:49:12.477043',3085,9,'2026-06-28 22:49:12.477350','2026-06-28 22:49:12.477351','unpaid',1);
INSERT INTO "invoices" VALUES('INV-0010',2,'2026-06-13 22:49:12.478651','2026-07-13 22:49:12.478655',3530,10,'2026-06-28 22:49:12.478946','2026-06-28 22:49:12.478947','paid',1);
INSERT INTO "notifications" VALUES(1,'Low stock alert','Several products are below reorder level.','warning',1,'2026-06-28 22:49:12.495876','2026-06-28 22:49:12.495879','unread',1);
INSERT INTO "notifications" VALUES(1,'Purchase approval needed','Three purchase requests are pending review.','approval',2,'2026-06-28 22:49:12.497531','2026-06-28 22:49:12.497532','unread',1);
INSERT INTO "notifications" VALUES(1,'Invoice follow-up','Unpaid invoices require finance review.','finance',3,'2026-06-28 22:49:12.498609','2026-06-28 22:49:12.498609','unread',1);
INSERT INTO "notifications" VALUES(1,'Dashboard data refreshed','ERP analytics are using the latest SQLite seed data.','system',4,'2026-06-28 22:49:12.499763','2026-06-28 22:49:12.499765','unread',1);
INSERT INTO "payments" VALUES('PAY-0001',1,'2026-06-19 22:49:12.454947',2085,'Credit Card',1,'2026-06-28 22:49:12.455943','2026-06-28 22:49:12.455944','completed',1);
INSERT INTO "payments" VALUES('PAY-0002',2,'2026-06-20 22:49:12.458449',1265,'Cash',2,'2026-06-28 22:49:12.458749','2026-06-28 22:49:12.458751','completed',1);
INSERT INTO "payments" VALUES('PAY-0003',3,'2026-06-21 22:49:12.461530',1927.5,'Bank Transfer',3,'2026-06-28 22:49:12.461860','2026-06-28 22:49:12.461861','completed',1);
INSERT INTO "payments" VALUES('PAY-0004',4,'2026-06-22 22:49:12.463907',780,'Credit Card',4,'2026-06-28 22:49:12.464152','2026-06-28 22:49:12.464153','completed',1);
INSERT INTO "payments" VALUES('PAY-0005',5,'2026-06-23 22:49:12.467084',552.5,'Cash',5,'2026-06-28 22:49:12.467410','2026-06-28 22:49:12.467411','completed',1);
INSERT INTO "payments" VALUES('PAY-0006',6,'2026-06-24 22:49:12.470213',945,'Bank Transfer',6,'2026-06-28 22:49:12.470486','2026-06-28 22:49:12.470487','completed',1);
INSERT INTO "payments" VALUES('PAY-0007',7,'2026-06-25 22:49:12.472657',6275,'Credit Card',7,'2026-06-28 22:49:12.472915','2026-06-28 22:49:12.472915','completed',1);
INSERT INTO "payments" VALUES('PAY-0008',8,'2026-06-26 22:49:12.475279',555,'Cash',8,'2026-06-28 22:49:12.475596','2026-06-28 22:49:12.475597','completed',1);
INSERT INTO "product_categories" VALUES('IT Hardware','Laptops, monitors, network devices, and accessories',1,'2026-06-28 22:49:12.342245','2026-06-28 22:49:12.342246','active',1);
INSERT INTO "product_categories" VALUES('Office Supplies','Consumables used across administrative teams',2,'2026-06-28 22:49:12.343580','2026-06-28 22:49:12.343581','active',1);
INSERT INTO "product_categories" VALUES('Warehouse Equipment','Operational tools and storage equipment',3,'2026-06-28 22:49:12.344511','2026-06-28 22:49:12.344512','active',1);
INSERT INTO "product_categories" VALUES('Software Licenses','Business software subscriptions and license inventory',4,'2026-06-28 22:49:12.345383','2026-06-28 22:49:12.345384','active',1);
INSERT INTO "product_categories" VALUES('Facility Supplies','Workplace maintenance and facility items',5,'2026-06-28 22:49:12.346229','2026-06-28 22:49:12.346230','active',1);
INSERT INTO "products" VALUES('IT-LAP-001','Business Laptop 14 inch','Business Laptop 14 inch used by enterprise operations.',4200,18,6,1,1,1,'2026-06-28 22:49:12.349271','2026-06-28 22:49:12.349273','active',1);
INSERT INTO "products" VALUES('IT-MON-002','27 inch Docking Monitor','27 inch Docking Monitor used by enterprise operations.',1350,22,8,1,2,2,'2026-06-28 22:49:12.350963','2026-06-28 22:49:12.350964','active',1);
INSERT INTO "products" VALUES('IT-DOC-003','USB-C Docking Station','USB-C Docking Station used by enterprise operations.',620,9,10,1,3,3,'2026-06-28 22:49:12.352211','2026-06-28 22:49:12.352212','low_stock',1);
INSERT INTO "products" VALUES('IT-RTR-004','Branch Office Router','Branch Office Router used by enterprise operations.',980,4,5,1,4,4,'2026-06-28 22:49:12.353351','2026-06-28 22:49:12.353352','low_stock',1);
INSERT INTO "products" VALUES('OFF-PPR-005','A4 Printer Paper Box','A4 Printer Paper Box used by enterprise operations.',110,85,25,2,5,5,'2026-06-28 22:49:12.354444','2026-06-28 22:49:12.354445','active',1);
INSERT INTO "products" VALUES('OFF-PEN-006','Executive Pen Set','Executive Pen Set used by enterprise operations.',38,140,40,2,6,6,'2026-06-28 22:49:12.355584','2026-06-28 22:49:12.355585','active',1);
INSERT INTO "products" VALUES('OFF-CHA-007','Ergonomic Office Chair','Ergonomic Office Chair used by enterprise operations.',760,13,10,2,7,7,'2026-06-28 22:49:12.356839','2026-06-28 22:49:12.356840','active',1);
INSERT INTO "products" VALUES('OFF-DSK-008','Adjustable Work Desk','Adjustable Work Desk used by enterprise operations.',1850,6,5,2,7,8,'2026-06-28 22:49:12.357947','2026-06-28 22:49:12.357948','active',1);
INSERT INTO "products" VALUES('WH-PAL-009','Heavy Duty Pallet Jack','Heavy Duty Pallet Jack used by enterprise operations.',3100,3,2,3,8,9,'2026-06-28 22:49:12.359040','2026-06-28 22:49:12.359041','active',1);
INSERT INTO "products" VALUES('WH-SCN-010','Barcode Scanner','Barcode Scanner used by enterprise operations.',870,7,6,3,1,10,'2026-06-28 22:49:12.360150','2026-06-28 22:49:12.360151','active',1);
INSERT INTO "products" VALUES('WH-BIN-011','Storage Bin Set','Storage Bin Set used by enterprise operations.',145,44,20,3,2,11,'2026-06-28 22:49:12.361446','2026-06-28 22:49:12.361447','active',1);
INSERT INTO "products" VALUES('WH-LBL-012','Thermal Label Rolls','Thermal Label Rolls used by enterprise operations.',95,15,30,3,3,12,'2026-06-28 22:49:12.362649','2026-06-28 22:49:12.362650','low_stock',1);
INSERT INTO "products" VALUES('SW-ERP-013','ERP User License','ERP User License used by enterprise operations.',280,50,15,4,4,13,'2026-06-28 22:49:12.363749','2026-06-28 22:49:12.363750','active',1);
INSERT INTO "products" VALUES('SW-SEC-014','Endpoint Security License','Endpoint Security License used by enterprise operations.',190,70,20,4,5,14,'2026-06-28 22:49:12.364955','2026-06-28 22:49:12.364957','active',1);
INSERT INTO "products" VALUES('SW-BI-015','Business Intelligence License','Business Intelligence License used by enterprise operations.',410,16,10,4,6,15,'2026-06-28 22:49:12.366184','2026-06-28 22:49:12.366185','active',1);
INSERT INTO "products" VALUES('SW-CRM-016','CRM Seat License','CRM Seat License used by enterprise operations.',240,28,12,4,7,16,'2026-06-28 22:49:12.367682','2026-06-28 22:49:12.367685','active',1);
INSERT INTO "products" VALUES('FAC-CLE-017','Facility Cleaning Kit','Facility Cleaning Kit used by enterprise operations.',220,11,10,5,8,17,'2026-06-28 22:49:12.369062','2026-06-28 22:49:12.369063','active',1);
INSERT INTO "products" VALUES('FAC-LGT-018','LED Panel Light','LED Panel Light used by enterprise operations.',145,17,12,5,1,18,'2026-06-28 22:49:12.370241','2026-06-28 22:49:12.370242','active',1);
INSERT INTO "products" VALUES('FAC-CAF-019','Pantry Coffee Supplies','Pantry Coffee Supplies used by enterprise operations.',380,5,8,5,2,19,'2026-06-28 22:49:12.371380','2026-06-28 22:49:12.371381','low_stock',1);
INSERT INTO "products" VALUES('FAC-SAF-020','Safety Signage Pack','Safety Signage Pack used by enterprise operations.',75,30,10,5,3,20,'2026-06-28 22:49:12.372530','2026-06-28 22:49:12.372531','active',1);
INSERT INTO "purchase_orders" VALUES('PO-0001',2,2,'2026-06-25 22:49:12.404116',2480,1,'2026-06-28 22:49:12.405436','2026-06-28 22:49:12.405439','issued',1);
INSERT INTO "purchase_orders" VALUES('PO-0002',3,3,'2026-06-22 22:49:12.410007',550,2,'2026-06-28 22:49:12.410342','2026-06-28 22:49:12.410343','received',1);
INSERT INTO "purchase_orders" VALUES('PO-0003',4,4,'2026-06-19 22:49:12.412986',4560,3,'2026-06-28 22:49:12.413314','2026-06-28 22:49:12.413315','issued',1);
INSERT INTO "purchase_orders" VALUES('PO-0004',5,5,'2026-06-16 22:49:12.415643',21700,4,'2026-06-28 22:49:12.415934','2026-06-28 22:49:12.415935','draft',1);
INSERT INTO "purchase_orders" VALUES('PO-0005',6,6,'2026-06-13 22:49:12.419360',1160,5,'2026-06-28 22:49:12.419805','2026-06-28 22:49:12.419807','received',1);
INSERT INTO "purchase_orders" VALUES('PO-0006',7,7,'2026-06-10 22:49:12.422743',2520,6,'2026-06-28 22:49:12.423042','2026-06-28 22:49:12.423043','issued',1);
INSERT INTO "purchase_requests" VALUES('PR-0001','HR Manager','2026-07-06 22:49:12.383570','Procurement request for 27 inch Docking Monitor',1,'2026-06-28 22:49:12.384980','2026-06-28 22:49:12.384981','pending',1);
INSERT INTO "purchase_requests" VALUES('PR-0002','Facility Coordinator','2026-07-07 22:49:12.388111','Procurement request for USB-C Docking Station',2,'2026-06-28 22:49:12.388521','2026-06-28 22:49:12.388522','approved',1);
INSERT INTO "purchase_requests" VALUES('PR-0003','Inventory Manager','2026-07-08 22:49:12.390234','Procurement request for Branch Office Router',3,'2026-06-28 22:49:12.390593','2026-06-28 22:49:12.390594','pending',1);
INSERT INTO "purchase_requests" VALUES('PR-0004','HR Manager','2026-07-09 22:49:12.392450','Procurement request for A4 Printer Paper Box',4,'2026-06-28 22:49:12.392838','2026-06-28 22:49:12.392839','rejected',1);
INSERT INTO "purchase_requests" VALUES('PR-0005','Facility Coordinator','2026-07-10 22:49:12.394688','Procurement request for Executive Pen Set',5,'2026-06-28 22:49:12.395062','2026-06-28 22:49:12.395062','approved',1);
INSERT INTO "purchase_requests" VALUES('PR-0006','Inventory Manager','2026-07-11 22:49:12.396654','Procurement request for Ergonomic Office Chair',6,'2026-06-28 22:49:12.397020','2026-06-28 22:49:12.397020','pending',1);
INSERT INTO "purchase_requests" VALUES('PR-0007','HR Manager','2026-07-12 22:49:12.398707','Procurement request for Adjustable Work Desk',7,'2026-06-28 22:49:12.399066','2026-06-28 22:49:12.399067','approved',1);
INSERT INTO "purchase_requests" VALUES('PR-0008','Facility Coordinator','2026-07-13 22:49:12.400881','Procurement request for Heavy Duty Pallet Jack',8,'2026-06-28 22:49:12.401282','2026-06-28 22:49:12.401283','draft',1);
INSERT INTO "roles" VALUES('Admin','Full system access',1,'2026-06-28 22:49:10.485080','2026-06-28 22:49:10.485085','active',1);
INSERT INTO "roles" VALUES('HR Manager','Employee and department management',2,'2026-06-28 22:49:10.487271','2026-06-28 22:49:10.487273','active',1);
INSERT INTO "roles" VALUES('Inventory Manager','Product and stock management',3,'2026-06-28 22:49:10.488397','2026-06-28 22:49:10.488398','active',1);
INSERT INTO "roles" VALUES('Procurement Officer','Supplier and purchasing workflows',4,'2026-06-28 22:49:10.489270','2026-06-28 22:49:10.489271','active',1);
INSERT INTO "roles" VALUES('Sales Officer','Customer and sales workflows',5,'2026-06-28 22:49:10.490098','2026-06-28 22:49:10.490099','active',1);
INSERT INTO "roles" VALUES('Finance Officer','Invoices, payments, and finance workflows',6,'2026-06-28 22:49:10.490900','2026-06-28 22:49:10.490902','active',1);
INSERT INTO "roles" VALUES('Viewer','Read-only reporting access',7,'2026-06-28 22:49:10.491721','2026-06-28 22:49:10.491722','active',1);
INSERT INTO "sales_orders" VALUES('SO-0001',2,'2026-05-27 22:49:12.425939',1960,'Sales order for Branch Office Router',1,'2026-06-28 22:49:12.427041','2026-06-28 22:49:12.427043','confirmed',1);
INSERT INTO "sales_orders" VALUES('SO-0002',3,'2026-05-30 22:49:12.431104',2280,'Sales order for Ergonomic Office Chair',2,'2026-06-28 22:49:12.431402','2026-06-28 22:49:12.431403','delivered',1);
INSERT INTO "sales_orders" VALUES('SO-0003',4,'2026-06-02 22:49:12.433806',3480,'Sales order for Barcode Scanner',3,'2026-06-28 22:49:12.434132','2026-06-28 22:49:12.434133','draft',1);
INSERT INTO "sales_orders" VALUES('SO-0004',5,'2026-06-05 22:49:12.436745',280,'Sales order for ERP User License',4,'2026-06-28 22:49:12.437010','2026-06-28 22:49:12.437011','confirmed',1);
INSERT INTO "sales_orders" VALUES('SO-0005',6,'2026-06-08 22:49:12.439322',480,'Sales order for CRM Seat License',5,'2026-06-28 22:49:12.439628','2026-06-28 22:49:12.439629','delivered',1);
INSERT INTO "sales_orders" VALUES('SO-0006',7,'2026-06-11 22:49:12.442340',1140,'Sales order for Pantry Coffee Supplies',6,'2026-06-28 22:49:12.442679','2026-06-28 22:49:12.442681','confirmed',1);
INSERT INTO "sales_orders" VALUES('SO-0007',8,'2026-06-14 22:49:12.444964',5400,'Sales order for 27 inch Docking Monitor',7,'2026-06-28 22:49:12.445341','2026-06-28 22:49:12.445343','delivered',1);
INSERT INTO "sales_orders" VALUES('SO-0008',9,'2026-06-17 22:49:12.448482',110,'Sales order for A4 Printer Paper Box',8,'2026-06-28 22:49:12.448961','2026-06-28 22:49:12.448962','draft',1);
INSERT INTO "suppliers" VALUES('Global Tech Supply','Nadia Saleh','nadia@globaltech.example','+966510000001','Riyadh',1,'2026-06-28 22:49:12.333400','2026-06-28 22:49:12.333402','active',1);
INSERT INTO "suppliers" VALUES('OfficeSource Arabia','Fahad Omar','fahad@officesource.example','+966510000002','Jeddah',2,'2026-06-28 22:49:12.335122','2026-06-28 22:49:12.335124','active',1);
INSERT INTO "suppliers" VALUES('Warehouse Pro','Mona Yasin','mona@warehousepro.example','+966510000003','Dammam',3,'2026-06-28 22:49:12.336081','2026-06-28 22:49:12.336082','active',1);
INSERT INTO "suppliers" VALUES('SecureSoft ME','Hassan Tariq','hassan@securesoft.example','+966510000004','Riyadh',4,'2026-06-28 22:49:12.336930','2026-06-28 22:49:12.336931','active',1);
INSERT INTO "suppliers" VALUES('Facility Direct','Reem Khaled','reem@facilitydirect.example','+966510000005','Khobar',5,'2026-06-28 22:49:12.337785','2026-06-28 22:49:12.337786','active',1);
INSERT INTO "suppliers" VALUES('DigitalWorks','Majed Sami','majed@digitalworks.example','+966510000006','Riyadh',6,'2026-06-28 22:49:12.338662','2026-06-28 22:49:12.338663','active',1);
INSERT INTO "suppliers" VALUES('Logistics Plus','Abeer Salem','abeer@logisticsplus.example','+966510000007','Jeddah',7,'2026-06-28 22:49:12.339660','2026-06-28 22:49:12.339661','active',1);
INSERT INTO "suppliers" VALUES('Gulf Maintenance','Yara Adel','yara@gulfmaintenance.example','+966510000008','Dammam',8,'2026-06-28 22:49:12.340712','2026-06-28 22:49:12.340713','active',1);
INSERT INTO "users" VALUES('admin@erp.com','System Administrator','$2b$12$Ens4GxYUTJxl0SJspw7h6.O3Y3WeKLFo5D.Fy4q4Tfd6eGVbqwsoq',1,1,1,'2026-06-28 22:49:10.772039','2026-06-28 22:49:10.772043','active',1);
INSERT INTO "users" VALUES('hr@erp.com','Mariam Al-Harbi','$2b$12$Ap4TO1CuLaTETCbJ5yZhIODx67IX4k6EftyYYrrc.lPlE/ZECvxEa',2,0,2,'2026-06-28 22:49:11.023659','2026-06-28 22:49:11.023663','active',1);
INSERT INTO "users" VALUES('inventory@erp.com','Faisal Al-Qahtani','$2b$12$uR76Ry8q6lM6LKz3u7vSbew9yHbudA7BMuDaUYZ79d/cI5i0aYE5u',3,0,3,'2026-06-28 22:49:11.278474','2026-06-28 22:49:11.278477','active',1);
INSERT INTO "users" VALUES('procurement@erp.com','Noura Al-Salem','$2b$12$DDMX5hlzf7i7WIeM0uZcReauqvd4J6D57f4OPwz98PmNebF9tMmBa',4,0,4,'2026-06-28 22:49:11.544889','2026-06-28 22:49:11.544894','active',1);
INSERT INTO "users" VALUES('sales@erp.com','Omar Al-Fahad','$2b$12$AYZSxJirCl6tXZuGn//VPe3DeiqWUHnVQPNlSy6ylz1YUJNtHoSQm',5,0,5,'2026-06-28 22:49:11.807616','2026-06-28 22:49:11.807620','active',1);
INSERT INTO "users" VALUES('finance@erp.com','Layla Al-Mansour','$2b$12$nYPV254LcM.uMgy8vFQf9.Zb9vdMCLOdfDAjYRBmNU7aMOzFMvGQi',6,0,6,'2026-06-28 22:49:12.061487','2026-06-28 22:49:12.061491','active',1);
INSERT INTO "users" VALUES('viewer@erp.com','Read Only User','$2b$12$elqFFahnm2FU7KlUNOMO.umoVr891h4uAKGFyrJX9I.xXpehNSBwq',7,0,7,'2026-06-28 22:49:12.308815','2026-06-28 22:49:12.308818','active',1);
