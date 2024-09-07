create table if not exists order_items (
	order_item_id BIGSERIAL PRIMARY KEY,
	order_id BIGINT REFERENCES orders(order_id),
	product_id BIGINT REFERENCES products(product_id),
	quantity INT,
	unit_price NUMERIC(8,2)
);
insert into order_items (quantity, unit_price) values (27, 41239.91);
insert into order_items (quantity, unit_price) values (30, 93136.58);
insert into order_items (quantity, unit_price) values (8, 20282.73);
insert into order_items (quantity, unit_price) values (5, 95843.69);
insert into order_items (quantity, unit_price) values (22, 18640.74);
insert into order_items (quantity, unit_price) values (16, 25540.87);
insert into order_items (quantity, unit_price) values (4, 59622.82);
insert into order_items (quantity, unit_price) values (17, 17393.01);
insert into order_items (quantity, unit_price) values (11, 15660.44);
insert into order_items (quantity, unit_price) values (6, 26380.36);
insert into order_items (quantity, unit_price) values (8, 36827.72);
insert into order_items (quantity, unit_price) values (4, 53914.08);
insert into order_items (quantity, unit_price) values (2, 97730.35);
insert into order_items (quantity, unit_price) values (27, 32666.63);
insert into order_items (quantity, unit_price) values (23, 17344.12);
insert into order_items (quantity, unit_price) values (21, 24736.01);
insert into order_items (quantity, unit_price) values (11, 38902.71);
insert into order_items (quantity, unit_price) values (15, 71860.67);
insert into order_items (quantity, unit_price) values (11, 92842.51);
insert into order_items (quantity, unit_price) values (14, 59674.16);
insert into order_items (quantity, unit_price) values (19, 40282.12);
insert into order_items (quantity, unit_price) values (23, 10177.53);
insert into order_items (quantity, unit_price) values (28, 59505.66);
insert into order_items (quantity, unit_price) values (5, 30052.88);
insert into order_items (quantity, unit_price) values (13, 34121.37);
insert into order_items (quantity, unit_price) values (13, 98067.75);
insert into order_items (quantity, unit_price) values (5, 16428.36);
insert into order_items (quantity, unit_price) values (28, 16901.41);
insert into order_items (quantity, unit_price) values (10, 40991.91);
insert into order_items (quantity, unit_price) values (26, 71145.83);
insert into order_items (quantity, unit_price) values (17, 91750.84);
insert into order_items (quantity, unit_price) values (24, 76593.71);
insert into order_items (quantity, unit_price) values (1, 97727.2);
insert into order_items (quantity, unit_price) values (27, 60197.58);
insert into order_items (quantity, unit_price) values (21, 7874.36);
insert into order_items (quantity, unit_price) values (5, 67584.71);
insert into order_items (quantity, unit_price) values (30, 34530.46);
insert into order_items (quantity, unit_price) values (16, 14754.59);
insert into order_items (quantity, unit_price) values (22, 65314.02);
insert into order_items (quantity, unit_price) values (21, 48106.85);
insert into order_items (quantity, unit_price) values (4, 97637.41);
insert into order_items (quantity, unit_price) values (14, 30282.26);
insert into order_items (quantity, unit_price) values (4, 11289.1);
insert into order_items (quantity, unit_price) values (4, 52213.6);
insert into order_items (quantity, unit_price) values (8, 26395.03);
insert into order_items (quantity, unit_price) values (27, 11662.56);
insert into order_items (quantity, unit_price) values (22, 38566.18);
insert into order_items (quantity, unit_price) values (7, 99841.28);
insert into order_items (quantity, unit_price) values (4, 57077.35);
insert into order_items (quantity, unit_price) values (3, 3317.41);
insert into order_items (quantity, unit_price) values (3, 84068.76);
insert into order_items (quantity, unit_price) values (20, 32082.36);
insert into order_items (quantity, unit_price) values (19, 57928.65);
insert into order_items (quantity, unit_price) values (24, 16827.55);
insert into order_items (quantity, unit_price) values (22, 81489.42);
insert into order_items (quantity, unit_price) values (12, 46298.23);
insert into order_items (quantity, unit_price) values (23, 17366.09);
insert into order_items (quantity, unit_price) values (3, 73144.51);
insert into order_items (quantity, unit_price) values (1, 46577.15);
insert into order_items (quantity, unit_price) values (2, 64580.4);
insert into order_items (quantity, unit_price) values (23, 34414.21);
insert into order_items (quantity, unit_price) values (17, 57593.66);
insert into order_items (quantity, unit_price) values (10, 94626.52);
insert into order_items (quantity, unit_price) values (26, 30984.76);
insert into order_items (quantity, unit_price) values (27, 1722.32);
insert into order_items (quantity, unit_price) values (12, 71103.82);
insert into order_items (quantity, unit_price) values (5, 69306.19);
insert into order_items (quantity, unit_price) values (28, 76966.73);
insert into order_items (quantity, unit_price) values (13, 4907.79);
insert into order_items (quantity, unit_price) values (25, 26334.62);
insert into order_items (quantity, unit_price) values (17, 51286.13);
insert into order_items (quantity, unit_price) values (1, 54147.8);
insert into order_items (quantity, unit_price) values (6, 64079.81);
insert into order_items (quantity, unit_price) values (1, 65227.65);
insert into order_items (quantity, unit_price) values (4, 2423.04);
insert into order_items (quantity, unit_price) values (6, 52642.97);
insert into order_items (quantity, unit_price) values (28, 11146.64);
insert into order_items (quantity, unit_price) values (20, 79051.19);
insert into order_items (quantity, unit_price) values (12, 98377.7);
insert into order_items (quantity, unit_price) values (26, 59610.75);
insert into order_items (quantity, unit_price) values (22, 88355.69);
insert into order_items (quantity, unit_price) values (4, 6794.19);
insert into order_items (quantity, unit_price) values (17, 25491.23);
insert into order_items (quantity, unit_price) values (25, 38842.01);
insert into order_items (quantity, unit_price) values (26, 47547.27);
insert into order_items (quantity, unit_price) values (1, 72174.51);
insert into order_items (quantity, unit_price) values (8, 55035.94);
insert into order_items (quantity, unit_price) values (6, 6688.58);
insert into order_items (quantity, unit_price) values (3, 15587.63);
insert into order_items (quantity, unit_price) values (29, 47882.6);
insert into order_items (quantity, unit_price) values (26, 49437.7);
insert into order_items (quantity, unit_price) values (30, 97337.35);
insert into order_items (quantity, unit_price) values (29, 47723.81);
insert into order_items (quantity, unit_price) values (18, 88224.7);
insert into order_items (quantity, unit_price) values (7, 37718.73);
insert into order_items (quantity, unit_price) values (28, 41190.74);
insert into order_items (quantity, unit_price) values (14, 61992.98);
insert into order_items (quantity, unit_price) values (24, 45591.52);
insert into order_items (quantity, unit_price) values (21, 48231.81);
insert into order_items (quantity, unit_price) values (13, 79833.05);
insert into order_items (quantity, unit_price) values (8, 98005.94);
insert into order_items (quantity, unit_price) values (4, 29236.5);
insert into order_items (quantity, unit_price) values (24, 72003.22);
insert into order_items (quantity, unit_price) values (11, 26964.5);
insert into order_items (quantity, unit_price) values (21, 24974.07);
insert into order_items (quantity, unit_price) values (20, 96624.87);
insert into order_items (quantity, unit_price) values (6, 86224.0);
insert into order_items (quantity, unit_price) values (10, 26930.12);
insert into order_items (quantity, unit_price) values (29, 63065.59);
insert into order_items (quantity, unit_price) values (12, 7141.17);
insert into order_items (quantity, unit_price) values (20, 41196.69);
insert into order_items (quantity, unit_price) values (24, 16651.99);
insert into order_items (quantity, unit_price) values (19, 85173.27);
insert into order_items (quantity, unit_price) values (9, 65352.92);
insert into order_items (quantity, unit_price) values (13, 36480.22);
insert into order_items (quantity, unit_price) values (18, 45268.07);
insert into order_items (quantity, unit_price) values (10, 66070.59);
insert into order_items (quantity, unit_price) values (3, 53910.56);
insert into order_items (quantity, unit_price) values (19, 15633.49);
insert into order_items (quantity, unit_price) values (5, 22075.93);
insert into order_items (quantity, unit_price) values (24, 10653.49);
insert into order_items (quantity, unit_price) values (18, 95157.54);
insert into order_items (quantity, unit_price) values (27, 61613.69);
insert into order_items (quantity, unit_price) values (12, 68290.42);
insert into order_items (quantity, unit_price) values (30, 20280.66);
insert into order_items (quantity, unit_price) values (15, 30292.09);
insert into order_items (quantity, unit_price) values (27, 56117.68);
insert into order_items (quantity, unit_price) values (27, 55469.63);
insert into order_items (quantity, unit_price) values (25, 38200.24);
insert into order_items (quantity, unit_price) values (27, 15854.43);
insert into order_items (quantity, unit_price) values (7, 78440.88);
insert into order_items (quantity, unit_price) values (6, 6431.66);
insert into order_items (quantity, unit_price) values (27, 96762.94);
insert into order_items (quantity, unit_price) values (30, 49366.58);
insert into order_items (quantity, unit_price) values (1, 94821.66);
insert into order_items (quantity, unit_price) values (19, 19007.04);
insert into order_items (quantity, unit_price) values (19, 69784.9);
insert into order_items (quantity, unit_price) values (11, 57944.05);
insert into order_items (quantity, unit_price) values (7, 94576.91);
insert into order_items (quantity, unit_price) values (15, 4004.46);
insert into order_items (quantity, unit_price) values (18, 17421.08);
insert into order_items (quantity, unit_price) values (10, 16017.31);
insert into order_items (quantity, unit_price) values (23, 66919.65);
insert into order_items (quantity, unit_price) values (18, 60575.99);
insert into order_items (quantity, unit_price) values (4, 26463.4);
insert into order_items (quantity, unit_price) values (8, 28602.15);
insert into order_items (quantity, unit_price) values (29, 55685.51);
insert into order_items (quantity, unit_price) values (21, 34776.32);
insert into order_items (quantity, unit_price) values (24, 6832.12);
insert into order_items (quantity, unit_price) values (11, 78597.09);
insert into order_items (quantity, unit_price) values (29, 59879.69);
insert into order_items (quantity, unit_price) values (19, 55557.03);
insert into order_items (quantity, unit_price) values (7, 40220.42);
insert into order_items (quantity, unit_price) values (20, 5525.41);
insert into order_items (quantity, unit_price) values (17, 50912.83);
insert into order_items (quantity, unit_price) values (14, 39379.29);
insert into order_items (quantity, unit_price) values (25, 43427.31);
insert into order_items (quantity, unit_price) values (30, 74958.34);
insert into order_items (quantity, unit_price) values (18, 7666.08);
insert into order_items (quantity, unit_price) values (21, 85458.56);
insert into order_items (quantity, unit_price) values (23, 21010.19);
insert into order_items (quantity, unit_price) values (11, 33835.34);
insert into order_items (quantity, unit_price) values (3, 58943.66);
insert into order_items (quantity, unit_price) values (12, 9929.37);
insert into order_items (quantity, unit_price) values (13, 46694.24);
insert into order_items (quantity, unit_price) values (3, 53570.44);
insert into order_items (quantity, unit_price) values (9, 21923.41);
insert into order_items (quantity, unit_price) values (11, 58577.92);
insert into order_items (quantity, unit_price) values (13, 5392.39);
insert into order_items (quantity, unit_price) values (29, 30392.58);
insert into order_items (quantity, unit_price) values (16, 47355.71);
insert into order_items (quantity, unit_price) values (10, 40472.93);
insert into order_items (quantity, unit_price) values (19, 35829.3);
insert into order_items (quantity, unit_price) values (26, 97550.98);
insert into order_items (quantity, unit_price) values (17, 67970.92);
insert into order_items (quantity, unit_price) values (30, 25409.2);
insert into order_items (quantity, unit_price) values (19, 75236.54);
insert into order_items (quantity, unit_price) values (4, 67513.85);
insert into order_items (quantity, unit_price) values (27, 80738.52);
insert into order_items (quantity, unit_price) values (29, 55320.95);
insert into order_items (quantity, unit_price) values (24, 25783.65);
insert into order_items (quantity, unit_price) values (15, 64703.88);
insert into order_items (quantity, unit_price) values (16, 81267.79);
insert into order_items (quantity, unit_price) values (17, 17239.06);
insert into order_items (quantity, unit_price) values (19, 91937.29);
insert into order_items (quantity, unit_price) values (9, 54466.49);
insert into order_items (quantity, unit_price) values (12, 22300.87);
insert into order_items (quantity, unit_price) values (26, 41032.5);
insert into order_items (quantity, unit_price) values (24, 91108.54);
insert into order_items (quantity, unit_price) values (27, 22658.06);
insert into order_items (quantity, unit_price) values (27, 92311.32);
insert into order_items (quantity, unit_price) values (25, 79146.14);
insert into order_items (quantity, unit_price) values (22, 41384.41);
insert into order_items (quantity, unit_price) values (25, 18528.05);
insert into order_items (quantity, unit_price) values (29, 30658.34);
insert into order_items (quantity, unit_price) values (25, 21817.59);
insert into order_items (quantity, unit_price) values (16, 81010.71);
insert into order_items (quantity, unit_price) values (26, 89596.87);
insert into order_items (quantity, unit_price) values (20, 9480.04);
insert into order_items (quantity, unit_price) values (24, 50293.85);