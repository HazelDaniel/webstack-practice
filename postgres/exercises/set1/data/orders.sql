create table if not exists orders (
	order_id BIGSERIAL PRIMARY KEY,
	customer_id BIGINT REFERENCES customers(customer_id),
	order_date DATE,
	total_amount NUMERIC(8,2)
);
insert into orders (order_date, total_amount) values ('7/22/1999', 9478.83);
insert into orders (order_date, total_amount) values ('7/1/2009', 67238.48);
insert into orders (order_date, total_amount) values ('2/4/2021', 47351.09);
insert into orders (order_date, total_amount) values ('10/17/2021', 64557.23);
insert into orders (order_date, total_amount) values ('11/14/2005', 92896.98);
insert into orders (order_date, total_amount) values ('4/8/2019', 74328.53);
insert into orders (order_date, total_amount) values ('5/4/2017', 78671.24);
insert into orders (order_date, total_amount) values ('12/7/2018', 70369.63);
insert into orders (order_date, total_amount) values ('6/23/2007', 63748.36);
insert into orders (order_date, total_amount) values ('9/4/2003', 94399.26);
insert into orders (order_date, total_amount) values ('3/7/2001', 49009.86);
insert into orders (order_date, total_amount) values ('8/26/2004', 49340.9);
insert into orders (order_date, total_amount) values ('10/14/2009', 63299.27);
insert into orders (order_date, total_amount) values ('1/24/2003', 5575.63);
insert into orders (order_date, total_amount) values ('8/7/1998', 14965.35);
insert into orders (order_date, total_amount) values ('5/11/2004', 65474.88);
insert into orders (order_date, total_amount) values ('1/29/2013', 26392.5);
insert into orders (order_date, total_amount) values ('7/8/2015', 37805.84);
insert into orders (order_date, total_amount) values ('12/22/2003', 65826.92);
insert into orders (order_date, total_amount) values ('4/19/2001', 63650.69);
insert into orders (order_date, total_amount) values ('9/28/2007', 82905.39);
insert into orders (order_date, total_amount) values ('12/16/2020', 92262.11);
insert into orders (order_date, total_amount) values ('9/7/2009', 87000.03);
insert into orders (order_date, total_amount) values ('7/1/2005', 3218.76);
insert into orders (order_date, total_amount) values ('8/25/2012', 6639.64);
insert into orders (order_date, total_amount) values ('4/30/2006', 86046.73);
insert into orders (order_date, total_amount) values ('12/9/2004', 44189.77);
insert into orders (order_date, total_amount) values ('4/15/2001', 11431.73);
insert into orders (order_date, total_amount) values ('10/21/2005', 60524.15);
insert into orders (order_date, total_amount) values ('10/23/2013', 97712.06);
insert into orders (order_date, total_amount) values ('9/28/2018', 87928.41);
insert into orders (order_date, total_amount) values ('9/8/1999', 88640.67);
insert into orders (order_date, total_amount) values ('12/11/2003', 61163.51);
insert into orders (order_date, total_amount) values ('9/16/2002', 71122.71);
insert into orders (order_date, total_amount) values ('1/26/2023', 66817.42);
insert into orders (order_date, total_amount) values ('8/27/1998', 69393.5);
insert into orders (order_date, total_amount) values ('11/28/2022', 95002.89);
insert into orders (order_date, total_amount) values ('12/6/2004', 53403.74);
insert into orders (order_date, total_amount) values ('8/22/2005', 29451.41);
insert into orders (order_date, total_amount) values ('9/22/2000', 62210.67);
insert into orders (order_date, total_amount) values ('12/7/2018', 84194.47);
insert into orders (order_date, total_amount) values ('2/21/2003', 16036.92);
insert into orders (order_date, total_amount) values ('9/27/2015', 7811.04);
insert into orders (order_date, total_amount) values ('4/29/2017', 55234.11);
insert into orders (order_date, total_amount) values ('1/18/2024', 76005.41);
insert into orders (order_date, total_amount) values ('3/24/2007', 65087.93);
insert into orders (order_date, total_amount) values ('3/21/2006', 96253.55);
insert into orders (order_date, total_amount) values ('5/1/2016', 44504.62);
insert into orders (order_date, total_amount) values ('8/2/2002', 56896.75);
insert into orders (order_date, total_amount) values ('1/31/2006', 27044.7);
insert into orders (order_date, total_amount) values ('7/23/2004', 23383.38);
insert into orders (order_date, total_amount) values ('11/16/2002', 92251.53);
insert into orders (order_date, total_amount) values ('9/4/2018', 26874.81);
insert into orders (order_date, total_amount) values ('7/20/2011', 23728.11);
insert into orders (order_date, total_amount) values ('4/26/2022', 75965.28);
insert into orders (order_date, total_amount) values ('11/3/2005', 76968.31);
insert into orders (order_date, total_amount) values ('4/6/2011', 81042.84);
insert into orders (order_date, total_amount) values ('7/31/1999', 90176.25);
insert into orders (order_date, total_amount) values ('3/20/2000', 8371.29);
insert into orders (order_date, total_amount) values ('2/6/2017', 75128.41);
insert into orders (order_date, total_amount) values ('5/17/2002', 91241.2);
insert into orders (order_date, total_amount) values ('12/20/1998', 24610.26);
insert into orders (order_date, total_amount) values ('12/11/2018', 90610.96);
insert into orders (order_date, total_amount) values ('8/9/2004', 3003.37);
insert into orders (order_date, total_amount) values ('9/6/2022', 68051.83);
insert into orders (order_date, total_amount) values ('5/21/2022', 17512.08);
insert into orders (order_date, total_amount) values ('4/8/2006', 86451.34);
insert into orders (order_date, total_amount) values ('3/7/2020', 75559.74);
insert into orders (order_date, total_amount) values ('10/3/2002', 49000.16);
insert into orders (order_date, total_amount) values ('3/23/2010', 42067.35);
insert into orders (order_date, total_amount) values ('1/15/2021', 66074.14);
insert into orders (order_date, total_amount) values ('1/21/1999', 13017.24);
insert into orders (order_date, total_amount) values ('11/3/2005', 42477.77);
insert into orders (order_date, total_amount) values ('5/4/2002', 41433.0);
insert into orders (order_date, total_amount) values ('3/26/2022', 64606.19);
insert into orders (order_date, total_amount) values ('7/10/2014', 40703.69);
insert into orders (order_date, total_amount) values ('4/14/2008', 85370.5);
insert into orders (order_date, total_amount) values ('11/7/2000', 54324.61);
insert into orders (order_date, total_amount) values ('11/8/1999', 1604.01);
insert into orders (order_date, total_amount) values ('12/9/2019', 76205.8);
insert into orders (order_date, total_amount) values ('11/24/2016', 5390.61);
insert into orders (order_date, total_amount) values ('3/29/2004', 17942.25);
insert into orders (order_date, total_amount) values ('1/4/2008', 16667.0);
insert into orders (order_date, total_amount) values ('5/4/2020', 79264.12);
insert into orders (order_date, total_amount) values ('2/13/2007', 84108.14);
insert into orders (order_date, total_amount) values ('11/28/2020', 76115.84);
insert into orders (order_date, total_amount) values ('12/24/2002', 63922.72);
insert into orders (order_date, total_amount) values ('1/18/2023', 31183.65);
insert into orders (order_date, total_amount) values ('8/14/2012', 74738.31);
insert into orders (order_date, total_amount) values ('5/7/2002', 2657.02);
insert into orders (order_date, total_amount) values ('10/24/2017', 51561.32);
insert into orders (order_date, total_amount) values ('8/25/2013', 34050.81);
insert into orders (order_date, total_amount) values ('12/18/2010', 57160.19);
insert into orders (order_date, total_amount) values ('1/17/2015', 54529.81);
insert into orders (order_date, total_amount) values ('9/17/2009', 75752.58);
insert into orders (order_date, total_amount) values ('1/13/2020', 63096.25);
insert into orders (order_date, total_amount) values ('10/14/2013', 19421.78);
insert into orders (order_date, total_amount) values ('10/15/2004', 53987.69);
insert into orders (order_date, total_amount) values ('8/8/2019', 90158.54);
insert into orders (order_date, total_amount) values ('8/14/2002', 99526.2);
insert into orders (order_date, total_amount) values ('2/25/2001', 4309.48);
insert into orders (order_date, total_amount) values ('7/26/2010', 80737.76);
insert into orders (order_date, total_amount) values ('8/29/2020', 26215.51);
insert into orders (order_date, total_amount) values ('5/5/2011', 70815.47);
insert into orders (order_date, total_amount) values ('1/20/2016', 99820.65);
insert into orders (order_date, total_amount) values ('9/13/2007', 3186.9);
insert into orders (order_date, total_amount) values ('7/3/2020', 63049.1);
insert into orders (order_date, total_amount) values ('7/28/2005', 85748.95);
insert into orders (order_date, total_amount) values ('11/22/1999', 94470.86);
insert into orders (order_date, total_amount) values ('7/13/2023', 70300.67);
insert into orders (order_date, total_amount) values ('6/8/2003', 24924.51);
insert into orders (order_date, total_amount) values ('1/28/2003', 56206.79);
insert into orders (order_date, total_amount) values ('9/21/2022', 29693.48);
insert into orders (order_date, total_amount) values ('6/19/2007', 95979.95);
insert into orders (order_date, total_amount) values ('12/8/2021', 57133.58);
insert into orders (order_date, total_amount) values ('10/7/2012', 84383.55);
insert into orders (order_date, total_amount) values ('12/28/2021', 89109.24);
insert into orders (order_date, total_amount) values ('6/6/2013', 93798.79);
insert into orders (order_date, total_amount) values ('4/14/1999', 55570.44);
insert into orders (order_date, total_amount) values ('7/25/2015', 43904.67);
insert into orders (order_date, total_amount) values ('10/18/2019', 49406.48);
insert into orders (order_date, total_amount) values ('8/5/2000', 54946.83);
insert into orders (order_date, total_amount) values ('12/23/2006', 35898.1);
insert into orders (order_date, total_amount) values ('3/11/2017', 76873.55);
insert into orders (order_date, total_amount) values ('10/8/2006', 20897.86);
insert into orders (order_date, total_amount) values ('2/3/2002', 2319.49);
insert into orders (order_date, total_amount) values ('10/29/2011', 88188.53);
insert into orders (order_date, total_amount) values ('6/25/2019', 59952.82);
insert into orders (order_date, total_amount) values ('9/1/1998', 36311.61);
insert into orders (order_date, total_amount) values ('12/21/2012', 19656.32);
insert into orders (order_date, total_amount) values ('1/20/2012', 77353.19);
insert into orders (order_date, total_amount) values ('2/14/2014', 51514.35);
insert into orders (order_date, total_amount) values ('3/11/2000', 82091.11);
insert into orders (order_date, total_amount) values ('8/31/2022', 92275.38);
insert into orders (order_date, total_amount) values ('6/25/2010', 80857.9);
insert into orders (order_date, total_amount) values ('1/20/2009', 17931.35);
insert into orders (order_date, total_amount) values ('8/5/2016', 79138.52);
insert into orders (order_date, total_amount) values ('4/21/2020', 35146.03);
insert into orders (order_date, total_amount) values ('1/27/2020', 76664.06);
insert into orders (order_date, total_amount) values ('7/15/2002', 40290.47);
insert into orders (order_date, total_amount) values ('10/19/2000', 92110.05);
insert into orders (order_date, total_amount) values ('3/29/1999', 95173.01);
insert into orders (order_date, total_amount) values ('1/19/2015', 19932.57);
insert into orders (order_date, total_amount) values ('5/31/2011', 22863.82);
insert into orders (order_date, total_amount) values ('1/25/2004', 18888.93);
insert into orders (order_date, total_amount) values ('9/21/2018', 60849.85);
insert into orders (order_date, total_amount) values ('5/14/2022', 79449.26);
insert into orders (order_date, total_amount) values ('2/8/2020', 64569.39);
insert into orders (order_date, total_amount) values ('1/12/2000', 11520.29);
insert into orders (order_date, total_amount) values ('6/13/2008', 19934.95);
insert into orders (order_date, total_amount) values ('9/12/2016', 70823.49);
insert into orders (order_date, total_amount) values ('9/26/2008', 84062.95);
insert into orders (order_date, total_amount) values ('1/18/2006', 39528.51);
insert into orders (order_date, total_amount) values ('4/30/1999', 45625.69);
insert into orders (order_date, total_amount) values ('2/20/2000', 40759.12);
insert into orders (order_date, total_amount) values ('10/16/2007', 48415.01);
insert into orders (order_date, total_amount) values ('2/27/2020', 60099.7);
insert into orders (order_date, total_amount) values ('8/29/2004', 79618.69);
insert into orders (order_date, total_amount) values ('5/30/2014', 51018.03);
insert into orders (order_date, total_amount) values ('7/24/2022', 81843.04);
insert into orders (order_date, total_amount) values ('5/13/2002', 53332.76);
insert into orders (order_date, total_amount) values ('12/19/2020', 4378.26);
insert into orders (order_date, total_amount) values ('12/31/2014', 50768.16);
insert into orders (order_date, total_amount) values ('7/27/2003', 63358.64);
insert into orders (order_date, total_amount) values ('8/5/2007', 85394.79);
insert into orders (order_date, total_amount) values ('3/25/2015', 22909.42);
insert into orders (order_date, total_amount) values ('11/14/2023', 84764.54);
insert into orders (order_date, total_amount) values ('7/17/2011', 72271.74);
insert into orders (order_date, total_amount) values ('2/22/2019', 92075.23);
insert into orders (order_date, total_amount) values ('8/20/2003', 12430.99);
insert into orders (order_date, total_amount) values ('5/27/2013', 93941.31);
insert into orders (order_date, total_amount) values ('9/26/2014', 88608.99);
insert into orders (order_date, total_amount) values ('4/25/2007', 92467.6);
insert into orders (order_date, total_amount) values ('7/16/2003', 92059.27);
insert into orders (order_date, total_amount) values ('1/2/2010', 74089.75);
insert into orders (order_date, total_amount) values ('1/26/1999', 29058.01);
insert into orders (order_date, total_amount) values ('5/12/2014', 61748.85);
insert into orders (order_date, total_amount) values ('3/9/2019', 99770.22);
insert into orders (order_date, total_amount) values ('11/12/2022', 8018.86);
insert into orders (order_date, total_amount) values ('11/8/2005', 30509.36);
insert into orders (order_date, total_amount) values ('7/23/2017', 83886.5);
insert into orders (order_date, total_amount) values ('3/26/2013', 1761.35);
insert into orders (order_date, total_amount) values ('8/28/2006', 75979.52);
insert into orders (order_date, total_amount) values ('9/19/2003', 23436.64);
insert into orders (order_date, total_amount) values ('10/11/2010', 70664.59);
insert into orders (order_date, total_amount) values ('12/20/2002', 11186.09);
insert into orders (order_date, total_amount) values ('4/14/2016', 16383.78);
insert into orders (order_date, total_amount) values ('6/3/2013', 54614.32);
insert into orders (order_date, total_amount) values ('1/12/2019', 96708.26);
insert into orders (order_date, total_amount) values ('9/3/2001', 10216.6);
insert into orders (order_date, total_amount) values ('2/18/2014', 65470.41);
insert into orders (order_date, total_amount) values ('7/26/1999', 41739.48);
insert into orders (order_date, total_amount) values ('4/26/2008', 55976.21);
insert into orders (order_date, total_amount) values ('6/23/2022', 28589.46);
insert into orders (order_date, total_amount) values ('9/26/2006', 27391.71);
insert into orders (order_date, total_amount) values ('10/20/2003', 12430.81);
insert into orders (order_date, total_amount) values ('5/2/2003', 54486.28);
insert into orders (order_date, total_amount) values ('4/8/2018', 71588.92);
insert into orders (order_date, total_amount) values ('4/12/2004', 26596.44);
insert into orders (order_date, total_amount) values ('7/30/2004', 7561.87);
