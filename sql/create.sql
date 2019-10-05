-- ruku_order_keywords view
ALTER
ALGORITHM=UNDEFINED
DEFINER=`root`@`localhost`
SQL SECURITY DEFINER
VIEW `ruku_order_keywords` AS
SELECT
	concat(

		IF (
			isnull(`o`.`use_type`),
			'',
			`o`.`use_type`
		),
		' ',

	IF (
		isnull(`o`.`category`),
		'',
		(
			SELECT
				`c`.`name`
			FROM
				`category` `c`
			WHERE
				(`c`.`id` = `o`.`category`)
		)
	),
	' ',

IF (
	isnull(`o`.`vendor`),
	'',
	`o`.`vendor`
),
 ' ',

IF (
	isnull(`o`.`name`),
	'',
	`o`.`name`
),
 ' ',

IF (
	isnull(`o`.`unit`),
	'',
	`o`.`unit`
),
 ' ',

IF (
	isnull(`o`.`number`),
	'',
	`o`.`number`
),
 ' ',

IF (
	isnull(`o`.`ruku_date`),
	'',
	`o`.`ruku_date`
),
 ' ',

IF (
	isnull(`o`.`cost`),
	'',
	`o`.`cost`
),
 ' ',

IF (
	isnull(`o`.`debate`),
	'',
	`o`.`debate`
),
 ' ',

IF (
	isnull(`o`.`checkout_date`),
	'',
	`o`.`checkout_date`
),
 ' ',

IF (
	isnull(`o`.`memo`),
	'',
	`o`.`memo`
),
 ' '
	) AS `keyWords`,
	`o`.`id` AS `id`,
	`o`.`use_type` AS `use_type`,
	`o`.`category` AS `category`,
	(
		SELECT
			`c`.`name`
		FROM
			`category` `c`
		WHERE
			(`c`.`id` = `o`.`category`)
	) AS `category_str`,
	`o`.`vendor` AS `vendor`,
	`o`.`name` AS `name`,
	`o`.`unit` AS `unit`,
	`o`.`number` AS `number`,
	`o`.`ruku_date` AS `ruku_date`,
	`o`.`cost` AS `cost`,
	`o`.`debate` AS `debate`,
	`o`.`checkout_date` AS `checkout_date`,
	`o`.`memo` AS `memo`,
	`o`.`created_by` AS `created_by`,
	`o`.`created_date` AS `created_date`,
	`o`.`updated_by` AS `updated_by`,
	`o`.`updated_date` AS `updated_date`,
	IF (
		o.number -
		IF (o.cnum IS NULL, 0, o.cnum) < 0,
		0,
		o.number -
	IF (o.cnum IS NULL, 0, o.cnum)
	) snum
FROM
	(
		SELECT
			r.*, (
				SELECT
					sum(number)
				FROM
					chuku_order
				WHERE
					input_order_id = r.id
			) cnum
		FROM
			ruku_order r
	) o ;